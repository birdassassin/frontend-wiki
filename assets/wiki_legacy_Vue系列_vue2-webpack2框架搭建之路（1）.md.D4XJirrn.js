import{_ as s,o as n,c as p,a2 as e}from"./chunks/framework.BWuWLRhz.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/Vue系列/vue2-webpack2框架搭建之路（1）.md","filePath":"wiki/legacy/Vue系列/vue2-webpack2框架搭建之路（1）.md"}'),t={name:"wiki/legacy/Vue系列/vue2-webpack2框架搭建之路（1）.md"};function l(o,a,i,c,r,u){return n(),p("div",null,[...a[0]||(a[0]=[e(`<p>一直以来，我从事react开发，突然想用vue来搭建一个项目，看看我的踩坑之路。</p><p>react、vue、angular代表了3种前端工程化的思想，学习三大框架主要是理解它们的核心概念，比如组件、生命周期、单向数据流、双向绑定等。这些概念在非框架开发中，很少人会去这样系统化的思考，对于新手来说，很多概念都没有接触过，不知道从何入手一个react、vue或者是angular项目，下面我将会从零搭建vue项目，边做项目边学习vue的思想。</p><h3 id="_1、想要使用vue-我首先该怎么做" tabindex="-1"><strong>1、想要使用vue，我首先该怎么做？</strong> <a class="header-anchor" href="#_1、想要使用vue-我首先该怎么做" aria-label="Permalink to &quot;**1、想要使用vue，我首先该怎么做？**&quot;">​</a></h3><p>想要学习vue，我第一件事是去vue官网看简介：[<a href="https://cn.vuejs.org/v2/guide/installation.html" target="_blank" rel="noreferrer">https://cn.vuejs.org/v2/guide/installation.html</a>][3] ，仔细一看，vue现在有1.X和2.X的区别，很好，我果断选择2.X。</p><p>选中了vue版本，我上知乎搜索了vue框架搭建的方式，看了前辈的各种分享，了解到一个叫做 [cooking][4] 的好玩意，好在哪里？</p><p>cooking 的目标是将你从繁琐的构建配置中解放出来，同时还省去每个项目都要安装一堆开发依赖的麻烦。基于 webapck 但更友好的配置项、易用的扩展配置机制，让你专注项目忘掉配置。</p><p>哇，看到cooking官网介绍的这么好，我果断按照它的教程去做，瞎搞了一下下，发现用的不爽啊，一键配置环境看起来很高大上，可是还得去学习cooking的使用，而且本地得安装cooking，搞得我头晕，虽然在浏览器成功访问到了网页，但我还是放弃了这个好玩意。</p><p>这时候只能自己从0开始搭建项目了。</p><h3 id="_2、在github新建vue2-web项目。" tabindex="-1"><strong>2、在github新建vue2-web项目。</strong> <a class="header-anchor" href="#_2、在github新建vue2-web项目。" aria-label="Permalink to &quot;**2、在github新建vue2-web项目。**&quot;">​</a></h3><p>打开github首页，点击start a project。</p><p>接着你会看到Create a new repository，需要你填写项目信息，这个步骤跳过。</p><p>然后项目就建好了，clone到本地。</p><h3 id="_3、初始化npm" tabindex="-1"><strong>3、初始化npm</strong> <a class="header-anchor" href="#_3、初始化npm" aria-label="Permalink to &quot;**3、初始化npm**&quot;">​</a></h3><p>用shell或者cmd进入项目根目录，执行下面的命令，选项什么的直接跳过，最后会生成package.json文件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm init</span></span></code></pre></div><h3 id="_4、安装webpack" tabindex="-1"><strong>4、安装webpack</strong> <a class="header-anchor" href="#_4、安装webpack" aria-label="Permalink to &quot;**4、安装webpack**&quot;">​</a></h3><p>没有webpack就活不下去的感觉，但是配置webpack也会让人活不下去，太难记住webpack的配置项了，不过别担心，我已经帮你搞定这一步了，咋们都必须使用webpack2啊。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install --save-dev webpack</span></span></code></pre></div><p>还需要前端服务器，做热更新呀，webpack-dev-server登场。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install --save-dev webpack-dev-server</span></span></code></pre></div><h3 id="_5、创建webpack-config-js文件" tabindex="-1"><strong>5、创建webpack.config.js文件</strong> <a class="header-anchor" href="#_5、创建webpack-config-js文件" aria-label="Permalink to &quot;**5、创建webpack.config.js文件**&quot;">​</a></h3><p>和react中的webpack配置文件没什么区别，只是稍微改动一个地方即可移植过来使用。 <strong>千万不要把js和vue放到一起</strong>，不起作用的，必须分开，必须，这个坑我已经踩过了，为了找这个坑，浪费了我好几个小时，最最最隐蔽的一个地方。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rules: [{</span></span>
<span class="line"><span>            test: /\\.js$/,</span></span>
<span class="line"><span>            use: [&#39;babel-loader&#39;],</span></span>
<span class="line"><span>            exclude: /node_modules/,</span></span>
<span class="line"><span>            include: resolve(&#39;src&#39;)</span></span>
<span class="line"><span>        },{</span></span>
<span class="line"><span>            test: /\\.vue$/,</span></span>
<span class="line"><span>            use: [&#39;vue-loader&#39;],</span></span>
<span class="line"><span>            exclude: /node_modules/,</span></span>
<span class="line"><span>            include: resolve(&#39;src&#39;)</span></span>
<span class="line"><span>        },</span></span></code></pre></div><h3 id="_6、创建-babelrc文件。" tabindex="-1"><strong>6、创建.babelrc文件。</strong> <a class="header-anchor" href="#_6、创建-babelrc文件。" aria-label="Permalink to &quot;**6、创建.babelrc文件。**&quot;">​</a></h3><p>babel少不了，注意这里不是用react了，而是vue，包括下面几个插件，flow-vue、transform-vue-jsx。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;presets&quot;: [&quot;es2015&quot;, &quot;flow-vue&quot;, &quot;stage-0&quot;, &quot;stage-2&quot;],</span></span>
<span class="line"><span>  &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;],</span></span>
<span class="line"><span>  &quot;comments&quot;: false,</span></span>
<span class="line"><span>  &quot;env&quot;: {</span></span>
<span class="line"><span>    &quot;production&quot;: {</span></span>
<span class="line"><span>      &quot;plugins&quot;: [</span></span>
<span class="line"><span>        [&quot;transform-runtime&quot;, { &quot;polyfill&quot;: false, &quot;regenerator&quot;: false }]</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="_7、在package-json添加start命令" tabindex="-1"><strong>7、在package.json添加start命令</strong> <a class="header-anchor" href="#_7、在package-json添加start命令" aria-label="Permalink to &quot;**7、在package.json添加start命令**&quot;">​</a></h3><p>直接使用webpack-dev-server启动，哇塞，一堆报错，说少了哪个module，这个简单，因为配置文件里面引用的一堆module，还没有安装到项目呢，这时候一个个安装好就行了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;start&quot;: &quot;webpack-dev-server&quot;,</span></span></code></pre></div><h3 id="_8、项目入口main-js文件。" tabindex="-1"><strong>8、项目入口main.js文件。</strong> <a class="header-anchor" href="#_8、项目入口main-js文件。" aria-label="Permalink to &quot;**8、项目入口main.js文件。**&quot;">​</a></h3><p>这个文件名自己喜欢咋取就咋取，代码挺简单的，实例化一个Vue和路由，是不是和react的入口文件很像？当然，我做的是SPA，所以采用单入口的形式，如果是非SPA模式，就不是这种配置方式了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Vue from &#39;vue&#39;;</span></span>
<span class="line"><span>import App from &#39;./App.vue&#39;;</span></span>
<span class="line"><span>import VueRouter from &#39;vue-router&#39;;</span></span>
<span class="line"><span>import routes from &#39;./routes&#39;;</span></span>
<span class="line"><span>import VueResource from &#39;vue-resource&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Vue.use(VueResource); //http请求注册</span></span>
<span class="line"><span>Vue.use(VueRouter); //路由注册</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 实例化路由</span></span>
<span class="line"><span>const router = new VueRouter({</span></span>
<span class="line"><span>    // mode: &#39;history&#39;,</span><span> //H5 路由模式，需要服务端做渲染防止404错误</span></span>
<span class="line"><span>    base: __dirname,</span></span>
<span class="line"><span>    linkActiveClass: &#39;on&#39;,</span></span>
<span class="line"><span>    routes</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let render = new Vue({</span></span>
<span class="line"><span>    router,</span></span>
<span class="line"><span>    el: &#39;#app&#39;,</span></span>
<span class="line"><span>    render: h =&gt; h(App)</span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// if (module.hot) {</span></span>
<span class="line"><span>//     非必须</span></span>
<span class="line"><span>//     module.hot.accept(&#39;./App.vue&#39;, () =&gt; render);</span></span>
<span class="line"><span>// }</span></span></code></pre></div><h3 id="_9、路由routes-js" tabindex="-1"><strong>9、路由routes.js</strong> <a class="header-anchor" href="#_9、路由routes-js" aria-label="Permalink to &quot;**9、路由routes.js**&quot;">​</a></h3><p>路由和react也非常像（简直一样好不），这里的vue页面采用.vue后缀的方式来写。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import Home from &#39;./components/home/Home.vue&#39;;</span></span>
<span class="line"><span>import Bang from &#39;./components/bang/Bang.vue&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default [</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        path: &#39;/&#39;,</span></span>
<span class="line"><span>        redirect: &#39;home&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        path: &#39;/home&#39;,</span></span>
<span class="line"><span>        component: Home</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    {</span></span>
<span class="line"><span>        path: &#39;/bang&#39;,</span></span>
<span class="line"><span>        component: Bang</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>]</span></span></code></pre></div><h3 id="_10、单页顶层容器app-vue" tabindex="-1"><strong>10、单页顶层容器App.vue</strong> <a class="header-anchor" href="#_10、单页顶层容器app-vue" aria-label="Permalink to &quot;**10、单页顶层容器App.vue**&quot;">​</a></h3><p>从index进来，就是这个文件，现在开始学习vue的精华。</p><p>template：vue的模板语言，也叫作jsx。 transition：过渡动画。 router-view：路由显示容器，通过router-link跳转加载的.vue会在这个容器渲染。router-link被我封装到nav.vue组件里面了。 script：导入了当前顶级容器需要用到的vue组件，包括头部、导航、首页。还有更多丰富的设置我没有研究，后续的学习中会深入下去。 style: 当前组件的样式，我配置了less语法支持。将style改成&lt;style lang=&quot;less&quot;&gt;即可写less。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>    &lt;div&gt;</span></span>
<span class="line"><span>        &lt;app-header logo=&quot;logo&quot; &gt;&lt;/app-header&gt;</span></span>
<span class="line"><span>        &lt;app-nav&gt;&lt;/app-nav&gt;</span></span>
<span class="line"><span>        &lt;transition name=&quot;fade&quot; mode=&quot;out-in&quot;&gt;</span></span>
<span class="line"><span>            &lt;router-view class=&quot;view&quot;&gt;&lt;/router-view&gt;</span></span>
<span class="line"><span>        &lt;/transition&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>    import Header from &#39;./components/common/Header.vue&#39;;</span></span>
<span class="line"><span>    import Nav from &#39;./components/common/Nav.vue&#39;;</span></span>
<span class="line"><span>    import Home from &#39;./components/home/Home.vue&#39;;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        name: &#39;App&#39;,</span></span>
<span class="line"><span>        components: {</span></span>
<span class="line"><span>            &quot;app-header&quot;: Header,</span></span>
<span class="line"><span>            &quot;app-nav&quot;: Nav,</span></span>
<span class="line"><span>            &quot;app-home&quot;: Home</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;style&gt;</span></span>
<span class="line"><span>    body, html {</span></span>
<span class="line"><span>        font-size: 12px;</span></span>
<span class="line"><span>        margin: 0;</span></span>
<span class="line"><span>        padding: 0;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&lt;/style&gt;</span></span></code></pre></div><p>踩坑的过程中，也遇到了好几个报错情况，最后都圆满解决了。 如果你想看更详细的vue组件代码，可以看具体项目：[<a href="https://github.com/hyy1115/vue2-web" target="_blank" rel="noreferrer">https://github.com/hyy1115/vue2-web</a>][5]</p><p>接下来我会继续完善该项目，探究一个更加灵活的vue架构实现。</p><h3 id="运行效果图-vue-酷我demo-1" tabindex="-1">运行效果图:[vue-酷我demo][1] <a class="header-anchor" href="#运行效果图-vue-酷我demo-1" aria-label="Permalink to &quot;运行效果图:[vue-酷我demo][1]&quot;">​</a></h3><p>![效果图][2]</p><p>下一章：[vue2封装swiper轮播组件（2）][6]</p><p><strong>如果文章对你有帮助，请点击一下推荐。</strong> [1]: <a href="https://hyy1115.github.io/blog/" target="_blank" rel="noreferrer">https://hyy1115.github.io/blog/</a> [2]: /img/bVMsyF [3]: <a href="https://cn.vuejs.org/v2/guide/installation.html" target="_blank" rel="noreferrer">https://cn.vuejs.org/v2/guide/installation.html</a> [4]: <a href="http://elemefe.github.io/cooking/" target="_blank" rel="noreferrer">http://elemefe.github.io/cooking/</a> [5]: <a href="https://github.com/hyy1115/vue2-web" target="_blank" rel="noreferrer">https://github.com/hyy1115/vue2-web</a> [6]: <a href="https://segmentfault.com/a/1190000009143923" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000009143923</a></p>`,45)])])}const g=s(t,[["render",l]]);export{d as __pageData,g as default};
