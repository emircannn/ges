"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Key, Lock, Mail, Loader2, Save, User, Eye, EyeOff } from "lucide-react";
import { updateSelfProfile } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export function ProfileCMS() {
  const { data: session, update: updateSession } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("E-posta adresi boş bırakılamaz.");
      return;
    }

    setIsUpdating(true);
    try {
      const res = await updateSelfProfile({
        email,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });

      if (res.success) {
        toast.success("Profiliniz başarıyla güncellendi.");
        setCurrentPassword("");
        setNewPassword("");

        // Update session values client-side if email changed
        if (res.user && res.user.email !== session?.user?.email) {
          await updateSession({
            ...session,
            user: {
              ...session?.user,
              email: res.user.email,
            },
          });
        }
      } else {
        toast.error(res.error || "Profil güncellenirken hata oluştu.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Profil güncellenirken hata oluştu.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Profil Ayarlarım</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Mevcut oturum e-posta adresinizi ve şifrenizi buradan güncelleyebilirsiniz.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-extrabold text-2xl">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{session?.user?.email || "Yönetici"}</h3>
            <p className="text-xs text-zinc-500 uppercase font-semibold tracking-wider">
              {session?.user && (session.user as { role?: string }).role === "ADMIN"
                ? "Sistem Yöneticisi (Admin)"
                : "Şirket Çalışanı (Staff)"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
              E-posta Adresi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 pointer-events-none">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@nivaart.com"
                className="w-full pl-11 pr-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
            <h4 className="text-xs font-bold text-zinc-450 uppercase tracking-widest">
              Şifre Değiştirme
            </h4>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Mevcut Şifre
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 pointer-events-none">
                  <Key className="w-5 h-5" />
                </span>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Değişiklik yapmak için mevcut şifrenizi girin"
                  className="w-full pl-11 pr-12 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Yeni Şifre
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 pointer-events-none">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Yeni şifrenizi girin"
                  className="w-full pl-11 pr-12 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isUpdating}
            className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-primary/10"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Kaydediliyor...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> Değişiklikleri Kaydet
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProfileCMS;
