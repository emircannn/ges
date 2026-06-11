import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-50/70 dark:bg-zinc-950/70 backdrop-blur-md transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        {/* Glowing aura background */}
        <div className="absolute w-24 h-24 rounded-full bg-brand-primary/15 dark:bg-brand-primary/10 blur-xl animate-pulse" />

        {/* Concentric Circle Loader */}
        {/* Outer Ring (Primary Blue) */}
        <div className="w-16 h-16 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />

        {/* Inner Ring (Secondary Green - spins counter-clockwise and faster) */}
        <div className="absolute w-10 h-10 rounded-full border-2 border-brand-secondary border-b-transparent animate-spin [animation-direction:reverse] [animation-duration:0.6s]" />

        {/* Center glowing node */}
        <div className="absolute w-3.5 h-3.5 rounded-full bg-brand-secondary shadow-md shadow-brand-secondary/50 animate-ping" />
      </div>

      {/* Loading Branding Text */}
      <div className="mt-6 flex flex-col items-center gap-1 animate-pulse">
        <span className="text-sm font-bold uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
          NivaArt
        </span>
        <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider">
          Yükleniyor...
        </span>
      </div>
    </div>
  );
}
