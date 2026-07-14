# HTML 基础

> 语义化 HTML 是前端可访问性、SEO 和结构化的基础。没有良好的 HTML，CSS 和 JavaScript 都是在补救。

---

## 1. 核心原则

### 1.1 语义化
HTML 标签不是视觉容器，而是**内容语义**的载体。

| 错误用法 | 正确用法 | 原因 |
|---|---|---|
| `&lt;div class="header"&gt;` | `&lt;header&gt;` | 语义明确，屏幕阅读器可识别 |
| `&lt;div class="button"&gt;` | `&lt;button&gt;` | 内置键盘交互和焦点管理 |
| `&lt;span onclick="..."&gt;` | `&lt;a href="..."&gt;` | 链接语义，支持右键打开新标签 |
| `&lt;div class="list"&gt;` | `&lt;ul&gt;/&lt;ol&gt;` | 列表语义，屏幕阅读器可播报数量 |

### 1.2 文档结构
```html
&amp;amp;lt;!DOCTYPE html&amp;amp;gt;
&amp;amp;lt;html lang=&amp;amp;quot;zh-CN&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;head&amp;amp;gt;
  &amp;amp;lt;meta charset=&amp;amp;quot;UTF-8&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;meta name=&amp;amp;quot;viewport&amp;amp;quot; content=&amp;amp;quot;width=device-width, initial-scale=1.0&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;title&amp;amp;gt;页面标题&amp;amp;lt;/title&amp;amp;gt;
  &amp;amp;lt;meta name=&amp;amp;quot;description&amp;amp;quot; content=&amp;amp;quot;页面描述&amp;amp;quot;&amp;amp;gt;
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

### 1.3 标题层级
- `&lt;h1&gt;` 每页只能有一个（通常是页面标题）
- 标题层级不能跳跃（h1 → h2 → h3，不能 h1 → h4）
- 标题应该反映内容结构，不是视觉大小

---

## 2. 关键元素

### 2.1 表单元素
```html
&amp;amp;lt;form action=&amp;amp;quot;/submit&amp;amp;quot; method=&amp;amp;quot;POST&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;label for=&amp;amp;quot;email&amp;amp;quot;&amp;amp;gt;邮箱&amp;amp;lt;/label&amp;amp;gt;
  &amp;amp;lt;input type=&amp;amp;quot;email&amp;amp;quot; id=&amp;amp;quot;email&amp;amp;quot; name=&amp;amp;quot;email&amp;amp;quot; required autocomplete=&amp;amp;quot;email&amp;amp;quot;&amp;amp;gt;
  
  &amp;amp;lt;fieldset&amp;amp;gt;
    &amp;amp;lt;legend&amp;amp;gt;偏好设置&amp;amp;lt;/legend&amp;amp;gt;
    &amp;amp;lt;input type=&amp;amp;quot;checkbox&amp;amp;quot; id=&amp;amp;quot;newsletter&amp;amp;quot; name=&amp;amp;quot;newsletter&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;label for=&amp;amp;quot;newsletter&amp;amp;quot;&amp;amp;gt;订阅新闻&amp;amp;lt;/label&amp;amp;gt;
  &amp;amp;lt;/fieldset&amp;amp;gt;
  
  &amp;amp;lt;button type=&amp;amp;quot;submit&amp;amp;quot;&amp;amp;gt;提交&amp;amp;lt;/button&amp;amp;gt;
&amp;amp;lt;/form&amp;amp;gt;
```

**要点：**
- `&lt;label&gt;` 必须通过 `for` 属性关联表单元素
- 使用正确的 `type` 值触发移动端键盘优化
- `autocomplete` 帮助浏览器自动填充
- `&lt;fieldset&gt;` 和 `&lt;legend&gt;` 组织复杂表单

### 2.2 媒体元素
```html
&amp;amp;lt;picture&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;image.avif&amp;amp;quot; type=&amp;amp;quot;image/avif&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;source srcset=&amp;amp;quot;image.webp&amp;amp;quot; type=&amp;amp;quot;image/webp&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;img src=&amp;amp;quot;image.jpg&amp;amp;quot; alt=&amp;amp;quot;描述性文字&amp;amp;quot; loading=&amp;amp;quot;lazy&amp;amp;quot; width=&amp;amp;quot;800&amp;amp;quot; height=&amp;amp;quot;600&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;/picture&amp;amp;gt;

&amp;amp;lt;video controls width=&amp;amp;quot;640&amp;amp;quot; poster=&amp;amp;quot;preview.jpg&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;source src=&amp;amp;quot;video.mp4&amp;amp;quot; type=&amp;amp;quot;video/mp4&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;track kind=&amp;amp;quot;subtitles&amp;amp;quot; src=&amp;amp;quot;subs.vtt&amp;amp;quot; srclang=&amp;amp;quot;zh&amp;amp;quot; label=&amp;amp;quot;中文&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;/video&amp;amp;gt;
```

### 2.3 表格
```html
&amp;amp;lt;table&amp;amp;gt;
  &amp;amp;lt;caption&amp;amp;gt;2024年销售数据&amp;amp;lt;/caption&amp;amp;gt;
  &amp;amp;lt;thead&amp;amp;gt;
    &amp;amp;lt;tr&amp;amp;gt;
      &amp;amp;lt;th scope=&amp;amp;quot;col&amp;amp;quot;&amp;amp;gt;季度&amp;amp;lt;/th&amp;amp;gt;
      &amp;amp;lt;th scope=&amp;amp;quot;col&amp;amp;quot;&amp;amp;gt;销售额&amp;amp;lt;/th&amp;amp;gt;
    &amp;amp;lt;/tr&amp;amp;gt;
  &amp;amp;lt;/thead&amp;amp;gt;
  &amp;amp;lt;tbody&amp;amp;gt;
    &amp;amp;lt;tr&amp;amp;gt;
      &amp;amp;lt;th scope=&amp;amp;quot;row&amp;amp;quot;&amp;amp;gt;Q1&amp;amp;lt;/th&amp;amp;gt;
      &amp;amp;lt;td&amp;amp;gt;¥1,000,000&amp;amp;lt;/td&amp;amp;gt;
    &amp;amp;lt;/tr&amp;amp;gt;
  &amp;amp;lt;/tbody&amp;amp;gt;
&amp;amp;lt;/table&amp;amp;gt;
```

---

## 3. 可访问性 (a11y)

### 3.1 ARIA 属性
```html
&amp;amp;lt;!-- 角色定义 --&amp;amp;gt;
&amp;amp;lt;div role=&amp;amp;quot;navigation&amp;amp;quot; aria-label=&amp;amp;quot;主导航&amp;amp;quot;&amp;amp;gt;...&amp;amp;lt;/div&amp;amp;gt;

&amp;amp;lt;!-- 状态管理 --&amp;amp;gt;
&amp;amp;lt;button aria-expanded=&amp;amp;quot;false&amp;amp;quot; aria-controls=&amp;amp;quot;menu&amp;amp;quot;&amp;amp;gt;菜单&amp;amp;lt;/button&amp;amp;gt;
&amp;amp;lt;ul id=&amp;amp;quot;menu&amp;amp;quot; hidden&amp;amp;gt;...&amp;amp;lt;/ul&amp;amp;gt;

&amp;amp;lt;!-- 实时区域 --&amp;amp;gt;
&amp;amp;lt;div aria-live=&amp;amp;quot;polite&amp;amp;quot; aria-atomic=&amp;amp;quot;true&amp;amp;quot;&amp;amp;gt;
  &amp;amp;lt;!-- 动态内容更新会通知屏幕阅读器 --&amp;amp;gt;
&amp;amp;lt;/div&amp;amp;gt;
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
  const modal = document.getElementById(&amp;amp;#039;modal&amp;amp;#039;);
  modal.showModal();
  modal.querySelector(&amp;amp;#039;input&amp;amp;#039;)?.focus();
}

// 路由切换后移动焦点
router.afterEach(() =&amp;amp;gt; {
  document.querySelector(&amp;amp;#039;main&amp;amp;#039;)?.focus();
});
```

---

## 4. SEO 优化

### 4.1 Meta 标签
```html
&amp;amp;lt;meta name=&amp;amp;quot;description&amp;amp;quot; content=&amp;amp;quot;页面描述，150-160字符&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;meta name=&amp;amp;quot;robots&amp;amp;quot; content=&amp;amp;quot;index, follow&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;link rel=&amp;amp;quot;canonical&amp;amp;quot; href=&amp;amp;quot;https://example.com/page&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Open Graph --&amp;amp;gt;
&amp;amp;lt;meta property=&amp;amp;quot;og:title&amp;amp;quot; content=&amp;amp;quot;页面标题&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;meta property=&amp;amp;quot;og:description&amp;amp;quot; content=&amp;amp;quot;页面描述&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;meta property=&amp;amp;quot;og:image&amp;amp;quot; content=&amp;amp;quot;https://example.com/image.jpg&amp;amp;quot;&amp;amp;gt;
&amp;amp;lt;meta property=&amp;amp;quot;og:url&amp;amp;quot; content=&amp;amp;quot;https://example.com/page&amp;amp;quot;&amp;amp;gt;

&amp;amp;lt;!-- Twitter Card --&amp;amp;gt;
&amp;amp;lt;meta name=&amp;amp;quot;twitter:card&amp;amp;quot; content=&amp;amp;quot;summary_large_image&amp;amp;quot;&amp;amp;gt;
```

### 4.2 结构化数据
```html
&amp;amp;lt;script type=&amp;amp;quot;application/ld+json&amp;amp;quot;&amp;amp;gt;
{
  &amp;amp;quot;@context&amp;amp;quot;: &amp;amp;quot;https://schema.org&amp;amp;quot;,
  &amp;amp;quot;@type&amp;amp;quot;: &amp;amp;quot;Article&amp;amp;quot;,
  &amp;amp;quot;headline&amp;amp;quot;: &amp;amp;quot;文章标题&amp;amp;quot;,
  &amp;amp;quot;author&amp;amp;quot;: {&amp;amp;quot;@type&amp;amp;quot;: &amp;amp;quot;Person&amp;amp;quot;, &amp;amp;quot;name&amp;amp;quot;: &amp;amp;quot;作者&amp;amp;quot;},
  &amp;amp;quot;datePublished&amp;amp;quot;: &amp;amp;quot;2024-01-01&amp;amp;quot;
}
&amp;amp;lt;/script&amp;amp;gt;
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
- 用 `&lt;div&gt;` 代替所有元素
- 用 `&lt;br&gt;` 控制间距
- 用内联样式代替 CSS
- 跳过标题层级
- 使用过时的标签（`&lt;font&gt;`, `&lt;center&gt;`）
- 忘记表单的 `&lt;label&gt;`

---

## 6. 相关概念

- [CSS 基础](css-fundamentals.md)
- [DOM 与浏览器 API](dom-and-browser-api.md)
- [可访问性模式](../patterns/accessibility-patterns.md)
- [SEO 技术](../techniques/seo-techniques.md)
