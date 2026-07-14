import{_ as s,o as a,c as p,a2 as e}from"./chunks/framework.BWuWLRhz.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/react-redux之connect方法解析.md","filePath":"wiki/legacy/React系列/react-redux之connect方法解析.md"}'),t={name:"wiki/legacy/React系列/react-redux之connect方法解析.md"};function r(o,n,l,c,i,d){return a(),p("div",null,[...n[0]||(n[0]=[e(`<h4 id="connect简介" tabindex="-1">connect简介 <a class="header-anchor" href="#connect简介" aria-label="Permalink to &quot;connect简介&quot;">​</a></h4><p><strong>前方高能预警，有耐心才能看完文章！！</strong></p><p>react-redux仅有2个API，Provider和connect，Provider提供的是一个顶层容器的作用，实现store的上下文传递。</p><p>connect方法比较复杂，虽然代码只有368行，但是为redux中常用的功能实现了和react连接的建立。</p><p><strong>一个基础的connect方法如下：</strong></p><pre><code>connect(mapStateToProps, mapDispatchToProps, mergeProps, options = &amp;#123;&amp;#125;) 
</code></pre><h4 id="为什么我们需要react-redux" tabindex="-1">为什么我们需要react-redux？ <a class="header-anchor" href="#为什么我们需要react-redux" aria-label="Permalink to &quot;为什么我们需要react-redux？&quot;">​</a></h4><p>熟悉redux的人可能知道，redux是数据存储和管理的工具，但是想要在react中使用redux，并不能直接将store、action和react组件建立连接，所以就需要react-redux来结合react和redux。</p><p>react-redux文件体积非常小，你完全不需要担心给你的项目带来太多的垃圾代码。</p><h4 id="从何处开始解析react-redux源码" tabindex="-1">从何处开始解析react-redux源码？ <a class="header-anchor" href="#从何处开始解析react-redux源码" aria-label="Permalink to &quot;从何处开始解析react-redux源码？&quot;">​</a></h4><p>1、在JavaScript中，读懂别人的代码文件，你首先应该看的是函数的入口。</p><p>2、找到函数入口，然后看有哪些参数。</p><p>3、看看导入了哪些额外的插件，每个插件的作用大概预测一下。</p><p>4、进入函数体进行解读。在react插件中解读函数有一个好处，就是react插件大部分都是采用了react组件的写法，你可以在react插件中看到很多react组件的影子。而不是像jQuery那样到处都是扩展性的方法，每个方法都有自己的设计模式，没有统一的规律可循。</p><h4 id="react-redux使用场景" tabindex="-1">react-redux使用场景 <a class="header-anchor" href="#react-redux使用场景" aria-label="Permalink to &quot;react-redux使用场景&quot;">​</a></h4><p>下面这个官方例子展示了mapStateToProps和mapDispatchToProps的使用方法。</p><pre><code>import * as todoActionCreators from &#39;./todoActionCreators&#39;
import * as counterActionCreators from &#39;./counterActionCreators&#39;
import &amp;#123; bindActionCreators &amp;#125; from &#39;redux&#39;

function mapStateToProps(state) &amp;#123;
  return &amp;#123; todos: state.todos &amp;#125;
&amp;#125;

function mapDispatchToProps(dispatch) &amp;#123;
  return &amp;#123;
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch)
  &amp;#125;
&amp;#125;

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
</code></pre><p>mergeProps的用法： import * as actionCreators from &#39;./actionCreators&#39;</p><pre><code>function mapStateToProps(state) &amp;#123;
  return &amp;#123; todos: state.todos &amp;#125;
&amp;#125;

function mergeProps(stateProps, dispatchProps, ownProps) &amp;#123;
  return Object.assign(&amp;#123;&amp;#125;, ownProps, &amp;#123;
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) =&gt; dispatchProps.addTodo(ownProps.userId, text)
  &amp;#125;)
&amp;#125;

export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)
</code></pre><h4 id="connect源码解析" tabindex="-1">connect源码解析 <a class="header-anchor" href="#connect源码解析" aria-label="Permalink to &quot;connect源码解析&quot;">​</a></h4><p><strong>源码有点长，你可以选择性的查看：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { Component, createElement } from &amp;#039;react&amp;#039;</span></span>
<span class="line"><span>import storeShape from &amp;#039;../utils/storeShape&amp;#039;</span></span>
<span class="line"><span>import shallowEqual from &amp;#039;../utils/shallowEqual&amp;#039;</span></span>
<span class="line"><span>import wrapActionCreators from &amp;#039;../utils/wrapActionCreators&amp;#039;</span></span>
<span class="line"><span>import warning from &amp;#039;../utils/warning&amp;#039;</span></span>
<span class="line"><span>import isPlainObject from &amp;#039;lodash/isPlainObject&amp;#039;</span></span>
<span class="line"><span>import hoistStatics from &amp;#039;hoist-non-react-statics&amp;#039;</span></span>
<span class="line"><span>import invariant from &amp;#039;invariant&amp;#039;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const defaultMapStateToProps = state =&amp;gt; ({}) // eslint-disable-line no-unused-vars</span></span>
<span class="line"><span>const defaultMapDispatchToProps = dispatch =&amp;gt; ({ dispatch })</span></span>
<span class="line"><span>const defaultMergeProps = (stateProps, dispatchProps, parentProps) =&amp;gt; ({</span></span>
<span class="line"><span>  ...parentProps,</span></span>
<span class="line"><span>  ...stateProps,</span></span>
<span class="line"><span>  ...dispatchProps</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function getDisplayName(WrappedComponent) {</span></span>
<span class="line"><span>  return WrappedComponent.displayName || WrappedComponent.name || &amp;#039;Component&amp;#039;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let errorObject = { value: null }</span></span>
<span class="line"><span>function tryCatch(fn, ctx) {</span></span>
<span class="line"><span>  try {</span></span>
<span class="line"><span>    return fn.apply(ctx)</span></span>
<span class="line"><span>  } catch (e) {</span></span>
<span class="line"><span>    errorObject.value = e</span></span>
<span class="line"><span>    return errorObject</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Helps track hot reloading.</span></span>
<span class="line"><span>let nextVersion = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {</span></span>
<span class="line"><span>  const shouldSubscribe = Boolean(mapStateToProps)</span></span>
<span class="line"><span>  const mapState = mapStateToProps || defaultMapStateToProps</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  let mapDispatch</span></span>
<span class="line"><span>  if (typeof mapDispatchToProps === &amp;#039;function&amp;#039;) {</span></span>
<span class="line"><span>    mapDispatch = mapDispatchToProps</span></span>
<span class="line"><span>  } else if (!mapDispatchToProps) {</span></span>
<span class="line"><span>    mapDispatch = defaultMapDispatchToProps</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    mapDispatch = wrapActionCreators(mapDispatchToProps)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  const finalMergeProps = mergeProps || defaultMergeProps</span></span>
<span class="line"><span>  const { pure = true, withRef = false } = options</span></span>
<span class="line"><span>  const checkMergedEquals = pure &amp;amp;&amp;amp; finalMergeProps !== defaultMergeProps</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  // Helps track hot reloading.</span></span>
<span class="line"><span>  const version = nextVersion++</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return function wrapWithConnect(WrappedComponent) {</span></span>
<span class="line"><span>    const connectDisplayName = \`Connect(\${getDisplayName(WrappedComponent)})\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function checkStateShape(props, methodName) {</span></span>
<span class="line"><span>      if (!isPlainObject(props)) {</span></span>
<span class="line"><span>        warning(</span></span>
<span class="line"><span>          \`\${methodName}() in \${connectDisplayName} must return a plain object. \` +</span></span>
<span class="line"><span>          \`Instead received \${props}.\`</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    function computeMergedProps(stateProps, dispatchProps, parentProps) {</span></span>
<span class="line"><span>      const mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps)</span></span>
<span class="line"><span>      if (process.env.NODE_ENV !== &amp;#039;production&amp;#039;) {</span></span>
<span class="line"><span>        checkStateShape(mergedProps, &amp;#039;mergeProps&amp;#039;)</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      return mergedProps</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    class Connect extends Component {</span></span>
<span class="line"><span>      shouldComponentUpdate() {</span></span>
<span class="line"><span>        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      constructor(props, context) {</span></span>
<span class="line"><span>        super(props, context)</span></span>
<span class="line"><span>        this.version = version</span></span>
<span class="line"><span>        this.store = props.store || context.store</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        invariant(this.store,</span></span>
<span class="line"><span>          \`Could not find &amp;quot;store&amp;quot; in either the context or \` +</span></span>
<span class="line"><span>          \`props of &amp;quot;\${connectDisplayName}&amp;quot;. \` +</span></span>
<span class="line"><span>          \`Either wrap the root component in a &amp;lt;Provider&amp;gt;, \` +</span></span>
<span class="line"><span>          \`or explicitly pass &amp;quot;store&amp;quot; as a prop to &amp;quot;\${connectDisplayName}&amp;quot;.\`</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        const storeState = this.store.getState()</span></span>
<span class="line"><span>        this.state = { storeState }</span></span>
<span class="line"><span>        this.clearCache()</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      computeStateProps(store, props) {</span></span>
<span class="line"><span>        if (!this.finalMapStateToProps) {</span></span>
<span class="line"><span>          return this.configureFinalMapState(store, props)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        const state = store.getState()</span></span>
<span class="line"><span>        const stateProps = this.doStatePropsDependOnOwnProps ?</span></span>
<span class="line"><span>          this.finalMapStateToProps(state, props) :</span></span>
<span class="line"><span>          this.finalMapStateToProps(state)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (process.env.NODE_ENV !== &amp;#039;production&amp;#039;) {</span></span>
<span class="line"><span>          checkStateShape(stateProps, &amp;#039;mapStateToProps&amp;#039;)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return stateProps</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      configureFinalMapState(store, props) {</span></span>
<span class="line"><span>        const mappedState = mapState(store.getState(), props)</span></span>
<span class="line"><span>        const isFactory = typeof mappedState === &amp;#039;function&amp;#039;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.finalMapStateToProps = isFactory ? mappedState : mapState</span></span>
<span class="line"><span>        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (isFactory) {</span></span>
<span class="line"><span>          return this.computeStateProps(store, props)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (process.env.NODE_ENV !== &amp;#039;production&amp;#039;) {</span></span>
<span class="line"><span>          checkStateShape(mappedState, &amp;#039;mapStateToProps&amp;#039;)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return mappedState</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      computeDispatchProps(store, props) {</span></span>
<span class="line"><span>        if (!this.finalMapDispatchToProps) {</span></span>
<span class="line"><span>          return this.configureFinalMapDispatch(store, props)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        const { dispatch } = store</span></span>
<span class="line"><span>        const dispatchProps = this.doDispatchPropsDependOnOwnProps ?</span></span>
<span class="line"><span>          this.finalMapDispatchToProps(dispatch, props) :</span></span>
<span class="line"><span>          this.finalMapDispatchToProps(dispatch)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (process.env.NODE_ENV !== &amp;#039;production&amp;#039;) {</span></span>
<span class="line"><span>          checkStateShape(dispatchProps, &amp;#039;mapDispatchToProps&amp;#039;)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return dispatchProps</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      configureFinalMapDispatch(store, props) {</span></span>
<span class="line"><span>        const mappedDispatch = mapDispatch(store.dispatch, props)</span></span>
<span class="line"><span>        const isFactory = typeof mappedDispatch === &amp;#039;function&amp;#039;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch</span></span>
<span class="line"><span>        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (isFactory) {</span></span>
<span class="line"><span>          return this.computeDispatchProps(store, props)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (process.env.NODE_ENV !== &amp;#039;production&amp;#039;) {</span></span>
<span class="line"><span>          checkStateShape(mappedDispatch, &amp;#039;mapDispatchToProps&amp;#039;)</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return mappedDispatch</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      updateStatePropsIfNeeded() {</span></span>
<span class="line"><span>        const nextStateProps = this.computeStateProps(this.store, this.props)</span></span>
<span class="line"><span>        if (this.stateProps &amp;amp;&amp;amp; shallowEqual(nextStateProps, this.stateProps)) {</span></span>
<span class="line"><span>          return false</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.stateProps = nextStateProps</span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      updateDispatchPropsIfNeeded() {</span></span>
<span class="line"><span>        const nextDispatchProps = this.computeDispatchProps(this.store, this.props)</span></span>
<span class="line"><span>        if (this.dispatchProps &amp;amp;&amp;amp; shallowEqual(nextDispatchProps, this.dispatchProps)) {</span></span>
<span class="line"><span>          return false</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.dispatchProps = nextDispatchProps</span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      updateMergedPropsIfNeeded() {</span></span>
<span class="line"><span>        const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)</span></span>
<span class="line"><span>        if (this.mergedProps &amp;amp;&amp;amp; checkMergedEquals &amp;amp;&amp;amp; shallowEqual(nextMergedProps, this.mergedProps)) {</span></span>
<span class="line"><span>          return false</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.mergedProps = nextMergedProps</span></span>
<span class="line"><span>        return true</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      isSubscribed() {</span></span>
<span class="line"><span>        return typeof this.unsubscribe === &amp;#039;function&amp;#039;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      trySubscribe() {</span></span>
<span class="line"><span>        if (shouldSubscribe &amp;amp;&amp;amp; !this.unsubscribe) {</span></span>
<span class="line"><span>          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))</span></span>
<span class="line"><span>          this.handleChange()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      tryUnsubscribe() {</span></span>
<span class="line"><span>        if (this.unsubscribe) {</span></span>
<span class="line"><span>          this.unsubscribe()</span></span>
<span class="line"><span>          this.unsubscribe = null</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      componentDidMount() {</span></span>
<span class="line"><span>        this.trySubscribe()</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      componentWillReceiveProps(nextProps) {</span></span>
<span class="line"><span>        if (!pure || !shallowEqual(nextProps, this.props)) {</span></span>
<span class="line"><span>          this.haveOwnPropsChanged = true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      componentWillUnmount() {</span></span>
<span class="line"><span>        this.tryUnsubscribe()</span></span>
<span class="line"><span>        this.clearCache()</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      clearCache() {</span></span>
<span class="line"><span>        this.dispatchProps = null</span></span>
<span class="line"><span>        this.stateProps = null</span></span>
<span class="line"><span>        this.mergedProps = null</span></span>
<span class="line"><span>        this.haveOwnPropsChanged = true</span></span>
<span class="line"><span>        this.hasStoreStateChanged = true</span></span>
<span class="line"><span>        this.haveStatePropsBeenPrecalculated = false</span></span>
<span class="line"><span>        this.statePropsPrecalculationError = null</span></span>
<span class="line"><span>        this.renderedElement = null</span></span>
<span class="line"><span>        this.finalMapDispatchToProps = null</span></span>
<span class="line"><span>        this.finalMapStateToProps = null</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      handleChange() {</span></span>
<span class="line"><span>        if (!this.unsubscribe) {</span></span>
<span class="line"><span>          return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        const storeState = this.store.getState()</span></span>
<span class="line"><span>        const prevStoreState = this.state.storeState</span></span>
<span class="line"><span>        if (pure &amp;amp;&amp;amp; prevStoreState === storeState) {</span></span>
<span class="line"><span>          return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (pure &amp;amp;&amp;amp; !this.doStatePropsDependOnOwnProps) {</span></span>
<span class="line"><span>          const haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this)</span></span>
<span class="line"><span>          if (!haveStatePropsChanged) {</span></span>
<span class="line"><span>            return</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>          if (haveStatePropsChanged === errorObject) {</span></span>
<span class="line"><span>            this.statePropsPrecalculationError = errorObject.value</span></span>
<span class="line"><span>          }</span></span>
<span class="line"><span>          this.haveStatePropsBeenPrecalculated = true</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.hasStoreStateChanged = true</span></span>
<span class="line"><span>        this.setState({ storeState })</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      getWrappedInstance() {</span></span>
<span class="line"><span>        invariant(withRef,</span></span>
<span class="line"><span>          \`To access the wrapped instance, you need to specify \` +</span></span>
<span class="line"><span>          \`{ withRef: true } as the fourth argument of the connect() call.\`</span></span>
<span class="line"><span>        )</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return this.refs.wrappedInstance</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      render() {</span></span>
<span class="line"><span>        const {</span></span>
<span class="line"><span>          haveOwnPropsChanged,</span></span>
<span class="line"><span>          hasStoreStateChanged,</span></span>
<span class="line"><span>          haveStatePropsBeenPrecalculated,</span></span>
<span class="line"><span>          statePropsPrecalculationError,</span></span>
<span class="line"><span>          renderedElement</span></span>
<span class="line"><span>        } = this</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        this.haveOwnPropsChanged = false</span></span>
<span class="line"><span>        this.hasStoreStateChanged = false</span></span>
<span class="line"><span>        this.haveStatePropsBeenPrecalculated = false</span></span>
<span class="line"><span>        this.statePropsPrecalculationError = null</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (statePropsPrecalculationError) {</span></span>
<span class="line"><span>          throw statePropsPrecalculationError</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let shouldUpdateStateProps = true</span></span>
<span class="line"><span>        let shouldUpdateDispatchProps = true</span></span>
<span class="line"><span>        if (pure &amp;amp;&amp;amp; renderedElement) {</span></span>
<span class="line"><span>          shouldUpdateStateProps = hasStoreStateChanged || (</span></span>
<span class="line"><span>            haveOwnPropsChanged &amp;amp;&amp;amp; this.doStatePropsDependOnOwnProps</span></span>
<span class="line"><span>          )</span></span>
<span class="line"><span>          shouldUpdateDispatchProps =</span></span>
<span class="line"><span>            haveOwnPropsChanged &amp;amp;&amp;amp; this.doDispatchPropsDependOnOwnProps</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let haveStatePropsChanged = false</span></span>
<span class="line"><span>        let haveDispatchPropsChanged = false</span></span>
<span class="line"><span>        if (haveStatePropsBeenPrecalculated) {</span></span>
<span class="line"><span>          haveStatePropsChanged = true</span></span>
<span class="line"><span>        } else if (shouldUpdateStateProps) {</span></span>
<span class="line"><span>          haveStatePropsChanged = this.updateStatePropsIfNeeded()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        if (shouldUpdateDispatchProps) {</span></span>
<span class="line"><span>          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded()</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        let haveMergedPropsChanged = true</span></span>
<span class="line"><span>        if (</span></span>
<span class="line"><span>          haveStatePropsChanged ||</span></span>
<span class="line"><span>          haveDispatchPropsChanged ||</span></span>
<span class="line"><span>          haveOwnPropsChanged</span></span>
<span class="line"><span>        ) {</span></span>
<span class="line"><span>          haveMergedPropsChanged = this.updateMergedPropsIfNeeded()</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>          haveMergedPropsChanged = false</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (!haveMergedPropsChanged &amp;amp;&amp;amp; renderedElement) {</span></span>
<span class="line"><span>          return renderedElement</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if (withRef) {</span></span>
<span class="line"><span>          this.renderedElement = createElement(WrappedComponent, {</span></span>
<span class="line"><span>            ...this.mergedProps,</span></span>
<span class="line"><span>            ref: &amp;#039;wrappedInstance&amp;#039;</span></span>
<span class="line"><span>          })</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>          this.renderedElement = createElement(WrappedComponent,</span></span>
<span class="line"><span>            this.mergedProps</span></span>
<span class="line"><span>          )</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return this.renderedElement</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Connect.displayName = connectDisplayName</span></span>
<span class="line"><span>    Connect.WrappedComponent = WrappedComponent</span></span>
<span class="line"><span>    Connect.contextTypes = {</span></span>
<span class="line"><span>      store: storeShape</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    Connect.propTypes = {</span></span>
<span class="line"><span>      store: storeShape</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (process.env.NODE_ENV !== &amp;#039;production&amp;#039;) {</span></span>
<span class="line"><span>      Connect.prototype.componentWillUpdate = function componentWillUpdate() {</span></span>
<span class="line"><span>        if (this.version === version) {</span></span>
<span class="line"><span>          return</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // We are hot reloading!</span></span>
<span class="line"><span>        this.version = version</span></span>
<span class="line"><span>        this.trySubscribe()</span></span>
<span class="line"><span>        this.clearCache()</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return hoistStatics(Connect, WrappedComponent)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>我们按照上面介绍的解析步骤来一步步有序的分析源码。</p><p><strong>1、查看函数入口，以及需要传入的参数。</strong></p><p>如果只是看这样一个函数体，我们无法得知每个参数到底是什么？有什么作用？但是，我们可以先结合使用的demo初步了解各个参数的作用。</p><pre><code>export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = &amp;#123;&amp;#125;) &amp;#123;&amp;#125;
</code></pre><p><strong>mapStateToProps</strong>：传入所有state，返回指定的state数据。</p><pre><code>function mapStateToProps(state) &amp;#123;
      return &amp;#123; todos: state.todos &amp;#125;
    &amp;#125;
</code></pre><p><strong>mapDispatchToProps</strong>：传入dispatch，返回使用bindActionCreators()绑定的action方法。我们不再这里讨论bindActionCreators的用法，这个知识将会放到redux解析的文章中。</p><pre><code>function mapDispatchToProps(dispatch) &amp;#123;
  return bindActionCreators(Object.assign(&amp;#123;&amp;#125;, todoActionCreators, counterActionCreators), dispatch)
&amp;#125;
</code></pre><p><strong>mergeProps</strong>：mergeProps如果不指定，则默认返回 Object.assign({}, ownProps, stateProps, dispatchProps)，顾名思义，mergeProps是合并的意思，将state合并后传递给组件。</p><pre><code>function mergeProps(stateProps, dispatchProps, ownProps) &amp;#123;
  return Object.assign(&amp;#123;&amp;#125;, ownProps, &amp;#123;
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) =&gt; dispatchProps.addTodo(ownProps.userId, text)
  &amp;#125;)
&amp;#125;
</code></pre><p><strong>options</strong>：通过配置项可以更加详细的定义connect的行为，通常只需要执行默认值。</p><p><strong>2、查看导入了哪些插件</strong></p><pre><code>import &amp;#123; Component, createElement &amp;#125; from &#39;react&#39;
import storeShape from &#39;../utils/storeShape&#39;
import shallowEqual from &#39;../utils/shallowEqual&#39;
import wrapActionCreators from &#39;../utils/wrapActionCreators&#39;
import warning from &#39;../utils/warning&#39;
import isPlainObject from &#39;lodash/isPlainObject&#39;
import hoistStatics from &#39;hoist-non-react-statics&#39;
import invariant from &#39;invariant&#39;
</code></pre><p><strong>react</strong>：使用到了react组件，那么我们可以猜测connect和Provider类似，需要创建一个Connect组件。</p><p><strong>storeShape</strong>：通过了redux常用API的类型验证。</p><pre><code>import PropTypes from &#39;prop-types&#39;
export default PropTypes.shape(&amp;#123;
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
&amp;#125;)
</code></pre><p><strong>shallowEqual</strong>：这个文件的作用是传入2个对象，首先比较对象是否一致，如果一致，则返回true，如果不一致，则获取2个对象的key数组，判断2个对象key数组的长度是否相等，如果不相等，返回false，如果相等，最后用for循环遍历A对象的key，如果当前的遍历值不存在于B的key中或者A对象的当前key的value不等于B对象的当前key的value，则返回false，如果不属于上面的任何情况，则返回true。（如果认为我这段讲的迷迷糊糊，你也可以自己理解下面的代码。）</p><pre><code>export default function shallowEqual(objA, objB) &amp;#123;
  if (objA === objB) &amp;#123;
    return true
  &amp;#125;
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) &amp;#123;
    return false
  &amp;#125;
  // 测试A对象的key和B对象的key不一致
  const hasOwn = Object.prototype.hasOwnProperty
  for (let i = 0; i &lt; keysA.length; i++) &amp;#123;
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) &amp;#123;
      return false
    &amp;#125;
  &amp;#125;
  return true
&amp;#125;
</code></pre><p>hasOwn的作用是判断对象里面是否包含某个属性。这段代码的实际用途是判断下一个props和当前的props是否一致。</p><pre><code>shallowEqual(nextStateProps, this.stateProps)
</code></pre><p><strong>wrapActionCreators</strong>：实现了bindActionCreators方法绑定action到组件的操作。</p><pre><code>import &amp;#123; bindActionCreators &amp;#125; from &#39;redux&#39;

export default function wrapActionCreators(actionCreators) &amp;#123;
  return dispatch =&gt; bindActionCreators(actionCreators, dispatch)
&amp;#125;
</code></pre><p>函数使用方法</p><pre><code>wrapActionCreators(mapDispatchToProps)
</code></pre><p><strong>warning</strong>：在控制台打印warning信息</p><pre><code>export default function warning(message) &amp;#123;
  if (typeof console !== &#39;undefined&#39; &amp;&amp; typeof console.error === &#39;function&#39;) &amp;#123;
    console.error(message)
  &amp;#125;
  try &amp;#123;
    throw new Error(message)
  &amp;#125; catch (e) &amp;#123;&amp;#125;
&amp;#125;
</code></pre><p><strong>lodash/isPlainObject</strong>：检查传入的值是不是纯对象，如果是，返回true，否则返回false。方法详情查看 <a href="http://lodashjs.com/docs/#_isplainobjectvalue" target="_blank" rel="noreferrer">lodash之isPlainObject</a></p><pre><code>function isPlainObject(value) &amp;#123;
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) &amp;#123;
    return false;
  &amp;#125;
  var proto = getPrototype(value);
  if (proto === null) &amp;#123;
    return true;
  &amp;#125;
  var Ctor = hasOwnProperty.call(proto, &#39;constructor&#39;) &amp;&amp; proto.constructor;
  return typeof Ctor == &#39;function&#39; &amp;&amp; Ctor instanceof Ctor &amp;&amp;
    funcToString.call(Ctor) == objectCtorString;
&amp;#125;
</code></pre><p><strong>hoist-non-react-statics</strong>：这段代码有点神奇，<strong>REACT_STATICS</strong>是一堆react的常用方法，<strong>KNOWN_STATICS</strong>是函数的一些属性。</p><pre><code>var REACT_STATICS = &amp;#123;
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
&amp;#125;;
var KNOWN_STATICS = &amp;#123;
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
&amp;#125;;
var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === &#39;function&#39;;

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) &amp;#123;
    if (typeof sourceComponent !== &#39;string&#39;) &amp;#123; // don&#39;t hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);
        if (isGetOwnPropertySymbolsAvailable) &amp;#123;
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        &amp;#125;

        for (var i = 0; i &lt; keys.length; ++i) &amp;#123;
            if (!REACT_STATICS[keys[i]] &amp;&amp; !KNOWN_STATICS[keys[i]] &amp;&amp; (!customStatics || !customStatics[keys[i]])) &amp;#123;
                try &amp;#123;
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                &amp;#125; catch (error) &amp;#123;

                &amp;#125;
            &amp;#125;
        &amp;#125;
    &amp;#125;

    return targetComponent;
&amp;#125;;
</code></pre><p>我们首先从函数入口解读，入口传入了3个参数，<strong>targetComponent</strong>, <strong>sourceComponent</strong>, <strong>customStatics</strong>，首先判断sourceComponent的类型不是一个字符串，然后使用getOwnPropertyNames获取sourceComponent对象的key，返回值是key组成的数组keys。接着判断isGetOwnPropertySymbolsAvailable（肯定是true），如果为true，执行下面的语句：</p><pre><code>keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
</code></pre><p>getOwnPropertySymbols和getOwnPropertyNames作用类似，但是<strong>getOwnPropertyNames只是返回字符串类型的key</strong>，而<strong>getOwnPropertySymbols可以返回Symbol类型的key</strong>。然后我们再把2种情况下的key拼接到一个数组里面返回新的keys。</p><p>然后执行for语句，遍历keys，如果不包含REACT_STATICS中的react的静态方法，同时不包含KNOWN_STATICS中的属性，同时不存在customStatics（传入函数的第三个参数不存在）或者存在但没有sourceComponent的key，就执行：</p><pre><code>//将sourceComponent的方法写入targetComponent中
targetComponent[keys[i]] = sourceComponent[keys[i]];
</code></pre><p>最后返回targetComponent：</p><pre><code>return targetComponent
</code></pre><p>该方法在connect中的实际作用是：将WrappedComponent内的react静态方法绑定到Connect组件上。</p><pre><code>hoistStatics(Connect, WrappedComponent)
</code></pre><p><strong>invariant</strong>：我们看到invariant传入了好几个参数，第一个if语句表示如果不是生产环境，并且format没有定义，就抛出异常。第二个if表示如果condition未定义，同时format未定义，就抛出error，如果condition不存在但format存在，抛出另外的错误。（总结就是一个错误检查机制）</p><pre><code>var NODE_ENV = process.env.NODE_ENV;

var invariant = function(condition, format, a, b, c, d, e, f) &amp;#123;
  if (NODE_ENV !== &#39;production&#39;) &amp;#123;
    if (format === undefined) &amp;#123;
      throw new Error(&#39;invariant requires an error message argument&#39;);
    &amp;#125;
  &amp;#125;

  if (!condition) &amp;#123;
    var error;
    if (format === undefined) &amp;#123;
      error = new Error(
        &#39;Minified exception occurred; use the non-minified dev environment &#39; +
        &#39;for the full error message and additional helpful warnings.&#39;
      );
    &amp;#125; else &amp;#123;
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() &amp;#123; return args[argIndex++]; &amp;#125;)
      );
      error.name = &#39;Invariant Violation&#39;;
    &amp;#125;

    error.framesToPop = 1; // we don&#39;t care about invariant&#39;s own frame
    throw error;
  &amp;#125;

&amp;#125;;

module.exports = invariant;
</code></pre><p>该方法实际用途：检查store是否存在</p><pre><code>invariant(this.store,
          \`Could not find &quot;store&quot; in either the context or \` +
          \`props of &quot;$&amp;#123;connectDisplayName&amp;#125;&quot;. \` +
          \`Either wrap the root component in a &amp;lt;Provider&amp;gt;, \` +
          \`or explicitly pass &quot;store&quot; as a prop to &quot;$&amp;#123;connectDisplayName&amp;#125;&quot;.\`
        )
</code></pre><p><strong>3、定义几个参数默认值常量</strong></p><p>当你没有给组件绑定state和dispatch的时候，就执行默认的配置。</p><p><strong>defaultMapStateToProps</strong>：传入state，返回空对象</p><p><strong>defaultMapDispatchToProps</strong>： 传入dispatch，返回dispatch对象</p><p><strong>defaultMergeProps</strong>：传入stateProps, dispatchProps, parentProps，返回当前传入的对象。</p><pre><code>const defaultMapStateToProps = state =&gt; (&amp;#123;&amp;#125;)
const defaultMapDispatchToProps = dispatch =&gt; (&amp;#123; dispatch &amp;#125;)
const defaultMergeProps = (stateProps, dispatchProps, parentProps) =&gt; (&amp;#123;
  ...parentProps,
  ...stateProps,
  ...dispatchProps
&amp;#125;)
</code></pre><p><strong>4、getDisplayName方法</strong></p><p>返回当前传入的组件名 function getDisplayName(WrappedComponent) { return WrappedComponent.displayName || WrappedComponent.name || &#39;Component&#39; }</p><p><strong>5、tryCatch方法</strong> 给fn函数指定上下文。 let errorObject = { value: null } function tryCatch(fn, ctx) { try { return fn.apply(ctx) } catch (e) { errorObject.value = e return errorObject } }</p><p>使用场景：在connect内调用tryCatch给updateStatePropsIfNeeded方法指定当前的上下文</p><pre><code>tryCatch(this.updateStatePropsIfNeeded, this)
</code></pre><p>如果你不明白上面的代码，可以看下面比较简单的例子：</p><pre><code>let b = &amp;#123;
  a: 1,
  e: function() &amp;#123;
    console.log(this.a)
  &amp;#125;,
  c: function() &amp;#123;
    tryCatch(this.e, this)
  &amp;#125;
&amp;#125;

b.c() // 1
</code></pre><p><strong>6、connect函数解析思路</strong> connect函数是核心，我们需要大概了解函数做的事情，才能更好的读懂源码。 既然是函数，那就有返回值，connect()返回值是Connect组件（请注意大小写的区别）。</p><p>通俗点理解，使用connect可以把state和dispatch绑定到react组件，使得组件可以访问到redux的数据。 常看到下面这种写法：</p><pre><code>export default connect(mapStateToProps)(TodoApp)
</code></pre><p>我把connect的核心实现简化提取出来，是下面这种形式：WrappedComponent参数对应的就是TodoApp。函数最终返回的是将state和dispatch绑定到Connect之后的新组件。</p><pre><code>funtion connect(mapStateToProps) &amp;#123;
    return function wrapWithConnect(WrappedComponent) &amp;#123;
        class Connect extends Component &amp;#123;
        
        &amp;#125;
        return hoistStatics(Connect, WrappedComponent)
    &amp;#125;
&amp;#125;
</code></pre><p><strong>7、Connect组件执行</strong></p><p>既然已经知道connect函数返回的是Connect组件，而Connect组件继承于react，我们就可以按照react的生命周期来阅读代码。</p><p>**Connect组件方法组成：**方法虽然很多，但是我们只需要紧跟react生命周期函数去了解代码，而其他方法都是在生命周期函数中调用的。</p><pre><code>class Connect extends Component &amp;#123;
      shouldComponentUpdate() &amp;#123;&amp;#125;
      constructor(props, context) &amp;#123;&amp;#125;    
      computeStateProps(store, props) &amp;#123;&amp;#125;    
      configureFinalMapState(store, props) &amp;#123;&amp;#125;    
      computeDispatchProps(store, props) &amp;#123;&amp;#125;    
      configureFinalMapDispatch(store, props) &amp;#123;&amp;#125;    
      updateStatePropsIfNeeded() &amp;#123;&amp;#125;
      updateDispatchPropsIfNeeded() &amp;#123;&amp;#125;    
      updateMergedPropsIfNeeded() &amp;#123;&amp;#125;    
      isSubscribed() &amp;#123;&amp;#125;    
      trySubscribe() &amp;#123;&amp;#125;    
      tryUnsubscribe() &amp;#123;&amp;#125;    
      componentDidMount() &amp;#123;&amp;#125;    
      componentWillReceiveProps(nextProps) &amp;#123;&amp;#125;    
      componentWillUnmount() &amp;#123;&amp;#125;    
      clearCache() &amp;#123;&amp;#125;    
      handleChange() &amp;#123;&amp;#125;    
      getWrappedInstance() &amp;#123;&amp;#125;
      render() &amp;#123;&amp;#125;
&amp;#125;
</code></pre><p>简单了解react生命周期的函数执行顺序：</p><p><strong>初次渲染</strong>：render =&gt; componentDidMount</p><p><strong>当state更新时</strong>：componentWillReceiveProps =&gt; shouldComponentUpdate =&gt; render</p><p>**render：**进入Connect组件执行的时候，先进入render方法。</p><pre><code>render() &amp;#123;
        const &amp;#123;haveOwnPropsChanged, hasStoreStateChanged, haveStatePropsBeenPrecalculated, statePropsPrecalculationError, renderedElement&amp;#125; = this

        this.haveOwnPropsChanged = false
        this.hasStoreStateChanged = false
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null

        if (statePropsPrecalculationError) &amp;#123;
          throw statePropsPrecalculationError
        &amp;#125;

        let shouldUpdateStateProps = true
        let shouldUpdateDispatchProps = true
        if (pure &amp;&amp; renderedElement) &amp;#123;
          shouldUpdateStateProps = hasStoreStateChanged || (
            haveOwnPropsChanged &amp;&amp; this.doStatePropsDependOnOwnProps
          )
          shouldUpdateDispatchProps =
            haveOwnPropsChanged &amp;&amp; this.doDispatchPropsDependOnOwnProps
        &amp;#125;

        let haveStatePropsChanged = false
        let haveDispatchPropsChanged = false
        if (haveStatePropsBeenPrecalculated) &amp;#123;
          haveStatePropsChanged = true
        &amp;#125; else if (shouldUpdateStateProps) &amp;#123;
          haveStatePropsChanged = this.updateStatePropsIfNeeded()
        &amp;#125;
        if (shouldUpdateDispatchProps) &amp;#123;
          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded()
        &amp;#125;

        let haveMergedPropsChanged = true
        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) &amp;#123;
          haveMergedPropsChanged = this.updateMergedPropsIfNeeded()
        &amp;#125; else &amp;#123;
          haveMergedPropsChanged = false
        &amp;#125;

        if (!haveMergedPropsChanged &amp;&amp; renderedElement) &amp;#123;
          return renderedElement
        &amp;#125;

        if (withRef) &amp;#123;
          this.renderedElement = createElement(WrappedComponent, &amp;#123;
            ...this.mergedProps,
            ref: &#39;wrappedInstance&#39;
          &amp;#125;)
        &amp;#125; else &amp;#123;
          this.renderedElement = createElement(WrappedComponent,
            this.mergedProps
          )
        &amp;#125;
</code></pre><p><strong>a、首先定义了5个成员变量，在Connect组件内部的任意函数位置可以访问到this定义的成员变量。</strong> const {haveOwnPropsChanged, hasStoreStateChanged, haveStatePropsBeenPrecalculated, statePropsPrecalculationError, renderedElement} = this</p><pre><code>//上面的代码等于下面的写法，this指当前的组件对象。

//判断新传入的props和当前的是否相等，是bool值
var haveOwnPropsChanged = this.haveOwnPropsChanged; 
//当state更新时，改变hasStoreStateChanged的状态，是bool值
var hasStoreStateChanged = this.hasStoreStateChanged;
//表示state和props已经提前计算改变，也是bool值
var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
//如果state和props更新时出现错误，则抛出statePropsPrecalculationError异常
var statePropsPrecalculationError = this.statePropsPrecalculationError;
//将要渲染的react组件
var renderedElement = this.renderedElement;
</code></pre><p>**b、给成员变量设置默认值。**默认值要么是false，要么是null。</p><pre><code>this.haveOwnPropsChanged = false
this.hasStoreStateChanged = false
this.haveStatePropsBeenPrecalculated = false
this.statePropsPrecalculationError = null
</code></pre><p><strong>c、抛出异常</strong>：初次渲染时，statePropsPrecalculationError为null，不会抛出异常，当执行state和props更新出现异常时，会抛出错误。</p><pre><code>if (statePropsPrecalculationError) &amp;#123;
      throw statePropsPrecalculationError
&amp;#125;
</code></pre><p>我们追踪到statePropsPrecalculationError的赋值是在handleChange()里面执行的，受到haveStatePropsChanged的结果影响。当haveStatePropsChanged出现错误时，就把报错内容赋值给statePropsPrecalculationError。</p><pre><code>if (haveStatePropsChanged === errorObject) &amp;#123;
      this.statePropsPrecalculationError = errorObject.value
&amp;#125;
</code></pre><p><strong>d、定义shouldUpdateStateProps和shouldUpdateDispatchProps</strong>：默认为true前者表示默认允许更新state和props，后者表示默认允许更新dispatch。 pure：options的配置项，初始值为true。 shouldUpdateStateProps：我们看到 || 符号，只要左右2边满足一个为true，则返回true，如果2个都是false，则返回false。 shouldUpdateDispatchProps：同时满足haveOwnPropsChanged、doDispatchPropsDependOnOwnProps为true，则返回true，否则返回false。</p><pre><code>    let shouldUpdateStateProps = true
    let shouldUpdateDispatchProps = true
    if (pure &amp;&amp; renderedElement) &amp;#123;
        shouldUpdateStateProps = hasStoreStateChanged ||
 (haveOwnPropsChanged &amp;&amp; this.doStatePropsDependOnOwnProps)
        shouldUpdateDispatchProps = haveOwnPropsChanged &amp;&amp; this.doDispatchPropsDependOnOwnProps
     &amp;#125;
</code></pre><p><strong>e、上面几个步骤都是定义state和props的各种状态的变量，目的是为了判断render方法返回怎样的renderedElement。</strong></p><pre><code>//如果haveMergedPropsChanged为false，并且renderedElement不为null，则返回renderedElement
//这段代码在初次渲染是不会执行，只有在更新state和props的时候执行
if (!haveMergedPropsChanged &amp;&amp; renderedElement) &amp;#123;
    return renderedElement
&amp;#125;

//haveMergedPropsChanged由updateMergedPropsIfNeeded方法的返回值控制，如果mergedProps等于nextMergedProps，返回false，不相等则返回true，表示应该更新state和props
updateMergedPropsIfNeeded() &amp;#123;
    const nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props)
    if (this.mergedProps &amp;&amp; checkMergedEquals &amp;&amp; shallowEqual(nextMergedProps, this.mergedProps)) &amp;#123;
      return false
    &amp;#125;

    this.mergedProps = nextMergedProps
    return true
  &amp;#125;
</code></pre><p>初次进入组件最先渲染的返回值是下面这段：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    if (withRef) {</span></span>
<span class="line"><span>          this.renderedElement = createElement(WrappedComponent, {</span></span>
<span class="line"><span>            ...this.mergedProps,</span></span>
<span class="line"><span>            ref: &amp;#039;wrappedInstance&amp;#039;</span></span>
<span class="line"><span>          })</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>          this.renderedElement = createElement(WrappedComponent,</span></span>
<span class="line"><span>            this.mergedProps</span></span>
<span class="line"><span>          )</span></span>
<span class="line"><span>        }</span></span></code></pre></div><p><strong>connect渲染结果</strong>：在你绑定的组件外层包裹了Connect组件，看下面的图你应该能更加清晰的了解connect做的事情。</p><p><img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVQXkk" alt="clipboard.png"></p><p><strong>componentWillReceiveProps</strong>：组件接收到新的state。如果pure为false，并且nextProps和this.props不相等，则设置this.haveOwnPropsChanged为true。</p><pre><code>componentWillReceiveProps(nextProps) &amp;#123;
        if (!pure || !shallowEqual(nextProps, this.props)) &amp;#123;
          this.haveOwnPropsChanged = true
        &amp;#125;
      &amp;#125;
</code></pre><p><strong>shouldComponentUpdate()</strong>：判断组件是否允许更新。</p><pre><code>shouldComponentUpdate() &amp;#123;
        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged
      &amp;#125;
</code></pre><p>**componentDidMount()：**组件初次渲染完成，执行订阅更新</p><pre><code>componentDidMount() &amp;#123;
        this.trySubscribe()
      &amp;#125;
</code></pre><p>**componentWillUnmount()：**组件卸载时恢复状态。</p><pre><code>    componentWillUnmount() &amp;#123;
        this.tryUnsubscribe()
        this.clearCache()
      &amp;#125;

      clearCache() &amp;#123;
        this.dispatchProps = null
        this.stateProps = null
        this.mergedProps = null
        this.haveOwnPropsChanged = true
        this.hasStoreStateChanged = true
        this.haveStatePropsBeenPrecalculated = false
        this.statePropsPrecalculationError = null
        this.renderedElement = null
        this.finalMapDispatchToProps = null
        this.finalMapStateToProps = null
      &amp;#125;
</code></pre><p><strong>8、总结</strong> 如果看到这里，你还没有理清思路，那么可以看完总结再回过头去理解源码。</p><p>connect方法做的事情是将state和dispatch绑定到Connect组件的参数上，然后Connect组件将你当前的App组件封装起来，使得App组件可以通过props获取到父组件Connect传递的state和props。</p><p>这也就是为什么你可以在自己写的组件上面直接通过this.props访问到state和action。有的人是通过store去读取state和dispatch action，也是一样的道理。</p><p>从connect方法的实现，我们看到了非常多react组件的影子，生命周期，props传递，context上下文。</p><p><strong>对比Provider组件：</strong></p><p>Provider是顶层组件的作用，将store作为上下文提供给全局共享，而Connect组件是局部组件，将某个react组件包装起来，传递指定的state和props给该组件访问。</p>`,122)])])}const u=s(t,[["render",r]]);export{h as __pageData,u as default};
