import React from "react";
import Link from "next/link";
import { 
  getHomepageContents, 
  getProducts, 
  getBlogPosts,
  getSettings
} from "@/app/actions";
import { 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  TrendingUp, 
  Droplet, 
  Cpu, 
  Briefcase, 
  ChevronRight,
  Zap
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const contents = await getHomepageContents();
  const rawProducts = await getProducts();
  const rawBlogs = await getBlogPosts();
  const settings = await getSettings();

  const phone = settings?.phone || "+90 555 123 4567";
  const cleanedPhone = phone.replace(/\s+/g, "");

  const heroTitle = contents.hero_title || "Güneş Enerjisinden Maksimum Verim Alın";
  const heroSubtitle = contents.hero_subtitle || "Profesyonel güneş paneli temizliği, saf su sistemleri ve uzman danışmanlık hizmetleri ile enerji üretim verimliliğinizi %30'a kadar artırın.";
  const aboutText = contents.about_text || "NivaArt Kurumsal Platformu olarak, yenilenebilir enerji yatırımlarınızın değerini koruyor ve performansını zirveye taşıyoruz. Özel 0 TDS saf su deiyonizasyon teknolojimiz ve alanında uzman ekibimizle, güneş panellerinize zarar vermeden en inatçı kirleri ve toz tabakalarını arındırıyoruz. Enerji santrallerinizin ömrünü uzatıyor, verimlilik kayıplarını minimuma indiriyoruz.";
  const heroImageUrl = contents.hero_image_url || "";

  // Filter and limit featured products (up to 3)
  const featuredProducts = rawProducts.filter(p => p.inStock).slice(0, 3);
  
  // Filter and limit published blog posts (up to 3)
  const recentBlogs = rawBlogs.filter(b => b.published).slice(0, 3);

  const serviceCards = [
    {
      title: "Güneş Paneli Temizliği",
      description: "0 TDS saf su teknolojisi ve panel yüzeylerine zarar vermeyen özel ekipmanlarla kimyasalsız temizlik.",
      icon: <Droplet className="w-8 h-8 text-brand-primary" />,
      href: "/hizmetler"
    },
    {
      title: "Robotik Temizleme Çözümleri",
      description: "Geniş arazi ve endüstriyel çatı GES projeleri için uzaktan kumandalı paletli robotik temizleme sistemleri.",
      icon: <Cpu className="w-8 h-8 text-brand-primary" />,
      href: "/hizmetler"
    },
    {
      title: "Verimlilik Danışmanlığı",
      description: "Kirlilik oranlarının analizi, temizlik öncesi/sonrası üretim ölçümleri ve GES verimlilik raporlaması.",
      icon: <TrendingUp className="w-8 h-8 text-brand-primary" />,
      href: "/danismanlik"
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      
      {/* 1. HERO SECTION WITH IMAGE & BLUR OVERLAY */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Dynamic Local Image Background */}
        {heroImageUrl ? (
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImageUrl} 
              alt="Hero Background" 
              className="w-full h-full object-cover filter brightness-[0.4] dark:brightness-[0.3] scale-105 transition-transform duration-[10000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
          </div>
        ) : (
          // Falling back to corporate vector blur background
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-zinc-50 dark:bg-zinc-950">
            <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[130px] dark:bg-brand-primary/5" />
            <div className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] rounded-full bg-brand-secondary/15 blur-[130px] dark:bg-brand-secondary/5" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8">
          
          {/* Badge animation */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 dark:bg-zinc-900/40 backdrop-blur-md border border-white/20 dark:border-zinc-800 text-brand-primary dark:text-zinc-200 text-[10px] sm:text-xs md:text-sm font-bold animate-fade-in-up">
            <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-brand-secondary animate-pulse" />
            <span>Sürdürülebilir & Yüksek Verimli Enerji Teknolojileri</span>
          </div>

          {/* Glowing Glass Hero Title Block */}
          <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 bg-white/5 dark:bg-zinc-950/20 backdrop-blur-md p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 dark:border-zinc-800/80 shadow-2xl animate-fade-in-up animation-delay-100">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2] sm:leading-tight bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-white dark:via-zinc-150 dark:to-zinc-300 bg-clip-text text-transparent">
              {heroTitle}
            </h1>

            <p className="text-xs sm:text-base md:text-lg text-zinc-700 dark:text-zinc-350 max-w-3xl mx-auto font-medium leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link
                href="/iletisim"
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-sm sm:text-base shadow-lg shadow-brand-primary/30 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Ücretsiz Keşif & Teklif Al</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/hizmetler"
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-zinc-350 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer bg-white/5 backdrop-blur-sm"
              >
                <span>Hizmetlerimizi İnceleyin</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (MODERN METRICS ROW) */}
      <section className="relative py-12 border-t border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-950/20 backdrop-blur-sm z-10 -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1 animate-fade-in-up">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary flex items-center justify-center gap-1">
                <span>+%30</span>
                <TrendingUp className="w-5 h-5 text-brand-secondary" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest">Verimlilik Artışı</p>
            </div>
            <div className="space-y-1 animate-fade-in-up animation-delay-100">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary">0 TDS</div>
              <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest">Lekesiz Saf Su</p>
            </div>
            <div className="space-y-1 animate-fade-in-up animation-delay-200">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary">100%</div>
              <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest">Kimyasalsız Doğa Dostu</p>
            </div>
            <div className="space-y-1 animate-fade-in-up animation-delay-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-primary">500k+</div>
              <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest">Temizlenen Panel (m²)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT HIGHLIGHT SECTION */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Column Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-secondary/10 text-brand-secondary text-xs sm:text-sm font-bold border border-brand-secondary/20">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Kurumsal Profili</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                GES Yatırımlarınızın Performansını Güvenceye Alıyoruz
              </h2>
              <p className="text-zinc-655 dark:text-zinc-400 leading-relaxed text-base md:text-lg">
                {aboutText}
              </p>
              
              <div className="space-y-3.5 pt-4">
                <div className="flex items-center gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-zinc-800 dark:text-zinc-200">Uzman Mühendislik ve Operasyon Kadrosu</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-zinc-800 dark:text-zinc-200">Yüksek Teknoloji Panel Temizleme Robotları</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-brand-secondary shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-sm sm:text-base text-zinc-800 dark:text-zinc-200">Geniş Güç Santralleri Referansı</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Link
                  href="/hakkimizda"
                  className="inline-flex items-center gap-1.5 font-extrabold text-brand-primary hover:text-brand-primary-hover group cursor-pointer"
                >
                  <span>Daha Fazlasını Keşfet</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Column visual illustration */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-primary/10 rounded-[2.5rem] blur-3xl transform rotate-6 translate-x-4 translate-y-4 -z-10" />
              <div className="aspect-[4/3] rounded-[2.5rem] bg-gradient-to-tr from-brand-primary to-brand-secondary p-0.5 shadow-2xl relative group overflow-hidden border border-zinc-200/10">
                <div className="absolute inset-0 bg-zinc-950/40 z-10 transition-opacity duration-300 group-hover:opacity-30" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute bottom-8 left-8 z-20 text-white max-w-sm">
                  <div className="flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-max text-xs font-bold border border-white/20">
                    <Zap className="w-3.5 h-3.5 text-brand-secondary animate-pulse" />
                    <span>Maksimum Performans</span>
                  </div>
                  <h4 className="font-extrabold text-xl sm:text-2xl">Endüstri Standartlarında Hizmet</h4>
                  <p className="text-zinc-200 text-xs sm:text-sm mt-1 leading-relaxed">Güneş enerjisi santrallerinizde en yüksek verimlilik oranı ve sürdürülebilir koruma.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES OVERVIEW SECTION */}
      <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950/30 border-t border-b border-zinc-200/50 dark:border-zinc-900/50 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-brand-primary/5 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">Neler Yapıyoruz?</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-sm sm:text-base">
              Yenilikçi deiyonize saf su teknolojimiz ve robotik temizleme araçlarımızla sunduğumuz kurumsal çözümler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {serviceCards.map((service, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-2xl hover:border-brand-primary/40 dark:hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div className="space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 flex items-center justify-center shrink-0 border border-brand-primary/10 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors">{service.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-450 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-850 mt-8 flex justify-end">
                  <Link 
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary group-hover:text-brand-primary-hover cursor-pointer"
                  >
                    <span>Detayları İncele</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS SPOTLIGHT */}
      {featuredProducts.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">Öne Çıkan Ürünlerimiz</h2>
                <p className="text-zinc-550 dark:text-zinc-400 max-w-xl font-medium text-sm sm:text-base">
                  GES temizliğinde ve bakım süreçlerinde kullandığımız yüksek kaliteli ekipmanlar ve sarf malzemeleri.
                </p>
              </div>
              <Link 
                href="/urunler"
                className="px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-sm font-bold flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>Tüm Ürünler</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/urunler/${product.slug}`}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-primary/40 transition-all duration-300 flex flex-col group transform hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                    {product.imageUrl ? (
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
                    <div className="absolute top-4 right-4 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Stokta Var
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <h3 className="text-lg font-bold group-hover:text-brand-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-450 text-sm line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    {product.price && (
                      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850 mt-5 flex items-center justify-between">
                        <span className="text-zinc-400 text-xs font-semibold">Tavsiye Edilen Fiyat</span>
                        <span className="text-brand-primary dark:text-white font-extrabold text-lg sm:text-xl">
                          {Number(product.price).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. LATEST NEWS / BLOG */}
      {recentBlogs.length > 0 && (
        <section className="py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950/30 border-t border-b border-zinc-200/50 dark:border-zinc-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">Güncel Blog ve Rehberler</h2>
                <p className="text-zinc-550 dark:text-zinc-400 max-w-xl font-medium text-sm sm:text-base">
                  Güneş paneli temizliği ve bakımı hakkında en güncel teknik bilgiler ve uzman tavsiyeleri.
                </p>
              </div>
              <Link 
                href="/blog"
                className="px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-sm font-bold flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>Tüm Yazılar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => {
                const blogDate = new Date(blog.createdAt).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                });
                return (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-brand-primary/40 transition-all duration-300 flex flex-col group transform hover:-translate-y-1"
                  >
                    <div className="aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
                      {blog.imageUrl ? (
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-zinc-50 dark:bg-zinc-900">
                          <Briefcase className="w-12 h-12 stroke-1" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">{blogDate}</span>
                        <h3 className="text-lg font-bold group-hover:text-brand-primary transition-colors line-clamp-2 leading-tight">
                          {blog.title}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-450 text-sm line-clamp-2 leading-relaxed">
                          {blog.summary}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1 text-sm font-bold text-brand-primary group-hover:text-brand-primary-hover">
                        <span>Devamını Oku</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. BOTTOM CTA SECTION */}
      <section className="py-24 md:py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brand-primary via-brand-primary to-brand-secondary rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[1px] -z-10" />
            <div className="space-y-6 max-w-2xl mx-auto relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Güneş Santralinizin Üretimini Zirveye Taşıyalım
              </h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Alanında uzman ekibimiz ve son teknoloji ekipmanlarımızla tesisinizi inceleyelim, verimlilik raporunuzu çıkaralım.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <Link
                  href="/iletisim"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-zinc-50 text-brand-primary font-bold text-base shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-center"
                >
                  Bizimle İletişime Geçin
                </Link>
                <a
                  href={`tel:${cleanedPhone}`}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-all duration-200 hover:-translate-y-0.5 text-center"
                >
                  Hemen Arayın: {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
