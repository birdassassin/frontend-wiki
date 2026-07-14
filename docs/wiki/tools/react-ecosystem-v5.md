> **版本**: 5.0.14 | 创建时间: 2026-05-31 | 从 v2.1 升级

---

# React 生态

> React 不是孤立的库，是庞大的生态系统。理解生态比记忆 API 更重要。

---

## 1. 路由

### 1.1 React Router v6+

```tsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from &amp;amp;#039;react-router-dom&amp;amp;#039;;

function App() {
  return (
    &amp;amp;lt;BrowserRouter&amp;amp;gt;
      &amp;amp;lt;nav&amp;amp;gt;
        &amp;amp;lt;Link to=&amp;amp;quot;/&amp;amp;quot;&amp;amp;gt;首页&amp;amp;lt;/Link&amp;amp;gt;
        &amp;amp;lt;Link to=&amp;amp;quot;/users&amp;amp;quot;&amp;amp;gt;用户列表&amp;amp;lt;/Link&amp;amp;gt;
      &amp;amp;lt;/nav&amp;amp;gt;
      
      &amp;amp;lt;Routes&amp;amp;gt;
        &amp;amp;lt;Route path=&amp;amp;quot;/&amp;amp;quot; element={&amp;amp;lt;Home /&amp;amp;gt;} /&amp;amp;gt;
        &amp;amp;lt;Route path=&amp;amp;quot;/users&amp;amp;quot; element={&amp;amp;lt;UserList /&amp;amp;gt;} /&amp;amp;gt;
        &amp;amp;lt;Route path=&amp;amp;quot;/users/:id&amp;amp;quot; element={&amp;amp;lt;UserDetail /&amp;amp;gt;} /&amp;amp;gt;
        &amp;amp;lt;Route path=&amp;amp;quot;*&amp;amp;quot; element={&amp;amp;lt;NotFound /&amp;amp;gt;} /&amp;amp;gt;
      &amp;amp;lt;/Routes&amp;amp;gt;
    &amp;amp;lt;/BrowserRouter&amp;amp;gt;
  );
}

// 编程式导航
function UserList() {
  const navigate = useNavigate();
  
  const handleView = (id: string) =&amp;amp;gt; {
    navigate(`/users/${id}`);
  };
  
  return &amp;amp;lt;button onClick={() =&amp;amp;gt; handleView(&amp;amp;#039;1&amp;amp;#039;)}&amp;amp;gt;查看&amp;amp;lt;/button&amp;amp;gt;;
}

// 路由参数
function UserDetail() {
  const { id } = useParams();
  return &amp;amp;lt;div&amp;amp;gt;用户 ID: {id}&amp;amp;lt;/div&amp;amp;gt;;
}
```

### 1.2 嵌套路由

```tsx
&amp;amp;lt;Route path=&amp;amp;quot;/dashboard&amp;amp;quot; element={&amp;amp;lt;Dashboard /&amp;amp;gt;}&amp;amp;gt;
  &amp;amp;lt;Route index element={&amp;amp;lt;Overview /&amp;amp;gt;} /&amp;amp;gt;
  &amp;amp;lt;Route path=&amp;amp;quot;analytics&amp;amp;quot; element={&amp;amp;lt;Analytics /&amp;amp;gt;} /&amp;amp;gt;
  &amp;amp;lt;Route path=&amp;amp;quot;settings&amp;amp;quot; element={&amp;amp;lt;Settings /&amp;amp;gt;} /&amp;amp;gt;
&amp;amp;lt;/Route&amp;amp;gt;

function Dashboard() {
  return (
    &amp;amp;lt;div&amp;amp;gt;
      &amp;amp;lt;Sidebar /&amp;amp;gt;
      &amp;amp;lt;main&amp;amp;gt;
        &amp;amp;lt;Outlet /&amp;amp;gt; {/* 子路由渲染位置 */}
      &amp;amp;lt;/main&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
  );
}
```

### 1.3 路由守卫

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return &amp;amp;lt;Navigate to=&amp;amp;quot;/login&amp;amp;quot; state=&amp;#123;&amp;#123; from: location &amp;#125;&amp;#125; replace /&amp;amp;gt;;
  }
  
  return &amp;amp;lt;&amp;amp;gt;{children}&amp;amp;lt;/&amp;amp;gt;;
}

// 使用
&amp;amp;lt;Route path=&amp;amp;quot;/admin&amp;amp;quot; element={
  &amp;amp;lt;ProtectedRoute&amp;amp;gt;
    &amp;amp;lt;AdminPanel /&amp;amp;gt;
  &amp;amp;lt;/ProtectedRoute&amp;amp;gt;
} /&amp;amp;gt;
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
import { create } from &amp;amp;#039;zustand&amp;amp;#039;;
import { devtools, persist } from &amp;amp;#039;zustand/middleware&amp;amp;#039;;
import { immer } from &amp;amp;#039;zustand/middleware/immer&amp;amp;#039;;

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

interface TodoStore {
  todos: Todo[];
  filter: &amp;amp;#039;all&amp;amp;#039; | &amp;amp;#039;active&amp;amp;#039; | &amp;amp;#039;done&amp;amp;#039;;
  addTodo: (text: string) =&amp;amp;gt; void;
  toggleTodo: (id: string) =&amp;amp;gt; void;
  deleteTodo: (id: string) =&amp;amp;gt; void;
  setFilter: (filter: &amp;amp;#039;all&amp;amp;#039; | &amp;amp;#039;active&amp;amp;#039; | &amp;amp;#039;done&amp;amp;#039;) =&amp;amp;gt; void;
  filteredTodos: Todo[];
}

const useTodoStore = create&amp;amp;lt;TodoStore&amp;amp;gt;()(
  devtools(
    persist(
      immer((set, get) =&amp;amp;gt; ({
        todos: [],
        filter: &amp;amp;#039;all&amp;amp;#039;,
        
        addTodo: (text) =&amp;amp;gt; set((state) =&amp;amp;gt; {
          state.todos.push({
            id: crypto.randomUUID(),
            text,
            done: false
          });
        }),
        
        toggleTodo: (id) =&amp;amp;gt; set((state) =&amp;amp;gt; {
          const todo = state.todos.find(t =&amp;amp;gt; t.id === id);
          if (todo) todo.done = !todo.done;
        }),
        
        deleteTodo: (id) =&amp;amp;gt; set((state) =&amp;amp;gt; {
          state.todos = state.todos.filter(t =&amp;amp;gt; t.id !== id);
        }),
        
        setFilter: (filter) =&amp;amp;gt; set({ filter }),
        
        get filteredTodos() {
          const { todos, filter } = get();
          switch (filter) {
            case &amp;amp;#039;active&amp;amp;#039;: return todos.filter(t =&amp;amp;gt; !t.done);
            case &amp;amp;#039;done&amp;amp;#039;: return todos.filter(t =&amp;amp;gt; t.done);
            default: return todos;
          }
        }
      })),
      { name: &amp;amp;#039;todo-storage&amp;amp;#039; }
    )
  )
);
```

### 2.3 Redux Toolkit 完整示例

```typescript
import { createSlice, configureStore, createAsyncThunk } from &amp;amp;#039;@reduxjs/toolkit&amp;amp;#039;;

// 异步 Thunk
export const fetchUser = createAsyncThunk(
  &amp;amp;#039;user/fetch&amp;amp;#039;,
  async (id: string) =&amp;amp;gt; {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: &amp;amp;#039;user&amp;amp;#039;,
  initialState: { data: null, loading: false, error: null },
  reducers: {
    logout: (state) =&amp;amp;gt; {
      state.data = null;
    }
  },
  extraReducers: (builder) =&amp;amp;gt; {
    builder
      .addCase(fetchUser.pending, (state) =&amp;amp;gt; {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) =&amp;amp;gt; {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) =&amp;amp;gt; {
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
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from &amp;amp;#039;@tanstack/react-query&amp;amp;#039;;

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
    &amp;amp;lt;QueryClientProvider client={queryClient}&amp;amp;gt;
      &amp;amp;lt;TodoApp /&amp;amp;gt;
    &amp;amp;lt;/QueryClientProvider&amp;amp;gt;
  );
}

function TodoApp() {
  const queryClient = useQueryClient();
  
  // 查询
  const { data, isLoading, error } = useQuery({
    queryKey: [&amp;amp;#039;todos&amp;amp;#039;],
    queryFn: () =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;).then(res =&amp;amp;gt; res.json())
  });
  
  // 分页
  const [page, setPage] = useState(1);
  const { data: paginatedData } = useQuery({
    queryKey: [&amp;amp;#039;todos&amp;amp;#039;, page],
    queryFn: () =&amp;amp;gt; fetch(`/api/todos?page=${page}`).then(res =&amp;amp;gt; res.json())
  });
  
  // 无限滚动
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [&amp;amp;#039;todos&amp;amp;#039;],
    queryFn: ({ pageParam }) =&amp;amp;gt; fetch(`/api/todos?cursor=${pageParam}`).then(res =&amp;amp;gt; res.json()),
    getNextPageParam: (lastPage) =&amp;amp;gt; lastPage.nextCursor
  });
  
  //  mutation
  const mutation = useMutation({
    mutationFn: (newTodo) =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;, {
      method: &amp;amp;#039;POST&amp;amp;#039;,
      body: JSON.stringify(newTodo)
    }),
    onSuccess: () =&amp;amp;gt; {
      queryClient.invalidateQueries({ queryKey: [&amp;amp;#039;todos&amp;amp;#039;] });
    },
    onSettled: () =&amp;amp;gt; {
      queryClient.invalidateQueries({ queryKey: [&amp;amp;#039;todos&amp;amp;#039;] });
    }
  });
  
  // 乐观更新
  const optimisticMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: async (newTodo) =&amp;amp;gt; {
      await queryClient.cancelQueries({ queryKey: [&amp;amp;#039;todos&amp;amp;#039;] });
      const previous = queryClient.getQueryData([&amp;amp;#039;todos&amp;amp;#039;]);
      queryClient.setQueryData([&amp;amp;#039;todos&amp;amp;#039;], (old) =&amp;amp;gt; [...old, newTodo]);
      return { previous };
    },
    onError: (err, newTodo, context) =&amp;amp;gt; {
      queryClient.setQueryData([&amp;amp;#039;todos&amp;amp;#039;], context.previous);
    }
  });
  
  if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
  if (error) return &amp;amp;lt;Error /&amp;amp;gt;;
  
  return &amp;amp;lt;List items={data} /&amp;amp;gt;;
}
```

### 3.2 SWR

```typescript
import useSWR, { useSWRConfig } from &amp;amp;#039;swr&amp;amp;#039;;

const fetcher = (url: string) =&amp;amp;gt; fetch(url).then(res =&amp;amp;gt; res.json());

function Profile() {
  const { data, error, isLoading, mutate } = useSWR(&amp;amp;#039;/api/user&amp;amp;#039;, fetcher);
  
  // 手动重新验证
  const refresh = () =&amp;amp;gt; mutate();
  
  // 乐观更新
  const updateName = (name: string) =&amp;amp;gt; {
    mutate({ ...data, name }, false);
    fetch(&amp;amp;#039;/api/user&amp;amp;#039;, { method: &amp;amp;#039;PUT&amp;amp;#039;, body: JSON.stringify({ name) });
  };
  
  if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
  if (error) return &amp;amp;lt;Error /&amp;amp;gt;;
  
  return &amp;amp;lt;div&amp;amp;gt;{data.name}&amp;amp;lt;/div&amp;amp;gt;;
}

// 全局配置
function App() {
  return (
    &amp;amp;lt;SWRConfig value=&amp;#123;&amp;#123;
      fetcher,
      revalidateOnFocus: false,
      dedupingInterval: 5000
    &amp;#125;&amp;#125;&amp;amp;gt;
      &amp;amp;lt;Profile /&amp;amp;gt;
    &amp;amp;lt;/SWRConfig&amp;amp;gt;
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
import { Button } from &amp;amp;quot;@/components/ui/button&amp;amp;quot;;
import { Dialog, DialogContent, DialogHeader } from &amp;amp;quot;@/components/ui/dialog&amp;amp;quot;;
import { Input } from &amp;amp;quot;@/components/ui/input&amp;amp;quot;;
import { Label } from &amp;amp;quot;@/components/ui/label&amp;amp;quot;;

function UserDialog() {
  return (
    &amp;amp;lt;Dialog&amp;amp;gt;
      &amp;amp;lt;DialogContent&amp;amp;gt;
        &amp;amp;lt;DialogHeader&amp;amp;gt;
          &amp;amp;lt;h2&amp;amp;gt;添加用户&amp;amp;lt;/h2&amp;amp;gt;
        &amp;amp;lt;/DialogHeader&amp;amp;gt;
        &amp;amp;lt;form&amp;amp;gt;
          &amp;amp;lt;div className=&amp;amp;quot;grid gap-4&amp;amp;quot;&amp;amp;gt;
            &amp;amp;lt;div className=&amp;amp;quot;grid gap-2&amp;amp;quot;&amp;amp;gt;
              &amp;amp;lt;Label htmlFor=&amp;amp;quot;name&amp;amp;quot;&amp;amp;gt;姓名&amp;amp;lt;/Label&amp;amp;gt;
              &amp;amp;lt;Input id=&amp;amp;quot;name&amp;amp;quot; placeholder=&amp;amp;quot;输入姓名&amp;amp;quot; /&amp;amp;gt;
            &amp;amp;lt;/div&amp;amp;gt;
            &amp;amp;lt;Button type=&amp;amp;quot;submit&amp;amp;quot;&amp;amp;gt;保存&amp;amp;lt;/Button&amp;amp;gt;
          &amp;amp;lt;/div&amp;amp;gt;
        &amp;amp;lt;/form&amp;amp;gt;
      &amp;amp;lt;/DialogContent&amp;amp;gt;
    &amp;amp;lt;/Dialog&amp;amp;gt;
  );
}
```

---

## 5. 表单处理

### 5.1 React Hook Form

```tsx
import { useForm, Controller } from &amp;amp;#039;react-hook-form&amp;amp;#039;;
import { zodResolver } from &amp;amp;#039;@hookform/resolvers/zod&amp;amp;#039;;
import * as z from &amp;amp;#039;zod&amp;amp;#039;;

const schema = z.object({
  email: z.string().email(&amp;amp;#039;邮箱格式不正确&amp;amp;#039;),
  password: z.string().min(8, &amp;amp;#039;密码至少 8 位&amp;amp;#039;),
  age: z.number().min(18).max(100)
});

type FormData = z.infer&amp;amp;lt;typeof schema&amp;amp;gt;;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm&amp;amp;lt;FormData&amp;amp;gt;({
    resolver: zodResolver(schema),
    defaultValues: {
      email: &amp;amp;#039;&amp;amp;#039;,
      password: &amp;amp;#039;&amp;amp;#039;
    }
  });
  
  const onSubmit = async (data: FormData) =&amp;amp;gt; {
    try {
      await login(data);
    } catch (error) {
      setError(&amp;amp;#039;root&amp;amp;#039;, { message: &amp;amp;#039;登录失败&amp;amp;#039; });
    }
  };
  
  return (
    &amp;amp;lt;form onSubmit={handleSubmit(onSubmit)}&amp;amp;gt;
      &amp;amp;lt;input {...register(&amp;amp;#039;email&amp;amp;#039;)} placeholder=&amp;amp;quot;邮箱&amp;amp;quot; /&amp;amp;gt;
      {errors.email &amp;amp;amp;&amp;amp;amp; &amp;amp;lt;span&amp;amp;gt;{errors.email.message}&amp;amp;lt;/span&amp;amp;gt;}
      
      &amp;amp;lt;input {...register(&amp;amp;#039;password&amp;amp;#039;)} type=&amp;amp;quot;password&amp;amp;quot; placeholder=&amp;amp;quot;密码&amp;amp;quot; /&amp;amp;gt;
      {errors.password &amp;amp;amp;&amp;amp;amp; &amp;amp;lt;span&amp;amp;gt;{errors.password.message}&amp;amp;lt;/span&amp;amp;gt;}
      
      &amp;amp;lt;button type=&amp;amp;quot;submit&amp;amp;quot; disabled={isSubmitting}&amp;amp;gt;
        {isSubmitting ? &amp;amp;#039;登录中...&amp;amp;#039; : &amp;amp;#039;登录&amp;amp;#039;}
      &amp;amp;lt;/button&amp;amp;gt;
    &amp;amp;lt;/form&amp;amp;gt;
  );
}
```

### 5.2 Formik

```tsx
import { Formik, Form, Field, ErrorMessage } from &amp;amp;#039;formik&amp;amp;#039;;
import * as Yup from &amp;amp;#039;yup&amp;amp;#039;;

const validationSchema = Yup.object({
  email: Yup.string().email(&amp;amp;#039;Invalid email&amp;amp;#039;).required(&amp;amp;#039;Required&amp;amp;#039;),
  password: Yup.string().min(8, &amp;amp;#039;Minimum 8 characters&amp;amp;#039;).required(&amp;amp;#039;Required&amp;amp;#039;)
});

function LoginForm() {
  return (
    &amp;amp;lt;Formik
      initialValues=&amp;#123;&amp;#123; email: &amp;amp;#039;&amp;amp;#039;, password: &amp;amp;#039;&amp;amp;#039; &amp;#125;&amp;#125;
      validationSchema={validationSchema}
      onSubmit={async (values) =&amp;amp;gt; {
        await login(values);
      &amp;#125;&amp;#125;
    &amp;amp;gt;
      {({ isSubmitting }) =&amp;amp;gt; (
        &amp;amp;lt;Form&amp;amp;gt;
          &amp;amp;lt;Field type=&amp;amp;quot;email&amp;amp;quot; name=&amp;amp;quot;email&amp;amp;quot; /&amp;amp;gt;
          &amp;amp;lt;ErrorMessage name=&amp;amp;quot;email&amp;amp;quot; component=&amp;amp;quot;div&amp;amp;quot; /&amp;amp;gt;
          
          &amp;amp;lt;Field type=&amp;amp;quot;password&amp;amp;quot; name=&amp;amp;quot;password&amp;amp;quot; /&amp;amp;gt;
          &amp;amp;lt;ErrorMessage name=&amp;amp;quot;password&amp;amp;quot; component=&amp;amp;quot;div&amp;amp;quot; /&amp;amp;gt;
          
          &amp;amp;lt;button type=&amp;amp;quot;submit&amp;amp;quot; disabled={isSubmitting}&amp;amp;gt;登录&amp;amp;lt;/button&amp;amp;gt;
        &amp;amp;lt;/Form&amp;amp;gt;
      )}
    &amp;amp;lt;/Formik&amp;amp;gt;
  );
}
```

---

## 6. 数据获取

### 6.1 Axios

```typescript
import axios from &amp;amp;#039;axios&amp;amp;#039;;

const api = axios.create({
  baseURL: &amp;amp;#039;/api&amp;amp;#039;,
  timeout: 10000,
  headers: { &amp;amp;#039;Content-Type&amp;amp;#039;: &amp;amp;#039;application/json&amp;amp;#039; }
});

// 请求拦截器
api.interceptors.request.use((config) =&amp;amp;gt; {
  const token = localStorage.getItem(&amp;amp;#039;token&amp;amp;#039;);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
api.interceptors.response.use(
  (response) =&amp;amp;gt; response.data,
  (error) =&amp;amp;gt; {
    if (error.response?.status === 401) {
      window.location.href = &amp;amp;#039;/login&amp;amp;#039;;
    }
    return Promise.reject(error);
  }
);

// 使用
const users = await api.get(&amp;amp;#039;/users&amp;amp;#039;);
const user = await api.post(&amp;amp;#039;/users&amp;amp;#039;, { name: &amp;amp;#039;Alice&amp;amp;#039; });
```

### 6.2 Fetch API 封装

```typescript
async function request&amp;amp;lt;T&amp;amp;gt;(url: string, options?: RequestInit): Promise&amp;amp;lt;T&amp;amp;gt; {
  const response = await fetch(`/api${url}`, {
    ...options,
    headers: {
      &amp;amp;#039;Content-Type&amp;amp;#039;: &amp;amp;#039;application/json&amp;amp;#039;,
      ...options?.headers
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  return response.json();
}

// 使用
const users = await request&amp;amp;lt;User[]&amp;amp;gt;(&amp;amp;#039;/users&amp;amp;#039;);
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
import { format, parseISO, differenceInDays } from &amp;amp;#039;date-fns&amp;amp;#039;;
import { zhCN } from &amp;amp;#039;date-fns/locale&amp;amp;#039;;

format(new Date(), &amp;amp;#039;yyyy-MM-dd&amp;amp;#039;, { locale: zhCN });
differenceInDays(new Date(), parseISO(&amp;amp;#039;2024-01-01&amp;amp;#039;));
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
import { motion, AnimatePresence } from &amp;amp;#039;framer-motion&amp;amp;#039;;

function TodoItem({ todo }) {
  return (
    &amp;amp;lt;motion.li
      layout
      initial=&amp;#123;&amp;#123; opacity: 0, y: 20 &amp;#125;&amp;#125;
      animate=&amp;#123;&amp;#123; opacity: 1, y: 0 &amp;#125;&amp;#125;
      exit=&amp;#123;&amp;#123; opacity: 0, x: -100 &amp;#125;&amp;#125;
      whileHover=&amp;#123;&amp;#123; scale: 1.02 &amp;#125;&amp;#125;
      whileTap=&amp;#123;&amp;#123; scale: 0.98 &amp;#125;&amp;#125;
    &amp;amp;gt;
      {todo.text}
    &amp;amp;lt;/motion.li&amp;amp;gt;
  );
}

function TodoList({ todos }) {
  return (
    &amp;amp;lt;AnimatePresence&amp;amp;gt;
      {todos.map(todo =&amp;amp;gt; (
        &amp;amp;lt;TodoItem key={todo.id} todo={todo} /&amp;amp;gt;
      ))}
    &amp;amp;lt;/AnimatePresence&amp;amp;gt;
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
      &amp;amp;#039;react-hooks&amp;amp;#039;: reactHooksPlugin
    },
    rules: {
      &amp;amp;#039;react-hooks/rules-of-hooks&amp;amp;#039;: &amp;amp;#039;error&amp;amp;#039;,
      &amp;amp;#039;react-hooks/exhaustive-deps&amp;amp;#039;: &amp;amp;#039;warn&amp;amp;#039;
    }
  }
];
```

### 8.3 TypeScript 配置

```json
{
  &amp;amp;quot;compilerOptions&amp;amp;quot;: {
    &amp;amp;quot;jsx&amp;amp;quot;: &amp;amp;quot;react-jsx&amp;amp;quot;,
    &amp;amp;quot;types&amp;amp;quot;: [&amp;amp;quot;react&amp;amp;quot;, &amp;amp;quot;react-dom&amp;amp;quot;]
  }
}
```

---

## 9. 测试

### 9.1 React Testing Library

```typescript
import { render, screen, fireEvent, waitFor } from &amp;amp;#039;@testing-library/react&amp;amp;#039;;
import userEvent from &amp;amp;#039;@testing-library/user-event&amp;amp;#039;;

test(&amp;amp;#039;表单提交&amp;amp;#039;, async () =&amp;amp;gt; {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  
  render(&amp;amp;lt;LoginForm onSubmit={handleSubmit} /&amp;amp;gt;);
  
  await user.type(screen.getByLabelText(&amp;amp;#039;邮箱&amp;amp;#039;), &amp;amp;#039;test@example.com&amp;amp;#039;);
  await user.type(screen.getByLabelText(&amp;amp;#039;密码&amp;amp;#039;), &amp;amp;#039;password123&amp;amp;#039;);
  await user.click(screen.getByText(&amp;amp;#039;登录&amp;amp;#039;));
  
  await waitFor(() =&amp;amp;gt; {
    expect(handleSubmit).toHaveBeenCalledWith({
      email: &amp;amp;#039;test@example.com&amp;amp;#039;,
      password: &amp;amp;#039;password123&amp;amp;#039;
    });
  });
});
```

### 9.2 MSW (Mock Service Worker)

```typescript
import { http, HttpResponse } from &amp;amp;#039;msw&amp;amp;#039;;
import { setupServer } from &amp;amp;#039;msw/node&amp;amp;#039;;

const server = setupServer(
  http.get(&amp;amp;#039;/api/users&amp;amp;#039;, () =&amp;amp;gt; {
    return HttpResponse.json([
      { id: 1, name: &amp;amp;#039;Alice&amp;amp;#039; },
      { id: 2, name: &amp;amp;#039;Bob&amp;amp;#039; }
    ]);
  })
);

beforeAll(() =&amp;amp;gt; server.listen());
afterEach(() =&amp;amp;gt; server.resetHandlers());
afterAll(() =&amp;amp;gt; server.close());
```

---

## 10. 相关概念

- [React 核心](../techniques/react-core.md)
- [组件架构](../concepts/component-architecture.md)
- [状态管理](../concepts/state-management.md)
- [全栈框架](../tools/fullstack-frameworks.md)
- [测试策略](../concepts/testing-strategies.md)
