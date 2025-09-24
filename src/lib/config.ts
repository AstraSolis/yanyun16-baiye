import type { Member } from '@/types/member'
import type { SiteConfig } from './server-config'
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

// 重新导出类型，以便客户端使用
export type { SiteConfig } from './server-config'
export type { 
  PageConfig, 
  PageName, 
  FullPageConfig,
  HomePageConfig,
  MembersPageConfig,
  ActivitiesPageConfig,
  JoinPageConfig,
  PromotionPageConfig
} from '@/types/page-config'

// 客户端版本 - 从静态JSON文件获取配置
export async function getSiteConfigClient(): Promise<SiteConfig | null> {
  try {
    const response = await fetch('/data/siteconfig.json')
    if (!response.ok) {
      throw new Error('Failed to fetch config')
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to load site config on client:', error)
    return null
  }
}

// 客户端版本 - 从静态JSON文件获取成员数据
export async function getMembersClient(): Promise<Member[]> {
  try {
    const response = await fetch('/data/members.json')
    if (!response.ok) {
      throw new Error('Failed to fetch members')
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to load members data on client:', error)
    return []
  }
}

// 客户端版本 - 从静态JSON文件获取页面配置
export async function getPageConfigClient<T extends PageConfig>(
  pageName: PageName
): Promise<T | null> {
  try {
    const response = await fetch(`/data/${pageName}-page.json`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${pageName} config`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to load ${pageName} config on client:`, error)
    return null
  }
}

// 客户端版本 - 获取完整页面配置（合并全局配置和页面配置）
export async function getFullPageConfigClient<T extends PageConfig>(
  pageName: PageName
): Promise<FullPageConfig<T> | null> {
  try {
    const [globalConfig, pageConfig] = await Promise.all([
      getSiteConfigClient(),
      getPageConfigClient<T>(pageName)
    ])
    
    if (!globalConfig || !pageConfig) {
      console.warn(`Failed to load complete config for ${pageName}`)
      return null
    }
    
    return {
      globalConfig,
      pageConfig
    }
  } catch (error) {
    console.error(`Failed to load full page config for ${pageName} on client:`, error)
    return null
  }
}

// 便捷函数：获取特定页面的配置
export const getHomeConfigClient = () => getPageConfigClient<HomePageConfig>('home')
export const getMembersConfigClient = () => getPageConfigClient<MembersPageConfig>('members')
export const getActivitiesConfigClient = () => getPageConfigClient<ActivitiesPageConfig>('activities')
export const getJoinConfigClient = () => getPageConfigClient<JoinPageConfig>('join')
export const getPromotionConfigClient = () => getPageConfigClient<PromotionPageConfig>('promotion')

// 便捷函数：获取完整页面配置
export const getFullHomeConfigClient = () => getFullPageConfigClient<HomePageConfig>('home')
export const getFullMembersConfigClient = () => getFullPageConfigClient<MembersPageConfig>('members')
export const getFullActivitiesConfigClient = () => getFullPageConfigClient<ActivitiesPageConfig>('activities')
export const getFullJoinConfigClient = () => getFullPageConfigClient<JoinPageConfig>('join')
export const getFullPromotionConfigClient = () => getFullPageConfigClient<PromotionPageConfig>('promotion')
