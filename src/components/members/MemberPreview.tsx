'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, MapPin, Calendar, Tag } from 'lucide-react'
import type { Member } from '@/types/member'

interface MemberPreviewProps {
  member: Member
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
}

const imageVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, delay: 0.1 }
}

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay: 0.2 }
}

export function MemberPreview({ member }: MemberPreviewProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <Card className="overflow-hidden">
        {/* Large Image Section */}
        <div className="relative h-64 md:h-80 bg-linear-to-br from-primary/5 to-secondary/5">
          {member.largeImage ? (
            <motion.div
              variants={imageVariants}
              className="relative h-full w-full"
            >
              <Image
                src={member.largeImage}
                alt={`${member.displayName} 大头像`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                className="object-cover"
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyKzSKlUSy7kMn8eBEaQKlleKOSKBelTYSUPCEaC+7sHTpEL7cAKm5qXEwB9WBXZ+y2m+b7fthcbQO/G8jbLf4OFa4TjNgDZqq1KXLRPRX/2Q=="
              />
            </motion.div>
          ) : (
            <motion.div
              variants={imageVariants}
              className="h-full w-full flex items-center justify-center"
            >
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={member.avatar}
                  alt={`${member.displayName} 头像`}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                  {member.displayName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}

          {/* Overlay with basic info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/50 to-transparent p-4"
          >
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">
              {member.displayName}
            </h1>
            {member.role && (
              <p className="text-white/90 text-lg">
                {member.role}
              </p>
            )}
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div variants={contentVariants}>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">成员信息</CardTitle>
            </div>
            
            {/* Tags */}
            {member.tags && member.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-1 flex-wrap">
                  {member.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {/* Bio Section */}
            {member.bio ? (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  个人简介
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-dashed">
                <p className="text-muted-foreground text-sm text-center">
                  暂无个人简介信息
                </p>
              </div>
            )}

            {/* Additional Information */}
            <div className="space-y-4">
              {/* Join Date (if available) */}
              {member.joinDate && (
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">加入时间:</span>
                  <span className="font-medium">{member.joinDate}</span>
                </div>
              )}

              {/* Location (if available) */}
              {member.location && (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">所在地:</span>
                  <span className="font-medium">{member.location}</span>
                </div>
              )}
            </div>

            {/* Placeholder for missing data */}
            {!member.bio && !member.joinDate && !member.location && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4"
              >
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  <strong>提醒：</strong>当前显示为占位数据。请在 content/members.json 中更新此成员的详细信息，
                  并在 SOURCES.md 中添加信息来源。
                </p>
              </motion.div>
            )}

            {/* Sources indicator for admin */}
            {member.sources && member.sources.length > 0 ? (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>信息来源: {member.sources.length} 个</span>
                  <Badge variant="outline" className="text-xs">
                    已验证
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>信息来源: 待添加</span>
                  <Badge variant="outline" className="text-xs border-amber-300 text-amber-600">
                    未验证
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  )
}
