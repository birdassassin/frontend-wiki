# 知识库自动更新系统

## 概述

本系统用于自动检查前端知识库中框架和工具的版本更新，确保知识库内容保持最新。

## 功能

- ✅ 检查 35+ 个核心框架/工具的最新版本
- ✅ 对比知识库中记录的版本
- ✅ 生成详细更新报告
- ✅ 按类别分组（框架、构建工具、状态管理等）
- ✅ 区分大版本/次要版本/补丁版本更新
- ✅ 提供更新建议

## 使用方法

### 方式一：手动运行

```bash
# 在项目根目录运行
npm run check-updates

# 或直接运行脚本
node scripts/update-checker.js

# 或使用 shell 脚本（支持桌面通知）
./scripts/run-update-check.sh
```

### 方式二：本地定时任务

#### 使用 crontab (macOS/Linux)

```bash
# 编辑 crontab
crontab -e

# 添加以下行（每周一上午 10 点运行）
0 10 * * 1 cd /Users/lyon/Documents/codes/solo-wiki && ./scripts/run-update-check.sh >> scripts/update-check.log 2>&1
```

#### 使用 macOS launchd

```bash
# 创建 plist 文件
cp scripts/com.frontend-wiki.update-check.plist ~/Library/LaunchAgents/

# 加载任务
launchctl load ~/Library/LaunchAgents/com.frontend-wiki.update-check.plist
```

### 方式三：GitHub Actions

已配置 `.github/workflows/update-check.yml`，推送到 GitHub 后会自动：
- 每周一运行版本检查
- 生成更新报告
- 如果发现更新，自动创建 Issue 提醒

## 输出

### 控制台输出

```
🔍 开始检查前端知识库更新...

检查 react... ✅ 已是最新 (19.2.6)
检查 vue... ⚠️  需要更新 (3.2 → 3.5.35)
...

📋 需要更新的内容：

【框架】
  🟡 次要版本 vue: 3.2 → 3.5.35
    文件: wiki/techniques/vue-core.md

💡 更新建议：

🟡 次要版本更新（建议更新）：
  - vue 3.5.35
```

### 报告文件

详细报告保存在 `scripts/update-report.md`，包含：
- 更新概览
- 详细更新列表
- 每个更新的建议操作

## 监控的包

### 核心框架
- React, Vue, Svelte

### 全栈框架
- Next.js, Nuxt, Remix, Astro

### 构建工具
- Vite, Webpack, esbuild, Turbo

### 包管理器
- npm, pnpm, yarn, Bun

### 代码质量
- ESLint, Prettier, Biome, TypeScript

### 状态管理
- Zustand, Redux Toolkit, Pinia

### 数据获取
- TanStack Query, SWR

### 路由
- React Router, Vue Router

### 测试
- Vitest, Jest, Playwright, Cypress

### UI 组件
- Radix UI, Element Plus, Naive UI

## 更新优先级

### 🔴 大版本更新（优先处理）
- 需要查阅官方迁移指南
- 可能需要更新概念描述
- 需要更新示例代码
- 检查破坏性变更

### 🟡 次要版本（建议更新）
- 通常包含新特性
- 更新版本号
- 可选：添加新特性说明

### 🟢 补丁版本（可选更新）
- 通常只是 bug 修复
- 更新版本号即可

## 添加新的监控包

编辑 `scripts/update-checker.js`，在 `PACKAGES_TO_WATCH` 数组中添加：

```javascript
{ 
  name: 'package-name',      // npm 包名
  category: '类别',           // 用于分组
  file: 'wiki/path/to/file.md'  // 相关文件路径
}
```

## 注意事项

1. 脚本需要网络连接以查询 npm registry
2. 版本检测基于语义化版本号
3. 大版本更新需要人工审查内容
4. 建议定期（每周/每月）运行检查
