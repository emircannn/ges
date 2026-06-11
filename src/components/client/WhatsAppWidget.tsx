"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppWidgetProps {
  phone: string | null | undefined;
}

export function WhatsAppWidget({ phone }: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!phone) return null;

  // Clean phone number for WhatsApp link (digits only)
  const cleanedNumber = phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanedNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      {/* Welcome Card */}
      {isOpen && (
        <div className="w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-5 animate-fade-in-up transition-all duration-300">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.76 4.19 2.04 5.79L3 22l4.35-1.07C8.83 21.57 10.37 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm3.3 14.5c-.22.61-1.28 1.14-1.77 1.22-.44.08-.87.12-2.73-.64-2.38-.97-3.92-3.38-4.04-3.54-.12-.16-1-1.33-1-2.54 0-1.21.61-1.81.85-2.05.24-.24.53-.3.7-.3.17 0 .34.01.49.01.16 0 .37-.06.58.45.22.53.75 1.83.82 1.97.07.15.12.32.02.5-.1.18-.15.3-.3.47-.15.17-.3.39-.43.52-.15.15-.3.32-.13.61.17.29.76 1.25 1.63 2.03.75.67 1.38.88 1.58.97.2.1.32.07.44-.06.12-.13.52-.6.66-.81.14-.2.28-.17.47-.1.19.07 1.22.58 1.43.68.21.1.35.15.4.24.05.09.05.52-.17 1.13z" />
                </svg>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white dark:border-zinc-900 rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">NivaArt Destek</h4>
                <p className="text-[10px] font-semibold text-emerald-500 dark:text-emerald-400">Çevrimiçi</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
              Merhaba! Size nasıl yardımcı olabiliriz? Sorularınızı yanıtlamak için hazırız.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.76 4.19 2.04 5.79L3 22l4.35-1.07C8.83 21.57 10.37 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm3.3 14.5c-.22.61-1.28 1.14-1.77 1.22-.44.08-.87.12-2.73-.64-2.38-.97-3.92-3.38-4.04-3.54-.12-.16-1-1.33-1-2.54 0-1.21.61-1.81.85-2.05.24-.24.53-.3.7-.3.17 0 .34.01.49.01.16 0 .37-.06.58.45.22.53.75 1.83.82 1.97.07.15.12.32.02.5-.1.18-.15.3-.3.47-.15.17-.3.39-.43.52-.15.15-.3.32-.13.61.17.29.76 1.25 1.63 2.03.75.67 1.38.88 1.58.97.2.1.32.07.44-.06.12-.13.52-.6.66-.81.14-.2.28-.17.47-.1.19.07 1.22.58 1.43.68.21.1.35.15.4.24.05.09.05.52-.17 1.13z" />
              </svg>
              <span>Sohbete Başla</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-xl shadow-emerald-500/20 transition-all duration-200 cursor-pointer relative"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
}
