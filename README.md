# AI Blog

极简风格的技术博客，专注于前端工程化与 AI 技术的深度探索。

[![Built with Astro](https://astro.badg.es/v2/built-with-astro.svg)](https://astro.build)

## 特性

- **高性能**：基于 Astro SSG，零 JavaScript 默认加载
- **极简设计**：黑白灰主色调，大量留白，轻微拟态效果
- **时间线归档**：按年份月份分组，滚动触发错落动画
- **内容检索**：分类导航 + 标签云 + 文章详情页 TOC
- **React Islands**：仅在需要交互处加载 React 组件
- **响应式**：完美适配移动端、平板和桌面端

## 技术栈

| 技术 | 用途 |
|------|------|
| [Astro](https://astro.build) | 核心框架 (SSG) |
| [React 18](https://react.dev) | 交互组件 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全 |
| [Tailwind CSS](https://tailwindcss.com) | 样式系统 |
| [Framer Motion](https://www.framer.com/motion/) | 动画效果 |
| [MDX](https://mdxjs.com) | 内容编写 |
| [Shiki](https://shiki.matsu.io) | 代码高亮 |

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm / pnpm / yarn

### 安装

```bash
# 克隆项目
git clone https://github.com/your-username/ai-blog.git
cd ai-blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:4321 查看效果。

### 构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
├── public/                 # 静态资源
├── src/
│   ├── content/
│   │   ├── blog/          # MDX 文章
│   │   └── config.ts      # 内容集合配置
│   ├── components/
│   │   ├── react/         # React 岛屿组件
│   │   └── astro/         # Astro 组件
│   ├── layouts/           # 布局组件
│   ├── pages/             # 页面路由
│   │   ├── blog/          # 文章详情
│   │   ├── archives/      # 时间线归档
│   │   ├── categories/    # 分类页面
│   │   ├── tags/          # 标签页面
│   │   └── lab/           # 技术实验室
│   ├── utils/             # 工具函数
│   └── styles/            # 全局样式
├── astro.config.mjs       # Astro 配置
├── tailwind.config.ts     # Tailwind 配置
└── tsconfig.json          # TypeScript 配置
```

## 写作指南

### 创建文章

在 `src/content/blog/` 目录下创建 `.mdx` 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
pubDate: 2025-01-15
category: '分类名称'
tags: ['标签1', '标签2']
aiSummary: 'AI 生成的摘要（可选）'
draft: false
---

# 文章内容

这里是 Markdown 内容...
```

### Frontmatter 字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 文章标题 |
| description | string | 是 | 文章描述 |
| pubDate | date | 是 | 发布日期 |
| category | string | 是 | 分类名称 |
| tags | string[] | 是 | 标签数组 |
| aiSummary | string | 否 | AI 生成的摘要 |
| draft | boolean | 否 | 是否为草稿（默认 false） |
| heroImage | string | 否 | 封面图片路径 |

## 部署

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-blog)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/ai-blog)

### GitHub Pages

项目已配置 GitHub Actions，推送到 `main` 分支自动构建部署。

## 自定义

### 修改站点信息

编辑 `src/layouts/Layout.astro` 中的默认描述：

```astro
const {
  title,
  description = '你的站点描述',
} = Astro.props;
```

### 修改导航栏

编辑 `src/components/react/FloatingNav.tsx` 中的 `navItems` 数组。

### 修改颜色主题

编辑 `tailwind.config.ts` 中的 `colors` 配置。

## 许可证

[MIT](./LICENSE)

## 致谢

- [Astro](https://astro.build) - 优秀的静态站点框架
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- [Lucide](https://lucide.dev) - 精美的图标库
