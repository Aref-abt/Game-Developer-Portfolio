"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card" aria-hidden="true">
        <div className="h-5 w-5" />
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-border bg-card text-foreground shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative h-5 w-5">
        {/* Sun icon - visible in dark mode, rotates/fades out */}
        <Sun
          className={`absolute inset-0 h-5 w-5 text-accent transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        {/* Moon icon - visible in light mode, rotates/fades out */}
        <Moon
          className={`absolute inset-0 h-5 w-5 text-primary transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </div>

      {/* Hover glow ring */}
      <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 ring-2 ring-primary/20 transition-opacity group-hover:opacity-100" />
    </button>
  )
}
