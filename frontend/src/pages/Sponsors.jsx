import React, { useEffect, useState } from "react";
import { api } from "../api";
import { buildImg } from "../utils";
import { SponsorLogoSkeleton, SkeletonGrid } from "../components/Skeleton";
import ConnectionError from "../components/ConnectionError";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSponsors = async () => {
    setLoading(true);
    setError(null);

    const endpoints = [
      "/admin/sponsors/public/list", // primary
      "/sponsors",                  // fallback
    ];

    for (const ep of endpoints) {
      try {
        const res = await api.get(ep);
        const data = res?.data?.success ? res.data.data : res.data;

        if (Array.isArray(data) && data.length > 0) {
          setSponsors(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        if (ep === endpoints[endpoints.length - 1]) {
          setError(
            err?.response?.data?.message ||
            err.message ||
            "Failed to load sponsors"
          );
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  return (
    <div className="bg-black text-white">
      <main className="pt-24 px-4 max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl md:text-5xl font-black text-center mb-12">
          Our <span className="text-red-600">Sponsors</span>
        </h1>

        {/* LOADING */}
        {loading && (
          <SkeletonGrid 
            count={6} 
            ItemComponent={SponsorLogoSkeleton}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20"
          />
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="max-w-xl mx-auto">
            <ConnectionError onRetry={fetchSponsors} message="Unable to Load Sponsors" />
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && sponsors.length === 0 && (
          <p className="text-center text-gray-400 py-20">
            No sponsors available at the moment.
          </p>
        )}

        {/* SPONSORS GRID */}
        {!loading && !error && sponsors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
            {sponsors.map((sp) => (
              <div
                key={sp._id || sp.id}
                className="group bg-neutral-900/80 border border-white/10 rounded-xl
                           flex items-center justify-center
                           hover:border-red-600/50 hover:bg-neutral-900 transition-all
                           h-48 md:h-56"
              >
                <img
                  src={buildImg(sp.logo || sp.logoUrl)}
                  alt={sp.name || "Sponsor"}
                  className="h-full w-full object-contain opacity-90 group-hover:opacity-100 transition"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/160x80/111111/ffffff?text=Sponsor";
                  }}
                />
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
