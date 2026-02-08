"use client"

import { useEffect, useRef, useCallback, useState } from "react"

type ShapeType = "gamepad" | "code" | "star" | "hexagon" | "triangle" | "ring" | "diamond" | "plus" | "arrow" | "wave"

interface FloatingElement {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  baseOpacity: number
  opacity: number
  rotation: number
  rotationSpeed: number
  shape: ShapeType
  pulseOffset: number
  pulseSpeed: number
  colorIndex: number
  wobblePhase: number
  wobbleSpeed: number
  wobbleAmount: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const elementsRef = useRef<FloatingElement[]>([])
  const animationRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const timeRef = useRef(0)
  const [isDark, setIsDark] = useState(false)

  // Watch for theme changes
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const getColors = useCallback(() => {
    return isDark
      ? [
          "rgba(34, 201, 151, 0.18)",  // teal primary
          "rgba(34, 201, 151, 0.12)",  // teal soft
          "rgba(237, 149, 45, 0.15)",  // orange accent
          "rgba(237, 149, 45, 0.10)",  // orange soft
          "rgba(120, 180, 220, 0.12)", // blue tint
        ]
      : [
          "rgba(34, 201, 151, 0.22)",  // teal primary - much more visible
          "rgba(34, 201, 151, 0.15)",  // teal soft
          "rgba(237, 149, 45, 0.20)",  // orange accent
          "rgba(237, 149, 45, 0.13)",  // orange soft
          "rgba(80, 120, 180, 0.14)",  // blue tint
        ]
  }, [isDark])

  const createElement = useCallback((width: number, height: number): FloatingElement => {
    const shapes: ShapeType[] = ["gamepad", "code", "star", "hexagon", "triangle", "ring", "diamond", "plus", "arrow", "wave"]
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 18 + 10,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.25 - 0.08,
      baseOpacity: Math.random() * 0.4 + 0.5,
      opacity: 1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.006,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.015 + 0.008,
      colorIndex: Math.floor(Math.random() * 5),
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.008 + 0.003,
      wobbleAmount: Math.random() * 0.6 + 0.3,
    }
  }, [])

  const createElements = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 30000), 40)
    const elements: FloatingElement[] = []
    for (let i = 0; i < count; i++) {
      elements.push(createElement(width, height))
    }
    return elements
  }, [createElement])

  const drawShape = useCallback(
    (ctx: CanvasRenderingContext2D, el: FloatingElement, color: string) => {
      ctx.save()
      ctx.translate(el.x, el.y)
      ctx.rotate(el.rotation)
      ctx.globalAlpha = el.opacity
      const s = el.size

      switch (el.shape) {
        case "gamepad": {
          // Game controller D-pad shape
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.roundRect(-s * 0.15, -s * 0.55, s * 0.3, s * 1.1, s * 0.08)
          ctx.fill()
          ctx.beginPath()
          ctx.roundRect(-s * 0.55, -s * 0.15, s * 1.1, s * 0.3, s * 0.08)
          ctx.fill()
          break
        }

        case "code": {
          // Code bracket < />
          ctx.strokeStyle = color
          ctx.lineWidth = 2
          ctx.lineCap = "round"
          ctx.lineJoin = "round"
          // Left bracket <
          ctx.beginPath()
          ctx.moveTo(-s * 0.1, -s * 0.4)
          ctx.lineTo(-s * 0.45, 0)
          ctx.lineTo(-s * 0.1, s * 0.4)
          ctx.stroke()
          // Right bracket >
          ctx.beginPath()
          ctx.moveTo(s * 0.1, -s * 0.4)
          ctx.lineTo(s * 0.45, 0)
          ctx.lineTo(s * 0.1, s * 0.4)
          ctx.stroke()
          // Slash /
          ctx.beginPath()
          ctx.moveTo(s * 0.08, -s * 0.25)
          ctx.lineTo(-s * 0.08, s * 0.25)
          ctx.stroke()
          break
        }

        case "star": {
          // 4-pointed star
          ctx.fillStyle = color
          ctx.beginPath()
          for (let i = 0; i < 8; i++) {
            const radius = i % 2 === 0 ? s * 0.5 : s * 0.2
            const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
            const px = Math.cos(angle) * radius
            const py = Math.sin(angle) * radius
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.fill()
          break
        }

        case "hexagon": {
          ctx.strokeStyle = color
          ctx.lineWidth = 1.8
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 6
            const px = Math.cos(angle) * s * 0.45
            const py = Math.sin(angle) * s * 0.45
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.stroke()
          break
        }

        case "triangle": {
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.moveTo(0, -s * 0.45)
          ctx.lineTo(s * 0.4, s * 0.3)
          ctx.lineTo(-s * 0.4, s * 0.3)
          ctx.closePath()
          ctx.fill()
          break
        }

        case "ring": {
          // Double concentric rings
          ctx.strokeStyle = color
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(0, 0, s * 0.22, 0, Math.PI * 1.5)
          ctx.stroke()
          break
        }

        case "diamond": {
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.moveTo(0, -s * 0.5)
          ctx.lineTo(s * 0.35, 0)
          ctx.lineTo(0, s * 0.5)
          ctx.lineTo(-s * 0.35, 0)
          ctx.closePath()
          ctx.fill()
          break
        }

        case "plus": {
          // Thick plus / health pickup
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.roundRect(-s * 0.12, -s * 0.4, s * 0.24, s * 0.8, s * 0.06)
          ctx.fill()
          ctx.beginPath()
          ctx.roundRect(-s * 0.4, -s * 0.12, s * 0.8, s * 0.24, s * 0.06)
          ctx.fill()
          break
        }

        case "arrow": {
          // Arrow / chevron pointing up
          ctx.strokeStyle = color
          ctx.lineWidth = 2.5
          ctx.lineCap = "round"
          ctx.lineJoin = "round"
          ctx.beginPath()
          ctx.moveTo(-s * 0.3, s * 0.15)
          ctx.lineTo(0, -s * 0.25)
          ctx.lineTo(s * 0.3, s * 0.15)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(-s * 0.3, s * 0.35)
          ctx.lineTo(0, -s * 0.05)
          ctx.lineTo(s * 0.3, s * 0.35)
          ctx.stroke()
          break
        }

        case "wave": {
          // Sine wave
          ctx.strokeStyle = color
          ctx.lineWidth = 2
          ctx.lineCap = "round"
          ctx.beginPath()
          for (let i = 0; i <= 20; i++) {
            const px = (i / 20 - 0.5) * s
            const py = Math.sin((i / 20) * Math.PI * 2) * s * 0.2
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.stroke()
          break
        }
      }

      ctx.restore()
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      elementsRef.current = createElements(w, h)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouse)

    const animate = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      timeRef.current += 1

      const colors = getColors()
      const elements = elementsRef.current

      for (const el of elements) {
        // Pulsing opacity
        const pulse = Math.sin(timeRef.current * el.pulseSpeed + el.pulseOffset) * 0.3 + 0.7
        el.opacity = el.baseOpacity * pulse

        // Wobble movement (sine wave drift)
        const wobbleX = Math.sin(timeRef.current * el.wobbleSpeed + el.wobblePhase) * el.wobbleAmount
        const wobbleY = Math.cos(timeRef.current * el.wobbleSpeed * 0.7 + el.wobblePhase) * el.wobbleAmount * 0.5

        // Mouse interaction - gentle push away
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const mdx = el.x - mx
        const mdy = el.y - my
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy)
        let pushX = 0
        let pushY = 0
        if (mDist < 150 && mDist > 0) {
          const force = (150 - mDist) / 150
          pushX = (mdx / mDist) * force * 1.5
          pushY = (mdy / mDist) * force * 1.5
        }

        el.x += el.speedX + wobbleX * 0.1 + pushX
        el.y += el.speedY + wobbleY * 0.1 + pushY
        el.rotation += el.rotationSpeed

        // Wrap around edges with buffer
        const buf = el.size + 20
        if (el.x < -buf) el.x = w + buf
        if (el.x > w + buf) el.x = -buf
        if (el.y < -buf) el.y = h + buf
        if (el.y > h + buf) el.y = -buf

        const color = colors[el.colorIndex]
        drawShape(ctx, el, color)
      }

      // Draw very subtle connection lines between nearby elements
      for (let i = 0; i < elements.length; i++) {
        for (let j = i + 1; j < elements.length; j++) {
          const dx = elements[i].x - elements[j].x
          const dy = elements[i].y - elements[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(elements[i].x, elements[i].y)
            ctx.lineTo(elements[j].x, elements[j].y)
            ctx.strokeStyle = isDark ? "rgba(34, 201, 151, 0.06)" : "rgba(34, 201, 151, 0.08)"
            ctx.globalAlpha = (1 - dist / 120) * 0.5
            ctx.lineWidth = 0.8
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
      cancelAnimationFrame(animationRef.current)
    }
  }, [createElements, drawShape, getColors, isDark])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
