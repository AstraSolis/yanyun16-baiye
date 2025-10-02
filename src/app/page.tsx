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

      {/* 宣传部分 - 极简文字排版 */}
      <section
        id="promotion"
        ref={(el) => { sectionsRef.current[1] = el }}
        className="min-h-screen flex items-center opacity-0 bg-zinc-50"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full py-20">
          {/* 顶部标签 */}
          <div className="mb-16">
            <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">Promotion</span>
          </div>
          
          {/* 主要内容 */}
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* 左侧大标题 */}
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-zinc-900 leading-[1.1]">
                团队文化<br />与愿景
              </h2>
            </div>
            
            {/* 右侧内容 */}
            <div className="space-y-12 pt-4">
              <p className="text-lg text-zinc-600 leading-relaxed">
                了解燕云十六声{siteTitle}的发展历程、团队文化与未来愿景。<br />
                我们致力于建设专业的团队文化，共同追求卓越。
              </p>
              
              {/* 细线分割 */}
              <div className="h-px bg-zinc-200 w-16" />
              
              {/* 信息列表 */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-zinc-900 mt-3" />
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 mb-1">团队文化</h3>
                    <p className="text-sm text-zinc-500">专业协作，追求卓越</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-zinc-900 mt-3" />
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 mb-1">未来愿景</h3>
                    <p className="text-sm text-zinc-500">持续发展，共创辉煌</p>
                  </div>
                </div>
              </div>
              
              {/* CTA */}
              <Link href="/promotion">
                <button className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors relative">
                  了解更多
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-900 group-hover:w-12 transition-all duration-300" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 活动部分 - 精致卡片网格 */}
      <section
        id="activities"
        ref={(el) => { sectionsRef.current[2] = el }}
        className="min-h-screen flex items-center opacity-0 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full py-20">
          {/* 顶部 */}
          <div className="mb-16 max-w-2xl">
            <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-6 block">Activities</span>
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900 mb-6">
              成员专属福利
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed">
              共享团队发展成果，享受专属待遇与发展机会
            </p>
          </div>
          
          {/* 卡片网格 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="group p-8 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer">
              <Gift className="w-6 h-6 text-zinc-900 mb-4" />
              <h3 className="text-base font-medium text-zinc-900 mb-2">成员福利</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">专属福利待遇</p>
            </div>
            
            <div className="group p-8 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer">
              <Users className="w-6 h-6 text-zinc-900 mb-4" />
              <h3 className="text-base font-medium text-zinc-900 mb-2">特殊权益</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">高级成员特权</p>
            </div>
            
            <div className="group p-8 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer">
              <Megaphone className="w-6 h-6 text-zinc-900 mb-4" />
              <h3 className="text-base font-medium text-zinc-900 mb-2">保障服务</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">完善的保障体系</p>
            </div>
            
            <div className="group p-8 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer">
              <UserPlus className="w-6 h-6 text-zinc-900 mb-4" />
              <h3 className="text-base font-medium text-zinc-900 mb-2">发展机会</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">共同成长进步</p>
            </div>
          </div>
          
          {/* CTA */}
          <Link href="/activities">
            <button className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors relative">
              查看所有福利
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-900 group-hover:w-16 transition-all duration-300" />
            </button>
          </Link>
        </div>
      </section>

      {/* 成员部分 - 数字统计展示 */}
      <section
        id="members"
        ref={(el) => { sectionsRef.current[3] = el }}
        className="min-h-screen flex items-center opacity-0 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* 左侧 - 标题和描述 */}
            <div>
              <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-6 block">Members</span>
              <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900 mb-6">
                优秀团队<br />成员
              </h2>
              <p className="text-base text-zinc-500 leading-relaxed mb-8">
                认识我们优秀的团队成员，了解他们的故事与贡献
              </p>
              
              <Link href="/members">
                <button className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors relative">
                  认识团队成员
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-900 group-hover:w-16 transition-all duration-300" />
                </button>
              </Link>
            </div>
            
            {/* 右侧 - 数字统计 */}
            <div className="grid grid-cols-2 gap-8">
              <div className="border-l border-zinc-200 pl-6">
                <div className="text-5xl font-light text-zinc-900 mb-2">50+</div>
                <div className="text-sm text-zinc-500">活跃成员</div>
              </div>
              
              <div className="border-l border-zinc-200 pl-6">
                <div className="text-5xl font-light text-zinc-900 mb-2">10+</div>
                <div className="text-sm text-zinc-500">核心成员</div>
              </div>
              
              <div className="border-l border-zinc-200 pl-6">
                <div className="text-5xl font-light text-zinc-900 mb-2">100%</div>
                <div className="text-sm text-zinc-500">专业精神</div>
              </div>
              
              <div className="border-l border-zinc-200 pl-6">
                <div className="text-5xl font-light text-zinc-900 mb-2">24/7</div>
                <div className="text-sm text-zinc-500">团队支持</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 加入部分 - CTA突出居中式 */}
      <section
        id="join"
        ref={(el) => { sectionsRef.current[4] = el }}
        className="min-h-screen flex items-center opacity-0 bg-white"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 w-full py-20 text-center">
          {/* 顶部标签 */}
          <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-8 block">Join Us</span>
          
          {/* 主标题 */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-zinc-900 mb-6 leading-[1.1]">
            成为团队一员
          </h2>
          
          {/* 描述文字 */}
          <p className="text-lg text-zinc-500 leading-relaxed mb-12 max-w-2xl mx-auto">
            欢迎有志之士申请加入燕云十六声{siteTitle}<br />
            与我们一起创造精彩未来
          </p>
          
          {/* 细线分割 */}
          <div className="h-px bg-zinc-200 w-16 mx-auto mb-12" />
          
          {/* 关键信息 */}
          <div className="grid sm:grid-cols-2 gap-8 max-w-xl mx-auto mb-16">
            <div>
              <div className="text-sm font-medium text-zinc-900 mb-1">申请流程</div>
              <div className="text-sm text-zinc-500">简单快速</div>
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-900 mb-1">回复时间</div>
              <div className="text-sm text-zinc-500">3-7个工作日</div>
            </div>
          </div>
          
          {/* CTA按钮 */}
          <Link href="/join">
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white hover:bg-zinc-800 transition-all text-base font-medium overflow-hidden">
              <span className="relative z-10">立即申请加入</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform relative z-10" />
              {/* 悬浮时从左到右的光效 */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
            </button>
          </Link>
        </div>
      </section>


      {/* 底部渐变遮罩 */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
