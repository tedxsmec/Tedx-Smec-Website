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

/* ================= PDF (PREMIUM DESIGN) ================= */
async function generatePdfBuffer(ticket) {
  const qrDataUrl = await generateQrDataUrl(ticket.ticketCode);
  const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
  const qrBuffer = Buffer.from(qrBase64, "base64");

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margins: { top: 0, bottom: 0, left: 0, right: 0 } });
      const buffers = [];
      doc.on("data", b => buffers.push(b));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      const W = doc.page.width;
      const H = doc.page.height;
      const THEME = { primary: "#E62B1E", black: "#111111", gray: "#777777" };

      /* ===== HEADER (PREMIUM GRADIENT) ===== */
      const headerGradient = doc.linearGradient(0, 0, W, 110);
      headerGradient.stop(0, "#E62B1E").stop(1, "#B81B15");
      doc.rect(0, 0, W, 110).fill(headerGradient);

      // Decorative top accent
      doc.rect(0, 0, W, 3).fill("#000000");

      // TEDx Logo
      doc
        .font("Helvetica-Bold")
        .fontSize(40)
        .fillColor("#FFFFFF")
        .text("TEDx", 60, 25, { continued: true })
        .fontSize(36)
        .fillColor("#000000")
        .text("SMEC");

      // Tagline
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#FFFFFF")
        .opacity(0.95)
        .text("IDEAS WORTH SPREADING", 60, 72, { letterSpacing: 2.5 });

      // College name
      doc
        .fontSize(8)
        .fillColor("#FFFFFF")
        .opacity(0.85)
        .text("St. Martin's Engineering College", 60, 90);
      doc.opacity(1);

      /* ===== CONTENT GRID ===== */
      const startY = 135;
      let y = startY;

      // Section title
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(THEME.primary)
        .text("TICKET INFORMATION", 60, startY - 15, { letterSpacing: 1.5 });

      const field = (label, value) => {
        doc
          .font("Helvetica")
          .fontSize(7.5)
          .fillColor("#999999")
          .text(label.toUpperCase(), 60, y, { letterSpacing: 1.5 });
        y += 11;
        doc
          .font("Helvetica-Bold")
          .fontSize(14)
          .fillColor(THEME.black)
          .text(value || "-", 60, y, { width: W - 340 });
        y += 28;
      };

      field("Attendee", ticket.studentName);
      if (ticket.rollNumber) field("Roll Number", ticket.rollNumber);
      const classInfo = [ticket.year, ticket.department, ticket.section].filter(Boolean).join(" • ");
      if (classInfo) field("Academic Details", classInfo);
      field("Ticket Code", ticket.ticketCode);

      /* ===== QR BLOCK (PREMIUM) ===== */
      const qrBoxX = W - 260;
      const qrBoxY = startY + 10;

      // QR container
      doc
        .rect(qrBoxX - 8, qrBoxY - 8, 176, 176)
        .lineWidth(3)
        .strokeColor(THEME.primary)
        .stroke();

      // QR background
      doc.rect(qrBoxX - 4, qrBoxY - 4, 168, 168).fill("#f9f9f9");

      // QR header
      doc
        .font("Helvetica-Bold")
        .fontSize(8)
        .fillColor("#FFFFFF")
        .text("SCAN", qrBoxX - 4, qrBoxY - 20, { width: 168, align: "center" });

      doc.image(qrBuffer, qrBoxX, qrBoxY, { width: 140 });

      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor(THEME.gray)
        .text("Present at entry", qrBoxX - 4, qrBoxY + 152, { width: 168, align: "center" });

      /* ===== FOOTER ===== */
      y += 20;
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(THEME.primary)
        .text(
          "✓ Single Entry • Non-Transferable • Valid for General Admission",
          60,
          y,
          { width: W - 340, align: "center" }
        );

      // Footer bar
      doc.rect(0, H - 35, W, 35).fill("#1a1a1a");
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor(THEME.primary)
        .text("Ideas Worth Spreading", 60, H - 24, { letterSpacing: 1 });

      doc
        .font("Helvetica")
        .fontSize(7)
        .fillColor("#888888")
        .text(
          `Issued: ${ticket.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}`,
          W - 200,
          H - 24
        );

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
      subject: `Your TEDxSMEC Ticket – ${ticket.ticketCode}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
          </style>
        </head>
        <body style="margin:0;padding:0;background:#f5f5f5;">
          <div style="max-width:600px;margin:0 auto;">
            <!-- RED HEADER -->
            <div style="background:linear-gradient(135deg, #E62B1E 0%, #B81B15 100%);padding:50px 40px;color:#fff;text-align:center;">
              <h1 style="margin:0;font-size:48px;font-weight:900;letter-spacing:-1px;">
                TEDx<span style="font-weight:300;">SMEC</span>
              </h1>
              <p style="margin:12px 0 0 0;font-size:11px;letter-spacing:3px;font-weight:600;opacity:0.9;">
                IDEAS WORTH SPREADING
              </p>
            </div>

            <!-- MAIN CONTENT -->
            <div style="background:#ffffff;padding:50px 40px;">
              <p style="margin:0 0 30px 0;font-size:16px;line-height:1.6;color:#333;">
                Hello <span style="color:#E62B1E;font-weight:700;">${ticket.studentName}</span>,
              </p>

              <!-- CONFIRMATION BOX -->
              <div style="background:linear-gradient(135deg, #E62B1E15 0%, #E62B1E08 100%);border-left:5px solid #E62B1E;padding:25px;margin:0 0 35px 0;border-radius:6px;">
                <p style="margin:0;font-size:16px;font-weight:700;color:#E62B1E;">
                  ✓ Your Ticket is Confirmed
                </p>
                <p style="margin:10px 0 0 0;font-size:14px;color:#555;line-height:1.6;">
                  You're all set for an inspiring evening of ideas, innovation, and connection at <strong>TEDxSMEC 2026</strong>.
                </p>
              </div>

              <!-- TICKET DETAILS -->
              <div style="background:#f9f9f9;border:1px solid #e0e0e0;border-radius:8px;padding:30px;margin:0 0 35px 0;">
                <p style="margin:0 0 20px 0;font-size:10px;color:#E62B1E;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid #E62B1E;padding-bottom:12px;">
                  📋 YOUR TICKET DETAILS
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:0;">
                  <tr>
                    <td style="padding:12px 0;width:50%;">
                      <p style="margin:0 0 6px 0;font-size:9px;color:#999;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Ticket Code</p>
                      <p style="margin:0;font-size:16px;color:#E62B1E;font-weight:800;">${ticket.ticketCode}</p>
                    </td>
                    <td style="padding:12px 0 12px 20px;width:50%;">
                      <p style="margin:0 0 6px 0;font-size:9px;color:#999;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Student</p>
                      <p style="margin:0;font-size:16px;color:#E62B1E;font-weight:800;">${ticket.rollNumber || 'N/A'}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="padding:16px 0;border-top:1px solid #e0e0e0;">
                      <p style="margin:0 0 6px 0;font-size:9px;color:#999;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Academic Year</p>
                      <p style="margin:0;font-size:16px;color:#E62B1E;font-weight:800;">${ticket.year || 'N/A'}</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- INSTRUCTIONS -->
              <div>
                <p style="margin:0 0 16px 0;font-size:12px;color:#E62B1E;font-weight:700;letter-spacing:1px;text-transform:uppercase;">🎯 BEFORE YOU ARRIVE</p>
                <ul style="margin:0;padding:0 0 0 20px;list-style:none;">
                  <li style="margin:0 0 12px 0;font-size:14px;color:#555;line-height:1.6;">
                    <span style="color:#E62B1E;font-weight:700;margin-right:8px;">✓</span>Print or screenshot your ticket PDF
                  </li>
                  <li style="margin:0 0 12px 0;font-size:14px;color:#555;line-height:1.6;">
                    <span style="color:#E62B1E;font-weight:700;margin-right:8px;">✓</span>Arrive 30 minutes early for smooth check-in
                  </li>
                  <li style="font-size:14px;color:#555;line-height:1.6;">
                    <span style="color:#E62B1E;font-weight:700;margin-right:8px;">✓</span>Keep your ticket accessible
                  </li>
                </ul>
              </div>

              <!-- DIVIDER -->
              <hr style="border:none;border-top:1px solid #e0e0e0;margin:35px 0;">

              <!-- CLOSING -->
              <p style="margin:0 0 20px 0;font-size:14px;color:#666;line-height:1.6;">
                Questions? <strong style="color:#E62B1E;">Reply to this email</strong> and we'll help.
              </p>

              <p style="margin:0;font-size:14px;color:#888;">
                Get ready for ideas worth spreading! 🚀
              </p>
            </div>

            <!-- RED FOOTER -->
            <div style="background:#1a1a1a;color:#999;padding:30px 40px;text-align:center;border-top:4px solid #E62B1E;">
              <p style="margin:0 0 8px 0;font-size:12px;font-weight:600;letter-spacing:1px;color:#E62B1E;text-transform:uppercase;">
                TEDxSMEC
              </p>
              <p style="margin:0;font-size:11px;color:#888;">
                St. Martin's Engineering College • Ideas Worth Spreading
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachment: [
        {
          content: pdfBase64,
          name: `TEDxSMEC_Ticket_${ticket.ticketCode}.pdf`
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
