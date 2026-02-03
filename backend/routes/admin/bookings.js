// // backend/routes/admin/bookings.js
// const express = require('express');
// const router = express.Router();
// const Ticket = require('../../models/Ticket');
// // optional: use your admin auth middleware if you have one
// const adminAuth = require('../../middleware/auth'); // adjust path if different

// // GET /api/admin/bookings
// router.get('/', adminAuth, async (req, res) => {
//   try {
//     const bookings = await Ticket.find()
//       .select('studentName ticketCode email phone status createdAt eventId')
//       .sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (err) {
//     console.error('admin bookings list error', err);
//     res.status(500).json({ error: 'server error' });
//   }
// });

// module.exports = router;


// backend/routes/admin/bookings.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PDFDocument = require('pdfkit');
const { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, AlignmentType, TextRun } = require('docx');
const { Parser } = require('json2csv');

const Ticket = require('../../models/Ticket');
const Event = require('../../models/Event');
const { sendTicketEmail, sendWhatsAppMessage } = require('../../utils/ticketUtils');

const router = express.Router();

// OPTIONAL: enable admin auth middleware if you have one
// const adminAuth = require('../../middleware/adminAuth');
// router.use(adminAuth);

/**
 * GET /api/admin/bookings
 * Returns a list of bookings with lightweight fields for admin table
 */
router.get('/', async (req, res) => {
  try {
    const bookings = await Ticket.find()
      .sort({ createdAt: -1 })
      .select('studentName ticketCode email phone status createdAt eventId rollNumber year department section quantity price razorpayPaymentId razorpayOrderId')
      .populate('eventId', 'name'); // populate event name
    res.json(bookings);
  } catch (err) {
    console.error('admin bookings list error', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

/**
 * GET /api/admin/bookings/:id
 * Return full booking details
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const ticket = await Ticket.findById(id).populate('eventId');
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    // If ticket has imagePath that is saved as relative path, build full URL if BASE_URL available
    const baseUrl = (process.env.BASE_URL || '').replace(/\/$/, '');
    const ticketObj = ticket.toObject();
    if (ticketObj.imagePath && !ticketObj.imagePath.startsWith('http')) {
      ticketObj.imageUrl = baseUrl ? `${baseUrl}${ticketObj.imagePath.startsWith('/') ? '' : '/'}${ticketObj.imagePath}` : ticketObj.imagePath;
    } else {
      ticketObj.imageUrl = ticketObj.imagePath;
    }

    res.json(ticketObj);
  } catch (err) {
    console.error('admin booking detail error', err);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

/**
 * POST /api/admin/bookings/:id/resend
 * Re-send ticket email (and optionally whatsapp)
 */
router.post('/:id/resend', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

    const ticket = await Ticket.findById(id).populate('eventId');
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    // Ensure assets exist; sendTicketEmail should generate assets if missing in many implementations
    try {
      await sendTicketEmail(ticket);
      await sendWhatsAppMessage(ticket).catch(e => console.warn('WhatsApp send failed', e));
    } catch (e) {
      console.error('resend email error', e);
      return res.status(500).json({ error: 'Failed to resend ticket' });
    }

    res.json({ ok: true, message: 'Ticket resent' });
  } catch (err) {
    console.error('admin resend error', err);
    res.status(500).json({ error: 'Failed to resend ticket' });
  }
});

/**
 * POST /api/admin/bookings/:id/cancel
 * Mark ticket cancelled
 */
router.post('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid id' });

    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    ticket.status = 'cancelled';
    await ticket.save();

    res.json({ ok: true, message: 'Ticket cancelled' });
  } catch (err) {
    console.error('admin cancel error', err);
    res.status(500).json({ error: 'Failed to cancel ticket' });
  }
});

/**
 * GET /api/admin/bookings/export-25k8/csv
 * Export only 25K8 roll number tickets with paid status as CSV
 */
router.get('/export-25k8/csv', async (req, res) => {
  try {
    // Fetch all bookings with event details
    const allBookings = await Ticket.find()
      .sort({ createdAt: -1 })
      .populate('eventId', 'name');

    // Filter for tickets with roll numbers starting with 25K8/25k8 AND paid status
    const bookings = allBookings.filter(b => {
      const rollNum = b.rollNumber || '';
      return rollNum.toLowerCase().startsWith('25k8') && b.status === 'paid';
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No paid 25K8 bookings found' });
    }

    // Transform data for export
    const exportData = bookings.map(b => ({
      ticketCode: b.ticketCode || '-',
      studentName: b.studentName || b.applicantName || '-',
      email: b.email || '-',
      phone: b.phone || '-',
      eventName: b.eventId?.name || '-',
      rollNumber: b.rollNumber || '-',
      year: b.year || '-',
      department: b.department || '-',
      section: b.section || '-',
      quantity: b.quantity || 1,
      price: b.price || 0,
      status: b.status || 'pending',
      razorpayPaymentId: b.razorpayPaymentId || '-',
      razorpayOrderId: b.razorpayOrderId || '-',
      createdAt: b.createdAt ? new Date(b.createdAt).toLocaleString() : '-'
    }));

    // Generate CSV
    const fields = [
      'ticketCode', 'studentName', 'email', 'phone', 'eventName',
      'rollNumber', 'year', 'department', 'section', 'quantity',
      'price', 'status', 'razorpayPaymentId', 'razorpayOrderId', 'createdAt'
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(exportData);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=tickets-25k8-paid-${Date.now()}.csv`);
    return res.send(csv);
  } catch (err) {
    console.error('Export 25K8 error:', err);
    res.status(500).json({ error: 'Failed to export 25K8 bookings' });
  }
});

/**
 * GET /api/admin/bookings/export-24k8/csv
 * Export only 24K8 roll number tickets with paid status as CSV
 */
router.get('/export-24k8/csv', async (req, res) => {
  try {
    // Fetch all bookings with event details
    const allBookings = await Ticket.find()
      .sort({ createdAt: -1 })
      .populate('eventId', 'name');

    // Filter for tickets with roll numbers starting with 24K8/24k8 AND paid status
    const bookings = allBookings.filter(b => {
      const rollNum = b.rollNumber || '';
      return rollNum.toLowerCase().startsWith('24k8') && b.status === 'paid';
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No paid 24K8 bookings found' });
    }

    // Transform data for export
    const exportData = bookings.map(b => ({
      ticketCode: b.ticketCode || '-',
      studentName: b.studentName || b.applicantName || '-',
      email: b.email || '-',
      phone: b.phone || '-',
      eventName: b.eventId?.name || '-',
      rollNumber: b.rollNumber || '-',
      year: b.year || '-',
      department: b.department || '-',
      section: b.section || '-',
      quantity: b.quantity || 1,
      price: b.price || 0,
      status: b.status || 'pending',
      razorpayPaymentId: b.razorpayPaymentId || '-',
      razorpayOrderId: b.razorpayOrderId || '-',
      createdAt: b.createdAt ? new Date(b.createdAt).toLocaleString() : '-'
    }));

    // Generate CSV
    const fields = [
      'ticketCode', 'studentName', 'email', 'phone', 'eventName',
      'rollNumber', 'year', 'department', 'section', 'quantity',
      'price', 'status', 'razorpayPaymentId', 'razorpayOrderId', 'createdAt'
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(exportData);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=tickets-24k8-paid-${Date.now()}.csv`);
    return res.send(csv);
  } catch (err) {
    console.error('Export 24K8 error:', err);
    res.status(500).json({ error: 'Failed to export 24K8 bookings' });
  }
});

/**
 * GET /api/admin/bookings/export-23k8/csv
 * Export only 23K8 roll number tickets with paid status as CSV
 */
router.get('/export-23k8/csv', async (req, res) => {
  try {
    // Fetch all bookings with event details
    const allBookings = await Ticket.find()
      .sort({ createdAt: -1 })
      .populate('eventId', 'name');

    // Filter for tickets with roll numbers starting with 23K8/23k8 AND paid status
    const bookings = allBookings.filter(b => {
      const rollNum = b.rollNumber || '';
      return rollNum.toLowerCase().startsWith('23k8') && b.status === 'paid';
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No paid 23K8 bookings found' });
    }

    // Transform data for export
    const exportData = bookings.map(b => ({
      ticketCode: b.ticketCode || '-',
      studentName: b.studentName || b.applicantName || '-',
      email: b.email || '-',
      phone: b.phone || '-',
      eventName: b.eventId?.name || '-',
      rollNumber: b.rollNumber || '-',
      year: b.year || '-',
      department: b.department || '-',
      section: b.section || '-',
      quantity: b.quantity || 1,
      price: b.price || 0,
      status: b.status || 'pending',
      razorpayPaymentId: b.razorpayPaymentId || '-',
      razorpayOrderId: b.razorpayOrderId || '-',
      createdAt: b.createdAt ? new Date(b.createdAt).toLocaleString() : '-'
    }));

    // Generate CSV
    const fields = [
      'ticketCode', 'studentName', 'email', 'phone', 'eventName',
      'rollNumber', 'year', 'department', 'section', 'quantity',
      'price', 'status', 'razorpayPaymentId', 'razorpayOrderId', 'createdAt'
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(exportData);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=tickets-23k8-paid-${Date.now()}.csv`);
    return res.send(csv);
  } catch (err) {
    console.error('Export 23K8 error:', err);
    res.status(500).json({ error: 'Failed to export 23K8 bookings' });
  }
});

/**
 * GET /api/admin/bookings/export-22k8/csv
 * Export only 22K8 roll number tickets with paid status as CSV
 */
router.get('/export-22k8/csv', async (req, res) => {
  try {
    // Fetch all bookings with event details
    const allBookings = await Ticket.find()
      .sort({ createdAt: -1 })
      .populate('eventId', 'name');

    // Filter for tickets with roll numbers starting with 22K8/22k8 AND paid status
    const bookings = allBookings.filter(b => {
      const rollNum = b.rollNumber || '';
      return rollNum.toLowerCase().startsWith('22k8') && b.status === 'paid';
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No paid 22K8 bookings found' });
    }

    // Transform data for export
    const exportData = bookings.map(b => ({
      ticketCode: b.ticketCode || '-',
      studentName: b.studentName || b.applicantName || '-',
      email: b.email || '-',
      phone: b.phone || '-',
      eventName: b.eventId?.name || '-',
      rollNumber: b.rollNumber || '-',
      year: b.year || '-',
      department: b.department || '-',
      section: b.section || '-',
      quantity: b.quantity || 1,
      price: b.price || 0,
      status: b.status || 'pending',
      razorpayPaymentId: b.razorpayPaymentId || '-',
      razorpayOrderId: b.razorpayOrderId || '-',
      createdAt: b.createdAt ? new Date(b.createdAt).toLocaleString() : '-'
    }));

    // Generate CSV
    const fields = [
      'ticketCode', 'studentName', 'email', 'phone', 'eventName',
      'rollNumber', 'year', 'department', 'section', 'quantity',
      'price', 'status', 'razorpayPaymentId', 'razorpayOrderId', 'createdAt'
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(exportData);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=tickets-22k8-paid-${Date.now()}.csv`);
    return res.send(csv);
  } catch (err) {
    console.error('Export 22K8 error:', err);
    res.status(500).json({ error: 'Failed to export 22K8 bookings' });
  }
});

/**
 * GET /api/admin/bookings/export/:format
 * Export all bookings as CSV, PDF, or DOCX
 * Format can be: csv, pdf, or docx
 */
router.get('/export/:format', async (req, res) => {
  try {
    const { format } = req.params;
    
    if (!['csv', 'pdf', 'docx'].includes(format)) {
      return res.status(400).json({ error: 'Invalid format. Use csv, pdf, or docx' });
    }

    // Fetch all bookings with event details
    const allBookings = await Ticket.find()
      .sort({ createdAt: -1 })
      .populate('eventId', 'name');

    // Filter out tickets with roll numbers starting with 25K8/25k8
    const bookings = allBookings.filter(b => {
      const rollNum = b.rollNumber || '';
      return !rollNum.toLowerCase().startsWith('25k8');
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found' });
    }

    // Transform data for export
    const exportData = bookings.map(b => ({
      ticketCode: b.ticketCode || '-',
      studentName: b.studentName || b.applicantName || '-',
      email: b.email || '-',
      phone: b.phone || '-',
      eventName: b.eventId?.name || '-',
      rollNumber: b.rollNumber || '-',
      year: b.year || '-',
      department: b.department || '-',
      section: b.section || '-',
      quantity: b.quantity || 1,
      price: b.price || 0,
      status: b.status || 'pending',
      razorpayPaymentId: b.razorpayPaymentId || '-',
      razorpayOrderId: b.razorpayOrderId || '-',
      createdAt: b.createdAt ? new Date(b.createdAt).toLocaleString() : '-'
    }));

    if (format === 'csv') {
      // Generate CSV
      const fields = [
        'ticketCode', 'studentName', 'email', 'phone', 'eventName',
        'rollNumber', 'year', 'department', 'section', 'quantity',
        'price', 'status', 'razorpayPaymentId', 'razorpayOrderId', 'createdAt'
      ];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(exportData);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=tickets-${Date.now()}.csv`);
      return res.send(csv);
    }

    if (format === 'pdf') {
      // Generate PDF
      const doc = new PDFDocument({ 
        size: 'A4', 
        layout: 'landscape',
        margin: 30 
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=tickets-${Date.now()}.pdf`);
      doc.pipe(res);

      // Title
      doc.fontSize(20).text('TEDx SMEC - Booking Report', { align: 'center' });
      doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
      doc.moveDown(1);

      // Summary statistics
      const pendingCount = bookings.filter(b => b.status === 'pending').length;
      const paidCount = bookings.filter(b => b.status === 'paid').length;
      const totalRevenue = bookings.filter(b => b.status === 'paid').reduce((sum, b) => sum + (b.price || 0), 0);

      doc.fontSize(12).text(`Total Bookings: ${bookings.length}`, { continued: true });
      doc.text(`  |  Pending: ${pendingCount}`, { continued: true });
      doc.text(`  |  Paid: ${paidCount}`, { continued: true });
      doc.text(`  |  Total Revenue: ₹${totalRevenue}`);
      doc.moveDown(1);

      // Table headers
      doc.fontSize(8);
      const y = doc.y;
      doc.text('Code', 40, y, { width: 60, continued: true });
      doc.text('Name', 100, y, { width: 80, continued: true });
      doc.text('Email', 180, y, { width: 100, continued: true });
      doc.text('Phone', 280, y, { width: 70, continued: true });
      doc.text('Event', 350, y, { width: 80, continued: true });
      doc.text('Qty', 430, y, { width: 30, continued: true });
      doc.text('Price', 460, y, { width: 50, continued: true });
      doc.text('Status', 510, y, { width: 60, continued: true });
      doc.text('Date', 570, y, { width: 150 });
      
      doc.moveDown(0.5);
      doc.moveTo(40, doc.y).lineTo(760, doc.y).stroke();
      doc.moveDown(0.3);

      // Table rows
      exportData.forEach((row, index) => {
        if (doc.y > 520) {
          doc.addPage({ layout: 'landscape' });
          doc.fontSize(8);
        }

        const currentY = doc.y;
        doc.text(row.ticketCode.substring(0, 10), 40, currentY, { width: 60, continued: true });
        doc.text(row.studentName.substring(0, 15), 100, currentY, { width: 80, continued: true });
        doc.text(row.email.substring(0, 20), 180, currentY, { width: 100, continued: true });
        doc.text(row.phone, 280, currentY, { width: 70, continued: true });
        doc.text(row.eventName.substring(0, 15), 350, currentY, { width: 80, continued: true });
        doc.text(String(row.quantity), 430, currentY, { width: 30, continued: true });
        doc.text(`₹${row.price}`, 460, currentY, { width: 50, continued: true });
        doc.text(row.status, 510, currentY, { width: 60, continued: true });
        doc.text(row.createdAt.substring(0, 16), 570, currentY, { width: 150 });
        doc.moveDown(0.8);
      });

      doc.end();
      return;
    }

    if (format === 'docx') {
      // Generate Word document
      const tableRows = [
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ text: 'Ticket Code', bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: 'Name', bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: 'Email', bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: 'Phone', bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: 'Event', bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: 'Qty', bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: 'Price', bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: 'Status', bold: true })] }),
            new TableCell({ children: [new Paragraph({ text: 'Date', bold: true })] })
          ]
        }),
        ...exportData.map(row => new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(row.ticketCode)] }),
            new TableCell({ children: [new Paragraph(row.studentName)] }),
            new TableCell({ children: [new Paragraph(row.email)] }),
            new TableCell({ children: [new Paragraph(row.phone)] }),
            new TableCell({ children: [new Paragraph(row.eventName)] }),
            new TableCell({ children: [new Paragraph(String(row.quantity))] }),
            new TableCell({ children: [new Paragraph(`₹${row.price}`)] }),
            new TableCell({ children: [new Paragraph(row.status)] }),
            new TableCell({ children: [new Paragraph(row.createdAt)] })
          ]
        }))
      ];

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: 'TEDx SMEC - Booking Report',
              heading: 'Heading1',
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({
              text: `Generated on: ${new Date().toLocaleString()}`,
              alignment: AlignmentType.CENTER
            }),
            new Paragraph({ text: '' }),
            new Paragraph({
              children: [
                new TextRun({ text: `Total Bookings: ${bookings.length}  |  `, bold: true }),
                new TextRun({ text: `Pending: ${bookings.filter(b => b.status === 'pending').length}  |  ` }),
                new TextRun({ text: `Paid: ${bookings.filter(b => b.status === 'paid').length}  |  ` }),
                new TextRun({ text: `Revenue: ₹${bookings.filter(b => b.status === 'paid').reduce((sum, b) => sum + (b.price || 0), 0)}` })
              ]
            }),
            new Paragraph({ text: '' }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: tableRows
            })
          ]
        }]
      });

      const buffer = await Packer.toBuffer(doc);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename=tickets-${Date.now()}.docx`);
      return res.send(buffer);
    }

  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ error: 'Failed to export bookings' });
  }
});

module.exports = router;
