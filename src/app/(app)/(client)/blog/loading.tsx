import React from "react";

export default function BlogLoading() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 rounded-[2rem] overflow-hidden shadow-sm flex flex-col space-y-5 p-5"
            >
              {/* Image box */}
              <div className="aspect-[16/10] w-full rounded-2xl bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
              
              {/* Text lines */}
              <div className="space-y-3 p-2 flex-1">
                <div className="w-1/3 h-3.5 rounded-lg bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
                <div className="w-full h-5 rounded-xl bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
                <div className="w-5/6 h-5 rounded-xl bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
                <div className="space-y-1.5 pt-2">
                  <div className="w-full h-3 rounded bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
                  <div className="w-4/5 h-3 rounded bg-zinc-200 dark:bg-zinc-850 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
