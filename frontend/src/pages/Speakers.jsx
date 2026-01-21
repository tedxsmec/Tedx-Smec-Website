import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mic2, Search } from 'lucide-react';
import { api } from '../api';
import { buildImg } from '../utils';
import { SpeakerCardSkeleton, SkeletonGrid } from '../components/Skeleton';
import ConnectionError from '../components/ConnectionError';

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchSpeakers = async () => {
    setLoading(true);
    setError(false);
    try {
      const endpoints = ['/admin/speakers/public/list', '/speakers'];
      let data = [];
      
      for (const ep of endpoints) {
        try {
          const res = await api.get(ep);
          const val = res?.data?.success ? res.data.data : res.data;
          if (Array.isArray(val) && val.length > 0) {
            data = val;
            break;
          }
        } catch (e) { continue; }
      }
      
      if (data.length === 0) throw new Error('No data available');
      setSpeakers(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const filtered = speakers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.designation && s.designation.toLowerCase().includes(search.toLowerCase()))
  );

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 w-64 mx-auto bg-neutral-800 animate-pulse rounded mb-4" />
            <div className="h-6 w-96 mx-auto bg-neutral-800 animate-pulse rounded" />
          </div>
          <SkeletonGrid 
            count={4} 
            ItemComponent={SpeakerCardSkeleton}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <ConnectionError onRetry={fetchSpeakers} message="Unable to Load Speakers" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-28 pb-16 px-6 text-center border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            The <span className="text-red-600">Voices.</span>
          </motion.h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
            Meet the visionaries challenging the status quo. One idea at a time.
          </p>

          {/* Compact Search */}
          <div className="relative max-w-sm mx-auto group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Find a speaker..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-neutral-900/50 border border-white/10 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-red-600 transition-all placeholder-gray-600"
            />
          </div>
        </div>
      </section>

      {/* 2. THE SPOTLIGHT LIST (Refined Zig-Zag) */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
        {loading ? (
          <div className="h-64 flex items-center justify-center text-red-600 font-bold animate-pulse text-sm tracking-widest">LOADING VOICES...</div>
        ) : filtered.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-gray-500">No speakers found.</div>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {filtered.map((speaker, idx) => {
              const isEven = idx % 2 === 0;
              const img = buildImg(speaker.photo);

              return (
                <motion.div 
                  key={speaker._id || idx}
                  initial={{ opacity: 0.9, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0%", amount: 0.2 }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="group relative h-auto md:h-[480px] flex flex-col md:flex-row overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 hover:border-red-600/20 bg-neutral-900/30 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_40px_rgba(230,43,30,0.15)]"
                >
                  {/* --- IMAGE HALF --- */}
                  <div className={`relative w-full md:w-[45%] h-[320px] md:h-full overflow-hidden ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <img 
                      src={img} 
                      alt={speaker.name} 
                      className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                      onError={(e) => e.currentTarget.src = "https://placehold.co/800x1000/111/444?text=TEDx"}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                    
                    {/* Decorative Number */}
                    <span className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-7xl md:text-8xl font-black text-white/10 select-none leading-none">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* --- CONTENT HALF --- */}
                  <div className={`w-full md:w-[55%] flex flex-col justify-center p-8 md:p-10 lg:p-14 relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                    
                    <div className="space-y-5 relative">
                      {/* Talk Topic Tag */}
                      {speaker.talkTopic && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-red-600/30 rounded-full bg-red-900/10 text-red-500 text-[10px] font-bold uppercase tracking-widest w-fit">
                          <Mic2 size={12} />
                          {speaker.talkTopic}
                        </div>
                      )}

                      {/* Name & Title */}
                      <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-3 group-hover:text-red-600 transition-colors duration-500">
                          {speaker.name}
                        </h2>
                        <p className="text-base md:text-lg text-gray-400 font-medium border-l-4 border-red-600 pl-4">
                          {speaker.designation}
                        </p>
                      </div>

                      {/* Short Bio */}
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3 max-w-2xl">
                        {speaker.bio || "A visionary thinker sharing ideas that matter."}
                      </p>

                      {/* CTA Button */}
                      <div className="pt-3">
                        <button 
                          onClick={() => navigate(`/speakers/${speaker.slug || speaker._id}`)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/10 border border-red-600/30 rounded-full text-white font-bold uppercase tracking-widest text-[10px] hover:bg-red-600 hover:border-red-600 transition-all duration-300 group/btn"
                        >
                          <span>View Profile</span>
                          <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}