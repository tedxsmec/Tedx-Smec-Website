// controllers/mediaController.js
const Media = require('../models/Media');
const path = require('path');

/* --------------------------------------------------
   Instagram helpers
-------------------------------------------------- */
function normalizeInstagramUrl(url) {
  if (!url) return null;
  
  // Match Instagram post or reel URL
  // Examples: 
  // https://www.instagram.com/p/ABC123/
  // https://www.instagram.com/reel/XYZ456/
  // https://instagram.com/p/ABC123/
  const re = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/;
  const m = url.match(re);
  
  if (!m) return null;
  
  // Return normalized embed URL
  const type = m[1]; // 'p' or 'reel'
  const postId = m[2];
  return `https://www.instagram.com/${type}/${postId}/`;
}

/* --------------------------------------------------
   YouTube helpers (UNCHANGED)
-------------------------------------------------- */
function extractYouTubeId(url) {
  if (!url) return null;
  const re =
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
  const m = url.match(re);
  return m ? m[1] : null;
}

function normalizeYouTubeUrl(url) {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/watch?v=${id}`;
}

/* --------------------------------------------------
   LIST MEDIA (UNCHANGED)
-------------------------------------------------- */
exports.listMedia = async (req, res) => {
  const q = {};
  try {
    const items = await Media.find(q).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    console.error('listMedia', err);
    res.status(500).json({ success: false, message: 'Failed to list media' });
  }
};

/* --------------------------------------------------
   CREATE IMAGE (UPDATED – Cloudinary compatible)
-------------------------------------------------- */
exports.createImage = async (req, res) => {
  try {
    let fileUrl = null;
    let originalName = null;
    let publicId = null;

    // ✅ Cloudinary upload (preferred)
    if (req.body?.path) {
      fileUrl = req.body.path;           // secure_url
      publicId = req.body.publicId;      // optional
    }

    // ✅ Fallback: local disk upload (old behavior)
    else if (req.file) {
      fileUrl = path
        .relative(process.cwd(), req.file.path)
        .replace(/\\/g, '/');
      originalName = req.file.originalname;
    }

    if (!fileUrl) {
      return res.status(400).json({
        success: false,
        message: 'No image uploaded',
      });
    }

    const m = new Media({
      type: 'image',
      title: req.body.title || '',
      description: req.body.description || '',
      url: fileUrl,
      publicId,                 // safe even if undefined
      originalName,
      createdBy: req.user?.id || undefined,
    });

    await m.save();
    res.status(201).json({ success: true, data: m });
  } catch (err) {
    console.error('createImage', err);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
};

/* --------------------------------------------------
   CREATE VIDEO (UNCHANGED)
-------------------------------------------------- */
exports.createVideo = async (req, res) => {
  try {
    const { url, title, description } = req.body;
    const normalized = normalizeYouTubeUrl(url);
    if (!normalized) {
      return res.status(400).json({
        success: false,
        message: 'Invalid YouTube URL',
      });
    }

    const m = new Media({
      type: 'video',
      title: title || '',
      description: description || '',
      url: normalized,
      createdBy: req.user?.id || undefined,
    });

    await m.save();
    res.status(201).json({ success: true, data: m });
  } catch (err) {
    console.error('createVideo', err);
    res.status(500).json({ success: false, message: 'Failed to add video' });
  }
};

/* --------------------------------------------------
   CREATE INSTAGRAM POST/REEL
-------------------------------------------------- */
exports.createInstagram = async (req, res) => {
  try {
    const { url, title, description } = req.body;
    const normalized = normalizeInstagramUrl(url);
    
    if (!normalized) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Instagram URL. Must be a post or reel URL.',
      });
    }

    const m = new Media({
      type: 'instagram',
      title: title || '',
      description: description || '',
      url: normalized,
      createdBy: req.user?.id || undefined,
    });

    await m.save();
    res.status(201).json({ success: true, data: m });
  } catch (err) {
    console.error('createInstagram', err);
    res.status(500).json({ success: false, message: 'Failed to add Instagram post' });
  }
};

/* --------------------------------------------------
   GET MEDIA (UNCHANGED)
-------------------------------------------------- */
exports.getMedia = async (req, res) => {
  try {
    const m = await Media.findById(req.params.id);
    if (!m) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }
    res.json({ success: true, data: m });
  } catch (err) {
    console.error('getMedia', err);
    res.status(500).json({ success: false, message: 'Failed to fetch media' });
  }
};

/* --------------------------------------------------
   UPDATE MEDIA (UNCHANGED)
-------------------------------------------------- */
exports.updateMedia = async (req, res) => {
  try {
    const { title, description } = req.body;
    const m = await Media.findByIdAndUpdate(
      req.params.id,
      {
        title: title ?? '',
        description: description ?? '',
      },
      { new: true }
    );

    if (!m) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    res.json({ success: true, data: m });
  } catch (err) {
    console.error('updateMedia', err);
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};

/* --------------------------------------------------
   DELETE MEDIA (UPDATED – Cloudinary safe)
-------------------------------------------------- */
exports.deleteMedia = async (req, res) => {
  try {
    const m = await Media.findByIdAndDelete(req.params.id);
    if (!m) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    // ❌ No filesystem delete for Cloudinary URLs
    // (local delete only if non-http path)
    if (m.type === 'image' && m.url && !m.url.startsWith('http')) {
      const fs = require('fs');
      const p = path.resolve(process.cwd(), m.url);
      fs.unlink(p, (err) => {
        if (err) console.warn('failed to delete file', p, err.message);
      });
    }

    // (optional) Cloudinary delete can be added later using m.publicId

    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error('deleteMedia', err);
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};
