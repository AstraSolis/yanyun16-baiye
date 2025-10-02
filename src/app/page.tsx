'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import ShaderBackground from '@/components/ui/shader-background'
import { Navigation } from '@/components/layout/Navigation'
import { getSiteConfigClient } from '@/lib/config'
import type { SiteConfig } from '@/lib/server-config'
import { Gift, Users, UserPlus, Megaphone, ArrowRight } from 'lucide-react'

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

      {/* 首页横幅部分 - 现代化设计 */}
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
            {/* 主视觉内容 - 居中布局 */}
            <main 
              className="absolute inset-0 z-20 flex items-center justify-center px-8 opacity-0"
              style={{
                animation: 'fadeIn 0.8s ease-out forwards',
                animationDelay: '0.3s'
              }}
            >
              <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {/* 左侧文字内容 */}
                <div className="flex-1 text-left lg:text-left">
                  <div
                    className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-xs mb-4 relative glass-effect"
                  >
                    <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                    <span className="text-white/90 text-xs font-light relative z-10">✨ 燕云十六声{siteTitle}组织</span>
                  </div>

                  {/* 主标题 */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
                    <span className="font-medium italic instrument">汇聚</span> 天下英才
                    <br />
                    <span className="font-light tracking-tight text-white">共创辉煌未来</span>
                  </h1>

                  {/* 描述 */}
                  <p className="text-xs font-light text-white/70 mb-6 leading-relaxed max-w-lg">
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

                {/* 右侧圆形头像 */}
                <div 
                  className="flex-shrink-0 opacity-0"
                  style={{
                    animation: 'fadeIn 0.8s ease-out forwards',
                    animationDelay: '0.5s'
                  }}
                >
                  <div className="relative">
                    {/* 圆形头像容器 */}
                    <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm bg-white/5">
                      {config?.homeDisplay?.heroAvatar ? (
                        <Image
                          src={config.homeDisplay.heroAvatar}
                          alt="头像"
                          width={384}
                          height={384}
                          className="w-full h-full object-cover"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                          <span className="text-white/30 text-sm">此处可配置图片</span>
                        </div>
                      )}
                    </div>
                    {/* 装饰性光晕 */}
                    <div className="absolute -inset-4 bg-white/5 rounded-full blur-2xl -z-10"></div>
                  </div>
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
            <div className="relative rounded-md overflow-hidden">
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
            <div className="group">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-destructive/20 to-accent/20 border border-border p-12 flex items-center justify-center relative overflow-hidden shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250">
                <Megaphone className="w-28 h-28 text-destructive relative z-10 transform group-hover:scale-110 transition-transform duration-250" />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-destructive/10 rounded-round mb-2">
                  <Megaphone className="w-3.5 h-3.5 text-destructive" />
                  <span className="text-xs font-medium text-destructive tracking-wide uppercase">PROMOTION / 百业宣传</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                  团队文化与愿景
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  了解燕云十六声{siteTitle}的发展历程、团队文化与未来愿景。我们致力于建设专业的团队文化，共同追求卓越。
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250 cursor-pointer">
                    <div className="text-card-foreground font-medium mb-1">团队文化</div>
                    <div className="text-sm text-muted-foreground">专业协作精神</div>
                  </div>
                  <div className="p-6 bg-white border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250 cursor-pointer">
                    <div className="text-card-foreground font-medium mb-1">未来愿景</div>
                    <div className="text-sm text-muted-foreground">持续发展目标</div>
                  </div>
                </div>
                <Link href="/promotion">
                  <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-card-foreground border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1 transition-all duration-250">
                    <span className="text-base font-medium">了解团队文化</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-250" />
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
            <div className="relative rounded-md overflow-hidden">
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-round mb-2">
                  <Gift className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary tracking-wide uppercase">ACTIVITIES / 百业活动</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                  成员专属福利
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  了解燕云十六声{siteTitle}成员的专属福利与待遇，共享团队发展成果。包括成员福利、特殊权益、保障服务和发展机会。
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250 cursor-pointer">
                    <div className="text-card-foreground font-medium mb-1">成员福利</div>
                    <div className="text-sm text-muted-foreground">专属福利待遇</div>
                  </div>
                  <div className="p-6 bg-white border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250 cursor-pointer">
                    <div className="text-card-foreground font-medium mb-1">特殊权益</div>
                    <div className="text-sm text-muted-foreground">高级成员特权</div>
                  </div>
                </div>
                <Link href="/activities">
                  <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-card-foreground border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1 transition-all duration-250">
                    <span className="text-base font-medium">了解详细福利</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-250" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg:order-first group">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-border p-12 flex items-center justify-center relative overflow-hidden shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250">
                <Gift className="w-28 h-28 text-primary relative z-10 transform group-hover:scale-110 transition-transform duration-250" />
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
            <div className="relative rounded-md overflow-hidden">
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
            <div className="group">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-muted/30 to-accent/20 border border-border p-12 flex items-center justify-center relative overflow-hidden shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250">
                <Users className="w-28 h-28 text-muted relative z-10 transform group-hover:scale-110 transition-transform duration-250" />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted/20 rounded-round mb-2">
                  <Users className="w-3.5 h-3.5 text-muted" />
                  <span className="text-xs font-medium text-muted tracking-wide uppercase">MEMBERS / 百业成员</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                  优秀团队成员
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  认识我们优秀的团队成员，了解他们的故事与贡献。每位成员都为团队带来独特的价值和专业技能。
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250 cursor-pointer">
                    <div className="text-card-foreground font-medium mb-1">团队精英</div>
                    <div className="text-sm text-muted-foreground">专业背景展示</div>
                  </div>
                  <div className="p-6 bg-white border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250 cursor-pointer">
                    <div className="text-card-foreground font-medium mb-1">成员故事</div>
                    <div className="text-sm text-muted-foreground">了解成员贡献</div>
                  </div>
                </div>
                <Link href="/members">
                  <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-card-foreground border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1 transition-all duration-250">
                    <span className="text-base font-medium">认识团队成员</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-250" />
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
            <div className="relative rounded-md overflow-hidden">
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-round mb-2">
                  <UserPlus className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-medium text-accent tracking-wide uppercase">JOIN US / 加入百业</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                  成为团队一员
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  欢迎有志之士申请加入燕云十六声{siteTitle}，与我们一起创造精彩未来。简单的申请流程，专业的团队环境。
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-white border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250 cursor-pointer">
                    <div className="text-card-foreground font-medium mb-1">申请流程简单</div>
                    <div className="text-sm text-muted-foreground">3-7日内回复</div>
                  </div>
                  <div className="p-6 bg-white border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250 cursor-pointer">
                    <div className="text-card-foreground font-medium mb-1">专业团队环境</div>
                    <div className="text-sm text-muted-foreground">共同成长发展</div>
                  </div>
                </div>
                <Link href="/join">
                  <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-card-foreground border border-border rounded-md shadow-small hover:shadow-medium hover:-translate-y-1 transition-all duration-250">
                    <span className="text-base font-medium">立即申请加入</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-250" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="lg:order-first group">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 border border-border p-12 flex items-center justify-center relative overflow-hidden shadow-small hover:shadow-medium hover:-translate-y-1.5 transition-all duration-250">
                <UserPlus className="w-28 h-28 text-accent relative z-10 transform group-hover:scale-110 transition-transform duration-250" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 底部渐变遮罩 */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
