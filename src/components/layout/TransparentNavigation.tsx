'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, Home, Star, Gift, Users, UserPlus } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { href: '/', label: '首页', icon: Home },
  { href: '/promotion', label: '百业宣传', icon: Star },
  { href: '/activities', label: '百业活动', icon: Gift },
  { href: '/members', label: '百业成员', icon: Users },
  { href: '/join', label: '加入百业', icon: UserPlus },
]

export function TransparentNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="relative z-20 p-6">
      <div className="flex items-center justify-between">
        {/* 标志 / 品牌 */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="https://www.yysls.cn/pc/fab/20250723194326/img/logo_a9b36efe.png?image_process=format,png"
                alt="燕云十六声 · 百业"
                width={170}
                height={54}
                priority
                className="object-contain"
              />
            </motion.div>
          </Link>
        </div>

        {/* 桌面导航 - 居中 */}
        <nav className="hidden md:flex items-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  "text-neutral-700 hover:text-neutral-900 text-sm font-normal instrument px-3 py-2 rounded-full hover:bg-neutral-100 transition-all duration-200",
                  isActive(item.href) && "text-neutral-900 bg-neutral-100"
                )}
              >
                {item.label}
              </button>
            </Link>
          ))}
        </nav>

        {/* 右侧空间 - 移动端菜单 */}
        <div className="flex items-center justify-end w-[170px]">
          {/* 移动端导航 */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="打开菜单"
                  className="text-neutral-700 hover:bg-neutral-100"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
                <div className="flex flex-col h-full">
                  {/* 标题 */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <h2 className="text-lg font-normal instrument">导航菜单</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      aria-label="关闭菜单"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* 导航项目 */}
                  <div className="flex-1 py-6">
                    <nav className="space-y-2">
                      {navigationItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                          <motion.div
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant={isActive(item.href) ? 'default' : 'ghost'}
                              className="w-full justify-start text-left font-normal instrument"
                              onClick={() => setIsOpen(false)}
                            >
                              <item.icon className="h-4 w-4 mr-3" />
                              {item.label}
                            </Button>
                          </motion.div>
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* 页脚 */}
                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <Image
                        src="https://www.yysls.cn/pc/fab/20250723194326/img/logo_a9b36efe.png?image_process=format,png"
                        alt="燕云十六声 · 百业"
                        width={170}
                        height={54}
                        className="object-contain opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
