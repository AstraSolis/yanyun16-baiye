'use client'

import { useState, useEffect, useCallback } from 'react'
import type { 
  PageConfig, 
  PageName, 
  FullPageConfig,
  HomePageConfig,
  MembersPageConfig,
  ActivitiesPageConfig,
  JoinPageConfig,
  PromotionPageConfig,
  SiteConfig
} from '@/lib/config'
import { getFullPageConfigClient, getSiteConfigClient } from '@/lib/config'

// 页面配置Hook的返回类型
interface UsePageConfigReturn<T extends PageConfig> {
  globalConfig: SiteConfig | null
  pageConfig: T | null
  fullConfig: FullPageConfig<T> | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// 通用页面配置Hook
export function usePageConfig<T extends PageConfig>(
  pageName: PageName
): UsePageConfigReturn<T> {
  const [globalConfig, setGlobalConfig] = useState<SiteConfig | null>(null)
  const [pageConfig, setPageConfig] = useState<T | null>(null)
  const [fullConfig, setFullConfig] = useState<FullPageConfig<T> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadConfig = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const config = await getFullPageConfigClient<T>(pageName)
      if (config) {
        setGlobalConfig(config.globalConfig)
        setPageConfig(config.pageConfig)
        setFullConfig(config)
      } else {
        // 如果页面配置不存在，至少加载全局配置
        const global = await getSiteConfigClient()
        setGlobalConfig(global)
        setError(`页面配置 ${pageName} 加载失败，仅使用全局配置`)
      }
    } catch (err) {
      console.error(`Failed to load config for ${pageName}:`, err)
      setError(err instanceof Error ? err.message : '配置加载失败')
    } finally {
      setLoading(false)
    }
  }, [pageName])

  useEffect(() => {
    loadConfig()
  }, [loadConfig, pageName])

  const refetch = async () => {
    await loadConfig()
  }

  return {
    globalConfig,
    pageConfig,
    fullConfig,
    loading,
    error,
    refetch
  }
}

// 特定页面的Hook便捷函数
export const useHomeConfig = () => usePageConfig<HomePageConfig>('home')
export const useMembersConfig = () => usePageConfig<MembersPageConfig>('members')
export const useActivitiesConfig = () => usePageConfig<ActivitiesPageConfig>('activities')
export const useJoinConfig = () => usePageConfig<JoinPageConfig>('join')
export const usePromotionConfig = () => usePageConfig<PromotionPageConfig>('promotion')

// 页面元数据Hook（用于SEO）
export function usePageMetadata(pageName: PageName) {
  const { pageConfig, globalConfig, loading } = usePageConfig(pageName)
  
  const metadata = {
    title: pageConfig?.seo?.metaTitle || pageConfig?.pageInfo?.title || globalConfig?.siteTitle || '百业',
    description: pageConfig?.seo?.metaDescription || pageConfig?.pageInfo?.description || globalConfig?.siteDescription || '',
    keywords: pageConfig?.pageInfo?.keywords || globalConfig?.siteMetadata?.keywords || [],
    ogImage: pageConfig?.seo?.ogImage || '/assets/og-default.jpg'
  }

  return { metadata, loading }
}

// 辅助函数：合并配置对象
export function mergeConfigs<T extends PageConfig>(
  globalConfig: SiteConfig,
  pageConfig: T,
  overrides?: Partial<T>
): T {
  return {
    ...pageConfig,
    ...overrides,
    // 确保某些字段总是使用全局配置作为基础
    pageInfo: {
      ...pageConfig.pageInfo,
      // 页面配置可以覆盖全局配置，但保留页面特定的内容
    },
    seo: {
      ...pageConfig.seo,
      metaTitle: pageConfig.seo?.metaTitle || `${pageConfig.pageInfo.title} - ${globalConfig.siteTitle}`,
      metaDescription: pageConfig.seo?.metaDescription || pageConfig.pageInfo.description,
    }
  } as T
}

// 配置验证函数
export function validatePageConfig<T extends PageConfig>(
  config: T | null
): config is T {
  if (!config) return false
  
  // 基本结构验证
  if (!config.pageInfo || !config.content || !config.seo || !config.display) {
    return false
  }
  
  // pageInfo 必需字段验证
  if (!config.pageInfo.title || !config.pageInfo.description) {
    return false
  }
  
  return true
}

// 调试辅助函数
export function useDebugPageConfig(pageName: PageName) {
  const config = usePageConfig(pageName)

  useEffect(() => {
    if (!config.loading) {
      console.group(`🔧 页面配置调试: ${pageName}`)
      console.log('全局配置:', config.globalConfig)
      console.log('页面配置:', config.pageConfig)
      console.log('完整配置:', config.fullConfig)
      console.log('加载状态:', { loading: config.loading, error: config.error })
      console.groupEnd()
    }
  }, [
    config.loading,
    config.error,
    config.globalConfig,
    config.pageConfig,
    config.fullConfig,
    pageName
  ])
  
  return config
}
