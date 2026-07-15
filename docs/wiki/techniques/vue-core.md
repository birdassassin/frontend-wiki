# Vue 3 核心原理深度解析

> Vue 是渐进式框架，组合式 API 是其核心范式。理解响应式系统、组合式 API 比记忆 API 重要。

---

## 1. 响应式系统深度解析

### 1.1 响应式原理

**Vue 3 响应式系统基于 ES6 的 Proxy 实现：**

```javascript
// 简化版响应式实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      // 触发更新
      trigger(target, key);
      return result;
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      trigger(target, key);
      return result;
    }
  });
}
```

**工作流程：**

```
数据读取 → track(收集依赖) → 数据修改 → trigger(触发更新) → 重新渲染
```

### 1.2 ref 和 reactive 的区别

| 特性 | ref | reactive |
|------|-----|----------|
| **适用类型** | 基本类型和对象 | 仅对象 |
| **访问方式** | 需要 `.value` | 直接访问 |
| **响应式深度** | 自动解包嵌套对象 | 深度响应式 |
| **替换整个对象** | 支持 | 不支持 |

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue';

// ref - 基本类型
const count = ref(0);
console.log(count.value); // 0
count.value++;

// ref - 对象类型（自动解包）
const user = ref({ name: 'Alice' });
console.log(user.value.name); // Alice

// reactive - 对象类型
const state = reactive({
  todos: [],
  filter: 'all'
});
console.log(state.filter); // 'all'
state.todos.push({ id: 1, text: '学习 Vue' });

// reactive 不支持替换整个对象
// ❌ 错误：这会失去响应式
state = { todos: [], filter: 'active' };

// ✅ 正确：修改属性
state.filter = 'active';
</script>
```

### 1.3 ref 的自动解包

**在模板中自动解包：**

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
const user = ref({ name: 'Alice' });
</script>

<template>
  <!-- 模板中自动解包，不需要 .value -->
  <p>{{ count }}</p>
  <p>{{ user.name }}</p>
</template>
```

**在 reactive 中自动解包：**

```javascript
import { ref, reactive } from 'vue';

const count = ref(0);
const state = reactive({ count });

// 在 reactive 中访问 ref 会自动解包
console.log(state.count); // 0
state.count++;
console.log(count.value); // 1
```

### 1.4 computed 计算属性

**基本用法：**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const todos = ref([
  { id: 1, text: '学习', done: false },
  { id: 2, text: '练习', done: true },
  { id: 3, text: '复习', done: false }
]);

// 计算属性 - 过滤未完成的任务
const pendingTodos = computed(() => {
  console.log('计算 pendingTodos');
  return todos.value.filter(t => !t.done);
});

// 计算属性 - 统计已完成数量
const doneCount = computed(() => {
  return todos.value.filter(t => t.done).length;
});

// 可写计算属性
const firstName = ref('John');
const lastName = ref('Doe');

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (value) => {
    const [first, last] = value.split(' ');
    firstName.value = first;
    lastName.value = last;
  }
});

// 使用可写计算属性
fullName.value = 'Alice Smith';
console.log(firstName.value); // 'Alice'
console.log(lastName.value); // 'Smith'
</script>
```

**计算属性缓存：**

```javascript
// 计算属性会缓存结果，只有依赖变化时才重新计算
const expensive = computed(() => {
  console.log('重新计算');
  return heavyComputation(data.value);
});

// 多次访问，只计算一次
expensive.value; // 输出: 重新计算
expensive.value; // 无输出（使用缓存）
expensive.value; // 无输出（使用缓存）

// 依赖变化时重新计算
data.value = newValue;
expensive.value; // 输出: 重新计算
```

### 1.5 watch 和 watchEffect

**watch - 明确指定依赖：**

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';

const query = ref('');
const results = ref([]);

// 监听单个值
watch(query, async (newQuery, oldQuery) => {
  console.log(`从 ${oldQuery} 变为 ${newQuery}`);
  results.value = await search(newQuery);
});

// 监听多个值
const filter = ref('all');
watch([query, filter], async ([newQuery, newFilter], [oldQuery, oldFilter]) => {
  results.value = await search(newQuery, newFilter);
});

// 深度监听对象
const user = ref({ name: 'Alice', age: 30 });
watch(user, (newUser) => {
  console.log('User changed:', newUser);
}, { deep: true });

// 立即执行
watch(query, async (newQuery) => {
  results.value = await search(newQuery);
}, { immediate: true });

// 停止监听
const stop = watch(query, handler);
stop();
</script>
```

**watchEffect - 自动追踪依赖：**

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const query = ref('');
const results = ref([]);

// 自动追踪依赖，立即执行
watchEffect(async () => {
  // 自动追踪 query.value
  results.value = await search(query.value);
});

// 清理副作用
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    console.log(query.value);
  }, 1000);
  
  // 清理函数：在下次执行前或组件卸载时调用
  onCleanup(() => clearTimeout(timer));
});

// 停止监听
const stop = watchEffect(handler);
stop();
</script>
```

**watch vs watchEffect：**

| 特性 | watch | watchEffect |
|------|-------|-------------|
| **依赖指定** | 手动指定 | 自动追踪 |
| **执行时机** | 可选立即执行 | 立即执行 |
| **获取旧值** | 支持 | 不支持 |
| **触发条件** | 依赖变化 | 依赖变化 |

---

## 2. 组合式 API 深度解析

### 2.1 setup 语法糖

**完整示例：**

```vue
<script setup lang="ts">
// 1. 导入响应式 API
import { ref, computed, onMounted, watch } from 'vue';

// 2. 响应式状态
const count = ref(0);
const name = ref('Vue 3');

// 3. 计算属性
const doubled = computed(() => count.value * 2);
const greeting = computed(() => `Hello, ${name.value}!`);

// 4. 方法
function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}

function reset() {
  count.value = 0;
}

// 5. 生命周期钩子
onMounted(() => {
  console.log('组件挂载完成');
  console.log('初始 count:', count.value);
});

onUnmounted(() => {
  console.log('组件卸载');
});

// 6. 监听
watch(count, (newCount, oldCount) => {
  console.log(`count 从 ${oldCount} 变为 ${newCount}`);
});

// 7. 定义 Props（TypeScript）
const props = defineProps<{
  title: string;
  initialCount?: number;
}>();

// 8. 定义 Emits
const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'delete', id: string): void;
}>();

// 9. 触发事件
function handleUpdate() {
  emit('update', count.value);
}

// 10. 暴露方法给父组件
defineExpose({
  increment,
  decrement,
  getCount: () => count.value
});
</script>

<template>
  <div class="counter">
    <h2>{{ title }}</h2>
    <p class="count">{{ count }}</p>
    <p class="doubled">Doubled: {{ doubled }}</p>
    <p class="greeting">{{ greeting }}</p>
    
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
    <button @click="handleUpdate">Emit Update</button>
  </div>
</template>

<style scoped>
.counter {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.count {
  font-size: 24px;
  font-weight: bold;
}

button {
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

### 2.2 自定义 Composables

**useCounter：**

```typescript
// composables/useCounter.ts
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => count.value = initialValue;
  
  // 计算属性
  const doubled = computed(() => count.value * 2);
  const squared = computed(() => count.value * count.value);
  
  // 返回响应式状态和方法
  return {
    count,
    doubled,
    squared,
    increment,
    decrement,
    reset
  };
}

// 使用
const { count, doubled, increment, reset } = useCounter(10);
```

**useFetch：**

```typescript
// composables/useFetch.ts
import { ref, watch, type Ref } from 'vue';

export function useFetch<T>(url: Ref<string> | string) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);
  
  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(typeof url === 'string' ? url : url.value);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      data.value = await response.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };
  
  // 如果 url 是响应式的，监听变化重新请求
  if (typeof url !== 'string') {
    watch(url, fetchData, { immediate: true });
  } else {
    fetchData();
  }
  
  return { data, error, loading, refetch: fetchData };
}

// 使用
const { data: users, loading, error, refetch } = useFetch('/api/users');
```

**useLocalStorage：**

```typescript
// composables/useLocalStorage.ts
import { ref, watch } from 'vue';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 从 localStorage 读取初始值
  const storedValue = localStorage.getItem(key);
  const value = ref<T>(storedValue ? JSON.parse(storedValue) : initialValue);
  
  // 监听变化，同步到 localStorage
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });
  
  return value;
}

// 使用
const theme = useLocalStorage('theme', 'light');
const user = useLocalStorage('user', { name: '', preferences: {} });
```

---

## 3. 生命周期深度解析

### 3.1 完整生命周期流程

```
beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeUnmount → unmounted
```

**组合式 API 生命周期：**

```vue
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue';

// 组件挂载前
onBeforeMount(() => {
  console.log('onBeforeMount: DOM 还未挂载');
});

// 组件挂载后
onMounted(() => {
  console.log('onMounted: DOM 已挂载，可以访问 DOM 元素');
  const element = document.getElementById('my-element');
  console.log(element);
});

// 更新前
onBeforeUpdate(() => {
  console.log('onBeforeUpdate: 数据已更新，DOM 还未更新');
});

// 更新后
onUpdated(() => {
  console.log('onUpdated: DOM 已更新');
});

// 卸载前
onBeforeUnmount(() => {
  console.log('onBeforeUnmount: 组件即将卸载');
});

// 卸载后
onUnmounted(() => {
  console.log('onUnmounted: 组件已卸载，清理副作用');
  // 清理定时器
  clearInterval(timer);
  // 移除事件监听
  window.removeEventListener('resize', handleResize);
});

// 错误捕获
onErrorCaptured((err, instance, info) => {
  console.error('捕获到错误:', err);
  console.error('错误信息:', info);
  return false; // 阻止错误继续传播
});

// 开发环境：追踪渲染依赖
onRenderTracked((event) => {
  console.log('渲染依赖:', event);
});

// 开发环境：触发渲染的原因
onRenderTriggered((event) => {
  console.log('触发渲染:', event);
});
</script>
```

### 3.2 生命周期对比

| Vue 2 Options API | Vue 3 Composition API | 说明 |
|-------------------|----------------------|------|
| beforeCreate | setup() | 组件实例创建前 |
| created | setup() | 组件实例创建后 |
| beforeMount | onBeforeMount | DOM 挂载前 |
| mounted | onMounted | DOM 挂载后 |
| beforeUpdate | onBeforeUpdate | DOM 更新前 |
| updated | onUpdated | DOM 更新后 |
| beforeDestroy | onBeforeUnmount | 组件卸载前 |
| destroyed | onUnmounted | 组件卸载后 |
| errorCaptured | onErrorCaptured | 捕获子组件错误 |

---

## 4. 组件通信深度解析

### 4.1 Props 和 Emits

**完整示例：**

```vue
<!-- Parent.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import Child from './Child.vue';

const message = ref('Hello from Parent');
const count = ref(0);

function handleUpdate(value: number) {
  count.value = value;
}

function handleDelete(id: string) {
  console.log('删除:', id);
}
</script>

<template>
  <Child 
    :message="message" 
    :count="count"
    :items="['Apple', 'Banana', 'Orange']"
    @update="handleUpdate"
    @delete="handleDelete"
  />
</template>
```

```vue
<!-- Child.vue -->
<script setup lang="ts">
// 定义 Props（TypeScript）
const props = defineProps<{
  message: string;
  count: number;
  items: string[];
}>();

// 定义 Emits
const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'delete', id: string): void;
}>();

function increment() {
  emit('update', props.count + 1);
}

function deleteItem(id: string) {
  emit('delete', id);
}
</script>

<template>
  <div class="child">
    <h3>{{ message }}</h3>
    <p>Count: {{ count }}</p>
    
    <ul>
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
    
    <button @click="increment">+1</button>
    <button @click="deleteItem('123')">Delete</button>
  </div>
</template>
```

### 4.2 v-model 详解

**基本用法：**

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';
import CustomCheckbox from './CustomCheckbox.vue';

const searchText = ref('');
const isChecked = ref(false);
</script>

<template>
  <CustomInput v-model="searchText" />
  <CustomCheckbox v-model:checked="isChecked" />
</template>
```

```vue
<!-- CustomInput.vue -->
<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <input 
    :value="modelValue" 
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
```

**多个 v-model：**

```vue
<!-- UserForm.vue -->
<script setup lang="ts">
defineProps<{
  firstName: string;
  lastName: string;
}>();

const emit = defineEmits<{
  (e: 'update:firstName', value: string): void;
  (e: 'update:lastName', value: string): void;
}>();
</script>

<template>
  <input 
    :value="firstName" 
    @input="emit('update:firstName', ($event.target as HTMLInputElement).value)"
    placeholder="First Name"
  />
  
  <input 
    :value="lastName" 
    @input="emit('update:lastName', ($event.target as HTMLInputElement).value)"
    placeholder="Last Name"
  />
</template>

<!-- 使用 -->
<UserForm 
  v-model:first-name="firstName" 
  v-model:last-name="lastName" 
/>
```

### 4.3 Provide / Inject

**基本用法：**

```vue
<!-- 祖先组件 -->
<script setup lang="ts">
import { provide, ref } from 'vue';

const theme = ref('light');
const user = ref({ name: 'Alice', id: 1 });

// 提供响应式值
provide('theme', theme);
provide('user', user);

// 提供方法
provide('toggleTheme', () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
});

provide('updateUser', (newUser) => {
  user.value = newUser;
});
</script>
```

```vue
<!-- 后代组件（任意层级） -->
<script setup lang="ts">
import { inject } from 'vue';

// 注入值
const theme = inject('theme', 'light'); // 'light' 是默认值
const user = inject('user');

// 注入方法
const toggleTheme = inject('toggleTheme');
const updateUser = inject('updateUser');
</script>

<template>
  <div :class="`theme-${theme}`">
    <p>User: {{ user?.name }}</p>
    <button @click="toggleTheme">Toggle Theme</button>
    <button @click="updateUser({ name: 'Bob', id: 2 })">Update User</button>
  </div>
</template>
```

**响应式 provide：**

```vue
<script setup>
import { provide, ref, readonly } from 'vue';

const count = ref(0);

// 提供只读版本，防止子组件修改
provide('count', readonly(count));

// 提供修改方法
provide('setCount', (value) => {
  count.value = value;
});
</script>
```

### 4.4 事件总线

**使用 mitt：**

```bash
npm install mitt
```

```typescript
// utils/emitter.ts
import mitt from 'mitt';

// 创建事件总线
export const emitter = mitt();

// 类型定义（TypeScript）
type Events = {
  'user-login': { id: number; name: string };
  'user-logout': void;
  'notification': { message: string; type: 'success' | 'error' };
};

export const typedEmitter = mitt<Events>();
```

```typescript
// 发送事件
import { emitter, typedEmitter } from '@/utils/emitter';

emitter.emit('user-login', { id: 1, name: 'Alice' });
typedEmitter.emit('notification', { message: 'Hello', type: 'success' });
```

```typescript
// 监听事件
import { emitter } from '@/utils/emitter';

// 监听单个事件
emitter.on('user-login', (data) => {
  console.log('用户登录:', data);
});

// 监听所有事件
emitter.on('*', (type, data) => {
  console.log('事件:', type, data);
});

// 移除监听
emitter.off('user-login');

// 清空所有监听
emitter.all.clear();
```

---

## 5. 模板语法深度解析

### 5.1 指令详解

**v-text 和 v-html：**

```vue
<script setup>
import { ref } from 'vue';

const text = ref('Hello Vue');
const htmlContent = ref('<strong>加粗文本</strong>');
</script>

<template>
  <!-- 文本插值（等同 {{ }}） -->
  <span v-text="text"></span>
  
  <!-- HTML 渲染 -->
  <div v-html="htmlContent"></div>
  
  <!-- 简写 -->
  <p>{{ text }}</p>
</template>
```

**v-bind：**

```vue
<script setup>
import { ref } from 'vue';

const imageUrl = ref('https://example.com/image.jpg');
const imageAlt = ref('Example Image');
const isActive = ref(true);
const dynamicClass = ref('btn-primary');
const styleObject = ref({
  color: 'red',
  fontSize: '16px'
});
</script>

<template>
  <!-- 属性绑定 -->
  <img :src="imageUrl" :alt="imageAlt" />
  
  <!-- 动态 class -->
  <div :class="{ active: isActive }">动态类</div>
  <div :class="[dynamicClass, { active: isActive }]">多个类</div>
  
  <!-- 动态 style -->
  <div :style="styleObject">动态样式</div>
  <div :style="{ color: 'blue', fontSize: '14px' }">内联样式</div>
  
  <!-- 布尔属性 -->
  <input :disabled="!isActive" />
  
  <!-- 动态属性名 -->
  <div :[dynamicProp]="value">动态属性</div>
</template>
```

**v-on：**

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);

function handleClick(event: MouseEvent) {
  count.value++;
  console.log(event);
}

function handleSubmit() {
  console.log('表单提交');
}
</script>

<template>
  <!-- 基本事件绑定 -->
  <button @click="handleClick">点击</button>
  
  <!-- 内联事件处理 -->
  <button @click="count++">内联点击</button>
  
  <!-- 传递参数 -->
  <button @click="handleClick('hello', $event)">带参数</button>
  
  <!-- 事件修饰符 -->
  <form @submit.prevent="handleSubmit">
    <input @keyup.enter="handleSubmit" />
    <button @click.once="handleClick">只触发一次</button>
    <button @click.stop="handleClick">阻止冒泡</button>
  </form>
  
  <!-- 按键修饰符 -->
  <input @keyup.enter="submit" />
  <input @keyup.esc="cancel" />
  <input @keyup.tab="next" />
  
  <!-- 系统修饰符 -->
  <input @keyup.ctrl.enter="submit" />
  <button @click.ctrl="handleCtrlClick">Ctrl+Click</button>
</template>
```

**v-if 和 v-show：**

```vue
<script setup>
import { ref } from 'vue';

const status = ref('loading');
const isVisible = ref(true);
</script>

<template>
  <!-- v-if - 条件渲染（真正的渲染/销毁） -->
  <div v-if="status === 'loading'">加载中...</div>
  <div v-else-if="status === 'error'">加载失败</div>
  <div v-else>加载成功</div>
  
  <!-- v-show - 显示/隐藏（通过 CSS display） -->
  <div v-show="isVisible">内容</div>
  
  <!-- v-if vs v-show -->
  <!-- v-if: 频繁切换代价高，初始渲染代价低 -->
  <!-- v-show: 频繁切换代价低，初始渲染代价高 -->
</template>
```

**v-for：**

```vue
<script setup>
import { ref } from 'vue';

const items = ref([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
  { id: 3, name: 'Orange' }
]);

const object = ref({
  a: 1,
  b: 2,
  c: 3
});
</script>

<template>
  <!-- 列表渲染 -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <!-- 带索引 -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }}. {{ item.name }}
    </li>
  </ul>
  
  <!-- 对象遍历 -->
  <div v-for="(value, key) in object" :key="key">
    {{ key }}: {{ value }}
  </div>
  
  <!-- 数字遍历 -->
  <div v-for="n in 5" :key="n">{{ n }}</div>
</template>
```

**v-model：**

```vue
<script setup>
import { ref } from 'vue';

const text = ref('');
const number = ref(0);
const checkbox = ref(false);
const radio = ref('');
const select = ref('');
const textarea = ref('');
</script>

<template>
  <!-- 文本输入 -->
  <input v-model="text" />
  
  <!-- 数字输入 -->
  <input v-model.number="number" type="number" />
  
  <!-- 复选框 -->
  <input v-model="checkbox" type="checkbox" />
  
  <!-- 单选框 -->
  <input v-model="radio" type="radio" value="A" />
  <input v-model="radio" type="radio" value="B" />
  
  <!-- 下拉选择 -->
  <select v-model="select">
    <option value="a">Option A</option>
    <option value="b">Option B</option>
  </select>
  
  <!-- 文本域 -->
  <textarea v-model="textarea"></textarea>
  
  <!-- 修饰符 -->
  <input v-model.lazy="text" /> <!-- 失焦后更新 -->
  <input v-model.trim="text" /> <!-- 去除首尾空格 -->
  <input v-model.number="number" /> <!-- 转换为数字 -->
</template>
```

### 5.2 模板 Refs

**基本用法：**

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MyComponent from './MyComponent.vue';

// DOM 元素 ref
const inputRef = ref<HTMLInputElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);

// 组件 ref
const componentRef = ref<InstanceType<typeof MyComponent> | null>(null);

onMounted(() => {
  // 访问 DOM 元素
  inputRef.value?.focus();
  containerRef.value?.scrollIntoView();
  
  // 调用组件方法
  componentRef.value?.doSomething();
});
</script>

<template>
  <div ref="containerRef">
    <input ref="inputRef" type="text" />
    <MyComponent ref="componentRef" />
  </div>
</template>
```

**v-for 中的 refs：**

```vue
<script setup>
import { ref, onMounted } from 'vue';

const itemRefs = ref<HTMLDivElement[]>([]);

onMounted(() => {
  // 访问所有元素
  itemRefs.value.forEach((el) => {
    console.log(el);
  });
  
  // 访问特定元素
  itemRefs.value[0]?.focus();
});
</script>

<template>
  <div 
    v-for="item in items" 
    :key="item.id" 
    :ref="(el) => { if (el) itemRefs.push(el as HTMLDivElement) }"
  >
    {{ item.name }}
  </div>
</template>
```

---

## 6. 插槽 (Slots) 深度解析

### 6.1 默认插槽

```vue
<!-- Card.vue -->
<script setup>
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="card">
    <header>
      <slot name="header">
        <!-- 默认内容 -->
        <h2>{{ title || '默认标题' }}</h2>
      </slot>
    </header>
    <main>
      <!-- 默认插槽 -->
      <slot>
        <p>暂无内容</p>
      </slot>
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
}
</style>
```

```vue
<!-- 使用 Card 组件 -->
<template>
  <Card title="自定义标题">
    <!-- 默认插槽内容 -->
    <p>这是卡片的主要内容</p>
    <p>可以包含多个元素</p>
    
    <!-- 具名插槽 -->
    <template #header>
      <h2>自定义头部</h2>
    </template>
    
    <template #footer>
      <button>操作按钮</button>
    </template>
  </Card>
</template>
```

### 6.2 作用域插槽

```vue
<!-- List.vue -->
<script setup lang="ts">
defineProps<{
  items: { id: number; name: string; avatar: string }[];
}>();
</script>

<template>
  <ul class="list">
    <li v-for="(item, index) in items" :key="item.id" class="list-item">
      <!-- 作用域插槽：传递数据给父组件 -->
      <slot 
        :item="item" 
        :index="index" 
        :isFirst="index === 0"
      >
        <!-- 默认内容 -->
        <span>{{ item.name }}</span>
      </slot>
    </li>
  </ul>
</template>
```

```vue
<!-- 使用 List 组件 -->
<template>
  <List :items="users">
    <!-- 解构插槽 props -->
    <template #default="{ item, index, isFirst }">
      <div class="user-card">
        <img :src="item.avatar" alt="avatar" />
        <div class="user-info">
          <span class="index">{{ index + 1 }}.</span>
          <span class="name">{{ item.name }}</span>
          <span v-if="isFirst" class="badge">第一个</span>
        </div>
      </div>
    </template>
  </List>
</template>
```

### 6.3 插槽透传

```vue
<!-- BaseButton.vue -->
<script setup>
defineProps<{
  variant?: 'primary' | 'secondary';
}>();
</script>

<template>
  <button :class="['btn', `btn-${variant || 'primary'}`]">
    <!-- 将所有插槽透传给子元素 -->
    <slot />
    <slot name="icon" />
  </button>
</template>
```

```vue
<!-- IconButton.vue -->
<script setup>
import BaseButton from './BaseButton.vue';
import Icon from './Icon.vue';

defineProps<{
  icon: string;
}>();
</script>

<template>
  <BaseButton>
    <!-- 渲染插槽内容 -->
    <slot />
    <!-- 插入图标 -->
    <template #icon>
      <Icon :name="icon" />
    </template>
  </BaseButton>
</template>
```

---

## 7. 异步组件深度解析

### 7.1 defineAsyncComponent

**基本用法：**

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

// 简单用法
const HeavyComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
);

// 完整配置
const ComplexAsyncComponent = defineAsyncComponent({
  // 加载函数
  loader: () => import('./ComplexComponent.vue'),
  
  // 加载中显示的组件
  loadingComponent: () => import('./LoadingSpinner.vue'),
  
  // 加载失败显示的组件
  errorComponent: () => import('./ErrorDisplay.vue'),
  
  // 延迟显示 loading 组件（毫秒）
  delay: 200,
  
  // 超时时间（毫秒）
  timeout: 3000,
  
  // 是否挂起错误（不显示错误组件）
  suspensible: false,
  
  // 错误处理
  onError(error, retry, fail, attempts) {
    if (error.message.includes('fetch') && attempts <= 3) {
      // 请求失败，重试
      retry();
    } else {
      // 其他错误，失败
      fail();
    }
  }
});
</script>

<template>
  <HeavyComponent />
  <ComplexAsyncComponent />
</template>
```

### 7.2 Suspense 配合异步组件

```vue
<script setup lang="ts">
import { defineAsyncComponent, Suspense } from 'vue';

const AsyncUserList = defineAsyncComponent(() => 
  import('./UserList.vue')
);

const AsyncChart = defineAsyncComponent(() => 
  import('./Chart.vue')
);
</script>

<template>
  <Suspense>
    <!-- 默认插槽：异步组件 -->
    <template #default>
      <AsyncUserList />
      <AsyncChart />
    </template>
    
    <!-- fallback 插槽：加载中 -->
    <template #fallback>
      <div class="loading">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>
    </template>
  </Suspense>
</template>
```

### 7.3 路由级别代码分割

```javascript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: defineAsyncComponent(() => import('../views/Home.vue'))
    },
    {
      path: '/about',
      name: 'About',
      component: defineAsyncComponent(() => import('../views/About.vue'))
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: defineAsyncComponent(() => import('../views/Dashboard.vue')),
      children: [
        {
          path: '',
          component: defineAsyncComponent(() => import('../views/DashboardHome.vue'))
        },
        {
          path: 'settings',
          component: defineAsyncComponent(() => import('../views/Settings.vue'))
        }
      ]
    }
  ]
});

export default router;
```

---

## 8. 自定义指令深度解析

### 8.1 创建自定义指令

**基本结构：**

```typescript
// directives/focus.ts
import type { DirectiveBinding } from 'vue';

export const vFocus = {
  // 绑定元素挂载到 DOM 时调用
  mounted(el: HTMLElement) {
    el.focus();
  }
};

export const vClickOutside = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 定义点击事件处理函数
    el.clickOutsideEvent = (event: Event) => {
      // 如果点击的不是当前元素及其子元素
      if (!(el === event.target || el.contains(event.target as Node))) {
        // 调用指令绑定的函数
        binding.value(event);
      }
    };
    
    // 添加事件监听
    document.addEventListener('click', el.clickOutsideEvent);
  },
  
  // 元素卸载时调用
  unmounted(el: HTMLElement) {
    // 移除事件监听
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};

export const vIntersection = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            binding.value(entry);
          }
        });
      },
      binding.arg ? { threshold: parseFloat(binding.arg) } : {}
    );
    
    observer.observe(el);
    
    // 保存 observer 引用以便清理
    el._observer = observer;
  },
  
  unmounted(el: HTMLElement) {
    el._observer?.disconnect();
  }
};
```

**使用自定义指令：**

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { vFocus, vClickOutside, vIntersection } from '@/directives';

const isMenuOpen = ref(false);

function closeMenu() {
  isMenuOpen.value = false;
}

function handleIntersection(entry: IntersectionObserverEntry) {
  console.log('元素进入视口:', entry);
}
</script>

<template>
  <!-- 自动聚焦 -->
  <input v-focus />
  
  <!-- 点击外部关闭 -->
  <div 
    v-click-outside="closeMenu" 
    :class="{ 'menu-open': isMenuOpen }"
  >
    菜单内容
  </div>
  
  <!-- 交叉观察 -->
  <div v-intersection="handleIntersection">
    需要观察的元素
  </div>
  
  <!-- 带参数的指令 -->
  <div v-intersection:0.5="handleIntersection">
    阈值为 0.5 的观察
  </div>
</template>
```

### 8.2 全局注册指令

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { vFocus, vClickOutside } from '@/directives';

const app = createApp(App);

// 全局注册指令
app.directive('focus', vFocus);
app.directive('click-outside', vClickOutside);

app.mount('#app');
```

---

## 9. 性能优化

### 9.1 组件懒加载

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

// 懒加载组件
const HeavyTable = defineAsyncComponent(() => 
  import('./HeavyTable.vue')
);

const Chart = defineAsyncComponent(() => 
  import('./Chart.vue')
);

// 条件懒加载
const Dialog = defineAsyncComponent(() => 
  import('./Dialog.vue')
);
</script>

<template>
  <HeavyTable v-if="showTable" />
  
  <Suspense>
    <Chart />
    <template #fallback>
      <div>加载图表...</div>
    </template>
  </Suspense>
  
  <Dialog v-if="showDialog" />
</template>
```

### 9.2 v-memo

```vue
<script setup>
import { ref } from 'vue';

const selectedItem = ref({ id: 1, name: 'Item 1', description: '...' });
const unrelatedState = ref(0);
</script>

<template>
  <!-- v-memo 缓存整个模板，只有依赖变化时才重新渲染 -->
  <div v-memo="[selectedItem.id]">
    <p>名称: {{ selectedItem.name }}</p>
    <p>描述: {{ selectedItem.description }}</p>
    <!-- unrelatedState 变化不会触发这里重新渲染 -->
  </div>
  
  <button @click="unrelatedState++">
    Unrelated: {{ unrelatedState }}
  </button>
</template>
```

### 9.3 浅层响应式

```vue
<script setup lang="ts">
import { ref, shallowRef, triggerRef } from 'vue';

// ref - 深度响应式
const deepData = ref({ nested: { value: 1 } });
deepData.value.nested.value = 2; // 触发更新

// shallowRef - 浅层响应式
const shallowData = shallowRef({ nested: { value: 1 } });
shallowData.value.nested.value = 2; // 不会触发更新

// 需要手动触发更新
triggerRef(shallowData);

// 冻结对象（不可变数据）
const staticData = Object.freeze({
  items: ['a', 'b', 'c'],
  config: { theme: 'light' }
});
</script>
```

### 9.4 避免不必要的重渲染

```vue
<script setup lang="ts">
import { ref, computed, memo } from 'vue';

const list = ref([1, 2, 3]);
const filter = ref('');

// 使用 computed 缓存过滤结果
const filteredList = computed(() => {
  return list.value.filter(item => 
    String(item).includes(filter.value)
  );
});

// 使用 memo 缓存组件
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{data}</div>;
});
</script>
```

---

## 10. 组合式 API vs 选项式 API

### 10.1 对比

| 特性 | Options API | Composition API |
|------|-------------|----------------|
| **组织方式** | 按选项组织（data, methods, computed） | 按功能组织 |
| **代码复用** | Mixins（有命名冲突问题） | Composables（无冲突） |
| **类型推断** | 需要额外配置 | 原生支持 |
| **逻辑关注点** | 分散在不同选项中 | 集中在一起 |
| **学习曲线** | 较低 | 较高 |

### 10.2 相同功能的两种写法

**Options API：**

```vue
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Counter extends Vue {
  // 数据
  count = 0;
  
  // 计算属性
  get doubled() {
    return this.count * 2;
  }
  
  // 方法
  increment() {
    this.count++;
  }
  
  decrement() {
    this.count--;
  }
  
  // 生命周期
  mounted() {
    console.log('Mounted');
  }
  
  beforeUnmount() {
    console.log('Before Unmount');
  }
}
</script>
```

**Composition API：**

```vue
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

// 数据
const count = ref(0);

// 计算属性
const doubled = computed(() => count.value * 2);

// 方法
function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}

// 生命周期
onMounted(() => {
  console.log('Mounted');
});

onBeforeUnmount(() => {
  console.log('Before Unmount');
});
</script>
```

---

## 11. 最佳实践

### 11.1 组件设计原则

1. **单一职责**：一个组件只做一件事
2. **可复用性**：组件应该可以在多个地方使用
3. **可测试性**：组件应该易于测试
4. **Props 向下传递**：数据通过 props 从父组件传递到子组件
5. **状态提升**：共享状态提升到最近的共同祖先

### 11.2 Composables 设计原则

1. **命名规范**：使用 `use` 前缀，如 `useFetch`, `useCounter`
2. **返回响应式状态**：返回 ref 或 reactive 对象
3. **保持独立性**：Composable 应该独立于组件使用
4. **清理副作用**：在组件卸载时清理定时器、事件监听等

### 11.3 性能优化清单

- [ ] 使用 `defineAsyncComponent` 懒加载组件
- [ ] 使用 `v-memo` 缓存静态内容
- [ ] 使用 `shallowRef` 处理大型不变对象
- [ ] 使用 `computed` 缓存计算结果
- [ ] 使用 `Object.freeze` 冻结静态数据
- [ ] 避免在模板中使用复杂表达式
- [ ] 使用 `key` 优化列表渲染

### 11.4 代码组织建议

```
src/
├── components/          # 通用组件
│   ├── Button/
│   │   ├── index.vue
│   │   └── style.scss
│   └── Card/
├── composables/         # 组合式函数
│   ├── useFetch.ts
│   ├── useCounter.ts
│   └── useLocalStorage.ts
├── directives/          # 自定义指令
│   ├── focus.ts
│   └── clickOutside.ts
├── utils/               # 工具函数
│   ├── request.ts
│   └── storage.ts
├── views/               # 页面组件
│   ├── Home.vue
│   └── About.vue
├── App.vue
└── main.ts
```

---

## 12. 总结

Vue 3 的核心在于理解其响应式系统和组合式 API：

1. **响应式系统**：基于 Proxy 实现，支持 ref、reactive、computed、watch
2. **组合式 API**：使用 setup 语法糖，按功能组织代码
3. **组件通信**：Props、Emits、v-model、Provide/Inject、事件总线
4. **模板语法**：丰富的指令系统，支持条件渲染、列表渲染、事件绑定
5. **性能优化**：懒加载、v-memo、浅层响应式等

掌握这些核心概念后，你就能写出高效、可维护的 Vue 3 代码。
