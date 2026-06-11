"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Lütfen e-posta adresinizi ve şifrenizi doldurun.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        router.replace("/nivaart/dashboard");
      }
    } catch {
      setError("Bir bağlantı hatası oluştu. Lütfen tekrar deneyin.");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6 text-foreground bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none space-y-6">
        {/* Header / Brand */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Link href="/">
              <img
                src="/logo.svg"
                alt="NivaArt Logo"
                className="w-16 h-16 object-contain hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Yönetici Girişi</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            NivaArt Kurumsal Yönetim Paneli
          </p>
        </div>

        {/* Error notification block */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
              E-posta
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="E-posta adresinizi girin"
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200"
              required
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-xl font-bold shadow-md shadow-brand-primary/20 transition-all duration-200 flex justify-center items-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Giriş yapılıyor...
              </>
            ) : (
              "Giriş Yap"
            )}
          </Button>
        </form>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-brand-primary transition-colors"
          >
            &larr; Web sitesine geri dön
          </Link>
        </div>
      </div>
    </main>
  );
}
