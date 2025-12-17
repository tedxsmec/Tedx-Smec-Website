// // // // // src/components/Navbar.jsx
// // // // import React, { useEffect, useState } from "react";
// // // // import { Menu, X } from "lucide-react";

// // // // export default function Navbar({ onNavigate, offset = 80 }) {
// // // //   const [mobileOpen, setMobileOpen] = useState(false);
// // // //   const [active, setActive] = useState("home");
// // // //   const [scrolled, setScrolled] = useState(false);

// // // //   const NAV_ITEMS = [
// // // //     { id: "home", label: "Home" },
// // // //     { id: "about", label: "About" },
// // // //     { id: "events", label: "Events" },
// // // //     { id: "speakers", label: "Speakers" },
// // // //     { id: "team", label: "Team" },
// // // //     { id: "sponsors", label: "Sponsors" },
// // // //     { id: "gallery", label: "Gallery" },
// // // //     { id: "contact", label: "Contact" },
// // // //   ];

// // // //   const navigateTo = (id) => {
// // // //     // close mobile menu
// // // //     setMobileOpen(false);

// // // //     // if parent provided a custom navigation handler, use it
// // // //     if (typeof onNavigate === "function") {
// // // //       onNavigate(id);
// // // //       setActive(id);
// // // //       return;
// // // //     }

// // // //     const el = document.getElementById(id);
// // // //     if (!el) return;

// // // //     const top = el.getBoundingClientRect().top + window.scrollY - offset;
// // // //     window.scrollTo({ top, behavior: "smooth" });

// // // //     // immediately mark as active so UI updates without waiting for scroll
// // // //     setActive(id);
// // // //   };

// // // //   // Active section on scroll
// // // //   useEffect(() => {
// // // //     let mounted = true;

// // // //     const handleScroll = () => {
// // // //       if (!mounted) return;

// // // //       const y = window.scrollY;
// // // //       setScrolled(y > 40);

// // // //       const scrollPos = y + offset + 10;

// // // //       for (const item of NAV_ITEMS) {
// // // //         const el = document.getElementById(item.id);
// // // //         if (!el) continue;

// // // //         const top = el.offsetTop;
// // // //         const bottom = top + el.offsetHeight;

// // // //         if (scrollPos >= top && scrollPos < bottom) {
// // // //           setActive(item.id);
// // // //           break;
// // // //         }
// // // //       }
// // // //     };

// // // //     window.addEventListener("scroll", handleScroll, { passive: true });
// // // //     // run once to set initial state
// // // //     handleScroll();

// // // //     return () => {
// // // //       mounted = false;
// // // //       window.removeEventListener("scroll", handleScroll);
// // // //     };
// // // //     // eslint-disable-next-line react-hooks/exhaustive-deps
// // // //   }, [offset]);

// // // //   // prevent background scroll when mobile menu is open
// // // //   useEffect(() => {
// // // //     if (mobileOpen) {
// // // //       document.body.style.overflow = "hidden";
// // // //     } else {
// // // //       document.body.style.overflow = "";
// // // //     }
// // // //     // cleanup on unmount
// // // //     return () => {
// // // //       document.body.style.overflow = "";
// // // //     };
// // // //   }, [mobileOpen]);

// // // //   return (
// // // //     <header
// // // //       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// // // //         scrolled
// // // //           ? "bg-black/90 backdrop-blur-md border-b border-red-500/20"
// // // //           : "bg-transparent"
// // // //       }`}
// // // //     >
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //         {/* Top row */}
// // // //         <div className="flex h-16 items-center justify-between">
// // // //           {/* Logo */}
// // // //           <div
// // // //             onClick={() => navigateTo("home")}
// // // //             className="cursor-pointer select-none font-extrabold text-xl tracking-wider flex items-center gap-2"
// // // //             role="button"
// // // //             aria-label="Go to home"
// // // //             tabIndex={0}
// // // //             onKeyDown={(e) => {
// // // //               if (e.key === "Enter") navigateTo("home");
// // // //             }}
// // // //           >
// // // //             <span className="text-red-600">TEDx</span>
// // // //             <span>SMEC</span>
// // // //           </div>

// // // //           {/* Desktop nav */}
// // // //           <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
// // // //             {NAV_ITEMS.map((item) => (
// // // //               <button
// // // //                 key={item.id}
// // // //                 onClick={() => navigateTo(item.id)}
// // // //                 className={`text-sm transition relative ${
// // // //                   active === item.id
// // // //                     ? "text-red-500 font-semibold"
// // // //                     : "text-gray-300 hover:text-red-400"
// // // //                 }`}
// // // //                 aria-current={active === item.id ? "page" : undefined}
// // // //               >
// // // //                 {item.label}

// // // //                 {active === item.id && (
// // // //                   <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-600 rounded" />
// // // //                 )}
// // // //               </button>
// // // //             ))}

// // // //             <button
// // // //               onClick={() => navigateTo("events")}
// // // //               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-black rounded-full font-semibold"
// // // //             >
// // // //               Register
// // // //             </button>
// // // //           </nav>

// // // //           {/* Mobile Menu Button */}
// // // //           <button
// // // //             onClick={() => setMobileOpen(!mobileOpen)}
// // // //             className="md:hidden p-2 rounded bg-white/10"
// // // //             aria-label={mobileOpen ? "Close menu" : "Open menu"}
// // // //             aria-expanded={mobileOpen}
// // // //           >
// // // //             {mobileOpen ? <X size={20} /> : <Menu size={20} />}
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Mobile Nav */}
// // // //       {mobileOpen && (
// // // //         <div className="md:hidden bg-black border-t border-red-500/20">
// // // //           <div className="px-4 py-4 space-y-2">
// // // //             {NAV_ITEMS.map((item) => (
// // // //               <button
// // // //                 key={item.id}
// // // //                 onClick={() => navigateTo(item.id)}
// // // //                 className={`block w-full text-left px-3 py-2 rounded-lg ${
// // // //                   active === item.id
// // // //                     ? "bg-red-600 text-black"
// // // //                     : "text-gray-300 hover:bg-gray-800"
// // // //                 }`}
// // // //               >
// // // //                 {item.label}
// // // //               </button>
// // // //             ))}

// // // //             <button
// // // //               onClick={() => navigateTo("events")}
// // // //               className="w-full mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-black rounded-full font-semibold"
// // // //             >
// // // //               Register
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </header>
// // // //   );
// // // // }


// // // // src/components/Navbar.jsx
// // // import React, { useEffect, useState } from "react";
// // // import { Menu, X } from "lucide-react";

// // // export default function Navbar({ onNavigate, offset = 80 }) {
// // //   const [mobileOpen, setMobileOpen] = useState(false);
// // //   const [active, setActive] = useState("home");
// // //   const [scrolled, setScrolled] = useState(false);

// // //   // FIXED: Gallery → media (REAL section ID)
// // //   const NAV_ITEMS = [
// // //     { id: "home", label: "Home" },
// // //     { id: "about", label: "About" },
// // //     { id: "events", label: "Events" },
// // //     { id: "speakers", label: "Speakers" },
// // //     { id: "team", label: "Team" },
// // //     { id: "sponsors", label: "Sponsors" },
// // //     { id: "media", label: "Gallery" }, // FIXED
// // //     { id: "contact", label: "Contact" },
// // //   ];

// // //   const navigateTo = (id) => {
// // //     setMobileOpen(false);

// // //     if (typeof onNavigate === "function") {
// // //       onNavigate(id);
// // //       setActive(id);
// // //       return;
// // //     }

// // //     const el = document.getElementById(id);
// // //     if (!el) return;

// // //     const top = el.getBoundingClientRect().top + window.scrollY - offset;
// // //     window.scrollTo({ top, behavior: "smooth" });
// // //     setActive(id);
// // //   };

// // //   // Active item on scroll
// // //   useEffect(() => {
// // //     let mounted = true;

// // //     const handleScroll = () => {
// // //       if (!mounted) return;

// // //       const y = window.scrollY;
// // //       setScrolled(y > 40);

// // //       const scrollPos = y + offset + 10;

// // //       for (const item of NAV_ITEMS) {
// // //         const el = document.getElementById(item.id);
// // //         if (!el) continue;

// // //         const top = el.offsetTop;
// // //         const bottom = top + el.offsetHeight;

// // //         if (scrollPos >= top && scrollPos < bottom) {
// // //           setActive(item.id);
// // //           break;
// // //         }
// // //       }
// // //     };

// // //     window.addEventListener("scroll", handleScroll, { passive: true });
// // //     handleScroll();

// // //     return () => {
// // //       mounted = false;
// // //       window.removeEventListener("scroll", handleScroll);
// // //     };
// // //   }, [offset]);

// // //   // Prevent background scroll when mobile menu is open
// // //   useEffect(() => {
// // //     if (mobileOpen) {
// // //       document.body.style.overflow = "hidden";
// // //     } else {
// // //       document.body.style.overflow = "";
// // //     }
// // //     return () => {
// // //       document.body.style.overflow = "";
// // //     };
// // //   }, [mobileOpen]);

// // //   return (
// // //     <header
// // //       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
// // //         scrolled
// // //           ? "bg-black/90 backdrop-blur-md border-b border-red-500/20"
// // //           : "bg-transparent"
// // //       }`}
// // //     >
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="flex h-16 items-center justify-between">
          
// // //           {/* Logo */}
// // //           <div
// // //             onClick={() => navigateTo("home")}
// // //             className="cursor-pointer select-none font-extrabold text-xl tracking-wider flex items-center gap-2"
// // //           >
// // //             <span className="text-red-600">TEDx</span>
// // //             <span>SMEC</span>
// // //           </div>

// // //           {/* Desktop Navigation */}
// // //           <nav className="hidden md:flex items-center gap-6">
// // //             {NAV_ITEMS.map((item) => (
// // //               <button
// // //                 key={item.id}
// // //                 onClick={() => navigateTo(item.id)}
// // //                 className={`text-sm transition relative ${
// // //                   active === item.id
// // //                     ? "text-red-500 font-semibold"
// // //                     : "text-gray-300 hover:text-red-400"
// // //                 }`}
// // //               >
// // //                 {item.label}
// // //                 {active === item.id && (
// // //                   <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-red-600 rounded" />
// // //                 )}
// // //               </button>
// // //             ))}

// // //             {/* Register Button → Events section */}
// // //             <button
// // //               onClick={() => navigateTo("events")}
// // //               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-black rounded-full font-semibold"
// // //             >
// // //               Register
// // //             </button>
// // //           </nav>

// // //           {/* Mobile Menu */}
// // //           <button
// // //             onClick={() => setMobileOpen(!mobileOpen)}
// // //             className="md:hidden p-2 rounded bg-white/10"
// // //           >
// // //             {mobileOpen ? <X size={20} /> : <Menu size={20} />}
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Mobile Navigation Drawer */}
// // //       {mobileOpen && (
// // //         <div className="md:hidden bg-black border-t border-red-500/20">
// // //           <div className="px-4 py-4 space-y-2">
// // //             {NAV_ITEMS.map((item) => (
// // //               <button
// // //                 key={item.id}
// // //                 onClick={() => navigateTo(item.id)}
// // //                 className={`block w-full text-left px-3 py-2 rounded-lg ${
// // //                   active === item.id
// // //                     ? "bg-red-600 text-black"
// // //                     : "text-gray-300 hover:bg-gray-800"
// // //                 }`}
// // //               >
// // //                 {item.label}
// // //               </button>
// // //             ))}

// // //             {/* Register Button */}
// // //             <button
// // //               onClick={() => navigateTo("events")}
// // //               className="w-full mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-black rounded-full font-semibold"
// // //             >
// // //               Register
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </header>
// // //   );
// // // }


// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation } from "react-router-dom";

// // export default function Navbar() {
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const location = useLocation();

// //   /* ---------------- Scroll Effect ---------------- */
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setIsScrolled(window.scrollY > 10);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   /* ---------------- Lock Body Scroll ---------------- */
// //   useEffect(() => {
// //     if (isMobileMenuOpen) {
// //       document.body.style.overflow = "hidden";
// //     } else {
// //       document.body.style.overflow = "unset";
// //     }
// //     return () => {
// //       document.body.style.overflow = "unset";
// //     };
// //   }, [isMobileMenuOpen]);

// //   /* ---------------- Close on Route Change ---------------- */
// //   useEffect(() => {
// //     setIsMobileMenuOpen(false);
// //   }, [location.pathname]);

// //   const navLinks = [
// //     { name: "Home", path: "/" },
// //     { name: "About", path: "/about" },
// //     { name: "Speakers", path: "/speakers" },
// //     { name: "Events", path: "/events" },
// //     { name: "Sponsors", path: "/sponsors" },
// //     { name: "Team", path: "/team" },
// //     { name: "Gallery", path: "/gallery" },
// //     { name: "Contact", path: "/contact" },
// //   ];

// //   const isActive = (path) =>
// //     path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

// //   return (
// //     <>
// //       <nav
// //         id="navbar"
// //         // FIX: When menu is open, Nav jumps to z-[120] to sit ABOVE the overlay (z-[100])
// //         className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isMobileMenuOpen ? "z-[120]" : "z-50"
// //           } ${isScrolled || isMobileMenuOpen
// //             ? "bg-black/90 backdrop-blur-md shadow-lg py-3"
// //             : "bg-transparent py-5"
// //           }`}
// //       >
// //         <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-full">

// //           {/* LOGO */}
// //           <Link to="/" className="flex flex-col group select-none relative z-[120]">
// //             <div className="flex items-baseline leading-none">
// //               <div>
// //                 <span className="text-[#E62B1E] font-black text-3xl md:text-3xl tracking-tighter">TED </span>
// //               </div>
// //               <span className="text-[#E62B1E] font-bold text-2xl md:text-2xl relative -top-2 mx-[1px]">x</span>
// //               <span className="text-white font-black text-3xl md:text-3xl tracking-tight ml-1">SMEC</span>
// //             </div>
// //             <div className="text-white/60 text-[9px] font-medium tracking-wide mt-1">
// //               <span className="text-[#E62B1E] font-bold">x</span> = independently organized TED event
// //             </div>
// //           </Link>

// //           {/* DESKTOP NAV */}
// //           <div className="hidden lg:flex items-center gap-8">
// //             {navLinks.map((link) => (
// //               <Link
// //                 key={link.name}
// //                 to={link.path}
// //                 className={`relative text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${isActive(link.path)
// //                     ? "text-[#E62B1E]"
// //                     : "text-gray-300 hover:text-white"
// //                   }`}
// //               >
// //                 {link.name}
// //                 {isActive(link.path) && (
// //                   <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E62B1E] rounded-full" />
// //                 )}
// //               </Link>
// //             ))}
// //             <Link
// //               to="/events"
// //               className="ml-4 px-6 py-2.5 bg-[#E62B1E] hover:bg-[#c41e12] text-white text-sm font-bold uppercase rounded transition-all duration-300 shadow-[0_0_15px_rgba(230,43,30,0.3)] hover:shadow-[0_0_25px_rgba(230,43,30,0.5)]"
// //             >
// //               REGISTER NOW
// //             </Link>
// //           </div>

// //           {/* MOBILE TOGGLE BUTTON - Now clearly clickable */}
// //           <button
// //             className="lg:hidden relative z-[120] p-2 text-white focus:outline-none"
// //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             aria-label="Toggle menu"
// //           >
// //             <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
// //               {/* Hamburger Icon */}
// //               <svg
// //                 className={`w-8 h-8 absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
// //                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
// //               >
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //               </svg>

// //               {/* X Icon */}
// //               <svg
// //                 className={`w-8 h-8 absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
// //                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
// //               >
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //               </svg>
// //             </div>
// //           </button>
// //         </div>
// //       </nav>

// //       {/* ---------------- MOBILE MENU OVERLAY ---------------- */}
// //       <div
// //         className={`fixed inset-0 z-[100] bg-black flex flex-col h-[100dvh] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
// //           }`}
// //       >

// //         {/* TOP BAR SPACER - Keeps links from hiding behind logo */}
// //         <div className="h-28 flex-shrink-0" />

// //         {/* CENTERED LINKS */}
// //         <div className="flex-1 flex flex-col items-center justify-start gap-8 overflow-y-auto py-4">
// //           {navLinks.map((link, idx) => (
// //             <Link
// //               key={link.name}
// //               to={link.path}
// //               className={`text-3xl font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-110 ${isActive(link.path) ? "text-[#E62B1E]" : "text-white/80 hover:text-white"
// //                 }`}
// //               style={{
// //                 transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : '0ms',
// //                 opacity: isMobileMenuOpen ? 1 : 0,
// //                 transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
// //               }}
// //             >
// //               {link.name}
// //             </Link>
// //           ))}
// //         </div>

// //         {/* BOTTOM CTA */}
// //         <div className="p-8 flex-shrink-0 border-t border-white/10 bg-neutral-900/50 backdrop-blur-sm">
// //           <Link
// //             to="/events"
// //             className="block w-full text-center py-4 bg-[#E62B1E] active:bg-[#c41e12] text-white text-xl font-bold uppercase rounded shadow-lg shadow-red-900/30"
// //           >
// //             REGISTER NOW
// //           </Link>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   /* ---------------- Scroll Effect ---------------- */
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   /* ---------------- Lock Body Scroll ---------------- */
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [isMobileMenuOpen]);

//   /* ---------------- Close on Route Change ---------------- */
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Speakers", path: "/speakers" },
//     { name: "Events", path: "/events" },
//     { name: "Sponsors", path: "/sponsors" },
//     { name: "Team", path: "/team" },
//     { name: "Gallery", path: "/gallery" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const isActive = (path) =>
//     path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

//   return (
//     <>
//       <nav
//         id="navbar"
//         // FIX: When menu is open, Nav jumps to z-[120] to sit ABOVE the overlay (z-[100])
//         className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isMobileMenuOpen ? "z-[120]" : "z-50"
//           } ${isScrolled || isMobileMenuOpen
//             ? "bg-black/90 backdrop-blur-md shadow-lg py-3"
//             : "bg-transparent py-5"
//           }`}
//       >
//         <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-full">

//           {/* LOGO */}
//           <Link to="/" className="flex flex-col group select-none relative z-[120]">
//             <div className="flex items-baseline leading-none">
//               <div>
//                 <span className="text-[#E62B1E] font-black text-3xl md:text-3xl tracking-tighter">TED </span>
//               </div>
//               <span className="text-[#E62B1E] font-bold text-2xl md:text-2xl relative -top-2 mx-[1px]">x</span>
//               <span className="text-white font-black text-3xl md:text-3xl tracking-tight ml-1">SMEC</span>
//             </div>
//             <div className="text-white/60 text-[9px] font-medium tracking-wide mt-1">
//               <span className="text-[#E62B1E] font-bold">x</span> = independently organized TED event
//             </div>
//           </Link>

//           {/* DESKTOP NAV */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className={`relative text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${isActive(link.path)
//                     ? "text-[#E62B1E]"
//                     : "text-gray-300 hover:text-white"
//                   }`}
//               >
//                 {link.name}
//                 {isActive(link.path) && (
//                   <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E62B1E] rounded-full" />
//                 )}
//               </Link>
//             ))}
//             <Link
//               to="/events"
//               className="ml-4 px-6 py-2.5 bg-[#E62B1E] hover:bg-[#c41e12] text-white text-sm font-bold uppercase rounded transition-all duration-300 shadow-[0_0_15px_rgba(230,43,30,0.3)] hover:shadow-[0_0_25px_rgba(230,43,30,0.5)]"
//             >
//               REGISTER NOW
//             </Link>
//           </div>

//           {/* MOBILE TOGGLE BUTTON - Now clearly clickable */}
//           <button
//             className="lg:hidden relative z-[120] p-2 text-white focus:outline-none"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
//               {/* Hamburger Icon */}
//               <svg
//                 className={`w-8 h-8 absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
//                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>

//               {/* X Icon */}
//               <svg
//                 className={`w-8 h-8 absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
//                 fill="none" stroke="currentColor" viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//           </button>
//         </div>
//       </nav>

//       {/* ---------------- MOBILE MENU OVERLAY ---------------- */}
//       <div
//         className={`fixed inset-0 z-[100] bg-black flex flex-col h-[100dvh] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
//           }`}
//       >

//         {/* TOP BAR SPACER - Keeps links from hiding behind logo */}
//         <div className="h-28 flex-shrink-0" />

//         {/* CENTERED LINKS */}
//         <div className="flex-1 flex flex-col items-center justify-start gap-8 overflow-y-auto py-4">
//           {navLinks.map((link, idx) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className={`text-3xl font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-110 ${isActive(link.path) ? "text-[#E62B1E]" : "text-white/80 hover:text-white"
//                 }`}
//               style={{
//                 transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : '0ms',
//                 opacity: isMobileMenuOpen ? 1 : 0,
//                 transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
//               }}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         {/* BOTTOM CTA */}
//         <div className="p-8 flex-shrink-0 border-t border-white/10 bg-neutral-900/50 backdrop-blur-sm">
//           <Link
//             to="/events"
//             className="block w-full text-center py-4 bg-[#E62B1E] active:bg-[#c41e12] text-white text-xl font-bold uppercase rounded shadow-lg shadow-red-900/30"
//           >
//             REGISTER NOW
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Lock Body Scroll ---------------- */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  /* ---------------- Close on Route Change ---------------- */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Speakers", path: "/speakers" },
    { name: "Events", path: "/events" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Team", path: "/team" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        id="navbar"
        // FIX: When menu is open, Nav jumps to z-[120] to sit ABOVE the overlay (z-[100])
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isMobileMenuOpen ? "z-[120]" : "z-50"
          } ${isScrolled || isMobileMenuOpen
            ? "bg-black/90 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-full">

          {/* LOGO */}
          <Link to="/" className="flex flex-col group select-none relative z-[120]">
            <div className="flex items-baseline leading-none">
              <div>
                <span className="text-[#E62B1E] font-black text-3xl md:text-3xl tracking-tighter">TED </span>
              </div>
              <span className="text-[#E62B1E] font-bold text-2xl md:text-2xl relative -top-2 mx-[1px]">x</span>
              <span className="text-white font-black text-3xl md:text-3xl tracking-tight ml-1">SMEC</span>
            </div>
            <div className="text-white/60 text-[9px] font-medium tracking-wide mt-1">
              <span className="text-[#E62B1E] font-bold">x</span> = independently organized TED event
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${isActive(link.path)
                    ? "text-[#E62B1E]"
                    : "text-gray-300 hover:text-white"
                  }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#E62B1E] rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/events"
              className="ml-4 px-6 py-2.5 bg-[#E62B1E] hover:bg-[#c41e12] text-white text-sm font-bold uppercase rounded transition-all duration-300 shadow-[0_0_15px_rgba(230,43,30,0.3)] hover:shadow-[0_0_25px_rgba(230,43,30,0.5)]"
            >
              REGISTER NOW
            </Link>
          </div>

          {/* MOBILE TOGGLE BUTTON - Now clearly clickable */}
          <button
            className="lg:hidden relative z-[120] p-2 text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
              {/* Hamburger Icon */}
              <svg
                className={`w-8 h-8 absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>

              {/* X Icon */}
              <svg
                className={`w-8 h-8 absolute transition-all duration-300 transform ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>
        </div>
      </nav>

      {/* ---------------- MOBILE MENU OVERLAY ---------------- */}
      <div
        className={`fixed inset-0 z-[100] bg-black flex flex-col h-[100dvh] transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
      >

        {/* TOP BAR SPACER - Keeps links from hiding behind logo */}
        <div className="h-28 flex-shrink-0" />

        {/* CENTERED LINKS */}
        <div className="flex-1 flex flex-col items-center justify-start gap-8 overflow-y-auto py-4">
          {navLinks.map((link, idx) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-3xl font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-110 ${isActive(link.path) ? "text-[#E62B1E]" : "text-white/80 hover:text-white"
                }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="p-8 flex-shrink-0 border-t border-white/10 bg-neutral-900/50 backdrop-blur-sm">
          <Link
            to="/events"
            className="block w-full text-center py-4 bg-[#E62B1E] active:bg-[#c41e12] text-white text-xl font-bold uppercase rounded shadow-lg shadow-red-900/30"
          >
            REGISTER NOW
          </Link>
        </div>
      </div>
    </>
  );
}