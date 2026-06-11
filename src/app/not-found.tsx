import React from "react";
import Link from "next/link";
import { Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-foreground p-6 overflow-hidden relative transition-colors duration-300">
      {/* Decorative gradient glowing spots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[130px] dark:bg-brand-primary/5 animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-brand-secondary/15 blur-[130px] dark:bg-brand-secondary/5" />
      </div>

      <div className="max-w-md w-full text-center space-y-8 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xl animate-fade-in-up">
        {/* Brand/Sparkles */}
        <div className="flex justify-center">
          <span className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center animate-bounce">
            <Sparkles className="w-6 h-6 text-brand-secondary" />
          </span>
        </div>

        {/* 404 Header */}
        <div className="space-y-2">
          <h1 className="text-7xl sm:text-8xl font-black tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent drop-shadow-sm">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
            Sayfa Bulunamadı
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
            Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı bırakılmış olabilir.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm shadow-md shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
