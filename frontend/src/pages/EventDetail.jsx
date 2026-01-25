import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";

/* ───────────────── HELPERS ───────────────── */

// ✅ BULLETPROOF IMAGE RESOLVER (BACKEND-SAFE)
const resolveImage = (img) => {
  if (!img) return null;

  // String
  if (typeof img === "string") {
    if (img.startsWith("http")) return img;
    return buildImg(img);
  }

  // Object
  if (typeof img === "object") {
    if (img.url) return img.url;
    if (img.secure_url) return img.secure_url;
    if (img.path) return buildImg(img.path);

    // Nested image object (common in Mongo/Cloudinary)
    if (img.image) return resolveImage(img.image);
  }

  // Array
  if (Array.isArray(img) && img.length > 0) {
    return resolveImage(img[0]);
  }

  return null;
};

const resolveVenue = (e) =>
  e?.venue ||
  e?.venueName ||
  e?.location ||
  e?.place ||
  e?.address ||
  e?.venue?.name ||
  "Venue TBA";

/* ───────────────── COMPONENT ───────────────── */

export default function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${slug}`);
        const data = res?.data?.success ? res.data.data : res.data;
        setEvent(data || null);
      } catch {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-600 font-bold animate-pulse">
        LOADING EVENT…
      </div>
    );

  if (!event)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <button
          onClick={() => navigate("/events")}
          className="text-red-500 mt-4"
        >
          Back to Events
        </button>
      </div>
    );

  const isUpcoming = new Date(event.date) > new Date();

  // ✅ FIXED BANNER SELECTION (IMPORTANT)
  const banner = resolveImage(
    event.banner ??
      event.bannerUrl ??
      event.coverImage ??
      event.image ??
      event.images ??
      event.media
  );

  return (
    <div className="bg-black min-h-screen text-white pb-24">

      {/* HERO */}
      <div className="relative h-[70vh] overflow-hidden">
        {banner ? (
          <img
            src={banner}
            alt={event.name}
            loading="eager"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1200&q=80";
            }}
            className="absolute inset-0 w-full h-full object-cover brightness-125"
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-gray-500">
            No Banner Available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        <button
          onClick={() => navigate("/events")}
          className="absolute top-24 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/60 rounded-full border border-white/20 hover:bg-red-600 hover:border-red-600 transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10 max-w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 text-red-600 drop-shadow-lg">
            {event.name}
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap gap-6 text-white drop-shadow-md">
            <span className="flex items-center gap-2">
              <Calendar size={20} /> {new Date(event.date).toDateString()}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={20} />{(() => {
  const d = new Date(event.date);
  d.setHours(9, 0, 0, 0); // 9:00 AM
  return d.toLocaleTimeString();
})()}

            </span>
            <span className="flex items-center gap-2">
              <MapPin size={20} /> {resolveVenue(event)}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT (UNCHANGED) */}
      <div className="max-w-7xl mx-auto px-6 mt-20 space-y-24">
        {/* ABOUT */}
        <section>
          <h2 className="text-4xl font-extrabold mb-6 text-red-600">
            About the Event
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {event.description}
          </p>
        </section>

        {/* ACTION */}
        {isUpcoming && (
          <button
            onClick={() =>
              navigate(`/events/${event.slug || event._id}/book`)
            }
            className="px-10 py-5 bg-red-600 hover:bg-red-700 rounded-xl font-bold uppercase tracking-widest flex items-center gap-3 transition"
          >
            Reserve Seat <ArrowRight />
          </button>
        )}

        {/* SPEAKERS */}
        {event.speakers?.length > 0 && (
          <HorizontalSection title="Speakers">
            {event.speakers.map((s) => (
              <PersonCard key={s._id} data={s} />
            ))}
          </HorizontalSection>
        )}

        {/* FACULTY COORDINATORS */}
        {event.coordinators?.length > 0 && (
          <HorizontalSection title="Faculty Coordinators">
            {event.coordinators.map((c) => (
              <PersonCard key={c._id} data={c} />
            ))}
          </HorizontalSection>
        )}

        {/* ORGANIZERS */}
        {event.organizers?.length > 0 && (
          <HorizontalSection title="Organizers">
            {event.organizers.map((o) => (
              <PersonCard key={o._id} data={o} />
            ))}
          </HorizontalSection>
        )}

        {/* SPONSORS */}
        {event.sponsors?.length > 0 && (
          <HorizontalSection title="Sponsors">
            {event.sponsors.map((sp) => (
              <SponsorCard key={sp._id} data={sp} />
            ))}
          </HorizontalSection>
        )}        
      </div>
    </div>
  );
}

/* ───────────────── UI COMPONENTS (UNCHANGED) ───────────────── */

function HorizontalSection({ title, children }) {
  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-extrabold text-red-600">{title}</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {children}
      </div>
    </section>
  );
}

function PersonCard({ data }) {
  const image = resolveImage(data.photo);

  return (
    <div className="group relative min-w-[260px] h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(220,38,38,0.25)]">
      {image && (
        <img
          src={image}
          alt={data.name}
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute bottom-0 p-5 z-10">
        <h3 className="text-xl font-bold">{data.name}</h3>
        <p className="text-xs uppercase tracking-widest text-red-500 font-semibold mt-1">
          {data.designation || data.role || data.department}
        </p>
        {data.bio && (
          <p className="text-sm text-gray-300 mt-3 line-clamp-2">
            {data.bio}
          </p>
        )}
      </div>
    </div>
  );
}

function SponsorCard({ data }) {
  return (
    <div className="min-w-[220px] h-[160px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center hover:border-red-600/40 transition-all">
      <img
        src={resolveImage(data.logo || data.logoUrl)}
        alt={data.name}
        className="h-12 object-contain grayscale hover:grayscale-0 transition"
      />
    </div>
  );
}
