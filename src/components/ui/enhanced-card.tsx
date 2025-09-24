"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

const EnhancedCard = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "children"> & {
    variant?: "default" | "glass" | "elevated" | "gradient"
    interactive?: boolean
    hoverEffect?: "lift" | "glow" | "tilt" | "none"
    children?: React.ReactNode
  }
>(({ className, variant = "default", interactive = false, hoverEffect = "none", children, ...props }, ref) => {
  // 提取普通HTML div属性，排除framer-motion专属属性
  const { 
    animate, initial, exit, variants, transition, whileHover, whileTap, whileDrag, whileFocus, whileInView,
    viewport, onAnimationStart, onAnimationComplete, onUpdate, onViewportEnter, onViewportLeave,
    onHoverStart, onHoverEnd, onTapStart, onTap, onTapCancel, onPan, onPanStart, onPanEnd,
    drag, dragConstraints, dragElastic, dragMomentum, dragPropagation, dragSnapToOrigin,
    dragTransition, onDrag, onDragStart, onDragEnd, layoutId, layout, layoutDependency,
    onLayoutAnimationStart, onLayoutAnimationComplete, transformTemplate, transformValues,
    ...htmlProps 
  } = props as any
  const baseClasses = "rounded-xl border text-card-foreground shadow-xs transition-all duration-300"
  
  const variantClasses = {
    default: "bg-card border-border",
    glass: "bg-white/80 dark:bg-black/40 backdrop-blur-md border-white/20 dark:border-white/10",
    elevated: "bg-card border-border shadow-lg shadow-black/5 dark:shadow-black/20",
    gradient: "bg-linear-to-br from-card via-card/95 to-card/90 border-white/20 dark:border-white/10 shadow-lg"
  }
  
  const hoverEffectClasses = {
    none: "",
    lift: "hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10",
    glow: "hover:shadow-lg hover:shadow-primary/20 hover:border-primary/30",
    tilt: "hover:rotate-1 hover:scale-105"
  }
  
  const interactiveClasses = interactive ? "cursor-pointer group" : ""
  
  if (hoverEffect !== "none") {
    return (
      <motion.div
        ref={ref}
        whileHover={
          hoverEffect === "lift" ? { y: -4 } :
          hoverEffect === "tilt" ? { rotate: 1, scale: 1.02 } :
          { scale: 1.01 }
        }
        whileTap={interactive ? { scale: 0.98 } : {}}
        className={cn(
          baseClasses,
          variantClasses[variant],
          hoverEffectClasses[hoverEffect],
          interactiveClasses,
          className
        )}
        {...props}
      >
        {variant === "glass" && (
          <>
            {/* 顶部高光 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
            {/* 内部光晕 */}
            <div className="absolute inset-0.5 rounded-xl bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
          </>
        )}
        
        {variant === "gradient" && (
          <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        )}
        
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        interactiveClasses,
        className
      )}
      {...htmlProps}
    >
      {children}
    </div>
  )
})
EnhancedCard.displayName = "EnhancedCard"

const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
EnhancedCardHeader.displayName = "EnhancedCardHeader"

const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
EnhancedCardTitle.displayName = "EnhancedCardTitle"

const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
EnhancedCardDescription.displayName = "EnhancedCardDescription"

const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
EnhancedCardContent.displayName = "EnhancedCardContent"

const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
EnhancedCardFooter.displayName = "EnhancedCardFooter"

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent,
  EnhancedCardFooter,
}
