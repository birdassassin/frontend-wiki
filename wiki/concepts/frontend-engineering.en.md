# Frontend Engineering

> Toolchain is productivity leverage. Good toolchain lets developers focus on business logic.

---

## 1. Build Tools

### 1.1 Vite
```bash
# Create project
npm create vite@latest my-app -- --template react-ts

# Config
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { vendor: ['react', 'react-dom'] }
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
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  optimization: {
    splitChunks: { chunks: 'all' }
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
  - 'packages/*'
  - 'apps/*'
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
import js from '@eslint/js';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { react },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
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

### 3.3 Biome (All-in-One)
```json
// biome.json
{
  "linter": { "enabled": true },
  "formatter": { "enabled": true },
  "javascript": {
    "formatter": { "quoteStyle": "single", "semicolons": "always" }
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
import { describe, it, expect } from 'vitest';
import { sum } from './sum';

describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  it('handles negative numbers', () => {
    expect(sum(-1, -1)).toBe(-2);
  });
});
```

### 4.3 Component Testing (React Testing Library)
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('calls onClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 4.4 E2E Testing (Playwright)
```typescript
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
      - uses: pnpm/action-setup@v3
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
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
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "dev": {
      "cache": false,
      "persistent": true
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
