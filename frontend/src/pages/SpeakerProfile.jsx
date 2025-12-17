// // src/pages/SpeakerProfile.jsx
// import React, { useEffect, useState } from 'react';
// import { Play, Briefcase, Instagram, Linkedin, Twitter } from 'lucide-react';
// import { useParams, Link } from 'react-router-dom';
// import { api } from '../api';
// import { buildImg } from '../utils';

// export default function SpeakerProfile() {
//   const { id } = useParams();
//   const [speaker, setSpeaker] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let mounted = true;
//     const endpoints = [
//       `/admin/speakers/public/${encodeURIComponent(id)}`,
//       `/speakers/${encodeURIComponent(id)}`
//     ];

//     const load = async () => {
//       setLoading(true);
//       setError(null);

//       for (const ep of endpoints) {
//         try {
//           const res = await api.get(ep);
//           const data = res?.data?.success ? res.data.data : res.data;
//           if (!mounted) return;
//           if (data && typeof data === 'object') {
//             setSpeaker(data);
//             setLoading(false);
//             return;
//           }
//         } catch (err) {
//           if (endpoints.indexOf(ep) === endpoints.length - 1) {
//             console.error('Failed to load speaker:', err);
//             if (mounted) setError(err?.response?.data?.message || 'Failed to load speaker');
//             setLoading(false);
//           } else {
//             // try next endpoint
//             continue;
//           }
//         }
//       }
//     };

//     load();
//     return () => { mounted = false; };
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="p-6 max-w-5xl mx-auto">
//         <div className="hero-panel text-white">Loading speaker...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 max-w-5xl mx-auto">
//         <div className="bg-red-700 text-white rounded p-6">{error}</div>
//       </div>
//     );
//   }

//   if (!speaker) {
//     return (
//       <div className="p-6 max-w-5xl mx-auto text-white">
//         <div className="bg-gray-900 p-6 rounded-lg">
//           Speaker not found.{" "}
//           <Link to="/speakers" className="text-red-400 hover:underline">Back to speakers</Link>
//         </div>
//       </div>
//     );
//   }

//   const imgSrc = buildImg(speaker.photo || speaker.image || speaker.avatar || speaker.imageUrl);
//   const talkVideo = speaker.videoUrl || speaker.video || (Array.isArray(speaker.talks) && speaker.talks.find(t => t.video)?.video);

//   // helpers
//   const getSocial = (s, key) => {
//     if (!s) return undefined;
//     const sl = s.socialLinks || s.social || {};
//     return (sl && sl[key]) || s[key] || s[`${key}Url`] || null;
//   };

//   const normalizeUrl = (u) => {
//     if (!u) return u;
//     // if starts with http(s) return as-is
//     if (/^https?:\/\//i.test(u)) return u;
//     // if begins with 'www.' prefix https://
//     if (/^www\./i.test(u)) return `https://${u}`;
//     // otherwise return as-is (could be a relative/path)
//     return u;
//   };

//   const linkedin = normalizeUrl(getSocial(speaker, 'linkedin'));
//   const instagram = normalizeUrl(getSocial(speaker, 'instagram'));
//   const twitter = normalizeUrl(getSocial(speaker, 'twitter')); // treat as X/twitter

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black py-16">
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-2xl overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
//             {/* Left: Image + optional video */}
//             <div>
//               <div className="relative h-96 rounded-xl overflow-hidden border border-red-600/20">
//                 <img
//                   src={imgSrc}
//                   alt={speaker.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x800/111827/ffffff?text=Speaker'; }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
//               </div>

//               {talkVideo && (
//                 <div className="mt-6">
//                   <div className="aspect-video rounded-xl overflow-hidden border border-red-600/20">
//                     {/* if it's a YouTube/Vimeo embed url, allow iframe else show link */}
//                     {typeof talkVideo === 'string' && talkVideo.startsWith('http') ? (
//                       <iframe
//                         src={talkVideo}
//                         title={`${speaker.name} talk`}
//                         className="w-full h-full"
//                         allowFullScreen
//                       />
//                     ) : (
//                       <div className="p-4 text-gray-300">Video: {talkVideo}</div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Right: Details */}
//             <div className="flex flex-col">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h1 className="text-4xl font-bold text-white mb-2">{speaker.name}</h1>

//                   <div className="flex items-center gap-3 text-gray-400 mb-4">
//                     <Briefcase size={18} className="text-red-600" />
//                     <span className="text-sm">{speaker.designation || speaker.title || ''}</span>
//                   </div>
//                 </div>

//                 {/* Social icons — prominent, clickable, open in new tab */}
//                 <div className="flex items-center gap-3 mt-1">
//                   {instagram && (
//                     <a
//                       href={instagram}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title={`${speaker.name} on Instagram`}
//                       className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-md hover:shadow-red-600/40 hover:scale-110"
//                       aria-label="Instagram"
//                     >
//                       <Instagram size={20} className="text-white" />
//                     </a>
//                   )}
//                   {linkedin && (
//                     <a
//                       href={linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title={`${speaker.name} on LinkedIn`}
//                       className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-md hover:shadow-red-600/40 hover:scale-110"
//                       aria-label="LinkedIn"
//                     >
//                       <Linkedin size={20} className="text-white" />
//                     </a>
//                   )}
//                   {twitter && (
//                     <a
//                       href={twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       title={`${speaker.name} on X`}
//                       className="bg-white/20 hover:bg-red-600 p-3 rounded-full transition-all shadow-md hover:shadow-red-600/40 hover:scale-110"
//                       aria-label="X (Twitter)"
//                     >
//                       <Twitter size={20} className="text-white" />
//                     </a>
//                   )}
//                 </div>
//               </div>

//               {speaker.talkTopic && (
//                 <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-6">
//                   <h3 className="text-white font-semibold mb-1">Talk Topic</h3>
//                   <p className="text-gray-300 italic">"{speaker.talkTopic}"</p>
//                 </div>
//               )}

//               {speaker.bio && (
//                 <div className="mb-6">
//                   <h3 className="text-2xl font-bold text-white mb-3">Biography</h3>
//                   <p className="text-gray-400 leading-relaxed whitespace-pre-line">{speaker.bio}</p>
//                 </div>
//               )}

//               {Array.isArray(speaker.talks) && speaker.talks.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="text-xl font-semibold text-white mb-3">Talks</h3>
//                   <ul className="space-y-3">
//                     {speaker.talks.map((t) => (
//                       <li key={t._id || t.slug || t.title} className="text-sm text-gray-300 flex items-center justify-between gap-4">
//                         <div>
//                           <div className="font-medium text-white">{t.title}</div>
//                           {t.event && <div className="text-xs text-gray-400">{t.event}</div>}
//                         </div>
//                         <div className="flex items-center gap-3">
//                           {t.video ? (
//                             <a
//                               href={t.video}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
//                             >
//                               <Play size={16} /> Watch
//                             </a>
//                           ) : (
//                             <span className="text-xs text-gray-500">No video</span>
//                           )}
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               <div className="mt-auto">
//                 {talkVideo ? (
//                   <a
//                     href={talkVideo}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
//                   >
//                     <Play size={18} /> Watch Talk
//                   </a>
//                 ) : (
//                   <Link to="/speakers" className="w-full inline-block text-center bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors">
//                     Back to speakers
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* footer link */}
//         <div className="mt-6 text-center">
//           <Link to="/speakers" className="text-sm text-gray-300 hover:text-red-400">← Back to all speakers</Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, Linkedin, Twitter, Instagram, 
  ArrowLeft, Quote, Share2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../api';
import { buildImg } from '../utils';

export default function SpeakerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [speaker, setSpeaker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        setLoading(true);
        const endpoints = [`/admin/speakers/public/${id}`, `/speakers/${id}`];
        for (const ep of endpoints) {
          try {
            const res = await api.get(ep);
            const data = res.data?.success ? res.data.data : res.data;
            if (data) {
              setSpeaker(data);
              break;
            }
          } catch(e) { continue; }
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeaker();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-red-600 font-bold tracking-widest animate-pulse text-sm">LOADING...</div>
    </div>
  );

  if (!speaker) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
      <h2 className="text-2xl font-bold">Speaker Not Found</h2>
      <button onClick={() => navigate('/speakers')} className="text-red-500 hover:text-white transition-colors flex items-center gap-2 text-sm">
        <ArrowLeft size={16} /> Back to Directory
      </button>
    </div>
  );

  const imgSrc = buildImg(speaker.photo || speaker.image);
  const talkVideo = speaker.videoUrl || speaker.video;
  const { linkedin, twitter, instagram } = speaker.socialLinks || speaker.social || {};

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-red-600 selection:text-white pb-20">
      
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Nav Back */}
      <div className="fixed top-24 left-0 w-full z-40 px-6 pointer-events-none">
        <div className="max-w-6xl mx-auto">
           <button 
             onClick={() => navigate('/speakers')}
             className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-gray-400 hover:text-white hover:border-red-600 transition-all duration-300 group"
           >
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             Back
           </button>
        </div>
      </div>

      <main className="pt-36 px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          
          {/* --- LEFT COLUMN: Image & Socials --- */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-32 space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                // Restrained max-width for image so it's not huge
                className="relative aspect-[3/4] w-full max-w-sm mx-auto md:max-w-none rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900"
              >
                <img 
                  src={imgSrc} 
                  alt={speaker.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  onError={(e) => e.currentTarget.src = "https://placehold.co/600x800/111/444?text=Speaker"}
                />
              </motion.div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-3">
                {[
                  { link: linkedin, Icon: Linkedin, color: "hover:bg-[#0077b5]" },
                  { link: twitter, Icon: Twitter, color: "hover:bg-black border-white" },
                  { link: instagram, Icon: Instagram, color: "hover:bg-pink-700" }
                ].map((item, i) => item.link && (
                  <a 
                    key={i} 
                    href={item.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`p-3 bg-neutral-900 border border-white/10 rounded-full text-gray-400 hover:text-white transition-all duration-300 ${item.color} hover:border-transparent`}
                  >
                    <item.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: Content --- */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8 md:pt-4">
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* Smaller Name Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none mb-3">
                {speaker.name}
              </h1>
              <div className="flex items-center gap-3 border-l-4 border-red-600 pl-4">
                <span className="text-xl text-gray-300 font-medium">
                   {speaker.designation}
                </span>
              </div>
            </motion.div>

            {/* Talk Topic Box */}
            {speaker.talkTopic && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-neutral-900/40 border border-white/10 p-6 rounded-xl relative"
              >
                 <Quote className="absolute top-4 left-4 text-red-600/20 w-8 h-8 rotate-180" />
                 <div className="relative z-10 pl-6">
                    <span className="block text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">
                      The Idea
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white italic leading-tight">
                      "{speaker.talkTopic}"
                    </h3>
                 </div>
              </motion.div>
            )}

            {/* Bio */}
            {speaker.bio && (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-line text-base"
              >
                <h3 className="text-white font-bold text-xl mb-3">Biography</h3>
                {speaker.bio}
              </motion.div>
            )}

            {/* Video Section */}
            {talkVideo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }} 
                className="pt-6 border-t border-white/10"
              >
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                   <div className="bg-red-600 p-1.5 rounded-full"><Play size={12} fill="white" /></div> 
                   Watch the Talk
                </h3>
                
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black">
                  {typeof talkVideo === 'string' && (talkVideo.includes('embed') || talkVideo.includes('youtu')) ? (
                    <iframe
                      src={talkVideo}
                      title="TEDx Talk"
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <a 
                      href={talkVideo} 
                      target="_blank" 
                      rel="noreferrer"
                      className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 group hover:bg-neutral-800 transition-colors"
                    >
                       <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={24} fill="white" className="ml-1" />
                       </div>
                       <span className="mt-3 font-bold text-sm group-hover:text-red-500 transition-colors">Watch on External Site</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
