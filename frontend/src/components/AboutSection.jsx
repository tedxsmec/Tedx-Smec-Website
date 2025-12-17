
// // // frontend /src / components/AboutSection.jsx
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
// import { ArrowRight, Globe, School, X } from "lucide-react";

// export default function AboutSection() {
//   return (
//     <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      
//       {/* Background Ambience */}
//       <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* HEADER */}
//         <div className="text-center mb-12 md:mb-16">
//           <span className="text-red-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-2 block">
//             The Convergence
//           </span>
//           <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
//             Global Vision. <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Local Roots.</span>
//           </h2>
//         </div>

//         {/* DUAL CARDS LAYOUT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-stretch">

//           {/* CARD 1: TEDx Mission */}
//           <div className="group relative bg-neutral-900/40 border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-neutral-900/60 transition-all duration-500 overflow-hidden">
//             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12 duration-700">
//                <Globe size={150} />
//             </div>
            
//             <div className="relative z-10">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20">
//                   <span className="text-white font-black text-xl"></span>
//                 </div>
//                 <div className="h-px flex-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
//               </div>
              
//               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">The Global Spark</h3>
//               <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
//                 TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At TEDxSMEC, we combine the global philosophy of <span className="text-white">"Ideas Worth Spreading"</span> with our unique community spirit.
//               </p>

//               <Link to="/about" className="inline-flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider text-xs md:text-sm hover:text-white transition-colors">
//                 Read Our Story <ArrowRight size={16} />
//               </Link>
//             </div>
//           </div>

//           {/* CARD 2: SMEC Foundation */}
//           <div className="group relative bg-neutral-900/40 border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-neutral-900/60 transition-all duration-500 overflow-hidden">
//             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:-rotate-12 duration-700">
//                <School size={150} />
//             </div>
            
//             <div className="relative z-10">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
//                   <span className="text-black font-black text-xl"></span>
//                 </div>
//                 <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent"></div>
//               </div>
              
//               <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">The Academic Core</h3>
//               <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
//                 St. Martin's Engineering College provides the intellectual ecosystem where these ideas take root. As a hub of excellence in Hyderabad, SMEC nurtures the <span className="text-white">critical thinking</span> needed to turn abstract concepts into reality.
//               </p>

//               <a href="https://smec.ac.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white/70 font-bold uppercase tracking-wider text-xs md:text-sm hover:text-red-500 transition-colors">
//                 Visit SMEC <ArrowRight size={16} />
//               </a>
//             </div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }




import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mic2, BookOpen } from "lucide-react";

import tedxLogo from "../assets/tedx_logo.png";
import smecLogo from "../assets/smec_logo.jpeg";

const FeatureCard = ({ 
  title, 
  subtitle,
  description, 
  logoSrc, 
  link, 
  linkText, 
  isExternal, 
  variant, 
  Icon 
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`group relative flex flex-col justify-between h-full min-h-[420px] rounded-[2rem] p-8 md:p-10 overflow-hidden border transition-all duration-500 hover:-translate-y-2
      ${isDark 
        ? "bg-black border-red-900 hover:border-red-600 hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.9)]" 
        : "bg-white/20 border-gray-200 hover:border-red-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]"
      }
    `}>
      
      {/* 1. Background Decor (Subtle & Abstract) */}
      <div className={`absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
        ${isDark 
          ? "bg-gradient-to-br from-red-950/40 via-transparent to-transparent" 
          : "bg-gradient-to-br from-red-50/80 via-transparent to-transparent"
        }`} 
      />

      {/* 2. Top Section: Icon & Visible Logo */}
      <div className="relative z-10 flex justify-between items-start mb-8">
        {/* Animated Icon Box */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors duration-300
          ${isDark 
            ? "bg-white/5 border-white/10 text-red-500 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600" 
            : "bg-gray-50 border-gray-100 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600"
          }`}>
          <Icon size={26} strokeWidth={2} />
        </div>

        {/* LOGO: Distinct and Visible */}
        <div className={`h-12 w-auto px-4 py-2 rounded-lg flex items-center justify-center backdrop-blur-sm border
           ${isDark ? "bg-white/10 border-white/10" : "bg-white border-gray-100 shadow-sm"}`}>
          <img 
            src={logoSrc} 
            alt="Logo" 
            className="h-full w-auto object-contain" 
          />
        </div>
      </div>

      {/* 3. Text Content */}
      <div className="relative z-10 flex-grow">
        <span className={`block text-xs font-bold tracking-[0.2em] uppercase mb-3
          ${isDark ? "text-red-500" : "text-red-600"}`}>
          {subtitle}
        </span>
        
        <h3 className={`text-3xl md:text-4xl font-black mb-4 leading-tight
          ${isDark ? "text-red-600" : "text-red-700"}`}>
          {title}
        </h3>
        
        <p className={`text-base md:text-lg leading-relaxed mb-8 font-medium
          ${isDark ? "text-gray-400 group-hover:text-gray-300" : "text-white-500 group-hover:text-white-700"}`}>
          {description}
        </p>
      </div>

      {/* 4. Action Footer */}
      <div className="relative z-10 pt-6 mt-auto border-t border-solid border-opacity-20 
        ${isDark ? 'border-gray-700' : 'border-gray-300'}">
        {isExternal ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noreferrer" 
            className={`inline-flex items-center gap-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:gap-5
              ${isDark ? "text-white hover:text-red-500" : "text-black hover:text-red-600"}`}
          >
            {linkText} <ArrowRight size={18} />
          </a>
        ) : (
          <Link 
            to={link} 
            className={`inline-flex items-center gap-3 font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-300 hover:gap-5
              ${isDark ? "text-white hover:text-red-500" : "text-black hover:text-red-600"}`}
          >
            {linkText} <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default function AboutSection() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden selection:bg-red-600 selection:text-white">
      
      {/* Minimalist Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6">
            Two Forces 
            <span className="text-red-600"> One Vision</span>
          </h2>
          <div className="h-1 w-24 bg-red-600 rounded-full mb-6" />

        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* CARD 1: TEDx (Dark Theme) */}
          <FeatureCard 
            variant="dark"
            subtitle="The Platform"
            title="Ideas Worth Spreading"
            description={
              <>
                A global movement finding its voice in our community. We curate talks that spark conversation, challenge conventions, and inspire deep connection among diverse minds.
              </>
            }
            logoSrc={tedxLogo}
            Icon={Mic2}
            link="/about"
            linkText="Discover Our Mission"
            isExternal={false}
          />

          {/* CARD 2: SMEC (White Theme) */}
          <FeatureCard 
            variant="light"
            subtitle="The Foundation"
            title="Excellence in Action"
            description={
              <>
                St. Martin's Engineering College provides the intellectual soil where innovation takes root. Fostering a culture where academic brilliance meets creative execution.
              </>
            }
            logoSrc={smecLogo}
            Icon={BookOpen}
            link="https://smec.ac.in"
            linkText="Visit SMEC Official"
            isExternal={true}
          />

        </div>
      </div>
    </section>
  );
}