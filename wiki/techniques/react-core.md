# React 核心

> React 不是模板引擎，是声明式 UI 库。理解 Hooks、Fiber、并发渲染比记忆 API 重要。

---

## 1. 核心概念

### 1.1 声明式 UI
```jsx
// 命令式 (jQuery)
$('#app').html('<h1>Hello</h1>');
$('#app').css('color', 'red');

// 声明式 (React)
function App() {
  return <h1 style={{ color: 'red' }}>Hello</h1>;
}
```

### 1.2 虚拟 DOM
```
State Change → 新虚拟 DOM → Diff 算法 → 最小化 DOM 更新
```

---

## 2. Hooks

### 2.1 基础 Hooks

#### useState
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // 函数式更新
  const increment = () => setCount(c => c + 1);
  
  return <button onClick={increment}>{count}</button>;
}
```

#### useEffect
```jsx
function Component() {
  // 挂载和更新
  useEffect(() => {
    const timer = setInterval(() => {}, 1000);
    return () => clearInterval(timer); // 清理
  }, [dependency]);
  
  // 仅挂载
  useEffect(() => {
    fetch('/api/data');
  }, []);
}
```

#### useContext
```jsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}
```

### 2.2 性能 Hooks

#### useMemo
```jsx
function TodoList({ todos, filter }) {
  const filteredTodos = useMemo(() => 
    todos.filter(t => t.text.includes(filter)),
    [todos, filter]
  );
  
  return <List items={filteredTodos} />;
}
```

#### useCallback
```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // 依赖为空，函数不会重新创建
  
  return <Child onClick={handleClick} />;
}
```

### 2.3 自定义 Hooks
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// 使用
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

---

## 3. Fiber 架构

### 3.1 工作原理
```
渲染任务 → 分解为小单元 → 可中断/恢复 → 优先级调度 → 提交
```

### 3.2 并发渲染
```jsx
function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  
  const handleChange = (e) => {
    setInput(e.target.value);
    startTransition(() => {
      setSearch(e.target.value); // 低优先级更新
    });
  };
  
  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results query={search} />
    </>
  );
}
```

---

## 4. 高级模式

### 4.1 错误边界
```jsx
class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    logError(error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <Fallback />;
    }
    return this.props.children;
  }
}
```

### 4.2 Portals
```jsx
function Modal({ children }) {
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
}
```

### 4.3 Refs
```jsx
function Component() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  
  // 不触发重渲染的变量
  const timerRef = useRef(null);
  
  useEffect(() => {
    ref.current.focus();
  }, []);
  
  return <input ref={ref} />;
}
```

---

## 5. 相关概念

- [组件架构](component-architecture.md)
- [状态管理](state-management.md)
- [渲染策略](rendering-strategies.md)
- [React 生态](../../tools/react-ecosystem.md)
