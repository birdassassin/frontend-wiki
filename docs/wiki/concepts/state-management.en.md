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
    &amp;amp;lt;div&amp;amp;gt;
      &amp;amp;lt;p&amp;amp;gt;{count}&amp;amp;lt;/p&amp;amp;gt; {/* UI derived from state */}
      &amp;amp;lt;button onClick={() =&amp;amp;gt; setCount(count + 1)}&amp;amp;gt; {/* Event triggers state update */}
        Increment
      &amp;amp;lt;/button&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
  );
}
```

### 2.2 Flux Pattern
```
Action → Dispatcher → Store → View
```

```typescript
// Action
const increment = { type: &amp;amp;#039;INCREMENT&amp;amp;#039; };

// Reducer (pure function)
function counter(state = 0, action) {
  switch (action.type) {
    case &amp;amp;#039;INCREMENT&amp;amp;#039;: return state + 1;
    case &amp;amp;#039;DECREMENT&amp;amp;#039;: return state - 1;
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
&amp;amp;lt;script setup&amp;amp;gt;
import { ref, computed } from &amp;amp;#039;vue&amp;amp;#039;;

const count = ref(0);
const doubled = computed(() =&amp;amp;gt; count.value * 2);

function increment() {
  count.value++; // Automatically triggers UI update
}
&amp;amp;lt;/script&amp;amp;gt;
```

---

## 3. Modern State Management

### 3.1 Zustand (React)
```typescript
import { create } from &amp;amp;#039;zustand&amp;amp;#039;;

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) =&amp;amp;gt; void;
  toggleTodo: (id: string) =&amp;amp;gt; void;
}

const useTodoStore = create&amp;amp;lt;TodoStore&amp;amp;gt;((set) =&amp;amp;gt; ({
  todos: [],
  
  addTodo: (text) =&amp;amp;gt; set((state) =&amp;amp;gt; ({
    todos: [...state.todos, { id: crypto.randomUUID(), text, done: false }]
  })),
  
  toggleTodo: (id) =&amp;amp;gt; set((state) =&amp;amp;gt; ({
    todos: state.todos.map(todo =&amp;amp;gt;
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  }))
}));

// Usage
function TodoList() {
  const todos = useTodoStore(state =&amp;amp;gt; state.todos);
  const addTodo = useTodoStore(state =&amp;amp;gt; state.addTodo);
  return &amp;amp;lt;div&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;;
}
```

### 3.2 Redux Toolkit
```typescript
import { createSlice, configureStore } from &amp;amp;#039;@reduxjs/toolkit&amp;amp;#039;;

const todoSlice = createSlice({
  name: &amp;amp;#039;todos&amp;amp;#039;,
  initialState: [],
  reducers: {
    addTodo: (state, action) =&amp;amp;gt; {
      state.push({ id: crypto.randomUUID(), text: action.payload, done: false });
    },
    toggleTodo: (state, action) =&amp;amp;gt; {
      const todo = state.find(t =&amp;amp;gt; t.id === action.payload);
      if (todo) todo.done = !todo.done;
    }
  }
});

const store = configureStore({ reducer: { todos: todoSlice.reducer } });
```

### 3.3 Pinia (Vue)
```typescript
import { defineStore } from &amp;amp;#039;pinia&amp;amp;#039;;

export const useTodoStore = defineStore(&amp;amp;#039;todo&amp;amp;#039;, () =&amp;amp;gt; {
  const todos = ref&amp;amp;lt;Todo[]&amp;amp;gt;([]);
  
  const doneCount = computed(() =&amp;amp;gt; todos.value.filter(t =&amp;amp;gt; t.done).length);
  
  function addTodo(text: string) {
    todos.value.push({ id: crypto.randomUUID(), text, done: false });
  }
  
  function toggleTodo(id: string) {
    const todo = todos.value.find(t =&amp;amp;gt; t.id === id);
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
import { useQuery, useMutation, useQueryClient } from &amp;amp;#039;@tanstack/react-query&amp;amp;#039;;

// Query
function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: [&amp;amp;#039;todos&amp;amp;#039;],
    queryFn: () =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;).then(r =&amp;amp;gt; r.json())
  });
  
  if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
  if (error) return &amp;amp;lt;Error /&amp;amp;gt;;
  return &amp;amp;lt;TodoList todos={data} /&amp;amp;gt;;
}

// Mutation
function AddTodo() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: (text) =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;, {
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

### 4.3 SWR
```typescript
import useSWR from &amp;amp;#039;swr&amp;amp;#039;;

const fetcher = (url) =&amp;amp;gt; fetch(url).then(r =&amp;amp;gt; r.json());

function Profile() {
  const { data, error, isLoading, mutate } = useSWR(&amp;amp;#039;/api/user&amp;amp;#039;, fetcher);
  
  if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
  if (error) return &amp;amp;lt;Error /&amp;amp;gt;;
  return &amp;amp;lt;div&amp;amp;gt;{data.name}&amp;amp;lt;/div&amp;amp;gt;;
}
```

---

## 5. State Synchronization

### 5.1 Optimistic Updates
```typescript
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) =&amp;amp;gt; {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: [&amp;amp;#039;todos&amp;amp;#039;] });
    
    // Snapshot previous state
    const previous = queryClient.getQueryData([&amp;amp;#039;todos&amp;amp;#039;]);
    
    // Optimistically update
    queryClient.setQueryData([&amp;amp;#039;todos&amp;amp;#039;], (old) =&amp;amp;gt; [...old, newTodo]);
    
    return { previous };
  },
  onError: (err, newTodo, context) =&amp;amp;gt; {
    // Rollback on error
    queryClient.setQueryData([&amp;amp;#039;todos&amp;amp;#039;], context.previous);
  },
  onSettled: () =&amp;amp;gt; {
    // Refetch after success or error
    queryClient.invalidateQueries({ queryKey: [&amp;amp;#039;todos&amp;amp;#039;] });
  }
});
```

### 5.2 Polling
```typescript
const { data } = useQuery({
  queryKey: [&amp;amp;#039;live-data&amp;amp;#039;],
  queryFn: fetchLiveData,
  refetchInterval: 5000 // Poll every 5 seconds
});
```

### 5.3 Real-time (WebSocket)
```typescript
useEffect(() =&amp;amp;gt; {
  const ws = new WebSocket(&amp;amp;#039;ws://api.example.com/live&amp;amp;#039;);
  
  ws.onmessage = (event) =&amp;amp;gt; {
    const data = JSON.parse(event.data);
    queryClient.setQueryData([&amp;amp;#039;live-data&amp;amp;#039;], data);
  };
  
  return () =&amp;amp;gt; ws.close();
}, []);
```

---

## 6. State Design Anti-patterns

### 6.1 State Duplication
```typescript
// Bad: Duplicated state
const [firstName, setFirstName] = useState(&amp;amp;#039;John&amp;amp;#039;);
const [lastName, setLastName] = useState(&amp;amp;#039;Doe&amp;amp;#039;);
const [fullName, setFullName] = useState(&amp;amp;#039;John Doe&amp;amp;#039;);

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
type Status = &amp;amp;#039;idle&amp;amp;#039; | &amp;amp;#039;loading&amp;amp;#039; | &amp;amp;#039;success&amp;amp;#039; | &amp;amp;#039;error&amp;amp;#039;;
const [status, setStatus] = useState&amp;amp;lt;Status&amp;amp;gt;(&amp;amp;#039;idle&amp;amp;#039;);
```

### 6.3 Prop Drilling
```tsx
// Bad: Passing through multiple levels
&amp;amp;lt;GrandParent&amp;amp;gt;
  &amp;amp;lt;Parent data={data}&amp;amp;gt;
    &amp;amp;lt;Child data={data}&amp;amp;gt;
      &amp;amp;lt;GrandChild data={data} /&amp;amp;gt;
    &amp;amp;lt;/Child&amp;amp;gt;
  &amp;amp;lt;/Parent&amp;amp;gt;
&amp;amp;lt;/GrandParent&amp;amp;gt;

// Good: Context or state management
&amp;amp;lt;DataProvider data={data}&amp;amp;gt;
  &amp;amp;lt;GrandParent&amp;amp;gt;
    &amp;amp;lt;Parent&amp;amp;gt;
      &amp;amp;lt;Child&amp;amp;gt;
        &amp;amp;lt;GrandChild /&amp;amp;gt;
      &amp;amp;lt;/Child&amp;amp;gt;
    &amp;amp;lt;/Parent&amp;amp;gt;
  &amp;amp;lt;/GrandParent&amp;amp;gt;
&amp;amp;lt;/DataProvider&amp;amp;gt;
```

---

## 7. Related Concepts

- [Component Architecture](component-architecture.en.md)
- [React Ecosystem](../tools/react-ecosystem.en.md)
- [Vue Ecosystem](../tools/vue-ecosystem.en.md)
- [State Patterns](../patterns/state-patterns.en.md)
