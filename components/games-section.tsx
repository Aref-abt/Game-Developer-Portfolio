"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink, Play, X, Monitor, Smartphone } from "lucide-react"
import { SectionHeader } from "./section-header"

interface Game {
  title: string
  description: string
  image: string
  platforms: { name: string; icon: "steam" | "android" | "ios"; url: string }[]
  trailerUrl?: string
  tags: string[]
  color: string
}

const games: Game[] = [
  {
    title: "A Heavy Morning",
    description:
      "An atmospheric narrative experience exploring the weight of everyday moments. Available on Steam with a cinematic trailer that captures the mood.",
    image: "/images/game-heavy-morning.jpg",
    platforms: [
      { name: "Steam", icon: "steam", url: "#" },
    ],
    trailerUrl: "#",
    tags: ["Narrative", "Atmospheric", "PC"],
    color: "168 80% 42%",
  },
  {
    title: "SweetStacks",
    description:
      "A deliciously fun stacking game where you pile up sweets as high as you can. Colorful, addictive, and satisfying gameplay for mobile.",
    image: "/images/game-sweetstacks.jpg",
    platforms: [
      { name: "Google Play", icon: "android", url: "#" },
      { name: "App Store", icon: "ios", url: "#" },
    ],
    trailerUrl: "#",
    tags: ["Casual", "Puzzle", "Mobile"],
    color: "32 95% 55%",
  },
  {
    title: "2121",
    description:
      "A futuristic puzzle game set in the year 2121. Navigate through neon-lit challenges in this visually stunning mobile experience.",
    image: "/images/game-2121.jpg",
    platforms: [
      { name: "Google Play", icon: "android", url: "#" },
      { name: "App Store", icon: "ios", url: "#" },
    ],
    trailerUrl: "#",
    tags: ["Sci-Fi", "Puzzle", "Mobile"],
    color: "200 80% 50%",
  },
]

function PlatformIcon({ icon }: { icon: "steam" | "android" | "ios" }) {
  if (icon === "steam") return <Monitor className="h-4 w-4" />
  return <Smartphone className="h-4 w-4" />
}

function GameCard({ game, index }: { game: Game; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={ref}
        className={`group relative transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-2xl"
          style={{
            boxShadow: isHovered
              ? `0 25px 60px -12px hsla(${game.color}, 0.2)`
              : undefined,
          }}
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={game.image || "/placeholder.svg"}
              alt={`${game.title} game screenshot`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/30">
              <button
                onClick={() => setShowTrailer(true)}
                className="flex h-16 w-16 translate-y-4 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary"
                aria-label={`Play ${game.title} trailer`}
              >
                <Play className="ml-1 h-7 w-7" fill="currentColor" />
              </button>
            </div>
            {/* Tags */}
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-foreground/70 px-3 py-1 text-xs font-medium text-background backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">{game.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{game.description}</p>

            {/* Platforms */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {game.platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <PlatformIcon icon={platform.icon} />
                  {platform.name}
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              ))}
              {game.trailerUrl && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium text-primary transition-all hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-md"
                >
                  <Play className="h-3 w-3" fill="currentColor" />
                  Watch Trailer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setShowTrailer(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowTrailer(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${game.title} trailer`}
        >
          <div
            className="relative w-full max-w-4xl animate-bounce-in overflow-hidden rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6 sm:py-4">
              <h3 className="font-heading text-lg font-bold text-foreground">
                {game.title} - Trailer
              </h3>
              <button
                onClick={() => setShowTrailer(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close trailer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-foreground/5">
              {/* Placeholder for YouTube embed - will be replaced with actual trailer URL */}
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground">
                <Play className="h-16 w-16 opacity-30" />
                <p className="text-sm">Trailer video will be embedded here</p>
                <p className="text-xs opacity-60">YouTube embed coming soon</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function GamesSection() {
  return (
    <section id="games" className="relative px-4 py-20 sm:px-6 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.03),_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          badge="Player One Ready"
          title="Games I've Built"
          description="From atmospheric PC experiences to addictive mobile games, each project is crafted with passion and attention to detail."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
            <GameCard key={game.title} game={game} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
