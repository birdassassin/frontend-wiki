# Component Architecture

> Components are abstraction units, not files. Good component design comes from the single responsibility principle.

---

## 1. Component Essence

### 1.1 What is a Component?
```
Component = UI (template) + State (data) + Logic (behavior) + Styles (presentation)
```

### 1.2 Component Properties
- **Encapsulation**: Internal implementation details hidden
- **Reusability**: Can be used in multiple places
- **Composability**: Can be combined to build complex UIs
- **Testability**: Can be tested in isolation

### 1.3 Single Responsibility Principle
A component should only have **one reason to change**:

```tsx
// Bad: Multiple responsibilities
function UserCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() =&amp;amp;gt; {
    fetchUser().then(setUser).finally(() =&amp;amp;gt; setLoading(false));
  }, []);
  
  return &amp;amp;lt;div&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;;
}

// Good: Separated responsibilities
function UserCard({ user }) {
  return &amp;amp;lt;div&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;;
}

function UserCardContainer({ userId }) {
  const { data: user, loading } = useUser(userId);
  if (loading) return &amp;amp;lt;Skeleton /&amp;amp;gt;;
  return &amp;amp;lt;UserCard user={user} /&amp;amp;gt;;
}
```

---

## 2. Component Design Principles

### 2.1 Props Design
```tsx
interface ButtonProps {
  variant?: &amp;amp;#039;primary&amp;amp;#039; | &amp;amp;#039;secondary&amp;amp;#039; | &amp;amp;#039;ghost&amp;amp;#039;;
  size?: &amp;amp;#039;sm&amp;amp;#039; | &amp;amp;#039;md&amp;amp;#039; | &amp;amp;#039;lg&amp;amp;#039;;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) =&amp;amp;gt; void;
}

// Usage
&amp;amp;lt;Button variant=&amp;amp;quot;primary&amp;amp;quot; size=&amp;amp;quot;md&amp;amp;quot; loading={isSubmitting}&amp;amp;gt;
  Submit
&amp;amp;lt;/Button&amp;amp;gt;
```

**Rules:**
- Use optional props with sensible defaults
- Avoid boolean prop combinations
- Use union types for constrained values
- Keep prop count under 7

### 2.2 Composition over Configuration
```tsx
// Bad: Configuration hell
&amp;amp;lt;Modal
  showHeader={true}
  showFooter={true}
  headerTitle=&amp;amp;quot;Title&amp;amp;quot;
  footerButtons={[{ label: &amp;amp;#039;OK&amp;amp;#039;, action: handleOk }]}
  width={600}
  closable={true}
/&amp;amp;gt;

// Good: Composition
&amp;amp;lt;Modal&amp;amp;gt;
  &amp;amp;lt;Modal.Header&amp;amp;gt;
    &amp;amp;lt;Modal.Title&amp;amp;gt;Title&amp;amp;lt;/Modal.Title&amp;amp;gt;
    &amp;amp;lt;Modal.Close /&amp;amp;gt;
  &amp;amp;lt;/Modal.Header&amp;amp;gt;
  &amp;amp;lt;Modal.Body&amp;amp;gt;Content&amp;amp;lt;/Modal.Body&amp;amp;gt;
  &amp;amp;lt;Modal.Footer&amp;amp;gt;
    &amp;amp;lt;Button onClick={handleOk}&amp;amp;gt;OK&amp;amp;lt;/Button&amp;amp;gt;
  &amp;amp;lt;/Modal.Footer&amp;amp;gt;
&amp;amp;lt;/Modal&amp;amp;gt;
```

### 2.3 Controlled vs Uncontrolled
```tsx
// Controlled component
function ControlledInput({ value, onChange }) {
  return &amp;amp;lt;input value={value} onChange={e =&amp;amp;gt; onChange(e.target.value)} /&amp;amp;gt;;
}

// Uncontrolled component
function UncontrolledInput({ defaultValue }) {
  const ref = useRef();
  return &amp;amp;lt;input ref={ref} defaultValue={defaultValue} /&amp;amp;gt;;
}
```

---

## 3. State Management

### 3.1 State Classification
| Type | Scope | Example | Solution |
|---|---|---|---|
| UI State | Component | Toggle, modal open | `useState` |
| Form State | Component | Input values | `useReducer` / Form library |
| Server State | Global | User data, list data | React Query / SWR |
| URL State | Global | Query params, hash | Router |
| Session State | Global | Auth token, theme | Context / Store |

### 3.2 State Lifting
```tsx
// Before: Duplicate state
function Parent() {
  return (
    &amp;amp;lt;&amp;amp;gt;
      &amp;amp;lt;ChildA /&amp;amp;gt;
      &amp;amp;lt;ChildB /&amp;amp;gt;
    &amp;amp;lt;/&amp;amp;gt;
  );
}

// After: Lifted state
function Parent() {
  const [sharedState, setSharedState] = useState(initial);
  return (
    &amp;amp;lt;&amp;amp;gt;
      &amp;amp;lt;ChildA state={sharedState} onChange={setSharedState} /&amp;amp;gt;
      &amp;amp;lt;ChildB state={sharedState} onChange={setSharedState} /&amp;amp;gt;
    &amp;amp;lt;/&amp;amp;gt;
  );
}
```

### 3.3 State Colocation
Keep state as close as possible to where it's used:

```tsx
// Bad: State in global store but only used by one component
const globalStore = { sidebarOpen: false };

// Good: State in component
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return &amp;amp;lt;Sidebar open={sidebarOpen} /&amp;amp;gt;;
}
```

---

## 4. Component Lifecycle

### 4.1 Mount → Update → Unmount
```tsx
function Component() {
  // Mount
  useEffect(() =&amp;amp;gt; {
    const subscription = subscribe();
    
    // Update (cleanup before re-run)
    return () =&amp;amp;gt; {
      subscription.unsubscribe();
    };
  }, [dependency]);
  
  // Unmount
  useEffect(() =&amp;amp;gt; {
    return () =&amp;amp;gt; {
      // Cleanup on unmount
    };
  }, []);
}
```

### 4.2 Lifecycle Comparison
| Phase | React | Vue |
|---|---|---|
| Mount | `useEffect(() => {}, [])` | `onMounted()` |
| Update | `useEffect(() => {}, [deps])` | `onUpdated()` |
| Unmount | `useEffect(() => () => {}, [])` | `onUnmounted()` |

---

## 5. Component Patterns

### 5.1 Compound Components
```tsx
function Select({ children, value, onChange }) {
  return (
    &amp;amp;lt;div className=&amp;amp;quot;select&amp;amp;quot;&amp;amp;gt;
      {React.Children.map(children, child =&amp;amp;gt;
        React.cloneElement(child, { value, onChange })
      )}
    &amp;amp;lt;/div&amp;amp;gt;
  );
}

Select.Option = function Option({ value, children, ...props }) {
  return &amp;amp;lt;div {...props}&amp;amp;gt;{children}&amp;amp;lt;/div&amp;amp;gt;;
};

// Usage
&amp;amp;lt;Select value={selected} onChange={setSelected}&amp;amp;gt;
  &amp;amp;lt;Select.Option value=&amp;amp;quot;a&amp;amp;quot;&amp;amp;gt;Option A&amp;amp;lt;/Select.Option&amp;amp;gt;
  &amp;amp;lt;Select.Option value=&amp;amp;quot;b&amp;amp;quot;&amp;amp;gt;Option B&amp;amp;lt;/Select.Option&amp;amp;gt;
&amp;amp;lt;/Select&amp;amp;gt;
```

### 5.2 Render Props
```tsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() =&amp;amp;gt; {
    const handler = (e) =&amp;amp;gt; setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener(&amp;amp;#039;mousemove&amp;amp;#039;, handler);
    return () =&amp;amp;gt; window.removeEventListener(&amp;amp;#039;mousemove&amp;amp;#039;, handler);
  }, []);
  
  return render(position);
}

// Usage
&amp;amp;lt;MouseTracker render={({ x, y }) =&amp;amp;gt; &amp;amp;lt;p&amp;amp;gt;Mouse at {x}, {y}&amp;amp;lt;/p&amp;amp;gt;} /&amp;amp;gt;
```

### 5.3 Higher-Order Components
```tsx
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) return &amp;amp;lt;Loading /&amp;amp;gt;;
    return &amp;amp;lt;WrappedComponent {...props} /&amp;amp;gt;;
  };
}

const UserListWithLoading = withLoading(UserList);
```

---

## 6. Component Communication

### 6.1 Parent → Child (Props)
```tsx
function Parent() {
  return &amp;amp;lt;Child message=&amp;amp;quot;Hello&amp;amp;quot; /&amp;amp;gt;;
}
```

### 6.2 Child → Parent (Callbacks)
```tsx
function Parent() {
  const handleEvent = (data) =&amp;amp;gt; console.log(data);
  return &amp;amp;lt;Child onEvent={handleEvent} /&amp;amp;gt;;
}
```

### 6.3 Sibling (Lift State)
```tsx
function Parent() {
  const [shared, setShared] = useState(&amp;amp;#039;&amp;amp;#039;);
  return (
    &amp;amp;lt;&amp;amp;gt;
      &amp;amp;lt;SiblingA value={shared} onChange={setShared} /&amp;amp;gt;
      &amp;amp;lt;SiblingB value={shared} /&amp;amp;gt;
    &amp;amp;lt;/&amp;amp;gt;
  );
}
```

### 6.4 Cross-level (Context)
```tsx
const ThemeContext = createContext(&amp;amp;#039;light&amp;amp;#039;);

function App() {
  return (
    &amp;amp;lt;ThemeContext.Provider value=&amp;amp;quot;dark&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;DeepComponent /&amp;amp;gt;
    &amp;amp;lt;/ThemeContext.Provider&amp;amp;gt;
  );
}

function DeepComponent() {
  const theme = useContext(ThemeContext);
  return &amp;amp;lt;div className={theme}&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;;
}
```

---

## 7. Performance Optimization

### 7.1 Memoization
```tsx
// React.memo - skip re-render when props unchanged
const MemoizedComponent = React.memo(Component);

// useMemo - cache expensive computation
const sortedList = useMemo(() =&amp;amp;gt; list.sort(compareFn), [list]);

// useCallback - cache function reference
const handleClick = useCallback((id) =&amp;amp;gt; {
  setSelected(id);
}, []);
```

### 7.2 Code Splitting
```tsx
// Route-level splitting
const LazyPage = React.lazy(() =&amp;amp;gt; import(&amp;amp;#039;./pages/LazyPage&amp;amp;#039;));

// Component-level splitting
const HeavyComponent = React.lazy(() =&amp;amp;gt; import(&amp;amp;#039;./HeavyComponent&amp;amp;#039;));

function App() {
  return (
    &amp;amp;lt;Suspense fallback={&amp;amp;lt;Loading /&amp;amp;gt;}&amp;amp;gt;
      &amp;amp;lt;LazyPage /&amp;amp;gt;
    &amp;amp;lt;/Suspense&amp;amp;gt;
  );
}
```

### 7.3 Virtual Lists
```tsx
import { FixedSizeList } from &amp;amp;#039;react-window&amp;amp;#039;;

function VirtualList({ items }) {
  return (
    &amp;amp;lt;FixedSizeList height={600} itemCount={items.length} itemSize={50}&amp;amp;gt;
      {({ index, style }) =&amp;amp;gt; (
        &amp;amp;lt;div style={style}&amp;amp;gt;{items[index]}&amp;amp;lt;/div&amp;amp;gt;
      )}
    &amp;amp;lt;/FixedSizeList&amp;amp;gt;
  );
}
```

---

## 8. Related Concepts

- [State Management](state-management.en.md)
- [React Core](../techniques/react-core.en.md)
- [Vue Core](../techniques/vue-core.en.md)
- [Component Composition](../patterns/component-composition.en.md)
