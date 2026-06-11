import React from "react";
import Link from "next/link";
import { 
  Droplet, 
  Cpu, 
  Layers, 
  Calendar, 
  Check, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "Hizmetlerimiz | NivaArt Kurumsal Platformu",
  description: "0 TDS deiyonize saf su ile panel temizliği, robotik temizleme çözümleri ve periyodik GES bakım hizmetlerimizi inceleyin.",
};

export default function HizmetlerPage() {
  const services = [
    {
      title: "Güneş Paneli Temizliği",
      description: "0 TDS deiyonize saf su arıtma sistemlerimiz ile panellerin üzerinde kireç, mineral veya su lekesi kalmadan temizlik yapıyoruz. Kimyasal deterjanlar panellerin sızdırmazlık contalarına ve alüminyum çerçevelerine zarar verir; bu nedenle yalnızca saf su ile yıkama gerçekleştiriyoruz.",
      features: [
        "Sıfır mineral (0 TDS) ile lekesiz kuruma",
        "Kimyasal deterjan ve çözücü içermez",
        "Panelleri çizmeyecek özel fırçalar",
        "Sıcaklık farkı çatlamalarını önlemek için erken saatte yıkama"
      ],
      icon: <Droplet className="w-8 h-8 text-brand-primary" />,
      badge: "En Popüler"
    },
    {
      title: "Robotik Temizleme Çözümleri",
      description: "Endüstriyel çatı GES'leri ve geniş arazi güneş enerji santralleri için uzaktan kumandalı paletli temizlik robotları kullanıyoruz. Bu sayede panellerin üzerine basılmasını önlüyor, micro-cracks (mikro çatlak) oluşum riskini tamamen ortadan kaldırıyoruz.",
      features: [
        "Ağırlık dağıtımlı palet yapısı",
        "Uzaktan kumandalı hassas sürüş kontrolü",
        "Geniş alanlarda yüksek hız ve verimlilik",
        "İSG kurallarına tam uyumlu çatı operasyonları"
      ],
      icon: <Cpu className="w-8 h-8 text-brand-primary" />,
      badge: "İleri Teknoloji"
    },
    {
      title: "Mobil Saf Su Üretim Sistemleri",
      description: "Operasyon bölgelerimize kurduğumuz mobil ters ozmos ve deiyonizasyon (DI) filtreleme ünitelerimiz ile şebeke veya kuyu suyunu anında saf suya dönüştürüyoruz. Bu sayede suyun ulaştırılmasının zor olduğu arazilerde dahi yüksek standartta temizlik sağlıyoruz.",
      features: [
        "Yerinde anlık saf su filtrasyonu",
        "Çift kademeli ters ozmos ve reçine sistemi",
        "0-1 TDS arası su kalitesi garantisi",
        "Büyük hacimli su depolama ve lojistiği"
      ],
      icon: <Layers className="w-8 h-8 text-brand-primary" />,
      badge: "Mobil Altyapı"
    },
    {
      title: "Periyodik Bakım ve Temizlik Planları",
      description: "Toz, polen, endüstriyel kirlilik ve kuş pislikleri gibi faktörler bölgesel olarak farklılık gösterir. Santralinizin bulunduğu bölgeye özel kirlilik periyotlarını çıkarıyor ve yıllık plan dahilinde periyodik temizlik hizmetleri sunuyoruz.",
      features: [
        "Yıllık 2 veya 4 periyotlu temizlik planları",
        "Kirlilik oranı ve verim kaybı takibi",
        "Planlı temizliklerde indirimli fiyat avantajı",
        "Öncelikli operasyonel planlama"
      ],
      icon: <Calendar className="w-8 h-8 text-brand-primary" />,
      badge: "Yıllık Anlaşma"
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. PAGE HEADER */}
      <section className="relative pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200/50 dark:border-zinc-900/50 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
            <span>Ne Sunuyoruz?</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Hizmetlerimiz</h1>
          <p className="text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            Güneş panellerinizin ömrünü uzatan, performans garantili profesyonel temizleme yöntemlerimiz.
          </p>
        </div>
      </section>

      {/* 2. SERVICES LIST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="space-y-16">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center border border-zinc-200/60 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-14 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl hover:border-brand-primary/30 dark:hover:border-brand-primary/30 transition-all duration-500 transform hover:-translate-y-1 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 flex items-center justify-center shrink-0 border border-brand-primary/10">
                      {service.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-brand-secondary uppercase tracking-widest bg-brand-secondary/10 px-3 py-1 rounded-full border border-brand-secondary/10">
                        {service.badge}
                      </span>
                      <h2 className="text-2xl font-bold mt-1 text-zinc-900 dark:text-white">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-zinc-650 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>

                  <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                      Hizmet Detayları ve Standartları
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                          <span className="w-5 h-5 rounded-full bg-brand-secondary/15 border border-brand-secondary/25 flex items-center justify-center text-brand-secondary shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FAQ ACCORDIONS */}
      <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950/20 border-t border-b border-zinc-200/50 dark:border-zinc-900/50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight">Sıkça Sorulan Sorular</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
              Güneş paneli temizliği hakkında aklınıza takılabilecek temel sorular ve yanıtları.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 hover:shadow-lg hover:border-brand-primary/20 transition-all">
              <h3 className="text-base sm:text-lg font-bold flex gap-3.5 items-center text-zinc-900 dark:text-white mb-3 leading-snug">
                <HelpCircle className="w-5.5 h-5.5 text-brand-primary shrink-0" />
                Neden Musluk Suyu veya Kuyu Suyu Kullanmıyorsunuz?
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed pl-9">
                Normal şebeke veya kuyu suları yüksek oranda kalsiyum, magnezyum ve klor barındırır. Bu suyla paneller yıkandığında ve kuruduğunda, yüzeyde kireç ve mineral tortusu tabakası kalır. Bu durum panel verimini daha da düşürdüğü gibi kalıcı gölgelenmelere ve hücre bozulmalarına (hot-spot) sebep olur.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 hover:shadow-lg hover:border-brand-primary/20 transition-all">
              <h3 className="text-base sm:text-lg font-bold flex gap-3.5 items-center text-zinc-900 dark:text-white mb-3 leading-snug">
                <HelpCircle className="w-5.5 h-5.5 text-brand-primary shrink-0" />
                Paneller Ne Sıklıkla Temizlenmelidir?
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed pl-9">
                Panellerin bulunduğu bölgeye (tarım arazisi, sanayi bölgesi, şehir merkezi, otoyol kenarı) bağlı olarak yılda en az 2, ideal olarak ise 4 defa temizlenmesi önerilir. Bahar geçişlerinde ve yoğun tozlanma dönemlerinde temizlik verimliliği doğrudan etkiler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/10 -z-10" />
          <div className="space-y-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-extrabold tracking-tight">Hemen Fiyat Teklifi Alın</h3>
            <p className="text-zinc-455 text-sm sm:text-base leading-relaxed">
              Tesisinizin kurulu gücünü (kWp/MWp) ve konumunu bize iletin, size özel temizlik planı ve bütçe çalışmasını hazırlayalım.
            </p>
            <div className="pt-4">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-base transition-colors shadow-lg shadow-brand-primary/25 cursor-pointer"
              >
                <span>Teklif İste</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
