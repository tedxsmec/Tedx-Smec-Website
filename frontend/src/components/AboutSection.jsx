

import React, { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { api } from "../api";

/* ───────────────── HELPERS ───────────────── */

const getUpcomingEvent = (events = []) => {
  return events
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];
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

export default function CountdownSection() {
  const [event, setEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  /* FETCH UPCOMING EVENT */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get("/events");
        const data = res?.data?.success ? res.data.data : res.data;
        const upcoming = getUpcomingEvent(data || []);
        setEvent(upcoming || null);
      } catch {
        setEvent(null);
      }
    };
    fetchEvent();
  }, []);

  /* COUNTDOWN LOGIC */
  useEffect(() => {
    if (!event?.date) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(event.date).getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [event]);

  if (!event || !timeLeft) return null;

  return (
    <section className="relative py-32 bg-black overflow-hidden selection:bg-red-600 selection:text-white">

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-red-600/10 blur-[140px] rounded-full" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">

        {/* HEADER */}
        <span className="text-red-600 font-bold tracking-[0.3em] uppercase text-xs block mb-4">
          Next TEDx Experience
        </span>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          {event.name}
        </h2>

        <div className="flex flex-wrap justify-center gap-6 text-gray-400 mb-16">
          <span className="flex items-center gap-2">
            <Calendar className="text-red-600" size={18} />
            {new Date(event.date).toDateString()}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="text-red-600" size={18} />
            {resolveVenue(event)}
          </span>
        </div>

        {/* COUNTDOWN */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hours" value={timeLeft.hours} />
          <TimeBox label="Minutes" value={timeLeft.minutes} />
          <TimeBox label="Seconds" value={timeLeft.seconds} />
        </div>
      </div>
    </section>
  );
}

/* ───────────────── TIME CARD ───────────────── */

function TimeBox({ label, value }) {
  return (
    <div className="
      bg-neutral-900 border border-white/10
      rounded-2xl p-6 md:p-8
      hover:border-red-600/50 transition-all
    ">
      <div className="text-4xl md:text-6xl font-black text-white mb-2">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs uppercase tracking-widest text-red-500 font-bold">
        {label}
      </div>
    </div>
  );
}
