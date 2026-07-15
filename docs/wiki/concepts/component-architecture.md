# 组件架构

> 组件是前端的抽象单元。好的组件设计来自职责单一原则，而不是文件组织习惯。

---

## 1. 组件本质

### 1.1 定义
组件 = UI + 状态 + 行为

```
Component(state) → UI
```

组件是状态的函数，给定相同的输入，总是产生相同的输出。

### 1.2 组件分类

| 类型 | 特征 | 示例 |
|---|---|---|
| 展示组件 | 只负责渲染，无状态 | Button, Card, Avatar |
| 容器组件 | 管理状态和数据获取 | UserList, Dashboard |
| 布局组件 | 只负责位置和尺寸 | Grid, Stack, Container |
| 功能组件 | 提供特定功能 | Form, Modal, Tooltip |

---

## 2. 组件设计原则

### 2.1 单一职责
```jsx
// ❌ 职责过多
function UserCard({ user }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  
  const fetchPosts = async () => { /* ... */ };
  const fetchComments = async () => { /* ... */ };
  
  return (
    <div>
      <UserProfile user={user} />
      <UserPosts posts={data?.posts} />
      <UserComments comments={data?.comments} />
    </div>
  );
}

// ✅ 职责分离
function UserCard({ user }) {
  return (
    <div>
      <UserProfile user={user} />
      <UserPosts userId={user.id} />
      <UserComments userId={user.id} />
    </div>
  );
}
```

### 2.2 组合优于继承
```jsx
// ❌ 继承模式
class Modal extends Component { /* ... */ }
class ConfirmModal extends Modal { /* ... */ }
class FormModal extends Modal { /* ... */ }

// ✅ 组合模式
function Modal({ children, title, onClose }) {
  return (
    <div className="modal">
      <ModalHeader title={title} onClose={onClose} />
      <ModalBody>{children}</ModalBody>
      <ModalFooter />
    </div>
  );
}

function ConfirmModal({ message, onConfirm }) {
  return (
    <Modal title="确认">
      <p>{message}</p>
      <Button onClick={onConfirm}>确认</Button>
    </Modal>
  );
}
```

### 2.3 Props 设计
```jsx
// 1. 明确的 Props 类型
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
}

// 2. 组合 Props
interface CardProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

// 3. 多态 Props
interface AsProp {
  as?: React.ElementType;
}

function Container<T>({ as: Component = 'div', ...props }: ContainerProps<T> & T) {
  return <Component {...props} />;
}
```

---

## 3. 状态管理

### 3.1 状态分类

| 类型 | 范围 | 示例 | 管理方式 |
|---|---|---|---|
| 本地状态 | 单个组件 | 表单输入、展开/折叠 | useState |
| 提升状态 | 父组件共享 | 兄弟组件通信 | Props 传递 |
| 全局状态 | 应用级别 | 用户信息、主题 | Context/Store |
| 服务器状态 | 远程数据 | API 响应 | React Query/SWR |
| URL 状态 | 路由参数 | 分页、筛选 | useSearchParams |

### 3.2 状态提升
```jsx
// 状态提升到最近的共同父组件
function App() {
  const [search, setSearch] = useState('');
  
  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      <SearchResults query={search} />
    </>
  );
}
```

### 3.3 状态派生
```jsx
// 避免冗余状态
function TodoList({ todos }) {
  // ❌ 冗余状态
  const [completedCount, setCompletedCount] = useState(0);
  
  // ✅ 派生状态
  const completedCount = todos.filter(t => t.completed).length;
  const filteredTodos = todos.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase())
  );
  
  return <List items={filteredTodos} />;
}
```

---

## 4. 生命周期

### 4.1 React 生命周期
```
挂载 → 渲染 → 提交 → 更新 → 渲染 → 提交 → 卸载
```

```jsx
function Component() {
  // 挂载和更新时执行
  useEffect(() => {
    const timer = setInterval(() => { /* ... */ }, 1000);
    
    // 清理函数（卸载或依赖变化时执行）
    return () => clearInterval(timer);
  }, [dependency]);
  
  // 仅挂载时执行
  useEffect(() => {
    fetchInitialData();
  }, []);
  
  // 每次渲染后执行
  useEffect(() => {
    updateDocumentTitle();
  });
}
```

### 4.2 Vue 生命周期
```
创建 → 挂载 → 更新 → 卸载
```

```vue
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue';

onMounted(() => {
  // DOM 挂载后
});

onUpdated(() => {
  // DOM 更新后
});

onUnmounted(() => {
  // 清理
});
</script>
```

---

## 5. 组件模式

### 5.1 复合组件
```jsx
function Select({ children, value, onChange }) {
  return (
    <div className="select">
      {React.Children.map(children, child =>
        React.cloneElement(child, { value, onChange })
      )}
    </div>
  );
}

Select.Option = function Option({ value, children }) {
  return <option value={value}>{children}</option>;
};

// 使用
<Select value={selected} onChange={setSelected}>
  <Select.Option value="a">A</Select.Option>
  <Select.Option value="b">B</Select.Option>
</Select>
```

### 5.2 渲染 Props
```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  
  return render(position);
}

<MouseTracker render={({ x, y }) => (
  <div>鼠标位置: {x}, {y}</div>
)} />
```

### 5.3 高阶组件
```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <LoadingSpinner />;
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);
```

---

## 6. 性能优化

### 6.1 避免不必要的重渲染
```jsx
// 1. React.memo 缓存组件
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* 复杂渲染 */}</div>;
});

// 2. useMemo 缓存计算
const filteredData = useMemo(() => 
  data.filter(item => item.active),
  [data]
);

// 3. useCallback 缓存函数
const handleClick = useCallback((id) => {
  setSelectedId(id);
}, []);
```

### 6.2 代码分割
```jsx
// 路由级别分割
const Dashboard = lazy(() => import('./Dashboard'));

// 组件级别分割
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
```

---

## 7. 相关概念

- [状态管理](state-management.md)
- [渲染策略](rendering-strategies.md)
- [组件组合模式](../patterns/component-composition.md)
- [React 核心](../techniques/react-core.md)
- [Vue 核心](../techniques/vue-core.md)
