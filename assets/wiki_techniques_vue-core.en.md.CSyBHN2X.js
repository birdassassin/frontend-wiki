import{_ as s,o as p,c as i,a2 as n}from"./chunks/framework.BWuWLRhz.js";const d=JSON.parse('{"title":"Vue Core","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/techniques/vue-core.en.md","filePath":"wiki/techniques/vue-core.en.md"}'),t={name:"wiki/techniques/vue-core.en.md"};function l(e,a,m,h,E,k){return p(),i("div",null,[...a[0]||(a[0]=[n(`<h1 id="vue-core" tabindex="-1">Vue Core <a class="header-anchor" href="#vue-core" aria-label="Permalink to &quot;Vue Core&quot;">​</a></h1><blockquote><p>Vue is a progressive framework. Composition API is its core paradigm. Understanding the reactivity system and Composition API matters more than memorizing APIs.</p></blockquote><hr><h2 id="_1-reactivity-system" tabindex="-1">1. Reactivity System <a class="header-anchor" href="#_1-reactivity-system" aria-label="Permalink to &quot;1. Reactivity System&quot;">​</a></h2><h3 id="_1-1-ref-and-reactive" tabindex="-1">1.1 ref and reactive <a class="header-anchor" href="#_1-1-ref-and-reactive" aria-label="Permalink to &quot;1.1 ref and reactive&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, reactive } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// ref - for primitive types</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const count = ref(0);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const name = ref(&amp;amp;amp;#039;Vue&amp;amp;amp;#039;);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// reactive - for objects</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const state = reactive({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  todos: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  filter: &amp;amp;amp;#039;all&amp;amp;amp;#039;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Access ref with .value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">count.value++;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Reactive accessed directly</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">state.todos.push({ id: 1, text: &amp;amp;amp;#039;Learn Vue&amp;amp;amp;#039; });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; count &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; name &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; state.filter &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_1-2-computed" tabindex="-1">1.2 computed <a class="header-anchor" href="#_1-2-computed" aria-label="Permalink to &quot;1.2 computed&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, computed } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const todos = ref([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { id: 1, text: &amp;amp;amp;#039;Learn&amp;amp;amp;#039;, done: false },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { id: 2, text: &amp;amp;amp;#039;Practice&amp;amp;amp;#039;, done: true }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const filteredTodos = computed(() =&amp;amp;amp;gt; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  todos.value.filter(t =&amp;amp;amp;gt; !t.done)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doneCount = computed(() =&amp;amp;amp;gt; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  todos.value.filter(t =&amp;amp;amp;gt; t.done).length</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Writable computed</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const fullName = computed({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  get: () =&amp;amp;amp;gt; \`\${firstName.value} \${lastName.value}\`,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  set: (value) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [firstName.value, lastName.value] = value.split(&amp;amp;amp;#039; &amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_1-3-watch-and-watcheffect" tabindex="-1">1.3 watch and watchEffect <a class="header-anchor" href="#_1-3-watch-and-watcheffect" aria-label="Permalink to &quot;1.3 watch and watchEffect&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, watch, watchEffect } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const query = ref(&amp;amp;amp;#039;&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const results = ref([]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// watch - explicit dependencies</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watch(query, async (newQuery, oldQuery) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  results.value = await search(newQuery);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// watch multiple values</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watch([query, filter], async ([newQuery, newFilter]) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  results.value = await search(newQuery, newFilter);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// watchEffect - auto-track dependencies</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watchEffect(async () =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  results.value = await search(query.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Cleanup side effects</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watchEffect((onCleanup) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  const timer = setTimeout(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.log(query.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }, 1000);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onCleanup(() =&amp;amp;amp;gt; clearTimeout(timer));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_2-composition-api" tabindex="-1">2. Composition API <a class="header-anchor" href="#_2-composition-api" aria-label="Permalink to &quot;2. Composition API&quot;">​</a></h2><h3 id="_2-1-setup-syntax-sugar" tabindex="-1">2.1 setup Syntax Sugar <a class="header-anchor" href="#_2-1-setup-syntax-sugar" aria-label="Permalink to &quot;2.1 setup Syntax Sugar&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Imports</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, computed, onMounted } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Reactive state</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const count = ref(0);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Computed</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubled = computed(() =&amp;amp;amp;gt; count.value * 2);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Methods</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">function increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  count.value++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Lifecycle</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onMounted(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(&amp;amp;amp;#039;Component mounted&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Define Props</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const props = defineProps&amp;amp;amp;lt;{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  title: string;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  count?: number;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&amp;amp;amp;gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Define Emits</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const emit = defineEmits&amp;amp;amp;lt;{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (e: &amp;amp;amp;#039;update&amp;amp;amp;#039;, value: number): void;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (e: &amp;amp;amp;#039;delete&amp;amp;amp;#039;, id: string): void;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&amp;amp;amp;gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Usage</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">function handleClick() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  emit(&amp;amp;amp;#039;update&amp;amp;amp;#039;, count.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;h1&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; title &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/h1&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; count &amp;amp;#125;&amp;amp;#125; - &amp;amp;#123;&amp;amp;#123; doubled &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;button @click=&amp;amp;amp;quot;increment&amp;amp;amp;quot;&amp;amp;amp;gt;+1&amp;amp;amp;lt;/button&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_2-2-custom-composables" tabindex="-1">2.2 Custom Composables <a class="header-anchor" href="#_2-2-custom-composables" aria-label="Permalink to &quot;2.2 Custom Composables&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// composables/useCounter.ts</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">initialValue</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> count</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(initialValue);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> increment</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt; count.value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> decrement</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt; count.value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> reset</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt; count.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> initialValue;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { count, increment, decrement, reset };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// composables/useFetch.ts</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useFetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">amp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;amp;lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> data</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> error</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ref</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;Error </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> loading</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  watch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt; url,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    async</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (url) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      loading.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      try {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        data.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(url).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt; r.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">json</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">());</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      } catch (e) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        error.value = e as Error;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      } finally {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        loading.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    { immediate: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  );</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { data, error, loading };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Usage</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">increment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">users</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">loading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useFetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">api</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">users</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;);</span></span></code></pre></div><hr><h2 id="_3-lifecycle" tabindex="-1">3. Lifecycle <a class="header-anchor" href="#_3-lifecycle" aria-label="Permalink to &quot;3. Lifecycle&quot;">​</a></h2><h3 id="_3-1-lifecycle-hooks" tabindex="-1">3.1 Lifecycle Hooks <a class="header-anchor" href="#_3-1-lifecycle-hooks" aria-label="Permalink to &quot;3.1 Lifecycle Hooks&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onBeforeMount,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onMounted,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onBeforeUpdate,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onUpdated,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onBeforeUnmount,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onUnmounted,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onErrorCaptured</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onBeforeMount(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // Before DOM mount</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onMounted(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // After DOM mount, can access DOM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  const element = document.getElementById(&amp;amp;amp;#039;my-element&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onBeforeUpdate(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // Before DOM update</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onUpdated(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // After DOM update</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onBeforeUnmount(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // Before component unmount</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onUnmounted(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // After component unmount, cleanup timers, event listeners</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  window.removeEventListener(&amp;amp;amp;#039;resize&amp;amp;amp;#039;, handler);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onErrorCaptured((err, instance, info) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // Capture child component errors</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.error(err, info);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  return false; // Prevent error propagation</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_3-2-lifecycle-comparison" tabindex="-1">3.2 Lifecycle Comparison <a class="header-anchor" href="#_3-2-lifecycle-comparison" aria-label="Permalink to &quot;3.2 Lifecycle Comparison&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Vue 2</th><th>Vue 3 (Composition)</th></tr></thead><tbody><tr><td>beforeCreate</td><td>setup()</td></tr><tr><td>created</td><td>setup()</td></tr><tr><td>beforeMount</td><td>onBeforeMount</td></tr><tr><td>mounted</td><td>onMounted</td></tr><tr><td>beforeUpdate</td><td>onBeforeUpdate</td></tr><tr><td>updated</td><td>onUpdated</td></tr><tr><td>beforeDestroy</td><td>onBeforeUnmount</td></tr><tr><td>destroyed</td><td>onUnmounted</td></tr><tr><td>errorCaptured</td><td>onErrorCaptured</td></tr></tbody></table><hr><h2 id="_4-component-communication" tabindex="-1">4. Component Communication <a class="header-anchor" href="#_4-component-communication" aria-label="Permalink to &quot;4. Component Communication&quot;">​</a></h2><h3 id="_4-1-props-and-emits" tabindex="-1">4.1 Props and Emits <a class="header-anchor" href="#_4-1-props-and-emits" aria-label="Permalink to &quot;4.1 Props and Emits&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Parent.vue --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import Child from &amp;amp;amp;#039;./Child.vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const message = ref(&amp;amp;amp;#039;Hello&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const count = ref(0);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">function handleUpdate(value: number) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  count.value = value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;Child </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    :message=&amp;amp;amp;quot;message&amp;amp;amp;quot; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    :count=&amp;amp;amp;quot;count&amp;amp;amp;quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @update=&amp;amp;amp;quot;handleUpdate&amp;amp;amp;quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Child.vue --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">defineProps&amp;amp;amp;lt;{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  message: string;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  count: number;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&amp;amp;amp;gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const emit = defineEmits&amp;amp;amp;lt;{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (e: &amp;amp;amp;#039;update&amp;amp;amp;#039;, value: number): void;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&amp;amp;amp;gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">function increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  emit(&amp;amp;amp;#039;update&amp;amp;amp;#039;, count + 1);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; message &amp;amp;#125;&amp;amp;#125;: &amp;amp;#123;&amp;amp;#123; count &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;button @click=&amp;amp;amp;quot;increment&amp;amp;amp;quot;&amp;amp;amp;gt;+1&amp;amp;amp;lt;/button&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_4-2-v-model" tabindex="-1">4.2 v-model <a class="header-anchor" href="#_4-2-v-model" aria-label="Permalink to &quot;4.2 v-model&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Parent component --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;CustomInput v-model=&amp;amp;amp;quot;searchText&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;CustomCheckbox v-model:checked=&amp;amp;amp;quot;isChecked&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Child component CustomInput.vue --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">defineProps&amp;amp;amp;lt;{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  modelValue: string;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&amp;amp;amp;gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">defineEmits&amp;amp;amp;lt;{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (e: &amp;amp;amp;#039;update:modelValue&amp;amp;amp;#039;, value: string): void;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&amp;amp;amp;gt;();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;input </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    :value=&amp;amp;amp;quot;modelValue&amp;amp;amp;quot; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    @input=&amp;amp;amp;quot;$emit(&amp;amp;amp;#039;update:modelValue&amp;amp;amp;#039;, ($event.target as HTMLInputElement).value)&amp;amp;amp;quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_4-3-provide-inject" tabindex="-1">4.3 Provide / Inject <a class="header-anchor" href="#_4-3-provide-inject" aria-label="Permalink to &quot;4.3 Provide / Inject&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Ancestor component --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { provide, ref } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const theme = ref(&amp;amp;amp;#039;light&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const toggleTheme = () =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  theme.value = theme.value === &amp;amp;amp;#039;light&amp;amp;amp;#039; ? &amp;amp;amp;#039;dark&amp;amp;amp;#039; : &amp;amp;amp;#039;light&amp;amp;amp;#039;;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">provide(&amp;amp;amp;#039;theme&amp;amp;amp;#039;, theme);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">provide(&amp;amp;amp;#039;toggleTheme&amp;amp;amp;#039;, toggleTheme);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Descendant component --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { inject } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const theme = inject(&amp;amp;amp;#039;theme&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const toggleTheme = inject(&amp;amp;amp;#039;toggleTheme&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_5-template-syntax" tabindex="-1">5. Template Syntax <a class="header-anchor" href="#_5-template-syntax" aria-label="Permalink to &quot;5. Template Syntax&quot;">​</a></h2><h3 id="_5-1-directives" tabindex="-1">5.1 Directives <a class="header-anchor" href="#_5-1-directives" aria-label="Permalink to &quot;5.1 Directives&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- Text interpolation --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; message &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- HTML rendering --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-html=&amp;amp;amp;quot;htmlContent&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- Attribute binding --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;img :src=&amp;amp;amp;quot;imageUrl&amp;amp;amp;quot; :alt=&amp;amp;amp;quot;imageAlt&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- Event binding --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;button @click=&amp;amp;amp;quot;handleClick&amp;amp;amp;quot; @mouseenter=&amp;amp;amp;quot;onHover&amp;amp;amp;quot;&amp;amp;amp;gt;Click&amp;amp;amp;lt;/button&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- Conditional rendering --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-if=&amp;amp;amp;quot;status === &amp;amp;amp;#039;loading&amp;amp;amp;#039;&amp;amp;amp;quot;&amp;amp;amp;gt;Loading...&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-else-if=&amp;amp;amp;quot;status === &amp;amp;amp;#039;error&amp;amp;amp;#039;&amp;amp;amp;quot;&amp;amp;amp;gt;Failed&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-else&amp;amp;amp;gt;Success&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- List rendering --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;ul&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;li v-for=&amp;amp;amp;quot;(item, index) in items&amp;amp;amp;quot; :key=&amp;amp;amp;quot;item.id&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;#123;&amp;amp;#123; index &amp;amp;#125;&amp;amp;#125;. &amp;amp;#123;&amp;amp;#123; item.name &amp;amp;#125;&amp;amp;#125;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/li&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/ul&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- Show/hide --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-show=&amp;amp;amp;quot;isVisible&amp;amp;amp;quot;&amp;amp;amp;gt;Content&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- Two-way binding --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;input v-model=&amp;amp;amp;quot;searchQuery&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- Modifiers --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;form @submit.prevent=&amp;amp;amp;quot;handleSubmit&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;input @keyup.enter=&amp;amp;amp;quot;submit&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;button @click.once=&amp;amp;amp;quot;handleClick&amp;amp;amp;quot;&amp;amp;amp;gt;Trigger once&amp;amp;amp;lt;/button&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/form&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_5-2-template-refs" tabindex="-1">5.2 Template Refs <a class="header-anchor" href="#_5-2-template-refs" aria-label="Permalink to &quot;5.2 Template Refs&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, onMounted } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const inputRef = ref&amp;amp;amp;lt;HTMLInputElement | null&amp;amp;amp;gt;(null);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const componentRef = ref&amp;amp;amp;lt;InstanceType&amp;amp;amp;lt;typeof MyComponent&amp;amp;amp;gt; | null&amp;amp;amp;gt;(null);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onMounted(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  inputRef.value?.focus();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  componentRef.value?.someMethod();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;input ref=&amp;amp;amp;quot;inputRef&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;MyComponent ref=&amp;amp;amp;quot;componentRef&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_6-slots" tabindex="-1">6. Slots <a class="header-anchor" href="#_6-slots" aria-label="Permalink to &quot;6. Slots&quot;">​</a></h2><h3 id="_6-1-default-slots" tabindex="-1">6.1 Default Slots <a class="header-anchor" href="#_6-1-default-slots" aria-label="Permalink to &quot;6.1 Default Slots&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Card.vue --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div class=&amp;amp;amp;quot;card&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;header&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;slot name=&amp;amp;amp;quot;header&amp;amp;amp;quot;&amp;amp;amp;gt;Default Title&amp;amp;amp;lt;/slot&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/header&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;main&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;slot /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/main&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;footer&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;slot name=&amp;amp;amp;quot;footer&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/footer&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Usage --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;Card&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;template #header&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;h2&amp;amp;amp;gt;Custom Title&amp;amp;amp;lt;/h2&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;p&amp;amp;amp;gt;Card content&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;template #footer&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;button&amp;amp;amp;gt;Action&amp;amp;amp;lt;/button&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/Card&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_6-2-scoped-slots" tabindex="-1">6.2 Scoped Slots <a class="header-anchor" href="#_6-2-scoped-slots" aria-label="Permalink to &quot;6.2 Scoped Slots&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- List.vue --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;ul&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;li v-for=&amp;amp;amp;quot;item in items&amp;amp;amp;quot; :key=&amp;amp;amp;quot;item.id&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;slot :item=&amp;amp;amp;quot;item&amp;amp;amp;quot; :index=&amp;amp;amp;quot;index&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &amp;amp;#123;&amp;amp;#123; item.name &amp;amp;#125;&amp;amp;#125;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;/slot&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/li&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/ul&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Usage --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;List :items=&amp;amp;amp;quot;users&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;template #default=&amp;amp;amp;quot;{ item, index }&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;div class=&amp;amp;amp;quot;user-card&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;img :src=&amp;amp;amp;quot;item.avatar&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;span&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; index &amp;amp;#125;&amp;amp;#125;. &amp;amp;#123;&amp;amp;#123; item.name &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/span&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/List&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_7-async-components" tabindex="-1">7. Async Components <a class="header-anchor" href="#_7-async-components" aria-label="Permalink to &quot;7. Async Components&quot;">​</a></h2><h3 id="_7-1-defineasynccomponent" tabindex="-1">7.1 defineAsyncComponent <a class="header-anchor" href="#_7-1-defineasynccomponent" aria-label="Permalink to &quot;7.1 defineAsyncComponent&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { defineAsyncComponent } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const AsyncComponent = defineAsyncComponent({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  loader: () =&amp;amp;amp;gt; import(&amp;amp;amp;#039;./HeavyComponent.vue&amp;amp;amp;#039;),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  loadingComponent: LoadingSpinner,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  errorComponent: ErrorDisplay,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  delay: 200,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  timeout: 3000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Simple usage</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const SimpleAsync = defineAsyncComponent(() =&amp;amp;amp;gt; import(&amp;amp;amp;#039;./Simple.vue&amp;amp;amp;#039;));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;Suspense&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;template #default&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;AsyncComponent /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;template #fallback&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;div&amp;amp;amp;gt;Loading...&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/Suspense&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_8-performance-optimization" tabindex="-1">8. Performance Optimization <a class="header-anchor" href="#_8-performance-optimization" aria-label="Permalink to &quot;8. Performance Optimization&quot;">​</a></h2><h3 id="_8-1-component-lazy-loading" tabindex="-1">8.1 Component Lazy Loading <a class="header-anchor" href="#_8-1-component-lazy-loading" aria-label="Permalink to &quot;8.1 Component Lazy Loading&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { defineAsyncComponent } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const HeavyComponent = defineAsyncComponent(() =&amp;amp;amp;gt; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  import(&amp;amp;amp;#039;./HeavyComponent.vue&amp;amp;amp;#039;)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_8-2-v-memo-vue-3-2" tabindex="-1">8.2 v-memo (Vue 3.2+) <a class="header-anchor" href="#_8-2-v-memo-vue-3-2" aria-label="Permalink to &quot;8.2 v-memo (Vue 3.2+)&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-memo=&amp;amp;amp;quot;[selectedItem.id]&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; selectedItem.name &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; selectedItem.description &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_8-3-avoid-unnecessary-reactivity" tabindex="-1">8.3 Avoid Unnecessary Reactivity <a class="header-anchor" href="#_8-3-avoid-unnecessary-reactivity" aria-label="Permalink to &quot;8.3 Avoid Unnecessary Reactivity&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, shallowRef } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// ref - deep reactivity</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const deepData = ref({ nested: { value: 1 } });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// shallowRef - shallow reactivity, better performance</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const largeData = shallowRef({ nested: { value: 1 } });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// Freeze large objects</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const staticData = Object.freeze({ /* large data */ });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_9-related-concepts" tabindex="-1">9. Related Concepts <a class="header-anchor" href="#_9-related-concepts" aria-label="Permalink to &quot;9. Related Concepts&quot;">​</a></h2><ul><li><a href="./../tools/vue-ecosystem.en.html">Vue Ecosystem</a></li><li><a href="./../concepts/component-architecture.en.html">Component Architecture</a></li><li><a href="./../concepts/state-management.en.html">State Management</a></li><li><a href="./../concepts/rendering-strategies.en.html">Rendering Strategies</a></li></ul>`,57)])])}const c=s(t,[["render",l]]);export{d as __pageData,c as default};
