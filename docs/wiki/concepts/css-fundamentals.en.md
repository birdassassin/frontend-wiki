# CSS Fundamentals

> CSS isn't stylesheets — it's a **layout engine**. Understanding cascade, specificity, and layout algorithms matters more than memorizing properties.

---

## 1. Core Mechanisms

### 1.1 Cascade
CSS stands for Cascading Style Sheets — cascade is its core algorithm:

```
Importance > Origin > Specificity > Order
```

**Cascade Layers:**
1. `!important` user styles
2. `!important` author styles
3. Regular user styles
4. Regular author styles
5. Browser default styles

### 1.2 Specificity Calculation
```
Inline (1,0,0,0) > ID (0,1,0,0) > Class/Attribute/Pseudo-class (0,0,1,0) > Element/Pseudo-element (0,0,0,1)
```

**Examples:**
```css
div              /* 0,0,0,1 */
.container       /* 0,0,1,0 */
#main            /* 0,1,0,0 */
div.container    /* 0,0,1,1 */
#main .container /* 0,1,1,1 */
style="..."      /* 1,0,0,0 */
```

**Rules:**
- When specificity is equal, later rules override earlier ones
- Avoid `!important` unless using utility-first CSS
- Keep specificity flat, avoid specificity wars

### 1.3 Inheritance
**Properties that inherit by default:**
- Text-related: `color`, `font-*`, `text-*`, `line-height`
- List-related: `list-style-*`
- Table-related: `border-collapse`, `border-spacing`

**Properties that don't inherit:**
- Box model: `width`, `height`, `margin`, `padding`, `border`
- Positioning: `position`, `top`, `left`, `z-index`
- Background: `background-*`
- Layout: `display`, `flex-*`, `grid-*`

Use `inherit`, `initial`, `unset`, `revert` to control inheritance behavior.

---

## 2. Box Model

### 2.1 Standard vs Border-box
```css
/* Standard box model (default) */
/* width = content width */
/* Actual width = width + padding + border */
box-sizing: content-box;

/* Border-box model (recommended) */
/* width = content + padding + border */
box-sizing: border-box;
```

**Best Practice:**
```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

### 2.2 Margin Collapsing
Vertical margins of adjacent block-level elements collapse:
```css
.parent { margin-bottom: 20px; }
.child  { margin-top: 30px; }
/* Actual spacing = 30px (larger value), not 50px */
```

**Ways to avoid collapsing:**
- Use `padding` instead of `margin`
- Use Flexbox or Grid `gap`
- Create BFC (`overflow: hidden`, `display: flow-root`)

---

## 3. Layout Systems

### 3.1 Flexbox
**One-dimensional layout system**, suitable for component-level layouts.

```css
.container {
  display: flex;
  flex-direction: row;         /* Main axis direction */
  justify-content: center;     /* Main axis alignment */
  align-items: center;         /* Cross axis alignment */
  gap: 16px;                   /* Spacing */
  flex-wrap: wrap;             /* Wrap */
}

.item {
  flex: 1 1 200px;             /* grow shrink basis */
}
```

**Common Use Cases:**
- Navigation bars
- Card lists
- Centering elements
- Form layouts

### 3.2 Grid
**Two-dimensional layout system**, suitable for page-level layouts.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "main main sidebar"
    "footer footer footer";
  gap: 20px;
}

.header  { grid-area: header; }
.main    { grid-area: main; }
.sidebar { grid-area: sidebar; }
.footer  { grid-area: footer; }
```

**Common Use Cases:**
- Overall page layout
- Card grids
- Complex dashboards
- Responsive layouts

### 3.3 Positioning
```css
/* Relative - relative to its original position */
position: relative;

/* Absolute - relative to nearest non-static positioned ancestor */
position: absolute;

/* Fixed - relative to viewport */
position: fixed;

/* Sticky - switches between relative/fixed on scroll */
position: sticky;
top: 0;
```

---

## 4. Modern CSS Features

### 4.1 Container Queries
```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### 4.2 Cascade Layers
```css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer components {
  .button { /* ... */ }
}
```

### 4.3 Nesting
```css
.card {
  padding: 16px;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  & .title {
    font-size: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 24px;
  }
}
```

### 4.4 Custom Properties
```css
:root {
  --primary: #3b82f6;
  --spacing: 16px;
  --radius: 8px;
}

.button {
  background: var(--primary);
  padding: var(--spacing);
  border-radius: var(--radius);
}
```

---

## 5. Responsive Design

### 5.1 Media Queries
```css
/* Mobile-first */
.container { padding: 16px; }

@media (min-width: 768px) {
  .container { padding: 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 32px; max-width: 1200px; margin: 0 auto; }
}
```

### 5.2 Fluid Typography
```css
/* clamp: min preferred max */
h1 { font-size: clamp(2rem, 5vw, 4rem); }

/* Smooth scaling with calc and vw */
html { font-size: calc(14px + 0.5vw); }
```

### 5.3 Modern Units
| Unit | Description | Use Case |
|---|---|---|
| `rem` | Root element font size | Fonts, spacing |
| `em` | Current element font size | Component-relative sizing |
| `vw/vh` | Viewport percentage | Full-screen layouts |
| `dvh/svh/lvh` | Dynamic viewport height | Mobile viewport adaptation |
| `cqw/cqh` | Container query units | Container-relative sizing |
| `fr` | Grid available space | Grid layouts |

---

## 6. Performance Optimization

### 6.1 Rendering Performance
**High-cost properties (trigger reflow):**
- `width`, `height`, `padding`, `margin`
- `top`, `left`, `right`, `bottom`
- `font-size`, `display`

**Low-cost properties (repaint only):**
- `color`, `background`
- `visibility`

**Zero-cost properties (GPU accelerated):**
- `transform`
- `opacity`
- `filter`

### 6.2 Optimization Techniques
```css
/* Use transform instead of position animation */
.bad  { animation: slide 1s; }
.good { animation: slide-transform 1s; }

@keyframes slide {
  from { left: 0; }
  to   { left: 100px; }
}

@keyframes slide-transform {
  from { transform: translateX(0); }
  to   { transform: translateX(100px); }
}

/* Hint browser to optimize */
.optimized {
  will-change: transform;
  transform: translateZ(0); /* Force GPU acceleration */
}
```

---

## 7. CSS Architecture Methods

| Method | Characteristics | Use Case |
|---|---|---|
| BEM | Naming convention, `.block__element--modifier` | Traditional projects |
| CSS Modules | Local scoping, `styles.className` | React projects |
| Tailwind | Utility-first, atomic classes | Rapid development |
| Styled Components | CSS-in-JS, template literals | React ecosystem |
| CSS Layers | `@layer` cascade control | Large projects |

---

## 8. Related Concepts

- [HTML Fundamentals](html-fundamentals.en.md)
- [CSS Layout Systems](../techniques/css-layout.en.md)
- [CSS Animations](../techniques/css-animations.en.md)
- [Responsive Design](../techniques/responsive-design.en.md)
- [CSS Architecture](../techniques/css-architecture.en.md)
