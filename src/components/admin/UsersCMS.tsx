"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Shield, User, Loader2 } from "lucide-react";
import { createStaffUser, updateStaffUser, deleteStaffUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";

interface UserItem {
  id: number;
  email: string;
  role: string;
  manageBlogs: boolean;
  manageProducts: boolean;
  manageGallery: boolean;
  manageMessages: boolean;
  manageSettings: boolean;
  createdAt: Date;
}

interface UsersCMSProps {
  initialUsers: UserItem[];
}

export function UsersCMS({ initialUsers }: UsersCMSProps) {
  const { data: session } = useSession();
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states (Add/Edit User)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STAFF");
  const [manageBlogs, setManageBlogs] = useState(false);
  const [manageProducts, setManageProducts] = useState(false);
  const [manageGallery, setManageGallery] = useState(false);
  const [manageMessages, setManageMessages] = useState(false);
  const [manageSettings, setManageSettings] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreateModal = () => {
    setEditingUser(null);
    setEmail("");
    setPassword("");
    setRole("STAFF");
    setManageBlogs(false);
    setManageProducts(false);
    setManageGallery(false);
    setManageMessages(false);
    setManageSettings(false);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserItem) => {
    setEditingUser(user);
    setEmail(user.email);
    setPassword("");
    setRole(user.role);
    setManageBlogs(user.manageBlogs);
    setManageProducts(user.manageProducts);
    setManageGallery(user.manageGallery);
    setManageMessages(user.manageMessages);
    setManageSettings(user.manageSettings);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Lütfen e-posta adresini girin.");
      return;
    }
    if (!editingUser && !password) {
      setError("Lütfen yeni kullanıcı için şifre girin.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const payload = {
      email,
      role,
      manageBlogs,
      manageProducts,
      manageGallery,
      manageMessages,
      manageSettings,
    };

    if (editingUser) {
      const res = await updateStaffUser(editingUser.id, {
        ...payload,
        password: password || undefined,
      });

      if (res.success && res.user) {
        setUsers(users.map((u) => (u.id === editingUser.id ? (res.user as UserItem) : u)));
        toast.success("Kullanıcı başarıyla güncellendi.");
        setIsModalOpen(false);
      } else {
        setError(res.error || "Güncelleme hatası.");
        toast.error(res.error || "Güncelleme hatası.");
      }
    } else {
      const res = await createStaffUser({
        ...payload,
        passwordHash: password,
      });

      if (res.success && res.user) {
        setUsers([res.user as UserItem, ...users]);
        toast.success("Yeni kullanıcı başarıyla oluşturuldu.");
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
    const res = await deleteStaffUser(deleteId);
    if (res.success) {
      setUsers(users.filter((u) => u.id !== deleteId));
      toast.success("Kullanıcı başarıyla silindi.");
    } else {
      toast.error(res.error || "Silme hatası oluştu.");
    }
    setIsLoading(false);
    setIsDeleteOpen(false);
    setDeleteId(null);
  };



  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Kullanıcı & Yetki Yönetimi</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Sistemdeki yöneticileri ve çalışan yetkilendirmelerini kontrol edin.
          </p>
        </div>
        <Button onClick={openCreateModal} className="bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold flex items-center gap-2 self-start sm:self-center">
          <Plus className="w-5 h-5" /> Yeni Kullanıcı Ekle
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="px-6 py-4">Kullanıcı (E-posta)</th>
                <th className="px-6 py-4">Rol</th>
                <th className="px-6 py-4">İzinler</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              {users.map((userItem) => (
                <tr key={userItem.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20">
                  <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                    {userItem.email}
                  </td>
                  <td className="px-6 py-4">
                    {userItem.role === "ADMIN" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-900/40">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        <User className="w-3 h-3" /> Çalışan (Staff)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {userItem.role === "ADMIN" ? (
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-bold">Tüm İzinler Açık</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {userItem.manageBlogs && <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">Blog</span>}
                        {userItem.manageProducts && <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">Ürünler</span>}
                        {userItem.manageGallery && <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">Galeri</span>}
                        {userItem.manageMessages && <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">Mesajlar</span>}
                        {userItem.manageSettings && <span className="text-[10px] px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">Ayarlar</span>}
                        {!userItem.manageBlogs && !userItem.manageProducts && !userItem.manageGallery && !userItem.manageMessages && !userItem.manageSettings && (
                          <span className="text-xs text-zinc-400 italic">Yetki verilmemiş</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditModal(userItem)}
                      className="w-8 h-8 rounded-full text-zinc-600 hover:text-brand-primary"
                      aria-label="Düzenle"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => triggerDelete(userItem.id)}
                      disabled={session?.user?.email === userItem.email}
                      className="w-8 h-8 rounded-full text-zinc-600 hover:text-rose-600 disabled:opacity-30"
                      aria-label="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal (Add/Edit User) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingUser ? "Kullanıcıyı Düzenle" : "Yeni Kullanıcı Ekle"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">
                Kapat
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  E-posta Adresi *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@nivaart.com"
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Şifre {editingUser ? "(Değiştirmek istemiyorsanız boş bırakın)" : "*"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifre"
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  required={!editingUser}
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Rol
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                >
                  <option value="STAFF">Çalışan (Staff)</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              {/* Toggles (Only show toggles if role is STAFF) */}
              {role === "STAFF" && (
                <div className="space-y-3 pt-2 border-t border-zinc-150 dark:border-zinc-800">
                  <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Yetkilendirmeler</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={manageBlogs}
                        onChange={(e) => setManageBlogs(e.target.checked)}
                        className="w-4 h-4 accent-brand-primary rounded"
                      />
                      <span>Blog Yönetimi</span>
                    </label>

                    <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={manageProducts}
                        onChange={(e) => setManageProducts(e.target.checked)}
                        className="w-4 h-4 accent-brand-primary rounded"
                      />
                      <span>Ürün Yönetimi</span>
                    </label>

                    <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={manageGallery}
                        onChange={(e) => setManageGallery(e.target.checked)}
                        className="w-4 h-4 accent-brand-primary rounded"
                      />
                      <span>Galeri Yönetimi</span>
                    </label>

                    <label className="flex items-center gap-2 text-sm select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={manageMessages}
                        onChange={(e) => setManageMessages(e.target.checked)}
                        className="w-4 h-4 accent-brand-primary rounded"
                      />
                      <span>Mesaj Yönetimi</span>
                    </label>

                    <label className="flex items-center gap-2 text-sm select-none cursor-pointer col-span-2">
                      <input
                        type="checkbox"
                        checked={manageSettings}
                        onChange={(e) => setManageSettings(e.target.checked)}
                        className="w-4 h-4 accent-brand-primary rounded"
                      />
                      <span>Genel Ayarlar Yönetimi</span>
                    </label>
                  </div>
                </div>
              )}

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
                  {editingUser ? "Kaydet" : "Oluştur"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        title="Kullanıcıyı Sil"
        description="Seçilen kullanıcının hesabını ve tüm erişim yetkilerini silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
        confirmText="Sil"
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
export default UsersCMS;
