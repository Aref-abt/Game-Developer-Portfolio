export function MarqueeTicker() {
  const items = [
    "Unity", "C#", "Game Design", "Shader Programming", "Level Design",
    "Mobile Games", "PC Games", "Indie Dev", "Open Source", "Game Jams",
    "UI/UX", "Prototyping", "3D", "2D", "Physics Systems",
  ]

  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-4">
      <div className="animate-marquee flex w-max items-center gap-8">
        {[...items, ...items].map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="whitespace-nowrap text-sm font-medium text-muted-foreground/60">
              {item}
            </span>
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/30" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
