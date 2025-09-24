'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import ShaderBackground from '@/components/ui/shader-background'
import { Navigation } from '@/components/layout/Navigation'
import { getSiteConfigClient } from '@/lib/config'
import type { SiteConfig } from '@/lib/server-config'

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const siteConfig = await getSiteConfigClient()
        setConfig(siteConfig)
      } catch (error) {
        console.error('Failed to load config:', error)
        setConfig(null) // 使用默认配置
      }
    }
    loadConfig()
  }, [])

  // 如果配置还未加载，使用默认内容
  const siteTitle = config?.siteTitle || '百业'
  const siteDescription = config?.siteDescription || '燕云十六声百业官方宣传站点'

  return (
    <div
      className="opacity-0"
      style={{
        animation: 'fadeIn 0.8s ease-out forwards',
        animationDelay: '0.1s'
      }}
    >
      <ShaderBackground>
        <Navigation />
        {/* Hero Content - 左下角定位，类似shader-showcase */}
        <main 
          className="absolute bottom-8 left-8 z-20 max-w-lg opacity-0"
          style={{
            animation: 'slideUp 0.8s ease-out forwards',
            animationDelay: '0.3s'
          }}
        >
          <div className="text-left">
            <div
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-xs mb-4 relative glass-effect"
            >
              <div className="absolute top-0 left-1 right-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent rounded-full" />
              <span className="text-white/90 text-xs font-light relative z-10">✨ 燕云十六声官方{siteTitle}组织</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
              <span className="font-medium italic instrument">汇聚</span> 天下英才
              <br />
              <span className="font-light tracking-tight text-white">共创辉煌未来</span>
            </h1>

            {/* Description */}
            <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
              {siteDescription} - 致力于为成员提供专业的游戏指导、
              丰富的福利待遇和良好的社交环境，共同打造顶级的游戏体验。
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/members">
                <button className="btn-secondary">
                  了解成员
                </button>
              </Link>
              <Link href="/join">
                <button className="btn-primary">
                  加入{siteTitle}
                </button>
              </Link>
            </div>
          </div>
        </main>

      </ShaderBackground>
    </div>
  )
}
