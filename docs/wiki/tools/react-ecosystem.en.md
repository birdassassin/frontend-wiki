# React Ecosystem

> The React ecosystem is vast. Mastering routing, state management, and UI libraries matters more than learning every tool.

---

## 1. Routing

### 1.1 React Router v6
```tsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from &amp;amp;#039;react-router-dom&amp;amp;#039;;

function App() {
  return (
    &amp;amp;lt;BrowserRouter&amp;amp;gt;
      &amp;amp;lt;nav&amp;amp;gt;
        &amp;amp;lt;Link to=&amp;amp;quot;/&amp;amp;quot;&amp;amp;gt;Home&amp;amp;lt;/Link&amp;amp;gt;
        &amp;amp;lt;Link to=&amp;amp;quot;/users&amp;amp;quot;&amp;amp;gt;Users&amp;amp;lt;/Link&amp;amp;gt;
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

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    &amp;amp;lt;div&amp;amp;gt;
      &amp;amp;lt;h1&amp;amp;gt;User {id}&amp;amp;lt;/h1&amp;amp;gt;
      &amp;amp;lt;button onClick={() =&amp;amp;gt; navigate(-1)}&amp;amp;gt;Back&amp;amp;lt;/button&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
  );
}
```

### 1.2 Nested Routes
```tsx
&amp;amp;lt;Routes&amp;amp;gt;
  &amp;amp;lt;Route path=&amp;amp;quot;/dashboard&amp;amp;quot; element={&amp;amp;lt;Dashboard /&amp;amp;gt;}&amp;amp;gt;
    &amp;amp;lt;Route index element={&amp;amp;lt;Overview /&amp;amp;gt;} /&amp;amp;gt;
    &amp;amp;lt;Route path=&amp;amp;quot;analytics&amp;amp;quot; element={&amp;amp;lt;Analytics /&amp;amp;gt;} /&amp;amp;gt;
    &amp;amp;lt;Route path=&amp;amp;quot;settings&amp;amp;quot; element={&amp;amp;lt;Settings /&amp;amp;gt;} /&amp;amp;gt;
  &amp;amp;lt;/Route&amp;amp;gt;
&amp;amp;lt;/Routes&amp;amp;gt;

function Dashboard() {
  return (
    &amp;amp;lt;div&amp;amp;gt;
      &amp;amp;lt;Sidebar /&amp;amp;gt;
      &amp;amp;lt;main&amp;amp;gt;
        &amp;amp;lt;Outlet /&amp;amp;gt; {/* Child routes render here */}
      &amp;amp;lt;/main&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
  );
}
```

### 1.3 Route Guards
```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return &amp;amp;lt;Navigate to=&amp;amp;quot;/login&amp;amp;quot; state=&amp;#123;&amp;#123; from: location &amp;#125;&amp;#125; replace /&amp;amp;gt;;
  }
  
  return &amp;amp;lt;&amp;amp;gt;{children}&amp;amp;lt;/&amp;amp;gt;;
}

// Usage
&amp;amp;lt;Route path=&amp;amp;quot;/dashboard&amp;amp;quot; element={&amp;amp;lt;ProtectedRoute&amp;amp;gt;&amp;amp;lt;Dashboard /&amp;amp;gt;&amp;amp;lt;/ProtectedRoute&amp;amp;gt;} /&amp;amp;gt;
```

---

## 2. State Management

### 2.1 Zustand
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

// Usage
function TodoList() {
  const todos = useTodoStore(state =&amp;amp;gt; state.filteredTodos);
  const addTodo = useTodoStore(state =&amp;amp;gt; state.addTodo);
  return &amp;amp;lt;div&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;;
}
```

### 2.2 Redux Toolkit
```typescript
import { createSlice, configureStore } from &amp;amp;#039;@reduxjs/toolkit&amp;amp;#039;;

const todoSlice = createSlice({
  name: &amp;amp;#039;todos&amp;amp;#039;,
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction&amp;amp;lt;string&amp;amp;gt;) =&amp;amp;gt; {
      state.push({ id: crypto.randomUUID(), text: action.payload, done: false });
    },
    toggleTodo: (state, action: PayloadAction&amp;amp;lt;string&amp;amp;gt;) =&amp;amp;gt; {
      const todo = state.find(t =&amp;amp;gt; t.id === action.payload);
      if (todo) todo.done = !todo.done;
    }
  }
});

const store = configureStore({
  reducer: { todos: todoSlice.reducer }
});

export type RootState = ReturnType&amp;amp;lt;typeof store.getState&amp;amp;gt;;
export type AppDispatch = typeof store.dispatch;
```

---

## 3. Server State Management

### 3.1 TanStack Query (React Query)
```tsx
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from &amp;amp;#039;@tanstack/react-query&amp;amp;#039;;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
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

function TodoList() {
  const { data: todos, isLoading, error } = useQuery({
    queryKey: [&amp;amp;#039;todos&amp;amp;#039;],
    queryFn: () =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;).then(r =&amp;amp;gt; r.json())
  });
  
  if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
  if (error) return &amp;amp;lt;Error /&amp;amp;gt;;
  return &amp;amp;lt;List todos={todos} /&amp;amp;gt;;
}

function AddTodo() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (text: string) =&amp;amp;gt; 
      fetch(&amp;amp;#039;/api/todos&amp;amp;#039;, {
        method: &amp;amp;#039;POST&amp;amp;#039;,
        body: JSON.stringify({ text })
      }),
    onSuccess: () =&amp;amp;gt; {
      queryClient.invalidateQueries({ queryKey: [&amp;amp;#039;todos&amp;amp;#039;] });
    }
  });
  
  return &amp;amp;lt;button onClick={() =&amp;amp;gt; mutation.mutate(&amp;amp;#039;New Todo&amp;amp;#039;)}&amp;amp;gt;Add&amp;amp;lt;/button&amp;amp;gt;;
}
```

### 3.2 SWR
```tsx
import useSWR from &amp;amp;#039;swr&amp;amp;#039;;

const fetcher = (url: string) =&amp;amp;gt; fetch(url).then(r =&amp;amp;gt; r.json());

function Profile() {
  const { data, error, isLoading, mutate } = useSWR(&amp;amp;#039;/api/user&amp;amp;#039;, fetcher);
  
  if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
  if (error) return &amp;amp;lt;Error /&amp;amp;gt;;
  return &amp;amp;lt;div&amp;amp;gt;{data.name}&amp;amp;lt;/div&amp;amp;gt;;
}
```

---

## 4. UI Component Libraries

### 4.1 shadcn/ui
```tsx
import { Button } from &amp;amp;quot;@/components/ui/button&amp;amp;quot;;
import { Card, CardContent, CardHeader, CardTitle } from &amp;amp;quot;@/components/ui/card&amp;amp;quot;;
import { Input } from &amp;amp;quot;@/components/ui/input&amp;amp;quot;;

function UserCard() {
  return (
    &amp;amp;lt;Card&amp;amp;gt;
      &amp;amp;lt;CardHeader&amp;amp;gt;
        &amp;amp;lt;CardTitle&amp;amp;gt;User Profile&amp;amp;lt;/CardTitle&amp;amp;gt;
      &amp;amp;lt;/CardHeader&amp;amp;gt;
      &amp;amp;lt;CardContent&amp;amp;gt;
        &amp;amp;lt;Input placeholder=&amp;amp;quot;Enter name&amp;amp;quot; /&amp;amp;gt;
        &amp;amp;lt;Button&amp;amp;gt;Save&amp;amp;lt;/Button&amp;amp;gt;
      &amp;amp;lt;/CardContent&amp;amp;gt;
    &amp;amp;lt;/Card&amp;amp;gt;
  );
}
```

### 4.2 Ant Design
```tsx
import { Button, Form, Input, Table, Modal } from &amp;amp;#039;antd&amp;amp;#039;;

function UserManagement() {
  const [form] = Form.useForm();
  
  return (
    &amp;amp;lt;Form form={form} onFinish={onSubmit}&amp;amp;gt;
      &amp;amp;lt;Form.Item name=&amp;amp;quot;name&amp;amp;quot; rules={[{ required: true }]}&amp;amp;gt;
        &amp;amp;lt;Input placeholder=&amp;amp;quot;Name&amp;amp;quot; /&amp;amp;gt;
      &amp;amp;lt;/Form.Item&amp;amp;gt;
      &amp;amp;lt;Button type=&amp;amp;quot;primary&amp;amp;quot; htmlType=&amp;amp;quot;submit&amp;amp;quot;&amp;amp;gt;Submit&amp;amp;lt;/Button&amp;amp;gt;
    &amp;amp;lt;/Form&amp;amp;gt;
  );
}
```

---

## 5. Form Handling

### 5.1 React Hook Form + Zod
```tsx
import { useForm } from &amp;amp;#039;react-hook-form&amp;amp;#039;;
import { zodResolver } from &amp;amp;#039;@hookform/resolvers/zod&amp;amp;#039;;
import { z } from &amp;amp;#039;zod&amp;amp;#039;;

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormData = z.infer&amp;amp;lt;typeof schema&amp;amp;gt;;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm&amp;amp;lt;FormData&amp;amp;gt;({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = (data: FormData) =&amp;amp;gt; {
    console.log(data);
  };
  
  return (
    &amp;amp;lt;form onSubmit={handleSubmit(onSubmit)}&amp;amp;gt;
      &amp;amp;lt;input {...register(&amp;amp;#039;email&amp;amp;#039;)} /&amp;amp;gt;
      {errors.email &amp;amp;amp;&amp;amp;amp; &amp;amp;lt;span&amp;amp;gt;{errors.email.message}&amp;amp;lt;/span&amp;amp;gt;}
      
      &amp;amp;lt;input {...register(&amp;amp;#039;password&amp;amp;#039;)} type=&amp;amp;quot;password&amp;amp;quot; /&amp;amp;gt;
      {errors.password &amp;amp;amp;&amp;amp;amp; &amp;amp;lt;span&amp;amp;gt;{errors.password.message}&amp;amp;lt;/span&amp;amp;gt;}
      
      &amp;amp;lt;button type=&amp;amp;quot;submit&amp;amp;quot;&amp;amp;gt;Login&amp;amp;lt;/button&amp;amp;gt;
    &amp;amp;lt;/form&amp;amp;gt;
  );
}
```

---

## 6. Testing

### 6.1 React Testing Library
```tsx
import { render, screen, fireEvent } from &amp;amp;#039;@testing-library/react&amp;amp;#039;;
import { TodoApp } from &amp;amp;#039;./TodoApp&amp;amp;#039;;

test(&amp;amp;#039;adds a new todo&amp;amp;#039;, () =&amp;amp;gt; {
  render(&amp;amp;lt;TodoApp /&amp;amp;gt;);
  
  const input = screen.getByPlaceholderText(/add todo/i);
  fireEvent.change(input, { target: { value: &amp;amp;#039;Learn testing&amp;amp;#039; } });
  
  const button = screen.getByRole(&amp;amp;#039;button&amp;amp;#039;, { name: /add/i });
  fireEvent.click(button);
  
  expect(screen.getByText(&amp;amp;#039;Learn testing&amp;amp;#039;)).toBeInTheDocument();
});
```

### 6.2 MSW (Mock Service Worker)
```typescript
import { setupServer } from &amp;amp;#039;msw/node&amp;amp;#039;;
import { http, HttpResponse } from &amp;amp;#039;msw&amp;amp;#039;;

const server = setupServer(
  http.get(&amp;amp;#039;/api/todos&amp;amp;#039;, () =&amp;amp;gt; {
    return HttpResponse.json([
      { id: &amp;amp;#039;1&amp;amp;#039;, text: &amp;amp;#039;Test&amp;amp;#039;, done: false }
    ]);
  })
);

beforeAll(() =&amp;amp;gt; server.listen());
afterEach(() =&amp;amp;gt; server.resetHandlers());
afterAll(() =&amp;amp;gt; server.close());
```

---

## 7. Related Concepts

- [React Core](../techniques/react-core.en.md)
- [Component Architecture](../concepts/component-architecture.en.md)
- [State Management](../concepts/state-management.en.md)
- [Full-stack Frameworks](fullstack-frameworks.en.md)
