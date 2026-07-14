import{_ as n,o as s,c as p,a2 as e}from"./chunks/framework.BWuWLRhz.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/react-router之webpack按需加载（路由切割）.md","filePath":"wiki/legacy/React系列/react-router之webpack按需加载（路由切割）.md"}'),t={name:"wiki/legacy/React系列/react-router之webpack按需加载（路由切割）.md"};function l(i,a,o,c,r,m){return s(),p("div",null,[...a[0]||(a[0]=[e(`<p>webpack工具相信用react的同学都比较熟悉了，一个很爽的功能——<strong>热更新</strong>，稍微改个分号都能够在浏览器局部刷新，很厉害有木有。</p><p>安静一下，同学们，不要喧哗！</p><p>本章内容不讲热更新，我们来看看webpack的另外一个功能——<strong>代码切割（或者叫做路由切割）</strong>。</p><p>作为react开发者，你应该用过react-router插件吧？没用过的就不要花时间看下面的内容了。</p><p>react-router把每个页面包装成了一个唯一的路由，这样的话，一个页面就对应了一个路由（改变hash的算同一个路由），我们在用webpack打包的时候，通常将主要目录下的所有js打包成一个单独的bundle.js（名字随便取）文件，这样一来，只需要首次加载js，然后通过ajax请求json资源，只要你不刷新网页，就不需要重新请求bundle.js，但是也会带来一些问题，就是首屏渲染太慢、SEO。</p><p>一个小小的react应用，用webpack打包之后，都可能达到1M以上，然后大家就从网上搜索各种webpack压缩方案，包括UglifyJsPlugin压缩（很有效）、设置NODE_ENV为production、服务器端压缩GZIP等，想尽各种办法，展现了前端工程师无与伦比的美丽。</p><p>上面这些办法对于一些中小型应用来说，压缩方案已经足够了，但是当项目大到了一个限度之后，无论你怎么压缩，都无法做到压缩到合适的大小。那么前端界的大神们也想到了一个办法，<strong>服务端渲染</strong>（说抄java、php，还别不信），服务端渲染很容易理解，就是根据前端请求的路由返回对应的资源，而对于前端来说，这些资源就是一个个切割好的js。</p><p>看文字有点累，下面贴上代码给大家看一下基本的react-router长什么样。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React from &amp;#039;react&amp;#039;;</span></span>
<span class="line"><span>import { Route } from &amp;#039;react-router&amp;#039;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/* containers */</span></span>
<span class="line"><span>import { AppContainer } from &amp;#039;appContainer&amp;#039;</span></span>
<span class="line"><span>import { HomeContainer } from &amp;#039;containers/Home/homeContainer&amp;#039;//首页</span></span>
<span class="line"><span>import { SearchContainer } from &amp;#039;containers/Search/searchContainer&amp;#039;//搜索页面</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default (</span></span>
<span class="line"><span>    &amp;lt;Route path=&amp;quot;/&amp;quot; component={AppContainer}&amp;gt;</span></span>
<span class="line"><span>        &amp;lt;Route path=&amp;quot;home&amp;quot; component={HomeContainer} /&amp;gt;</span></span>
<span class="line"><span>        &amp;lt;Route path=&amp;quot;search&amp;quot; component={SearchContainer} /&amp;gt;</span></span>
<span class="line"><span>    &amp;lt;/Route&amp;gt;</span></span>
<span class="line"><span>)</span></span></code></pre></div><p>这样的写法用webpack打包出来的是一个完整的bundle.js，现在start 切割。</p><p>1、修改你的路由</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React from &amp;#039;react&amp;#039;;</span></span>
<span class="line"><span>import { Route, IndexRoute } from &amp;#039;react-router&amp;#039;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { AppContainer } from &amp;#039;./appContainer&amp;#039;;</span></span>
<span class="line"><span>import { HomeContainer } from &amp;#039;./containers/Home/homeContainer&amp;#039;;</span></span>
<span class="line"><span>//首页不变，搜索页面是子页面，我把他切割出来作为单独的一个js文件，cb里面有一个default，表示导出带有**default**的容器组件。</span></span>
<span class="line"><span>const searchContainer = (location, cb) =&amp;gt; {</span></span>
<span class="line"><span>    require.ensure([], require =&amp;gt; {</span></span>
<span class="line"><span>        cb(null, require(&amp;#039;./containers/Search/searchContainer&amp;#039;).default)</span></span>
<span class="line"><span>    },&amp;#039;search&amp;#039;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default (</span></span>
<span class="line"><span>    &amp;lt;Route path=&amp;quot;/&amp;quot; component={AppContainer}&amp;gt;</span></span>
<span class="line"><span>        &amp;lt;IndexRoute component={HomeContainer} /&amp;gt;</span></span>
<span class="line"><span>        &amp;lt;Route path=&amp;quot;home&amp;quot; component={HomeContainer} /&amp;gt;</span></span>
<span class="line"><span>        &amp;lt;Route path=&amp;quot;search&amp;quot; getComponent={searchContainer} /&amp;gt;</span></span>
<span class="line"><span>    &amp;lt;/Route&amp;gt;</span></span>
<span class="line"><span>);</span></span></code></pre></div><p>2、是不是很简单，你是不是要问，这就可以了？当然不是，还有一个需要注意的地方，就是在webpack的配置文件要加上这样一句话。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//入口文件</span></span>
<span class="line"><span>entry: {</span></span>
<span class="line"><span>    app: [</span></span>
<span class="line"><span>      &amp;#039;babel-polyfill&amp;#039;,</span></span>
<span class="line"><span>      &amp;#039;./src/index&amp;#039; </span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    vendor: [&amp;#039;react&amp;#039;] //提取react模块作为公共的js文件</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//输入文件</span></span>
<span class="line"><span>output: {</span></span>
<span class="line"><span>    filename: &amp;#039;[name].js&amp;#039;, //注意这里，用[name]可以自动生成路由名称对应的js文件</span></span>
<span class="line"><span>    path: path.join(__dirname, &amp;#039;build&amp;#039;),</span></span>
<span class="line"><span>    publicPath: &amp;#039;/build/&amp;#039;,</span></span>
<span class="line"><span>    chunkFilename: &amp;#039;[name].js&amp;#039; //注意这里，用[name]可以自动生成路由名称对应的js文件</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//插件</span></span>
<span class="line"><span>plugins: [</span></span>
<span class="line"><span>//必须配置，react的公共模块</span></span>
<span class="line"><span>    new webpack.optimize.CommonsChunkPlugin({</span></span>
<span class="line"><span>      names: [&amp;#039;vendor&amp;#039;],</span></span>
<span class="line"><span>      filename: &amp;#039;vendor.js&amp;#039;</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  ],</span></span></code></pre></div><p>3、然后呢？然后就没了，这样就配置好了！真的相信我，start切割没那么难，只不过网上很多教程没有说明react-router和webpack的关联，特别是**[name].js**这一点很重要，你要是不这样写，就不能打包成对应的路由js。</p><p>4、如果你配置了webpack服务器的话，打开网站首页可以看到只加载了一个js文件<strong>app.js</strong>，你点击搜索页面的路由的时候，可以看到<strong>search.js</strong>加载进来了。哇，是不是很开心！开发过程中使用前端服务器加载静态html需要注意一下<strong>打包的js加载顺序</strong>，写反了会报错！</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>前端静态html只需要这初始化加载这2个文件，search.js会异步加载进来（你可以叫它懒加载）</span></span>
<span class="line"><span>&amp;lt;script src=&amp;quot;/build/vendor.js&amp;quot;&amp;gt;&amp;lt;/script&amp;gt;</span></span>
<span class="line"><span>&amp;lt;script src=&amp;quot;app.js&amp;quot;&amp;gt;&amp;lt;/script&amp;gt;</span></span></code></pre></div><p>5、好了，现在开发完了，准备打包成静态文件。输入<strong>npm run build</strong>刷刷刷的图片、js打包出来了。看一个打包效果图。 <img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVHwha" alt="图片描述"></p><p>6、要发布了？no，你需要学会服务端渲染，不送。。</p>`,19)])])}const g=n(t,[["render",l]]);export{d as __pageData,g as default};
