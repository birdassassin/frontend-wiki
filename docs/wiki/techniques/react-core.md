# React 核心原理深度解析

> React 不是模板引擎，是声明式 UI 库。理解 Hooks、Fiber、并发渲染比记忆 API 重要。

---

## 1. 核心概念

### 1.1 声明式 UI

**命令式 vs 声明式：**

```javascript
// 命令式 (jQuery)
$('#app').html('<h1>Hello</h1>');
$('#app').css('color', 'red');
$('#app').addClass('container');

// 声明式 (React)
function App() {
  return (
    <h1 style={{ color: 'red' }} className="container">
      Hello
    </h1>
  );
}
```

**关键区别：**

| 对比维度 | 命令式 | 声明式 |
|---------|--------|--------|
| **关注点** | 怎么做（步骤） | 做什么（结果） |
| **状态管理** | 手动维护 DOM 状态 | React 自动同步 |
| **复杂度** | 随功能增加而增加 | 保持简洁 |
| **可维护性** | 较低 | 较高 |

### 1.2 虚拟 DOM

**工作原理：**

```
State Change → 新虚拟 DOM → Diff 算法 → 最小化 DOM 更新
```

**虚拟 DOM 结构：**

```javascript
// 真实 DOM
<div id="app" class="container">
  <h1>Hello</h1>
</div>

// 虚拟 DOM（简化版）
{
  type: 'div',
  props: {
    id: 'app',
    className: 'container'
  },
  children: [
    {
      type: 'h1',
      props: {},
      children: ['Hello']
    }
  ]
}
```

**Diff 算法核心策略：**

1. **分层比较**：只比较同一层级的节点
2. **类型判断**：类型不同则直接替换
3. **key 属性**：用于识别列表中元素的变化
4. **属性比较**：只更新变化的属性

### 1.3 组件化思想

**组件定义：**

```jsx
// 函数式组件（推荐）
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

// 类组件（传统方式）
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="btn">
        {this.props.children}
      </button>
    );
  }
}
```

**组件特征：**

- **可复用性**：组件可以在多个地方使用
- **独立性**：组件有自己的状态和逻辑
- **可组合性**：组件可以嵌套使用

---

## 2. Hooks 深度解析

### 2.1 useState

**基本用法：**

```jsx
function Counter() {
  // 声明状态变量，初始值为 0
  const [count, setCount] = useState(0);
  
  // 直接更新
  const increment = () => setCount(count + 1);
  
  // 函数式更新（当新状态依赖于旧状态时）
  const decrement = () => setCount(prev => prev - 1);
  
  // 批量更新
  const reset = () => {
    setCount(0);
    setCount(c => c + 1); // 这会覆盖上面的更新
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

**复杂状态：**

```jsx
function Form() {
  // 对象状态
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // 更新对象状态（不要直接修改原对象）
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 数组状态
  const [items, setItems] = useState([]);
  
  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };
  
  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
    </div>
  );
}
```

**惰性初始化：**

```jsx
function Component() {
  // 初始值是函数时，只在第一次渲染时执行
  const [data, setData] = useState(() => {
    // 复杂计算，只执行一次
    const stored = localStorage.getItem('data');
    return stored ? JSON.parse(stored) : [];
  });
  
  return <div>{data.length} items</div>;
}
```

### 2.2 useEffect

**基础用法：**

```jsx
function Component() {
  const [count, setCount] = useState(0);
  
  // 1. 每次渲染都执行
  useEffect(() => {
    console.log('Rendered');
  });
  
  // 2. 仅挂载时执行（依赖数组为空）
  useEffect(() => {
    console.log('Mounted');
    
    // 清理函数（卸载时执行）
    return () => {
      console.log('Unmounted');
    };
  }, []);
  
  // 3. 依赖变化时执行
  useEffect(() => {
    document.title = `Count: ${count}`;
    
    return () => {
      // 更新前执行清理
      console.log('Before update');
    };
  }, [count]);
  
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**常见场景：**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // 数据请求
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };
    
    fetchUser();
    
    // 清理函数：取消请求
    return () => {
      // 如果使用 axios，可以取消请求
      // cancelToken.cancel();
    };
  }, [userId]); // userId 变化时重新请求
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return <div>Name: {user.name}</div>;
}
```

**自定义 Hook：**

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
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
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
function App() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <UserList users={users} />;
}
```

### 2.3 useContext

**创建和使用 Context：**

```jsx
// 1. 创建 Context
const ThemeContext = createContext('light');
const UserContext = createContext(null);

// 2. Provider（提供值）
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'Alice' });
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={user}>
        <Navbar />
        <MainContent />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// 3. Consumer（消费值）
function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const user = useContext(UserContext);
  
  return (
    <nav className={`theme-${theme}`}>
      <span>Welcome, {user.name}</span>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </nav>
  );
}
```

**Context 性能优化：**

```jsx
// 使用 memo 防止不必要的重渲染
const Navbar = memo(function Navbar({ theme, setTheme, user }) {
  return (
    <nav className={`theme-${theme}`}>
      <span>Welcome, {user.name}</span>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </nav>
  );
});

// 拆分 Context 避免不必要的重渲染
const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={setTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
}
```

### 2.4 useReducer

**基本用法：**

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
    case 'SET':
      return { count: action.payload };
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
      <button onClick={() => dispatch({ type: 'SET', payload: 10 })}>Set to 10</button>
    </div>
  );
}
```

**复杂状态管理：**

```jsx
// 初始状态
const initialState = {
  users: [],
  loading: false,
  error: null,
  filter: ''
};

// Reducer
function usersReducer(state, action) {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, loading: false, users: action.payload };
    case 'FETCH_USERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter(u => u.id !== action.payload) };
    default:
      return state;
  }
}

// 使用
function UserList() {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_USERS_REQUEST' });
    
    fetch('/api/users')
      .then(res => res.json())
      .then(data => dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data }))
      .catch(err => dispatch({ type: 'FETCH_USERS_FAILURE', payload: err.message }));
  }, []);
  
  const filteredUsers = state.users.filter(user =>
    user.name.toLowerCase().includes(state.filter.toLowerCase())
  );
  
  return (
    <div>
      <input
        type="text"
        value={state.filter}
        onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
        placeholder="Filter users..."
      />
      
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}
      
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => dispatch({ type: 'DELETE_USER', payload: user.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 2.5 useMemo 和 useCallback

**useMemo - 缓存计算结果：**

```jsx
function ExpensiveComponent({ items, filter }) {
  // 缓存过滤结果，只有 items 或 filter 变化时才重新计算
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  // 缓存排序结果
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => a.id - b.id);
  }, [filteredItems]);
  
  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

**useCallback - 缓存函数引用：**

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');
  
  // 缓存函数引用，只有依赖变化时才重新创建
  const handleClick = useCallback(() => {
    console.log('Name:', name);
  }, [name]);
  
  // 如果没有 useCallback，每次 Parent 重渲染都会创建新的 handleClick
  // Child 组件即使使用了 memo，也会因为 props 变化而重渲染
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <Child onClick={handleClick} />
    </div>
  );
}

// 使用 memo 防止不必要的重渲染
const Child = memo(function Child({ onClick }) {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

### 2.6 useRef

**基本用法：**

```jsx
function Component() {
  // 1. DOM 引用
  const inputRef = useRef(null);
  
  useEffect(() => {
    // 访问 DOM 元素
    inputRef.current.focus();
  }, []);
  
  // 2. 存储可变值（不会触发重渲染）
  const timerRef = useRef(null);
  const countRef = useRef(0);
  
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      countRef.current++;
      console.log('Count:', countRef.current);
    }, 1000);
  };
  
  const stopTimer = () => {
    clearInterval(timerRef.current);
  };
  
  // 3. 存储前一个值
  const [value, setValue] = useState('');
  const prevValueRef = useRef('');
  
  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <p>Current: {value}, Previous: {prevValueRef.current}</p>
    </div>
  );
}
```

### 2.7 useImperativeHandle

**自定义暴露给父组件的方法：**

```jsx
// 子组件
const Child = forwardRef(function Child(props, ref) {
  const inputRef = useRef(null);
  
  // 自定义暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));
  
  return <input ref={inputRef} type="text" />;
});

// 父组件
function Parent() {
  const childRef = useRef(null);
  
  const handleFocus = () => {
    childRef.current.focus();
  };
  
  const handleClear = () => {
    childRef.current.clear();
  };
  
  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleFocus}>Focus</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
```

---

## 3. Fiber 架构深度解析

### 3.1 什么是 Fiber

**Fiber 是 React 16 引入的新协调引擎，主要目标是支持虚拟 DOM 的增量渲染。**

**核心目标：**

1. **可中断渲染**：将渲染任务分解为小单元，可以中断和恢复
2. **优先级调度**：根据任务优先级安排执行顺序
3. **复用已完成的工作**：避免重复计算
4. **丢弃不需要的工作**：及时取消过时任务

### 3.2 Fiber 工作原理

**双缓冲机制：**

```
当前 Fiber 树（Current）←→ 工作 Fiber 树（WorkInProgress）
```

**工作阶段：**

1. **Render 阶段（可中断）**
   - 构建 Fiber 树
   - 计算 Diff
   - 生成副作用列表

2. **Commit 阶段（不可中断）**
   - 执行 DOM 更新
   - 调用生命周期方法
   - 执行清理函数

**优先级调度：**

| 优先级 | 任务类型 | 过期时间 |
|--------|---------|---------|
| **Immediate** | 同步任务 | 立即过期 |
| **UserBlocking** | 用户交互（点击、输入） | 250ms |
| **Normal** | 普通更新 | 5s |
| **Low** | 数据获取 | 10s |
| **Idle** | 后台任务 | 无限期 |

### 3.3 并发渲染 API

**useTransition：**

```jsx
function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleChange = (e) => {
    // 高优先级：立即更新输入框
    setInput(e.target.value);
    
    // 低优先级：延迟更新搜索结果
    startTransition(() => {
      setSearchQuery(e.target.value);
    });
  };
  
  return (
    <div>
      <input value={input} onChange={handleChange} />
      
      {/* 加载状态 */}
      {isPending && <div>Loading results...</div>}
      
      {/* 搜索结果（低优先级更新） */}
      <Results query={searchQuery} />
    </div>
  );
}
```

**useDeferredValue：**

```jsx
function SearchResults({ query }) {
  // 将 query 标记为低优先级
  const deferredQuery = useDeferredValue(query);
  
  // 只有 deferredQuery 变化时才重新计算
  const results = useMemo(() => {
    return searchDatabase(deferredQuery);
  }, [deferredQuery]);
  
  return <ResultsList results={results} />;
}
```

**useTransitions + Suspense：**

```jsx
function App() {
  const [isPending, startTransition] = useTransition();
  const [resource, setResource] = useState(null);
  
  const handleSearch = (query) => {
    startTransition(() => {
      // 触发 Suspense
      setResource(fetchData(query));
    });
  };
  
  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      
      {isPending && <div>Loading...</div>}
      
      <Suspense fallback={<div>Loading results...</div>}>
        {resource && <Results resource={resource} />}
      </Suspense>
    </div>
  );
}
```

---

## 4. 高级模式

### 4.1 错误边界

**类组件错误边界：**

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, errorInfo: null };
  
  static getDerivedStateFromError(error) {
    // 更新状态以显示 fallback UI
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // 记录错误日志
    console.error('Error:', error);
    console.error('Info:', errorInfo);
    
    // 可以发送到错误监控服务
    // logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <p>Error: {this.state.error?.message}</p>
          <p>Component stack: {this.state.errorInfo?.componentStack}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// 使用
function App() {
  return (
    <ErrorBoundary>
      <MainContent />
    </ErrorBoundary>
  );
}
```

**组件级错误处理：**

```jsx
function ComponentWithErrorHandling() {
  const [error, setError] = useState(null);
  
  if (error) {
    return (
      <div>
        <h2>Error occurred!</h2>
        <p>{error.message}</p>
        <button onClick={() => setError(null)}>Retry</button>
      </div>
    );
  }
  
  return (
    <div>
      {/* 可能出错的组件 */}
      <PotentiallyBrokenComponent onError={setError} />
    </div>
  );
}
```

### 4.2 Portals

**创建 Portal：**

```jsx
// 在 index.html 中添加容器
<div id="modal-root"></div>
<div id="tooltip-root"></div>

// Modal 组件
function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

// 使用
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content</p>
      </Modal>
    </div>
  );
}
```

### 4.3 Refs 进阶

**回调 Refs：**

```jsx
function Component() {
  const [ref, setRef] = useState(null);
  
  // 回调 Ref 在组件挂载/卸载时被调用
  const handleRef = (node) => {
    setRef(node);
    if (node) {
      node.focus();
    }
  };
  
  return <input ref={handleRef} type="text" />;
}
```

**转发 Refs：**

```jsx
// 使用 forwardRef 转发 ref
const Input = forwardRef(function Input(props, ref) {
  return <input ref={ref} type="text" {...props} />;
});

// 使用
function Parent() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return <Input ref={inputRef} placeholder="Enter text" />;
}
```

### 4.4 高阶组件（HOC）

**创建 HOC：**

```jsx
// withLoading HOC
function withLoading(Component) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// withError HOC
function withError(Component) {
  return function WithError({ error, ...props }) {
    if (error) {
      return <div>Error: {error}</div>;
    }
    return <Component {...props} />;
  };
}

// 使用
const UserListWithLoading = withLoading(UserList);
const UserListWithError = withError(UserListWithLoading);

// 使用组合后的组件
<UserListWithError
  users={users}
  isLoading={loading}
  error={error}
/>
```

**HOC vs Hooks：**

```jsx
// HOC 方式
const ComponentWithAuth = withAuth(Component);

// Hooks 方式（推荐）
function Component() {
  const { user, isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  
  return <div>Welcome, {user.name}</div>;
}
```

---

## 5. 性能优化

### 5.1 渲染优化

**React.memo：**

```jsx
// 基本用法
const MemoizedComponent = memo(function Component({ data }) {
  return <div>{data}</div>;
});

// 自定义比较函数
const MemoizedComponent = memo(function Component({ data }, areEqual) {
  // 自定义比较逻辑
  return prevProps.data.id === nextProps.data.id;
});
```

**useMemo + useCallback：**

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  
  // 缓存计算结果
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);
  
  // 缓存函数引用
  const handleAddItem = useCallback((item) => {
    setItems(prev => [...prev, item]);
  }, []);
  
  return (
    <div>
      <Child total={total} onAddItem={handleAddItem} />
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
    </div>
  );
}

// Child 不会因为 count 变化而重渲染
const Child = memo(function Child({ total, onAddItem }) {
  console.log('Child rendered');
  return (
    <div>
      <p>Total: {total}</p>
      <button onClick={() => onAddItem({ price: 10 })}>Add Item</button>
    </div>
  );
});
```

### 5.2 列表渲染优化

```jsx
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        // 使用稳定的 key
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

// 避免使用 index 作为 key
// ❌ 错误：列表顺序变化时会导致性能问题
{items.map((item, index) => (
  <ListItem key={index} item={item} />
))}

// ✅ 正确：使用唯一 ID
{items.map(item => (
  <ListItem key={item.id} item={item} />
))}
```

### 5.3 虚拟滚动

```bash
npm install react-window
```

```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 5.4 代码分割

**路由级别代码分割：**

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 懒加载组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

**组件级别代码分割：**

```jsx
function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  
  // 动态导入图表组件
  const Chart = lazy(() => import('./Chart'));
  
  return (
    <div>
      <button onClick={() => setShowChart(!showChart)}>
        Toggle Chart
      </button>
      
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <Chart />
        </Suspense>
      )}
    </div>
  );
}
```

---

## 6. 测试

### 6.1 组件测试

```jsx
// App.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('increments count when button is clicked', () => {
  render(<App />);
  
  // 获取按钮和计数元素
  const incrementButton = screen.getByRole('button', { name: /\+/ });
  const countElement = screen.getByText(/count:/i);
  
  // 初始状态
  expect(countElement).toHaveTextContent('Count: 0');
  
  // 点击按钮
  fireEvent.click(incrementButton);
  
  // 验证状态变化
  expect(countElement).toHaveTextContent('Count: 1');
});

test('fetches data on mount', async () => {
  // Mock fetch
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve([{ id: 1, name: 'Alice' }])
  });
  
  render(<UserList />);
  
  // 等待数据加载
  const userElement = await screen.findByText('Alice');
  
  expect(userElement).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith('/api/users');
  
  // 清理 mock
  global.fetch.mockRestore();
});
```

### 6.2 Hooks 测试

```jsx
// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

test('useCounter initializes with 0', () => {
  const { result } = renderHook(() => useCounter());
  
  expect(result.current.count).toBe(0);
});

test('useCounter increments count', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

test('useCounter decrements count', () => {
  const { result } = renderHook(() => useCounter(5));
  
  act(() => {
    result.current.decrement();
  });
  
  expect(result.current.count).toBe(4);
});

test('useCounter resets to initial value', () => {
  const { result } = renderHook(() => useCounter(10));
  
  act(() => {
    result.current.increment();
    result.current.reset();
  });
  
  expect(result.current.count).toBe(10);
});
```

---

## 7. 最佳实践

### 7.1 组件设计原则

1. **单一职责**：一个组件只做一件事
2. **可复用性**：组件应该可以在多个地方使用
3. **可测试性**：组件应该易于测试
4. **Props 向下传递**：数据通过 props 从父组件传递到子组件
5. **状态提升**：共享状态提升到最近的共同祖先

### 7.2 Hooks 使用规则

1. **只在函数顶层调用 Hooks**：不要在循环、条件或嵌套函数中调用
2. **只在 React 函数组件中调用 Hooks**：不要在普通 JavaScript 函数中调用
3. **使用 ESLint 规则**：安装 `eslint-plugin-react-hooks` 来检查规则

### 7.3 状态管理策略

1. **本地状态**：使用 `useState` 管理组件内部状态
2. **共享状态**：使用 Context 或状态管理库（如 Redux、Zustand）
3. **服务端状态**：使用专门的库（如 React Query、SWR）

### 7.4 性能优化清单

- [ ] 使用 `React.memo` 防止不必要的重渲染
- [ ] 使用 `useMemo` 缓存昂贵的计算
- [ ] 使用 `useCallback` 缓存函数引用
- [ ] 使用稳定的 key 进行列表渲染
- [ ] 实现虚拟滚动处理大数据列表
- [ ] 代码分割减少初始加载体积
- [ ] 延迟加载非关键资源

---

## 8. 总结

React 的核心在于理解其设计理念和工作原理：

1. **声明式 UI**：描述目标状态，React 负责同步 DOM
2. **组件化**：将 UI 分解为独立、可复用的组件
3. **Hooks**：管理状态和副作用的现代方式
4. **Fiber 架构**：支持并发渲染和优先级调度
5. **性能优化**：通过 memo、useMemo、代码分割等手段提升性能

掌握这些核心概念后，你就能写出高效、可维护的 React 代码。
