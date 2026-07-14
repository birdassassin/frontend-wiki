import{_ as n,o as a,c as p,a2 as e}from"./chunks/framework.BWuWLRhz.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/react15.4和webpack2实现一个计数器.md","filePath":"wiki/legacy/React系列/react15.4和webpack2实现一个计数器.md"}'),t={name:"wiki/legacy/React系列/react15.4和webpack2实现一个计数器.md"};function l(c,s,o,i,r,u){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>作为一个redux狂热爱好者，我还是第一次尝试剥离redux框架来搭建react项目，我喜欢用最新的版本来研究，比如react15，webpack2，等到react16出来，恐怕大家又得重新适应一些规则了。</p><p>学习前端以来，我发现前端框架变化太快，如果不保持持续性的学习能力，很容易就会被新人给替代。</p><p>这只是一个小玩意，展示了react和webpack2的基本框架搭建，没有redux，没有mobx，你可以纯粹当做学习如何搭建一个简单的react和webpack2框架，或者用来扩展成一个可管理的项目。</p><p>当然，在企业项目中，还是推荐用redux或者mobx来管理state。</p><p><img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVLr38" alt="图片描述"></p><p>看一下主要的代码。</p><p><strong>1、package.json：插件管理，没有配置build，只配置了start启动项目。</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;name&quot;: &quot;react-webpack2&quot;,</span></span>
<span class="line"><span>  &quot;version&quot;: &quot;0.1.0&quot;,</span></span>
<span class="line"><span>  &quot;private&quot;: true,</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;start&quot;: &quot;node server.js&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;dependencies&quot;: {</span></span>
<span class="line"><span>    &quot;babel-polyfill&quot;: &quot;^6.23.0&quot;,</span></span>
<span class="line"><span>    &quot;react&quot;: &quot;15.4.2&quot;,</span></span>
<span class="line"><span>    &quot;react-dom&quot;: &quot;15.4.2&quot;,</span></span>
<span class="line"><span>    &quot;react-hot-loader&quot;: &quot;^3.0.0-beta.6&quot;,</span></span>
<span class="line"><span>    &quot;react-router-dom&quot;: &quot;^4.0.0&quot;,</span></span>
<span class="line"><span>    &quot;react-scripts&quot;: &quot;0.9.5&quot;</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;devDependencies&quot;: {</span></span>
<span class="line"><span>    &quot;babel-core&quot;: &quot;^6.24.0&quot;,</span></span>
<span class="line"><span>    &quot;babel-loader&quot;: &quot;^6.4.1&quot;,</span></span>
<span class="line"><span>    &quot;babel-preset-es2015&quot;: &quot;^6.24.0&quot;,</span></span>
<span class="line"><span>    &quot;babel-preset-react&quot;: &quot;^6.23.0&quot;,</span></span>
<span class="line"><span>    &quot;babel-preset-stage-0&quot;: &quot;^6.22.0&quot;,</span></span>
<span class="line"><span>    &quot;babel-preset-stage-2&quot;: &quot;^6.22.0&quot;,</span></span>
<span class="line"><span>    &quot;css-loader&quot;: &quot;^0.27.3&quot;,</span></span>
<span class="line"><span>    &quot;postcss-loader&quot;: &quot;^1.3.3&quot;,</span></span>
<span class="line"><span>    &quot;style-loader&quot;: &quot;^0.16.1&quot;,</span></span>
<span class="line"><span>    &quot;webpack&quot;: &quot;^2.3.2&quot;,</span></span>
<span class="line"><span>    &quot;webpack-dev-server&quot;: &quot;^2.4.2&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>2、webpack.config.js：webpack配置文件是一个object，你把他看成是一个json数据来理解会容易很多。</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const HtmlWebpackPlugin = require(&#39;html-webpack-plugin&#39;);</span></span>
<span class="line"><span>const webpack = require(&#39;webpack&#39;);</span></span>
<span class="line"><span>const path = require(&#39;path&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>module.exports = {</span></span>
<span class="line"><span>    entry: {</span></span>
<span class="line"><span>        app: [</span></span>
<span class="line"><span>            &#39;webpack-dev-server/client?http://localhost:3133&#39;,</span></span>
<span class="line"><span>            &#39;webpack/hot/only-dev-server&#39;,</span></span>
<span class="line"><span>            &#39;babel-polyfill&#39;,</span></span>
<span class="line"><span>            &#39;react-hot-loader/patch&#39;,</span></span>
<span class="line"><span>            &#39;./src/index&#39;</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    output: {</span></span>
<span class="line"><span>        path: path.resolve(__dirname, &#39;dist&#39;),</span></span>
<span class="line"><span>        filename: &#39;[name].js&#39;,</span></span>
<span class="line"><span>        publicPath: &#39;/dist&#39;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    module: {</span></span>
<span class="line"><span>        rules: [</span></span>
<span class="line"><span>            {test: /\\.(js|jsx)$/, use: &#39;babel-loader&#39;, exclude: /node_modules/},</span></span>
<span class="line"><span>            {test: /\\.css$/, use: [&#39;style-loader&#39;, &#39;css-loader?importLoaders=1&#39;]},</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    plugins: [</span></span>
<span class="line"><span>        // new webpack.optimize.UglifyJsPlugin(),</span></span>
<span class="line"><span>        new HtmlWebpackPlugin({template: &#39;./index.html&#39;}),</span></span>
<span class="line"><span>        new webpack.HotModuleReplacementPlugin(), //热更新</span></span>
<span class="line"><span>        new webpack.NamedModulesPlugin(), //在控制台打印模块</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    devtool: &#39;eval&#39;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>3、server.js：配置webpack-dev-server启动项，还有一种方式是通过express来启动前端项目。</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var webpack = require(&#39;webpack&#39;);</span></span>
<span class="line"><span>var WebpackDevServer = require(&#39;webpack-dev-server&#39;);</span></span>
<span class="line"><span>var config = require(&#39;./webpack.config&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>new WebpackDevServer(webpack(config), {</span></span>
<span class="line"><span>    publicPath: config.output.publicPath,</span></span>
<span class="line"><span>    hot: true,</span></span>
<span class="line"><span>    historyApiFallback: true,</span></span>
<span class="line"><span>    stats: {</span></span>
<span class="line"><span>        colors: true</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}).listen(3133, &#39;localhost&#39;, function (err) {</span></span>
<span class="line"><span>    if (err) {</span></span>
<span class="line"><span>        console.log(err);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    console.log(&#39;Listening at localhost:3133&#39;);</span></span>
<span class="line"><span>});</span></span></code></pre></div><p><strong>4、babelrc文件：配置详情请去官网 <a href="http://babeljs.io/docs/usage/babelrc/" target="_blank" rel="noreferrer">http://babeljs.io/docs/usage/babelrc/</a></strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;presets&quot;: [</span></span>
<span class="line"><span>    [&quot;es2015&quot;, {&quot;modules&quot;: false, &quot;loose&quot;: true}],</span></span>
<span class="line"><span>    // webpack understands the native import syntax, and uses it for tree shaking</span></span>
<span class="line"><span>    &quot;stage-0&quot;,</span></span>
<span class="line"><span>    &quot;stage-2&quot;,</span></span>
<span class="line"><span>    // Specifies what level of language features to activate.</span></span>
<span class="line"><span>    // Stage 2 is &quot;draft&quot;, 4 is finished, 0 is strawman.</span></span>
<span class="line"><span>    // See https://tc39.github.io/process-document/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;react&quot;</span></span>
<span class="line"><span>    // Transpile React components to JavaScript</span></span>
<span class="line"><span>  ],</span></span>
<span class="line"><span>  &quot;plugins&quot;: [</span></span>
<span class="line"><span>    &quot;react-hot-loader/babel&quot;</span></span>
<span class="line"><span>    // Enables React code to work with HMR.</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>5、index.js：在src目录下面的index.js作为网站的入口。我们看到在react-hot-loader提取出了一个AppContainer，官方认为一个网站应用只有一个单一的根元素是比较好的实现方式。关于使用热更新的同学，你配置好了webpack、babel之后，别忘了module.hot.accept()，这个方法是用来调用你需要实现热更新的代码，通常放在网站的入口或者是store的入口。</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React from &#39;react&#39;;</span></span>
<span class="line"><span>import ReactDOM from &#39;react-dom&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { AppContainer } from &#39;react-hot-loader&#39;;</span></span>
<span class="line"><span>// AppContainer is a necessary wrapper component for HMR</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import App from &#39;./App&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const render = (Component) =&gt; {</span></span>
<span class="line"><span>    ReactDOM.render(</span></span>
<span class="line"><span>        &lt;AppContainer&gt;</span></span>
<span class="line"><span>            &lt;Component/&gt;</span></span>
<span class="line"><span>        &lt;/AppContainer&gt;,</span></span>
<span class="line"><span>        document.getElementById(&#39;root&#39;)</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>render(App);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Hot Module Replacement API</span></span>
<span class="line"><span>if (module.hot) {</span></span>
<span class="line"><span>    //这种写法只在webpack2支持，如果是webpack1版本，还是要用require的方式来导入模块。</span></span>
<span class="line"><span>    module.hot.accept(&#39;./App&#39;, () =&gt; { render(App) });</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>6、App.js：如果说index.js是网站的入口，那么App.js是组件的入口，我们把App.js叫做父组件，下面这种形式是函数式组件的写法，返回一个jsx对象。</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React from &#39;react&#39;;</span></span>
<span class="line"><span>import styles from &#39;./app.css&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import Button from &#39;./components/Button&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const App = () =&gt; (</span></span>
<span class="line"><span>    &lt;div className={styles.app}&gt;</span></span>
<span class="line"><span>        &lt;h2&gt;一个简单的react-webpack计数器....&lt;/h2&gt;</span></span>
<span class="line"><span>        &lt;Button /&gt;</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default App;</span></span></code></pre></div><p><strong>7、Button.js：子组件，放在components下面，子组件我采用了class的写法，当你的组件是一个纯函数的时候，就推荐使用6的函数组件写法，当组件有state的时候，采用class的写法比较合适。下面的例子实现了一个计数器的效果，点击按钮，计数器就加1.</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { Component } from &#39;react&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default class Button extends Component {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    state = {</span></span>
<span class="line"><span>        count: 1</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        const { count } = this.state</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>            &lt;div&gt;</span></span>
<span class="line"><span>                &lt;button</span></span>
<span class="line"><span>                    style={{border: &quot;1px solid #000&quot;}}</span></span>
<span class="line"><span>                    onClick={() =&gt; this.setState({count: count + 1})}&gt;点击计数器&lt;/button&gt;</span></span>
<span class="line"><span>                &lt;div style={{color: &quot;#f60&quot;, fontSize: &quot;20px&quot;}}&gt;{count}&lt;/div&gt;</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>8、现在你可以体验一下热更新了，修改src目录下的css、js，可以在浏览器看到修改的部分更新了。</strong></p><p>**看完了，可以结合配置好的项目学习一下：<a href="https://github.com/hyy1115/react-webpack2/" target="_blank" rel="noreferrer">react-webpack2</a> **</p><p>备注： react完整项目框架：<a href="https://github.com/hyy1115/react-redux-webpack2" target="_blank" rel="noreferrer">目前最新最完整的react技术栈框架在这里，我会持续性跟随各个插件的官方脚步更新版本</a>（新手请先看懂上面的基础框架再入手高级框架，善意的建议）</p>`,23)])])}const q=n(t,[["render",l]]);export{b as __pageData,q as default};
