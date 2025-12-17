// // // // // // // src/components/Sponsors.jsx
// // // // // // import React, { useEffect, useState, useMemo } from "react";
// // // // // // import { api } from "../api";
// // // // // // import { buildImg } from "../utils";

// // // // // // export default function Sponsors() {
// // // // // //   const [sponsors, setSponsors] = useState([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     let mounted = true;
// // // // // //     const endpoints = ["/admin/sponsors/public/list", "/sponsors"];

// // // // // //     const load = async () => {
// // // // // //       setLoading(true);
// // // // // //       setError(null);

// // // // // //       for (const ep of endpoints) {
// // // // // //         try {
// // // // // //           const res = await api.get(ep);
// // // // // //           const data = res?.data?.success ? res.data.data : res.data;
// // // // // //           if (!mounted) return;

// // // // // //           if (Array.isArray(data)) {
// // // // // //             setSponsors(data);
// // // // // //             setLoading(false);
// // // // // //             return;
// // // // // //           }
// // // // // //         } catch (err) {
// // // // // //           if (endpoints.indexOf(ep) === endpoints.length - 1) {
// // // // // //             setError(err?.response?.data?.message || err.message || "Failed to load sponsors");
// // // // // //             setLoading(false);
// // // // // //           }
// // // // // //         }
// // // // // //       }
// // // // // //     };

// // // // // //     load();
// // // // // //     return () => (mounted = false);
// // // // // //   }, []);

// // // // // //   const loopList = useMemo(() => {
// // // // // //     if (!Array.isArray(sponsors) || sponsors.length === 0) return [];
// // // // // //     return [...sponsors, ...sponsors];
// // // // // //   }, [sponsors]);

// // // // // //   if (loading) return <div className="p-6 text-white">Loading sponsors...</div>;
// // // // // //   if (error) return <div className="p-6 bg-red-700 text-white rounded">{error}</div>;
// // // // // //   if (!sponsors.length) return <div className="p-6 text-gray-400">No sponsors found.</div>;

// // // // // //   return (
// // // // // //     <section className="w-full bg-black py-8 border-t border-gray-900">
// // // // // //       <div className="max-w-7xl mx-auto px-4">
// // // // // //         <h2 className="text-2xl font-semibold text-white mb-6">Our Sponsors</h2>

// // // // // //         <div className="relative overflow-hidden group">
// // // // // //           <div
// // // // // //             className="sponsor-track"
// // // // // //             style={{ "--marquee-duration": "10s" }} // ← FAST SPEED HERE
// // // // // //           >
// // // // // //             {loopList.map((sp, idx) => {
// // // // // //               const key = sp._id || sp.id || `${sp.name}-${idx}`;
// // // // // //               const src = buildImg(sp.logo || sp.logoUrl);

// // // // // //               return (
// // // // // //                 <div
// // // // // //                   key={key}
// // // // // //                   className="sponsor-item flex-shrink-0 w-40 h-20 flex items-center justify-center p-3"
// // // // // //                 >
// // // // // //                   <img
// // // // // //                     src={src}
// // // // // //                     alt={sp.name}
// // // // // //                     className="max-h-full max-w-full object-contain"
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               );
// // // // // //             })}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <style>{`
// // // // // //         .sponsor-track {
// // // // // //           display: flex;
// // // // // //           gap: 20px;
// // // // // //           align-items: center;
// // // // // //           animation: marquee var(--marquee-duration, 10s) linear infinite;
// // // // // //           will-change: transform;
// // // // // //           padding: 10px 0;
// // // // // //         }

// // // // // //         .sponsor-item img {
// // // // // //           filter: grayscale(100%);
// // // // // //           transition: filter 200ms ease, transform 200ms ease;
// // // // // //         }

// // // // // //         .sponsor-item:hover img,
// // // // // //         .sponsor-item:focus img {
// // // // // //           filter: none;
// // // // // //           transform: scale(1.05);
// // // // // //         }

// // // // // //         .group:hover .sponsor-track {
// // // // // //           animation-play-state: paused;
// // // // // //         }

// // // // // //         @keyframes marquee {
// // // // // //           0% { transform: translateX(0); }
// // // // // //           100% { transform: translateX(-50%); }
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </section>
// // // // // //   );
// // // // // // }


// // // // // // src/components/Sponsors.jsx
// // // // // import React, { useEffect, useState, useMemo } from "react";
// // // // // import { api } from "../api";
// // // // // import { buildImg } from "../utils";

// // // // // export default function Sponsors() {
// // // // //   const [sponsors, setSponsors] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     let mounted = true;
// // // // //     const endpoints = ["/admin/sponsors/public/list", "/sponsors"];

// // // // //     const load = async () => {
// // // // //       setLoading(true);
// // // // //       setError(null);

// // // // //       for (const ep of endpoints) {
// // // // //         try {
// // // // //           const res = await api.get(ep);
// // // // //           const data = res?.data?.success ? res.data.data : res.data;
// // // // //           if (!mounted) return;

// // // // //           if (Array.isArray(data)) {
// // // // //             setSponsors(data);
// // // // //             setLoading(false);
// // // // //             return;
// // // // //           }
// // // // //         } catch (err) {
// // // // //           if (endpoints.indexOf(ep) === endpoints.length - 1) {
// // // // //             setError(err?.response?.data?.message || err.message || "Failed to load sponsors");
// // // // //             setLoading(false);
// // // // //           }
// // // // //         }
// // // // //       }
// // // // //     };

// // // // //     load();
// // // // //     return () => (mounted = false);
// // // // //   }, []);

// // // // //   const loopList = useMemo(() => {
// // // // //     if (!Array.isArray(sponsors) || sponsors.length === 0) return [];
// // // // //     return [...sponsors, ...sponsors];
// // // // //   }, [sponsors]);

// // // // //   if (loading) return <div className="p-6 text-white">Loading sponsors...</div>;
// // // // //   if (error) return <div className="p-6 bg-red-700 text-white rounded">{error}</div>;
// // // // //   if (!sponsors.length) return <div className="p-6 text-gray-400">No sponsors found.</div>;

// // // // //   return (
// // // // //     <section className="w-full bg-black py-8 border-t border-gray-900">
// // // // //       <div className="max-w-7xl mx-auto px-4">
// // // // //         <h2 className="text-2xl font-semibold text-white mb-6">Our Sponsors</h2>

// // // // //         <div className="relative overflow-hidden group">
// // // // //           <div
// // // // //             className="sponsor-track"
// // // // //             style={{ "--marquee-duration": "10s" }} 
// // // // //           >
// // // // //             {loopList.map((sp, idx) => {
// // // // //               const key = sp._id || sp.id || `${sp.name}-${idx}`;
// // // // //               const src = buildImg(sp.logo || sp.logoUrl);

// // // // //               // NEW: sponsor link
// // // // //               const sponsorUrl =
// // // // //                 sp.url || sp.link || sp.website || null;

// // // // //               const ItemContent = (
// // // // //                 <div className="sponsor-item flex-shrink-0 w-40 h-20 flex items-center justify-center p-3">
// // // // //                   <img
// // // // //                     src={src}
// // // // //                     alt={sp.name}
// // // // //                     className="max-h-full max-w-full object-contain"
// // // // //                   />
// // // // //                 </div>
// // // // //               );

// // // // //               return sponsorUrl ? (
// // // // //                 <a
// // // // //                   key={key}
// // // // //                   href={sponsorUrl}
// // // // //                   target="_blank"
// // // // //                   rel="noopener noreferrer"
// // // // //                   className="block"
// // // // //                 >
// // // // //                   {ItemContent}
// // // // //                 </a>
// // // // //               ) : (
// // // // //                 <div key={key}>{ItemContent}</div>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <style>{`
// // // // //         .sponsor-track {
// // // // //           display: flex;
// // // // //           gap: 20px;
// // // // //           align-items: center;
// // // // //           animation: marquee var(--marquee-duration, 10s) linear infinite;
// // // // //           will-change: transform;
// // // // //           padding: 10px 0;
// // // // //         }

// // // // //         .sponsor-item img {
// // // // //           filter: grayscale(100%);
// // // // //           transition: filter 200ms ease, transform 200ms ease;
// // // // //         }

// // // // //         .sponsor-item:hover img,
// // // // //         .sponsor-item:focus img {
// // // // //           filter: none;
// // // // //           transform: scale(1.05);
// // // // //         }

// // // // //         .group:hover .sponsor-track {
// // // // //           animation-play-state: paused;
// // // // //         }

// // // // //         @keyframes marquee {
// // // // //           0% { transform: translateX(0); }
// // // // //           100% { transform: translateX(-50%); }
// // // // //         }
// // // // //       `}</style>
// // // // //     </section>
// // // // //   );
// // // // // }


// // // // import React, { useEffect, useState, useMemo } from "react";
// // // // import { Link } from "react-router-dom";
// // // // import { api } from "../api";
// // // // import { buildImg } from "../utils";

// // // // // --- DUMMY DATA FALLBACK ---
// // // // const DUMMY_SPONSORS = [
// // // //   { _id: "spon-1", name: "TechVision", category: "Title Sponsor", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
// // // //   { _id: "spon-2", name: "GiftBox", category: "Gifting Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
// // // //   { _id: "spon-3", name: "GreenEarth", category: "Eco Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
// // // //   { _id: "spon-4", name: "SoundWave", category: "Audio Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" },
// // // //   { _id: "spon-5", name: "PixelStudio", category: "Design Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" },
// // // //   { _id: "spon-6", name: "BrewMasters", category: "Beverage Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" }
// // // // ];

// // // // export default function SponsorsSection() {
// // // //   const [sponsors, setSponsors] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     let mounted = true;
// // // //     const fetchSponsors = async () => {
// // // //       try {
// // // //         const res = await api.get("/sponsors");
// // // //         if (!mounted) return;
// // // //         const data = res.data?.success ? res.data.data : res.data;
// // // //         const list = Array.isArray(data) ? data : [];
// // // //         setSponsors(list.length > 0 ? list : DUMMY_SPONSORS);
// // // //       } catch (err) {
// // // //         if (mounted) setSponsors(DUMMY_SPONSORS);
// // // //       } finally {
// // // //         if (mounted) setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchSponsors();
// // // //     return () => { mounted = false; };
// // // //   }, []);

// // // //   const loopList = useMemo(() => {
// // // //     if (sponsors.length === 0) return [];
// // // //     // Duplicate 4 times for smooth continuous loop
// // // //     return [...sponsors, ...sponsors, ...sponsors, ...sponsors];
// // // //   }, [sponsors]);

// // // //   if (loading) return null;

// // // //   return (
// // // //     <section id="sponsors" className="relative py-20 bg-black overflow-hidden border-t border-white/10">
      
// // // //       {/* 1. HEADER */}
// // // //       <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center text-center">
// // // //         <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">
// // // //           Our Supporters
// // // //         </span>
// // // //         <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
// // // //           Partners in <span className="text-white">Innovation</span>
// // // //         </h2>
// // // //       </div>

// // // //       {/* 2. MARQUEE WRAPPER */}
// // // //       <div className="relative w-full overflow-hidden group py-6 z-10">
        
// // // //         {/* Side Gradients (To hide entrance/exit) */}
// // // //         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
// // // //         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

// // // //         {/* TRACK */}
// // // //         <div className="sponsor-track flex items-center w-max gap-6 md:gap-10">
// // // //           {loopList.map((sp, idx) => {
// // // //             const key = sp._id || `${sp.name}-${idx}`;
// // // //             const src = sp._id.startsWith("spon-") ? sp.logo : buildImg(sp.logo || sp.logoUrl);

// // // //             return (
// // // //               <div
// // // //                 key={key}
// // // //                 className="sponsor-item relative flex items-center justify-center 
// // // //                            w-48 h-28 md:w-64 md:h-36 
// // // //                            bg-white/30 backdrop-blur-sm
// // // //                            border border-white/10 rounded-xl
// // // //                            hover:border-red-600/50 hover:bg-white/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]
// // // //                            transition-all duration-300 cursor-pointer"
// // // //               >
                
// // // //                 {/* LOGO: Always 100% Opacity, Slight Brightness Boost */}
// // // //                 <img
// // // //                   src={src}
// // // //                   alt={sp.name}
// // // //                   className="max-h-12 md:max-h-16 max-w-[75%] object-contain 
// // // //                              opacity-100 brightness-110 filter drop-shadow-lg
// // // //                              transform hover:scale-105 transition-transform duration-300"
// // // //                 />

// // // //                 {/* Category Label (Always Visible, subtle) */}
// // // //                 <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40 group-hover:text-red-500 transition-colors">
// // // //                   {sp.category || "Partner"}
// // // //                 </div>

// // // //               </div>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </div>

// // // //       {/* 3. CTA */}
// // // //       <div className="relative z-10 mt-8 text-center">
// // // //         <Link 
// // // //           to="/sponsors" 
// // // //           className="inline-block px-8 py-3 border border-white/10 hover:border-red-600 rounded-full text-xs font-bold text-white uppercase tracking-widest hover:bg-red-600/10 transition-all"
// // // //         >
// // // //           Become a Sponsor
// // // //         </Link>
// // // //       </div>

// // // //       <style>{`
// // // //         .sponsor-track {
// // // //           animation: marquee 50s linear infinite;
// // // //         }
        
// // // //         /* Pause on hover */
// // // //         .group:hover .sponsor-track {
// // // //           animation-play-state: paused;
// // // //         }

// // // //         @keyframes marquee {
// // // //           0% { transform: translateX(0); }
// // // //           100% { transform: translateX(-25%); }
// // // //         }

// // // //         @media (max-width: 768px) {
// // // //           .sponsor-track {
// // // //             animation-duration: 25s;
// // // //           }
// // // //         }
// // // //       `}</style>
// // // //     </section>
// // // //   );
// // // // }

// // // import React, { useEffect, useState, useMemo } from "react";
// // // import { Link } from "react-router-dom";
// // // import { api } from "../api";
// // // import { buildImg } from "../utils";

// // // // --- DUMMY DATA FALLBACK ---
// // // const DUMMY_SPONSORS = [
// // //   { _id: "spon-1", name: "TechVision", category: "Title Sponsor", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
// // //   { _id: "spon-2", name: "GiftBox", category: "Gifting Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
// // //   { _id: "spon-3", name: "GreenEarth", category: "Eco Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
// // //   { _id: "spon-4", name: "SoundWave", category: "Audio Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" },
// // //   { _id: "spon-5", name: "PixelStudio", category: "Design Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" },
// // //   { _id: "spon-6", name: "BrewMasters", category: "Beverage Partner", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" }
// // // ];

// // // export default function SponsorsSection() {
// // //   const [sponsors, setSponsors] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     let mounted = true;
// // //     const fetchSponsors = async () => {
// // //       try {
// // //         const res = await api.get("/sponsors");
// // //         if (!mounted) return;
// // //         const data = res.data?.success ? res.data.data : res.data;
// // //         const list = Array.isArray(data) ? data : [];
// // //         setSponsors(list.length > 0 ? list : DUMMY_SPONSORS);
// // //       } catch (err) {
// // //         if (mounted) setSponsors(DUMMY_SPONSORS);
// // //       } finally {
// // //         if (mounted) setLoading(false);
// // //       }
// // //     };
// // //     fetchSponsors();
// // //     return () => { mounted = false; };
// // //   }, []);

// // //   const loopList = useMemo(() => {
// // //     if (sponsors.length === 0) return [];
// // //     // Duplicate 4 times for smooth continuous loop
// // //     return [...sponsors, ...sponsors, ...sponsors, ...sponsors];
// // //   }, [sponsors]);

// // //   if (loading) return null;

// // //   return (
// // //     <section id="sponsors" className="relative py-20 bg-black overflow-hidden border-t border-white/10">
      
// // //       {/* 1. HEADER */}
// // //       <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center text-center">
// // //         <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">
// // //           Our Supporters
// // //         </span>
// // //         <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
// // //           Partners in <span className="text-white">Innovation</span>
// // //         </h2>
// // //       </div>

// // //       {/* 2. MARQUEE WRAPPER */}
// // //       <div className="relative w-full overflow-hidden group py-6 z-10">
        
// // //         {/* Side Gradients (To hide entrance/exit) */}
// // //         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
// // //         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

// // //         {/* TRACK */}
// // //         <div className="sponsor-track flex items-center w-max gap-6 md:gap-10">
// // //           {loopList.map((sp, idx) => {
// // //             const key = sp._id || `${sp.name}-${idx}`;
// // //             const src = sp._id.startsWith("spon-") ? sp.logo : buildImg(sp.logo || sp.logoUrl);

// // //             return (
// // //               <div
// // //                 key={key}
// // //                 className="sponsor-item relative flex items-center justify-center 
// // //                            w-48 h-28 md:w-64 md:h-36 
// // //                            bg-white/30 backdrop-blur-sm
// // //                            border border-white/10 rounded-xl
// // //                            hover:border-red-600/50 hover:bg-white/50 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]
// // //                            transition-all duration-300 cursor-pointer"
// // //               >
                
// // //                 {/* LOGO: Always 100% Opacity, Slight Brightness Boost */}
// // //                 <img
// // //                   src={src}
// // //                   alt={sp.name}
// // //                   className="max-h-12 md:max-h-16 max-w-[75%] object-contain 
// // //                              opacity-100 brightness-110 filter drop-shadow-lg
// // //                              transform hover:scale-105 transition-transform duration-300"
// // //                 />

// // //                 {/* Category Label (Always Visible, subtle) */}
// // //                 <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40 group-hover:text-red-500 transition-colors">
// // //                   {sp.category || "Partner"}
// // //                 </div>

// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>

// // //       {/* 3. CTA */}
// // //       <div className="relative z-10 mt-8 text-center">
// // //         <Link 
// // //           to="/sponsors" 
// // //           className="inline-block px-8 py-3 border border-white/10 hover:border-red-600 rounded-full text-xs font-bold text-white uppercase tracking-widest hover:bg-red-600/10 transition-all"
// // //         >
// // //           Become a Sponsor
// // //         </Link>
// // //       </div>

// // //       <style>{`
// // //         .sponsor-track {
// // //           animation: marquee 50s linear infinite;
// // //         }
        
// // //         /* Pause on hover */
// // //         .group:hover .sponsor-track {
// // //           animation-play-state: paused;
// // //         }

// // //         @keyframes marquee {
// // //           0% { transform: translateX(0); }
// // //           100% { transform: translateX(-25%); }
// // //         }

// // //         @media (max-width: 768px) {
// // //           .sponsor-track {
// // //             animation-duration: 25s;
// // //           }
// // //         }
// // //       `}</style>
// // //     </section>
// // //   );
// // // }


// // // import React, { useEffect, useState, useMemo } from "react";
// // // import { Link } from "react-router-dom";
// // // import { api } from "../api";
// // // import { buildImg } from "../utils";

// // // // --- FALLBACK DATA ---
// // // const DUMMY_SPONSORS = [
// // //   {
// // //     _id: "spon-1",
// // //     name: "TechVision",
// // //     category: "Title Sponsor",
// // //     logo:
// // //       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
// // //     website: "https://google.com",
// // //   },
// // //   {
// // //     _id: "spon-2",
// // //     name: "GiftBox",
// // //     category: "Gifting Partner",
// // //     logo:
// // //       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
// // //     website: "https://amazon.com",
// // //   },
// // //   {
// // //     _id: "spon-3",
// // //     name: "GreenEarth",
// // //     category: "Eco Partner",
// // //     logo:
// // //       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
// // //   },
// // // ];

// // // export default function SponsorsSection() {
// // //   const [sponsors, setSponsors] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     let mounted = true;

// // //     const loadSponsors = async () => {
// // //       try {
// // //         const endpoints = ["/admin/sponsors/public/list", "/sponsors"];

// // //         for (const ep of endpoints) {
// // //           try {
// // //             const res = await api.get(ep);
// // //             const data = res?.data?.success ? res.data.data : res.data;

// // //             if (mounted && Array.isArray(data) && data.length) {
// // //               setSponsors(data);
// // //               return;
// // //             }
// // //           } catch {
// // //             // try next endpoint
// // //           }
// // //         }

// // //         if (mounted) setSponsors(DUMMY_SPONSORS);
// // //       } catch {
// // //         if (mounted) setSponsors(DUMMY_SPONSORS);
// // //       } finally {
// // //         if (mounted) setLoading(false);
// // //       }
// // //     };

// // //     loadSponsors();
// // //     return () => (mounted = false);
// // //   }, []);

// // //   const loopList = useMemo(() => {
// // //     if (!sponsors.length) return [];
// // //     return [...sponsors, ...sponsors, ...sponsors, ...sponsors];
// // //   }, [sponsors]);

// // //   if (loading) return null;

// // //   return (
// // //     <section
// // //       id="sponsors"
// // //       className="relative py-20 bg-black overflow-hidden border-t border-white/10"
// // //     >
// // //       {/* HEADER */}
// // //       <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
// // //         <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs block mb-3">
// // //           Our Supporters
// // //         </span>
// // //         <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
// // //           Partners in <span className="text-red-500">Innovation</span>
// // //         </h2>
// // //       </div>

// // //       {/* MARQUEE */}
// // //       <div className="relative w-full overflow-hidden group py-6 z-10">
// // //         {/* Edge fades */}
// // //         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
// // //         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

// // //         <div className="sponsor-track flex items-center w-max gap-6 md:gap-10">
// // //           {loopList.map((sp, idx) => {
// // //             const key = sp._id || `${sp.name}-${idx}`;
// // //             const imgSrc = sp._id?.startsWith("spon-")
// // //               ? sp.logo
// // //               : buildImg(sp.logo || sp.logoUrl);

// // //             const Wrapper = sp.website || sp.url ? "a" : "div";
// // //             const wrapperProps =
// // //               Wrapper === "a"
// // //                 ? {
// // //                     href: sp.website || sp.url,
// // //                     target: "_blank",
// // //                     rel: "noopener noreferrer",
// // //                   }
// // //                 : {};

// // //             return (
// // //               <Wrapper
// // //                 key={key}
// // //                 {...wrapperProps}
// // //                 className="sponsor-item relative flex items-center justify-center
// // //                            w-48 h-28 md:w-64 md:h-36
// // //                            bg-white/30 backdrop-blur-sm
// // //                            border border-white/10 rounded-xl
// // //                            hover:border-red-600/50 hover:bg-white/50
// // //                            hover:shadow-[0_0_20px_rgba(220,38,38,0.25)]
// // //                            transition-all duration-300"
// // //               >
// // //                 <img
// // //                   src={imgSrc}
// // //                   alt={sp.name}
// // //                   className="max-h-12 md:max-h-16 max-w-[75%] object-contain
// // //                              brightness-110 drop-shadow-lg
// // //                              hover:scale-105 transition-transform duration-300"
// // //                 />

// // //                 <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40 group-hover:text-red-500 transition-colors">
// // //                   {sp.category || "Partner"}
// // //                 </div>
// // //               </Wrapper>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>

// // //       {/* CTA */}
// // //       <div className="relative z-10 mt-10 text-center">
// // //         <Link
// // //           to="/sponsors"
// // //           className="inline-block px-8 py-3 rounded-full
// // //                      border border-white/10 hover:border-red-600
// // //                      text-xs font-bold text-white uppercase tracking-widest
// // //                      hover:bg-red-600/10 transition-all"
// // //         >
// // //           Become a Sponsor
// // //         </Link>
// // //       </div>

// // //       {/* ANIMATION */}
// // //       <style>{`
// // //         .sponsor-track {
// // //           animation: marquee 50s linear infinite;
// // //         }

// // //         .group:hover .sponsor-track {
// // //           animation-play-state: paused;
// // //         }

// // //         @keyframes marquee {
// // //           0% { transform: translateX(0); }
// // //           100% { transform: translateX(-25%); }
// // //         }

// // //         @media (max-width: 768px) {
// // //           .sponsor-track {
// // //             animation-duration: 25s;
// // //           }
// // //         }
// // //       `}</style>
// // //     </section>
// // //   );
// // // }


// // import React, { useEffect, useState, useMemo } from "react";
// // import { Link } from "react-router-dom";
// // import { api } from "../api";
// // import { buildImg } from "../utils";

// // // ─── FALLBACK DATA ─────────────────────────────────────────────
// // const DUMMY_SPONSORS = [
// //   {
// //     _id: "spon-1",
// //     name: "TechVision",
// //     category: "Title Sponsor",
// //     logo:
// //       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
// //     website: "https://google.com",
// //   },
// //   {
// //     _id: "spon-2",
// //     name: "GiftBox",
// //     category: "Gifting Partner",
// //     logo:
// //       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
// //     website: "https://amazon.com",
// //   },
// //   {
// //     _id: "spon-3",
// //     name: "GreenEarth",
// //     category: "Eco Partner",
// //     logo:
// //       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
// //   },
// // ];

// // export default function SponsorsSection() {
// //   const [sponsors, setSponsors] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // ─── LOAD SPONSORS ───────────────────────────────────────────
// //   useEffect(() => {
// //     let mounted = true;

// //     const loadSponsors = async () => {
// //       try {
// //         // ✅ ONLY real backend endpoint
// //         const res = await api.get("/admin/sponsors/public/list");

// //         const data = res?.data?.success ? res.data.data : res.data;

// //         if (mounted && Array.isArray(data) && data.length > 0) {
// //           setSponsors(data);
// //         } else if (mounted) {
// //           setSponsors(DUMMY_SPONSORS);
// //         }
// //       } catch (err) {
// //         if (mounted) {
// //           console.warn("Sponsors API failed, using fallback");
// //           setSponsors(DUMMY_SPONSORS);
// //         }
// //       } finally {
// //         if (mounted) setLoading(false);
// //       }
// //     };

// //     loadSponsors();
// //     return () => {
// //       mounted = false;
// //     };
// //   }, []);

// //   // ─── DUPLICATE FOR MARQUEE (SAFE KEYS) ───────────────────────
// //   const loopList = useMemo(() => {
// //     if (!sponsors.length) return [];
// //     return sponsors.flatMap((sp, i) =>
// //       Array.from({ length: 4 }).map((_, idx) => ({
// //         ...sp,
// //         __loopKey: `${sp._id || sp.name}-${i}-${idx}`,
// //       }))
// //     );
// //   }, [sponsors]);

// //   if (loading) return null;

// //   return (
// //     <section
// //       id="sponsors"
// //       className="relative py-20 bg-black overflow-hidden border-t border-white/10"
// //     >
// //       {/* ─── HEADER ───────────────────────────────────────────── */}
// //       <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
// //         <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs block mb-3">
// //           Our Supporters
// //         </span>
// //         <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
// //           Partners in <span className="text-red-500">Innovation</span>
// //         </h2>
// //       </div>

// //       {/* ─── MARQUEE ──────────────────────────────────────────── */}
// //       <div className="relative w-full overflow-hidden group py-6 z-10">
// //         {/* Edge fades */}
// //         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
// //         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

// //         <div className="sponsor-track flex items-center w-max gap-6 md:gap-10">
// //           {loopList.map((sp) => {
// //             const imgSrc = sp._id?.startsWith("spon-")
// //               ? sp.logo
// //               : buildImg(sp.logo || sp.logoUrl);

// //             const Wrapper = sp.website || sp.url ? "a" : "div";
// //             const wrapperProps =
// //               Wrapper === "a"
// //                 ? {
// //                     href: sp.website || sp.url,
// //                     target: "_blank",
// //                     rel: "noopener noreferrer",
// //                   }
// //                 : {};

// //             return (
// //               <Wrapper
// //                 key={sp.__loopKey}
// //                 {...wrapperProps}
// //                 className="sponsor-item relative flex items-center justify-center
// //                            w-48 h-28 md:w-64 md:h-36
// //                            bg-white/30 backdrop-blur-sm
// //                            border border-white/10 rounded-xl
// //                            hover:border-red-600/50 hover:bg-white/50
// //                            hover:shadow-[0_0_20px_rgba(220,38,38,0.25)]
// //                            transition-all duration-300"
// //               >
// //                 <img
// //                   src={imgSrc}
// //                   alt={sp.name}
// //                   className="max-h-12 md:max-h-16 max-w-[75%] object-contain
// //                              brightness-110 drop-shadow-lg
// //                              hover:scale-105 transition-transform duration-300"
// //                 />

// //                 <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40 group-hover:text-red-500 transition-colors">
// //                   {sp.category || "Partner"}
// //                 </div>
// //               </Wrapper>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* ─── CTA ──────────────────────────────────────────────── */}
// //       <div className="relative z-10 mt-10 text-center">
// //         <Link
// //           to="/sponsors"
// //           className="inline-block px-8 py-3 rounded-full
// //                      border border-white/10 hover:border-red-600
// //                      text-xs font-bold text-white uppercase tracking-widest
// //                      hover:bg-red-600/10 transition-all"
// //         >
// //           Become a Sponsor
// //         </Link>
// //       </div>

// //       {/* ─── ANIMATION ───────────────────────────────────────── */}
// //       <style>{`
// //         .sponsor-track {
// //           animation: marquee 50s linear infinite;
// //         }

// //         .group:hover .sponsor-track {
// //           animation-play-state: paused;
// //         }

// //         @keyframes marquee {
// //           0% { transform: translateX(0); }
// //           100% { transform: translateX(-25%); }
// //         }

// //         @media (max-width: 768px) {
// //           .sponsor-track {
// //             animation-duration: 25s;
// //           }
// //         }
// //       `}</style>
// //     </section>
// //   );
// // }
// import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { api } from "../api";
// import { buildImg } from "../utils";

// // ─── FALLBACK DATA ─────────────────────────────────────────────
// const DUMMY_SPONSORS = [
//   {
//     _id: "spon-1",
//     name: "TechVision",
//     category: "Title Sponsor",
//     logo:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
//     website: "https://google.com",
//   },
//   {
//     _id: "spon-2",
//     name: "GiftBox",
//     category: "Gifting Partner",
//     logo:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
//     website: "https://amazon.com",
//   },
//   {
//     _id: "spon-3",
//     name: "GreenEarth",
//     category: "Eco Partner",
//     logo:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
//   },
// ];

// export default function SponsorsSection() {
//   const [sponsors, setSponsors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ─── LOAD SPONSORS ───────────────────────────────────────────
//   useEffect(() => {
//     let mounted = true;

//     const loadSponsors = async () => {
//       try {
//         const res = await api.get("/admin/sponsors/public/list");
//         const data = res?.data?.success ? res.data.data : res.data;

//         if (mounted && Array.isArray(data) && data.length > 0) {
//           setSponsors(data);
//         } else if (mounted) {
//           setSponsors(DUMMY_SPONSORS);
//         }
//       } catch (err) {
//         if (mounted) setSponsors(DUMMY_SPONSORS);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadSponsors();
//     return () => (mounted = false);
//   }, []);

//   // ─── DUPLICATE FOR MARQUEE (SAFE UNIQUE KEYS) ────────────────
//   const loopList = useMemo(() => {
//     if (!sponsors.length) return [];
//     return sponsors.flatMap((sp, i) =>
//       Array.from({ length: 4 }).map((_, idx) => ({
//         ...sp,
//         __loopKey: `${sp._id || sp.name}-${i}-${idx}`,
//       }))
//     );
//   }, [sponsors]);

//   if (loading) return null;

//   return (
//     <section
//       id="sponsors"
//       className="relative py-20 bg-black overflow-hidden border-t border-white/10"
//     >
//       {/* ─── HEADER ───────────────────────────────────────────── */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
//         <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs block mb-3">
//           Our Supporters
//         </span>
//         <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
//           Partners in <span className="text-red-500">Innovation</span>
//         </h2>
//       </div>

//       {/* ─── MARQUEE ──────────────────────────────────────────── */}
//       <div className="relative w-full overflow-hidden group py-6 z-10">
//         <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
//         <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

//         <div className="sponsor-track flex items-center w-max gap-6 md:gap-10">
//           {loopList.map((sp) => {
//             const imgSrc = sp._id?.startsWith("spon-")
//               ? sp.logo
//               : buildImg(sp.logo || sp.logoUrl);

//             const sponsorLink = sp.website || sp.url;

//             return sponsorLink ? (
//               // ✅ CLICKABLE CARD → OPENS IN NEW TAB
//               <a
//                 key={sp.__loopKey}
//                 href={sponsorLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="sponsor-item relative flex items-center justify-center
//                            w-48 h-28 md:w-64 md:h-36
//                            bg-white/30 backdrop-blur-sm
//                            border border-white/10 rounded-xl
//                            hover:border-red-600/50 hover:bg-white/50
//                            hover:shadow-[0_0_20px_rgba(220,38,38,0.25)]
//                            transition-all duration-300"
//               >
//                 <img
//                   src={imgSrc}
//                   alt={sp.name}
//                   className="max-h-12 md:max-h-16 max-w-[75%] object-contain
//                              brightness-110 drop-shadow-lg
//                              hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40">
//                   {sp.category || "Partner"}
//                 </div>
//               </a>
//             ) : (
//               // ❌ NON-CLICKABLE CARD
//               <div
//                 key={sp.__loopKey}
//                 className="sponsor-item relative flex items-center justify-center
//                            w-48 h-28 md:w-64 md:h-36
//                            bg-white/30 backdrop-blur-sm
//                            border border-white/10 rounded-xl"
//               >
//                 <img
//                   src={imgSrc}
//                   alt={sp.name}
//                   className="max-h-12 md:max-h-16 max-w-[75%] object-contain brightness-110"
//                 />
//                 <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40">
//                   {sp.category || "Partner"}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ─── CTA ──────────────────────────────────────────────── */}
//       <div className="relative z-10 mt-10 text-center">
//         <Link
//           to="/sponsors"
//           className="inline-block px-8 py-3 rounded-full
//                      border border-white/10 hover:border-red-600
//                      text-xs font-bold text-white uppercase tracking-widest
//                      hover:bg-red-600/10 transition-all"
//         >
//           Become a Sponsor
//         </Link>
//       </div>

//       {/* ─── ANIMATION ───────────────────────────────────────── */}
//       <style>{`
//         .sponsor-track {
//           animation: marquee 50s linear infinite;
//         }
//         .group:hover .sponsor-track {
//           animation-play-state: paused;
//         }
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-25%); }
//         }
//         @media (max-width: 768px) {
//           .sponsor-track {
//             animation-duration: 25s;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }


import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { buildImg } from "../utils";

// ─── FALLBACK (ONLY IF API FAILS) ─────────────────────────────
const DUMMY_SPONSORS = [
  {
    _id: "spon-1",
    name: "TechVision",
    category: "Title Sponsor",
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    website: "https://google.com",
  },
];

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─── LOAD ALL SPONSORS ──────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    const loadSponsors = async () => {
      try {
        const res = await api.get("/admin/sponsors/public/list");
        const data = res?.data?.success ? res.data.data : res.data;

        // ✅ TAKE EVERYTHING BACKEND SENDS
        if (mounted && Array.isArray(data)) {
          setSponsors(data);
        }
      } catch (err) {
        console.warn("Sponsors API failed, using fallback");
        if (mounted) setSponsors(DUMMY_SPONSORS);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadSponsors();
    return () => (mounted = false);
  }, []);

  // ─── DUPLICATE FOR CONTINUOUS MARQUEE ───────────────────────
  const loopList = useMemo(() => {
    if (!sponsors.length) return [];

    // duplicate ONLY for animation (not data loss)
    return sponsors.flatMap((sp, i) =>
      Array.from({ length: 4 }).map((_, idx) => ({
        ...sp,
        __loopKey: `${sp._id || sp.name}-${i}-${idx}`,
      }))
    );
  }, [sponsors]);

  if (loading || !sponsors.length) return null;

  return (
    <section
      id="sponsors"
      className="relative py-20 bg-black overflow-hidden border-t border-white/10"
    >
      {/* HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs block mb-3">
          Our Supporters
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Partners in <span className="text-red-500">Innovation</span>
        </h2>
      </div>

      {/* MARQUEE */}
      <div className="relative w-full overflow-hidden group py-6 z-10">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <div className="sponsor-track flex items-center w-max gap-6 md:gap-10">
          {loopList.map((sp) => {
            const imgSrc = buildImg(sp.logo || sp.logoUrl);
            const sponsorLink = sp.website || sp.url;

            return sponsorLink ? (
              // ✅ ALL SPONSORS → CLICKABLE → NEW TAB
              <a
                key={sp.__loopKey}
                href={sponsorLink}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-item relative flex items-center justify-center
                           w-48 h-28 md:w-64 md:h-36
                           bg-white/30 backdrop-blur-sm
                           border border-white/10 rounded-xl
                           hover:border-red-600/50 hover:bg-white/50
                           hover:shadow-[0_0_20px_rgba(220,38,38,0.25)]
                           transition-all duration-300"
              >
                <img
                  src={imgSrc}
                  alt={sp.name}
                  className="max-h-12 md:max-h-16 max-w-[75%] object-contain
                             brightness-110 drop-shadow-lg"
                />
                <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40">
                  {sp.category || "Partner"}
                </div>
              </a>
            ) : (
              <div
                key={sp.__loopKey}
                className="sponsor-item relative flex items-center justify-center
                           w-48 h-28 md:w-64 md:h-36
                           bg-white/30 backdrop-blur-sm
                           border border-white/10 rounded-xl"
              >
                <img
                  src={imgSrc}
                  alt={sp.name}
                  className="max-h-12 md:max-h-16 max-w-[75%] object-contain brightness-110"
                />
                <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40">
                  {sp.category || "Partner"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-10 text-center">
        <Link
          to="/sponsors"
          className="inline-block px-8 py-3 rounded-full
                     border border-white/10 hover:border-red-600
                     text-xs font-bold text-white uppercase tracking-widest
                     hover:bg-red-600/10 transition-all"
        >
          Become a Sponsor
        </Link>
      </div>

      {/* ANIMATION */}
      <style>{`
        .sponsor-track {
          animation: marquee 50s linear infinite;
        }
        .group:hover .sponsor-track {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @media (max-width: 768px) {
          .sponsor-track {
            animation-duration: 25s;
          }
        }
      `}</style>
    </section>
  );
}
