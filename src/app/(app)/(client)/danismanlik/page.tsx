import React from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  Map, 
  BookOpen, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

export const metadata = {
  title: "Danışmanlık Hizmetlerimiz | NivaArt Kurumsal Platformu",
  description: "Güneş enerjisi santralleri için verimlilik analizi, coğrafi kirlilik öngörüleri ve ekipman seçim danışmanlığı.",
};

export default function DanismanlikPage() {
  const consultingSteps = [
    {
      title: "Verimlilik Analizi ve Raporlama",
      description: "Güneş enerjisi santrallerinizde (GES) kirliliğe bağlı oluşan kayıpları hassas ölçüm cihazlarımızla analiz ediyoruz. Temizlik öncesi ve sonrası elektriksel parametre değerlerini ölçerek, elde ettiğiniz net kazancı finansal amortisman tablolarıyla raporluyoruz.",
      icon: <TrendingUp className="w-7 h-7 text-brand-primary" />,
      tag: "Ölçüm & ROI"
    },
    {
      title: "Kirlilik Analizi & GES Konum Planlama",
      description: "Yeni kurulacak veya mevcut santrallerin çevresel tozlanma faktörlerini (tarımsal araziler, çimento fabrikaları, sanayi bölgeleri, rüzgar yönü vb.) coğrafi veri tabanlı modellerimizle inceliyoruz. Kirlilik hızını öngörerek temizlik bütçenizi optimize ediyoruz.",
      icon: <Map className="w-7 h-7 text-brand-primary" />,
      tag: "Önleyici Analiz"
    },
    {
      title: "Ekipman ve Teknoloji Seçim Danışmanlığı",
      description: "Kendi temizlik ekiplerini kurmak isteyen büyük ölçekli santral sahipleri için hangi robotik araçların, fırça tiplerinin ve saf su arıtma ünitelerinin seçilmesi gerektiği konusunda tarafsız mühendislik danışmanlığı veriyoruz.",
      icon: <LayersIcon className="w-7 h-7 text-brand-primary" />,
      tag: "Donanım Seçimi"
    },
    {
      title: "Operasyonel Eğitim ve Sertifikasyon",
      description: "Santral personelinize güneş panellerinin güvenli temizliği, elektriksel güvenlik önlemleri, yüksekte çalışma kuralları ve saf su deiyonizasyon ünitesi kullanımına dair teorik ve pratik eğitimler vererek ekiplerinizi belgelendiriyoruz.",
      icon: <BookOpen className="w-7 h-7 text-brand-primary" />,
      tag: "Eğitim & İSG"
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": consultingSteps.length,
    "itemListElement": consultingSteps.map((step, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": step.title,
        "description": step.description,
        "provider": {
          "@type": "ProfessionalService",
          "name": "NivaArt Kurumsal Platformu"
        }
      }
    }))
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. PAGE HEADER */}
      <section className="relative pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200/50 dark:border-zinc-900/50 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/5 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
            <span>Mühendislik Çözümleri</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Danışmanlık Hizmetlerimiz</h1>
          <p className="text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            Güneş panellerinizin performansını bilimsel veriler ve doğru ekipman stratejileri ile optimize ediyoruz.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONSULTING GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {consultingSteps.map((step, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 hover:shadow-2xl hover:border-brand-primary/40 dark:hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-0.5"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 flex items-center justify-center border border-brand-primary/10 shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-extrabold text-brand-secondary bg-brand-secondary/10 px-3 py-1 rounded-full uppercase tracking-wider border border-brand-secondary/10">
                    {step.tag}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-850 mt-8 flex justify-end">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-1 text-sm font-bold text-brand-primary hover:text-brand-primary-hover group cursor-pointer"
                >
                  <span>Bilgi Alın</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TECHNICAL WARNING CALLOUT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-250/30 dark:border-amber-900/40 rounded-3xl p-6 sm:p-8 flex gap-5 items-start shadow-sm">
          <ShieldAlert className="w-8 h-8 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-2">
            <h4 className="font-extrabold text-amber-900 dark:text-amber-400 text-base sm:text-lg">
              Bilinçsiz Temizlik Panellerinize Kalıcı Zararlar Verebilir!
            </h4>
            <p className="text-xs sm:text-sm text-amber-800/90 dark:text-amber-400/80 leading-relaxed">
              Yüksek basınçlı su kullanımı mikro çatlaklar (micro-cracks) oluşturabilir. Doğru sıcaklıkta olmayan su kullanımı (termal şok) paneli tamamen çatlatabilir. Kimyasal deterjanlar ise yansıma önleyici cam kaplamayı (ARC) tahrip ederek üretim kaybına yol açar. Bilimsel metotlarla çalışmak GES yatırımınızın garantisidir.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/10 -z-10" />
          <div className="space-y-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-extrabold tracking-tight">Santralinizin Potansiyelini Analiz Edelim</h3>
            <p className="text-zinc-455 text-sm sm:text-base leading-relaxed">
              Mühendislik departmanımızla iletişime geçin, santralinizin ürettiği gücü ve kirlilik oranlarını bilimsel yöntemlerle izleyelim.
            </p>
            <div className="pt-4">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-base transition-colors shadow-lg shadow-brand-primary/25 cursor-pointer"
              >
                <span>Mühendisimizle Görüşün</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Custom local inline LayersIcon
function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-10 5 10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}
