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
  
  const fetchPosts = async () =&amp;amp;gt; { /* ... */ };
  const fetchComments = async () =&amp;amp;gt; { /* ... */ };
  
  return (
    &amp;amp;lt;div&amp;amp;gt;
      &amp;amp;lt;UserProfile user={user} /&amp;amp;gt;
      &amp;amp;lt;UserPosts posts={data?.posts} /&amp;amp;gt;
      &amp;amp;lt;UserComments comments={data?.comments} /&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
  );
}

// ✅ 职责分离
function UserCard({ user }) {
  return (
    &amp;amp;lt;div&amp;amp;gt;
      &amp;amp;lt;UserProfile user={user} /&amp;amp;gt;
      &amp;amp;lt;UserPosts userId={user.id} /&amp;amp;gt;
      &amp;amp;lt;UserComments userId={user.id} /&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
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
    &amp;amp;lt;div className=&amp;amp;quot;modal&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;ModalHeader title={title} onClose={onClose} /&amp;amp;gt;
      &amp;amp;lt;ModalBody&amp;amp;gt;{children}&amp;amp;lt;/ModalBody&amp;amp;gt;
      &amp;amp;lt;ModalFooter /&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
  );
}

function ConfirmModal({ message, onConfirm }) {
  return (
    &amp;amp;lt;Modal title=&amp;amp;quot;确认&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;p&amp;amp;gt;{message}&amp;amp;lt;/p&amp;amp;gt;
      &amp;amp;lt;Button onClick={onConfirm}&amp;amp;gt;确认&amp;amp;lt;/Button&amp;amp;gt;
    &amp;amp;lt;/Modal&amp;amp;gt;
  );
}
```

### 2.3 Props 设计
```jsx
// 1. 明确的 Props 类型
interface ButtonProps {
  variant?: &amp;amp;#039;primary&amp;amp;#039; | &amp;amp;#039;secondary&amp;amp;#039; | &amp;amp;#039;ghost&amp;amp;#039;;
  size?: &amp;amp;#039;sm&amp;amp;#039; | &amp;amp;#039;md&amp;amp;#039; | &amp;amp;#039;lg&amp;amp;#039;;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (e: MouseEvent) =&amp;amp;gt; void;
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

function Container&amp;amp;lt;T&amp;amp;gt;({ as: Component = &amp;amp;#039;div&amp;amp;#039;, ...props }: ContainerProps&amp;amp;lt;T&amp;amp;gt; &amp;amp;amp; T) {
  return &amp;amp;lt;Component {...props} /&amp;amp;gt;;
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
  const [search, setSearch] = useState(&amp;amp;#039;&amp;amp;#039;);
  
  return (
    &amp;amp;lt;&amp;amp;gt;
      &amp;amp;lt;SearchInput value={search} onChange={setSearch} /&amp;amp;gt;
      &amp;amp;lt;SearchResults query={search} /&amp;amp;gt;
    &amp;amp;lt;/&amp;amp;gt;
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
  const completedCount = todos.filter(t =&amp;amp;gt; t.completed).length;
  const filteredTodos = todos.filter(t =&amp;amp;gt; 
    t.title.toLowerCase().includes(search.toLowerCase())
  );
  
  return &amp;amp;lt;List items={filteredTodos} /&amp;amp;gt;;
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
  useEffect(() =&amp;amp;gt; {
    const timer = setInterval(() =&amp;amp;gt; { /* ... */ }, 1000);
    
    // 清理函数（卸载或依赖变化时执行）
    return () =&amp;amp;gt; clearInterval(timer);
  }, [dependency]);
  
  // 仅挂载时执行
  useEffect(() =&amp;amp;gt; {
    fetchInitialData();
  }, []);
  
  // 每次渲染后执行
  useEffect(() =&amp;amp;gt; {
    updateDocumentTitle();
  });
}
```

### 4.2 Vue 生命周期
```
创建 → 挂载 → 更新 → 卸载
```

```vue
&amp;amp;lt;script setup&amp;amp;gt;
import { onMounted, onUpdated, onUnmounted } from &amp;amp;#039;vue&amp;amp;#039;;

onMounted(() =&amp;amp;gt; {
  // DOM 挂载后
});

onUpdated(() =&amp;amp;gt; {
  // DOM 更新后
});

onUnmounted(() =&amp;amp;gt; {
  // 清理
});
&amp;amp;lt;/script&amp;amp;gt;
```

---

## 5. 组件模式

### 5.1 复合组件
```jsx
function Select({ children, value, onChange }) {
  return (
    &amp;amp;lt;div className=&amp;amp;quot;select&amp;amp;quot;&amp;amp;gt;
      {React.Children.map(children, child =&amp;amp;gt;
        React.cloneElement(child, { value, onChange })
      )}
    &amp;amp;lt;/div&amp;amp;gt;
  );
}

Select.Option = function Option({ value, children }) {
  return &amp;amp;lt;option value={value}&amp;amp;gt;{children}&amp;amp;lt;/option&amp;amp;gt;;
};

// 使用
&amp;amp;lt;Select value={selected} onChange={setSelected}&amp;amp;gt;
  &amp;amp;lt;Select.Option value=&amp;amp;quot;a&amp;amp;quot;&amp;amp;gt;A&amp;amp;lt;/Select.Option&amp;amp;gt;
  &amp;amp;lt;Select.Option value=&amp;amp;quot;b&amp;amp;quot;&amp;amp;gt;B&amp;amp;lt;/Select.Option&amp;amp;gt;
&amp;amp;lt;/Select&amp;amp;gt;
```

### 5.2 渲染 Props
```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() =&amp;amp;gt; {
    const handler = (e) =&amp;amp;gt; setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener(&amp;amp;#039;mousemove&amp;amp;#039;, handler);
    return () =&amp;amp;gt; window.removeEventListener(&amp;amp;#039;mousemove&amp;amp;#039;, handler);
  }, []);
  
  return render(position);
}

&amp;amp;lt;MouseTracker render={({ x, y }) =&amp;amp;gt; (
  &amp;amp;lt;div&amp;amp;gt;鼠标位置: {x}, {y}&amp;amp;lt;/div&amp;amp;gt;
)} /&amp;amp;gt;
```

### 5.3 高阶组件
```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return &amp;amp;lt;LoadingSpinner /&amp;amp;gt;;
    return &amp;amp;lt;WrappedComponent {...props} /&amp;amp;gt;;
  };
}

const UserListWithLoading = withLoading(UserList);
```

---

## 6. 性能优化

### 6.1 避免不必要的重渲染
```jsx
// 1. React.memo 缓存组件
const ExpensiveComponent = React.memo(({ data }) =&amp;amp;gt; {
  return &amp;amp;lt;div&amp;amp;gt;{/* 复杂渲染 */}&amp;amp;lt;/div&amp;amp;gt;;
});

// 2. useMemo 缓存计算
const filteredData = useMemo(() =&amp;amp;gt; 
  data.filter(item =&amp;amp;gt; item.active),
  [data]
);

// 3. useCallback 缓存函数
const handleClick = useCallback((id) =&amp;amp;gt; {
  setSelectedId(id);
}, []);
```

### 6.2 代码分割
```jsx
// 路由级别分割
const Dashboard = lazy(() =&amp;amp;gt; import(&amp;amp;#039;./Dashboard&amp;amp;#039;));

// 组件级别分割
const HeavyComponent = lazy(() =&amp;amp;gt; import(&amp;amp;#039;./HeavyComponent&amp;amp;#039;));

function App() {
  return (
    &amp;amp;lt;Suspense fallback={&amp;amp;lt;Loading /&amp;amp;gt;}&amp;amp;gt;
      &amp;amp;lt;Dashboard /&amp;amp;gt;
    &amp;amp;lt;/Suspense&amp;amp;gt;
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
