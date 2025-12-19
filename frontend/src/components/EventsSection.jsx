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
    description:
      "Exploring how past reverberations shape our future technologies.",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=1200"
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
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200"
  }
];

// ─── IMAGE RESOLVER ───────────────────────────────────────────
const resolveImage = (img) => {
  if (!img) return null;
  if (typeof img === "string") {
    if (img.startsWith("http")) return img;
    return buildImg(img);
  }
  if (typeof img === "object") {
    if (img.url) return img.url;
    if (img.secure_url) return img.secure_url;
    if (img.path) return buildImg(img.path);
  }
  if (Array.isArray(img) && img.length > 0) {
    return resolveImage(img[0]);
  }
  return null;
};

// ─── VENUE RESOLVER (FIX) ─────────────────────────────────────
const resolveVenue = (e) =>
  e?.venue ||
  e?.venueName ||
  e?.location ||
  e?.place ||
  e?.address ||
  e?.venue?.name ||
  "TBA";

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
        setEvents(Array.isArray(data) && data.length ? data : DUMMY_EVENTS);
      } catch (err) {
        console.warn("Events API failed, using fallback", err);
        setEvents(DUMMY_EVENTS);
      }
    };
    fetchEvents();
  }, []);

  // ─── UPCOMING EVENTS ────────────────────────────────────────
  const upcomingEvents = events
    .filter((e) => new Date(e.date) > new Date())
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
                        <MapPin size={14} /> {resolveVenue(event)}
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
