import a from"/img/bVH8gg";import{_ as n,o as e,c as p,a2 as t}from"./chunks/framework.BWuWLRhz.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/前端系列/推荐几个github上超级star的异步插件.md","filePath":"wiki/legacy/前端系列/推荐几个github上超级star的异步插件.md"}'),i={name:"wiki/legacy/前端系列/推荐几个github上超级star的异步插件.md"};function l(r,s,o,c,u,h){return e(),p("div",null,[...s[0]||(s[0]=[t(`<p>如果你还在为选择哪个异步插件烦恼，不如静下心来看看下面这几个插件，或许会给你带来一些灵感。</p><p>1、request：<a href="https://github.com/request/request" target="_blank" rel="noreferrer">https://github.com/request/request</a>（10K+ star）</p><p>原作者自认为这个插件是设计的最最最简单的异步操作，例如这个例子，并且默认支持https，如果看到这种写法觉得很好用，赶紧点击链接去看看吧。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var request = require(&#39;request&#39;);</span></span>
<span class="line"><span>request(&#39;http://www.google.com&#39;, function (error, response, body) {</span></span>
<span class="line"><span>  if (!error &amp;&amp; response.statusCode == 200) {</span></span>
<span class="line"><span>    console.log(body)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>2、Axios：<a href="https://github.com/mzabriskie/axios" target="_blank" rel="noreferrer">https://github.com/mzabriskie/axios</a>（10K+ star）</p><p>基于promise写法的http请求插件，支持客户端和node端，有很好的一些特性：</p><p>支持restful API 支持拦截请求和响应 自动转换JSON数据 客户端支持保护安全免受XSRF攻击 ...</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>axios.get(&#39;/user?ID=12345&#39;)</span></span>
<span class="line"><span>  .then(function (response) {</span></span>
<span class="line"><span>    console.log(response);</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  .catch(function (response) {</span></span>
<span class="line"><span>    console.log(response);</span></span>
<span class="line"><span>  });</span></span></code></pre></div><p>3、superagent：<a href="https://github.com/visionmedia/superagent" target="_blank" rel="noreferrer">https://github.com/visionmedia/superagent</a>（9K+ star）</p><p>兼容性有点渣渣，慎用。 <img src="`+a+`" alt="图片描述"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>request</span></span>
<span class="line"><span>  .post(&#39;/api/pet&#39;)</span></span>
<span class="line"><span>  .send({ name: &#39;Manny&#39;, species: &#39;cat&#39; })</span></span>
<span class="line"><span>  .set(&#39;X-API-Key&#39;, &#39;foobar&#39;)</span></span>
<span class="line"><span>  .set(&#39;Accept&#39;, &#39;application/json&#39;)</span></span>
<span class="line"><span>  .end(function(err, res){</span></span>
<span class="line"><span>    // Calling the end function will send the request</span></span>
<span class="line"><span>  });</span></span></code></pre></div><p>还有几个几百、几千star的就不推荐了。</p>`,12)])])}const m=n(i,[["render",l]]);export{_ as __pageData,m as default};
