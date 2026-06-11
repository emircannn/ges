"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9" aria-label="Temayı değiştir">
        <span className="sr-only">Temayı değiştir</span>
        <div className="w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      </Button>
    );
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 relative hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors duration-200"
      aria-label="Temayı değiştir"
    >
      <span className="sr-only">Temayı değiştir</span>
      {isDark ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500 transition-all duration-300 rotate-0 scale-100" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-brand-primary transition-all duration-300 rotate-0 scale-100" />
      )}
    </Button>
  );
}
export default ThemeToggle;
