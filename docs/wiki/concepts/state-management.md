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
  type: &amp;amp;#039;ADD_TODO&amp;amp;#039;,
  payload: { id: 1, text: &amp;amp;#039;Learn Redux&amp;amp;#039; }
};

// Reducer (纯函数)
function todos(state = [], action) {
  switch (action.type) {
    case &amp;amp;#039;ADD_TODO&amp;amp;#039;:
      return [...state, action.payload];
    default:
      return state;
  }
}

// Store
const store = createStore(todos);
store.dispatch({ type: &amp;amp;#039;ADD_TODO&amp;amp;#039;, payload: { id: 1, text: &amp;amp;#039;Learn&amp;amp;#039; } });
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
    &amp;amp;lt;TodoContext.Provider value=&amp;#123;&amp;#123; todos, dispatch &amp;#125;&amp;#125;&amp;amp;gt;
      {children}
    &amp;amp;lt;/TodoContext.Provider&amp;amp;gt;
  );
}
```

#### Zustand
```javascript
import { create } from &amp;amp;#039;zustand&amp;amp;#039;;

const useStore = create((set) =&amp;amp;gt; ({
  todos: [],
  addTodo: (text) =&amp;amp;gt; set((state) =&amp;amp;gt; ({
    todos: [...state.todos, { id: Date.now(), text }]
  })),
  toggleTodo: (id) =&amp;amp;gt; set((state) =&amp;amp;gt; ({
    todos: state.todos.map(todo =&amp;amp;gt;
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  }))
}));
```

#### Redux Toolkit
```javascript
import { createSlice, configureStore } from &amp;amp;#039;@reduxjs/toolkit&amp;amp;#039;;

const todosSlice = createSlice({
  name: &amp;amp;#039;todos&amp;amp;#039;,
  initialState: [],
  reducers: {
    addTodo: (state, action) =&amp;amp;gt; {
      state.push({ id: Date.now(), text: action.payload });
    },
    toggleTodo: (state, action) =&amp;amp;gt; {
      const todo = state.find(t =&amp;amp;gt; t.id === action.payload);
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
import { defineStore } from &amp;amp;#039;pinia&amp;amp;#039;;

export const useTodoStore = defineStore(&amp;amp;#039;todos&amp;amp;#039;, {
  state: () =&amp;amp;gt; ({
    todos: [],
    filter: &amp;amp;#039;all&amp;amp;#039;
  }),
  getters: {
    filteredTodos: (state) =&amp;amp;gt; {
      if (state.filter === &amp;amp;#039;active&amp;amp;#039;) return state.todos.filter(t =&amp;amp;gt; !t.done);
      if (state.filter === &amp;amp;#039;done&amp;amp;#039;) return state.todos.filter(t =&amp;amp;gt; t.done);
      return state.todos;
    }
  },
  actions: {
    addTodo(text) {
      this.todos.push({ id: Date.now(), text, done: false });
    },
    async fetchTodos() {
      this.todos = await fetch(&amp;amp;#039;/api/todos&amp;amp;#039;).then(r =&amp;amp;gt; r.json());
    }
  }
});
```

### 3.3 Signals 模式

#### Solid.js Signals
```javascript
import { createSignal, createMemo } from &amp;amp;#039;solid-js&amp;amp;#039;;

function Counter() {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() =&amp;amp;gt; count() * 2);
  
  return (
    &amp;amp;lt;button onClick={() =&amp;amp;gt; setCount(c =&amp;amp;gt; c + 1)}&amp;amp;gt;
      {count()} - {doubled()}
    &amp;amp;lt;/button&amp;amp;gt;
  );
}
```

---

## 4. 服务器状态管理

### 4.1 React Query
```javascript
import { useQuery, useMutation, useQueryClient } from &amp;amp;#039;@tanstack/react-query&amp;amp;#039;;

function Todos() {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: [&amp;amp;#039;todos&amp;amp;#039;],
    queryFn: () =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;).then(r =&amp;amp;gt; r.json())
  });
  
  const mutation = useMutation({
    mutationFn: (newTodo) =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;, {
      method: &amp;amp;#039;POST&amp;amp;#039;,
      body: JSON.stringify(newTodo)
    }),
    onSuccess: () =&amp;amp;gt; {
      queryClient.invalidateQueries({ queryKey: [&amp;amp;#039;todos&amp;amp;#039;] });
    }
  });
  
  if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
  if (error) return &amp;amp;lt;Error /&amp;amp;gt;;
  
  return (
    &amp;amp;lt;ul&amp;amp;gt;
      {data.map(todo =&amp;amp;gt; &amp;amp;lt;li key={todo.id}&amp;amp;gt;{todo.text}&amp;amp;lt;/li&amp;amp;gt;)}
    &amp;amp;lt;/ul&amp;amp;gt;
  );
}
```

### 4.2 SWR
```javascript
import useSWR from &amp;amp;#039;swr&amp;amp;#039;;

const fetcher = url =&amp;amp;gt; fetch(url).then(r =&amp;amp;gt; r.json());

function Profile() {
  const { data, error, isLoading } = useSWR(&amp;amp;#039;/api/user&amp;amp;#039;, fetcher);
  
  if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
  if (error) return &amp;amp;lt;Error /&amp;amp;gt;;
  
  return &amp;amp;lt;div&amp;amp;gt;Hello, {data.name}!&amp;amp;lt;/div&amp;amp;gt;;
}
```

---

## 5. 状态设计原则

### 5.1 状态最小化
```jsx
// ❌ 冗余状态
function Component() {
  const [firstName, setFirstName] = useState(&amp;amp;#039;&amp;amp;#039;);
  const [lastName, setLastName] = useState(&amp;amp;#039;&amp;amp;#039;);
  const [fullName, setFullName] = useState(&amp;amp;#039;&amp;amp;#039;);
  
  useEffect(() =&amp;amp;gt; {
    setFullName(`${firstName} ${lastName}`);
  }, [firstName, lastName]);
}

// ✅ 派生状态
function Component() {
  const [firstName, setFirstName] = useState(&amp;amp;#039;&amp;amp;#039;);
  const [lastName, setLastName] = useState(&amp;amp;#039;&amp;amp;#039;);
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
    &amp;amp;lt;&amp;amp;gt;
      &amp;amp;lt;Header /&amp;amp;gt;
      &amp;amp;lt;Sidebar isMenuOpen={isMenuOpen} onToggle={setIsMenuOpen} /&amp;amp;gt;
    &amp;amp;lt;/&amp;amp;gt;
  );
}

// ✅ 状态在需要的地方
function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    &amp;amp;lt;nav&amp;amp;gt;
      &amp;amp;lt;button onClick={() =&amp;amp;gt; setIsMenuOpen(!isMenuOpen)}&amp;amp;gt;Menu&amp;amp;lt;/button&amp;amp;gt;
      {isMenuOpen &amp;amp;amp;&amp;amp;amp; &amp;amp;lt;Menu /&amp;amp;gt;}
    &amp;amp;lt;/nav&amp;amp;gt;
  );
}
```

### 5.3 不可变性
```javascript
// ❌ 直接修改
state.todos.push(newTodo);
state.user.name = &amp;amp;#039;New Name&amp;amp;#039;;

// ✅ 不可变更新
state = { ...state, todos: [...state.todos, newTodo] };
state = { ...state, user: { ...state.user, name: &amp;amp;#039;New Name&amp;amp;#039; } };

// ✅ Immer (Redux Toolkit)
state.todos.push(newTodo); // 安全，Immer 代理
state.user.name = &amp;amp;#039;New Name&amp;amp;#039;;
```

---

## 6. 状态机

### 6.1 XState
```javascript
import { createMachine, interpret } from &amp;amp;#039;xstate&amp;amp;#039;;

const toggleMachine = createMachine({
  id: &amp;amp;#039;toggle&amp;amp;#039;,
  initial: &amp;amp;#039;inactive&amp;amp;#039;,
  states: {
    inactive: {
      on: { TOGGLE: &amp;amp;#039;active&amp;amp;#039; }
    },
    active: {
      on: { TOGGLE: &amp;amp;#039;inactive&amp;amp;#039; }
    }
  }
});

const actor = interpret(toggleMachine).start();
actor.send({ type: &amp;amp;#039;TOGGLE&amp;amp;#039; });
```

---

## 7. 相关概念

- [组件架构](component-architecture.md)
- [数据获取模式](../patterns/data-fetching.md)
- [状态管理模式](../patterns/state-patterns.md)
- [React 核心](../techniques/react-core.md)
