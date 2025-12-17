// // // // frontend/src/components/SpeakersSection.jsx
// // // import React, { useEffect, useState } from "react";
// // // import { api } from "../api";
// // // import { buildImg } from "../utils";
// // // import { Play, Instagram, Linkedin, Twitter } from "lucide-react";

// // // /**
// // //  * pickRandom(arr, n) – picks up to n random items
// // //  */
// // // function pickRandom(arr = [], n = 5) {
// // //   if (!Array.isArray(arr) || arr.length === 0) return [];
// // //   if (arr.length <= n) return arr.slice();
// // //   const a = arr.slice();
// // //   for (let i = a.length - 1; i > 0; i--) {
// // //     const j = Math.floor(Math.random() * (i + 1));
// // //     [a[i], a[j]] = [a[j], a[i]];
// // //   }
// // //   return a.slice(0, n);
// // // }

// // // export default function SpeakersSection() {
// // //   const [speakers, setSpeakers] = useState([]);
// // //   const [displayed, setDisplayed] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     let mounted = true;
// // //     const endpoints = ["/admin/speakers/public/list", "/speakers"];

// // //     const fetchSpeakers = async () => {
// // //       setLoading(true);
// // //       setError(null);
// // //       for (const ep of endpoints) {
// // //         try {
// // //           const res = await api.get(ep);
// // //           const data = res?.data?.success ? res.data.data : res.data;
// // //           if (!mounted) return;

// // //           const list = Array.isArray(data) ? data : (data?.list || []);
// // //           setSpeakers(list);
// // //           setDisplayed(pickRandom(list, 5));
// // //           setLoading(false);
// // //           return;
// // //         } catch (err) {
// // //           if (endpoints.indexOf(ep) === endpoints.length - 1) {
// // //             console.error("Speakers load error:", err);
// // //             if (mounted) setError(err?.response?.data?.message || err.message);
// // //             setLoading(false);
// // //           }
// // //         }
// // //       }
// // //     };

// // //     fetchSpeakers();
// // //     return () => { mounted = false; };
// // //   }, []);

// // //   useEffect(() => {
// // //     if (speakers.length > 0) {
// // //       setDisplayed(pickRandom(speakers, 5));
// // //     }
// // //   }, [speakers]);

// // //   const getSocial = (speaker, key) => {
// // //     if (!speaker) return undefined;
// // //     const sl = speaker.socialLinks || {};
// // //     return (
// // //       sl[key] ||
// // //       speaker[key] ||
// // //       speaker[`${key}Url`] ||
// // //       speaker[`${key}url`] ||
// // //       null
// // //     );
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="p-6 text-white max-w-7xl mx-auto">
// // //         <div className="hero-panel p-6 rounded animate-pulse">
// // //           Loading speakers...
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="p-6 text-white max-w-7xl mx-auto">
// // //         <div className="bg-red-700 p-4 rounded">Error: {error}</div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <section id="speakers" className="min-h-screen py-16 bg-gradient-to-br from-gray-950 to-black">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// // //         <div className="text-center mb-16">
// // //           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// // //             Our <span className="text-red-600">Speakers</span>
// // //           </h2>
// // //           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
// // //             Meet the visionaries and innovators sharing their ideas
// // //           </p>
// // //         </div>

// // //         {displayed.length === 0 ? (
// // //           <p className="text-center text-gray-400">No speakers found.</p>
// // //         ) : (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// // //             {displayed.map((speaker) => {
// // //               const id = speaker._id || speaker.id || speaker.slug || speaker.name;
// // //               const img = buildImg(speaker.photo || speaker.imageUrl || speaker.image);

// // //               const linkedin = getSocial(speaker, "linkedin");
// // //               const instagram = getSocial(speaker, "instagram");
// // //               const twitter = getSocial(speaker, "twitter");

// // //               const openTab = (e, url) => {
// // //                 e.stopPropagation();
// // //                 e.preventDefault();
// // //                 window.open(url, "_blank", "noopener,noreferrer");
// // //               };

// // //               return (
// // //                 <div
// // //                   key={id}
// // //                   onClick={() => (window.location.href = `/speakers/${id}`)}
// // //                   className="group relative bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
// // //                 >
// // //                   <div className="relative h-80 overflow-hidden">

// // //                     <img
// // //                       src={img}
// // //                       alt={speaker.name}
// // //                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// // //                     />

// // //                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

// // //                     {/* 🔥 Social Icons (Top Left) */}
// // //                     <div className="absolute top-4 left-4 flex items-center gap-3 z-20">
// // //                       {instagram && (
// // //                         <button
// // //                           onClick={(e) => openTab(e, instagram)}
// // //                           className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-lg hover:shadow-red-600/50 hover:scale-110"
// // //                         >
// // //                           <Instagram size={20} className="text-white" />
// // //                         </button>
// // //                       )}

// // //                       {linkedin && (
// // //                         <button
// // //                           onClick={(e) => openTab(e, linkedin)}
// // //                           className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-lg hover:shadow-red-600/50 hover:scale-110"
// // //                         >
// // //                           <Linkedin size={20} className="text-white" />
// // //                         </button>
// // //                       )}

// // //                       {twitter && (
// // //                         <button
// // //                           onClick={(e) => openTab(e, twitter)}
// // //                           className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-lg hover:shadow-red-600/50 hover:scale-110"
// // //                         >
// // //                           <Twitter size={20} className="text-white" />
// // //                         </button>
// // //                       )}
// // //                     </div>

// // //                     {/* Bottom Overlay */}
// // //                     <div className="absolute bottom-0 left-0 right-0 p-6">
// // //                       <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
// // //                         {speaker.name}
// // //                       </h3>
// // //                       <p className="text-sm text-gray-300">{speaker.designation}</p>
// // //                     </div>
// // //                   </div>

// // //                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// // //                     <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
// // //                       View Bio
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         )}

// // //       </div>
// // //     </section>
// // //   );
// // // }


// // // frontend/src/components/SpeakersSection.jsx
// // import React, { useEffect, useState } from "react";
// // import { api } from "../api";
// // import { buildImg } from "../utils";
// // import { Play, Instagram, Linkedin, Twitter } from "lucide-react";

// // /**
// //  * pickRandom(arr, n) – picks up to n random items
// //  */
// // function pickRandom(arr = [], n = 5) {
// //   if (!Array.isArray(arr) || arr.length === 0) return [];
// //   if (arr.length <= n) return arr.slice();
// //   const a = arr.slice();
// //   for (let i = a.length - 1; i > 0; i--) {
// //     const j = Math.floor(Math.random() * (i + 1));
// //     [a[i], a[j]] = [a[j], a[i]];
// //   }
// //   return a.slice(0, n);
// // }

// // /** ensureUrl: adds https:// if missing so window.open works reliably */
// // function ensureUrl(raw) {
// //   if (!raw) return null;
// //   const s = String(raw).trim();
// //   if (s.startsWith("http://") || s.startsWith("https://")) return s;
// //   return `https://${s}`;
// // }

// // export default function SpeakersSection() {
// //   const [speakers, setSpeakers] = useState([]);
// //   const [displayed, setDisplayed] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     let mounted = true;
// //     const endpoints = ["/admin/speakers/public/list", "/speakers"];

// //     const fetchSpeakers = async () => {
// //       setLoading(true);
// //       setError(null);
// //       for (const ep of endpoints) {
// //         try {
// //           const res = await api.get(ep);
// //           const data = res?.data?.success ? res.data.data : res.data;
// //           if (!mounted) return;

// //           const list = Array.isArray(data) ? data : (data?.list || []);
// //           setSpeakers(list);
// //           setDisplayed(pickRandom(list, 5));
// //           setLoading(false);
// //           return;
// //         } catch (err) {
// //           if (endpoints.indexOf(ep) === endpoints.length - 1) {
// //             console.error("Speakers load error:", err);
// //             if (mounted) setError(err?.response?.data?.message || err.message);
// //             setLoading(false);
// //           }
// //         }
// //       }
// //     };

// //     fetchSpeakers();
// //     return () => {
// //       mounted = false;
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (speakers.length > 0) {
// //       setDisplayed(pickRandom(speakers, 5));
// //     }
// //   }, [speakers]);

// //   const getSocial = (speaker, key) => {
// //     if (!speaker) return undefined;
// //     const sl = speaker.socialLinks || {};
// //     return (
// //       sl[key] ||
// //       speaker[key] ||
// //       speaker[`${key}Url`] ||
// //       speaker[`${key}url`] ||
// //       speaker[`${key}Link`] ||
// //       null
// //     );
// //   };

// //   // helper to open social links in a new tab and prevent parent click navigation
// //   const openTab = (e, rawUrl) => {
// //     if (e && typeof e.stopPropagation === "function") e.stopPropagation();
// //     const url = ensureUrl(rawUrl);
// //     if (!url) return;
// //     window.open(url, "_blank", "noopener,noreferrer");
// //   };

// //   if (loading) {
// //     return (
// //       <div className="p-6 text-white max-w-7xl mx-auto">
// //         <div className="hero-panel p-6 rounded animate-pulse">Loading speakers...</div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="p-6 text-white max-w-7xl mx-auto">
// //         <div className="bg-red-700 p-4 rounded">Error: {error}</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <section id="speakers" className="min-h-screen py-16 bg-gradient-to-br from-gray-950 to-black">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-16">
// //           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// //             Our <span className="text-red-600">Speakers</span>
// //           </h2>
// //           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
// //             Meet the visionaries and innovators sharing their ideas
// //           </p>
// //         </div>

// //         {displayed.length === 0 ? (
// //           <p className="text-center text-gray-400">No speakers found.</p>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //             {displayed.map((speaker) => {
// //               const id = encodeURIComponent(speaker._id || speaker.id || speaker.slug || speaker.name);
// //               const img = buildImg(speaker.photo || speaker.imageUrl || speaker.image);
// //               const linkedin = getSocial(speaker, "linkedin");
// //               const instagram = getSocial(speaker, "instagram");
// //               const twitter = getSocial(speaker, "twitter");

// //               return (
// //                 <div
// //                   key={id}
// //                   onClick={() => (window.location.href = `/speakers/${id}`)}
// //                   className="group relative bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
// //                 >
// //                   <div className="relative h-80 overflow-hidden">
// //                     <img
// //                       src={img}
// //                       alt={speaker.name || "Speaker"}
// //                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //                     />

// //                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

// //                     {/* Social Icons (Top Left) */}
// //                     <div className="absolute top-4 left-4 flex items-center gap-3 z-20">
// //                       {instagram && (
// //                         <button
// //                           onClick={(e) => openTab(e, instagram)}
// //                           aria-label={`${speaker.name || "Speaker"} on Instagram`}
// //                           className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-lg hover:shadow-red-600/50 hover:scale-110"
// //                         >
// //                           <Instagram size={20} className="text-white" />
// //                         </button>
// //                       )}

// //                       {linkedin && (
// //                         <button
// //                           onClick={(e) => openTab(e, linkedin)}
// //                           aria-label={`${speaker.name || "Speaker"} on LinkedIn`}
// //                           className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-lg hover:shadow-red-600/50 hover:scale-110"
// //                         >
// //                           <Linkedin size={20} className="text-white" />
// //                         </button>
// //                       )}

// //                       {twitter && (
// //                         <button
// //                           onClick={(e) => openTab(e, twitter)}
// //                           aria-label={`${speaker.name || "Speaker"} on Twitter`}
// //                           className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-lg hover:shadow-red-600/50 hover:scale-110"
// //                         >
// //                           <Twitter size={20} className="text-white" />
// //                         </button>
// //                       )}
// //                     </div>

// //                     {/* Bottom Overlay */}
// //                     <div className="absolute bottom-0 left-0 right-0 p-6">
// //                       <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
// //                         {speaker.name}
// //                       </h3>
// //                       <p className="text-sm text-gray-300">{speaker.designation}</p>
// //                     </div>
// //                   </div>

// //                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                     <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
// //                       View Bio
// //                     </div>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }


// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { api } from "../api";
// import { buildImg } from "../utils";
// import { Instagram, Linkedin, Twitter, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// // Fallback Data
// const DUMMY_SPEAKER = [
//   {
//     id: "dummy-virat",
//     name: "Virat Kohli",
//     designation: "Indian Cricketer & Leader",
//     photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
//     socialLinks: {
//       instagram: "https://instagram.com/virat.kohli",
//       twitter: "https://twitter.com/imVkohli",
//       linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
//     }
//   },
//   {
//     id: "dummy-virat-2",
//     name: "Virat Kohli",
//     designation: "Indian Cricketer & Leader",
//     photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
//     socialLinks: {
//       instagram: "https://instagram.com/virat.kohli",
//       twitter: "https://twitter.com/imVkohli",
//       linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
//     }
//   }
// ];

// const SpeakerSkeleton = () => (
//   <div className="min-w-full sm:min-w-[50%] lg:min-w-[calc(25%-18px)] snap-center">
//     <div className="relative h-[450px] rounded-xl bg-neutral-900 border border-white/5 overflow-hidden animate-pulse">
//       <div className="w-full h-full bg-neutral-800/50" />
//       <div className="absolute bottom-0 left-0 w-full p-6 space-y-4 bg-gradient-to-t from-black/80 to-transparent">
//         <div className="w-12 h-1 bg-neutral-700 rounded" />
//         <div className="h-8 w-3/4 bg-neutral-700 rounded" />
//         <div className="h-4 w-1/2 bg-neutral-700 rounded" />
//       </div>
//     </div>
//   </div>
// );

// export default function SpeakersSection() {
//   const [speakers, setSpeakers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchSpeakers = async () => {
//       try {
//         const endpoints = ["/admin/speakers/public/list", "/speakers"];
//         let data = [];
//         let success = false;

//         for (const ep of endpoints) {
//           try {
//             const res = await api.get(ep);
//             if (res.data?.success) {
//               data = res.data.data;
//               success = true;
//               break;
//             } else if (Array.isArray(res.data)) {
//               data = res.data;
//               success = true;
//               break;
//             }
//           } catch (e) {
//             continue;
//           }
//         }

//         if (isMounted) {
//           const list = Array.isArray(data) ? data : (data?.list || []);
//           if (list.length > 0) {
//             setSpeakers(list);
//           } else {
//             // API worked but returned empty -> Show Dummy
//             setSpeakers(DUMMY_SPEAKER);
//           }
//           setLoading(false);
//         }
//       } catch (err) {
//         console.error("Failed to load speakers", err);
//         if (isMounted) {
//           // API Failed completely -> Show Dummy
//           setSpeakers(DUMMY_SPEAKER);
//           setLoading(false);
//         }
//       }
//     };

//     fetchSpeakers();
//     return () => { isMounted = false; };
//   }, []);

//   const getSocial = (speaker, key) => {
//     if (!speaker) return undefined;
//     const sl = speaker.socialLinks || {};
//     return sl[key] || speaker[key] || speaker[`${key}Url`] || null;
//   };

//   // Scroll Handlers
//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const { current } = scrollRef;
//       const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth;
//       current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   return (
//     <section className="relative py-24 bg-black overflow-hidden">
      
//       {/* Background Ambience */}
//       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

//       <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
//         {/* Header with Navigation Buttons */}
//         <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
//           <div>
//             <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-2 block">
//               The Lineup
//             </span>
//             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
//               Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Speakers</span>
//             </h2>
//           </div>
          
//           <div className="flex items-center gap-4">
//             {/* Scroll Buttons (Hidden on mobile as swipe is better) */}
//             <div className="hidden md:flex gap-2">
//               <button 
//                 onClick={() => scroll("left")}
//                 className="p-3 rounded-full border border-white/20 text-white hover:bg-red-600 hover:border-red-600 transition-all active:scale-95"
//               >
//                 <ChevronLeft size={24} />
//               </button>
//               <button 
//                 onClick={() => scroll("right")}
//                 className="p-3 rounded-full border border-white/20 text-white hover:bg-red-600 hover:border-red-600 transition-all active:scale-95"
//               >
//                 <ChevronRight size={24} />
//               </button>
//             </div>

//             <Link 
//               to="/speakers" 
//               className="group hidden sm:flex items-center gap-2 text-white/70 hover:text-white transition-colors ml-4"
//             >
//               <span className="uppercase tracking-widest text-sm font-bold">View Grid</span>
//               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </div>
//         </div>

//         {/* CAROUSEL CONTAINER */}
//         {/* snap-x mandatory: Forces the scroll to stop exactly on a card
//             overflow-x-auto: Enables horizontal scrolling
//             scrollbar-hide: Utility to hide scrollbar (ensure you have one in your CSS or standard tailwind plugin)
//         */}
//         <div 
//           ref={scrollRef}
//           className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide"
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Inline style to hide scrollbar cross-browser
//         >
//           {loading ? (
//             <>
//               <SpeakerSkeleton />
//               <SpeakerSkeleton />
//               <SpeakerSkeleton />
//               <SpeakerSkeleton />
//             </>
//           ) : (
//             speakers.map((speaker, idx) => {
//               const img = speaker.id === 'dummy-virat' ? speaker.photo : buildImg(speaker.photo || speaker.imageUrl || speaker.image);
//               const id = speaker._id || speaker.id || speaker.slug;
//               const linkedin = getSocial(speaker, "linkedin");
//               const instagram = getSocial(speaker, "instagram");
//               const twitter = getSocial(speaker, "twitter");

//               return (
//                 <div 
//                   key={id || idx}
//                   className="min-w-full sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-center flex-shrink-0"
//                 >
//                   <motion.div 
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5 }}
//                     viewport={{ once: true }}
//                     className="group relative h-[450px] overflow-hidden rounded-xl bg-neutral-900 cursor-pointer border border-white/5 hover:border-red-600/30 transition-all"
//                     onClick={() => {
//                         if(id !== 'dummy-virat') window.location.href = `/speakers/${id}`;
//                     }}
//                   >
//                     {/* Image Layer */}
//                     <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
//                       <img
//                         src={img}
//                         alt={speaker.name}
//                         loading="lazy"
//                         className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
//                         onError={(e) => {
//                             e.target.onerror = null; 
//                             e.target.src = "https://via.placeholder.com/400x600?text=TEDx+Speaker";
//                         }}
//                       />
//                     </div>

//                     {/* Overlays */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

//                     {/* Socials */}
//                     <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
//                       {[
//                         { icon: Linkedin, link: linkedin },
//                         { icon: Twitter, link: twitter },
//                         { icon: Instagram, link: instagram }
//                       ].map((social, i) => social.link && (
//                         <a
//                           key={i}
//                           href={social.link}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           onClick={(e) => e.stopPropagation()}
//                           className="p-2.5 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-colors"
//                         >
//                           <social.icon size={18} />
//                         </a>
//                       ))}
//                     </div>

//                     {/* Text */}
//                     <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//                       <div className="w-12 h-1 bg-red-600 mb-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
//                       <h3 className="text-3xl font-black text-white uppercase leading-none mb-2 drop-shadow-lg">
//                         {speaker.name.split(" ")[0]}
//                         <span className="block text-red-600/80 group-hover:text-white transition-colors">
//                           {speaker.name.split(" ").slice(1).join(" ")}
//                         </span>
//                       </h3>
//                       <p className="text-sm font-medium text-gray-300 line-clamp-2">
//                         {speaker.designation}
//                       </p>
//                     </div>

//                   </motion.div>
//                 </div>
//               );
//             })
//           )}
//         </div>
        
//         {/* Mobile Swipe Indicator (Optional) */}
//         <div className="md:hidden flex justify-center mt-4 gap-2">
//             <span className="text-xs text-gray-500 uppercase tracking-widest animate-pulse">Swipe to explore</span>
//         </div>

//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../api";
import { buildImg } from "../utils";
import { Instagram, Linkedin, Twitter, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Fallback Data
const DUMMY_SPEAKER = [
  {
    id: "dummy-virat",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-2",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-3",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-4",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-5",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  },
  {
    id: "dummy-virat-6",
    name: "Virat Kohli",
    designation: "Indian Cricketer & Leader",
    photo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg", // Wiki commons public image
    socialLinks: {
      instagram: "https://instagram.com/virat.kohli",
      twitter: "https://twitter.com/imVkohli",
      linkedin: "https://www.linkedin.com/in/virat-kohli-123456789/"
    }
  }
];

const SpeakerSkeleton = () => (
  <div className="min-w-full sm:min-w-[50%] lg:min-w-[calc(25%-18px)] snap-center">
    <div className="relative h-[450px] rounded-xl bg-neutral-900 border border-white/5 overflow-hidden animate-pulse">
      <div className="w-full h-full bg-neutral-800/50" />
      <div className="absolute bottom-0 left-0 w-full p-6 space-y-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="w-12 h-1 bg-neutral-700 rounded" />
        <div className="h-8 w-3/4 bg-neutral-700 rounded" />
        <div className="h-4 w-1/2 bg-neutral-700 rounded" />
      </div>
    </div>
  </div>
);

export default function SpeakersSection() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSpeakers = async () => {
      try {
        const endpoints = ["/admin/speakers/public/list", "/speakers"];
        let data = [];
        let success = false;

        for (const ep of endpoints) {
          try {
            const res = await api.get(ep);
            if (res.data?.success) {
              data = res.data.data;
              success = true;
              break;
            } else if (Array.isArray(res.data)) {
              data = res.data;
              success = true;
              break;
            }
          } catch (e) {
            continue;
          }
        }

        if (isMounted) {
          const list = Array.isArray(data) ? data : (data?.list || []);
          if (list.length > 0) {
            setSpeakers(list);
          } else {
            // API worked but returned empty -> Show Dummy
            setSpeakers(DUMMY_SPEAKER);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load speakers", err);
        if (isMounted) {
          // API Failed completely -> Show Dummy
          setSpeakers(DUMMY_SPEAKER);
          setLoading(false);
        }
      }
    };

    fetchSpeakers();
    return () => { isMounted = false; };
  }, []);

  const getSocial = (speaker, key) => {
    if (!speaker) return undefined;
    const sl = speaker.socialLinks || {};
    return sl[key] || speaker[key] || speaker[`${key}Url`] || null;
  };

  // Scroll Handlers
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -el.offsetWidth : el.offsetWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Card renderer (shared between carousel and grid)
  const renderCard = (speaker, idx, clickable = true) => {
    const img = speaker.id === 'dummy-virat' ? speaker.photo : buildImg(speaker.photo || speaker.imageUrl || speaker.image);
    const id = speaker._id || speaker.id || speaker.slug || idx;
    const linkedin = getSocial(speaker, "linkedin");
    const instagram = getSocial(speaker, "instagram");
    const twitter = getSocial(speaker, "twitter");

    const handleActivate = (e) => {
      if (!clickable) return;
      if (id !== 'dummy-virat') window.location.href = `/speakers/${id}`;
    };

    const onKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivate(e);
      }
    };

    return (
      <div 
        key={id || idx}
        className="min-w-[90%] sm:min-w-[48%] lg:min-w-[23%] snap-center flex-shrink-0"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          role={clickable ? 'link' : undefined}
          tabIndex={clickable ? 0 : -1}
          onKeyDown={onKeyDown}
          className="group relative h-[380px] overflow-hidden rounded-xl bg-neutral-900 cursor-pointer border border-white/5 hover:border-red-600/30 transition-all focus:outline-none focus:ring-4 focus:ring-red-700/30"
          onClick={handleActivate}
          aria-label={`Open speaker ${speaker.name}`}
        >
          {/* Image Layer */}
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
            <img
              src={img}
              alt={speaker.name}
              loading="lazy"
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
              onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://via.placeholder.com/400x600?text=TEDx+Speaker";
              }}
            />
          </div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

          {/* Socials */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
            {[
              { icon: Linkedin, link: linkedin },
              { icon: Twitter, link: twitter },
              { icon: Instagram, link: instagram }
            ].map((social, i) => social.link && (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-red-600 transition-colors"
                aria-label={`Open ${speaker.name}'s ${social.link.includes('instagram') ? 'Instagram' : social.link.includes('linkedin') ? 'LinkedIn' : 'Twitter'}`}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Text */}
          <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-12 h-1 bg-red-600 mb-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <h3 className="text-3xl font-black text-white uppercase leading-none mb-2 drop-shadow-lg">
              {speaker.name?.split(" ")[0]}
              <span className="block text-red-600/80 group-hover:text-white transition-colors">
                {speaker.name?.split(" ").slice(1).join(" ")}
              </span>
            </h3>
            <p className="text-sm font-medium text-gray-300 line-clamp-2">
              {speaker.designation}
            </p>
          </div>

        </motion.div>
      </div>
    );
  };

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header with Navigation Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-2 block">
              The Lineup
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Speakers</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Scroll Buttons (visible on mobile carousel only) */}
            <div className="flex md:hidden gap-2">
              <button 
                onClick={() => scroll("left")}
                className="p-3 rounded-full border border-white/20 text-white hover:bg-red-600 hover:border-red-600 transition-all active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="p-3 rounded-full border border-white/20 text-white hover:bg-red-600 hover:border-red-600 transition-all active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/speakers"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
                aria-label="View all speakers"
              >
                View All Speakers
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: horizontal carousel (touch/swipe) */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label="Speakers carousel"
          >
            {loading ? (
              <>
                <SpeakerSkeleton />
                <SpeakerSkeleton />
                <SpeakerSkeleton />
                <SpeakerSkeleton />
              </>
            ) : (
              speakers.map((speaker, idx) => renderCard(speaker, idx))
            )}
          </div>
        </div>

        {/* Desktop: responsive grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
          {loading ? (
            <>
              <SpeakerSkeleton />
              <SpeakerSkeleton />
              <SpeakerSkeleton />
              <SpeakerSkeleton />
            </>
          ) : (
            speakers.map((speaker, idx) => (
              <div key={speaker._id || speaker.id || idx} className="w-full">
                {renderCard(speaker, idx, false)}
              </div>
            ))
          )}
        </div>
        
        {/* Mobile Swipe Indicator (Optional) */}
        <div className="md:hidden flex justify-center mt-4 gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-widest animate-pulse">Swipe to explore</span>
        </div>

      </div>
    </section>
  );
}