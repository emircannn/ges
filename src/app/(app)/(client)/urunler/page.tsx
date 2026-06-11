import React from "react";
import Link from "next/link";
import { getProducts, getSettings } from "@/app/actions";
import { 
  Cpu, 
  Sparkles,
  ShoppingBag,
  Info,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ürünlerimiz | NivaArt Kurumsal Platformu",
  description: "Kurumsal projelerimizde ve tasarım süreçlerimizde kullandığımız yüksek kaliteli ekipmanlar, robotik çözümler ve fırçalar.",
};

interface UrunlerPageProps {
  searchParams: Promise<{
    page?: string;
    sortBy?: string;
  }>;
}

export default async function UrunlerPage({ searchParams }: UrunlerPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1") || 1;
  const sortBy = params.sortBy || "date_desc";

  const products = await getProducts();
  const settings = await getSettings();
  const showPrices = settings?.showPrices ?? true;

  // Sorting logic
  if (sortBy === "price_asc") {
    products.sort((a, b) => {
      const pA = a.price ? Number(a.price) : 0;
      const pB = b.price ? Number(b.price) : 0;
      return pA - pB;
    });
  } else if (sortBy === "price_desc") {
    products.sort((a, b) => {
      const pA = a.price ? Number(a.price) : 0;
      const pB = b.price ? Number(b.price) : 0;
      return pB - pA;
    });
  } else if (sortBy === "date_desc") {
    products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  // Pagination logic
  const ITEMS_PER_PAGE = 6;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const paginatedProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. PAGE HEADER */}
      <section className="relative pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200/50 dark:border-zinc-900/50 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
            <span>Ekipman Kataloğu</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Ürünlerimiz</h1>
          <p className="text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            Kurumsal projelerimizde ve tasarım süreçlerimizde kullandığımız yüksek kaliteli ekipmanlar, fırçalar ve teknolojik çözümler.
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
              href={`/urunler?page=1&sortBy=date_desc`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                sortBy === "date_desc"
                  ? "bg-brand-primary text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              En Yeni
            </Link>
            {showPrices && (
              <>
                <Link
                  href={`/urunler?page=1&sortBy=price_asc`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    sortBy === "price_asc"
                      ? "bg-brand-primary text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Fiyat: Düşükten Yükseğe
                </Link>
                <Link
                  href={`/urunler?page=1&sortBy=price_desc`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                    sortBy === "price_desc"
                      ? "bg-brand-primary text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Fiyat: Yüksekten Düşüğe
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. CATALOG GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up animation-delay-100">
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200/60 dark:border-zinc-800 max-w-2xl mx-auto space-y-4 p-8 sm:p-12 shadow-sm">
            <ShoppingBag className="w-12 h-12 text-zinc-400 mx-auto stroke-1 animate-float-slow" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Henüz Ürün Eklenmedi</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              Profesyonel panel temizleme ekipmanlarımız ve arıtma ürünlerimiz yakında bu katalogda sergilenecektir.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-primary/30 dark:hover:border-brand-primary/30 transition-all duration-300 flex flex-col group transform hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                    {product.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-zinc-50 dark:bg-zinc-900">
                        <Cpu className="w-12 h-12 stroke-1" />
                      </div>
                    )}
                    
                    {/* Stock Badge */}
                    <div className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      product.inStock 
                        ? "bg-emerald-600/90 backdrop-blur-sm text-white" 
                        : "bg-zinc-600/90 backdrop-blur-sm text-white"
                    }`}>
                      {product.inStock ? "Stokta Var" : "Tükendi"}
                    </div>
                  </div>

                  {/* Product Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <h2 className="text-lg font-bold group-hover:text-brand-primary transition-colors text-zinc-900 dark:text-white line-clamp-1">
                        {product.name}
                      </h2>
                      <p className="text-zinc-500 dark:text-zinc-450 text-sm line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-zinc-100 dark:border-zinc-850 flex flex-col gap-4">
                      {showPrices && product.price && (
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400 text-xs font-semibold">Fiyat</span>
                          <span className="text-zinc-955 dark:text-white font-extrabold text-lg">
                            {Number(product.price).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                          </span>
                        </div>
                      )}
                      <Link
                        href={`/urunler/${product.slug}`}
                        className="w-full py-3.5 rounded-xl bg-zinc-150 dark:bg-zinc-800 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary dark:hover:text-white text-zinc-700 dark:text-zinc-300 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Info className="w-4 h-4" />
                        <span>Detayları ve Özellikleri Gör</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                {/* Prev page */}
                <Link
                  href={`/urunler?page=${currentPage - 1}&sortBy=${sortBy}`}
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
                  href={`/urunler?page=${currentPage + 1}&sortBy=${sortBy}`}
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
