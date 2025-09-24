"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [shaderError, setShaderError] = useState(false)
  const [isShaderLoaded, setIsShaderLoaded] = useState(false)

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

  // 检测WebGL支持
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setShaderError(true)
        return
      }
      
      // 更快的着色器初始化，减少等待时间
      const timer = setTimeout(() => {
        setIsShaderLoaded(true)
      }, 200)

      return () => clearTimeout(timer)
    } catch (error) {
      console.warn('WebGL not supported, using fallback background')
      setShaderError(true)
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* SVG滤镜效果 */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 基础CSS渐变背景 - 立即显示，避免黑色闪烁 */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(30, 27, 75, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, #000000 0%, #1a1a1a 100%)
          `,
          animation: 'subtle-flow 20s ease-in-out infinite alternate'
        }}
      />

      {/* WebGL着色器层 - 加载完成后淡入覆盖CSS背景 */}
      {!shaderError && isShaderLoaded && (
        <div 
          className="absolute inset-0 w-full h-full opacity-0"
          style={{ 
            animation: 'fadeIn 1.2s ease-out forwards',
            animationDelay: '0.1s'
          }}
        >
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={["#000000", "#8b5cf6", "#ffffff", "#1e1b4b", "#4c1d95"]}
            speed={0.3}
          />
          <MeshGradient
            className="absolute inset-0 w-full h-full opacity-60"
            colors={["#000000", "#ffffff", "#8b5cf6", "#000000"]}
            speed={0.2}
          />
        </div>
      )}

      {children}
    </div>
  )
}
