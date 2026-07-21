# 版本变更日志

## 2026-07-21 - v3.1.0 菜单重构与 ES6+ 教程发布

### 新增内容

- ✨ 新增「ES6+ 语法教程」独立菜单，包含完整的 ES6+ 语法教程系列
  - 🟢 初级：ES6 基础语法、箭头函数、解构赋值、模板字符串（4篇）
  - 🟡 中级：Promise 详解、async/await、Map/Set 数据结构、类与继承（4篇）
  - 🔴 高级：Generator 函数、Proxy 和 Reflect、Symbol 和 Iterator、模块化（4篇）
  - ⚫ 专家：ES2020/2021/2022/2023 新特性（4篇）
- 📁 将 ES6+ 系列从「前端经典教程」中移出，独立为一级菜单
- 🔧 新增版本监控脚本（scripts/version-monitor.js），自动检查前端框架版本
- 🤖 新增 GitHub Actions 工作流，每周自动监控版本更新
- 📝 新增版本变更日志自动更新脚本（scripts/update-changelog.js）

### 菜单调整

- 📋 「版本更新日志」移到侧边栏最底部
- 📋 「ES6+ 语法教程」独立为一级菜单
- 📋 「前端经典教程」移除 ES6+ 系列入口

### 文档更新

- 📚 更新首页（docs/index.md），添加完整的前端知识体系分类
- 📚 更新知识库概览（docs/wiki/overview.md），添加专业级技术栈脑图
- 📚 更新最新动态（docs/wiki/news/index.md），添加 React/Vue/Vite/Zero 动态及前端排名前十

---

## 2026-06-01 - v2.0.0 重大更新

### 新增内容

- ✨ 整合 [Front-end-course](https://github.com/birdassassin/Front-end-course) 仓库内容
- 📚 新增前端经典教程目录（wiki/legacy/）
  - JavaScript 系列（6 篇）
  - React 系列（32 篇）
  - Vue 系列（4 篇）
  - Webpack 系列（3 篇）
  - 前端系列（3 篇）
  - 数据结构和算法（10 篇）
  - 正则系列（3 篇）
  - Lodash 源码解析（1 篇）
- 🌐 新增 GitHub Pages 部署支持（docsify）
- 🔄 新增同时推送到 Gitee 和 GitHub 的工作流

### 版本升级

- 📦 项目版本：1.0.0 → 2.0.0

---

## 2026-05-31 - 版本更新

### 框架

- 🟢 Patch **react**: 未找到 → 19.2.6
- 🟢 Patch **react-dom**: 未找到 → 19.2.6
- 🟡 Feature **vue**: 3.2 → 3.5.35
- 🟢 Patch **svelte**: 未找到 → 5.56.0

### 全栈框架

- 🔴 BREAKING **next**: 6.2 → 16.2.6
- 🔴 BREAKING **nuxt**: 3.1 → 4.4.6
- 🟢 Patch **@remix-run/node**: 未找到 → 2.17.4
- 🔴 BREAKING **astro**: 4.1 → 6.4.2

### 构建工具

- 🟢 Patch **vite**: 未找到 → 8.0.14
- 🟢 Patch **webpack**: 未找到 → 5.107.2
- 🟢 Patch **esbuild**: 未找到 → 0.28.0
- 🟢 Patch **turbo**: 未找到 → 2.9.16

### 包管理器

- 🟢 Patch **npm**: 未找到 → 11.16.0
- 🟢 Patch **pnpm**: 未找到 → 11.5.0
- 🟢 Patch **yarn**: 未找到 → 1.22.22
- 🟢 Patch **bun**: 未找到 → 1.3.14

### 代码质量

- 🟢 Patch **eslint**: 未找到 → 10.4.1
- 🟢 Patch **prettier**: 未找到 → 3.8.3
- 🟢 Patch **@biomejs/biome**: 未找到 → 2.4.16
- 🔴 BREAKING **typescript**: 4.1 → 6.0.3

### 状态管理

- 🔴 BREAKING **zustand**: 2.1 → 5.0.14
- 🟢 Patch **@reduxjs/toolkit**: 未找到 → 2.12.0
- 🔴 BREAKING **pinia**: 2.1 → 3.0.4

### 数据获取

- 🟢 Patch **@tanstack/react-query**: 未找到 → 5.100.14
- 🟢 Patch **@tanstack/vue-query**: 未找到 → 5.100.14

### 路由

- 🟢 Patch **react-router**: 未找到 → 7.16.0
- 🟢 Patch **vue-router**: 未找到 → 5.1.0

### 测试

- 🔴 BREAKING **vitest**: 2.1 → 4.1.7
- 🟢 Patch **jest**: 未找到 → 30.4.2
- 🟢 Patch **cypress**: 未找到 → 15.16.0

### UI 组件

- 🟢 Patch **@radix-ui/react-slot**: 未找到 → 1.2.4
- 🟢 Patch **element-plus**: 未找到 → 2.14.1
- 🟢 Patch **naive-ui**: 未找到 → 2.44.1

## 2026-05-31 - 版本更新

### 框架

- 🟢 Patch **react**: 未找到 → 19.2.6
- 🟢 Patch **react-dom**: 未找到 → 19.2.6
- 🟡 Feature **vue**: 3.2 → 3.5.35
- 🟢 Patch **svelte**: 未找到 → 5.56.0

### 全栈框架

- 🔴 BREAKING **next**: 6.2 → 16.2.6
- 🔴 BREAKING **nuxt**: 3.1 → 4.4.6
- 🟢 Patch **@remix-run/node**: 未找到 → 2.17.4
- 🔴 BREAKING **astro**: 4.1 → 6.4.2

### 构建工具

- 🟢 Patch **vite**: 未找到 → 8.0.14
- 🟢 Patch **webpack**: 未找到 → 5.107.2
- 🟢 Patch **esbuild**: 未找到 → 0.28.0
- 🟢 Patch **turbo**: 未找到 → 2.9.16

### 包管理器

- 🟢 Patch **npm**: 未找到 → 11.16.0
- 🟢 Patch **pnpm**: 未找到 → 11.5.0
- 🟢 Patch **yarn**: 未找到 → 1.22.22
- 🟢 Patch **bun**: 未找到 → 1.3.14

### 代码质量

- 🟢 Patch **eslint**: 未找到 → 10.4.1
- 🟢 Patch **prettier**: 未找到 → 3.8.3
- 🟢 Patch **@biomejs/biome**: 未找到 → 2.4.16
- 🔴 BREAKING **typescript**: 4.1 → 6.0.3

### 状态管理

- 🔴 BREAKING **zustand**: 2.1 → 5.0.14
- 🟢 Patch **@reduxjs/toolkit**: 未找到 → 2.12.0
- 🔴 BREAKING **pinia**: 2.1 → 3.0.4

### 数据获取

- 🟢 Patch **@tanstack/react-query**: 未找到 → 5.100.14
- 🟢 Patch **@tanstack/vue-query**: 未找到 → 5.100.14

### 路由

- 🟢 Patch **react-router**: 未找到 → 7.16.0
- 🟢 Patch **vue-router**: 未找到 → 5.1.0

### 测试

- 🔴 BREAKING **vitest**: 2.1 → 4.1.7
- 🟢 Patch **jest**: 未找到 → 30.4.2
- 🟢 Patch **cypress**: 未找到 → 15.16.0

### UI 组件

- 🟢 Patch **@radix-ui/react-slot**: 未找到 → 1.2.4
- 🟢 Patch **element-plus**: 未找到 → 2.14.1
- 🟢 Patch **naive-ui**: 未找到 → 2.44.1

