# 燕云十六声 · 百业

**yanyun16-baiye** - 一个百业宣传模板,支持静态网页导出

## 项目特点

- **静态站点生成** - 使用 Next.js 静态导出，快速加载
- **响应式设计** - 适配所有设备尺寸，优秀的移动端体验
- **现代UI设计** - 使用 Tailwind CSS + Framer Motion + Radix UI 组件
- **3D视觉效果** - 集成 @paper-design/shaders-react 提供背景效果
- **数据驱动架构** - 基于 JSONC 配置文件的内容管理系统
- **支持注释配置** - JSONC 格式支持注释，便于配置文件维护
- **SEO友好** - 完整的元数据和搜索引擎优化
- **易于部署** - 支持多平台静态部署，可选配置自动化流程
- **TypeScript支持** - 完整的类型安全和开发体验
- **无障碍访问** - 遵循 ARIA 标准，支持键盘导航和屏幕阅读器

## 快速开始

### 1. 克隆和安装

```bash
# 克隆项目
git clone https://github.com/AstraSolis/yanyun16-baiye
cd yanyun16-baiye

# 安装依赖
npm install
```

### 2. 配置项目

```bash
# 复制配置模板到工作目录
cp -r content-template/ content/

# 编辑配置文件
```

### 3. 启动开发

```bash
# 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 查看网站效果。

## 配置指南

### 配置文件说明

项目使用 **JSONC 格式**配置文件，支持添加注释！

### 配置流程

1. **初始化配置**
   ```bash
   # 如果content目录不存在，复制模板
   cp -r content-template/ content/
   ```

2. **编辑站点配置**
   ```jsonc
   // content/siteconfig.jsonc
   {
     "siteTitle": "你的站点名称", // 显示在浏览器标题
     "siteDescription": "站点描述", // SEO描述
     // ... 更多配置项
   }
   ```

3. **配置成员信息**
   ```jsonc
   // content/members.jsonc
   [
     {
       "id": "member-001", // 唯一标识
       "displayName": "成员姓名",
       "role": "职位",
       "bio": "成员简介",
       // ... 更多字段
     }
   ]
   ```

4. **测试配置**
   ```bash
   npm run dev          # 启动开发服务器
   npm run validate     # 验证配置文件格式
   ```

### 自定义样式

项目使用 Tailwind CSS，可以通过修改 `tailwind.config.ts` 来自定义主题。

### 文件结构说明

```
├── .github/
│   └── workflows/          # GitHub Actions 配置示例（可选）
├── content/                # 本地配置文件（git忽略）
│   ├── siteconfig.jsonc    # 站点配置（支持注释）
│   ├── members.jsonc       # 成员信息（支持注释）
│   ├── home-page.jsonc     # 首页配置
│   ├── members-page.jsonc  # 成员页面配置
│   ├── activities-page.jsonc  # 活动页面配置
│   ├── join-page.jsonc     # 加入页面配置
│   └── promotion-page.jsonc   # 宣传页面配置
├── content-template/       # 配置模板（上传到Git）
│   └── [与content同结构]   # 所有配置文件的模板版本
├── src/
│   ├── app/               # Next.js 15 App Router
│   │   ├── activities/    # 百业活动页面
│   │   ├── api/          # API路由（配置获取）
│   │   ├── join/         # 加入百业页面  
│   │   ├── members/      # 百业成员页面
│   │   ├── promotion/    # 百业宣传页面
│   │   ├── globals.css   # 全局样式
│   │   ├── layout.tsx    # 根布局组件
│   │   └── page.tsx      # 首页组件
│   ├── components/        # React 组件库
│   │   ├── examples/     # 示例组件
│   │   ├── layout/       # 布局组件（导航、页脚）
│   │   ├── members/      # 成员相关组件
│   │   └── ui/           # 基础UI组件（基于Radix UI）
│   ├── hooks/            # 自定义 React Hooks
│   ├── lib/              # 工具函数和配置加载器
│   └── types/            # TypeScript 类型定义
├── scripts/              # 构建和验证脚本
├── public/               # 静态资源
│   ├── assets/           # 图片和占位符资源
│   └── data/             # 自动生成的静态数据（git忽略）
├── out/                  # 静态导出输出目录（git忽略）
├── next.config.js        # Next.js 配置
├── tailwind.config.ts    # Tailwind CSS 配置
└── tsconfig.json         # TypeScript 配置
```

## 构建和部署

### 本地构建

```bash
# 生成静态数据文件
npm run prebuild

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 验证配置文件
npm run validate
```

### 部署方式

项目支持多种部署方式，你可以根据需求选择：

#### 推荐部署平台

1. **Vercel (推荐)**
   ```bash
   # 安装 Vercel CLI
   npm i -g vercel
   
   # 部署到 Vercel
   vercel --prod
   ```

2. **Netlify**
   ```bash
   # 手动上传 out/ 目录
   npm run build
   # 然后在 Netlify 面板中上传 out 文件夹
   ```

3. **GitHub Pages**
   ```bash
   # 构建项目
   npm run build
   # 手动将 out/ 目录内容推送到 gh-pages 分支
   ```

#### 自动化部署 (可选)

项目提供了 **GitHub Actions 配置示例**：
- 位置：`.github/workflows/build-and-deploy.yml`
- 功能：自动构建、验证、部署
- 状态：**配置模板**，需要根据需求调整

**如需启用自动化部署**：
1. 检查并修改 `.github/workflows/build-and-deploy.yml`
2. 在 GitHub 仓库中配置相关 Secrets
3. 启用 GitHub Pages 或配置其他部署目标

### 手动部署

如果需要手动部署到其他平台：

1. **构建项目**
   ```bash
   npm run build
   ```

2. **部署静态文件**  
   - 将 `out/` 目录部署到你的静态托管服务
   - 支持 Vercel、Netlify、Cloudflare Pages 等

## 进阶配置

### 配置系统特性

**多层级配置**：
- **站点配置** (`siteconfig.jsonc`) - 全站基础设置
- **页面配置** (`*-page.jsonc`) - 单独页面内容配置
- **成员配置** (`members.jsonc`) - 成员信息管理

**配置内容包括**：
- **基础站点信息**：标题、描述、关键词、图标
- **社交媒体链接**：QQ、微信、微博、邮箱
- **显示设置**：主题、标签数量、响应时间
- **成员信息**：头像、简介、标签、加入时间、地理位置
- **申请设置**：表单开关、邮箱、审核要求
- **SEO优化**：元数据、语言、更新日期

**技术特点**：
- 支持 JSONC 格式注释
- 运行时类型验证
- 配置文件热重载
- 构建时静态化处理

## 核心功能

### 页面架构

1. **首页 (`/`)** - 炫酷3D背景 + 百业展示
   - 3D Shader背景效果
   - 响应式Hero区域设计
   - 导航到各功能页面

2. **百业宣传 (`/promotion`)** - 团队介绍与宣传
   - 团队文化展示
   - 组织特色介绍
   - 品牌形象传播

3. **百业活动 (`/activities`)** - 成员福利与活动
   - 活动信息展示
   - 福利待遇说明
   - 社区互动内容

4. **百业成员 (`/members`)** - 核心交互展示页面
   - 成员头像网格展示
   - 动态预览卡片切换
   - 成员详细信息查看

5. **加入百业 (`/join`)** - 申请表单与流程
   - 在线申请表单
   - 申请流程说明  
   - 联系方式展示

### 成员页面交互特性

百业成员页面实现了完整的**小头像集合 → 大预览卡**交互模式：

**多端交互支持**：
- **桌面端**: 点击头像切换预览，悬停效果
- **键盘导航**: 支持方向键(← → ↑ ↓)切换，Enter/空格激活
- **移动端**: 触摸切换，流畅的动画过渡
- **无障碍**: 完整的 ARIA 支持和焦点管理

**功能特性**：
- 成员信息动态加载
- 平滑的动画过渡效果
- 响应式布局适配
- 成员标签和角色展示

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 常见问题

**Q: 为什么我的配置修改没有生效？**
A: 请确保：
1. 配置文件在 `content/` 目录下
2. 文件格式正确（可运行 `npm run validate` 检查）
3. 重新启动了开发服务器

**Q: 如何添加新成员？**
A: 在 `content/members.jsonc` 中添加新的成员对象，确保 `id` 唯一。

**Q: 配置文件支持哪些注释格式？**
A: 支持 `//` 行注释和 `/* */` 块注释。

**Q: 如何自定义主题颜色？**
A: 修改 `tailwind.config.ts` 中的颜色配置。

**Q: 项目的技术栈是什么？**
A: Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion + Radix UI + Paper Design Shaders。

## 可用脚本

| 脚本 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 (http://localhost:3000) |
| `npm run prebuild` | 生成静态数据文件 (构建前预处理) |
| `npm run build` | 构建生产版本 |
| `npm run export` | 静态导出 (next build && next export) |
| `npm start` | 启动生产服务器 |
| `npm run preview` | 预览静态导出文件 (使用serve) |
| `npm run validate` | 验证JSONC配置文件格式 |
| `npm run lint` | ESLint代码质量检查 |
---

[提交问题](https://github.com/AstraSolis/yanyun16-baiye/issues)