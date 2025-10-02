import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import type { Member } from '@/types/member'
import type { 
  PageConfig, 
  PageName, 
  FullPageConfig,
  HomePageConfig,
  MembersPageConfig,
  ActivitiesPageConfig,
  JoinPageConfig,
  PromotionPageConfig
} from '@/types/page-config'

export interface SiteConfig {
  siteTitle: string
  siteDescription: string
  baseUrl: string
  siteIcon?: {
    favicon: string
    icon16: string
    icon32: string
    appleTouchIcon: string
  }
  contactWebhook: string
  defaultAvatar: string
  homeDisplay?: {
    heroAvatar: string
  }
  socialMedia: {
    QQ: string
    wechat: string
    weibo: string
    email: string
  }
  applicationSettings: {
    enableApplicationForm: boolean
    applicationEmail: string
    expectedResponseTime: string
    applicationRequirements: string[]
  }
  siteMetadata: {
    keywords: string[]
    author: string
    language: string
    lastUpdated: string
    version: string
  }
  displaySettings: {
    showMemberJoinDate: boolean
    showMemberLocation: boolean
    showMemberTags: boolean
    maxMemberTagsDisplay: number
    enableDarkMode: boolean
    defaultTheme: string
  }
}

// 服务端专用：读取站点配置
export async function getSiteConfigServer(): Promise<SiteConfig> {
  try {
    let configPath = path.join(process.cwd(), 'content', 'siteconfig.yaml')

    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8')
      return yaml.load(configData) as SiteConfig
    }

    configPath = path.join(process.cwd(), 'content', 'siteconfig.yml')
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8')
      return yaml.load(configData) as SiteConfig
    }

    throw new Error('Site config file not found')
  } catch (error) {
    console.error('Failed to load site config:', error)
    // 返回默认配置
    return {
      siteTitle: '燕云十六声 · 百业',
      siteDescription: '燕云十六声百业宣传站点',
      baseUrl: '',
      siteIcon: {
        favicon: '/favicon.ico',
        icon16: '/favicon-16x16.png',
        icon32: '/favicon-32x32.png',
        appleTouchIcon: '/apple-touch-icon.png'
      },
      contactWebhook: '',
      defaultAvatar: '/assets/placeholders/avatar-small.svg',
      socialMedia: {
        QQ: '',
        wechat: '',
        weibo: '',
        email: ''
      },
      applicationSettings: {
        enableApplicationForm: true,
        applicationEmail: '',
        expectedResponseTime: '3-7个工作日',
        applicationRequirements: []
      },
      siteMetadata: {
        keywords: ['燕云十六声', '百业', '游戏社区'],
        author: '百业',
        language: 'zh-CN',
        lastUpdated: '',
        version: '1.0.0'
      },
      displaySettings: {
        showMemberJoinDate: true,
        showMemberLocation: true,
        showMemberTags: true,
        maxMemberTagsDisplay: 3,
        enableDarkMode: true,
        defaultTheme: 'light'
      }
    }
  }
}

// 服务端专用：读取成员数据
export async function getMembersServer(): Promise<Member[]> {
  try {
    let membersPath = path.join(process.cwd(), 'content', 'members.yaml')

    if (fs.existsSync(membersPath)) {
      const membersData = fs.readFileSync(membersPath, 'utf8')
      return yaml.load(membersData) as Member[]
    }

    membersPath = path.join(process.cwd(), 'content', 'members.yml')
    if (fs.existsSync(membersPath)) {
      const membersData = fs.readFileSync(membersPath, 'utf8')
      return yaml.load(membersData) as Member[]
    }

    throw new Error('Members file not found')
  } catch (error) {
    console.error('Failed to load members data:', error)
    return []
  }
}

// 服务端专用：读取页面配置
export async function getPageConfigServer<T extends PageConfig>(
  pageName: PageName
): Promise<T | null> {
  try {
    let configPath = path.join(process.cwd(), 'content', `${pageName}-page.yaml`)

    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8')
      return yaml.load(configData) as T
    }

    configPath = path.join(process.cwd(), 'content', `${pageName}-page.yml`)
    if (fs.existsSync(configPath)) {
      const configData = fs.readFileSync(configPath, 'utf8')
      return yaml.load(configData) as T
    }

    return null
  } catch (error) {
    console.error(`Failed to load page config for ${pageName}:`, error)
    return null
  }
}

// 服务端专用：读取完整页面配置（合并全局配置和页面配置）
export async function getFullPageConfigServer<T extends PageConfig>(
  pageName: PageName
): Promise<FullPageConfig<T> | null> {
  try {
    const [globalConfig, pageConfig] = await Promise.all([
      getSiteConfigServer(),
      getPageConfigServer<T>(pageName)
    ])
    
    if (!pageConfig) {
      console.warn(`Page config not found for ${pageName}, using defaults`)
      return null
    }
    
    return {
      globalConfig,
      pageConfig
    }
  } catch (error) {
    console.error(`Failed to load full page config for ${pageName}:`, error)
    return null
  }
}

// 便捷函数：获取特定页面的配置
export const getHomeConfigServer = () => getPageConfigServer<HomePageConfig>('home')
export const getMembersConfigServer = () => getPageConfigServer<MembersPageConfig>('members')
export const getActivitiesConfigServer = () => getPageConfigServer<ActivitiesPageConfig>('activities')
export const getJoinConfigServer = () => getPageConfigServer<JoinPageConfig>('join')
export const getPromotionConfigServer = () => getPageConfigServer<PromotionPageConfig>('promotion')

// 便捷函数：获取完整页面配置
export const getFullHomeConfigServer = () => getFullPageConfigServer<HomePageConfig>('home')
export const getFullMembersConfigServer = () => getFullPageConfigServer<MembersPageConfig>('members')
export const getFullActivitiesConfigServer = () => getFullPageConfigServer<ActivitiesPageConfig>('activities')
export const getFullJoinConfigServer = () => getFullPageConfigServer<JoinPageConfig>('join')
export const getFullPromotionConfigServer = () => getFullPageConfigServer<PromotionPageConfig>('promotion')
