# 状态管理

> 状态管理不是选择 Redux 还是 Zustand，而是设计数据如何流动。好的状态管理让数据流可预测、可调试、可测试。

---

## 1. 状态本质

### 1.1 什么是状态
状态 = 随时间变化的数据

```
UI = f(state)
```

### 1.2 状态类型

| 类型 | 描述 | 示例 | 生命周期 |
|---|---|---|---|
| UI 状态 | 界面交互状态 | 展开/折叠、加载状态 | 组件级别 |
| 会话状态 | 用户会话数据 | 购物车、筛选条件 | 页面/应用级别 |
| 服务器状态 | 远程数据缓存 | 用户列表、文章详情 | 缓存策略决定 |
| URL 状态 | 路由参数 | 分页、搜索词 | 导航级别 |

---

## 2. 数据流模式

### 2.1 单向数据流
```
Action → Dispatcher → Store → View
  ↑                              │
  └──────────────────────────────┘
```

**核心原则：**
- 状态是唯一的真相源
- 状态只能通过 Action 修改
- View 是状态的纯函数
- 数据流是单向的、可追踪的

### 2.2 Flux 架构
```javascript
// Action
const action = {
  type: 'ADD_TODO',
  payload: { id: 1, text: 'Learn Redux' }
};

// Reducer (纯函数)
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    default:
      return state;
  }
}

// Store
const store = createStore(todos);
store.dispatch({ type: 'ADD_TODO', payload: { id: 1, text: 'Learn' } });
```

---

## 3. 现代状态管理方案

### 3.1 React 生态

#### Context + useReducer
```jsx
const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  return (
    <TodoContext.Provider value=&amp;#123;&amp;#123; todos, dispatch &amp;#125;&amp;#125;>
      {children}
    </TodoContext.Provider>
  );
}
```

#### Zustand
```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text }]
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  }))
}));
```

#### Redux Toolkit
```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    }
  }
});

const store = configureStore({
  reducer: { todos: todosSlice.reducer }
});
```

### 3.2 Vue 生态

#### Pinia
```javascript
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [],
    filter: 'all'
  }),
  getters: {
    filteredTodos: (state) => {
      if (state.filter === 'active') return state.todos.filter(t => !t.done);
      if (state.filter === 'done') return state.todos.filter(t => t.done);
      return state.todos;
    }
  },
  actions: {
    addTodo(text) {
      this.todos.push({ id: Date.now(), text, done: false });
    },
    async fetchTodos() {
      this.todos = await fetch('/api/todos').then(r => r.json());
    }
  }
});
```

### 3.3 Signals 模式

#### Solid.js Signals
```javascript
import { createSignal, createMemo } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count()} - {doubled()}
    </button>
  );
}
```

---

## 4. 服务器状态管理

### 4.1 React Query
```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Todos() {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(r => r.json())
  });
  
  const mutation = useMutation({
    mutationFn: (newTodo) => fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return (
    <ul>
      {data.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>
  );
}
```

### 4.2 SWR
```javascript
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher);
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return <div>Hello, {data.name}!</div>;
}
```

---

## 5. 状态设计原则

### 5.1 状态最小化
```jsx
// ❌ 冗余状态
function Component() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  
  useEffect(() => {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);
}

// ✅ 派生状态
function Component() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const fullName = `${firstName} ${lastName}`;
}
```

### 5.2 状态就近原则
```jsx
// 状态应该尽可能靠近使用它的组件
function App() {
  // ❌ 不必要的提升
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <Header />
      <Sidebar isMenuOpen={isMenuOpen} onToggle={setIsMenuOpen} />
    </>
  );
}

// ✅ 状态在需要的地方
function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>Menu</button>
      {isMenuOpen && <Menu />}
    </nav>
  );
}
```

### 5.3 不可变性
```javascript
// ❌ 直接修改
state.todos.push(newTodo);
state.user.name = 'New Name';

// ✅ 不可变更新
state = { ...state, todos: [...state.todos, newTodo] };
state = { ...state, user: { ...state.user, name: 'New Name' } };

// ✅ Immer (Redux Toolkit)
state.todos.push(newTodo); // 安全，Immer 代理
state.user.name = 'New Name';
```

---

## 6. 状态机

### 6.1 XState
```javascript
import { createMachine, interpret } from 'xstate';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' }
    },
    active: {
      on: { TOGGLE: 'inactive' }
    }
  }
});

const actor = interpret(toggleMachine).start();
actor.send({ type: 'TOGGLE' });
```

---

## 7. 相关概念

- [组件架构](component-architecture.md)
- [数据获取模式](../patterns/data-fetching.md)
- [状态管理模式](../patterns/state-patterns.md)
- [React 核心](../techniques/react-core.md)
