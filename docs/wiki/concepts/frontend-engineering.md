# 前端工程化

> 工具链是生产力杠杆。好的工具链让开发者专注于业务逻辑，而不是配置。

---

## 1. 构建工具

### 1.1 Vite
```bash
# 创建项目
npm create vite@latest my-app -- --template react

# 开发服务器 (HMR)
npm run dev

# 生产构建
npm run build
```

**核心优势：**
- 基于 ESM 的即时热更新
- Rollup 生产构建
- 插件生态丰富
- 开箱即用

### 1.2 Webpack
```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

---

## 2. 包管理器

### 2.1 对比

| 特性 | npm | pnpm | yarn | Bun |
|---|---|---|---|---|
| 安装速度 | 慢 | 快 | 中 | 最快 |
| 磁盘空间 | 大 | 小 | 中 | 小 |
| 幽灵依赖 | 有 | 无 | 有 | 无 |
| 锁文件 | package-lock.json | pnpm-lock.yaml | yarn.lock | bun.lockb |

### 2.2 pnpm 工作区
```json
// package.json
{
  "name": "monorepo",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev"
  }
}

// pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

---

## 3. 代码质量

### 3.1 ESLint
```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended'
    ],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
];
```

### 3.2 Prettier
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### 3.3 Husky + lint-staged
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## 4. 测试体系

### 4.1 测试金字塔
```
        /\
       /  \  E2E (Playwright/Cypress)
      /----\
     /      \  集成测试 (React Testing Library)
    /--------\
   /          \  单元测试 (Vitest/Jest)
  /------------\
```

### 4.2 Vitest
```typescript
// math.test.ts
import { describe, it, expect } from 'vitest';
import { add } from './math';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
```

### 4.3 React Testing Library
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('calls onClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalledOnce();
});
```

### 4.4 Playwright E2E
```typescript
// tests/e2e.spec.ts
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## 5. CI/CD

### 5.1 GitHub Actions
```yaml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

---

## 6. 部署

### 6.1 静态部署
| 平台 | 特点 |
|---|---|
| Vercel | Next.js 优化、边缘网络 |
| Netlify | 表单处理、函数 |
| Cloudflare Pages | 边缘计算、D1 数据库 |
| GitHub Pages | 免费、简单 |

### 6.2 Docker
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## 7. 监控

### 7.1 错误监控
```typescript
// Sentry
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://...',
  environment: 'production',
  tracesSampleRate: 0.1
});
```

### 7.2 性能监控
```typescript
// web-vitals
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToAnalytics(metric) {
  fetch('/api/metrics', {
    method: 'POST',
    body: JSON.stringify(metric),
    keepalive: true
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

---

## 8. 相关概念

- [Vite](../tools/vite.md)
- [代码质量](../tools/code-quality.md)
- [测试策略](../concepts/testing-strategies.md)
- [包管理器](../tools/package-managers.md)
