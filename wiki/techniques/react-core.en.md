# React Core

> React is a library for building user interfaces. Understanding Hooks and Fiber architecture matters more than memorizing APIs.

---

## 1. Core Concepts

### 1.1 Declarative UI
```tsx
// Imperative (jQuery style)
$('#container').empty();
$('<div>').text(user.name).appendTo('#container');

// Declarative (React style)
function UserCard({ user }) {
  return <div>{user.name}</div>;
}
```

### 1.2 Component Model
```
Component = Props (input) + State (internal data) + JSX (UI description)
```

### 1.3 Virtual DOM
```
State Change → Re-render → Virtual DOM → Diff → Real DOM Update
```

---

## 2. Hooks

### 2.1 useState
```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // Functional update
  const increment = () => setCount(prev => prev + 1);
  
  return <button onClick={increment}>{count}</button>;
}
```

### 2.2 useEffect
```tsx
function Component() {
  // Mount only
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription.unsubscribe(); // Cleanup on unmount
  }, []);
  
  // Mount + dependency change
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);
  
  // Every render
  useEffect(() => {
    console.log('rendered');
  });
}
```

### 2.3 useContext
```tsx
const ThemeContext = createContext<'light' | 'dark'>('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}
```

### 2.4 useMemo & useCallback
```tsx
function TodoList({ todos, onToggle }) {
  // Cache expensive computation
  const sortedTodos = useMemo(() => 
    [...todos].sort((a, b) => a.priority - b.priority),
    [todos]
  );
  
  // Cache function reference
  const handleToggle = useCallback((id: string) => {
    onToggle(id);
  }, [onToggle]);
  
  return (
    <ul>
      {sortedTodos.map(todo => (
        <Todo key={todo.id} todo={todo} onToggle={handleToggle} />
      ))}
    </ul>
  );
}
```

### 2.5 useRef
```tsx
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef(0);
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  useEffect(() => {
    renderCount.current++;
  });
  
  return <input ref={inputRef} />;
}
```

---

## 3. Fiber Architecture

### 3.1 What is Fiber?
Fiber is React's reconciliation engine rewrite:
- Breaks rendering work into small units
- Can pause, abort, or reuse work
- Assigns priority to different types of updates

### 3.2 Concurrent Rendering
```tsx
// React 18 concurrent features
function App() {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  
  function handleChange(e) {
    setInput(e.target.value);
    
    // Low priority update
    startTransition(() => {
      setSearch(e.target.value);
    });
  }
  
  return (
    <>
      <input value={input} onChange={handleChange} />
      {isPending && <Spinner />}
      <Results query={search} />
    </>
  );
}
```

### 3.3 useDeferredValue
```tsx
function Search() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SlowList query={deferredQuery} />
    </>
  );
}
```

---

## 4. Advanced Patterns

### 4.1 Custom Hooks
```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### 4.2 Error Boundaries
```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return <Fallback error={this.state.error} />;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <ComponentThatMayFail />
</ErrorBoundary>
```

### 4.3 Portals
```tsx
function Modal({ children }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>,
    document.getElementById('modal-root')!
  );
}
```

---

## 5. Performance Optimization

### 5.1 React.memo
```tsx
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    <li>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span>{todo.text}</span>
    </li>
  );
});
```

### 5.2 Code Splitting
```tsx
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 5.3 Virtualization
```tsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList height={600} itemCount={items.length} itemSize={50}>
      {({ index, style }) => <div style={style}>{items[index]}</div>}
    </FixedSizeList>
  );
}
```

---

## 6. Related Concepts

- [Component Architecture](component-architecture.en.md)
- [State Management](state-management.en.md)
- [React Ecosystem](../../tools/react-ecosystem.en.md)
- [Rendering Strategies](rendering-strategies.en.md)
