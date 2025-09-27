#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

/**
 * 验证 content 目录中的数据文件
 * 检查基本的数据完整性和格式正确性
 */

console.log('🔍 开始验证内容数据文件...\n')

let hasErrors = false
let hasWarnings = false

/**
 * 解析配置文件（支持 YAML）
 */
function parseConfigFile(baseName) {
  const yamlPath = path.join(process.cwd(), 'content', `${baseName}.yaml`)
  const ymlPath = path.join(process.cwd(), 'content', `${baseName}.yml`)

  if (fs.existsSync(yamlPath)) {
    const data = fs.readFileSync(yamlPath, 'utf8')
    return { data: yaml.load(data), path: yamlPath, format: 'yaml' }
  }

  if (fs.existsSync(ymlPath)) {
    const data = fs.readFileSync(ymlPath, 'utf8')
    return { data: yaml.load(data), path: ymlPath, format: 'yaml' }
  }

  return null
}

/**
 * 验证 members 文件
 */
function validateMembers() {
  console.log('验证 content/members...')

  const config = parseConfigFile('members')
  if (!config) {
    console.error('❌ 错误: content/members.yaml 或 content/members.yml 文件不存在')
    hasErrors = true
    return
  }

  let membersData
  try {
    membersData = config.data
    console.log(`✅ 成功解析 ${config.format.toUpperCase()} 文件: ${path.basename(config.path)}`)
  } catch (error) {
    console.error(`❌ 错误: ${path.basename(config.path)} 不是有效的 ${config.format.toUpperCase()} 文件`)
    console.error('   详情:', error.message)
    hasErrors = true
    return
  }

  if (!Array.isArray(membersData)) {
    console.error('❌ 错误: members.yaml 应该是一个数组')
    hasErrors = true
    return
  }

  console.log(`📊 成员数据: 共 ${membersData.length} 个成员`)

  // 验证每个成员的数据
  const requiredFields = ['id', 'displayName', 'avatar']
  const optionalFields = ['largeImage', 'role', 'bio', 'tags', 'joinDate', 'location', 'sources']
  const seenIds = new Set()

  membersData.forEach((member, index) => {
    const memberPrefix = `   成员 ${index + 1}:`

    // 检查必需字段
    for (const field of requiredFields) {
      if (!member[field] || (typeof member[field] === 'string' && member[field].trim() === '')) {
        console.error(`❌ 错误: ${memberPrefix} 缺少必需字段 "${field}"`)
        hasErrors = true
      }
    }

    // 检查 ID 唯一性
    if (member.id) {
      if (seenIds.has(member.id)) {
        console.error(`❌ 错误: ${memberPrefix} ID "${member.id}" 重复`)
        hasErrors = true
      }
      seenIds.add(member.id)
    }

    // 检查数据类型
    if (member.tags && !Array.isArray(member.tags)) {
      console.error(`❌ 错误: ${memberPrefix} tags 应该是数组`)
      hasErrors = true
    }

    if (member.sources && !Array.isArray(member.sources)) {
      console.error(`❌ 错误: ${memberPrefix} sources 应该是数组`)
      hasErrors = true
    }

    // 警告：占位数据检查
    if (member.displayName && member.displayName.includes('占位')) {
      console.warn(`⚠️  警告: ${memberPrefix} 包含占位数据 "${member.displayName}"`)
      hasWarnings = true
    }

    if (member.bio && member.bio.includes('占位')) {
      console.warn(`⚠️  警告: ${memberPrefix} 简介包含占位内容`)
      hasWarnings = true
    }

    if (!member.sources || member.sources.length === 0) {
      console.warn(`⚠️  警告: ${memberPrefix} 没有信息来源记录`)
      hasWarnings = true
    }

    // 检查图片路径
    if (member.avatar && !member.avatar.startsWith('/')) {
      console.warn(`⚠️  警告: ${memberPrefix} avatar 路径应该以 "/" 开始`)
      hasWarnings = true
    }
  })

  if (!hasErrors) {
    console.log('✅ members.yaml 基本格式验证通过')
  }
}

/**
 * 验证 siteconfig 文件
 */
function validateSiteConfig() {
  console.log('验证 content/siteconfig...')

  const config = parseConfigFile('siteconfig')
  if (!config) {
    console.error('❌ 错误: content/siteconfig.yaml 或 content/siteconfig.yml 文件不存在')
    hasErrors = true
    return
  }

  let configData
  try {
    configData = config.data
    console.log(`✅ 成功解析 ${config.format.toUpperCase()} 文件: ${path.basename(config.path)}`)
  } catch (error) {
    console.error(`❌ 错误: ${path.basename(config.path)} 不是有效的 ${config.format.toUpperCase()} 文件`)
    console.error('   详情:', error.message)
    hasErrors = true
    return
  }

  console.log('📊 站点配置验证:')

  // 检查必需字段
  const requiredConfigFields = ['siteTitle', 'baseUrl', 'defaultAvatar']
  for (const field of requiredConfigFields) {
    if (!configData[field]) {
      console.error(`❌ 错误: siteconfig.yaml 缺少必需字段 "${field}"`)
      hasErrors = true
    }
  }

  // 检查 URL 格式
  if (configData.baseUrl && configData.baseUrl === 'https://your-deploy-url/') {
    console.warn('⚠️  警告: baseUrl 仍然是占位值，需要更新为实际部署地址')
    hasWarnings = true
  }

  // 检查联系方式配置
  if (!configData.contactWebhook && 
      (!configData.socialMedia || !configData.socialMedia.officialEmail)) {
    console.warn('⚠️  警告: 没有配置联系方式 (contactWebhook 或 socialMedia.officialEmail)')
    hasWarnings = true
  }

  if (!hasErrors) {
    console.log('✅ siteconfig.yaml 基本格式验证通过')
  }
}

/**
 * 检查占位资源文件
 */
function validateAssets() {
  const assetsPath = path.join(process.cwd(), 'public/assets/placeholders')
  
  console.log('📊 占位资源检查:')
  
  if (!fs.existsSync(assetsPath)) {
    console.warn('⚠️  警告: public/assets/placeholders 目录不存在')
    hasWarnings = true
    return
  }

  const expectedAssets = [
    'avatar-small.png',
    'avatar-large.png'
  ]

  for (const asset of expectedAssets) {
    const assetPath = path.join(assetsPath, asset)
    if (!fs.existsSync(assetPath)) {
      console.warn(`⚠️  警告: 占位资源 ${asset} 不存在`)
      hasWarnings = true
    }
  }
}

// 执行验证
validateMembers()
console.log('')
validateSiteConfig()

console.log('\n验证占位资源...')
validateAssets()

// 输出结果摘要
console.log('\n📋 验证结果摘要:')
if (hasErrors) {
  console.log('❌ 发现错误，需要修复后再继续')
  process.exit(1)
} else if (hasWarnings) {
  console.log('⚠️  验证通过，但有警告需要注意')
  console.log('\n💡 提醒:')
  console.log('   - 请将占位数据替换为真实信息')
  console.log('   - 请在 SOURCES.md 中添加信息来源')
  console.log('   - 请配置真实的联系方式和部署地址')
  process.exit(0)
} else {
  console.log('✅ 所有验证通过！')
  process.exit(0)
}
