"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Github, ExternalLink, Wrench, Clock, ArrowUpRight } from "lucide-react"
import { SectionHeader } from "./section-header"

interface Tool {
  title: string
  description: string
  image: string
  githubUrl?: string
  status: "released" | "coming-soon"
  tags: string[]
}

const tools: Tool[] = [
  {
    title: "Advanced Camera Tools",
    description:
      "A powerful, flexible camera system for Unity that provides advanced camera behaviors, smooth transitions, and cinematic capabilities out of the box. Perfect for any game genre.",
    image: "/images/tool-camera.jpg",
    githubUrl: "https://github.com/richani-yvan/",
    status: "released",
    tags: ["Unity", "C#", "Open Source", "Camera System"],
  },
  {
    title: "Flexible Weighted Probability System",
    description:
      "An elegant solution for weighted random selection in games. Configure probability distributions with an intuitive API, perfect for loot tables, spawn systems, and procedural generation.",
    image: "/images/tool-probability.jpg",
    status: "coming-soon",
    tags: ["Unity", "C#", "Probability", "Game Systems"],
  },
]

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

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
        style={{ transitionDelay: `${index * 200}ms` }}
      >
        <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 sm:rounded-3xl md:flex-row">
          {/* Image */}
          <button
            onClick={() => setShowPreview(true)}
            className="relative aspect-video w-full flex-shrink-0 overflow-hidden md:aspect-[4/3] md:w-72 lg:w-80"
            aria-label={`View ${tool.title} preview`}
          >
            <Image
              src={tool.image || "/placeholder.svg"}
              alt={`${tool.title} preview`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all group-hover:bg-foreground/20">
              <div className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
            {/* Status badge */}
            {tool.status === "coming-soon" && (
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                <Clock className="h-3 w-3" />
                Coming Soon
              </div>
            )}
          </button>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-4 sm:p-6 md:p-8">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">{tool.title}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {/* Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
              {tool.githubUrl && (
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background transition-all hover:-translate-y-0.5 hover:shadow-lg sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  <Github className="h-4 w-4" />
                  View on GitHub
                  <ExternalLink className="h-3 w-3 opacity-50" />
                </a>
              )}
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Preview
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setShowPreview(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowPreview(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${tool.title} preview`}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl animate-bounce-in overflow-y-auto rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full">
              <Image
                src={tool.image || "/placeholder.svg"}
                alt={`${tool.title} full preview`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-heading text-xl font-bold text-foreground">{tool.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
              <div className="mt-4 flex items-center gap-3">
                {tool.githubUrl && (
                  <a
                    href={tool.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                )}
                <button
                  onClick={() => setShowPreview(false)}
                  className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function ToolsSection() {
  return (
    <section id="tools" className="relative px-4 py-20 sm:px-6 sm:py-32">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          badge="Dev Arsenal"
          title="Tools & Utilities"
          description="Open-source tools built to make game development faster and more enjoyable for everyone."
        />
        <div className="flex flex-col gap-8">
          {tools.map((tool, i) => (
            <ToolCard key={tool.title} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
