import React, { useState, useEffect } from "react";

export default function RotatingText() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const words = ["Of", "By", "For"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Rotate every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <h2 className="heading-section mb-4">
        <div className="block text-center lg:text-left">
          {/* Line 1: Rotating word with red bg + "the Students" */}
          <div className="inline-flex items-center gap-2">
            {/* Rotating word container - dynamic width */}
            <div className="relative inline-flex h-[1.2em] overflow-hidden rounded-lg bg-red-600">
              <div
                className="flex flex-col transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateY(-${activeIndex * 100}%)`,
                }}
              >
                {words.map((word, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center px-3 py-1 text-white font-bold whitespace-nowrap h-[1.2em]"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>

            {/* "the Students" - normal text */}
            <span className="text-white font-bold text-3xl sm:text-4xl md:text-5xl">
              the
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 font-bold text-3xl sm:text-4xl md:text-5xl">
              Students.
            </span>
          </div>
        </div>
      </h2>
    </div>
  );
}
