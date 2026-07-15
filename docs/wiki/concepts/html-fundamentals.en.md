# HTML Fundamentals

> Semantic HTML is the foundation of frontend accessibility, SEO, and structure. Without good HTML, CSS and JavaScript are just remediation.

---

## 1. Core Principles

### 1.1 Semantics
HTML tags aren't visual containers — they're **content semantics** carriers.

| Wrong Usage | Correct Usage | Reason |
|---|---|---|
| `&lt;div class="header"&gt;` | `&lt;header&gt;` | Clear semantics, screen readers can identify |
| `&lt;div class="button"&gt;` | `&lt;button&gt;` | Built-in keyboard interaction and focus management |
| `&lt;span onclick="..."&gt;` | `&lt;a href="..."&gt;` | Link semantics, supports right-click open in new tab |
| `&lt;div class="list"&gt;` | `&lt;ul&gt;/&lt;ol&gt;` | List semantics, screen readers can announce count |

### 1.2 Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <meta name="description" content="Page description">
</head>
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <article>
      <section>...</section>
    </article>
    <aside>...</aside>
  </main>
  <footer>...</footer>
</body>
</html>
```

### 1.3 Heading Hierarchy
- `&lt;h1&gt;` only one per page (usually the page title)
- Don't skip heading levels (h1 → h2 → h3, not h1 → h4)
- Headings should reflect content structure, not visual size

---

## 2. Key Elements

### 2.1 Form Elements
```html
<form action="/submit" method="POST">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required autocomplete="email">
  
  <fieldset>
    <legend>Preferences</legend>
    <input type="checkbox" id="newsletter" name="newsletter">
    <label for="newsletter">Subscribe to newsletter</label>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
```

**Key Points:**
- `&lt;label&gt;` must be associated with form elements via `for` attribute
- Use correct `type` values to trigger mobile keyboard optimization
- `autocomplete` helps browsers auto-fill
- `&lt;fieldset&gt;` and `&lt;legend&gt;` organize complex forms

### 2.2 Media Elements
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descriptive text" loading="lazy" width="800" height="600">
</picture>

<video controls width="640" poster="preview.jpg">
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="subs.vtt" srclang="en" label="English">
</video>
```

### 2.3 Tables
```html
<table>
  <caption>2024 Sales Data</caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>$1,000,000</td>
    </tr>
  </tbody>
</table>
```

---

## 3. Accessibility (a11y)

### 3.1 ARIA Attributes
```html
<!-- Role definition -->
<div role="navigation" aria-label="Main navigation">...</div>

<!-- State management -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>...</ul>

<!-- Live regions -->
<div aria-live="polite" aria-atomic="true">
  <!-- Dynamic content updates will notify screen readers -->
</div>
```

### 3.2 Keyboard Navigation
- All interactive elements must be accessible via `Tab`
- Use `tabindex="0"` to make custom elements focusable
- Use `tabindex="-1"` to make elements programmatically focusable
- Avoid using `tabindex > 0`

### 3.3 Focus Management
```javascript
// Manage focus when modal opens
function openModal() {
  const modal = document.getElementById('modal');
  modal.showModal();
  modal.querySelector('input')?.focus();
}

// Move focus after route change
router.afterEach(() => {
  document.querySelector('main')?.focus();
});
```

---

## 4. SEO Optimization

### 4.1 Meta Tags
```html
<meta name="description" content="Page description, 150-160 characters">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://example.com/page">

<!-- Open Graph -->
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
```

### 4.2 Structured Data
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {"@type": "Person", "name": "Author"},
  "datePublished": "2024-01-01"
}
</script>
```

---

## 5. Best Practices

### 5.1 DO
- Use semantic tags
- Provide meaningful `alt` text
- Keep heading hierarchy correct
- Use correct form types
- Add language attribute `lang`
- Set viewport meta tag

### 5.2 DON'T
- Use `&lt;div&gt;` for everything
- Use `&lt;br&gt;` for spacing
- Use inline styles instead of CSS
- Skip heading levels
- Use deprecated tags (`&lt;font&gt;`, `&lt;center&gt;`)
- Forget form `&lt;label&gt;`

---

## 6. Related Concepts

- [CSS Fundamentals](css-fundamentals.en.md)
- [DOM & Browser API](dom-and-browser-api.en.md)
- [Accessibility Patterns](../patterns/accessibility-patterns.en.md)
- [SEO Techniques](../techniques/seo-techniques.en.md)
