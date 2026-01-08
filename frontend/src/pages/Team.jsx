// import React, { useEffect, useState } from 'react';
// import { Mail, Linkedin, Instagram, Twitter } from 'lucide-react';
// import { api } from '../api';
// import { buildImg } from '../utils';

// /* ─── DUMMY DATA FALLBACKS ───────────────────────── */

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

// /* ─── SOCIAL URL RESOLVER (BACKEND SAFE) ─────────── */

// const resolveSocials = (m) => ({
//   linkedin: m.linkedin || m.linkedinUrl || m.linkedin_link || null,
//   twitter: m.instagram || m.instagramUrl || m.instagram_link || null,
//   twitter: m.twitter || m.twitterUrl || m.x || m.xUrl || null,
//   email: m.email || m.emailId || null,
// });

// /* ─── MAIN COMPONENT ───────────────────────────── */

// export default function TeamPage() {
//   const [coordinators, setCoordinators] = useState([]);
//   const [organizers, setOrganizers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAllTeam = async () => {
//       try {
//         const [coordRes, orgRes] = await Promise.allSettled([
//           api.get('/admin/coordinators/public/list'),
//           api.get('/admin/organizers/public/list'),
//         ]);

//         const extract = (res) =>
//           res.status === 'fulfilled' && res.value?.data?.success
//             ? res.value.data.data
//             : [];

//         setCoordinators(extract(coordRes).length ? extract(coordRes) : DUMMY_COORDINATORS);
//         setOrganizers(extract(orgRes).length ? extract(orgRes) : DUMMY_ORGANIZERS);
//       } catch {
//         setCoordinators(DUMMY_COORDINATORS);
//         setOrganizers(DUMMY_ORGANIZERS);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllTeam();
//   }, []);

//   /* ─── TEAM CARD ───────────────────────────── */

//   const TeamCard = ({ member, type }) => {
//     const role =
//       member.role ||
//       member.designation ||
//       member.department ||
//       "Team Member";

//     const socials = resolveSocials(member);
//     const showSocials = type === "Organizer";

//     return (
//       <div className="group relative min-w-[280px] h-[420px] bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition-all duration-500 shadow-xl snap-start">

//         {/* IMAGE */}
//         <div className="absolute inset-0">
//           <img
//             src={buildImg(member.photo)}
//             alt={member.name}
//             className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 transition-all duration-700 md:group-hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 md:group-hover:opacity-70 transition-opacity duration-500" />
//         </div>

//         {/* SOCIAL ICONS */}
//         {showSocials && (
//           <div
//             className="
//               absolute z-20 flex gap-4
//               bottom-4 left-1/2 -translate-x-1/2
//               md:top-4 md:right-4 md:left-auto md:bottom-auto md:translate-x-0
//               md:flex-col

//               opacity-100
//               md:opacity-0 md:translate-y-2
//               md:group-hover:opacity-100 md:group-hover:translate-y-0

//               transition-all duration-300
//             "
//           >
//             {socials.linkedin && (
//               <a href={socials.linkedin} target="_blank" rel="noreferrer"
//                 className="p-2 bg-black/70 rounded-full hover:bg-[#0A66C2] transition">
//                 <Linkedin size={18} className="text-white" />
//               </a>
//             )}

//             {socials.instagram && (
//               <a href={socials.instagram} target="_blank" rel="noreferrer"
//                 className="p-2 bg-black/70 rounded-full hover:bg-pink-500 transition">
//                 <Instagram size={18} className="text-white" />
//               </a>
//             )}

//             {socials.twitter && (
//               <a href={socials.twitter} target="_blank" rel="noreferrer"
//                 className="p-2 bg-black/70 rounded-full hover:bg-sky-500 transition">
//                 <Twitter size={18} className="text-white" />
//               </a>
//             )}

//             {socials.email && (
//               <a href={`mailto:${socials.email}`}
//                 className="p-2 bg-black/70 rounded-full hover:bg-red-600 transition">
//                 <Mail size={18} className="text-white" />
//               </a>
//             )}
//           </div>
//         )}

//         {/* CONTENT */}
//         <div className="absolute bottom-0 left-0 w-full p-6">
//           <div className="w-10 h-1 bg-red-600 mb-3 md:group-hover:w-full transition-all" />

//           <h3 className="text-2xl font-bold text-white mb-1">
//             {member.name}
//           </h3>

//           <p className="text-red-500 font-bold uppercase tracking-widest text-xs mb-2">
//             {role}
//           </p>

//           {/* DESCRIPTION → DESKTOP ONLY */}
//           <p className="hidden md:block text-gray-300 text-sm line-clamp-3">
//             {member.bio || `A dedicated ${type} contributing to TEDxSMEC.`}
//           </p>
//         </div>
//       </div>
//     );
//   };

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
//               <TeamCard key={c._id || i} member={c} type="Coordinator" />
//             ))}
//           </HorizontalScroll>
//         </section>

//         <section>
//           <SectionHeader index="02" title="Organizing Team" />
//           <HorizontalScroll>
//             {organizers.map((o, i) => (
//               <TeamCard key={o._id || i} member={o} type="Organizer" />
//             ))}
//           </HorizontalScroll>
//         </section>

//       </div>
//     </div>
//   );
// }

// /* ─── HELPERS ───────────────────────────── */

// function SectionHeader({ index, title }) {
//   return (
//     <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
//       <span className="text-4xl font-black text-red-600 opacity-20">
//         {index}
//       </span>
//       <h2 className="text-3xl font-bold text-white">
//         {title}
//       </h2>
//     </div>
//   );
// }

// function HorizontalScroll({ children }) {
//   return (
//     <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
//       {children}
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Instagram, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../api';
import { buildImg } from '../utils';

/* ─── DUMMY DATA ───────────────────────── */

const DUMMY_COORDINATORS = [
  {
    _id: "c1",
    name: "Dr. Anjali Sharma",
    designation: "Faculty Mentor",
    department: "Computer Science",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  },
];

const DUMMY_ORGANIZERS = [
  {
    _id: "o1",
    name: "Aryan Gupta",
    role: "Lead Organizer",
    bio: "Passionate about bringing ideas to life.",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    email: "aryan@tedxsmec.com",
  },
];

/* ─── SOCIAL RESOLVER ─────────────────── */

const resolveSocials = (m) => ({
  linkedin: m.linkedin || m.linkedinUrl || null,
  twitter: m.instagram || m.instagramUrl || null,
  instagram: m.twitter || m.twitterUrl || m.x || null,
  email: m.email || null,
});

/* ─── MAIN ───────────────────────────── */

export default function TeamPage() {
  const [coordinators, setCoordinators] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [c, o] = await Promise.allSettled([
          api.get('/admin/coordinators/public/list'),
          api.get('/admin/organizers/public/list'),
        ]);

        const pick = (r, d) =>
          r.status === 'fulfilled' && r.value?.data?.success
            ? r.value.data.data
            : d;

        setCoordinators(pick(c, DUMMY_COORDINATORS));
        setOrganizers(pick(o, DUMMY_ORGANIZERS));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-bold animate-pulse">
        LOADING TEAM...
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-24">

        <section>
          <SectionHeader index="01" title="Faculty Coordinators" />
          <HorizontalScroll>
            {coordinators.map((c, i) => (
              <TeamCard key={c._id || i} member={c} />
            ))}
          </HorizontalScroll>
        </section>

        <section>
          <SectionHeader index="02" title="Organizing Team" />
          <HorizontalScroll>
            {organizers.map((o, i) => (
              <TeamCard key={o._id || i} member={o} showSocials />
            ))}
          </HorizontalScroll>
        </section>

      </div>
    </div>
  );
}

/* ─── TEAM CARD ───────────────────────── */

function TeamCard({ member, showSocials }) {
  const socials = resolveSocials(member);

  return (
    <div className="group relative min-w-[280px] h-[420px] bg-neutral-900 rounded-3xl overflow-hidden border border-white/5 hover:border-red-600/50 transition shadow-xl snap-start">

      {/* IMAGE */}
      <img
        src={buildImg(member.photo)}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover transition duration-700 md:group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* SOCIAL ICONS */}
      {showSocials && (
        <div
          className="
            absolute z-20 flex flex-col gap-3
            top-4 right-4

            opacity-100
            md:opacity-0 md:translate-y-1
            md:group-hover:opacity-100 md:group-hover:translate-y-0

            transition-all duration-300
          "
        >
          {socials.linkedin && <SocialIcon href={socials.linkedin}><Linkedin size={18} /></SocialIcon>}
          {socials.instagram && <SocialIcon href={socials.instagram}><Instagram size={18} /></SocialIcon>}
          {socials.twitter && <SocialIcon href={socials.twitter}><Twitter size={18} /></SocialIcon>}
          {socials.email && <SocialIcon href={`mailto:${socials.email}`}><Mail size={18} /></SocialIcon>}
        </div>
      )}

      {/* CONTENT */}
      <div className="absolute bottom-0 w-full p-6">
        <div className="w-10 h-1 bg-red-600 mb-3 md:group-hover:w-full transition-all" />
        <h3 className="text-2xl font-bold text-white break-words">{member.name}</h3>
        <p className="text-red-500 text-xs uppercase tracking-widest font-bold break-words">
          {member.role || member.designation || member.department}
        </p>
        <p className="hidden md:block text-gray-300 text-sm mt-2 line-clamp-3">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-2 bg-black/70 rounded-full hover:bg-red-600 transition text-white"
    >
      {children}
    </a>
  );
}

/* ─── HORIZONTAL SCROLL WITH ARROWS ───── */

function HorizontalScroll({ children }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    ref.current.scrollBy({
      left: dir * 320,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* LEFT ARROW */}
      <button
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-red-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        <ChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll(1)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-red-600 text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        <ChevronRight />
      </button>

      <div
        ref={ref}
        className="flex gap-8 overflow-x-scroll scroll-smooth pb-4 snap-x snap-mandatory no-scrollbar"
      >
        {children}
      </div>
    </div>
  );
}

/* ─── HEADER ─────────────────────────── */

function SectionHeader({ index, title }) {
  return (
    <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
      <span className="text-4xl font-black text-red-600 opacity-20">{index}</span>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
    </div>
  );
}
