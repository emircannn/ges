"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Anasayfa", href: "/" },
  { name: "Hizmetler", href: "/hizmetler" },
  { name: "Danışmanlık", href: "/danismanlik" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Blog", href: "/blog" },
  { name: "Ürünler", href: "/urunler" },
  { name: "Galeri", href: "/galeri" },
  { name: "İletişim", href: "/iletisim" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll event for glassmorphism styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav when pathname changes during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl sm:text-2xl">
              <img
                src="/logo.svg"
                alt="NivaArt Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
              <span className="tracking-tight font-extrabold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                NivaArt
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-brand-primary bg-brand-primary/10 dark:bg-brand-primary/20"
                      : "text-zinc-600 dark:text-zinc-300 hover:text-brand-primary hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions (Theme Switcher + Contact CTA Button) */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/iletisim"
              className="px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold shadow-md shadow-brand-primary/20 transition-all duration-200"
            >
              Teklif Al
            </Link>
          </div>

          {/* Mobile Actions Menu (Hamburger Button + Theme Toggle) */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full"
              aria-label="Menüyü Aç/Kapat"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-brand-primary bg-brand-primary/10 dark:bg-brand-primary/20"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-brand-primary hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 px-4">
            <Link
              href="/iletisim"
              className="block w-full py-3 text-center rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold shadow-md shadow-brand-primary/10 transition-all duration-200"
            >
              Teklif Al
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
