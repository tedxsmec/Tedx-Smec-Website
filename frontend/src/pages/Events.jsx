import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Search, Filter, ArrowRight } from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";

/* ───────────────── IMAGE RESOLVER ───────────────── */
const resolveImage = (img) => {
  if (!img) return null;
  if (typeof img === "string" && img.startsWith("http")) return img;
  return buildImg(img);
};

/* ───────────────── VENUE RESOLVER ───────────────── */
const resolveVenue = (event) => {
  return (
    event?.venue ||
    event?.venueName ||
    event?.location ||
    event?.place ||
    event?.address ||
    event?.eventVenue ||
    event?.venue?.name ||
    "Venue TBA"
  );
};

/* ───────────────── DUMMY DATA ───────────────── */
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
    description: "A deep dive into eco-friendly architecture and living.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000",
  },
  {
    _id: "evt-3",
    slug: "digital-frontiers",
    name: "Digital Frontiers",
    date: new Date(Date.now() - 864000000).toISOString(),
    venue: "Tech Hub",
    description: "Navigating the complexities of the metaverse and AI.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all"); // all | upcoming | past
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ───────────────── FETCH EVENTS ───────────────── */
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        const data = res?.data?.success ? res.data.data : res.data;

        const normalized = Array.isArray(data)
          ? data.map((ev) => ({
              ...ev,
              venue: resolveVenue(ev),
            }))
          : [];

        setEvents(normalized.length ? normalized : DUMMY_EVENTS);
      } catch (err) {
        console.warn("API failed — using dummy events", err);
        setEvents(DUMMY_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const isUpcoming = (ev) => new Date(ev.date) > new Date();

  /* ───────────────── FILTER + SORT ───────────────── */
  const displayEvents = events
    .filter((e) => {
      const q = search.toLowerCase();
      return (
        e.name?.toLowerCase().includes(q) ||
        e.venue?.toLowerCase().includes(q)
      );
    })
    .filter((e) => {
      if (filter === "upcoming") return isUpcoming(e);
      if (filter === "past") return !isUpcoming(e);
      return true;
    })
    .sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      if (filter === "upcoming") return da - db;
      return db - da;
    });

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
          Explore <span className="text-red-600">Events</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          From groundbreaking talks to immersive experiences — explore our
          journey.
        </p>
      </div>

      {/* FILTER + SEARCH */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="bg-neutral-900/80 p-1.5 rounded-full flex border border-white/10">
          {["all", "upcoming", "past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                filter === tab
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full bg-neutral-900 border border-white/10 rounded-full py-3 pl-11 pr-4 focus:outline-none focus:border-red-600/50"
          />
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-red-600 font-bold tracking-widest">
              LOADING EVENTS
            </span>
          </div>
        ) : displayEvents.length === 0 ? (
          <div className="text-center py-24">
            <Filter size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayEvents.map((event) => {
              const active = isUpcoming(event);
              const banner = resolveImage(
                event.banner || event.image || event.bannerUrl
              );

              return (
                <div
                  key={event._id}
                  onClick={() =>
                    navigate(`/events/${event.slug || event._id}`)
                  }
                  className="group bg-neutral-900 border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-red-600/50 transition-all"
                >
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={
                        banner ||
                        "https://images.unsplash.com/photo-1544531586-fde5298cdd40"
                      }
                      alt={event.name}
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://images.unsplash.com/photo-1544531586-fde5298cdd40")
                      }
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />

                    <div
                      className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                        active
                          ? "bg-red-600 text-white"
                          : "bg-black/70 text-gray-300"
                      }`}
                    >
                      {active ? "UPCOMING" : "PAST"}
                    </div>

                    <div className="absolute bottom-0 left-0 bg-black/80 px-4 py-2 flex items-center gap-2">
                      <Calendar size={14} className="text-red-500" />
                      <span className="text-xs font-bold uppercase">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500">
                      {event.name}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                      <MapPin size={14} />
                      <span>{resolveVenue(event)}</span>
                    </div>

                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                      {event.description}
                    </p>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        {active ? "Register Now" : "View Event"}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-gray-400 group-hover:text-red-500 transition"
                      />
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
