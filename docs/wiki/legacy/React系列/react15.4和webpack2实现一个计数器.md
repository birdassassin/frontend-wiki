作为一个redux狂热爱好者，我还是第一次尝试剥离redux框架来搭建react项目，我喜欢用最新的版本来研究，比如react15，webpack2，等到react16出来，恐怕大家又得重新适应一些规则了。

学习前端以来，我发现前端框架变化太快，如果不保持持续性的学习能力，很容易就会被新人给替代。

这只是一个小玩意，展示了react和webpack2的基本框架搭建，没有redux，没有mobx，你可以纯粹当做学习如何搭建一个简单的react和webpack2框架，或者用来扩展成一个可管理的项目。

当然，在企业项目中，还是推荐用redux或者mobx来管理state。

![图片描述][1]

看一下主要的代码。

**1、package.json：插件管理，没有配置build，只配置了start启动项目。**

```
{
  &amp;amp;quot;name&amp;amp;quot;: &amp;amp;quot;react-webpack2&amp;amp;quot;,
  &amp;amp;quot;version&amp;amp;quot;: &amp;amp;quot;0.1.0&amp;amp;quot;,
  &amp;amp;quot;private&amp;amp;quot;: true,
  &amp;amp;quot;scripts&amp;amp;quot;: {
    &amp;amp;quot;start&amp;amp;quot;: &amp;amp;quot;node server.js&amp;amp;quot;
  },
  &amp;amp;quot;dependencies&amp;amp;quot;: {
    &amp;amp;quot;babel-polyfill&amp;amp;quot;: &amp;amp;quot;^6.23.0&amp;amp;quot;,
    &amp;amp;quot;react&amp;amp;quot;: &amp;amp;quot;15.4.2&amp;amp;quot;,
    &amp;amp;quot;react-dom&amp;amp;quot;: &amp;amp;quot;15.4.2&amp;amp;quot;,
    &amp;amp;quot;react-hot-loader&amp;amp;quot;: &amp;amp;quot;^3.0.0-beta.6&amp;amp;quot;,
    &amp;amp;quot;react-router-dom&amp;amp;quot;: &amp;amp;quot;^4.0.0&amp;amp;quot;,
    &amp;amp;quot;react-scripts&amp;amp;quot;: &amp;amp;quot;0.9.5&amp;amp;quot;
  },
  &amp;amp;quot;devDependencies&amp;amp;quot;: {
    &amp;amp;quot;babel-core&amp;amp;quot;: &amp;amp;quot;^6.24.0&amp;amp;quot;,
    &amp;amp;quot;babel-loader&amp;amp;quot;: &amp;amp;quot;^6.4.1&amp;amp;quot;,
    &amp;amp;quot;babel-preset-es2015&amp;amp;quot;: &amp;amp;quot;^6.24.0&amp;amp;quot;,
    &amp;amp;quot;babel-preset-react&amp;amp;quot;: &amp;amp;quot;^6.23.0&amp;amp;quot;,
    &amp;amp;quot;babel-preset-stage-0&amp;amp;quot;: &amp;amp;quot;^6.22.0&amp;amp;quot;,
    &amp;amp;quot;babel-preset-stage-2&amp;amp;quot;: &amp;amp;quot;^6.22.0&amp;amp;quot;,
    &amp;amp;quot;css-loader&amp;amp;quot;: &amp;amp;quot;^0.27.3&amp;amp;quot;,
    &amp;amp;quot;postcss-loader&amp;amp;quot;: &amp;amp;quot;^1.3.3&amp;amp;quot;,
    &amp;amp;quot;style-loader&amp;amp;quot;: &amp;amp;quot;^0.16.1&amp;amp;quot;,
    &amp;amp;quot;webpack&amp;amp;quot;: &amp;amp;quot;^2.3.2&amp;amp;quot;,
    &amp;amp;quot;webpack-dev-server&amp;amp;quot;: &amp;amp;quot;^2.4.2&amp;amp;quot;
  }
}

```

**2、webpack.config.js：webpack配置文件是一个object，你把他看成是一个json数据来理解会容易很多。**


```
const HtmlWebpackPlugin = require(&amp;amp;#039;html-webpack-plugin&amp;amp;#039;);
const webpack = require(&amp;amp;#039;webpack&amp;amp;#039;);
const path = require(&amp;amp;#039;path&amp;amp;#039;);

module.exports = {
    entry: {
        app: [
            &amp;amp;#039;webpack-dev-server/client?http://localhost:3133&amp;amp;#039;,
            &amp;amp;#039;webpack/hot/only-dev-server&amp;amp;#039;,
            &amp;amp;#039;babel-polyfill&amp;amp;#039;,
            &amp;amp;#039;react-hot-loader/patch&amp;amp;#039;,
            &amp;amp;#039;./src/index&amp;amp;#039;
        ]
    },
    output: {
        path: path.resolve(__dirname, &amp;amp;#039;dist&amp;amp;#039;),
        filename: &amp;amp;#039;[name].js&amp;amp;#039;,
        publicPath: &amp;amp;#039;/dist&amp;amp;#039;
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, use: &amp;amp;#039;babel-loader&amp;amp;#039;, exclude: /node_modules/},
            {test: /\.css$/, use: [&amp;amp;#039;style-loader&amp;amp;#039;, &amp;amp;#039;css-loader?importLoaders=1&amp;amp;#039;]},
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({template: &amp;amp;#039;./index.html&amp;amp;#039;}),
        new webpack.HotModuleReplacementPlugin(), //热更新
        new webpack.NamedModulesPlugin(), //在控制台打印模块
    ],
    devtool: &amp;amp;#039;eval&amp;amp;#039;
}
```

**3、server.js：配置webpack-dev-server启动项，还有一种方式是通过express来启动前端项目。**

```
var webpack = require(&amp;amp;#039;webpack&amp;amp;#039;);
var WebpackDevServer = require(&amp;amp;#039;webpack-dev-server&amp;amp;#039;);
var config = require(&amp;amp;#039;./webpack.config&amp;amp;#039;);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(3133, &amp;amp;#039;localhost&amp;amp;#039;, function (err) {
    if (err) {
        console.log(err);
    }

    console.log(&amp;amp;#039;Listening at localhost:3133&amp;amp;#039;);
});
```

**4、babelrc文件：配置详情请去官网 http://babeljs.io/docs/usage/babelrc/**

```
{
  &amp;amp;quot;presets&amp;amp;quot;: [
    [&amp;amp;quot;es2015&amp;amp;quot;, {&amp;amp;quot;modules&amp;amp;quot;: false, &amp;amp;quot;loose&amp;amp;quot;: true}],
    // webpack understands the native import syntax, and uses it for tree shaking
    &amp;amp;quot;stage-0&amp;amp;quot;,
    &amp;amp;quot;stage-2&amp;amp;quot;,
    // Specifies what level of language features to activate.
    // Stage 2 is &amp;amp;quot;draft&amp;amp;quot;, 4 is finished, 0 is strawman.
    // See https://tc39.github.io/process-document/

    &amp;amp;quot;react&amp;amp;quot;
    // Transpile React components to JavaScript
  ],
  &amp;amp;quot;plugins&amp;amp;quot;: [
    &amp;amp;quot;react-hot-loader/babel&amp;amp;quot;
    // Enables React code to work with HMR.
  ]
}
```


**5、index.js：在src目录下面的index.js作为网站的入口。我们看到在react-hot-loader提取出了一个AppContainer，官方认为一个网站应用只有一个单一的根元素是比较好的实现方式。关于使用热更新的同学，你配置好了webpack、babel之后，别忘了module.hot.accept()，这个方法是用来调用你需要实现热更新的代码，通常放在网站的入口或者是store的入口。**

```
import React from &amp;amp;#039;react&amp;amp;#039;;
import ReactDOM from &amp;amp;#039;react-dom&amp;amp;#039;;

import { AppContainer } from &amp;amp;#039;react-hot-loader&amp;amp;#039;;
// AppContainer is a necessary wrapper component for HMR

import App from &amp;amp;#039;./App&amp;amp;#039;;

const render = (Component) =&amp;amp;gt; {
    ReactDOM.render(
        &amp;amp;lt;AppContainer&amp;amp;gt;
            &amp;amp;lt;Component/&amp;amp;gt;
        &amp;amp;lt;/AppContainer&amp;amp;gt;,
        document.getElementById(&amp;amp;#039;root&amp;amp;#039;)
    );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
    //这种写法只在webpack2支持，如果是webpack1版本，还是要用require的方式来导入模块。
    module.hot.accept(&amp;amp;#039;./App&amp;amp;#039;, () =&amp;amp;gt; { render(App) });
}
```

**6、App.js：如果说index.js是网站的入口，那么App.js是组件的入口，我们把App.js叫做父组件，下面这种形式是函数式组件的写法，返回一个jsx对象。**

```
import React from &amp;amp;#039;react&amp;amp;#039;;
import styles from &amp;amp;#039;./app.css&amp;amp;#039;;

import Button from &amp;amp;#039;./components/Button&amp;amp;#039;

const App = () =&amp;amp;gt; (
    &amp;amp;lt;div className={styles.app}&amp;amp;gt;
        &amp;amp;lt;h2&amp;amp;gt;一个简单的react-webpack计数器....&amp;amp;lt;/h2&amp;amp;gt;
        &amp;amp;lt;Button /&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
);

export default App;
```

**7、Button.js：子组件，放在components下面，子组件我采用了class的写法，当你的组件是一个纯函数的时候，就推荐使用6的函数组件写法，当组件有state的时候，采用class的写法比较合适。下面的例子实现了一个计数器的效果，点击按钮，计数器就加1.**

```
import React, { Component } from &amp;amp;#039;react&amp;amp;#039;;

export default class Button extends Component {

    state = {
        count: 1
    }

    render() {
        const { count } = this.state
        return (
            &amp;amp;lt;div&amp;amp;gt;
                &amp;amp;lt;button
                    style=&amp;#123;&amp;#123;border: &amp;amp;quot;1px solid #000&amp;amp;quot;&amp;#125;&amp;#125;
                    onClick={() =&amp;amp;gt; this.setState({count: count + 1})}&amp;amp;gt;点击计数器&amp;amp;lt;/button&amp;amp;gt;
                &amp;amp;lt;div style=&amp;#123;&amp;#123;color: &amp;amp;quot;#f60&amp;amp;quot;, fontSize: &amp;amp;quot;20px&amp;amp;quot;&amp;#125;&amp;#125;&amp;amp;gt;{count}&amp;amp;lt;/div&amp;amp;gt;
            &amp;amp;lt;/div&amp;amp;gt;
        )
    }
}
```

**8、现在你可以体验一下热更新了，修改src目录下的css、js，可以在浏览器看到修改的部分更新了。**

**看完了，可以结合配置好的项目学习一下：[react-webpack2][2] **


备注：
react完整项目框架：[目前最新最完整的react技术栈框架在这里，我会持续性跟随各个插件的官方脚步更新版本][3]（新手请先看懂上面的基础框架再入手高级框架，善意的建议）


  [1]: https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVLr38
  [2]: https://github.com/hyy1115/react-webpack2/
  [3]: https://github.com/hyy1115/react-redux-webpack2