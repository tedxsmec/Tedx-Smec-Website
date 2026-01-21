import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { buildImg } from "../utils";
import { SponsorLogoSkeleton } from "./Skeleton";
import ConnectionError from "./ConnectionError";

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ─── LOAD ALL SPONSORS ──────────────────────────────────────
  const loadSponsors = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get("/admin/sponsors/public/list");
      const data = res?.data?.success ? res.data.data : res.data;

      // ✅ TAKE EVERYTHING BACKEND SENDS
      if (Array.isArray(data) && data.length > 0) {
        setSponsors(data);
      } else {
        throw new Error('No sponsors available');
      }
    } catch (err) {
      console.warn("Sponsors API failed", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSponsors();
  }, []);

  // ─── DUPLICATE FOR CONTINUOUS MARQUEE ───────────────────────────────────
  const loopList = useMemo(() => {
    if (!sponsors.length) return [];

    // duplicate ONLY for animation (not data loss)
    return sponsors.flatMap((sp, i) =>
      Array.from({ length: 4 }).map((_, idx) => ({
        ...sp,
        __loopKey: `${sp._id || sp.name}-${i}-${idx}`,
      }))
    );
  }, [sponsors]);

  if (loading) {
    return (
      <section className="relative py-20 bg-black overflow-hidden border-t border-white/10">
        <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs block mb-3">
            Our Supporters
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Partners in <span className="text-red-500">Innovation</span>
          </h2>
        </div>
        <div className="flex gap-8 justify-center items-center py-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <SponsorLogoSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-20 bg-black overflow-hidden border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <ConnectionError onRetry={loadSponsors} message="Unable to Load Sponsors" />
        </div>
      </section>
    );
  }

  if (!sponsors.length) return null;

  return (
    <section
      id="sponsors"
      className="relative py-20 bg-black overflow-hidden border-t border-white/10"
    >
      {/* HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-red-500 font-bold tracking-[0.2em] uppercase text-xs block mb-3">
          Our Supporters
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Partners in <span className="text-red-500">Innovation</span>
        </h2>
      </div>

      {/* MARQUEE */}
      <div className="relative w-full overflow-hidden group py-6 z-10">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        <div className="sponsor-track flex items-center w-max gap-6 md:gap-10">
          {loopList.map((sp) => {
            const imgSrc = buildImg(sp.logo || sp.logoUrl);
            const sponsorLink = sp.website || sp.url;

            return sponsorLink ? (
              // ✅ ALL SPONSORS → CLICKABLE → NEW TAB
              <a
                key={sp.__loopKey}
                href={sponsorLink}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-item relative flex items-center justify-center
                           w-56 h-32 md:w-80 md:h-44
                           bg-white/30 backdrop-blur-sm
                           border border-white/10 rounded-xl
                           hover:border-red-600/50 hover:bg-white/50
                           hover:shadow-[0_0_20px_rgba(220,38,38,0.25)]
                           transition-all duration-300"
              >
                <img
                  src={imgSrc}
                  alt={sp.name}
                  className="h-full w-full object-contain
                             brightness-110 drop-shadow-lg"
                />
                <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40">
                  {sp.category || "Partner"}
                </div>
              </a>
            ) : (
              <div
                key={sp.__loopKey}
                className="sponsor-item relative flex items-center justify-center
                           w-56 h-32 md:w-80 md:h-44
                           bg-white/30 backdrop-blur-sm
                           border border-white/10 rounded-xl"
              >
                <img
                  src={imgSrc}
                  alt={sp.name}
                  className="h-full w-full object-contain brightness-110"
                />
                <div className="absolute bottom-2 text-[9px] font-bold uppercase tracking-wider text-white/40">
                  {sp.category || "Partner"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-10 text-center">
        <Link
          to="/sponsors"
          className="inline-block px-8 py-3 rounded-full
                     border border-white/10 hover:border-red-600
                     text-xs font-bold text-white uppercase tracking-widest
                     hover:bg-red-600/10 transition-all"
        >
          Become a Sponsor
        </Link>
      </div>

      {/* ANIMATION */}
      <style>{`
        .sponsor-track {
          animation: marquee 20s linear infinite;
        }
        .group:hover .sponsor-track {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @media (max-width: 768px) {
          .sponsor-track {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  );
}
