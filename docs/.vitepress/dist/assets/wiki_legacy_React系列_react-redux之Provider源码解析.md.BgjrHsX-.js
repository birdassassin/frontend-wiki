import{_ as r,o as t,c as o,a2 as n}from"./chunks/framework.BWuWLRhz.js";const l=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/react-redux之Provider源码解析.md","filePath":"wiki/legacy/React系列/react-redux之Provider源码解析.md"}'),p={name:"wiki/legacy/React系列/react-redux之Provider源码解析.md"};function a(i,e,s,d,c,m){return t(),o("div",null,[...e[0]||(e[0]=[n(`<h4 id="react-redux简介" tabindex="-1">react-redux简介 <a class="header-anchor" href="#react-redux简介" aria-label="Permalink to &quot;react-redux简介&quot;">​</a></h4><p>redux是一个数据管理框架，而react-redux是专门针对react开发的一个插件。react-redux提供了2个API，<strong>Provider</strong>和<strong>connect</strong>。本来打算在一篇文章同时讲解2个API的实现，不过看了一下connect的源码，368行，还是分开解析吧。</p><p>本文带领大家分析<strong>Provider</strong>的核心代码。</p><h4 id="如何使用provider" tabindex="-1">如何使用Provider <a class="header-anchor" href="#如何使用provider" aria-label="Permalink to &quot;如何使用Provider&quot;">​</a></h4><p>我们先了解在react项目中是如何使用Provider。</p><pre><code>import &amp;#123; Provider &amp;#125; from &#39;react-redux&#39;;
import configureStore from &#39;./store/configureStore&#39;;

const store = configureStore();
ReactDOM.render((
    &amp;lt;Provider store=&amp;#123;store&amp;#125;&amp;gt;
        
    &amp;lt;/Provider&amp;gt;),
    document.getElementById(&#39;root&#39;)
);
</code></pre><p>上面的代码可以看出，使用Provider分为下面几个步骤：</p><p><strong>1、导入Provider</strong> 这里跟小白分享一个小知识，你可以看到Provider加了个大括号，而第二个import configureStore没有加大括号，这是因为react-redux的文件中没有指定default输出。如果指定了export default，则不需要加大括号，注意一个js文件只能有一个default。</p><pre><code>import &amp;#123; Provider &amp;#125; from &#39;react-redux&#39;;
</code></pre><p><strong>2、将store作为参数传入Provider。</strong></p><pre><code>&amp;lt;Provider store=&amp;#123;store&amp;#125;&amp;gt;
    
&amp;lt;/Provider&amp;gt;
</code></pre><h4 id="provider源码" tabindex="-1">Provider源码 <a class="header-anchor" href="#provider源码" aria-label="Permalink to &quot;Provider源码&quot;">​</a></h4><pre><code>import &amp;#123; Component, Children &amp;#125; from &#39;react&#39;
import PropTypes from &#39;prop-types&#39;
import storeShape from &#39;../utils/storeShape&#39;
import warning from &#39;../utils/warning&#39;

let didWarnAboutReceivingStore = false
function warnAboutReceivingStore() &amp;#123;
  if (didWarnAboutReceivingStore) &amp;#123;
    return
  &amp;#125;
  didWarnAboutReceivingStore = true

  warning(
    &#39;&amp;lt;Provider&amp;gt; does not support changing \`store\` on the fly. &#39; +
    &#39;It is most likely that you see this error because you updated to &#39; +
    &#39;Redux 2.x and React Redux 2.x which no longer hot reload reducers &#39; +
    &#39;automatically. See https://github.com/reactjs/react-redux/releases/&#39; +
    &#39;tag/v2.0.0 for the migration instructions.&#39;
  )
&amp;#125;

export default class Provider extends Component &amp;#123;
  getChildContext() &amp;#123;
    return &amp;#123; store: this.store &amp;#125;
  &amp;#125;

  constructor(props, context) &amp;#123;
    super(props, context)
    this.store = props.store
  &amp;#125;

  render() &amp;#123;
    return Children.only(this.props.children)
  &amp;#125;
&amp;#125;

if (process.env.NODE_ENV !== &#39;production&#39;) &amp;#123;
  Provider.prototype.componentWillReceiveProps = function (nextProps) &amp;#123;
    const &amp;#123; store &amp;#125; = this
    const &amp;#123; store: nextStore &amp;#125; = nextProps

    if (store !== nextStore) &amp;#123;
      warnAboutReceivingStore()
    &amp;#125;
  &amp;#125;
&amp;#125;

Provider.propTypes = &amp;#123;
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired
&amp;#125;
Provider.childContextTypes = &amp;#123;
  store: storeShape.isRequired
&amp;#125;
</code></pre><h4 id="provider源码解析" tabindex="-1">Provider源码解析 <a class="header-anchor" href="#provider源码解析" aria-label="Permalink to &quot;Provider源码解析&quot;">​</a></h4><p>Provider只有一个参数，非常简单，代码也仅有55行。</p><p><strong>1、Provider是一个react组件</strong></p><pre><code>import &amp;#123; Component, Children &amp;#125; from &#39;react&#39;
import PropTypes from &#39;prop-types&#39;
import storeShape from &#39;../utils/storeShape&#39;
import warning from &#39;../utils/warning&#39;

export default class Provider extends Component &amp;#123;
  getChildContext() &amp;#123;
    return &amp;#123; store: this.store &amp;#125;
  &amp;#125;

  constructor(props, context) &amp;#123;
    super(props, context)
    this.store = props.store
  &amp;#125;

  render() &amp;#123;
    return Children.only(this.props.children)
  &amp;#125;
&amp;#125;
</code></pre><p>Provider组件写了3个方法，<strong>getChildContext、constructor、render</strong>。</p><p>constructor是构造方法，this.store = props.store中的this表示当前的组件。在构造函数定义this.store的作用是为了能够在getChildContext方法中读取到store。</p><p>你最不熟悉的可能就是getChildContext，翻译过来就是上下文。什么意思呢？又有什么用呢？我们看到getChildContext方法是返回store。接着，就看不到store哪去了。</p><p>最后执行render渲染，返回一个react子元素。Children.only是react提供的方法，this.props.children表示的是只有一个root的元素。</p><p><strong>2、给Provider组件设置propTypes验证。storeShape是一个封装的方法。</strong></p><pre><code>Provider.propTypes = &amp;#123;
    store: storeShape.isRequired,
    children: PropTypes.element.isRequired
&amp;#125;


//storeShape
import PropTypes from &#39;prop-types&#39;

export default PropTypes.shape(&amp;#123;
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
&amp;#125;)
</code></pre><p><strong>3、验证childContextTypes</strong> 它的作用就是让Provider下面的子组件能够访问到store。 详细解释和用法看 <a href="https://facebook.github.io/react/docs/context.html" target="_blank" rel="noreferrer">react关于context的介绍</a></p><pre><code>Provider.childContextTypes = &amp;#123;
  store: storeShape.isRequired
&amp;#125;
</code></pre><p><strong>4、node运行环境判断</strong> 如果不是生产环境，也就是在开发环境中，实现componentWillReceiveProps()。</p><pre><code>if (process.env.NODE_ENV !== &#39;production&#39;) &amp;#123;
  Provider.prototype.componentWillReceiveProps = function (nextProps) &amp;#123;
    const &amp;#123; store &amp;#125; = this
    const &amp;#123; store: nextStore &amp;#125; = nextProps

    if (store !== nextStore) &amp;#123;
      warnAboutReceivingStore()
    &amp;#125;
  &amp;#125;
&amp;#125;
</code></pre><p><strong>其实也可以把这段代码写到Provider组件内部去。</strong></p><p>他的作用是当接收到新的props的时候，如果是在开发环境下，就判断当前的store和下一个store是不是不相等，如果是，就执行warnAboutReceivingStore()。</p><pre><code>export default class Provider extends Component &amp;#123;
  
  componentWillReceiveProps(nextProps) &amp;#123;
    if (process.env.NODE_ENV !== &#39;production&#39;) &amp;#123;
      const &amp;#123; store &amp;#125; = this
      const &amp;#123; store: nextStore &amp;#125; = nextProps

      if (store !== nextStore) &amp;#123;
        warnAboutReceivingStore()
      &amp;#125;
    &amp;#125;
  &amp;#125;
  
  render() &amp;#123;
    return Children.only(this.props.children)
  &amp;#125;
&amp;#125;
</code></pre><p><strong>5、warnAboutReceivingStore的作用。</strong> 上面说到执行了warnAboutReceivingStore，那么warnAboutReceivingStore的作用是什么呢？</p><pre><code>    let didWarnAboutReceivingStore = false
    function warnAboutReceivingStore() &amp;#123;
      if (didWarnAboutReceivingStore) &amp;#123;
        return
      &amp;#125;
      didWarnAboutReceivingStore = true
      
      warning(
    &#39;&amp;lt;Provider&amp;gt; does not support changing \`store\` on the fly. &#39; +
    &#39;It is most likely that you see this error because you updated to &#39; +
    &#39;Redux 2.x and React Redux 2.x which no longer hot reload reducers &#39; +
    &#39;automatically. See https://github.com/reactjs/react-redux/releases/&#39; +
    &#39;tag/v2.0.0 for the migration instructions.&#39;
  )
</code></pre><p>didWarnAboutReceivingStore是一个开关的作用，默认是false，也就是不执行warning操作。当props更新的时候，执行了warnAboutReceivingStore()，如果didWarnAboutReceivingStore为true，则return，否则就将didWarnAboutReceivingStore设置为true。然后就会执行warning的警告机制。</p><p>这样做的目的是不允许在componentWillReceiveProps做store的更新操作。</p><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h4><p>很快就到尾声了，Provider是一个react组件，提供了一个参数store，然后渲染了一个子组件，我们通常把路由渲染成子组件，最后还处理了一个异常情况，提供了warning提示。</p><p>大部分时候是这样用的。在react-router4中，也支持这种写法，Provider也可以直接嵌套在自定义的react组件中。</p><pre><code>&amp;lt;Provider store=&amp;#123;store&amp;#125;&amp;gt;
      &amp;lt;Router history=&amp;#123;hashHistory&amp;#125;&amp;gt;
            &amp;#123;routes&amp;#125;
      &amp;lt;/Router&amp;gt;
&amp;lt;/Provider&amp;gt;
</code></pre>`,38)])])}const h=r(p,[["render",a]]);export{l as __pageData,h as default};
