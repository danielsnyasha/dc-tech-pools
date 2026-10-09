"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  // Placeholder matches the real control's box exactly so nothing shifts.
  if (!mounted) {
    return <div className="w-[58px] h-8 rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden />;
  }

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group relative inline-flex items-center w-[58px] h-8 rounded-full p-1
        transition-colors duration-300 ring-1
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
        focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950
        ${
          isDark
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 ring-violet-400/40"
            : "bg-slate-300 ring-violet-400/40"
        }`}
    >
      {/*
        The old toggle put a slate-300 moon on a slate-200 track, which was
        invisible. Now the thumb carries the ACTIVE icon so it always sits on
        white, and the track shows only the INACTIVE one -- on the side the
        thumb has vacated, so it never ends up hidden underneath.
      */}
      <Moon
        aria-hidden
        className={`absolute right-[8px] w-3.5 h-3.5 text-slate-600 transition-opacity duration-200
          ${isDark ? "opacity-0" : "opacity-80"}`}
      />
      <Sun
        aria-hidden
        className={`absolute left-[8px] w-3.5 h-3.5 text-amber-300 transition-opacity duration-200
          ${isDark ? "opacity-90" : "opacity-0"}`}
      />

      <span
        className={`relative z-10 grid place-items-center w-6 h-6 rounded-full bg-white
          shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out
          group-active:scale-95
          ${isDark ? "translate-x-[26px]" : "translate-x-0"}`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-violet-600" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-600" />
        )}
      </span>
    </button>
  );
}
