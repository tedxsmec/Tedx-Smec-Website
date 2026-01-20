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

  const teamList = ["Technical", "Media", "Design", "Marketing", "Curation", "Operations & Logistics", "Sponsorship" , "Finance"];

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
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 px-2">
            {teamList.map((team) => (
              <button
                key={team}
                onClick={() => setActiveTab(team)}
                className={`relative px-4 md:px-6 py-2.5 md:py-3 text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold rounded-full border-2 transition-all duration-300 overflow-hidden group ${
                  activeTab === team 
                    ? "border-red-600 bg-red-600 text-white shadow-[0_0_20px_rgba(230,43,30,0.3)]" 
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-red-600/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {/* Animated background on hover */}
                <span className={`absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-600/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ${activeTab === team ? 'hidden' : ''}`} />
                
                {/* Text */}
                <span className="relative z-10">{team}</span>
                
                {/* Active indicator dot */}
                {activeTab === team && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
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