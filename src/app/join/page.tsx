'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { TransparentNavigation } from '@/components/layout/TransparentNavigation'
import { 
  UserPlus, 
  Mail, 
  User, 
  FileText, 
  Send, 
  AlertTriangle,
  CheckCircle,
  ExternalLink
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function JoinPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    experience: '',
    contact: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 待实现：实际的表单提交功能
    // 可以使用 webhook、API 接口或邮件服务
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // 模拟表单提交
      setSubmitStatus('success')
      setFormData({ name: '', email: '', reason: '', experience: '', contact: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
    }
  }

  return (
    <div className="min-h-screen">
      <TransparentNavigation />
      {/* 首页横幅部分 */}
      <section className="relative px-4 py-20 md:py-32 bg-linear-to-br from-teal-50 via-white to-primary/5 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              加入百业
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              {/* 待替换：相关招募信息，并更新 SOURCES.md */}
              欢迎有志之士申请加入燕云十六声百业，共同创造精彩未来
            </p>
            <Badge variant="secondary" className="text-base px-4 py-2">
              申请流程以最新公告为准
            </Badge>
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
                <strong>重要提醒：</strong>本申请表单为示例功能，实际申请流程请以最新公告为准。
                网站管理员需要配置真实的申请处理机制，并在 content/siteconfig.json 中设置 contactWebhook。
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </section>

      {/* 主要内容 */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 申请表单 */}
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} initial="initial" animate="animate">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <UserPlus className="h-6 w-6 text-primary" />
                      <CardTitle className="text-2xl">申请表单</CardTitle>
                    </div>
                    <CardDescription>
                      请填写以下信息，我们将尽快审核您的申请
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* 姓名字段 */}
                      <div>
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          姓名 / 昵称 *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="请输入您的姓名或常用昵称"
                          className="mt-2"
                        />
                      </div>

                      {/* 邮箱字段 */}
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          邮箱地址 *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          className="mt-2"
                        />
                      </div>

                      {/* 联系方式 */}
                      <div>
                        <Label htmlFor="contact" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          联系方式
                        </Label>
                        <Input
                          id="contact"
                          type="text"
                          value={formData.contact}
                          onChange={(e) => handleInputChange('contact', e.target.value)}
                          placeholder="QQ、微信、电话等（可选）"
                          className="mt-2"
                        />
                      </div>

                      {/* 申请理由 */}
                      <div>
                        <Label htmlFor="reason" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          申请理由 *
                        </Label>
                        <Textarea
                          id="reason"
                          required
                          value={formData.reason}
                          onChange={(e) => handleInputChange('reason', e.target.value)}
                          placeholder="请简述您申请加入百业的原因和期望..."
                          rows={4}
                          className="mt-2"
                        />
                      </div>

                      {/* 相关经验 */}
                      <div>
                        <Label htmlFor="experience" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          相关经验
                        </Label>
                        <Textarea
                          id="experience"
                          value={formData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          placeholder="请介绍您的相关经验、技能或特长（可选）..."
                          rows={4}
                          className="mt-2"
                        />
                      </div>

                      {/* 提交状态信息 */}
                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800 dark:text-green-200">
                              申请提交成功！我们将尽快审核您的申请并与您联系。
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}

                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <AlertDescription className="text-red-800 dark:text-red-200">
                              申请提交失败，请检查网络连接后重试。如持续出现问题，请通过其他方式联系我们。
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}

                      {/* 提交按钮 */}
                      <Button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.reason}
                        className="w-full"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            提交中...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            提交申请
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* 侧边栏信息 */}
            <div className="space-y-6">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">申请须知</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        请如实填写个人信息
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        保持邮箱畅通，我们将通过邮件联系
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        审核周期通常为 3-7 个工作日
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        如有疑问可通过相关渠道咨询
                      </li>
                    </ul>
                    <Badge variant="outline" className="mt-4 text-xs">
                      待确认
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">其他联系方式</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      {/* 待替换：相关联系信息，并更新 SOURCES.md */}
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ExternalLink className="h-4 w-4" />
                        <span>QQ群: 待添加</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ExternalLink className="h-4 w-4" />
                        <span>微信群: 待添加</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>联系邮箱: 待添加</span>
                      </div>
                      <Badge variant="secondary" className="text-xs mt-2">
                        以最新公告为准
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              >
                <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2 text-sm">
                          配置提醒
                        </h4>
                        <p className="text-xs text-amber-700 dark:text-amber-300">
                          此申请表单为示例实现。管理员需要在 content/siteconfig.json 中配置 contactWebhook 
                          或其他申请处理机制，并更新相关联系信息。
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
