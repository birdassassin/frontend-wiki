# Vue 生态

> Vue 是渐进式框架，生态完整且统一。理解 Vue 生态比学习多个库更高效。

---

## 1. 路由

### 1.1 Vue Router 4

```vue
<!-- router/index.ts -->
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/users',
    name: 'UserList',
    component: () => import('@/views/UserList.vue')
  },
  {
    path: '/users/:id',
    name: 'UserDetail',
    component: () => import('@/views/UserDetail.vue'),
    props: true
  },
  {
    path: '/admin',
    component: () => import('@/views/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('@/views/AdminDashboard.vue') },
      { path: 'settings', component: () => import('@/views/AdminSettings.vue') }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  }
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
```

### 1.2 路由使用

```vue
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 路由参数
const userId = route.params.id;

// 查询参数
const page = route.query.page;

// 编程式导航
function goToUser(id: string) {
  router.push({ name: 'UserDetail', params: { id } });
}

// 替换历史
function replace(path: string) {
  router.replace(path);
}

// 前进后退
router.go(-1);
router.forward();
</script>

<template>
  <nav>
    <router-link to="/">首页</router-link>
    <router-link :to="{ name: 'UserList' }">用户列表</router-link>
    <router-link :to="{ path: '/users/1' }">用户 1</router-link>
  </nav>
  
  <router-view />
</template>
```

### 1.3 导航守卫

```typescript
// 全局守卫
router.beforeEach((to, from) => { /* ... */ });
router.afterEach((to, from) => { /* ... */ });

// 路由独享守卫
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from) => { /* ... */ }
  }
];

// 组件内守卫
defineOptions({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 vm 访问组件实例
    });
  },
  beforeRouteUpdate(to, from) {
    // 路由更新时
  },
  beforeRouteLeave(to, from) {
    // 离开时
    const answer = window.confirm('确定离开？未保存的更改会丢失');
    if (!answer) return false;
  }
});
```

---

## 2. 状态管理

### 2.1 Pinia (官方推荐)

```typescript
// stores/todo.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export const useTodoStore = defineStore('todo', () => {
  // State
  const todos = ref<Todo[]>([]);
  const filter = ref<'all' | 'active' | 'done'>('all');
  
  // Getters
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active': return todos.value.filter(t => !t.done);
      case 'done': return todos.value.filter(t => t.done);
      default: return todos.value;
    }
  });
  
  const doneCount = computed(() => 
    todos.value.filter(t => t.done).length
  );
  
  // Actions
  async function addTodo(text: string) {
    const todo = await api.createTodo({ text });
    todos.value.push(todo);
  }
  
  function toggleTodo(id: string) {
    const todo = todos.value.find(t => t.id === id);
    if (todo) todo.done = !todo.done;
  }
  
  async function deleteTodo(id: string) {
    await api.deleteTodo(id);
    todos.value = todos.value.filter(t => t.id !== id);
  }
  
  async function fetchTodos() {
    todos.value = await api.getTodos();
  }
  
  return {
    todos,
    filter,
    filteredTodos,
    doneCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    fetchTodos
  };
});
```

### 2.2 选项式 API

```typescript
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    filter: 'all' as 'all' | 'active' | 'done'
  }),
  getters: {
    filteredTodos: (state) => {
      switch (state.filter) {
        case 'active': return state.todos.filter(t => !t.done);
        case 'done': return state.todos.filter(t => t.done);
        default: return state.todos;
      }
    },
    doneCount: (state) => state.todos.filter(t => t.done).length
  },
  actions: {
    async fetchTodos() {
      this.todos = await api.getTodos();
    },
    addTodo(text: string) {
      this.todos.push({ id: Date.now().toString(), text, done: false });
    },
    toggleTodo(id: string) {
      const todo = this.todos.find(t => t.id === id);
      if (todo) todo.done = !todo.done;
    }
  }
});
```

### 2.3 Store 使用

```vue
<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore();

// 访问 state
console.log(todoStore.todos);

// 访问 getters
console.log(todoStore.filteredTodos);

// 调用 actions
todoStore.addTodo('新任务');

// 解构 (需要 storeToRefs)
import { storeToRefs } from 'pinia';
const { todos, filteredTodos } = storeToRefs(todoStore);
const { addTodo, toggleTodo } = todoStore;
</script>

<template>
  <div>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input 
          type="checkbox" 
          :checked="todo.done" 
          @change="toggleTodo(todo.id)"
        >
        <span :class="{ done: todo.done }">&amp;#123;&amp;#123; todo.text &amp;#125;&amp;#125;</span>
      </li>
    </ul>
    <button @click="addTodo('新任务')">添加</button>
  </div>
</template>
```

### 2.4 其他状态管理方案

| 方案 | 特点 | 适用场景 |
|---|---|---|
| **Pinia** | 官方推荐，类型安全 | 所有新项目 |
| **Vuex** | 传统方案，Vue 2 | 老项目维护 |
| **VueUse useStorage** | 简单状态 | 本地存储 |
| **Provide/Inject** | 内置依赖注入 | 组件树传递 |

---

## 3. 组合式函数 (Composables)

### 3.1 自定义 Composables

```typescript
// composables/useFetch.ts
export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);
  
  watch(
    toGetter(url),
    async (url) => {
      loading.value = true;
      error.value = null;
      try {
        data.value = await fetch(url).then(r => r.json());
      } catch (e) {
        error.value = e as Error;
      } finally {
        loading.value = false;
      }
    },
    { immediate: true }
  );
  
  return { data, error, loading };
}

// composables/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const stored = localStorage.getItem(key);
  const data = ref<T>(stored ? JSON.parse(stored) : initialValue);
  
  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val));
  }, { deep: true });
  
  return data;
}

// composables/useMouse.ts
export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  
  onMounted(() => {
    window.addEventListener('mousemove', (e) => {
      x.value = e.clientX;
      y.value = e.clientY;
    });
  });
  
  return { x, y };
}
```

### 3.2 使用 Composables

```vue
<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import { useMouse } from '@/composables/useMouse';

const { data: users, loading, error } = useFetch<User[]>('/api/users');
const { x, y } = useMouse();
</script>

<template>
  <div>
    <p>鼠标位置: &amp;#123;&amp;#123; x &amp;#125;&amp;#125;, &amp;#123;&amp;#123; y &amp;#125;&amp;#125;</p>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">加载失败</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">&amp;#123;&amp;#123; user.name &amp;#125;&amp;#125;</li>
    </ul>
  </div>
</template>
```

---

## 4. UI 组件库

### 4.1 主流组件库对比

| 库 | 风格 | 大小 | 特点 | 适用场景 |
|---|---|---|---|---|
| **Element Plus** | 企业级 | 大 | 中文文档，组件全 | 后台管理系统 |
| **Ant Design Vue** | 企业级 | 大 | Ant Design 风格 | 企业应用 |
| **Naive UI** | 现代 | 中 | TypeScript，主题灵活 | 新项目 |
| **Vuetify** | Material | 大 | Material Design | Material 风格 |
| **PrimeVue** | 丰富 | 中 | 组件多，主题多 | 全功能应用 |
| **Radix Vue** | 无头 | 按需 | 无障碍，可控 | 自定义设计 |

### 4.2 Element Plus 示例

```vue
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

const formRef = ref<FormInstance>();
const form = ref({
  name: '',
  email: '',
  password: ''
});

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码至少 8 位', trigger: 'blur' }
  ]
};

async function handleSubmit() {
  if (!formRef.value) return;
  
  await formRef.value.validate();
  
  try {
    await api.register(form.value);
    ElMessage.success('注册成功');
  } catch {
    ElMessage.error('注册失败');
  }
}

function handleDelete(id: string) {
  ElMessageBox.confirm('确定删除？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await api.delete(id);
    ElMessage.success('删除成功');
  });
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>
```

### 4.3 Naive UI 示例

```vue
<script setup lang="ts">
import { useMessage, useDialog } from 'naive-ui';

const message = useMessage();
const dialog = useDialog();

function showSuccess() {
  message.success('操作成功');
}

function showConfirm() {
  dialog.warning({
    title: '确认',
    content: '确定要删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      // 删除逻辑
      message.success('已删除');
    }
  });
}
</script>

<template>
  <n-config-provider>
    <n-message-provider>
      <n-dialog-provider>
        <App />
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
```

---

## 5. 表单处理

### 5.1 VeeValidate

```vue
<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('邮箱格式不正确').required('邮箱必填'),
  password: yup.string().min(8, '密码至少 8 位').required('密码必填'),
  age: yup.number().min(18).max(100).required()
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema
});

const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const onSubmit = handleSubmit(async (values) => {
  await api.register(values);
});
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="email" name="email" type="email" />
    <span>&amp;#123;&amp;#123; emailError &amp;#125;&amp;#125;</span>
    
    <input v-model="password" name="password" type="password" />
    <span>&amp;#123;&amp;#123; passwordError &amp;#125;&amp;#125;</span>
    
    <button type="submit">注册</button>
  </form>
</template>
```

### 5.2 FormKit

```vue
<script setup lang="ts">
import { createFormKit } from '@formkit/vue';

const config = {
  rules: {
    email: (value: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '邮箱格式不正确';
    }
  }
};
</script>

<template>
  <FormKit
    type="form"
    :actions="false"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      name="email"
      label="邮箱"
      validation="required|email"
    />
    <FormKit
      type="password"
      name="password"
      label="密码"
      validation="required|min:8"
    />
    <FormKit type="submit" label="注册" />
  </FormKit>
</template>
```

---

## 6. 数据获取

### 6.1 VueUse useFetch

```typescript
import { useFetch } from '@vueuse/core';

const { data, error, isFetching, execute } = useFetch('/api/users')
  .get()
  .json();

// 手动触发
execute();

// 带参数
const { data } = useFetch(() => `/api/users/${userId}`)
  .get()
  .json();
```

### 6.2 Vue Query (TanStack Query)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();

// 查询
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json())
});

// 分页
const { data } = useQuery({
  queryKey: ['users', page],
  queryFn: () => fetch(`/api/users?page=${page.value}`).then(r => r.json())
});

// Mutation
const mutation = useMutation({
  mutationFn: (newUser) => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(newUser)
  }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
});

// 使用
mutation.mutate({ name: 'Alice' });
```

### 6.3 Axios 封装

```typescript
// utils/request.ts
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      const userStore = useUserStore();
      userStore.logout();
      useRouter().push('/login');
    }
    return Promise.reject(error);
  }
);

export default request;
```

---

## 7. 工具库

### 7.1 VueUse

```typescript
import {
  useLocalStorage,
  useMouse,
  useWindowSize,
  useDark,
  useToggle,
  useDebounceFn,
  useThrottleFn,
  useClipboard,
  useMediaQuery
} from '@vueuse/core';

// 本地存储
const user = useLocalStorage('user', { name: '' });

// 鼠标位置
const { x, y } = useMouse();

// 窗口大小
const { width, height } = useWindowSize();

// 暗黑模式
const isDark = useDark();
const toggleDark = useToggle(isDark);

// 防抖函数
const search = useDebounceFn((query) => {
  fetchResults(query);
}, 300);

// 剪贴板
const { copy, copied } = useClipboard();

// 媒体查询
const isMobile = useMediaQuery('(max-width: 768px)');
```

### 7.2 日期处理

```typescript
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

dayjs().format('YYYY-MM-DD HH:mm');
dayjs('2024-01-01').fromNow(); // 3 个月前
```

### 7.3 动画

| 库 | 特点 |
|---|---|
| **Vue Transition** | 内置，简单动画 |
| **Motion One** | VueUse 推荐，Web Animations API |
| **GSAP** | 专业动画 |

```vue
<!-- 内置 Transition -->
<template>
  <Transition name="fade" mode="out-in">
    <component :is="currentComponent" />
  </Transition>
  
  <TransitionGroup name="list">
    <li v-for="item in items" :key="item.id">&amp;#123;&amp;#123; item.text &amp;#125;&amp;#125;</li>
  </TransitionGroup>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

---

## 8. 开发工具

### 8.1 Vue DevTools

- **Components 面板**：组件树、Props、State
- **Timeline 面板**：性能分析、事件追踪
- **安装**：Chrome/Firefox 扩展

### 8.2 Volar / Vue Language Tools

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vue"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

```vue
<!-- 推荐脚本标签格式 -->
<script setup lang="ts">
// 完整的类型推断
</script>
```

### 8.3 ESLint 配置

```bash
npm install -D eslint-plugin-vue @vue/eslint-config-typescript
```

```javascript
// eslint.config.js
import pluginVue from 'eslint-plugin-vue';
import ts from '@vue/eslint-config-typescript';

export default [
  ...pluginVue.configs['flat/recommended'],
  ...ts()
];
```

---

## 9. 测试

### 9.1 Vitest + Vue Test Utils

```typescript
// components/TodoItem.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoItem from './TodoItem.vue';

describe('TodoItem', () => {
  it('渲染待办文本', () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { id: '1', text: '测试任务', done: false }
      }
    });
    
    expect(wrapper.text()).toContain('测试任务');
  });
  
  it('点击复选框触发 toggle', async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { id: '1', text: '测试任务', done: false }
      }
    });
    
    await wrapper.find('input[type="checkbox"]').trigger('change');
    
    expect(wrapper.emitted('toggle')).toBeTruthy();
  });
});
```

### 9.2 组件测试 (Cypress/Playwright)

```typescript
// tests/e2e/todo.spec.ts
import { test, expect } from '@playwright/test';

test('可以添加待办事项', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('[placeholder="添加待办"]', '学习 Vue');
  await page.click('button:has-text("添加")');
  
  await expect(page.getByText('学习 Vue')).toBeVisible();
});
```

---

## 10. Nuxt 生态

### 10.1 Nuxt 3 核心

```vue
<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<!-- pages/index.vue -->
<script setup lang="ts">
// 自动导入
const { data: users } = await useFetch('/api/users');

// 状态管理
const count = useState('count', () => 0);

// 路由
const router = useRouter();
const route = useRoute();

// SEO
useHead({
  title: '首页',
  meta: [{ name: 'description', content: '描述' }]
});
</script>
```

### 10.2 Nuxt 模块

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],
  
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh'
  }
});
```

---

## 11. 相关概念

- [Vue 核心](../techniques/vue-core.md)
- [组件架构](../concepts/component-architecture.md)
- [状态管理](../concepts/state-management.md)
- [全栈框架](../tools/fullstack-frameworks.md)
- [测试策略](../concepts/testing-strategies.md)
