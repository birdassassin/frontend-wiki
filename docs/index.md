# 前端知识库

**简体中文** · [English](README.md)

[![Wiki](https://img.shields.io/badge/Wiki-frontend--wiki-blue?logo=github)](https://github.com/frontend-wiki)
[![Knowledge](https://img.shields.io/badge/Knowledge-Frontend-green?logo=react)](./wiki/overview.md)

&lt;img src="https://img.shields.io/badge/HTML-Semantic-orange?logo=html5" alt="HTML" /&gt;
&lt;img src="https://img.shields.io/badge/CSS-Modern-blue?logo=css3" alt="CSS" /&gt;
&lt;img src="https://img.shields.io/badge/JavaScript-ES2025-yellow?logo=javascript" alt="JavaScript" /&gt;
&lt;img src="https://img.shields.io/badge/Frameworks-React/Vue/Angular-61dafb?logo=react" alt="Frameworks" /&gt;
&lt;img src="https://img.shields.io/badge/Performance-Web%20Vitals-green" alt="Performance" /&gt;
&lt;img src="https://img.shields.io/badge/Architecture-Modern-purple" alt="Architecture" /&gt;

本知识库采用 **Karpathy Wiki 方法**：原始材料经过系统化整理，提炼为高压缩比的概念页面、技术页面和模式页面。[`overview.md`](wiki/overview.md) 是最高压缩的综合概述；[`index.md`](wiki/index.md) 是完整目录。

:::info
从 [`overview.md`](wiki/overview.md) 开始，而不是直接跳到细节。概述提供了全局视角；索引提供了完整导航。
:::

---

## 快速路径

| 我想… | 从这里开始 |
|---|---|
| 了解全貌 | [overview.md](wiki/overview.md) |
| 浏览完整目录 | [index.md](wiki/index.md) |
| 掌握核心基础 | [HTML 基础](wiki/concepts/html-fundamentals.md) · [CSS 基础](wiki/concepts/css-fundamentals.md) · [JavaScript 基础](wiki/concepts/javascript-fundamentals.md) |
| 理解现代框架 | [组件架构](wiki/concepts/component-architecture.md) |
| 学习性能优化 | [Web Vitals](wiki/concepts/web-vitals.md) |
| 掌握工程化 | [前端工程化](wiki/concepts/frontend-engineering.md) |

---

## 核心概念框架

前端知识可以压缩为 **七个核心框架**：

| 框架 | 回答的问题 | 关键概念 |
|---|---|---|
| [语义化 HTML](wiki/concepts/html-fundamentals.md) | 内容如何被结构化？ | 文档流、ARIA、SEO、可访问性 |
| [CSS 层叠与布局](wiki/concepts/css-fundamentals.md) | 样式如何计算与应用？ | 层叠上下文、Flexbox、Grid、容器查询 |
| [JavaScript 运行时](wiki/concepts/javascript-fundamentals.md) | 代码如何执行？ | 事件循环、闭包、原型链、模块系统 |
| [组件架构](wiki/concepts/component-architecture.md) | UI 如何被分解与组合？ | Props、状态、生命周期、组合模式 |
| [状态管理](wiki/concepts/state-management.md) | 数据如何流动与同步？ | 单向数据流、响应式、不可变性、派生状态 |
| [渲染策略](wiki/concepts/rendering-strategies.md) | 内容如何到达用户？ | CSR/SSR/SSG/ISR、水合、流式渲染 |
| [性能指标](wiki/concepts/web-vitals.md) | 体验如何被量化？ | LCP、INP、CLS、FCP、TTI |

---

## 知识图谱

前端知识不是线性的，而是网状的。以下是核心概念之间的关联：

```
                    ┌─────────────┐
                    │   HTML      │
                    │  语义化结构  │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    CSS      │
                    │  视觉表现    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ JavaScript  │
                    │  交互逻辑    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌───▼────┐ ┌────▼─────┐
       │   框架       │ │ 工具链  │ │  性能     │
       │ React/Vue   │ │ Vite   │ │  Web Vitals│
       └──────┬──────┘ └───┬────┘ └────┬─────┘
              │            │            │
              └────────────┼────────────┘
                           │
                    ┌──────▼──────┐
                    │   架构       │
                    │  模式/策略   │
                    └─────────────┘
```

---

## 如何使用

- **作为学习路径** — 从基础概念开始，逐步深入到架构和性能
- **作为参考手册** — 通过索引快速查找特定主题
- **作为面试准备** — 核心概念页面覆盖常见面试问题
- **作为团队规范** — 最佳实践页面可作为团队开发指南

:::tip
**5 分钟**：阅读本概述，了解全貌
**30 分钟**：阅读 [HTML/CSS/JS 基础](wiki/concepts/html-fundamentals.md) + [组件架构](wiki/concepts/component-architecture.md)
**一天**：按顺序浏览所有核心概念页面
:::

---

**最后更新**: 2025-05-31

**覆盖范围**: HTML5/CSS3/ES2025 基础 · React 19/Vue 3.5/Svelte 5 · Next.js 15/Nuxt 3 · Vite 6 · TypeScript 5.7 · Web Vitals · AI 辅助开发
