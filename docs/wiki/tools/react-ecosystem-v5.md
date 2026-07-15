> **版本**: 5.0.14 | 创建时间: 2026-05-31 | 从 v2.1 升级

---

# React 生态

> React 不是孤立的库，是庞大的生态系统。理解生态比记忆 API 更重要。

---

## 1. 路由

### 1.1 React Router v6+

```tsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/users">用户列表</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// 编程式导航
function UserList() {
  const navigate = useNavigate();
  
  const handleView = (id: string) => {
    navigate(`/users/${id}`);
  };
  
  return <button onClick={() => handleView('1')}>查看</button>;
}

// 路由参数
function UserDetail() {
  const { id } = useParams();
  return <div>用户 ID: {id}</div>;
}
```

### 1.2 嵌套路由

```tsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Overview />} />
  <Route path="analytics" element={<Analytics />} />
  <Route path="settings" element={<Settings />} />
</Route>

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet /> {/* 子路由渲染位置 */}
      </main>
    </div>
  );
}
```

### 1.3 路由守卫

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state=&amp;#123;&amp;#123; from: location &amp;#125;&amp;#125; replace />;
  }
  
  return <>{children}</>;
}

// 使用
<Route path="/admin" element={
  <ProtectedRoute>
    <AdminPanel />
  </ProtectedRoute>
} />
```

### 1.4 其他路由方案

| 库 | 特点 | 适用场景 |
|---|---|---|
| React Router | 标准方案，功能完整 | SPA 应用 |
| Wouter | 轻量级 (1KB) | 简单项目 |
| TanStack Router | 类型安全，无渲染 | TypeScript 项目 |
| Next.js App Router | 文件路由，SSR | 全栈应用 |

---

## 2. 状态管理生态

### 2.1 全局状态

| 库 | 大小 | 特点 | 适用场景 |
|---|---|---|---|
| **Zustand** | 1KB | 简单，Hooks API | 中小型项目 |
| **Redux Toolkit** | 11KB | 官方推荐，DevTools | 大型项目 |
| **Jotai** | 3KB | 原子化，原子依赖 | 细粒度更新 |
| **Recoil** | 15KB | Facebook 出品，原子化 | 复杂状态图 |
| **Valtio** | 2KB | 代理，可变语法 | 喜欢可变风格 |
| **MobX** | 16KB | 响应式，OOP 风格 | 传统项目 |

### 2.2 Zustand 完整示例

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'done';
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'done') => void;
  filteredTodos: Todo[];
}

const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        todos: [],
        filter: 'all',
        
        addTodo: (text) => set((state) => {
          state.todos.push({
            id: crypto.randomUUID(),
            text,
            done: false
          });
        }),
        
        toggleTodo: (id) => set((state) => {
          const todo = state.todos.find(t => t.id === id);
          if (todo) todo.done = !todo.done;
        }),
        
        deleteTodo: (id) => set((state) => {
          state.todos = state.todos.filter(t => t.id !== id);
        }),
        
        setFilter: (filter) => set({ filter }),
        
        get filteredTodos() {
          const { todos, filter } = get();
          switch (filter) {
            case 'active': return todos.filter(t => !t.done);
            case 'done': return todos.filter(t => t.done);
            default: return todos;
          }
        }
      })),
      { name: 'todo-storage' }
    )
  )
);
```

### 2.3 Redux Toolkit 完整示例

```typescript
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';

// 异步 Thunk
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (id: string) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});
```

---

## 3. 服务器状态管理

### 3.1 TanStack Query (React Query)

```typescript
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 分钟
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}

function TodoApp() {
  const queryClient = useQueryClient();
  
  // 查询
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json())
  });
  
  // 分页
  const [page, setPage] = useState(1);
  const { data: paginatedData } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetch(`/api/todos?page=${page}`).then(res => res.json())
  });
  
  // 无限滚动
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: ({ pageParam }) => fetch(`/api/todos?cursor=${pageParam}`).then(res => res.json()),
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });
  
  //  mutation
  const mutation = useMutation({
    mutationFn: (newTodo) => fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
  
  // 乐观更新
  const optimisticMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previous = queryClient.getQueryData(['todos']);
      queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
      return { previous };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context.previous);
    }
  });
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return <List items={data} />;
}
```

### 3.2 SWR

```typescript
import useSWR, { useSWRConfig } from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

function Profile() {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher);
  
  // 手动重新验证
  const refresh = () => mutate();
  
  // 乐观更新
  const updateName = (name: string) => {
    mutate({ ...data, name }, false);
    fetch('/api/user', { method: 'PUT', body: JSON.stringify({ name) });
  };
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  
  return <div>{data.name}</div>;
}

// 全局配置
function App() {
  return (
    <SWRConfig value=&amp;#123;&amp;#123;
      fetcher,
      revalidateOnFocus: false,
      dedupingInterval: 5000
    &amp;#125;&amp;#125;>
      <Profile />
    </SWRConfig>
  );
}
```

### 3.3 服务器状态 vs 客户端状态

| 维度 | 服务器状态 | 客户端状态 |
|---|---|---|
| 来源 | 远程 API | 用户交互 |
| 缓存 | 需要 | 不需要 |
| 同步 | 自动重新验证 | 手动更新 |
| 共享 | 全局共享 | 组件局部 |
| 推荐方案 | React Query / SWR | Zustand / Context |

---

## 4. UI 组件库

### 4.1 无头组件库 (Headless UI)

| 库 | 特点 | 大小 |
|---|---|---|
| **Radix UI** | 无障碍，完全可控 | 按需引入 |
| **Headless UI** | Tailwind 官方，简单 | 轻量 |
| **React Aria** | Adobe 出品，最完整 | 较重 |
| **Downshift** | 下拉/选择专用 | 轻量 |

### 4.2 完整组件库

| 库 | 风格 | 定制性 | 适用场景 |
|---|---|---|---|
| **shadcn/ui** | 现代，可复制代码 | 完全可定制 | 新项目首选 |
| **Ant Design** | 企业级，中文友好 | 主题定制 | 后台管理系统 |
| **MUI** | Material Design | 主题定制 | 企业应用 |
| **Chakra UI** | 现代，易定制 | 高 | 快速开发 |
| **Mantine** | 功能丰富，Hooks | 高 | 全功能应用 |
| **Tailwind UI** | 原子化，付费 | 完全可定制 | 设计驱动 |

### 4.3 shadcn/ui 示例

```bash
# 安装
npx shadcn@latest init
npx shadcn@latest add button dialog form
```

```tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function UserDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <h2>添加用户</h2>
        </DialogHeader>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">姓名</Label>
              <Input id="name" placeholder="输入姓名" />
            </div>
            <Button type="submit">保存</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 5. 表单处理

### 5.1 React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(8, '密码至少 8 位'),
  age: z.number().min(18).max(100)
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onSubmit = async (data: FormData) => {
    try {
      await login(data);
    } catch (error) {
      setError('root', { message: '登录失败' });
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="邮箱" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" placeholder="密码" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '登录中...' : '登录'}
      </button>
    </form>
  );
}
```

### 5.2 Formik

```tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required')
});

function LoginForm() {
  return (
    <Formik
      initialValues=&amp;#123;&amp;#123; email: '', password: '' &amp;#125;&amp;#125;
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await login(values);
      &amp;#125;&amp;#125;
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          
          <button type="submit" disabled={isSubmitting}>登录</button>
        </Form>
      )}
    </Formik>
  );
}
```

---

## 6. 数据获取

### 6.1 Axios

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// 请求拦截器
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 使用
const users = await api.get('/users');
const user = await api.post('/users', { name: 'Alice' });
```

### 6.2 Fetch API 封装

```typescript
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  return response.json();
}

// 使用
const users = await request<User[]>('/users');
```

---

## 7. 工具库

### 7.1 日期处理

| 库 | 大小 | 特点 |
|---|---|---|
| **date-fns** | 按需引入 | 函数式，Tree-shaking |
| **dayjs** | 2KB | 轻量，Moment API 兼容 |
| **Luxon** | 中等 | Moment 团队新作 |

```typescript
import { format, parseISO, differenceInDays } from 'date-fns';
import { zhCN } from 'date-fns/locale';

format(new Date(), 'yyyy-MM-dd', { locale: zhCN });
differenceInDays(new Date(), parseISO('2024-01-01'));
```

### 7.2 工具函数

| 库 | 用途 |
|---|---|
| **lodash-es** | 通用工具函数 |
| **ramda** | 函数式编程 |
| **remeda** | 类型安全，轻量 |

### 7.3 动画

| 库 | 特点 | 适用场景 |
|---|---|---|
| **Framer Motion** | React 专用，声明式 | 复杂动画 |
| **React Spring** | 物理动画 | 自然交互 |
| **GSAP** | 强大，专业 | 营销页面 |
| **AutoAnimate** | 零配置 | 列表动画 |

```tsx
import { motion, AnimatePresence } from 'framer-motion';

function TodoItem({ todo }) {
  return (
    <motion.li
      layout
      initial=&amp;#123;&amp;#123; opacity: 0, y: 20 &amp;#125;&amp;#125;
      animate=&amp;#123;&amp;#123; opacity: 1, y: 0 &amp;#125;&amp;#125;
      exit=&amp;#123;&amp;#123; opacity: 0, x: -100 &amp;#125;&amp;#125;
      whileHover=&amp;#123;&amp;#123; scale: 1.02 &amp;#125;&amp;#125;
      whileTap=&amp;#123;&amp;#123; scale: 0.98 &amp;#125;&amp;#125;
    >
      {todo.text}
    </motion.li>
  );
}

function TodoList({ todos }) {
  return (
    <AnimatePresence>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </AnimatePresence>
  );
}
```

---

## 8. 开发工具

### 8.1 React DevTools

- **Components 面板**：查看组件树、Props、State
- **Profiler 面板**：性能分析、重渲染原因
- **安装**：Chrome/Firefox 扩展

### 8.2 ESLint 插件

```bash
npm install -D eslint-plugin-react eslint-plugin-react-hooks
```

```javascript
// eslint.config.js
export default [
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
```

### 8.3 TypeScript 配置

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "types": ["react", "react-dom"]
  }
}
```

---

## 9. 测试

### 9.1 React Testing Library

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('表单提交', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  
  render(<LoginForm onSubmit={handleSubmit} />);
  
  await user.type(screen.getByLabelText('邮箱'), 'test@example.com');
  await user.type(screen.getByLabelText('密码'), 'password123');
  await user.click(screen.getByText('登录'));
  
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
```

### 9.2 MSW (Mock Service Worker)

```typescript
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## 10. 相关概念

- [React 核心](../techniques/react-core.md)
- [组件架构](../concepts/component-architecture.md)
- [状态管理](../concepts/state-management.md)
- [全栈框架](../tools/fullstack-frameworks.md)
- [测试策略](../concepts/testing-strategies.md)
