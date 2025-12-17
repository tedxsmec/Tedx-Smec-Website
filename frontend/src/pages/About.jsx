
// // // frontend/src/pages/about.jsx
// // import React from "react";

// // import { Lightbulb, BookOpen, Users, Target } from 'lucide-react';

// // export default function About() {
// //   return (
// //     <section className="py-20 bg-gradient-to-br from-gray-950 to-black">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
// //         {/* SECTION TITLE */}
// //         <div className="text-center mb-16">
// //           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// //             About <span className="text-red-600">TEDxSMEC</span>
// //           </h2>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

// //           {/* LEFT SIDE */}
// //           <div className="space-y-6">

// //             {/* ABOUT TED */}
// //             <div className="flex items-start gap-4">
// //               <div className="bg-red-600 rounded-lg p-3 flex-shrink-0">
// //                 <Lightbulb size={32} className="text-white" />
// //               </div>

// //               <div>
// //                 <h3 className="text-2xl font-bold text-white mb-3">About TED</h3>
// //                 <p className="text-gray-400 leading-relaxed">
// //                   TED is a global platform committed to spreading ideas through short, powerful talks.
// //                   TEDx events are independently organized but aligned with TED’s mission to inspire communities
// //                   with ideas worth spreading.
// //                 </p>
// //                 <p className="text-gray-400 leading-relaxed mt-4">
// //                   TEDx programs empower local organizers to create impactful events driven by creativity,
// //                   curiosity, and meaningful conversations — bringing communities together across the world.
// //                 </p>
// //               </div>
// //             </div>

// //             {/* CARDS (MISSION + COMMUNITY) */}
// //             <div className="grid grid-cols-2 gap-4 mt-8">
// //               <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-600/30 rounded-xl p-6 text-center">
// //                 <Target size={32} className="text-red-600 mx-auto mb-3" />
// //                 <h4 className="text-white font-bold text-lg mb-2">Our Vision</h4>
// //                 <p className="text-gray-400 text-sm">
// //                   Empowering change-makers to bring ideas to the world stage
// //                 </p>
// //               </div>

// //               <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-600/30 rounded-xl p-6 text-center">
// //                 <Users size={32} className="text-red-600 mx-auto mb-3" />
// //                 <h4 className="text-white font-bold text-lg mb-2">Our Community</h4>
// //                 <p className="text-gray-400 text-sm">
// //                   Innovators, creators & students united by ideas
// //                 </p>
// //               </div>
// //             </div>
// //           </div>

// //           {/* RIGHT SIDE */}
// //           <div className="space-y-6">

// //             {/* ABOUT SMEC */}    
// //             <div className="flex items-start gap-4">
// //               <div className="bg-red-600 rounded-lg p-3 flex-shrink-0">
// //                 <BookOpen size={32} className="text-white" />
// //               </div>

// //               <div>
// //                 <h3 className="text-2xl font-bold text-white mb-3">About SMEC</h3>
// //                 <p className="text-gray-400 leading-relaxed">
// //                   St. Martin’s Engineering College (SMEC), Hyderabad, is a hub of innovation, research,
// //                   technology and student-driven initiatives. Known for excellence, SMEC nurtures future
// //                   leaders who aim to create meaningful impact.
// //                 </p>
// //                 <p className="text-gray-400 leading-relaxed mt-4">
// //                   TEDxSMEC stands as a platform to amplify creativity, ideas, and voices that shape the
// //                   future — inspiring students and innovators to challenge norms and think beyond boundaries.
// //                 </p>
// //               </div>
// //             </div>

// //             {/* IMAGE CARD */}
// //             <div className="relative h-64 rounded-xl overflow-hidden border border-red-600/20">
// //               <img
// //                 src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1920"
// //                 alt="SMEC Campus"
// //                 className="w-full h-full object-cover"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
// //               <div className="absolute bottom-0 left-0 right-0 p-6">
// //                 <p className="text-white font-semibold text-lg">St. Martin’s Engineering College</p>
// //                 <p className="text-gray-300 text-sm">Innovation. Excellence. Transformation.</p>
// //               </div>
// //             </div>

// //           </div>
// //         </div>

// //         {/* WHY TEDXSMEC SECTION */}
// //         <div className="bg-gradient-to-br from-red-600/10 to-red-900/10 border border-red-600/30 rounded-2xl p-8 md:p-12">
// //           <div className="text-center">
// //             <h3 className="text-3xl font-bold text-white mb-4">Why TEDxSMEC?</h3>

// //             <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
// //               TEDxSMEC brings together thinkers, innovators, creators and leaders who share transformative ideas.
// //               Our platform inspires action, sparks conversations and empowers students to become global changemakers.
// //             </p>

// //             {/* METRICS */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
// //               <div className="text-center">
// //                 <div className="text-4xl font-bold text-red-600 mb-2">5+</div>
// //                 <div className="text-gray-400">Events Hosted</div>
// //               </div>

// //               <div className="text-center">
// //                 <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
// //                 <div className="text-gray-400">Inspiring Speakers</div>
// //               </div>

// //               <div className="text-center">
// //                 <div className="text-4xl font-bold text-red-600 mb-2">5000+</div>
// //                 <div className="text-gray-400">Attendees Impacted</div>
// //               </div>
// //             </div>

// //           </div>
// //         </div>

// //       </div>
// //     </section>
// //   );
// // }



// import React from "react";
// import { Link } from "react-router-dom";
// import { 
//   Lightbulb, Quote, School, 
//   Globe, Rocket, Heart 
// } from "lucide-react";
// import ContactSection from "../components/ContactSection";

// // --- LEADERSHIP DATA ---
// const LEADERSHIP = [
//   {
//     role: "Chairman",
//     name: "Sri. M. Laxman Reddy",
//     image: "https://smec.ac.in/assets/images/chairman.jpg", 
//     quote: "We are not just building engineers; we are shaping the thought leaders of tomorrow."
//   },
//   {
//     role: "Executive Director",
//     name: "Sri. G. Chandrasekhar Yadav",
//     image: "https://smec.ac.in/assets/images/ed.jpg", 
//     quote: "Innovation begins when we allow young minds to question the impossible."
//   },
//   {
//     role: "Principal",
//     name: "Dr. K. Ravindra",
//     image: "https://smec.ac.in/assets/images/principal.jpg", 
//     quote: "TEDxSMEC is the bridge between academic excellence and global perspective."
//   }
// ];

// export default function About() {
//   return (
//     <div className="bg-black text-white min-h-screen selection:bg-red-900/30">
//       <main className="pt-24 md:pt-32 pb-20">
        
//         {/* 1. HERO: The Pitch */}
//         <section className="relative px-6 pb-20 pt-10 text-center max-w-4xl mx-auto">
//           <span className="inline-block py-1 px-3 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6">
//             Our Shared Vision
//           </span>
//           <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
//             Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Future of Ideas.</span>
//           </h1>
//           <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
//             TEDxSMEC represents the powerful union of St. Martin's Engineering College and the global TED movement. We are creating a stage where technical brilliance meets human storytelling.
//           </p>
//         </section>

//         {/* 2. THE SYNERGY (Visual Split) */}
//         <section className="py-20 bg-neutral-900/30 border-y border-white/5">
//           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
//             {/* Left: The Narrative */}
//             <div className="space-y-8 order-2 lg:order-1">
//               <h2 className="text-2xl md:text-3xl font-bold text-white">
//                 Why We <span className="text-red-600">Exist</span>
//               </h2>
              
//               <div className="space-y-6">
//                 <p className="text-gray-400 leading-relaxed text-base md:text-lg">
//                   At <span className="text-white font-medium">St. Martin's Engineering College (SMEC)</span>, we have always championed academic rigour and research. But we believe that true innovation requires more than just technical skills—it requires the ability to dream, articulate, and inspire.
//                 </p>
//                 <p className="text-gray-400 leading-relaxed text-base md:text-lg">
//                   By bringing <span className="text-white font-medium">TEDx</span> to our campus, we are opening a gateway for our students and faculty to connect with the world. We are moving beyond the classroom to answer the diverse challenges of our time with creativity and courage.
//                 </p>
//               </div>

//               {/* Stats / Quick Facts */}
//               <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
//                  <div>
//                     <h4 className="text-2xl md:text-3xl font-black text-white">Global</h4>
//                     <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Platform</span>
//                  </div>
//                  <div>
//                     <h4 className="text-2xl md:text-3xl font-black text-white">Local</h4>
//                     <span className="text-xs text-red-500 font-bold uppercase tracking-wider">Impact</span>
//                  </div>
//               </div>
//             </div>

//             {/* Right: Visual Representation */}
//             <div className="relative h-[400px] w-full bg-black rounded-3xl overflow-hidden border border-white/10 group order-1 lg:order-2">
//                {/* Background Image */}
//                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
               
//                {/* Overlay Content */}
//                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
//                   <div className="w-16 h-16 bg-red-600/90 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.4)]">
//                     <Lightbulb size={32} className="text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-2">Ideas Worth Spreading</h3>
//                   <p className="text-white/80 text-sm max-w-xs">From the labs of SMEC to the global stage.</p>
//                </div>
//             </div>

//           </div>
//         </section>

//         {/* 3. THE PILLARS (Why Collaborate?) */}
//         <section className="py-24 px-6 max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
//               Join the <span className="text-red-600">Innovation Wave</span>
//             </h2>
//             <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
//               We invite visionaries, industry leaders, and creators to collaborate with us. Here is what we stand for.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
//             {/* Value 1 */}
//             <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-neutral-900 transition-colors text-center md:text-left">
//               <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 text-red-500">
//                 <Globe size={24} />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-3">A Global Stage</h3>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 TEDx talks are shared with millions online. Collaborating with us means putting your ideas and your brand on a globally recognized platform for excellence.
//               </p>
//             </div>

//             {/* Value 2 */}
//             <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-neutral-900 transition-colors text-center md:text-left">
//               <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 text-red-500">
//                 <Rocket size={24} />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-3">Fueling Innovation</h3>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 SMEC is a hub for patents, projects, and startups. We don't just talk about the future; we build it. Join a community that is actively shaping tomorrow.
//               </p>
//             </div>

//             {/* Value 3 */}
//             <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-2xl hover:bg-neutral-900 transition-colors text-center md:text-left">
//               <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 text-red-500">
//                 <Heart size={24} />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-3">Community Impact</h3>
//               <p className="text-gray-400 text-sm leading-relaxed">
//                 We are student-led and faculty-guided. Your involvement directly empowers the next generation of engineers, artists, and leaders.
//               </p>
//             </div>

//           </div>
//         </section>

//         {/* 4. LEADERSHIP (Patrons) */}
//         <section className="py-20 bg-neutral-900/20 border-t border-white/5">
//            <div className="max-w-7xl mx-auto px-6">
//               <div className="text-center mb-16">
//                 <span className="text-red-600 font-bold tracking-widest uppercase text-[10px] mb-2 block">
//                   The Patrons
//                 </span>
//                 <h2 className="text-2xl md:text-3xl font-bold text-white">
//                   Leadership & <span className="text-red-600">Guidance</span>
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
//                 {LEADERSHIP.map((leader, idx) => (
//                   <div key={idx} className="group bg-black border border-white/10 rounded-2xl p-6 hover:border-red-600/30 transition-all duration-300">
//                      <div className="flex flex-col items-center">
//                         <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-white/10 p-1 group-hover:border-red-600 transition-colors">
//                            <img 
//                              src={leader.image} 
//                              alt={leader.name} 
//                              className="w-full h-full object-cover rounded-full bg-neutral-800 grayscale group-hover:grayscale-0 transition-all duration-500"
//                              onError={(e) => e.target.src = "https://via.placeholder.com/150?text=Leader"} 
//                            />
//                         </div>
                        
//                         <h4 className="text-lg font-bold text-white text-center">{leader.name}</h4>
//                         <span className="text-red-600 text-[10px] font-bold uppercase tracking-widest mb-4">{leader.role}</span>
                        
//                         <div className="relative w-full">
//                           <Quote size={16} className="text-white/20 absolute top-0 left-0" />
//                           <p className="text-gray-400 text-xs italic text-center px-6 pt-2 leading-relaxed">
//                             {leader.quote}
//                           </p>
//                         </div>
//                      </div>
//                   </div>
//                 ))}
//               </div>
//            </div>
//         </section>

//       </main>

//       <ContactSection />
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { Quote, Globe, Target, Sparkles, ChevronRight, GraduationCap } from "lucide-react";
import ContactSection from "../components/ContactSection";
import smecClg from "../assets/smec_clg.jpeg";


// --- LEADERSHIP DATA ---
const PATRONS = [
  {
    role: "Chairman",
    name: "Sri. M. Laxman Reddy",
    image: "https://mlrit.ac.in/wp-content/uploads/2022/02/team-1.jpg", 
    message: "Education is not just about employability; it is about empowerment. At SMEC, we empower students to think beyond the horizon."
  },
  {
    role: "Executive Director",
    name: "Sri. G. Chandrasekhar Yadav",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmhZ5q4YZyolMFr09_tF7zqwjY5tUxC-2JKw&s", 
    message: "Innovation is the heartbeat of progress. We support platforms like TEDx to let our students' ideas resonate globally."
  },
  {
    role: "Director",
    name: "Dr. K. Ravindra",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReicQo7_tIEdJSFm71_KoeQYat6bnmDEnrQA&s", 
    message: "TEDxSMEC is more than an event; it is a testament to our commitment to holistic growth and intellectual curiosity."
  }
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 border border-red-600/30 rounded-full bg-red-900/10 mb-6"
          >
             <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"/>
             <span className="text-red-500 font-bold uppercase tracking-widest text-xs">Our Story & Vision</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-8"
          >
            Ideas That <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Resonate.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            From the classrooms of <span className="text-white font-semibold">SMEC</span> to the global stage of <span className="text-red-600 font-bold">TED</span>, we are building a platform for the next generation of thought leaders.
          </motion.p>
        </div>
      </section>

      {/* 2. THE GLOBAL CONTEXT (TED & TEDx) */}
      <section className="py-20 border-t border-white/5 bg-neutral-900/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* About TED */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 mb-2">
                <Globe className="text-red-600" size={28} />
                <h2 className="text-3xl font-bold uppercase tracking-wide">About <span className="text-red-600">TED</span></h2>
             </div>
             <p className="text-gray-400 leading-relaxed text-justify">
               TED is a nonprofit organization devoted to Ideas Worth Spreading. Started as a four-day conference in California 30 years ago, TED has grown to support its mission with multiple initiatives. The two annual TED Conferences invite the world's leading thinkers and doers to speak for 18 minutes or less. Many of these talks are then made available, free, at TED.com.
             </p>
          </div>

          {/* About TEDx */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 mb-2">
                <Target className="text-red-600" size={28} />
                <h2 className="text-3xl font-bold uppercase tracking-wide">About <span className="text-red-600">TEDx</span></h2>
             </div>
             <p className="text-gray-400 leading-relaxed text-justify">
               In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TED Talks video and live speakers combine to spark deep discussion and connection. These local, self-organized events are branded TEDx, where x = independently organized TED event.
             </p>
          </div>

        </div>
      </section>

      {/* 3. ABOUT TEDxSMEC (The Chapter) */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-red-950/20" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
             
             {/* Left: Content */}
             <div className="lg:col-span-7 space-y-8">
                <div className="inline-block px-3 py-1 border border-red-500 rounded text-red-500 text-xs font-bold uppercase tracking-widest">
                  Our Chapter
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white">
                  About <span className="text-red-600">TEDx</span>SMEC
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    <span className="text-white font-bold">TEDxSMEC</span> is an independently organized TED event hosted by St. Martin's Engineering College. We are a community of curious souls, innovators, and dreamers who believe in the power of ideas to change attitudes, lives, and ultimately, the world.
                  </p>
                  <p>
                    Our theme this year, <span className="text-red-500 font-semibold">"Echoes of Innovation"</span>, reflects our commitment to showcasing ideas that don't just speak to the present but reverberate into the future. From cutting-edge technology to profound human stories, TEDxSMEC is where the intellectual diversity of our campus meets the global TED philosophy.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <Sparkles className="text-red-500 mb-2" size={24} />
                    <h4 className="font-bold text-white">Student Driven</h4>
                    <p className="text-xs text-gray-400 mt-1">Organized entirely by the students of SMEC.</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <Globe className="text-red-500 mb-2" size={24} />
                    <h4 className="font-bold text-white">Global Reach</h4>
                    <p className="text-xs text-gray-400 mt-1">Connecting our campus to the global conversation.</p>
                  </div>
                </div>
             </div>

             {/* Right: Visual */}
             <div className="lg:col-span-5 relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000" 
                    alt="TEDx Stage" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent mix-blend-multiply" />
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl">
                    <p className="text-white font-bold text-xl">"x = independently organized event"</p>
                  </div>
                </div>
                {/* Decorative Element */}
                <div className="absolute -z-10 -top-4 -right-4 w-full h-full border-2 border-red-600/30 rounded-2xl" />
             </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SMEC (The Institution) */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Parallax-style Background Image Overlay */}
        <div className="absolute inset-0 z-0">
           <img 
             src={smecClg} // Using SMEC Banner if available, or fallback
             onError={(e) => e.currentTarget.src = smecClg}
             alt="SMEC Campus" 
             className="w-full h-full object-cover opacity-20 grayscale"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-8">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="text-red-500" size={20} />
                      <span className="text-red-500 font-bold uppercase tracking-widest text-xs">The Host Institute</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                     St. Martin's Engineering College
                   </h2>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  Established in 2002, <span className="text-white font-bold">SMEC</span> has emerged as a benchmark of excellence in technical education. With a sprawling eco-friendly campus and state-of-the-art infrastructure, it is a hub where young minds are nurtured into industry-ready professionals.
                </p>

                <ul className="space-y-4">
                  {[
                    "NAAC 'A+' Grade Accredited Institution",
                    "UGC Autonomous Status",
                    "NIRF Ranked & ISO Certified",
                    "Hub for Research, Patents & Startups"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-400">
                      <div className="w-2 h-2 bg-red-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a 
                  href="https://smec.ac.in" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-white font-bold border-b border-red-600 pb-1 hover:text-red-500 transition-colors mt-4"
                >
                  Visit College Website <ChevronRight size={16} />
                </a>
              </div>

              {/* Decorative / Image Side */}
              <div className="relative h-80 lg:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
                 <img 
                   src={smecClg} 
                   onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000'}
                   alt="Students" 
                   className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                    <div>
                      <h4 className="text-2xl font-bold text-white">20+ Years</h4>
                      <p className="text-gray-400 text-sm">Of Academic Excellence</p>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP / PATRONS */}
      <section className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Our <span className="text-red-600">Patrons</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The visionary leadership guiding TEDxSMEC towards new horizons of thought and innovation.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {PATRONS.map((leader, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="group relative bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Area */}
                <div className="h-80 w-full overflow-hidden relative">
                   <img 
                     src={leader.image} 
                     alt={leader.name}
                     className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                     onError={(e) => e.currentTarget.src = `https://ui-avatars.com/api/?name=${leader.name.replace(' ', '+')}&background=111&color=fff&size=512`}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                   
                   {/* Name Overlay (Bottom Left) */}
                   <div className="absolute bottom-0 left-0 p-6 w-full">
                      <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest mb-2 inline-block">
                        {leader.role}
                      </span>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        {leader.name}
                      </h3>
                   </div>
                </div>

                {/* Quote / Message Area */}
                <div className="p-8 relative">
                   <Quote className="absolute top-6 left-6 text-red-600/20 w-8 h-8 transform -scale-x-100" />
                   <p className="text-gray-400 italic text-sm leading-relaxed pl-4 pt-2 border-l-2 border-red-600/30">
                     "{leader.message}"
                   </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <ContactSection />
    </div>
  );
}