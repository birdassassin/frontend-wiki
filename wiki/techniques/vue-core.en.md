# Vue Core

> Vue is a progressive framework. Composition API is its core paradigm. Understanding the reactivity system and Composition API matters more than memorizing APIs.

---

## 1. Reactivity System

### 1.1 ref and reactive
```vue
<script setup lang="ts">
import { ref, reactive } from 'vue';

// ref - for primitive types
const count = ref(0);
const name = ref('Vue');

// reactive - for objects
const state = reactive({
  todos: [],
  filter: 'all'
});

// Access ref with .value
count.value++;

// Reactive accessed directly
state.todos.push({ id: 1, text: 'Learn Vue' });
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ name }}</p>
    <p>{{ state.filter }}</p>
  </div>
</template>
```

### 1.2 computed
```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const todos = ref([
  { id: 1, text: 'Learn', done: false },
  { id: 2, text: 'Practice', done: true }
]);

const filteredTodos = computed(() => 
  todos.value.filter(t => !t.done)
);

const doneCount = computed(() => 
  todos.value.filter(t => t.done).length
);

// Writable computed
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (value) => {
    [firstName.value, lastName.value] = value.split(' ');
  }
});
</script>
```

### 1.3 watch and watchEffect
```vue
<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';

const query = ref('');
const results = ref([]);

// watch - explicit dependencies
watch(query, async (newQuery, oldQuery) => {
  results.value = await search(newQuery);
});

// watch multiple values
watch([query, filter], async ([newQuery, newFilter]) => {
  results.value = await search(newQuery, newFilter);
});

// watchEffect - auto-track dependencies
watchEffect(async () => {
  results.value = await search(query.value);
});

// Cleanup side effects
watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    console.log(query.value);
  }, 1000);
  
  onCleanup(() => clearTimeout(timer));
});
</script>
```

---

## 2. Composition API

### 2.1 setup Syntax Sugar
```vue
<script setup lang="ts">
// Imports
import { ref, computed, onMounted } from 'vue';

// Reactive state
const count = ref(0);

// Computed
const doubled = computed(() => count.value * 2);

// Methods
function increment() {
  count.value++;
}

// Lifecycle
onMounted(() => {
  console.log('Component mounted');
});

// Define Props
const props = defineProps<{
  title: string;
  count?: number;
}>();

// Define Emits
const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'delete', id: string): void;
}>();

// Usage
function handleClick() {
  emit('update', count.value);
}
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ count }} - {{ doubled }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 2.2 Custom Composables
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

// Usage
const { count, increment } = useCounter(10);
const { data: users, loading } = useFetch('/api/users');
```

---

## 3. Lifecycle

### 3.1 Lifecycle Hooks
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
  // Before DOM mount
});

onMounted(() => {
  // After DOM mount, can access DOM
  const element = document.getElementById('my-element');
});

onBeforeUpdate(() => {
  // Before DOM update
});

onUpdated(() => {
  // After DOM update
});

onBeforeUnmount(() => {
  // Before component unmount
});

onUnmounted(() => {
  // After component unmount, cleanup timers, event listeners
  window.removeEventListener('resize', handler);
});

onErrorCaptured((err, instance, info) => {
  // Capture child component errors
  console.error(err, info);
  return false; // Prevent error propagation
});
</script>
```

### 3.2 Lifecycle Comparison
| Vue 2 | Vue 3 (Composition) |
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

## 4. Component Communication

### 4.1 Props and Emits
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
    <p>{{ message }}: {{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 4.2 v-model
```vue
<!-- Parent component -->
<template>
  <CustomInput v-model="searchText" />
  <CustomCheckbox v-model:checked="isChecked" />
</template>

<!-- Child component CustomInput.vue -->
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
<!-- Ancestor component -->
<script setup lang="ts">
import { provide, ref } from 'vue';

const theme = ref('light');
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

provide('theme', theme);
provide('toggleTheme', toggleTheme);
</script>

<!-- Descendant component -->
<script setup lang="ts">
import { inject } from 'vue';

const theme = inject('theme');
const toggleTheme = inject('toggleTheme');
</script>
```

---

## 5. Template Syntax

### 5.1 Directives
```vue
<template>
  <!-- Text interpolation -->
  <p>{{ message }}</p>
  
  <!-- HTML rendering -->
  <div v-html="htmlContent"></div>
  
  <!-- Attribute binding -->
  <img :src="imageUrl" :alt="imageAlt" />
  
  <!-- Event binding -->
  <button @click="handleClick" @mouseenter="onHover">Click</button>
  
  <!-- Conditional rendering -->
  <div v-if="status === 'loading'">Loading...</div>
  <div v-else-if="status === 'error'">Failed</div>
  <div v-else>Success</div>
  
  <!-- List rendering -->
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      {{ index }}. {{ item.name }}
    </li>
  </ul>
  
  <!-- Show/hide -->
  <div v-show="isVisible">Content</div>
  
  <!-- Two-way binding -->
  <input v-model="searchQuery" />
  
  <!-- Modifiers -->
  <form @submit.prevent="handleSubmit">
    <input @keyup.enter="submit" />
    <button @click.once="handleClick">Trigger once</button>
  </form>
</template>
```

### 5.2 Template Refs
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

## 6. Slots

### 6.1 Default Slots
```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <header>
      <slot name="header">Default Title</slot>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<!-- Usage -->
<Card>
  <template #header>
    <h2>Custom Title</h2>
  </template>
  
  <p>Card content</p>
  
  <template #footer>
    <button>Action</button>
  </template>
</Card>
```

### 6.2 Scoped Slots
```vue
<!-- List.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="index">
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>

<!-- Usage -->
<List :items="users">
  <template #default="{ item, index }">
    <div class="user-card">
      <img :src="item.avatar" />
      <span>{{ index }}. {{ item.name }}</span>
    </div>
  </template>
</List>
```

---

## 7. Async Components

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

// Simple usage
const SimpleAsync = defineAsyncComponent(() => import('./Simple.vue'));
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

---

## 8. Performance Optimization

### 8.1 Component Lazy Loading
```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
);
</script>
```

### 8.2 v-memo (Vue 3.2+)
```vue
<template>
  <div v-memo="[selectedItem.id]">
    <p>{{ selectedItem.name }}</p>
    <p>{{ selectedItem.description }}</p>
  </div>
</template>
```

### 8.3 Avoid Unnecessary Reactivity
```vue
<script setup lang="ts">
import { ref, shallowRef } from 'vue';

// ref - deep reactivity
const deepData = ref({ nested: { value: 1 } });

// shallowRef - shallow reactivity, better performance
const largeData = shallowRef({ nested: { value: 1 } });

// Freeze large objects
const staticData = Object.freeze({ /* large data */ });
</script>
```

---

## 9. Related Concepts

- [Vue Ecosystem](../tools/vue-ecosystem.en.md)
- [Component Architecture](../concepts/component-architecture.en.md)
- [State Management](../concepts/state-management.en.md)
- [Rendering Strategies](../concepts/rendering-strategies.en.md)
