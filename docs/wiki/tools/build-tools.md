# 前端构建工具链

> 构建工具是现代前端工程化的核心，Webpack 和 Vite 是目前最主流的选择。

---

## 1. Webpack

### 1.1 基本概念

Webpack 是一个静态模块打包工具，将现代 JavaScript 应用程序所需的各种资源（JS、CSS、图片等）打包成静态文件。

**核心概念：**
- **Entry**：入口文件，Webpack 从这里开始构建依赖图
- **Output**：输出配置，指定打包后文件的位置和名称
- **Loader**：转换器，处理非 JavaScript 文件
- **Plugin**：插件，扩展 Webpack 功能
- **Mode**：模式，development 或 production

### 1.2 快速开始

```bash
# 初始化项目
npm init -y

# 安装依赖
npm install webpack webpack-cli --save-dev
npm install webpack-dev-server --save-dev

# 创建目录结构
mkdir src
touch src/index.js
touch webpack.config.js
```

### 1.3 基础配置

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 3000,
  },
};
```

### 1.4 Loader 配置

#### Babel 配置

```bash
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
```

#### CSS 配置

```bash
npm install style-loader css-loader --save-dev
npm install sass-loader sass --save-dev
```

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

#### 资源文件配置

```bash
npm install file-loader --save-dev
```

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
```

### 1.5 常用插件

#### HtmlWebpackPlugin

```bash
npm install html-webpack-plugin --save-dev
```

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Webpack App',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
};
```

#### CleanWebpackPlugin

```bash
npm install clean-webpack-plugin --save-dev
```

```javascript
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

#### MiniCssExtractPlugin

```bash
npm install mini-css-extract-plugin --save-dev
```

```javascript
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
};
```

### 1.6 高级配置

#### 代码分割

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
};
```

#### 路径别名

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
};
```

#### 生产环境优化

```javascript
// webpack.config.js
module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};
```

### 1.7 package.json 脚本

```json
{
  "scripts": {
    "start": "webpack serve --open",
    "build": "webpack",
    "build:prod": "webpack --mode=production"
  }
}
```

---

## 2. Vite

### 2.1 基本概念

Vite 是下一代前端构建工具，基于原生 ES Module，提供极速的开发服务器启动和热模块替换（HMR）。

**核心特点：**
- **极速冷启动**：无需打包，利用浏览器原生 ES Module
- **即时热更新**：基于 ES Module 的 HMR，更新极快
- **按需编译**：只编译当前需要的模块
- **Rollup 打包**：生产环境使用 Rollup，输出优化

### 2.2 快速开始

```bash
# 创建 Vue 项目
npm create vite@6.5.0 . -- --template vue

# 创建 React 项目
npm create vite@6.5.0 . -- --template react

# 创建 TypeScript 项目
npm create vite@6.5.0 . -- --template vue-ts

# 安装依赖
npm install
npm run dev
```

### 2.3 基础配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    hot: true,
  },
});
```

### 2.4 路径别名配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

```json
// tsconfig.json 或 jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 2.5 CSS 配置

Vite 内置 CSS 支持，无需额外配置：

```css
/* src/style.css */
@import './variables.css';

body {
  font-family: var(--font-family);
  color: var(--text-color);
}
```

```css
/* src/variables.css */
:root {
  --font-family: 'Inter', system-ui, sans-serif;
  --text-color: #333;
  --primary-color: #646cff;
}
```

### 2.6 插件系统

#### 常用插件

```bash
# Vue 插件
npm install @vitejs/plugin-vue --save-dev

# React 插件
npm install @vitejs/plugin-react --save-dev

# Vue JSX 插件
npm install @vitejs/plugin-vue-jsx --save-dev

# 路径别名插件
npm install @rollup/plugin-alias --save-dev

# 压缩插件
npm install vite-plugin-compression --save-dev

# 自动导入插件
npm install unplugin-auto-import unplugin-vue-components --save-dev
```

#### 自动导入配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
    }),
  ],
});
```

### 2.7 开发服务器配置

```javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    cors: true,
    strictPort: true,
  },
});
```

### 2.8 构建优化

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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
});
```

### 2.9 环境变量

创建 `.env` 文件：

```env
# .env.development
VITE_APP_TITLE=My App
VITE_API_URL=http://localhost:8080/api
VITE_DEBUG=true
```

```env
# .env.production
VITE_APP_TITLE=My App
VITE_API_URL=https://api.example.com
VITE_DEBUG=false
```

在代码中使用：

```javascript
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env.VITE_API_URL);
```

### 2.10 与 Webpack 的对比

| 特性 | Webpack | Vite |
|------|---------|------|
| **开发服务器** | 基于打包 | 基于原生 ES Module |
| **冷启动速度** | 较慢 | 极快 |
| **热更新** | 较慢 | 即时 |
| **生产打包** | Webpack | Rollup |
| **配置复杂度** | 较高 | 较低 |
| **生态** | 成熟丰富 | 快速增长 |
| **适用场景** | 大型复杂项目 | 中小型项目、快速开发 |

### 2.11 package.json 脚本

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

## 3. 迁移指南：Webpack → Vite

### 3.1 迁移步骤

1. **安装 Vite 和对应插件**

```bash
npm install vite @vitejs/plugin-vue --save-dev
npm uninstall webpack webpack-cli webpack-dev-server
```

2. **创建 vite.config.js**

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

3. **更新入口文件**

将 HTML 文件移到项目根目录，并添加 ES Module 脚本：

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

4. **更新 CSS 导入**

移除 `style-loader` 和 `css-loader` 的配置，直接在 JS 中导入 CSS：

```javascript
// src/main.js
import './style.css';
```

5. **处理环境变量**

将 `process.env` 替换为 `import.meta.env`：

```javascript
// Webpack
const apiUrl = process.env.API_URL;

// Vite
const apiUrl = import.meta.env.VITE_API_URL;
```

6. **更新 package.json 脚本**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 3.2 常见问题

| Webpack 特性 | Vite 替代方案 |
|-------------|--------------|
| `require()` | 使用 ES Module `import` |
| `process.env` | `import.meta.env` |
| `__dirname` | `import.meta.url` |
| `html-webpack-plugin` | Vite 内置 HTML 支持 |
| `copy-webpack-plugin` | `vite-plugin-static-copy` |
| `webpack-dev-server proxy` | Vite `server.proxy` |

---

## 4. 最佳实践

### 4.1 开发环境

- 使用 Vite 作为开发服务器，享受极速 HMR
- 配置代理转发，避免跨域问题
- 使用 ESLint 和 Prettier 保持代码质量

### 4.2 生产环境

- 启用 gzip/brotli 压缩
- 配置合理的缓存策略（contenthash）
- 分离第三方依赖和业务代码
- 移除 console.log 和调试代码

### 4.3 性能优化

- 代码分割，按需加载
- 图片优化（使用 vite-plugin-image-optimizer）
- 开启 tree-shaking
- 使用 CSS 变量减少重复代码

### 4.4 项目结构

```
.
├── src/
│   ├── components/          # 组件
│   ├── views/              # 页面
│   ├── utils/              # 工具函数
│   ├── api/                # API 请求
│   ├── styles/             # 全局样式
│   └── main.js             # 入口文件
├── public/                 # 静态资源
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
└── package.json
```
