import React from "react";
import { Header } from "@/components/client/Header";
import { Footer } from "@/components/client/Footer";
import { WhatsAppWidget } from "@/components/client/WhatsAppWidget";
import { getSettings } from "@/app/actions";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const settings = await getSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow pt-16 sm:pt-20">
        {children}
      </div>
      <Footer />
      <WhatsAppWidget phone={settings?.whatsapp} />
    </div>
  );
}
