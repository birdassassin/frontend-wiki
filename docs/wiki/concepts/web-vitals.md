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
new PerformanceObserver((entryList) =&amp;amp;gt; {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log(&amp;amp;#039;LCP:&amp;amp;#039;, lastEntry.startTime);
}).observe({ type: &amp;amp;#039;largest-contentful-paint&amp;amp;#039;, buffered: true });
```

### 1.2 INP (Interaction to Next Paint)
**交互到下次绘制** - 衡量响应性能

- **定义**：用户交互到浏览器下次绘制的时间
- **目标**：≤ 200 毫秒
- **优化**：减少主线程工作、代码分割、Web Workers

```javascript
// 测量 INP
new PerformanceObserver((entryList) =&amp;amp;gt; {
  for (const entry of entryList.getEntries()) {
    console.log(&amp;amp;#039;交互延迟:&amp;amp;#039;, entry.processingEnd - entry.startTime);
  }
}).observe({ type: &amp;amp;#039;event&amp;amp;#039;, buffered: true });
```

### 1.3 CLS (Cumulative Layout Shift)
**累积布局偏移** - 衡量视觉稳定性

- **定义**：页面加载过程中意外布局偏移的总分
- **目标**：≤ 0.1
- **优化**：设置图片尺寸、预留广告位、避免动态插入内容

```javascript
// 测量 CLS
let clsValue = 0;
new PerformanceObserver((entryList) =&amp;amp;gt; {
  for (const entry of entryList.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log(&amp;amp;#039;CLS:&amp;amp;#039;, clsValue);
}).observe({ type: &amp;amp;#039;layout-shift&amp;amp;#039;, buffered: true });
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
const observer = new PerformanceObserver((list) =&amp;amp;gt; {
  for (const entry of list.getEntries()) {
    if (entry.entryType === &amp;amp;#039;resource&amp;amp;#039;) {
      if (entry.transferSize &amp;amp;gt; 500000) {
        console.warn(`资源超出预算: ${entry.name}`);
      }
    }
  }
});

observer.observe({ type: &amp;amp;#039;resource&amp;amp;#039;, buffered: true });
```

---

## 4. 优化策略

### 4.1 资源加载优化

#### 图片优化
```html
&amp;amp;lt;!-- 响应式图片 --&amp;amp;gt;
&amp;amp;lt;img src=&amp;amp;quot;image-800.jpg&amp;amp;quot; 
     srcset=&amp;amp;quot;image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w&amp;amp;quot;
     sizes=&amp;amp;quot;(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px&amp;amp;quot;
     alt=&amp;amp;quot;描述&amp;amp;quot;
     loading=&amp;amp;quot;lazy&amp;amp;quot;
     decoding=&amp;amp;quot;async&amp;amp;quot;
     width=&amp;amp;quot;800&amp;amp;quot; height=&amp;amp;quot;600&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- 现代格式 --&amp;amp;gt;
&amp;amp;lt;picture&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;image.avif&amp;amp;quot; type=&amp;amp;quot;image/avif&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;image.webp&amp;amp;quot; type=&amp;amp;quot;image/webp&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;img src=&amp;amp;quot;image.jpg&amp;amp;quot; alt=&amp;amp;quot;描述&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;/picture&amp;amp;gt;
```

#### 字体优化
```css
/* 字体显示策略 */
@font-face {
  font-family: &amp;amp;#039;CustomFont&amp;amp;#039;;
  src: url(&amp;amp;#039;font.woff2&amp;amp;#039;) format(&amp;amp;#039;woff2&amp;amp;#039;);
  font-display: swap; /* 或 optional, fallback */
}

/* 子集化 */
/* 仅加载需要的字符集 */
```

### 4.2 代码优化

#### 关键渲染路径
```html
&amp;amp;lt;!-- 内联关键 CSS --&amp;amp;gt;
&amp;amp;lt;style&amp;amp;gt;
  /* 首屏必需的样式 */
  header { ... }
  .hero { ... }
&amp;amp;lt;/style&amp;amp;gt;

&amp;amp;lt;!-- 异步加载非关键 CSS --&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preload&amp;amp;quot; href=&amp;amp;quot;styles.css&amp;amp;quot; as=&amp;amp;quot;style&amp;amp;quot; onload=&amp;amp;quot;this.onload=null;this.rel=&amp;amp;#039;stylesheet&amp;amp;#039;&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;noscript&amp;amp;gt;&amp;amp;lt;link rel=&amp;amp;quot;stylesheet&amp;amp;quot; href=&amp;amp;quot;styles.css&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/noscript&amp;amp;gt;

&amp;amp;lt;!-- 延迟非关键 JS --&amp;amp;gt;
&amp;amp;lt;script src=&amp;amp;quot;analytics.js&amp;amp;quot; defer&amp;amp;gt;&amp;amp;lt;/script&amp;amp;gt;
&amp;amp;lt;script src=&amp;amp;quot;widget.js&amp;amp;quot; async&amp;amp;gt;&amp;amp;lt;/script&amp;amp;gt;
```

#### 代码分割
```javascript
// 路由级别
const Dashboard = lazy(() =&amp;amp;gt; import(&amp;amp;#039;./Dashboard&amp;amp;#039;));

// 组件级别
const Chart = lazy(() =&amp;amp;gt; import(&amp;amp;#039;./Chart&amp;amp;#039;));

// 条件加载
if (isAdmin) {
  import(&amp;amp;#039;./AdminPanel&amp;amp;#039;).then(module =&amp;amp;gt; {
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
self.addEventListener(&amp;amp;#039;fetch&amp;amp;#039;, (event) =&amp;amp;gt; {
  event.respondWith(
    caches.match(event.request).then((response) =&amp;amp;gt; {
      return response || fetch(event.request).then((fetchResponse) =&amp;amp;gt; {
        return caches.open(&amp;amp;#039;v1&amp;amp;#039;).then((cache) =&amp;amp;gt; {
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
import { onLCP, onINP, onCLS } from &amp;amp;#039;web-vitals&amp;amp;#039;;

onLCP(console.log);
onINP(console.log);
onCLS(console.log);

// 发送到分析服务
function sendToAnalytics(metric) {
  fetch(&amp;amp;#039;/analytics&amp;amp;#039;, {
    method: &amp;amp;#039;POST&amp;amp;#039;,
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
