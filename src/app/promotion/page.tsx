'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Target, Users, Trophy } from 'lucide-react'
import { TransparentNavigation } from '@/components/layout/TransparentNavigation'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

export default function PromotionPage() {
  // TODO: replace with official data and update SOURCES.md
  const highlights = [
    {
      icon: Users,
      title: '团队规模',
      description: '以官方信息为准',
      badge: '不断壮大'
    },
    {
      icon: Target,
      title: '发展目标',
      description: '以官方公告为准',
      badge: '持续发展'
    },
    {
      icon: Trophy,
      title: '重要成就',
      description: '以官方信息为准',
      badge: '值得骄傲'
    },
    {
      icon: Calendar,
      title: '发展历程',
      description: '以官方信息为准',
      badge: '稳步前进'
    }
  ]

  return (
    <div className="min-h-screen">
      <TransparentNavigation />
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 bg-linear-to-br from-primary/5 via-white to-secondary/5 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              百业宣传
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              {/* TODO: replace with official description and update SOURCES.md */}
              了解燕云十六声百业的发展历程、团队文化与未来愿景
            </p>
            <Badge variant="secondary" className="text-base px-4 py-2">
              以官方公告为准
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="p-8">
              <CardHeader className="text-center mb-6">
                <CardTitle className="text-2xl md:text-3xl mb-4">
                  关于燕云十六声百业
                </CardTitle>
                <CardDescription className="text-lg max-w-3xl mx-auto">
                  {/* TODO: replace with official information and update SOURCES.md */}
                  此部分内容待官方确认，请以官方公告为准。如需了解最新信息，请关注官方渠道。
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {highlights.map((item, index) => (
              <motion.div key={item.title} variants={fadeInUp}>
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <Badge variant="outline" className="w-fit mx-auto">
                      {item.badge}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">团队文化</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed">
                  {/* TODO: replace with official information and update SOURCES.md */}
                  此部分内容待官方确认，具体的团队文化和价值观请以官方信息为准。建议定期关注官方公告以获取最新信息。
                </p>
                <Badge variant="secondary" className="mt-4">
                  待官方确认
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">发展愿景</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed">
                  {/* TODO: replace with official information and update SOURCES.md */}
                  此部分内容待官方确认，发展规划和未来愿景请以官方公告为准。如需了解详细信息，请通过官方渠道获取。
                </p>
                <Badge variant="secondary" className="mt-4">
                  待官方确认
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">重要提醒</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    <strong>注意：</strong>本页面所有信息均为占位内容，实际内容请以燕云十六声百业官方公告为准。
                    网站管理员需要根据官方信息更新此页面内容，并在 SOURCES.md 中添加相应的来源链接。
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
