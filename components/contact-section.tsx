"use client"

import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, Send, ArrowUpRight } from "lucide-react"

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.05),_transparent_60%)]" />

      <div
        ref={ref}
        className={`relative mx-auto max-w-4xl transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:rounded-[2rem]">
          <div className="relative p-5 sm:p-8 md:p-16">
            {/* Decorative corners - hidden on small screens */}
            <div className="absolute left-6 top-6 hidden h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-primary/20 sm:block" />
            <div className="absolute right-6 top-6 hidden h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-primary/20 sm:block" />
            <div className="absolute bottom-6 left-6 hidden h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-primary/20 sm:block" />
            <div className="absolute bottom-6 right-6 hidden h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-primary/20 sm:block" />

            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                <Send className="h-4 w-4" />
                Get in Touch
              </div>

              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
                {"Let's Build Something"}
                <br />
                <span className="text-primary">Amazing Together</span>
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
                Got a project idea, collaboration opportunity, or just want to chat about games? 
                {"I'd love to hear from you."}
              </p>

              {/* Contact cards */}
              <div className="mt-8 grid gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3">
                <a
                  href="mailto:richani.yvan@gmail.com"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                    <p className="mt-1 truncate text-sm font-semibold text-foreground">richani.yvan@gmail.com</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary" />
                </a>

                <a
                  href="https://www.linkedin.com/in/yvan-richani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <Linkedin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">LinkedIn</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">Yvan Richani</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary" />
                </a>

                <a
                  href="https://github.com/richani-yvan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6">
                    <Github className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">GitHub</p>
                    <p className="mt-1 text-sm font-semibold text-foreground">richani-yvan</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
