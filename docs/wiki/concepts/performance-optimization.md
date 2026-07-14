# 性能优化

> 性能优化不是最后一步，是设计决策。从第一天就考虑性能，比最后优化有效十倍。

---

## 1. 性能分析

### 1.1 性能瓶颈识别
```javascript
// 1. Performance API
const perf = performance.getEntriesByType(&amp;amp;#039;navigation&amp;amp;#039;)[0];
console.log({
  DNS: perf.domainLookupEnd - perf.domainLookupStart,
  TCP: perf.connectEnd - perf.connectStart,
  TTFB: perf.responseStart - perf.requestStart,
  下载: perf.responseEnd - perf.responseStart,
  DOM: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart
});

// 2. Long Tasks API
new PerformanceObserver((list) =&amp;amp;gt; {
  for (const entry of list.getEntries()) {
    console.log(&amp;amp;#039;长任务:&amp;amp;#039;, entry.duration, &amp;amp;#039;ms&amp;amp;#039;);
  }
}).observe({ type: &amp;amp;#039;longtask&amp;amp;#039;, buffered: true });
```

### 1.2 Chrome DevTools
- **Performance 面板**：录制性能，分析火焰图
- **Lighthouse**：综合审计
- **Coverage**：未使用代码检测
- **Memory**：内存泄漏检测

---

## 2. 加载优化

### 2.1 资源优先级
```html
&amp;amp;lt;!-- 预加载关键资源 --&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preload&amp;amp;quot; href=&amp;amp;quot;/font.woff2&amp;amp;quot; as=&amp;amp;quot;font&amp;amp;quot; crossorigin&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preload&amp;amp;quot; href=&amp;amp;quot;/critical.css&amp;amp;quot; as=&amp;amp;quot;style&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preload&amp;amp;quot; href=&amp;amp;quot;/hero.jpg&amp;amp;quot; as=&amp;amp;quot;image&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- 预连接 --&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preconnect&amp;amp;quot; href=&amp;amp;quot;https://api.example.com&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;dns-prefetch&amp;amp;quot; href=&amp;amp;quot;https://cdn.example.com&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- 预取 --&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;prefetch&amp;amp;quot; href=&amp;amp;quot;/next-page.js&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;prerender&amp;amp;quot; href=&amp;amp;quot;/next-page.html&amp;amp;quot;&amp;amp;gt;
```

### 2.2 代码分割
```javascript
// 路由级别
const routes = [
  { path: &amp;amp;#039;/&amp;amp;#039;, component: () =&amp;amp;gt; import(&amp;amp;#039;./Home.vue&amp;amp;#039;) },
  { path: &amp;amp;#039;/about&amp;amp;#039;, component: () =&amp;amp;gt; import(&amp;amp;#039;./About.vue&amp;amp;#039;) }
];

// 组件级别
const HeavyChart = React.lazy(() =&amp;amp;gt; import(&amp;amp;#039;./HeavyChart&amp;amp;#039;));

// 条件加载
if (featureEnabled) {
  import(&amp;amp;#039;./feature&amp;amp;#039;).then(module =&amp;amp;gt; module.init());
}
```

### 2.3 Tree Shaking
```javascript
// ✅ 支持 tree shaking
import { add } from &amp;amp;#039;math-utils&amp;amp;#039;;

// ❌ 阻止 tree shaking
import * as math from &amp;amp;#039;math-utils&amp;amp;#039;;
const result = math.add(1, 2);
```

---

## 3. 渲染优化

### 3.1 避免重排
```javascript
// ❌ 触发多次重排
element.style.width = &amp;amp;#039;100px&amp;amp;#039;;
element.style.height = &amp;amp;#039;200px&amp;amp;#039;;
element.style.padding = &amp;amp;#039;10px&amp;amp;#039;;

// ✅ 批量修改
element.style.cssText = &amp;amp;#039;width: 100px; height: 200px; padding: 10px;&amp;amp;#039;;

// ✅ 使用 class
element.classList.add(&amp;amp;#039;sized&amp;amp;#039;);
```

### 3.2 虚拟列表
```jsx
function VirtualList({ items, height }) {
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 50;
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  
  const visibleItems = items.slice(startIndex, startIndex + visibleCount);
  
  return (
    &amp;amp;lt;div style=&amp;#123;&amp;#123; height, overflow: &amp;amp;#039;auto&amp;amp;#039; &amp;#125;&amp;#125; onScroll={e =&amp;amp;gt; setScrollTop(e.target.scrollTop)}&amp;amp;gt;
      &amp;amp;lt;div style=&amp;#123;&amp;#123; height: items.length * itemHeight, position: &amp;amp;#039;relative&amp;amp;#039; &amp;#125;&amp;#125;&amp;amp;gt;
        {visibleItems.map((item, i) =&amp;amp;gt; (
          &amp;amp;lt;div key={item.id} style=&amp;#123;&amp;#123; position: &amp;amp;#039;absolute&amp;amp;#039;, top: (startIndex + i) * itemHeight &amp;#125;&amp;#125;&amp;amp;gt;
            {item.content}
          &amp;amp;lt;/div&amp;amp;gt;
        ))}
      &amp;amp;lt;/div&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
  );
}
```

### 3.3 防抖与节流
```javascript
// 防抖 - 事件停止后执行
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() =&amp;amp;gt; fn.apply(this, args), delay);
  };
}

// 节流 - 固定间隔执行
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() =&amp;amp;gt; inThrottle = false, limit);
    }
  };
}

// 使用
window.addEventListener(&amp;amp;#039;resize&amp;amp;#039;, debounce(handleResize, 250));
window.addEventListener(&amp;amp;#039;scroll&amp;amp;#039;, throttle(handleScroll, 100));
```

---

## 4. 内存优化

### 4.1 内存泄漏模式
```javascript
// ❌ 事件监听器未清理
function setup() {
  window.addEventListener(&amp;amp;#039;resize&amp;amp;#039;, handler);
}

// ✅ 清理
function setup() {
  window.addEventListener(&amp;amp;#039;resize&amp;amp;#039;, handler);
  return () =&amp;amp;gt; window.removeEventListener(&amp;amp;#039;resize&amp;amp;#039;, handler);
}

// ❌ 闭包引用大对象
function createHandler() {
  const largeData = new Array(1000000);
  return () =&amp;amp;gt; console.log(&amp;amp;#039;clicked&amp;amp;#039;); // 持有 largeData 引用
}

// ✅ 避免不必要的闭包
function createHandler() {
  return () =&amp;amp;gt; console.log(&amp;amp;#039;clicked&amp;amp;#039;);
}
```

### 4.2 WeakMap/WeakSet
```javascript
// 弱引用，不阻止 GC
const cache = new WeakMap();

function processData(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, expensiveComputation(obj));
  }
  return cache.get(obj);
}
```

---

## 5. 网络优化

### 5.1 HTTP/2 特性
- 多路复用
- 头部压缩
- 服务器推送
- 流优先级

### 5.2 压缩策略
```bash
# Brotli (优于 gzip)
# .br 文件
Content-Encoding: br

# 配置 Nginx
brotli on;
brotli_comp_level 6;
brotli_types text/css application/javascript;
```

### 5.3 图片优化
```html
&amp;amp;lt;!-- 响应式 --&amp;amp;gt;
&amp;amp;lt;img srcset=&amp;amp;quot;small.jpg 400w, medium.jpg 800w, large.jpg 1200w&amp;amp;quot;
     sizes=&amp;amp;quot;(max-width: 600px) 400px, 1200px&amp;amp;quot;
     src=&amp;amp;quot;medium.jpg&amp;amp;quot; alt=&amp;amp;quot;描述&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- 懒加载 --&amp;amp;gt;
&amp;amp;lt;img src=&amp;amp;quot;placeholder.jpg&amp;amp;quot; data-src=&amp;amp;quot;actual.jpg&amp;amp;quot; loading=&amp;amp;quot;lazy&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- 现代格式 --&amp;amp;gt;
&amp;amp;lt;picture&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;image.avif&amp;amp;quot; type=&amp;amp;quot;image/avif&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;image.webp&amp;amp;quot; type=&amp;amp;quot;image/webp&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;img src=&amp;amp;quot;image.jpg&amp;amp;quot; alt=&amp;amp;quot;描述&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;/picture&amp;amp;gt;
```

---

## 6. 缓存策略

### 6.1 HTTP 缓存
```
# 静态资源 (带 hash)
Cache-Control: public, max-age=31536000, immutable

# HTML
Cache-Control: no-cache

# API
Cache-Control: max-age=60, stale-while-revalidate=300
```

### 6.2 Service Worker 缓存
```javascript
// 缓存优先
self.addEventListener(&amp;amp;#039;fetch&amp;amp;#039;, (event) =&amp;amp;gt; {
  if (event.request.url.includes(&amp;amp;#039;/static/&amp;amp;#039;)) {
    event.respondWith(
      caches.match(event.request).then(cached =&amp;amp;gt; 
        cached || fetch(event.request).then(response =&amp;amp;gt; {
          return caches.open(&amp;amp;#039;static&amp;amp;#039;).then(cache =&amp;amp;gt; {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
  }
});
```

---

## 7. 相关概念

- [Web Vitals](web-vitals.md)
- [渲染策略](rendering-strategies.md)
- [资源加载优化](resource-loading.md)
- [缓存模式](../patterns/caching.md)
