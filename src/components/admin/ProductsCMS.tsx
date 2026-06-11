"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Check, X, Loader2 } from "lucide-react";
import { createProduct, updateProduct, deleteProduct } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "@/components/ui/toast";
import { AlertDialog } from "@/components/ui/alert-dialog";

interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  specs: string | null;
  price: number | string | { toString(): string } | null; // Decimal mapping from prisma
  imageUrl: string | null;
  inStock: boolean;
  createdAt: Date;
}

interface ProductsCMSProps {
  initialProducts: Product[];
}

export function ProductsCMS({ initialProducts }: ProductsCMSProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [specs, setSpecs] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [inStock, setInStock] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingProduct) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(generatedSlug);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setName("");
    setSlug("");
    setDescription("");
    setSpecs("");
    setPrice("");
    setImageUrl("");
    setInStock(true);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setSlug(product.slug);
    setDescription(product.description);
    setSpecs(product.specs || "");
    setPrice(product.price ? String(product.price) : "");
    setImageUrl(product.imageUrl || "");
    setInStock(product.inStock);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      setError("Lütfen zorunlu alanları doldurun.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      name,
      slug,
      description,
      specs: specs || null,
      price: price ? parseFloat(price) : null,
      imageUrl: imageUrl || null,
      inStock,
    };

    if (editingProduct) {
      const res = await updateProduct(editingProduct.id, payload);
      if (res.success && res.product) {
        setProducts(products.map((p) => (p.id === editingProduct.id ? (res.product as unknown as Product) : p)));
        toast.success("Ürün başarıyla güncellendi.");
        setIsModalOpen(false);
      } else {
        setError(res.error || "Güncelleme hatası.");
        toast.error(res.error || "Güncelleme hatası.");
      }
    } else {
      const res = await createProduct(payload);
      if (res.success && res.product) {
        setProducts([res.product as unknown as Product, ...products]);
        toast.success("Ürün başarıyla eklendi.");
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
    const res = await deleteProduct(deleteId);
    if (res.success) {
      setProducts(products.filter((p) => p.id !== deleteId));
      toast.success("Ürün başarıyla silindi.");
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
          <h1 className="text-2xl font-extrabold tracking-tight">Ürün Yönetimi</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Katalogda sergilenecek ürün listesini oluşturun ve güncelleyin.
          </p>
        </div>
        <Button onClick={openCreateModal} className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> Yeni Ürün Ekle
        </Button>
      </div>

      {/* Grid List */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="px-6 py-4">Ürün Adı</th>
                <th className="px-6 py-4">URL (Slug)</th>
                <th className="px-6 py-4">Fiyat</th>
                <th className="px-6 py-4">Stok Durumu</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    Henüz hiç ürün eklenmemiş.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
                    <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100 max-w-xs truncate">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{product.slug}</td>
                    <td className="px-6 py-4 text-zinc-900 dark:text-zinc-100 font-bold">
                      {product.price ? `${Number(product.price).toLocaleString("tr-TR")} TL` : "Belirtilmemiş"}
                    </td>
                    <td className="px-6 py-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400">
                          <Check className="w-3.5 h-3.5" /> Stokta Var
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400">
                          <X className="w-3.5 h-3.5" /> Tükendi
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(product)}
                        className="w-8 h-8 rounded-full text-zinc-600 hover:text-brand-primary"
                        aria-label="Düzenle"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => triggerDelete(product.id)}
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
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
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
                    Ürün Adı *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ör: Antistatik Solar Panel Temizleme Sıvısı"
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
                    placeholder="Boş bırakılırsa isimden otomatik oluşturulur"
                    className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    Fiyat (TL)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ör: 1250.00"
                    className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
                <div>
                  <ImageUpload value={imageUrl} onChange={setImageUrl} label="Görsel Yükle" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Ürün Açıklaması *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ürün hakkında detaylı açıklama..."
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary h-20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Teknik Özellikler (Alt alta girin)
                </label>
                <textarea
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  placeholder="Miktar: 5 Litre&#10;Kullanım Oranı: 1/50&#10;Renk: Şeffaf"
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary h-24"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 accent-brand-primary rounded"
                />
                <label htmlFor="inStock" className="text-sm font-semibold select-none cursor-pointer">
                  Stokta Var (Katalogda sipariş/teklif butonunu aktif eder)
                </label>
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
                  {editingProduct ? "Kaydet" : "Ekle"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        title="Ürünü Sil"
        description="Bu ürünü katalogdan silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sil"
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
