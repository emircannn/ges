"use client";

import React from "react";
import { Button } from "./button";

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function AlertDialog({
  isOpen,
  title,
  description,
  cancelText = "İptal",
  confirmText = "Onayla",
  onCancel,
  onConfirm,
  isLoading = false,
}: AlertDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{title}</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-xl font-bold cursor-pointer"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer px-5"
          >
            {isLoading ? "İşlem yapılıyor..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
