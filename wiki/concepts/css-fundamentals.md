# CSS 基础

> CSS 不是样式表，是**布局引擎**。理解层叠、特异性、布局算法比记忆属性重要得多。

---

## 1. 核心机制

### 1.1 层叠 (Cascade)
CSS 的全称是 Cascading Style Sheets，层叠是其核心算法：

```
重要性 (Importance) > 来源 (Origin) > 特异性 (Specificity) > 顺序 (Order)
```

**层叠层级：**
1. `!important` 用户样式
2. `!important` 作者样式
3. 普通用户样式
4. 普通作者样式
5. 浏览器默认样式

### 1.2 特异性计算
```
内联样式 (1,0,0,0) > ID (0,1,0,0) > 类/属性/伪类 (0,0,1,0) > 元素/伪元素 (0,0,0,1)
```

**示例：**
```css
div              /* 0,0,0,1 */
.container       /* 0,0,1,0 */
#main            /* 0,1,0,0 */
div.container    /* 0,0,1,1 */
#main .container /* 0,1,1,1 */
style="..."      /* 1,0,0,0 */
```

**规则：**
- 特异性相同时，后面的规则覆盖前面的
- 避免使用 `!important`，除非是 utility-first CSS
- 保持特异性扁平化，避免特异性战争

### 1.3 继承
**默认继承的属性：**
- 文本相关：`color`, `font-*`, `text-*`, `line-height`
- 列表相关：`list-style-*`
- 表格相关：`border-collapse`, `border-spacing`

**不继承的属性：**
- 盒模型：`width`, `height`, `margin`, `padding`, `border`
- 定位：`position`, `top`, `left`, `z-index`
- 背景：`background-*`
- 布局：`display`, `flex-*`, `grid-*`

使用 `inherit`, `initial`, `unset`, `revert` 控制继承行为。

---

## 2. 盒模型

### 2.1 标准盒模型 vs 怪异盒模型
```css
/* 标准盒模型 (默认) */
/* width = content width */
/* 实际宽度 = width + padding + border */
box-sizing: content-box;

/* 怪异盒模型 (推荐) */
/* width = content + padding + border */
box-sizing: border-box;
```

**最佳实践：**
```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

### 2.2 外边距折叠
相邻块级元素的垂直外边距会折叠：
```css
.parent { margin-bottom: 20px; }
.child  { margin-top: 30px; }
/* 实际间距 = 30px (取较大值)，不是 50px */
```

**避免折叠的方法：**
- 使用 `padding` 代替 `margin`
- 使用 Flexbox 或 Grid 的 `gap`
- 创建 BFC（`overflow: hidden`, `display: flow-root`）

---

## 3. 布局系统

### 3.1 Flexbox
**一维布局系统**，适合组件级布局。

```css
.container {
  display: flex;
  flex-direction: row;         /* 主轴方向 */
  justify-content: center;     /* 主轴对齐 */
  align-items: center;         /* 交叉轴对齐 */
  gap: 16px;                   /* 间距 */
  flex-wrap: wrap;             /* 换行 */
}

.item {
  flex: 1 1 200px;             /* grow shrink basis */
}
```

**常用场景：**
- 导航栏
- 卡片列表
- 居中元素
- 表单布局

### 3.2 Grid
**二维布局系统**，适合页面级布局。

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

**常用场景：**
- 页面整体布局
- 卡片网格
- 复杂仪表盘
- 响应式布局

### 3.3 定位
```css
/* 相对定位 - 相对于自身原始位置 */
position: relative;

/* 绝对定位 - 相对于最近的非 static 定位祖先 */
position: absolute;

/* 固定定位 - 相对于视口 */
position: fixed;

/* 粘性定位 - 滚动时切换 relative/fixed */
position: sticky;
top: 0;
```

---

## 4. 现代 CSS 特性

### 4.1 容器查询
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

### 4.2 层叠层
```css
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer components {
  .button { /* ... */ }
}
```

### 4.3 嵌套规则
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

### 4.4 自定义属性
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

## 5. 响应式设计

### 5.1 媒体查询
```css
/* 移动优先 */
.container { padding: 16px; }

@media (min-width: 768px) {
  .container { padding: 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 32px; max-width: 1200px; margin: 0 auto; }
}
```

### 5.2 流体排版
```css
/* clamp: 最小值 首选值 最大值 */
h1 { font-size: clamp(2rem, 5vw, 4rem); }

/* 使用 calc 和 vw 实现平滑缩放 */
html { font-size: calc(14px + 0.5vw); }
```

### 5.3 现代单位
| 单位 | 描述 | 用途 |
|---|---|---|
| `rem` | 根元素字体大小 | 字体、间距 |
| `em` | 当前元素字体大小 | 组件内相对尺寸 |
| `vw/vh` | 视口百分比 | 全屏布局 |
| `dvh/svh/lvh` | 动态视口高度 | 移动端视口适配 |
| `cqw/cqh` | 容器查询单位 | 容器相对尺寸 |
| `fr` | Grid 可用空间 | Grid 布局 |

---

## 6. 性能优化

### 6.1 渲染性能
**高成本属性（触发重排）：**
- `width`, `height`, `padding`, `margin`
- `top`, `left`, `right`, `bottom`
- `font-size`, `display`

**低成本属性（仅重绘）：**
- `color`, `background`
- `visibility`

**零成本属性（GPU 加速）：**
- `transform`
- `opacity`
- `filter`

### 6.2 优化技巧
```css
/* 使用 transform 代替 position 动画 */
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

/* 提示浏览器优化 */
.optimized {
  will-change: transform;
  transform: translateZ(0); /* 强制 GPU 加速 */
}
```

---

## 7. CSS 架构方法

| 方法 | 特点 | 适用场景 |
|---|---|---|
| BEM | 命名约定，`.block__element--modifier` | 传统项目 |
| CSS Modules | 局部作用域，`styles.className` | React 项目 |
| Tailwind | Utility-first，原子类 | 快速开发 |
| Styled Components | CSS-in-JS，模板字符串 | React 生态 |
| CSS Layers | `@layer` 控制层叠 | 大型项目 |

---

## 8. 相关概念

- [HTML 基础](html-fundamentals.md)
- [CSS 布局系统](../../techniques/css-layout.md)
- [CSS 动画](../../techniques/css-animations.md)
- [响应式设计](../../techniques/responsive-design.md)
- [CSS 架构](../../techniques/css-architecture.md)
