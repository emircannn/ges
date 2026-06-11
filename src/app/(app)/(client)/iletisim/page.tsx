import React from "react";
import { ContactForm } from "@/components/client/ContactForm";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles,
  ShieldCheck
} from "lucide-react";
import type { Metadata } from "next";
import { getSettings } from "@/app/actions";

export const metadata: Metadata = {
  title: "İletişim | NivaArt Kurumsal Platformu",
  description: "Sanat, tasarım ve yaratıcı projeleriniz için ücretsiz keşif ve teklif almak için bizimle iletişime geçin.",
};

interface IletisimPageProps {
  searchParams: Promise<{
    subject?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function IletisimPage({ searchParams }: IletisimPageProps) {
  const { subject } = await searchParams;
  const settings = await getSettings();

  const phone = settings?.phone || "+90 555 123 4567";
  const email = settings?.email || "info@nivaart.com";
  const address = settings?.address || "NivaArt Plaza, No:12, Kadıköy, İstanbul";
  const workingHours = settings?.workingHours || "Pazartesi - Cumartesi: 09:00 - 19:00";

  const contactInfos = [
    {
      title: "Telefon",
      value: phone,
      href: `tel:${phone.replace(/\s+/g, "")}`,
      icon: <Phone className="w-5 h-5 text-brand-primary" />,
      desc: "İletişime geçmek için arayın."
    },
    {
      title: "E-posta",
      value: email,
      href: `mailto:${email}`,
      icon: <Mail className="w-5 h-5 text-brand-primary" />,
      desc: "Teklif talepleri için mail atabilirsiniz."
    },
    {
      title: "Adres",
      value: address,
      href: "https://maps.google.com",
      icon: <MapPin className="w-5 h-5 text-brand-primary" />,
      desc: "Ofisimizi ziyaret edebilirsiniz."
    },
    {
      title: "Çalışma Saatleri",
      value: workingHours,
      icon: <Clock className="w-5 h-5 text-brand-primary" />,
      desc: "Hizmet ve çalışma saatlerimiz."
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      
      {/* 1. PAGE HEADER */}
      <section className="relative pt-24 pb-20 bg-zinc-50 dark:bg-zinc-950/20 border-b border-zinc-200/50 dark:border-zinc-900/50 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-brand-primary/5 blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-brand-secondary animate-pulse" />
            <span>Bizimle Görüşün</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">İletişim</h1>
          <p className="text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto font-medium text-sm sm:text-base leading-relaxed">
            Güneş enerji santraliniz için keşif talebi oluşturabilir veya fiyat teklifi isteyebilirsiniz.
          </p>
        </div>
      </section>

      {/* 2. MAIN GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="space-y-6 lg:col-span-1">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold tracking-tight">İletişim Bilgilerimiz</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Sorularınız, iş ortaklığı talepleriniz ve teknik destek için her zaman yanınızdayız.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {contactInfos.map((info, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-5 flex gap-4 shadow-sm hover:shadow-lg hover:border-brand-primary/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/10 flex items-center justify-center shrink-0">
                    {info.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">{info.title}</h3>
                    {info.href ? (
                      <a 
                        href={info.href} 
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white hover:text-brand-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                        {info.value}
                      </span>
                    )}
                    <p className="text-zinc-455 text-xs font-medium">{info.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Satisfaction Banner */}
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-250/20 dark:border-zinc-800 rounded-[2rem] p-6 space-y-3 shadow-sm hover:border-brand-primary/20 transition-colors">
              <div className="flex items-center gap-2.5 text-brand-primary font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-brand-secondary shrink-0 animate-pulse" />
                <span>%100 Güvenli İşçilik</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                Temizlik ve bakım operasyonlarımızın tamamı üçüncü şahıs mali mesuliyet sigortası altındadır. Panelleriniz uzman mühendis güvencesiyle temizlenir.
              </p>
            </div>
          </div>

          {/* Right Column: Submission Form */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-[2.5rem] p-6 sm:p-10 shadow-sm lg:col-span-2 space-y-6 hover:shadow-xl hover:border-brand-primary/10 transition-all duration-300">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold tracking-tight">İletişim Formu</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Aşağıdaki formu doldurarak bizlere anında mesaj gönderebilirsiniz. En geç 24 saat içinde yanıt vereceğiz.
              </p>
            </div>

            <ContactForm key={subject || "default"} defaultSubject={subject} />
          </div>

        </div>
      </section>
    </main>
  );
}
