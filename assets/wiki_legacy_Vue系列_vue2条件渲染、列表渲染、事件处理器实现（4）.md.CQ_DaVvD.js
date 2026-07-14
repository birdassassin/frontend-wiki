import{_ as m,o as l,c as t,a2 as p,j as s,a as e,t as i}from"./chunks/framework.BWuWLRhz.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/Vue系列/vue2条件渲染、列表渲染、事件处理器实现（4）.md","filePath":"wiki/legacy/Vue系列/vue2条件渲染、列表渲染、事件处理器实现（4）.md"}'),c={name:"wiki/legacy/Vue系列/vue2条件渲染、列表渲染、事件处理器实现（4）.md"};function o(n,a,r,g,d,u){return l(),t("div",null,[a[1]||(a[1]=p(`<p>学习vue2的过程中，我基本是按照vue2官网的教程走，并且主要以实现需求为主，如果不需要深入vue2的概念，就用简单的方法去实现。 本章实现了以下功能： 1、列表渲染，v-for； 2、条件渲染，v-if； 3、自适应布局； 4、事件处理器，v-on:click； 5、data数据管理。</p><p>运行效果：<a href="https://hyy1115.github.io/blog/" target="_blank" rel="noreferrer">vue-酷我demo</a><img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMG28" alt="图片描述"></p><h3 id="_1、列表渲染-v-for" tabindex="-1"><strong>1、列表渲染，v-for；</strong> <a class="header-anchor" href="#_1、列表渲染-v-for" aria-label="Permalink to &quot;**1、列表渲染，v-for；**&quot;">​</a></h3><p>在前面几章已经使用过几次v-for指令了，对此并不陌生，这次更新实现了排行榜列表和歌手列表，以排行榜列表为例，重温一下v-for的用法。</p><p><strong>Bang.vue：排行榜父组件</strong>，bangList是一个数组，for in遍历出来的是一个值属性，根据MDN文档对于for in遍历的解释，通常for in用来遍历对象Object。我们需要给遍历对象指定一个key，然后把遍历出来的属性list传递给子组件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;lt;template&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;div&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;ul class=&amp;amp;quot;bang-ul&amp;amp;quot;&amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;lt;app-bang v-for=&amp;amp;quot;list in bangList&amp;amp;quot; :key=&amp;amp;quot;list.id&amp;amp;quot; :list=&amp;amp;quot;list&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/app-bang&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;/ul&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;/div&amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;lt;/template&amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;lt;script&amp;amp;gt;</span></span>
<span class="line"><span>    import Bang from &amp;amp;#039;./template/BangList.vue&amp;amp;#039; //导入排行榜列表子组件</span></span>
<span class="line"><span>    import { bangList } from &amp;amp;#039;../../static/data/data&amp;amp;#039; //导入数据</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        name: &amp;amp;#039;Bang&amp;amp;#039;,</span></span>
<span class="line"><span>        components: {</span></span>
<span class="line"><span>            &amp;amp;#039;app-bang&amp;amp;#039;: Bang</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        data() {</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                bangList: bangList</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;lt;/script&amp;amp;gt;</span></span></code></pre></div>`,6)),s("p",null,[a[0]||(a[0]=s("strong",null,"BangList：排行榜列表子组件，",-1)),e(" 子组件是一个li，因为li是可点击的路由，所以使用router-link包裹，:to是绑定路由地址，然后img绑定了图片路径，在dom标签中输出使用双大括号"+i(n.list.title)+"，而export default是指默认导出的js代码，props表示获取从父组件传递过来的参数，至于参数验证，以后再添加。",1)]),a[2]||(a[2]=p(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;lt;template&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;li&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;router-link :to=&amp;amp;quot;list.pathname&amp;amp;quot;&amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;lt;div class=&amp;amp;quot;left&amp;amp;quot;&amp;amp;gt;</span></span>
<span class="line"><span>                &amp;amp;lt;img :src=&amp;amp;quot;list.url&amp;amp;quot; :alt=&amp;amp;quot;list.title&amp;amp;quot;&amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;lt;/div&amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;lt;div class=&amp;amp;quot;right&amp;amp;quot;&amp;amp;gt;</span></span>
<span class="line"><span>                &amp;#123;&amp;#123;list.title&amp;#125;&amp;#125;</span></span>
<span class="line"><span>            &amp;amp;lt;/div&amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;lt;i class=&amp;amp;quot;fa fa-angle-right&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/i&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;/router-link&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;/li&amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;lt;/template&amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;lt;script&amp;amp;gt;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        props: [&amp;amp;#039;list&amp;amp;#039;]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;lt;/script&amp;amp;gt;</span></span></code></pre></div><h3 id="_2、条件渲染-v-if" tabindex="-1"><strong>2、条件渲染，v-if；</strong> <a class="header-anchor" href="#_2、条件渲染-v-if" aria-label="Permalink to &quot;**2、条件渲染，v-if；**&quot;">​</a></h3><p>v-if非常好用，在vue2中，你可以享受到条件语句带来的便利，虽然在react中早就有这玩意了。在歌手列表页面，我使用了v-if。</p><p><strong>Artist.vue：歌手列表父组件</strong>，因为artist是一个Object，所以首先由Object.keys()的方式遍历出key，然后使用v-if判断singer等于不同的key时渲染不同的值到模板。如果你看代码有点晕，可以运行项目对着看。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;lt;template&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;div&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;artist-list v-for=&amp;amp;quot;singer in Object.keys(artist)&amp;amp;quot; v-if=&amp;amp;quot;singer === &amp;amp;#039;listOne&amp;amp;#039;&amp;amp;quot; :singer=&amp;amp;quot;artist.listOne&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/artist-list&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;artist-list v-for=&amp;amp;quot;singer in Object.keys(artist)&amp;amp;quot; v-if=&amp;amp;quot;singer === &amp;amp;#039;listTwo&amp;amp;#039;&amp;amp;quot; :singer=&amp;amp;quot;artist.listTwo&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/artist-list&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;artist-list v-for=&amp;amp;quot;singer in Object.keys(artist)&amp;amp;quot; v-if=&amp;amp;quot;singer === &amp;amp;#039;listThree&amp;amp;#039;&amp;amp;quot; :singer=&amp;amp;quot;artist.listThree&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/artist-list&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;artist-list v-for=&amp;amp;quot;singer in Object.keys(artist)&amp;amp;quot; v-if=&amp;amp;quot;singer === &amp;amp;#039;listFour&amp;amp;#039;&amp;amp;quot; :singer=&amp;amp;quot;artist.listFour&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/artist-list&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;/div&amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;lt;/template&amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;lt;script&amp;amp;gt;</span></span>
<span class="line"><span>    import SingerList from &amp;amp;#039;./templates/SingerList.vue&amp;amp;#039; //导入歌手列表子组件</span></span>
<span class="line"><span>    import { artist } from &amp;amp;#039;../../static/data/data&amp;amp;#039; //导入歌手列表数据</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        components: {</span></span>
<span class="line"><span>            &amp;amp;#039;artist-list&amp;amp;#039;: SingerList</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        data() {</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                artist: artist</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;lt;/script&amp;amp;gt;</span></span></code></pre></div><p><strong>SingeList.vue：歌手列表子组件</strong>，这个子组件的实现和排行榜的例子非常相似。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;lt;template&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;ul class=&amp;amp;quot;singer-ul&amp;amp;quot;&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;li v-for=&amp;amp;quot;list in singer&amp;amp;quot;&amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;lt;router-link :to=&amp;amp;quot;list.pathname&amp;amp;quot;&amp;amp;gt;&amp;#123;&amp;#123;list.title&amp;#125;&amp;#125;&amp;amp;lt;/router-link&amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;lt;i class=&amp;amp;quot;fa fa-angle-right&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/i&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;/li&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;/ul&amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;lt;/template&amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;lt;script&amp;amp;gt;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        props: [&amp;amp;#039;singer&amp;amp;#039;]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;lt;/script&amp;amp;gt;</span></span></code></pre></div><h3 id="_3、自适应布局" tabindex="-1"><strong>3、自适应布局；</strong> <a class="header-anchor" href="#_3、自适应布局" aria-label="Permalink to &quot;**3、自适应布局；**&quot;">​</a></h3><p>如果你运行了我在github上的例子，采用不同的分辨率来看，会发现会自适应，在不同分辨率下保持同样的倍数递增或者递减，这种自适应方式和酷狗移动端的实现是一致的，但是和bootsrap的栅格响应又不一样。</p><p>采用这种自适应需要注意以下几点。</p><p>**在App.vue添加media属性：**这里的每一个font-size都是我用计算器计算出来的 12*比例 得到的值，而酷狗采用的是百分比 % 的方式，本质是一样的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@media screen and (min-width: 320px) {</span></span>
<span class="line"><span>        html, body { font-size: 12px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 360px) {</span></span>
<span class="line"><span>        html, body { font-size: 13.5px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 375px) {</span></span>
<span class="line"><span>        html, body { font-size: 14px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 414px) {</span></span>
<span class="line"><span>        html, body { font-size: 15.5px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 720px) {</span></span>
<span class="line"><span>        html, body { font-size: 27px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 1024px) {</span></span>
<span class="line"><span>        html, body { font-size: 38.4px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 1080px) {</span></span>
<span class="line"><span>        html, body { font-size: 40.5px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 1366px) {</span></span>
<span class="line"><span>        html, body { font-size: 51px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 1440px) {</span></span>
<span class="line"><span>        html, body { font-size: 54px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 1600px) {</span></span>
<span class="line"><span>        html, body { font-size: 60px !important; }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    @media screen and (min-width: 1920px) {</span></span>
<span class="line"><span>        html, body { font-size: 72px !important; }</span></span>
<span class="line"><span>    }</span></span></code></pre></div><p><strong>使用这种自适应布局，你需要将你的样式采用rem或者em的方式来替代px</strong>，具体看我代码的实现。</p><h3 id="_4、事件处理器-v-on-click" tabindex="-1"><strong>4、事件处理器，v-on:click；</strong> <a class="header-anchor" href="#_4、事件处理器-v-on-click" aria-label="Permalink to &quot;**4、事件处理器，v-on:click；**&quot;">​</a></h3><p>在首页的SongList.vue中，我写了个绑定事件处理器做测试。 首先，你需要在 methods 中定义方法，我定义了reverseMsg(title){}用来打印当然点击列表的值。 接着，把写好的方法用v-on:click=&quot;reverseMsg(song.title)&quot;绑定到li上，这样你就能获取当然点击对象的值，而不需要纠结用this来获取当前点击的dom对象了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;lt;template&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;li v-if=&amp;amp;quot;seen&amp;amp;quot; v-on:click=&amp;amp;quot;reverseMsg(song.title)&amp;amp;quot;&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;span class=&amp;amp;quot;title&amp;amp;quot; :title=&amp;amp;quot;song.singer&amp;amp;quot;&amp;amp;gt;&amp;#123;&amp;#123;song.singer&amp;#125;&amp;#125; - &amp;#123;&amp;#123;song.title&amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;lt;i :style=&amp;amp;quot;{background: &amp;amp;#039;url(&amp;amp;#039;+ downLoadIcon +&amp;amp;#039;) no-repeat&amp;amp;#039;}&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/i&amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;lt;/li&amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;lt;/template&amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;lt;script&amp;amp;gt;</span></span>
<span class="line"><span>    import downLoadIcon from &amp;amp;#039;../../../static/outImg&amp;amp;#039;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        props: [&amp;amp;#039;song&amp;amp;#039;],</span></span>
<span class="line"><span>        data() {</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                downLoadIcon: downLoadIcon,</span></span>
<span class="line"><span>                seen: true</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        methods: {</span></span>
<span class="line"><span>            reverseMsg(title) {</span></span>
<span class="line"><span>                console.log(&amp;amp;#039;title: &amp;amp;#039;, title)</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;lt;/script&amp;amp;gt;</span></span></code></pre></div><h3 id="_5、data数据管理。" tabindex="-1"><strong>5、data数据管理。</strong> <a class="header-anchor" href="#_5、data数据管理。" aria-label="Permalink to &quot;**5、data数据管理。**&quot;">​</a></h3><p>目前静态数据管理分为2大块，图片管理和静态渲染数据管理，他们都保存在static文件夹里面。</p><p><strong>图片管理：</strong> 你可以这样写，把所有需要导出的图片放到一个js文件里面，使用module.exports的方式定义导出的文件名。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 引用图片路径</span></span>
<span class="line"><span>let a = require(&amp;amp;#039;./img/home/banner1.png&amp;amp;#039;)</span></span>
<span class="line"><span>let b = require(&amp;amp;#039;./img/home/banner2.jpg&amp;amp;#039;)</span></span>
<span class="line"><span>let c = require(&amp;amp;#039;./img/home/banner3.jpg&amp;amp;#039;)</span></span>
<span class="line"><span>let d = require(&amp;amp;#039;./img/home/banner4.jpg&amp;amp;#039;)</span></span>
<span class="line"><span>let e = require(&amp;amp;#039;./img/home/banner5.jpg&amp;amp;#039;)</span></span>
<span class="line"><span>let downLoadIcon = require(&amp;amp;#039;./img/home/download_icon.png&amp;amp;#039;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let bang1 = require(&amp;amp;#039;./img/bang/bang1.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang2 = require(&amp;amp;#039;./img/bang/bang2.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang3 = require(&amp;amp;#039;./img/bang/bang3.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang4 = require(&amp;amp;#039;./img/bang/bang4.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang5 = require(&amp;amp;#039;./img/bang/bang5.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang6 = require(&amp;amp;#039;./img/bang/bang6.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang7 = require(&amp;amp;#039;./img/bang/bang7.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang8 = require(&amp;amp;#039;./img/bang/bang8.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang9 = require(&amp;amp;#039;./img/bang/bang9.png&amp;amp;#039;)</span></span>
<span class="line"><span>let bang10 = require(&amp;amp;#039;./img/bang/bang10.png&amp;amp;#039;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 导出图片</span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>    a,</span></span>
<span class="line"><span>    b,</span></span>
<span class="line"><span>    c,</span></span>
<span class="line"><span>    d,</span></span>
<span class="line"><span>    e,</span></span>
<span class="line"><span>    downLoadIcon,</span></span>
<span class="line"><span>    bang1,</span></span>
<span class="line"><span>    bang2,</span></span>
<span class="line"><span>    bang3,</span></span>
<span class="line"><span>    bang4,</span></span>
<span class="line"><span>    bang5,</span></span>
<span class="line"><span>    bang6,</span></span>
<span class="line"><span>    bang7,</span></span>
<span class="line"><span>    bang8,</span></span>
<span class="line"><span>    bang9,</span></span>
<span class="line"><span>    bang10</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>在项目中引用图片。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { bang1, bang2, bang3, bang4, bang5, bang6, bang7, bang8, bang9, bang10 } from &amp;amp;#039;../outImg&amp;amp;#039;</span></span></code></pre></div><p><strong>静态数据管理：</strong></p><p>和图片管理的方式一样，也是通过module.exports的方式。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/ 新歌列表</span></span>
<span class="line"><span>const songList = [</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_CC156F3A7186FB12768B2C1B48FDAA74&amp;amp;#039;, singer: &amp;amp;#039;庄心妍&amp;amp;#039;, title: &amp;amp;#039;屋檐下的浪漫&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_9AA99B44B77C50737A42E921EF51C937&amp;amp;#039;, singer: &amp;amp;#039;童可可&amp;amp;#039;, title: &amp;amp;#039;薛定谔的猫&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_9154AD94E915A6A6CDD6AF57EEFE06A6&amp;amp;#039;, singer: &amp;amp;#039;阿杜&amp;amp;#039;, title: &amp;amp;#039;一诺千年&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_53C3F2DBE2790BE8884E6D8F5553FE50&amp;amp;#039;, singer: &amp;amp;#039;黄子韬&amp;amp;#039;, title: &amp;amp;#039;Promise&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_39224F3C618C955352142DB989737B9D&amp;amp;#039;, singer: &amp;amp;#039;刘恺威、蒋欣&amp;amp;#039;, title: &amp;amp;#039;明明爱【继承人插曲】&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_2B0BAE72AFC013419B2D21D86C0BA515&amp;amp;#039;, singer: &amp;amp;#039;林忆莲&amp;amp;#039;, title: &amp;amp;#039;我不能忘记你【记忆大师记忆主题曲】&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_A350CE1A5B0769D3E39C311C933F1234&amp;amp;#039;, singer: &amp;amp;#039;高夫&amp;amp;#039;, title: &amp;amp;#039;青春去哪了&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_5184FAAD32883D73533714BACAA98A1F&amp;amp;#039;, singer: &amp;amp;#039;华晨宇&amp;amp;#039;, title: &amp;amp;#039; 寻【花儿与少年3·冒险季主题曲】&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_7A5B2CC635273C4B81167F19E8897773&amp;amp;#039;, singer: &amp;amp;#039;鹏泊&amp;amp;#039;, title: &amp;amp;#039;春来鸟&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_4BCA5B307683B83A6BC2F34A93E7DBC2&amp;amp;#039;, singer: &amp;amp;#039;阿兰&amp;amp;#039;, title: &amp;amp;#039;兰之乐光&amp;amp;#039;},</span></span>
<span class="line"><span>    {_id: &amp;amp;#039;songs_76448B8D90609F4657782A2F4ACE3C1C&amp;amp;#039;, singer: &amp;amp;#039;星月组合&amp;amp;#039;, title: &amp;amp;#039;今夜的你又在和谁约会&amp;amp;#039;}</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 排行榜</span></span>
<span class="line"><span>const bangList = [</span></span>
<span class="line"><span>    {url: bang1, title: &amp;amp;#039;酷狗飙升榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang2, title: &amp;amp;#039;酷狗TOP500&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang3, title: &amp;amp;#039;网络红歌榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang4, title: &amp;amp;#039;DJ热歌榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang5, title: &amp;amp;#039;华语新歌榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang6, title: &amp;amp;#039;欧美新歌榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang7, title: &amp;amp;#039;韩国新歌榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang8, title: &amp;amp;#039;日本新歌榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang9, title: &amp;amp;#039;粤语新歌榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;},</span></span>
<span class="line"><span>    {url: bang10, title: &amp;amp;#039;原创音乐榜&amp;amp;#039;, pathname: &amp;amp;#039;&amp;amp;#039;}</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 歌手</span></span>
<span class="line"><span>const artist = {</span></span>
<span class="line"><span>    &amp;amp;#039;listOne&amp;amp;#039;: [</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;热门歌手&amp;amp;#039;}</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &amp;amp;#039;listTwo&amp;amp;#039;: [</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;华语男歌手&amp;amp;#039;},</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;华语女歌手&amp;amp;#039;},</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;华语组合&amp;amp;#039;},</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &amp;amp;#039;listThree&amp;amp;#039;: [</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;日韩男歌手&amp;amp;#039;},</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;日韩女歌手&amp;amp;#039;},</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;日韩组合&amp;amp;#039;},</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &amp;amp;#039;listFour&amp;amp;#039;: [</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;欧美男歌手&amp;amp;#039;},</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;欧美女歌手&amp;amp;#039;},</span></span>
<span class="line"><span>        {pathname: &amp;amp;#039;&amp;amp;#039;, title: &amp;amp;#039;欧美组合&amp;amp;#039;}</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>    songList,</span></span>
<span class="line"><span>    bangList,</span></span>
<span class="line"><span>    artist</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>哎，这就是没有构建mock server的办法，不过哪些数据需要mock server呢？显然我现在使用的都是静态数据，是不需要mock来实现的。</p><p>==================================分割线============================================</p><p>这一天我把vue2官网的基础篇看了几遍，也运用了部分功能到项目中，其实生命周期在轮播图那章就已经涉及到了，只不过我没有细说，后面会挑出一章专门讲生命周期每个时间点的实际用途。</p><p>这次还更新了很多细微的东西，就不细说了，从项目中慢慢体会，打铁还需自身硬，多看看vue2官网的教程，会更有启发。</p><p>项目地址：<a href="https://github.com/hyy1115/vue2-web" target="_blank" rel="noreferrer">https://github.com/hyy1115/vue2-web</a> (对你学习vue2有帮助的话，别吝啬给个star支持一下)</p><p>上一章：<a href="https://segmentfault.com/a/1190000009162193" target="_blank" rel="noreferrer">react转vue——webpack压缩打包vue项目（3）</a></p>`,31))])}const v=m(c,[["render",o]]);export{h as __pageData,v as default};
