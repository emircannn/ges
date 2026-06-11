"use client";

import React, { useState, useEffect } from "react";
import { 
  Play, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Eye
} from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  mediaType: string;
  sortOrder: number;
  createdAt: Date;
}

interface GalleryViewProps {
  initialItems: GalleryItem[];
}

type FilterType = "ALL" | "IMAGE" | "VIDEO";

// Extract YouTube ID helper
function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Get YouTube Thumbnail Image
function getYouTubeThumbnail(url: string | null): string {
  const videoId = getYouTubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : "/next.svg";
}

export function GalleryView({ initialItems }: GalleryViewProps) {
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = initialItems.filter((item) => {
    if (filter === "ALL") return true;
    return item.mediaType === filter;
  });

  const handleOpenLightbox = (id: number) => {
    const idx = filteredItems.findIndex((item) => item.id === id);
    if (idx !== -1) {
      setActiveItemIndex(idx);
    }
  };

  const handleCloseLightbox = () => {
    setActiveItemIndex(null);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeItemIndex !== null && filteredItems.length > 1) {
      setActiveItemIndex((activeItemIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeItemIndex !== null && filteredItems.length > 1) {
      setActiveItemIndex((activeItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard navigation hook for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      
      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItemIndex, filteredItems.length]);

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* 1. FILTER TABS */}
      <div className="flex justify-center gap-2.5">
        {(["ALL", "IMAGE", "VIDEO"] as const).map((type) => {
          let label = "Tümü";
          if (type === "IMAGE") label = "Görseller";
          if (type === "VIDEO") label = "Videolar";

          const isActive = filter === type;
          return (
            <button
              key={type}
              onClick={() => {
                setFilter(type);
                setActiveItemIndex(null);
              }}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                  : "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-400 hover:text-brand-primary hover:bg-zinc-100 dark:hover:bg-zinc-850"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 2. GRID SHOWCASE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => {
          const previewUrl = item.mediaType === "VIDEO"
            ? getYouTubeThumbnail(item.videoUrl)
            : (item.imageUrl || "/next.svg");

          return (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleOpenLightbox(item.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${item.title} detayını gör`}
              className="group relative aspect-[4/3] rounded-[2rem] bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-primary/40 dark:hover:border-brand-primary/40 transition-all duration-500 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-zinc-950 animate-pulse bg-zinc-200 dark:bg-zinc-800"
            >
              {/* Image Thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt={item.title}
                onLoad={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).classList.remove("animate-pulse", "bg-zinc-200", "dark:bg-zinc-800");
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Video Play Overlay */}
              {item.mediaType === "VIDEO" && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/20 group-hover:bg-zinc-950/35 transition-colors duration-300 z-10">
                  <span className="w-14 h-14 rounded-full bg-brand-primary/95 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </span>
                </div>
              )}

              {/* Hover details overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20 text-white">
                <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 mb-3 ml-auto">
                  <Eye className="w-4.5 h-4.5" />
                </span>
                <h4 className="font-extrabold text-sm sm:text-base leading-tight">{item.title}</h4>
                {item.description && (
                  <p className="text-zinc-300 text-xs mt-1.5 line-clamp-2 leading-relaxed font-medium">{item.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. LIGHTBOX MODAL */}
      {activeItem && (
        <div
          onClick={handleCloseLightbox}
          className="fixed inset-0 z-100 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md p-4 animate-in fade-in duration-300 cursor-default"
        >
          {/* Close Button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer z-110 shadow-lg"
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          {filteredItems.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/5 flex items-center justify-center transition-colors cursor-pointer z-110 shadow-lg"
              aria-label="Önceki"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Lightbox Content Wrap */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center gap-4 relative animate-in zoom-in-95 duration-200"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center shadow-2xl">
              {activeItem.mediaType === "VIDEO" && activeItem.videoUrl ? (
                <iframe
                  src={activeItem.videoUrl}
                  title={activeItem.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeItem.imageUrl || "/next.svg"}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Media details info */}
            <div className="text-center text-white max-w-xl space-y-1.5 select-none">
              <h3 className="text-lg sm:text-xl font-extrabold">{activeItem.title}</h3>
              {activeItem.description && (
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium">{activeItem.description}</p>
              )}
            </div>
          </div>

          {/* Right Arrow */}
          {filteredItems.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-white border border-white/5 flex items-center justify-center transition-colors cursor-pointer z-110 shadow-lg"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default GalleryView;
