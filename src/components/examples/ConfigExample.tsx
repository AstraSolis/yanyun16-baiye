'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useHomeConfig, usePageMetadata, debugPageConfig } from '@/hooks/usePageConfig'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Settings, Eye, Code } from 'lucide-react'

// 配置使用示例组件
export function ConfigExample() {
  // 使用页面配置 Hook
  const { globalConfig, pageConfig, fullConfig, loading, error } = useHomeConfig()
  
  // 使用页面元数据 Hook
  const { metadata } = usePageMetadata('home')
  
  // 开发环境下启用调试
  if (process.env.NODE_ENV === 'development') {
    debugPageConfig('home')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">加载配置中...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>配置加载错误: {error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">页面配置系统示例</h1>
        <p className="text-muted-foreground">
          展示如何使用新的页面级配置系统
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 全局配置展示 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              全局配置
            </CardTitle>
            <CardDescription>
              从 content/siteconfig.jsonc 加载的全局设置
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {globalConfig && (
              <>
                <div>
                  <strong>网站标题:</strong> {globalConfig.siteTitle}
                </div>
                <div>
                  <strong>网站描述:</strong> 
                  <p className="text-sm text-muted-foreground mt-1">
                    {globalConfig.siteDescription}
                  </p>
                </div>
                <div>
                  <strong>默认主题:</strong> 
                  <Badge variant="outline">
                    {globalConfig.displaySettings.defaultTheme}
                  </Badge>
                </div>
                <div>
                  <strong>版本:</strong> 
                  <Badge>{globalConfig.siteMetadata.version}</Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* 页面配置展示 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              主页配置
            </CardTitle>
            <CardDescription>
              从 content/pages/home.jsonc 加载的页面特定设置
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pageConfig && (
              <>
                <div>
                  <strong>页面标题:</strong> {pageConfig.pageInfo.title}
                </div>
                <div>
                  <strong>页面描述:</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    {pageConfig.pageInfo.description}
                  </p>
                </div>
                <div>
                  <strong>导航样式:</strong>
                  <Badge variant="outline">
                    {pageConfig.display.navigationStyle}
                  </Badge>
                </div>
                <div>
                  <strong>背景类型:</strong>
                  <Badge variant="outline">
                    {pageConfig.display.backgroundType}
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* SEO元数据展示 */}
        <Card>
          <CardHeader>
            <CardTitle>SEO 元数据</CardTitle>
            <CardDescription>
              自动合并的页面元数据信息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <strong>Meta标题:</strong> {metadata.title}
            </div>
            <div>
              <strong>Meta描述:</strong>
              <p className="text-sm text-muted-foreground mt-1">
                {metadata.description}
              </p>
            </div>
            <div>
              <strong>关键词:</strong>
              <div className="flex flex-wrap gap-1 mt-1">
                {metadata.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 页面内容配置展示 */}
        <Card>
          <CardHeader>
            <CardTitle>内容配置</CardTitle>
            <CardDescription>
              页面特定的内容配置
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pageConfig && (
              <>
                <div>
                  <strong>Hero徽章:</strong> {pageConfig.content.hero.badge}
                </div>
                <div>
                  <strong>主标题:</strong>
                  <div className="mt-1 text-sm">
                    <div>第一行: <Badge variant="outline">{pageConfig.content.hero.mainTitle.line1.highlight}</Badge> {pageConfig.content.hero.mainTitle.line1.text}</div>
                    <div className="mt-1">第二行: {pageConfig.content.hero.mainTitle.line2.text}</div>
                  </div>
                </div>
                <div>
                  <strong>按钮配置:</strong>
                  <div className="flex gap-2 mt-1">
                    {pageConfig.content.hero.buttons.map((btn, index) => (
                      <Button 
                        key={index} 
                        variant={btn.type === 'primary' ? 'default' : 'outline'} 
                        size="sm"
                      >
                        {btn.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            使用方法
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">在组件中使用页面配置:</h4>
            <pre className="text-sm overflow-x-auto">
{`import { useHomeConfig } from '@/hooks/usePageConfig'

function MyComponent() {
  const { globalConfig, pageConfig, loading } = useHomeConfig()
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      <h1>{pageConfig?.pageInfo.title}</h1>
      <p>{globalConfig?.siteTitle}</p>
    </div>
  )
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* 配置文件位置说明 */}
      <Alert>
        <AlertDescription>
          <div className="space-y-2">
            <div><strong>全局配置文件:</strong> <code>content/siteconfig.jsonc</code> - 网站基础设置、主题、社交媒体等</div>
            <div><strong>页面配置文件:</strong> <code>content/pages/*.jsonc</code> - 各页面的特定内容和显示设置</div>
            <div><strong>静态数据文件:</strong> <code>public/data/</code> - 运行 <code>npm run generate</code> 生成</div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
