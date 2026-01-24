// // backend/routes/booking.js
// const express = require('express');
// const crypto = require('crypto');
// const Razorpay = require('razorpay');
// const Ticket = require('../models/Ticket');
// const Event = require('../models/Event');
// const { generateReadableCode } = require('../utils/codeGen');
// const {
//   generateQrDataUrl,
//   generateTicketImageBuffer,
//   generatePdfBuffer,
//   sendTicketEmail,
//   sendWhatsAppMessage
// } = require('../utils/ticketUtils');

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// /**
//  * POST /api/book
//  * create ticket (pending) and create razorpay order
//  */
// router.post('/', async (req, res) => {
//   try {
//     const { eventId, studentName, email, phone, rollNumber, year, department, section } = req.body;
//     if (!eventId || !studentName || !email || !phone) {
//       return res.status(400).json({ error: 'eventId, studentName, email and phone are required' });
//     }

//     const event = await Event.findById(eventId);
//     if (!event) return res.status(404).json({ error: 'event not found' });

//     // unique code
//     let ticketCode = null;
//     for (let i = 0; i < 8; i++) {
//       const cand = generateReadableCode(8);
//       const exists = await Ticket.findOne({ ticketCode: cand }).lean().select('_id').exec();
//       if (!exists) { ticketCode = cand; break; }
//     }
//     if (!ticketCode) ticketCode = generateReadableCode(10);

//     const ticket = await Ticket.create({
//       eventId: event._id,
//       eventName: event.name,
//       price: event.price ?? 0,
//       studentName,
//       rollNumber,
//       year,
//       department,
//       section,
//       email,
//       phone,
//       status: 'pending',
//       ticketCode
//     });

//     // create razorpay order
//     const amountPaise = Math.round((event.price || 0) * 100);
//     const order = await razorpay.orders.create({
//       amount: amountPaise,
//       currency: 'INR',
//       receipt: ticket._id.toString(),
//       payment_capture: 1
//     });

//     ticket.razorpayOrderId = order.id;
//     await ticket.save();

//     res.json({
//       ok: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       ticketId: ticket._id,
//       razorpayKey: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (err) {
//     console.error('booking create error', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * POST /api/book/verify
//  * client sends razorpay_order_id, razorpay_payment_id, razorpay_signature, ticketId
//  * verify server-side and finalize ticket (create QR, image, pdf, email/whatsapp)
//  */
// router.post('/verify', async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ticketId } = req.body;
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !ticketId) {
//       return res.status(400).json({ error: 'Missing verification parameters' });
//     }

//     // compute expected signature
//     const generated = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');

//     if (generated !== razorpay_signature) {
//       return res.status(400).json({ error: 'Invalid signature' });
//     }

//     // fetch ticket
//     const ticket = await Ticket.findById(ticketId);
//     if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

//     // update payment ids
//     ticket.razorpayPaymentId = razorpay_payment_id;
//     ticket.status = 'paid';

//     // generate qr data url & image & pdf, save
//     try {
//       ticket.qrDataUrl = await generateQrDataUrl(ticket.ticketCode);

//       const { filePath, publicPath } = await generateTicketImageBuffer(ticket); // returns saved file path, public link
//       ticket.imagePath = publicPath ? `/uploads/tickets/${path.basename(filePath)}` : `/uploads/tickets/${path.basename(filePath)}`;

//       const pdfBuf = await generatePdfBuffer(ticket);
//       ticket.pdfTicketBase64 = pdfBuf.toString('base64');

//       await ticket.save();
//     } catch (err) {
//       console.error('ticket asset generation failed', err);
//       // continue — ticket saved with status paid
//     }

//     // send email
//     try {
//       await sendTicketEmail(ticket);
//     } catch (err) {
//       console.error('send email failed', err);
//     }

//     // send whatsapp (optional)
//     try {
//       await sendWhatsAppMessage(ticket);
//     } catch (err) {
//       console.error('send whatsapp failed', err);
//     }

//     // return final ticket
//     res.json({ ok: true, data: ticket });
//   } catch (err) {
//     console.error('verify error', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


// const express = require('express');
// const crypto = require('crypto');
// const Razorpay = require('razorpay');

// const Ticket = require('../models/Ticket');
// const Event = require('../models/Event');

// const { generateReadableCode } = require('../utils/codeGen');
// const {
//   generateQrDataUrl,
//   generateTicketImageBuffer,
//   generatePdfBuffer,
//   sendTicketEmail,
//   sendWhatsAppMessage
// } = require('../utils/ticketUtils');

// const uploadToCloudinary = require('../utils/uploadToCloudinary');

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// /**
//  * POST /api/book
//  * create ticket (pending) and create razorpay order
//  */
// router.post('/', async (req, res) => {
//   try {
//     const {
//       eventId,
//       studentName,
//       email,
//       phone,
//       rollNumber,
//       year,
//       department,
//       section
//     } = req.body;

//     if (!eventId || !studentName || !email || !phone) {
//       return res.status(400).json({
//         error: 'eventId, studentName, email and phone are required'
//       });
//     }

//     const event = await Event.findById(eventId);
//     if (!event) return res.status(404).json({ error: 'event not found' });

//     // unique ticket code
//     let ticketCode = null;
//     for (let i = 0; i < 8; i++) {
//       const cand = generateReadableCode(8);
//       const exists = await Ticket.findOne({ ticketCode: cand })
//         .lean()
//         .select('_id');
//       if (!exists) {
//         ticketCode = cand;
//         break;
//       }
//     }
//     if (!ticketCode) ticketCode = generateReadableCode(10);

//     const ticket = await Ticket.create({
//       eventId: event._id,
//       eventName: event.name,
//       price: event.price ?? 0,
//       studentName,
//       rollNumber,
//       year,
//       department,
//       section,
//       email,
//       phone,
//       status: 'pending',
//       ticketCode
//     });

//     // create razorpay order
//     const amountPaise = Math.round((event.price || 0) * 100);
//     const order = await razorpay.orders.create({
//       amount: amountPaise,
//       currency: 'INR',
//       receipt: ticket._id.toString(),
//       payment_capture: 1
//     });

//     ticket.razorpayOrderId = order.id;
//     await ticket.save();

//     res.json({
//       ok: true,
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       ticketId: ticket._id,
//       razorpayKey: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (err) {
//     console.error('booking create error', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * POST /api/book/verify
//  * verify razorpay payment & finalize ticket
//  */
// router.post('/verify', async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       ticketId
//     } = req.body;

//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature ||
//       !ticketId
//     ) {
//       return res.status(400).json({ error: 'Missing verification parameters' });
//     }

//     // verify signature
//     const generated = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest('hex');

//     if (generated !== razorpay_signature) {
//       return res.status(400).json({ error: 'Invalid signature' });
//     }

//     const ticket = await Ticket.findById(ticketId);
//     if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

//     ticket.razorpayPaymentId = razorpay_payment_id;
//     ticket.status = 'paid';

//     /**
//      * ASSET GENERATION (Cloudinary)
//      */
//     try {
//       // QR
//       ticket.qrDataUrl = await generateQrDataUrl(ticket.ticketCode);

//       // Ticket Image
//       const imageBuffer = await generateTicketImageBuffer(ticket);
//       const imageUpload = await uploadToCloudinary(
//         imageBuffer,
//         'tedxsmec/tickets/images',
//         'image'
//       );
//       ticket.imageUrl = imageUpload.secure_url;

//       // PDF
//       const pdfBuffer = await generatePdfBuffer(ticket);
//       const pdfUpload = await uploadToCloudinary(
//         pdfBuffer,
//         'tedxsmec/tickets/pdfs',
//         'raw'
//       );
//       ticket.pdfUrl = pdfUpload.secure_url;
//       ticket.pdfTicketBase64 = pdfBuffer.toString('base64');

//       await ticket.save();
//     } catch (err) {
//       console.error('ticket asset generation failed', err);
//       // do not fail payment if assets fail
//     }

//     // email
//     try {
//       await sendTicketEmail(ticket);
//     } catch (err) {
//       console.error('send email failed', err);
//     }

//     // whatsapp
//     try {
//       await sendWhatsAppMessage(ticket);
//     } catch (err) {
//       console.error('send whatsapp failed', err);
//     }

//     res.json({ ok: true, data: ticket });
//   } catch (err) {
//     console.error('verify error', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');

const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

const { generateReadableCode } = require('../utils/codeGen');
const {
  generateQrDataUrl,
  generateTicketImageBuffer,
  generatePdfBuffer,
  sendTicketEmail,
  sendWhatsAppMessage
} = require('../utils/ticketUtils');

const uploadToCloudinary = require('../utils/uploadToCloudinary');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

/**
 * POST /api/book
 * Create ticket (pending) and Razorpay order
 */
router.post('/', async (req, res) => {
  try {
    const {
      eventId,
      studentName,
      email,
      phone,
      rollNumber,
      year,
      department,
      section,
      quantity
    } = req.body;

    if (!eventId || !studentName || !email || !phone) {
      return res.status(400).json({
        error: 'eventId, studentName, email and phone are required'
      });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'event not found' });

    // Enforce booking switches
    if (event.bookingsOpen === false) {
      return res.status(400).json({ error: 'Bookings are currently closed for this event.' });
    }

    // Capacity check (if capacity is set)
    let ticketsSold = 0;
    if (event.capacity) {
      const soldAgg = await Ticket.aggregate([
        { $match: { eventId: event._id, status: { $nin: ['cancelled'] } } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$quantity', 1] } } } }
      ]);
      ticketsSold = soldAgg[0]?.total || 0;

      const remaining = Math.max(0, event.capacity - ticketsSold);
      const requested = quantity || 1;
      if (remaining <= 0) {
        return res.status(400).json({ error: 'Tickets are sold out for this event.' });
      }
      if (requested > remaining) {
        return res.status(400).json({ error: `Only ${remaining} ticket(s) remaining.` });
      }
    }

    // Generate unique ticket code
    let ticketCode = null;
    for (let i = 0; i < 8; i++) {
      const cand = generateReadableCode(8);
      const exists = await Ticket.findOne({ ticketCode: cand }).lean();
      if (!exists) {
        ticketCode = cand;
        break;
      }
    }
    if (!ticketCode) ticketCode = generateReadableCode(10);

    const ticket = await Ticket.create({
      eventId: event._id,
      eventName: event.name,
      price: event.price ?? 0,
      quantity: quantity || 1,
      studentName,
      rollNumber,
      year,
      department,
      section,
      email,
      phone,
      status: 'pending',
      ticketCode
    });

    // FREE EVENT - skip payment, finalize ticket immediately
    if (!event.price || event.price === 0) {
      ticket.status = 'paid';

      // Generate assets for free event - each step isolated
      console.log('Generating assets for free event ticket:', ticket.ticketCode);

      // QR Generation
      try {
        ticket.qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
        console.log('✅ QR code generated');
      } catch (err) {
        console.error('❌ QR generation failed:', err.message);
      }

      // Image Generation (optional)
      try {
        const imageBuffer = await generateTicketImageBuffer(ticket);
        if (imageBuffer) {
          const imageUpload = await uploadToCloudinary(
            imageBuffer,
            'tedxsmec/tickets/images',
            'image'
          );
          ticket.imageUrl = imageUpload.secure_url;
          console.log('✅ Image uploaded');
        }
      } catch (err) {
        console.error('❌ Image generation failed:', err.message);
      }

      // PDF Generation (critical)
      try {
        const pdfBuffer = await generatePdfBuffer(ticket);
        const pdfUpload = await uploadToCloudinary(
          pdfBuffer,
          'tedxsmec/tickets/pdfs',
          'raw'
        );
        ticket.pdfUrl = pdfUpload.secure_url;
        ticket.pdfTicketBase64 = pdfBuffer.toString('base64');
        console.log('✅ PDF generated and uploaded');
      } catch (err) {
        console.error('❌ PDF generation failed:', err.message);
      }

      // Save all assets
      try {
        await ticket.save();
        console.log('✅ Free event ticket saved');
      } catch (err) {
        console.error('❌ Failed to save free ticket:', err.message);
      }

      // Send email for free event
      try {
        await sendTicketEmail(ticket);
      } catch (err) {
        console.error('Free event email failed', err);
      }

      // Return ticket data for free event
      return res.json({
        ok: true,
        ticket: ticket.toObject(),
        message: 'Free ticket booked successfully!'
      });
    }

    // PAID EVENT - create razorpay order
    const amountPaise = Math.round(event.price * (ticket.quantity || 1) * 100);
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: ticket._id.toString(),
      payment_capture: 1
    });

    ticket.razorpayOrderId = order.id;
    await ticket.save();

    res.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      ticketId: ticket._id,
      razorpayKey: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error('booking create error', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/book/verify
 * Verify Razorpay payment & finalize ticket
 */
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      ticketId
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !ticketId
    ) {
      return res.status(400).json({ error: 'Missing verification parameters' });
    }

    // Verify Razorpay signature
    const generated = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    /* =====================================================
       🔥 CRITICAL FIX: SAVE PAYMENT STATUS IMMEDIATELY
       ===================================================== */
    ticket.razorpayPaymentId = razorpay_payment_id;
    ticket.status = 'paid';
    await ticket.save(); // ✅ STATUS NOW PERSISTS

    /* ---------------- ASSET GENERATION (OPTIONAL) ---------------- */
    console.log('Starting asset generation for ticket:', ticket.ticketCode);
    
    // QR Generation
    try {
      ticket.qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
      console.log('✅ QR code generated');
    } catch (err) {
      console.error('❌ QR generation failed:', err.message);
    }

    // Image Generation (optional, may be skipped)
    try {
      const imageBuffer = await generateTicketImageBuffer(ticket);
      if (imageBuffer) {
        const imageUpload = await uploadToCloudinary(
          imageBuffer,
          'tedxsmec/tickets/images',
          'image'
        );
        ticket.imageUrl = imageUpload.secure_url;
        console.log('✅ Ticket image uploaded');
      } else {
        console.log('ℹ️ Ticket image generation skipped (returns null)');
      }
    } catch (err) {
      console.error('❌ Image generation failed:', err.message);
      // Continue - image is optional
    }

    // PDF Generation (critical for download button)
    try {
      const pdfBuffer = await generatePdfBuffer(ticket);
      console.log('✅ PDF generated, size:', pdfBuffer.length);
      
      const pdfUpload = await uploadToCloudinary(
        pdfBuffer,
        'tedxsmec/tickets/pdfs',
        'raw'
      );
      ticket.pdfUrl = pdfUpload.secure_url;
      ticket.pdfTicketBase64 = pdfBuffer.toString('base64');
      console.log('✅ PDF uploaded and base64 saved');
    } catch (err) {
      console.error('❌ PDF generation failed:', err.message);
      console.error('Error stack:', err.stack);
      // Critical failure - ticket won't have download button
    }

    // Save all generated assets
    try {
      await ticket.save();
      console.log('✅ Ticket saved with all assets');
    } catch (err) {
      console.error('❌ Failed to save ticket assets:', err.message);
    }

    /* ---------------- NOTIFICATIONS ---------------- */
    try {
      await sendTicketEmail(ticket);
    } catch (err) {
      console.error('send email failed', err);
    }

    try {
      await sendWhatsAppMessage(ticket);
    } catch (err) {
      console.error('send whatsapp failed', err);
    }

    // Return complete ticket object with all generated fields
    const ticketData = ticket.toObject();
    res.json({ ok: true, data: ticketData });
  } catch (err) {
    console.error('verify error', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
