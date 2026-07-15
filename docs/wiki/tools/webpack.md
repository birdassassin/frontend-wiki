# Webpack 完全指南

> Webpack 是一个静态模块打包工具，将现代 JavaScript 应用程序所需的各种资源（JS、CSS、图片等）打包成静态文件。

---

## 1. 核心概念

### 1.1 五大核心概念

| 概念 | 说明 |
|------|------|
| **Entry** | 入口文件，Webpack 从这里开始构建依赖图 |
| **Output** | 输出配置，指定打包后文件的位置和名称 |
| **Loader** | 转换器，处理非 JavaScript 文件 |
| **Plugin** | 插件，扩展 Webpack 功能 |
| **Mode** | 模式，development 或 production |

### 1.2 工作原理

```
入口文件 → 依赖解析 → Loader 转换 → Plugin 处理 → 输出文件
```

Webpack 将所有资源视为模块，通过依赖图将它们打包成一个或多个 bundle 文件。

---

## 2. 快速开始

### 2.1 项目初始化

```bash
# 创建项目目录
mkdir webpack-demo && cd webpack-demo

# 初始化 npm
npm init -y

# 安装核心依赖
npm install webpack webpack-cli --save-dev

# 安装开发服务器
npm install webpack-dev-server --save-dev

# 创建目录结构
mkdir src
touch src/index.js
touch index.html
touch webpack.config.js
```

### 2.2 基础配置

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true,
  },
};
```

### 2.3 入口文件

```javascript
// src/index.js
import './style.css';

const app = document.createElement('div');
app.innerHTML = '<h1>Hello Webpack!</h1>';
document.body.appendChild(app);
```

### 2.4 HTML 模板

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Webpack Demo</title>
  </head>
  <body>
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

### 2.5 package.json 脚本

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

## 3. Loader 配置详解

### 3.1 Babel 配置

```bash
npm install babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript --save-dev
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
            presets: [
              ['@babel/preset-env', {
                targets: {
                  chrome: '60',
                  ie: '11',
                },
                useBuiltIns: 'usage',
                corejs: 3,
              }],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime',
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
```

### 3.2 CSS 处理

```bash
npm install style-loader css-loader sass-loader sass postcss-loader autoprefixer --save-dev
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
```

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
    }),
  ],
};
```

### 3.3 资源文件处理

```bash
npm install file-loader url-loader --save-dev
```

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
};
```

---

## 4. Plugin 配置详解

### 4.1 HtmlWebpackPlugin

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
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      hash: true,
    }),
  ],
};
```

### 4.2 MiniCssExtractPlugin

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
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
};
```

### 4.3 CssMinimizerPlugin

```bash
npm install css-minimizer-webpack-plugin --save-dev
```

```javascript
// webpack.config.js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
```

### 4.4 DefinePlugin

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      __VERSION__: JSON.stringify('1.0.0'),
    }),
  ],
};
```

### 4.5 CopyWebpackPlugin

```bash
npm install copy-webpack-plugin --save-dev
```

```javascript
// webpack.config.js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'public' },
        { from: 'src/assets', to: 'assets' },
      ],
    }),
  ],
};
```

### 4.6 HotModuleReplacementPlugin

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
```

---

## 5. 代码分割

### 5.1 入口分割

```javascript
// webpack.config.js
module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### 5.2 SplitChunks

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10,
          reuseExistingChunk: true,
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 10,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
};
```

### 5.3 动态导入

```javascript
// 方式一：import() 函数
async function loadComponent() {
  const module = await import('./HeavyComponent');
  return module.default;
}

// 方式二：React.lazy
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// 使用 Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>

// 方式三：webpackChunkName 注释
import(/* webpackChunkName: "chart" */ './Chart')
  .then(({ default: Chart }) => {
    const chart = new Chart();
  });
```

---

## 6. 高级配置

### 6.1 路径别名

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
  },
};
```

### 6.2 环境变量

```javascript
// webpack.config.js
const dotenv = require('dotenv');

module.exports = () => {
  const env = dotenv.config().parsed;
  
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  
  return {
    plugins: [
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
```

创建 `.env` 文件：

```env
NODE_ENV=development
API_URL=http://localhost:8080/api
APP_NAME=MyApp
```

### 6.3 多页面应用

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    home: './src/home/index.js',
    about: './src/about/index.js',
    contact: './src/contact/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/home/index.html',
      filename: 'home.html',
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      template: './src/about/index.html',
      filename: 'about.html',
      chunks: ['about'],
    }),
    new HtmlWebpackPlugin({
      template: './src/contact/index.html',
      filename: 'contact.html',
      chunks: ['contact'],
    }),
  ],
};
```

### 6.4 缓存优化

```javascript
// webpack.config.js
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

### 6.5 生产环境优化

```javascript
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
            drop_debugger: true,
            pure_funcs: ['console.log'],
          },
          mangle: {
            reserved: ['$super', '$', 'exports', 'require'],
          },
        },
        extractComments: false,
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
```

### 6.6 性能监控

```javascript
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      openAnalyzer: true,
    }),
  ],
};
```

---

## 7. 常见问题

### 7.1 模块解析失败

```javascript
// 原因：缺少 loader 或配置错误
// 解决方案：确保配置了正确的 loader
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
```

### 7.2 热更新不生效

```javascript
// 原因：缺少 HotModuleReplacementPlugin
// 解决方案：
module.exports = {
  devServer: {
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
```

### 7.3 打包体积过大

```javascript
// 解决方案：代码分割 + 压缩 + Tree Shaking
module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
};
```

### 7.4 跨域问题

```javascript
// 解决方案：配置 devServer proxy
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
```

---

## 8. 完整配置示例

```javascript
// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  const isProduction = env.mode === 'production';
  
  return {
    entry: './src/index.js',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: './dist',
      hot: true,
      open: true,
      port: 3000,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: { maxSize: 8 * 1024 },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimize: isProduction,
      minimizer: isProduction
        ? [new TerserPlugin(), new CssMinimizerPlugin()]
        : [],
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
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Webpack App',
        minify: isProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
            }
          : false,
      }),
      isProduction && new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      isProduction && new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
    ].filter(Boolean),
  };
};
```

---

## 9. 总结

Webpack 是一个功能强大的构建工具，通过 Loader 和 Plugin 机制可以处理各种资源。虽然配置复杂，但掌握后可以实现高度定制化的构建流程。对于现代前端项目，Webpack 仍然是最成熟和最广泛使用的选择。
