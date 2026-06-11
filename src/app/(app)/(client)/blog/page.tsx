import React from "react";
import Link from "next/link";
import { getBlogPosts, getSettings } from "@/app/actions";
import { 
  Calendar, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  User,
  Eye,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog & Haberler | NivaArt Kurumsal Platformu",
  description: "Yaratıcı projeler, tasarım trendleri ve NivaArt dünyasından en son haberler ve makaleler.",
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1") || 1;
  const sortBy = params.sortBy || "date_desc";

  const allPosts = await getBlogPosts();
  const settings = await getSettings();
  const showBlogViews = settings?.showBlogViews ?? true;
  
  const publishedPosts = allPosts.filter(post => post.published);

  // Sorting logic
  if (sortBy === "date_asc") {
    publishedPosts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  } else if (sortBy === "date_desc") {
    publishedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === "views_desc") {
    publishedPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  // Pagination logic
  const ITEMS_PER_PAGE = 6;
  const totalPosts = publishedPosts.length;
  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const paginatedPosts = publishedPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. PAGE HEADER */}
      <section className="relative pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200/50 dark:border-zinc-900/50 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-brand-primary/5 blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
            <span>Bilgi Paylaşımı</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Blog & Haberler</h1>
          <p className="text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            Yaratıcı projelerimiz, tasarım trendleri ve NivaArt dünyasındaki estetik ve modern gelişmeler.
          </p>
        </div>
      </section>

      {/* 2. FILTER & SORTING BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/50 shadow-sm text-sm">
          <div className="flex items-center gap-2 font-bold text-zinc-650 dark:text-zinc-400">
            <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
            <span>Sırala ve Filtrele</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/blog?page=1&sortBy=date_desc`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                sortBy === "date_desc"
                  ? "bg-brand-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              En Yeni
            </Link>
            <Link
              href={`/blog?page=1&sortBy=date_asc`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                sortBy === "date_asc"
                  ? "bg-brand-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              En Eski
            </Link>
            <Link
              href={`/blog?page=1&sortBy=views_desc`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                sortBy === "views_desc"
                  ? "bg-brand-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              En Çok Okunan
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BLOG LIST GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
        {paginatedPosts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200/60 dark:border-zinc-800 max-w-2xl mx-auto space-y-4 p-8 sm:p-12 shadow-sm">
            <BookOpen className="w-12 h-12 text-zinc-400 mx-auto stroke-1 animate-float-slow" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Henüz Yazı Yayınlanmadı</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              Sektörel gelişmeler, makaleler ve rehberler çok yakında burada paylaşılacaktır. Lütfen daha sonra tekrar ziyaret edin.
            </p>
            <div className="pt-4">
              <Link 
                href="/" 
                className="px-6 py-3 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold inline-block shadow-md cursor-pointer"
              >
                Anasayfaya Dön
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => {
                const formattedDate = new Date(post.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                });

                return (
                  <article
                    key={post.id}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-primary/30 dark:hover:border-brand-primary/30 transition-all duration-300 flex flex-col group transform hover:-translate-y-1"
                  >
                    {/* Blog Image */}
                    <div className="aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                      {post.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-zinc-50 dark:bg-zinc-900">
                          <BookOpen className="w-12 h-12 stroke-1" />
                        </div>
                      )}
                    </div>

                    {/* Blog Body */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                            {formattedDate}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-brand-primary" />
                            NivaArt
                          </span>
                          {showBlogViews && (
                            <span className="flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5 text-brand-primary" />
                              {post.views}
                            </span>
                          )}
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug text-zinc-900 dark:text-white">
                          {post.title}
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-zinc-100 dark:border-zinc-850 mt-auto flex justify-start">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary group-hover:text-brand-primary-hover cursor-pointer"
                        >
                          <span>Yazıyı Oku</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                {/* Prev page */}
                <Link
                  href={`/blog?page=${currentPage - 1}&sortBy=${sortBy}`}
                  className={`p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors ${
                    currentPage === 1 ? "opacity-30 pointer-events-none" : ""
                  }`}
                  aria-label="Önceki Sayfa"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>

                {/* Page numbers */}
                <span className="text-xs sm:text-sm font-extrabold px-4 text-zinc-650 dark:text-zinc-400 select-none">
                  Sayfa {currentPage} / {totalPages}
                </span>

                {/* Next page */}
                <Link
                  href={`/blog?page=${currentPage + 1}&sortBy=${sortBy}`}
                  className={`p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors ${
                    currentPage === totalPages ? "opacity-30 pointer-events-none" : ""
                  }`}
                  aria-label="Sonraki Sayfa"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
