> **版本**: 16.2.6 | 创建时间: 2026-05-31 | 从 v6.2 升级

---

# 全栈框架

> 前端工程师需要理解服务器、数据库、部署。全栈框架重新定义客户端/服务器边界。

---

## 1. Next.js

### 1.1 App Router
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    &amp;amp;lt;html lang=&amp;amp;quot;zh&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;body&amp;amp;gt;{children}&amp;amp;lt;/body&amp;amp;gt;
    &amp;amp;lt;/html&amp;amp;gt;
  );
}

// app/page.tsx
export default function Home() {
  return &amp;amp;lt;h1&amp;amp;gt;Hello Next.js&amp;amp;lt;/h1&amp;amp;gt;;
}

// app/users/[id]/page.tsx
export default async function UserPage({ params }) {
  const user = await fetch(`https://api.example.com/users/${params.id}`);
  return &amp;amp;lt;div&amp;amp;gt;{user.name}&amp;amp;lt;/div&amp;amp;gt;;
}
```

### 1.2 数据获取
```tsx
// 服务器组件 (默认)
async function getData() {
  const res = await fetch(&amp;amp;#039;https://api.example.com/data&amp;amp;#039;, {
    next: { revalidate: 3600 } // ISR
  });
  return res.json();
}

// 客户端组件
&amp;amp;#039;use client&amp;amp;#039;;

import { useState } from &amp;amp;#039;react&amp;amp;#039;;

function ClientComponent() {
  const [data, setData] = useState(null);
  return &amp;amp;lt;button onClick={() =&amp;amp;gt; fetchData()}&amp;amp;gt;Load&amp;amp;lt;/button&amp;amp;gt;;
}
```

### 1.3 路由与导航
```tsx
import Link from &amp;amp;#039;next/link&amp;amp;#039;;
import { useRouter } from &amp;amp;#039;next/navigation&amp;amp;#039;;

function Navigation() {
  const router = useRouter();
  
  return (
    &amp;amp;lt;nav&amp;amp;gt;
      &amp;amp;lt;Link href=&amp;amp;quot;/about&amp;amp;quot;&amp;amp;gt;About&amp;amp;lt;/Link&amp;amp;gt;
      &amp;amp;lt;button onClick={() =&amp;amp;gt; router.push(&amp;amp;#039;/dashboard&amp;amp;#039;)}&amp;amp;gt;Dashboard&amp;amp;lt;/button&amp;amp;gt;
    &amp;amp;lt;/nav&amp;amp;gt;
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
  return redirect(&amp;amp;#039;/users&amp;amp;#039;);
}

export default function Users() {
  const { users } = useLoaderData&amp;amp;lt;typeof loader&amp;amp;gt;();
  return &amp;amp;lt;ul&amp;amp;gt;{users.map(u =&amp;amp;gt; &amp;amp;lt;li key={u.id}&amp;amp;gt;{u.name}&amp;amp;lt;/li&amp;amp;gt;)}&amp;amp;lt;/ul&amp;amp;gt;;
}
```

### 2.2 表单处理
```tsx
function NewUserForm() {
  return (
    &amp;amp;lt;Form method=&amp;amp;quot;post&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;input name=&amp;amp;quot;name&amp;amp;quot; type=&amp;amp;quot;text&amp;amp;quot; /&amp;amp;gt;
      &amp;amp;lt;button type=&amp;amp;quot;submit&amp;amp;quot;&amp;amp;gt;Create&amp;amp;lt;/button&amp;amp;gt;
    &amp;amp;lt;/Form&amp;amp;gt;
  );
}
```

---

## 3. Nuxt

### 3.1 文件路由
```vue
&amp;amp;lt;!-- pages/index.vue --&amp;amp;gt;
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;h1&amp;amp;gt;&amp;#123;&amp;#123; data.title &amp;#125;&amp;#125;&amp;amp;lt;/h1&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;script setup&amp;amp;gt;
const { data } = await useFetch(&amp;amp;#039;/api/data&amp;amp;#039;);
&amp;amp;lt;/script&amp;amp;gt;
```

### 3.2 自动导入
```vue
&amp;amp;lt;script setup&amp;amp;gt;
// 自动导入 composables
const count = useState(&amp;amp;#039;count&amp;amp;#039;, () =&amp;amp;gt; 0);

// 自动导入组件
// &amp;amp;lt;AppHeader /&amp;amp;gt; 无需导入
&amp;amp;lt;/script&amp;amp;gt;
```

---

## 4. Astro

### 4.1 岛屿架构
```astro
---
import ReactButton from &amp;amp;#039;../components/ReactButton.jsx&amp;amp;#039;;
import VueWidget from &amp;amp;#039;../components/VueWidget.vue&amp;amp;#039;;
---

&amp;amp;lt;!-- 静态 HTML --&amp;amp;gt;
&amp;amp;lt;header&amp;amp;gt;
  &amp;amp;lt;h1&amp;amp;gt;Astro Site&amp;amp;lt;/h1&amp;amp;gt;
&amp;amp;lt;/header&amp;amp;gt;

&amp;amp;lt;!-- 交互式岛屿 --&amp;amp;gt;
&amp;amp;lt;ReactButton client:load /&amp;amp;gt;
&amp;amp;lt;VueWidget client:visible /&amp;amp;gt;
```

### 4.2 内容集合
```typescript
// src/content/config.ts
import { defineCollection, z } from &amp;amp;#039;astro:content&amp;amp;#039;;

const blog = defineCollection({
  type: &amp;amp;#039;content&amp;amp;#039;,
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
