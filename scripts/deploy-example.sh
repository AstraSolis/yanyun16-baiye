#!/bin/bash

# 部署脚本示例
# 请根据实际需要修改和使用

set -e

echo "🚀 燕云十六声 · 百业 - 部署脚本"
echo "================================="

# 检查必要的工具
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ 错误: $1 未安装或不在 PATH 中"
        exit 1
    fi
}

# 验证内容数据
echo "🔍 验证内容数据..."
npm run validate
if [ $? -ne 0 ]; then
    echo "❌ 内容验证失败，请修复后重试"
    exit 1
fi

# 构建和导出
echo "🏗️  构建项目..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

echo "📦 生成静态文件..."
npm run export
if [ $? -ne 0 ]; then
    echo "❌ 静态导出失败" 
    exit 1
fi

echo "✅ 构建完成！静态文件位于 out/ 目录"

# 部署选项
echo ""
echo "📋 部署选项："
echo "1. Surge:   npx surge ./out"
echo "2. Vercel:  vercel --prod ./out"
echo "3. Netlify: netlify deploy --prod --dir=out"
echo ""

# 询问是否立即部署
read -p "是否现在部署到 Surge？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 部署到 Surge..."
    check_command "npx"
    npx surge ./out
else
    echo "💡 您可以稍后手动运行部署命令"
fi

echo "🎉 完成！"
