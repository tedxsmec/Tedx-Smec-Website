// // import React, { useEffect, useState } from 'react';
// // import { Mail, Linkedin, Instagram, Twitter } from 'lucide-react';
// // import { api } from '../api';
// // import { buildImg } from '../utils';

// // /* ─── DUMMY DATA FALLBACKS ───────────────────────── */

// // const DUMMY_COORDINATORS = [
// //   {
// //     _id: "c1",
// //     name: "Dr. Anjali Sharma",
// //     designation: "Faculty Mentor",
// //     department: "Computer Science",
// //     photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
// //   },
// // ];

// // const DUMMY_ORGANIZERS = [
// //   {
// //     _id: "o1",
// //     name: "Aryan Gupta",
// //     role: "Lead Organizer",
// //     bio: "Passionate about bringing ideas to life.",
// //     photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
// //     linkedin: "https://linkedin.com",
// //     instagram: "https://instagram.com",
// //     twitter: "https://twitter.com",
// //     email: "aryan@tedxsmec.com",
// //   },
// // ];

// // /* ─── SOCIAL URL RESOLVER (BACKEND SAFE) ─────────── */

// // const resolveSocials = (m) => ({
// //   linkedin: m.linkedin || m.linkedinUrl || m.linkedin_link || null,
// //   twitter: m.instagram || m.instagramUrl || m.instagram_link || null,
// //   twitter: m.twitter || m.twitterUrl || m.x || m.xUrl || null,
// //   email: m.email || m.emailId || null,
// // });

// // /* ─── MAIN COMPONENT ───────────────────────────── */

// // export default function TeamPage() {
// //   const [coordinators, setCoordinators] = useState([]);
// //   const [organizers, setOrganizers] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchAllTeam = async () => {
// //       try {
// //         const [coordRes, orgRes] = await Promise.allSettled([
// //           api.get('/admin/coordinators/public/list'),
// //           api.get('/admin/organizers/public/list'),
// //         ]);

// //         const extract = (res) =>
// //           res.status === 'fulfilled' && res.value?.data?.success
// //             ? res.value.data.data
// //             : [];

// //         setCoordinators(extract(coordRes).length ? extract(coordRes) : DUMMY_COORDINATORS);
// //         setOrganizers(extract(orgRes).length ? extract(orgRes) : DUMMY_ORGANIZERS);
// //       } catch {
// //         setCoordinators(DUMMY_COORDINATORS);
// //         setOrganizers(DUMMY_ORGANIZERS);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAllTeam();
// //   }, []);

// //   /* ─── TEAM CARD ───────────────────────────── */

// //   const TeamCard = ({ member, type }) => {
// //     const role =
// //       member.role ||
// //       member.designation ||
// //       member.department ||
// //       "Team Member";

// //     const socials = resolveSocials(member);
// //     const showSocials = type === "Organizer";

// //     return (
// //       <div className="group relative min-w-[280px] h-[420px] bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-500 shadow-xl snap-start">

// //         {/* IMAGE */}
// //         <div className="absolute inset-0">
// //           <img
// //             src={buildImg(member.photo)}
// //             alt={member.name}
// //             className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700 md:group-hover:scale-105"
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 md:group-hover:opacity-70 transition-opacity duration-500" />
// //         </div>

// //         {/* SOCIAL ICONS */}
// //         {showSocials && (
// //           <div
// //             className="
// //               absolute z-20 flex gap-4
// //               bottom-4 left-1/2 -translate-x-1/2
// //               md:top-4 md:right-4 md:left-auto md:bottom-auto md:translate-x-0
// //               md:flex-col

// //               opacity-100
// //               md:opacity-0 md:translate-y-2
// //               md:group-hover:opacity-100 md:group-hover:translate-y-0

// //               transition-all duration-300
// //             "
// //           >
// //             {socials.linkedin && (
// //               <a href={socials.linkedin} target="_blank" rel="noreferrer"
// //                 className="p-2 bg-black/70 rounded-full hover:bg-[#0A66C2] transition">
// //                 <Linkedin size={18} className="text-white" />
// //               </a>
// //             )}

// //             {socials.instagram && (
// //               <a href={socials.instagram} target="_blank" rel="noreferrer"
// //                 className="p-2 bg-black/70 rounded-full hover:bg-pink-500 transition">
// //                 <Instagram size={18} className="text-white" />
// //               </a>
// //             )}

// //             {socials.twitter && (
// //               <a href={socials.twitter} target="_blank" rel="noreferrer"
// //                 className="p-2 bg-black/70 rounded-full hover:bg-sky-500 transition">
// //                 <Twitter size={18} className="text-white" />
// //               </a>
// //             )}

// //             {socials.email && (
// //               <a href={`mailto:${socials.email}`}
// //                 className="p-2 bg-black/70 rounded-full hover:bg-red-600 transition">
// //                 <Mail size={18} className="text-white" />
// //               </a>
// //             )}
// //           </div>
// //         )}

// //         {/* CONTENT */}
// //         <div className="absolute bottom-0 left-0 w-full p-6">
// //           <div className="w-10 h-1 bg-red-600 mb-3 md:group-hover:w-full transition-all" />

// //           <h3 className="text-2xl font-bold text-white mb-1">
// //             {member.name}
// //           </h3>

// //           <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">
// //             {role}
// //           </p>

// //           {/* DESCRIPTION → DESKTOP ONLY */}
// //           <p className="hidden md:block text-gray-300 text-sm line-clamp-3">
// //             {member.bio || `A dedicated ${type} contributing to TEDxSMEC.`}
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold animate-pulse">
// //         LOADING TEAM...
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="bg-black min-h-screen pt-24 pb-20 px-6">
// //       <div className="max-w-7xl mx-auto space-y-24">

// //         <section>
// //           <SectionHeader index="01" title="Faculty Coordinators" />
// //           <HorizontalScroll>
// //             {coordinators.map((c, i) => (
// //               <TeamCard key={c._id || i} member={c} type="Coordinator" />
// //             ))}
// //           </HorizontalScroll>
// //         </section>

// //         <section>
// //           <SectionHeader index="02" title="Organizing Team" />
// //           <HorizontalScroll>
// //             {organizers.map((o, i) => (
// //               <TeamCard key={o._id || i} member={o} type="Organizer" />
// //             ))}
// //           </HorizontalScroll>
// //         </section>

// //       </div>
// //     </div>
// //   );
// // }

// // /* ─── HELPERS ───────────────────────────── */

// // function SectionHeader({ index, title }) {
// //   return (
// //     <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
// //       <span className="text-4xl font-black text-red-600 opacity-20">
// //         {index}
// //       </span>
// //       <h2 className="text-3xl font-bold text-white">
// //         {title}
// //       </h2>
// //     </div>
// //   );
// // }

// // function HorizontalScroll({ children }) {
// //   return (
// //     <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
// //       {children}
// //     </div>
// //   );
// // }

// import React, { useEffect, useRef, useState } from 'react';
// import { Mail, Linkedin, Instagram, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
// import { api } from '../api';
// import { buildImg } from '../utils';

// /* ─── DUMMY DATA ───────────────────────── */

// const DUMMY_COORDINATORS = [
//   {
//     _id: "c1",
//     name: "Dr. Anjali Sharma",
//     designation: "Faculty Mentor",
//     department: "Computer Science",
//     photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
//   },
// ];

// const DUMMY_ORGANIZERS = [
//   {
//     _id: "o1",
//     name: "Aryan Gupta",
//     role: "Lead Organizer",
//     bio: "Passionate about bringing ideas to life.",
//     photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
//     linkedin: "https://linkedin.com",
//     instagram: "https://instagram.com",
//     twitter: "https://twitter.com",
//     email: "aryan@tedxsmec.com",
//   },
// ];

// /* ─── SOCIAL RESOLVER ─────────────────── */

// const resolveSocials = (m) => ({
//   linkedin: m.linkedin || m.linkedinUrl || null,
//   twitter: m.instagram || m.instagramUrl || null,
//   instagram: m.twitter || m.twitterUrl || m.x || null,
//   email: m.email || null,
// });

// /* ─── COORDINATOR ORDERING (HOD FIRST) ─────────── */

// function isHod(member) {
//   const tokens = [member.designation, member.role, member.department]
//     .map((s) => (s || '').toLowerCase());
//   const text = tokens.join(' ');
//   return (
//     text.includes('head of department') ||
//     text.includes('hod') ||
//     (text.includes('head') && text.includes('department'))
//   );
// }

// function sortCoordinators(list) {
//   const hods = [];
//   const others = [];
//   list.forEach((m) => (isHod(m) ? hods.push(m) : others.push(m)));
//   return [...hods, ...others];
// }

// /* ─── ORGANIZER ORDERING (ROLE PRIORITY) ───────── */

// function getOrganizerRank(member) {
//   const roleText = [member.role, member.designation, member.title]
//     .map((s) => (s || '').toLowerCase())
//     .join(' ');

//   const isCoOrganizer = /\bco[- ]?organizer\b/.test(roleText);
//   const isLead = /\blead\b/.test(roleText) || /\blead[- ]?organizer\b/.test(roleText);
//   const isOrganizer = /\borganizer\b/.test(roleText) && !isCoOrganizer && !isLead;
//   const isMember = /\bmember\b/.test(roleText);

//   if (isOrganizer) return 1; // Organizer
//   if (isCoOrganizer) return 2; // Co-Organizer
//   if (isLead) return 3; // Lead
//   if (isMember) return 4; // Member
//   return 5; // Others
// }

// function sortOrganizers(list) {
//   return list
//     .map((m, i) => ({ m, i, r: getOrganizerRank(m) }))
//     .sort((a, b) => (a.r - b.r) || (a.i - b.i))
//     .map((x) => x.m);
// }

// /* ─── MAIN ───────────────────────────── */

// export default function TeamPage() {
//   const [coordinators, setCoordinators] = useState([]);
//   const [organizers, setOrganizers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [c, o] = await Promise.allSettled([
//           api.get('/admin/coordinators/public/list'),
//           api.get('/admin/organizers/public/list'),
//         ]);

//         const pick = (r, d) =>
//           r.status === 'fulfilled' && r.value?.data?.success
//             ? r.value.data.data
//             : d;

//         setCoordinators(sortCoordinators(pick(c, DUMMY_COORDINATORS)));
//         setOrganizers(sortOrganizers(pick(o, DUMMY_ORGANIZERS)));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold animate-pulse">
//         LOADING TEAM...
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black min-h-screen pt-24 pb-20 px-6">
//       <div className="max-w-7xl mx-auto space-y-24">

//         <section>
//           <SectionHeader index="01" title="Faculty Coordinators" />
//           <HorizontalScroll>
//             {coordinators.map((c, i) => (
//               <TeamCard key={c._id || i} member={c} />
//             ))}
//           </HorizontalScroll>
//         </section>

//         <section>
//           <SectionHeader index="02" title="Organizing Team" />
//           <HorizontalScroll>
//             {organizers.map((o, i) => (
//               <TeamCard key={o._id || i} member={o} showSocials />
//             ))}
//           </HorizontalScroll>
//         </section>

//       </div>
//     </div>
//   );
// }

// /* ─── TEAM CARD ───────────────────────── */

// function TeamCard({ member, showSocials }) {
//   const socials = resolveSocials(member);
//   const roleText = member.role || member.designation || member.department;
//   const deptText = member.department;

//   return (
//     <div className="group relative min-w-[280px] h-[420px] bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition shadow-xl snap-start">

//       {/* IMAGE */}
//       <img
//         src={buildImg(member.photo)}
//         alt={member.name}
//         className="absolute inset-0 w-full h-full object-cover transition duration-700 md:group-hover:scale-105"
//       />

//       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

//       {/* SOCIAL ICONS */}
//       {showSocials && (
//         <div
//           className="
//             absolute z-20 flex flex-col gap-3
//             top-4 right-4

//             opacity-100
//             md:opacity-0 md:translate-y-1
//             md:group-hover:opacity-100 md:group-hover:translate-y-0

//             transition-all duration-300
//           "
//         >
//           {socials.linkedin && <SocialIcon href={socials.linkedin}><Linkedin size={18} /></SocialIcon>}
//           {socials.instagram && <SocialIcon href={socials.instagram}><Instagram size={18} /></SocialIcon>}
//           {socials.twitter && <SocialIcon href={socials.twitter}><Twitter size={18} /></SocialIcon>}
//           {socials.email && <SocialIcon href={`mailto:${socials.email}`}><Mail size={18} /></SocialIcon>}
//         </div>
//       )}

//       {/* CONTENT */}
//       <div className="absolute bottom-0 w-full p-6">
//         <div className="w-10 h-1 bg-red-600 mb-3 md:group-hover:w-full transition-all" />
//         <h3 className="text-2xl font-bold text-white break-words">{member.name}</h3>
//         <p className="text-red-500 text-xs uppercase tracking-widest font-bold break-words">
//           {roleText}
//         </p>
//         <p className="hidden md:block text-gray-300 text-sm mt-2 line-clamp-3">
//           {member.bio}
//         </p>
//         {!showSocials && deptText && deptText !== roleText && (
//           <p className="text-white text-sm font-medium mt-1 break-words">
//             {deptText}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// function SocialIcon({ href, children }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noreferrer"
//       className="p-2 bg-black/70 rounded-full hover:bg-red-600 transition text-white"
//     >
//       {children}
//     </a>
//   );
// }

// /* ─── HORIZONTAL SCROLL WITH ARROWS ───── */

// function HorizontalScroll({ children }) {
//   const ref = useRef(null);

//   const scroll = (dir) => {
//     ref.current.scrollBy({
//       left: dir * 320,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <div className="relative">
//       {/* LEFT ARROW */}
//       <button
//         onClick={() => scroll(-1)}
//         className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-red-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
//       >
//         <ChevronLeft />
//       </button>

//       {/* RIGHT ARROW */}
//       <button
//         onClick={() => scroll(1)}
//         className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-red-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
//       >
//         <ChevronRight />
//       </button>

//       <div
//         ref={ref}
//         className="flex gap-8 overflow-x-scroll scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
//       >
//         {children}
//       </div>
//     </div>
//   );
// }

// /* ─── HEADER ─────────────────────────── */

// function SectionHeader({ index, title }) {
//   return (
//     <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
//       <span className="text-4xl font-black text-red-600 opacity-20">{index}</span>
//       <h2 className="text-3xl font-bold text-white">{title}</h2>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Mail, Linkedin, Instagram, Twitter } from 'lucide-react';
import { api } from '../api';
import { buildImg } from '../utils';

/* ─── LOGIC HELPERS ─── */
const isHodByBio = (bio = "") => {
  const b = bio?.toLowerCase() || "";
  return b.includes('hod') || b.includes('head of department'); //
};

const getRankFromRole = (roleStr = "") => {
  const r = roleStr?.toLowerCase() || "";
  if (r.includes('lead')) return 1;
  if (r.includes('organizer') && !r.includes('co')) return 2; // Organizer Priority
  if (r.includes('co-organizer') || r.includes('co organizer')) return 3; // Co-organizer
  return 4; 
};

export default function TeamPage() {
  const [faculty, setFaculty] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [activeTab, setActiveTab] = useState("Technical");
  const [loading, setLoading] = useState(true);

  const teamList = ["Technical", "Media", "Design", "Marketing", "Curation", "Operations", "Logistics", "Sponsorship"];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [c, o] = await Promise.allSettled([
          api.get('/admin/coordinators/public/list'),
          api.get('/admin/organizers/public/list'),
        ]);
        const pick = (r) => (r.status === 'fulfilled' && r.value?.data?.success ? r.value.data.data : []);

        setFaculty([...pick(c)].sort((a, b) => (isHodByBio(a.bio) === isHodByBio(b.bio) ? 0 : isHodByBio(a.bio) ? -1 : 1))); //
        setOrganizers(pick(o));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const globalLeaders = organizers.filter(m => {
    const r = (m.role || "").toLowerCase();
    return (r === "organizer" || r === "co-organizer" || r === "co organizer") && 
           !teamList.some(team => r.includes(team.toLowerCase()));
  }).sort((a, b) => getRankFromRole(a.role) - getRankFromRole(b.role));

  const teamMembers = organizers
    .filter(m => (m.role || "").toLowerCase().includes(activeTab.toLowerCase()))
    .sort((a, b) => getRankFromRole(a.role) - getRankFromRole(b.role));

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold text-xl italic animate-pulse">
      ECHOES OF INNOVATION...
    </div>
  );

  return (
    <div className="bg-black min-h-screen pt-24 pb-20 px-4 md:px-6 text-white text-center font-sans">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-subtle-up {
          animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-24 md:space-y-32 animate-subtle-up">
        
        {/* FACULTY SECTION */}
        <section>
          <SectionHeader index="01" title="Faculty Coordinators" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
            {faculty.map((member, i) => (
              <div key={member._id || i} className="w-full max-w-[340px] mx-auto">
                <TeamCard member={member} type="faculty" />
              </div>
            ))}
          </div>
        </section>

        {/* ORGANIZING TEAM */}
        <section>
          <SectionHeader index="02" title="Organizing Team" />

          {/* EXECUTIVE LEADERSHIP */}
          {globalLeaders.length > 0 && (
            <div className="mb-20">
              <h3 className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-10 inline-block border-b-2 border-red-600 pb-2">
                Executive Leadership
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
                {globalLeaders.map((member, i) => (
                  <div key={member._id || i} className="w-full max-w-[340px] mx-auto">
                    <TeamCard member={member} type="organizer" showSocials />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TEAM TABS */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 md:gap-x-8 md:gap-y-4 mb-12 md:mb-16 border-b border-white/10 pb-6 px-2">
            {teamList.map((team) => (
              <button
                key={team}
                onClick={() => setActiveTab(team)}
                className={`text-[10px] md:text-sm uppercase tracking-[0.2em] font-black transition-all duration-300 ${
                  activeTab === team ? "text-red-600 scale-110" : "text-gray-500 hover:text-white"
                }`}
              >
                {team}
              </button>
            ))}
          </div>

          {/* DEPARTMENT GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
            {teamMembers.map((member, i) => (
              <div key={member._id || i} className="w-full max-w-[340px] mx-auto">
                <TeamCard member={member} type="organizer" showSocials />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ─── UI COMPONENTS ─── */

function TeamCard({ member, type, showSocials }) {
  const isFaculty = type === "faculty";

  return (
    <div className="group relative h-[400px] md:h-[450px] bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 
                    hover:border-red-600/40 hover:-translate-y-2 transition-all duration-500 
                    flex flex-col justify-end items-center mx-auto w-full shadow-lg">
      
      <img
        src={buildImg(member.photo)}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover transition duration-700"
      />
      
      {/* Dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      
      {showSocials && <SocialOverlay member={member} />}

      <div className="relative z-10 w-full p-5 md:p-6 bg-gradient-to-t from-black/95 to-transparent pt-12">
        {/* Centered Bar - Fixed Vertical Level */}
        <div className="h-1 w-10 md:w-12 bg-red-600 mx-auto mb-4 group-hover:w-20 md:group-hover:w-24 transition-all duration-500" />
        
        <h3 className="text-lg md:text-xl font-black text-white leading-tight uppercase tracking-tighter">
          {member.name}
        </h3>

        <div className="min-h-[60px] md:min-h-[70px] flex flex-col justify-center">
          {isFaculty ? (
            <>
              <p className="text-red-600 text-xs md:text-sm font-bold mt-1 line-clamp-2 italic">{member.bio}</p>
              <p className="text-gray-400 text-[9px] md:text-[10px] uppercase tracking-widest mt-1 font-medium">{member.department}</p>
            </>
          ) : (
            <>
              <p className="text-red-600 text-xs md:text-sm font-bold mt-1 uppercase tracking-tight">{member.role}</p>
              <p className="text-gray-400 text-[9px] md:text-[10px] mt-1 line-clamp-2 leading-relaxed italic">{member.bio}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ index, title }) {
  return (
    <div className="flex flex-col items-center gap-2 mb-10 md:mb-12">
      <span className="text-4xl md:text-5xl font-black text-white/10 italic select-none leading-none">{index}</span>
      <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter italic">{title}</h2>
      <div className="h-1 w-12 md:w-16 bg-red-600 mt-2" />
    </div>
  );
}

function SocialOverlay({ member }) {
  const s = {
    linkedin: member.linkedin || member.linkedinUrl || null,
    instagram: member.twitter || member.twitterUrl || member.x || null,
    twitter: member.instagram || member.instagramUrl || null,
    email: member.email || null,
  };

  return (
    <div className="absolute top-3 right-3 md:top-4 md:right-4 flex flex-col gap-2 z-20 
                    opacity-100 md:opacity-0 md:group-hover:opacity-100 
                    transition-all duration-300">
      {s.linkedin && <SocialBtn href={s.linkedin} icon={<Linkedin size={14} className="md:w-4 md:h-4"/>}/>}
      {s.instagram && <SocialBtn href={s.instagram} icon={<Instagram size={14} className="md:w-4 md:h-4"/>}/>}
      {s.twitter && <SocialBtn href={s.twitter} icon={<Twitter size={14} className="md:w-4 md:h-4"/>}/>}
      {s.email && <SocialBtn href={`mailto:${s.email}`} icon={<Mail size={14} className="md:w-4 md:h-4"/>}/>}
    </div>
  );
}

function SocialBtn({ href, icon }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" 
       className="p-1.5 md:p-2 bg-black/70 md:bg-black/80 hover:bg-red-600 text-white rounded-full transition-all">
      {icon}
    </a>
  );
}