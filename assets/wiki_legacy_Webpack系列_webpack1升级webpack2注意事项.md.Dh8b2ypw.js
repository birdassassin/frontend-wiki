import{_ as n,o as a,c as p,a2 as s}from"./chunks/framework.BWuWLRhz.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/Webpack系列/webpack1升级webpack2注意事项.md","filePath":"wiki/legacy/Webpack系列/webpack1升级webpack2注意事项.md"}'),o={name:"wiki/legacy/Webpack系列/webpack1升级webpack2注意事项.md"};function r(t,e,l,c,m,i){return a(),p("div",null,[...e[0]||(e[0]=[s(`<p>webpack1已结不再维护了，官方在主推webpack2，原先使用webpack1的用户，想要使用v2，只需要做几个配置小改动即可。</p><p>我们只关注常用的配置选项，不常用的不做解释。</p><p>1、resolve配置</p><p>以前你可能这么写：</p><pre><code>resolve: &amp;#123;
	extensions: [&#39;&#39;, &#39;.jsx&#39;, &#39;.js&#39;, &#39;.json&#39;],
	modulesDirectories: [&#39;node_modules&#39;, &#39;src&#39;],
	alias: &amp;#123;
		actions: __dirname + \`/src/actions\`,
		components: __dirname + \`/src/components\`,
		containers: __dirname + \`/src/containers\`,
		reducers: __dirname + \`/src/reducers\`,
		store: __dirname + \`/src/store\`
	&amp;#125;
&amp;#125;
</code></pre><p>现在你该这么写：取消了空字符串</p><pre><code>resolve: &amp;#123;
    extensions: [&#39;.js&#39;, &#39;.jsx&#39;, &#39;.less&#39;, &#39;.scss&#39;, &#39;.css&#39;],
    modules: [
      path.resolve(__dirname, &#39;node_modules&#39;),
      path.join(__dirname, &#39;./src&#39;)
    ]
  &amp;#125;
</code></pre><p>2、module配置</p><p>以前你可能这么写： module: { loaders: [{ test: /.(js|jsx)$/, loaders: [&#39;react-hot&#39;, &#39;babel-loader&#39;], exclude: /node_modules/ }, { test: /.(less|css)$/, loader: &quot;style-loader!css-loader!less!postcss-loader&quot; }, { test: /.(png|jpg|gif|svg)$/, loader: &#39;file?name=[md5#️⃣base64:10].[ext]&#39; }, { test: /.json$/, loader: &#39;json&#39; }, { test: /.md$/, loader: &#39;file?name=[name].[ext]&#39; }] }</p><p>现在你该这么写：</p><p>a、外层loaders改为rules</p><p>b、内层loader改为use</p><p>c、所有插件必须加上-loader，不再允许缩写，所以react-hot不需要再配置。</p><p>d、不再支持使用！连接插件，请使用数组形式。</p><p>e、json-loader已经被移除，不需要手动添加，webpack会帮你处理好这些事情。</p><pre><code>module: &amp;#123;
      rules: [&amp;#123;
          test: /\\.(js|jsx)$/,
          use: [&#39;babel-loader&#39;],
          exclude: /node_modules/,
          include: path.join(__dirname, &#39;src&#39;)
      &amp;#125;, &amp;#123;
          test: /\\.(less|css)$/,
          use: [&quot;style-loader&quot;, &quot;css-loader&quot;, &quot;less-loader&quot;, &quot;postcss-loader&quot;]
      &amp;#125;, &amp;#123;
          test: /\\.(png|jpg|gif|md)$/,
          use: [&#39;file-loader?limit=10000&amp;name=[md5:hash:base64:10].[ext]&#39;]
      &amp;#125;, &amp;#123;
          test: /\\.svg(\\?v=\\d+\\.\\d+\\.\\d+)?$/,
          use: [&#39;url-loader?limit=10000&amp;mimetype=image/svg+xml&#39;]
      &amp;#125;],
  &amp;#125;
&amp;#125;;
</code></pre><p>3、plugins配置</p><p>以前你可能这么写： new webpack.optimize.OccurenceOrderPlugin(), new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin(), new webpack.optimize.UglifyJsPlugin()</p><p>现在你该这么写：</p><p>a、移除了OccurenceOrderPlugin 和 NoErrorsPlugin</p><p>b、更多plugins配置请参考 <a href="https://webpack.js.org" target="_blank" rel="noreferrer">https://webpack.js.org</a></p><pre><code>new webpack.HotModuleReplacementPlugin(),
new webpack.optimize.UglifyJsPlugin()
</code></pre><p>==============================================================</p><p>以上几个常用配置变化的比较明显，没有修改的配置会报错导致webpack无法使用，请注意遵守webpack2规则。</p><p>最后贴上一份webpack.config.js基础配置，查看该配置完整项目请点击：<a href="https://github.com/hyy1115/react-redux-webpack" target="_blank" rel="noreferrer">react-webpack2</a></p><pre><code>var path = require(&#39;path&#39;);
var webpack = require(&#39;webpack&#39;);
var autoprefixer = require(&#39;autoprefixer&#39;);
var precss = require(&#39;precss&#39;);

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || &#39;development&#39;;
const isPro = nodeEnv === &#39;production&#39;;

console.log(&quot;当前运行环境：&quot;, isPro)

var plugins = []
if (isPro) &amp;#123;
  plugins.push(
      new webpack.optimize.UglifyJsPlugin(&amp;#123;
          compress: &amp;#123;
              warnings: false
          &amp;#125;
      &amp;#125;),
      new webpack.DefinePlugin(&amp;#123;
          &#39;process.env&#39;:&amp;#123;
              &#39;NODE_ENV&#39;: JSON.stringify(nodeEnv)
          &amp;#125;
      &amp;#125;)
  )
&amp;#125; else &amp;#123;
  plugins.push(
      new webpack.DefinePlugin(&amp;#123;
          &#39;process.env&#39;:&amp;#123;
              &#39;NODE_ENV&#39;: JSON.stringify(nodeEnv)
          &amp;#125;,
          BASE_URL: JSON.stringify(&#39;http://localhost:9009&#39;),
      &amp;#125;),
      // new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin()
      // new webpack.NoErrorsPlugin()
  )
&amp;#125;

module.exports = &amp;#123;
  devtool: false,
  entry: &amp;#123;
    app: [
      &#39;webpack-hot-middleware/client?path=http://localhost:3011/__webpack_hmr&amp;reload=true&amp;noInfo=false&amp;quiet=false&#39;,
      &#39;babel-polyfill&#39;,
      &#39;./src/index&#39;
    ]
  &amp;#125;,
  output: &amp;#123;
    filename: &#39;[name].js&#39;,
    path: path.join(__dirname, &#39;build&#39;),
    publicPath: &#39;http://localhost:3011/build/&#39;,
    chunkFilename: &#39;[name].js&#39;
  &amp;#125;,
  // BASE_URL是全局的api接口访问地址
  plugins,
  // alias是配置全局的路径入口名称，只要涉及到下面配置的文件路径，可以直接用定义的单个字母表示整个路径
  resolve: &amp;#123;
    extensions: [&#39;.js&#39;, &#39;.jsx&#39;, &#39;.less&#39;, &#39;.scss&#39;, &#39;.css&#39;],
    modules: [
      path.resolve(__dirname, &#39;node_modules&#39;),
      path.join(__dirname, &#39;./src&#39;)
    ]
  &amp;#125;,

  module: &amp;#123;
      rules: [&amp;#123;
          test: /\\.(js|jsx)$/,
          use: [&#39;babel-loader&#39;],
          exclude: /node_modules/,
          include: path.join(__dirname, &#39;src&#39;)
      &amp;#125;, &amp;#123;
          test: /\\.(less|css)$/,
          use: [&quot;style-loader&quot;, &quot;css-loader&quot;, &quot;less-loader&quot;, &quot;postcss-loader&quot;]
      &amp;#125;, &amp;#123;
          test: /\\.(png|jpg|gif|md)$/,
          use: [&#39;file-loader?limit=10000&amp;name=[md5:hash:base64:10].[ext]&#39;]
      &amp;#125;, &amp;#123;
          test: /\\.svg(\\?v=\\d+\\.\\d+\\.\\d+)?$/,
          use: [&#39;url-loader?limit=10000&amp;mimetype=image/svg+xml&#39;]
      &amp;#125;],
  &amp;#125;
&amp;#125;;
</code></pre>`,26)])])}const _=n(o,[["render",r]]);export{u as __pageData,_ as default};
