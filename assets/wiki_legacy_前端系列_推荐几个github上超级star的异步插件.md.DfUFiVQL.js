import{_ as s,o as p,c as n,a2 as e}from"./chunks/framework.BWuWLRhz.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/前端系列/推荐几个github上超级star的异步插件.md","filePath":"wiki/legacy/前端系列/推荐几个github上超级star的异步插件.md"}'),t={name:"wiki/legacy/前端系列/推荐几个github上超级star的异步插件.md"};function i(m,a,r,l,o,c){return p(),n("div",null,[...a[0]||(a[0]=[e(`<p>如果你还在为选择哪个异步插件烦恼，不如静下心来看看下面这几个插件，或许会给你带来一些灵感。</p><p>1、request：<a href="https://github.com/request/request" target="_blank" rel="noreferrer">https://github.com/request/request</a>（10K+ star）</p><p>原作者自认为这个插件是设计的最最最简单的异步操作，例如这个例子，并且默认支持https，如果看到这种写法觉得很好用，赶紧点击链接去看看吧。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var request = require(&amp;amp;amp;#039;request&amp;amp;amp;#039;);</span></span>
<span class="line"><span>request(&amp;amp;amp;#039;http://www.google.com&amp;amp;amp;#039;, function (error, response, body) {</span></span>
<span class="line"><span>  if (!error &amp;amp;amp;amp;&amp;amp;amp;amp; response.statusCode == 200) {</span></span>
<span class="line"><span>    console.log(body)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>2、Axios：<a href="https://github.com/mzabriskie/axios" target="_blank" rel="noreferrer">https://github.com/mzabriskie/axios</a>（10K+ star）</p><p>基于promise写法的http请求插件，支持客户端和node端，有很好的一些特性：</p><p>支持restful API 支持拦截请求和响应 自动转换JSON数据 客户端支持保护安全免受XSRF攻击 ...</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>axios.get(&amp;amp;amp;#039;/user?ID=12345&amp;amp;amp;#039;)</span></span>
<span class="line"><span>  .then(function (response) {</span></span>
<span class="line"><span>    console.log(response);</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>  .catch(function (response) {</span></span>
<span class="line"><span>    console.log(response);</span></span>
<span class="line"><span>  });</span></span></code></pre></div><p>3、superagent：<a href="https://github.com/visionmedia/superagent" target="_blank" rel="noreferrer">https://github.com/visionmedia/superagent</a>（9K+ star）</p><p>兼容性有点渣渣，慎用。 <img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVH8gg" alt="图片描述"></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>request</span></span>
<span class="line"><span>  .post(&amp;amp;amp;#039;/api/pet&amp;amp;amp;#039;)</span></span>
<span class="line"><span>  .send({ name: &amp;amp;amp;#039;Manny&amp;amp;amp;#039;, species: &amp;amp;amp;#039;cat&amp;amp;amp;#039; })</span></span>
<span class="line"><span>  .set(&amp;amp;amp;#039;X-API-Key&amp;amp;amp;#039;, &amp;amp;amp;#039;foobar&amp;amp;amp;#039;)</span></span>
<span class="line"><span>  .set(&amp;amp;amp;#039;Accept&amp;amp;amp;#039;, &amp;amp;amp;#039;application/json&amp;amp;amp;#039;)</span></span>
<span class="line"><span>  .end(function(err, res){</span></span>
<span class="line"><span>    // Calling the end function will send the request</span></span>
<span class="line"><span>  });</span></span></code></pre></div><p>还有几个几百、几千star的就不推荐了。</p>`,12)])])}const g=s(t,[["render",i]]);export{d as __pageData,g as default};
