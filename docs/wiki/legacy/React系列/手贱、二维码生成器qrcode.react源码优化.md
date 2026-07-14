**mark插件源码: **[https://github.com/zpao/qrcode.react][1]

react开发者可能需要一个react组件，这个组件的作用是根据链接生成一个二维码，我在github上找到了qrcode.react插件，它是facebook程序员写的。。

使用过程中，遇到了一个需求，为了做适配，我想使用百分比，而不是具体像素。

下面是我思考解决方案的几个步骤：

**1、查看源码**
源码是编译成ES5的文件，看得比较晕😓，我一手贱，就改成ES6的react写法，同时去掉了一些不必要的验证信息。。

update和render方法是最主要的，render方法中，return了一个canvas标签，宽度和高度在这里设置。update方法是生成二维码的主要实现，但它的算法核心是qr.js插件里面的东西。

```javascript
//ES6版本的qrcode.react
import React from &amp;amp;#039;react&amp;amp;#039;;
import PropTypes from &amp;amp;#039;prop-types&amp;amp;#039;;

import QRCodeImpl from &amp;amp;#039;qr.js/lib/QRCode&amp;amp;#039;;

import ErrorCorrectLevel from &amp;amp;#039;qr.js/lib/ErrorCorrectLevel&amp;amp;#039;;

const getBackingStorePixelRatio = ctx =&amp;amp;gt; ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

export default class QRCode extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.update();
    }
    componentDidUpdate() {
        this.update();
    }
    update() {
        const _props = this.props;
        const value = _props.value;
        const size = _props.size;
        const level = _props.level;
        const bgColor = _props.bgColor;
        const fgColor = _props.fgColor;
        
        const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
        qrcode.addData(value);
        qrcode.make();
        
        if (this._canvas != null) {
            const canvas = this._canvas;
            
            const ctx = canvas.getContext(&amp;amp;#039;2d&amp;amp;#039;);
            if (!ctx) {
                return;
            }
            const cells = qrcode.modules;
            const tileW = size / cells.length;
            const tileH = size / cells.length;
            const scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
            canvas.height = canvas.width = size * scale;
            ctx.scale(scale, scale);
            cells.forEach((row, rdx) =&amp;amp;gt; {
                row.forEach((cell, cdx) =&amp;amp;gt; {
                    ctx &amp;amp;amp;&amp;amp;amp; (ctx.fillStyle = cell ? fgColor : bgColor);
                    const w = Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW);
                    const h = Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH);
                    ctx &amp;amp;amp;&amp;amp;amp; ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
                });
            });
        }
    }
    render() {
        const { size } = this.props
        return &amp;amp;lt;canvas ref={_ref =&amp;amp;gt; this._canvas = _ref} style=&amp;#123;&amp;#123;height: size, width: size&amp;#125;&amp;#125; &amp;amp;gt;&amp;amp;lt;/canvas&amp;amp;gt;
    }
}

Object.defineProperty(QRCode, &amp;amp;#039;defaultProps&amp;amp;#039;, {
    enumerable: true,
    writable: true,
    value: {
        size: 128,
        level: &amp;amp;#039;L&amp;amp;#039;,
        bgColor: &amp;amp;#039;#FFFFFF&amp;amp;#039;,
        fgColor: &amp;amp;#039;#000000&amp;amp;#039;
    }
});
Object.defineProperty(QRCode, &amp;amp;#039;propTypes&amp;amp;#039;, {
    enumerable: true,
    writable: true,
    value: {
        value: PropTypes.string.isRequired,
        size: PropTypes.any,
        level: PropTypes.oneOf([&amp;amp;#039;L&amp;amp;#039;, &amp;amp;#039;M&amp;amp;#039;, &amp;amp;#039;Q&amp;amp;#039;, &amp;amp;#039;H&amp;amp;#039;]),
        bgColor: PropTypes.string,
        fgColor: PropTypes.string
    }
});
```

**2、思考canvas支持百分比**
通常我们给 canvas传入的宽高是具体的像素值，他是一个number类型，但在这里，我把验证类型改成了any。

我一开始想的是在render中获取设备的实际宽度，然后根据同等放大的比例算出宽高。然后发现在update中也需要写一段相同的代码，然后我就想将它封装成一个函数。
```javascript
function getSize(size) {
    const clienWidth = document.documentElement.clientWidth
    return Math.floor(size*clienWidth/320)
}
```
这是一个简单的同等比例求X的表达式，在客户端宽度为320的时候，对应的是size，算出一个比例，在客户端宽度为414时，根据这个比例求出一个新值，然后return。

这样做的确可以，比如我现在调用这个二维码组件。传入size为70，那么你使用iPhone5打开，canvas就是70，使用iPhone 6 plus打开，canvas就是90。这样实现了根据百分比去适配。
```javacript
&amp;amp;lt;QRCode value=&amp;amp;quot;https://www.xx.com&amp;amp;quot; size={70} /&amp;amp;gt;
```
**3、再次优化**
接着，我发现还可以把getSize提取到父组件，然后先算出具体的值，在传递给QRCode。
```javascript
&amp;amp;lt;QRCode value=&amp;amp;quot;https://www.xx.com&amp;amp;quot; size={getSize(70)} /&amp;amp;gt;
```
**总结**
这篇文章探究的是如何自适应canvas的宽高，最终的做法很简单，和qrcode.react插件内部没有关系，而我一开始做的源码反编译是为了先探究清楚源码核心，从内部往外冒泡，找到最简单的解决办法。

你可以继续使用原作者的插件，也可以复制我上面的那份改装后的源码，新建一个QRCode.js组件保存起来，然后再添加qr.js插件。
```json
npm i --save qr.js
```

最后，你可以使用它了。

  [1]: https://github.com/zpao/qrcode.react