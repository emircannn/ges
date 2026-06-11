"use client";

import React, { useState } from "react";
import { X, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu en fazla 5MB olabilir.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || "Yükleme başarısız oldu.");
      }
    } catch (err) {
      console.error(err);
      setError("Sunucuya bağlanırken bir hata oluştu.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    onChange("");
    setError(null);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-wider">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative aspect-video max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={handleRemove}
              className="w-10 h-10 rounded-full cursor-pointer"
              aria-label="Resmi Kaldır"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-brand-primary dark:hover:border-brand-primary rounded-2xl p-6 text-center transition-colors bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-2 max-w-sm">
          {isUploading ? (
            <div className="py-4 flex flex-col items-center gap-2 select-none">
              <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
              <p className="text-xs text-zinc-500">Görsel yükleniyor...</p>
            </div>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-zinc-400" />
              <div className="text-xs text-zinc-500">
                <span className="font-bold text-brand-primary hover:underline cursor-pointer">
                  Dosya yükleyin
                </span>{" "}
                veya sürükleyip bırakın
              </div>
              <p className="text-[10px] text-zinc-400">PNG, JPG, JPEG veya WEBP (Maks. 5MB)</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-rose-600 dark:text-rose-450 font-semibold">{error}</p>}
    </div>
  );
}
export default ImageUpload;
