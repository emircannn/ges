"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Globe, EyeOff, Loader2 } from "lucide-react";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { toast } from "@/components/ui/toast";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: Date;
}

interface BlogCMSProps {
  initialPosts: BlogPost[];
}

export function BlogCMS({ initialPosts }: BlogCMSProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate slug automatically from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPost) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-") // replace spaces with hyphens
        .replace(/-+/g, "-"); // replace double hyphens
      setSlug(generatedSlug);
    }
  };

  const openCreateModal = () => {
    setEditingPost(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");
    setImageUrl("");
    setPublished(false);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setSummary(post.summary);
    setContent(post.content);
    setImageUrl(post.imageUrl || "");
    setPublished(post.published);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content) {
      setError("Lütfen zorunlu alanları doldurun.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      title,
      slug,
      summary,
      content,
      imageUrl: imageUrl || null,
      published,
    };

    if (editingPost) {
      const res = await updateBlogPost(editingPost.id, payload);
      if (res.success && res.post) {
        setPosts(posts.map((p) => (p.id === editingPost.id ? (res.post as BlogPost) : p)));
        toast.success("Blog yazısı başarıyla güncellendi.");
        setIsModalOpen(false);
      } else {
        setError(res.error || "Güncelleme hatası.");
        toast.error(res.error || "Güncelleme hatası.");
      }
    } else {
      const res = await createBlogPost(payload);
      if (res.success && res.post) {
        setPosts([res.post as BlogPost, ...posts]);
        toast.success("Blog yazısı başarıyla oluşturuldu.");
        setIsModalOpen(false);
      } else {
        setError(res.error || "Oluşturma hatası.");
        toast.error(res.error || "Oluşturma hatası.");
      }
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
    const res = await deleteBlogPost(deleteId);
    if (res.success) {
      setPosts(posts.filter((p) => p.id !== deleteId));
      toast.success("Blog yazısı başarıyla silindi.");
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
          <h1 className="text-2xl font-extrabold tracking-tight">Blog Yönetimi</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Platformdaki blog yazılarını ekleyin, düzenleyin veya silin.
          </p>
        </div>
        <Button onClick={openCreateModal} className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> Yeni Yazı Ekle
        </Button>
      </div>

      {/* Grid List */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="px-6 py-4">Başlık</th>
                <th className="px-6 py-4">URL (Slug)</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4">Yayınlanma Tarihi</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    Henüz hiç blog yazısı eklenmemiş.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
                    <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{post.slug}</td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
                          <Globe className="w-3.5 h-3.5" /> Yayında
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          <EyeOff className="w-3.5 h-3.5" /> Taslak
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(post)}
                        className="w-8 h-8 rounded-full text-zinc-600 hover:text-brand-primary"
                        aria-label="Düzenle"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => triggerDelete(post.id)}
                        className="w-8 h-8 rounded-full text-zinc-600 hover:text-rose-600"
                        aria-label="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingPost ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı Oluştur"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                Kapat
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Yazı başlığını girin"
                    className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    URL Adresi (Slug)
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Boş bırakılırsa başlıktan otomatik oluşturulur"
                    className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Özet / Açıklama *
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Yazı hakkında kısa özet..."
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary h-20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  İçerik *
                </label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Blog içeriğini buraya yazın..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <ImageUpload value={imageUrl} onChange={setImageUrl} label="Görsel Yükle" />
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <input
                    type="checkbox"
                    id="published"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 accent-brand-primary rounded"
                  />
                  <label htmlFor="published" className="text-sm font-semibold select-none cursor-pointer">
                    Hemen Yayına Al
                  </label>
                </div>
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
                  {editingPost ? "Kaydet" : "Oluştur"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        title="Blog Yazısını Sil"
        description="Bu blog yazısını silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sil"
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
