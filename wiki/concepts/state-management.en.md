# State Management

> State management isn't about choosing Redux vs Zustand — it's about designing how data flows.

---

## 1. State Essence

### 1.1 What is State?
```
State = Data that changes over time and affects UI rendering
```

### 1.2 State Classification
| Type | Lifecycle | Scope | Example |
|---|---|---|---|
| Local State | Component lifecycle | Single component | Toggle, form input |
| Shared State | Session | Multiple components | Theme, user info |
| Server State | Cache expiration | Global | API data, list data |
| URL State | Navigation | Global | Query params, route |
| Session State | Browser session | Global | Auth token, cart |

### 1.3 State Design Principles
- **Single Source of Truth**: Each piece of state should have only one owner
- **Derived State**: Calculate from existing state, don't duplicate
- **Minimal State**: Only store what can't be calculated
- **State Colocation**: Keep state as close as possible to where it's used

---

## 2. Data Flow Patterns

### 2.1 Unidirectional Data Flow
```
State → UI → Events → State Updates → New State → New UI
```

```tsx
// React unidirectional data flow
function Counter() {
  const [count, setCount] = useState(0); // State
  
  return (
    <div>
      <p>{count}</p> {/* UI derived from state */}
      <button onClick={() => setCount(count + 1)}> {/* Event triggers state update */}
        Increment
      </button>
    </div>
  );
}
```

### 2.2 Flux Pattern
```
Action → Dispatcher → Store → View
```

```typescript
// Action
const increment = { type: 'INCREMENT' };

// Reducer (pure function)
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
}

// Store
const store = createStore(counter);
store.dispatch(increment);
```

### 2.3 Reactivity Pattern
```
State Change → Dependency Tracking → Auto Update
```

```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++; // Automatically triggers UI update
}
</script>
```

---

## 3. Modern State Management

### 3.1 Zustand (React)
```typescript
import { create } from 'zustand';

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: crypto.randomUUID(), text, done: false }]
  })),
  
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  }))
}));

// Usage
function TodoList() {
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  return <div>...</div>;
}
```

### 3.2 Redux Toolkit
```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: crypto.randomUUID(), text: action.payload, done: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    }
  }
});

const store = configureStore({ reducer: { todos: todoSlice.reducer } });
```

### 3.3 Pinia (Vue)
```typescript
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([]);
  
  const doneCount = computed(() => todos.value.filter(t => t.done).length);
  
  function addTodo(text: string) {
    todos.value.push({ id: crypto.randomUUID(), text, done: false });
  }
  
  function toggleTodo(id: string) {
    const todo = todos.value.find(t => t.id === id);
    if (todo) todo.done = !todo.done;
  }
  
  return { todos, doneCount, addTodo, toggleTodo };
});
```

---

## 4. Server State Management

### 4.1 Why Separate Server State?
```
Server State ≠ Client State

Server State:
- Stored on remote server
- Requires async requests
- Can become stale
- Needs caching and synchronization
```

### 4.2 React Query
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query
function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(r => r.json())
  });
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return <TodoList todos={data} />;
}

// Mutation
function AddTodo() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (text) => fetch('/api/todos', {
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

### 4.3 SWR
```typescript
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

function Profile() {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher);
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return <div>{data.name}</div>;
}
```

---

## 5. State Synchronization

### 5.1 Optimistic Updates
```typescript
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['todos'] });
    
    // Snapshot previous state
    const previous = queryClient.getQueryData(['todos']);
    
    // Optimistically update
    queryClient.setQueryData(['todos'], (old) => [...old, newTodo]);
    
    return { previous };
  },
  onError: (err, newTodo, context) => {
    // Rollback on error
    queryClient.setQueryData(['todos'], context.previous);
  },
  onSettled: () => {
    // Refetch after success or error
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});
```

### 5.2 Polling
```typescript
const { data } = useQuery({
  queryKey: ['live-data'],
  queryFn: fetchLiveData,
  refetchInterval: 5000 // Poll every 5 seconds
});
```

### 5.3 Real-time (WebSocket)
```typescript
useEffect(() => {
  const ws = new WebSocket('ws://api.example.com/live');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    queryClient.setQueryData(['live-data'], data);
  };
  
  return () => ws.close();
}, []);
```

---

## 6. State Design Anti-patterns

### 6.1 State Duplication
```typescript
// Bad: Duplicated state
const [firstName, setFirstName] = useState('John');
const [lastName, setLastName] = useState('Doe');
const [fullName, setFullName] = useState('John Doe');

// Good: Derived state
const fullName = `${firstName} ${lastName}`;
```

### 6.2 Boolean Explosion
```typescript
// Bad: Multiple booleans
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);

// Good: State machine
type Status = 'idle' | 'loading' | 'success' | 'error';
const [status, setStatus] = useState<Status>('idle');
```

### 6.3 Prop Drilling
```tsx
// Bad: Passing through multiple levels
<GrandParent>
  <Parent data={data}>
    <Child data={data}>
      <GrandChild data={data} />
    </Child>
  </Parent>
</GrandParent>

// Good: Context or state management
<DataProvider data={data}>
  <GrandParent>
    <Parent>
      <Child>
        <GrandChild />
      </Child>
    </Parent>
  </GrandParent>
</DataProvider>
```

---

## 7. Related Concepts

- [Component Architecture](component-architecture.en.md)
- [React Ecosystem](../tools/react-ecosystem.en.md)
- [Vue Ecosystem](../tools/vue-ecosystem.en.md)
- [State Patterns](../patterns/state-patterns.en.md)
