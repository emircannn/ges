"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

type Listener = (toasts: ToastItem[]) => void;
let listeners: Listener[] = [];
let toasts: ToastItem[] = [];

export const toast = {
  success: (message: string, duration = 3000) => show(message, "success", duration),
  error: (message: string, duration = 4000) => show(message, "error", duration),
  info: (message: string, duration = 3000) => show(message, "info", duration),
};

function show(message: string, type: ToastType, duration: number) {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: ToastItem = { id, message, type, duration };
  toasts = [...toasts, newToast];
  listeners.forEach((listener) => listener(toasts));

  if (duration > 0) {
    setTimeout(() => {
      dismiss(id);
    }, duration);
  }
}

function dismiss(id: string) {
  toasts = toasts.filter((t) => t.id !== id);
  listeners.forEach((listener) => listener(toasts));
}

export function Toaster() {
  const [activeToasts, setActiveToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleUpdate = (updated: ToastItem[]) => {
      setActiveToasts(updated);
    };
    listeners.push(handleUpdate);
    return () => {
      listeners = listeners.filter((l) => l !== handleUpdate);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-md w-full pointer-events-none p-4">
      {activeToasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-lg animate-in slide-in-from-bottom-5 duration-200 ${
            t.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/90 border-emerald-250/50 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-350"
              : t.type === "error"
              ? "bg-rose-50 dark:bg-rose-950/90 border-rose-250/50 dark:border-rose-900/50 text-rose-800 dark:text-rose-350"
              : "bg-zinc-50 dark:bg-zinc-900/90 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-450 shrink-0" />}
            {t.type === "error" && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-450 shrink-0" />}
            {t.type === "info" && <Info className="w-5 h-5 text-zinc-650 dark:text-zinc-400 shrink-0" />}
            <span className="text-sm font-semibold leading-relaxed">{t.message}</span>
          </div>
          <button
            onClick={() => dismiss(t.id)}
            className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 cursor-pointer p-0.5"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
