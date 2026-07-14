import{_ as p,o as s,c as n,a2 as e}from"./chunks/framework.BWuWLRhz.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/Vue系列/webpack压缩打包vue2项目（3）.md","filePath":"wiki/legacy/Vue系列/webpack压缩打包vue2项目（3）.md"}'),t={name:"wiki/legacy/Vue系列/webpack压缩打包vue2项目（3）.md"};function l(m,a,i,c,o,r){return s(),n("div",null,[...a[0]||(a[0]=[e(`<p>学习vue的第三篇，增加了以下功能：</p><p>1、添加打包功能；</p><p>2、分离css和js；</p><p>3、增加vue-devtools；</p><p>4、增加歌曲列表组件。</p><p>这次更新做的事情不多，主要是发布的操作和vue开发工具的管理。</p><p>打包运行效果：<a href="https://hyy1115.github.io/blog/" target="_blank" rel="noreferrer">vue-酷我demo</a><img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMBEQ" alt="图片描述"></p><h3 id="_1、添加打包功能" tabindex="-1"><strong>1、添加打包功能</strong> <a class="header-anchor" href="#_1、添加打包功能" aria-label="Permalink to &quot;**1、添加打包功能**&quot;">​</a></h3><p>webpack打包项目只需要配置package.json，通过命令运行，有的人喜欢用Python文件来执行打包命令。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;amp;quot;scripts&amp;amp;amp;quot;: {</span></span>
<span class="line"><span>    &amp;amp;amp;quot;build-mac&amp;amp;amp;quot;: &amp;amp;amp;quot;export NODE_ENV=production &amp;amp;amp;amp;&amp;amp;amp;amp; webpack -p --progress&amp;amp;amp;quot;,</span></span>
<span class="line"><span>    &amp;amp;amp;quot;build-win&amp;amp;amp;quot;: &amp;amp;amp;quot;set NODE_ENV=production&amp;amp;amp;amp;&amp;amp;amp;amp;webpack -p --progress&amp;amp;amp;quot;</span></span>
<span class="line"><span>  },</span></span></code></pre></div><p>mac系统运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm run build-mac</span></span></code></pre></div><p>windows系统运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm run build-win</span></span></code></pre></div><p>你还可以直接在node控制台运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NODE_ENV=production &amp;amp;amp;amp;&amp;amp;amp;amp; webpack -p --progress</span></span></code></pre></div><p><img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMBEN" alt="图片描述"></p><h3 id="_2、分离css和js。" tabindex="-1">2、分离css和js。 <a class="header-anchor" href="#_2、分离css和js。" aria-label="Permalink to &quot;2、分离css和js。&quot;">​</a></h3><p>css和js分离的意义不是很大，css本身也就几十K，在我这个项目中目前是16.2kb，至于js公共模块要不要提取出来，现在项目初期不需要做这一块处理。</p><p>提取css</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const ExtractTextPlugin = require(&amp;amp;amp;#039;extract-text-webpack-plugin&amp;amp;amp;#039;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>plugin(</span></span>
<span class="line"><span>    new ExtractTextPlugin(&amp;amp;amp;#039;style.css&amp;amp;amp;#039;)</span></span>
<span class="line"><span>)</span></span></code></pre></div><p>生成html：filename表示要生成的文件名，template表示选择存在的静态模板，这个步骤是将根目录下面的index.html打包到dist文件夹下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const HtmlWebpackPlugin = require(&amp;amp;amp;#039;html-webpack-plugin&amp;amp;amp;#039;);</span></span>
<span class="line"><span>plugin(</span></span>
<span class="line"><span>    new HtmlWebpackPlugin({</span></span>
<span class="line"><span>        filename: &amp;amp;amp;#039;index.html&amp;amp;amp;#039;,</span></span>
<span class="line"><span>        template: &amp;amp;amp;#039;./index.html&amp;amp;amp;#039;</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>)</span></span></code></pre></div><p>官方说了一种提取css的方法，vue-loader集成了css提取模块，详情前往：<a href="http://vue-loader.vuejs.org/en/configurations/extract-css.html" target="_blank" rel="noreferrer">http://vue-loader.vuejs.org/en/configurations/extract-css.html</a></p><h3 id="_3、增加vue-tools" tabindex="-1"><strong>3、增加vue-tools</strong> <a class="header-anchor" href="#_3、增加vue-tools" aria-label="Permalink to &quot;**3、增加vue-tools**&quot;">​</a></h3><p>推荐直接去<a href="https://chrome.google.com/webstore/search/vue-devtools?utm_source=chrome-ntp-icon" target="_blank" rel="noreferrer">chrome应用商店安装</a></p><p><img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMBEU" alt="图片描述"></p><p>安装好之后，别着急，在地址栏输入：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>chrome://flags/</span></span></code></pre></div><p>找到下面这个东西，选择启用，变成下面这种状态。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>开发者工具实验性功能 Mac, Windows, Linux, Chrome OS</span></span>
<span class="line"><span>启用开发者工具实验性功能。您可以使用开发者工具中的“设置”面板开启/关闭各个实验性功能。 #enable-devtools-experiments</span></span>
<span class="line"><span>停用</span></span></code></pre></div><p>然后你把谷歌控制台关闭重新打开，就能看到vue工具界面了。</p><p>什么，你说你不会翻墙？。。。。。。</p><h3 id="_4、增加歌曲列表组件-songlist-vue。" tabindex="-1"><strong>4、增加歌曲列表组件 SongList.vue。</strong> <a class="header-anchor" href="#_4、增加歌曲列表组件-songlist-vue。" aria-label="Permalink to &quot;**4、增加歌曲列表组件 SongList.vue。**&quot;">​</a></h3><p>这个组件跟banner组件一样，都是一个列表，就不重复介绍了，直接看代码。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;amp;amp;lt;template&amp;amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;amp;lt;ul class=&amp;amp;amp;quot;song-ul&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;amp;lt;li v-for=&amp;amp;amp;quot;song in songList&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;amp;lt;span class=&amp;amp;amp;quot;title&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;#123;&amp;amp;#123;song.singer&amp;amp;#125;&amp;amp;#125; - &amp;amp;#123;&amp;amp;#123;song.title&amp;amp;#125;&amp;amp;#125;&amp;amp;amp;lt;/span&amp;amp;amp;gt;</span></span>
<span class="line"><span>            &amp;amp;amp;lt;i :style=&amp;amp;amp;quot;{background: &amp;amp;amp;#039;url(&amp;amp;amp;#039;+ downLoad +&amp;amp;amp;#039;) no-repeat&amp;amp;amp;#039;}&amp;amp;amp;quot;&amp;amp;amp;gt;&amp;amp;amp;lt;/i&amp;amp;amp;gt;</span></span>
<span class="line"><span>        &amp;amp;amp;lt;/li&amp;amp;amp;gt;</span></span>
<span class="line"><span>    &amp;amp;amp;lt;/ul&amp;amp;amp;gt;</span></span>
<span class="line"><span>&amp;amp;amp;lt;/template&amp;amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;amp;lt;script&amp;amp;amp;gt;</span></span>
<span class="line"><span>    import downLoad from &amp;amp;amp;#039;../../../static/img/home/download_icon.png&amp;amp;amp;#039;</span></span>
<span class="line"><span>    export default {</span></span>
<span class="line"><span>        props: [&amp;amp;amp;#039;songList&amp;amp;amp;#039;],</span></span>
<span class="line"><span>        data() {</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                downLoad: downLoad</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;amp;lt;/script&amp;amp;amp;gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&amp;amp;amp;lt;style lang=&amp;amp;amp;quot;less&amp;amp;amp;quot;&amp;amp;amp;gt;</span></span>
<span class="line"><span>    .song-ul {</span></span>
<span class="line"><span>        padding: 0 0.833rem;</span></span>
<span class="line"><span>        margin: 0;</span></span>
<span class="line"><span>        li {</span></span>
<span class="line"><span>            width: 100%;</span></span>
<span class="line"><span>            list-style: none;</span></span>
<span class="line"><span>            display: table;</span></span>
<span class="line"><span>            border-bottom: 1px solid hsl(0, 0%, 90%);</span></span>
<span class="line"><span>            height: 4rem;</span></span>
<span class="line"><span>            .title {</span></span>
<span class="line"><span>                width: 100%;</span></span>
<span class="line"><span>                padding-right: 2.657rem;</span></span>
<span class="line"><span>                display: table-cell;</span></span>
<span class="line"><span>                vertical-align: middle;</span></span>
<span class="line"><span>                padding-left: .3571rem;</span></span>
<span class="line"><span>                cursor: pointer;</span></span>
<span class="line"><span>                font-size: 1.17rem;</span></span>
<span class="line"><span>                box-sizing: border-box;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            i {</span></span>
<span class="line"><span>                width: 2rem;</span></span>
<span class="line"><span>                height: 2rem;</span></span>
<span class="line"><span>                margin-top: 1.5rem;</span></span>
<span class="line"><span>                display: inline-block;</span></span>
<span class="line"><span>                background-size: 100%;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>&amp;amp;amp;lt;/style&amp;amp;amp;gt;</span></span></code></pre></div><p>http请求部分后续再写，现在以静态组件的构建为主，慢慢熟悉vue的生命周期和组件数据通信机制。</p><p>项目地址：<a href="https://github.com/hyy1115/vue2-web" target="_blank" rel="noreferrer">https://github.com/hyy1115/vue2-web</a></p><p>上一章：<a href="https://segmentfault.com/a/1190000009143923" target="_blank" rel="noreferrer">react转vue——vue2封装swiper轮播组件（2）</a></p><p>下一章：<a href="https://segmentfault.com/a/1190000009183064" target="_blank" rel="noreferrer">react转vue——vue2条件渲染、列表渲染、事件处理器实现（4）</a></p>`,40)])])}const g=p(t,[["render",l]]);export{u as __pageData,g as default};
