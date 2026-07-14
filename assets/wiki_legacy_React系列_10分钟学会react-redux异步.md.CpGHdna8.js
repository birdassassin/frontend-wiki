import{_ as a,o as n,c as p,a2 as e}from"./chunks/framework.BWuWLRhz.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/10分钟学会react-redux异步.md","filePath":"wiki/legacy/React系列/10分钟学会react-redux异步.md"}'),t={name:"wiki/legacy/React系列/10分钟学会react-redux异步.md"};function l(i,s,c,r,o,d){return n(),p("div",null,[...s[0]||(s[0]=[e(`<p>你可以结合这份redux官方的异步源码来看：<a href="https://github.com/reactjs/redux/tree/master/examples/async" target="_blank" rel="noreferrer">Redux Async Example</a></p><p>一、选择一种你喜欢的异步方案，fetch，jQuery，或者是我正在使用的<a href="https://www.npmjs.com/package/axios" target="_blank" rel="noreferrer">axios</a> 1、安装axios插件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm i --save-dev axios</span></span></code></pre></div><p>2、新建一个fetchData.js文件，封装基本的post和get接口。axios官方还提供了很多配置选项，比如超时配置等。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import axios from &#39;axios&#39;</span></span>
<span class="line"><span>//BASE_URL是默认的url地址，如果你安装了webpack，可以在webpack配置全局变量</span></span>
<span class="line"><span>axios.defaults.baseURL = BASE_URL;</span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>如果没有安装webpack，就使用下面这种写法</span></span>
<span class="line"><span>axios.defaults.baseURL = http://ip:端口</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const getData = (url, param) =&gt; {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        axios.get(\`\${url}\`)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export const postData = (url, param) =&gt; {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>        axios.post(\`\${url}\`, param)</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>3、你的异步代码将写在action。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//导入fetchData文件</span></span>
<span class="line"><span>import { getData, postData } from &#39;./fetchData&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//返回一个action对象，用来关联对应的reducer，将data保存到store。</span></span>
<span class="line"><span>const saveReducer = (data) =&gt; ({</span></span>
<span class="line"><span>    type: &#39;SAVE_REDUCER&#39;,</span></span>
<span class="line"><span>    data</span></span>
<span class="line"><span>})</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//get接口测试，传入一个参数id，请求/test/:id接口，返回response并且将数据通过指定的action保存到store。</span></span>
<span class="line"><span>export const getTest = (id) =&gt; async (dispatch, getState) =&gt; {</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        let response = await getData(\`/test/\${id}\`)</span></span>
<span class="line"><span>        await dispatch(saveReducer(response.data))</span></span>
<span class="line"><span>    } catch (error) {</span></span>
<span class="line"><span>        console.log(&#39;error: &#39;, error)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*</span></span>
<span class="line"><span>post接口测试，params参数格式</span></span>
<span class="line"><span>let params = {</span></span>
<span class="line"><span>    id: 23</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>*/</span></span>
<span class="line"><span>export const postTest = (params) =&gt; async (dispatch, getState) =&gt; {</span></span>
<span class="line"><span>    try {</span></span>
<span class="line"><span>        let response = await postData(\`/test\`, params)</span></span>
<span class="line"><span>        await dispatch(saveReducer(response.data))</span></span>
<span class="line"><span>    } catch (error) {</span></span>
<span class="line"><span>        console.log(&#39;error: &#39;, error)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>4、在reducer中定义action type保存data。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//注意，这里不需要再import action了。</span></span>
<span class="line"><span>//定义一个初始化状态的state，假设现在有一个空数组testData</span></span>
<span class="line"><span>let initState = {</span></span>
<span class="line"><span>    testData: []</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//定义一个叫做test的reducer，更新state。</span></span>
<span class="line"><span>export function test(state = initState, action) {</span></span>
<span class="line"><span>    switch (action.type) {</span></span>
<span class="line"><span>        case &#39;SAVE_REDUCER&#39;:</span></span>
<span class="line"><span>            return {</span></span>
<span class="line"><span>                ...state,</span></span>
<span class="line"><span>                testData: action.data</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        default:</span></span>
<span class="line"><span>            return state;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>5、现在你还需要定义一个store的配置文件，把reducer合并成store，并且关联action。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>import { createStore, applyMiddleware } from &#39;redux&#39;;</span></span>
<span class="line"><span>import thunkMiddleware from &#39;redux-thunk&#39;;</span></span>
<span class="line"><span>import createLogger from &#39;redux-logger&#39;;</span></span>
<span class="line"><span>import rootReducer from &#39;./reducers&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let createStoreWithMiddleware;</span></span>
<span class="line"><span>// store负责管理所有reducer，module.hot.accept表示支持热更新</span></span>
<span class="line"><span>const logger = createLogger({ collapsed: true });</span></span>
<span class="line"><span>createStoreWithMiddleware = applyMiddleware(</span></span>
<span class="line"><span>    thunkMiddleware,</span></span>
<span class="line"><span>    logger</span></span>
<span class="line"><span>)(createStore);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export default function configureStore(initialState) {</span></span>
<span class="line"><span>  const store = createStoreWithMiddleware(rootReducer, initialState);</span></span>
<span class="line"><span>  if (module.hot) {</span></span>
<span class="line"><span>    module.hot.accept(&#39;./reducers&#39;, () =&gt; {</span></span>
<span class="line"><span>      const nextRootReducer = require(&#39;./reducers/index&#39;);</span></span>
<span class="line"><span>      store.replaceReducer(nextRootReducer);</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  return store;</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>6、单向数据流部分现在已经完成了，接着就在组件触发action去异步请求服务器的数据，返回给前端，然后action会自动把数据保存到内存store中。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React, { Component } from &#39;react&#39;;</span></span>
<span class="line"><span>import { bindActionCreators } from &#39;redux&#39;;</span></span>
<span class="line"><span>import { connect } from &#39;react-redux&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>/*actions*/</span></span>
<span class="line"><span>import * as testActions from &#39;action/test&#39;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//让组件关联state和action</span></span>
<span class="line"><span>@connect(</span></span>
<span class="line"><span>    state =&gt; state,</span></span>
<span class="line"><span>    dispatch =&gt; bindActionCreators({testActions}, dispatch)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>export default class Home extends React.Component {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    constructor(props) {</span></span>
<span class="line"><span>        super(props);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    componentWillMount() {</span></span>
<span class="line"><span>        let params = {</span></span>
<span class="line"><span>            id: 23</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        this.props.postTest(params) //发送post请求</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        let id = 23</span></span>
<span class="line"><span>        this.props.getTest(id) //发送get请求</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    render() {</span></span>
<span class="line"><span>        return(</span></span>
<span class="line"><span>            &lt;div&gt;</span></span>
<span class="line"><span>                {/*你的dom*/}</span></span>
<span class="line"><span>            &lt;/div&gt;</span></span>
<span class="line"><span>        );</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>7、如果你的异步是click或者hover之类的事件触发的，则只需要通过事件绑定来发送action就行了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;div onClick={() =&gt; this.props.getTest(id)}&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/div&gt;</span></span></code></pre></div><p>还有更多需求 ，可以看看 <a href="https://github.com/hyy1115/react-redux-webpack2" target="_blank" rel="noreferrer">react-redux-webpack架构</a></p><p>提问环节：</p><p>小白：你骗人，你就是个骗子，我看完这篇文章花了11分钟，为什么要写10分钟学会？</p><p>。。。</p><p>我：。。。下课。。。</p>`,20)])])}const h=a(t,[["render",l]]);export{g as __pageData,h as default};
