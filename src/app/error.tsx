"use client";

import React, { useEffect } from "react";
import { AlertOctagon, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application runtime error caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-foreground p-6 overflow-hidden relative transition-colors duration-300">
      {/* Background glowing lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-rose-500/5 blur-[120px] dark:bg-rose-500/5 animate-pulse" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xl animate-fade-in-up">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <span className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 flex items-center justify-center animate-bounce">
            <AlertOctagon className="w-6 h-6" />
          </span>
        </div>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            Bir Hata Oluştu
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
            Sistemde beklenmeyen bir hata meydana geldi. Sayfayı tekrar yüklemeyi deneyebilir veya ana sayfaya geri dönebilirsiniz.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pt-2">
              Hata Kodu: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm shadow-md shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Yeniden Dene</span>
          </Button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-150 dark:hover:bg-zinc-800 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer bg-white/5 text-zinc-700 dark:text-zinc-300"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
