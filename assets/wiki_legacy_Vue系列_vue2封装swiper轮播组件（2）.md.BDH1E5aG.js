import{_ as p,o as s,c as n,a2 as m}from"./chunks/framework.BWuWLRhz.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/Vue系列/vue2封装swiper轮播组件（2）.md","filePath":"wiki/legacy/Vue系列/vue2封装swiper轮播组件（2）.md"}'),e={name:"wiki/legacy/Vue系列/vue2封装swiper轮播组件（2）.md"};function l(i,a,t,r,c,o){return s(),n("div",null,[...a[0]||(a[0]=[m(`<p>学习vue的第二篇文章，完成了以下功能。</p><p>1、父组件传递给子组件数据；</p><p>2、子组件通过props接收数据；</p><p>3、v:bind以及v-for的使用；</p><p>4、实现了轮播组件。</p><p>前一篇我们搭建了一个vue2+webpack2的框架，实现了一个全局导航组件。</p><p>今天说说在vue中使用轮播组件的选择（会造轮子的自己写轮播特效）。</p><h3 id="父组件如何传递数据给子组件" tabindex="-1"><strong>父组件如何传递数据给子组件？</strong> <a class="header-anchor" href="#父组件如何传递数据给子组件" aria-label="Permalink to &quot;**父组件如何传递数据给子组件？**&quot;">​</a></h3><p>官网有这么一段内容来介绍。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Prop</span></span>
<span class="line"><span>使用 Prop 传递数据</span></span>
<span class="line"><span>camelCase vs. kebab-case</span></span>
<span class="line"><span>动态 Prop</span></span>
<span class="line"><span>字面量语法 vs 动态语法</span></span>
<span class="line"><span>单向数据流</span></span>
<span class="line"><span>Prop 验证</span></span></code></pre></div><p>简单来说就是通过props实现父组件的数据流向子组件。</p><p><img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMwMh" alt="clipboard.png"></p><p>为什么叫做单向数据流呢？ 数据在父组件中可以修改，比如通过http请求动态更新数据，而子组件只负责通过props接收数据，子组件的权限是只读（如果我没理解错的话，那么跟react中是一样的。）</p><p>在本例子中，我实现了这样一个父组件Home.vue</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span>  &amp;amp;amp;lt;div&amp;amp;amp;gt;</span></span>
<span class="line"><span>   &amp;amp;amp;lt;app-banner :listImg=&amp;amp;amp;quot;listImg&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;amp;lt;/app-banner&amp;amp;amp;gt;</span></span>
<span class="line"><span>  &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;amp;lt;script&amp;amp;amp;gt;</span></span>
<span class="line"><span> import Banner from &amp;amp;amp;#039;./templates/Banner.vue&amp;amp;amp;#039;</span></span>
<span class="line"><span> import a from &amp;amp;amp;#039;../../static/img/home/banner1.png&amp;amp;amp;#039;</span></span>
<span class="line"><span> import b from &amp;amp;amp;#039;../../static/img/home/banner2.jpg&amp;amp;amp;#039;</span></span>
<span class="line"><span> import c from &amp;amp;amp;#039;../../static/img/home/banner3.jpg&amp;amp;amp;#039;</span></span>
<span class="line"><span> import d from &amp;amp;amp;#039;../../static/img/home/banner4.jpg&amp;amp;amp;#039;</span></span>
<span class="line"><span> import e from &amp;amp;amp;#039;../../static/img/home/banner5.jpg&amp;amp;amp;#039;</span></span>
<span class="line"><span>     export default {</span></span>
<span class="line"><span>        name: &amp;amp;amp;#039;Home&amp;amp;amp;#039;,</span></span>
<span class="line"><span>        data() {</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                listImg: [{</span></span>
<span class="line"><span>                    url: a</span></span>
<span class="line"><span>                }, {</span></span>
<span class="line"><span>                    url: b</span></span>
<span class="line"><span>                }, {</span></span>
<span class="line"><span>                    url: c</span></span>
<span class="line"><span>                }, {</span></span>
<span class="line"><span>                    url: d</span></span>
<span class="line"><span>                }, {</span></span>
<span class="line"><span>                    url: e</span></span>
<span class="line"><span>                }]</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        components: {</span></span>
<span class="line"><span>            &amp;amp;amp;#039;app-banner&amp;amp;amp;#039;: Banner</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><p>第一步：定义我们的数据结构data，data是一个方法，该方法返回一个object或者类数组等各种数据模型。我定义的是listImg的数组结构。每个数组元素对应一个图片路径，图片都保存在根目录下面的static文件夹。你可能想到使用require导入图片，使用import也是类似的，至于直接传入路径，不使用import或者require会有什么后果，可以自己测试。</p><p>第二步：在template中使用v-bind绑定listImg的数据到一个和他同名的:listImg的属性上，这个属性名可以在符合vue规范的情况下任意定义，:listImg === v-bind:listImg。在这里我还要说一个特别的情况。如果你这样写:listImg=&quot;{listImg}&quot;,子组件接收到的就是一个object，相当于改变了原来的数组类型变成了对象。</p><h3 id="子组件通过props接收数据并绑定到dom" tabindex="-1"><strong>子组件通过props接收数据并绑定到DOM</strong> <a class="header-anchor" href="#子组件通过props接收数据并绑定到dom" aria-label="Permalink to &quot;**子组件通过props接收数据并绑定到DOM**&quot;">​</a></h3><p>我新建了一个子组件叫做Banner.vue，这个子组件自然就是指轮播图组件[swiper][3]（感兴趣的可以去官网看看）。</p><h4 id="第一步-安装swiper。" tabindex="-1">第一步：安装swiper。 <a class="header-anchor" href="#第一步-安装swiper。" aria-label="Permalink to &quot;第一步：安装swiper。&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install --save swiper</span></span></code></pre></div><h4 id="第二步-写template。" tabindex="-1">第二步：写template。 <a class="header-anchor" href="#第二步-写template。" aria-label="Permalink to &quot;第二步：写template。&quot;">​</a></h4><p>轮播图是一个列表，所以这里使用到了v-for来遍历，轮播的部分是swiper-slide元素。我把图片路径绑定到了style属性上面。请注意绑定语法的缩写是:（冒号），style内部是一个object，所以background-image要写成backgroundImage，而图片地址url采用字符串拼接的方式来做。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;amp;lt;div class=&amp;amp;amp;quot;swiper-container&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;amp;lt;div class=&amp;amp;amp;quot;swiper-wrapper&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;amp;lt;div class=&amp;amp;amp;quot;swiper-slide&amp;amp;amp;quot; v-for=&amp;amp;amp;quot;str in listImg&amp;amp;amp;quot; :style=&amp;amp;amp;quot;{ backgroundImage: &amp;amp;amp;#039;url(&amp;amp;amp;#039; + str.url + &amp;amp;amp;#039;)&amp;amp;amp;#039; }&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;amp;lt;div class=&amp;amp;amp;quot;swiper-pagination swiper-pagination-white&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span></code></pre></div><h4 id="第三步-编写banner-vue的javascript代码。" tabindex="-1">第三步：编写Banner.vue的JavaScript代码。 <a class="header-anchor" href="#第三步-编写banner-vue的javascript代码。" aria-label="Permalink to &quot;第三步：编写Banner.vue的JavaScript代码。&quot;">​</a></h4><p>根据swiper的官方教程，我们需要实例化swiper。 1、导入swiper； 2、导入swiper的css； 3、通过props获取父组件传递过来的属性listImg； 4、mounted类似react中的componentDidMount方法，实例化swiper必须等到dom渲染完成才能操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;amp;lt;script&amp;amp;amp;gt;</span></span>
<span class="line"><span>    import Swiper from &amp;amp;amp;#039;swiper&amp;amp;amp;#039;;</span></span>
<span class="line"><span>    import &amp;amp;amp;#039;swiper/dist/css/swiper.min.css&amp;amp;amp;#039;;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        props: [&amp;amp;amp;#039;listImg&amp;amp;amp;#039;],</span></span>
<span class="line"><span>        mounted() {</span></span>
<span class="line"><span>            console.log(&amp;amp;amp;#039;mounted&amp;amp;amp;#039;, this)</span></span>
<span class="line"><span>            var swiper = new Swiper(&amp;amp;amp;#039;.swiper-container&amp;amp;amp;#039;, {</span></span>
<span class="line"><span>                pagination: &amp;amp;amp;#039;.swiper-pagination&amp;amp;amp;#039;,</span></span>
<span class="line"><span>                paginationClickable: true,</span></span>
<span class="line"><span>                loop: true,</span></span>
<span class="line"><span>                speed: 600,</span></span>
<span class="line"><span>                autoplay: 4000,</span></span>
<span class="line"><span>                onTouchEnd: function() {</span></span>
<span class="line"><span>                    swiper.startAutoplay()</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span></code></pre></div><h4 id="第四步-写css样式。" tabindex="-1">第四步：写css样式。 <a class="header-anchor" href="#第四步-写css样式。" aria-label="Permalink to &quot;第四步：写css样式。&quot;">​</a></h4><p>===================================== 分割线 =============================================</p><p>最后，到这一步已经完成了一个轮播图组件了。swiper还是挺好用的。贴上完整的Banner.vue代码，一字不差。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;amp;lt;div class=&amp;amp;amp;quot;swiper-container&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;amp;lt;div class=&amp;amp;amp;quot;swiper-wrapper&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;amp;lt;div class=&amp;amp;amp;quot;swiper-slide&amp;amp;amp;quot; v-for=&amp;amp;amp;quot;str in listImg&amp;amp;amp;quot; :style=&amp;amp;amp;quot;{ backgroundImage: &amp;amp;amp;#039;url(&amp;amp;amp;#039; + str.url + &amp;amp;amp;#039;)&amp;amp;amp;#039; }&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;amp;lt;div class=&amp;amp;amp;quot;swiper-pagination swiper-pagination-white&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;amp;lt;/div&amp;amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;amp;lt;script&amp;amp;amp;gt;</span></span>
<span class="line"><span>    import Swiper from &amp;amp;amp;#039;swiper&amp;amp;amp;#039;;</span></span>
<span class="line"><span>    import &amp;amp;amp;#039;swiper/dist/css/swiper.min.css&amp;amp;amp;#039;;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        props: [&amp;amp;amp;#039;listImg&amp;amp;amp;#039;],</span></span>
<span class="line"><span>        mounted() {</span></span>
<span class="line"><span>            console.log(&amp;amp;amp;#039;mounted&amp;amp;amp;#039;, this)</span></span>
<span class="line"><span>            var swiper = new Swiper(&amp;amp;amp;#039;.swiper-container&amp;amp;amp;#039;, {</span></span>
<span class="line"><span>                pagination: &amp;amp;amp;#039;.swiper-pagination&amp;amp;amp;#039;,</span></span>
<span class="line"><span>                paginationClickable: true,</span></span>
<span class="line"><span>                loop: true,</span></span>
<span class="line"><span>                speed: 600,</span></span>
<span class="line"><span>                autoplay: 4000,</span></span>
<span class="line"><span>                onTouchEnd: function() {</span></span>
<span class="line"><span>                    swiper.startAutoplay()</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            });</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;amp;lt;style lang=&amp;amp;amp;quot;less&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span>    .swiper-container {</span></span>
<span class="line"><span>        width: 100%;</span></span>
<span class="line"><span>        height: 10rem;</span></span>
<span class="line"><span>        .swiper-wrapper {</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            height: 100%;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        .swiper-slide {</span></span>
<span class="line"><span>            background-position: center;</span></span>
<span class="line"><span>            background-size: cover;</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            height: 100%;</span></span>
<span class="line"><span>            img {</span></span>
<span class="line"><span>                width: 100%;</span></span>
<span class="line"><span>                height: 100%;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        .swiper-pagination-bullet {</span></span>
<span class="line"><span>            width:0.833rem;</span></span>
<span class="line"><span>            height: 0.833rem;</span></span>
<span class="line"><span>            display: inline-block;</span></span>
<span class="line"><span>            background: #7c5e53;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;amp;lt;/style&amp;amp;amp;gt;</span></span></code></pre></div><p>总结：vue的轮播实现并不难，整体过程和react中很相似，途中我也遇到一个小bug，图片路径一直报错，最后我发现图片后缀不对，第一张是banner1.png，后面4张都是bannerx.jpg，图片都是从酷狗下载的，一下子没注意，被这个坑了一下。</p><p>运行效果：[vue-酷我demo][1] ![图片描述][2]</p><p>项目地址：<a href="https://github.com/hyy1115/vue2-web" target="_blank" rel="noreferrer">https://github.com/hyy1115/vue2-web</a></p><p>上一章：[react转vue——vue2-webpack2框架搭建之路（1）][4]</p><p>下一章：[react转vue——webpack压缩打包vue项目（3）][5]</p><p><strong>如果文章对你有帮助，请点击一下推荐。</strong> [1]: <a href="https://hyy1115.github.io/blog/" target="_blank" rel="noreferrer">https://hyy1115.github.io/blog/</a> [2]: <a href="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMw0u" target="_blank" rel="noreferrer">https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMw0u</a> [3]: <a href="http://www.swiper.com.cn/api/index.html" target="_blank" rel="noreferrer">http://www.swiper.com.cn/api/index.html</a> [4]: <a href="https://segmentfault.com/a/1190000009127162" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000009127162</a> [5]: <a href="https://segmentfault.com/a/1190000009162193" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000009162193</a></p>`,37)])])}const d=p(e,[["render",l]]);export{u as __pageData,d as default};
