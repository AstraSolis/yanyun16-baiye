// 页面配置相关类型定义

export interface PageInfo {
  title: string
  subtitle?: string
  description: string
  keywords: string[]
  lastUpdated: string
}

export interface SEOConfig {
  metaTitle: string
  metaDescription: string
  ogImage?: string
}

export interface DisplayConfig {
  [key: string]: any // 允许每个页面有不同的显示配置
}

// 基础页面配置接口
export interface BasePageConfig {
  pageInfo: PageInfo
  seo: SEOConfig
  display: DisplayConfig
  content: {
    [key: string]: any // 允许每个页面有不同的内容配置
  }
}

// 主页配置
export interface HomePageConfig extends BasePageConfig {
  content: {
    hero: {
      badge: string
      mainTitle: {
        line1: {
          highlight?: string
          text: string
        }
        line2: {
          text: string
        }
      }
      buttons: Array<{
        text: string
        link: string
        type: 'primary' | 'secondary'
      }>
    }
  }
  display: {
    showNavigation: boolean
    navigationStyle: 'overlay' | 'fixed' | 'transparent'
    backgroundType: 'shader' | 'gradient' | 'image'
    enableAnimations: boolean
  }
}

// 成员页面配置
export interface MembersPageConfig extends BasePageConfig {
  content: {
    hero: {
      title: string
      description: string
      badge: string
    }
    sections: {
      memberGrid: {
        title: string
        emptyState: {
          icon: string
          title: string
          description: string
          badge: string
        }
      }
      memberPreview: {
        title: string
        navigationEnabled: boolean
      }
    }
    notices: Array<{
      type: 'warning' | 'info' | 'success' | 'error'
      title: string
      content: string
      icon: string
    }>
  }
  display: {
    layout: 'grid' | 'list' | 'grid-preview'
    showMemberDetails: boolean
    enableKeyboardNavigation: boolean
    animationStyle: 'fade' | 'slide' | 'scale'
  }
  memberDisplay: {
    showJoinDate: boolean
    showLocation: boolean
    showTags: boolean
    maxTagsDisplay: number
    avatarStyle: 'rounded' | 'circle' | 'square'
    cardStyle: 'classic' | 'modern' | 'minimal'
  }
}

// 活动页面配置
export interface ActivitiesPageConfig extends BasePageConfig {
  content: {
    hero: {
      title: string
      description: string
      badge: string
      icon: string
    }
    benefitCategories: Array<{
      icon: string
      title: string
      description: string
      badge: string
      color: string
      items: string[]
    }>
    informationCards: Array<{
      title: string
      content: any
      badge?: string
    }>
    notices: Array<{
      type: string
      title: string
      content: string
      icon: string
    }>
  }
  display: {
    backgroundType: 'subdued-shader' | 'gradient' | 'solid'
    backgroundVariant: 'primary' | 'secondary' | 'custom'
    cardStyle: 'standard' | 'enhanced' | 'glass'
    enableAnimations: boolean
    enableHoverEffects: boolean
  }
}

// 加入页面配置
export interface JoinPageConfig extends BasePageConfig {
  content: {
    hero: {
      title: string
      description: string
      badge: string
    }
    applicationForm: {
      title: string
      subtitle: string
      icon: string
      fields: Array<{
        id: string
        label: string
        type: string
        required: boolean
        placeholder: string
        icon: string
        rows?: number
      }>
      submitButton: {
        text: string
        loadingText: string
        icon: string
      }
      messages: {
        success: {
          title: string
          content: string
          icon: string
        }
        error: {
          title: string
          content: string
          icon: string
        }
      }
    }
    sidebar: Array<{
      title: string
      type: string
      items?: any
      content?: string
      badge?: string
      icon?: string
      variant?: string
    }>
    notices: Array<{
      type: string
      title: string
      content: string
      icon: string
    }>
  }
  features: {
    enableApplicationForm: boolean
    enableRealTimeValidation: boolean
    enableAutoSave: boolean
    submitMethod: 'webhook' | 'email' | 'api'
  }
  display: {
    layout: 'form-only' | 'form-sidebar' | 'wizard'
    formStyle: 'classic' | 'modern' | 'minimal'
    enableAnimations: boolean
    sidebarPosition: 'left' | 'right'
  }
}

// 推广页面配置
export interface PromotionPageConfig extends BasePageConfig {
  content: {
    hero: {
      title: string
      description: string
      badge: string
    }
    overview: {
      title: string
      description: string
      badge: string
    }
    highlights: Array<{
      icon: string
      title: string
      description: string
      badge: string
      details: string
    }>
    detailSections: Array<{
      id: string
      title: string
      content?: string
      items?: Array<{
        title: string
        description: string
      }>
      badge: string
      type: 'text' | 'list' | 'timeline'
    }>
    notices: Array<{
      type: string
      title: string
      content: string
      icon: string
    }>
  }
  display: {
    layout: 'overview-highlights' | 'sections' | 'timeline'
    highlightStyle: 'cards' | 'grid' | 'showcase'
    enableAnimations: boolean
    enableHoverEffects: boolean
    cardSpacing: 'compact' | 'normal' | 'spacious'
  }
}

// 页面配置联合类型
export type PageConfig = 
  | HomePageConfig 
  | MembersPageConfig 
  | ActivitiesPageConfig 
  | JoinPageConfig 
  | PromotionPageConfig

// 页面名称类型
export type PageName = 'home' | 'members' | 'activities' | 'join' | 'promotion'

// 合并后的完整页面配置（包含全局配置）
export interface FullPageConfig<T extends PageConfig = PageConfig> {
  globalConfig: import('../lib/server-config').SiteConfig
  pageConfig: T
}
