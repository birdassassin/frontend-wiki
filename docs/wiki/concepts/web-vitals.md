# Web Vitals

> 性能是功能。慢的界面等于坏的界面，Web Vitals 是量化标准。

---

## 1. 核心指标

### 1.1 LCP (Largest Contentful Paint)
**最大内容绘制** - 衡量加载性能

- **定义**：视口内最大内容元素可见的时间
- **目标**：≤ 2.5 秒
- **优化**：预加载关键资源、优化图片、使用 CDN

```javascript
// 测量 LCP
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.startTime);
}).observe({ type: 'largest-contentful-paint', buffered: true });
```

### 1.2 INP (Interaction to Next Paint)
**交互到下次绘制** - 衡量响应性能

- **定义**：用户交互到浏览器下次绘制的时间
- **目标**：≤ 200 毫秒
- **优化**：减少主线程工作、代码分割、Web Workers

```javascript
// 测量 INP
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('交互延迟:', entry.processingEnd - entry.startTime);
  }
}).observe({ type: 'event', buffered: true });
```

### 1.3 CLS (Cumulative Layout Shift)
**累积布局偏移** - 衡量视觉稳定性

- **定义**：页面加载过程中意外布局偏移的总分
- **目标**：≤ 0.1
- **优化**：设置图片尺寸、预留广告位、避免动态插入内容

```javascript
// 测量 CLS
let clsValue = 0;
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log('CLS:', clsValue);
}).observe({ type: 'layout-shift', buffered: true });
```

---

## 2. 辅助指标

### 2.1 FCP (First Contentful Paint)
**首次内容绘制** - 首次渲染时间

- **目标**：≤ 1.8 秒
- **优化**：减少 CSS 阻塞、内联关键 CSS、字体优化

### 2.2 TTFB (Time to First Byte)
**首字节时间** - 服务器响应时间

- **目标**：≤ 800 毫秒
- **优化**：CDN、缓存、服务器优化、边缘计算

### 2.3 TTI (Time to Interactive)
**可交互时间** - 页面完全可交互的时间

- **目标**：≤ 3.8 秒
- **优化**：代码分割、懒加载、减少 JS

---

## 3. 性能预算

### 3.1 资源预算
| 资源类型 | 预算 |
|---|---|
| 总页面大小 | ≤ 1MB |
| JavaScript | ≤ 200KB (gzip) |
| CSS | ≤ 50KB (gzip) |
| 图片 | ≤ 500KB |
| 字体 | ≤ 100KB |
| 请求数 | ≤ 50 |

### 3.2 监控实现
```javascript
// 性能预算检查
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'resource') {
      if (entry.transferSize > 500000) {
        console.warn(`资源超出预算: ${entry.name}`);
      }
    }
  }
});

observer.observe({ type: 'resource', buffered: true });
```

---

## 4. 优化策略

### 4.1 资源加载优化

#### 图片优化
```html
<!-- 响应式图片 -->
<img src="image-800.jpg" 
     srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
     sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
     alt="描述"
     loading="lazy"
     decoding="async"
     width="800" height="600">

<!-- 现代格式 -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述">
</picture>
```

#### 字体优化
```css
/* 字体显示策略 */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* 或 optional, fallback */
}

/* 子集化 */
/* 仅加载需要的字符集 */
```

### 4.2 代码优化

#### 关键渲染路径
```html
<!-- 内联关键 CSS -->
<style>
  /* 首屏必需的样式 */
  header { ... }
  .hero { ... }
</style>

<!-- 异步加载非关键 CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<!-- 延迟非关键 JS -->
<script src="analytics.js" defer></script>
<script src="widget.js" async></script>
```

#### 代码分割
```javascript
// 路由级别
const Dashboard = lazy(() => import('./Dashboard'));

// 组件级别
const Chart = lazy(() => import('./Chart'));

// 条件加载
if (isAdmin) {
  import('./AdminPanel').then(module => {
    module.init();
  });
}
```

### 4.3 缓存策略

#### HTTP 缓存
```
Cache-Control: max-age=31536000, immutable  // 静态资源
Cache-Control: no-cache                     // HTML
Cache-Control: max-age=3600, stale-while-revalidate=86400  // API
```

#### Service Worker
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open('v1').then((cache) => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});
```

---

## 5. 测量工具

### 5.1 实验室工具
| 工具 | 用途 |
|---|---|
| Lighthouse | 综合性能审计 |
| WebPageTest | 详细性能分析 |
| Chrome DevTools | 实时性能监控 |
| Bundlephobia | 包大小检查 |

### 5.2 实地工具
| 工具 | 用途 |
|---|---|
| Chrome UX Report | 真实用户数据 |
| Google Analytics | 用户行为分析 |
| Sentry Performance | 错误与性能 |
| web-vitals 库 | 自定义监控 |

### 5.3 web-vitals 库
```javascript
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(console.log);
onINP(console.log);
onCLS(console.log);

// 发送到分析服务
function sendToAnalytics(metric) {
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
    keepalive: true
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

---

## 6. 相关概念

- [性能优化](performance-optimization.md)
- [渲染策略](rendering-strategies.md)
- [资源加载优化](resource-loading.md)
- [缓存模式](../patterns/caching.md)
