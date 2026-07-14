# Rendering Strategies

> Rendering strategy determines user experience. CSR/SSR/SSG isn't a technical choice — it's a product choice.

---

## 1. Rendering Modes

### 1.1 CSR (Client-Side Rendering)
```
Browser → Download JS → Execute → Fetch Data → Render UI
```

```tsx
// React SPA
function App() {
  const [data, setData] = useState(null);
  
  useEffect(() =&amp;amp;gt; {
    fetch(&amp;amp;#039;/api/data&amp;amp;#039;).then(r =&amp;amp;gt; r.json()).then(setData);
  }, []);
  
  if (!data) return &amp;amp;lt;Loading /&amp;amp;gt;;
  return &amp;amp;lt;Main data={data} /&amp;amp;gt;;
}
```

**Pros:**
- Fast navigation after initial load
- Rich interactions
- Simple deployment (static files)

**Cons:**
- Slow initial load (download + parse + execute JS)
- Poor SEO (empty HTML)
- Requires JS enabled

### 1.2 SSR (Server-Side Rendering)
```
Browser → Request → Server renders HTML → Send HTML → Hydrate on client
```

```tsx
// Next.js SSR
export async function getServerSideProps() {
  const data = await fetch(&amp;amp;#039;/api/data&amp;amp;#039;).then(r =&amp;amp;gt; r.json());
  return { props: { data } };
}

function Page({ data }) {
  return &amp;amp;lt;Main data={data} /&amp;amp;gt;;
}
```

**Pros:**
- Fast first screen (HTML ready)
- Good SEO
- Works without JS (basic content)

**Cons:**
- Server cost (render per request)
- Slow TTFB (Time to First Byte)
- Hydration cost

### 1.3 SSG (Static Site Generation)
```
Build Time → Pre-render HTML → Deploy → Serve static files
```

```tsx
// Next.js SSG
export async function getStaticProps() {
  const data = await fetch(&amp;amp;#039;/api/data&amp;amp;#039;).then(r =&amp;amp;gt; r.json());
  return { props: { data } };
}

export async function getStaticPaths() {
  return { paths: [&amp;amp;#039;/page/1&amp;amp;#039;, &amp;amp;#039;/page/2&amp;amp;#039;], fallback: false };
}
```

**Pros:**
- Fastest (pre-built HTML)
- CDN cacheable
- No server cost

**Cons:**
- Build time grows with content
- Stale data (need rebuild)
- Not suitable for personalized content

### 1.4 ISR (Incremental Static Regeneration)
```
Request → Serve stale HTML → Regenerate in background → Update cache
```

```tsx
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60 // Regenerate every 60 seconds
  };
}
```

### 1.5 Streaming SSR
```
Server → Send HTML chunks progressively → Browser renders incrementally
```

```tsx
// React 18 Streaming SSR
function App() {
  return (
    &amp;amp;lt;Suspense fallback={&amp;amp;lt;Skeleton /&amp;amp;gt;}&amp;amp;gt;
      &amp;amp;lt;HeavyComponent /&amp;amp;gt;
    &amp;amp;lt;/Suspense&amp;amp;gt;
  );
}
```

---

## 2. Hydration

### 2.1 What is Hydration?
```
SSR HTML (static) + Client JS (interactive) = Hydrated App
```

### 2.2 Hydration Process
1. Server sends HTML with data attributes
2. Browser displays HTML immediately
3. Download and execute JS
4. React attaches event listeners to existing DOM
5. App becomes interactive

### 2.3 Hydration Mismatch
```tsx
// Causes mismatch
function Component() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() =&amp;amp;gt; setIsClient(true), []);
  
  return isClient ? &amp;amp;lt;ClientOnly /&amp;amp;gt; : &amp;amp;lt;ServerOnly /&amp;amp;gt;;
}

// Fix: Use suppressHydrationWarning
&amp;amp;lt;div suppressHydrationWarning&amp;amp;gt;{Date.now()}&amp;amp;lt;/div&amp;amp;gt;
```

---

## 3. Framework Comparison

### 3.1 Rendering Support
| Framework | CSR | SSR | SSG | ISR | Streaming |
|---|---|---|---|---|---|
| React (SPA) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Next.js | ✅ | ✅ | ✅ | ✅ | ✅ |
| Remix | ✅ | ✅ | ❌ | ❌ | ✅ |
| Vue (SPA) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Nuxt | ✅ | ✅ | ✅ | ❌ | ✅ |
| Astro | ✅ | ✅ | ✅ | ❌ | ❌ |
| SvelteKit | ✅ | ✅ | ✅ | ❌ | ✅ |

### 3.2 Selection Guide
| Scenario | Recommended | Reason |
|---|---|---|
| Dashboard/Admin | CSR | Heavy interaction, no SEO needed |
| Blog/Docs | SSG | Content static, SEO important |
| E-commerce | SSR/ISR | Dynamic content + SEO |
| Social Media | SSR | Real-time content + SEO |
| Landing Page | SSG | Fast load, marketing focus |

---

## 4. Performance Impact

### 4.1 Metrics Comparison
| Mode | TTFB | FCP | LCP | TTI |
|---|---|---|---|---|
| CSR | Fast | Slow | Slow | Slowest |
| SSR | Medium | Fast | Fast | Medium |
| SSG | Fastest | Fastest | Fastest | Fast |
| ISR | Fast | Fastest | Fastest | Fast |

### 4.2 Optimization Techniques

**CSR Optimization:**
```tsx
// Code splitting
const LazyComponent = React.lazy(() =&amp;amp;gt; import(&amp;amp;#039;./Heavy&amp;amp;#039;));

// Preload critical resources
&amp;amp;lt;link rel=&amp;amp;quot;preload&amp;amp;quot; href=&amp;amp;quot;/critical.js&amp;amp;quot; as=&amp;amp;quot;script&amp;amp;quot;&amp;amp;gt;
```

**SSR Optimization:**
```tsx
// Streaming with Suspense
&amp;amp;lt;Suspense fallback={&amp;amp;lt;Skeleton /&amp;amp;gt;}&amp;amp;gt;
  &amp;amp;lt;Comments /&amp;amp;gt;
&amp;amp;lt;/Suspense&amp;amp;gt;

// Selective hydration
&amp;amp;lt;Suspense&amp;amp;gt;
  &amp;amp;lt;NonInteractive /&amp;amp;gt; {/* Won&amp;amp;#039;t hydrate until interacted */}
&amp;amp;lt;/Suspense&amp;amp;gt;
```

---

## 5. Islands Architecture

### 5.1 Concept
```
Static HTML (main) + Interactive Islands (components)
```

### 5.2 Astro Example
```astro
---
import Header from &amp;amp;#039;../components/Header.astro&amp;amp;#039;;
import InteractiveCounter from &amp;amp;#039;../components/InteractiveCounter.jsx&amp;amp;#039;;
---

&amp;amp;lt;Header /&amp;amp;gt;
&amp;amp;lt;main&amp;amp;gt;
  &amp;amp;lt;!-- Static content, no JS --&amp;amp;gt;
  &amp;amp;lt;article&amp;amp;gt;...&amp;amp;lt;/article&amp;amp;gt;
  
  &amp;amp;lt;!-- Interactive island, loads JS --&amp;amp;gt;
  &amp;amp;lt;InteractiveCounter client:load /&amp;amp;gt;
&amp;amp;lt;/main&amp;amp;gt;
```

### 5.3 Benefits
- Zero JS for static content
- Only interactive components load JS
- Best of both worlds (SSG + interactivity)

---

## 6. Server Components

### 6.1 React Server Components
```tsx
// Server Component (no JS sent to client)
async function ProductPage({ id }) {
  const product = await db.product.find(id); // Direct DB access
  return (
    &amp;amp;lt;div&amp;amp;gt;
      &amp;amp;lt;h1&amp;amp;gt;{product.name}&amp;amp;lt;/h1&amp;amp;gt;
      &amp;amp;lt;AddToCartButton id={id} /&amp;amp;gt; {/* Client Component */}
    &amp;amp;lt;/div&amp;amp;gt;
  );
}

// Client Component
&amp;amp;#039;use client&amp;amp;#039;;

function AddToCartButton({ id }) {
  return &amp;amp;lt;button onClick={() =&amp;amp;gt; addToCart(id)}&amp;amp;gt;Add to Cart&amp;amp;lt;/button&amp;amp;gt;;
}
```

### 6.2 Benefits
- Zero bundle size for server components
- Direct backend access
- Automatic code splitting
- Streaming by default

---

## 7. Related Concepts

- [Web Vitals](web-vitals.en.md)
- [Performance Optimization](performance-optimization.en.md)
- [Full-stack Frameworks](../tools/fullstack-frameworks.en.md)
- [Lazy Loading](../patterns/lazy-loading.en.md)
