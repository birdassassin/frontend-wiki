# Vue 核心

> Vue 是渐进式框架，组合式 API 是其核心范式。理解响应式系统、组合式 API 比记忆 API 重要。

---

## 1. 响应式系统

### 1.1 ref 和 reactive

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue';

// ref - 用于基本类型
const count = ref(0);
const name = ref('Vue');

// reactive - 用于对象
const state = reactive({
  todos: [],
  filter: 'all'
});

// 访问 ref 需要 .value
count.value++;

// reactive 直接访问
state.todos.push({ id: 1, text: '学习 Vue' });
</script>

<template>
  <div>
    <p>&amp;#123;&amp;#123; count &amp;#125;&amp;#125;</p>
    <p>&amp;#123;&amp;#123; name &amp;#125;&amp;#125;</p>
    <p>&amp;#123;&amp;#123; state.filter &amp;#125;&amp;#125;</p>
  </div>
</template>
```

### 1.2 computed

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const todos = ref([
  { id: 1, text: '学习', done: false },
  { id: 2, text: '练习', done: true }
]);

const filteredTodos = computed(() => 
  todos.value.filter(t => !t.done)
);

const doneCount = computed(() => 
  todos.value.filter(t => t.done).length
);

// 可写 computed
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (value) => {
    [firstName.value, lastName.value] = value.split(' ');
  }
});
</script>
```

### 1.3 watch 和 watchEffect

```vue
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';

const query = ref('');
const results = ref([]);

// watch - 明确依赖
watch(query, async (newQuery, oldQuery) => {
  results.value = await search(newQuery);
});

// watch 多个值
watch([query, filter], async ([newQuery, newFilter]) => {
  results.value = await search(newQuery, newFilter);
});

// watchEffect - 自动追踪依赖
watchEffect(async () => {
  results.value = await search(query.value);
});

// 清理副作用
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    console.log(query.value);
  }, 1000);
  
  onCleanup(() => clearTimeout(timer));
});
</script>
```

---

## 2. 组合式 API

### 2.1 setup 语法糖

```vue
<script setup lang="ts">
// 导入
import { ref, computed, onMounted } from 'vue';

// 响应式状态
const count = ref(0);

// 计算属性
const doubled = computed(() => count.value * 2);

// 方法
function increment() {
  count.value++;
}

// 生命周期
onMounted(() => {
  console.log('组件挂载');
});

// 定义 Props
const props = defineProps<{
  title: string;
  count?: number;
}>();

// 定义 Emits
const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'delete', id: string): void;
}>();

// 使用
function handleClick() {
  emit('update', count.value);
}
</script>

<template>
  <div>
    <h1>&amp;#123;&amp;#123; title &amp;#125;&amp;#125;</h1>
    <p>&amp;#123;&amp;#123; count &amp;#125;&amp;#125; - &amp;#123;&amp;#123; doubled &amp;#125;&amp;#125;</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 2.2 自定义 Composables

```typescript
// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => count.value = initialValue;
  
  return { count, increment, decrement, reset };
}

// composables/useFetch.ts
export function useFetch<T>(url: string) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);
  
  watch(
    () => url,
    async (url) => {
      loading.value = true;
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

// 使用
const { count, increment } = useCounter(10);
const { data: users, loading } = useFetch('/api/users');
```

---

## 3. 生命周期

### 3.1 生命周期钩子

```vue
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from 'vue';

onBeforeMount(() => {
  // DOM 挂载前
});

onMounted(() => {
  // DOM 挂载后，可以访问 DOM
  const element = document.getElementById('my-element');
});

onBeforeUpdate(() => {
  // DOM 更新前
});

onUpdated(() => {
  // DOM 更新后
});

onBeforeUnmount(() => {
  // 组件卸载前
});

onUnmounted(() => {
  // 组件卸载后，清理定时器、事件监听等
  window.removeEventListener('resize', handler);
});

onErrorCaptured((err, instance, info) => {
  // 捕获子组件错误
  console.error(err, info);
  return false; // 阻止错误继续传播
});
</script>
```

### 3.2 生命周期对比

| Vue 2 | Vue 3 (组合式) |
|---|---|
| beforeCreate | setup() |
| created | setup() |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeDestroy | onBeforeUnmount |
| destroyed | onUnmounted |
| errorCaptured | onErrorCaptured |

---

## 4. 组件通信

### 4.1 Props 和 Emits

```vue
<!-- Parent.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import Child from './Child.vue';

const message = ref('Hello');
const count = ref(0);

function handleUpdate(value: number) {
  count.value = value;
}
</script>

<template>
  <Child 
    :message="message" 
    :count="count"
    @update="handleUpdate"
  />
</template>

<!-- Child.vue -->
<script setup lang="ts">
defineProps<{
  message: string;
  count: number;
}>();

const emit = defineEmits<{
  (e: 'update', value: number): void;
}>();

function increment() {
  emit('update', count + 1);
}
</script>

<template>
  <div>
    <p>&amp;#123;&amp;#123; message &amp;#125;&amp;#125;: &amp;#123;&amp;#123; count &amp;#125;&amp;#125;</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 4.2 v-model

```vue
<!-- 父组件 -->
<template>
  <CustomInput v-model="searchText" />
  <CustomCheckbox v-model:checked="isChecked" />
</template>

<!-- 子组件 CustomInput.vue -->
<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <input 
    :value="modelValue" 
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
```

### 4.3 Provide / Inject

```vue
<!-- 祖先组件 -->
<script setup lang="ts">
import { provide, ref } from 'vue';

const theme = ref('light');
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

provide('theme', theme);
provide('toggleTheme', toggleTheme);
</script>

<!-- 后代组件 -->
<script setup lang="ts">
import { inject } from 'vue';

const theme = inject('theme');
const toggleTheme = inject('toggleTheme');
</script>
```

### 4.4 事件总线 (Vue 3 推荐 mitt)

```typescript
// utils/emitter.ts
import mitt from 'mitt';

export const emitter = mitt();

// 发送事件
emitter.emit('user-login', { id: 1, name: 'Alice' });

// 监听事件
emitter.on('user-login', (data) => {
  console.log('用户登录:', data);
});

// 移除监听
emitter.off('user-login');
```

---

## 5. 模板语法

### 5.1 指令

```vue
<template>
  <!-- 文本插值 -->
  <p>&amp;#123;&amp;#123; message &amp;#125;&amp;#125;</p>
  
  <!-- HTML 渲染 -->
  <div v-html="htmlContent"></div>
  
  <!-- 属性绑定 -->
  <img :src="imageUrl" :alt="imageAlt" />
  
  <!-- 事件绑定 -->
  <button @click="handleClick" @mouseenter="onHover">点击</button>
  
  <!-- 条件渲染 -->
  <div v-if="status === 'loading'">加载中...</div>
  <div v-else-if="status === 'error'">加载失败</div>
  <div v-else>加载成功</div>
  
  <!-- 列表渲染 -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      &amp;#123;&amp;#123; index &amp;#125;&amp;#125;. &amp;#123;&amp;#123; item.name &amp;#125;&amp;#125;
    </li>
  </ul>
  
  <!-- 显示/隐藏 -->
  <div v-show="isVisible">内容</div>
  
  <!-- 双向绑定 -->
  <input v-model="searchQuery" />
  
  <!-- 修饰符 -->
  <form @submit.prevent="handleSubmit">
    <input @keyup.enter="submit" />
    <button @click.once="handleClick">只触发一次</button>
  </form>
</template>
```

### 5.2 模板 Refs

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const inputRef = ref<HTMLInputElement | null>(null);
const componentRef = ref<InstanceType<typeof MyComponent> | null>(null);

onMounted(() => {
  inputRef.value?.focus();
  componentRef.value?.someMethod();
});
</script>

<template>
  <input ref="inputRef" />
  <MyComponent ref="componentRef" />
</template>
```

---

## 6. 插槽 (Slots)

### 6.1 默认插槽

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <header>
      <slot name="header">默认标题</slot>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- 使用 -->
<Card>
  <template #header>
    <h2>自定义标题</h2>
  </template>
  
  <p>卡片内容</p>
  
  <template #footer>
    <button>操作</button>
  </template>
</Card>
```

### 6.2 作用域插槽

```vue
<!-- List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="index">
        &amp;#123;&amp;#123; item.name &amp;#125;&amp;#125;
      </slot>
    </li>
  </ul>
</template>

<!-- 使用 -->
<List :items="users">
  <template #default="{ item, index }">
    <div class="user-card">
      <img :src="item.avatar" />
      <span>&amp;#123;&amp;#123; index &amp;#125;&amp;#125;. &amp;#123;&amp;#123; item.name &amp;#125;&amp;#125;</span>
    </div>
  </template>
</List>
```

---

## 7. 异步组件

### 7.1 defineAsyncComponent

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000
});

// 简单用法
const SimpleAsync = defineAsyncComponent(() => import('./Simple.vue'));
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>加载中...</div>
    </template>
  </Suspense>
</template>
```

---

## 8. 自定义指令

```typescript
// directives/focus.ts
export const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
};

// directives/click-outside.ts
export const vClickOutside = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};

// 使用
<script setup lang="ts">
import { vFocus, vClickOutside } from '@/directives';
</script>

<template>
  <input v-focus />
  <div v-click-outside="handleClickOutside">点击外部关闭</div>
</template>
```

---

## 9. 性能优化

### 9.1 组件懒加载

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
);
</script>
```

### 9.2 v-memo (Vue 3.2+)

```vue
<template>
  <div v-memo="[selectedItem.id]">
    <p>&amp;#123;&amp;#123; selectedItem.name &amp;#125;&amp;#125;</p>
    <p>&amp;#123;&amp;#123; selectedItem.description &amp;#125;&amp;#125;</p>
  </div>
</template>
```

### 9.3 避免不必要的响应式

```vue
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

// ref - 深度响应式
const deepData = ref({ nested: { value: 1 } });

// shallowRef - 浅层响应式，性能更好
const largeData = shallowRef({ nested: { value: 1 } });

// 冻结大对象
const staticData = Object.freeze({ /* 大量数据 */ });
</script>
```

---

## 10. 相关概念

- [Vue 生态](../tools/vue-ecosystem.md)
- [组件架构](../concepts/component-architecture.md)
- [状态管理](../concepts/state-management.md)
- [渲染策略](../concepts/rendering-strategies.md)
