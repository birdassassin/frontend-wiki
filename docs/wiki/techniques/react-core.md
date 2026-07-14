# React 核心

> React 不是模板引擎，是声明式 UI 库。理解 Hooks、Fiber、并发渲染比记忆 API 重要。

---

## 1. 核心概念

### 1.1 声明式 UI
```jsx
// 命令式 (jQuery)
$(&amp;amp;#039;#app&amp;amp;#039;).html(&amp;amp;#039;&amp;amp;lt;h1&amp;amp;gt;Hello&amp;amp;lt;/h1&amp;amp;gt;&amp;amp;#039;);
$(&amp;amp;#039;#app&amp;amp;#039;).css(&amp;amp;#039;color&amp;amp;#039;, &amp;amp;#039;red&amp;amp;#039;);

// 声明式 (React)
function App() {
  return &amp;amp;lt;h1 style=&amp;#123;&amp;#123; color: &amp;amp;#039;red&amp;amp;#039; &amp;#125;&amp;#125;&amp;amp;gt;Hello&amp;amp;lt;/h1&amp;amp;gt;;
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
  const increment = () =&amp;amp;gt; setCount(c =&amp;amp;gt; c + 1);
  
  return &amp;amp;lt;button onClick={increment}&amp;amp;gt;{count}&amp;amp;lt;/button&amp;amp;gt;;
}
```

#### useEffect
```jsx
function Component() {
  // 挂载和更新
  useEffect(() =&amp;amp;gt; {
    const timer = setInterval(() =&amp;amp;gt; {}, 1000);
    return () =&amp;amp;gt; clearInterval(timer); // 清理
  }, [dependency]);
  
  // 仅挂载
  useEffect(() =&amp;amp;gt; {
    fetch(&amp;amp;#039;/api/data&amp;amp;#039;);
  }, []);
}
```

#### useContext
```jsx
const ThemeContext = createContext(&amp;amp;#039;light&amp;amp;#039;);

function App() {
  return (
    &amp;amp;lt;ThemeContext.Provider value=&amp;amp;quot;dark&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;Toolbar /&amp;amp;gt;
    &amp;amp;lt;/ThemeContext.Provider&amp;amp;gt;
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return &amp;amp;lt;div className={theme}&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;;
}
```

### 2.2 性能 Hooks

#### useMemo
```jsx
function TodoList({ todos, filter }) {
  const filteredTodos = useMemo(() =&amp;amp;gt; 
    todos.filter(t =&amp;amp;gt; t.text.includes(filter)),
    [todos, filter]
  );
  
  return &amp;amp;lt;List items={filteredTodos} /&amp;amp;gt;;
}
```

#### useCallback
```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() =&amp;amp;gt; {
    console.log(&amp;amp;#039;clicked&amp;amp;#039;);
  }, []); // 依赖为空，函数不会重新创建
  
  return &amp;amp;lt;Child onClick={handleClick} /&amp;amp;gt;;
}
```

### 2.3 自定义 Hooks
```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() =&amp;amp;gt; {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() =&amp;amp;gt; {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}

// 使用
const [theme, setTheme] = useLocalStorage(&amp;amp;#039;theme&amp;amp;#039;, &amp;amp;#039;light&amp;amp;#039;);
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
  const [input, setInput] = useState(&amp;amp;#039;&amp;amp;#039;);
  const [search, setSearch] = useState(&amp;amp;#039;&amp;amp;#039;);
  
  const handleChange = (e) =&amp;amp;gt; {
    setInput(e.target.value);
    startTransition(() =&amp;amp;gt; {
      setSearch(e.target.value); // 低优先级更新
    });
  };
  
  return (
    &amp;amp;lt;&amp;amp;gt;
      &amp;amp;lt;input value={input} onChange={handleChange} /&amp;amp;gt;
      {isPending &amp;amp;amp;&amp;amp;amp; &amp;amp;lt;Spinner /&amp;amp;gt;}
      &amp;amp;lt;Results query={search} /&amp;amp;gt;
    &amp;amp;lt;/&amp;amp;gt;
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
      return &amp;amp;lt;Fallback /&amp;amp;gt;;
    }
    return this.props.children;
  }
}
```

### 4.2 Portals
```jsx
function Modal({ children }) {
  return createPortal(
    &amp;amp;lt;div className=&amp;amp;quot;modal&amp;amp;quot;&amp;amp;gt;{children}&amp;amp;lt;/div&amp;amp;gt;,
    document.getElementById(&amp;amp;#039;modal-root&amp;amp;#039;)
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
  
  useEffect(() =&amp;amp;gt; {
    ref.current.focus();
  }, []);
  
  return &amp;amp;lt;input ref={ref} /&amp;amp;gt;;
}
```

---

## 5. 相关概念

- [组件架构](component-architecture.md)
- [状态管理](state-management.md)
- [渲染策略](rendering-strategies.md)
- [React 生态](../tools/react-ecosystem.md)
