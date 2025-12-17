// // // //frontend/src/components,ContectSection.jsx
// // // import React, { useState } from 'react';
// // // import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

// // // export default function ContactSection() {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     email: '',
// // //     message: ''
// // //   });

// // //   const [sent, setSent] = useState(false);

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     setSent(true);

// // //     // mimic async send and reset form after a short delay
// // //     setTimeout(() => {
// // //       setSent(false);
// // //       setFormData({ name: '', email: '', message: '' });
// // //     }, 3000);
// // //   };

// // //   return (
// // //     <section className="py-20 bg-black">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="text-center mb-16">
// // //           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// // //             Get In <span className="text-red-600">Touch</span>
// // //           </h2>
// // //           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
// // //             For queries, partnerships or assistance, feel free to reach out.
// // //           </p>
// // //         </div>

// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
// // //           {/* Left column: contact info, socials, map */}
// // //           <div className="space-y-8">
// // //             <div>
// // //               <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
// // //               <div className="space-y-4">
// // //                 <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl hover:border-red-600/50 transition-all duration-300">
// // //                   <div className="bg-red-600 rounded-lg p-3 flex-shrink-0">
// // //                     <Mail size={24} className="text-white" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="text-white font-semibold mb-1">Email</h4>
// // //                     <a href="mailto:info@tedxsmec.com" className="text-gray-400 hover:text-red-600 transition-colors">
// // //                       info@tedxsmec.com
// // //                     </a>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl hover:border-red-600/50 transition-all duration-300">
// // //                   <div className="bg-red-600 rounded-lg p-3 flex-shrink-0">
// // //                     <Phone size={24} className="text-white" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="text-white font-semibold mb-1">Phone</h4>
// // //                     <a href="tel:+919876543210" className="text-gray-400 hover:text-red-600 transition-colors">
// // //                       +91 98765 43210
// // //                     </a>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl hover:border-red-600/50 transition-all duration-300">
// // //                   <div className="bg-red-600 rounded-lg p-3 flex-shrink-0">
// // //                     <MapPin size={24} className="text-white" />
// // //                   </div>
// // //                   <div>
// // //                     <h4 className="text-white font-semibold mb-1">Location</h4>
// // //                     <p className="text-gray-400">
// // //                       St. Martin's Engineering College<br />
// // //                       Dhulapally, Secunderabad<br />
// // //                       Telangana 500100, India
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
// // //               <div className="flex gap-4">
// // //                 {[
// // //                   { icon: Facebook, href: '#' },
// // //                   { icon: Instagram, href: '#' },
// // //                   { icon: Twitter, href: '#' },
// // //                   { icon: Linkedin, href: '#' }
// // //                 ].map((social, index) => {
// // //                   const Icon = social.icon;
// // //                   return (
// // //                     <a
// // //                       key={index}
// // //                       href={social.href}
// // //                       target="_blank"
// // //                       rel="noopener noreferrer"
// // //                       className="bg-gradient-to-br from-gray-900 to-black border border-red-600/20 hover:border-red-600/50 rounded-lg p-4 transition-all duration-300 transform hover:scale-110 hover:bg-red-600 group"
// // //                     >
// // //                       <Icon size={24} className="text-gray-400 group-hover:text-white transition-colors" />
// // //                     </a>
// // //                   );
// // //                 })}
// // //               </div>
// // //             </div>

// // //             <div className="relative h-80 md:h-96 rounded-xl overflow-hidden border border-red-600/20">
// // //               <iframe
// // //                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.2789977088178!2d78.47188342540652!3d17.54189858337187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8ff5673b6621%3A0x2f6583a532827eda!2sST.%20MARTINS%20ENGINEERING%20COLLEGE%20OF%20TECHNOLOGY%2C%20Kompally%2C%20Hyderabad%2C%20Kaziguda%2C%20Telangana%20500100!5e0!3m2!1sen!2sin!4v1759646572115!5m2!1sen!2sin"
// // //                 width="100%"
// // //                 height="100%"
// // //                 style={{ border: 0 }}
// // //                 allowFullScreen
// // //                 loading="lazy"
// // //                 className="grayscale hover:grayscale-0 transition-all duration-300"
// // //                 title="SMEC location"
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* Right column: form */}
// // //           <div>
// // //             <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl p-8">
// // //               <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>

// // //               {sent ? (
// // //                 <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-8 text-center">
// // //                   <div className="bg-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
// // //                     <Send size={32} className="text-white" />
// // //                   </div>
// // //                   <h4 className="text-white font-bold text-xl mb-2">Message Sent!</h4>
// // //                   <p className="text-gray-300">Thank you for reaching out. We'll get back to you soon.</p>
// // //                 </div>
// // //               ) : (
// // //                 <form onSubmit={handleSubmit} className="space-y-6">
// // //                   <div>
// // //                     <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
// // //                       Name *
// // //                     </label>
// // //                     <input
// // //                       id="name"
// // //                       type="text"
// // //                       required
// // //                       value={formData.name}
// // //                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //                       placeholder="Your name"
// // //                       className="w-full bg-black/50 border border-red-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
// // //                       Email *
// // //                     </label>
// // //                     <input
// // //                       id="email"
// // //                       type="email"
// // //                       required
// // //                       value={formData.email}
// // //                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // //                       placeholder="your@email.com"
// // //                       className="w-full bg-black/50 border border-red-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
// // //                     />
// // //                   </div>

// // //                   <div>
// // //                     <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
// // //                       Message *
// // //                     </label>
// // //                     <textarea
// // //                       id="message"
// // //                       required
// // //                       rows={5}
// // //                       value={formData.message}
// // //                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
// // //                       placeholder="Your message..."
// // //                       className="w-full bg-black/50 border border-red-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors resize-none"
// // //                     />
// // //                   </div>

// // //                   <button
// // //                     type="submit"
// // //                     className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-red-600/50"
// // //                   >
// // //                     Send Message
// // //                     <Send size={20} />
// // //                   </button>
// // //                 </form>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // }



// // import React from "react";
// // import { Link } from "react-router-dom";
// // import { ArrowRight, Mail, Mic } from "lucide-react";

// // export default function ContactSection() {
// //   return (
// //     <section className="relative py-20 bg-black overflow-hidden border-t border-white/10">
      
// //       {/* Background Glow */}
// //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-900/20 blur-[100px] rounded-full pointer-events-none" />

// //       <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
// //         <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
// //           Ready to Spark a <span className="text-red-600">Conversation?</span>
// //         </h2>
        
// //         <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
// //           Whether you are a creator with an idea, a brand looking to partner, or an attendee with a question—we are listening.
// //         </p>

// //         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
// //           {/* Primary CTA: Go to Contact Page */}
// //           <Link 
// //             to="/contact" 
// //             className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 hover:shadow-red-900/40 group"
// //           >
// //               <Mail size={20} />
// //               <span>Get in Touch</span>
// //               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
// //           </Link>

// //           {/* Secondary CTA: Speaker Application (or just a nudge) */}
// //           <Link 
// //             to="/contact" 
// //             className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-red-600/30 transition-all w-full sm:w-auto"
// //           >
// //             <span className="flex items-center justify-center gap-2">
// //               <Mic size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
// //               <span>Apply to Speak</span>
// //             </span>
// //           </Link>

// //         </div>
// //       </div>

// //     </section>
// //   );
// // }


// import React from "react";
// import { Link } from "react-router-dom";
// import { ArrowRight, Mail, Mic } from "lucide-react";

// export default function ContactSection() {
//   return (
//     <section className="relative py-20 bg-black overflow-hidden border-t border-white/10">
      
//       {/* Background Glow */}
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-900/20 blur-[100px] rounded-full pointer-events-none" />

//       <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
//         <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
//           Ready to Spark a <span className="text-red-600">Conversation?</span>
//         </h2>
        
//         <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
//           Whether you are a creator with an idea, a brand looking to partner, or an attendee with a question—we are listening.
//         </p>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           {/* Primary CTA: Go to Contact Page */}
//           <Link 
//             to="/contact" 
//             className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 hover:shadow-red-900/40 group"
//           >
//               <Mail size={20} />
//               <span>Get in Touch</span>
//               <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//           </Link>

//           {/* Secondary CTA: Speaker Application (or just a nudge) */}
//           <Link 
//             to="/contact" 
//             className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-red-600/30 transition-all w-full sm:w-auto"
//           >
//             <span className="flex items-center justify-center gap-2">
//               <Mic size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
//               <span>Apply to Speak</span>
//             </span>
//           </Link>

//         </div>
//       </div>

//     </section>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Mic } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="relative py-20 bg-black overflow-hidden border-t border-white/10">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-900/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
          Ready to Spark a <span className="text-red-600">Conversation?</span>
        </h2>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you are a creator with an idea, a brand looking to partner, or an attendee with a question—we are listening.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA: Go to Contact Page */}
          <Link 
            to="/contact" 
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/20 hover:shadow-red-900/40 group"
          >
              <Mail size={20} />
              <span>Get in Touch</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Secondary CTA: Speaker Application (or just a nudge) */}
          <Link 
            to="/contact" 
            className="group px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 hover:border-red-600/30 transition-all w-full sm:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              <Mic size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
              <span>Apply to Speak</span>
            </span>
          </Link>

        </div>
      </div>

    </section>
  );
}