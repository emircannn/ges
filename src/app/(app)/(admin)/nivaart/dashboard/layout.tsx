"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Package,
  Image as ImageIcon,
  Home,
  Mail,
  LogOut,
  Menu,
  X,
  User,
  ExternalLink,
  Settings,
  Users,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { toast } from "@/components/ui/toast";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const [notificationCount, setNotificationCount] = useState(0);

  // Statically mock admin session for demo layout
  const user = {
    email: "admin@admin.com",
    role: "ADMIN",
    manageBlogs: true,
    manageProducts: true,
    manageGallery: true,
    manageMessages: true,
    manageSettings: true,
  };
  const userEmail = user.email;
  const userRole = user.role;
  const userManageMessages = user.manageMessages;
  const isAdmin = true;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and unlock audio on first click/keypress to bypass browser autoplay policies
  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current) {
        const audio = new Audio("/sounds/notification.wav");
        audio.volume = 0; // Play silently
        audio.play().then(() => {
          audio.pause();
          audio.volume = 1; // Restore volume
          audioRef.current = audio;
          console.log("Real-time notification audio context unlocked successfully.");
        }).catch((err) => {
          console.warn("Failed to pre-unlock audio context:", err);
        });
      }
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  // SSE Notifications listener
  useEffect(() => {
    if (!userEmail) return;
    const canManageMessages = userRole === "ADMIN" || userManageMessages;
    if (!canManageMessages) return;

    const eventSource = new EventSource("/api/notifications/sse");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Real-time notification received:", data);
        
        // Play notification audio (using preloaded ref or fallback)
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch((err) => {
            console.log("Audio play failed on unlocked ref:", err);
          });
        } else {
          const audio = new Audio("/sounds/notification.wav");
          audio.play().catch((err) => {
            console.log("Audio play blocked on fallback:", err);
          });
        }

        // Increment count
        setNotificationCount((prev) => prev + 1);
        toast.info(`Yeni Mesaj: ${data.name} - ${data.subject}`);
      } catch (err) {
        console.error("Error parsing notification:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, [userEmail, userRole, userManageMessages]);

  // Reset notifications if viewing submissions
  useEffect(() => {
    if (pathname === "/nivaart/dashboard/submissions" && notificationCount !== 0) {
      const timer = setTimeout(() => {
        setNotificationCount(0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, notificationCount]);

  // Filter sidebar navigation items based on user role and toggled permissions
  const navItems = [
    { name: "Genel Bakış", href: "/nivaart/dashboard", icon: LayoutDashboard, show: true },
    { name: "Profil Ayarlarım", href: "/nivaart/dashboard/profile", icon: User, show: true },
    { name: "Blog Yönetimi", href: "/nivaart/dashboard/blog", icon: FileText, show: isAdmin || user?.manageBlogs },
    { name: "Ürün Yönetimi", href: "/nivaart/dashboard/products", icon: Package, show: isAdmin || user?.manageProducts },
    { name: "Galeri Yönetimi", href: "/nivaart/dashboard/gallery", icon: ImageIcon, show: isAdmin || user?.manageGallery },
    { name: "Anasayfa İçerik", href: "/nivaart/dashboard/homepage", icon: Home, show: isAdmin || user?.manageSettings },
    { name: "Gelen Mesajlar", href: "/nivaart/dashboard/submissions", icon: Mail, show: isAdmin || user?.manageMessages },
    { name: "Kullanıcı Yönetimi", href: "/nivaart/dashboard/users", icon: Users, show: isAdmin },
    { name: "Sistem Ayarları", href: "/nivaart/dashboard/settings", icon: Settings, show: isAdmin || user?.manageSettings },
  ].filter((item) => item.show);

  const currentNavName = navItems.find((item) => item.href === pathname)?.name || "Yönetici Paneli";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground transition-colors duration-300">
      {/* Top Header Mobile */}
      <header className="flex md:hidden items-center justify-between h-16 px-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40">
        <Link href="/nivaart/dashboard" className="flex items-center gap-2 font-bold text-base">
          <img
            src="/logo.svg"
            alt="NivaArt Logo"
            className="w-7 h-7 object-contain"
          />
          <span className="tracking-tight font-extrabold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            NivaArt
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {notificationCount > 0 && (
            <Link
              href="/nivaart/dashboard/submissions"
              className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold animate-pulse"
            >
              {notificationCount}
            </Link>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-10 h-10"
            aria-label="Yönetici Menüsünü Aç/Kapat"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 md:sticky md:z-10 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
          style={{ height: "calc(100vh - 0px)" }}
        >
          <div>
            {/* Logo */}
            <div className="h-20 px-6 border-b border-zinc-200/50 dark:border-zinc-800/50 flex items-center justify-between">
              <Link href="/nivaart/dashboard" className="flex items-center gap-2 font-bold text-lg">
                <img
                  src="/logo.svg"
                  alt="NivaArt Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="tracking-tight font-extrabold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  NivaArt <span className="text-xs text-zinc-500 font-normal">CMS</span>
                </span>
              </Link>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-55"
                aria-label="Menüyü Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="px-6 py-4 flex items-center gap-3 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">
                  {userEmail || "Yönetici"}
                </p>
                <p className="text-xs text-zinc-555 truncate">
                  {isAdmin ? "Sistem Yöneticisi" : "Çalışan"}
                </p>
              </div>
            </div>

            {/* Navigation items */}
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                const isMessagesTab = item.href === "/nivaart/dashboard/submissions";
                const shouldBlink = isMessagesTab && notificationCount > 0;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-white bg-brand-primary shadow-md shadow-brand-primary/20"
                        : shouldBlink
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 animate-pulse"
                        : "text-zinc-655 dark:text-zinc-400 hover:text-brand-primary hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.name}</span>
                    {isMessagesTab && notificationCount > 0 && (
                      <span className="ml-auto w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold select-none animate-bounce">
                        {notificationCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/50 space-y-2">
            {/* View Site */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors duration-200"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-zinc-500" />
                Siteyi Görüntüle
              </span>
            </Link>

            {/* Log Out */}
            <button
              onClick={() => signOut({ callbackUrl: "/nivaart/login" })}
              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-rose-650 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-bold transition-colors duration-200 text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Girişi Kapat
            </button>
          </div>
        </aside>

        {/* Sidebar Overlay Mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          />
        )}

        {/* Page Content Panel */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Navbar Desktop */}
          <header className="hidden md:flex items-center justify-between h-20 px-8 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30">
            <h2 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-55">
              {currentNavName}
            </h2>
            <div className="flex items-center gap-4">
              {notificationCount > 0 && (
                <Link
                  href="/nivaart/dashboard/submissions"
                  className="relative p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 font-bold text-xs flex items-center gap-1.5 border border-rose-100 dark:border-rose-900/40 cursor-pointer animate-pulse animate-bounce"
                >
                  <Bell className="w-4 h-4 text-red-500" />
                  <span>Yeni Mesaj</span>
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {notificationCount}
                  </span>
                </Link>
              )}
              <ThemeToggle />
            </div>
          </header>

          {/* Children Viewport container */}
          <main className="flex-grow p-4 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
