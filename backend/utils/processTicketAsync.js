// const Ticket = require("../models/Ticket");
// const {
//   generateQrDataUrl,
//   generatePdfBuffer,
//   sendTicketEmail,
//   sendWhatsAppMessage
// } = require("./ticketUtils");
// const uploadToCloudinary = require("./uploadToCloudinary");

// async function processTicketAsync(ticketId) {
//   try {
//     const ticket = await Ticket.findById(ticketId);
//     if (!ticket) return;

//     console.log("🔄 Processing ticket:", ticket.ticketCode);

//     // QR
//     ticket.qrDataUrl = await generateQrDataUrl(ticket.ticketCode);

//     // PDF
//     const pdfBuffer = await generatePdfBuffer(ticket);
//     const pdfUpload = await uploadToCloudinary(
//       pdfBuffer,
//       "tedxsmec/tickets/pdfs",
//       "raw"
//     );

//     ticket.pdfUrl = pdfUpload.secure_url;
//     ticket.pdfTicketBase64 = pdfBuffer.toString("base64");

//     await ticket.save();

//     // Notifications
//     await sendTicketEmail(ticket);
//     await sendWhatsAppMessage(ticket);

//     console.log("✅ Ticket completed:", ticket.ticketCode);
//   } catch (err) {
//     console.error("❌ Background processing failed:", err);
//   }
// }

// module.exports = processTicketAsync;


const Ticket = require("../models/Ticket");
const {
  generateQrDataUrl,
  generatePdfBuffer,
  sendTicketEmail,
  sendWhatsAppMessage
} = require("./ticketUtils");
const uploadToCloudinary = require("./uploadToCloudinary");

async function processTicketAsync(ticketId) {
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return;

    console.log("Processing:", ticket.ticketCode);

    // QR
    ticket.qrDataUrl = await generateQrDataUrl(ticket.ticketCode);

    // PDF
    const pdfBuffer = await generatePdfBuffer(ticket);
    const pdfUpload = await uploadToCloudinary(
      pdfBuffer,
      "tedxsmec/tickets/pdfs",
      "raw"
    );

    ticket.pdfUrl = pdfUpload.secure_url;
    ticket.pdfTicketBase64 = pdfBuffer.toString("base64");

    await ticket.save();   // <-- SAVE FIRST

    // Now send using saved ticket
    await sendTicketEmail(ticket);
    await sendWhatsAppMessage(ticket);

    console.log("Done:", ticket.ticketCode);
  } catch (err) {
    console.error("Background failed:", err);
  }
}

module.exports = processTicketAsync;
