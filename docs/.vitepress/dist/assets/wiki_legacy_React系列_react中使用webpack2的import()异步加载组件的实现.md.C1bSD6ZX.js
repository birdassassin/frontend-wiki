import{_ as t,o,c as n,a2 as p}from"./chunks/framework.BWuWLRhz.js";const l=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/react中使用webpack2的import()异步加载组件的实现.md","filePath":"wiki/legacy/React系列/react中使用webpack2的import()异步加载组件的实现.md"}'),r={name:"wiki/legacy/React系列/react中使用webpack2的import()异步加载组件的实现.md"};function a(m,e,c,s,i,u){return o(),n("div",null,[...e[0]||(e[0]=[p(`<p>你还在用require.ensure()？？？</p><p>low了！！</p><p>import()的大名听过没？？</p><p>下面隆重介绍webpack代码切割新方案。</p><p>官网教程在这里：[<a href="https://doc.webpack-china.org/guides/code-splitting-async/#system-import-" target="_blank" rel="noreferrer">https://doc.webpack-china.org/guides/code-splitting-async/#system-import-</a>][1]</p><p><strong>先别去看官网教程，因为webpack官网教程通常都比较不靠谱，写的云里雾里。</strong></p><p>webpack中，从v1到v2，v3暂且不提，一共有3种代码切割加载的方案。</p><p>1、System.import()； 已废除，不推荐</p><p>2、require.ensure()； v1和v2均可使用</p><p>3、import()；v2支持，v1不支持</p><h4 id="system-import" tabindex="-1">System.import() <a class="header-anchor" href="#system-import" aria-label="Permalink to &quot;System.import()&quot;">​</a></h4><p>已废除，就不做介绍了</p><h4 id="require-ensure" tabindex="-1">require.ensure() <a class="header-anchor" href="#require-ensure" aria-label="Permalink to &quot;require.ensure()&quot;">​</a></h4><p>从v1时代，使用过webpack的同学对这种用法应该不会陌生，比较网上可以搜到很多关于require.ensure()的用法的demo。</p><p>在百度输入require.ensure()，搜到几个关键的教程。</p><p>[webpack2.2文档关于require.ensure使用的介绍][2]</p><p>简单介绍下require.ensure的经典使用方法，你若是没用过，别担心，看下面的代码就足够了。 const Foo = require.ensure([], () =&gt; { require(&quot;a&quot;); }, err =&gt; { console.error(&quot;We failed to load chunk: &quot; + err); }, &quot;chunk-name&quot;);</p><pre><code>//react-router2 or 3
&amp;lt;Route path=&quot;/xx&quot; getComponent=&amp;#123;Foo&amp;#125; /&amp;gt;
</code></pre><h4 id="import" tabindex="-1">import() <a class="header-anchor" href="#import" aria-label="Permalink to &quot;import()&quot;">​</a></h4><p>这是我们今天的主角，使用场景是react-router4，你会发现在react-router4中，route的getComponent不见了。</p><p>怎么办，这时候你可以去看一下最上面给你的官方代码切割教程，列举了3种使用情况。</p><p>1、导入局部模块</p><pre><code>function determineDate() &amp;#123;
  import(&#39;moment&#39;).then(function(moment) &amp;#123;
    console.log(moment().format());
  &amp;#125;).catch(function(err) &amp;#123;
    console.log(&#39;Failed to load moment&#39;, err);
  &amp;#125;);
&amp;#125;

determineDate();
</code></pre><p>2、导入整个模块</p><pre><code>import(&#39;./component&#39;).then(Component =&gt; /* ... */);
</code></pre><p>3、使用await</p><pre><code>async function determineDate() &amp;#123;
  const moment = await import(&#39;moment&#39;);
  return moment().format(&#39;LLLL&#39;);
&amp;#125;

determineDate().then(str =&gt; console.log(str));
</code></pre><p>这3个官方例子都有一个共同点，那就是：import(name) -&gt; Promise</p><p>我们发现import()方法返回的是一个Promise，啥？Promise？有人会问，Promise咋了。我直接赋给变量就可以用了啊。</p><pre><code>const Foo = import(&quot;./xx&quot;) // 错误的写法

&amp;lt;Route path=&quot;/xx&quot; component=&amp;#123;import(&quot;./xxx&quot;)&amp;#125; /&amp;gt; //错误的写法
</code></pre><p>少年，别太天真，Promise的返回值只能通过then()来读取，所以你会发现官方的3种使用场景全都是在then()里面操作，那怎么办？我想把import()获取到的组件赋给一个变量或常量。</p><p>通过我坚持不懈的chrome，终于发现了一个“惊天函数”。</p><p>懂行的人也许会问，react-router4官网文档不是有个[Bundle组件][3]可以实现代码切割吗？</p><p>是啊，官方的这个方法我复制过来使用了之后，一堆红色报错啊，被欺骗的❤️。</p><p>不废话，直接上可用代码。</p><p>1、asyncComponent函数（惊天函数）：函数很好理解，loadComponent参数表示需要代码切割的路径，函数返回值是一个react组件，组件内部帮你做好了then()方法的操作。 import React from &#39;react&#39; export const asyncComponent = loadComponent =&gt; ( class AsyncComponent extends React.Component { state = { Component: null, }</p><pre><code>        componentWillMount() &amp;#123;
            if (this.hasLoadedComponent()) &amp;#123;
                return;
            &amp;#125;

            loadComponent()
                .then(module =&gt; module.default)
                .then((Component) =&gt; &amp;#123;
                    this.setState(&amp;#123; Component &amp;#125;);
                &amp;#125;)
                .catch((err) =&gt; &amp;#123;
                    console.error(\`Cannot load component in &amp;lt;AsyncComponent /&amp;gt;\`);
                    throw err;
                &amp;#125;);
        &amp;#125;

        hasLoadedComponent() &amp;#123;
            return this.state.Component !== null;
        &amp;#125;

        render() &amp;#123;
            const &amp;#123; Component &amp;#125; = this.state;
            return (Component) ? &amp;lt;Component &amp;#123;...this.props&amp;#125; /&amp;gt; : null;
        &amp;#125;
    &amp;#125;
);
</code></pre><p>2、在react中使用</p><pre><code>import &amp;#123; asyncComponent &amp;#125; from &#39;./AsyncComponent&#39;

const Foo = asyncComponent(() =&gt; import(/* webpackChunkName: &quot;foo&quot; */ &quot;./foo&quot;))

&amp;lt;Route path=&quot;/xx&quot; component=&amp;#123;Foo&amp;#125; /&amp;gt;
</code></pre><p>3、好了，这样你就成功了，但是，请注意下面几个问题：</p><p><strong>webpack2的配置文件中，需要配置chunkName。</strong></p><pre><code>chunkFilename: &#39;[name].js&#39;
</code></pre><p><strong>如果你的异步加载组件有导入样式，请把样式移植到全局js文件导入。</strong></p><p>好了，本文到此结束。</p><p>“小朋友，等等，你有demo吗？看文字我看不懂啊！”</p><p>我回头问道：“你想看demo？那就请看 [二月的import()切割实现][4]，感兴趣可以持续关注，如果webpack出了更好的玩意，我会持续跟进应用到项目中。”</p><p><strong>如果文章对你有帮助，请点击一下推荐。</strong> [1]: <a href="https://doc.webpack-china.org/guides/code-splitting-async/#system-import-" target="_blank" rel="noreferrer">https://doc.webpack-china.org/guides/code-splitting-async/#system-import-</a> [2]: <a href="http://www.css88.com/doc/webpack2/guides/code-splitting-require/" target="_blank" rel="noreferrer">http://www.css88.com/doc/webpack2/guides/code-splitting-require/</a> [3]: <a href="https://reacttraining.cn/web/guides/code-splitting" target="_blank" rel="noreferrer">https://reacttraining.cn/web/guides/code-splitting</a> [4]: <a href="https://github.com/hyy1115/react-redux-webpack2/blob/master/src/App.js" target="_blank" rel="noreferrer">https://github.com/hyy1115/react-redux-webpack2/blob/master/src/App.js</a></p>`,47)])])}const h=t(r,[["render",a]]);export{l as __pageData,h as default};
