# Create React App 完全指南

> Create React App 是官方推荐的 React 项目脚手架，隐藏了复杂的配置，让你专注于编写应用代码。

---

## 1. 项目结构概览

### 1.1 目录结构

```
my-app/
├── public/                    # 静态资源目录
│   ├── index.html             # HTML 模板
│   ├── favicon.ico            # 网站图标
│   ├── logo192.png            # PWA 图标（192x192）
│   ├── logo512.png            # PWA 图标（512x512）
│   ├── manifest.json          # PWA 配置
│   └── robots.txt             # 搜索引擎爬虫规则
├── src/                       # 源代码目录
│   ├── components/            # 组件目录（可选）
│   │   └── App.jsx            # 主应用组件
│   ├── pages/                 # 页面目录（可选）
│   ├── hooks/                 # 自定义 Hooks（可选）
│   ├── utils/                 # 工具函数（可选）
│   ├── api/                   # API 请求（可选）
│   ├── styles/                # 样式文件（可选）
│   ├── App.css                # 主应用样式
│   ├── App.jsx                # 主应用组件
│   ├── App.test.jsx           # 应用测试
│   ├── index.css              # 全局样式
│   ├── index.jsx              # 应用入口文件
│   ├── logo.svg               # React 官方 Logo
│   ├── reportWebVitals.js     # Web Vitals 性能报告
│   └── setupTests.js          # 测试配置
├── .gitignore                 # Git 忽略规则
├── package.json               # 项目依赖和脚本
├── README.md                  # 项目说明文档
└── yarn.lock                  # Yarn 锁文件（或 package-lock.json）
```

### 1.2 关键文件说明

| 文件 | 作用 | 说明 |
|------|------|------|
| `public/index.html` | HTML 模板 | React 应用挂载的根容器 |
| `src/index.jsx` | 应用入口 | 渲染 React 应用到 DOM |
| `src/App.jsx` | 主组件 | 应用的根组件 |
| `src/index.css` | 全局样式 | 全局 CSS 样式 |
| `src/App.css` | 应用样式 | App 组件的样式 |
| `src/reportWebVitals.js` | 性能报告 | 测量和报告 Web Vitals |
| `src/setupTests.js` | 测试配置 | Jest 和 React Testing Library 配置 |
| `public/manifest.json` | PWA 配置 | 渐进式 Web 应用配置 |

---

## 2. 工作原理详解

### 2.1 从用户使用到代码执行的完整流程

```
用户输入命令 → CRA 创建项目 → 安装依赖 → 启动开发服务器 → 浏览器加载 → React 渲染
```

**详细步骤：**

1. **用户输入命令**
   ```bash
   npx create-react-app my-app --template typescript
   ```

2. **CRA 脚手架工作**
   - 下载并执行 `create-react-app` 包
   - 根据模板生成项目结构
   - 安装基础依赖（react, react-dom, react-scripts）

3. **依赖安装**
   - `react`: React 核心库
   - `react-dom`: React DOM 渲染库
   - `react-scripts`: 包含 Webpack、Babel、ESLint 等配置
   - `typescript`: TypeScript 支持（使用 TypeScript 模板时）

4. **启动开发服务器**
   ```bash
   npm start
   ```
   - `react-scripts start` 启动 Webpack Dev Server
   - 监听文件变化，自动热更新
   - 默认端口 3000

5. **浏览器加载**
   - 请求 `http://localhost:3000`
   - 服务器返回 `public/index.html`
   - HTML 加载 `src/index.jsx`（通过 Webpack 编译）

6. **React 渲染**
   - `ReactDOM.createRoot` 创建根节点
   - `root.render(<App />)` 渲染应用
   - JSX 转换为虚拟 DOM
   - 虚拟 DOM 渲染为真实 DOM

### 2.2 react-scripts 内部架构

```
react-scripts/
├── config/                    # Webpack 配置
│   ├── webpack.config.js      # Webpack 主配置
│   ├── webpackDevServer.config.js  # 开发服务器配置
│   ├── jest.config.js         # Jest 配置
│   └── paths.js               # 路径配置
├── scripts/                   # 脚本文件
│   ├── start.js               # 启动开发服务器
│   ├── build.js               # 生产构建
│   ├── test.js                # 运行测试
│   └── eject.js               # 弹出配置
└── package.json               # react-scripts 依赖
```

**核心配置说明：**

- **Webpack**: 打包工具，处理 JSX、CSS、资源文件
- **Babel**: 转译器，将 ES6+ 转译为 ES5
- **ESLint**: 代码检查工具
- **Jest**: 测试框架
- **Webpack Dev Server**: 开发服务器，支持热更新

---

## 3. 入口文件深度解析

### 3.1 index.jsx 逐行讲解

```javascript
// src/index.jsx

// 1. 导入 React 和 ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// 2. 导入全局样式
import './index.css';

// 3. 导入主应用组件
import App from './App';

// 4. 导入性能报告工具
import reportWebVitals from './reportWebVitals';

// 5. 获取 DOM 根节点
const root = ReactDOM.createRoot(document.getElementById('root'));

// 6. 渲染应用
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 7. 启动性能监控
reportWebVitals();
```

**逐行解析：**

1. **导入 React 和 ReactDOM**
   - `react`: React 核心库，提供组件、Hooks 等功能
   - `react-dom/client`: React 18+ 的新渲染 API，支持并发渲染

2. **导入全局样式**
   - `./index.css`: 全局 CSS 样式，会被 Webpack 的 `style-loader` 注入到页面

3. **导入主应用组件**
   - `./App`: 应用的根组件，所有其他组件都嵌套在 App 组件中

4. **导入性能报告工具**
   - `reportWebVitals`: 用于测量和报告 Web Vitals 指标（LCP、FID、CLS 等）

5. **获取 DOM 根节点**
   - `document.getElementById('root')`: 获取 HTML 中 id 为 root 的元素
   - `ReactDOM.createRoot`: 创建一个根节点，准备渲染 React 应用

6. **渲染应用**
   - `<React.StrictMode>`: 严格模式，会在开发模式下执行额外检查
   - `<App />`: 渲染 App 组件
   - React 18 引入了新的并发渲染模式，`createRoot` 是新的渲染 API

7. **启动性能监控**
   - `reportWebVitals()`: 启动 Web Vitals 监控，将数据发送到分析服务

### 3.2 index.html 深度解析

```html
<!-- public/index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- %PUBLIC_URL% 会被替换为 public 目录的路径 -->
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    
    <!-- 响应式视图配置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <!-- 主题颜色（用于 PWA） -->
    <meta name="theme-color" content="#000000" />
    
    <!-- 描述信息 -->
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    
    <!-- 预加载图标（用于 PWA） -->
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    
    <!-- PWA 配置文件 -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    
    <!-- 页面标题 -->
    <title>React App</title>
  </head>
  <body>
    <!-- React 应用挂载的根节点 -->
    <div id="root"></div>
    
    <!-- 如果 JavaScript 被禁用，显示提示信息 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    
    <!-- Webpack 编译后的脚本会自动注入到这里 -->
  </body>
</html>
```

**关键知识点：**

- **%PUBLIC_URL%**: 一个特殊的占位符，会被替换为 `public` 目录的 URL
- **viewport**: 移动端响应式配置，确保在移动设备上正确显示
- **theme-color**: 用于 PWA，设置浏览器地址栏颜色
- **manifest.json**: PWA 配置文件，定义应用名称、图标、启动画面等
- **noscript**: 当用户禁用 JavaScript 时显示的提示信息

---

## 4. 主组件深度解析

### 4.1 App.jsx 完整示例

```javascript
// src/App.jsx

// 1. 导入样式
import './App.css';

// 2. 定义 App 组件
function App() {
  // 3. 使用 useState Hook
  const [count, setCount] = useState(0);
  
  // 4. 使用 useEffect Hook
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  // 5. 事件处理函数
  const handleIncrement = () => {
    setCount(count + 1);
  };
  
  const handleDecrement = () => {
    setCount(count - 1);
  };
  
  // 6. 返回 JSX
  return (
    <div className="App">
      <header className="App-header">
        {/* 显示 Logo */}
        <img src={logo} className="App-logo" alt="logo" />
        
        {/* 显示标题 */}
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        
        {/* 显示计数 */}
        <div className="counter">
          <h2>Count: {count}</h2>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement}>-</button>
        </div>
        
        {/* 链接 */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// 7. 导出组件
export default App;
```

**逐行解析：**

1. **导入样式**
   - `./App.css`: App 组件的样式文件
   - Webpack 的 `css-loader` 会处理这个导入

2. **定义 App 组件**
   - 使用函数式组件，这是 React 16.8+ 的推荐方式
   - 函数式组件可以使用 Hooks

3. **使用 useState Hook**
   - `useState(0)`: 创建一个状态变量 `count`，初始值为 0
   - `count`: 当前状态值
   - `setCount`: 更新状态的函数

4. **使用 useEffect Hook**
   - 当 `count` 变化时，更新页面标题
   - `[count]`: 依赖数组，只有当 `count` 变化时才执行副作用

5. **事件处理函数**
   - `handleIncrement`: 点击 + 按钮时，count + 1
   - `handleDecrement`: 点击 - 按钮时，count - 1

6. **返回 JSX**
   - JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中写 HTML
   - `<div className="App">`: 使用 `className` 而不是 `class`，因为 `class` 是 JavaScript 关键字
   - `{count}`: 使用花括号插入 JavaScript 表达式
   - `onClick={handleIncrement}`: 绑定点击事件

7. **导出组件**
   - `export default App`: 默认导出组件，其他文件可以导入使用

---

## 5. 核心概念深入讲解

### 5.1 JSX 语法详解

**基本语法：**

```jsx
// 单元素
const element = <h1>Hello, React!</h1>;

// 嵌套元素
const element = (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);

// JavaScript 表达式
const name = 'Alice';
const element = <h1>Hello, {name}</h1>;

// 属性
const element = <img src={avatarUrl} alt="Avatar" />;

// 列表渲染
const items = ['Apple', 'Banana', 'Orange'];
const list = (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// 条件渲染
const isLoggedIn = true;
const element = isLoggedIn ? <Welcome /> : <Login />;
```

**关键知识点：**

- **className vs class**: JSX 中使用 `className` 代替 `class`
- **htmlFor vs for**: JSX 中使用 `htmlFor` 代替 `for`
- **self-closing tags**: 必须闭合，如 `<img />`
- **key 属性**: 列表渲染时必须提供唯一的 key

### 5.2 Hooks 深入讲解

#### useState

```jsx
// 基本用法
const [count, setCount] = useState(0);

// 函数式更新（当新状态依赖于旧状态时）
const increment = () => setCount(prev => prev + 1);

// 初始值可以是函数（只在初始化时执行一次）
const [items, setItems] = useState(() => {
  const stored = localStorage.getItem('items');
  return stored ? JSON.parse(stored) : [];
});

// 对象状态
const [user, setUser] = useState({ name: 'Alice', age: 30 });

// 更新对象状态（不要直接修改原对象）
setUser(prev => ({ ...prev, age: prev.age + 1 }));
```

#### useEffect

```jsx
// 挂载时执行一次
useEffect(() => {
  console.log('Mounted');
}, []);

// 每次渲染都执行
useEffect(() => {
  console.log('Updated');
});

// 依赖变化时执行
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);

// 清理副作用
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  
  // 返回清理函数
  return () => clearInterval(timer);
}, []);
```

#### useContext

```jsx
// 创建 Context
const ThemeContext = createContext('light');

// Provider
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer
function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={`theme-${theme}`}>...</div>;
}
```

#### useReducer

```jsx
// Reducer 函数
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

// 使用 useReducer
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### 5.3 事件处理

```jsx
function Button() {
  // 基础事件处理
  const handleClick = () => {
    console.log('Clicked');
  };
  
  // 传递参数
  const handleDelete = (id) => {
    console.log(`Delete item: ${id}`);
  };
  
  // 事件对象
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止默认行为
    console.log('Form submitted');
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <button onClick={() => handleDelete(1)}>Delete</button>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

---

## 6. 组件通信

### 6.1 Props 传递

```jsx
// 父组件
function Parent() {
  const [name, setName] = useState('Alice');
  
  return <Child name={name} onNameChange={setName} />;
}

// 子组件
function Child({ name, onNameChange }) {
  return (
    <div>
      <p>Name: {name}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
    </div>
  );
}
```

### 6.2 Context API

```jsx
// 创建 Context
const UserContext = createContext(null);

// Provider
function App() {
  const [user, setUser] = useState({ name: 'Alice', isLoggedIn: true });
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navigation />
      <MainContent />
    </UserContext.Provider>
  );
}

// 使用 Context
function Navigation() {
  const { user, setUser } = useContext(UserContext);
  
  return (
    <nav>
      <span>Welcome, {user.name}</span>
      <button onClick={() => setUser({ ...user, isLoggedIn: false })}>
        Logout
      </button>
    </nav>
  );
}
```

### 6.3 状态提升

```jsx
// 父组件管理状态
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <CounterDisplay count={count} />
      <CounterControls onIncrement={() => setCount(c => c + 1)} />
    </div>
  );
}

// 显示组件
function CounterDisplay({ count }) {
  return <p>Count: {count}</p>;
}

// 控制组件
function CounterControls({ onIncrement }) {
  return <button onClick={onIncrement}>+</button>;
}
```

---

## 7. 样式处理

### 7.1 CSS Modules

```css
/* Button.module.css */
.button {
  background-color: #646cff;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.button:hover {
  opacity: 0.9;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

### 7.2 内联样式

```jsx
function Component() {
  const style = {
    color: 'red',
    fontSize: '16px',
    backgroundColor: '#f0f0f0',
  };
  
  return <div style={style}>Styled content</div>;
}
```

### 7.3 CSS-in-JS

```bash
npm install styled-components
```

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: #646cff;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

function App() {
  return <Button>Click me</Button>;
}
```

---

## 8. 数据请求

### 8.1 使用 useEffect 和 fetch

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        
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
    };
    
    fetchUsers();
  }, []);
  
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
```

### 8.2 使用 Axios

```bash
npm install axios
```

```jsx
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('https://api.example.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 8.3 自定义 Hook

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    return () => controller.abort();
  }, [url]);
  
  return { data, loading, error };
}

// 使用
function UserList() {
  const { data: users, loading, error } = useFetch('https://api.example.com/users');
  
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
```

---

## 9. 路由配置

### 9.1 安装 React Router

```bash
npm install react-router-dom
```

### 9.2 基础路由

```jsx
// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
```

### 9.3 动态路由

```jsx
// src/App.jsx
<Route path="/users/:id" element={<UserDetail />} />

// src/pages/UserDetail.jsx
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  
  return <div>User ID: {id}</div>;
}
```

### 9.4 嵌套路由

```jsx
// src/App.jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="settings" element={<Settings />} />
</Route>

// src/pages/Dashboard.jsx
import { Outlet, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}
```

---

## 10. 状态管理

### 10.1 使用 Context + useReducer

```jsx
// src/store/userContext.js
import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  
  return (
    <UserContext.Provider value={{ state, dispatch }}>
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

```jsx
// src/App.jsx
import { UserProvider } from './store/userContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
```

```jsx
// src/pages/Login.jsx
import { useState } from 'react';
import { useUser } from '../store/userContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useUser();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      const user = await response.json();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 11. 测试

### 11.1 组件测试

```jsx
// src/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

### 11.2 Hooks 测试

```jsx
// src/hooks/useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

test('useCounter increments count', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

---

## 12. 构建与部署

### 12.1 生产构建

```bash
npm run build
```

**构建输出：**

```
build/
├── static/
│   ├── js/
│   │   ├── main.abc123.js
│   │   ├── main.abc123.js.map
│   │   └── vendors~main.def456.js
│   ├── css/
│   │   └── main.abc123.css
│   └── media/
│       └── logo.xyz789.svg
├── index.html
├── favicon.ico
└── manifest.json
```

### 12.2 部署到 Vercel

```bash
npm install -g vercel
vercel init
vercel deploy --prod
```

### 12.3 部署到 GitHub Pages

```bash
npm install gh-pages --save-dev
```

```json
// package.json
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

## 13. 高级技巧

### 13.1 代码分割

```jsx
// 动态导入
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 使用 Suspense
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>

// 路由级别的代码分割
<Route
  path="/about"
  element={
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
  }
/>
```

### 13.2 性能优化

```jsx
// React.memo - 防止不必要的重渲染
const MemoizedComponent = React.memo(function Component({ data }) {
  return <div>{data}</div>;
});

// useMemo - 缓存计算结果
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback - 缓存函数引用
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 13.3 错误边界

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, info) {
    console.error('Error:', error);
    console.error('Info:', info);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong!</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// 使用
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## 14. 总结

Create React App 是 React 官方推荐的项目脚手架，它隐藏了复杂的配置，让你专注于编写应用代码。通过本指南，你应该掌握了：

1. **项目结构**：理解 CRA 创建的目录结构和关键文件
2. **工作原理**：了解从用户使用到代码执行的完整流程
3. **核心概念**：JSX、Hooks、组件通信、状态管理
4. **高级技巧**：路由、数据请求、测试、构建部署

CRA 适合快速开始一个 React 项目，但当你需要更高级的配置时，可以使用 `npm run eject` 弹出配置，或者使用 Vite 等现代构建工具。
