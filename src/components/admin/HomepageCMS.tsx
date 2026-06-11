"use client";

import React, { useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";
import { updateHomepageContent } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/toast";

interface HomepageCMSProps {
  initialContent: Record<string, string>;
}

export function HomepageCMS({ initialContent }: HomepageCMSProps) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const [successKey, setSuccessKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (key: string, value: string) => {
    setIsLoading(true);
    setError(null);
    setSuccessKey(null);

    const res = await updateHomepageContent(key, value);
    if (res.success) {
      setContent({ ...content, [key]: value });
      setSuccessKey(key);
      toast.success("İçerik başarıyla güncellendi.");
      setTimeout(() => setSuccessKey(null), 3000); // Reset success after 3s
    } else {
      setError(res.error || "İçerik güncellenirken hata oluştu.");
      toast.error(res.error || "İçerik güncellenirken hata oluştu.");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Anasayfa İçerik Yönetimi</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Ziyaretçilerin gördüğü statik metinleri ve başlıkları dinamik olarak güncelleyin.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Section: Hero Section */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold border-b border-zinc-100 dark:border-zinc-800 pb-3">
            Giriş (Hero) Alanı
          </h3>

          {/* Hero Title */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Hero Ana Başlık
              </label>
              {successKey === "hero_title" && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Başarıyla kaydedildi
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                defaultValue={content.hero_title || ""}
                id="hero_title_input"
                className="flex-1 p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              />
              <Button
                onClick={() => {
                  const input = document.getElementById("hero_title_input") as HTMLInputElement;
                  if (input) handleUpdate("hero_title", input.value);
                }}
                disabled={isLoading}
                className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold px-4 flex items-center gap-2 shrink-0"
              >
                {isLoading && successKey === null ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4.5 h-4.5" />}
                Kaydet
              </Button>
            </div>
          </div>

          {/* Hero Subtitle */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Hero Alt Başlık (Açıklama)
              </label>
              {successKey === "hero_subtitle" && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Başarıyla kaydedildi
                </span>
              )}
            </div>
            <div className="flex gap-4">
              <textarea
                defaultValue={content.hero_subtitle || ""}
                id="hero_subtitle_input"
                className="flex-1 p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary h-20 resize-none"
              />
              <Button
                onClick={() => {
                  const input = document.getElementById("hero_subtitle_input") as HTMLTextAreaElement;
                  if (input) handleUpdate("hero_subtitle", input.value);
                }}
                disabled={isLoading}
                className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold px-4 flex items-center gap-2 self-end shrink-0"
              >
                {isLoading && successKey === null ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4.5 h-4.5" />}
                Kaydet
              </Button>
            </div>
          </div>

          {/* Hero Background Image */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Hero Arka Plan Görseli
              </label>
              {successKey === "hero_image_url" && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Başarıyla kaydedildi
                </span>
              )}
            </div>
            <div className="flex flex-col gap-4 p-4 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl">
              <ImageUpload
                value={content.hero_image_url || ""}
                onChange={(url) => handleUpdate("hero_image_url", url)}
              />
            </div>
          </div>
        </div>

        {/* Section: About Section */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold border-b border-zinc-100 dark:border-zinc-800 pb-3">
            Hakkımızda Tanıtım Metni
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                Hakkımızda Detay Yazısı
              </label>
              {successKey === "about_text" && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Başarıyla kaydedildi
                </span>
              )}
            </div>
            <div className="flex gap-4 items-end">
              <textarea
                defaultValue={content.about_text || ""}
                id="about_text_input"
                className="flex-1 p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary h-40"
              />
              <Button
                onClick={() => {
                  const input = document.getElementById("about_text_input") as HTMLTextAreaElement;
                  if (input) handleUpdate("about_text", input.value);
                }}
                disabled={isLoading}
                className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold px-4 flex items-center gap-2 shrink-0 mb-0.5"
              >
                {isLoading && successKey === null ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4.5 h-4.5" />}
                Kaydet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
