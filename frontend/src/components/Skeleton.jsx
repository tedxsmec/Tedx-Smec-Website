import React from "react";

// Generic Skeleton Loader
export const Skeleton = ({ className = "", variant = "default" }) => {
  const baseClass = "animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-[length:200%_100%] rounded";
  
  const variants = {
    default: "h-4 w-full",
    text: "h-4 w-3/4",
    title: "h-8 w-2/3",
    circle: "rounded-full",
    card: "h-64 w-full rounded-2xl",
  };

  return (
    <div 
      className={`${baseClass} ${variants[variant] || variants.default} ${className}`}
      style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
    />
  );
};

// Speaker Card Skeleton
export const SpeakerCardSkeleton = () => (
  <div className="h-[360px] sm:h-[420px] md:h-[460px] min-w-[240px] sm:min-w-[280px] md:min-w-[360px] lg:min-w-[380px] rounded-[1.75rem] sm:rounded-[2.25rem] bg-neutral-900 border border-white/10 overflow-hidden flex-shrink-0">
    <div className="h-2/3 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 animate-pulse" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

// Event Card Skeleton
export const EventCardSkeleton = () => (
  <div className="rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-6 space-y-4">
      <div className="flex gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
      <Skeleton className="h-8 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

// Gallery Item Skeleton
export const GalleryItemSkeleton = () => (
  <div className="group relative overflow-hidden rounded-xl aspect-[4/3]">
    <Skeleton className="h-full w-full rounded-xl" />
  </div>
);

// Sponsor Logo Skeleton
export const SponsorLogoSkeleton = () => (
  <div className="flex items-center justify-center p-8">
    <Skeleton className="h-16 w-32" />
  </div>
);

// Team Member Skeleton
export const TeamMemberSkeleton = () => (
  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10">
    <Skeleton className="h-full w-full rounded-xl" />
    <div className="absolute bottom-0 left-0 p-6 w-full space-y-2">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

// Grid Skeleton (for multiple items)
export const SkeletonGrid = ({ count = 3, ItemComponent = Skeleton, className = "" }) => (
  <div className={className}>
    {Array.from({ length: count }).map((_, i) => (
      <ItemComponent key={i} />
    ))}
  </div>
);
