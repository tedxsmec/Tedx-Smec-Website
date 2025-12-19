import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Filter, ArrowRight } from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";

// ─── IMAGE RESOLVER ────────────────────────────────────────────
const resolveImage = (img) => {
  if (!img) return null;
  if (img.startsWith("http")) return img;
  return buildImg(img);
};

// ─── VENUE RESOLVER (FIX) ──────────────────────────────────────
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
    description: "A deep dive into eco-friendly architecture and living.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1000",
  },
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

        // 🔹 Normalize events (VENUE FIX HERE)
        const normalized = Array.isArray(data)
          ? data.map((ev) => ({
              ...ev,
              venue: resolveVenue(ev),
            }))
          : [];

        setEvents(normalized.length ? normalized : DUMMY_EVENTS);
      } catch (err) {
        console.error("Events fetch failed:", err);
        setEvents(DUMMY_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const isUpcoming = (ev) => new Date(ev.date) > new Date();

  const displayEvents = events
    .filter(
      (e) =>
        e.name?.toLowerCase().includes(search.toLowerCase()) ||
        e.venue?.toLowerCase().includes(search.toLowerCase())
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
                  {/* IMAGE */}
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

                  {/* CONTENT */}
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
