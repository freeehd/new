"use client"

import { useEffect, useRef } from "react"

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ["#ec4899", "#d946ef", "#8b5cf6", "#f472b6", "#f9a8d4"]
    const shapes = ["circle", "square", "triangle", "heart"]

    class ConfettiPiece {
      x: number
      y: number
      size: number
      color: string
      shape: string
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -20 - Math.random() * 100
        this.size = Math.random() * 10 + 5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.shape = shapes[Math.floor(Math.random() * shapes.length)]
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 + 2
        this.rotation = Math.random() * 360
        this.rotationSpeed = Math.random() * 5 - 2.5
      }

      update() {
        this.y += this.speedY
        this.x += this.speedX
        this.rotation += this.rotationSpeed

        if (this.y > canvas.height) {
          this.y = -20
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.rotation * Math.PI) / 180)

        ctx.fillStyle = this.color
        ctx.beginPath()

        switch (this.shape) {
          case "circle":
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
            break
          case "square":
            ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size)
            break
          case "triangle":
            ctx.moveTo(0, -this.size / 2)
            ctx.lineTo(this.size / 2, this.size / 2)
            ctx.lineTo(-this.size / 2, this.size / 2)
            ctx.closePath()
            break
          case "heart":
            const topCurveHeight = this.size * 0.3
            ctx.moveTo(0, this.size * 0.2)
            ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, -topCurveHeight)
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, 0, -this.size / 2, 0, -this.size * 0.2)
            ctx.bezierCurveTo(0, -this.size / 2, this.size / 2, -this.size / 2, this.size / 2, -topCurveHeight)
            ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, this.size * 0.2)
            break
        }

        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    const confettiPieces: ConfettiPiece[] = []
    for (let i = 0; i < 150; i++) {
      confettiPieces.push(new ConfettiPiece())
    }

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      confettiPieces.forEach((piece) => {
        piece.update()
        piece.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
}
