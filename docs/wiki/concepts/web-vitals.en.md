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
- `&lt;img&gt;` elements
- `&lt;video&gt;` poster images
- Background images with `url()`
- Block-level elements with text

**Optimization:**
```html
&amp;amp;lt;!-- Preload LCP image --&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preload&amp;amp;quot; href=&amp;amp;quot;/hero.jpg&amp;amp;quot; as=&amp;amp;quot;image&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Use modern formats --&amp;amp;gt;
&amp;amp;lt;picture&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;hero.avif&amp;amp;quot; type=&amp;amp;quot;image/avif&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;img src=&amp;amp;quot;hero.jpg&amp;amp;quot; alt=&amp;amp;quot;Hero&amp;amp;quot; fetchpriority=&amp;amp;quot;high&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;/picture&amp;amp;gt;

&amp;amp;lt;!-- Inline critical CSS --&amp;amp;gt;
&amp;amp;lt;style&amp;amp;gt;
  .hero { background: url(&amp;amp;#039;/hero.jpg&amp;amp;#039;) center/cover; }
&amp;amp;lt;/style&amp;amp;gt;
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
  data.forEach(item =&amp;amp;gt; heavyComputation(item));
}

// Good: Yield to main thread periodically
async function processData(data) {
  for (let i = 0; i &amp;amp;lt; data.length; i++) {
    heavyComputation(data[i]);
    if (i % 50 === 0) {
      await new Promise(r =&amp;amp;gt; setTimeout(r, 0)); // Yield
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
&amp;amp;lt;!-- Always specify dimensions --&amp;amp;gt;
&amp;amp;lt;img src=&amp;amp;quot;photo.jpg&amp;amp;quot; width=&amp;amp;quot;800&amp;amp;quot; height=&amp;amp;quot;600&amp;amp;quot; alt=&amp;amp;quot;Photo&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Reserve space for ads --&amp;amp;gt;
&amp;amp;lt;div class=&amp;amp;quot;ad-container&amp;amp;quot; style=&amp;amp;quot;min-height: 250px;&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/div&amp;amp;gt;

&amp;amp;lt;!-- Use aspect-ratio for responsive images --&amp;amp;gt;
&amp;amp;lt;img src=&amp;amp;quot;photo.jpg&amp;amp;quot; style=&amp;amp;quot;aspect-ratio: 4/3;&amp;amp;quot; alt=&amp;amp;quot;Photo&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Transform instead of layout-changing animations --&amp;amp;gt;
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
import { onLCP, onINP, onCLS } from &amp;amp;#039;web-vitals&amp;amp;#039;;

onLCP(({ value }) =&amp;amp;gt; sendToAnalytics(&amp;amp;#039;LCP&amp;amp;#039;, value));
onINP(({ value }) =&amp;amp;gt; sendToAnalytics(&amp;amp;#039;INP&amp;amp;#039;, value));
onCLS(({ value }) =&amp;amp;gt; sendToAnalytics(&amp;amp;#039;CLS&amp;amp;#039;, value));

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
const [nav] = performance.getEntriesByType(&amp;amp;#039;navigation&amp;amp;#039;);
console.log(&amp;amp;#039;TTFB:&amp;amp;#039;, nav.responseStart - nav.requestStart);

// Resource Timing
performance.getEntriesByType(&amp;amp;#039;resource&amp;amp;#039;).forEach(entry =&amp;amp;gt; {
  console.log(`${entry.name}: ${entry.duration}ms`);
});

// Long Tasks API
new PerformanceObserver((list) =&amp;amp;gt; {
  list.getEntries().forEach(entry =&amp;amp;gt; {
    console.log(&amp;amp;#039;Long task:&amp;amp;#039;, entry.duration, &amp;amp;#039;ms&amp;amp;#039;);
  });
}).observe({ type: &amp;amp;#039;longtask&amp;amp;#039;, buffered: true });
```

---

## 4. Optimization Strategies

### 4.1 Loading Optimization
```html
&amp;amp;lt;!-- Critical resources --&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preload&amp;amp;quot; href=&amp;amp;quot;/font.woff2&amp;amp;quot; as=&amp;amp;quot;font&amp;amp;quot; crossorigin&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preload&amp;amp;quot; href=&amp;amp;quot;/critical.js&amp;amp;quot; as=&amp;amp;quot;script&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Non-critical resources --&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;prefetch&amp;amp;quot; href=&amp;amp;quot;/next-page.js&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;preconnect&amp;amp;quot; href=&amp;amp;quot;https://api.example.com&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Defer non-critical JS --&amp;amp;gt;
&amp;amp;lt;script src=&amp;amp;quot;/analytics.js&amp;amp;quot; defer&amp;amp;gt;&amp;amp;lt;/script&amp;amp;gt;
&amp;amp;lt;script src=&amp;amp;quot;/non-critical.js&amp;amp;quot; async&amp;amp;gt;&amp;amp;lt;/script&amp;amp;gt;
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
  font-family: &amp;amp;#039;Custom&amp;amp;#039;;
  src: url(&amp;amp;#039;/font.woff2&amp;amp;#039;) format(&amp;amp;#039;woff2&amp;amp;#039;);
  font-display: swap; /* Show fallback font first */
}
```

### 4.3 JavaScript Optimization
```javascript
// Code splitting
const HeavyComponent = React.lazy(() =&amp;amp;gt; import(&amp;amp;#039;./Heavy&amp;amp;#039;));

// Tree shaking (ESM only)
import { debounce } from &amp;amp;#039;lodash-es&amp;amp;#039;; // Not lodash

// Web Workers for heavy computation
const worker = new Worker(&amp;amp;#039;/worker.js&amp;amp;#039;);
worker.postMessage(data);
worker.onmessage = (e) =&amp;amp;gt; console.log(e.data);
```

---

## 5. Performance Budget

### 5.1 Set Budgets
```json
// package.json
{
  &amp;amp;quot;performance&amp;amp;quot;: {
    &amp;amp;quot;budgets&amp;amp;quot;: [
      { &amp;amp;quot;path&amp;amp;quot;: &amp;amp;quot;/*&amp;amp;quot;, &amp;amp;quot;resourceTypes&amp;amp;quot;: [&amp;amp;quot;script&amp;amp;quot;], &amp;amp;quot;maxSize&amp;amp;quot;: 200000 },
      { &amp;amp;quot;path&amp;amp;quot;: &amp;amp;quot;/*&amp;amp;quot;, &amp;amp;quot;resourceTypes&amp;amp;quot;: [&amp;amp;quot;image&amp;amp;quot;], &amp;amp;quot;maxSize&amp;amp;quot;: 500000 },
      { &amp;amp;quot;path&amp;amp;quot;: &amp;amp;quot;/*&amp;amp;quot;, &amp;amp;quot;metric&amp;amp;quot;: &amp;amp;quot;lcp&amp;amp;quot;, &amp;amp;quot;max&amp;amp;quot;: 2500 },
      { &amp;amp;quot;path&amp;amp;quot;: &amp;amp;quot;/*&amp;amp;quot;, &amp;amp;quot;metric&amp;amp;quot;: &amp;amp;quot;cls&amp;amp;quot;, &amp;amp;quot;max&amp;amp;quot;: 0.1 }
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
