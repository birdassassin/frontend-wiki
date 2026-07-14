import t from"/img/bVQK0J";import{_ as o,o as n,c as a,a2 as r}from"./chunks/framework.BWuWLRhz.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/redux-logger源码分析.md","filePath":"wiki/legacy/React系列/redux-logger源码分析.md"}'),s={name:"wiki/legacy/React系列/redux-logger源码分析.md"};function p(c,e,g,i,l,m){return n(),a("div",null,[...e[0]||(e[0]=[r(`<p>在redux的配置文件中，如果你使用了redux-logger，也许你会写下面这样一段代码：</p><pre><code>import thunk from &#39;redux-thunk&#39;;
import promise from &#39;redux-promise&#39;;
import createLogger from &#39;redux-logger&#39;;

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);
const store = createStoreWithMiddleware(reducer);
</code></pre><p>现在，我们只关注redux-logger，我们可以看到使用redux-logger分为下面几个步骤：</p><p><strong>1、导入redux-logger</strong></p><pre><code>import createLogger from &#39;redux-logger&#39;;
</code></pre><p><strong>2、运行createLogger方法，将返回结果赋值给常量</strong></p><pre><code>const logger = createLogger();
</code></pre><p><strong>3、将looger传入applyMiddleware()</strong></p><pre><code>applyMiddleware(logger)
</code></pre><p>有2个难点，第一是createLogger()的返回值到底是如何实现的。第二就是applyMiddleware方法如何处理返回值。因为本文是讲redux-logger的实现，所以我们只分析createLogger()</p><h4 id="redux-logger中createlogger方法源码" tabindex="-1">redux-logger中createLogger方法源码 <a class="header-anchor" href="#redux-logger中createlogger方法源码" aria-label="Permalink to &quot;redux-logger中createLogger方法源码&quot;">​</a></h4><pre><code>const repeat = (str, times) =&gt; (new Array(times + 1)).join(str);
const pad = (num, maxLength) =&gt; repeat(\`0\`, maxLength - num.toString().length) + num;

//使用新的性能API可以获得更好的精度（如果可用）
const timer = typeof performance !== \`undefined\` &amp;&amp; typeof performance.now === \`function\` ? performance : Date;

function createLogger(options = &amp;#123;&amp;#125;) &amp;#123;
  return (&amp;#123; getState &amp;#125;) =&gt; (next) =&gt; (action) =&gt; &amp;#123;
    const &amp;#123;
      level, //级别
      logger, //console的API
      collapsed, //
      predicate, //logger的条件
      duration = false, //打印每个action的持续时间
      timestamp = true, //打印每个action的时间戳
      transformer = state =&gt; state, //在打印之前转换state
      actionTransformer = actn =&gt; actn, //在打印之前转换action
    &amp;#125; = options;

    const console = logger || window.console;

    // 如果控制台未定义则退出
    if (typeof console === \`undefined\`) &amp;#123;
      return next(action);
    &amp;#125;

    // 如果谓词函数返回false，则退出
    if (typeof predicate === \`function\` &amp;&amp; !predicate(getState, action)) &amp;#123;
      return next(action);
    &amp;#125;

    const started = timer.now();
    const prevState = transformer(getState());

    const returnValue = next(action);
    const took = timer.now() - started;

    const nextState = transformer(getState());

    // 格式化
    const time = new Date();
    const isCollapsed = (typeof collapsed === \`function\`) ? collapsed(getState, action) : collapsed;

    const formattedTime = timestamp ? \` @ $&amp;#123;pad(time.getHours(), 2)&amp;#125;:$&amp;#123;pad(time.getMinutes(), 2)&amp;#125;:$&amp;#123;pad(time.getSeconds(), 2)&amp;#125;.$&amp;#123;pad(time.getMilliseconds(), 3)&amp;#125;\` : \`\`;
    const formattedDuration = duration ? \` in $&amp;#123;took.toFixed(2)&amp;#125; ms\` : \`\`;
    const formattedAction = actionTransformer(action);
    const message = \`action $&amp;#123;formattedAction.type&amp;#125;$&amp;#123;formattedTime&amp;#125;$&amp;#123;formattedDuration&amp;#125;\`;
    const startMessage = isCollapsed ? console.groupCollapsed : console.group;

    // 渲染
    try &amp;#123;
      startMessage.call(console, message);
    &amp;#125; catch (e) &amp;#123;
      console.log(message);
    &amp;#125;

    if (level) &amp;#123;
      console[level](\`%c prev state\`, \`color: #9E9E9E; font-weight: bold\`, prevState);
      console[level](\`%c action\`, \`color: #03A9F4; font-weight: bold\`, formattedAction);
      console[level](\`%c next state\`, \`color: #4CAF50; font-weight: bold\`, nextState);
    &amp;#125; else &amp;#123;
      console.log(\`%c prev state\`, \`color: #9E9E9E; font-weight: bold\`, prevState);
      console.log(\`%c action\`, \`color: #03A9F4; font-weight: bold\`, formattedAction);
      console.log(\`%c next state\`, \`color: #4CAF50; font-weight: bold\`, nextState);
    &amp;#125;

    try &amp;#123;
      console.groupEnd();
    &amp;#125; catch (e) &amp;#123;
      console.log(\`—— log end ——\`);
    &amp;#125;

    return returnValue;
  &amp;#125;;
&amp;#125;

export default createLogger;
</code></pre><h4 id="解析redux-logger" tabindex="-1">解析redux-logger <a class="header-anchor" href="#解析redux-logger" aria-label="Permalink to &quot;解析redux-logger&quot;">​</a></h4><p><strong>1、入口函数createLogger(options = {})</strong> 我们在redux配置文件中调用的就是这个函数，也是redux-logger中唯一一个函数，它只有一个参数option，option是object。</p><p><strong>2、return ({ getState }) =&gt; (next) =&gt; (action) =&gt; {}</strong> 这行代码看起来很复杂，一堆的箭头函数，其实很简单，createLogger()一定会有一个返回值，但是，我们在控制台打印action信息的时候，需要获取state和action的信息，所以，首先传入getState方法，getState是redux提供的一个方法，用来获取store的state。然后再传入next方法，接着传入action方法。next和action都是redux提供的方法，到这一步，我们就把需要的参数都传入到函数中，可以进行下一步操作了。</p><p><strong>3、定义option的配置参数</strong> 我们在使用redux-logger的时候，习惯了不配置任何参数，直接调用createLogger()，使用默认的配置。但其实还可以手动传入一个option配置，不过并不常用。</p><pre><code>const &amp;#123;
      level, //级别
      logger, //console的API
      collapsed, //
      predicate, //logger的条件
      duration = false, //打印每个action的持续时间
      timestamp = true, //打印每个action的时间戳
      transformer = state =&gt; state, //在打印之前转换state
      actionTransformer = actn =&gt; actn, //在打印之前转换action
    &amp;#125; = options;
</code></pre><p><strong>4、定义console</strong> 如果你给option配置了console相关的API，那么就使用你的配置，如果没有配置，就使用window.console</p><pre><code>const console = logger || window.console;
</code></pre><p><strong>5、添加2个异常情况做退出处理</strong> 第一个if语句是控制台未定义就返回下一个action操作，但是我想不到在浏览器中会出现console方法不存在的情况。 第二个if语句的predicate表示warn、log、error等属于console的方法。&amp;&amp;表示2个条件要同时满足才执行下面的操作。predicate(getState, action)其实就是类似console.log(getState, action)</p><pre><code>// 如果控制台未定义则退出
    if (typeof console === \`undefined\`) &amp;#123;
      return next(action);
    &amp;#125;

    // 如果谓词函数返回false，则退出
    if (typeof predicate === \`function\` &amp;&amp; !predicate(getState, action)) &amp;#123;
      return next(action);
    &amp;#125;
</code></pre><p><strong>6、给各个常量赋值</strong> 为什么会有这么多常量呢？我们来看一张图，图上展示了需要打印的各种信息。</p><p><img src="`+t+'" alt="clipboard.png"></p><p><strong>总结出来就是：</strong></p><p>action <strong>action.type</strong> @ <strong>timer</strong> prev state <strong>{}</strong> action <strong>{}</strong> next state <strong>{}</strong></p><p><strong>这里需要的是action.type, timer, 各种状态下的state</strong></p><pre><code>const started = timer.now();\nconst prevState = transformer(getState());\n\nconst returnValue = next(action);\nconst took = timer.now() - started;\n\nconst nextState = transformer(getState());\n\n// 格式化\nconst time = new Date();\nconst isCollapsed = (typeof collapsed === `function`) ? collapsed(getState, action) : collapsed;\n\nconst formattedTime = timestamp ? ` @ $&amp;#123;pad(time.getHours(), 2)&amp;#125;:$&amp;#123;pad(time.getMinutes(), 2)&amp;#125;:$&amp;#123;pad(time.getSeconds(), 2)&amp;#125;.$&amp;#123;pad(time.getMilliseconds(), 3)&amp;#125;` : ``;\nconst formattedDuration = duration ? ` in $&amp;#123;took.toFixed(2)&amp;#125; ms` : ``;\nconst formattedAction = actionTransformer(action);\nconst message = `action $&amp;#123;formattedAction.type&amp;#125;$&amp;#123;formattedTime&amp;#125;$&amp;#123;formattedDuration&amp;#125;`;\nconst startMessage = isCollapsed ? console.groupCollapsed : console.group;\n</code></pre><p><strong>上面代码信息量比较大，我们还可以拆分出来看看。</strong></p><p>a、先获取一个开始时间<strong>started</strong>，然后读取state，这个state是之前的状态<strong>prevState</strong>。<strong>returnValue</strong>是返回值，返回下一个action。<strong>took</strong>是你执行完前面3行代码之后的真实时间，在这里因为没有用到异步处理，所以我暂且认为transformer()和next()是同步的。<strong>nextState</strong>是新的state。</p><p><strong>这段代码归纳起来看就是先读取开始时间，然后读取state，这个state因为还有更新action，所以是旧的state，然后执行next传入新的action，更新完成之后，获取结束时间，计算更新action的时间差，然后再获取更新后的state。</strong></p><pre><code>const started = timer.now();\nconst prevState = transformer(getState());        \nconst returnValue = next(action);\nconst took = timer.now() - started;\nconst nextState = transformer(getState());\n</code></pre><p>b、下面的代码做了一件事情，设置打印的信息。</p><p><strong>formattedTime</strong>是打印出来的时间，格式是 时:分:秒，<strong>formattedDuration</strong>是时间差，<strong>formattedAction</strong>是当前的action方法。<strong>isCollapsed</strong>用处不大，不管他。</p><pre><code>// 格式化\nconst time = new Date();\nconst isCollapsed = (typeof collapsed === `function`) ? collapsed(getState, action) : collapsed;\n\nconst formattedTime = timestamp ? ` @ $&amp;#123;pad(time.getHours(), 2)&amp;#125;:$&amp;#123;pad(time.getMinutes(), 2)&amp;#125;:$&amp;#123;pad(time.getSeconds(), 2)&amp;#125;.$&amp;#123;pad(time.getMilliseconds(), 3)&amp;#125;` : ``;\nconst formattedDuration = duration ? ` in $&amp;#123;took.toFixed(2)&amp;#125; ms` : ``;\nconst formattedAction = actionTransformer(action);\nconst message = `action $&amp;#123;formattedAction.type&amp;#125;$&amp;#123;formattedTime&amp;#125;$&amp;#123;formattedDuration&amp;#125;`;\nconst startMessage = isCollapsed ? console.groupCollapsed : console.group;\n</code></pre><p>这几行代码做的事情也非常简单，给需要打印的常量赋值。然后组合之后赋值给message：</p><pre><code>const message = `action $&amp;#123;formattedAction.type&amp;#125;$&amp;#123;formattedTime&amp;#125;$&amp;#123;formattedDuration&amp;#125;`;\n</code></pre><p><strong>message == action action.type @ time</strong></p><p><strong>7、try {} catch() {} 部分一般不会用到，也可以不管。</strong></p><p>startMessage.call(console, message);表示将message当做参数传入startMessage，call的第一个参数是指运行环境，意思就是在console打印message信息。</p><pre><code>try &amp;#123;\n  startMessage.call(console, message);\n&amp;#125; catch (e) &amp;#123;\n  console.log(message);\n&amp;#125;\n</code></pre><p><strong>8、打印console的信息，这就图上打印出来的部分了。</strong></p><p>因为我们通常没有配置level，所以执行的是else语句的操作。</p><pre><code>if (level) &amp;#123;\n      console[level](`%c prev state`, `color: #9E9E9E; font-weight: bold`, prevState);\n      console[level](`%c action`, `color: #03A9F4; font-weight: bold`, formattedAction);\n      console[level](`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);\n    &amp;#125; else &amp;#123;\n      console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, prevState);\n      console.log(`%c action`, `color: #03A9F4; font-weight: bold`, formattedAction);\n      console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);\n    &amp;#125;\n</code></pre><p><strong>9、游戏结束</strong></p><pre><code>try &amp;#123;\n      console.groupEnd();\n    &amp;#125; catch (e) &amp;#123;\n      console.log(`—— log end ——`);\n    &amp;#125;\n</code></pre><p><strong>10、返回值</strong></p><pre><code>return returnValue;\n</code></pre><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h4><p>redux-logger做的事情是在控制台输出action的信息，所以首先要获取前一个action，当前action，然后是下一个action。看完之后，你对redux-logger源码的理解加深了吗？</p><p>如果觉得文章对你有帮助，在你点击收藏的同时，点个赞。</p>',50)])])}const x=o(s,[["render",p]]);export{f as __pageData,x as default};
