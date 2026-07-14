import{_ as o,o as t,c as p,a2 as r}from"./chunks/framework.BWuWLRhz.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/Webpack系列/用proxy 1分钟解决跨域问题.md","filePath":"wiki/legacy/Webpack系列/用proxy 1分钟解决跨域问题.md"}'),n={name:"wiki/legacy/Webpack系列/用proxy 1分钟解决跨域问题.md"};function a(s,e,c,i,x,l){return t(),p("div",null,[...e[0]||(e[0]=[r(`<p>这已经是个老生常谈的问题了，对于前后端分离的前端工程师来说，遇到这个问题总是会想尽各种办法，比如后端配置cors，前端用script包装。</p><p>这是个让人头痛的❌</p><p>XMLHttpRequest cannot load <a href="http://www.xxx.com/login" target="_blank" rel="noreferrer">http://www.xxx.com/login</a>. Response to preflight request doesn&#39;t pass access control check: No &#39;Access-Control-Allow-Origin&#39; header is present on the requested resource. Origin &#39;<a href="http://localhost:3213" target="_blank" rel="noreferrer">http://localhost:3213</a>&#39; is therefore not allowed access.</p><p>上面这段英文提示就是常见的跨域报错，首先，我是在react工程项目中做的测试，前端项目开启的是本地的3213端口，而后端login的API接口在www.xxx.com域名下面。</p><p>为了保证前端测试的可行性，为了你的老板不扣你工资，用一个最简单的办法解决API资源请求跨域问题： <strong>http-proxy-middleware</strong></p><p>http-proxy-middleware不需要自己安装，在安装webpack过程中，会自动依赖安装到你的node_modules文件夹下，如果你发现没有，那么请自行安装</p><pre><code>npm install --save-dev http-proxy-middleware
</code></pre><p>在react开发中，分下面2种情况。</p><p>1、前端部署了nodejs服务器，采用app.listen()启动前端服务器，那么你只需要在你的js中添加下面几行代码即可</p><p>假设你的前端服务器js文件叫做server.js</p><pre><code>//导入proxy
var proxy = require(&#39;http-proxy-middleware&#39;)

//context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
const context = [\`/login\`, \`/admin/*\`]

//options可选的配置参数请自行看readme.md文档，通常只需要配置target，也就是你的api所属的域名。
const options = &amp;#123;
    target: &#39;http://www.xxx.com&#39;,
    changeOrigin: true
&amp;#125;

//将options对象用proxy封装起来，作为参数传递
const apiProxy = proxy(options)

//现在你只需要执行这一行代码，当你访问需要跨域的api资源时，就可以成功访问到了。
app.use(context, apiProxy)
</code></pre><p>2、你可能没有前端node服务器，但是你用来webpack的devServer来启动前端项目，这个时候的配置跟上面类似。</p><p>在你的webpack.config.js里面添加proxy配置。</p><pre><code>    //导入proxy
    var proxy = require(&#39;http-proxy-middleware&#39;)

    //context可以是单个字符串，也可以是多个字符串数组，分别对应你需要代理的api,星号（*）表示匹配当前路径下面的所有api
    const context = [\`/login\`, \`/admin/*\`]

    module.exports = &amp;#123;
        devServer: &amp;#123;
           host: &#39;localhost&#39;,
           port: &#39;3011&#39;,
           proxy: [
               &amp;#123;
                    context: context,
                    target: &#39;https://www.xxx.com&#39;,
                    secure: false
              &amp;#125;
           ]
        &amp;#125;
    &amp;#125;
</code></pre><p>现在，跨域将不会成为你的烦恼，可以放心写代码了。</p><p><strong>最新补充：</strong><strong>axios支持设置proxy，相关文档有demo。</strong></p>`,16)])])}const _=o(n,[["render",a]]);export{m as __pageData,_ as default};
