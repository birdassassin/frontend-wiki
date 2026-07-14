import{_ as s,o as p,c as i,a2 as n}from"./chunks/framework.BWuWLRhz.js";const d=JSON.parse('{"title":"Vue 核心","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/techniques/vue-core.md","filePath":"wiki/techniques/vue-core.md"}'),l={name:"wiki/techniques/vue-core.md"};function t(e,a,h,m,k,E){return p(),i("div",null,[...a[0]||(a[0]=[n(`<h1 id="vue-核心" tabindex="-1">Vue 核心 <a class="header-anchor" href="#vue-核心" aria-label="Permalink to &quot;Vue 核心&quot;">​</a></h1><blockquote><p>Vue 是渐进式框架，组合式 API 是其核心范式。理解响应式系统、组合式 API 比记忆 API 重要。</p></blockquote><hr><h2 id="_1-响应式系统" tabindex="-1">1. 响应式系统 <a class="header-anchor" href="#_1-响应式系统" aria-label="Permalink to &quot;1. 响应式系统&quot;">​</a></h2><h3 id="_1-1-ref-和-reactive" tabindex="-1">1.1 ref 和 reactive <a class="header-anchor" href="#_1-1-ref-和-reactive" aria-label="Permalink to &quot;1.1 ref 和 reactive&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, reactive } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// ref - 用于基本类型</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const count = ref(0);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const name = ref(&amp;amp;amp;#039;Vue&amp;amp;amp;#039;);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// reactive - 用于对象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const state = reactive({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  todos: [],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  filter: &amp;amp;amp;#039;all&amp;amp;amp;#039;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 访问 ref 需要 .value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">count.value++;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// reactive 直接访问</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">state.todos.push({ id: 1, text: &amp;amp;amp;#039;学习 Vue&amp;amp;amp;#039; });</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { id: 1, text: &amp;amp;amp;#039;学习&amp;amp;amp;#039;, done: false },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { id: 2, text: &amp;amp;amp;#039;练习&amp;amp;amp;#039;, done: true }</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 可写 computed</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const fullName = computed({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  get: () =&amp;amp;amp;gt; \`\${firstName.value} \${lastName.value}\`,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  set: (value) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [firstName.value, lastName.value] = value.split(&amp;amp;amp;#039; &amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_1-3-watch-和-watcheffect" tabindex="-1">1.3 watch 和 watchEffect <a class="header-anchor" href="#_1-3-watch-和-watcheffect" aria-label="Permalink to &quot;1.3 watch 和 watchEffect&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, watch, watchEffect } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const query = ref(&amp;amp;amp;#039;&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const results = ref([]);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// watch - 明确依赖</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watch(query, async (newQuery, oldQuery) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  results.value = await search(newQuery);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// watch 多个值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watch([query, filter], async ([newQuery, newFilter]) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  results.value = await search(newQuery, newFilter);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// watchEffect - 自动追踪依赖</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watchEffect(async () =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  results.value = await search(query.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 清理副作用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watchEffect((onCleanup) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  const timer = setTimeout(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.log(query.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }, 1000);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  onCleanup(() =&amp;amp;amp;gt; clearTimeout(timer));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_2-组合式-api" tabindex="-1">2. 组合式 API <a class="header-anchor" href="#_2-组合式-api" aria-label="Permalink to &quot;2. 组合式 API&quot;">​</a></h2><h3 id="_2-1-setup-语法糖" tabindex="-1">2.1 setup 语法糖 <a class="header-anchor" href="#_2-1-setup-语法糖" aria-label="Permalink to &quot;2.1 setup 语法糖&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 导入</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, computed, onMounted } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 响应式状态</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const count = ref(0);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 计算属性</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const doubled = computed(() =&amp;amp;amp;gt; count.value * 2);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 方法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">function increment() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  count.value++;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 生命周期</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onMounted(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(&amp;amp;amp;#039;组件挂载&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 定义 Props</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const props = defineProps&amp;amp;amp;lt;{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  title: string;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  count?: number;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&amp;amp;amp;gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 定义 Emits</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const emit = defineEmits&amp;amp;amp;lt;{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (e: &amp;amp;amp;#039;update&amp;amp;amp;#039;, value: number): void;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  (e: &amp;amp;amp;#039;delete&amp;amp;amp;#039;, id: string): void;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&amp;amp;amp;gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 使用</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_2-2-自定义-composables" tabindex="-1">2.2 自定义 Composables <a class="header-anchor" href="#_2-2-自定义-composables" aria-label="Permalink to &quot;2.2 自定义 Composables&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// composables/useCounter.ts</span></span>
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
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 使用</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">increment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useCounter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">users</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">loading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> useFetch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">api</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">users</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;);</span></span></code></pre></div><hr><h2 id="_3-生命周期" tabindex="-1">3. 生命周期 <a class="header-anchor" href="#_3-生命周期" aria-label="Permalink to &quot;3. 生命周期&quot;">​</a></h2><h3 id="_3-1-生命周期钩子" tabindex="-1">3.1 生命周期钩子 <a class="header-anchor" href="#_3-1-生命周期钩子" aria-label="Permalink to &quot;3.1 生命周期钩子&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // DOM 挂载前</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onMounted(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // DOM 挂载后，可以访问 DOM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  const element = document.getElementById(&amp;amp;amp;#039;my-element&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onBeforeUpdate(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // DOM 更新前</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onUpdated(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // DOM 更新后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onBeforeUnmount(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // 组件卸载前</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onUnmounted(() =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // 组件卸载后，清理定时器、事件监听等</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  window.removeEventListener(&amp;amp;amp;#039;resize&amp;amp;amp;#039;, handler);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">onErrorCaptured((err, instance, info) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  // 捕获子组件错误</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.error(err, info);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  return false; // 阻止错误继续传播</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_3-2-生命周期对比" tabindex="-1">3.2 生命周期对比 <a class="header-anchor" href="#_3-2-生命周期对比" aria-label="Permalink to &quot;3.2 生命周期对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Vue 2</th><th>Vue 3 (组合式)</th></tr></thead><tbody><tr><td>beforeCreate</td><td>setup()</td></tr><tr><td>created</td><td>setup()</td></tr><tr><td>beforeMount</td><td>onBeforeMount</td></tr><tr><td>mounted</td><td>onMounted</td></tr><tr><td>beforeUpdate</td><td>onBeforeUpdate</td></tr><tr><td>updated</td><td>onUpdated</td></tr><tr><td>beforeDestroy</td><td>onBeforeUnmount</td></tr><tr><td>destroyed</td><td>onUnmounted</td></tr><tr><td>errorCaptured</td><td>onErrorCaptured</td></tr></tbody></table><hr><h2 id="_4-组件通信" tabindex="-1">4. 组件通信 <a class="header-anchor" href="#_4-组件通信" aria-label="Permalink to &quot;4. 组件通信&quot;">​</a></h2><h3 id="_4-1-props-和-emits" tabindex="-1">4.1 Props 和 Emits <a class="header-anchor" href="#_4-1-props-和-emits" aria-label="Permalink to &quot;4.1 Props 和 Emits&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Parent.vue --&amp;amp;amp;gt;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_4-2-v-model" tabindex="-1">4.2 v-model <a class="header-anchor" href="#_4-2-v-model" aria-label="Permalink to &quot;4.2 v-model&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- 父组件 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;CustomInput v-model=&amp;amp;amp;quot;searchText&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;CustomCheckbox v-model:checked=&amp;amp;amp;quot;isChecked&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- 子组件 CustomInput.vue --&amp;amp;amp;gt;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_4-3-provide-inject" tabindex="-1">4.3 Provide / Inject <a class="header-anchor" href="#_4-3-provide-inject" aria-label="Permalink to &quot;4.3 Provide / Inject&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- 祖先组件 --&amp;amp;amp;gt;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- 后代组件 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { inject } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const theme = inject(&amp;amp;amp;#039;theme&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const toggleTheme = inject(&amp;amp;amp;#039;toggleTheme&amp;amp;amp;#039;);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_4-4-事件总线-vue-3-推荐-mitt" tabindex="-1">4.4 事件总线 (Vue 3 推荐 mitt) <a class="header-anchor" href="#_4-4-事件总线-vue-3-推荐-mitt" aria-label="Permalink to &quot;4.4 事件总线 (Vue 3 推荐 mitt)&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// utils/emitter.ts</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> mitt </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;mitt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> emitter</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mitt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 发送事件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">emitter.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">login</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;, { id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, name: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;Alice</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 监听事件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">emitter.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">login</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;, (data) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.log(&amp;amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;用户登录:</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;, data);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 移除监听</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">emitter.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">off</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;user</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">login</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;);</span></span></code></pre></div><hr><h2 id="_5-模板语法" tabindex="-1">5. 模板语法 <a class="header-anchor" href="#_5-模板语法" aria-label="Permalink to &quot;5. 模板语法&quot;">​</a></h2><h3 id="_5-1-指令" tabindex="-1">5.1 指令 <a class="header-anchor" href="#_5-1-指令" aria-label="Permalink to &quot;5.1 指令&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- 文本插值 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; message &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- HTML 渲染 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-html=&amp;amp;amp;quot;htmlContent&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- 属性绑定 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;img :src=&amp;amp;amp;quot;imageUrl&amp;amp;amp;quot; :alt=&amp;amp;amp;quot;imageAlt&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- 事件绑定 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;button @click=&amp;amp;amp;quot;handleClick&amp;amp;amp;quot; @mouseenter=&amp;amp;amp;quot;onHover&amp;amp;amp;quot;&amp;amp;amp;gt;点击&amp;amp;amp;lt;/button&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- 条件渲染 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-if=&amp;amp;amp;quot;status === &amp;amp;amp;#039;loading&amp;amp;amp;#039;&amp;amp;amp;quot;&amp;amp;amp;gt;加载中...&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-else-if=&amp;amp;amp;quot;status === &amp;amp;amp;#039;error&amp;amp;amp;#039;&amp;amp;amp;quot;&amp;amp;amp;gt;加载失败&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-else&amp;amp;amp;gt;加载成功&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- 列表渲染 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;ul&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;li v-for=&amp;amp;amp;quot;(item, index) in items&amp;amp;amp;quot; :key=&amp;amp;amp;quot;item.id&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;#123;&amp;amp;#123; index &amp;amp;#125;&amp;amp;#125;. &amp;amp;#123;&amp;amp;#123; item.name &amp;amp;#125;&amp;amp;#125;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/li&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/ul&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- 显示/隐藏 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-show=&amp;amp;amp;quot;isVisible&amp;amp;amp;quot;&amp;amp;amp;gt;内容&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- 双向绑定 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;input v-model=&amp;amp;amp;quot;searchQuery&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;!-- 修饰符 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;form @submit.prevent=&amp;amp;amp;quot;handleSubmit&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;input @keyup.enter=&amp;amp;amp;quot;submit&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;button @click.once=&amp;amp;amp;quot;handleClick&amp;amp;amp;quot;&amp;amp;amp;gt;只触发一次&amp;amp;amp;lt;/button&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/form&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_5-2-模板-refs" tabindex="-1">5.2 模板 Refs <a class="header-anchor" href="#_5-2-模板-refs" aria-label="Permalink to &quot;5.2 模板 Refs&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_6-插槽-slots" tabindex="-1">6. 插槽 (Slots) <a class="header-anchor" href="#_6-插槽-slots" aria-label="Permalink to &quot;6. 插槽 (Slots)&quot;">​</a></h2><h3 id="_6-1-默认插槽" tabindex="-1">6.1 默认插槽 <a class="header-anchor" href="#_6-1-默认插槽" aria-label="Permalink to &quot;6.1 默认插槽&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- Card.vue --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div class=&amp;amp;amp;quot;card&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;header&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;slot name=&amp;amp;amp;quot;header&amp;amp;amp;quot;&amp;amp;amp;gt;默认标题&amp;amp;amp;lt;/slot&amp;amp;amp;gt;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- 使用 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;Card&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;template #header&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;h2&amp;amp;amp;gt;自定义标题&amp;amp;amp;lt;/h2&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;p&amp;amp;amp;gt;卡片内容&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;template #footer&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;button&amp;amp;amp;gt;操作&amp;amp;amp;lt;/button&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/Card&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_6-2-作用域插槽" tabindex="-1">6.2 作用域插槽 <a class="header-anchor" href="#_6-2-作用域插槽" aria-label="Permalink to &quot;6.2 作用域插槽&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- List.vue --&amp;amp;amp;gt;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;!-- 使用 --&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;List :items=&amp;amp;amp;quot;users&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;template #default=&amp;amp;amp;quot;{ item, index }&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;div class=&amp;amp;amp;quot;user-card&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;img :src=&amp;amp;amp;quot;item.avatar&amp;amp;amp;quot; /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;span&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; index &amp;amp;#125;&amp;amp;#125;. &amp;amp;#123;&amp;amp;#123; item.name &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/span&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/List&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_7-异步组件" tabindex="-1">7. 异步组件 <a class="header-anchor" href="#_7-异步组件" aria-label="Permalink to &quot;7. 异步组件&quot;">​</a></h2><h3 id="_7-1-defineasynccomponent" tabindex="-1">7.1 defineAsyncComponent <a class="header-anchor" href="#_7-1-defineasynccomponent" aria-label="Permalink to &quot;7.1 defineAsyncComponent&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
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
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 简单用法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const SimpleAsync = defineAsyncComponent(() =&amp;amp;amp;gt; import(&amp;amp;amp;#039;./Simple.vue&amp;amp;amp;#039;));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;Suspense&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;template #default&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;AsyncComponent /&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;template #fallback&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &amp;amp;amp;lt;div&amp;amp;amp;gt;加载中...&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/Suspense&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_8-自定义指令" tabindex="-1">8. 自定义指令 <a class="header-anchor" href="#_8-自定义指令" aria-label="Permalink to &quot;8. 自定义指令&quot;">​</a></h2><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// directives/focus.ts</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> vFocus</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  mounted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">el</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HTMLElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) =&amp;amp;amp;gt; el.focus()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// directives/click-outside.ts</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">export const vClickOutside </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  mounted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">el</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HTMLElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">binding</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> DirectiveBinding</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">clickOutsideEvent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) =&amp;amp;amp;gt; {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(el </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event.target </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">||</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">contains</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event.target </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        binding.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(event);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;click</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;, el.clickOutsideEvent);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  unmounted</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">el</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HTMLElement</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">removeEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;click</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;, el.clickOutsideEvent);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 使用</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;script setup lang</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;quot;ts</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { vFocus, vClickOutside } from </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;@</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">directives</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;#</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">039</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">script</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;template</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;input v</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">focus </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  &amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;div v</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">click</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">outside</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;quot;handleClickOutside</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;点击外部关闭</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">div</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">template</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_9-性能优化" tabindex="-1">9. 性能优化 <a class="header-anchor" href="#_9-性能优化" aria-label="Permalink to &quot;9. 性能优化&quot;">​</a></h2><h3 id="_9-1-组件懒加载" tabindex="-1">9.1 组件懒加载 <a class="header-anchor" href="#_9-1-组件懒加载" aria-label="Permalink to &quot;9.1 组件懒加载&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { defineAsyncComponent } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const HeavyComponent = defineAsyncComponent(() =&amp;amp;amp;gt; </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  import(&amp;amp;amp;#039;./HeavyComponent.vue&amp;amp;amp;#039;)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_9-2-v-memo-vue-3-2" tabindex="-1">9.2 v-memo (Vue 3.2+) <a class="header-anchor" href="#_9-2-v-memo-vue-3-2" aria-label="Permalink to &quot;9.2 v-memo (Vue 3.2+)&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;div v-memo=&amp;amp;amp;quot;[selectedItem.id]&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; selectedItem.name &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;amp;amp;lt;p&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123; selectedItem.description &amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/p&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h3 id="_9-3-避免不必要的响应式" tabindex="-1">9.3 避免不必要的响应式 <a class="header-anchor" href="#_9-3-避免不必要的响应式" aria-label="Permalink to &quot;9.3 避免不必要的响应式&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;script setup lang=&amp;amp;amp;quot;ts&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { ref, shallowRef } from &amp;amp;amp;#039;vue&amp;amp;amp;#039;;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// ref - 深度响应式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const deepData = ref({ nested: { value: 1 } });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// shallowRef - 浅层响应式，性能更好</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const largeData = shallowRef({ nested: { value: 1 } });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 冻结大对象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const staticData = Object.freeze({ /* 大量数据 */ });</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><hr><h2 id="_10-相关概念" tabindex="-1">10. 相关概念 <a class="header-anchor" href="#_10-相关概念" aria-label="Permalink to &quot;10. 相关概念&quot;">​</a></h2><ul><li><a href="./../tools/vue-ecosystem.html">Vue 生态</a></li><li><a href="./../concepts/component-architecture.html">组件架构</a></li><li><a href="./../concepts/state-management.html">状态管理</a></li><li><a href="./../concepts/rendering-strategies.html">渲染策略</a></li></ul>`,62)])])}const g=s(l,[["render",t]]);export{d as __pageData,g as default};
