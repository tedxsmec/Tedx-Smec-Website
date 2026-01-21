import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin } from "lucide-react";
import { api } from "../api";
import { buildImg } from "../utils";
import { TeamMemberSkeleton } from "./Skeleton";
import ConnectionError from "./ConnectionError";

export default function TeamSection() {
  const [members, setMembers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAndShuffle = async () => {
    setLoading(true);
    setError(false);
    try {
      const [orgRes, coordRes] = await Promise.allSettled([
        api.get('/admin/organizers/public/list'),
        api.get('/admin/coordinators/public/list')
      ]);

      const extract = (res) => (res.status === 'fulfilled' && res.value?.data?.success) 
          ? res.value.data.data 
          : [];

      const allFetched = [...extract(orgRes), ...extract(coordRes)];

      if (allFetched.length === 0) throw new Error('No team members available');
      
      const shuffled = allFetched.sort(() => 0.5 - Math.random());
      setMembers(shuffled.slice(0, 5));
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndShuffle();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (members.length === 0 || loading || error) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % members.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [members, loading, error]);

  if (loading) return <TeamMemberSkeleton />;
  if (error) return (
    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10 flex items-center justify-center p-6">
      <ConnectionError onRetry={fetchAndShuffle} message="Unable to Load Team" />
    </div>
  );
  if (members.length === 0) return null;

  const current = members[currentIndex];
  const role = current.role || current.designation || current.department || "Team Member";

  return (
    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current._id || currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={buildImg(current.photo)}
            alt={current.name}
            className="w-full h-full object-cover"
            onError={(e) => e.currentTarget.src = "https://placehold.co/600x800/222/FFF?text=TEDx"}
          />
          {/* Gradient: Stronger at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-red-500 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-1"
            >
              {role}
            </motion.p>
            <motion.h3 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-3xl font-black text-white leading-none mb-3"
            >
              {current.name}
            </motion.h3>

            {current.linkedin && (
               <a href={current.linkedin} target="_blank" rel="noreferrer" className="inline-flex bg-white/10 p-2 rounded-full hover:bg-red-600 transition-colors text-white backdrop-blur-md">
                 <Linkedin size={16} />
               </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators - Top Right */}
      <div className="absolute top-4 right-4 flex gap-1.5 z-10">
        {members.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-red-600' : 'w-1.5 bg-white/40'}`} 
          />
        ))}
      </div>
    </div>
  );
}