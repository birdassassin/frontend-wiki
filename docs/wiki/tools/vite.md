# Vite 完全指南

> Vite 是下一代前端构建工具，基于原生 ES Module，提供极速的开发服务器启动和热模块替换（HMR）。

---

## 1. 核心概念

### 1.1 为什么选择 Vite

| 特性 | Webpack | Vite |
|------|---------|------|
| **开发服务器** | 基于打包 | 基于原生 ES Module |
| **冷启动速度** | 较慢（秒级） | 极快（毫秒级） |
| **热更新** | 较慢 | 即时 |
| **按需编译** | 否 | 是 |
| **生产打包** | Webpack | Rollup |
| **配置复杂度** | 较高 | 较低 |

### 1.2 工作原理

```
开发模式：浏览器请求 → ES Module 原生加载 → 按需编译
生产模式：Rollup 打包 → 代码分割 → 压缩优化
```

**开发模式：**
1. 浏览器通过 `<script type="module">` 加载入口文件
2. Vite 作为开发服务器，拦截请求
3. 按需编译请求的模块，返回浏览器可执行的 ES Module
4. HMR 通过 WebSocket 实现即时更新

**生产模式：**
1. 使用 Rollup 进行打包
2. 代码分割和 Tree Shaking
3. 资源压缩和优化

### 1.3 项目结构

```
.
├── src/
│   ├── components/          # 组件
│   ├── views/              # 页面
│   ├── utils/              # 工具函数
│   ├── api/                # API 请求
│   ├── styles/             # 全局样式
│   ├── assets/             # 静态资源
│   └── main.js             # 入口文件
├── public/                 # 静态资源（直接复制）
├── index.html              # HTML 模板（Vite 入口）
├── vite.config.js          # Vite 配置
├── package.json
└── README.md
```

---

## 2. 快速开始

### 2.1 创建项目

```bash
# Vue 项目
npm create vite@6.5.0 . -- --template vue
npm create vite@6.5.0 . -- --template vue-ts

# React 项目
npm create vite@6.5.0 . -- --template react
npm create vite@6.5.0 . -- --template react-ts

# Svelte 项目
npm create vite@6.5.0 . -- --template svelte
npm create vite@6.5.0 . -- --template svelte-ts

# Vanilla JS 项目
npm create vite@6.5.0 . -- --template vanilla
npm create vite@6.5.0 . -- --template vanilla-ts
```

### 2.2 安装依赖

```bash
# 安装项目依赖
npm install

# 安装常用插件
npm install @vitejs/plugin-vue --save-dev
npm install @vitejs/plugin-react --save-dev
npm install unplugin-auto-import unplugin-vue-components --save-dev
npm install vite-plugin-compression --save-dev
```

### 2.3 基础配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    hot: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 2.4 入口 HTML

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### 2.5 package.json 脚本

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "build:analyze": "vite build --mode analyze"
  }
}
```

---

## 3. 路径别名配置

### 3.1 vite.config.js

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@api': path.resolve(__dirname, './src/api'),
      '@views': path.resolve(__dirname, './src/views'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
  },
});
```

### 3.2 TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

### 3.3 使用示例

```javascript
// src/main.js
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/styles/index.css';

// src/components/Button.vue
import { formatDate } from '@/utils/date';

// src/views/Home.vue
import api from '@/api/home';
```

---

## 4. CSS 配置

### 4.1 基本 CSS

Vite 内置 CSS 支持，无需额外配置：

```javascript
// src/main.js
import './style.css';
```

```css
/* src/style.css */
:root {
  --primary-color: #646cff;
  --secondary-color: #747bff;
  --text-color: #333;
  --bg-color: #fff;
  --font-family: 'Inter', system-ui, sans-serif;
}

body {
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--bg-color);
  margin: 0;
  padding: 0;
}
```

### 4.2 SCSS/Sass

```bash
npm install sass --save-dev
```

```javascript
// vite.config.js
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
```

```scss
// src/styles/variables.scss
$primary-color: #646cff;
$secondary-color: #747bff;
$text-color: #333;
$font-family: 'Inter', system-ui, sans-serif;
```

```scss
// src/components/Button/style.scss
.button {
  background-color: $primary-color;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: $secondary-color;
  }
}
```

### 4.3 CSS Modules

```css
/* src/components/Button/style.module.css */
.button {
  background-color: var(--primary-color);
  color: white;
  padding: 10px 20px;
}

.button:hover {
  opacity: 0.9;
}
```

```vue
<!-- src/components/Button.vue -->
<script setup>
import styles from './style.module.css';
</script>

<template>
  <button :class="styles.button">Click me</button>
</template>
```

### 4.4 PostCSS

```bash
npm install postcss autoprefixer --save-dev
```

```javascript
// postcss.config.js
export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
    },
  },
};
```

---

## 5. 插件系统

### 5.1 常用插件

| 插件 | 用途 | 安装命令 |
|------|------|---------|
| `@vitejs/plugin-vue` | Vue 3 SFC 支持 | `npm install @vitejs/plugin-vue` |
| `@vitejs/plugin-react` | React Fast Refresh | `npm install @vitejs/plugin-react` |
| `@vitejs/plugin-vue-jsx` | Vue JSX 支持 | `npm install @vitejs/plugin-vue-jsx` |
| `unplugin-auto-import` | 自动导入 API | `npm install unplugin-auto-import` |
| `unplugin-vue-components` | 自动导入组件 | `npm install unplugin-vue-components` |
| `vite-plugin-compression` | Gzip/Brotli 压缩 | `npm install vite-plugin-compression` |
| `vite-plugin-static-copy` | 复制静态资源 | `npm install vite-plugin-static-copy` |
| `rollup-plugin-visualizer` | 打包分析 | `npm install rollup-plugin-visualizer` |

### 5.2 自动导入配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'vue': ['ref', 'reactive', 'computed', 'onMounted', 'onUnmounted'],
          'vue-router': ['useRoute', 'useRouter'],
          'pinia': ['defineStore'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

**使用效果：**

```vue
<!-- 无需 import 即可使用 -->
<script setup>
const count = ref(0);
const doubled = computed(() => count.value * 2);

onMounted(() => {
  console.log('mounted');
});
</script>
```

### 5.3 压缩插件配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { VitePluginCompression } from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    VitePluginCompression({
      algorithm: 'gzip',
      threshold: 10240,
      verbose: true,
      disable: false,
      deleteOriginFile: false,
    }),
    VitePluginCompression({
      algorithm: 'brotliCompress',
      threshold: 10240,
      verbose: true,
      disable: false,
      deleteOriginFile: false,
    }),
  ],
});
```

### 5.4 打包分析

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

---

## 6. 开发服务器配置

### 6.1 基础配置

```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    https: false,
    cors: true,
    strictPort: true,
    hmr: {
      host: 'localhost',
      port: 3001,
      protocol: 'ws',
      overlay: true,
    },
  },
});
```

### 6.2 代理配置

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
      '/auth': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, ''),
      },
      '/socket.io': {
        target: 'http://localhost:8080',
        ws: true,
      },
    },
  },
});
```

### 6.3 路径别名提示

```javascript
// vite.config.js
export default defineConfig({
  server: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
```

---

## 7. 构建优化

### 7.1 生产环境配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePluginCompression } from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    vue(),
    VitePluginCompression({
      algorithm: 'gzip',
      threshold: 10240,
    }),
  ],
  build: {
    target: 'es2020',
    minify: 'terser',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['element-plus'],
          chart: ['echarts'],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
  },
});
```

### 7.2 代码分割

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('@vue')) {
              return 'vue';
            }
            if (id.includes('react') || id.includes('@react')) {
              return 'react';
            }
            return 'vendor';
          }
          if (id.includes('src/components')) {
            return 'components';
          }
        },
      },
    },
  },
});
```

### 7.3 资源优化

```javascript
// vite.config.js
export default defineConfig({
  build: {
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },
});
```

### 7.4 Tree Shaking

Vite 默认开启 Tree Shaking，确保只打包使用的代码：

```javascript
// package.json
{
  "sideEffects": false
}
```

---

## 8. 环境变量

### 8.1 创建环境文件

```env
# .env
VITE_APP_TITLE=My App
VITE_APP_VERSION=1.0.0
```

```env
# .env.development
VITE_API_URL=http://localhost:8080/api
VITE_DEBUG=true
VITE_LOG_LEVEL=debug
```

```env
# .env.production
VITE_API_URL=https://api.example.com
VITE_DEBUG=false
VITE_LOG_LEVEL=info
```

### 8.2 在代码中使用

```javascript
// src/main.js
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env.VITE_API_URL);
console.log(import.meta.env.VITE_DEBUG);
```

```vue
<!-- src/App.vue -->
<script setup>
const apiUrl = import.meta.env.VITE_API_URL;
const isDebug = import.meta.env.VITE_DEBUG === 'true';
</script>
```

### 8.3 TypeScript 类型声明

```typescript
// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  readonly VITE_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 9. 框架集成

### 9.1 Vue 3 集成

```bash
npm install vue@3 @vitejs/plugin-vue --save-dev
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

createApp(App).mount('#app');
```

### 9.2 React 集成

```bash
npm install react react-dom @vitejs/plugin-react --save-dev
```

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

```javascript
// src/main.jsx
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

createRoot(document.getElementById('app')).render(<App />);
```

### 9.3 Vue + Vue Router + Pinia

```bash
npm install vue-router@4 pinia --save
```

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

```javascript
// src/store/index.js
import { createPinia } from 'pinia';

const pinia = createPinia();

export default pinia;
```

```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');
```

---

## 10. 迁移指南：Webpack → Vite

### 10.1 迁移步骤

**步骤 1：安装 Vite 和对应插件**

```bash
npm install vite @vitejs/plugin-vue --save-dev
npm uninstall webpack webpack-cli webpack-dev-server html-webpack-plugin
```

**步骤 2：创建 vite.config.js**

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
```

**步骤 3：更新入口 HTML**

将 HTML 文件移到项目根目录：

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

**步骤 4：更新 CSS 导入**

```javascript
// src/main.js
import './style.css';
```

**步骤 5：处理环境变量**

```javascript
// Webpack
const apiUrl = process.env.API_URL;

// Vite
const apiUrl = import.meta.env.VITE_API_URL;
```

**步骤 6：更新 package.json 脚本**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 10.2 常见问题对照表

| Webpack 特性 | Vite 替代方案 |
|-------------|--------------|
| `require()` | 使用 ES Module `import` |
| `process.env` | `import.meta.env` |
| `__dirname` | `import.meta.url` + `fileURLToPath` |
| `html-webpack-plugin` | Vite 内置 HTML 支持 |
| `copy-webpack-plugin` | `vite-plugin-static-copy` |
| `webpack-dev-server proxy` | Vite `server.proxy` |
| `mini-css-extract-plugin` | Vite 内置 CSS 提取 |
| `babel-loader` | Vite 内置 ES Module |
| `style-loader` | Vite 内置 CSS 支持 |

### 10.3 兼容性处理

```javascript
// 处理 CommonJS 模块
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');

// 处理 __dirname
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 处理 JSON 文件
import pkg from '../package.json' assert { type: 'json' };
```

---

## 11. 最佳实践

### 11.1 开发环境

- 使用 Vite 作为开发服务器，享受极速 HMR
- 配置代理转发，避免跨域问题
- 使用 ESLint 和 Prettier 保持代码质量
- 使用 Git 钩子（Husky）确保提交前检查

### 11.2 生产环境

- 启用 gzip/brotli 压缩
- 配置合理的缓存策略（hash 文件名）
- 分离第三方依赖和业务代码
- 移除 console.log 和调试代码
- 使用 CDN 加速静态资源

### 11.3 性能优化

- 代码分割，按需加载
- 图片优化（使用 vite-plugin-image-optimizer）
- 开启 tree-shaking
- 使用 CSS 变量减少重复代码
- 懒加载路由组件

### 11.4 项目结构建议

```
.
├── src/
│   ├── components/          # 公共组件
│   │   ├── Button/
│   │   │   ├── index.vue
│   │   │   └── style.scss
│   │   └── Card/
│   ├── views/              # 页面组件
│   │   ├── Home/
│   │   │   ├── index.vue
│   │   │   └── components/
│   │   └── About/
│   ├── utils/              # 工具函数
│   │   ├── request.js      # HTTP 请求封装
│   │   ├── storage.js      # 本地存储封装
│   │   └── validator.js    # 表单验证
│   ├── api/                # API 请求
│   │   ├── user.js
│   │   └── product.js
│   ├── store/              # 状态管理
│   │   ├── modules/
│   │   │   ├── user.js
│   │   │   └── cart.js
│   │   └── index.js
│   ├── router/             # 路由配置
│   │   ├── modules/
│   │   └── index.js
│   ├── styles/             # 全局样式
│   │   ├── variables.scss
│   │   ├── mixins.scss
│   │   └── index.scss
│   ├── assets/             # 静态资源
│   │   ├── images/
│   │   └── icons/
│   └── main.js             # 入口文件
├── public/                 # 静态资源（直接复制）
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
├── postcss.config.js       # PostCSS 配置
├── .eslintrc.js            # ESLint 配置
└── package.json
```

---

## 12. 完整配置示例

```javascript
// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { VitePluginCompression } from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === 'production';

  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dirs: ['src/components'],
        dts: 'src/components.d.ts',
        resolvers: [ElementPlusResolver()],
      }),
      isProduction && VitePluginCompression({
        algorithm: 'gzip',
        threshold: 10240,
      }),
      isProduction && VitePluginCompression({
        algorithm: 'brotliCompress',
        threshold: 10240,
      }),
      visualizer({
        open: !isProduction,
        filename: 'dist/stats.html',
      }),
    ].filter(Boolean),

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@api': path.resolve(__dirname, './src/api'),
        '@views': path.resolve(__dirname, './src/views'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
    },

    server: {
      port: Number(env.VITE_PORT) || 3000,
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    build: {
      target: 'es2020',
      minify: isProduction ? 'terser' : false,
      sourcemap: !isProduction,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            ui: ['element-plus'],
          },
        },
      },
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } : {},
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },
  };
});
```

---

## 13. 总结

Vite 是下一代前端构建工具，利用浏览器原生 ES Module 实现极速开发体验。相比 Webpack，Vite 的配置更简洁，开发体验更好。对于中小型项目和快速开发，Vite 是更好的选择；对于大型复杂项目，Webpack 仍然是更成熟的选择。
