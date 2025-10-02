'use client'

import Link from 'next/link'
import { Github, Copyright } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* 紧凑型布局 */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* 品牌信息 */}
            <div className="text-center md:text-left">
              <h3 className="text-sm font-medium text-zinc-900 mb-1">
                燕云十六声 · 百业
              </h3>
              <p className="text-xs text-zinc-500">
                数据驱动的静态站点 · 以最新公告为准
              </p>
            </div>

            {/* 导航链接 - 横向排列 */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link href="/" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                首页
              </Link>
              <Link href="/promotion" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                百业宣传
              </Link>
              <Link href="/activities" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                百业活动
              </Link>
              <Link href="/members" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                百业成员
              </Link>
              <Link href="/join" className="text-zinc-600 hover:text-zinc-900 transition-colors">
                加入百业
              </Link>
              <Link
                href="https://github.com/AstraSolis/yanyun16-baiye"
                className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-3.5 h-3.5" />
                源码
              </Link>
            </nav>
          </div>
        </div>

        {/* 细线分割 */}
        <div className="h-px bg-zinc-200" />

        {/* 底部版权信息 */}
        <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-zinc-400">
          <div className="flex items-center gap-1">
            <Copyright className="w-3 h-3" />
            <span>2025</span>
            <Link
              href="https://github.com/AstraSolis"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 transition-colors"
            >
              AstraSolis
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Next.js</span>
            <span>·</span>
            <span>静态导出</span>
            <span>·</span>
            <span>开源项目</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
