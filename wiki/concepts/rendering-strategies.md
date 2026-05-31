# 渲染策略

> 渲染策略决定用户体验。CSR/SSR/SSG 不是技术选择，是产品选择。

---

## 1. 渲染模式对比

| 模式 | 首屏速度 | SEO | 交互性 | 服务器负载 | 适用场景 |
|---|---|---|---|---|---|
| CSR | 慢 | 差 | 好 | 低 | 后台、工具 |
| SSR | 快 | 好 | 好 | 高 | 内容站、电商 |
| SSG | 最快 | 好 | 好 | 最低 | 博客、文档 |
| ISR | 快 | 好 | 好 | 低 | 内容频繁更新 |
| Streaming SSR | 快 | 好 | 好 | 中 | 大型页面 |

---

## 2. CSR (客户端渲染)

### 2.1 工作原理
```
用户请求 → 返回空 HTML + JS bundle → JS 下载执行 → 渲染 UI
```

### 2.2 实现
```jsx
// React SPA
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### 2.3 优缺点
**优点：**
- 服务器负载低
- 开发体验好
- 丰富的交互

**缺点：**
- 首屏慢（需要下载 JS）
- SEO 差（爬虫看不到内容）
- 低端设备体验差

---

## 3. SSR (服务端渲染)

### 3.1 工作原理
```
用户请求 → 服务器渲染 HTML → 返回完整 HTML → 显示内容 → JS 水合 → 交互
```

### 3.2 实现 (Next.js)
```jsx
// pages/user/[id].jsx
export async function getServerSideProps({ params }) {
  const user = await fetchUser(params.id);
  return { props: { user } };
}

function UserPage({ user }) {
  return <div>{user.name}</div>;
}
```

### 3.3 React 18 SSR
```jsx
import { renderToPipeableStream } from 'react-dom/server';

app.get('*', (req, res) => {
  const stream = renderToPipeableStream(<App />, {
    onShellReady() {
      res.setHeader('Content-Type', 'text/html');
      stream.pipe(res);
    }
  });
});
```

---

## 4. SSG (静态生成)

### 4.1 工作原理
```
构建时渲染 HTML → 部署到 CDN → 用户请求 → 直接返回 HTML
```

### 4.2 实现 (Next.js)
```jsx
// 构建时生成
export async function getStaticProps() {
  const posts = await getAllPosts();
  return { props: { posts } };
}

// 动态路由
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return {
    paths: posts.map(post => ({ params: { id: post.id } })),
    fallback: false
  };
}
```

---

## 5. ISR (增量静态再生)

### 5.1 工作原理
```
用户请求 → 返回缓存 HTML → 后台重新生成 → 下次请求使用新 HTML
```

### 5.2 实现
```jsx
export async function getStaticProps() {
  return {
    props: { /* ... */ },
    revalidate: 60 // 60 秒后重新生成
  };
}
```

---

## 6. 水合 (Hydration)

### 6.1 什么是水合
水合 = 将事件监听器附加到 SSR HTML 的过程

```
SSR HTML → JS 加载 → React 对比 DOM → 附加事件 → 可交互
```

### 6.2 水合优化

#### 选择性水合
```jsx
// 只对需要的组件水合
<Suspense fallback={null}>
  <InteractiveComponent />
</Suspense>

// 用户交互后才水合
<InteractiveComponent data-suppress-hydration />
```

#### 岛屿架构
```jsx
// Astro 示例
---
import InteractiveButton from '../components/Button.jsx';
---

<!-- 静态 HTML，不水合 -->
<header>...</header>

<!-- 仅视口可见时水合 -->
<InteractiveButton client:visible />

<!-- 仅用户交互时水合 -->
<InteractiveButton client:idle />
```

---

## 7. 流式渲染 (Streaming)

### 7.1 工作原理
```
服务器逐步发送 HTML → 浏览器逐步渲染 → 不需要等待全部完成
```

### 7.2 React Suspense
```jsx
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Suspense fallback={<SidebarLoading />}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={<ContentLoading />}>
        <Content />
      </Suspense>
    </Suspense>
  );
}
```

### 7.3 React Server Components
```jsx
// 服务器组件（不发送 JS 到客户端）
async function Note({ id }) {
  const note = await db.notes.find(id);
  return <div>{note.content}</div>;
}

// 客户端组件
'use client';

function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

---

## 8. 选择策略

### 8.1 决策树
```
需要 SEO 吗？
├─ 否 → CSR
└─ 是 → 内容更新频率？
       ├─ 不更新 → SSG
       ├─ 偶尔更新 → ISR
       └─ 频繁更新 → SSR
```

### 8.2 混合策略
```jsx
// Next.js App Router
export const dynamic = 'force-static'; // 默认 SSG

// 特定路由使用 SSR
export const dynamic = 'force-dynamic';

// 边缘运行时
export const runtime = 'edge';
```

---

## 9. 相关概念

- [组件架构](component-architecture.md)
- [Web Vitals](web-vitals.md)
- [性能优化](performance-optimization.md)
- [全栈框架](../../tools/fullstack-frameworks.md)
