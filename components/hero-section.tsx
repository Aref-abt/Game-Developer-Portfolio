"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Github, Linkedin, Mail, ChevronDown, Sparkles } from "lucide-react"

const roles = ["Game Developer", "Tool Creator", "Award Winner", "Indie Dev"]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:px-6">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute left-[10%] top-[20%] hidden h-64 w-64 animate-float rounded-full bg-primary/5 sm:block" />
        <div className="absolute right-[15%] top-[30%] hidden h-40 w-40 animate-float-slow rounded-full bg-accent/5 sm:block" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[20%] left-[20%] hidden h-32 w-32 animate-float rounded-full bg-primary/3 sm:block" style={{ animationDelay: "4s" }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          {/* Left content */}
          <div
            className={`flex-1 text-center transition-all duration-1000 lg:text-left ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Greeting badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Welcome to my world</span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-balance">{"Hi, I'm"}</span>
              <br />
              <span className="relative inline-block text-primary">
                Yvan Richani
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C50 4 150 2 298 6" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                </svg>
              </span>
            </h1>

            {/* Rotating role */}
            <div className="mt-6 h-10 overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${currentRole * 40}px)` }}
              >
                {roles.map((role) => (
                  <div key={role} className="flex h-10 items-center justify-center text-xl font-medium text-muted-foreground lg:justify-start">
                    {role}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground lg:text-lg">
              I craft immersive gaming experiences and powerful dev tools. 
              From award-winning indie titles to open-source utilities, 
              I bring ideas to life through code and creativity.
            </p>

            {/* Social links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/yvan-richani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/10 sm:h-12 sm:w-12"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href="https://github.com/richani-yvan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/10 sm:h-12 sm:w-12"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
                <a
                  href="mailto:richani.yvan@gmail.com"
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/10 sm:h-12 sm:w-12"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
              <a
                href="/Yvan Richani CV.pdf"
                download="Yvan Richani CV.pdf"
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 sm:ml-1 sm:px-6 sm:py-3"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Right - Avatar */}
          <div
            className={`relative flex-shrink-0 transition-all delay-300 duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="animate-pulse-glow relative h-56 w-56 overflow-hidden rounded-3xl border-2 border-primary/20 sm:h-72 sm:w-72 lg:h-96 lg:w-96">
              <Image
                src="/images/yvan.png"
                alt="Yvan Richani - Game Developer"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating badge */}
            <div className="animate-float absolute -bottom-3 -right-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-xl sm:-bottom-4 sm:-right-4 sm:px-4 sm:py-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary sm:h-3 sm:w-3" />
                <span className="text-xs font-semibold text-foreground sm:text-sm">Available for work</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="animate-wiggle absolute -left-3 -top-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg sm:-left-6 sm:-top-6 sm:h-14 sm:w-14">
              <span className="text-sm sm:text-xl">{'{ }'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => document.querySelector("#games")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll to games"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </button>
    </section>
  )
}
