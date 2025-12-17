// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { Clock, MapPin, Calendar, ArrowRight, Ticket } from "lucide-react";
// // import { api } from "../api";
// // import { buildImg } from "../utils";

// // // --- DUMMY DATA FALLBACK ---
// // const DUMMY_EVENTS = [
// //   {
// //     _id: "dummy-1",
// //     name: "Registration & Networking",
// //     date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
// //     venue: "Main Hall Foyer",
// //     description: "Pick up your badges, grab a coffee, and meet fellow innovators before the main event kicks off.",
// //     status: "upcoming",
// //     image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// //   },
// //   {
// //     _id: "dummy-2",
// //     name: "Opening Ceremony: Echoes",
// //     date: new Date(Date.now() + 90000000).toISOString(), // Tomorrow + 1 hour
// //     venue: "Auditorium A",
// //     description: "Lighting the lamp and introduction to this year's theme 'Echoes of Innovation' by the organizers.",
// //     status: "upcoming",
// //     image: "https://images.pexels.com/photos/1709003/pexels-photo-1709003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// //   },
// //   {
// //     _id: "dummy-3",
// //     name: "The Silence of Sound",
// //     date: new Date(Date.now() + 93600000).toISOString(), // Tomorrow + 2 hours
// //     venue: "Auditorium A",
// //     description: "A deep dive into how silence shapes our modern digital communication. Speaker: Dr. Ananya Gupta.",
// //     status: "upcoming",
// //     image: "https://images.pexels.com/photos/3321791/pexels-photo-3321791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// //   },
// //   {
// //     _id: "dummy-4",
// //     name: "Networking High Tea",
// //     date: new Date(Date.now() + 100000000).toISOString(), // Tomorrow + 4 hours
// //     venue: "Cafeteria & Lounge",
// //     description: "Connect with speakers and attendees over refreshments and interactive experience zones.",
// //     status: "upcoming",
// //     image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// //   },
// //   {
// //     _id: "dummy-5",
// //     name: "Future of AI Art",
// //     date: new Date(Date.now() + 108000000).toISOString(), // Tomorrow + 6 hours
// //     venue: "Auditorium A",
// //     description: "Exploring the reverberations of synthetic creativity in the art world. Speaker: Rajesh Kumar.",
// //     status: "upcoming",
// //     image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
// //   }
// // ];

// // export default function EventsSection({ onNavigate }) {
// //   const [events, setEvents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const routerNavigate = useNavigate();

// //   // --- 1. DATA FETCHING ---
// //   useEffect(() => {
// //     let mounted = true;
// //     const fetchEvents = async () => {
// //       try {
// //         // Attempt to fetch from API
// //         const res = await api.get("/events");
// //         if (!mounted) return;
        
// //         const data = res.data?.success ? res.data.data : res.data;
// //         const list = Array.isArray(data) ? data : [];
        
// //         // If API returns valid list, use it. Otherwise use DUMMY.
// //         if (list.length > 0) {
// //           setEvents(list);
// //         } else {
// //           setEvents(DUMMY_EVENTS);
// //         }
// //       } catch (err) {
// //         // API Failed -> Fallback to Dummy Data
// //         console.warn("Events API failed, loading dummy data.", err);
// //         if (mounted) setEvents(DUMMY_EVENTS);
// //       } finally {
// //         if (mounted) setLoading(false);
// //       }
// //     };
// //     fetchEvents();
// //     return () => { mounted = false; };
// //   }, []);

// //   // --- 2. HELPER FUNCTIONS ---
// //   const isUpcoming = (ev) => {
// //     if (!ev) return false;
// //     if (ev.status === "upcoming" || ev.upcoming === true) return true;
// //     if (ev.date) return new Date(ev.date) > new Date();
// //     return false;
// //   };

// //   const handleNavigate = (type, event) => {
// //     const id = event?.slug || event?._id || event?.id;
// //     // Don't navigate for dummy items to avoid 404s
// //     if (!id || id.startsWith('dummy-')) return;

// //     if (typeof onNavigate === "function") {
// //       onNavigate(`${type}:${id}`);
// //       return;
// //     }
    
// //     // Router fallback
// //     const path = type === "book" ? `/events/${id}/book` : `/events/${id}`;
// //     routerNavigate(path);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   // --- 3. PREPARE TIMELINE DATA ---
// //   // We prefer upcoming events. If none, show past events (newest first).
// //   const upcoming = events.filter(isUpcoming).sort((a, b) => new Date(a.date) - new Date(b.date));
// //   const past = events.filter(e => !isUpcoming(e)).sort((a, b) => new Date(b.date) - new Date(a.date));
  
// //   // Display top 5 events on the homepage timeline
// //   const displayEvents = upcoming.length > 0 ? upcoming.slice(0, 5) : past.slice(0, 5);

// //   // If literally nothing exists (even dummy failed), fallback to empty
// //   const finalDisplay = displayEvents.length > 0 ? displayEvents : DUMMY_EVENTS;

// //   if (loading) {
// //     return (
// //       <div className="py-24 bg-black flex justify-center items-center">
// //          {/* Simple text loader, or you can use a Skeleton here */}
// //          <div className="text-red-600 font-bold tracking-widest animate-pulse">LOADING TIMELINE...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <section id="events" className="relative py-24 bg-black overflow-hidden font-sans">
      
// //       {/* Background Ambience */}
// //       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

// //       <div className="max-w-6xl mx-auto px-6 relative z-10">
        
// //         {/* Header */}
// //         <div className="text-center mb-20">
// //           <motion.span 
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             className="text-red-600 font-bold tracking-[0.2em] uppercase text-sm block mb-3"
// //           >
// //             Mark Your Calendars
// //           </motion.span>
// //           <motion.h2 
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.1 }}
// //             className="text-4xl md:text-6xl font-black text-white tracking-tight"
// //           >
// //             Timeline of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Innovation</span>
// //           </motion.h2>
// //         </div>

// //         {/* TIMELINE CONTAINER */}
// //         <div className="relative">
          
// //           {/* The Glowing Red Line (The Pulse) */}
// //           <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-red-900 to-transparent md:-translate-x-1/2 opacity-50" />

// //           <div className="space-y-12">
// //             {finalDisplay.map((event, index) => {
// //               const isLeft = index % 2 === 0; // Zig-zag layout
// //               const dateObj = new Date(event.date || Date.now());
// //               const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// //               const dateString = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
              
// //               // Handle dummy images vs built images
// //               const banner = event._id.startsWith('dummy-') ? event.image : buildImg(event.banner || event.image || event.bannerUrl);

// //               return (
// //                 <motion.div 
// //                   key={event._id || index}
// //                   initial={{ opacity: 0, y: 50 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   viewport={{ once: true, margin: "-100px" }}
// //                   transition={{ duration: 0.5, delay: index * 0.1 }}
// //                   className={`relative flex flex-col md:flex-row items-start ${
// //                     isLeft ? "md:flex-row-reverse" : ""
// //                   }`}
// //                 >
                  
// //                   {/* TIME DOT (Center Axis) */}
// //                   <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-red-600 z-20 -translate-x-[7px] md:-translate-x-1/2 mt-6 shadow-[0_0_15px_rgba(230,43,30,0.8)]">
// //                     {/* Pulsating effect for the first/upcoming item */}
// //                     {index === 0 && (
// //                       <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75" />
// //                     )}
// //                   </div>

// //                   {/* SPACER (To push content to sides on desktop) */}
// //                   <div className="hidden md:block w-1/2" />

// //                   {/* CONTENT CARD */}
// //                   <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
// //                     isLeft ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"
// //                   }`}>
// //                     <div 
// //                       onClick={() => handleNavigate('event', event)}
// //                       className={`group relative bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:bg-neutral-900 hover:border-red-600/30 transition-all duration-300 cursor-pointer ${isLeft ? "md:ml-auto" : ""}`}
// //                     >
                      
// //                       {/* Event Banner */}
// //                       {banner && (
// //                         <div className="h-40 w-full overflow-hidden relative">
// //                            <img src={banner} alt={event.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
// //                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
// //                         </div>
// //                       )}

// //                       <div className="p-6">
// //                         {/* Metadata Tags */}
// //                         <div className={`flex flex-wrap gap-2 mb-3 items-center ${isLeft ? "md:justify-end" : "justify-start"}`}>
// //                           <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-bold uppercase tracking-wider">
// //                             <Calendar size={12} />
// //                             {dateString}
// //                           </span>
// //                           {event.venue && (
// //                             <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider">
// //                               <MapPin size={12} />
// //                               {event.venue}
// //                             </span>
// //                           )}
// //                         </div>

// //                         {/* Title */}
// //                         <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors leading-tight">
// //                           {event.name}
// //                         </h3>

// //                         {/* Description */}
// //                         <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
// //                           {event.description || "Join us for a session of ideas worth spreading."}
// //                         </p>

// //                         {/* Action Button */}
// //                         <button 
// //                           className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-white/70 group-hover:text-white transition-colors ${isLeft ? "md:ml-auto" : ""}`}
// //                         >
// //                           <span>Explore Event</span>
// //                           <ArrowRight size={16} className="text-red-500 group-hover:translate-x-1 transition-transform" />
// //                         </button>
// //                       </div>

// //                     </div>
// //                   </div>

// //                 </motion.div>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* CTA SECTION */}
// //         <motion.div 
// //           initial={{ opacity: 0, scale: 0.9 }}
// //           whileInView={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.5 }}
// //           className="mt-20 text-center"
// //         >
// //           <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600">
// //             <Link 
// //               to="/events" 
// //               className="flex items-center gap-3 px-8 py-4 bg-black rounded-full text-white font-bold tracking-wide uppercase hover:bg-neutral-900 transition-all group"
// //             >
// //               <Ticket size={20} className="text-red-500 group-hover:rotate-12 transition-transform" />
// //               <span>View Full Calendar</span>
// //               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// //             </Link>
// //           </div>
// //         </motion.div>

// //       </div>
// //     </section>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { MapPin, ArrowRight, Mic2, Users, ChevronDown, Calendar } from "lucide-react";
// import { api } from "../api";
// import { buildImg } from "../utils";

// // --- DUMMY DATA (Fallback) ---
// const DUMMY_EVENTS = [
//   {
//     _id: "evt-1",
//     slug: "echoes-of-innovation",
//     name: "Echoes of Innovation",
//     date: new Date(Date.now() + 864000000).toISOString(), // +10 days
//     venue: "Grand Auditorium",
//     description: "Exploring how past reverberations shape our future technologies.",
//     image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
//   },
//   {
//     _id: "evt-2",
//     slug: "sustainable-horizons",
//     name: "Sustainable Horizons",
//     date: new Date(Date.now() + 1728000000).toISOString(), // +20 days
//     venue: "Green Park Center",
//     description: "A deep dive into eco-friendly architecture and living.",
//     image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000",
//   },
//   {
//     _id: "evt-3",
//     slug: "ai-revolution",
//     name: "The AI Revolution",
//     date: new Date(Date.now() + 2592000000).toISOString(), // +30 days
//     venue: "Tech Hub Main Hall",
//     description: "Understanding the impact of Generative AI on creative industries.",
//     image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
//   },
//   {
//     _id: "evt-4",
//     slug: "future-med",
//     name: "Future of Medicine",
//     date: new Date(Date.now() + 3456000000).toISOString(), // +40 days
//     venue: "Health Sciences Block",
//     description: "Robotics, gene editing, and the new frontier of healthcare.",
//     image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
//   }
// ];

// export default function EventsSection() {
//   const [events, setEvents] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const navigate = useNavigate();

//   // 1. Fetch Data
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await api.get("/events");
//         const data = res.data?.success ? res.data.data : res.data;
//         if (Array.isArray(data) && data.length > 0) {
//           setEvents(data);
//         } else {
//           setEvents(DUMMY_EVENTS);
//         }
//       } catch (err) {
//         console.warn("Events API failed, switching to fallback data.", err);
//         setEvents(DUMMY_EVENTS);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // 2. Filter & Sort (Upcoming Only)
//   const upcomingEvents = events
//     .filter(e => new Date(e.date) > new Date())
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   // 3. Logic for "Show 1 on Mobile, 2 on Desktop"
//   // If NOT expanded, we take the top 2. 
//   // We will handle the "1 on mobile" visibility via CSS classes in the render loop.
//   const visibleEvents = isExpanded ? upcomingEvents : upcomingEvents.slice(0, 2);
//   const hasHiddenEvents = upcomingEvents.length > 2; // Check if we actually have more events to show

//   const StatItem = ({ icon: Icon, label, value }) => (
//     <div className="flex flex-col items-center text-center p-4 border border-white/10 rounded-lg bg-neutral-900/50 backdrop-blur">
//       <Icon className="text-red-600 mb-2" size={24} />
//       <span className="text-2xl font-bold text-white">{value}</span>
//       <span className="text-xs uppercase tracking-widest text-gray-400">{label}</span>
//     </div>
//   );

//   return (
//     <section className="relative bg-black py-24 overflow-hidden min-h-[80vh]">
//       {/* Background Ambience */}
//       <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
//           <div className="w-full md:w-auto text-center md:text-left">
//             <span className="text-red-600 font-bold tracking-widest uppercase text-sm block mb-2 text-center md:text-left">
//               Mark Your Calendars
//             </span>
//             <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
//               Upcoming <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Experiences</span>
//             </h2>
//           </div>
//           <div className="flex gap-4 justify-center md:justify-start w-full md:w-auto">
//             <StatItem icon={Mic2} label="Speakers" value="20+" />
//             <StatItem icon={Users} label="Attendees" value="500+" />
//           </div>
//         </div>

//         {/* EVENTS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <AnimatePresence>
//             {visibleEvents.map((event, idx) => {
//                const banner = buildImg(event.banner || event.image);
//                const date = new Date(event.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
               
//                // LOGIC: If collapsed (!isExpanded) and this is the 2nd item (index 1),
//                // hide it on mobile (hidden) but show on desktop (md:block).
//                // If isExpanded is true, we show everything everywhere.
//                const mobileVisibilityClass = (!isExpanded && idx === 1) ? "hidden md:block" : "block";

//                return (
//                  <motion.div 
//                    key={event._id || idx}
//                    layout // smooth layout transition when list expands
//                    initial={{ opacity: 0, y: 20 }}
//                    animate={{ opacity: 1, y: 0 }}
//                    exit={{ opacity: 0, scale: 0.9 }}
//                    transition={{ duration: 0.3 }}
//                    onClick={() => navigate(`/events/${event.slug || event._id}`)}
//                    className={`group relative h-[400px] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-red-600/50 transition-all duration-300 ${mobileVisibilityClass}`}
//                  >
//                    {/* Image */}
//                    <img src={banner} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   
//                    {/* Overlay */}
//                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 flex flex-col justify-end">
//                       <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//                         <div className="flex items-center gap-3 mb-3 text-red-500 text-sm font-bold uppercase tracking-wider">
//                           <span className="bg-red-600 text-white px-2 py-1 rounded-sm flex items-center gap-1">
//                             <Calendar size={12} /> {date}
//                           </span>
//                           <span className="flex items-center gap-1"><MapPin size={14} /> {event.venue || "TBA"}</span>
//                         </div>
//                         <h3 className="text-3xl font-bold text-white mb-2 leading-none">{event.name}</h3>
//                         <p className="text-gray-400 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
//                           {event.description}
//                         </p>
//                         <button className="flex items-center gap-2 text-white font-semibold group-hover:text-red-500 transition-colors">
//                           View Details <ArrowRight size={18} />
//                         </button>
//                       </div>
//                    </div>
//                  </motion.div>
//                )
//             })}
//           </AnimatePresence>
//         </div>

//         {/* EXPAND / BLURRED TRIGGER AREA */}
//         {!isExpanded && (hasHiddenEvents || upcomingEvents.length > 1) && (
//           <div className="relative mt-8 flex justify-center">
//             {/* Gradient Fade to make it look like content continues */}
//             <div className="absolute bottom-full w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            
//             <button 
//               onClick={() => setIsExpanded(true)}
//               className="group relative flex flex-col items-center gap-2 px-8 py-4"
//             >
//               {/* Blurred Backdrop Circle */}
//               <div className="absolute inset-0 bg-red-600/10 backdrop-blur-md rounded-full border border-red-600/30 group-hover:bg-red-600/20 transition-all duration-300" />
              
//               <span className="relative z-10 text-sm font-bold uppercase tracking-widest text-red-500 group-hover:text-red-400 transition-colors">
//                 View All Upcoming Events 
//               </span>
//               <ChevronDown className="relative z-10 text-white animate-bounce mt-1" size={24} />
//             </button>
//           </div>
//         )}
        
//         {/* COLLAPSE BUTTON (Optional, appears when list is full) */}
//         {isExpanded && (
//            <div className="mt-8 text-center">
//              <button 
//                onClick={() => setIsExpanded(false)}
//                className="text-gray-500 hover:text-white text-sm uppercase tracking-widest flex items-center justify-center gap-2 mx-auto transition-colors"
//              >
//                Show Less <ChevronDown className="rotate-180" size={16} />
//              </button>
//            </div>
//         )}

//       </div>
//     </section>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Mic2,
  Users,
  ChevronDown,
  Calendar
} from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";

// ─── FALLBACK DATA ─────────────────────────────────────────────
const DUMMY_EVENTS = [
  {
    _id: "evt-1",
    slug: "echoes-of-innovation",
    name: "Echoes of Innovation",
    date: new Date(Date.now() + 864000000).toISOString(),
    venue: "Grand Auditorium",
    description: "Exploring how past reverberations shape our future technologies.",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1200"
  },
  {
    _id: "evt-2",
    slug: "sustainable-horizons",
    name: "Sustainable Horizons",
    date: new Date(Date.now() + 1728000000).toISOString(),
    venue: "Green Park Center",
    description: "A deep dive into eco-friendly architecture and living.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200"
  }
];

// ─── IMAGE RESOLVER (FIX) ──────────────────────────────────────
const resolveImage = (img) => {
  if (!img) return null;
  if (img.startsWith("http")) return img;   // full URL
  return buildImg(img);                     // backend relative path
};

export default function EventsSection() {
  const [events, setEvents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // ─── FETCH EVENTS ───────────────────────────────────────────
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        const data = res?.data?.success ? res.data.data : res.data;

        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        } else {
          setEvents(DUMMY_EVENTS);
        }
      } catch (err) {
        console.warn("Events API failed, using fallback", err);
        setEvents(DUMMY_EVENTS);
      }
    };
    fetchEvents();
  }, []);

  // ─── UPCOMING EVENTS ─────────────────────────────────────────
  const upcomingEvents = events
    .filter(e => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const visibleEvents = isExpanded
    ? upcomingEvents
    : upcomingEvents.slice(0, 2);

  const hasHiddenEvents = upcomingEvents.length > 2;

  const StatItem = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col items-center p-4 border border-white/10 rounded-lg bg-neutral-900/50 backdrop-blur">
      <Icon className="text-red-600 mb-2" size={22} />
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs uppercase tracking-widest text-gray-400">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative bg-black py-24 overflow-hidden min-h-[80vh]">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div>
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm block mb-2">
              Mark Your Calendars
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Upcoming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                Experiences
              </span>
            </h2>
          </div>
          <div className="flex gap-4">
            <StatItem icon={Mic2} label="Speakers" value="20+" />
            <StatItem icon={Users} label="Attendees" value="500+" />
          </div>
        </div>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <AnimatePresence>
            {visibleEvents.map((event, idx) => {
              const banner = resolveImage(
                event.banner || event.image || event.bannerUrl
              );

              const date = new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              });

              const mobileVisibility =
                !isExpanded && idx === 1 ? "hidden md:block" : "block";

              return (
                <motion.div
                  key={event._id || idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() =>
                    navigate(`/events/${event.slug || event._id}`)
                  }
                  className={`group relative h-[400px] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-red-600/50 transition-all ${mobileVisibility}`}
                >
                  {/* IMAGE */}
                  {banner && (
                    <img
                      src={banner}
                      alt={event.name}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://images.unsplash.com/photo-1544531586-fde5298cdd40")
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  )}

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3 text-red-500 text-sm font-bold uppercase tracking-wider">
                      <span className="bg-red-600 text-white px-2 py-1 rounded-sm flex items-center gap-1">
                        <Calendar size={12} /> {date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {event.venue || "TBA"}
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-2">
                      {event.name}
                    </h3>

                    <p className="text-gray-400 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {event.description}
                    </p>

                    <button className="flex items-center gap-2 text-white font-semibold group-hover:text-red-500 transition-colors">
                      View Details <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* EXPAND / COLLAPSE */}
        {!isExpanded && hasHiddenEvents && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 px-8 py-4 bg-red-600/10 backdrop-blur rounded-full border border-red-600/30 text-red-500 font-bold uppercase tracking-widest hover:bg-red-600/20"
            >
              View All Events <ChevronDown />
            </button>
          </div>
        )}

        {isExpanded && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-white text-sm uppercase tracking-widest flex items-center gap-2 mx-auto"
            >
              Show Less <ChevronDown className="rotate-180" size={16} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
