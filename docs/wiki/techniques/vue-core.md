# Vue 核心

> Vue 是渐进式框架，组合式 API 是其核心范式。理解响应式系统、组合式 API 比记忆 API 重要。

---

## 1. 响应式系统

### 1.1 ref 和 reactive

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref, reactive } from &amp;amp;#039;vue&amp;amp;#039;;

// ref - 用于基本类型
const count = ref(0);
const name = ref(&amp;amp;#039;Vue&amp;amp;#039;);

// reactive - 用于对象
const state = reactive({
  todos: [],
  filter: &amp;amp;#039;all&amp;amp;#039;
});

// 访问 ref 需要 .value
count.value++;

// reactive 直接访问
state.todos.push({ id: 1, text: &amp;amp;#039;学习 Vue&amp;amp;#039; });
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; count &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; name &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; state.filter &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 1.2 computed

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref, computed } from &amp;amp;#039;vue&amp;amp;#039;;

const todos = ref([
  { id: 1, text: &amp;amp;#039;学习&amp;amp;#039;, done: false },
  { id: 2, text: &amp;amp;#039;练习&amp;amp;#039;, done: true }
]);

const filteredTodos = computed(() =&amp;amp;gt; 
  todos.value.filter(t =&amp;amp;gt; !t.done)
);

const doneCount = computed(() =&amp;amp;gt; 
  todos.value.filter(t =&amp;amp;gt; t.done).length
);

// 可写 computed
const fullName = computed({
  get: () =&amp;amp;gt; `${firstName.value} ${lastName.value}`,
  set: (value) =&amp;amp;gt; {
    [firstName.value, lastName.value] = value.split(&amp;amp;#039; &amp;amp;#039;);
  }
});
&amp;amp;lt;/script&amp;amp;gt;
```

### 1.3 watch 和 watchEffect

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref, watch, watchEffect } from &amp;amp;#039;vue&amp;amp;#039;;

const query = ref(&amp;amp;#039;&amp;amp;#039;);
const results = ref([]);

// watch - 明确依赖
watch(query, async (newQuery, oldQuery) =&amp;amp;gt; {
  results.value = await search(newQuery);
});

// watch 多个值
watch([query, filter], async ([newQuery, newFilter]) =&amp;amp;gt; {
  results.value = await search(newQuery, newFilter);
});

// watchEffect - 自动追踪依赖
watchEffect(async () =&amp;amp;gt; {
  results.value = await search(query.value);
});

// 清理副作用
watchEffect((onCleanup) =&amp;amp;gt; {
  const timer = setTimeout(() =&amp;amp;gt; {
    console.log(query.value);
  }, 1000);
  
  onCleanup(() =&amp;amp;gt; clearTimeout(timer));
});
&amp;amp;lt;/script&amp;amp;gt;
```

---

## 2. 组合式 API

### 2.1 setup 语法糖

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
// 导入
import { ref, computed, onMounted } from &amp;amp;#039;vue&amp;amp;#039;;

// 响应式状态
const count = ref(0);

// 计算属性
const doubled = computed(() =&amp;amp;gt; count.value * 2);

// 方法
function increment() {
  count.value++;
}

// 生命周期
onMounted(() =&amp;amp;gt; {
  console.log(&amp;amp;#039;组件挂载&amp;amp;#039;);
});

// 定义 Props
const props = defineProps&amp;amp;lt;{
  title: string;
  count?: number;
}&amp;amp;gt;();

// 定义 Emits
const emit = defineEmits&amp;amp;lt;{
  (e: &amp;amp;#039;update&amp;amp;#039;, value: number): void;
  (e: &amp;amp;#039;delete&amp;amp;#039;, id: string): void;
}&amp;amp;gt;();

// 使用
function handleClick() {
  emit(&amp;amp;#039;update&amp;amp;#039;, count.value);
}
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;h1&amp;amp;gt;&amp;#123;&amp;#123; title &amp;#125;&amp;#125;&amp;amp;lt;/h1&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; count &amp;#125;&amp;#125; - &amp;#123;&amp;#123; doubled &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
    &amp;amp;lt;button @click=&amp;amp;quot;increment&amp;amp;quot;&amp;amp;gt;+1&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 2.2 自定义 Composables

```typescript
// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () =&amp;amp;gt; count.value++;
  const decrement = () =&amp;amp;gt; count.value--;
  const reset = () =&amp;amp;gt; count.value = initialValue;
  
  return { count, increment, decrement, reset };
}

// composables/useFetch.ts
export function useFetch&amp;amp;lt;T&amp;amp;gt;(url: string) {
  const data = ref&amp;amp;lt;T | null&amp;amp;gt;(null);
  const error = ref&amp;amp;lt;Error | null&amp;amp;gt;(null);
  const loading = ref(true);
  
  watch(
    () =&amp;amp;gt; url,
    async (url) =&amp;amp;gt; {
      loading.value = true;
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

// 使用
const { count, increment } = useCounter(10);
const { data: users, loading } = useFetch(&amp;amp;#039;/api/users&amp;amp;#039;);
```

---

## 3. 生命周期

### 3.1 生命周期钩子

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from &amp;amp;#039;vue&amp;amp;#039;;

onBeforeMount(() =&amp;amp;gt; {
  // DOM 挂载前
});

onMounted(() =&amp;amp;gt; {
  // DOM 挂载后，可以访问 DOM
  const element = document.getElementById(&amp;amp;#039;my-element&amp;amp;#039;);
});

onBeforeUpdate(() =&amp;amp;gt; {
  // DOM 更新前
});

onUpdated(() =&amp;amp;gt; {
  // DOM 更新后
});

onBeforeUnmount(() =&amp;amp;gt; {
  // 组件卸载前
});

onUnmounted(() =&amp;amp;gt; {
  // 组件卸载后，清理定时器、事件监听等
  window.removeEventListener(&amp;amp;#039;resize&amp;amp;#039;, handler);
});

onErrorCaptured((err, instance, info) =&amp;amp;gt; {
  // 捕获子组件错误
  console.error(err, info);
  return false; // 阻止错误继续传播
});
&amp;amp;lt;/script&amp;amp;gt;
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
&amp;amp;lt;!-- Parent.vue --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref } from &amp;amp;#039;vue&amp;amp;#039;;
import Child from &amp;amp;#039;./Child.vue&amp;amp;#039;;

const message = ref(&amp;amp;#039;Hello&amp;amp;#039;);
const count = ref(0);

function handleUpdate(value: number) {
  count.value = value;
}
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;Child 
    :message=&amp;amp;quot;message&amp;amp;quot; 
    :count=&amp;amp;quot;count&amp;amp;quot;
    @update=&amp;amp;quot;handleUpdate&amp;amp;quot;
  /&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;!-- Child.vue --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
defineProps&amp;amp;lt;{
  message: string;
  count: number;
}&amp;amp;gt;();

const emit = defineEmits&amp;amp;lt;{
  (e: &amp;amp;#039;update&amp;amp;#039;, value: number): void;
}&amp;amp;gt;();

function increment() {
  emit(&amp;amp;#039;update&amp;amp;#039;, count + 1);
}
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; message &amp;#125;&amp;#125;: &amp;#123;&amp;#123; count &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
    &amp;amp;lt;button @click=&amp;amp;quot;increment&amp;amp;quot;&amp;amp;gt;+1&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 4.2 v-model

```vue
&amp;amp;lt;!-- 父组件 --&amp;amp;gt;
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;CustomInput v-model=&amp;amp;quot;searchText&amp;amp;quot; /&amp;amp;gt;
  &amp;amp;lt;CustomCheckbox v-model:checked=&amp;amp;quot;isChecked&amp;amp;quot; /&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;!-- 子组件 CustomInput.vue --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
defineProps&amp;amp;lt;{
  modelValue: string;
}&amp;amp;gt;();

defineEmits&amp;amp;lt;{
  (e: &amp;amp;#039;update:modelValue&amp;amp;#039;, value: string): void;
}&amp;amp;gt;();
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;input 
    :value=&amp;amp;quot;modelValue&amp;amp;quot; 
    @input=&amp;amp;quot;$emit(&amp;amp;#039;update:modelValue&amp;amp;#039;, ($event.target as HTMLInputElement).value)&amp;amp;quot;
  /&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 4.3 Provide / Inject

```vue
&amp;amp;lt;!-- 祖先组件 --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { provide, ref } from &amp;amp;#039;vue&amp;amp;#039;;

const theme = ref(&amp;amp;#039;light&amp;amp;#039;);
const toggleTheme = () =&amp;amp;gt; {
  theme.value = theme.value === &amp;amp;#039;light&amp;amp;#039; ? &amp;amp;#039;dark&amp;amp;#039; : &amp;amp;#039;light&amp;amp;#039;;
};

provide(&amp;amp;#039;theme&amp;amp;#039;, theme);
provide(&amp;amp;#039;toggleTheme&amp;amp;#039;, toggleTheme);
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;!-- 后代组件 --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { inject } from &amp;amp;#039;vue&amp;amp;#039;;

const theme = inject(&amp;amp;#039;theme&amp;amp;#039;);
const toggleTheme = inject(&amp;amp;#039;toggleTheme&amp;amp;#039;);
&amp;amp;lt;/script&amp;amp;gt;
```

### 4.4 事件总线 (Vue 3 推荐 mitt)

```typescript
// utils/emitter.ts
import mitt from &amp;amp;#039;mitt&amp;amp;#039;;

export const emitter = mitt();

// 发送事件
emitter.emit(&amp;amp;#039;user-login&amp;amp;#039;, { id: 1, name: &amp;amp;#039;Alice&amp;amp;#039; });

// 监听事件
emitter.on(&amp;amp;#039;user-login&amp;amp;#039;, (data) =&amp;amp;gt; {
  console.log(&amp;amp;#039;用户登录:&amp;amp;#039;, data);
});

// 移除监听
emitter.off(&amp;amp;#039;user-login&amp;amp;#039;);
```

---

## 5. 模板语法

### 5.1 指令

```vue
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;!-- 文本插值 --&amp;amp;gt;
  &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; message &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
  
  &amp;amp;lt;!-- HTML 渲染 --&amp;amp;gt;
  &amp;amp;lt;div v-html=&amp;amp;quot;htmlContent&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/div&amp;amp;gt;
  
  &amp;amp;lt;!-- 属性绑定 --&amp;amp;gt;
  &amp;amp;lt;img :src=&amp;amp;quot;imageUrl&amp;amp;quot; :alt=&amp;amp;quot;imageAlt&amp;amp;quot; /&amp;amp;gt;
  
  &amp;amp;lt;!-- 事件绑定 --&amp;amp;gt;
  &amp;amp;lt;button @click=&amp;amp;quot;handleClick&amp;amp;quot; @mouseenter=&amp;amp;quot;onHover&amp;amp;quot;&amp;amp;gt;点击&amp;amp;lt;/button&amp;amp;gt;
  
  &amp;amp;lt;!-- 条件渲染 --&amp;amp;gt;
  &amp;amp;lt;div v-if=&amp;amp;quot;status === &amp;amp;#039;loading&amp;amp;#039;&amp;amp;quot;&amp;amp;gt;加载中...&amp;amp;lt;/div&amp;amp;gt;
  &amp;amp;lt;div v-else-if=&amp;amp;quot;status === &amp;amp;#039;error&amp;amp;#039;&amp;amp;quot;&amp;amp;gt;加载失败&amp;amp;lt;/div&amp;amp;gt;
  &amp;amp;lt;div v-else&amp;amp;gt;加载成功&amp;amp;lt;/div&amp;amp;gt;
  
  &amp;amp;lt;!-- 列表渲染 --&amp;amp;gt;
  &amp;amp;lt;ul&amp;amp;gt;
    &amp;amp;lt;li v-for=&amp;amp;quot;(item, index) in items&amp;amp;quot; :key=&amp;amp;quot;item.id&amp;amp;quot;&amp;amp;gt;
      &amp;#123;&amp;#123; index &amp;#125;&amp;#125;. &amp;#123;&amp;#123; item.name &amp;#125;&amp;#125;
    &amp;amp;lt;/li&amp;amp;gt;
  &amp;amp;lt;/ul&amp;amp;gt;
  
  &amp;amp;lt;!-- 显示/隐藏 --&amp;amp;gt;
  &amp;amp;lt;div v-show=&amp;amp;quot;isVisible&amp;amp;quot;&amp;amp;gt;内容&amp;amp;lt;/div&amp;amp;gt;
  
  &amp;amp;lt;!-- 双向绑定 --&amp;amp;gt;
  &amp;amp;lt;input v-model=&amp;amp;quot;searchQuery&amp;amp;quot; /&amp;amp;gt;
  
  &amp;amp;lt;!-- 修饰符 --&amp;amp;gt;
  &amp;amp;lt;form @submit.prevent=&amp;amp;quot;handleSubmit&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;input @keyup.enter=&amp;amp;quot;submit&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;button @click.once=&amp;amp;quot;handleClick&amp;amp;quot;&amp;amp;gt;只触发一次&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/form&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 5.2 模板 Refs

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref, onMounted } from &amp;amp;#039;vue&amp;amp;#039;;

const inputRef = ref&amp;amp;lt;HTMLInputElement | null&amp;amp;gt;(null);
const componentRef = ref&amp;amp;lt;InstanceType&amp;amp;lt;typeof MyComponent&amp;amp;gt; | null&amp;amp;gt;(null);

onMounted(() =&amp;amp;gt; {
  inputRef.value?.focus();
  componentRef.value?.someMethod();
});
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;input ref=&amp;amp;quot;inputRef&amp;amp;quot; /&amp;amp;gt;
  &amp;amp;lt;MyComponent ref=&amp;amp;quot;componentRef&amp;amp;quot; /&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

---

## 6. 插槽 (Slots)

### 6.1 默认插槽

```vue
&amp;amp;lt;!-- Card.vue --&amp;amp;gt;
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div class=&amp;amp;quot;card&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;header&amp;amp;gt;
      &amp;amp;lt;slot name=&amp;amp;quot;header&amp;amp;quot;&amp;amp;gt;默认标题&amp;amp;lt;/slot&amp;amp;gt;
    &amp;amp;lt;/header&amp;amp;gt;
    &amp;amp;lt;main&amp;amp;gt;
      &amp;amp;lt;slot /&amp;amp;gt;
    &amp;amp;lt;/main&amp;amp;gt;
    &amp;amp;lt;footer&amp;amp;gt;
      &amp;amp;lt;slot name=&amp;amp;quot;footer&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;/footer&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;!-- 使用 --&amp;amp;gt;
&amp;amp;lt;Card&amp;amp;gt;
  &amp;amp;lt;template #header&amp;amp;gt;
    &amp;amp;lt;h2&amp;amp;gt;自定义标题&amp;amp;lt;/h2&amp;amp;gt;
  &amp;amp;lt;/template&amp;amp;gt;
  
  &amp;amp;lt;p&amp;amp;gt;卡片内容&amp;amp;lt;/p&amp;amp;gt;
  
  &amp;amp;lt;template #footer&amp;amp;gt;
    &amp;amp;lt;button&amp;amp;gt;操作&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/template&amp;amp;gt;
&amp;amp;lt;/Card&amp;amp;gt;
```

### 6.2 作用域插槽

```vue
&amp;amp;lt;!-- List.vue --&amp;amp;gt;
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;ul&amp;amp;gt;
    &amp;amp;lt;li v-for=&amp;amp;quot;item in items&amp;amp;quot; :key=&amp;amp;quot;item.id&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;slot :item=&amp;amp;quot;item&amp;amp;quot; :index=&amp;amp;quot;index&amp;amp;quot;&amp;amp;gt;
        &amp;#123;&amp;#123; item.name &amp;#125;&amp;#125;
      &amp;amp;lt;/slot&amp;amp;gt;
    &amp;amp;lt;/li&amp;amp;gt;
  &amp;amp;lt;/ul&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;!-- 使用 --&amp;amp;gt;
&amp;amp;lt;List :items=&amp;amp;quot;users&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;template #default=&amp;amp;quot;{ item, index }&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;div class=&amp;amp;quot;user-card&amp;amp;quot;&amp;amp;gt;
      &amp;amp;lt;img :src=&amp;amp;quot;item.avatar&amp;amp;quot; /&amp;amp;gt;
      &amp;amp;lt;span&amp;amp;gt;&amp;#123;&amp;#123; index &amp;#125;&amp;#125;. &amp;#123;&amp;#123; item.name &amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
  &amp;amp;lt;/template&amp;amp;gt;
&amp;amp;lt;/List&amp;amp;gt;
```

---

## 7. 异步组件

### 7.1 defineAsyncComponent

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { defineAsyncComponent } from &amp;amp;#039;vue&amp;amp;#039;;

const AsyncComponent = defineAsyncComponent({
  loader: () =&amp;amp;gt; import(&amp;amp;#039;./HeavyComponent.vue&amp;amp;#039;),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000
});

// 简单用法
const SimpleAsync = defineAsyncComponent(() =&amp;amp;gt; import(&amp;amp;#039;./Simple.vue&amp;amp;#039;));
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;Suspense&amp;amp;gt;
    &amp;amp;lt;template #default&amp;amp;gt;
      &amp;amp;lt;AsyncComponent /&amp;amp;gt;
    &amp;amp;lt;/template&amp;amp;gt;
    &amp;amp;lt;template #fallback&amp;amp;gt;
      &amp;amp;lt;div&amp;amp;gt;加载中...&amp;amp;lt;/div&amp;amp;gt;
    &amp;amp;lt;/template&amp;amp;gt;
  &amp;amp;lt;/Suspense&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

---

## 8. 自定义指令

```typescript
// directives/focus.ts
export const vFocus = {
  mounted: (el: HTMLElement) =&amp;amp;gt; el.focus()
};

// directives/click-outside.ts
export const vClickOutside = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: Event) =&amp;amp;gt; {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    document.addEventListener(&amp;amp;#039;click&amp;amp;#039;, el.clickOutsideEvent);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener(&amp;amp;#039;click&amp;amp;#039;, el.clickOutsideEvent);
  }
};

// 使用
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { vFocus, vClickOutside } from &amp;amp;#039;@/directives&amp;amp;#039;;
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;input v-focus /&amp;amp;gt;
  &amp;amp;lt;div v-click-outside=&amp;amp;quot;handleClickOutside&amp;amp;quot;&amp;amp;gt;点击外部关闭&amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

---

## 9. 性能优化

### 9.1 组件懒加载

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { defineAsyncComponent } from &amp;amp;#039;vue&amp;amp;#039;;

const HeavyComponent = defineAsyncComponent(() =&amp;amp;gt; 
  import(&amp;amp;#039;./HeavyComponent.vue&amp;amp;#039;)
);
&amp;amp;lt;/script&amp;amp;gt;
```

### 9.2 v-memo (Vue 3.2+)

```vue
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div v-memo=&amp;amp;quot;[selectedItem.id]&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; selectedItem.name &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; selectedItem.description &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 9.3 避免不必要的响应式

```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref, shallowRef } from &amp;amp;#039;vue&amp;amp;#039;;

// ref - 深度响应式
const deepData = ref({ nested: { value: 1 } });

// shallowRef - 浅层响应式，性能更好
const largeData = shallowRef({ nested: { value: 1 } });

// 冻结大对象
const staticData = Object.freeze({ /* 大量数据 */ });
&amp;amp;lt;/script&amp;amp;gt;
```

---

## 10. 相关概念

- [Vue 生态](../tools/vue-ecosystem.md)
- [组件架构](../concepts/component-architecture.md)
- [状态管理](../concepts/state-management.md)
- [渲染策略](../concepts/rendering-strategies.md)
