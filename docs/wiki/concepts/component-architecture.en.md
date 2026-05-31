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
  
  useEffect(() => {
    fetchUser().then(setUser).finally(() => setLoading(false));
  }, []);
  
  return <div>...</div>;
}

// Good: Separated responsibilities
function UserCard({ user }) {
  return <div>...</div>;
}

function UserCardContainer({ userId }) {
  const { data: user, loading } = useUser(userId);
  if (loading) return <Skeleton />;
  return <UserCard user={user} />;
}
```

---

## 2. Component Design Principles

### 2.1 Props Design
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

// Usage
<Button variant="primary" size="md" loading={isSubmitting}>
  Submit
</Button>
```

**Rules:**
- Use optional props with sensible defaults
- Avoid boolean prop combinations
- Use union types for constrained values
- Keep prop count under 7

### 2.2 Composition over Configuration
```tsx
// Bad: Configuration hell
<Modal
  showHeader={true}
  showFooter={true}
  headerTitle="Title"
  footerButtons={[{ label: 'OK', action: handleOk }]}
  width={600}
  closable={true}
/>

// Good: Composition
<Modal>
  <Modal.Header>
    <Modal.Title>Title</Modal.Title>
    <Modal.Close />
  </Modal.Header>
  <Modal.Body>Content</Modal.Body>
  <Modal.Footer>
    <Button onClick={handleOk}>OK</Button>
  </Modal.Footer>
</Modal>
```

### 2.3 Controlled vs Uncontrolled
```tsx
// Controlled component
function ControlledInput({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />;
}

// Uncontrolled component
function UncontrolledInput({ defaultValue }) {
  const ref = useRef();
  return <input ref={ref} defaultValue={defaultValue} />;
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
    <>
      <ChildA />
      <ChildB />
    </>
  );
}

// After: Lifted state
function Parent() {
  const [sharedState, setSharedState] = useState(initial);
  return (
    <>
      <ChildA state={sharedState} onChange={setSharedState} />
      <ChildB state={sharedState} onChange={setSharedState} />
    </>
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
  return <Sidebar open={sidebarOpen} />;
}
```

---

## 4. Component Lifecycle

### 4.1 Mount → Update → Unmount
```tsx
function Component() {
  // Mount
  useEffect(() => {
    const subscription = subscribe();
    
    // Update (cleanup before re-run)
    return () => {
      subscription.unsubscribe();
    };
  }, [dependency]);
  
  // Unmount
  useEffect(() => {
    return () => {
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
    <div className="select">
      {React.Children.map(children, child =>
        React.cloneElement(child, { value, onChange })
      )}
    </div>
  );
}

Select.Option = function Option({ value, children, ...props }) {
  return <div {...props}>{children}</div>;
};

// Usage
<Select value={selected} onChange={setSelected}>
  <Select.Option value="a">Option A</Select.Option>
  <Select.Option value="b">Option B</Select.Option>
</Select>
```

### 5.2 Render Props
```tsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  
  return render(position);
}

// Usage
<MouseTracker render={({ x, y }) => <p>Mouse at {x}, {y}</p>} />
```

### 5.3 Higher-Order Components
```tsx
function withLoading(WrappedComponent) {
  return function WithLoading({ isLoading, ...props }) {
    if (isLoading) return <Loading />;
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);
```

---

## 6. Component Communication

### 6.1 Parent → Child (Props)
```tsx
function Parent() {
  return <Child message="Hello" />;
}
```

### 6.2 Child → Parent (Callbacks)
```tsx
function Parent() {
  const handleEvent = (data) => console.log(data);
  return <Child onEvent={handleEvent} />;
}
```

### 6.3 Sibling (Lift State)
```tsx
function Parent() {
  const [shared, setShared] = useState('');
  return (
    <>
      <SiblingA value={shared} onChange={setShared} />
      <SiblingB value={shared} />
    </>
  );
}
```

### 6.4 Cross-level (Context)
```tsx
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <DeepComponent />
    </ThemeContext.Provider>
  );
}

function DeepComponent() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}
```

---

## 7. Performance Optimization

### 7.1 Memoization
```tsx
// React.memo - skip re-render when props unchanged
const MemoizedComponent = React.memo(Component);

// useMemo - cache expensive computation
const sortedList = useMemo(() => list.sort(compareFn), [list]);

// useCallback - cache function reference
const handleClick = useCallback((id) => {
  setSelected(id);
}, []);
```

### 7.2 Code Splitting
```tsx
// Route-level splitting
const LazyPage = React.lazy(() => import('./pages/LazyPage'));

// Component-level splitting
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyPage />
    </Suspense>
  );
}
```

### 7.3 Virtual Lists
```tsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList height={600} itemCount={items.length} itemSize={50}>
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </FixedSizeList>
  );
}
```

---

## 8. Related Concepts

- [State Management](state-management.en.md)
- [React Core](../techniques/react-core.en.md)
- [Vue Core](../techniques/vue-core.en.md)
- [Component Composition](../patterns/component-composition.en.md)
