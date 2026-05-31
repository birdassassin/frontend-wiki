# Web Vitals

> Performance is a feature. Slow interface equals bad interface. Web Vitals is the quantification standard.

---

## 1. Core Web Vitals

### 1.1 LCP (Largest Contentful Paint)
**Measures loading performance — time until main content is visible.**

- **Good**: ≤ 2.5s
- **Needs Improvement**: 2.5s - 4s
- **Poor**: > 4s

**What counts as LCP element:**
- `<img>` elements
- `<video>` poster images
- Background images with `url()`
- Block-level elements with text

**Optimization:**
```html
<!-- Preload LCP image -->
<link rel="preload" href="/hero.jpg" as="image">

<!-- Use modern formats -->
<picture>
  <source srcset="hero.avif" type="image/avif">
  <img src="hero.jpg" alt="Hero" fetchpriority="high">
</picture>

<!-- Inline critical CSS -->
<style>
  .hero { background: url('/hero.jpg') center/cover; }
</style>
```

### 1.2 INP (Interaction to Next Paint)
**Measures responsiveness — time from user interaction to next visual update.**

- **Good**: ≤ 200ms
- **Needs Improvement**: 200ms - 500ms
- **Poor**: > 500ms

**Replaces FID (First Input Delay) since March 2024**

**Optimization:**
```javascript
// Break up long tasks
// Bad: Blocks main thread for 100ms
function processData(data) {
  data.forEach(item => heavyComputation(item));
}

// Good: Yield to main thread periodically
async function processData(data) {
  for (let i = 0; i < data.length; i++) {
    heavyComputation(data[i]);
    if (i % 50 === 0) {
      await new Promise(r => setTimeout(r, 0)); // Yield
    }
  }
}

// Use scheduler.yield() (experimental)
await scheduler.yield();
```

### 1.3 CLS (Cumulative Layout Shift)
**Measures visual stability — unexpected layout shifts during page lifecycle.**

- **Good**: ≤ 0.1
- **Needs Improvement**: 0.1 - 0.25
- **Poor**: > 0.25

**CLS = Impact Score × Distance Score**

**Optimization:**
```html
<!-- Always specify dimensions -->
<img src="photo.jpg" width="800" height="600" alt="Photo">

<!-- Reserve space for ads -->
<div class="ad-container" style="min-height: 250px;"></div>

<!-- Use aspect-ratio for responsive images -->
<img src="photo.jpg" style="aspect-ratio: 4/3;" alt="Photo">

<!-- Transform instead of layout-changing animations -->
.bad  { animation: expand 1s; }
.good { animation: scale-up 1s; }

@keyframes scale-up {
  from { transform: scale(0); }
  to   { transform: scale(1); }
}
```

---

## 2. Secondary Metrics

### 2.1 FCP (First Contentful Paint)
**Time until first text or image is rendered.**

- **Good**: ≤ 1.8s
- **Needs Improvement**: 1.8s - 3s
- **Poor**: > 3s

### 2.2 TTFB (Time to First Byte)
**Time from request to first byte of response.**

- **Good**: ≤ 800ms
- **Needs Improvement**: 800ms - 1800ms
- **Poor**: > 1800ms

### 2.3 TTI (Time to Interactive)
**Time until page is fully interactive.**

- **Good**: ≤ 3.8s
- **Needs Improvement**: 3.8s - 7.3s
- **Poor**: > 7.3s

---

## 3. Measurement Tools

### 3.1 Field Data (Real Users)
```javascript
// Web Vitals library
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(({ value }) => sendToAnalytics('LCP', value));
onINP(({ value }) => sendToAnalytics('INP', value));
onCLS(({ value }) => sendToAnalytics('CLS', value));

// Chrome User Experience Report (CrUX)
// Available via BigQuery or PageSpeed Insights API
```

### 3.2 Lab Data (Controlled Environment)
```bash
# Lighthouse CLI
npx lighthouse https://example.com --view

# WebPageTest
# https://webpagetest.org

# Chrome DevTools Performance panel
```

### 3.3 Performance API
```javascript
// Navigation Timing
const [nav] = performance.getEntriesByType('navigation');
console.log('TTFB:', nav.responseStart - nav.requestStart);

// Resource Timing
performance.getEntriesByType('resource').forEach(entry => {
  console.log(`${entry.name}: ${entry.duration}ms`);
});

// Long Tasks API
new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('Long task:', entry.duration, 'ms');
  });
}).observe({ type: 'longtask', buffered: true });
```

---

## 4. Optimization Strategies

### 4.1 Loading Optimization
```html
<!-- Critical resources -->
<link rel="preload" href="/font.woff2" as="font" crossorigin>
<link rel="preload" href="/critical.js" as="script">

<!-- Non-critical resources -->
<link rel="prefetch" href="/next-page.js">
<link rel="preconnect" href="https://api.example.com">

<!-- Defer non-critical JS -->
<script src="/analytics.js" defer></script>
<script src="/non-critical.js" async></script>
```

### 4.2 Rendering Optimization
```css
/* Contain layout/paint/style */
.card {
  contain: layout paint style;
}

/* Content visibility for off-screen content */
.below-fold {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}

/* Font optimization */
@font-face {
  font-family: 'Custom';
  src: url('/font.woff2') format('woff2');
  font-display: swap; /* Show fallback font first */
}
```

### 4.3 JavaScript Optimization
```javascript
// Code splitting
const HeavyComponent = React.lazy(() => import('./Heavy'));

// Tree shaking (ESM only)
import { debounce } from 'lodash-es'; // Not lodash

// Web Workers for heavy computation
const worker = new Worker('/worker.js');
worker.postMessage(data);
worker.onmessage = (e) => console.log(e.data);
```

---

## 5. Performance Budget

### 5.1 Set Budgets
```json
// package.json
{
  "performance": {
    "budgets": [
      { "path": "/*", "resourceTypes": ["script"], "maxSize": 200000 },
      { "path": "/*", "resourceTypes": ["image"], "maxSize": 500000 },
      { "path": "/*", "metric": "lcp", "max": 2500 },
      { "path": "/*", "metric": "cls", "max": 0.1 }
    ]
  }
}
```

### 5.2 Monitor in CI
```yaml
# .github/workflows/performance.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://example.com
    budgetPath: ./budget.json
```

---

## 6. Common Performance Pitfalls

| Pitfall | Impact | Solution |
|---|---|---|
| Large JS bundles | Slow TTI | Code splitting, tree shaking |
| Unoptimized images | Slow LCP | WebP/AVIF, responsive images |
| Render-blocking resources | Slow FCP | Defer/async, inline critical CSS |
| Layout shifts | High CLS | Set dimensions, reserve space |
| Long tasks | High INP | Break up tasks, use workers |
| Font flash | Poor UX | font-display: swap, preload |

---

## 7. Related Concepts

- [Performance Optimization](performance-optimization.en.md)
- [Rendering Strategies](rendering-strategies.en.md)
- [Resource Loading](../concepts/resource-loading.en.md)
- [Lazy Loading](../patterns/lazy-loading.en.md)
