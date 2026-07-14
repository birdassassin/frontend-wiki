import{_ as s,o as n,c as p,a2 as e}from"./chunks/framework.BWuWLRhz.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/react有哪些组件类型、如何写一个react组件？.md","filePath":"wiki/legacy/React系列/react有哪些组件类型、如何写一个react组件？.md"}'),t={name:"wiki/legacy/React系列/react有哪些组件类型、如何写一个react组件？.md"};function l(c,a,i,r,o,m){return n(),p("div",null,[...a[0]||(a[0]=[e(`<p>**react组件的分类：**展示型组件和容器型组件</p><p>简单理解来说，容器型组件是一个页面容器，用来放置当前页面的所有展示型组件</p><p>展示型组件是具体到某一个小的组件模块，比如一个按钮，一个卡片，一个进度条等，我们在用react做组件化开发的时候，先定义好一个个小的展示型组件，然后把这些组件都导入容器型组件，最终组合成一个完整的页面。</p><p>记得看到某个社区有人问到展示型组件能不能嵌套容器型组件，我认为可以，比如有这样一个场景，有一个选择地区的容器组件，这个容器是一个公共模块，可能在任何页面的某个小模块触发该地区组件的调用。这个时候就是通过展示型组件嵌套容器组件的真实案例，也算是我在实际项目中遇到的需求。</p><p>下面我们来了解一个展示型组件和容器组件的写法有什么区别。</p><p><strong>1、展示型组件</strong></p><p>写法1：函数写法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { Component } from &amp;#039;react&amp;#039; //必须导入</span></span>
<span class="line"><span>//定义一个header函数，传入参数，返回一个jsx模板,函数名小写字母开头</span></span>
<span class="line"><span>exports const header = (params) =&amp;gt; {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        &amp;lt;div&amp;gt;{params}&amp;lt;/div&amp;gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>写法2：react组件写法</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { Component } from &amp;#039;react&amp;#039;</span></span>
<span class="line"><span>//定义一个react组件，组件名大写字母开头</span></span>
<span class="line"><span>exports class List extends React.Component {</span></span>
<span class="line"><span>    constructor(props) {</span></span>
<span class="line"><span>        super(props)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        const { data } = this.props</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>            &amp;lt;ul&amp;gt;</span></span>
<span class="line"><span>                {</span></span>
<span class="line"><span>                    data.length &amp;gt; 0 &amp;amp;&amp;amp; </span></span>
<span class="line"><span>                    data.map((element, index) =&amp;gt; {</span></span>
<span class="line"><span>                       &amp;lt;li key={index}&amp;gt;{element}&amp;lt;/li&amp;gt; </span></span>
<span class="line"><span>                    })</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            &amp;lt;/ul&amp;gt;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><strong>2、容器型组件</strong></p><p>容器组件和展示型组件类似，本质就是react组件，只不过是将各种展示型组件组合起来，只不过函数组件和react组件导入方式有所区别。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { Component } from &amp;#039;react&amp;#039;</span></span>
<span class="line"><span>import { header, List } from &amp;#039;./index&amp;#039;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//定义一个react容器，组件名大写字母开头</span></span>
<span class="line"><span>exports class Page extends React.Component {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        let data = [1, 2, 3, 4, 5]</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>            &amp;lt;div&amp;gt;</span></span>
<span class="line"><span>                {header(params)}</span></span>
<span class="line"><span>                &amp;lt;List data={data} /&amp;gt;</span></span>
<span class="line"><span>            &amp;lt;/div&amp;gt;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我发现很多前端工程师的代码格式乱七八糟，在这里也告诉那些代码格式混乱的同学，平时写代码要注意大小写，该空格的空格，该换行的换行，具体可以看看我上面写的几个组件的例子，好的代码习惯会让代码维护变得更加简单。</p>`,14)])])}const _=s(t,[["render",l]]);export{g as __pageData,_ as default};
