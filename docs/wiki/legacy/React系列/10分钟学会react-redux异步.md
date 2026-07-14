你可以结合这份redux官方的异步源码来看：[Redux Async Example][1]

一、选择一种你喜欢的异步方案，fetch，jQuery，或者是我正在使用的[axios][2]
1、安装axios插件
```
npm i --save-dev axios
```
2、新建一个fetchData.js文件，封装基本的post和get接口。axios官方还提供了很多配置选项，比如超时配置等。

```
import axios from &amp;amp;#039;axios&amp;amp;#039;
//BASE_URL是默认的url地址，如果你安装了webpack，可以在webpack配置全局变量
axios.defaults.baseURL = BASE_URL;
/*
如果没有安装webpack，就使用下面这种写法
axios.defaults.baseURL = http://ip:端口
*/

export const getData = (url, param) =&amp;amp;gt; {
    return (
        axios.get(`${url}`)
    )
}

export const postData = (url, param) =&amp;amp;gt; {
    return (
        axios.post(`${url}`, param)
    )
}
```
3、你的异步代码将写在action。

```
//导入fetchData文件
import { getData, postData } from &amp;amp;#039;./fetchData&amp;amp;#039;

//返回一个action对象，用来关联对应的reducer，将data保存到store。
const saveReducer = (data) =&amp;amp;gt; ({
    type: &amp;amp;#039;SAVE_REDUCER&amp;amp;#039;,
    data
})

//get接口测试，传入一个参数id，请求/test/:id接口，返回response并且将数据通过指定的action保存到store。
export const getTest = (id) =&amp;amp;gt; async (dispatch, getState) =&amp;amp;gt; {
    try {
        let response = await getData(`/test/${id}`)
        await dispatch(saveReducer(response.data))
    } catch (error) {
        console.log(&amp;amp;#039;error: &amp;amp;#039;, error)
    }
}

/*
post接口测试，params参数格式
let params = {
    id: 23
}
*/
export const postTest = (params) =&amp;amp;gt; async (dispatch, getState) =&amp;amp;gt; {
    try {
        let response = await postData(`/test`, params)
        await dispatch(saveReducer(response.data))
    } catch (error) {
        console.log(&amp;amp;#039;error: &amp;amp;#039;, error)
    }
}
```
4、在reducer中定义action type保存data。

```
//注意，这里不需要再import action了。
//定义一个初始化状态的state，假设现在有一个空数组testData
let initState = {
    testData: []
}

//定义一个叫做test的reducer，更新state。
export function test(state = initState, action) {
    switch (action.type) {
        case &amp;amp;#039;SAVE_REDUCER&amp;amp;#039;:
            return {
                ...state,
                testData: action.data
            }

        default:
            return state;
    }
}
```
5、现在你还需要定义一个store的配置文件，把reducer合并成store，并且关联action。

```

import { createStore, applyMiddleware } from &amp;amp;#039;redux&amp;amp;#039;;
import thunkMiddleware from &amp;amp;#039;redux-thunk&amp;amp;#039;;
import createLogger from &amp;amp;#039;redux-logger&amp;amp;#039;;
import rootReducer from &amp;amp;#039;./reducers&amp;amp;#039;;

let createStoreWithMiddleware;
// store负责管理所有reducer，module.hot.accept表示支持热更新
const logger = createLogger({ collapsed: true });
createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept(&amp;amp;#039;./reducers&amp;amp;#039;, () =&amp;amp;gt; {
      const nextRootReducer = require(&amp;amp;#039;./reducers/index&amp;amp;#039;);
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
```
6、单向数据流部分现在已经完成了，接着就在组件触发action去异步请求服务器的数据，返回给前端，然后action会自动把数据保存到内存store中。

```
import React, { Component } from &amp;amp;#039;react&amp;amp;#039;;
import { bindActionCreators } from &amp;amp;#039;redux&amp;amp;#039;;
import { connect } from &amp;amp;#039;react-redux&amp;amp;#039;;

/*actions*/
import * as testActions from &amp;amp;#039;action/test&amp;amp;#039;;

//让组件关联state和action
@connect(
    state =&amp;amp;gt; state,
    dispatch =&amp;amp;gt; bindActionCreators({testActions}, dispatch)
)
export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let params = {
            id: 23
        }
        this.props.postTest(params) //发送post请求
        
        let id = 23
        this.props.getTest(id) //发送get请求
    }

    render() {
        return(
            &amp;amp;lt;div&amp;amp;gt;
                {/*你的dom*/}
            &amp;amp;lt;/div&amp;amp;gt;
        );
    }
}

```
7、如果你的异步是click或者hover之类的事件触发的，则只需要通过事件绑定来发送action就行了。

```
&amp;amp;lt;div onClick={() =&amp;amp;gt; this.props.getTest(id)}&amp;amp;gt;

&amp;amp;lt;/div&amp;amp;gt;
```
还有更多需求 ，可以看看 [react-redux-webpack架构][3]

提问环节：

小白：你骗人，你就是个骗子，我看完这篇文章花了11分钟，为什么要写10分钟学会？

。。。

我：。。。下课。。。


  [1]: https://github.com/reactjs/redux/tree/master/examples/async
  [2]: https://www.npmjs.com/package/axios
  [3]: https://github.com/hyy1115/react-redux-webpack2