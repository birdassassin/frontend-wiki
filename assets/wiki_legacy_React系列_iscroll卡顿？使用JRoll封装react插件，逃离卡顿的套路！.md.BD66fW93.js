import{_ as e,o as a,c as r,a2 as l}from"./chunks/framework.BWuWLRhz.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/iscroll卡顿？使用JRoll封装react插件，逃离卡顿的套路！.md","filePath":"wiki/legacy/React系列/iscroll卡顿？使用JRoll封装react插件，逃离卡顿的套路！.md"}'),o={name:"wiki/legacy/React系列/iscroll卡顿？使用JRoll封装react插件，逃离卡顿的套路！.md"};function p(n,t,m,s,i,c){return a(),r("div",null,[...t[0]||(t[0]=[l(`<p>这次分享一个react移动端封装滚动插件。</p><p>我们在做移动端垂直滚动的时候，会出现各种问题，卡顿、穿透、兼容性，最不能容忍的是卡顿，比如使用 <a href="https://github.com/cubiq/iscroll" target="_blank" rel="noreferrer">IScroll5</a>的时候，<strong>使用transition来实时计算滚动的状态，非常消耗性能</strong>，你能百度搜索到的各种iscroll卡顿解决方案都尝试了，最后还是不得不放弃，在IOS上的体验还行，但是在Android的滚动体验，一个字：cao。</p><p>然后，我就使用了 <a href="https://github.com/chjtx/JRoll" target="_blank" rel="noreferrer">JRoll2</a>，该作者使用的是translate滚动方式，大大减小了卡顿的情况，打开京东移动端网站，点击底bar的分类，然后左侧的分类导航就是使用translate的滚动方式实现的。</p><p>Iscroll和JRoll使用的方式几乎一样，我仅仅改变了一个require(&#39;Iscroll&#39;) =&gt; require(&#39;jroll&#39;)，就能无缝切换。</p><p>下面就讲解封装JRoll和具体使用的方法。</p><h4 id="封装jroll" tabindex="-1">封装JRoll <a class="header-anchor" href="#封装jroll" aria-label="Permalink to &quot;封装JRoll&quot;">​</a></h4><p>新建一个MyScroll.js：jroll体积非常小，用起来很方便，我简单封装了3个配置参数<strong>ID</strong>和<strong>height</strong>、<strong>children</strong>。ID是配置div容器的id属性，height是指div容器的高度（必须设置），children是滚动的元素列表。</p><p>我们在componentDidMount实例化jroll对象，当componentDidUpdate的时候，也就是数据发生更新的时候，滚动区域的高度可能发生了变化，那么执行refresh重新计算滚动区域。你如果需要更强大的配置，还可以添加option参数的设置，在这里我就采用默认配置。</p><pre><code>import React from &#39;react&#39;
const JRoll = require(&#39;jroll&#39;)

export default class MyJRoll extends React.Component &amp;#123;
    constructor(props) &amp;#123;
        super(props)
        this.jroll = null
    &amp;#125;
    componentDidMount() &amp;#123;
        let wrappers = this.props.ID || &#39;wrappers&#39;
        this.jroll = new JRoll(\`#$&amp;#123;wrappers&amp;#125;\`)
        this.jroll.refresh()
    &amp;#125;
    componentDidUpdate() &amp;#123;
        this.jroll.refresh()
    &amp;#125;
    render() &amp;#123;
        const &amp;#123; height &amp;#125; = this.props
        return (
            &amp;lt;div id=&amp;#123;this.props.ID ? this.props.ID : &#39;wrappers&#39;&amp;#125; style=&amp;#123;&amp;#123;height: height ? height : &quot;100%&quot;&amp;#125;&amp;#125;&amp;gt;
                &amp;lt;ul id=&quot;scroller&quot;&amp;gt;
                    &amp;#123;this.props.children&amp;#125;
                &amp;lt;/ul&amp;gt;
            &amp;lt;/div&amp;gt;
        )
    &amp;#125;
&amp;#125;
</code></pre><h4 id="在react组件中使用myscroll-js" tabindex="-1">在react组件中使用MyScroll.js <a class="header-anchor" href="#在react组件中使用myscroll-js" aria-label="Permalink to &quot;在react组件中使用MyScroll.js&quot;">​</a></h4><p><strong>记住，一定要给滚动容器设置一个具体的高度</strong>，最好的办法是在组件渲染完成之后，去计算滚动区域需要的高度，然后设置给state，如果你使用了redux，那么传递到store里面保存这个高度。在组件内设置state可能存在异步无法即使更新的问题，但是在store中保存和读取就不存在。</p><pre><code>import React from &#39;react&#39;
import MyScroll from &#39;./MyScroll&#39;
export class ReportPage extends React.Component &amp;#123;
    constructor(props) &amp;#123;
        super(props)
        this.state = &amp;#123;
            scrollHeight: 0
        &amp;#125;
    &amp;#125;
    
    componentDidMount() &amp;#123;
        //1、使用函数获取你当前MyScroll的滚动高度
        //2、将计算出来的高度存储到state或者store
        //这2个步骤推荐封装成一个函数。
        this.setState(&amp;#123;scrollHeight: newHeight + &#39;px&#39;&amp;#125;)
    &amp;#125;
    
    render() &amp;#123;
        return (
            &amp;lt;MyScroll ID=&quot;myWrapper&quot; height=&amp;#123;this.state.scrollHeight&amp;#125; ref=&amp;#123;myRoll =&amp;gt; this.myRoll = myRoll&amp;#125;&gt;
                  &amp;lt;div&amp;gt;1&amp;lt;/div&amp;gt;
                  &amp;lt;div&amp;gt;2&amp;lt;/div&amp;gt;
                  &amp;lt;div&amp;gt;3&amp;lt;/div&amp;gt;
            &amp;lt;/MyScroll&amp;gt;
        )
    &amp;#125;
&amp;#125;
</code></pre><h4 id="额外的一些操作" tabindex="-1">额外的一些操作 <a class="header-anchor" href="#额外的一些操作" aria-label="Permalink to &quot;额外的一些操作&quot;">​</a></h4><p>1、推荐在移动端添加FastClick插件解决移动端点击事件的一些bug。</p><p>2、在全局使用MyScroll滚动插件，你需要全局设置下面的代码，禁用触摸的默认事件，设置html/body的高度。</p><pre><code>document.addEventListener(&#39;touchmove&#39;, (event) =&gt; event.preventDefault(), false);


html, body &amp;#123;
    height: 100%
&amp;#125;
</code></pre><p>3、在组件内部使用滚动插件，你需要在组件内部的componentDidMount()设置禁用函数，并且在卸载组件的时候取消禁用。</p><pre><code>componentDidMonut() &amp;#123;
    document.addEventListener(&#39;touchmove&#39;, this.handler(), false);
&amp;#125;

handler() &amp;#123;
    event.preventDefault()
&amp;#125;

componentWillUnmount() &amp;#123;
    document.removeEventListener(&#39;touchmove&#39;, this.handler(), false);
&amp;#125;
</code></pre><p>4、支持MyScroll插件嵌套使用，请使用新的ID命名和高度。</p><pre><code>&amp;lt;MyScroll ID=&quot;myWrapper&quot; height=&amp;#123;this.state.scrollHeight&amp;#125; ref=&amp;#123;myRoll =&amp;gt; this.myRoll = myRoll&amp;#125;&gt;
         &amp;lt;div&amp;gt;1&amp;lt;/div&amp;gt;
         &amp;lt;MyScroll ID=&quot;childWrapper&quot; height=&amp;#123;this.state.childHeight&amp;#125; ref=&amp;#123;childRoll =&amp;gt; this.childRoll = childRoll&amp;#125;&gt;
         &amp;lt;/MyScroll&amp;gt;
&amp;lt;/MyScroll&amp;gt;
</code></pre><p><strong>如果文章对你有帮助，请点击一下推荐。</strong></p>`,21)])])}const g=e(o,[["render",p]]);export{d as __pageData,g as default};
