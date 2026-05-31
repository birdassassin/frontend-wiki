# 性能优化

> 性能优化不是最后一步，是设计决策。从第一天就考虑性能，比最后优化有效十倍。

---

## 1. 性能分析

### 1.1 性能瓶颈识别
```javascript
// 1. Performance API
const perf = performance.getEntriesByType('navigation')[0];
console.log({
  DNS: perf.domainLookupEnd - perf.domainLookupStart,
  TCP: perf.connectEnd - perf.connectStart,
  TTFB: perf.responseStart - perf.requestStart,
  下载: perf.responseEnd - perf.responseStart,
  DOM: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart
});

// 2. Long Tasks API
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('长任务:', entry.duration, 'ms');
  }
}).observe({ type: 'longtask', buffered: true });
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
<!-- 预加载关键资源 -->
<link rel="preload" href="/font.woff2" as="font" crossorigin>
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/hero.jpg" as="image">

<!-- 预连接 -->
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="https://cdn.example.com">

<!-- 预取 -->
<link rel="prefetch" href="/next-page.js">
<link rel="prerender" href="/next-page.html">
```

### 2.2 代码分割
```javascript
// 路由级别
const routes = [
  { path: '/', component: () => import('./Home.vue') },
  { path: '/about', component: () => import('./About.vue') }
];

// 组件级别
const HeavyChart = React.lazy(() => import('./HeavyChart'));

// 条件加载
if (featureEnabled) {
  import('./feature').then(module => module.init());
}
```

### 2.3 Tree Shaking
```javascript
// ✅ 支持 tree shaking
import { add } from 'math-utils';

// ❌ 阻止 tree shaking
import * as math from 'math-utils';
const result = math.add(1, 2);
```

---

## 3. 渲染优化

### 3.1 避免重排
```javascript
// ❌ 触发多次重排
element.style.width = '100px';
element.style.height = '200px';
element.style.padding = '10px';

// ✅ 批量修改
element.style.cssText = 'width: 100px; height: 200px; padding: 10px;';

// ✅ 使用 class
element.classList.add('sized');
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
    <div style={{ height, overflow: 'auto' }} onScroll={e => setScrollTop(e.target.scrollTop)}>
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => (
          <div key={item.id} style={{ position: 'absolute', top: (startIndex + i) * itemHeight }}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
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
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 节流 - 固定间隔执行
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用
window.addEventListener('resize', debounce(handleResize, 250));
window.addEventListener('scroll', throttle(handleScroll, 100));
```

---

## 4. 内存优化

### 4.1 内存泄漏模式
```javascript
// ❌ 事件监听器未清理
function setup() {
  window.addEventListener('resize', handler);
}

// ✅ 清理
function setup() {
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}

// ❌ 闭包引用大对象
function createHandler() {
  const largeData = new Array(1000000);
  return () => console.log('clicked'); // 持有 largeData 引用
}

// ✅ 避免不必要的闭包
function createHandler() {
  return () => console.log('clicked');
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
<!-- 响应式 -->
<img srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 400px, 1200px"
     src="medium.jpg" alt="描述">

<!-- 懒加载 -->
<img src="placeholder.jpg" data-src="actual.jpg" loading="lazy">

<!-- 现代格式 -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述">
</picture>
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
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/static/')) {
    event.respondWith(
      caches.match(event.request).then(cached => 
        cached || fetch(event.request).then(response => {
          return caches.open('static').then(cache => {
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
