"use client"

import { Gamepad2, Github, Linkedin, Mail, Heart } from "lucide-react"

const navLinks = [
  { label: "Games", href: "#games" },
  { label: "Tools", href: "#tools" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border bg-card px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4 md:items-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 transition-transform hover:scale-105"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all group-hover:rotate-12">
                <Gamepad2 className="h-5 w-5" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Yvan<span className="text-primary">.</span>dev
              </span>
            </button>
            <p className="max-w-xs text-center text-sm text-muted-foreground md:text-left">
              Indie game developer crafting immersive experiences and developer tools.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigate</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:flex-col md:items-start md:justify-start md:gap-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary md:text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center gap-3 md:items-start">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Connect</h3>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/yvan-richani/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/richani-yvan/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:richani.yvan@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              {new Date().getFullYear()} Yvan Al Richani. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Crafted with <Heart className="h-3 w-3 text-destructive" fill="hsl(var(--destructive))" /> by{" "}
              <a
                href="https://devitty.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Devitty
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
