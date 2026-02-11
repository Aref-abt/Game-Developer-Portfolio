"use client"

import { useEffect, useRef, useState } from "react"
import { Trophy, Award, Flame, ExternalLink, Star } from "lucide-react"
import { SectionHeader } from "./section-header"

interface Achievement {
  title: string
  description: string
  icon: typeof Trophy
  link: { label: string; url: string }
  stat?: string
  color: string
}

const achievements: Achievement[] = [
  {
    title: "Won Very Big Indie Pitch",
    description:
      "Fideo's Adventure won the prestigious Very Big Indie Pitch competition at Dubai GameExpo Summit, recognized among the best indie games by industry experts and judges.",
    icon: Trophy,
    link: { label: "Read Article", url: "https://www.pocketgamer.biz/fideos-adventure-was-full-of-confidence-and-won-the-very-big-indie-pitch-at-dubai-gameexpo-summit/" },
    stat: "1st Place",
    color: "32 95% 55%",
  },
  {
    title: "Devcom / Gamescom Scholarship",
    description:
      "Attended Devcom and Gamescom on a scholarship, connecting with top industry professionals and showcasing work on an international stage.",
    icon: Award,
    link: { label: "View on LinkedIn", url: "https://www.linkedin.com/posts/yvan-richani_devcomgamescom-was-crazy-attended-some-activity-7238919458709213184-OdgJ/" },
    stat: "Invited",
    color: "168 80% 42%",
  },
  {
    title: "Brackeys Game Jam 2021.2",
    description:
      "Ranked 80th out of 1,750 game jam entries in the Brackeys Game Jam 2021.2, demonstrating rapid prototyping skills and creative game design under pressure.",
    icon: Flame,
    link: { label: "View Submission", url: "https://itch.io/jam/brackeys-6/rate/1177896" },
    stat: "Top 5%",
    color: "0 80% 60%",
  },
]

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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

  const Icon = achievement.icon

  return (
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
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-500 hover:shadow-2xl sm:rounded-3xl sm:p-8"
        style={{
          boxShadow: isHovered
            ? `0 25px 60px -12px hsla(${achievement.color}, 0.15)`
            : undefined,
        }}
      >
        {/* Top */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{
              backgroundColor: `hsla(${achievement.color}, 0.1)`,
              color: `hsl(${achievement.color})`,
            }}
          >
            <Icon className="h-7 w-7" />
          </div>
          {achievement.stat && (
            <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
              <Star className="h-3.5 w-3.5 text-accent" fill="hsl(var(--accent))" />
              <span className="text-sm font-bold text-foreground">{achievement.stat}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="mt-6 font-heading text-xl font-bold text-foreground">{achievement.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {achievement.description}
        </p>

        {/* Link */}
        <a
          href={achievement.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3"
        >
          {achievement.link.label}
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  )
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative px-4 py-20 sm:px-6 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--accent)/0.04),_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          badge="Achievement Unlocked"
          title="Milestones & Awards"
          description="Recognition and highlights from the game development journey so far."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
