'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Member } from '@/types/member'

interface MemberGridProps {
  members: Member[]
  selectedMemberId: string | null
  onMemberSelect: (memberId: string) => void
  onKeyboardNavigation: (direction: 'next' | 'prev') => void
}

export function MemberGrid({ 
  members, 
  selectedMemberId, 
  onMemberSelect, 
  onKeyboardNavigation 
}: MemberGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const selectedButtonRef = useRef<HTMLButtonElement>(null)

  // 焦点管理 - 确保选中的成员按钮在选择变更时获得焦点
  useEffect(() => {
    if (selectedButtonRef.current) {
      selectedButtonRef.current.focus()
    }
  }, [selectedMemberId])

  // 键盘事件处理器，实现流动 tabindex 模式
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        onKeyboardNavigation('prev')
        break
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        onKeyboardNavigation('next')
        break
      case 'Home':
        event.preventDefault()
        if (members.length > 0) {
          onMemberSelect(members[0].id)
        }
        break
      case 'End':
        event.preventDefault()
        if (members.length > 0) {
          onMemberSelect(members[members.length - 1].id)
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        // 回车/空格键由按钮点击处理
        break
    }
  }, [onKeyboardNavigation, onMemberSelect, members])

  // 移动端触摸/滑动支持
  const handleTouchStart = useRef<{ x: number; y: number } | null>(null)
  
  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0]
    handleTouchStart.current = { x: touch.clientX, y: touch.clientY }
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    if (!handleTouchStart.current) return

    const touch = event.changedTouches[0]
    const diffX = handleTouchStart.current.x - touch.clientX
    const diffY = handleTouchStart.current.y - touch.clientY

    // 仅处理水平滑动
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        onKeyboardNavigation('next')
      } else {
        onKeyboardNavigation('prev')
      }
    }

    handleTouchStart.current = null
  }

  if (members.length === 0) {
    return (
      <div className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
        暂无成员数据
      </div>
    )
  }

  return (
    <div
      ref={gridRef}
      role="listbox"
      aria-label="团队成员列表"
      aria-activedescendant={selectedMemberId || undefined}
      className="space-y-3 max-h-96 overflow-y-auto pr-2"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {members.map((member, index) => {
        const isSelected = member.id === selectedMemberId
        
        return (
          <motion.button
            key={member.id}
            ref={isSelected ? selectedButtonRef : undefined}
            role="option"
            aria-selected={isSelected}
            aria-describedby={`member-${member.id}-description`}
            tabIndex={isSelected ? 0 : -1}
            className={cn(
              'w-full p-3 rounded-lg border-2 transition-all duration-200 group',
              'flex items-center gap-3 text-left',
              'focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2',
              isSelected
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-transparent bg-card hover:bg-accent hover:shadow-xs'
            )}
            onClick={() => onMemberSelect(member.id)}
            onKeyDown={handleKeyDown}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Avatar className={cn(
              'h-12 w-12 border-2 transition-colors',
              isSelected ? 'border-primary' : 'border-transparent'
            )}>
              <AvatarImage
                src={member.avatar}
                alt={`${member.displayName} 的头像`}
                loading="lazy"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {member.displayName.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                  'font-medium truncate transition-colors',
                  isSelected ? 'text-primary' : 'text-foreground'
                )}>
                  {member.displayName}
                </h3>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-primary rounded-full shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>
              
              {member.role && (
                <p className="text-sm text-muted-foreground truncate">
                  {member.role}
                </p>
              )}
              
              {member.tags && member.tags.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {member.tags.slice(0, 2).map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5 h-auto"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {member.tags.length > 2 && (
                    <Badge
                      variant="outline"
                      className="text-xs px-1.5 py-0.5 h-auto"
                    >
                      +{member.tags.length - 2}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* 屏幕阅读器的隐藏描述 */}
            <div
              id={`member-${member.id}-description`}
              className="sr-only"
            >
              {member.bio ? `简介: ${member.bio}` : ''}
              {member.tags && member.tags.length > 0 ? ` 标签: ${member.tags.join(', ')}` : ''}
            </div>
          </motion.button>
        )
      })}
      
      {/* 屏幕阅读器的使用说明 */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        共 {members.length} 名成员。使用方向键切换选择，回车键确认选择。
        当前选中: {members.find(m => m.id === selectedMemberId)?.displayName}
      </div>
    </div>
  )
}
