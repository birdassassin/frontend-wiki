import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '前端知识库',
  description: '一个系统化的前端知识体系 — 从基础到架构，从工具到哲学',
  base: '/',
  head: [
    ['link', { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>' }]
  ],
  ignoreDeadLinks: true,
  vite: {
    build: {
      rollupOptions: {
        external: [/^\/img\//]
      }
    }
  },
  themeConfig: {
    logo: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>',
    siteTitle: '前端知识库',
    nav: [
      { text: '首页', link: '/' },
      { text: '概览', link: '/wiki/overview.md' },
      { text: '完整索引', link: '/wiki/index.md' },
      { text: 'GitHub', link: 'https://github.com/birdassassin/frontend-wiki', target: '_blank' },
      { text: 'Gitee', link: 'https://gitee.com/birdassassin/frontend-wiki', target: '_blank' }
    ],
    sidebar: {
      '/': [
        {
          text: '首页',
          link: '/'
        },
        {
          text: '知识库概览',
          link: '/wiki/overview.md'
        },
        {
          text: '前端核心概念',
          link: '/wiki/index.md',
          items: [
            { text: 'HTML 基础', link: '/wiki/concepts/html-fundamentals.md' },
            { text: 'CSS 基础', link: '/wiki/concepts/css-fundamentals.md' },
            { text: 'JavaScript 基础', link: '/wiki/concepts/javascript-fundamentals.md' },
            { text: 'TypeScript', link: '/wiki/concepts/typescript.md' },
            { text: '组件架构', link: '/wiki/concepts/component-architecture.md' },
            { text: '状态管理', link: '/wiki/concepts/state-management.md' },
            { text: '渲染策略', link: '/wiki/concepts/rendering-strategies.md' },
            { text: '性能优化', link: '/wiki/concepts/performance-optimization.md' },
            { text: 'Web Vitals', link: '/wiki/concepts/web-vitals.md' },
            { text: '安全', link: '/wiki/concepts/security.md' },
            { text: '测试策略', link: '/wiki/concepts/testing-strategies.md' },
            { text: '前端工程化', link: '/wiki/concepts/frontend-engineering.md' }
          ]
        },
        {
          text: '前端工具链',
          link: '/wiki/tools/fullstack-frameworks.md',
          items: [
            { text: 'Webpack', link: '/wiki/tools/webpack.md' },
            { text: 'Vite', link: '/wiki/tools/vite.md' },
            { text: 'Create React App', link: '/wiki/tools/create-react-app.md' },
            { text: 'React 生态', link: '/wiki/tools/react-ecosystem.md' },
            { text: 'Vue 生态', link: '/wiki/tools/vue-ecosystem.md' }
          ]
        },
        {
          text: '技术详解',
          items: [
            { text: 'React 核心', link: '/wiki/techniques/react-core.md' },
            { text: 'Vue 核心', link: '/wiki/techniques/vue-core.md' },
            { text: 'Create React App', link: '/wiki/techniques/create-react-app.md' }
          ]
        },
        {
          text: '前端经典教程',
          link: '/wiki/legacy/index.md',
          items: [
            { text: 'JavaScript 系列', link: '/wiki/legacy/JavaScript系列/' },
            { text: 'ES6+ 系列', link: '/wiki/legacy/ES6系列/' },
            { text: 'React 系列', link: '/wiki/legacy/React系列/' },
            { text: 'Vue 系列', link: '/wiki/legacy/Vue系列/' },
            { text: 'Webpack 系列', link: '/wiki/legacy/Webpack系列/' },
            { text: '前端系列', link: '/wiki/legacy/前端系列/' },
            { text: '数据结构和算法', link: '/wiki/legacy/数据结构和算法/' },
            { text: '正则系列', link: '/wiki/legacy/正则系列/' },
            { text: 'Lodash 源码解析', link: '/wiki/legacy/Lodash源码解析/' }
          ]
        },
        {
          text: '最新动态',
          link: '/wiki/news/index.md',
          items: [
            { text: 'React', link: '/wiki/news/index.md#react' },
            { text: 'Vue', link: '/wiki/news/index.md#vue' },
            { text: 'Vite', link: '/wiki/news/index.md#vite' },
            { text: 'Zero', link: '/wiki/news/index.md#zero' },
            { text: '前端排名前十', link: '/wiki/news/index.md#前端排名前十动态' }
          ]
        },
        {
          text: '版本更新日志',
          link: '/CHANGELOG.md'
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '显示详情',
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '导航',
              closeText: '关闭'
            }
          }
        }
      }
    },
    footer: {
      message: '前端知识库 | <a href="https://github.com/birdassassin/frontend-wiki" target="_blank">GitHub</a> | <a href="https://gitee.com/birdassassin/frontend-wiki" target="_blank">Gitee</a>',
      copyright: '© 2025 Frontend Wiki. MIT License.'
    },
    editLink: {
      pattern: 'https://github.com/birdassassin/frontend-wiki/edit/main/docs/:path',
      text: '编辑此页面'
    },
    prevNextLinks: true
  }
})
