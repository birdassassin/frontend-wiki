import{_ as t,o as n,c as a,a2 as r}from"./chunks/framework.BWuWLRhz.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/React系列/将简单react组件写的很装逼，react-document-title组件实现.md","filePath":"wiki/legacy/React系列/将简单react组件写的很装逼，react-document-title组件实现.md"}'),o={name:"wiki/legacy/React系列/将简单react组件写的很装逼，react-document-title组件实现.md"};function p(c,e,s,i,l,u){return n(),a("div",null,[...e[0]||(e[0]=[r(`<p>因为react是单页应用，所以我们可能需要根据不同的路由改变文档的title，那么，这时候你可能就会用到<a href="https://github.com/gaearon/react-document-title" target="_blank" rel="noreferrer">react-document-title</a>插件。</p><p>这个插件主文件代码41行，主要导入了下面3个依赖包：</p><pre><code>var React = require(&#39;react&#39;),
PropTypes = require(&#39;prop-types&#39;),
withSideEffect = require(&#39;react-side-effect&#39;);    
</code></pre><p>react-side-effect是一个类似Connect组件的容器，通常它被称为高阶组件。</p><p>但是，实际上，我们可以思考，是否可以不使用这个插件完成不同路由修改title的功能，答案是当然可以。</p><p>如果使用原生js，修改title的代码只需要一行：</p><pre><code>document.title = &#39;我是标题&#39;
</code></pre><p><strong>在react中，我们可以使用非常少的代码封装出一个公共组件，来修改每个路由的title。</strong></p><pre><code>import React from &#39;react&#39;
import PropTypes from &#39;prop-types&#39;
export default class ReactDocumentTitle extends React.Component &amp;#123;
    setTitle() &amp;#123;
        const &amp;#123; title &amp;#125; = this.props
        document.title = title
    &amp;#125;
    componentDidMount() &amp;#123;
        this.setTitle()
    &amp;#125;
    componentDidUpdate() &amp;#123;
        this.setTitle()
    &amp;#125;
    render() &amp;#123;
        return React.Children.only(this.props.children)
    &amp;#125;
&amp;#125;
ReactDocumentTitle.propTypes = &amp;#123;
    title: PropTypes.string.isRequired
&amp;#125;
</code></pre><p>这份代码是将react-side-effect和react-document-title合并到一起做的事情，我把它叫做精简版。</p><p><strong>使用该组件：</strong></p><pre><code>import ReactDocumentTitle from &#39;path/ReactDocumentTitle&#39;

render() &amp;#123;
    return (
        &amp;lt;ReactDocumentTitle title=&quot;文档标题&quot;&amp;gt;
            //这里仅能有一个唯一的root元素。
        &amp;lt;/ReactDocumentTitle&amp;gt;
    )
&amp;#125;
</code></pre><p>如果你对高阶组件的写法有兴趣，可以研究一下<a href="https://github.com/gaearon/react-side-effect" target="_blank" rel="noreferrer">react-side-effect</a>。需要注意的是，这个高阶组件的代码是使用了babel编译后的结果，你可能看起来没那么容易理解。</p><p><strong>如果把我上面写的那段代码使用babel编译，你再试着理解一下：</strong></p><pre><code>&#39;use strict&#39;;

exports.__esModule = true;

var _react = require(&#39;react&#39;);

var _react2 = _interopRequireDefault(_react);

var _propTypes = require(&#39;prop-types&#39;);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) &amp;#123; return obj &amp;&amp; obj.__esModule ? obj : &amp;#123; default: obj &amp;#125;; &amp;#125;

function _classCallCheck(instance, Constructor) &amp;#123; if (!(instance instanceof Constructor)) &amp;#123; throw new TypeError(&quot;Cannot call a class as a function&quot;); &amp;#125; &amp;#125;

function _possibleConstructorReturn(self, call) &amp;#123; if (!self) &amp;#123; throw new ReferenceError(&quot;this hasn&#39;t been initialised - super() hasn&#39;t been called&quot;); &amp;#125; return call &amp;&amp; (typeof call === &quot;object&quot; || typeof call === &quot;function&quot;) ? call : self; &amp;#125;

function _inherits(subClass, superClass) &amp;#123; if (typeof superClass !== &quot;function&quot; &amp;&amp; superClass !== null) &amp;#123; throw new TypeError(&quot;Super expression must either be null or a function, not &quot; + typeof superClass); &amp;#125; subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, &amp;#123; constructor: &amp;#123; value: subClass, enumerable: false, writable: true, configurable: true &amp;#125; &amp;#125;); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; &amp;#125;

var ReactDocumentTitle = function (_React$Component) &amp;#123;
    _inherits(ReactDocumentTitle, _React$Component);

    function ReactDocumentTitle() &amp;#123;
        _classCallCheck(this, ReactDocumentTitle);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    &amp;#125;

    ReactDocumentTitle.prototype.setTitle = function setTitle() &amp;#123;
        var title = this.props.title;

        document.title = title;
    &amp;#125;;

    ReactDocumentTitle.prototype.componentDidMount = function componentDidMount() &amp;#123;
        this.setTitle();
    &amp;#125;;

    ReactDocumentTitle.prototype.componentDidUpdate = function componentDidUpdate() &amp;#123;
        this.setTitle();
    &amp;#125;;

    ReactDocumentTitle.prototype.render = function render() &amp;#123;
        return _react2.default.Children.only(this.props.children);
    &amp;#125;;

    return ReactDocumentTitle;
&amp;#125;(_react2.default.Component);

exports.default = ReactDocumentTitle;

ReactDocumentTitle.propTypes = &amp;#123;
    title: _propTypes2.default.string.isRequired
&amp;#125;;
</code></pre><p><strong>这里就有一个非常有趣的地方，以后你使用ES6写了一个react组件，然后再编译成ES5之后，发布到github上，别人就会觉得你的代码高大上很多。</strong></p>`,16)])])}const _=t(o,[["render",p]]);export{f as __pageData,_ as default};
