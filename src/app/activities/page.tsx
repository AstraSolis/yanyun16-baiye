'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EnhancedCard, EnhancedCardContent, EnhancedCardDescription, EnhancedCardHeader, EnhancedCardTitle } from '@/components/ui/enhanced-card'
import SubduedShaderBackground from '@/components/ui/subdued-shader-background'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Gift, Star, Shield, Zap, AlertTriangle } from 'lucide-react'
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

export default function ActivitiesPage() {
  // 待替换：相关活动数据，并更新 SOURCES.md
  const activityCategories = [
    {
      icon: Gift,
      title: '成员福利',
      description: '专属福利待遇',
      items: [
        '待确认 - 具体福利项目',
        '待确认 - 福利发放时间',
        '待确认 - 福利申请流程'
      ],
      badge: '待确认',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: Star,
      title: '特殊权益',
      description: '高级成员特权',
      items: [
        '待确认 - 特权范围',
        '待确认 - 使用条件',
        '待确认 - 有效期限'
      ],
      badge: '待确认',
      color: 'bg-secondary/10 text-secondary'
    },
    {
      icon: Shield,
      title: '保障服务',
      description: '成员保障政策',
      items: [
        '待确认 - 保障内容',
        '待确认 - 保障范围',
        '待确认 - 申请条件'
      ],
      badge: '待确认',
      color: 'bg-amber-500/10 text-amber-600'
    },
    {
      icon: Zap,
      title: '发展机会',
      description: '成长与发展支持',
      items: [
        '待确认 - 培训机会',
        '待确认 - 发展路径',
        '待确认 - 晋升机制'
      ],
      badge: '待确认',
      color: 'bg-teal-500/10 text-teal-600'
    }
  ]

  return (
    <SubduedShaderBackground variant="primary">
      <div className="min-h-screen">
        <TransparentNavigation />
        {/* 首页横幅部分 */}
        <section className="relative px-4 py-20 md:py-32 overflow-hidden">
          {/* 装饰性背景元素 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-400/5 rounded-full blur-3xl opacity-40" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* 图标装饰 */}
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-primary/20 to-violet-600/20 rounded-full mb-6 backdrop-blur-xs"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Gift className="h-8 w-8 text-primary" />
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-neutral-900 via-primary to-violet-600 dark:from-white dark:via-primary dark:to-violet-300 bg-clip-text text-transparent mb-6 leading-tight">
                百业活动
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                {/* 待替换：相关描述，并更新 SOURCES.md */}
                了解燕云十六声百业成员的专属福利与待遇，共享团队发展成果
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="secondary" className="text-base px-6 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-xs shadow-lg">
                  以最新公告为准
                </Badge>
              </motion.div>
            </motion.div>
          </div>
      </section>

      {/* 重要提醒 */}
      <section className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>重要提醒：</strong>本页面所列福利信息均为占位内容，具体福利政策请以燕云十六声百业最新公告为准。
                实际福利内容、申请条件、发放时间等详细信息请关注相关渠道发布。
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </section>

      {/* 福利网格 */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              福利类别
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              以下为福利分类概览，具体内容请以最新信息为准
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            {activityCategories.map((category, index) => (
              <motion.div key={category.title} variants={fadeInUp}>
                <EnhancedCard 
                  className="h-full group" 
                  variant="glass" 
                  hoverEffect="lift" 
                  interactive
                >
                  <EnhancedCardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <category.icon className="h-6 w-6" />
                      </motion.div>
                      <div className="flex-1">
                        <EnhancedCardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {category.title}
                        </EnhancedCardTitle>
                        <EnhancedCardDescription className="text-base">
                          {category.description}
                        </EnhancedCardDescription>
                      </div>
                      <Badge variant="outline" className="text-xs bg-white/50 backdrop-blur-xs">
                        {category.badge}
                      </Badge>
                    </div>
                  </EnhancedCardHeader>
                  <EnhancedCardContent>
                    <ul className="space-y-3">
                      {category.items.map((item, idx) => (
                        <motion.li 
                          key={idx} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-linear-to-r from-primary to-violet-600 rounded-full mt-2 shrink-0 shadow-xs" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </EnhancedCardContent>
                </EnhancedCard>
              </motion.div>
            ))}
          </motion.div>

          {/* 补充信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <EnhancedCard variant="glass" hoverEffect="glow">
              <EnhancedCardHeader>
                <EnhancedCardTitle className="text-xl">福利申请流程</EnhancedCardTitle>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="space-y-4">
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {/* 待替换：相关流程，并更新 SOURCES.md */}
                    具体的福利申请流程待确认，包括但不限于：
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      申请条件确认（待明确）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      申请材料准备（待指定）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      审核流程说明（待规定）
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      福利发放时间（待通知）
                    </li>
                  </ul>
                  <Badge variant="secondary" className="text-xs">
                    流程待确认
                  </Badge>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>

            <EnhancedCard variant="glass" hoverEffect="glow">
              <EnhancedCardHeader>
                <EnhancedCardTitle className="text-xl">常见问题</EnhancedCardTitle>
              </EnhancedCardHeader>
              <EnhancedCardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                      Q: 如何了解最新福利政策？
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      A: 请关注燕云十六声百业相关渠道，所有福利政策变更将通过最新公告发布。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                      Q: 福利申请是否有时间限制？
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      A: 具体时间限制请以最新公告为准，建议定期关注最新信息。
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                      Q: 如有福利相关问题应如何咨询？
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      A: 请通过指定的联系方式进行咨询，具体联系方式请查看最新公告。
                    </p>
                  </div>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>

            {/* 最终免责声明 */}
            <EnhancedCard variant="glass" className="border-amber-200/50 bg-amber-50/30 dark:bg-amber-900/20 backdrop-blur-md">
              <EnhancedCardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                      免责声明
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      本页面内容仅供参考，不构成任何福利承诺。所有福利政策以燕云十六声百业最新公告为准。
                      网站管理员需要根据最新信息及时更新此页面内容，并在 SOURCES.md 中记录信息来源。
                    </p>
                  </div>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          </motion.div>
        </div>
      </section>
      </div>
    </SubduedShaderBackground>
  )
}
