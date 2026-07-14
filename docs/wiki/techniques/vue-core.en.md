# Vue Core

> Vue is a progressive framework. Composition API is its core paradigm. Understanding the reactivity system and Composition API matters more than memorizing APIs.

---

## 1. Reactivity System

### 1.1 ref and reactive
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref, reactive } from &amp;amp;#039;vue&amp;amp;#039;;

// ref - for primitive types
const count = ref(0);
const name = ref(&amp;amp;#039;Vue&amp;amp;#039;);

// reactive - for objects
const state = reactive({
  todos: [],
  filter: &amp;amp;#039;all&amp;amp;#039;
});

// Access ref with .value
count.value++;

// Reactive accessed directly
state.todos.push({ id: 1, text: &amp;amp;#039;Learn Vue&amp;amp;#039; });
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
  { id: 1, text: &amp;amp;#039;Learn&amp;amp;#039;, done: false },
  { id: 2, text: &amp;amp;#039;Practice&amp;amp;#039;, done: true }
]);

const filteredTodos = computed(() =&amp;amp;gt; 
  todos.value.filter(t =&amp;amp;gt; !t.done)
);

const doneCount = computed(() =&amp;amp;gt; 
  todos.value.filter(t =&amp;amp;gt; t.done).length
);

// Writable computed
const fullName = computed({
  get: () =&amp;amp;gt; `${firstName.value} ${lastName.value}`,
  set: (value) =&amp;amp;gt; {
    [firstName.value, lastName.value] = value.split(&amp;amp;#039; &amp;amp;#039;);
  }
});
&amp;amp;lt;/script&amp;amp;gt;
```

### 1.3 watch and watchEffect
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref, watch, watchEffect } from &amp;amp;#039;vue&amp;amp;#039;;

const query = ref(&amp;amp;#039;&amp;amp;#039;);
const results = ref([]);

// watch - explicit dependencies
watch(query, async (newQuery, oldQuery) =&amp;amp;gt; {
  results.value = await search(newQuery);
});

// watch multiple values
watch([query, filter], async ([newQuery, newFilter]) =&amp;amp;gt; {
  results.value = await search(newQuery, newFilter);
});

// watchEffect - auto-track dependencies
watchEffect(async () =&amp;amp;gt; {
  results.value = await search(query.value);
});

// Cleanup side effects
watchEffect((onCleanup) =&amp;amp;gt; {
  const timer = setTimeout(() =&amp;amp;gt; {
    console.log(query.value);
  }, 1000);
  
  onCleanup(() =&amp;amp;gt; clearTimeout(timer));
});
&amp;amp;lt;/script&amp;amp;gt;
```

---

## 2. Composition API

### 2.1 setup Syntax Sugar
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
// Imports
import { ref, computed, onMounted } from &amp;amp;#039;vue&amp;amp;#039;;

// Reactive state
const count = ref(0);

// Computed
const doubled = computed(() =&amp;amp;gt; count.value * 2);

// Methods
function increment() {
  count.value++;
}

// Lifecycle
onMounted(() =&amp;amp;gt; {
  console.log(&amp;amp;#039;Component mounted&amp;amp;#039;);
});

// Define Props
const props = defineProps&amp;amp;lt;{
  title: string;
  count?: number;
}&amp;amp;gt;();

// Define Emits
const emit = defineEmits&amp;amp;lt;{
  (e: &amp;amp;#039;update&amp;amp;#039;, value: number): void;
  (e: &amp;amp;#039;delete&amp;amp;#039;, id: string): void;
}&amp;amp;gt;();

// Usage
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

### 2.2 Custom Composables
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

// Usage
const { count, increment } = useCounter(10);
const { data: users, loading } = useFetch(&amp;amp;#039;/api/users&amp;amp;#039;);
```

---

## 3. Lifecycle

### 3.1 Lifecycle Hooks
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
  // Before DOM mount
});

onMounted(() =&amp;amp;gt; {
  // After DOM mount, can access DOM
  const element = document.getElementById(&amp;amp;#039;my-element&amp;amp;#039;);
});

onBeforeUpdate(() =&amp;amp;gt; {
  // Before DOM update
});

onUpdated(() =&amp;amp;gt; {
  // After DOM update
});

onBeforeUnmount(() =&amp;amp;gt; {
  // Before component unmount
});

onUnmounted(() =&amp;amp;gt; {
  // After component unmount, cleanup timers, event listeners
  window.removeEventListener(&amp;amp;#039;resize&amp;amp;#039;, handler);
});

onErrorCaptured((err, instance, info) =&amp;amp;gt; {
  // Capture child component errors
  console.error(err, info);
  return false; // Prevent error propagation
});
&amp;amp;lt;/script&amp;amp;gt;
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
&amp;amp;lt;!-- Parent component --&amp;amp;gt;
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;CustomInput v-model=&amp;amp;quot;searchText&amp;amp;quot; /&amp;amp;gt;
  &amp;amp;lt;CustomCheckbox v-model:checked=&amp;amp;quot;isChecked&amp;amp;quot; /&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;!-- Child component CustomInput.vue --&amp;amp;gt;
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
&amp;amp;lt;!-- Ancestor component --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { provide, ref } from &amp;amp;#039;vue&amp;amp;#039;;

const theme = ref(&amp;amp;#039;light&amp;amp;#039;);
const toggleTheme = () =&amp;amp;gt; {
  theme.value = theme.value === &amp;amp;#039;light&amp;amp;#039; ? &amp;amp;#039;dark&amp;amp;#039; : &amp;amp;#039;light&amp;amp;#039;;
};

provide(&amp;amp;#039;theme&amp;amp;#039;, theme);
provide(&amp;amp;#039;toggleTheme&amp;amp;#039;, toggleTheme);
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;!-- Descendant component --&amp;amp;gt;
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { inject } from &amp;amp;#039;vue&amp;amp;#039;;

const theme = inject(&amp;amp;#039;theme&amp;amp;#039;);
const toggleTheme = inject(&amp;amp;#039;toggleTheme&amp;amp;#039;);
&amp;amp;lt;/script&amp;amp;gt;
```

---

## 5. Template Syntax

### 5.1 Directives
```vue
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;!-- Text interpolation --&amp;amp;gt;
  &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; message &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
  
  &amp;amp;lt;!-- HTML rendering --&amp;amp;gt;
  &amp;amp;lt;div v-html=&amp;amp;quot;htmlContent&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/div&amp;amp;gt;
  
  &amp;amp;lt;!-- Attribute binding --&amp;amp;gt;
  &amp;amp;lt;img :src=&amp;amp;quot;imageUrl&amp;amp;quot; :alt=&amp;amp;quot;imageAlt&amp;amp;quot; /&amp;amp;gt;
  
  &amp;amp;lt;!-- Event binding --&amp;amp;gt;
  &amp;amp;lt;button @click=&amp;amp;quot;handleClick&amp;amp;quot; @mouseenter=&amp;amp;quot;onHover&amp;amp;quot;&amp;amp;gt;Click&amp;amp;lt;/button&amp;amp;gt;
  
  &amp;amp;lt;!-- Conditional rendering --&amp;amp;gt;
  &amp;amp;lt;div v-if=&amp;amp;quot;status === &amp;amp;#039;loading&amp;amp;#039;&amp;amp;quot;&amp;amp;gt;Loading...&amp;amp;lt;/div&amp;amp;gt;
  &amp;amp;lt;div v-else-if=&amp;amp;quot;status === &amp;amp;#039;error&amp;amp;#039;&amp;amp;quot;&amp;amp;gt;Failed&amp;amp;lt;/div&amp;amp;gt;
  &amp;amp;lt;div v-else&amp;amp;gt;Success&amp;amp;lt;/div&amp;amp;gt;
  
  &amp;amp;lt;!-- List rendering --&amp;amp;gt;
  &amp;amp;lt;ul&amp;amp;gt;
    &amp;amp;lt;li v-for=&amp;amp;quot;(item, index) in items&amp;amp;quot; :key=&amp;amp;quot;item.id&amp;amp;quot;&amp;amp;gt;
      &amp;#123;&amp;#123; index &amp;#125;&amp;#125;. &amp;#123;&amp;#123; item.name &amp;#125;&amp;#125;
    &amp;amp;lt;/li&amp;amp;gt;
  &amp;amp;lt;/ul&amp;amp;gt;
  
  &amp;amp;lt;!-- Show/hide --&amp;amp;gt;
  &amp;amp;lt;div v-show=&amp;amp;quot;isVisible&amp;amp;quot;&amp;amp;gt;Content&amp;amp;lt;/div&amp;amp;gt;
  
  &amp;amp;lt;!-- Two-way binding --&amp;amp;gt;
  &amp;amp;lt;input v-model=&amp;amp;quot;searchQuery&amp;amp;quot; /&amp;amp;gt;
  
  &amp;amp;lt;!-- Modifiers --&amp;amp;gt;
  &amp;amp;lt;form @submit.prevent=&amp;amp;quot;handleSubmit&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;input @keyup.enter=&amp;amp;quot;submit&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;button @click.once=&amp;amp;quot;handleClick&amp;amp;quot;&amp;amp;gt;Trigger once&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/form&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 5.2 Template Refs
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

## 6. Slots

### 6.1 Default Slots
```vue
&amp;amp;lt;!-- Card.vue --&amp;amp;gt;
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div class=&amp;amp;quot;card&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;header&amp;amp;gt;
      &amp;amp;lt;slot name=&amp;amp;quot;header&amp;amp;quot;&amp;amp;gt;Default Title&amp;amp;lt;/slot&amp;amp;gt;
    &amp;amp;lt;/header&amp;amp;gt;
    &amp;amp;lt;main&amp;amp;gt;
      &amp;amp;lt;slot /&amp;amp;gt;
    &amp;amp;lt;/main&amp;amp;gt;
    &amp;amp;lt;footer&amp;amp;gt;
      &amp;amp;lt;slot name=&amp;amp;quot;footer&amp;amp;quot; /&amp;amp;gt;
    &amp;amp;lt;/footer&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;!-- Usage --&amp;amp;gt;
&amp;amp;lt;Card&amp;amp;gt;
  &amp;amp;lt;template #header&amp;amp;gt;
    &amp;amp;lt;h2&amp;amp;gt;Custom Title&amp;amp;lt;/h2&amp;amp;gt;
  &amp;amp;lt;/template&amp;amp;gt;
  
  &amp;amp;lt;p&amp;amp;gt;Card content&amp;amp;lt;/p&amp;amp;gt;
  
  &amp;amp;lt;template #footer&amp;amp;gt;
    &amp;amp;lt;button&amp;amp;gt;Action&amp;amp;lt;/button&amp;amp;gt;
  &amp;amp;lt;/template&amp;amp;gt;
&amp;amp;lt;/Card&amp;amp;gt;
```

### 6.2 Scoped Slots
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

&amp;amp;lt;!-- Usage --&amp;amp;gt;
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

## 7. Async Components

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

// Simple usage
const SimpleAsync = defineAsyncComponent(() =&amp;amp;gt; import(&amp;amp;#039;./Simple.vue&amp;amp;#039;));
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;Suspense&amp;amp;gt;
    &amp;amp;lt;template #default&amp;amp;gt;
      &amp;amp;lt;AsyncComponent /&amp;amp;gt;
    &amp;amp;lt;/template&amp;amp;gt;
    &amp;amp;lt;template #fallback&amp;amp;gt;
      &amp;amp;lt;div&amp;amp;gt;Loading...&amp;amp;lt;/div&amp;amp;gt;
    &amp;amp;lt;/template&amp;amp;gt;
  &amp;amp;lt;/Suspense&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

---

## 8. Performance Optimization

### 8.1 Component Lazy Loading
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { defineAsyncComponent } from &amp;amp;#039;vue&amp;amp;#039;;

const HeavyComponent = defineAsyncComponent(() =&amp;amp;gt; 
  import(&amp;amp;#039;./HeavyComponent.vue&amp;amp;#039;)
);
&amp;amp;lt;/script&amp;amp;gt;
```

### 8.2 v-memo (Vue 3.2+)
```vue
&amp;amp;lt;template&amp;amp;gt;
  &amp;amp;lt;div v-memo=&amp;amp;quot;[selectedItem.id]&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; selectedItem.name &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
    &amp;amp;lt;p&amp;amp;gt;&amp;#123;&amp;#123; selectedItem.description &amp;#125;&amp;#125;&amp;amp;lt;/p&amp;amp;gt;
  &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;
```

### 8.3 Avoid Unnecessary Reactivity
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
import { ref, shallowRef } from &amp;amp;#039;vue&amp;amp;#039;;

// ref - deep reactivity
const deepData = ref({ nested: { value: 1 } });

// shallowRef - shallow reactivity, better performance
const largeData = shallowRef({ nested: { value: 1 } });

// Freeze large objects
const staticData = Object.freeze({ /* large data */ });
&amp;amp;lt;/script&amp;amp;gt;
```

---

## 9. Related Concepts

- [Vue Ecosystem](../tools/vue-ecosystem.en.md)
- [Component Architecture](../concepts/component-architecture.en.md)
- [State Management](../concepts/state-management.en.md)
- [Rendering Strategies](../concepts/rendering-strategies.en.md)
