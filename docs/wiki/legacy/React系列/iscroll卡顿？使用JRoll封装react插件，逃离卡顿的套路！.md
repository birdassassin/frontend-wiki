
这次分享一个react移动端封装滚动插件。

我们在做移动端垂直滚动的时候，会出现各种问题，卡顿、穿透、兼容性，最不能容忍的是卡顿，比如使用 [IScroll5][1]的时候，**使用transition来实时计算滚动的状态，非常消耗性能**，你能百度搜索到的各种iscroll卡顿解决方案都尝试了，最后还是不得不放弃，在IOS上的体验还行，但是在Android的滚动体验，一个字：cao。

然后，我就使用了 [JRoll2][2]，该作者使用的是translate滚动方式，大大减小了卡顿的情况，打开京东移动端网站，点击底bar的分类，然后左侧的分类导航就是使用translate的滚动方式实现的。

Iscroll和JRoll使用的方式几乎一样，我仅仅改变了一个require('Iscroll') => require('jroll')，就能无缝切换。

下面就讲解封装JRoll和具体使用的方法。

#### 封装JRoll
新建一个MyScroll.js：jroll体积非常小，用起来很方便，我简单封装了3个配置参数**ID**和**height**、**children**。ID是配置div容器的id属性，height是指div容器的高度（必须设置），children是滚动的元素列表。

我们在componentDidMount实例化jroll对象，当componentDidUpdate的时候，也就是数据发生更新的时候，滚动区域的高度可能发生了变化，那么执行refresh重新计算滚动区域。你如果需要更强大的配置，还可以添加option参数的设置，在这里我就采用默认配置。

    import React from 'react'
    const JRoll = require('jroll')
    
    export default class MyJRoll extends React.Component &#123;
        constructor(props) &#123;
            super(props)
            this.jroll = null
        &#125;
        componentDidMount() &#123;
            let wrappers = this.props.ID || 'wrappers'
            this.jroll = new JRoll(`#$&#123;wrappers&#125;`)
            this.jroll.refresh()
        &#125;
        componentDidUpdate() &#123;
            this.jroll.refresh()
        &#125;
        render() &#123;
            const &#123; height &#125; = this.props
            return (
                &lt;div id=&#123;this.props.ID ? this.props.ID : 'wrappers'&#125; style=&#123;&#123;height: height ? height : "100%"&#125;&#125;&gt;
                    &lt;ul id="scroller"&gt;
                        &#123;this.props.children&#125;
                    &lt;/ul&gt;
                &lt;/div&gt;
            )
        &#125;
    &#125;
    
#### 在react组件中使用MyScroll.js
**记住，一定要给滚动容器设置一个具体的高度**，最好的办法是在组件渲染完成之后，去计算滚动区域需要的高度，然后设置给state，如果你使用了redux，那么传递到store里面保存这个高度。在组件内设置state可能存在异步无法即使更新的问题，但是在store中保存和读取就不存在。

    import React from 'react'
    import MyScroll from './MyScroll'
    export class ReportPage extends React.Component &#123;
        constructor(props) &#123;
            super(props)
            this.state = &#123;
                scrollHeight: 0
            &#125;
        &#125;
        
        componentDidMount() &#123;
            //1、使用函数获取你当前MyScroll的滚动高度
            //2、将计算出来的高度存储到state或者store
            //这2个步骤推荐封装成一个函数。
            this.setState(&#123;scrollHeight: newHeight + 'px'&#125;)
        &#125;
        
        render() &#123;
            return (
                &lt;MyScroll ID="myWrapper" height=&#123;this.state.scrollHeight&#125; ref=&#123;myRoll =&gt; this.myRoll = myRoll&#125;>
                      &lt;div&gt;1&lt;/div&gt;
                      &lt;div&gt;2&lt;/div&gt;
                      &lt;div&gt;3&lt;/div&gt;
                &lt;/MyScroll&gt;
            )
        &#125;
    &#125;

#### 额外的一些操作
1、推荐在移动端添加FastClick插件解决移动端点击事件的一些bug。

2、在全局使用MyScroll滚动插件，你需要全局设置下面的代码，禁用触摸的默认事件，设置html/body的高度。

    document.addEventListener('touchmove', (event) => event.preventDefault(), false);


    html, body &#123;
        height: 100%
    &#125;

3、在组件内部使用滚动插件，你需要在组件内部的componentDidMount()设置禁用函数，并且在卸载组件的时候取消禁用。

    componentDidMonut() &#123;
        document.addEventListener('touchmove', this.handler(), false);
    &#125;
    
    handler() &#123;
        event.preventDefault()
    &#125;
    
    componentWillUnmount() &#123;
        document.removeEventListener('touchmove', this.handler(), false);
    &#125;
    
4、支持MyScroll插件嵌套使用，请使用新的ID命名和高度。

    &lt;MyScroll ID="myWrapper" height=&#123;this.state.scrollHeight&#125; ref=&#123;myRoll =&gt; this.myRoll = myRoll&#125;>
             &lt;div&gt;1&lt;/div&gt;
             &lt;MyScroll ID="childWrapper" height=&#123;this.state.childHeight&#125; ref=&#123;childRoll =&gt; this.childRoll = childRoll&#125;>
             &lt;/MyScroll&gt;
    &lt;/MyScroll&gt;


**如果文章对你有帮助，请点击一下推荐。**

  [1]: https://github.com/cubiq/iscroll
  [2]: https://github.com/chjtx/JRoll


