// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Mail, Linkedin, Twitter } from 'lucide-react';
// // import { api } from '../api';
// // import { buildImg } from '../utils';

// // export default function TeamPage() {
// //   // Organizers state
// //   const [orgs, setOrgs] = useState([]);
// //   const [orgsLoading, setOrgsLoading] = useState(true);
// //   const [orgsError, setOrgsError] = useState(null);

// //   // Coordinators state
// //   const [coords, setCoords] = useState([]);
// //   const [coordsLoading, setCoordsLoading] = useState(true);
// //   const [coordsError, setCoordsError] = useState(null);

// //   useEffect(() => {
// //     let mounted = true;

// //     const loadOrganizers = async () => {
// //       setOrgsLoading(true);
// //       setOrgsError(null);
// //       const endpoints = ['/admin/organizers/public/list', '/organizers'];
// //       for (const ep of endpoints) {
// //         try {
// //           const res = await api.get(ep);
// //           const data = res?.data?.success ? res.data.data : res.data;
// //           if (!mounted) return;
// //           if (Array.isArray(data)) {
// //             setOrgs(data);
// //             setOrgsLoading(false);
// //             return;
// //           }
// //         } catch (err) {
// //           if (endpoints.indexOf(ep) === endpoints.length - 1) {
// //             console.error('Organizers load error:', err);
// //             setOrgsError(err?.response?.data?.message || err.message || 'Failed to load organizers');
// //             setOrgsLoading(false);
// //           }
// //         }
// //       }
// //     };

// //     const loadCoordinators = async () => {
// //       setCoordsLoading(true);
// //       setCoordsError(null);
// //       const endpoints = ['/admin/coordinators/public/list', '/coordinators'];
// //       for (const ep of endpoints) {
// //         try {
// //           const res = await api.get(ep);
// //           const data = res?.data?.success ? res.data.data : res.data;
// //           if (!mounted) return;
// //           if (Array.isArray(data)) {
// //             setCoords(data);
// //             setCoordsLoading(false);
// //             return;
// //           }
// //         } catch (err) {
// //           if (endpoints.indexOf(ep) === endpoints.length - 1) {
// //             console.error('Coordinators load error:', err);
// //             setCoordsError(err?.response?.data?.message || err.message || 'Failed to load coordinators');
// //             setCoordsLoading(false);
// //           }
// //         }
// //       }
// //     };

// //     // run both in parallel
// //     loadOrganizers();
// //     loadCoordinators();

// //     return () => { mounted = false; };
// //   }, []);

// //   const OrganizerCard = ({ o }) => {
// //     const id = o._id || o.id || o.slug || o.name;
// //     return (
// //       <div
// //         key={id}
// //         className="group relative bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 transform hover:scale-105"
// //       >
// //         <div className="relative h-72 overflow-hidden">
// //           <img
// //             src={buildImg(o.photo)}
// //             alt={o.name}
// //             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //             onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/111827/ffffff?text=Organizer'; }}
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
// //           <div className="absolute bottom-0 left-0 right-0 p-6">
// //             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-600 transition-colors">{o.name}</h3>
// //             <p className="text-sm text-gray-300">{o.role || o.designation}</p>
// //           </div>
// //         </div>

// //         <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-6 text-center">
// //           <h3 className="text-2xl font-bold text-white">{o.name}</h3>
// //           <p className="text-red-600 font-semibold">{o.role || o.designation}</p>
// //           {o.bio && <p className="text-gray-300 text-sm line-clamp-4">{o.bio}</p>}

// //           <div className="flex gap-3 mt-3">
// //             {o.email && (
// //               <a href={`mailto:${o.email}`} onClick={(e) => e.stopPropagation()} className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors">
// //                 <Mail size={18} className="text-white" />
// //               </a>
// //             )}
// //             {o.linkedin && (
// //               <a href={o.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors">
// //                 <Linkedin size={18} className="text-white" />
// //               </a>
// //             )}
// //             {o.twitter && (
// //               <a href={o.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors">
// //                 <Twitter size={18} className="text-white" />
// //               </a>
// //             )}
// //           </div>

// //           <div className="mt-3">
// //             <Link to={`/organizers/${o._id || o.id}`} onClick={(e) => e.stopPropagation()} className="text-red-400 hover:underline text-sm">
// //               View Profile →
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const CoordinatorCard = ({ c }) => {
// //     const id = c._id || c.id || c.slug || c.name;
// //     return (
// //       <div
// //         key={id}
// //         className="group relative bg-gradient-to-br from-gray-900 to-black border border-red-600/20 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 transform hover:scale-105"
// //       >
// //         <div className="relative h-72 overflow-hidden">
// //           <img
// //             src={buildImg(c.photo)}
// //             alt={c.name}
// //             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //             onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/111827/ffffff?text=Coordinator'; }}
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
// //           <div className="absolute bottom-0 left-0 right-0 p-6">
// //             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-600 transition-colors">{c.name}</h3>
// //             <p className="text-sm text-gray-300">{c.department || c.designation}</p>
// //           </div>
// //         </div>

// //         <div className="absolute inset-0 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-6 text-center">
// //           <h3 className="text-2xl font-bold text-white">{c.name}</h3>
// //           <p className="text-red-600 font-semibold">{c.department || c.designation}</p>
// //           {c.bio && <p className="text-gray-300 text-sm line-clamp-4">{c.bio}</p>}

// //           <div className="flex gap-3 mt-3">
// //             {c.email && (
// //               <a href={`mailto:${c.email}`} onClick={(e) => e.stopPropagation()} className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors">
// //                 <Mail size={18} className="text-white" />
// //               </a>
// //             )}
// //             {c.linkedin && (
// //               <a href={c.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors">
// //                 <Linkedin size={18} className="text-white" />
// //               </a>
// //             )}
// //             {c.twitter && (
// //               <a href={c.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="bg-red-600 hover:bg-red-700 rounded-full p-3 transition-colors">
// //                 <Twitter size={18} className="text-white" />
// //               </a>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <main className="bg-gradient-to-br from-black to-gray-950">
// //       <section className="py-20">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
// //               Meet Our <span className="text-red-600">Team</span>
// //             </h2>
// //             <p className="text-xl text-gray-400 max-w-2xl mx-auto">Organizers & Faculty Coordinators behind TEDxSMEC</p>
// //           </div>

// //           {/* Organizers */}
// //           <div className="mb-16">
// //             <div className="flex items-center justify-between mb-6">
// //               <h3 className="text-3xl font-semibold text-white">Organizers</h3>
// //               <p className="text-sm text-gray-400">{orgs.length} members</p>
// //             </div>

// //             {orgsLoading ? (
// //               <div className="p-6 text-white">Loading organizers...</div>
// //             ) : orgsError ? (
// //               <div className="p-6 bg-red-700 text-white rounded">{orgsError}</div>
// //             ) : orgs.length === 0 ? (
// //               <p className="text-gray-400">No organizers found.</p>
// //             ) : (
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //                 {orgs.map((o) => <OrganizerCard key={o._id || o.id || o.slug || o.name} o={o} />)}
// //               </div>
// //             )}
// //           </div>

// //           {/* Coordinators */}
// //           <div className="mb-20">
// //             <div className="flex items-center justify-between mb-6">
// //               <h3 className="text-3xl font-semibold text-white">Faculty Coordinators</h3>
// //               <p className="text-sm text-gray-400">{coords.length} members</p>
// //             </div>

// //             {coordsLoading ? (
// //               <div className="p-6 text-white">Loading coordinators...</div>
// //             ) : coordsError ? (
// //               <div className="p-6 bg-red-700 text-white rounded">{coordsError}</div>
// //             ) : coords.length === 0 ? (
// //               <p className="text-gray-400">No coordinators found.</p>
// //             ) : (
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //                 {coords.map((c) => <CoordinatorCard key={c._id || c.id || c.slug || c.name} c={c} />)}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }



// import React from "react";
// import TeamSection from "../components/TeamSection";

// export default function TeamPage() {
//   return (
//     <div className="bg-black text-white">
//       <main className="pt-24 px-4 max-w-6xl mx-auto">
//         <TeamSection />
//       </main>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { api } from '../api';
import { buildImg } from '../utils';

// --- DUMMY DATA FALLBACKS ---
const DUMMY_COORDINATORS = [
  { _id: "c1", name: "Dr. Anjali Sharma", designation: "Faculty Mentor", department: "Computer Science", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" },
  { _id: "c2", name: "Prof. Rajesh Verma", designation: "Faculty Advisor", department: "Electronics", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600" },
];

const DUMMY_ORGANIZERS = [
  { _id: "o1", name: "Aryan Gupta", role: "Lead Organizer", bio: "Passionate about bringing ideas to life.", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600" },
  { _id: "o2", name: "Sneha Reddy", role: "Curator", bio: "Curating talks that inspire change.", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" },
  { _id: "o3", name: "Vikram Singh", role: "Tech Lead", bio: "Building the digital infrastructure.", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600" },
  { _id: "o4", name: "Neha Patel", role: "Design Head", bio: "Crafting the visual identity of TEDx.", photo: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&q=80&w=600" },
];

export default function TeamPage() {
  const [coordinators, setCoordinators] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTeam = async () => {
      try {
        const [coordRes, orgRes] = await Promise.allSettled([
          api.get('/admin/coordinators/public/list'),
          api.get('/admin/organizers/public/list')
        ]);

        const extract = (res) => (res.status === 'fulfilled' && res.value?.data?.success) 
          ? res.value.data.data 
          : (res.value?.data || []);

        const fetchedCoords = extract(coordRes);
        const fetchedOrgs = extract(orgRes);

        setCoordinators(Array.isArray(fetchedCoords) && fetchedCoords.length > 0 ? fetchedCoords : DUMMY_COORDINATORS);
        setOrganizers(Array.isArray(fetchedOrgs) && fetchedOrgs.length > 0 ? fetchedOrgs : DUMMY_ORGANIZERS);

      } catch (err) {
        setCoordinators(DUMMY_COORDINATORS);
        setOrganizers(DUMMY_ORGANIZERS);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTeam();
  }, []);

  // "ID Card" Style Component
  const TeamCard = ({ member, type }) => {
    const role = member.role || member.designation || member.department || "Team Member";
    
    return (
      <div className="group relative w-full h-[450px] bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-500 shadow-xl">
        {/* Full Height Image */}
        <div className="absolute inset-0">
          <img 
            src={buildImg(member.photo)} 
            alt={member.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            onError={(e) => e.currentTarget.src = "https://placehold.co/600x800/222/FFF?text=TEDx+Member"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
        </div>

        {/* Info Slide Up */}
        <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="w-10 h-1 bg-red-600 mb-3 transition-all duration-300 group-hover:w-full" />
          
          <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{member.name}</h3>
          <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-3">{role}</p>
          
          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
             <p className="text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
               {member.bio || `A dedicated ${type} contributing to the success of TEDxSMEC.`}
             </p>
             <div className="flex gap-4 pt-2 border-t border-white/10">
               {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>}
               {member.twitter && <a href={member.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>}
               {member.email && <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-white transition-colors"><Mail size={20} /></a>}
             </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold animate-pulse">LOADING TEAM...</div>;

  return (
    <div className="bg-black min-h-screen pt-24 pb-20 px-6">
      
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
          The <span className="text-red-600">Force</span> Behind
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Meet the visionaries and the executers working tirelessly to bring ideas to the stage.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* 1. FACULTY COORDINATORS */}
        {coordinators.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
              <span className="text-4xl font-black text-red-600 opacity-20">01</span>
              <h2 className="text-3xl font-bold text-white">Faculty Coordinators</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {coordinators.map((c, i) => <TeamCard key={c._id || i} member={c} type="Coordinator" />)}
            </div>
          </section>
        )}

        {/* 2. ORGANIZERS */}
        {organizers.length > 0 && (
          <section>
             <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
              <span className="text-4xl font-black text-red-600 opacity-20">02</span>
              <h2 className="text-3xl font-bold text-white">Organizing Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {organizers.map((o, i) => <TeamCard key={o._id || i} member={o} type="Organizer" />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}