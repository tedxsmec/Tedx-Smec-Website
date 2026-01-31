// // // const fs = require("fs");
// // // const path = require("path");
// // // const QRCode = require("qrcode");
// // // const { createCanvas, loadImage } = require("canvas");
// // // const PDFDocument = require("pdfkit");
// // // const nodemailer = require("nodemailer");
// // // const mkdirp = require("mkdirp");

// // // // ✅ CORRECT ENV VARIABLES
// // // const {
// // //   EMAIL_HOST,
// // //   EMAIL_PORT,
// // //   EMAIL_USER,
// // //   EMAIL_PASS,
// // //   FROM_EMAIL,

// // //   TWILIO_ACCOUNT_SID,
// // //   TWILIO_AUTH_TOKEN,
// // //   TWILIO_WHATSAPP_FROM,

// // //   BASE_URL
// // // } = process.env;

// // // // ================= DIRECTORIES =================
// // // const uploadsDir = path.join(__dirname, "..", "uploads", "tickets");
// // // mkdirp.sync(uploadsDir);

// // // // ================= QR =================
// // // async function generateQrDataUrl(text) {
// // //   return QRCode.toDataURL(String(text), {
// // //     errorCorrectionLevel: "M",
// // //     margin: 1,
// // //     width: 400
// // //   });
// // // }

// // // // ================= TICKET IMAGE =================
// // // async function generateTicketImageBuffer(ticket) {
// // //   const w = 1000, h = 600;
// // //   const canvas = createCanvas(w, h);
// // //   const ctx = canvas.getContext("2d");

// // //   // background
// // //   ctx.fillStyle = "#0b0b0b";
// // //   ctx.fillRect(0, 0, w, h);

// // //   // QR panel
// // //   ctx.fillStyle = "#ffffff";
// // //   ctx.fillRect(36, 36, 420, 420);

// // //   const qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
// // //   const qrImg = await loadImage(qrDataUrl);
// // //   ctx.drawImage(qrImg, 60, 60, 372, 372);

// // //   // text
// // //   ctx.fillStyle = "#ffffff";
// // //   ctx.font = "700 36px Sans";
// // //   ctx.fillText("TEDxSMEC", 480, 90);

// // //   ctx.fillStyle = "#ff3b3b";
// // //   ctx.font = "700 28px Sans";
// // //   ctx.fillText(ticket.eventName || "Event", 480, 140);

// // //   ctx.fillStyle = "#ffffff";
// // //   ctx.font = "600 22px Sans";
// // //   ctx.fillText(`Name: ${ticket.studentName}`, 480, 200);

// // //   if (ticket.rollNumber)
// // //     ctx.fillText(`Roll: ${ticket.rollNumber}`, 480, 240);

// // //   const classInfo = [ticket.year, ticket.department, ticket.section]
// // //     .filter(Boolean)
// // //     .join(" / ");
// // //   if (classInfo) ctx.fillText(`Class: ${classInfo}`, 480, 280);

// // //   ctx.font = "500 16px Sans";
// // //   ctx.fillStyle = "#cccccc";
// // //   ctx.fillText(`Code: ${ticket.ticketCode}`, 480, 320);

// // //   ctx.font = "400 14px Sans";
// // //   ctx.fillStyle = "#999999";
// // //   ctx.fillText(
// // //     `Issued: ${new Date(ticket.createdAt || Date.now()).toLocaleString()}`,
// // //     480,
// // //     350
// // //   );

// // //   ctx.font = "400 12px Sans";
// // //   ctx.fillStyle = "#777";
// // //   ctx.fillText("Present this QR at entry", 480, 520);

// // //   const buffer = canvas.toBuffer("image/png");

// // //   const fileName = `${ticket.ticketCode}.png`;
// // //   const filePath = path.join(uploadsDir, fileName);
// // //   fs.writeFileSync(filePath, buffer);

// // //   const publicPath =
// // //     (BASE_URL || "").replace(/\/$/, "") +
// // //     `/uploads/tickets/${fileName}`;

// // //   return { buffer, filePath, publicPath };
// // // }

// // // // ================= PDF =================
// // // async function generatePdfBuffer(ticket) {
// // //   const { buffer: imgBuf } = await generateTicketImageBuffer(ticket);

// // //   return new Promise((resolve) => {
// // //     const doc = new PDFDocument({ size: "A4", margin: 50 });
// // //     const buffers = [];

// // //     doc.on("data", (b) => buffers.push(b));
// // //     doc.on("end", () => resolve(Buffer.concat(buffers)));

// // //     doc.image(imgBuf, { fit: [500, 500], align: "center" });
// // //     doc.moveDown();
// // //     doc.fontSize(12).text(`Name: ${ticket.studentName}`);
// // //     doc.text(`Event: ${ticket.eventName}`);
// // //     doc.text(`Code: ${ticket.ticketCode}`);
// // //     doc.end();
// // //   });
// // // }

// // // // ================= EMAIL =================
// // // async function sendTicketEmail(ticket) {
// // //   if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
// // //     console.warn("SMTP not configured - skipping email send");
// // //     return false;
// // //   }

// // //   const transporter = nodemailer.createTransport({
// // //     host: EMAIL_HOST,
// // //     port: Number(EMAIL_PORT || 587),
// // //     secure: Number(EMAIL_PORT) === 465,
// // //     auth: {
// // //       user: EMAIL_USER,
// // //       pass: EMAIL_PASS
// // //     }
// // //   });

// // //   await transporter.verify();

// // //   const attachments = [];

// // //   try {
// // //     const { filePath } = await generateTicketImageBuffer(ticket);
// // //     attachments.push({
// // //       filename: `${ticket.ticketCode}.png`,
// // //       path: filePath
// // //     });
// // //   } catch (err) {
// // //     console.error("PNG generation failed", err);
// // //   }

// // //   try {
// // //     const pdfBuf = await generatePdfBuffer(ticket);
// // //     attachments.push({
// // //       filename: `${ticket.ticketCode}.pdf`,
// // //       content: pdfBuf
// // //     });
// // //   } catch (err) {
// // //     console.error("PDF generation failed", err);
// // //   }

// // //   const info = await transporter.sendMail({
// // //     from: FROM_EMAIL || `"TEDx SMEC" <${EMAIL_USER}>`,
// // //     to: ticket.email,
// // //     subject: `Your TEDx Ticket — ${ticket.ticketCode}`,
// // //     text: `Hi ${ticket.studentName},

// // // Your ticket is confirmed 🎉
// // // Ticket Code: ${ticket.ticketCode}

// // // Please show the QR code at entry.

// // // — TEDx SMEC`,
// // //     attachments
// // //   });

// // //   console.log("✅ Email sent:", info.messageId);
// // //   return info;
// // // }

// // // // ================= WHATSAPP =================
// // // async function sendWhatsAppMessage(ticket) {
// // //   if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
// // //     console.warn("Twilio not configured - skipping WhatsApp");
// // //     return null;
// // //   }

// // //   try {
// // //     const client = require("twilio")(
// // //       TWILIO_ACCOUNT_SID,
// // //       TWILIO_AUTH_TOKEN
// // //     );

// // //     let phone = ticket.phone.replace(/[^0-9]/g, "");
// // //     if (!phone.startsWith("91")) phone = "91" + phone;

// // //     const to = `whatsapp:+${phone}`;
// // //     const from = TWILIO_WHATSAPP_FROM.startsWith("whatsapp:")
// // //       ? TWILIO_WHATSAPP_FROM
// // //       : `whatsapp:${TWILIO_WHATSAPP_FROM}`;

// // //     const msg = await client.messages.create({
// // //       from,
// // //       to,
// // //       body: `Hi ${ticket.studentName} 👋
// // // Your TEDx ticket is confirmed 🎉
// // // Ticket Code: ${ticket.ticketCode}`
// // //     });

// // //     console.log("✅ WhatsApp sent:", msg.sid);
// // //     return msg;
// // //   } catch (err) {
// // //     console.error("Twilio WhatsApp send failed", err);
// // //     return null;
// // //   }
// // // }

// // // // ================= EXPORTS =================
// // // module.exports = {
// // //   generateQrDataUrl,
// // //   generateTicketImageBuffer,
// // //   generatePdfBuffer,
// // //   sendTicketEmail,
// // //   sendWhatsAppMessage
// // // };



// // const QRCode = require("qrcode");
// // const PDFDocument = require("pdfkit");
// // const nodemailer = require("nodemailer");

// // // ================= ENV =================
// // const {
// //   EMAIL_HOST,
// //   EMAIL_PORT,
// //   EMAIL_USER,
// //   EMAIL_PASS,
// //   FROM_EMAIL,

// //   TWILIO_ACCOUNT_SID,
// //   TWILIO_AUTH_TOKEN,
// //   TWILIO_WHATSAPP_FROM
// // } = process.env;

// // // ================= QR =================
// // async function generateQrDataUrl(text) {
// //   return QRCode.toDataURL(String(text), {
// //     errorCorrectionLevel: "M",
// //     margin: 1,
// //     width: 300
// //   });
// // }

// // // ================= PDF TICKET =================
// // async function generatePdfBuffer(ticket) {
// //   const qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
// //   const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
// //   const qrBuffer = Buffer.from(qrBase64, "base64");

// //   return new Promise((resolve, reject) => {
// //     try {
// //       const doc = new PDFDocument({ size: "A4", margin: 50 });
// //       const buffers = [];

// //       doc.on("data", (b) => buffers.push(b));
// //       doc.on("end", () => resolve(Buffer.concat(buffers)));

// //       // -------- HEADER --------
// //       doc
// //         .fontSize(32)
// //         .fillColor("#000")
// //         .text("TEDxSMEC", { align: "center" });

// //       doc.moveDown(0.5);
// //       doc
// //         .fontSize(16)
// //         .fillColor("#ff3b3b")
// //         .text(ticket.eventName || "Event", { align: "center" });

// //       doc.moveDown(2);

// //       // -------- QR --------
// //       doc.image(qrBuffer, {
// //         fit: [250, 250],
// //         align: "center"
// //       });

// //       doc.moveDown(2);

// //       // -------- DETAILS --------
// //       doc
// //         .fontSize(14)
// //         .fillColor("#000")
// //         .text(`Name: ${ticket.studentName}`);
// //       if (ticket.rollNumber)
// //         doc.text(`Roll Number: ${ticket.rollNumber}`);

// //       const classInfo = [ticket.year, ticket.department, ticket.section]
// //         .filter(Boolean)
// //         .join(" / ");
// //       if (classInfo) doc.text(`Class: ${classInfo}`);

// //       doc.text(`Ticket Code: ${ticket.ticketCode}`);
// //       doc.text(
// //         `Issued: ${new Date(
// //           ticket.createdAt || Date.now()
// //         ).toLocaleString()}`
// //       );

// //       doc.moveDown(2);
// //       doc
// //         .fontSize(12)
// //         .fillColor("gray")
// //         .text("Please present this QR code at the entry.");

// //       doc.end();
// //     } catch (err) {
// //       reject(err);
// //     }
// //   });
// // }

// // // ================= EMAIL =================
// // async function sendTicketEmail(ticket) {
// //   if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
// //     console.warn("⚠️ SMTP not configured - skipping email");
// //     return false;
// //   }

// //   const transporter = nodemailer.createTransport({
// //     host: EMAIL_HOST,
// //     port: Number(EMAIL_PORT || 587),
// //     secure: Number(EMAIL_PORT) === 465,
// //     auth: {
// //       user: EMAIL_USER,
// //       pass: EMAIL_PASS
// //     }
// //   });

// //   await transporter.verify();

// //   const pdfBuffer = await generatePdfBuffer(ticket);

// //   const info = await transporter.sendMail({
// //     from: FROM_EMAIL || `"TEDx SMEC" <${EMAIL_USER}>`,
// //     to: ticket.email,
// //     subject: `Your TEDx Ticket — ${ticket.ticketCode}`,
// //     text: `Hi ${ticket.studentName},

// // Your TEDx ticket is confirmed 🎉

// // Ticket Code: ${ticket.ticketCode}

// // Please find your ticket attached as a PDF.
// // Show the QR code at entry.

// // — TEDx SMEC`,
// //     attachments: [
// //       {
// //         filename: `${ticket.ticketCode}.pdf`,
// //         content: pdfBuffer
// //       }
// //     ]
// //   });

// //   console.log("✅ Email sent:", info.messageId);
// //   return info;
// // }

// // // ================= WHATSAPP =================
// // async function sendWhatsAppMessage(ticket) {
// //   if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
// //     console.warn("⚠️ Twilio not configured - skipping WhatsApp");
// //     return null;
// //   }

// //   try {
// //     const client = require("twilio")(
// //       TWILIO_ACCOUNT_SID,
// //       TWILIO_AUTH_TOKEN
// //     );

// //     let phone = ticket.phone.replace(/[^0-9]/g, "");
// //     if (!phone.startsWith("91")) phone = "91" + phone;

// //     const to = `whatsapp:+${phone}`;
// //     const from = TWILIO_WHATSAPP_FROM.startsWith("whatsapp:")
// //       ? TWILIO_WHATSAPP_FROM
// //       : `whatsapp:${TWILIO_WHATSAPP_FROM}`;

// //     const msg = await client.messages.create({
// //       from,
// //       to,
// //       body: `Hi ${ticket.studentName} 👋

// // Your TEDx ticket is confirmed 🎉
// // Ticket Code: ${ticket.ticketCode}

// // Please bring your PDF ticket or show the QR at entry.

// // — TEDx SMEC`
// //     });

// //     console.log("✅ WhatsApp sent:", msg.sid);
// //     return msg;
// //   } catch (err) {
// //     console.error("❌ WhatsApp send failed", err);
// //     return null;
// //   }
// // }

// // // ================= EXPORTS =================
// // module.exports = {
// //   generateQrDataUrl,
// //   generatePdfBuffer,
// //   sendTicketEmail,
// //   sendWhatsAppMessage
// // };



// const QRCode = require("qrcode");
// const PDFDocument = require("pdfkit");
// const nodemailer = require("nodemailer");

// /* ================= ENV ================= */
// const {
//   EMAIL_HOST,
//   EMAIL_PORT,
//   EMAIL_USER,
//   EMAIL_PASS,
//   FROM_EMAIL,

//   TWILIO_ACCOUNT_SID,
//   TWILIO_AUTH_TOKEN,
//   TWILIO_WHATSAPP_FROM
// } = process.env;

// /* ================= QR ================= */
// async function generateQrDataUrl(text) {
//   return QRCode.toDataURL(String(text), {
//     errorCorrectionLevel: "M",
//     margin: 1,
//     width: 300
//   });
// }

// /* ================= IMAGE TICKET (SKIPPED) ================= */
// /**
//  * Canvas intentionally skipped.
//  * Function kept to avoid runtime errors.
//  */
// async function generateTicketImageBuffer() {
//   console.warn("⚠️ Ticket image generation skipped (canvas not installed)");
//   return null;
// }

// /* ================= PDF TICKET ================= */
// // async function generatePdfBuffer(ticket) {
// //   const qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
// //   const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
// //   const qrBuffer = Buffer.from(qrBase64, "base64");

// //   return new Promise((resolve, reject) => {
// //     try {
// //       const doc = new PDFDocument({ size: "A4", margin: 50 });
// //       const buffers = [];

// //       doc.on("data", (b) => buffers.push(b));
// //       doc.on("end", () => resolve(Buffer.concat(buffers)));

// //       /* Header */
// //       doc
// //         .fontSize(32)
// //         .fillColor("#000")
// //         .text("TEDxSMEC", { align: "center" });

// //       doc.moveDown(0.5);
// //       doc
// //         .fontSize(16)
// //         .fillColor("#ff3b3b")
// //         .text(ticket.eventName || "Event", { align: "center" });

// //       doc.moveDown(2);

// //       /* QR */
// //       doc.image(qrBuffer, { fit: [250, 250], align: "center" });
// //       doc.moveDown(2);

// //       /* Details */
// //       doc.fontSize(14).fillColor("#000");
// //       doc.text(`Name: ${ticket.studentName}`);
// //       if (ticket.rollNumber)
// //         doc.text(`Roll Number: ${ticket.rollNumber}`);

// //       const classInfo = [ticket.year, ticket.department, ticket.section]
// //         .filter(Boolean)
// //         .join(" / ");
// //       if (classInfo) doc.text(`Class: ${classInfo}`);

// //       doc.text(`Ticket Code: ${ticket.ticketCode}`);
// //       doc.text(
// //         `Issued: ${new Date(
// //           ticket.createdAt || Date.now()
// //         ).toLocaleString()}`
// //       );

// //       doc.moveDown(2);
// //       doc
// //         .fontSize(12)
// //         .fillColor("gray")
// //         .text("Please present this QR code at the entry.");

// //       doc.end();
// //     } catch (err) {
// //       reject(err);
// //     }
// //   });
// // }


// /* ================= TEDx PDF TICKET ================= */
// async function generatePdfBuffer(ticket) {
//   const qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
//   const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
//   const qrBuffer = Buffer.from(qrBase64, "base64");

//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ size: "A4", margin: 50 });
//       const buffers = [];

//       doc.on("data", b => buffers.push(b));
//       doc.on("end", () => resolve(Buffer.concat(buffers)));

//       const pageWidth = doc.page.width;
//       const pageStartX = 50;
//       const pageEndX = pageWidth - 50;

//       /* ================= HEADER ================= */
//       doc
//         .font("Helvetica-Bold")
//         .fontSize(36)
//         .fillColor("#E62B1E")
//         .text("TEDxSMEC", { align: "center" });

//       doc
//         .moveDown(0.2)
//         .font("Helvetica")
//         .fontSize(14)
//         .fillColor("#000")
//         .text(ticket.eventName || "Ideas Worth Spreading", {
//           align: "center"
//         });

//       doc.moveDown(1.5);

//       /* ================= DIVIDER ================= */
//       doc
//         .moveTo(pageStartX, doc.y)
//         .lineTo(pageEndX, doc.y)
//         .lineWidth(1)
//         .strokeColor("#E62B1E")
//         .stroke();

//       doc.moveDown(2);

//       /* ================= TWO COLUMN LAYOUT ================= */
//       const leftX = pageStartX;
//       const rightX = pageWidth - 250;
//       const contentY = doc.y;

//       /* ---------- LEFT : PASS DETAILS ---------- */
//       doc
//         .font("Helvetica-Bold")
//         .fontSize(18)
//         .fillColor("#000")
//         .text("ENTRY PASS", leftX, contentY);

//       doc.moveDown(1);

//       doc.fontSize(14).font("Helvetica");

//       function row(label, value) {
//         doc
//           .fillColor("#000")
//           .font("Helvetica-Bold")
//           .text(label, leftX, doc.y, { continued: true });

//         doc
//           .fillColor("#E62B1E")
//           .font("Helvetica")
//           .text(` ${value || "-"}`);

//         doc.moveDown(0.6);
//       }

//       row("Name:", ticket.studentName);
//       if (ticket.rollNumber) row("Roll Number:", ticket.rollNumber);

//       const classInfo = [ticket.year, ticket.department, ticket.section]
//         .filter(Boolean)
//         .join(" / ");
//       if (classInfo) row("Class:", classInfo);

//       if (ticket.quantity && ticket.quantity > 1) {
//         row("Tickets:", `${ticket.quantity} tickets`);
//       }

//       row("Ticket Code:", ticket.ticketCode);

//       row(
//         "Issued On:",
//         new Date(ticket.createdAt || Date.now()).toLocaleString()
//       );

//       /* ---------- RIGHT : QR CODE ---------- */
//       doc.image(qrBuffer, rightX, contentY + 10, {
//         width: 200,
//         height: 200
//       });

//       /* ================= FOOTER ================= */
//       doc.y = Math.max(doc.y, contentY + 220);
//       doc.moveDown(2);

//       doc
//         .moveTo(pageStartX, doc.y)
//         .lineTo(pageEndX, doc.y)
//         .lineWidth(0.5)
//         .strokeColor("#000")
//         .stroke();

//       doc.moveDown(1);

//       doc
//         .fontSize(11)
//         .fillColor("gray")
//         .text(
//           "This ticket is valid for one entry only. Please show this QR code at the venue entrance.",
//           {
//             align: "center",
//             width: pageWidth - 100
//           }
//         );

//       doc.moveDown(0.5);

//       doc
//         .fontSize(10)
//         .fillColor("#E62B1E")
//         .text("© TEDxSMEC • This is an independently organized TEDx event", {
//           align: "center"
//         });

//       doc.end();
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

// /* ================= EMAIL ================= */
// async function sendTicketEmail(ticket) {
//   if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
//     console.warn("⚠️ SMTP not configured - skipping email");
//     return false;
//   }

//   const transporter = nodemailer.createTransport({
//     host: EMAIL_HOST,
//     port: Number(EMAIL_PORT || 587),
//     secure: Number(EMAIL_PORT) === 465,
//     auth: {
//       user: EMAIL_USER,
//       pass: EMAIL_PASS
//     }
//   });

//   await transporter.verify();

//   const pdfBuffer = await generatePdfBuffer(ticket);

//   const info = await transporter.sendMail({
//     from: FROM_EMAIL || `"TEDx SMEC" <${EMAIL_USER}>`,
//     to: ticket.email,
//     subject: `Your TEDx Ticket — ${ticket.ticketCode}`,
//     text: `Hi ${ticket.studentName},

// Your TEDx ticket is confirmed 🎉
// Ticket Code: ${ticket.ticketCode}

// Please find your ticket attached as a PDF.
// Show the QR code at entry.

// — TEDx SMEC`,
//     attachments: [
//       {
//         filename: `${ticket.ticketCode}.pdf`,
//         content: pdfBuffer
//       }
//     ]
//   });

//   console.log("✅ Email sent:", info.messageId);
//   return info;
// }

// /* ================= WHATSAPP ================= */
// async function sendWhatsAppMessage(ticket) {
//   if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) {
//     console.warn("⚠️ Twilio not configured - skipping WhatsApp");
//     return null;
//   }

//   try {
//     const client = require("twilio")(
//       TWILIO_ACCOUNT_SID,
//       TWILIO_AUTH_TOKEN
//     );

//     let phone = ticket.phone.replace(/[^0-9]/g, "");
//     if (!phone.startsWith("91")) phone = "91" + phone;

//     const to = `whatsapp:+${phone}`;
//     const from = TWILIO_WHATSAPP_FROM.startsWith("whatsapp:")
//       ? TWILIO_WHATSAPP_FROM
//       : `whatsapp:${TWILIO_WHATSAPP_FROM}`;

//     const msg = await client.messages.create({
//       from,
//       to,
//       body: `Hi ${ticket.studentName} 👋

// Your TEDx ticket is confirmed 🎉
// Ticket Code: ${ticket.ticketCode}

// Please bring your PDF ticket or show the QR at entry.

// — TEDx SMEC`
//     });

//     console.log("✅ WhatsApp sent:", msg.sid);
//     return msg;
//   } catch (err) {
//     console.error("❌ WhatsApp send failed", err);
//     return null;
//   }
// }

// /* ================= EXPORTS ================= */
// module.exports = {
//   generateQrDataUrl,
//   generateTicketImageBuffer,
//   generatePdfBuffer,
//   sendTicketEmail,
//   sendWhatsAppMessage
// };


const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
const SibApiV3Sdk = require("sib-api-v3-sdk");

/* ================= ENV ================= */
const {
  BREVO_API_KEY,
  BREVO_SENDER_NAME,
  BREVO_SENDER_EMAIL,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM
} = process.env;

/* ================= BREVO ================= */
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = BREVO_API_KEY;
const brevo = new SibApiV3Sdk.TransactionalEmailsApi();

/* ================= QR ================= */
async function generateQrDataUrl(text) {
  return QRCode.toDataURL(String(text), {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 300
  });
}

/* ================= IMAGE TICKET ================= */
async function generateTicketImageBuffer() {
  console.warn("⚠️ Ticket image generation skipped (canvas not installed)");
  return null;
}

/* ================= PDF (UNCHANGED DESIGN) ================= */
async function generatePdfBuffer(ticket) {
  const qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
  const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(qrBase64, "base64");

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffers = [];

      doc.on("data", b => buffers.push(b));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      const pageWidth = doc.page.width;
      const pageStartX = 50;
      const pageEndX = pageWidth - 50;

      doc.font("Helvetica-Bold").fontSize(36).fillColor("#E62B1E").text("TEDxSMEC", { align: "center" });
      doc.moveDown(0.2).font("Helvetica").fontSize(14).fillColor("#000")
        .text(ticket.eventName || "Ideas Worth Spreading", { align: "center" });

      doc.moveDown(1.5);
      doc.moveTo(pageStartX, doc.y).lineTo(pageEndX, doc.y).strokeColor("#E62B1E").stroke();
      doc.moveDown(2);

      const leftX = pageStartX;
      const rightX = pageWidth - 250;
      const contentY = doc.y;

      doc.font("Helvetica-Bold").fontSize(18).text("ENTRY PASS", leftX, contentY);
      doc.moveDown(1);

      function row(label, value) {
        doc.font("Helvetica-Bold").fillColor("#000").text(label, leftX, doc.y, { continued: true });
        doc.font("Helvetica").fillColor("#E62B1E").text(` ${value || "-"}`);
        doc.moveDown(0.6);
      }

      row("Name:", ticket.studentName);
      if (ticket.rollNumber) row("Roll Number:", ticket.rollNumber);
      const classInfo = [ticket.year, ticket.department, ticket.section].filter(Boolean).join(" / ");
      if (classInfo) row("Class:", classInfo);
      if (ticket.quantity > 1) row("Tickets:", ticket.quantity);
      row("Ticket Code:", ticket.ticketCode);
      row("Issued On:", new Date(ticket.createdAt || Date.now()).toLocaleString());

      doc.image(qrBuffer, rightX, contentY + 10, { width: 200, height: 200 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

/* ================= EMAIL (BREVO) ================= */
async function sendTicketEmail(ticket) {
  try {
    const pdfBuffer = await generatePdfBuffer(ticket);
    const pdfBase64 = pdfBuffer.toString("base64");

    const data = await brevo.sendTransacEmail({
      sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
      to: [{ email: ticket.email }],
      subject: `🎟 Your TEDx Ticket — ${ticket.ticketCode}`,
      htmlContent: `
        <h2>Hello ${ticket.studentName} 👋</h2>
        <p>Your TEDxSMEC ticket is confirmed 🎉</p>
        <p><b>Ticket Code:</b> ${ticket.ticketCode}</p>
        <p>Your PDF ticket is attached.</p>
        <p>— TEDxSMEC Team</p>
      `,
      attachment: [
        {
          content: pdfBase64,
          name: `${ticket.ticketCode}.pdf`
        }
      ]
    });

    console.log("✅ Brevo Email Sent:", data.messageId);
    return data;
  } catch (err) {
    console.error("❌ Brevo Email Failed:", err);
    throw err;
  }
}

/* ================= WHATSAPP (UNCHANGED) ================= */
async function sendWhatsAppMessage(ticket) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_FROM) return null;

  try {
    const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    let phone = ticket.phone.replace(/[^0-9]/g, "");
    if (!phone.startsWith("91")) phone = "91" + phone;

    return await client.messages.create({
      from: TWILIO_WHATSAPP_FROM,
      to: `whatsapp:+${phone}`,
      body: `Hi ${ticket.studentName} 👋\n\nYour TEDx ticket is confirmed 🎉\nTicket Code: ${ticket.ticketCode}\n\n— TEDxSMEC`
    });
  } catch (err) {
    console.error("❌ WhatsApp Error:", err);
    return null;
  }
}

/* ================= EXPORTS ================= */
module.exports = {
  generateQrDataUrl,
  generateTicketImageBuffer,
  generatePdfBuffer,
  sendTicketEmail,
  sendWhatsAppMessage
};
