import React from "react";
import Link from "next/link";
import { getBlogPosts, getProducts, getGalleryItems, getContactSubmissions } from "@/app/actions";
import { FileText, Package, Image as ImageIcon, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Query statistics from mocked actions
  const blogs = await getBlogPosts();
  const products = await getProducts();
  const galleryItems = await getGalleryItems();
  const submissions = await getContactSubmissions();

  const blogCount = blogs.length;
  const productCount = products.length;
  const galleryCount = galleryItems.length;
  const submissionsCount = submissions.length;
  const unreadSubmissionsCount = submissions.filter((s) => !s.isRead).length;

  const stats = [
    {
      name: "Blog Yazıları",
      value: blogCount,
      href: "/nivaart/dashboard/blog",
      icon: FileText,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      description: "Toplam yayınlanan ve taslak yazılar",
    },
    {
      name: "Ürünler",
      value: productCount,
      href: "/nivaart/dashboard/products",
      icon: Package,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      description: "Katalogda sergilenen ürün sayısı",
    },
    {
      name: "Galeri Görselleri",
      value: galleryCount,
      href: "/nivaart/dashboard/gallery",
      icon: ImageIcon,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      description: "Projelerden yüklenen görsel sayısı",
    },
    {
      name: "Gelen Mesajlar",
      value: submissionsCount,
      href: "/nivaart/dashboard/submissions",
      icon: Mail,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      description: `Toplam form mesajı (${unreadSubmissionsCount} okunmamış)`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Yönetici Paneline Hoş Geldiniz</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Platformun kurumsal içeriklerini, kataloğunu ve müşteri taleplerini buradan yönetebilirsiniz.
        </p>
      </div>

      {/* Grid of stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {stat.name}
                  </span>
                  <span className={`p-2.5 rounded-2xl ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-extrabold">{stat.value}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {stat.description}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Link
                  href={stat.href}
                  className="text-xs font-bold text-brand-primary hover:text-brand-primary-hover flex items-center gap-1.5 transition-colors"
                >
                  Yönet &rarr;
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick guide section */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 space-y-6">
        <h3 className="text-lg font-bold">Hızlı Başlangıç Rehberi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h4 className="font-bold text-sm">İçerikleri Güncel Tutun</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Anasayfa sekmesinden hero başlıklarını, açıklamaları ve hakkımızda yazılarını kolayca güncelleyebilirsiniz.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="font-bold text-sm">Gelen Talepleri Yanıtlayın</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Müşterilerin iletişim formundan gönderdiği mesajları &quot;Gelen Mesajlar&quot; sekmesinden inceleyebilir ve yanıtlayabilirsiniz.
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="font-bold text-sm">Galeri ve Katalog Yönetimi</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Uyguladığınız projelerin görsellerini galeriye ekleyin. Satışını yaptığınız temizlik solüsyonlarını kataloğa ekleyin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
