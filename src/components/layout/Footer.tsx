'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ExternalLink, Github, FileText, LucideIcon } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
  icon?: LucideIcon
  external?: boolean
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks: { title: string; links: FooterLink[] }[] = [
    {
      title: '网站导航',
      links: [
        { label: '首页', href: '/' },
        { label: '百业宣传', href: '/promotion' },
        { label: '百业活动', href: '/activities' },
        { label: '百业成员', href: '/members' },
        { label: '加入百业', href: '/join' },
      ]
    },
    {
      title: '项目信息',
      links: [
        { label: '项目源码', href: '#', icon: Github, external: true },
        { label: '信息来源', href: '/sources', icon: FileText },
        { label: '发布日志', href: '/releases', icon: FileText },
      ]
    }
  ]

  return (
    <footer className="bg-muted/10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 主要页脚内容 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌部分 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              燕云十六声 · 百业
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {/* 待替换：相关描述，并更新 SOURCES.md */}
              这是一个数据驱动的静态站点，用于展示燕云十六声百业的相关信息。
              所有内容均以最新公告为准。
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">
                静态站点
              </Badge>
              <Badge variant="outline" className="text-xs">
                数据驱动
              </Badge>
              <Badge variant="outline" className="text-xs">
                开源项目
              </Badge>
            </div>
          </div>

          {/* 导航链接 */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <motion.div whileHover={{ x: 2 }}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.icon && <link.icon className="h-4 w-4 mr-2" />}
                        {link.label}
                        {link.external && <ExternalLink className="h-3 w-3 ml-1" />}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* 底部页脚 */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} 燕云十六声 · 百业. 
            <span className="ml-2">项目名称: yanyun16-baiye</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>构建于 Next.js</span>
            <Separator orientation="vertical" className="h-4" />
            <span>支持静态导出</span>
            <Separator orientation="vertical" className="h-4" />
            <Link 
              href="https://github.com"
              className="hover:text-foreground transition-colors inline-flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-1" />
              开源
            </Link>
          </div>
        </div>

        {/* 管理员提醒 */}
        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg backdrop-blur-xs">
          <div className="flex items-start space-x-2">
            <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium mb-1 text-foreground">管理员提醒：</p>
              <p>
                此站点当前显示占位内容。请根据最新信息更新相关数据文件：
                <code className="mx-1 px-1 py-0.5 bg-muted/20 rounded text-xs">
                  content/members.json
                </code>、
                <code className="mx-1 px-1 py-0.5 bg-muted/20 rounded text-xs">
                  content/siteconfig.json
                </code>
                并在 
                <code className="mx-1 px-1 py-0.5 bg-muted/20 rounded text-xs">
                  SOURCES.md
                </code>
                中记录信息来源。
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
