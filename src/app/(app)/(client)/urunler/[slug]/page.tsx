import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Check, 
  X, 
  ChevronRight, 
  ArrowLeft, 
  Cpu, 
  MessageSquare,
  ShieldCheck,
  Zap
} from "lucide-react";
import type { Metadata } from "next";
import { getSettings, getProducts } from "@/app/actions";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);
  return {
    title: product ? `${product.name} | NivaArt Ürün Kataloğu` : "Ürün Detay",
    description: product?.description ? product.description.substring(0, 160) : "Ürün teknik detayları ve özellikleri.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const products = await getProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const settings = await getSettings();
  const showPrices = settings?.showPrices ?? true;

  // Parse technical specifications dynamically
  let parsedSpecs: Record<string, string> | null = null;
  let rawSpecsList: string[] = [];

  if (product.specs) {
    try {
      if (product.specs.trim().startsWith("{")) {
        parsedSpecs = JSON.parse(product.specs);
      } else {
        rawSpecsList = product.specs
          .split(/[\n,]+/)
          .map(s => s.trim())
          .filter(s => s.length > 0);
      }
    } catch {
      rawSpecsList = product.specs
        .split(/[\n]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <nav className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-brand-primary">Anasayfa</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/urunler" className="hover:text-brand-primary">Ürünler</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-500 truncate max-w-[200px]">{product.name}</span>
        </nav>

        <Link
          href="/urunler"
          className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-primary hover:text-brand-primary-hover mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-1" />
          <span>Kataloğa Geri Dön</span>
        </Link>
      </div>

      {/* 2. PRODUCT DETAILS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Product Image Preview */}
          <div className="aspect-[4/3] w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden relative shadow-lg flex items-center justify-center group">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
            ) : (
              <Cpu className="w-24 h-24 text-zinc-300 stroke-1" />
            )}
          </div>

          {/* Right Column: Descriptions & Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  product.inStock 
                    ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 border-emerald-250/20" 
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border-zinc-200 dark:border-zinc-800"
                }`}>
                  {product.inStock ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Stokta Var
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5" />
                      Sipariş Üzerine
                    </>
                  )}
                </span>
                
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-bold border border-brand-primary/10">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  %100 Orijinal Ürün Garantisi
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price block */}
            {showPrices && product.price && (
              <div className="p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl shadow-sm">
                <span className="text-zinc-400 text-xs font-bold block mb-1 uppercase tracking-wider">Tavsiye Edilen Satış Fiyatı</span>
                <span className="text-brand-primary dark:text-white font-extrabold text-2xl sm:text-3xl">
                  {Number(product.price).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                </span>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Ürün Açıklaması</h3>
              <p className="text-zinc-650 dark:text-zinc-350 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Specs rendering */}
            {product.specs && (
              <div className="space-y-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-brand-secondary animate-pulse" />
                  Teknik Özellikler
                </h3>
                
                {parsedSpecs && (
                  <div className="border border-zinc-200/60 dark:border-zinc-800 rounded-[2rem] overflow-hidden text-xs sm:text-sm bg-zinc-50/50 dark:bg-zinc-900/10 shadow-sm">
                    <table className="w-full border-collapse">
                      <tbody>
                        {Object.entries(parsedSpecs).map(([key, val], index) => (
                          <tr key={index} className="border-b border-zinc-150 dark:border-zinc-850 last:border-b-0">
                            <td className="px-5 py-4 font-bold text-zinc-450 dark:text-zinc-400 bg-zinc-50/80 dark:bg-zinc-900/40 w-1/3">
                              {key}
                            </td>
                            <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {rawSpecsList.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {rawSpecsList.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2 text-zinc-750 dark:text-zinc-300">
                        <span className="w-5 h-5 rounded-full bg-brand-secondary/15 border border-brand-secondary/25 flex items-center justify-center text-brand-secondary shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* CTA action */}
            <div className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800">
              <Link
                href={`/iletisim?subject=Ürün Bilgisi Talebi: ${encodeURIComponent(product.name)}`}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-brand-primary/25 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 animate-pulse" />
                <span>Teklif ve Detaylı Bilgi İste</span>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
