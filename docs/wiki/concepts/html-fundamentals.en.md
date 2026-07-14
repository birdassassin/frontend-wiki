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
&amp;amp;lt;!DOCTYPE html&amp;amp;gt;
&amp;amp;lt;html lang=&amp;amp;quot;en&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;head&amp;amp;gt;
  &amp;amp;lt;meta charset=&amp;amp;quot;UTF-8&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;meta name=&amp;amp;quot;viewport&amp;amp;quot; content=&amp;amp;quot;width=device-width, initial-scale=1.0&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;title&amp;amp;gt;Page Title&amp;amp;lt;/title&amp;amp;gt;
  &amp;amp;lt;meta name=&amp;amp;quot;description&amp;amp;quot; content=&amp;amp;quot;Page description&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;/head&amp;amp;gt;
&amp;amp;lt;body&amp;amp;gt;
  &amp;amp;lt;header&amp;amp;gt;...&amp;amp;lt;/header&amp;amp;gt;
  &amp;amp;lt;nav&amp;amp;gt;...&amp;amp;lt;/nav&amp;amp;gt;
  &amp;amp;lt;main&amp;amp;gt;
    &amp;amp;lt;article&amp;amp;gt;
      &amp;amp;lt;section&amp;amp;gt;...&amp;amp;lt;/section&amp;amp;gt;
    &amp;amp;lt;/article&amp;amp;gt;
    &amp;amp;lt;aside&amp;amp;gt;...&amp;amp;lt;/aside&amp;amp;gt;
  &amp;amp;lt;/main&amp;amp;gt;
  &amp;amp;lt;footer&amp;amp;gt;...&amp;amp;lt;/footer&amp;amp;gt;
&amp;amp;lt;/body&amp;amp;gt;
&amp;amp;lt;/html&amp;amp;gt;
```

### 1.3 Heading Hierarchy
- `&lt;h1&gt;` only one per page (usually the page title)
- Don't skip heading levels (h1 → h2 → h3, not h1 → h4)
- Headings should reflect content structure, not visual size

---

## 2. Key Elements

### 2.1 Form Elements
```html
&amp;amp;lt;form action=&amp;amp;quot;/submit&amp;amp;quot; method=&amp;amp;quot;POST&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;label for=&amp;amp;quot;email&amp;amp;quot;&amp;amp;gt;Email&amp;amp;lt;/label&amp;amp;gt;
  &amp;amp;lt;input type=&amp;amp;quot;email&amp;amp;quot; id=&amp;amp;quot;email&amp;amp;quot; name=&amp;amp;quot;email&amp;amp;quot; required autocomplete=&amp;amp;quot;email&amp;amp;quot;&amp;amp;gt;
  
  &amp;amp;lt;fieldset&amp;amp;gt;
    &amp;amp;lt;legend&amp;amp;gt;Preferences&amp;amp;lt;/legend&amp;amp;gt;
    &amp;amp;lt;input type=&amp;amp;quot;checkbox&amp;amp;quot; id=&amp;amp;quot;newsletter&amp;amp;quot; name=&amp;amp;quot;newsletter&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;label for=&amp;amp;quot;newsletter&amp;amp;quot;&amp;amp;gt;Subscribe to newsletter&amp;amp;lt;/label&amp;amp;gt;
  &amp;amp;lt;/fieldset&amp;amp;gt;
  
  &amp;amp;lt;button type=&amp;amp;quot;submit&amp;amp;quot;&amp;amp;gt;Submit&amp;amp;lt;/button&amp;amp;gt;
&amp;amp;lt;/form&amp;amp;gt;
```

**Key Points:**
- `&lt;label&gt;` must be associated with form elements via `for` attribute
- Use correct `type` values to trigger mobile keyboard optimization
- `autocomplete` helps browsers auto-fill
- `&lt;fieldset&gt;` and `&lt;legend&gt;` organize complex forms

### 2.2 Media Elements
```html
&amp;amp;lt;picture&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;image.avif&amp;amp;quot; type=&amp;amp;quot;image/avif&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;image.webp&amp;amp;quot; type=&amp;amp;quot;image/webp&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;img src=&amp;amp;quot;image.jpg&amp;amp;quot; alt=&amp;amp;quot;Descriptive text&amp;amp;quot; loading=&amp;amp;quot;lazy&amp;amp;quot; width=&amp;amp;quot;800&amp;amp;quot; height=&amp;amp;quot;600&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;/picture&amp;amp;gt;

&amp;amp;lt;video controls width=&amp;amp;quot;640&amp;amp;quot; poster=&amp;amp;quot;preview.jpg&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;source src=&amp;amp;quot;video.mp4&amp;amp;quot; type=&amp;amp;quot;video/mp4&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;track kind=&amp;amp;quot;subtitles&amp;amp;quot; src=&amp;amp;quot;subs.vtt&amp;amp;quot; srclang=&amp;amp;quot;en&amp;amp;quot; label=&amp;amp;quot;English&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;/video&amp;amp;gt;
```

### 2.3 Tables
```html
&amp;amp;lt;table&amp;amp;gt;
  &amp;amp;lt;caption&amp;amp;gt;2024 Sales Data&amp;amp;lt;/caption&amp;amp;gt;
  &amp;amp;lt;thead&amp;amp;gt;
    &amp;amp;lt;tr&amp;amp;gt;
      &amp;amp;lt;th scope=&amp;amp;quot;col&amp;amp;quot;&amp;amp;gt;Quarter&amp;amp;lt;/th&amp;amp;gt;
      &amp;amp;lt;th scope=&amp;amp;quot;col&amp;amp;quot;&amp;amp;gt;Revenue&amp;amp;lt;/th&amp;amp;gt;
    &amp;amp;lt;/tr&amp;amp;gt;
  &amp;amp;lt;/thead&amp;amp;gt;
  &amp;amp;lt;tbody&amp;amp;gt;
    &amp;amp;lt;tr&amp;amp;gt;
      &amp;amp;lt;th scope=&amp;amp;quot;row&amp;amp;quot;&amp;amp;gt;Q1&amp;amp;lt;/th&amp;amp;gt;
      &amp;amp;lt;td&amp;amp;gt;$1,000,000&amp;amp;lt;/td&amp;amp;gt;
    &amp;amp;lt;/tr&amp;amp;gt;
  &amp;amp;lt;/tbody&amp;amp;gt;
&amp;amp;lt;/table&amp;amp;gt;
```

---

## 3. Accessibility (a11y)

### 3.1 ARIA Attributes
```html
&amp;amp;lt;!-- Role definition --&amp;amp;gt;
&amp;amp;lt;div role=&amp;amp;quot;navigation&amp;amp;quot; aria-label=&amp;amp;quot;Main navigation&amp;amp;quot;&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;

&amp;amp;lt;!-- State management --&amp;amp;gt;
&amp;amp;lt;button aria-expanded=&amp;amp;quot;false&amp;amp;quot; aria-controls=&amp;amp;quot;menu&amp;amp;quot;&amp;amp;gt;Menu&amp;amp;lt;/button&amp;amp;gt;
&amp;amp;lt;ul id=&amp;amp;quot;menu&amp;amp;quot; hidden&amp;amp;gt;...&amp;amp;lt;/ul&amp;amp;gt;

&amp;amp;lt;!-- Live regions --&amp;amp;gt;
&amp;amp;lt;div aria-live=&amp;amp;quot;polite&amp;amp;quot; aria-atomic=&amp;amp;quot;true&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;!-- Dynamic content updates will notify screen readers --&amp;amp;gt;
&amp;amp;lt;/div&amp;amp;gt;
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
  const modal = document.getElementById(&amp;amp;#039;modal&amp;amp;#039;);
  modal.showModal();
  modal.querySelector(&amp;amp;#039;input&amp;amp;#039;)?.focus();
}

// Move focus after route change
router.afterEach(() =&amp;amp;gt; {
  document.querySelector(&amp;amp;#039;main&amp;amp;#039;)?.focus();
});
```

---

## 4. SEO Optimization

### 4.1 Meta Tags
```html
&amp;amp;lt;meta name=&amp;amp;quot;description&amp;amp;quot; content=&amp;amp;quot;Page description, 150-160 characters&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;meta name=&amp;amp;quot;robots&amp;amp;quot; content=&amp;amp;quot;index, follow&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;canonical&amp;amp;quot; href=&amp;amp;quot;https://example.com/page&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Open Graph --&amp;amp;gt;
&amp;amp;lt;meta property=&amp;amp;quot;og:title&amp;amp;quot; content=&amp;amp;quot;Page Title&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;meta property=&amp;amp;quot;og:description&amp;amp;quot; content=&amp;amp;quot;Page description&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;meta property=&amp;amp;quot;og:image&amp;amp;quot; content=&amp;amp;quot;https://example.com/image.jpg&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;meta property=&amp;amp;quot;og:url&amp;amp;quot; content=&amp;amp;quot;https://example.com/page&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Twitter Card --&amp;amp;gt;
&amp;amp;lt;meta name=&amp;amp;quot;twitter:card&amp;amp;quot; content=&amp;amp;quot;summary_large_image&amp;amp;quot;&amp;amp;gt;
```

### 4.2 Structured Data
```html
&amp;amp;lt;script type=&amp;amp;quot;application/ld+json&amp;amp;quot;&amp;amp;gt;
{
  &amp;amp;quot;@context&amp;amp;quot;: &amp;amp;quot;https://schema.org&amp;amp;quot;,
  &amp;amp;quot;@type&amp;amp;quot;: &amp;amp;quot;Article&amp;amp;quot;,
  &amp;amp;quot;headline&amp;amp;quot;: &amp;amp;quot;Article Title&amp;amp;quot;,
  &amp;amp;quot;author&amp;amp;quot;: {&amp;amp;quot;@type&amp;amp;quot;: &amp;amp;quot;Person&amp;amp;quot;, &amp;amp;quot;name&amp;amp;quot;: &amp;amp;quot;Author&amp;amp;quot;},
  &amp;amp;quot;datePublished&amp;amp;quot;: &amp;amp;quot;2024-01-01&amp;amp;quot;
}
&amp;amp;lt;/script&amp;amp;gt;
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
