# Vue Ecosystem

> The Vue ecosystem is progressive. Mastering routing, Pinia, and composables matters more than learning every tool.

---

## 1. Routing

### 1.1 Vue Router 4
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { createRouter, createWebHistory } from &amp;amp;#039;vue-router&amp;amp;#039;;
import { useRoute, useRouter } from &amp;amp;#039;vue-router&amp;amp;#039;;

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: &amp;amp;#039;/&amp;amp;#039;, component: Home },
    { path: &amp;amp;#039;/users&amp;amp;#039;, component: UserList },
    { path: &amp;amp;#039;/users/:id&amp;amp;#039;, component: UserDetail }
  ]
});

// In component
const route = useRoute();
const router = useRouter();

console.log(route.params.id);
router.push(&amp;amp;#039;/users&amp;amp;#039;);
router.replace(&amp;amp;#039;/home&amp;amp;#039;);
router.go(-1);
&amp;amp;lt;/script&amp;amp;gt;
```

### 1.2 Nested Routes
```typescript
const routes = [
  {
    path: &amp;amp;#039;/dashboard&amp;amp;#039;,
    component: Dashboard,
    children: [
      { path: &amp;amp;#039;&amp;amp;#039;, component: Overview },
      { path: &amp;amp;#039;analytics&amp;amp;#039;, component: Analytics },
      { path: &amp;amp;#039;settings&amp;amp;#039;, component: Settings }
    ]
  }
];

// Dashboard.vue
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;Sidebar /&amp;amp;gt;
    &amp;amp;lt;main&amp;amp;gt;
      &amp;amp;lt;RouterView /&amp;amp;gt; &amp;amp;lt;!-- Child routes render here --&amp;amp;gt;
    &amp;amp;lt;/main&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 1.3 Navigation Guards
```typescript
// Global guard
router.beforeEach((to, from) =&amp;amp;gt; {
  const auth = useAuth();
  
  if (to.meta.requiresAuth &amp;amp;amp;&amp;amp;amp; !auth.isAuthenticated) {
    return { path: &amp;amp;#039;/login&amp;amp;#039;, query: { redirect: to.fullPath } };
  }
});

// Per-route guard
const routes = [
  {
    path: &amp;amp;#039;/dashboard&amp;amp;#039;,
    component: Dashboard,
    beforeEnter: (to, from) =&amp;amp;gt; {
      if (!checkPermission()) return &amp;amp;#039;/403&amp;amp;#039;;
    }
  }
];

// In-component guard
defineOptions({
  beforeRouteEnter(to, from, next) {
    next(vm =&amp;amp;gt; {
      // Access component instance
    });
  }
});
```

---

## 2. State Management

### 2.1 Pinia
```typescript
import { defineStore } from &amp;amp;#039;pinia&amp;amp;#039;;
import { ref, computed } from &amp;amp;#039;vue&amp;amp;#039;;

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export const useTodoStore = defineStore(&amp;amp;#039;todo&amp;amp;#039;, () =&amp;amp;gt; {
  // State
  const todos = ref&amp;amp;lt;Todo[]&amp;amp;gt;([]);
  const filter = ref&amp;amp;lt;&amp;amp;#039;all&amp;amp;#039; | &amp;amp;#039;active&amp;amp;#039; | &amp;amp;#039;done&amp;amp;#039;&amp;amp;gt;(&amp;amp;#039;all&amp;amp;#039;);
  
  // Getters
  const filteredTodos = computed(() =&amp;amp;gt; {
    switch (filter.value) {
      case &amp;amp;#039;active&amp;amp;#039;: return todos.value.filter(t =&amp;amp;gt; !t.done);
      case &amp;amp;#039;done&amp;amp;#039;: return todos.value.filter(t =&amp;amp;gt; t.done);
      default: return todos.value;
    }
  });
  
  const doneCount = computed(() =&amp;amp;gt; 
    todos.value.filter(t =&amp;amp;gt; t.done).length
  );
  
  // Actions
  async function addTodo(text: string) {
    const todo = await api.createTodo({ text });
    todos.value.push(todo);
  }
  
  function toggleTodo(id: string) {
    const todo = todos.value.find(t =&amp;amp;gt; t.id === id);
    if (todo) todo.done = !todo.done;
  }
  
  async function deleteTodo(id: string) {
    await api.deleteTodo(id);
    todos.value = todos.value.filter(t =&amp;amp;gt; t.id !== id);
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
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { useTodoStore } from &amp;amp;#039;./stores/todo&amp;amp;#039;;
import { storeToRefs } from &amp;amp;#039;pinia&amp;amp;#039;;

const todoStore = useTodoStore();

// Destructure with storeToRefs to maintain reactivity
const { filteredTodos, doneCount } = storeToRefs(todoStore);
const { addTodo, toggleTodo, deleteTodo } = todoStore;
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;Done: &amp;#123;&amp;#123; doneCount &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
    &amp;amp;lt;ul&amp;amp;gt;
      &amp;amp;lt;li v-for=&amp;amp;quot;todo in filteredTodos&amp;amp;quot; :key=&amp;amp;quot;todo.id&amp;amp;quot;&amp;amp;gt;
        &amp;amp;lt;input type=&amp;amp;quot;checkbox&amp;amp;quot; :checked=&amp;amp;quot;todo.done&amp;amp;quot; @change=&amp;amp;quot;toggleTodo(todo.id)&amp;amp;quot; /&amp;amp;gt;
        &amp;amp;lt;span&amp;amp;gt;&amp;#123;&amp;#123; todo.text &amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;
        &amp;amp;lt;button @click=&amp;amp;quot;deleteTodo(todo.id)&amp;amp;quot;&amp;amp;gt;Delete&amp;amp;lt;/button&amp;amp;gt;
      &amp;amp;lt;/li&amp;amp;gt;
    &amp;amp;lt;/ul&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 2.3 Persistence
```typescript
import { defineStore } from &amp;amp;#039;pinia&amp;amp;#039;;
import { ref } from &amp;amp;#039;vue&amp;amp;#039;;

export const useStore = defineStore(&amp;amp;#039;main&amp;amp;#039;, () =&amp;amp;gt; {
  const user = ref&amp;amp;lt;User | null&amp;amp;gt;(null);
  
  return { user };
}, {
  persist: {
    key: &amp;amp;#039;my-app-storage&amp;amp;#039;,
    storage: localStorage,
    paths: [&amp;amp;#039;user&amp;amp;#039;] // Only persist user
  }
});
```

---

## 3. Composables

### 3.1 Custom Composables
```typescript
// composables/useFetch.ts
export function useFetch&amp;amp;lt;T&amp;amp;gt;(url: MaybeRefOrGetter&amp;amp;lt;string&amp;amp;gt;) {
  const data = ref&amp;amp;lt;T | null&amp;amp;gt;(null);
  const error = ref&amp;amp;lt;Error | null&amp;amp;gt;(null);
  const loading = ref(true);
  
  watch(
    toGetter(url),
    async (url) =&amp;amp;gt; {
      loading.value = true;
      error.value = null;
      try {
        data.value = await fetch(url).then(r =&amp;amp;gt; r.json());
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
export function useLocalStorage&amp;amp;lt;T&amp;amp;gt;(key: string, initialValue: T) {
  const stored = localStorage.getItem(key);
  const value = ref&amp;amp;lt;T&amp;amp;gt;(stored ? JSON.parse(stored) : initialValue);
  
  watch(value, (newVal) =&amp;amp;gt; {
    localStorage.setItem(key, JSON.stringify(newVal));
  }, { deep: true });
  
  return value;
}

// composables/useMouse.ts
export function useMouse() {
  const x = ref(0);
  const y = ref(0);
  
  onMounted(() =&amp;amp;gt; {
    window.addEventListener(&amp;amp;#039;mousemove&amp;amp;#039;, (e) =&amp;amp;gt; {
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
} from &amp;amp;#039;@vueuse/core&amp;amp;#039;;

// Mouse tracking
const { x, y } = useMouse();

// Local storage
const theme = useLocalStorage(&amp;amp;#039;theme&amp;amp;#039;, &amp;amp;#039;light&amp;amp;#039;);

// Debounce
const debouncedSearch = useDebounceFn(search, 300);

// Throttle
const throttledScroll = useThrottleFn(handleScroll, 100);

// Intersection Observer
const { isIntersecting } = useIntersectionObserver(target, {});

// Media query
const isDark = useMediaQuery(&amp;amp;#039;(prefers-color-scheme: dark)&amp;amp;#039;);
```

---

## 4. UI Component Libraries

### 4.1 Element Plus
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ElMessage, ElMessageBox } from &amp;amp;#039;element-plus&amp;amp;#039;;
import { ref } from &amp;amp;#039;vue&amp;amp;#039;;

const form = ref({
  name: &amp;amp;#039;&amp;amp;#039;,
  email: &amp;amp;#039;&amp;amp;#039;
});

const rules = {
  name: [{ required: true, message: &amp;amp;#039;Name is required&amp;amp;#039;, trigger: &amp;amp;#039;blur&amp;amp;#039; }],
  email: [{ type: &amp;amp;#039;email&amp;amp;#039;, message: &amp;amp;#039;Invalid email&amp;amp;#039;, trigger: &amp;amp;#039;blur&amp;amp;#039; }]
};

function handleSubmit() {
  ElMessage.success(&amp;amp;#039;Submitted!&amp;amp;#039;);
}
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;el-form :model=&amp;amp;quot;form&amp;amp;quot; :rules=&amp;amp;quot;rules&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;el-form-item label=&amp;amp;quot;Name&amp;amp;quot; prop=&amp;amp;quot;name&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;el-input v-model=&amp;amp;quot;form.name&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;/el-form-item&amp;amp;gt;
    &amp;amp;lt;el-form-item label=&amp;amp;quot;Email&amp;amp;quot; prop=&amp;amp;quot;email&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;el-input v-model=&amp;amp;quot;form.email&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;/el-form-item&amp;amp;gt;
    &amp;amp;lt;el-button type=&amp;amp;quot;primary&amp;amp;quot; @click=&amp;amp;quot;handleSubmit&amp;amp;quot;&amp;amp;gt;Submit&amp;amp;lt;/el-button&amp;amp;gt;
  &amp;amp;lt;/el-form&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 4.2 Naive UI
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { NButton, NInput, NForm, NFormItem, useMessage } from &amp;amp;#039;naive-ui&amp;amp;#039;;

const message = useMessage();
const formValue = ref({ name: &amp;amp;#039;&amp;amp;#039; });

function handleSubmit() {
  message.success(&amp;amp;#039;Submitted!&amp;amp;#039;);
}
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;n-form :model=&amp;amp;quot;formValue&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;n-form-item label=&amp;amp;quot;Name&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;n-input v-model:value=&amp;amp;quot;formValue.name&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;/n-form-item&amp;amp;gt;
    &amp;amp;lt;n-button type=&amp;amp;quot;primary&amp;amp;quot; @click=&amp;amp;quot;handleSubmit&amp;amp;quot;&amp;amp;gt;Submit&amp;amp;lt;/n-button&amp;amp;gt;
  &amp;amp;lt;/n-form&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

---

## 5. Form Handling

### 5.1 VeeValidate + Yup
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { useForm, useField } from &amp;amp;#039;vee-validate&amp;amp;#039;;
import * as yup from &amp;amp;#039;yup&amp;amp;#039;;

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required()
});

const { handleSubmit } = useForm({
  validationSchema: schema
});

const { value: email, errorMessage: emailError } = useField(&amp;amp;#039;email&amp;amp;#039;);
const { value: password, errorMessage: passwordError } = useField(&amp;amp;#039;password&amp;amp;#039;);

const onSubmit = handleSubmit((values) =&amp;amp;gt; {
  console.log(values);
});
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;form @submit=&amp;amp;quot;onSubmit&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;input v-model=&amp;amp;quot;email&amp;amp;quot; type=&amp;amp;quot;email&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;span&amp;amp;gt;&amp;#123;&amp;#123; emailError &amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;
    
    &amp;amp;lt;input v-model=&amp;amp;quot;password&amp;amp;quot; type=&amp;amp;quot;password&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;span&amp;amp;gt;&amp;#123;&amp;#123; passwordError &amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;
    
    &amp;amp;lt;button type=&amp;amp;quot;submit&amp;amp;quot;&amp;amp;gt;Login&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/form&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

---

## 6. Data Fetching

### 6.1 VueUse useFetch
```typescript
import { useFetch } from &amp;amp;#039;@vueuse/core&amp;amp;#039;;

const { data, error, isFetching, execute } = useFetch(&amp;amp;#039;/api/users&amp;amp;#039;)
  .json()
  .get();

// Manual trigger
const { data, execute } = useFetch(&amp;amp;#039;/api/users&amp;amp;#039;, { immediate: false });
execute();
```

### 6.2 Vue Query
```typescript
import { useQuery, useMutation, useQueryClient } from &amp;amp;#039;@tanstack/vue-query&amp;amp;#039;;

function useTodos() {
  return useQuery({
    queryKey: [&amp;amp;#039;todos&amp;amp;#039;],
    queryFn: () =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;).then(r =&amp;amp;gt; r.json())
  });
}

function useAddTodo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (text: string) =&amp;amp;gt; fetch(&amp;amp;#039;/api/todos&amp;amp;#039;, {
      method: &amp;amp;#039;POST&amp;amp;#039;,
      body: JSON.stringify({ text })
    }),
    onSuccess: () =&amp;amp;gt; {
      queryClient.invalidateQueries({ queryKey: [&amp;amp;#039;todos&amp;amp;#039;] });
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
  modules: [&amp;amp;#039;@nuxtjs/tailwindcss&amp;amp;#039;, &amp;amp;#039;@pinia/nuxt&amp;amp;#039;],
  devtools: { enabled: true },
  ssr: true
});

// Auto-imports
// No need to import ref, computed, useFetch, etc.

// pages/index.vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
const { data: users } = await useFetch(&amp;amp;#039;/api/users&amp;amp;#039;);
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;h1&amp;amp;gt;Users&amp;amp;lt;/h1&amp;amp;gt;
    &amp;amp;lt;ul&amp;amp;gt;
      &amp;amp;lt;li v-for=&amp;amp;quot;user in users&amp;amp;quot; :key=&amp;amp;quot;user.id&amp;amp;quot;&amp;amp;gt;&amp;#123;&amp;#123; user.name &amp;#125;&amp;#125;&amp;amp;lt;/li&amp;amp;gt;
    &amp;amp;lt;/ul&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 7.2 Middleware
```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) =&amp;amp;gt; {
  const auth = useAuth();
  
  if (!auth.isAuthenticated) {
    return navigateTo(&amp;amp;#039;/login&amp;amp;#039;);
  }
});

// Usage
definePageMeta({
  middleware: &amp;amp;#039;auth&amp;amp;#039;
});
```

---

## 8. Testing

### 8.1 Vitest + Vue Test Utils
```typescript
import { describe, it, expect } from &amp;amp;#039;vitest&amp;amp;#039;;
import { mount } from &amp;amp;#039;@vue/test-utils&amp;amp;#039;;
import Counter from &amp;amp;#039;./Counter.vue&amp;amp;#039;;

describe(&amp;amp;#039;Counter&amp;amp;#039;, () =&amp;amp;gt; {
  it(&amp;amp;#039;increments on click&amp;amp;#039;, async () =&amp;amp;gt; {
    const wrapper = mount(Counter);
    
    expect(wrapper.text()).toContain(&amp;amp;#039;0&amp;amp;#039;);
    
    await wrapper.find(&amp;amp;#039;button&amp;amp;#039;).trigger(&amp;amp;#039;click&amp;amp;#039;);
    expect(wrapper.text()).toContain(&amp;amp;#039;1&amp;amp;#039;);
  });
});
```

### 8.2 Playwright E2E
```typescript
import { test, expect } from &amp;amp;#039;@playwright/test&amp;amp;#039;;

test(&amp;amp;#039;user can login&amp;amp;#039;, async ({ page }) =&amp;amp;gt; {
  await page.goto(&amp;amp;#039;/login&amp;amp;#039;);
  await page.fill(&amp;amp;#039;[name=&amp;amp;quot;email&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;user@example.com&amp;amp;#039;);
  await page.fill(&amp;amp;#039;[name=&amp;amp;quot;password&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;password&amp;amp;#039;);
  await page.click(&amp;amp;#039;button[type=&amp;amp;quot;submit&amp;amp;quot;]&amp;amp;#039;);
  await expect(page).toHaveURL(&amp;amp;#039;/dashboard&amp;amp;#039;);
});
```

---

## 9. Related Concepts

- [Vue Core](../techniques/vue-core.en.md)
- [Component Architecture](../concepts/component-architecture.en.md)
- [State Management](../concepts/state-management.en.md)
- [Full-stack Frameworks](fullstack-frameworks.en.md)
