import{_ as n,o as a,c as p,a2 as e}from"./chunks/framework.BWuWLRhz.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/antd组件开发思路——alert分析.md","filePath":"wiki/legacy/React系列/antd组件开发思路——alert分析.md"}'),l={name:"wiki/legacy/React系列/antd组件开发思路——alert分析.md"};function t(c,s,i,o,r,m){return a(),p("div",null,[...s[0]||(s[0]=[e(`<p>先附上antd源码地址：<a href="https://github.com/ant-design/ant-design/tree/master/components/alert" target="_blank" rel="noreferrer">https://github.com/ant-design/ant-design/tree/master/components/alert</a></p><p>昨天写了一篇分析antd之button组件的分析，今晚继续讲antd组件篇，这篇文章主要介绍的是alert实现原理，以及我们可以从antd的组件思想中学习到的react组件开发知识。 ps：antd用的是typescript，如果是纯ES写法稍微有些不同。</p><p>下面这张图是alert组件的主要结构图。 <img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVHksO" alt="alert"></p><p>有这么几个部分： 1、demo：alert组件的使用方法 2、style：组件内部可能用到的初始化样式 3、2个.md说明文档，一个是英文版，一个是中文版 4、index.tsx：alert组件（关于这个组件，我是有话要说的，这个命名应该用alert，然后index通常是用来导出alert组件，antd每个组件都不是同一个人写的，估计写alert组件的人也没考虑那么多。）</p><p>大概知道了alert项目文件的构成之后，如何去分析组件怎样实现的呢？ 先别看代码，看一下?提供的中文文档。 <img src="https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVHks8" alt="图片描述"></p><p>主要看API部分，这些api就是组件内部需要定义的接口，一共有8个参数，包括类型、事件等可能需要用到的功能。假设你们公司也打算用react来封装自己的组件，首先要考虑的是制定这样一份API方案，确定需要实现的功能以及保留的功能。</p><p>看完文档之后，对alert组件的数据模型有了一个大概的了解，那么接下来就要看看代码是如何实现的。 react组件其实就是一个JSX语法组成的模板，给dom绑定事件，从外部传入需要的参数等。</p><p>下面这个是index.tsx的源码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import React from &amp;#039;react&amp;#039;; //react都认识了</span></span>
<span class="line"><span>import ReactDOM from &amp;#039;react-dom&amp;#039;; //用来获取当前的dom节点，这里只有这一个用途</span></span>
<span class="line"><span>import Animate from &amp;#039;rc-animate&amp;#039;; //动画组件，好吧，原来antd的组件内部是这么不纯净，导入这么多额外的插件，难怪有人觉得antd太庞大了。</span></span>
<span class="line"><span>import Icon from &amp;#039;../icon&amp;#039;; //icon又出现了，这小子几乎在好几个antd组件都会用到</span></span>
<span class="line"><span>import classNames from &amp;#039;classnames&amp;#039;; //定义样式对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//构造函数，干啥的呢，现在还不知道，往下看吧。</span></span>
<span class="line"><span>function noop() {}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//这些就是可以调用的API</span></span>
<span class="line"><span>export interface AlertProps {</span></span>
<span class="line"><span>  /**</span></span>
<span class="line"><span>   * Type of Alert styles, options:\`success\`, \`info\`, \`warning\`, \`error\`</span></span>
<span class="line"><span>   */</span></span>
<span class="line"><span>  type?: &amp;#039;success&amp;#039; | &amp;#039;info&amp;#039; | &amp;#039;warning&amp;#039; | &amp;#039;error&amp;#039;;</span></span>
<span class="line"><span>  /** Whether Alert can be closed */</span></span>
<span class="line"><span>  closable?: boolean;</span></span>
<span class="line"><span>  /** Close text to show */</span></span>
<span class="line"><span>  closeText?: React.ReactNode;</span></span>
<span class="line"><span>  /** Content of Alert */</span></span>
<span class="line"><span>  message: React.ReactNode;</span></span>
<span class="line"><span>  /** Additional content of Alert */</span></span>
<span class="line"><span>  description?: React.ReactNode;</span></span>
<span class="line"><span>  /** Callback when close Alert */</span></span>
<span class="line"><span>  onClose?: React.MouseEventHandler&amp;lt;any&amp;gt;;</span></span>
<span class="line"><span>  /** Whether to show icon */</span></span>
<span class="line"><span>  showIcon?: boolean;</span></span>
<span class="line"><span>  style?: React.CSSProperties;</span></span>
<span class="line"><span>  prefixCls?: string;</span></span>
<span class="line"><span>  className?: string;</span></span>
<span class="line"><span>  banner?: boolean;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//组件的入口在这里，一个继承于React.Component的Alert子类。</span></span>
<span class="line"><span>export default class Alert extends React.Component&amp;lt;AlertProps, any&amp;gt; {</span></span>
<span class="line"><span>//defaultProps是react组件的一个参数</span></span>
<span class="line"><span>  static defaultProps = {</span></span>
<span class="line"><span>    type: &amp;#039;info&amp;#039;,</span></span>
<span class="line"><span>  };</span></span>
<span class="line"><span>//从类的思想来看，constructor是子类Alert的构造函数，这个组件和button组件的写法有所不同，可能是出自2个工程师之手，我们可以看到在构造函数里面初始化了state的2个参数closing、closed。</span></span>
<span class="line"><span>  constructor(props) {</span></span>
<span class="line"><span>    super(props);</span></span>
<span class="line"><span>    this.state = {</span></span>
<span class="line"><span>      closing: true,</span></span>
<span class="line"><span>      closed: false,</span></span>
<span class="line"><span>    };</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>//组件内部的点击关闭事件</span></span>
<span class="line"><span>  handleClose = (e) =&amp;gt; {</span></span>
<span class="line"><span>    e.preventDefault();</span></span>
<span class="line"><span>    let dom = ReactDOM.findDOMNode(this) as HTMLElement;</span></span>
<span class="line"><span>    dom.style.height = \`\${dom.offsetHeight}px\`;</span></span>
<span class="line"><span>    // Magic code</span></span>
<span class="line"><span>    // 重复一次后才能正确设置 height</span></span>
<span class="line"><span>    dom.style.height = \`\${dom.offsetHeight}px\`;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    //设置完高度之后通过setState来更新状态，关闭alert。</span></span>
<span class="line"><span>    this.setState({</span></span>
<span class="line"><span>      closing: false,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>    //关闭时触发的回调函数，onClose可以在外部定义，至于noop，在这个组件并没有实现任何功能。</span></span>
<span class="line"><span>    (this.props.onClose || noop)(e);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>//动画结束时触发的回调函数，是动画插件提供的功能，不能算作本组件自己定义的函数。该回调只做了一件事，更新state。</span></span>
<span class="line"><span>  animationEnd = () =&amp;gt; {</span></span>
<span class="line"><span>    this.setState({</span></span>
<span class="line"><span>      closed: true,</span></span>
<span class="line"><span>      closing: true,</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>//终于到了render方法了，每个react组件都有一个render方法，然后必然又一个return dom。</span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>//从外部传入的参数，通过this.props传入，一般用const来定义，这里用let不太合适，但不是个错误。</span></span>
<span class="line"><span>    let {</span></span>
<span class="line"><span>      closable, description, type, prefixCls = &amp;#039;ant-alert&amp;#039;, message, closeText, showIcon, banner,</span></span>
<span class="line"><span>      className = &amp;#039;&amp;#039;, style,</span></span>
<span class="line"><span>    } = this.props;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // banner模式默认有 Icon，如果传入了showIcon，就显示showIcon，否则显示banner，那要是banner也没有传入呢，那就啥都不显示了。</span></span>
<span class="line"><span>    showIcon = showIcon || banner;</span></span>
<span class="line"><span>    // banner模式默认为警告，想要使用其他类型success、info、error，就不要传入banner，然后传入type即可。</span></span>
<span class="line"><span>    type = banner ? &amp;#039;warning&amp;#039; : type;</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    //根据传入的type类型来判断icon要显示那种类型样式。注意，icon也是一个小组件。</span></span>
<span class="line"><span>    let iconType = &amp;#039;&amp;#039;;</span></span>
<span class="line"><span>    switch (type) {</span></span>
<span class="line"><span>      case &amp;#039;success&amp;#039;:</span></span>
<span class="line"><span>        iconType = &amp;#039;check-circle&amp;#039;;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      case &amp;#039;info&amp;#039;:</span></span>
<span class="line"><span>        iconType = &amp;#039;info-circle&amp;#039;;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      case &amp;#039;error&amp;#039;:</span></span>
<span class="line"><span>        iconType = &amp;#039;cross-circle&amp;#039;;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      case &amp;#039;warning&amp;#039;:</span></span>
<span class="line"><span>        iconType = &amp;#039;exclamation-circle&amp;#039;;</span></span>
<span class="line"><span>        break;</span></span>
<span class="line"><span>      default:</span></span>
<span class="line"><span>        iconType = &amp;#039;default&amp;#039;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // use outline icon in alert with description</span></span>
<span class="line"><span>    if (!!description) {</span></span>
<span class="line"><span>      iconType += &amp;#039;-o&amp;#039;;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //classNames用法很简单，冒号左边是类名，右边是bool，true就显示当前样式，false就不显示当前样式，而close、description、icon、banner的样式通过外部是否传入参数或者state的状态来判断，type的样式就默认显示。</span></span>
<span class="line"><span>    let alertCls = classNames(prefixCls, {</span></span>
<span class="line"><span>      [\`\${prefixCls}-\${type}\`]: true,</span></span>
<span class="line"><span>      [\`\${prefixCls}-close\`]: !this.state.closing,</span></span>
<span class="line"><span>      [\`\${prefixCls}-with-description\`]: !!description,</span></span>
<span class="line"><span>      [\`\${prefixCls}-no-icon\`]: !showIcon,</span></span>
<span class="line"><span>      [\`\${prefixCls}-banner\`]: !!banner,</span></span>
<span class="line"><span>    }, className);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 当closeText传入为true时，将closable设置为true，我很好奇closable不也是一个可以外部传入的值吗，为什么还需要通过closeText来判断呢，感觉这3行代码有点不合理。</span></span>
<span class="line"><span>    if (closeText) {</span></span>
<span class="line"><span>      closable = true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    //如果closable为true，则closeIcon等于a标签，否则等于空。</span></span>
<span class="line"><span>    const closeIcon = closable ? (</span></span>
<span class="line"><span>      &amp;lt;a onClick={this.handleClose} className={\`\${prefixCls}-close-icon\`}&amp;gt;</span></span>
<span class="line"><span>        {closeText || &amp;lt;Icon type=&amp;quot;cross&amp;quot; /&amp;gt;}</span></span>
<span class="line"><span>      &amp;lt;/a&amp;gt;</span></span>
<span class="line"><span>    ) : null;</span></span>
<span class="line"><span>    //如果closed是true，就return null，false则return下面的组件。</span></span>
<span class="line"><span>    return this.state.closed ? null : (</span></span>
<span class="line"><span>      &amp;lt;Animate</span></span>
<span class="line"><span>        component=&amp;quot;&amp;quot;</span></span>
<span class="line"><span>        showProp=&amp;quot;data-show&amp;quot;</span></span>
<span class="line"><span>        transitionName={\`\${prefixCls}-slide-up\`}</span></span>
<span class="line"><span>        onEnd={this.animationEnd}</span></span>
<span class="line"><span>      &amp;gt;</span></span>
<span class="line"><span>        &amp;lt;div data-show={this.state.closing} className={alertCls} style={style}&amp;gt;</span></span>
<span class="line"><span>          {showIcon ? &amp;lt;Icon className={\`\${prefixCls}-icon\`} type={iconType} /&amp;gt; : null}</span></span>
<span class="line"><span>          &amp;lt;span className={\`\${prefixCls}-message\`}&amp;gt;{message}&amp;lt;/span&amp;gt;</span></span>
<span class="line"><span>          &amp;lt;span className={\`\${prefixCls}-description\`}&amp;gt;{description}&amp;lt;/span&amp;gt;</span></span>
<span class="line"><span>          {closeIcon}</span></span>
<span class="line"><span>        &amp;lt;/div&amp;gt;</span></span>
<span class="line"><span>      &amp;lt;/Animate&amp;gt;</span></span>
<span class="line"><span>    );</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>根据alert组件的模型，我们可以总结出其他react组件的开发模式。 1、写好API文档，这些API将作为组件的参数。 2、写一个基本的react组件架构，比如import、export class、render()、constructor()、interface。 3、接着就在render()方法里面写需要外部传入的参数，通过this.props来控制。 4、在return里面写好你的dom结构，你还可能在render方法定义可变的样式，类似上面的alert组件。 5、给dom绑定事件，然后在alert组件内部写这些事件的逻辑。 6、写逻辑这部分是最难的，要花多点心思去组织你的代码。</p><p>赶紧去自己尝试些一个类似的组件吧。</p>`,11)])])}const h=n(l,[["render",t]]);export{g as __pageData,h as default};
