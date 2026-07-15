# React Ecosystem

> The React ecosystem is vast. Mastering routing, state management, and UI libraries matters more than learning every tool.

---

## 1. Routing

### 1.1 React Router v6
```tsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
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

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>User {id}</h1>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
```

### 1.2 Nested Routes
```tsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<Overview />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  );
}
```

### 1.3 Route Guards
```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state=&amp;#123;&amp;#123; from: location &amp;#125;&amp;#125; replace />;
  }
  
  return <>{children}</>;
}

// Usage
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
```

---

## 2. State Management

### 2.1 Zustand
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

// Usage
function TodoList() {
  const todos = useTodoStore(state => state.filteredTodos);
  const addTodo = useTodoStore(state => state.addTodo);
  return <div>...</div>;
}
```

### 2.2 Redux Toolkit
```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: crypto.randomUUID(), text: action.payload, done: false });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    }
  }
});

const store = configureStore({
  reducer: { todos: todoSlice.reducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 3. Server State Management

### 3.1 TanStack Query (React Query)
```tsx
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    <QueryClientProvider client={queryClient}>
      <TodoApp />
    </QueryClientProvider>
  );
}

function TodoList() {
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(r => r.json())
  });
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return <List todos={todos} />;
}

function AddTodo() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (text: string) => 
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text })
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
  
  return <button onClick={() => mutation.mutate('New Todo')}>Add</button>;
}
```

### 3.2 SWR
```tsx
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function Profile() {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher);
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return <div>{data.name}</div>;
}
```

---

## 4. UI Component Libraries

### 4.1 shadcn/ui
```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function UserCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter name" />
        <Button>Save</Button>
      </CardContent>
    </Card>
  );
}
```

### 4.2 Ant Design
```tsx
import { Button, Form, Input, Table, Modal } from 'antd';

function UserManagement() {
  const [form] = Form.useForm();
  
  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
}
```

---

## 5. Form Handling

### 5.1 React Hook Form + Zod
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 6. Testing

### 6.1 React Testing Library
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoApp } from './TodoApp';

test('adds a new todo', () => {
  render(<TodoApp />);
  
  const input = screen.getByPlaceholderText(/add todo/i);
  fireEvent.change(input, { target: { value: 'Learn testing' } });
  
  const button = screen.getByRole('button', { name: /add/i });
  fireEvent.click(button);
  
  expect(screen.getByText('Learn testing')).toBeInTheDocument();
});
```

### 6.2 MSW (Mock Service Worker)
```typescript
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const server = setupServer(
  http.get('/api/todos', () => {
    return HttpResponse.json([
      { id: '1', text: 'Test', done: false }
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## 7. Related Concepts

- [React Core](../techniques/react-core.en.md)
- [Component Architecture](../concepts/component-architecture.en.md)
- [State Management](../concepts/state-management.en.md)
- [Full-stack Frameworks](fullstack-frameworks.en.md)
