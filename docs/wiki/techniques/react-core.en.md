# React Core

> React is a library for building user interfaces. Understanding Hooks and Fiber architecture matters more than memorizing APIs.

---

## 1. Core Concepts

### 1.1 Declarative UI
```tsx
// Imperative (jQuery style)
$(&amp;amp;#039;#container&amp;amp;#039;).empty();
$(&amp;amp;#039;&amp;amp;lt;div&amp;amp;gt;&amp;amp;#039;).text(user.name).appendTo(&amp;amp;#039;#container&amp;amp;#039;);

// Declarative (React style)
function UserCard({ user }) {
  return &amp;amp;lt;div&amp;amp;gt;{user.name}&amp;amp;lt;/div&amp;amp;gt;;
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
  const increment = () =&amp;amp;gt; setCount(prev =&amp;amp;gt; prev + 1);
  
  return &amp;amp;lt;button onClick={increment}&amp;amp;gt;{count}&amp;amp;lt;/button&amp;amp;gt;;
}
```

### 2.2 useEffect
```tsx
function Component() {
  // Mount only
  useEffect(() =&amp;amp;gt; {
    const subscription = subscribe();
    return () =&amp;amp;gt; subscription.unsubscribe(); // Cleanup on unmount
  }, []);
  
  // Mount + dependency change
  useEffect(() =&amp;amp;gt; {
    document.title = `Count: ${count}`;
  }, [count]);
  
  // Every render
  useEffect(() =&amp;amp;gt; {
    console.log(&amp;amp;#039;rendered&amp;amp;#039;);
  });
}
```

### 2.3 useContext
```tsx
const ThemeContext = createContext&amp;amp;lt;&amp;amp;#039;light&amp;amp;#039; | &amp;amp;#039;dark&amp;amp;#039;&amp;amp;gt;(&amp;amp;#039;light&amp;amp;#039;);

function App() {
  return (
    &amp;amp;lt;ThemeContext.Provider value=&amp;amp;quot;dark&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;Toolbar /&amp;amp;gt;
    &amp;amp;lt;/ThemeContext.Provider&amp;amp;gt;
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return &amp;amp;lt;div className={theme}&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;;
}
```

### 2.4 useMemo & useCallback
```tsx
function TodoList({ todos, onToggle }) {
  // Cache expensive computation
  const sortedTodos = useMemo(() =&amp;amp;gt; 
    [...todos].sort((a, b) =&amp;amp;gt; a.priority - b.priority),
    [todos]
  );
  
  // Cache function reference
  const handleToggle = useCallback((id: string) =&amp;amp;gt; {
    onToggle(id);
  }, [onToggle]);
  
  return (
    &amp;amp;lt;ul&amp;amp;gt;
      {sortedTodos.map(todo =&amp;amp;gt; (
        &amp;amp;lt;Todo key={todo.id} todo={todo} onToggle={handleToggle} /&amp;amp;gt;
      ))}
    &amp;amp;lt;/ul&amp;amp;gt;
  );
}
```

### 2.5 useRef
```tsx
function Form() {
  const inputRef = useRef&amp;amp;lt;HTMLInputElement&amp;amp;gt;(null);
  const renderCount = useRef(0);
  
  useEffect(() =&amp;amp;gt; {
    inputRef.current?.focus();
  }, []);
  
  useEffect(() =&amp;amp;gt; {
    renderCount.current++;
  });
  
  return &amp;amp;lt;input ref={inputRef} /&amp;amp;gt;;
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
  const [input, setInput] = useState(&amp;amp;#039;&amp;amp;#039;);
  const [search, setSearch] = useState(&amp;amp;#039;&amp;amp;#039;);
  
  function handleChange(e) {
    setInput(e.target.value);
    
    // Low priority update
    startTransition(() =&amp;amp;gt; {
      setSearch(e.target.value);
    });
  }
  
  return (
    &amp;amp;lt;&amp;amp;gt;
      &amp;amp;lt;input value={input} onChange={handleChange} /&amp;amp;gt;
      {isPending &amp;amp;amp;&amp;amp;amp; &amp;amp;lt;Spinner /&amp;amp;gt;}
      &amp;amp;lt;Results query={search} /&amp;amp;gt;
    &amp;amp;lt;/&amp;amp;gt;
  );
}
```

### 3.3 useDeferredValue
```tsx
function Search() {
  const [query, setQuery] = useState(&amp;amp;#039;&amp;amp;#039;);
  const deferredQuery = useDeferredValue(query);
  
  return (
    &amp;amp;lt;&amp;amp;gt;
      &amp;amp;lt;input value={query} onChange={e =&amp;amp;gt; setQuery(e.target.value)} /&amp;amp;gt;
      &amp;amp;lt;SlowList query={deferredQuery} /&amp;amp;gt;
    &amp;amp;lt;/&amp;amp;gt;
  );
}
```

---

## 4. Advanced Patterns

### 4.1 Custom Hooks
```tsx
function useLocalStorage&amp;amp;lt;T&amp;amp;gt;(key: string, initialValue: T) {
  const [value, setValue] = useState&amp;amp;lt;T&amp;amp;gt;(() =&amp;amp;gt; {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() =&amp;amp;gt; {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage(&amp;amp;#039;theme&amp;amp;#039;, &amp;amp;#039;light&amp;amp;#039;);
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
      return &amp;amp;lt;Fallback error={this.state.error} /&amp;amp;gt;;
    }
    return this.props.children;
  }
}

// Usage
&amp;amp;lt;ErrorBoundary&amp;amp;gt;
  &amp;amp;lt;ComponentThatMayFail /&amp;amp;gt;
&amp;amp;lt;/ErrorBoundary&amp;amp;gt;
```

### 4.3 Portals
```tsx
function Modal({ children }) {
  return createPortal(
    &amp;amp;lt;div className=&amp;amp;quot;modal-overlay&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;div className=&amp;amp;quot;modal&amp;amp;quot;&amp;amp;gt;{children}&amp;amp;lt;/div&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;,
    document.getElementById(&amp;amp;#039;modal-root&amp;amp;#039;)!
  );
}
```

---

## 5. Performance Optimization

### 5.1 React.memo
```tsx
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    &amp;amp;lt;li&amp;amp;gt;
      &amp;amp;lt;input type=&amp;amp;quot;checkbox&amp;amp;quot; checked={todo.done} onChange={() =&amp;amp;gt; onToggle(todo.id)} /&amp;amp;gt;
      &amp;amp;lt;span&amp;amp;gt;{todo.text}&amp;amp;lt;/span&amp;amp;gt;
    &amp;amp;lt;/li&amp;amp;gt;
  );
});
```

### 5.2 Code Splitting
```tsx
const LazyComponent = React.lazy(() =&amp;amp;gt; import(&amp;amp;#039;./HeavyComponent&amp;amp;#039;));

function App() {
  return (
    &amp;amp;lt;Suspense fallback={&amp;amp;lt;Loading /&amp;amp;gt;}&amp;amp;gt;
      &amp;amp;lt;LazyComponent /&amp;amp;gt;
    &amp;amp;lt;/Suspense&amp;amp;gt;
  );
}
```

### 5.3 Virtualization
```tsx
import { FixedSizeList } from &amp;amp;#039;react-window&amp;amp;#039;;

function VirtualList({ items }) {
  return (
    &amp;amp;lt;FixedSizeList height={600} itemCount={items.length} itemSize={50}&amp;amp;gt;
      {({ index, style }) =&amp;amp;gt; &amp;amp;lt;div style={style}&amp;amp;gt;{items[index]}&amp;amp;lt;/div&amp;amp;gt;}
    &amp;amp;lt;/FixedSizeList&amp;amp;gt;
  );
}
```

---

## 6. Related Concepts

- [Component Architecture](component-architecture.en.md)
- [State Management](state-management.en.md)
- [React Ecosystem](../tools/react-ecosystem.en.md)
- [Rendering Strategies](rendering-strategies.en.md)
