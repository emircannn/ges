import React from "react";

export default function GalleryLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* 1. HEADER SKELETON */}
      <section className="relative pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200/50 dark:border-zinc-900/50 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="w-24 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 mx-auto animate-pulse" />
          <div className="w-64 h-10 rounded-2xl bg-zinc-200 dark:bg-zinc-800 mx-auto animate-pulse" />
          <div className="w-96 max-w-full h-4 rounded-xl bg-zinc-200 dark:bg-zinc-800 mx-auto animate-pulse" />
        </div>
      </section>

      {/* 2. GRID SKELETON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="flex justify-center gap-2 mb-10">
          <div className="w-20 h-10 rounded-full bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
          <div className="w-24 h-10 rounded-full bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
          <div className="w-24 h-10 rounded-full bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="aspect-[4/3] w-full rounded-[2rem] bg-zinc-200 dark:bg-zinc-850 animate-pulse border border-zinc-200/60 dark:border-zinc-800"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
