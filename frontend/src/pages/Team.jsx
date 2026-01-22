import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { Linkedin, Instagram, Twitter, Mail } from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";

/* ───────── HELPERS ───────── */

const isHod = (member = {}) => {
  const bio = (member.bio || "").toLowerCase();
  const designation = (member.designation || "").toLowerCase();
  const department = (member.department || "").toLowerCase();
  const text = `${bio} ${designation} ${department}`;

  // catch variants like "HOD", "Head of Department", "Head of the Department"
  if (/\bhod\b/.test(text)) return true;
  if (text.includes("head of the department")) return true;
  if (text.includes("head of department")) return true;
  return text.includes("head") && text.includes("department");
};

const getRankFromRole = (role = "") => {
  const r = role.toLowerCase();
  if (r.includes("lead")) return 0;
  if (r === "organizer") return 1;
  if (r.includes("co-organizer") || r.includes("co organizer")) return 2;
  return 3;
};

/* ───────── HOOKS ───────── */

const useOnScreen = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { rootMargin: "200px" }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
};

/* ───────── PAGE ───────── */

export default function TeamPage() {
  const [faculty, setFaculty] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [active, setActive] = useState("Technical");

  const teams = [
    "Technical",
    "Media",
    "Design",
    "Marketing",
    "Curation",
    "Operations & Logistics",
    "Sponsorship",
    "Finance",
  ];

  useEffect(() => {
    Promise.all([
      api.get("/admin/coordinators/public/list"),
      api.get("/admin/organizers/public/list"),
    ]).then(([c, o]) => {
      setFaculty(c.data?.data || []);
      setOrganizers(o.data?.data || []);
    });
  }, []);

  /* FACULTY SORT (HOD FIRST, THEN REVERSE ALPHA BY NAME) */
  const sortedFaculty = useMemo(() => {
    return [...faculty].sort((a, b) => {
      const aHod = isHod(a);
      const bHod = isHod(b);

      if (aHod !== bHod) return aHod ? -1 : 1;

      const aName = a.name || "";
      const bName = b.name || "";
      return aName === bName
        ? 0
        : bName.localeCompare(aName, undefined, { sensitivity: "base" });
    });
  }, [faculty]);

  /* ORGANIZERS FILTER + RANK */
  const teamMembers = useMemo(() => {
    return organizers
      .filter(m =>
        (m.role || "").toLowerCase().includes(active.toLowerCase())
      )
      .sort((a, b) => getRankFromRole(a.role) - getRankFromRole(b.role));
  }, [organizers, active]);

  /* EXECUTIVE (ORGANIZER + CO-ORGANIZER) SHOWN ABOVE TABS */
  const executiveLeadership = useMemo(() => {
    const teamKeywords = teams.map(t => t.toLowerCase());

    return organizers
      .filter(m => {
        const r = (m.role || "").toLowerCase();
        const isExec = r === "organizer" || r === "co-organizer" || r === "co organizer";
        const mentionsTeam = teamKeywords.some(t => r.includes(t));
        return isExec && !mentionsTeam;
      })
      .sort((a, b) => getRankFromRole(a.role) - getRankFromRole(b.role));
  }, [organizers, teams]);

  return (
    <div className="min-h-screen bg-black text-white px-4 pt-24 pb-20">

      {/* FACULTY */}
      <Header title="Faculty Coordinators" />
      <div className="mb-16 md:mb-24">
        <Grid data={sortedFaculty} type="faculty" />
      </div>

      {/* ORGANIZERS */}
      <Header title="Organizing Team" />

      {/* EXECUTIVE LEADERSHIP (Organizer / Co-organizer) */}
      {executiveLeadership.length > 0 && (
        <div className="max-w-7xl mx-auto mb-12">
          <h3 className="text-center text-gray-400 uppercase tracking-[0.2em] text-xs font-bold mb-6">Executive Leadership</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveLeadership.map(m => (
              <Card key={m._id} member={m} type="organizer" />
            ))}
          </div>
        </div>
      )}

      {/* TABS */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {teams.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full border transition
              ${
                active === t
                  ? "bg-red-600 border-red-600"
                  : "border-white/20 text-gray-400 hover:border-red-600 hover:text-white"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Grid data={teamMembers} type="organizer" />
    </div>
  );
}

/* ───────── GRID ───────── */

const Grid = memo(({ data, type }) => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map(m => (
        <Card key={m._id} member={m} type={type} />
      ))}
    </div>
  );
});

/* ───────── CARD ───────── */

const Card = memo(({ member, type }) => {
  const [ref, visible] = useOnScreen();

  return (
    <div ref={ref} className="bg-neutral-900 rounded-xl p-3">
      <div className="aspect-[3/4] rounded-lg bg-neutral-800 overflow-hidden">
        {visible && (
          <img
            src={buildImg(member.photo)}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="text-center mt-3">
        <h3 className="text-sm font-bold uppercase">{member.name}</h3>

        {type === "faculty" ? (
          <>
            <p className="text-red-500 text-xs mt-1 italic">
              {member.designation || member.bio}
            </p>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
              {member.department}
            </p>
          </>
        ) : (
          <>
            <p className="text-red-500 text-xs mt-1 uppercase font-bold">
              {member.role}
            </p>
            {member.bio && (
              <p className="text-gray-400 text-[11px] mt-1 line-clamp-2 italic">
                {member.bio}
              </p>
            )}
          </>
        )}
      </div>

      <Socials member={member} />
    </div>
  );
});

/* ───────── SOCIALS ───────── */

const Socials = memo(({ member }) => {
  return (
    <div className="flex justify-center gap-3 mt-3 text-gray-400">
      {member.linkedin && (
        <Icon href={member.linkedin}>
          <Linkedin size={14} />
        </Icon>
      )}
      {member.instagram && (
        <Icon href={member.twitter}>
          <Twitter size={14} />
        </Icon>
      )}
      {member.twitter && (
        <Icon href={member.instagram}>
          <Instagram size={14} />
        </Icon>
      )}
      {member.email && (
        <Icon href={`mailto:${member.email}`}>
          <Mail size={14} />
        </Icon>
      )}
    </div>
  );
});

function Icon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="hover:text-red-500 transition"
    >
      {children}
    </a>
  );
}

/* ───────── HEADER ───────── */

function Header({ title }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold uppercase italic">{title}</h2>
      <div className="w-12 h-1 bg-red-600 mx-auto mt-3" />
    </div>
  );
}
