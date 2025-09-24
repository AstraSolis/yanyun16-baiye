const fs = require('fs')
const path = require('path')
const { parse: parseJsonc } = require('jsonc-parser')

// 创建public/data目录
const publicDataDir = path.join(process.cwd(), 'public', 'data')
if (!fs.existsSync(publicDataDir)) {
  fs.mkdirSync(publicDataDir, { recursive: true })
}

// 解析配置文件的函数（支持JSON和JSONC）
function parseConfigFile(baseName) {
  const jsoncPath = path.join(process.cwd(), 'content', `${baseName}.jsonc`)
  const jsonPath = path.join(process.cwd(), 'content', `${baseName}.json`)
  
  if (fs.existsSync(jsoncPath)) {
    const data = fs.readFileSync(jsoncPath, 'utf8')
    console.log(`📖 读取 ${baseName}.jsonc (支持注释)`)
    return parseJsonc(data)
  }
  
  if (fs.existsSync(jsonPath)) {
    const data = fs.readFileSync(jsonPath, 'utf8')
    console.log(`📖 读取 ${baseName}.json`)
    return JSON.parse(data)
  }
  
  return null // 如果文件不存在则返回null
}

// 解析页面配置文件的函数
function parsePageConfigFile(pageName) {
  const jsoncPath = path.join(process.cwd(), 'content', `${pageName}-page.jsonc`)
  const jsonPath = path.join(process.cwd(), 'content', `${pageName}-page.json`)
  
  if (fs.existsSync(jsoncPath)) {
    const data = fs.readFileSync(jsoncPath, 'utf8')
    console.log(`📖 读取页面配置 ${pageName}-page.jsonc`)
    return parseJsonc(data)
  }
  
  if (fs.existsSync(jsonPath)) {
    const data = fs.readFileSync(jsonPath, 'utf8')
    console.log(`📖 读取页面配置 ${pageName}-page.json`)
    return JSON.parse(data)
  }
  
  console.log(`⚠️  页面配置 ${pageName}-page 不存在，跳过`)
  return null
}

try {
  console.log('🚀 开始生成静态数据文件...')
  console.log('')
  
  // 解析主要配置文件
  console.log('📋 处理主要配置文件:')
  const siteConfig = parseConfigFile('siteconfig')
  const members = parseConfigFile('members')
  
  if (!siteConfig) {
    throw new Error('找不到 siteconfig.json 或 siteconfig.jsonc 文件')
  }
  if (!members) {
    throw new Error('找不到 members.json 或 members.jsonc 文件')
  }
  
  // 解析页面配置文件
  console.log('')
  console.log('📄 处理页面配置文件:')
  const pageNames = ['home', 'members', 'activities', 'join', 'promotion']
  const pageConfigs = {}
  
  for (const pageName of pageNames) {
    const pageConfig = parsePageConfigFile(pageName)
    if (pageConfig) {
      pageConfigs[pageName] = pageConfig
    }
  }
  
  // 写入主要配置文件
  console.log('')
  console.log('💾 写入配置文件:')
  const siteConfigDest = path.join(publicDataDir, 'siteconfig.json')
  const membersDest = path.join(publicDataDir, 'members.json')
  
  fs.writeFileSync(siteConfigDest, JSON.stringify(siteConfig, null, 2))
  fs.writeFileSync(membersDest, JSON.stringify(members, null, 2))
  
  console.log('  ✓ public/data/siteconfig.json')
  console.log('  ✓ public/data/members.json')
  
  // 写入页面配置文件
  for (const [pageName, config] of Object.entries(pageConfigs)) {
    const pageDest = path.join(publicDataDir, `${pageName}-page.json`)
    fs.writeFileSync(pageDest, JSON.stringify(config, null, 2))
    console.log(`  ✓ public/data/${pageName}-page.json`)
  }
  
  console.log('')
  console.log('✅ 所有静态数据文件生成成功！')
  console.log('')
  console.log('📝 文件列表:')
  console.log('  📁 基础配置:')
  console.log('    - public/data/siteconfig.json')
  console.log('    - public/data/members.json')
  if (Object.keys(pageConfigs).length > 0) {
    console.log('  📁 页面配置:')
    for (const pageName of Object.keys(pageConfigs)) {
      console.log(`    - public/data/${pageName}-page.json`)
    }
  }
  console.log('')
  console.log('💡 提示: 现在你可以在 .jsonc 文件中使用注释了！')
  console.log('💡 页面配置文件支持独立的内容和显示设置')
} catch (error) {
  console.error('❌ 生成静态数据文件失败:', error.message)
  process.exit(1)
}
