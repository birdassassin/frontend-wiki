import{_ as n,o as a,c as r,a2 as e,j as o}from"./chunks/framework.BWuWLRhz.js";const l=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/redux-thunk源码分析.md","filePath":"wiki/legacy/React系列/redux-thunk源码分析.md"}'),p={name:"wiki/legacy/React系列/redux-thunk源码分析.md"};function c(u,t,d,i,h,s){return a(),r("div",null,[...t[0]||(t[0]=[e(`<p>在react开发中，一部分人使用redux-thunk，一部分人使用redux-saga，彼此各有优点。</p><p>今天我们来研究一下redux-thunk的源码，看看它到底做了什么事情。</p><h4 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h4><pre><code>import &amp;#123; createStore, applyMiddleware &amp;#125; from &#39;redux&#39;;
import thunk from &#39;redux-thunk&#39;;
import rootReducer from &#39;./reducers/index&#39;;
//注册thunk到applyMiddleware
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

//action方法
function increment() &amp;#123;
  return &amp;#123;
    type: INCREMENT_COUNTER
  &amp;#125;;
&amp;#125;
//执行一个异步的dispatch
function incrementAsync() &amp;#123;
  return dispatch =&gt; &amp;#123;
    setTimeout(() =&gt; &amp;#123;
      dispatch(increment());
    &amp;#125;, 1000);
  &amp;#125;;
&amp;#125;
</code></pre><p>主要代码：</p><p><strong>1、导入thunk</strong></p><pre><code>import thunk from &#39;redux-thunk&#39;;
</code></pre><p><strong>2、添加到applyMiddleware()</strong></p><pre><code>const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);
</code></pre><p>我们可以猜测thunk是一个object。</p><h4 id="redux-thunk源码" tabindex="-1">redux-thunk源码 <a class="header-anchor" href="#redux-thunk源码" aria-label="Permalink to &quot;redux-thunk源码&quot;">​</a></h4><pre><code>function createThunkMiddleware(extraArgument) &amp;#123;
  return (&amp;#123; dispatch, getState &amp;#125;) =&gt; next =&gt; action =&gt; &amp;#123;
    if (typeof action === &#39;function&#39;) &amp;#123;
      return action(dispatch, getState, extraArgument);
    &amp;#125;

    return next(action);
  &amp;#125;;
&amp;#125;

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
</code></pre><p>一共11行，简洁，超简洁，5K+ star。</p><h4 id="源码分析" tabindex="-1">源码分析 <a class="header-anchor" href="#源码分析" aria-label="Permalink to &quot;源码分析&quot;">​</a></h4><p><strong>1、定义了createThunkMiddleware()方法，可以传入参数extraArgument。</strong></p><pre><code>function createThunkMiddleware(extraArgument)&amp;#123;&amp;#125;
</code></pre><p><strong>2、该方法返回的是一个action对象。</strong></p><p>我们知道action本身是一个object，带有type和arguments。我们将<strong>dispatch</strong>和<strong>getState</strong>传入action，next()和action()是redux提供的方法。接着做判断，如果action是一个function，就返回action(dispatch, getState, extraArgument)，否则返回next(action)。</p><pre><code>return (&amp;#123; dispatch, getState &amp;#125;) =&gt; next =&gt; action =&gt; &amp;#123;
    if (typeof action === &#39;function&#39;) &amp;#123;
      return action(dispatch, getState, extraArgument);
    &amp;#125;

    return next(action);
  &amp;#125;;
</code></pre><p><strong>3、执行createThunkMiddleware()</strong></p>`,20),o("p",{"type:":"",",":"","arg1,":"","arg2,":"","css-module":"."},"这一步的常量thunk是一个对象，类似",-1),e(`<p>const thunk = createThunkMiddleware();</p><p>4、给thunk设置一个变量withExtraArgument，并且将createThunkMiddleware整个函数赋给它。</p><pre><code>thunk.withExtraArgument = createThunkMiddleware;
</code></pre><p><strong>5、最后导出thunk。</strong></p><pre><code>export default thunk;
</code></pre><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h4><p>什么是thunk？thunk是一个中间函数，它的返回值是一个表达式。action里面可能传递多个参数，我们不可能再专门替每个action写一个传递方法。那么就有了thunk的出现，thunk可以将多个参数的函数作为一个参数传递。</p><p>例如有这样一个action，带有多个参数：</p><pre><code>function test(arg1, arg2, ...) &amp;#123;
    return &amp;#123;
        type: &quot;TEST&quot;,
        arg1,
        arg2,
        ...
    &amp;#125;
&amp;#125;
</code></pre><p>然后我们执行dispatch()方法，我们需要把test()函数作为一个参数传递。这样就解决了多参数传递的问题，这个test()就成了一个thunk。</p><p>如果你对redux-thunk还有疑问，可以查看这个解释：<a href="https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559" target="_blank" rel="noreferrer">redux-thunk of stackoverflow</a></p>`,11)])])}const k=n(p,[["render",c]]);export{l as __pageData,k as default};
