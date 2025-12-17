// // // // src/pages/Events.jsx
// // // import React, { useEffect, useState } from 'react';
// // // import { Calendar, MapPin, Users, Play } from 'lucide-react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { api } from '../api';
// // // import { buildImg } from '../utils';

// // // export default function EventsPage() {
// // //   const [events, setEvents] = useState([]);
// // //   const [speakers, setSpeakers] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     let mounted = true;

// // //     const fetchAll = async () => {
// // //       try {
// // //         setLoading(true);
// // //         setError(null);

// // //         // fetch events and speakers in parallel
// // //         const [evRes, spRes] = await Promise.allSettled([api.get('/events'), api.get('/speakers')]);

// // //         if (!mounted) return;

// // //         const evData = evRes.status === 'fulfilled' ? (evRes.value?.data?.success ? evRes.value.data.data : evRes.value.data) : [];
// // //         const spData = spRes.status === 'fulfilled' ? (spRes.value?.data?.success ? spRes.value.data.data : spRes.value.data) : [];

// // //         setEvents(Array.isArray(evData) ? evData : []);
// // //         setSpeakers(Array.isArray(spData) ? spData : []);
// // //       } catch (err) {
// // //         console.error('Events load error', err);
// // //         setError(err?.response?.data?.message || err.message || 'Failed to load events');
// // //       } finally {
// // //         if (mounted) setLoading(false);
// // //       }
// // //     };

// // //     fetchAll();
// // //     return () => { mounted = false; };
// // //   }, []);

// // //   const buildImgLocal = (url) => {
// // //     if (!url) return 'https://placehold.co/800x480/111827/ffffff?text=TEDx+SMEC';
// // //     if (/^https?:\/\//i.test(url)) return url;
// // //     const origin = (import.meta.env.VITE_API_BASE || 'http://localhost:4000/api').replace(/\/api\/?$/,'');
// // //     return `${origin}/${url.replace(/^\/+/, '')}`;
// // //   };

// // //   const isUpcoming = (ev) => {
// // //     if (!ev) return false;
// // //     if (typeof ev.upcoming === 'boolean') return ev.upcoming;
// // //     if (ev.status === 'upcoming') return true;
// // //     if (ev.date) {
// // //       try { return new Date(ev.date) > new Date(); } catch { return false; }
// // //     }
// // //     return false;
// // //   };

// // //   const getEventSpeakers = (event) => {
// // //     if (!Array.isArray(speakers) || !event) return [];
// // //     const ids = Array.isArray(event.speakers) ? event.speakers.map(s => (typeof s === 'string' ? s : s._id || s.id || s.slug)) : [];
// // //     return speakers.filter(s => ids.includes(s._id || s.id || s.slug));
// // //   };

// // //   const handleEventClick = (event) => {
// // //     // navigate to event detail page (prefer slug/_id/id)
// // //     const id = event.slug || event._id || event.id;
// // //     navigate(`/events/${id}`);
// // //     // scroll to top to make sure user sees content
// // //     window.scrollTo({ top: 0, behavior: 'smooth' });
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="p-6 max-w-7xl mx-auto">
// // //         <div className="hero-panel text-white">Loading events...</div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="p-6 max-w-7xl mx-auto">
// // //         <div className="bg-red-700 text-white rounded p-6">Error: {error}</div>
// // //       </div>
// // //     );
// // //   }

// // //   const upcomingEvents = events.filter(isUpcoming);
// // //   const pastEvents = events.filter(e => !isUpcoming(e)).sort((a, b) => (new Date(b.date || 0) - new Date(a.date || 0)));

// // //   const EventCard = ({ event }) => {
// // //     const eventSpeakers = getEventSpeakers(event);
// // //     const banner = event.banner || event.bannerUrl || event.image;

// // //     const formattedDate = event.date
// // //       ? (() => {
// // //           try {
// // //             return new Date(event.date).toLocaleDateString('en-US', {
// // //               year: 'numeric',
// // //               month: 'long',
// // //               day: 'numeric'
// // //             });
// // //           } catch {
// // //             return event.date;
// // //           }
// // //         })()
// // //       : 'Date TBA';

// // //     return (
// // //       <div
// // //         onClick={() => handleEventClick(event)}
// // //         className="group bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20"
// // //       >
// // //         <div className="relative h-64 overflow-hidden">
// // //           <img
// // //             src={buildImgLocal(banner)}
// // //             alt={event.name}
// // //             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// // //           />
// // //           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
// // //           {event.videoUrl && !isUpcoming(event) && (
// // //             <div className="absolute inset-0 flex items-center justify-center">
// // //               <div className="bg-red-600 rounded-full p-4 transform transition-transform group-hover:scale-110">
// // //                 <Play size={32} className="text-white" />
// // //               </div>
// // //             </div>
// // //           )}
// // //           <div className="absolute top-4 right-4">
// // //             <span
// // //               className={`px-4 py-2 rounded-full text-sm font-semibold ${
// // //                 isUpcoming(event) ? 'bg-red-600 text-white' : 'bg-gray-800/90 text-gray-300'
// // //               }`}
// // //             >
// // //               {isUpcoming(event) ? 'Upcoming' : 'Past Event'}
// // //             </span>
// // //           </div>
// // //         </div>

// // //         <div className="p-6">
// // //           <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-red-600 transition-colors">
// // //             {event.name}
// // //           </h3>

// // //           <div className="space-y-2 mb-4">
// // //             <div className="flex items-center gap-2 text-gray-400">
// // //               <Calendar size={18} className="text-red-600" />
// // //               <span>{formattedDate}</span>
// // //             </div>
// // //             <div className="flex items-center gap-2 text-gray-400">
// // //               <MapPin size={18} className="text-red-600" />
// // //               <span>{event.venue || event.location || 'Venue TBA'}</span>
// // //             </div>
// // //             <div className="flex items-center gap-2 text-gray-400">
// // //               <Users size={18} className="text-red-600" />
// // //               <span>{eventSpeakers.length} Speakers</span>
// // //             </div>
// // //           </div>

// // //           <p className="text-gray-400 mb-4 line-clamp-3">{event.description}</p>

// // //           {eventSpeakers.length > 0 && (
// // //             <div className="flex -space-x-2 mb-4">
// // //               {eventSpeakers.slice(0, 4).map((speaker) => (
// // //                 <img
// // //                   key={speaker._id || speaker.id || speaker.slug || speaker.name}
// // //                   src={buildImgLocal(speaker.image || speaker.photo || speaker.avatar)}
// // //                   alt={speaker.name}
// // //                   className="w-10 h-10 rounded-full border-2 border-gray-900"
// // //                   title={speaker.name}
// // //                 />
// // //               ))}
// // //               {eventSpeakers.length > 4 && (
// // //                 <div className="w-10 h-10 rounded-full bg-red-600 border-2 border-gray-900 flex items-center justify-center text-white text-sm font-semibold">
// // //                   +{eventSpeakers.length - 4}
// // //                 </div>
// // //               )}
// // //             </div>
// // //           )}

// // //           <button
// // //             onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}
// // //             className="w-full bg-red-600/20 hover:bg-red-600 text-red-600 hover:text-white py-3 rounded-lg font-semibold transition-all duration-300 border border-red-600/50"
// // //           >
// // //             View Details
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <section className="py-20 bg-black">
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //         <div className="text-center mb-16">
// // //           <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
// // //             Our <span className="text-red-600">Events</span>
// // //           </h2>
// // //           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
// // //             Discover inspiring talks and transformative experiences
// // //           </p>
// // //         </div>

// // //         {upcomingEvents.length > 0 && (
// // //           <div className="mb-16">
// // //             <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
// // //               <span className="w-2 h-8 bg-red-600 rounded-full" />
// // //               Upcoming Events
// // //             </h3>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //               {upcomingEvents.map((event) => (
// // //                 <EventCard key={event._id || event.slug || event.id || event.name} event={event} />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {pastEvents.length > 0 && (
// // //           <div>
// // //             <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
// // //               <span className="w-2 h-8 bg-gray-600 rounded-full" />
// // //               Past Events
// // //             </h3>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// // //               {pastEvents.map((event) => (
// // //                 <EventCard key={event._id || event.slug || event.id || event.name} event={event} />
// // //               ))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {events.length === 0 && (
// // //           <div className="text-center text-gray-400 mt-8">No events available at the moment.</div>
// // //         )}
// // //       </div>
// // //     </section>
// // //   );
// // // }


// // import React from "react";
// // import EventsSection from "../components/EventsSection";

// // export default function EventsPage() {
// //   return (
// //     <div className="bg-black text-white">
// //       <main className="pt-24 px-4 max-w-6xl mx-auto">
// //         <EventsSection />
// //       </main>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Calendar, MapPin, Search, Filter, ArrowRight } from 'lucide-react';
// import { api } from '../api';
// import { buildImg } from '../utils';

// // --- DUMMY DATA ---
// const DUMMY_EVENTS = [
//   {
//     _id: "evt-1",
//     slug: "echoes-of-innovation",
//     name: "Echoes of Innovation",
//     date: new Date(Date.now() + 864000000).toISOString(), // Upcoming
//     venue: "Grand Auditorium",
//     description: "Exploring how past reverberations shape our future technologies.",
//     image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
//   },
//   {
//     _id: "evt-2",
//     slug: "sustainable-horizons",
//     name: "Sustainable Horizons",
//     date: new Date(Date.now() + 1728000000).toISOString(), // Upcoming
//     venue: "Green Park Center",
//     description: "A deep dive into eco-friendly architecture and living.",
//     image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000",
//   },
//   {
//     _id: "evt-3",
//     slug: "digital-frontiers",
//     name: "Digital Frontiers",
//     date: new Date(Date.now() - 864000000).toISOString(), // Past
//     venue: "Tech Hub",
//     description: "Navigating the complexities of the metaverse and AI.",
//     image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
//   },
//   {
//     _id: "evt-4",
//     slug: "art-in-motion",
//     name: "Art in Motion",
//     date: new Date(Date.now() - 1728000000).toISOString(), // Past
//     venue: "City Gallery",
//     description: "The intersection of kinetic energy and classical sculpture.",
//     image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
//   }
// ];

// export default function EventsPage() {
//   const [events, setEvents] = useState([]);
//   const [filter, setFilter] = useState('all'); // 'all' | 'upcoming' | 'past'
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // 1. Fetch Logic
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await api.get('/events');
//         const data = res.data?.success ? res.data.data : res.data;
//         if (Array.isArray(data) && data.length > 0) {
//           setEvents(data);
//         } else {
//           setEvents(DUMMY_EVENTS);
//         }
//       } catch (err) {
//         console.warn("API Error, using dummy events", err);
//         setEvents(DUMMY_EVENTS);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   // 2. Helper
//   const isUpcoming = (ev) => new Date(ev.date) > new Date();

//   // 3. Filter & Sort Logic
//   const getProcessedEvents = () => {
//     // A. Search Filter
//     let filtered = events.filter(e => {
//       const query = search.toLowerCase();
//       return e.name.toLowerCase().includes(query) || 
//              (e.venue && e.venue.toLowerCase().includes(query));
//     });

//     // B. Category Filter
//     if (filter === 'upcoming') {
//       filtered = filtered.filter(isUpcoming);
//     } else if (filter === 'past') {
//       filtered = filtered.filter(e => !isUpcoming(e));
//     }

//     // C. Sorting
//     // Upcoming: Ascending (Soonest first)
//     // Past: Descending (Most recent first)
//     // All: Descending (Newest first, regardless of past/future)
//     filtered.sort((a, b) => {
//       const dateA = new Date(a.date);
//       const dateB = new Date(b.date);
      
//       if (filter === 'upcoming') return dateA - dateB;
//       return dateB - dateA; // Default for 'past' and 'all'
//     });

//     return filtered;
//   };

//   const displayEvents = getProcessedEvents();

//   return (
//     <div className="min-h-screen bg-black text-white pt-24 pb-20 font-sans">
      
//       {/* HEADER SECTION */}
//       <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
//         <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
//           Explore <span className="text-red-600">Events</span>
//         </h1>
//         <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//           From groundbreaking talks to interactive workshops, discover the timeline of innovation.
//         </p>
//       </div>

//       {/* CONTROLS SECTION (Tabs + Search) */}
//       <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
//         {/* Tabs */}
//         <div className="bg-neutral-900/80 p-1.5 rounded-full flex overflow-x-auto max-w-full border border-white/10">
//           {['all', 'upcoming', 'past'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setFilter(tab)}
//               className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
//                 filter === tab 
//                   ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(230,43,30,0.4)]' 
//                   : 'text-gray-400 hover:text-white hover:bg-white/5'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Search Bar */}
//         <div className="relative w-full md:w-80 group">
//           <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//             <Search size={18} className="text-gray-500 group-focus-within:text-red-600 transition-colors" />
//           </div>
//           <input 
//             type="text" 
//             placeholder="Search events..." 
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full bg-neutral-900 border border-white/10 rounded-full py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/50 transition-all placeholder-gray-600"
//           />
//         </div>
//       </div>

//       {/* EVENTS GRID */}
//       <div className="max-w-7xl mx-auto px-6">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20 gap-4">
//              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
//              <div className="text-red-600 font-bold tracking-widest animate-pulse">LOADING ARCHIVES...</div>
//           </div>
//         ) : displayEvents.length === 0 ? (
//           <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-neutral-900/20">
//             <Filter size={48} className="mx-auto text-gray-600 mb-4" />
//             <h3 className="text-xl font-bold text-gray-300">No events found</h3>
//             <p className="text-gray-500">Try adjusting your search or filter.</p>
//             {filter !== 'all' && (
//               <button onClick={() => setFilter('all')} className="mt-4 text-red-500 hover:underline">View All Events</button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {displayEvents.map((event) => {
//               const active = isUpcoming(event);
//               return (
//                 <div 
//                   key={event._id}
//                   onClick={() => navigate(`/events/${event.slug || event._id}`)}
//                   className="group relative bg-neutral-900 border border-white/5 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 cursor-pointer flex flex-col h-full hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.1)]"
//                 >
//                   {/* Image Container */}
//                   <div className="relative h-56 overflow-hidden">
//                     <img 
//                       src={buildImg(event.banner || event.image)} 
//                       alt={event.name} 
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale-[20%] group-hover:grayscale-0" 
//                     />
                    
//                     {/* Status Badge */}
//                     <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${
//                       active 
//                         ? 'bg-red-600 text-white' 
//                         : 'bg-black/60 text-gray-300 border border-white/10'
//                     }`}>
//                       {active ? 'UPCOMING' : 'COMPLETED'}
//                     </div>

//                     {/* Date Overlay (Bottom Left of Image) */}
//                     <div className="absolute bottom-0 left-0 bg-black/80 backdrop-blur px-4 py-2 rounded-tr-xl border-t border-r border-white/10 flex items-center gap-2">
//                        <Calendar size={14} className="text-red-500" />
//                        <span className="text-white text-xs font-bold uppercase tracking-wider">
//                          {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
//                        </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-6 flex-1 flex flex-col">
//                     <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-500 transition-colors leading-tight">
//                       {event.name}
//                     </h3>
                    
//                     <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
//                       <MapPin size={14} />
//                       <span>{event.venue || "TBA"}</span>
//                     </div>

//                     <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
//                       {event.description}
//                     </p>

//                     <div className="pt-5 border-t border-white/5 mt-auto flex items-center justify-between">
//                       <span className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-green-500' : 'text-gray-600'}`}>
//                         {active ? 'Registration Open' : 'Watch Recording'}
//                       </span>
//                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-colors">
//                         <ArrowRight size={14} className="text-gray-400 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Search, Filter, ArrowRight } from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";

// ─── IMAGE RESOLVER ────────────────────────────────────────────
const resolveImage = (img) => {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  return buildImg(img);
};

// ─── DUMMY DATA ────────────────────────────────────────────────
const DUMMY_EVENTS = [
  {
    _id: "evt-1",
    slug: "echoes-of-innovation",
    name: "Echoes of Innovation",
    date: new Date(Date.now() + 864000000).toISOString(),
    venue: "Grand Auditorium",
    description:
      "Exploring how past reverberations shape our future technologies.",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1000",
  },
  {
    _id: "evt-2",
    slug: "sustainable-horizons",
    name: "Sustainable Horizons",
    date: new Date(Date.now() + 1728000000).toISOString(),
    venue: "Green Park Center",
    description:
      "A deep dive into eco-friendly architecture and living.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000",
  }
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ─── FETCH EVENTS ───────────────────────────────────────────
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        const data = res?.data?.success ? res.data.data : res.data;
        setEvents(Array.isArray(data) && data.length ? data : DUMMY_EVENTS);
      } catch {
        setEvents(DUMMY_EVENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const isUpcoming = (ev) => new Date(ev.date) > new Date();

  const displayEvents = events
    .filter((e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      (e.venue && e.venue.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((e) => {
      if (filter === "upcoming") return isUpcoming(e);
      if (filter === "past") return !isUpcoming(e);
      return true;
    })
    .sort((a, b) =>
      filter === "upcoming"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayEvents.length === 0 ? (
          <div className="text-center py-20">
            <Filter size={40} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event) => {
              const banner = resolveImage(
                event.banner || event.image || event.bannerUrl
              );

              return (
                <div
                  key={event._id}
                  onClick={() =>
                    navigate(`/events/${event.slug || event._id}`)
                  }
                  className="group bg-neutral-900 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-red-600/50 transition-all"
                >
                  <div className="h-56 overflow-hidden relative">
                    {banner && (
                      <img
                        src={banner}
                        alt={event.name}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://images.unsplash.com/photo-1544531586-fde5298cdd40")
                        }
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    )}
                    <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded text-xs">
                      <Calendar size={12} className="inline mr-1 text-red-500" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-500">
                      {event.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {event.venue}
                      </span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
