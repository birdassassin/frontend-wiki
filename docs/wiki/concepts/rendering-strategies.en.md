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
  
  useEffect(() => {
    fetch('/api/data').then(r => r.json()).then(setData);
  }, []);
  
  if (!data) return <Loading />;
  return <Main data={data} />;
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
  const data = await fetch('/api/data').then(r => r.json());
  return { props: { data } };
}

function Page({ data }) {
  return <Main data={data} />;
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
  const data = await fetch('/api/data').then(r => r.json());
  return { props: { data } };
}

export async function getStaticPaths() {
  return { paths: ['/page/1', '/page/2'], fallback: false };
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
    <Suspense fallback={<Skeleton />}>
      <HeavyComponent />
    </Suspense>
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
  
  useEffect(() => setIsClient(true), []);
  
  return isClient ? <ClientOnly /> : <ServerOnly />;
}

// Fix: Use suppressHydrationWarning
<div suppressHydrationWarning>{Date.now()}</div>
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
const LazyComponent = React.lazy(() => import('./Heavy'));

// Preload critical resources
<link rel="preload" href="/critical.js" as="script">
```

**SSR Optimization:**
```tsx
// Streaming with Suspense
<Suspense fallback={<Skeleton />}>
  <Comments />
</Suspense>

// Selective hydration
<Suspense>
  <NonInteractive /> {/* Won't hydrate until interacted */}
</Suspense>
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
import Header from '../components/Header.astro';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---

<Header />
<main>
  <!-- Static content, no JS -->
  <article>...</article>
  
  <!-- Interactive island, loads JS -->
  <InteractiveCounter client:load />
</main>
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
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton id={id} /> {/* Client Component */}
    </div>
  );
}

// Client Component
'use client';

function AddToCartButton({ id }) {
  return <button onClick={() => addToCart(id)}>Add to Cart</button>;
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
