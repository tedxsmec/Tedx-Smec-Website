// // import React, { useState, useEffect } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import { api } from "../api";

// // /* ================= UTILITIES ================= */

// // /* Razorpay SDK Loader */
// // function loadRazorpayScript() {
// //   return new Promise((resolve, reject) => {
// //     if (window.Razorpay) return resolve(true);
// //     const script = document.createElement("script");
// //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
// //     script.async = true;
// //     script.onload = () => resolve(true);
// //     script.onerror = () => reject("Failed to load Razorpay SDK");
// //     document.body.appendChild(script);
// //   });
// // }

// // /* Format currency to INR */
// // function formatINR(amount) {
// //   return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
// // }

// // /* ================= MAIN COMPONENT ================= */

// // export default function BookingForm() {
// //   const { slug } = useParams();

// //   const [event, setEvent] = useState(null);
// //   const [loadingEvent, setLoadingEvent] = useState(true);

// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     tickets: 1,
// //     rollNumber: "",
// //     year: "",
// //     department: "",
// //     section: "",
// //     note: "",
// //   });

// //   const [submitting, setSubmitting] = useState(false);
// //   const [message, setMessage] = useState(null);
// //   const [ticket, setTicket] = useState(null);
// //   const [orderInfo, setOrderInfo] = useState(null);

// //   /* ================= LOAD EVENT ================= */
// //   useEffect(() => {
// //     let mounted = true;
// //     const loadEvent = async () => {
// //       try {
// //         const res = await api.get(`/events/${encodeURIComponent(slug)}`);
// //         const data = res?.data?.data || res.data;
// //         if (mounted) setEvent(data);
// //       } catch (err) {
// //         console.error("Event load error", err);
// //         if (mounted) setEvent(null);
// //       } finally {
// //         if (mounted) setLoadingEvent(false);
// //       }
// //     };
// //     loadEvent();
// //     return () => (mounted = false);
// //   }, [slug]);

// //   /* ================= FORM HANDLER ================= */
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((p) => ({
// //       ...p,
// //       [name]: name === "tickets" ? Math.max(1, Number(value)) : value,
// //     }));
// //   };

// //   /* Calculate total amount */
// //   const totalAmount = (event?.price || 0) * (form.tickets || 1);

// //   /* ================= RAZORPAY CHECKOUT ================= */
// //   async function startCheckout(order) {
// //     await loadRazorpayScript();

// //     const options = {
// //       key: order.razorpayKey,
// //       amount: order.amount,
// //       currency: order.currency,
// //       name: event.name,
// //       description: `${form.tickets} Ticket(s) for ${event.name}`,
// //       order_id: order.orderId,

// //       handler: async (response) => {
// //         try {
// //           setMessage({ type: "info", text: "Verifying payment..." });

// //           const verifyRes = await api.post("/book/verify", {
// //             razorpay_order_id: response.razorpay_order_id,
// //             razorpay_payment_id: response.razorpay_payment_id,
// //             razorpay_signature: response.razorpay_signature,
// //             ticketId: order.ticketId,
// //           });

// //           const ticketObj = verifyRes?.data?.data || verifyRes.data;
// //           setTicket(ticketObj);
// //           setMessage({ type: "success", text: "Payment verified successfully! Your ticket is ready." });
// //         } catch (err) {
// //           console.error("Verify error", err);
// //           setMessage({ type: "error", text: "Payment verification failed. Please contact support." });
// //         } finally {
// //           setSubmitting(false);
// //         }
// //       },

// //       modal: {
// //         ondismiss: () => {
// //           // User closed the payment modal without completing payment
// //           setMessage({ type: "error", text: "Payment cancelled. Please try again." });
// //           setSubmitting(false);
// //         }
// //       },

// //       prefill: {
// //         name: form.name,
// //         email: form.email,
// //         contact: form.phone,
// //       },
// //     };

// //     const rzp = new window.Razorpay(options);
// //     rzp.open();
// //   }

// //   /* ================= FORM SUBMIT ================= */
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (
// //       !form.name ||
// //       !form.email ||
// //       !form.rollNumber ||
// //       !form.year ||
// //       !form.department ||
// //       !form.section
// //     ) {
// //       setMessage({
// //         type: "error",
// //         text: "Please fill all required student details.",
// //       });
// //       return;
// //     }

// //     setSubmitting(true);
// //     setMessage(null);
// //     setTicket(null);

// //     try {
// //       const payload = {
// //         eventId: event._id,
// //         studentName: form.name,
// //         email: form.email,
// //         phone: form.phone,
// //         rollNumber: form.rollNumber,
// //         year: form.year,
// //         department: form.department,
// //         section: form.section,
// //         quantity: form.tickets,
// //       };

// //       const res = await api.post("/book", payload);
// //       const data = res.data;

// //       setOrderInfo(data);

// //       // FREE EVENT - no payment needed
// //       if (!data.orderId) {
// //         setMessage({ type: "success", text: "Ticket booked successfully!" });
// //         setTicket(data);
// //         setSubmitting(false);
// //         return;
// //       }

// //       // PAID EVENT - start checkout
// //       await startCheckout(data);
// //     } catch (err) {
// //       console.error("Submit error", err);
// //       setMessage({ type: "error", text: "Booking failed. Please try again." });
// //       setSubmitting(false);
// //     }
// //   };

// //   /* ================= PDF DOWNLOAD ================= */
// //   function downloadPdf(base64, filename) {
// //     if (!base64) return;
// //     const link = document.createElement("a");
// //     link.href = base64.startsWith("data:") ? base64 : `data:application/pdf;base64,${base64}`;
// //     link.download = filename;
// //     link.click();
// //   }

// //   /* ================= UI RENDER ================= */
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white py-10 px-4">
// //       <div className="max-w-4xl mx-auto">

// //         <h1 className="text-3xl md:text-4xl font-bold text-center text-red-500 mb-8">
// //           Book Your Seat
// //         </h1>

// //         {/* LOADING STATE */}
// //         {loadingEvent ? (
// //           <Card>
// //             <div className="text-center text-gray-400">Loading event details...</div>
// //           </Card>
// //         ) : !event ? (
// //           /* NOT FOUND STATE */
// //           <Card className="bg-red-900/40 border-red-600">
// //             <div className="text-center">
// //               <p className="mb-4">Event not found</p>
// //               <Link to="/events" className="text-red-400 hover:text-red-300 underline">
// //                 ← Back to Events
// //               </Link>
// //             </div>
// //           </Card>
// //         ) : (
// //           <>
// //             {/* EVENT SUMMARY */}
// //             <Card className="mb-6">
// //               <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
// //               <p className="text-sm text-gray-400 mb-3">
// //                 {event.date ? new Date(event.date).toLocaleString() : "Date TBA"}
// //               </p>
// //               {/* <p className="text-gray-300">{event.description}</p> */}
// //             </Card>

// //             {/* MESSAGES */}
// //             {message && (
// //               <Card
// //                 className={`mb-6 ${
// //                   message.type === "error"
// //                     ? "bg-red-900/40 border-red-600"
// //                     : message.type === "success"
// //                     ? "bg-green-900/40 border-green-600"
// //                     : "bg-yellow-900/40 border-yellow-600"
// //                 }`}
// //               >
// //                 {message.text}
// //               </Card>
// //             )}

// //             {/* TICKET DISPLAY OR FORM */}
// //             {!ticket ? (
// //               /* BOOKING FORM */
// //               <form onSubmit={handleSubmit} className="space-y-6">

// //                 {/* PERSONAL INFORMATION */}
// //                 <Section title="Personal Information">
// //                   <Input
// //                     label="Full Name"
// //                     name="name"
// //                     required
// //                     value={form.name}
// //                     onChange={handleChange}
// //                   />
// //                   <Input
// //                     label="Email"
// //                     type="email"
// //                     name="email"
// //                     required
// //                     value={form.email}
// //                     onChange={handleChange}
// //                   />
// //                   <Input
// //                     label="Phone"
// //                     name="phone"
// //                     value={form.phone}
// //                     onChange={handleChange}
// //                   />
// //                 </Section>

// //                 {/* STUDENT INFORMATION */}
// //                 <Section title="Student Information">
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                     <Input
// //                       label="Roll Number"
// //                       name="rollNumber"
// //                       required
// //                       value={form.rollNumber}
// //                       onChange={handleChange}
// //                     />
// //                     <div>
// //                       <label className="block text-sm text-gray-400 mb-1">
// //                         Year <span className="text-red-500">*</span>
// //                       </label>
// //                       <select
// //                         name="year"
// //                         required
// //                         value={form.year}
// //                         onChange={handleChange}
// //                         className="w-full h-12 px-4 bg-black border border-neutral-700 rounded-xl focus:ring-2 focus:ring-red-500"
// //                       >
// //                         <option value="">Select Year</option>
// //                         <option value="1st">1st Year</option>
// //                         <option value="2nd">2nd Year</option>
// //                         <option value="3rd">3rd Year</option>
// //                         <option value="4th">4th Year</option>
// //                       </select>
// //                     </div>
// //                     <Input
// //                       label="Department"
// //                       name="department"
// //                       required
// //                       value={form.department}
// //                       onChange={handleChange}
// //                     />
// //                     <Input
// //                       label="Section"
// //                       name="section"
// //                       required
// //                       value={form.section}
// //                       onChange={handleChange}
// //                     />
// //                   </div>
// //                 </Section>

// //                 {/* TICKET QUANTITY */}
// //                 <Section title="Ticket Details">
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="block text-sm text-gray-400 mb-1">
// //                         Number of Tickets <span className="text-red-500">*</span>
// //                       </label>
// //                       <input
// //                         type="number"
// //                         name="tickets"
// //                         min="1"
// //                         required
// //                         value={form.tickets}
// //                         onChange={handleChange}
// //                         className="w-full h-12 px-4 bg-black border border-neutral-700 rounded-xl focus:ring-2 focus:ring-red-500"
// //                       />
// //                     </div>
// //                     <div className="flex flex-col justify-end">
// //                       <p className="text-sm text-gray-400 mb-1">Total Price</p>
// //                       <p className="text-3xl font-bold text-red-500">{formatINR(totalAmount)}</p>
// //                     </div>
// //                   </div>
// //                   {event.price > 0 && (
// //                     <p className="text-sm text-gray-400 mt-2">
// //                       Price per ticket: {formatINR(event.price)}
// //                     </p>
// //                   )}
// //                 </Section>

// //                 {/* STATUS MESSAGE NEAR BUTTON */}
// //                 {message && (
// //                   <div
// //                     className={`p-4 rounded-xl text-center font-medium ${
// //                       message.type === "error"
// //                         ? "bg-red-900/40 border border-red-600 text-red-200"
// //                         : message.type === "success"
// //                         ? "bg-green-900/40 border border-green-600 text-green-200"
// //                         : "bg-yellow-900/40 border border-yellow-600 text-yellow-200"
// //                     }`}
// //                   >
// //                     {message.text}
// //                   </div>
// //                 )}

// //                 {/* SUBMIT BUTTON */}
// //                 <button
// //                   type="submit"
// //                   disabled={submitting}
// //                   className="w-full py-4 rounded-xl text-lg font-semibold bg-red-600 hover:bg-red-500 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
// //                 >
// //                   {submitting
// //                     ? "Processing..."
// //                     : event.price > 0
// //                     ? `Pay ${formatINR(totalAmount)} & Book`
// //                     : "Book Tickets (Free)"}
// //                 </button>

// //                 {/* HELPER TEXT BELOW BUTTON */}
// //                 <p className="text-center text-xs text-gray-500 mt-2">
// //                   {submitting 
// //                     ? "Please wait while we process your booking..."
// //                     : "By booking, you agree to our terms and conditions"}
// //                 </p>

// //               </form>
// //             ) : (
// //               /* TICKET DISPLAY */
// //               <Card className="bg-gradient-to-br from-green-900/30 to-black border-green-600">
// //                 <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
// //                   ✓ Booking Confirmed!
// //                 </h2>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //                   {/* QR CODE */}
// //                   <div className="flex flex-col items-center justify-center">
// //                     {ticket.qrDataUrl && (
// //                       <>
// //                         <p className="text-sm text-gray-400 mb-2">Scan to Enter</p>
// //                         <img
// //                           src={ticket.qrDataUrl}
// //                           alt="Ticket QR"
// //                           className="w-48 h-48 bg-white p-3 rounded-lg border-2 border-green-600"
// //                         />
// //                       </>
// //                     )}
// //                   </div>

// //                   {/* TICKET DETAILS */}
// //                   <div className="space-y-4">
// //                     <div>
// //                       <p className="text-gray-400 text-sm">Ticket Code</p>
// //                       <p className="text-xl font-bold text-white font-mono">{ticket.ticketCode}</p>
// //                     </div>

// //                     <div>
// //                       <p className="text-gray-400 text-sm">Name</p>
// //                       <p className="text-lg font-semibold text-white">{ticket.studentName}</p>
// //                     </div>

// //                     <div>
// //                       <p className="text-gray-400 text-sm">Event</p>
// //                       <p className="text-lg font-semibold text-white">{event.name}</p>
// //                     </div>

// //                     {ticket.quantity && ticket.quantity > 1 && (
// //                       <div>
// //                         <p className="text-gray-400 text-sm">Number of Tickets</p>
// //                         <p className="text-lg font-semibold text-white">{ticket.quantity} tickets</p>
// //                       </div>
// //                     )}

// //                     <div>
// //                       <p className="text-gray-400 text-sm">Roll Number</p>
// //                       <p className="text-lg font-semibold text-white">{ticket.rollNumber}</p>
// //                     </div>

// //                     <div className="pt-4 border-t border-gray-700">
// //                       <p className="text-gray-400 text-sm mb-2">Email Confirmation</p>
// //                       <p className="text-sm text-green-400">
// //                         ✓ A confirmation email has been sent to {ticket.email}
// //                       </p>
// //                     </div>

// //                     {/* PDF DOWNLOAD BUTTON */}
// //                     {ticket.pdfTicketBase64 && (
// //                       <button
// //                         onClick={() =>
// //                           downloadPdf(
// //                             ticket.pdfTicketBase64,
// //                             `ticket-${ticket.ticketCode}.pdf`
// //                           )
// //                         }
// //                         className="w-full mt-4 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-500 transition text-white"
// //                       >
// //                         📥 Download PDF Ticket
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </Card>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ================= UI HELPERS ================= */

// // function Card({ children, className = "" }) {
// //   return (
// //     <div className={`bg-neutral-900/80 border border-neutral-700 rounded-2xl p-6 shadow-lg ${className}`}>
// //       {children}
// //     </div>
// //   );
// // }

// // function Section({ title, children }) {
// //   return (
// //     <Card>
// //       <h3 className="text-lg font-semibold mb-4 text-red-400">{title}</h3>
// //       <div className="space-y-4">{children}</div>
// //     </Card>
// //   );
// // }

// // function Input({ label, required, ...props }) {
// //   return (
// //     <div>
// //       <label className="block text-sm text-gray-400 mb-1">
// //         {label} {required && <span className="text-red-500">*</span>}
// //       </label>
// //       <input
// //         {...props}
// //         required={required}
// //         className="w-full h-12 px-4 bg-black border border-neutral-700 rounded-xl focus:ring-2 focus:ring-red-500"
// //       />
// //     </div>
// //   );
// // }



// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { api } from "../api";

// /* ================= UTILITIES ================= */

// function loadRazorpayScript() {
//   return new Promise((resolve, reject) => {
//     if (window.Razorpay) return resolve(true);
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = () => resolve(true);
//     script.onerror = () => reject("Failed to load Razorpay SDK");
//     document.body.appendChild(script);
//   });
// }

// function formatINR(amount) {
//   return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
// }

// /* ================= MAIN COMPONENT ================= */

// export default function BookingForm() {
//   const { slug } = useParams();

//   const [event, setEvent] = useState(null);
//   const [loadingEvent, setLoadingEvent] = useState(true);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     tickets: 1,
//     rollNumber: "",
//     year: "",
//     department: "",
//     section: "",
//     note: ""
//   });

//   const [submitting, setSubmitting] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [ticket, setTicket] = useState(null);
//   const [ticketId, setTicketId] = useState(null);

//   const remainingTickets = event?.ticketsRemaining;
//   const availability = event?.availabilityStatus;
//   const bookingsClosed = event?.bookingsOpen === false || availability === 'closed' || availability === 'soldout' || (remainingTickets !== null && remainingTickets !== undefined && remainingTickets <= 0);

//   /* ================= LOAD EVENT ================= */
//   useEffect(() => {
//     let mounted = true;
//     const loadEvent = async () => {
//       try {
//         const res = await api.get(`/events/${encodeURIComponent(slug)}`);
//         const data = res?.data?.data || res.data;
//         if (mounted) setEvent(data);
//       } catch {
//         if (mounted) setEvent(null);
//       } finally {
//         if (mounted) setLoadingEvent(false);
//       }
//     };
//     loadEvent();
//     return () => (mounted = false);
//   }, [slug]);

//   /* ================= POLLING ================= */
//   const pollTicket = (id) => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await api.get(`/tickets/${id}`);
//         const t = res.data.ticket;

//         if (t.qrDataUrl && t.pdfTicketBase64) {
//           setTicket(t);
//           setMessage({
//             type: "success",
//             text: "Payment verified successfully! Your ticket is ready."
//           });
//           clearInterval(interval);
//           setSubmitting(false);
//         }
//       } catch (err) {
//         console.error("Polling error", err);
//       }
//     }, 2000);
//   };

//   /* ================= FORM HANDLER ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({
//       ...p,
// <<<<<<< HEAD
//       [name]: name === "tickets"
//         ? (() => {
//             const num = Math.max(1, Number(value));
//             if (remainingTickets !== null && remainingTickets !== undefined) {
//               return Math.min(num, remainingTickets || 0);
//             }
//             return num;
//           })()
//         : value,
// =======
//       [name]: name === "tickets" ? Math.max(1, Number(value)) : value
// >>>>>>> 3dbff3b (payment fixed)
//     }));
//   };

//   const totalAmount = (event?.price || 0) * (form.tickets || 1);

//   /* ================= RAZORPAY ================= */
//   async function startCheckout(order) {
//     await loadRazorpayScript();

//     const options = {
//       key: order.razorpayKey,
//       amount: order.amount,
//       currency: order.currency,
//       name: event.name,
//       description: `${form.tickets} Ticket(s) for ${event.name}`,
//       order_id: order.orderId,

//       handler: async (response) => {
//         try {
//           setMessage({ type: "info", text: "Processing ticket..." });

//           await api.post("/book/verify", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             ticketId: order.ticketId
//           });

//           setTicketId(order.ticketId);
//           pollTicket(order.ticketId);
//         } catch (err) {
//           console.error("Verify error", err);
//           setMessage({
//             type: "error",
//             text: "Payment verification failed. Please contact support."
//           });
//           setSubmitting(false);
//         }
//       },

//       modal: {
//         ondismiss: () => {
//           setMessage({
//             type: "error",
//             text: "Payment cancelled. Please try again."
//           });
//           setSubmitting(false);
//         }
//       },

//       prefill: {
//         name: form.name,
//         email: form.email,
//         contact: form.phone
//       }
//     };

//     new window.Razorpay(options).open();
//   }

//   /* ================= FORM SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (bookingsClosed) {
//       setMessage({ type: "error", text: "Bookings are currently closed or sold out." });
//       return;
//     }

//     if (remainingTickets !== null && remainingTickets !== undefined && form.tickets > remainingTickets) {
//       setMessage({ type: "error", text: `Only ${remainingTickets} ticket(s) remaining.` });
//       return;
//     }

//     if (
//       !form.name ||
//       !form.email ||
//       !form.rollNumber ||
//       !form.year ||
//       !form.department ||
//       !form.section
//     ) {
//       setMessage({
//         type: "error",
//         text: "Please fill all required student details."
//       });
//       return;
//     }

//     setSubmitting(true);
//     setMessage(null);
//     setTicket(null);

//     try {
//       const payload = {
//         eventId: event._id,
//         studentName: form.name,
//         email: form.email,
//         phone: form.phone,
//         rollNumber: form.rollNumber,
//         year: form.year,
//         department: form.department,
//         section: form.section,
//         quantity: form.tickets
//       };

//       const res = await api.post("/book", payload);
//       const data = res.data;

//       // FREE EVENT
//       if (!data.orderId) {
//         setMessage({ type: "info", text: "Processing ticket..." });
//         setTicketId(data.ticket._id);
//         pollTicket(data.ticket._id);
//         return;
//       }

//       // PAID EVENT
//       await startCheckout(data);
//     } catch (err) {
//       console.error("Submit error", err);
//       setMessage({ type: "error", text: "Booking failed. Please try again." });
//       setSubmitting(false);
//     }
//   };

//   /* ================= PDF DOWNLOAD ================= */
//   function downloadPdf(base64, filename) {
//     if (!base64) return;
//     const link = document.createElement("a");
//     link.href = `data:application/pdf;base64,${base64}`;
//     link.download = filename;
//     link.click();
//   }

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white py-10 px-4">
//       <div className="max-w-4xl mx-auto">

//         <h1 className="text-3xl md:text-4xl font-bold text-center text-red-500 mb-8">
//           Book Your Seat
//         </h1>

//         {loadingEvent ? (
//           <Card>
//             <div className="text-center text-gray-400">
//               Loading event details...
//             </div>
//           </Card>
//         ) : !event ? (
//           <Card className="bg-red-900/40 border-red-600">
//             <div className="text-center">
//               <p className="mb-4">Event not found</p>
//               <Link
//                 to="/events"
//                 className="text-red-400 hover:text-red-300 underline"
//               >
//                 ← Back to Events
//               </Link>
//             </div>
//           </Card>
//         ) : (
//           <>
//             {/* EVENT SUMMARY */}
//             <Card className="mb-6">
//               <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
//               <p className="text-sm text-gray-400 mb-3">
//                 {event.date
//                   ? new Date(event.date).toLocaleString()
//                   : "Date TBA"}
//               </p>
// <<<<<<< HEAD
//               {/* <p className="text-gray-300">{event.description}</p> */}

//               {/* Availability badge */}
//               <div className="mt-3 flex flex-wrap items-center gap-2">
//                 {availability === 'available' && (
//                   <span className="px-3 py-1 rounded-full text-sm bg-green-900/40 border border-green-600 text-green-200">Tickets available</span>
//                 )}
//                 {availability === 'filling-fast' && (
//                   <span className="px-3 py-1 rounded-full text-sm bg-yellow-900/40 border border-yellow-600 text-yellow-200">Tickets filling fast</span>
//                 )}
//                 {availability === 'limited' && (
//                   <span className="px-3 py-1 rounded-full text-sm bg-orange-900/40 border border-orange-600 text-orange-200">Limited tickets available</span>
//                 )}
//                 {availability === 'soldout' && (
//                   <span className="px-3 py-1 rounded-full text-sm bg-red-900/50 border border-red-700 text-red-200">Sold out</span>
//                 )}
//                 {availability === 'closed' && (
//                   <span className="px-3 py-1 rounded-full text-sm bg-gray-900/60 border border-gray-700 text-gray-200">Bookings closed</span>
//                 )}

//                 {remainingTickets !== null && remainingTickets !== undefined && availability !== 'soldout' && availability !== 'closed' && (
//                   <span className="text-sm text-gray-400">{remainingTickets} ticket(s) remaining</span>
//                 )}
//               </div>
// =======
// >>>>>>> 3dbff3b (payment fixed)
//             </Card>

//             {/* MESSAGES */}
//             {message && (
//               <Card
//                 className={`mb-6 ${
//                   message.type === "error"
//                     ? "bg-red-900/40 border-red-600"
//                     : message.type === "success"
//                     ? "bg-green-900/40 border-green-600"
//                     : "bg-yellow-900/40 border-yellow-600"
//                 }`}
//               >
//                 {message.text}
//               </Card>
//             )}

//             {/* FORM OR TICKET */}
//             {!ticket ? (
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <Section title="Personal Information">
//                   <Input label="Full Name" name="name" required value={form.name} onChange={handleChange} />
//                   <Input label="Email" type="email" name="email" required value={form.email} onChange={handleChange} />
//                   <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
//                 </Section>

//                 <Section title="Student Information">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <Input label="Roll Number" name="rollNumber" required value={form.rollNumber} onChange={handleChange} />
//                     <Input label="Year" name="year" required value={form.year} onChange={handleChange} />
//                     <Input label="Department" name="department" required value={form.department} onChange={handleChange} />
//                     <Input label="Section" name="section" required value={form.section} onChange={handleChange} />
//                   </div>
//                 </Section>

//                 <Section title="Ticket Details">
//                   <div className="flex justify-between items-center">
//                     <p>Total</p>
//                     <p className="text-3xl font-bold text-red-500">
//                       {formatINR(totalAmount)}
//                     </p>
//                   </div>
//                 </Section>

//                 <button
//                   type="submit"
// <<<<<<< HEAD
//                   disabled={submitting || bookingsClosed}
//                   className="w-full py-4 rounded-xl text-lg font-semibold bg-red-600 hover:bg-red-500 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
// =======
//                   disabled={submitting}
//                   className="w-full py-4 rounded-xl text-lg font-semibold bg-red-600 hover:bg-red-500"
// >>>>>>> 3dbff3b (payment fixed)
//                 >
//                   {bookingsClosed
//                     ? "Bookings closed"
//                     : submitting
//                     ? "Processing..."
//                     : event.price > 0
//                     ? `Pay ${formatINR(totalAmount)} & Book`
//                     : "Book Tickets (Free)"}
//                 </button>
//               </form>
//             ) : (
//               <Card className="bg-gradient-to-br from-green-900/30 to-black border-green-600">
//                 <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
//                   ✓ Booking Confirmed!
//                 </h2>

//                 <div className="flex flex-col items-center space-y-4">
//                   <img
//                     src={ticket.qrDataUrl}
//                     alt="QR"
//                     className="w-48 h-48 bg-white p-3 rounded-lg"
//                   />

//                   <p className="font-mono text-xl">{ticket.ticketCode}</p>
//                   <p>Email sent to: {ticket.email}</p>

//                   {/* DOWNLOAD PDF BUTTON */}
//                   <button
//                     onClick={() =>
//                       downloadPdf(
//                         ticket.pdfTicketBase64,
//                         `ticket-${ticket.ticketCode}.pdf`
//                       )
//                     }
//                     className="mt-4 px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-500"
//                   >
//                     📥 Download PDF Ticket
//                   </button>
//                 </div>
//               </Card>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= UI HELPERS ================= */

// function Card({ children, className = "" }) {
//   return (
//     <div className={`bg-neutral-900/80 border border-neutral-700 rounded-2xl p-6 shadow-lg ${className}`}>
//       {children}
//     </div>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <Card>
//       <h3 className="text-lg font-semibold mb-4 text-red-400">{title}</h3>
//       <div className="space-y-4">{children}</div>
//     </Card>
//   );
// }

// function Input({ label, required, ...props }) {
//   return (
//     <div>
//       <label className="block text-sm text-gray-400 mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         {...props}
//         required={required}
//         className="w-full h-12 px-4 bg-black border border-neutral-700 rounded-xl focus:ring-2 focus:ring-red-500"
//       />
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";

/* ================= UTILITIES ================= */

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject("Failed to load Razorpay SDK");
    document.body.appendChild(script);
  });
}

function formatINR(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

/* ================= MAIN COMPONENT ================= */

export default function BookingForm() {
  const { slug } = useParams();

  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
    rollNumber: "",
    year: "",
    department: "",
    section: "",
    note: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [ticketId, setTicketId] = useState(null);

  const remainingTickets = event?.ticketsRemaining;
  const availability = event?.availabilityStatus;
  const bookingsClosed =
    event?.bookingsOpen === false ||
    availability === "closed" ||
    availability === "soldout" ||
    (remainingTickets !== null &&
      remainingTickets !== undefined &&
      remainingTickets <= 0);

  /* ================= LOAD EVENT ================= */
  useEffect(() => {
    let mounted = true;
    const loadEvent = async () => {
      try {
        const res = await api.get(`/events/${encodeURIComponent(slug)}`);
        const data = res?.data?.data || res.data;
        if (mounted) setEvent(data);
      } catch {
        if (mounted) setEvent(null);
      } finally {
        if (mounted) setLoadingEvent(false);
      }
    };
    loadEvent();
    return () => (mounted = false);
  }, [slug]);

  /* ================= POLLING ================= */
  const pollTicket = (id) => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/tickets/${id}`);
        const t = res.data.ticket;

        if (t.qrDataUrl && t.pdfTicketBase64) {
          setTicket(t);
          setMessage({
            type: "success",
            text: "Payment verified successfully! Your ticket is ready."
          });
          clearInterval(interval);
          setSubmitting(false);
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 2000);
  };

  /* ================= FORM HANDLER ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]:
        name === "tickets"
          ? (() => {
              const num = Math.max(1, Number(value));
              if (remainingTickets !== null && remainingTickets !== undefined) {
                return Math.min(num, remainingTickets || 0);
              }
              return num;
            })()
          : value
    }));
  };

  const totalAmount = (event?.price || 0) * (form.tickets || 1);

  /* ================= RAZORPAY ================= */
  async function startCheckout(order) {
    await loadRazorpayScript();

    const options = {
      key: order.razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: event.name,
      description: `${form.tickets} Ticket(s) for ${event.name}`,
      order_id: order.orderId,

      handler: async (response) => {
        try {
          setMessage({ type: "info", text: "Processing ticket..." });

          await api.post("/book/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            ticketId: order.ticketId
          });

          setTicketId(order.ticketId);
          pollTicket(order.ticketId);
        } catch (err) {
          console.error("Verify error", err);
          setMessage({
            type: "error",
            text: "Payment verification failed. Please contact support."
          });
          setSubmitting(false);
        }
      },

      modal: {
        ondismiss: () => {
          setMessage({
            type: "error",
            text: "Payment cancelled. Please try again."
          });
          setSubmitting(false);
        }
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone
      }
    };

    new window.Razorpay(options).open();
  }

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bookingsClosed) {
      setMessage({
        type: "error",
        text: "Bookings are currently closed or sold out."
      });
      return;
    }

    if (
      remainingTickets !== null &&
      remainingTickets !== undefined &&
      form.tickets > remainingTickets
    ) {
      setMessage({
        type: "error",
        text: `Only ${remainingTickets} ticket(s) remaining.`
      });
      return;
    }

    if (
      !form.name ||
      !form.email ||
      !form.rollNumber ||
      !form.year ||
      !form.department ||
      !form.section
    ) {
      setMessage({
        type: "error",
        text: "Please fill all required student details."
      });
      return;
    }

    setSubmitting(true);
    setMessage(null);
    setTicket(null);

    try {
      const payload = {
        eventId: event._id,
        studentName: form.name,
        email: form.email,
        phone: form.phone,
        rollNumber: form.rollNumber,
        year: form.year,
        department: form.department,
        section: form.section,
        quantity: form.tickets
      };

      const res = await api.post("/book", payload);
      const data = res.data;

      if (!data.orderId) {
        setMessage({ type: "info", text: "Processing ticket..." });
        setTicketId(data.ticket._id);
        pollTicket(data.ticket._id);
        return;
      }

      await startCheckout(data);
    } catch (err) {
      console.error("Submit error", err);
      setMessage({
        type: "error",
        text: "Booking failed. Please try again."
      });
      setSubmitting(false);
    }
  };

  /* ================= PDF DOWNLOAD ================= */
  function downloadPdf(base64, filename) {
    if (!base64) return;
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64}`;
    link.download = filename;
    link.click();
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-500 mb-8">
          Book Your Seat
        </h1>

        {loadingEvent ? (
          <Card>
            <div className="text-center text-gray-400">
              Loading event details...
            </div>
          </Card>
        ) : !event ? (
          <Card className="bg-red-900/40 border-red-600">
            <div className="text-center">
              <p className="mb-4">Event not found</p>
              <Link
                to="/events"
                className="text-red-400 hover:text-red-300 underline"
              >
                ← Back to Events
              </Link>
            </div>
          </Card>
        ) : (
          <>
            <Card className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
              <p className="text-sm text-gray-400 mb-3">
                {event.date
                  ? new Date(event.date).toLocaleString()
                  : "Date TBA"}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {availability === "available" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-900/40 border border-green-600 text-green-200">
                    Tickets available
                  </span>
                )}
                {availability === "filling-fast" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-yellow-900/40 border border-yellow-600 text-yellow-200">
                    Tickets filling fast
                  </span>
                )}
                {availability === "limited" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-orange-900/40 border border-orange-600 text-orange-200">
                    Limited tickets available
                  </span>
                )}
                {availability === "soldout" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-red-900/50 border border-red-700 text-red-200">
                    Sold out
                  </span>
                )}
                {availability === "closed" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-900/60 border border-gray-700 text-gray-200">
                    Bookings closed
                  </span>
                )}

                {remainingTickets !== null &&
                  remainingTickets !== undefined &&
                  availability !== "soldout" &&
                  availability !== "closed" && (
                    <span className="text-sm text-gray-400">
                      {remainingTickets} ticket(s) remaining
                    </span>
                  )}
              </div>
            </Card>

            {message && (
              <Card
                className={`mb-6 ${
                  message.type === "error"
                    ? "bg-red-900/40 border-red-600"
                    : message.type === "success"
                    ? "bg-green-900/40 border-green-600"
                    : "bg-yellow-900/40 border-yellow-600"
                }`}
              >
                {message.text}
              </Card>
            )}

            {!ticket ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Section title="Personal Information">
                  <Input
                    label="Full Name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </Section>

                <Section title="Student Information">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Roll Number"
                      name="rollNumber"
                      required
                      value={form.rollNumber}
                      onChange={handleChange}
                    />
                    <Input
                      label="Year"
                      name="year"
                      required
                      value={form.year}
                      onChange={handleChange}
                    />
                    <Input
                      label="Department"
                      name="department"
                      required
                      value={form.department}
                      onChange={handleChange}
                    />
                    <Input
                      label="Section"
                      name="section"
                      required
                      value={form.section}
                      onChange={handleChange}
                    />
                  </div>
                </Section>

                <Section title="Ticket Details">
                  <div className="flex justify-between items-center">
                    <p>Total</p>
                    <p className="text-3xl font-bold text-red-500">
                      {formatINR(totalAmount)}
                    </p>
                  </div>
                </Section>

                <button
                  type="submit"
                  disabled={submitting || bookingsClosed}
                  className="w-full py-4 rounded-xl text-lg font-semibold bg-red-600 hover:bg-red-500 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
                >
                  {bookingsClosed
                    ? "Bookings closed"
                    : submitting
                    ? "Processing..."
                    : event.price > 0
                    ? `Pay ${formatINR(totalAmount)} & Book`
                    : "Book Tickets (Free)"}
                </button>
              </form>
            ) : (
              <Card className="bg-gradient-to-br from-green-900/30 to-black border-green-600">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
                  ✓ Booking Confirmed!
                </h2>

                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={ticket.qrDataUrl}
                    alt="QR"
                    className="w-48 h-48 bg-white p-3 rounded-lg"
                  />
                  <p className="font-mono text-xl">{ticket.ticketCode}</p>
                  <p>Email sent to: {ticket.email}</p>

                  <button
                    onClick={() =>
                      downloadPdf(
                        ticket.pdfTicketBase64,
                        `ticket-${ticket.ticketCode}.pdf`
                      )
                    }
                    className="mt-4 px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-500"
                  >
                    📥 Download PDF Ticket
                  </button>
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-neutral-900/80 border border-neutral-700 rounded-2xl p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4 text-red-400">{title}</h3>
      <div className="space-y-4">{children}</div>
    </Card>
  );
}

function Input({ label, required, ...props }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        required={required}
        className="w-full h-12 px-4 bg-black border border-neutral-700 rounded-xl focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}
