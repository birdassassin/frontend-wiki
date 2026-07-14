在做react项目过程中，有时候想实现app的那种上下左右切换路由的特效，但是一直没有找到合适的教程，要么说的不清楚，没有demo，要么就是版本太老，过时了，要抓狂啦😫。

根据网上搜到的资料，以前实现react动画有这么几种方式：  

1、ReactCSSTransitionGroup

2、react-router-transition

3、还有的就是根据这2个库做了二次封装的一些动画插件。

但是，在这里我要分享的是 [**react-transition-group**][1]，为什么是这个，而不是上面2个，因为这个动画插件兼容react15.4+版本，而且也是官方推荐的，上面2个插件只适合react老版本的动画。

### 注意，该教程只对react-transition-group的V1.1.1版本有效。对V2无效。V2的API被作者改了。

#### 安装 react-transition-group

```
npm install react-transition-group --save
```

#### 在react中使用 react-transition-group

我使用的版本是 **react15.5 + react-router4 + redux3.6**

为什么要提到这3个插件？

答：非常关键，如果你的项目没有使用redux，那么请寻找其他动画方案。

原理：在路由外层使用 react-transition-group ，配置动画样式、同时你还需要一个唯一的key表示子节点。

我们知道，react-router4被设计成了组件，可以在react组件中任意位置使用，常常你在入口处需要用到react-router，因为你希望一打开首页，就要加载首页路由，还有可以从首页跳往其他页面的路由组件。

在 App.js中，关键代码

```
import CSSTransitionGroup from &amp;amp;#039;react-transition-group/CSSTransitionGroup&amp;amp;#039;
import createHistory from &amp;amp;#039;history/createHashHistory&amp;amp;#039;
const history = createHistory()

export default class App extends React.Component {
    render() {
        const { animateCls } = this.props.global
        return (
            &amp;amp;lt;Router history={history}&amp;amp;gt;
              &amp;amp;lt;Route render={({ location }) =&amp;amp;gt; {
                  return(
                      &amp;amp;lt;CSSTransitionGroup
                          transitionName={animateCls}
                          transitionEnter={true}
                          transitionLeave={true}
                          transitionEnterTimeout={400}
                          transitionLeaveTimeout={400}
                      &amp;amp;gt;
                          &amp;amp;lt;div key={location.pathname}&amp;amp;gt;
                              &amp;amp;lt;Route location={location} exact path=&amp;amp;quot;/&amp;amp;quot; component={Home} /&amp;amp;gt;
                              &amp;amp;lt;Route location={location} path=&amp;amp;quot;/search&amp;amp;quot; component={Search} /&amp;amp;gt;
                          &amp;amp;lt;/div&amp;amp;gt;
                      &amp;amp;lt;/CSSTransitionGroup&amp;amp;gt;
                  )
              &amp;#125;&amp;#125;/&amp;amp;gt;
          &amp;amp;lt;/Router&amp;amp;gt;
        )
    }
}
```

你应该关注这段代码的下面几个部分，或许你在github上都能看到官方文档，但是官方文档没有教我们如何控制不同页面的动画动态展示。

1、const { animateCls } = this.props.global

animateCls是存储在store中的变量，他用来表示动画的transitionName，也就是动画样式，store是什么？是redux中的数据存储核心，我们需要实现在不同状态下面，transitionName的动画样式会按照我们的需求而改变，比如从首页切换到二级页面，然后从2级页面返回到首页，这2个过程执行的动画是相反的，这时候我们不能把transitionName写死。

我写了一个action，来控制animateCls值的变化。这个action很简单，就是传入一个样式参数，当不同的状态的时候，传入不同的参数就能实现动画的定制了。

```
export const currentAnimate = (cls) =&amp;amp;gt; ({
    type: &amp;amp;#039;CURRENT_ANIMATE&amp;amp;#039;,
    cls
})
```
熟悉redux的你，就会知道还需要写reducer。  

```
const initState = {
    animateCls: &amp;amp;#039;normal&amp;amp;#039;, //过渡动画样式
}

export const global = (state = initState, action) =&amp;amp;gt; {
    switch (action.type) {
        case &amp;amp;quot;CURRENT_ANIMATE&amp;amp;quot;:
            return {
                ...state,
                animateCls: action.cls
            }
        default:
            return state
    }
}
```

接着我们就回到了一开始的那一步，在组件中读取 const { animateCls } = this.props.global。

然后，我写了2个动画样式，一个是往左边移动、一个是往右边移动。  

```
/*路由切换动画——左移动*/
.left-enter {
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 10000;
    opacity: 1;
    transform: translateX(100%);
}

.left-enter.left-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all 0.4s ease-out;
}

.left-leave {
    opacity: 1;
    transform: translateX(0);
}

.left-leave.left-leave-active {
    opacity: 1;
    transform: translateX(-100%);
    transition: all 0.4s ease-out;
}

/*路由切换动画——右移动*/
.right-enter {
    transform: translateX(-100%);
}

.right-enter.right-enter-active {
    transform: translateX(0);
    transition: all 0.4s ease-out;
}

.right-leave {
    position: absolute;
    top: 0;
    background: #fff;
    z-index: 10000;
    opacity: 1;
    transform: translateX(0);
}

.right-leave.right-leave-active {
    opacity: 1;
    transform: translateX(100%);
    transition: all 0.4s ease-out;
}
```
关于CSS3的知识，我就不解释了，以右移样式为例子，对每个参数做一下说明。

一个动画完整流程，满足下面4个样式  

```
.right-enter {}

.right-enter.right-enter-active {}

.right-leave {}

.right-leave.right-leave-active {}
```
right表示的是 animateCls，也就是我们要动态设置的值，react动画分为进入和离开，很多人可能不太理解进入和离开到底指什么。

**enter：新路由进入的动画。**
**leave：旧路由离开的动画。**

比如，从二级页面返回首页，当你点击返回按钮后，二级页面执行的是leave的动画，首页执行的是enter的动画，2个动画执行是同时进行的。

**因为animateCls默认是normal，要让他改成right，只需要在当前组件中监听返回按钮的onClick事件，然后执行dispatch action，传入参数“right”。**

**但是这样做不是很完善，因为浏览器和app不同，浏览器有自己的返回按钮，所以你还需要监听浏览器的返回按钮。这一步我还没有完善好，相信对于熟悉监听事件的你来说，是个很容易完善的功能🤣，如果是做react-native，那么可以省去监听浏览器返回按钮的步骤。**

比如我只监听了网页中的返回按钮onCLick事件。  

```
&amp;amp;lt;Link to=&amp;amp;quot;/&amp;amp;quot; className=&amp;amp;quot;style_a&amp;amp;quot; onClick={() =&amp;amp;gt; handleClick(&amp;amp;#039;right&amp;amp;#039;)}&amp;amp;gt;返回首页&amp;amp;lt;/Link&amp;amp;gt;
```
2、别忘了设置一个唯一的key，如果你的组件是一个列表，那么需要在map的时候设置一个key。

整体实现方案就这么多，喜欢使用react过渡动画的上吧。


**如果文章对你有帮助，请点击一下推荐。**

  [1]: https://github.com/reactjs/react-transition-group