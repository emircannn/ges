import React from "react";
import Link from "next/link";
import { getHomepageContents } from "@/app/actions";
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  ArrowRight,
  Sparkles,
  Leaf
} from "lucide-react";

export const metadata = {
  title: "Hakkımızda | NivaArt Kurumsal Platformu",
  description: "NivaArt olarak yenilenebilir enerji yatırımlarınızın değerini koruyor ve performansını zirveye taşıyoruz.",
};

export const dynamic = "force-dynamic";

export default async function HakkimizdaPage() {
  const contents = await getHomepageContents();
  const aboutText = contents.about_text || "NivaArt Kurumsal Platformu olarak, yenilenebilir enerji yatırımlarınızın değerini koruyor ve performansını zirveye taşıyoruz. Özel 0 TDS saf su deiyonizasyon teknolojimiz ve alanında uzman ekibimizle, güneş panellerinize zarar vermeden en inatçı kirleri ve toz tabakalarını arındırıyoruz. Enerji santrallerinizin ömrünü uzatıyor, verimlilik kayıplarını minimuma indiriyoruz.";

  const values = [
    {
      title: "Güvenilirlik ve Şeffaflık",
      description: "Tüm operasyonlarımızda ölçülebilir sonuçlar sunuyor, temizlik öncesi ve sonrası verileri detaylı raporlarla şeffaf bir şekilde paylaşıyoruz.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-primary" />
    },
    {
      title: "Maksimum Verimlilik",
      description: "GES santrallerinizin üretim kapasitesini optimize etmek için en gelişmiş teknolojileri ve saf su arıtma sistemlerini kullanıyoruz.",
      icon: <Activity className="w-6 h-6 text-brand-primary" />
    },
    {
      title: "Çevre Dostu Yaklaşım",
      description: "Temizlik süreçlerimizde kesinlikle kimyasal madde kullanmıyoruz. Sadece 0 TDS saf su kullanarak doğaya ve panellere zarar vermiyoruz.",
      icon: <Leaf className="w-6 h-6 text-brand-primary" />
    },
    {
      title: "Profesyonel Kadro",
      description: "Çatı ve arazi kurulumlarında iş güvenliği (İSG) kurallarına sıkı sıkıya bağlı, eğitimli ve sertifikalı ekiplerle çalışıyoruz.",
      icon: <Users className="w-6 h-6 text-brand-primary" />
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. PAGE HEADER WITH MESH GRADIENTS */}
      <section className="relative pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200/50 dark:border-zinc-900/50 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-30%] left-[10%] w-[80%] h-[80%] rounded-full bg-brand-primary/5 blur-[120px] dark:bg-brand-primary/5" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
            <span>Biz Kimiz?</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Hakkımızda</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            Güneş paneli temizliğinde ve verimlilik danışmanlığında profesyonel, teknolojik ve çevreci çözümler.
          </p>
        </div>
      </section>

      {/* 2. MAIN STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column visual grid */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="aspect-[4/3] rounded-[2rem] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden shadow-xl border border-zinc-200/60 dark:border-zinc-800 group">
              <div className="absolute inset-0 bg-zinc-950/20 z-10 group-hover:opacity-10 transition-opacity" />
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600"
                alt="Solar Cleaning Office"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-5 space-y-1 hover:shadow-lg hover:border-brand-primary/20 transition-all text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-primary">%30</div>
                <p className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">Verim Artışı</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-5 space-y-1 hover:shadow-lg hover:border-brand-primary/20 transition-all text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-primary">100%</div>
                <p className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">Doğa Dostu</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-5 space-y-1 hover:shadow-lg hover:border-brand-primary/20 transition-all text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-brand-primary">500+</div>
                <p className="text-[10px] sm:text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none">GES Projesi</p>
              </div>
            </div>
          </div>

          {/* Right Column story text */}
          <div className="space-y-6 lg:pt-2 animate-fade-in-up animation-delay-100">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Geleceğin Enerjisini Bugün Koruyoruz
            </h2>
            <div className="text-zinc-650 dark:text-zinc-350 space-y-5 text-sm sm:text-base leading-relaxed">
              {aboutText.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-8 border-t border-zinc-250/60 dark:border-zinc-800 mt-6">
              <blockquote className="border-l-4 border-brand-primary pl-4 py-1.5 italic text-zinc-500 dark:text-zinc-450 text-sm sm:text-base">
                {"\"Temiz panel, verimli gelecek. Yenilenebilir enerji kaynaklarının sürdürülebilirliğini sağlamak ve maksimum performansa ulaşmasını desteklemek en temel misyonumuzdur.\""}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950/20 border-t border-b border-zinc-200/50 dark:border-zinc-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Değerlerimiz ve Prensiplerimiz</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
              Çözüm ortaklarımıza hizmet sunarken bağlı kaldığımız temel değerlerimiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-6 md:p-8 flex gap-6 hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 flex items-center justify-center shrink-0 border border-brand-primary/10 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{value.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/10 -z-10" />
          <div className="space-y-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-extrabold tracking-tight">Bizimle Çalışmak İster misiniz?</h3>
            <p className="text-zinc-450 text-sm sm:text-base leading-relaxed">
              Güneş enerji santrallerinizin periyodik temizlik planlamasını yapalım ve verimlilik oranlarınızı takip edelim.
            </p>
            <div className="pt-4">
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-base transition-colors shadow-lg shadow-brand-primary/25 cursor-pointer"
              >
                <span>Hemen Teklif Alın</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
