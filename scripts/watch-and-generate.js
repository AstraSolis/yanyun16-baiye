const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const contentDir = path.join(process.cwd(), 'content')

console.log('🔍 正在监听 content/ 目录的文件变化...')
console.log('📁 监听目录:', contentDir)
console.log('')

// 防抖函数，避免频繁触发
let generateTimeout = null
function scheduleGenerate() {
  if (generateTimeout) {
    clearTimeout(generateTimeout)
  }
  generateTimeout = setTimeout(() => {
    console.log('📝 检测到文件变化，重新生成静态数据...')
    exec('node scripts/generate-static-data.js', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ 生成失败:', error)
        return
      }
      if (stderr) {
        console.error('⚠️  警告:', stderr)
      }
      console.log(stdout)
      console.log('✅ 已更新！继续监听文件变化...\n')
    })
  }, 500) // 500ms 防抖
}

// 监听 content 目录
fs.watch(contentDir, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.yaml') || filename.endsWith('.yml'))) {
    console.log(`  📄 ${filename} ${eventType === 'change' ? '已修改' : '已变更'}`)
    scheduleGenerate()
  }
})

console.log('✅ 监听已启动！修改 YAML 文件将自动重新生成 JSON 数据。')
console.log('💡 提示：按 Ctrl+C 停止监听\n')

// 首次启动时生成一次
scheduleGenerate()

