"use client";

import React, { useState } from "react";
import { createContactSubmission } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactFormProps {
  defaultSubject?: string;
}

export function ContactForm({ defaultSubject }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject || "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Basic Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError("Lütfen gerekli tüm alanları (Ad Soyad, E-posta, Konu, Mesaj) doldurunuz.");
      setIsLoading(false);
      return;
    }

    // Call Server Action
    const res = await createContactSubmission(formData);
    
    if (res.success) {
      setSuccess("Tebrikler! Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } else {
      setError(res.error || "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Response Banners */}
      {success && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl text-sm font-semibold flex items-start gap-3 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-450" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-450 rounded-2xl text-sm font-semibold flex items-start gap-3 animate-fade-in-up">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider block">
            Ad Soyad <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Örn: Ahmet Yılmaz"
            required
            className="w-full p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:shadow-[0_0_15px_rgba(13,91,168,0.08)] dark:focus:shadow-[0_0_15px_rgba(18,113,206,0.12)] transition-all duration-300 placeholder:text-zinc-400"
          />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider block">
            E-posta Adresi <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Örn: ahmet@sirket.com"
            required
            className="w-full p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:shadow-[0_0_15px_rgba(13,91,168,0.08)] dark:focus:shadow-[0_0_15px_rgba(18,113,206,0.12)] transition-all duration-300 placeholder:text-zinc-400"
          />
        </div>

        {/* Phone Input */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider block">
            Telefon Numarası
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Örn: +90 555 123 45 67"
            className="w-full p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:shadow-[0_0_15px_rgba(13,91,168,0.08)] dark:focus:shadow-[0_0_15px_rgba(18,113,206,0.12)] transition-all duration-300 placeholder:text-zinc-400"
          />
        </div>

        {/* Subject Input */}
        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider block">
            Konu <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Örn: 500 kW GES Temizlik Teklifi"
            required
            className="w-full p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:shadow-[0_0_15px_rgba(13,91,168,0.08)] dark:focus:shadow-[0_0_15px_rgba(18,113,206,0.12)] transition-all duration-300 placeholder:text-zinc-400"
          />
        </div>

      </div>

      {/* Message Textarea */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-bold text-zinc-550 dark:text-zinc-400 uppercase tracking-wider block">
          Mesajınız <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tesisinizin kurulu gücü, panellerin son temizlik tarihi, çatı veya arazi kurulumu gibi detayları ekleyebilirsiniz..."
          required
          className="w-full p-3.5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary focus:shadow-[0_0_15px_rgba(13,91,168,0.08)] dark:focus:shadow-[0_0_15px_rgba(18,113,206,0.12)] transition-all duration-300 placeholder:text-zinc-400 resize-y"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Gönderiliyor...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Mesajı Gönder</span>
            </>
          )}
        </Button>
      </div>

    </form>
  );
}
export default ContactForm;
