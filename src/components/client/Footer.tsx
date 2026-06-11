import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { getSettings } from "@/app/actions";

export async function Footer() {
  const currentYear = new Date().getFullYear();

  // Fetch settings statically
  const settings = await getSettings();

  const phone = settings?.phone || "+90 555 123 4567";
  const email = settings?.email || "info@nivaart.com";
  const address = settings?.address || "NivaArt Plaza, No:12, Kadıköy, İstanbul";

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Col */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-brand-primary">
              <img
                src="/logo.svg"
                alt="NivaArt Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="tracking-tight font-extrabold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                NivaArt
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Tasarım, sanat ve yaratıcı dijital çözümlerde lider. Profesyonel ekibimizle markanıza modern, estetik ve kalıcı değerler katıyoruz.
            </p>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase mb-4">
              Hızlı Linkler
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/hakkimizda" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/danismanlik" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  Danışmanlık
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  Blog & Haberler
                </Link>
              </li>
            </ul>
          </div>

          {/* Products & Gallery Col */}
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase mb-4">
              Katalog
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/urunler" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  Ürünlerimiz
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  Medya Galerisi
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  İletişim & Konum
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase mb-4">
              İletişim Bilgileri
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <a href={`mailto:${email}`} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copywrite Bottom */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            &copy; {currentYear} NivaArt Kurumsal Platformu. Tüm Hakları Saklıdır.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-brand-primary">
              Kullanım Koşulları
            </Link>
            <Link href="#" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-brand-primary">
              Gizlilik Politikası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
