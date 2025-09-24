"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface SubduedShaderBackgroundProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "neutral"
}

export default function SubduedShaderBackground({ 
  children, 
  variant = "neutral" 
}: SubduedShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // 不同变体的色彩配置
  const colorConfigs = {
    primary: {
      colors: ["#f8fafc", "#8b5cf6", "#e2e8f0", "#1e293b", "#6366f1"],
      backgroundColor: "#f8fafc",
      opacity: "opacity-20"
    },
    secondary: {
      colors: ["#fefce8", "#f59e0b", "#fef3c7", "#78350f", "#d97706"],
      backgroundColor: "#fefce8",
      opacity: "opacity-15"
    },
    neutral: {
      colors: ["#f1f5f9", "#64748b", "#e2e8f0", "#334155", "#475569"],
      backgroundColor: "#f1f5f9",
      opacity: "opacity-25"
    }
  }

  const config = colorConfigs[variant]

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* SVG滤镜效果 - 更柔和的版本 */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="subtle-glass-effect" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence baseFrequency="0.002" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.01
                      0 1 0 0 0.01
                      0 0 1 0 0.02
                      0 0 0 0.4 0"
              result="tint"
            />
          </filter>
          
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* 微妙的背景着色器 - 更低调的动态效果 */}
      <div className={`absolute inset-0 w-full h-full ${config.opacity}`}>
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={config.colors}
          speed={0.1} // 更慢的速度
        />
      </div>

      {/* 渐变遮罩层 */}
      <div className="absolute inset-0 bg-linear-to-br from-white/80 via-white/60 to-white/40 dark:from-neutral-900/80 dark:via-neutral-800/60 dark:to-neutral-700/40" />

      {/* 内容 */}
      <div className="relative z-10">
        {children}
      </div>

      {/* 装饰性网格 */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  )
}
