import s from"/img/bVNtQ3";import n from"/img/bVNtTG";import p from"/img/bVNtZX";import{_ as e,o as l,c as t,a2 as i}from"./chunks/framework.BWuWLRhz.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/你好，react，nice too me you!.md","filePath":"wiki/legacy/React系列/你好，react，nice too me you!.md"}'),r={name:"wiki/legacy/React系列/你好，react，nice too me you!.md"};function o(c,a,d,h,m,g){return l(),t("div",null,[...a[0]||(a[0]=[i(`<h4 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h4><p>常常有人问我，react如何学起？</p><p>我一般会告诉他，github上找个demo下载到本地运行，再结合网上的一些教程看代码。</p><p>但那些大部分是react技术栈的demo，无法让你更简单的理解react的组件化思想。</p><p>首先推荐一个在线运行react的网站，这也是dan大神推荐的 <a href="http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010" target="_blank" rel="noreferrer">http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010</a>，在该网站上面，你可以写任意的react代码，实时显示出来渲染结果。</p><p>用react做开发，可以分2大点：</p><p>1、react技术栈框架搭建；</p><p>2、react编程思想。</p><p>技术栈搭建即使对于有一定react开发经验的人来说，都有一些困难，我们先了解react编程思想中组件的实现。现在请你打开 <a href="http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010" target="_blank" rel="noreferrer">http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010</a>，跟着我写react代码。</p><h4 id="hello-world-react" tabindex="-1">hello world react <a class="header-anchor" href="#hello-world-react" aria-label="Permalink to &quot;hello world react&quot;">​</a></h4><p>react很多实践是SPA应用，而SPA通常只有一个入口，ReactDOM.render()会把组件或者jsx渲染在根元素“root”下，比如这个例子中会在root下面渲染 &lt;h1&gt;Hello, world!&lt;/h1&gt;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ReactDOM.render(</span></span>
<span class="line"><span>  &lt;h1&gt;Hello, world!&lt;/h1&gt;,</span></span>
<span class="line"><span>  document.getElementById(&#39;root&#39;)</span></span>
<span class="line"><span>);</span></span></code></pre></div><p><img src="`+s+`" alt="clipboard.png"></p><h4 id="app根组件" tabindex="-1">App根组件 <a class="header-anchor" href="#app根组件" aria-label="Permalink to &quot;App根组件&quot;">​</a></h4><p>我们把 &lt;h1&gt;Hello, world!&lt;/h1&gt; 用react组件的形式来写，这里也提到了props的用法，用来从父组件传递属性给子组件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class App extends React.Component {</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>        hello {this.props.name}!</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ReactDOM.render(</span></span>
<span class="line"><span>  &lt;App name=&quot;world&quot; /&gt;,</span></span>
<span class="line"><span>  document.getElementById(&#39;root&#39;)</span></span>
<span class="line"><span>);</span></span></code></pre></div><p><img src="`+n+`" alt="clipboard.png"></p><h4 id="父组件嵌套子组件-子组件嵌套子组件。" tabindex="-1">父组件嵌套子组件，子组件嵌套子组件。 <a class="header-anchor" href="#父组件嵌套子组件-子组件嵌套子组件。" aria-label="Permalink to &quot;父组件嵌套子组件，子组件嵌套子组件。&quot;">​</a></h4><p>这里面比较绕，但是你可以知道的是父子组件可以任意嵌套，每个组件都像一个盒子，盒子里面可以装下大盒子或者小盒子。 我们增加一个子组件child，在父组件App中调用子组件，child又嵌套了一个表单组件。Forms是Child的子组件，Forms的结构和Child有些不同，比如在App中调用Child是&lt;Child /&gt;，在Child中调用Forms是&lt;Forms&gt;你的内容&lt;/Forms&gt;。 先来看Child：Child定义了一个state用来保存输入框的值，当onChange事件发生的时候，输入框的值会通过handleClick实时保存到state中，我们把value传递到Forms组件里面同步显示出来。 Forms组件：Forms可以嵌套jsx，因为在Forms组件的内部，我使用了this.props.children这个属性，用来表示Forms中嵌套节点的传递，在这里就是传递input。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class Child extends React.Component {</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  constructor(props) {</span></span>
<span class="line"><span>    super(props)</span></span>
<span class="line"><span>    this.state = {</span></span>
<span class="line"><span>      value: undefined</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    this.handleClick = this.handleClick.bind(this)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  handleClick(e) {</span></span>
<span class="line"><span>    this.setState({</span></span>
<span class="line"><span>      value: e.target.value</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;div&gt;</span></span>
<span class="line"><span>        子组件</span></span>
<span class="line"><span>        &lt;Forms value={this.state.value}&gt;</span></span>
<span class="line"><span>          &lt;input type=&quot;text&quot; onChange={(e) =&gt; this.handleClick(e)} /&gt;</span></span>
<span class="line"><span>        &lt;/Forms&gt;</span></span>
<span class="line"><span>      &lt;/div&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Forms extends React.Component {</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;form&gt;</span></span>
<span class="line"><span>        {this.props.children}</span></span>
<span class="line"><span>        您输入的值是：{this.props.value}</span></span>
<span class="line"><span>      &lt;/form&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><img src="`+p+'" alt="clipboard.png"></p><p>这么一个简单的在线实时编辑教程，教给你react组件的常用写法、嵌套、属性传递、jsx传递、单入口等知识，相信你对react会有个基本的认识。</p><p>手痒的就赶紧去在线编辑试试吧，你还可以写入官网demo的代码试试哦。</p><p>demo在线编程地址：<a href="http://codepen.io/hyy1115/pen/vmdrgo?editors=1010" target="_blank" rel="noreferrer">http://codepen.io/hyy1115/pen/vmdrgo?editors=1010</a></p>',24)])])}const C=e(r,[["render",o]]);export{k as __pageData,C as default};
