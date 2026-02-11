"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ExternalLink, Play, X, Monitor, Smartphone, ChevronLeft, ChevronRight, Images } from "lucide-react"
import { SectionHeader } from "./section-header"

interface Game {
  title: string
  description: string
  image: string
  gallery: string[]
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
    image: "/images/heavymorning-2.png",
    gallery: [
      "/images/heavymorning-2.png",
      "/images/heavymorning-3.png",
      "/images/heavymorning-4.png",
      "/images/heavymorning-5.png",
    ],
    platforms: [
      { name: "Steam", icon: "steam", url: "https://store.steampowered.com/app/3509400/A_Heavy_Morning/" },
    ],
    trailerUrl: "https://www.youtube.com/embed/IXHLSAUZwNE",
    tags: ["Narrative", "Atmospheric", "PC"],
    color: "168 80% 42%",
  },
  {
    title: "SweetStacks",
    description:
      "A deliciously fun stacking game where you pile up sweets as high as you can. Colorful, addictive, and satisfying gameplay for mobile.",
    image: "/images/sweetstacks-1.png",
    gallery: [
      "/images/sweetstacks-1.png",
      "/images/sweetstacks-2.png",
      "/images/sweetstacks-3.png",
    ],
    platforms: [
      { name: "Google Play", icon: "android", url: "https://play.google.com/store/apps/details?id=com.SunnyMoonProject.SweetStacksV2&hl=en" },
      { name: "App Store", icon: "ios", url: "https://apps.apple.com/us/app/sweet-stacks-stacking-game/id6749310384" },
    ],
    trailerUrl: "https://www.youtube.com/embed/ILWRH6wtkjo",
    tags: ["Casual", "Puzzle", "Mobile"],
    color: "32 95% 55%",
  },
  {
    title: "2121",
    description:
      "A futuristic puzzle game set in the year 2121. Navigate through neon-lit challenges in this visually stunning mobile experience.",
    image: "/images/2121-1.png",
    gallery: [
      "/images/2121-1.png",
      "/images/2121-2.png",
      "/images/2121-3.png",
      "/images/2121-4.png",
      "/images/2121-5.png",
      "/images/2121-6.png",
    ],
    platforms: [
      { name: "Google Play", icon: "android", url: "https://play.google.com/store/apps/details?id=com.beelabs.project21&hl=en_AU" },
      { name: "App Store", icon: "ios", url: "https://apps.apple.com/us/app/2121-game/id6474293851" },
    ],
    trailerUrl: "https://www.youtube.com/embed/vIQqKejDGpM",
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
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % game.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + game.gallery.length) % game.gallery.length)
  }

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
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-foreground/0 transition-all duration-300 group-hover:bg-foreground/30">
              {game.trailerUrl && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex h-16 w-16 translate-y-4 items-center justify-center rounded-full bg-primary/90 text-primary-foreground opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 hover:bg-primary"
                  aria-label={`Play ${game.title} trailer`}
                >
                  <Play className="ml-1 h-7 w-7" fill="currentColor" />
                </button>
              )}
              <button
                onClick={() => setShowGallery(true)}
                className="flex h-16 w-16 translate-y-4 items-center justify-center rounded-full bg-secondary/90 text-secondary-foreground opacity-0 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 hover:bg-secondary"
                aria-label={`View ${game.title} gallery`}
              >
                <Images className="h-7 w-7" />
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

          {/* Gallery Thumbnails */}
          <div className="border-t border-border bg-secondary/30 p-2 sm:p-3">
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide">
              {game.gallery.slice(0, 6).map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentImageIndex(i)
                    setShowGallery(true)
                  }}
                  className="relative h-14 w-20 sm:h-16 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 border-border transition-all hover:border-primary hover:scale-105"
                >
                  <Image
                    src={img}
                    alt={`${game.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
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
      {showTrailer && game.trailerUrl && (
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
              <iframe
                src={game.trailerUrl}
                title={`${game.title} trailer`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGallery && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
          onClick={() => setShowGallery(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowGallery(false)
            if (e.key === "ArrowLeft") prevImage()
            if (e.key === "ArrowRight") nextImage()
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${game.title} gallery`}
        >
          <div
            className="relative w-full max-w-5xl animate-bounce-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-background">
                {game.title} - Gallery ({currentImageIndex + 1}/{game.gallery.length})
              </h3>
              <button
                onClick={() => setShowGallery(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 text-background backdrop-blur-sm transition-colors hover:bg-background/20"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl bg-background shadow-2xl">
              <Image
                src={game.gallery[currentImageIndex]}
                alt={`${game.title} screenshot ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />

              {/* Navigation arrows */}
              {game.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
              {game.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105 ${
                    i === currentImageIndex
                      ? "border-primary ring-2 ring-primary/50"
                      : "border-background/30 hover:border-background/60"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${game.title} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function GamesSection() {
  return (
    <section id="games" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/0.03),_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          badge="Player One Ready"
          title="Games I've Built"
          description="From atmospheric PC experiences to addictive mobile games, each project is crafted with passion and attention to detail."
        />

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
            <GameCard key={game.title} game={game} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
