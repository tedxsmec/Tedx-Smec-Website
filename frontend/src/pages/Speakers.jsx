// // // src/pages/Speakers.jsx
// // import React, { useEffect, useState } from 'react';
// // import { Play } from 'lucide-react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { api } from '../api';
// // import { buildImg } from '../utils';

// // export default function SpeakersPage() {
// //   const [speakers, setSpeakers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     let mounted = true;
// //     const endpoints = ['/admin/speakers/public/list', '/speakers'];

// //     const fetchSpeakers = async () => {
// //       setLoading(true);
// //       setError(null);

// //       for (const ep of endpoints) {
// //         try {
// //           const res = await api.get(ep);
// //           const data = res?.data?.success ? res.data.data : res.data;

// //           if (!mounted) return;

// //           // support either array or { list: [...] } shape
// //           if (Array.isArray(data)) {
// //             setSpeakers(data);
// //             setLoading(false);
// //             return;
// //           }
// //           if (data && Array.isArray(data.list)) {
// //             setSpeakers(data.list);
// //             setLoading(false);
// //             return;
// //           }
// //         } catch (err) {
// //           // if last endpoint, set error
// //           if (endpoints.indexOf(ep) === endpoints.length - 1) {
// //             console.error('Final error loading speakers:', err);
// //             if (!mounted) return;
// //             setError(err?.response?.data?.message || err.message || 'Failed to load speakers');
// //             setLoading(false);
// //           } else {
// //             // continue to next endpoint
// //             continue;
// //           }
// //         }
// //       }
// //     };

// //     fetchSpeakers();
// //     return () => { mounted = false; };
// //   }, []);

// //   const handleSpeakerClick = (sp) => {
// //     const id = sp.slug || sp._id || sp.id;
// //     if (id) navigate(`/speakers/${id}`);
// //     else window.scrollTo({ top: 0, behavior: 'smooth' });
// //   };

// //   if (loading) return (
// //     <div className="p-6 text-white max-w-7xl mx-auto">
// //       <div className="hero-panel p-6 rounded animate-pulse">Loading speakers...</div>
// //     </div>
// //   );

// //   if (error) return (
// //     <div className="p-6 text-white max-w-7xl mx-auto">
// //       <div className="bg-red-700 p-4 rounded">Error loading speakers: {error}</div>
// //     </div>
// //   );

// //   return (
// //     <section className="py-20 bg-gradient-to-br from-gray-950 to-black">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="text-center mb-16">
// //           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// //             Our <span className="text-red-600">Speakers</span>
// //           </h2>
// //           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
// //             Meet the visionaries and innovators sharing their ideas
// //           </p>
// //         </div>

// //         {speakers.length === 0 ? (
// //           <p className="text-center text-gray-400">No speakers found.</p>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
// //             {speakers.map((speaker) => {
// //               const id = speaker._id || speaker.id || speaker.slug || speaker.name;
// //               const img = buildImg(speaker.photo || speaker.image || speaker.avatar);

// //               return (
// //                 <div
// //                   key={id}
// //                   onClick={() => handleSpeakerClick(speaker)}
// //                   className="group relative bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20"
// //                 >
// //                   <div className="relative h-80 overflow-hidden">
// //                     <img
// //                       src={img}
// //                       alt={speaker.name || 'Speaker'}
// //                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //                       onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x800/111827/ffffff?text=Speaker'; }}
// //                     />
// //                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

// //                     {speaker.videoUrl && (
// //                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                         <div className="bg-red-600 rounded-full p-3 transform transition-transform group-hover:scale-110">
// //                           <Play size={24} className="text-white" />
// //                         </div>
// //                       </div>
// //                     )}

// //                     <div className="absolute bottom-0 left-0 right-0 p-6">
// //                       <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-red-600 transition-colors">
// //                         {speaker.name}
// //                       </h3>
// //                       <p className="text-sm text-gray-300 mb-2">{speaker.designation}</p>
// //                       {speaker.talkTopic && (
// //                         <p className="text-xs text-gray-400 italic line-clamp-2">
// //                           "{speaker.talkTopic}"
// //                         </p>
// //                       )}
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


// // src/pages/Speakers.jsx
// import React from "react";
// import SpeakersSection from "../components/SpeakersSection";

// export default function SpeakersPage() {
//   return (
//     <div className="bg-black text-white">
//       <main className="pt-24 px-4 max-w-6xl mx-auto">
//         <SpeakersSection />
//       </main>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mic2, Search } from 'lucide-react';
import { api } from '../api';
import { buildImg } from '../utils';

// --- DUMMY DATA FALLBACK ---
const DUMMY_SPEAKERS = [
  { 
    _id: "s1", 
    name: "Dr. Alok Ranjan", 
    designation: "Neurosurgeon", 
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800", 
    talkTopic: "The Brain on Music",
    bio: "Unraveling the symphony of synapses. How melody reshapes our neural pathways."
  },
  { 
    _id: "s2", 
    name: "Sarah Jenkins", 
    designation: "AI Ethicist", 
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", 
    talkTopic: "Coding Morality",
    bio: "Can we teach machines to care? Exploring the boundaries of artificial empathy."
  },
  { 
    _id: "s3", 
    name: "Vikram Sethi", 
    designation: "Environmental Architect", 
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800", 
    talkTopic: "Building Breathing Cities",
    bio: "Reimagining urban jungles as living, breathing ecosystems."
  },
  { 
    _id: "s4", 
    name: "Priya Sharma", 
    designation: "Classical Dancer", 
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800", 
    talkTopic: "Rhythm of Life",
    bio: "Finding the universal heartbeat through movement and ancient expression."
  },
];

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const endpoints = ['/admin/speakers/public/list', '/speakers'];
        let data = [];
        
        for (const ep of endpoints) {
          try {
            const res = await api.get(ep);
            const val = res?.data?.success ? res.data.data : res.data;
            if (Array.isArray(val) && val.length > 0) {
              data = val;
              break;
            }
          } catch (e) { continue; }
        }
        setSpeakers(data.length > 0 ? data : DUMMY_SPEAKERS);
      } catch (err) {
        setSpeakers(DUMMY_SPEAKERS);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  const filtered = speakers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.designation && s.designation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-28 pb-16 px-6 text-center border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            The <span className="text-red-600">Voices.</span>
          </motion.h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
            Meet the visionaries challenging the status quo. One idea at a time.
          </p>

          {/* Compact Search */}
          <div className="relative max-w-sm mx-auto group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Find a speaker..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-900/50 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-red-600 transition-all placeholder-gray-600"
            />
          </div>
        </div>
      </section>

      {/* 2. THE SPOTLIGHT LIST (Zig-Zag) */}
      <div className="relative">
        {loading ? (
          <div className="h-64 flex items-center justify-center text-red-600 font-bold animate-pulse text-sm tracking-widest">LOADING VOICES...</div>
        ) : filtered.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-500">No speakers found.</div>
        ) : (
          filtered.map((speaker, idx) => {
            const isEven = idx % 2 === 0;
            const img = buildImg(speaker.photo);

            return (
              <motion.div 
                key={speaker._id || idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6 }}
                // Reduced height here: min-h-[50vh] instead of 85vh
                className="group relative min-h-[50vh] flex flex-col md:flex-row overflow-hidden border-b border-white/5 last:border-0"
              >
                {/* --- IMAGE HALF --- */}
                <div className={`relative w-full md:w-5/12 h-[40vh] md:h-auto overflow-hidden ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="absolute inset-0 bg-red-600/10 z-10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <img 
                    src={img} 
                    alt={speaker.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-105"
                    onError={(e) => e.currentTarget.src = "https://placehold.co/800x1000/111/444?text=TEDx"}
                  />
                  
                  {/* Mobile Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />
                </div>

                {/* --- CONTENT HALF --- */}
                <div className={`w-full md:w-7/12 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative z-20 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  
                  {/* Decorative Number - Smaller & Subtler */}
                  <span className="absolute top-6 md:top-10 text-6xl font-black text-white/5 select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="space-y-4 relative">
                    {/* Talk Topic Tag */}
                    {speaker.talkTopic && (
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-red-600/30 rounded-full bg-red-900/10 text-red-500 text-[10px] font-bold uppercase tracking-widest w-fit">
                        <Mic2 size={10} />
                        {speaker.talkTopic}
                      </div>
                    )}

                    {/* Name & Title */}
                    <div>
                      {/* Reduced text size here */}
                      <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-2 group-hover:text-red-600 transition-colors duration-500">
                        {speaker.name}
                      </h2>
                      <p className="text-lg text-gray-400 font-medium italic border-l-2 border-red-600 pl-3">
                        {speaker.designation}
                      </p>
                    </div>

                    {/* Short Bio */}
                    <p className="text-gray-400 text-base leading-relaxed line-clamp-2 max-w-xl">
                      {speaker.bio || "A visionary thinker sharing ideas that matter."}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <button 
                        onClick={() => navigate(`/speakers/${speaker.slug || speaker._id}`)}
                        className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all duration-300 group/btn"
                      >
                        <span className="border-b border-transparent group-hover/btn:border-red-600">Read Profile</span>
                        <ArrowRight className="text-red-600" size={16} />
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}