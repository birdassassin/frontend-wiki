import{_ as n,o as s,c as p,a2 as t}from"./chunks/framework.BWuWLRhz.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/react 15.5+ 使用CSSTransitionGroup实现路由过渡动画.md","filePath":"wiki/legacy/React系列/react 15.5+ 使用CSSTransitionGroup实现路由过渡动画.md"}'),e={name:"wiki/legacy/React系列/react 15.5+ 使用CSSTransitionGroup实现路由过渡动画.md"};function i(l,a,r,c,o,g){return s(),p("div",null,[...a[0]||(a[0]=[t(`<p>在做react项目过程中，有时候想实现app的那种上下左右切换路由的特效，但是一直没有找到合适的教程，要么说的不清楚，没有demo，要么就是版本太老，过时了，要抓狂啦😫。</p><p>根据网上搜到的资料，以前实现react动画有这么几种方式：</p><p>1、ReactCSSTransitionGroup</p><p>2、react-router-transition</p><p>3、还有的就是根据这2个库做了二次封装的一些动画插件。</p><p>但是，在这里我要分享的是 <a href="https://github.com/reactjs/react-transition-group" target="_blank" rel="noreferrer"><strong>react-transition-group</strong></a>，为什么是这个，而不是上面2个，因为这个动画插件兼容react15.4+版本，而且也是官方推荐的，上面2个插件只适合react老版本的动画。</p><h3 id="注意-该教程只对react-transition-group的v1-1-1版本有效。对v2无效。v2的api被作者改了。" tabindex="-1">注意，该教程只对react-transition-group的V1.1.1版本有效。对V2无效。V2的API被作者改了。 <a class="header-anchor" href="#注意-该教程只对react-transition-group的v1-1-1版本有效。对v2无效。v2的api被作者改了。" aria-label="Permalink to &quot;注意，该教程只对react-transition-group的V1.1.1版本有效。对V2无效。V2的API被作者改了。&quot;">​</a></h3><h4 id="安装-react-transition-group" tabindex="-1">安装 react-transition-group <a class="header-anchor" href="#安装-react-transition-group" aria-label="Permalink to &quot;安装 react-transition-group&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install react-transition-group --save</span></span></code></pre></div><h4 id="在react中使用-react-transition-group" tabindex="-1">在react中使用 react-transition-group <a class="header-anchor" href="#在react中使用-react-transition-group" aria-label="Permalink to &quot;在react中使用 react-transition-group&quot;">​</a></h4><p>我使用的版本是 <strong>react15.5 + react-router4 + redux3.6</strong></p><p>为什么要提到这3个插件？</p><p>答：非常关键，如果你的项目没有使用redux，那么请寻找其他动画方案。</p><p>原理：在路由外层使用 react-transition-group ，配置动画样式、同时你还需要一个唯一的key表示子节点。</p><p>我们知道，react-router4被设计成了组件，可以在react组件中任意位置使用，常常你在入口处需要用到react-router，因为你希望一打开首页，就要加载首页路由，还有可以从首页跳往其他页面的路由组件。</p><p>在 App.js中，关键代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import CSSTransitionGroup from &amp;#039;react-transition-group/CSSTransitionGroup&amp;#039;</span></span>
<span class="line"><span>import createHistory from &amp;#039;history/createHashHistory&amp;#039;</span></span>
<span class="line"><span>const history = createHistory()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default class App extends React.Component {</span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        const { animateCls } = this.props.global</span></span>
<span class="line"><span>        return (</span></span>
<span class="line"><span>            &amp;lt;Router history={history}&amp;gt;</span></span>
<span class="line"><span>              &amp;lt;Route render={({ location }) =&amp;gt; {</span></span>
<span class="line"><span>                  return(</span></span>
<span class="line"><span>                      &amp;lt;CSSTransitionGroup</span></span>
<span class="line"><span>                          transitionName={animateCls}</span></span>
<span class="line"><span>                          transitionEnter={true}</span></span>
<span class="line"><span>                          transitionLeave={true}</span></span>
<span class="line"><span>                          transitionEnterTimeout={400}</span></span>
<span class="line"><span>                          transitionLeaveTimeout={400}</span></span>
<span class="line"><span>                      &amp;gt;</span></span>
<span class="line"><span>                          &amp;lt;div key={location.pathname}&amp;gt;</span></span>
<span class="line"><span>                              &amp;lt;Route location={location} exact path=&amp;quot;/&amp;quot; component={Home} /&amp;gt;</span></span>
<span class="line"><span>                              &amp;lt;Route location={location} path=&amp;quot;/search&amp;quot; component={Search} /&amp;gt;</span></span>
<span class="line"><span>                          &amp;lt;/div&amp;gt;</span></span>
<span class="line"><span>                      &amp;lt;/CSSTransitionGroup&amp;gt;</span></span>
<span class="line"><span>                  )</span></span>
<span class="line"><span>              }}/&amp;gt;</span></span>
<span class="line"><span>          &amp;lt;/Router&amp;gt;</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>你应该关注这段代码的下面几个部分，或许你在github上都能看到官方文档，但是官方文档没有教我们如何控制不同页面的动画动态展示。</p><p>1、const { animateCls } = this.props.global</p><p>animateCls是存储在store中的变量，他用来表示动画的transitionName，也就是动画样式，store是什么？是redux中的数据存储核心，我们需要实现在不同状态下面，transitionName的动画样式会按照我们的需求而改变，比如从首页切换到二级页面，然后从2级页面返回到首页，这2个过程执行的动画是相反的，这时候我们不能把transitionName写死。</p><p>我写了一个action，来控制animateCls值的变化。这个action很简单，就是传入一个样式参数，当不同的状态的时候，传入不同的参数就能实现动画的定制了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export const currentAnimate = (cls) =&amp;gt; ({</span></span>
<span class="line"><span>    type: &amp;#039;CURRENT_ANIMATE&amp;#039;,</span></span>
<span class="line"><span>    cls</span></span>
<span class="line"><span>})</span></span></code></pre></div><p>熟悉redux的你，就会知道还需要写reducer。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const initState = {</span></span>
<span class="line"><span>    animateCls: &amp;#039;normal&amp;#039;, //过渡动画样式</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const global = (state = initState, action) =&amp;gt; {</span></span>
<span class="line"><span>    switch (action.type) {</span></span>
<span class="line"><span>        case &amp;quot;CURRENT_ANIMATE&amp;quot;:</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                ...state,</span></span>
<span class="line"><span>                animateCls: action.cls</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            return state</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>接着我们就回到了一开始的那一步，在组件中读取 const { animateCls } = this.props.global。</p><p>然后，我写了2个动画样式，一个是往左边移动、一个是往右边移动。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>/*路由切换动画——左移动*/</span></span>
<span class="line"><span>.left-enter {</span></span>
<span class="line"><span>    position: absolute;</span></span>
<span class="line"><span>    top: 0;</span></span>
<span class="line"><span>    background: #fff;</span></span>
<span class="line"><span>    z-index: 10000;</span></span>
<span class="line"><span>    opacity: 1;</span></span>
<span class="line"><span>    transform: translateX(100%);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.left-enter.left-enter-active {</span></span>
<span class="line"><span>    opacity: 1;</span></span>
<span class="line"><span>    transform: translateX(0);</span></span>
<span class="line"><span>    transition: all 0.4s ease-out;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.left-leave {</span></span>
<span class="line"><span>    opacity: 1;</span></span>
<span class="line"><span>    transform: translateX(0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.left-leave.left-leave-active {</span></span>
<span class="line"><span>    opacity: 1;</span></span>
<span class="line"><span>    transform: translateX(-100%);</span></span>
<span class="line"><span>    transition: all 0.4s ease-out;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*路由切换动画——右移动*/</span></span>
<span class="line"><span>.right-enter {</span></span>
<span class="line"><span>    transform: translateX(-100%);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.right-enter.right-enter-active {</span></span>
<span class="line"><span>    transform: translateX(0);</span></span>
<span class="line"><span>    transition: all 0.4s ease-out;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.right-leave {</span></span>
<span class="line"><span>    position: absolute;</span></span>
<span class="line"><span>    top: 0;</span></span>
<span class="line"><span>    background: #fff;</span></span>
<span class="line"><span>    z-index: 10000;</span></span>
<span class="line"><span>    opacity: 1;</span></span>
<span class="line"><span>    transform: translateX(0);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.right-leave.right-leave-active {</span></span>
<span class="line"><span>    opacity: 1;</span></span>
<span class="line"><span>    transform: translateX(100%);</span></span>
<span class="line"><span>    transition: all 0.4s ease-out;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>关于CSS3的知识，我就不解释了，以右移样式为例子，对每个参数做一下说明。</p><p>一个动画完整流程，满足下面4个样式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.right-enter {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.right-enter.right-enter-active {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.right-leave {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.right-leave.right-leave-active {}</span></span></code></pre></div><p>right表示的是 animateCls，也就是我们要动态设置的值，react动画分为进入和离开，很多人可能不太理解进入和离开到底指什么。</p><p><strong>enter：新路由进入的动画。</strong><strong>leave：旧路由离开的动画。</strong></p><p>比如，从二级页面返回首页，当你点击返回按钮后，二级页面执行的是leave的动画，首页执行的是enter的动画，2个动画执行是同时进行的。</p><p><strong>因为animateCls默认是normal，要让他改成right，只需要在当前组件中监听返回按钮的onClick事件，然后执行dispatch action，传入参数“right”。</strong></p><p><strong>但是这样做不是很完善，因为浏览器和app不同，浏览器有自己的返回按钮，所以你还需要监听浏览器的返回按钮。这一步我还没有完善好，相信对于熟悉监听事件的你来说，是个很容易完善的功能🤣，如果是做react-native，那么可以省去监听浏览器返回按钮的步骤。</strong></p><p>比如我只监听了网页中的返回按钮onCLick事件。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&amp;lt;Link to=&amp;quot;/&amp;quot; className=&amp;quot;style_a&amp;quot; onClick={() =&amp;gt; handleClick(&amp;#039;right&amp;#039;)}&amp;gt;返回首页&amp;lt;/Link&amp;gt;</span></span></code></pre></div><p>2、别忘了设置一个唯一的key，如果你的组件是一个列表，那么需要在map的时候设置一个key。</p><p>整体实现方案就这么多，喜欢使用react过渡动画的上吧。</p><p><strong>如果文章对你有帮助，请点击一下推荐。</strong></p>`,40)])])}const d=n(e,[["render",i]]);export{m as __pageData,d as default};
