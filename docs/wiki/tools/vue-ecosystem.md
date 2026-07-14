# Vue 生态

> Vue 是渐进式框架，生态完整且统一。理解 Vue 生态比学习多个库更高效。

---

## 1. 路由

### 1.1 Vue Router 4

```vue
&amp;amp;lt;!-- router/index.ts --&amp;amp;gt;
import { createRouter, createWebHistory, RouteRecordRaw } from &amp;amp;#039;vue-router&amp;amp;#039;;

const routes: RouteRecordRaw[] = [
  {
    path: &amp;amp;#039;/&amp;amp;#039;,
    name: &amp;amp;#039;Home&amp;amp;#039;,
    component: () =&amp;amp;gt; import(&amp;amp;#039;@/views/Home.vue&amp;amp;#039;)
  },
  {
    path: &amp;amp;#039;/users&amp;amp;#039;,
    name: &amp;amp;#039;UserList&amp;amp;#039;,
    component: () =&amp;amp;gt; import(&amp;amp;#039;@/views/UserList.vue&amp;amp;#039;)
  },
  {
    path: &amp;amp;#039;/users/:id&amp;amp;#039;,
    name: &amp;amp;#039;UserDetail&amp;amp;#039;,
    component: () =&amp;amp;gt; import(&amp;amp;#039;@/views/UserDetail.vue&amp;amp;#039;),
    props: true
  },
  {
    path: &amp;amp;#039;/admin&amp;amp;#039;,
    component: () =&amp;amp;gt; import(&amp;amp;#039;@/views/AdminLayout.vue&amp;amp;#039;),
    meta: { requiresAuth: true },
    children: [
      { path: &amp;amp;#039;&amp;amp;#039;, component: () =&amp;amp;gt; import(&amp;amp;#039;@/views/AdminDashboard.vue&amp;amp;#039;) },
      { path: &amp;amp;#039;settings&amp;amp;#039;, component: () =&amp;amp;gt; import(&amp;amp;#039;@/views/AdminSettings.vue&amp;amp;#039;) }
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
router.beforeEach((to, from, next) =&amp;amp;gt; {
  if (to.meta.requiresAuth &amp;amp;amp;&amp;amp;amp; !isAuthenticated()) {
    next({ name: &amp;amp;#039;Login&amp;amp;#039;, query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
```

### 1.2 路由使用

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { useRoute, useRouter } from &amp;amp;#039;vue-router&amp;amp;#039;;

const route = useRoute();
const router = useRouter();

// 路由参数
const userId = route.params.id;

// 查询参数
const page = route.query.page;

// 编程式导航
function goToUser(id: string) {
  router.push({ name: &amp;amp;#039;UserDetail&amp;amp;#039;, params: { id } });
}

// 替换历史
function replace(path: string) {
  router.replace(path);
}

// 前进后退
router.go(-1);
router.forward();
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;nav&amp;amp;gt;
    &amp;amp;lt;router-link to=&amp;amp;quot;/&amp;amp;quot;&amp;amp;gt;首页&amp;amp;lt;/router-link&amp;amp;gt;
    &amp;amp;lt;router-link :to=&amp;amp;quot;{ name: &amp;amp;#039;UserList&amp;amp;#039; }&amp;amp;quot;&amp;amp;gt;用户列表&amp;amp;lt;/router-link&amp;amp;gt;
    &amp;amp;lt;router-link :to=&amp;amp;quot;{ path: &amp;amp;#039;/users/1&amp;amp;#039; }&amp;amp;quot;&amp;amp;gt;用户 1&amp;amp;lt;/router-link&amp;amp;gt;
  &amp;amp;lt;/nav&amp;amp;gt;
  
  &amp;amp;lt;router-view /&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 1.3 导航守卫

```typescript
// 全局守卫
router.beforeEach((to, from) =&amp;amp;gt; { /* ... */ });
router.afterEach((to, from) =&amp;amp;gt; { /* ... */ });

// 路由独享守卫
const routes = [
  {
    path: &amp;amp;#039;/admin&amp;amp;#039;,
    component: Admin,
    beforeEnter: (to, from) =&amp;amp;gt; { /* ... */ }
  }
];

// 组件内守卫
defineOptions({
  beforeRouteEnter(to, from, next) {
    next(vm =&amp;amp;gt; {
      // 通过 vm 访问组件实例
    });
  },
  beforeRouteUpdate(to, from) {
    // 路由更新时
  },
  beforeRouteLeave(to, from) {
    // 离开时
    const answer = window.confirm(&amp;amp;#039;确定离开？未保存的更改会丢失&amp;amp;#039;);
    if (!answer) return false;
  }
});
```

---

## 2. 状态管理

### 2.1 Pinia (官方推荐)

```typescript
// stores/todo.ts
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

### 2.2 选项式 API

```typescript
export const useTodoStore = defineStore(&amp;amp;#039;todo&amp;amp;#039;, {
  state: () =&amp;amp;gt; ({
    todos: [] as Todo[],
    filter: &amp;amp;#039;all&amp;amp;#039; as &amp;amp;#039;all&amp;amp;#039; | &amp;amp;#039;active&amp;amp;#039; | &amp;amp;#039;done&amp;amp;#039;
  }),
  getters: {
    filteredTodos: (state) =&amp;amp;gt; {
      switch (state.filter) {
        case &amp;amp;#039;active&amp;amp;#039;: return state.todos.filter(t =&amp;amp;gt; !t.done);
        case &amp;amp;#039;done&amp;amp;#039;: return state.todos.filter(t =&amp;amp;gt; t.done);
        default: return state.todos;
      }
    },
    doneCount: (state) =&amp;amp;gt; state.todos.filter(t =&amp;amp;gt; t.done).length
  },
  actions: {
    async fetchTodos() {
      this.todos = await api.getTodos();
    },
    addTodo(text: string) {
      this.todos.push({ id: Date.now().toString(), text, done: false });
    },
    toggleTodo(id: string) {
      const todo = this.todos.find(t =&amp;amp;gt; t.id === id);
      if (todo) todo.done = !todo.done;
    }
  }
});
```

### 2.3 Store 使用

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { useTodoStore } from &amp;amp;#039;@/stores/todo&amp;amp;#039;;

const todoStore = useTodoStore();

// 访问 state
console.log(todoStore.todos);

// 访问 getters
console.log(todoStore.filteredTodos);

// 调用 actions
todoStore.addTodo(&amp;amp;#039;新任务&amp;amp;#039;);

// 解构 (需要 storeToRefs)
import { storeToRefs } from &amp;amp;#039;pinia&amp;amp;#039;;
const { todos, filteredTodos } = storeToRefs(todoStore);
const { addTodo, toggleTodo } = todoStore;
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;ul&amp;amp;gt;
      &amp;amp;lt;li v-for=&amp;amp;quot;todo in filteredTodos&amp;amp;quot; :key=&amp;amp;quot;todo.id&amp;amp;quot;&amp;amp;gt;
        &amp;amp;lt;input 
          type=&amp;amp;quot;checkbox&amp;amp;quot; 
          :checked=&amp;amp;quot;todo.done&amp;amp;quot; 
          @change=&amp;amp;quot;toggleTodo(todo.id)&amp;amp;quot;
        &amp;amp;gt;
        &amp;amp;lt;span :class=&amp;amp;quot;{ done: todo.done }&amp;amp;quot;&amp;amp;gt;&amp;#123;&amp;#123; todo.text &amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;
      &amp;amp;lt;/li&amp;amp;gt;
    &amp;amp;lt;/ul&amp;amp;gt;
    &amp;amp;lt;button @click=&amp;amp;quot;addTodo(&amp;amp;#039;新任务&amp;amp;#039;)&amp;amp;quot;&amp;amp;gt;添加&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
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
  const data = ref&amp;amp;lt;T&amp;amp;gt;(stored ? JSON.parse(stored) : initialValue);
  
  watch(data, (val) =&amp;amp;gt; {
    localStorage.setItem(key, JSON.stringify(val));
  }, { deep: true });
  
  return data;
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

### 3.2 使用 Composables

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { useFetch } from &amp;amp;#039;@/composables/useFetch&amp;amp;#039;;
import { useMouse } from &amp;amp;#039;@/composables/useMouse&amp;amp;#039;;

const { data: users, loading, error } = useFetch&amp;amp;lt;User[]&amp;amp;gt;(&amp;amp;#039;/api/users&amp;amp;#039;);
const { x, y } = useMouse();
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;鼠标位置: &amp;#123;&amp;#123; x &amp;#125;&amp;#125;, &amp;#123;&amp;#123; y &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
    &amp;amp;lt;div v-if=&amp;amp;quot;loading&amp;amp;quot;&amp;amp;gt;加载中...&amp;amp;lt;/div&amp;amp;gt;
    &amp;amp;lt;div v-else-if=&amp;amp;quot;error&amp;amp;quot;&amp;amp;gt;加载失败&amp;amp;lt;/div&amp;amp;gt;
    &amp;amp;lt;ul v-else&amp;amp;gt;
      &amp;amp;lt;li v-for=&amp;amp;quot;user in users&amp;amp;quot; :key=&amp;amp;quot;user.id&amp;amp;quot;&amp;amp;gt;&amp;#123;&amp;#123; user.name &amp;#125;&amp;#125;&amp;amp;lt;/li&amp;amp;gt;
    &amp;amp;lt;/ul&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
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
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ElMessage, ElMessageBox } from &amp;amp;#039;element-plus&amp;amp;#039;;
import type { FormInstance, FormRules } from &amp;amp;#039;element-plus&amp;amp;#039;;

const formRef = ref&amp;amp;lt;FormInstance&amp;amp;gt;();
const form = ref({
  name: &amp;amp;#039;&amp;amp;#039;,
  email: &amp;amp;#039;&amp;amp;#039;,
  password: &amp;amp;#039;&amp;amp;#039;
});

const rules: FormRules = {
  name: [{ required: true, message: &amp;amp;#039;请输入姓名&amp;amp;#039;, trigger: &amp;amp;#039;blur&amp;amp;#039; }],
  email: [
    { required: true, message: &amp;amp;#039;请输入邮箱&amp;amp;#039;, trigger: &amp;amp;#039;blur&amp;amp;#039; },
    { type: &amp;amp;#039;email&amp;amp;#039;, message: &amp;amp;#039;邮箱格式不正确&amp;amp;#039;, trigger: &amp;amp;#039;blur&amp;amp;#039; }
  ],
  password: [
    { required: true, message: &amp;amp;#039;请输入密码&amp;amp;#039;, trigger: &amp;amp;#039;blur&amp;amp;#039; },
    { min: 8, message: &amp;amp;#039;密码至少 8 位&amp;amp;#039;, trigger: &amp;amp;#039;blur&amp;amp;#039; }
  ]
};

async function handleSubmit() {
  if (!formRef.value) return;
  
  await formRef.value.validate();
  
  try {
    await api.register(form.value);
    ElMessage.success(&amp;amp;#039;注册成功&amp;amp;#039;);
  } catch {
    ElMessage.error(&amp;amp;#039;注册失败&amp;amp;#039;);
  }
}

function handleDelete(id: string) {
  ElMessageBox.confirm(&amp;amp;#039;确定删除？&amp;amp;#039;, &amp;amp;#039;提示&amp;amp;#039;, {
    confirmButtonText: &amp;amp;#039;确定&amp;amp;#039;,
    cancelButtonText: &amp;amp;#039;取消&amp;amp;#039;,
    type: &amp;amp;#039;warning&amp;amp;#039;
  }).then(async () =&amp;amp;gt; {
    await api.delete(id);
    ElMessage.success(&amp;amp;#039;删除成功&amp;amp;#039;);
  });
}
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;el-form ref=&amp;amp;quot;formRef&amp;amp;quot; :model=&amp;amp;quot;form&amp;amp;quot; :rules=&amp;amp;quot;rules&amp;amp;quot; label-width=&amp;amp;quot;80px&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;el-form-item label=&amp;amp;quot;姓名&amp;amp;quot; prop=&amp;amp;quot;name&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;el-input v-model=&amp;amp;quot;form.name&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;/el-form-item&amp;amp;gt;
    
    &amp;amp;lt;el-form-item label=&amp;amp;quot;邮箱&amp;amp;quot; prop=&amp;amp;quot;email&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;el-input v-model=&amp;amp;quot;form.email&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;/el-form-item&amp;amp;gt;
    
    &amp;amp;lt;el-form-item label=&amp;amp;quot;密码&amp;amp;quot; prop=&amp;amp;quot;password&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;el-input v-model=&amp;amp;quot;form.password&amp;amp;quot; type=&amp;amp;quot;password&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;/el-form-item&amp;amp;gt;
    
    &amp;amp;lt;el-form-item&amp;amp;gt;
      &amp;amp;lt;el-button type=&amp;amp;quot;primary&amp;amp;quot; @click=&amp;amp;quot;handleSubmit&amp;amp;quot;&amp;amp;gt;注册&amp;amp;lt;/el-button&amp;amp;gt;
    &amp;amp;lt;/el-form-item&amp;amp;gt;
  &amp;amp;lt;/el-form&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 4.3 Naive UI 示例

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { useMessage, useDialog } from &amp;amp;#039;naive-ui&amp;amp;#039;;

const message = useMessage();
const dialog = useDialog();

function showSuccess() {
  message.success(&amp;amp;#039;操作成功&amp;amp;#039;);
}

function showConfirm() {
  dialog.warning({
    title: &amp;amp;#039;确认&amp;amp;#039;,
    content: &amp;amp;#039;确定要删除吗？&amp;amp;#039;,
    positiveText: &amp;amp;#039;确定&amp;amp;#039;,
    negativeText: &amp;amp;#039;取消&amp;amp;#039;,
    onPositiveClick: () =&amp;amp;gt; {
      // 删除逻辑
      message.success(&amp;amp;#039;已删除&amp;amp;#039;);
    }
  });
}
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;n-config-provider&amp;amp;gt;
    &amp;amp;lt;n-message-provider&amp;amp;gt;
      &amp;amp;lt;n-dialog-provider&amp;amp;gt;
        &amp;amp;lt;App /&amp;amp;gt;
      &amp;amp;lt;/n-dialog-provider&amp;amp;gt;
    &amp;amp;lt;/n-message-provider&amp;amp;gt;
  &amp;amp;lt;/n-config-provider&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

---

## 5. 表单处理

### 5.1 VeeValidate

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { useForm, useField } from &amp;amp;#039;vee-validate&amp;amp;#039;;
import * as yup from &amp;amp;#039;yup&amp;amp;#039;;

const schema = yup.object({
  email: yup.string().email(&amp;amp;#039;邮箱格式不正确&amp;amp;#039;).required(&amp;amp;#039;邮箱必填&amp;amp;#039;),
  password: yup.string().min(8, &amp;amp;#039;密码至少 8 位&amp;amp;#039;).required(&amp;amp;#039;密码必填&amp;amp;#039;),
  age: yup.number().min(18).max(100).required()
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema
});

const { value: email, errorMessage: emailError } = useField(&amp;amp;#039;email&amp;amp;#039;);
const { value: password, errorMessage: passwordError } = useField(&amp;amp;#039;password&amp;amp;#039;);

const onSubmit = handleSubmit(async (values) =&amp;amp;gt; {
  await api.register(values);
});
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;form @submit=&amp;amp;quot;onSubmit&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;input v-model=&amp;amp;quot;email&amp;amp;quot; name=&amp;amp;quot;email&amp;amp;quot; type=&amp;amp;quot;email&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;span&amp;amp;gt;&amp;#123;&amp;#123; emailError &amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;
    
    &amp;amp;lt;input v-model=&amp;amp;quot;password&amp;amp;quot; name=&amp;amp;quot;password&amp;amp;quot; type=&amp;amp;quot;password&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;span&amp;amp;gt;&amp;#123;&amp;#123; passwordError &amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;
    
    &amp;amp;lt;button type=&amp;amp;quot;submit&amp;amp;quot;&amp;amp;gt;注册&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/form&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 5.2 FormKit

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { createFormKit } from &amp;amp;#039;@formkit/vue&amp;amp;#039;;

const config = {
  rules: {
    email: (value: string) =&amp;amp;gt; {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || &amp;amp;#039;邮箱格式不正确&amp;amp;#039;;
    }
  }
};
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;FormKit
    type=&amp;amp;quot;form&amp;amp;quot;
    :actions=&amp;amp;quot;false&amp;amp;quot;
    @submit=&amp;amp;quot;handleSubmit&amp;amp;quot;
  &amp;amp;gt;
    &amp;amp;lt;FormKit
      type=&amp;amp;quot;email&amp;amp;quot;
      name=&amp;amp;quot;email&amp;amp;quot;
      label=&amp;amp;quot;邮箱&amp;amp;quot;
      validation=&amp;amp;quot;required|email&amp;amp;quot;
    /&amp;amp;gt;
    &amp;amp;lt;FormKit
      type=&amp;amp;quot;password&amp;amp;quot;
      name=&amp;amp;quot;password&amp;amp;quot;
      label=&amp;amp;quot;密码&amp;amp;quot;
      validation=&amp;amp;quot;required|min:8&amp;amp;quot;
    /&amp;amp;gt;
    &amp;amp;lt;FormKit type=&amp;amp;quot;submit&amp;amp;quot; label=&amp;amp;quot;注册&amp;amp;quot; /&amp;amp;gt;
  &amp;amp;lt;/FormKit&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

---

## 6. 数据获取

### 6.1 VueUse useFetch

```typescript
import { useFetch } from &amp;amp;#039;@vueuse/core&amp;amp;#039;;

const { data, error, isFetching, execute } = useFetch(&amp;amp;#039;/api/users&amp;amp;#039;)
  .get()
  .json();

// 手动触发
execute();

// 带参数
const { data } = useFetch(() =&amp;amp;gt; `/api/users/${userId}`)
  .get()
  .json();
```

### 6.2 Vue Query (TanStack Query)

```typescript
import { useQuery, useMutation, useQueryClient } from &amp;amp;#039;@tanstack/vue-query&amp;amp;#039;;

const queryClient = useQueryClient();

// 查询
const { data, isLoading, error } = useQuery({
  queryKey: [&amp;amp;#039;users&amp;amp;#039;],
  queryFn: () =&amp;amp;gt; fetch(&amp;amp;#039;/api/users&amp;amp;#039;).then(r =&amp;amp;gt; r.json())
});

// 分页
const { data } = useQuery({
  queryKey: [&amp;amp;#039;users&amp;amp;#039;, page],
  queryFn: () =&amp;amp;gt; fetch(`/api/users?page=${page.value}`).then(r =&amp;amp;gt; r.json())
});

// Mutation
const mutation = useMutation({
  mutationFn: (newUser) =&amp;amp;gt; fetch(&amp;amp;#039;/api/users&amp;amp;#039;, {
    method: &amp;amp;#039;POST&amp;amp;#039;,
    body: JSON.stringify(newUser)
  }),
  onSuccess: () =&amp;amp;gt; {
    queryClient.invalidateQueries({ queryKey: [&amp;amp;#039;users&amp;amp;#039;] });
  }
});

// 使用
mutation.mutate({ name: &amp;amp;#039;Alice&amp;amp;#039; });
```

### 6.3 Axios 封装

```typescript
// utils/request.ts
import axios from &amp;amp;#039;axios&amp;amp;#039;;
import { useUserStore } from &amp;amp;#039;@/stores/user&amp;amp;#039;;
import { useRouter } from &amp;amp;#039;vue-router&amp;amp;#039;;

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
});

// 请求拦截器
request.interceptors.request.use(
  (config) =&amp;amp;gt; {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error) =&amp;amp;gt; Promise.reject(error)
);

// 响应拦截器
request.interceptors.response.use(
  (response) =&amp;amp;gt; response.data,
  (error) =&amp;amp;gt; {
    if (error.response?.status === 401) {
      const userStore = useUserStore();
      userStore.logout();
      useRouter().push(&amp;amp;#039;/login&amp;amp;#039;);
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
} from &amp;amp;#039;@vueuse/core&amp;amp;#039;;

// 本地存储
const user = useLocalStorage(&amp;amp;#039;user&amp;amp;#039;, { name: &amp;amp;#039;&amp;amp;#039; });

// 鼠标位置
const { x, y } = useMouse();

// 窗口大小
const { width, height } = useWindowSize();

// 暗黑模式
const isDark = useDark();
const toggleDark = useToggle(isDark);

// 防抖函数
const search = useDebounceFn((query) =&amp;amp;gt; {
  fetchResults(query);
}, 300);

// 剪贴板
const { copy, copied } = useClipboard();

// 媒体查询
const isMobile = useMediaQuery(&amp;amp;#039;(max-width: 768px)&amp;amp;#039;);
```

### 7.2 日期处理

```typescript
import dayjs from &amp;amp;#039;dayjs&amp;amp;#039;;
import &amp;amp;#039;dayjs/locale/zh-cn&amp;amp;#039;;
import relativeTime from &amp;amp;#039;dayjs/plugin/relativeTime&amp;amp;#039;;

dayjs.extend(relativeTime);
dayjs.locale(&amp;amp;#039;zh-cn&amp;amp;#039;);

dayjs().format(&amp;amp;#039;YYYY-MM-DD HH:mm&amp;amp;#039;);
dayjs(&amp;amp;#039;2024-01-01&amp;amp;#039;).fromNow(); // 3 个月前
```

### 7.3 动画

| 库 | 特点 |
|---|---|
| **Vue Transition** | 内置，简单动画 |
| **Motion One** | VueUse 推荐，Web Animations API |
| **GSAP** | 专业动画 |

```vue
&amp;amp;lt;!-- 内置 Transition --&amp;amp;gt;
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;Transition name=&amp;amp;quot;fade&amp;amp;quot; mode=&amp;amp;quot;out-in&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;component :is=&amp;amp;quot;currentComponent&amp;amp;quot; /&amp;amp;gt;
  &amp;amp;lt;/Transition&amp;amp;gt;
  
  &amp;amp;lt;TransitionGroup name=&amp;amp;quot;list&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;li v-for=&amp;amp;quot;item in items&amp;amp;quot; :key=&amp;amp;quot;item.id&amp;amp;quot;&amp;amp;gt;&amp;#123;&amp;#123; item.text &amp;#125;&amp;#125;&amp;amp;lt;/li&amp;amp;gt;
  &amp;amp;lt;/TransitionGroup&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;style&amp;amp;gt;
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
&amp;amp;lt;/style&amp;amp;gt;
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
  &amp;amp;quot;compilerOptions&amp;amp;quot;: {
    &amp;amp;quot;types&amp;amp;quot;: [&amp;amp;quot;vue&amp;amp;quot;]
  },
  &amp;amp;quot;include&amp;amp;quot;: [&amp;amp;quot;src/**/*.ts&amp;amp;quot;, &amp;amp;quot;src/**/*.vue&amp;amp;quot;]
}
```

```vue
&amp;amp;lt;!-- 推荐脚本标签格式 --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
// 完整的类型推断
&amp;amp;lt;/script&amp;amp;gt;
```

### 8.3 ESLint 配置

```bash
npm install -D eslint-plugin-vue @vue/eslint-config-typescript
```

```javascript
// eslint.config.js
import pluginVue from &amp;amp;#039;eslint-plugin-vue&amp;amp;#039;;
import ts from &amp;amp;#039;@vue/eslint-config-typescript&amp;amp;#039;;

export default [
  ...pluginVue.configs[&amp;amp;#039;flat/recommended&amp;amp;#039;],
  ...ts()
];
```

---

## 9. 测试

### 9.1 Vitest + Vue Test Utils

```typescript
// components/TodoItem.test.ts
import { describe, it, expect } from &amp;amp;#039;vitest&amp;amp;#039;;
import { mount } from &amp;amp;#039;@vue/test-utils&amp;amp;#039;;
import TodoItem from &amp;amp;#039;./TodoItem.vue&amp;amp;#039;;

describe(&amp;amp;#039;TodoItem&amp;amp;#039;, () =&amp;amp;gt; {
  it(&amp;amp;#039;渲染待办文本&amp;amp;#039;, () =&amp;amp;gt; {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { id: &amp;amp;#039;1&amp;amp;#039;, text: &amp;amp;#039;测试任务&amp;amp;#039;, done: false }
      }
    });
    
    expect(wrapper.text()).toContain(&amp;amp;#039;测试任务&amp;amp;#039;);
  });
  
  it(&amp;amp;#039;点击复选框触发 toggle&amp;amp;#039;, async () =&amp;amp;gt; {
    const wrapper = mount(TodoItem, {
      props: {
        todo: { id: &amp;amp;#039;1&amp;amp;#039;, text: &amp;amp;#039;测试任务&amp;amp;#039;, done: false }
      }
    });
    
    await wrapper.find(&amp;amp;#039;input[type=&amp;amp;quot;checkbox&amp;amp;quot;]&amp;amp;#039;).trigger(&amp;amp;#039;change&amp;amp;#039;);
    
    expect(wrapper.emitted(&amp;amp;#039;toggle&amp;amp;#039;)).toBeTruthy();
  });
});
```

### 9.2 组件测试 (Cypress/Playwright)

```typescript
// tests/e2e/todo.spec.ts
import { test, expect } from &amp;amp;#039;@playwright/test&amp;amp;#039;;

test(&amp;amp;#039;可以添加待办事项&amp;amp;#039;, async ({ page }) =&amp;amp;gt; {
  await page.goto(&amp;amp;#039;/&amp;amp;#039;);
  
  await page.fill(&amp;amp;#039;[placeholder=&amp;amp;quot;添加待办&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;学习 Vue&amp;amp;#039;);
  await page.click(&amp;amp;#039;button:has-text(&amp;amp;quot;添加&amp;amp;quot;)&amp;amp;#039;);
  
  await expect(page.getByText(&amp;amp;#039;学习 Vue&amp;amp;#039;)).toBeVisible();
});
```

---

## 10. Nuxt 生态

### 10.1 Nuxt 3 核心

```vue
&amp;amp;lt;!-- app.vue --&amp;amp;gt;
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;NuxtLayout&amp;amp;gt;
    &amp;amp;lt;NuxtPage /&amp;amp;gt;
  &amp;amp;lt;/NuxtLayout&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;!-- pages/index.vue --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
// 自动导入
const { data: users } = await useFetch(&amp;amp;#039;/api/users&amp;amp;#039;);

// 状态管理
const count = useState(&amp;amp;#039;count&amp;amp;#039;, () =&amp;amp;gt; 0);

// 路由
const router = useRouter();
const route = useRoute();

// SEO
useHead({
  title: &amp;amp;#039;首页&amp;amp;#039;,
  meta: [{ name: &amp;amp;#039;description&amp;amp;#039;, content: &amp;amp;#039;描述&amp;amp;#039; }]
});
&amp;amp;lt;/script&amp;amp;gt;
```

### 10.2 Nuxt 模块

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    &amp;amp;#039;@nuxtjs/tailwindcss&amp;amp;#039;,
    &amp;amp;#039;@pinia/nuxt&amp;amp;#039;,
    &amp;amp;#039;@vueuse/nuxt&amp;amp;#039;,
    &amp;amp;#039;@nuxtjs/i18n&amp;amp;#039;
  ],
  
  i18n: {
    locales: [&amp;amp;#039;zh&amp;amp;#039;, &amp;amp;#039;en&amp;amp;#039;],
    defaultLocale: &amp;amp;#039;zh&amp;amp;#039;
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
