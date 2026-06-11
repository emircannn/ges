"use client";

import React, { useState } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, Video, Play } from "lucide-react";
import { createGalleryItem, deleteGalleryItem } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/toast";
import { AlertDialog } from "@/components/ui/alert-dialog";

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

interface GalleryCMSProps {
  initialItems: GalleryItem[];
}

// Extract YouTube ID helper
function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Get YouTube Embed URL
function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

// Get YouTube Thumbnail Image
function getYouTubeThumbnail(url: string | null): string {
  const videoId = getYouTubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : "/next.svg";
}

export function GalleryCMS({ initialItems }: GalleryCMSProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [mediaType, setMediaType] = useState("IMAGE");
  const [sortOrder, setSortOrder] = useState("0");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreateModal = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setVideoUrl("");
    setMediaType("IMAGE");
    setSortOrder("0");
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError("Lütfen başlığı girin.");
      return;
    }
    if (mediaType === "IMAGE" && !imageUrl) {
      setError("Lütfen görsel yükleyin.");
      return;
    }
    if (mediaType === "VIDEO" && !videoUrl) {
      setError("Lütfen YouTube video bağlantısını girin.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formattedVideoUrl = mediaType === "VIDEO" ? getYouTubeEmbedUrl(videoUrl) : null;

    const payload = {
      title,
      description: description || null,
      imageUrl: mediaType === "IMAGE" ? imageUrl : null,
      videoUrl: formattedVideoUrl,
      mediaType,
      sortOrder: parseInt(sortOrder) || 0,
    };

    const res = await createGalleryItem(payload);
    if (res.success && res.item) {
      setItems([...items, res.item as GalleryItem].sort((a, b) => a.sortOrder - b.sortOrder));
      toast.success("Galeri öğesi başarıyla eklendi.");
      setIsModalOpen(false);
    } else {
      setError(res.error || "Öğe eklenirken hata.");
      toast.error(res.error || "Öğe eklenirken hata.");
    }
    setIsLoading(false);
  };

  const triggerDelete = (id: number) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    setIsLoading(true);
    const res = await deleteGalleryItem(deleteId);
    if (res.success) {
      setItems(items.filter((i) => i.id !== deleteId));
      toast.success("Galeri öğesi başarıyla silindi.");
    } else {
      toast.error(res.error || "Silme hatası oluştu.");
    }
    setIsLoading(false);
    setIsDeleteOpen(false);
    setDeleteId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Galeri Yönetimi</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Müşterilere sunulacak tamamlanmış projelerin görsellerini ve videolarını yönetin.
          </p>
        </div>
        <Button onClick={openCreateModal} className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> Galeriye Ekle
        </Button>
      </div>

      {/* Grid of items */}
      {items.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center text-zinc-500">
          Galeride henüz hiç öğe bulunmuyor.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => {
            const previewUrl = item.mediaType === "VIDEO" 
              ? getYouTubeThumbnail(item.videoUrl) 
              : item.imageUrl;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col justify-between"
              >
                {/* Media Preview container */}
                <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-zinc-400" />
                  )}

                  {/* Video Play Overlay */}
                  {item.mediaType === "VIDEO" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                      </span>
                    </div>
                  )}

                  {/* Media Type badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white flex items-center gap-1 backdrop-blur-sm">
                    {item.mediaType === "VIDEO" ? (
                      <>
                        <Video className="w-3 h-3 text-red-500" /> Video
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3 text-brand-secondary" /> Fotoğraf
                      </>
                    )}
                  </span>

                  {/* Sort Order badge */}
                  <span className="absolute top-3 right-3 px-2 py-1 rounded-md text-[10px] font-mono bg-brand-primary text-white font-bold">
                    Sıra: {item.sortOrder}
                  </span>
                </div>

                {/* Text Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-zinc-950 dark:text-zinc-55 leading-snug">{item.title}</h3>
                    {item.description && (
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => triggerDelete(item.id)}
                      className="w-8 h-8 rounded-full text-zinc-500 hover:text-rose-600"
                      aria-label="Sil"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">Galeriye Yeni Öğe Ekle</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-650"
              >
                Kapat
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ör: Çatı Tipi Panel Temizliği"
                    className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Medya Tipi
                </label>
                <select
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                >
                  <option value="IMAGE">Fotoğraf</option>
                  <option value="VIDEO">Video (YouTube)</option>
                </select>
              </div>

              {/* Show ImageUpload only for IMAGE, show YouTube link input for VIDEO */}
              {mediaType === "IMAGE" ? (
                <div>
                  <ImageUpload value={imageUrl} onChange={setImageUrl} label="Görsel Yükle *" />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    YouTube Video Bağlantısı *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 pointer-events-none">
                      <Play className="w-4 h-4 text-red-500" />
                    </span>
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="w-full pl-9 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required={mediaType === "VIDEO"}
                    />
                  </div>
                  <span className="block text-[10px] text-zinc-400 mt-1">
                    YouTube izleme bağlantısı veya paylaşım linki girebilirsiniz.
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Kısa Açıklama
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Görsele ait kısa detaylar..."
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary h-20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Sıralama (Sıra)
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  placeholder="0"
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-zinc-200 text-sm font-bold"
                  disabled={isLoading}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Ekle
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        title="Görseli Sil"
        description="Bu görseli galeriden kaldırmak istediğinize emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sil"
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
export default GalleryCMS;
