'use client'

import Link from 'next/link'
import { Github, FileText } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* 主要内容 */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 品牌部分 */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-zinc-900 mb-3">
              燕云十六声 · 百业
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
              数据驱动的静态站点，展示燕云十六声百业的相关信息。<br />
              所有内容均以最新公告为准。
            </p>
          </div>

          {/* 导航 */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-3">
              导航
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/promotion" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  百业宣传
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  百业活动
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  百业成员
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                  加入百业
                </Link>
              </li>
            </ul>
          </div>

          {/* 项目信息 */}
          <div>
            <h4 className="text-xs font-medium tracking-widest text-zinc-400 uppercase mb-3">
              项目
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="#" 
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-3.5 h-3.5" />
                  源码
                </Link>
              </li>
              <li>
                <Link 
                  href="/sources" 
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  信息来源
                </Link>
              </li>
              <li>
                <Link 
                  href="/releases" 
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  发布日志
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 细线分割 */}
        <div className="h-px bg-zinc-200" />

        {/* 底部信息 */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-zinc-400">
            © {currentYear} 燕云十六声 · 百业 · yanyun16-baiye
          </div>
          
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <span>Next.js</span>
            <span>·</span>
            <span>静态导出</span>
            <span>·</span>
            <span>开源项目</span>
          </div>
        </div>

        {/* 管理员提醒 - 极简版 */}
        <div className="pb-8">
          <div className="p-4 bg-zinc-50 border-l-2 border-zinc-900">
            <p className="text-xs text-zinc-500 leading-relaxed">
              <span className="font-medium text-zinc-900">管理员提醒：</span>
              {' '}请根据最新信息更新{' '}
              <code className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-zinc-900">
                content/members.json
              </code>
              {' '}、{' '}
              <code className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-zinc-900">
                content/siteconfig.json
              </code>
              {' '}并在{' '}
              <code className="px-1.5 py-0.5 bg-white border border-zinc-200 rounded text-zinc-900">
                SOURCES.md
              </code>
              {' '}中记录信息来源。
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
