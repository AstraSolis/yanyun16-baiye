'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MemberGrid } from '@/components/members/MemberGrid'
import { MemberPreview } from '@/components/members/MemberPreview'
import { useMemberData } from '@/hooks/useMemberData'
import { TransparentNavigation } from '@/components/layout/TransparentNavigation'

export default function MembersPage() {
  // 待实现：从 content/members.json 获取真实成员数据
  const { members, loading } = useMemberData()
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const selectedMember = members.find(m => m.id === selectedMemberId) || null

  // 成员数据加载后自动选中第一个成员
  useEffect(() => {
    if (members.length > 0 && !selectedMemberId) {
      setSelectedMemberId(members[0].id)
    }
  }, [members, selectedMemberId])

  // 键盘导航
  const handleKeyNavigation = (direction: 'next' | 'prev') => {
    if (!selectedMemberId || members.length === 0) return

    const currentIndex = members.findIndex(m => m.id === selectedMemberId)
    let nextIndex: number

    if (direction === 'next') {
      nextIndex = currentIndex === members.length - 1 ? 0 : currentIndex + 1
    } else {
      nextIndex = currentIndex === 0 ? members.length - 1 : currentIndex - 1
    }

    setSelectedMemberId(members[nextIndex].id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <TransparentNavigation />
      {/* 首页横幅部分 */}
      <section className="relative px-4 py-20 md:py-32 bg-linear-to-br from-teal-50 via-white to-amber-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              百业成员
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              {/* 待替换：相关描述，并更新 SOURCES.md */}
              认识我们优秀的团队成员，了解他们的故事与贡献
            </p>
            <Badge variant="secondary" className="text-base px-4 py-2">
              以最新信息为准
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* 重要提醒 */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 dark:text-amber-200">
                <strong>重要提醒：</strong>当前显示为示例数据。实际成员信息请以最新公告为准。
                网站管理员需要更新 content/members.json 文件并在 SOURCES.md 中添加信息来源。
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </section>

      {/* 成员部分 */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {members.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto">
                <CardContent className="pt-6">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold mb-2">暂无成员信息</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    请在 content/members.json 中添加成员数据
                  </p>
                  <Badge variant="outline" className="mt-4">
                    待更新
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 成员网格 - 左侧 */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                    团队成员
                  </h2>
                  <div className="lg:sticky lg:top-8">
                    <MemberGrid
                      members={members}
                      selectedMemberId={selectedMemberId}
                      onMemberSelect={setSelectedMemberId}
                      onKeyboardNavigation={handleKeyNavigation}
                    />
                  </div>
                </motion.div>
              </div>

              {/* 成员预览 - 右侧 */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                      成员详情
                    </h2>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleKeyNavigation('prev')}
                        disabled={members.length <= 1}
                        aria-label="上一个成员"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleKeyNavigation('next')}
                        disabled={members.length <= 1}
                        aria-label="下一个成员"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedMember && (
                      <MemberPreview
                        key={selectedMember.id}
                        member={selectedMember}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 使用说明 - 隐藏但屏幕阅读器可访问 */}
      <div className="sr-only" aria-live="polite">
        使用说明：使用鼠标点击头像或使用键盘方向键切换成员。按 Enter 或空格键选择成员。支持触屏滑动操作。
      </div>
    </div>
  )
}
