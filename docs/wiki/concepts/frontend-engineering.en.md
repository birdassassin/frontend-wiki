# Frontend Engineering

> Toolchain is productivity leverage. Good toolchain lets developers focus on business logic.

---

## 1. Build Tools

### 1.1 Vite
```bash
# Create project
npm create vite@latest my-app -- --template react-ts

# Config
import { defineConfig } from &amp;amp;#039;vite&amp;amp;#039;;
import react from &amp;amp;#039;@vitejs/plugin-react&amp;amp;#039;;

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { vendor: [&amp;amp;#039;react&amp;amp;#039;, &amp;amp;#039;react-dom&amp;amp;#039;] }
      }
    }
  }
});
```

**Features:**
- Native ESM dev server (instant start)
- esbuild for pre-bundling (10-100x faster)
- Rollup for production builds
- HMR out of the box

### 1.2 Webpack
```javascript
// webpack.config.js
module.exports = {
  entry: &amp;amp;#039;./src/index.tsx&amp;amp;#039;,
  output: {
    path: path.resolve(__dirname, &amp;amp;#039;dist&amp;amp;#039;),
    filename: &amp;amp;#039;[name].[contenthash].js&amp;amp;#039;
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: &amp;amp;#039;ts-loader&amp;amp;#039; },
      { test: /\.css$/, use: [&amp;amp;#039;style-loader&amp;amp;#039;, &amp;amp;#039;css-loader&amp;amp;#039;] }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  optimization: {
    splitChunks: { chunks: &amp;amp;#039;all&amp;amp;#039; }
  }
};
```

### 1.3 Tool Comparison
| Tool | Dev Speed | Build Speed | Config Complexity | Ecosystem |
|---|---|---|---|---|
| Vite | ⚡⚡⚡⚡⚡ | ⚡⚡⚡⚡ | Simple | Growing |
| Webpack | ⚡⚡ | ⚡⚡ | Complex | Mature |
| esbuild | ⚡⚡⚡⚡⚡ | ⚡⚡⚡⚡⚡ | Simple | Limited |
| Turbopack | ⚡⚡⚡⚡⚡ | ⚡⚡⚡⚡ | Simple | Next.js only |
| Rspack | ⚡⚡⚡⚡⚡ | ⚡⚡⚡⚡⚡ | Webpack compat | Growing |

---

## 2. Package Managers

### 2.1 Comparison
| Feature | npm | yarn | pnpm | Bun |
|---|---|---|---|---|
| Speed | Slow | Medium | Fast | Fastest |
| Disk Usage | High | High | Low | Low |
| Lock File | package-lock.json | yarn.lock | pnpm-lock.yaml | bun.lockb |
| Workspaces | ✅ | ✅ | ✅ | ✅ |
| Node.js | Required | Required | Required | Built-in |

### 2.2 pnpm (Recommended)
```bash
# Install
pnpm install

# Add dependency
pnpm add react
pnpm add -D typescript
pnpm add -g pnpm

# Workspace
# pnpm-workspace.yaml
packages:
  - &amp;amp;#039;packages/*&amp;amp;#039;
  - &amp;amp;#039;apps/*&amp;amp;#039;
```

**Why pnpm:**
- Hard links save disk space
- Strict dependency resolution (no phantom dependencies)
- Fastest among Node.js-based managers

---

## 3. Code Quality

### 3.1 ESLint
```javascript
// eslint.config.js
import js from &amp;amp;#039;@eslint/js&amp;amp;#039;;
import ts from &amp;amp;#039;typescript-eslint&amp;amp;#039;;
import react from &amp;amp;#039;eslint-plugin-react&amp;amp;#039;;

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: [&amp;amp;#039;**/*.{ts,tsx}&amp;amp;#039;],
    plugins: { react },
    rules: {
      &amp;amp;#039;react/react-in-jsx-scope&amp;amp;#039;: &amp;amp;#039;off&amp;amp;#039;,
      &amp;amp;#039;@typescript-eslint/no-unused-vars&amp;amp;#039;: [&amp;amp;#039;warn&amp;amp;#039;, { argsIgnorePattern: &amp;amp;#039;^_&amp;amp;#039; }]
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

### 3.3 Biome (All-in-One)
```json
// biome.json
{
  &amp;amp;quot;linter&amp;amp;quot;: { &amp;amp;quot;enabled&amp;amp;quot;: true },
  &amp;amp;quot;formatter&amp;amp;quot;: { &amp;amp;quot;enabled&amp;amp;quot;: true },
  &amp;amp;quot;javascript&amp;amp;quot;: {
    &amp;amp;quot;formatter&amp;amp;quot;: { &amp;amp;quot;quoteStyle&amp;amp;quot;: &amp;amp;quot;single&amp;amp;quot;, &amp;amp;quot;semicolons&amp;amp;quot;: &amp;amp;quot;always&amp;amp;quot; }
  }
}
```

**ESLint vs Biome:**
| Feature | ESLint + Prettier | Biome |
|---|---|---|
| Linting | ✅ | ✅ |
| Formatting | Prettier | Built-in |
| Speed | Medium | 20-30x faster |
| Config | Complex | Simple |
| Ecosystem | Mature | Growing |

---

## 4. Testing

### 4.1 Testing Pyramid
```
        /\
       /  \  E2E Tests (few)
      /----\
     /      \  Integration Tests
    /--------\
   /          \  Unit Tests (many)
  /____________\
```

### 4.2 Unit Testing (Vitest)
```typescript
// sum.test.ts
import { describe, it, expect } from &amp;amp;#039;vitest&amp;amp;#039;;
import { sum } from &amp;amp;#039;./sum&amp;amp;#039;;

describe(&amp;amp;#039;sum&amp;amp;#039;, () =&amp;amp;gt; {
  it(&amp;amp;#039;adds two numbers&amp;amp;#039;, () =&amp;amp;gt; {
    expect(sum(1, 2)).toBe(3);
  });
  
  it(&amp;amp;#039;handles negative numbers&amp;amp;#039;, () =&amp;amp;gt; {
    expect(sum(-1, -1)).toBe(-2);
  });
});
```

### 4.3 Component Testing (React Testing Library)
```typescript
import { render, screen, fireEvent } from &amp;amp;#039;@testing-library/react&amp;amp;#039;;
import { Button } from &amp;amp;#039;./Button&amp;amp;#039;;

test(&amp;amp;#039;calls onClick when clicked&amp;amp;#039;, () =&amp;amp;gt; {
  const handleClick = vi.fn();
  render(&amp;amp;lt;Button onClick={handleClick}&amp;amp;gt;Click&amp;amp;lt;/Button&amp;amp;gt;);
  
  fireEvent.click(screen.getByText(&amp;amp;#039;Click&amp;amp;#039;));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 4.4 E2E Testing (Playwright)
```typescript
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
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: &amp;amp;#039;pnpm&amp;amp;#039;
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

### 5.2 Deployment
| Platform | Type | Best For |
|---|---|---|
| Vercel | Serverless | Next.js, frontend |
| Netlify | Static + Functions | Static sites |
| Cloudflare Pages | Edge | Global distribution |
| AWS S3 + CloudFront | Infrastructure | Enterprise |
| Docker + K8s | Containers | Full control |

---

## 6. Monorepo

### 6.1 Turborepo
```json
// turbo.json
{
  &amp;amp;quot;$schema&amp;amp;quot;: &amp;amp;quot;https://turbo.build/schema.json&amp;amp;quot;,
  &amp;amp;quot;pipeline&amp;amp;quot;: {
    &amp;amp;quot;build&amp;amp;quot;: {
      &amp;amp;quot;dependsOn&amp;amp;quot;: [&amp;amp;quot;^build&amp;amp;quot;],
      &amp;amp;quot;outputs&amp;amp;quot;: [&amp;amp;quot;dist/**&amp;amp;quot;]
    },
    &amp;amp;quot;test&amp;amp;quot;: {
      &amp;amp;quot;dependsOn&amp;amp;quot;: [&amp;amp;quot;build&amp;amp;quot;]
    },
    &amp;amp;quot;dev&amp;amp;quot;: {
      &amp;amp;quot;cache&amp;amp;quot;: false,
      &amp;amp;quot;persistent&amp;amp;quot;: true
    }
  }
}
```

### 6.2 Workspace Structure
```
my-monorepo/
├── packages/
│   ├── ui/           # Shared UI components
│   ├── utils/        # Shared utilities
│   └── config/       # Shared configs
├── apps/
│   ├── web/          # Main web app
│   └── docs/         # Documentation
├── package.json
└── turbo.json
```

---

## 7. Related Concepts

- [TypeScript](typescript.en.md)
- [Testing Strategies](testing-strategies.en.md)
- [Package Managers](../tools/package-managers.en.md)
- [Code Quality](../tools/code-quality.en.md)
