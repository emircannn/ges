"use client";

import React, { useState } from "react";
import { Save, Loader2, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { updateSettings } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface Setting {
  id: number;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  whatsapp: string;
  showBlogViews: boolean;
  showPrices: boolean;
}

interface SettingsCMSProps {
  initialSettings: Setting | null;
}

export function SettingsCMS({ initialSettings }: SettingsCMSProps) {
  const [phone, setPhone] = useState(initialSettings?.phone || "");
  const [email, setEmail] = useState(initialSettings?.email || "");
  const [whatsapp, setWhatsapp] = useState(initialSettings?.whatsapp || "");
  const [address, setAddress] = useState(initialSettings?.address || "");
  const [workingHours, setWorkingHours] = useState(initialSettings?.workingHours || "");
  const [showBlogViews, setShowBlogViews] = useState(initialSettings?.showBlogViews ?? true);
  const [showPrices, setShowPrices] = useState(initialSettings?.showPrices ?? true);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !email || !address || !workingHours) {
      toast.error("Lütfen tüm alanları doldurun.");
      return;
    }

    setIsLoading(true);
    const res = await updateSettings({
      phone,
      email,
      address,
      workingHours,
      whatsapp,
      showBlogViews,
      showPrices,
    });

    setIsLoading(false);
    if (res.success) {
      toast.success("Genel site ayarları başarıyla güncellendi.");
    } else {
      toast.error(res.error || "Ayarlar kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Genel Ayarlar</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          İletişim bilgilerini ve site genelindeki gösterim tercihlerini yönetin.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          {/* Contact Details */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-800 pb-2">
              İletişim Bilgileri
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-wider">
                  Telefon Numarası
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 pointer-events-none">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+90 555 123 4567"
                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-wider">
                  E-Posta Adresi
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@nivaart.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-wider">
                  WhatsApp Numarası
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-400 pointer-events-none">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+90 555 123 4567"
                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-wider">
                  Adres Bilgisi
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3.5 text-zinc-400 pointer-events-none">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="NivaArt Plaza, No:12, Kadıköy, İstanbul"
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-wider">
                  Çalışma Saatleri
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3.5 text-zinc-400 pointer-events-none">
                    <Clock className="w-4 h-4" />
                  </span>
                  <textarea
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    placeholder="Pazartesi - Cumartesi: 09:00 - 19:00"
                    rows={3}
                    className="w-full pl-10 pr-4 py-2.5 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Visibility Controls */}
          <div className="space-y-4 pt-4 border-t border-zinc-150 dark:border-zinc-800">
            <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
              Gösterim Tercihleri
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Blog Views Switch */}
              <label className="flex items-start gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40 cursor-pointer select-none hover:border-brand-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={showBlogViews}
                  onChange={(e) => setShowBlogViews(e.target.checked)}
                  className="w-5 h-5 accent-brand-primary rounded mt-0.5"
                />
                <div>
                  <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Blog Okunma Sayılarını Göster
                  </span>
                  <span className="block text-xs text-zinc-500">
                    Ziyaretçilerin blog yazısı detayında okunma/görüntülenme sayılarını görmesini sağlar.
                  </span>
                </div>
              </label>

              {/* Product Prices Switch */}
              <label className="flex items-start gap-3 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40 cursor-pointer select-none hover:border-brand-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={showPrices}
                  onChange={(e) => setShowPrices(e.target.checked)}
                  className="w-5 h-5 accent-brand-primary rounded mt-0.5"
                />
                <div>
                  <span className="block text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Ürün Fiyatlarını Göster
                  </span>
                  <span className="block text-xs text-zinc-500">
                    Katalogdaki ürünlerin fiyatlarının ziyaretçiler tarafından görülmesini sağlar.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Ayarları Kaydet
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SettingsCMS;
