import React from "react";
import type { Metadata } from "next";
import { getGalleryItems } from "@/app/actions";
import { GalleryView } from "@/components/client/GalleryView";
import { Sparkles, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Medya Galerisi | NivaArt Kurumsal Platformu",
  description: "Çatı ve arazi güneş enerji santrallerinde yürüttüğümüz panel yıkama ve robotik temizleme saha operasyonlarımız.",
};

export const dynamic = "force-dynamic";

export default async function GaleriPage() {
  const items = await getGalleryItems();

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Page Header */}
      <section className="relative pt-16 pb-20 bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200/50 dark:border-zinc-900/50 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-brand-primary/5 blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-brand-secondary" />
            <span>Medya Arşivi</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Medya Galerisi</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-sm sm:text-base">
            Sahada yürüttüğümüz güneş paneli temizleme, robotik yıkama ve bakım faaliyetlerimizden kesitler.
          </p>
        </div>
      </section>

      {/* Gallery Showcase Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto space-y-4 p-8">
            <ImageIcon className="w-12 h-12 text-zinc-400 mx-auto stroke-1" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Galeri İçeriği Bulunmuyor</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Saha operasyonlarımızdan ve referans projelerimizden fotoğraflar yakında burada sergilenecektir.
            </p>
          </div>
        ) : (
          <GalleryView initialItems={items} />
        )}
      </section>
    </main>
  );
}
