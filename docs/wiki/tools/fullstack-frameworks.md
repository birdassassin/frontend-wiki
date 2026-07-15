# 全栈框架

> 前端工程师需要理解服务器、数据库、部署。全栈框架重新定义客户端/服务器边界。

---

## 1. Next.js

### 1.1 App Router
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx
export default function Home() {
  return <h1>Hello Next.js</h1>;
}

// app/users/[id]/page.tsx
export default async function UserPage({ params }) {
  const user = await fetch(`https://api.example.com/users/${params.id}`);
  return <div>{user.name}</div>;
}
```

### 1.2 数据获取
```tsx
// 服务器组件 (默认)
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // ISR
  });
  return res.json();
}

// 客户端组件
'use client';

import { useState } from 'react';

function ClientComponent() {
  const [data, setData] = useState(null);
  return <button onClick={() => fetchData()}>Load</button>;
}
```

### 1.3 路由与导航
```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navigation() {
  const router = useRouter();
  
  return (
    <nav>
      <Link href="/about">About</Link>
      <button onClick={() => router.push('/dashboard')}>Dashboard</button>
    </nav>
  );
}
```

---

## 2. Remix

### 2.1 核心特性
```tsx
// routes/users.tsx
export async function loader({ request }) {
  const users = await getUsers();
  return json({ users });
}

export async function action({ request }) {
  const formData = await request.formData();
  await createUser(formData);
  return redirect('/users');
}

export default function Users() {
  const { users } = useLoaderData<typeof loader>();
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

### 2.2 表单处理
```tsx
function NewUserForm() {
  return (
    <Form method="post">
      <input name="name" type="text" />
      <button type="submit">Create</button>
    </Form>
  );
}
```

---

## 3. Nuxt

### 3.1 文件路由
```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1>&amp;#123;&amp;#123; data.title &amp;#125;&amp;#125;</h1>
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/data');
</script>
```

### 3.2 自动导入
```vue
<script setup>
// 自动导入 composables
const count = useState('count', () => 0);

// 自动导入组件
// <AppHeader /> 无需导入
</script>
```

---

## 4. Astro

### 4.1 岛屿架构
```astro
---
import ReactButton from '../components/ReactButton.jsx';
import VueWidget from '../components/VueWidget.vue';
---

<!-- 静态 HTML -->
<header>
  <h1>Astro Site</h1>
</header>

<!-- 交互式岛屿 -->
<ReactButton client:load />
<VueWidget client:visible />
```

### 4.2 内容集合
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string())
  })
});

export const collections = { blog };
```

---

## 5. 框架对比

| 特性 | Next.js | Remix | Nuxt | Astro |
|---|---|---|---|---|
| 基础 | React | React | Vue | 多框架 |
| 渲染 | SSR/SSG/ISR | SSR | SSR/SSG | SSG |
| 路由 | 文件/配置 | 文件路由 | 文件路由 | 文件路由 |
| 数据获取 | fetch | loader/action | useFetch | 前端/后端 |
| 适用场景 | 全栈应用 | 数据密集 | Vue 生态 | 内容站 |

---

## 6. 选择指南

### 6.1 决策树
```
使用 Vue?
├─ 是 → Nuxt
└─ 否 → 内容为主?
       ├─ 是 → Astro
       └─ 否 → 数据密集?
              ├─ 是 → Remix
              └─ 否 → Next.js
```

### 6.2 混合使用
```
Next.js (主应用) + Astro (文档/博客) + Remix (特定功能)
```

---

## 7. 相关概念

- [渲染策略](../concepts/rendering-strategies.md)
- [React 核心](../techniques/react-core.md)
- [Vue 核心](../techniques/vue-core.md)
- [前端工程化](../concepts/frontend-engineering.md)
