// backend/routes/webhook.js
const express = require('express');
const crypto = require('crypto');
const Ticket = require('../models/Ticket');
const { generateQrDataUrl, generateTicketImageBuffer, generatePdfBuffer, sendTicketEmail, sendWhatsAppMessage } = require('../utils/ticketUtils');

const router = express.Router();

// NOTE: server.js already mounts this with express.raw({ type: 'application/json' })
router.post('/', async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers['x-razorpay-signature'];
    const body = req.body; // because express.raw was used in server.js the body here is raw buffer; make sure server.js saved raw body on req.rawBody if needed

    // If server.js used: app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), webhookRouter);
    // then req.body is raw buffer; we must compute signature from the raw string
    const raw = req.rawBody || req.body;
    const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
    if (signature !== expected) {
      console.warn('Invalid webhook signature');
      return res.status(400).send('invalid signature');
    }

    const payload = typeof raw === 'string' ? JSON.parse(raw) : payload = JSON.parse(raw.toString());
    // handle only payment.captured events
    if (payload.event !== 'payment.captured') {
      return res.json({ ok: true });
    }

    const payment = payload.payload.payment.entity;
    const razorpayOrderId = payment.order_id;
    const razorpayPaymentId = payment.id;

    const ticket = await Ticket.findOne({ razorpayOrderId });
    if (!ticket) {
      console.warn('Webhook: ticket not found for order:', razorpayOrderId);
      return res.json({ ok: true });
    }

    // finalize ticket
    ticket.status = 'paid';
    ticket.razorpayPaymentId = razorpayPaymentId;

    // generate assets
    try {
      ticket.qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
      const { filePath } = await generateTicketImageBuffer(ticket);
      ticket.imagePath = `/uploads/tickets/${path.basename(filePath)}`;
      const pdfBuf = await generatePdfBuffer(ticket);
      ticket.pdfTicketBase64 = pdfBuf.toString('base64');
      await ticket.save();

      await sendTicketEmail(ticket);
      await sendWhatsAppMessage(ticket);
    } catch (err) {
      console.error('Webhook asset/email error', err);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Webhook handler error', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
