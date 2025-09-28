'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import ShaderBackground from '@/components/ui/shader-background'
import { Navigation } from '@/components/layout/Navigation'
import { getSiteConfigClient } from '@/lib/config'
import type { SiteConfig } from '@/lib/server-config'
import { Gift, Users, UserPlus, Megaphone } from 'lucide-react'

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [activeSection, setActiveSection] = useState("")
  const [isLightBackground, setIsLightBackground] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
            
            // 检测当前section的背景颜色
            const currentSection = entry.target as HTMLElement
            const computedStyle = window.getComputedStyle(currentSection)
            const backgroundColor = computedStyle.backgroundColor
            
            // 判断是否为浅色背景 (简化判断：hero section为深色，其他为浅色)
            const isLight = entry.target.id !== "hero"
            setIsLightBackground(isLight)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // 如果配置还未加载，使用默认内容
  const siteTitle = config?.siteTitle || '百业'
  const siteDescription = config?.siteDescription || '燕云十六声百业宣传站点'

  const sections = [
    { id: "hero", name: "首页" },
    { id: "promotion", name: "百业宣传" },
    { id: "activities", name: "百业活动" },
    { id: "members", name: "百业成员" },
    { id: "join", name: "加入百业" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 固定侧边导航 - 右侧，智能显示 */}
      <nav className={`fixed right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block transition-all duration-500 ${
        activeSection === "hero" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}>
        <div className="flex flex-col gap-4">
          {sections.slice(1).map((section) => ( // 跳过首页主视觉部分
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section.id 
                  ? (isLightBackground ? "bg-black" : "bg-white") // 浅色背景用黑色，深色背景用白色
                  : (isLightBackground ? "bg-black/30 hover:bg-black/60" : "bg-white/30 hover:bg-white/60")
              }`}
              aria-label={`导航到 ${section.name}`}
            />
          ))}
        </div>
      </nav>

      {/* 首页横幅部分 - 保持原有设计 */}
      <section 
        id="hero"
        ref={(el) => { sectionsRef.current[0] = el }}
        className="min-h-screen relative opacity-0"
      >
        <div
          className="opacity-0"
          style={{
            animation: 'fadeIn 0.8s ease-out forwards',
            animationDelay: '0.1s'
          }}
        >
          <ShaderBackground>
            <Navigation />
            {/* 主视觉内容 - 左下角定位，类似shader-showcase */}
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
                  <span className="text-white/90 text-xs font-light relative z-10">✨ 燕云十六声{siteTitle}组织</span>
                </div>

                {/* 主标题 */}
                <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
                  <span className="font-medium italic instrument">汇聚</span> 天下英才
                  <br />
                  <span className="font-light tracking-tight text-white">共创辉煌未来</span>
                </h1>

                {/* 描述 */}
                <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
                  {siteDescription} - 致力于为成员提供专业的游戏指导、
                  丰富的福利待遇和良好的社交环境，共同打造顶级的游戏体验。
                </p>

                {/* 按钮 */}
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
      </section>

      {/* 宣传部分 */}
      <section
        id="promotion"
        ref={(el) => { sectionsRef.current[1] = el }}
        className="min-h-screen flex flex-col py-20 sm:py-32 opacity-0"
      >
        {/* 部分图片 */}
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 mb-12">
          <div className="flex justify-center">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/promotion.png"
                alt="百业宣传"
                width={634}
                height={150}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 w-full flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-destructive/20 to-accent/20 border border-border p-8 flex items-center justify-center">
                <Megaphone className="w-24 h-24 text-destructive/50" />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
                  <Megaphone className="w-4 h-4" />
                  <span>PROMOTION / 百业宣传</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-light">团队文化与愿景</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  了解燕云十六声{siteTitle}的发展历程、团队文化与未来愿景。我们致力于建设专业的团队文化，共同追求卓越。
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                    <div className="text-foreground font-medium">团队文化</div>
                    <div className="text-sm text-muted-foreground">专业协作精神</div>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                    <div className="text-foreground font-medium">未来愿景</div>
                    <div className="text-sm text-muted-foreground">持续发展目标</div>
                  </div>
                </div>
                <Link href="/promotion">
                  <button className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300">
                    <span className="text-base">了解团队文化</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 活动部分 */}
      <section
        id="activities"
        ref={(el) => { sectionsRef.current[2] = el }}
        className="min-h-screen flex flex-col py-20 sm:py-32 opacity-0"
      >
        {/* 部分图片 */}
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 mb-12">
          <div className="flex justify-center">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/activities.png"
                alt="百业活动"
                width={634}
                height={150}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 w-full flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
                  <Gift className="w-4 h-4" />
                  <span>ACTIVITIES / 百业活动</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-light">成员专属福利</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  了解燕云十六声{siteTitle}成员的专属福利与待遇，共享团队发展成果。包括成员福利、特殊权益、保障服务和发展机会。
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                    <div className="text-foreground font-medium">成员福利</div>
                    <div className="text-sm text-muted-foreground">专属福利待遇</div>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                    <div className="text-foreground font-medium">特殊权益</div>
                    <div className="text-sm text-muted-foreground">高级成员特权</div>
                  </div>
                </div>
                <Link href="/activities">
                  <button className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300">
                    <span className="text-base">了解详细福利</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg:order-first">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border p-8 flex items-center justify-center">
                <Gift className="w-24 h-24 text-primary/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 成员部分 */}
      <section
        id="members"
        ref={(el) => { sectionsRef.current[3] = el }}
        className="min-h-screen flex flex-col py-20 sm:py-32 opacity-0"
      >
        {/* 部分图片 */}
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 mb-12">
          <div className="flex justify-center">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/members.png"
                alt="百业成员"
                width={634}
                height={150}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 w-full flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 border border-border p-8 flex items-center justify-center">
                <Users className="w-24 h-24 text-secondary/50" />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
                  <Users className="w-4 h-4" />
                  <span>MEMBERS / 百业成员</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-light">优秀团队成员</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  认识我们优秀的团队成员，了解他们的故事与贡献。每位成员都为团队带来独特的价值和专业技能。
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                    <div className="text-foreground font-medium">团队精英</div>
                    <div className="text-sm text-muted-foreground">专业背景展示</div>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                    <div className="text-foreground font-medium">成员故事</div>
                    <div className="text-sm text-muted-foreground">了解成员贡献</div>
                  </div>
                </div>
                <Link href="/members">
                  <button className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300">
                    <span className="text-base">认识团队成员</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 加入部分 */}
      <section
        id="join"
        ref={(el) => { sectionsRef.current[4] = el }}
        className="min-h-screen flex flex-col py-20 sm:py-32 opacity-0"
      >
        {/* 部分图片 */}
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 mb-12">
          <div className="flex justify-center">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/assets/images/join.png"
                alt="加入百业"
                width={634}
                height={150}
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 w-full flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
                  <UserPlus className="w-4 h-4" />
                  <span>JOIN US / 加入百业</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-light">成为团队一员</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  欢迎有志之士申请加入燕云十六声{siteTitle}，与我们一起创造精彩未来。简单的申请流程，专业的团队环境。
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                    <div className="text-foreground font-medium">申请流程简单</div>
                    <div className="text-sm text-muted-foreground">填写申请表单，3-7个工作日内回复</div>
                  </div>
                  <div className="p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                    <div className="text-foreground font-medium">专业团队环境</div>
                    <div className="text-sm text-muted-foreground">与优秀同伴共同成长发展</div>
                  </div>
                </div>
                <Link href="/join">
                  <button className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300">
                    <span className="text-base">立即申请加入</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg:order-first">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-border p-8 flex items-center justify-center">
                <UserPlus className="w-24 h-24 text-accent/50" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 页脚 */}
      <footer className="py-12 sm:py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">© 2025 燕云十六声{siteTitle}. All rights reserved.</div>
            <div className="text-xs text-muted-foreground">{siteDescription}</div>
          </div>
        </div>
      </footer>

      {/* 底部渐变遮罩 */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
