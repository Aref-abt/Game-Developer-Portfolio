import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { GamesSection } from "@/components/games-section"
import { ToolsSection } from "@/components/tools-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { MarqueeTicker } from "@/components/marquee-ticker"
import { AnimatedBackground } from "@/components/animated-background"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <MarqueeTicker />
        <GamesSection />
        <ToolsSection />
        <MarqueeTicker />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
