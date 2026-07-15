# Create React App 使用手册

> Create React App 是官方推荐的 React 项目脚手架，让你快速开始 React 开发，无需配置繁琐的构建工具。

---

## 1. 快速开始

### 1.1 创建项目

```bash
# 使用 npx 创建项目
npx create-react-app my-app

# 使用 TypeScript
npx create-react-app my-app --template typescript

# 使用指定版本的 react-scripts
npx create-react-app@5.0.1 my-app

# 使用自定义模板
npx create-react-app my-app --template file:../my-template
```

### 1.2 启动开发服务器

```bash
cd my-app
npm start
```

开发服务器启动后，访问 `http://localhost:3000` 查看应用。

### 1.3 生产构建

```bash
npm run build
```

构建产物输出到 `build` 目录，可部署到任意静态服务器。

### 1.4 运行测试

```bash
npm test
```

### 1.5 弹出配置（不可逆）

```bash
npm run eject
```

> ⚠️ 弹出后无法恢复，建议在需要深度自定义配置时使用。

---

## 2. 项目结构

### 2.1 默认目录结构

```
my-app/
├── public/                    # 静态资源目录
│   ├── index.html            # HTML 模板
│   ├── favicon.ico           # 网站图标
│   ├── logo192.png           # PWA 图标（192x192）
│   ├── logo512.png           # PWA 图标（512x512）
│   └── manifest.json         # PWA 配置文件
├── src/                      # 源代码目录
│   ├── App.js                # 主应用组件
│   ├── App.css               # 主组件样式
│   ├── App.test.js           # 主组件测试
│   ├── index.js              # 应用入口
│   ├── index.css             # 全局样式
│   ├── logo.svg              # React 官方图标
│   ├── reportWebVitals.js    # Web Vitals 性能报告
│   └── setupTests.js         # 测试环境配置
├── .gitignore                # Git 忽略配置
├── package.json              # 项目依赖配置
├── README.md                 # 项目说明文档
└── yarn.lock                 # Yarn 依赖锁定（或 package-lock.json）
```

### 2.2 目录职责说明

| 目录/文件 | 职责 |
|-----------|------|
| **public/** | 存放静态资源，不会被 Webpack 处理 |
| **public/index.html** | HTML 模板，React 应用挂载点 |
| **public/manifest.json** | PWA 配置，定义应用名称、图标、主题色等 |
| **src/** | 源代码目录，所有业务代码 |
| **src/index.js** | 应用入口，渲染根组件 |
| **src/App.js** | 主应用组件，定义应用布局 |
| **src/index.css** | 全局样式，会被注入到页面 |
| **src/reportWebVitals.js** | 性能监控，上报 Web Vitals 数据 |
| **src/setupTests.js** | Jest 测试配置，引入 jest-dom 匹配器 |

---

## 3. 核心配置文件

### 3.1 package.json

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

**脚本说明：**

| 脚本 | 命令 | 说明 |
|------|------|------|
| **start** | `react-scripts start` | 启动开发服务器（热更新） |
| **build** | `react-scripts build` | 生产构建，输出到 build 目录 |
| **test** | `react-scripts test` | 运行 Jest 测试 |
| **eject** | `react-scripts eject` | 弹出配置文件（不可逆） |

### 3.2 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <noscript>You need to enable JavaScript to run this app.</noscript>
  </body>
</html>
```

**关键元素：**

- **%PUBLIC_URL%**: 会被替换为 `public` 目录的路径
- **&lt;div id="root"&gt;**: React 应用挂载点
- **&lt;noscript&gt;**: JavaScript 禁用时的提示

### 3.3 src/index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

**执行流程：**

1. **导入依赖**: React、ReactDOM、样式、组件、性能报告
2. **创建根节点**: `ReactDOM.createRoot()` 创建渲染根节点
3. **渲染应用**: `root.render()` 将 App 组件渲染到 DOM
4. **启动性能监控**: `reportWebVitals()` 上报 Web Vitals 数据

---

## 4. 环境变量配置

### 4.1 .env 文件

在项目根目录创建 `.env` 文件：

```bash
# .env - 所有环境共享
REACT_APP_API_URL=https://api.example.com
REACT_APP_APP_NAME=My App

# .env.development - 仅开发环境
REACT_APP_DEBUG=true

# .env.production - 仅生产环境
REACT_APP_DEBUG=false

# .env.local - 本地覆盖（不提交到 Git）
REACT_APP_API_URL=http://localhost:8080
```

### 4.2 环境变量规则

1. **必须以 `REACT_APP_` 开头**，否则不会被注入
2. **优先级**: `.env.local` > `.env.{NODE_ENV}.local` > `.env.{NODE_ENV}` > `.env`
3. **使用方式**: `process.env.REACT_APP_API_URL`

### 4.3 在代码中使用

```javascript
// src/App.js
function App() {
  return (
    <div>
      <h1>{process.env.REACT_APP_APP_NAME}</h1>
      <p>API: {process.env.REACT_APP_API_URL}</p>
    </div>
  );
}
```

---

## 5. 常用开发模式

### 5.1 创建组件

```javascript
// src/components/Button.js
function Button({ children, onClick, variant = 'primary' }) {
  const styles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
    danger: 'bg-red-500 text-white'
  };

  return (
    <button 
      className={`px-4 py-2 rounded ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
```

### 5.2 使用 Hooks

```javascript
// src/components/Counter.js
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <p>Hello, {name}!</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

export default Counter;
```

### 5.3 数据获取

```javascript
// src/components/UserList.js
import { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
```

---

## 6. 路由配置

### 6.1 安装 React Router

```bash
npm install react-router-dom
```

### 6.2 配置路由

```javascript
// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

### 6.3 创建页面组件

```javascript
// src/pages/Home.js
function Home() {
  return <h1>Home Page</h1>;
}

export default Home;
```

---

## 7. 状态管理

### 7.1 使用 Context API

```javascript
// src/context/UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    setIsLoading(true);
    // 模拟登录 API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ id: 1, name: 'John Doe', email });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
```

### 7.2 在组件中使用

```javascript
// src/components/Login.js
import { useState } from 'react';
import { useUser } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default Login;
```

---

## 8. 样式处理

### 8.1 普通 CSS

```css
/* src/App.css */
.App {
  text-align: center;
  padding: 20px;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
}
```

```javascript
import './App.css';
```

### 8.2 CSS Modules

```css
/* src/components/Button.module.css */
.button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.primary {
  background-color: #646cff;
  color: white;
}

.secondary {
  background-color: #f1f1f1;
  color: #333;
}
```

```javascript
// src/components/Button.js
import styles from './Button.module.css';

function Button({ variant = 'primary', children }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

### 8.3 添加 Tailwind CSS

```bash
npm install tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```javascript
// src/components/Button.js
function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
      {children}
    </button>
  );
}
```

---

## 9. 性能优化

### 9.1 React.memo

```javascript
// src/components/ExpensiveComponent.js
import { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // 复杂计算
  return <div>{data.map(item => item.value)}</div>;
});

export default ExpensiveComponent;
```

### 9.2 useMemo 和 useCallback

```javascript
// src/components/UserList.js
import { useMemo, useCallback } from 'react';

function UserList({ users, filter }) {
  // useMemo - 缓存计算结果
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]);

  // useCallback - 缓存函数引用
  const handleClick = useCallback((userId) => {
    console.log('User clicked:', userId);
  }, []);

  return (
    <ul>
      {filteredUsers.map(user => (
        <li key={user.id} onClick={() => handleClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
```

### 9.3 代码分割

```javascript
// src/App.js
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## 10. 测试

### 10.1 组件测试

```javascript
// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

### 10.2 模拟 API 调用

```javascript
// src/components/UserList.test.js
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

test('renders users', async () => {
  const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockUsers),
      ok: true,
    })
  );

  render(<UserList />);
  
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });
});
```

---

## 11. 部署

### 11.1 构建项目

```bash
npm run build
```

### 11.2 部署到 Netlify

1. 登录 [Netlify](https://www.netlify.com/)
2. 选择 "New site from Git"
3. 连接 GitHub/GitLab 仓库
4. 设置构建命令：`npm run build`
5. 设置发布目录：`build`
6. 点击 "Deploy site"

### 11.3 部署到 Vercel

```bash
npm install -g vercel
vercel
```

### 11.4 部署到 GitHub Pages

```bash
npm install gh-pages --save-dev
```

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "homepage": "https://username.github.io/repo-name"
}
```

```bash
npm run deploy
```

---

## 12. 常见问题

### 12.1 修改端口号

```bash
# 方式一：设置环境变量
PORT=4000 npm start

# 方式二：创建 .env 文件
echo "PORT=4000" > .env
```

### 12.2 代理 API 请求

```json
// package.json
{
  "proxy": "http://localhost:8080"
}
```

### 12.3 自定义 Webpack 配置（不 eject）

```bash
npm install customize-cra react-app-rewired --save-dev
```

```javascript
// config-overrides.js
const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  })
);
```

```json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test"
  }
}
```

### 12.4 添加 TypeScript 支持

```bash
# 新项目
npx create-react-app my-app --template typescript

# 已有项目
npm install typescript @types/node @types/react @types/react-dom @types/jest
```

---

## 13. 高级用法

### 13.1 扩展 ESLint 配置

```javascript
// .eslintrc.json
{
  "extends": ["react-app"],
  "rules": {
    "no-console": "warn",
    "react/react-in-jsx-scope": "off"
  }
}
```

### 13.2 添加 Prettier

```bash
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

```javascript
// .eslintrc.json
{
  "extends": ["react-app", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

```javascript
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

### 13.3 添加 Husky 钩子

```bash
npm install husky --save-dev
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

---

## 14. 总结

Create React App 提供了一套开箱即用的 React 开发环境：

1. **零配置**: 无需手动配置 Webpack、Babel
2. **热更新**: 开发服务器支持模块热替换
3. **内置测试**: Jest + React Testing Library
4. **性能优化**: 生产构建自动压缩、代码分割
5. **PWA 支持**: 内置 Service Worker 和 Manifest 配置

通过掌握本文档中的内容，你可以高效地使用 Create React App 开发 React 应用。
