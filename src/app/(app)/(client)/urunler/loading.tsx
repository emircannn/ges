import React from "react";

export default function ProductsLoading() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-850 rounded-[2rem] overflow-hidden shadow-sm flex flex-col space-y-5 p-5 animate-pulse"
            >
              {/* Image Box */}
              <div className="aspect-[4/3] w-full rounded-2xl bg-zinc-200 dark:bg-zinc-850" />
              
              {/* Text Blocks */}
              <div className="space-y-4 p-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-2/3 h-5 rounded-xl bg-zinc-200 dark:bg-zinc-850" />
                  <div className="w-full h-4 rounded bg-zinc-200 dark:bg-zinc-850" />
                  <div className="w-5/6 h-4 rounded bg-zinc-200 dark:bg-zinc-850" />
                </div>
                <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                  <div className="flex justify-between">
                    <div className="w-10 h-3 rounded bg-zinc-200 dark:bg-zinc-850" />
                    <div className="w-24 h-5 rounded bg-zinc-200 dark:bg-zinc-850" />
                  </div>
                  <div className="w-full h-10 rounded-xl bg-zinc-200 dark:bg-zinc-850" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
