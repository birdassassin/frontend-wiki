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
  entry: &amp;amp;#039;./src/index.js&amp;amp;#039;,
  output: {
    filename: &amp;amp;#039;[name].[contenthash].js&amp;amp;#039;,
    path: path.resolve(__dirname, &amp;amp;#039;dist&amp;amp;#039;)
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: &amp;amp;#039;ts-loader&amp;amp;#039; },
      { test: /\.css$/, use: [&amp;amp;#039;style-loader&amp;amp;#039;, &amp;amp;#039;css-loader&amp;amp;#039;] }
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
  &amp;amp;quot;name&amp;amp;quot;: &amp;amp;quot;monorepo&amp;amp;quot;,
  &amp;amp;quot;private&amp;amp;quot;: true,
  &amp;amp;quot;scripts&amp;amp;quot;: {
    &amp;amp;quot;dev&amp;amp;quot;: &amp;amp;quot;pnpm -r --parallel dev&amp;amp;quot;
  }
}

// pnpm-workspace.yaml
packages:
  - &amp;amp;#039;packages/*&amp;amp;#039;
  - &amp;amp;#039;apps/*&amp;amp;#039;
```

---

## 3. 代码质量

### 3.1 ESLint
```javascript
// eslint.config.js
export default [
  {
    files: [&amp;amp;#039;**/*.ts&amp;amp;#039;, &amp;amp;#039;**/*.tsx&amp;amp;#039;],
    extends: [
      &amp;amp;#039;eslint:recommended&amp;amp;#039;,
      &amp;amp;#039;plugin:@typescript-eslint/recommended&amp;amp;#039;,
      &amp;amp;#039;plugin:react/recommended&amp;amp;#039;
    ],
    rules: {
      &amp;amp;#039;no-console&amp;amp;#039;: &amp;amp;#039;warn&amp;amp;#039;,
      &amp;amp;#039;@typescript-eslint/no-unused-vars&amp;amp;#039;: &amp;amp;#039;error&amp;amp;#039;
    }
  }
];
```

### 3.2 Prettier
```json
// .prettierrc
{
  &amp;amp;quot;semi&amp;amp;quot;: true,
  &amp;amp;quot;singleQuote&amp;amp;quot;: true,
  &amp;amp;quot;tabWidth&amp;amp;quot;: 2,
  &amp;amp;quot;trailingComma&amp;amp;quot;: &amp;amp;quot;es5&amp;amp;quot;,
  &amp;amp;quot;printWidth&amp;amp;quot;: 100
}
```

### 3.3 Husky + lint-staged
```json
// package.json
{
  &amp;amp;quot;husky&amp;amp;quot;: {
    &amp;amp;quot;hooks&amp;amp;quot;: {
      &amp;amp;quot;pre-commit&amp;amp;quot;: &amp;amp;quot;lint-staged&amp;amp;quot;
    }
  },
  &amp;amp;quot;lint-staged&amp;amp;quot;: {
    &amp;amp;quot;*.{ts,tsx}&amp;amp;quot;: [&amp;amp;quot;eslint --fix&amp;amp;quot;, &amp;amp;quot;prettier --write&amp;amp;quot;]
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
import { describe, it, expect } from &amp;amp;#039;vitest&amp;amp;#039;;
import { add } from &amp;amp;#039;./math&amp;amp;#039;;

describe(&amp;amp;#039;add&amp;amp;#039;, () =&amp;amp;gt; {
  it(&amp;amp;#039;should add two numbers&amp;amp;#039;, () =&amp;amp;gt; {
    expect(add(1, 2)).toBe(3);
  });
});
```

### 4.3 React Testing Library
```typescript
import { render, screen, fireEvent } from &amp;amp;#039;@testing-library/react&amp;amp;#039;;
import { Button } from &amp;amp;#039;./Button&amp;amp;#039;;

test(&amp;amp;#039;calls onClick when clicked&amp;amp;#039;, () =&amp;amp;gt; {
  const handleClick = vi.fn();
  render(&amp;amp;lt;Button onClick={handleClick}&amp;amp;gt;Click&amp;amp;lt;/Button&amp;amp;gt;);
  
  fireEvent.click(screen.getByText(&amp;amp;#039;Click&amp;amp;#039;));
  expect(handleClick).toHaveBeenCalledOnce();
});
```

### 4.4 Playwright E2E
```typescript
// tests/e2e.spec.ts
import { test, expect } from &amp;amp;#039;@playwright/test&amp;amp;#039;;

test(&amp;amp;#039;user can login&amp;amp;#039;, async ({ page }) =&amp;amp;gt; {
  await page.goto(&amp;amp;#039;/login&amp;amp;#039;);
  await page.fill(&amp;amp;#039;[name=&amp;amp;quot;email&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;user@example.com&amp;amp;#039;);
  await page.fill(&amp;amp;#039;[name=&amp;amp;quot;password&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;password&amp;amp;#039;);
  await page.click(&amp;amp;#039;button[type=&amp;amp;quot;submit&amp;amp;quot;]&amp;amp;#039;);
  await expect(page).toHaveURL(&amp;amp;#039;/dashboard&amp;amp;#039;);
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
import * as Sentry from &amp;amp;#039;@sentry/browser&amp;amp;#039;;

Sentry.init({
  dsn: &amp;amp;#039;https://...&amp;amp;#039;,
  environment: &amp;amp;#039;production&amp;amp;#039;,
  tracesSampleRate: 0.1
});
```

### 7.2 性能监控
```typescript
// web-vitals
import { onLCP, onINP, onCLS } from &amp;amp;#039;web-vitals&amp;amp;#039;;

function sendToAnalytics(metric) {
  fetch(&amp;amp;#039;/api/metrics&amp;amp;#039;, {
    method: &amp;amp;#039;POST&amp;amp;#039;,
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
