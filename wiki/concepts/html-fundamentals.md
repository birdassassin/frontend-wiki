# HTML 基础

> 语义化 HTML 是前端可访问性、SEO 和结构化的基础。没有良好的 HTML，CSS 和 JavaScript 都是在补救。

---

## 1. 核心原则

### 1.1 语义化
HTML 标签不是视觉容器，而是**内容语义**的载体。

| 错误用法 | 正确用法 | 原因 |
|---|---|---|
| `<div class="header">` | `<header>` | 语义明确，屏幕阅读器可识别 |
| `<div class="button">` | `<button>` | 内置键盘交互和焦点管理 |
| `<span onclick="...">` | `<a href="...">` | 链接语义，支持右键打开新标签 |
| `<div class="list">` | `<ul>/<ol>` | 列表语义，屏幕阅读器可播报数量 |

### 1.2 文档结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题</title>
  <meta name="description" content="页面描述">
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

### 1.3 标题层级
- `<h1>` 每页只能有一个（通常是页面标题）
- 标题层级不能跳跃（h1 → h2 → h3，不能 h1 → h4）
- 标题应该反映内容结构，不是视觉大小

---

## 2. 关键元素

### 2.1 表单元素
```html
<form action="/submit" method="POST">
  <label for="email">邮箱</label>
  <input type="email" id="email" name="email" required autocomplete="email">
  
  <fieldset>
    <legend>偏好设置</legend>
    <input type="checkbox" id="newsletter" name="newsletter">
    <label for="newsletter">订阅新闻</label>
  </fieldset>
  
  <button type="submit">提交</button>
</form>
```

**要点：**
- `<label>` 必须通过 `for` 属性关联表单元素
- 使用正确的 `type` 值触发移动端键盘优化
- `autocomplete` 帮助浏览器自动填充
- `<fieldset>` 和 `<legend>` 组织复杂表单

### 2.2 媒体元素
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述性文字" loading="lazy" width="800" height="600">
</picture>

<video controls width="640" poster="preview.jpg">
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="subs.vtt" srclang="zh" label="中文">
</video>
```

### 2.3 表格
```html
<table>
  <caption>2024年销售数据</caption>
  <thead>
    <tr>
      <th scope="col">季度</th>
      <th scope="col">销售额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>¥1,000,000</td>
    </tr>
  </tbody>
</table>
```

---

## 3. 可访问性 (a11y)

### 3.1 ARIA 属性
```html
<!-- 角色定义 -->
<div role="navigation" aria-label="主导航">...</div>

<!-- 状态管理 -->
<button aria-expanded="false" aria-controls="menu">菜单</button>
<ul id="menu" hidden>...</ul>

<!-- 实时区域 -->
<div aria-live="polite" aria-atomic="true">
  <!-- 动态内容更新会通知屏幕阅读器 -->
</div>
```

### 3.2 键盘导航
- 所有交互元素必须可通过 `Tab` 访问
- 使用 `tabindex="0"` 让自定义元素可聚焦
- 使用 `tabindex="-1"` 让元素可编程聚焦
- 避免使用 `tabindex > 0`

### 3.3 焦点管理
```javascript
// 模态框打开时管理焦点
function openModal() {
  const modal = document.getElementById('modal');
  modal.showModal();
  modal.querySelector('input')?.focus();
}

// 路由切换后移动焦点
router.afterEach(() => {
  document.querySelector('main')?.focus();
});
```

---

## 4. SEO 优化

### 4.1 Meta 标签
```html
<meta name="description" content="页面描述，150-160字符">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://example.com/page">

<!-- Open Graph -->
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
```

### 4.2 结构化数据
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "文章标题",
  "author": {"@type": "Person", "name": "作者"},
  "datePublished": "2024-01-01"
}
</script>
```

---

## 5. 最佳实践

### 5.1 DO
- 使用语义化标签
- 提供有意义的 `alt` 文本
- 保持标题层级正确
- 使用正确的表单类型
- 添加语言属性 `lang`
- 设置 viewport meta 标签

### 5.2 DON'T
- 用 `<div>` 代替所有元素
- 用 `<br>` 控制间距
- 用内联样式代替 CSS
- 跳过标题层级
- 使用过时的标签（`<font>`, `<center>`）
- 忘记表单的 `<label>`

---

## 6. 相关概念

- [CSS 基础](css-fundamentals.md)
- [DOM 与浏览器 API](dom-and-browser-api.md)
- [可访问性模式](../../patterns/accessibility-patterns.md)
- [SEO 技术](../../techniques/seo-techniques.md)
