# Vue Ecosystem

> The Vue ecosystem is progressive. Mastering routing, Pinia, and composables matters more than learning every tool.

---

## 1. Routing

### 1.1 Vue Router 4
```vue
<script setup lang="ts">
import { createRouter, createWebHistory } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/users', component: UserList },
    { path: '/users/:id', component: UserDetail }
  ]
});

// In component
const route = useRoute();
const router = useRouter();

console.log(route.params.id);
router.push('/users');
router.replace('/home');
router.go(-1);
</script>
```

### 1.2 Nested Routes
```typescript
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: '', component: Overview },
      { path: 'analytics', component: Analytics },
      { path: 'settings', component: Settings }
    ]
  }
];

// Dashboard.vue
<template>
  <div>
    <Sidebar />
    <main>
      <RouterView /> <!-- Child routes render here -->
    </main>
  </div>
</template>
```

### 1.3 Navigation Guards
```typescript
// Global guard
router.beforeEach((to, from) => {
  const auth = useAuth();
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
});

// Per-route guard
const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from) => {
      if (!checkPermission()) return '/403';
    }
  }
];

// In-component guard
defineOptions({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // Access component instance
    });
  }
});
```

---

## 2. State Management

### 2.1 Pinia
```typescript
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

### 2.2 Usage
```vue
<script setup lang="ts">
import { useTodoStore } from './stores/todo';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore();

// Destructure with storeToRefs to maintain reactivity
const { filteredTodos, doneCount } = storeToRefs(todoStore);
const { addTodo, toggleTodo, deleteTodo } = todoStore;
</script>

<template>
  <div>
    <p>Done: {{ doneCount }}</p>
    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo.id)" />
        <span>{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
```

### 2.3 Persistence
```typescript
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
  const user = ref<User | null>(null);
  
  return { user };
}, {
  persist: {
    key: 'my-app-storage',
    storage: localStorage,
    paths: ['user'] // Only persist user
  }
});
```

---

## 3. Composables

### 3.1 Custom Composables
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
  const value = ref<T>(stored ? JSON.parse(stored) : initialValue);
  
  watch(value, (newVal) => {
    localStorage.setItem(key, JSON.stringify(newVal));
  }, { deep: true });
  
  return value;
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

### 3.2 VueUse
```typescript
import {
  useMouse,
  useLocalStorage,
  useDebounceFn,
  useThrottleFn,
  useIntersectionObserver,
  useMediaQuery
} from '@vueuse/core';

// Mouse tracking
const { x, y } = useMouse();

// Local storage
const theme = useLocalStorage('theme', 'light');

// Debounce
const debouncedSearch = useDebounceFn(search, 300);

// Throttle
const throttledScroll = useThrottleFn(handleScroll, 100);

// Intersection Observer
const { isIntersecting } = useIntersectionObserver(target, {});

// Media query
const isDark = useMediaQuery('(prefers-color-scheme: dark)');
```

---

## 4. UI Component Libraries

### 4.1 Element Plus
```vue
<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref } from 'vue';

const form = ref({
  name: '',
  email: ''
});

const rules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  email: [{ type: 'email', message: 'Invalid email', trigger: 'blur' }]
};

function handleSubmit() {
  ElMessage.success('Submitted!');
}
</script>

<template>
  <el-form :model="form" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-button type="primary" @click="handleSubmit">Submit</el-button>
  </el-form>
</template>
```

### 4.2 Naive UI
```vue
<script setup lang="ts">
import { NButton, NInput, NForm, NFormItem, useMessage } from 'naive-ui';

const message = useMessage();
const formValue = ref({ name: '' });

function handleSubmit() {
  message.success('Submitted!');
}
</script>

<template>
  <n-form :model="formValue">
    <n-form-item label="Name">
      <n-input v-model:value="formValue.name" />
    </n-form-item>
    <n-button type="primary" @click="handleSubmit">Submit</n-button>
  </n-form>
</template>
```

---

## 5. Form Handling

### 5.1 VeeValidate + Yup
```vue
<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
});

const { handleSubmit } = useForm({
  validationSchema: schema
});

const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="email" type="email" />
    <span>{{ emailError }}</span>
    
    <input v-model="password" type="password" />
    <span>{{ passwordError }}</span>
    
    <button type="submit">Login</button>
  </form>
</template>
```

---

## 6. Data Fetching

### 6.1 VueUse useFetch
```typescript
import { useFetch } from '@vueuse/core';

const { data, error, isFetching, execute } = useFetch('/api/users')
  .json()
  .get();

// Manual trigger
const { data, execute } = useFetch('/api/users', { immediate: false });
execute();
```

### 6.2 Vue Query
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';

function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(r => r.json())
  });
}

function useAddTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (text: string) => fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text })
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  });
}
```

---

## 7. Nuxt Ecosystem

### 7.1 Nuxt 3 Core
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  devtools: { enabled: true },
  ssr: true
});

// Auto-imports
// No need to import ref, computed, useFetch, etc.

// pages/index.vue
<script setup lang="ts">
const { data: users } = await useFetch('/api/users');
</script>

<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>
```

### 7.2 Middleware
```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  
  if (!auth.isAuthenticated) {
    return navigateTo('/login');
  }
});

// Usage
definePageMeta({
  middleware: 'auth'
});
```

---

## 8. Testing

### 8.1 Vitest + Vue Test Utils
```typescript
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Counter from './Counter.vue';

describe('Counter', () => {
  it('increments on click', async () => {
    const wrapper = mount(Counter);
    
    expect(wrapper.text()).toContain('0');
    
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('1');
  });
});
```

### 8.2 Playwright E2E
```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

---

## 9. Related Concepts

- [Vue Core](../techniques/vue-core.en.md)
- [Component Architecture](../concepts/component-architecture.en.md)
- [State Management](../concepts/state-management.en.md)
- [Full-stack Frameworks](fullstack-frameworks.en.md)
