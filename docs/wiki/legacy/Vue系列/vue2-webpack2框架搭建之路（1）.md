一直以来，我从事react开发，突然想用vue来搭建一个项目，看看我的踩坑之路。

react、vue、angular代表了3种前端工程化的思想，学习三大框架主要是理解它们的核心概念，比如组件、生命周期、单向数据流、双向绑定等。这些概念在非框架开发中，很少人会去这样系统化的思考，对于新手来说，很多概念都没有接触过，不知道从何入手一个react、vue或者是angular项目，下面我将会从零搭建vue项目，边做项目边学习vue的思想。

### **1、想要使用vue，我首先该怎么做？**

想要学习vue，我第一件事是去vue官网看简介：[https://cn.vuejs.org/v2/guide/installation.html][3] ，仔细一看，vue现在有1.X和2.X的区别，很好，我果断选择2.X。

选中了vue版本，我上知乎搜索了vue框架搭建的方式，看了前辈的各种分享，了解到一个叫做 [cooking][4] 的好玩意，好在哪里？

cooking 的目标是将你从繁琐的构建配置中解放出来，同时还省去每个项目都要安装一堆开发依赖的麻烦。基于 webapck 但更友好的配置项、易用的扩展配置机制，让你专注项目忘掉配置。

哇，看到cooking官网介绍的这么好，我果断按照它的教程去做，瞎搞了一下下，发现用的不爽啊，一键配置环境看起来很高大上，可是还得去学习cooking的使用，而且本地得安装cooking，搞得我头晕，虽然在浏览器成功访问到了网页，但我还是放弃了这个好玩意。

这时候只能自己从0开始搭建项目了。

### **2、在github新建vue2-web项目。**

打开github首页，点击start a project。

接着你会看到Create a new repository，需要你填写项目信息，这个步骤跳过。

然后项目就建好了，clone到本地。

### **3、初始化npm**

用shell或者cmd进入项目根目录，执行下面的命令，选项什么的直接跳过，最后会生成package.json文件。

```
npm init
```

### **4、安装webpack**

没有webpack就活不下去的感觉，但是配置webpack也会让人活不下去，太难记住webpack的配置项了，不过别担心，我已经帮你搞定这一步了，咋们都必须使用webpack2啊。

```
npm install --save-dev webpack
```

还需要前端服务器，做热更新呀，webpack-dev-server登场。

```
npm install --save-dev webpack-dev-server
```

### **5、创建webpack.config.js文件**

和react中的webpack配置文件没什么区别，只是稍微改动一个地方即可移植过来使用。
**千万不要把js和vue放到一起**，不起作用的，必须分开，必须，这个坑我已经踩过了，为了找这个坑，浪费了我好几个小时，最最最隐蔽的一个地方。

```
rules: [{
            test: /\.js$/,
            use: [&amp;amp;#039;babel-loader&amp;amp;#039;],
            exclude: /node_modules/,
            include: resolve(&amp;amp;#039;src&amp;amp;#039;)
        },{
            test: /\.vue$/,
            use: [&amp;amp;#039;vue-loader&amp;amp;#039;],
            exclude: /node_modules/,
            include: resolve(&amp;amp;#039;src&amp;amp;#039;)
        },
```

### **6、创建.babelrc文件。**

babel少不了，注意这里不是用react了，而是vue，包括下面几个插件，flow-vue、transform-vue-jsx。

```
{
  &amp;amp;quot;presets&amp;amp;quot;: [&amp;amp;quot;es2015&amp;amp;quot;, &amp;amp;quot;flow-vue&amp;amp;quot;, &amp;amp;quot;stage-0&amp;amp;quot;, &amp;amp;quot;stage-2&amp;amp;quot;],
  &amp;amp;quot;plugins&amp;amp;quot;: [&amp;amp;quot;transform-vue-jsx&amp;amp;quot;],
  &amp;amp;quot;comments&amp;amp;quot;: false,
  &amp;amp;quot;env&amp;amp;quot;: {
    &amp;amp;quot;production&amp;amp;quot;: {
      &amp;amp;quot;plugins&amp;amp;quot;: [
        [&amp;amp;quot;transform-runtime&amp;amp;quot;, { &amp;amp;quot;polyfill&amp;amp;quot;: false, &amp;amp;quot;regenerator&amp;amp;quot;: false }]
      ]
    }
  }
}
```

### **7、在package.json添加start命令**

直接使用webpack-dev-server启动，哇塞，一堆报错，说少了哪个module，这个简单，因为配置文件里面引用的一堆module，还没有安装到项目呢，这时候一个个安装好就行了。

```
&amp;amp;quot;start&amp;amp;quot;: &amp;amp;quot;webpack-dev-server&amp;amp;quot;,
```

### **8、项目入口main.js文件。**

这个文件名自己喜欢咋取就咋取，代码挺简单的，实例化一个Vue和路由，是不是和react的入口文件很像？当然，我做的是SPA，所以采用单入口的形式，如果是非SPA模式，就不是这种配置方式了。

```
import Vue from &amp;amp;#039;vue&amp;amp;#039;;
import App from &amp;amp;#039;./App.vue&amp;amp;#039;;
import VueRouter from &amp;amp;#039;vue-router&amp;amp;#039;;
import routes from &amp;amp;#039;./routes&amp;amp;#039;;
import VueResource from &amp;amp;#039;vue-resource&amp;amp;#039;;

Vue.use(VueResource); //http请求注册
Vue.use(VueRouter); //路由注册

// 实例化路由
const router = new VueRouter({
    // mode: &amp;amp;#039;history&amp;amp;#039;, //H5 路由模式，需要服务端做渲染防止404错误
    base: __dirname,
    linkActiveClass: &amp;amp;#039;on&amp;amp;#039;,
    routes
})

let render = new Vue({
    router,
    el: &amp;amp;#039;#app&amp;amp;#039;,
    render: h =&amp;amp;gt; h(App)
});

render;

// if (module.hot) {
//     非必须
//     module.hot.accept(&amp;amp;#039;./App.vue&amp;amp;#039;, () =&amp;amp;gt; render);
// }

```

### **9、路由routes.js**

路由和react也非常像（简直一样好不），这里的vue页面采用.vue后缀的方式来写。

```
import Home from &amp;amp;#039;./components/home/Home.vue&amp;amp;#039;;
import Bang from &amp;amp;#039;./components/bang/Bang.vue&amp;amp;#039;;

export default [
    {
        path: &amp;amp;#039;/&amp;amp;#039;,
        redirect: &amp;amp;#039;home&amp;amp;#039;
    },
    {
        path: &amp;amp;#039;/home&amp;amp;#039;,
        component: Home
    },
    {
        path: &amp;amp;#039;/bang&amp;amp;#039;,
        component: Bang
    }
]
```

### **10、单页顶层容器App.vue**

从index进来，就是这个文件，现在开始学习vue的精华。

template：vue的模板语言，也叫作jsx。
transition：过渡动画。
router-view：路由显示容器，通过router-link跳转加载的.vue会在这个容器渲染。router-link被我封装到nav.vue组件里面了。
script：导入了当前顶级容器需要用到的vue组件，包括头部、导航、首页。还有更多丰富的设置我没有研究，后续的学习中会深入下去。
style: 当前组件的样式，我配置了less语法支持。将style改成&lt;style lang="less"&gt;即可写less。

```
&amp;amp;lt;template&amp;amp;gt;
    &amp;amp;lt;div&amp;amp;gt;
        &amp;amp;lt;app-header logo=&amp;amp;quot;logo&amp;amp;quot; &amp;amp;gt;&amp;amp;lt;/app-header&amp;amp;gt;
        &amp;amp;lt;app-nav&amp;amp;gt;&amp;amp;lt;/app-nav&amp;amp;gt;
        &amp;amp;lt;transition name=&amp;amp;quot;fade&amp;amp;quot; mode=&amp;amp;quot;out-in&amp;amp;quot;&amp;amp;gt;
            &amp;amp;lt;router-view class=&amp;amp;quot;view&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/router-view&amp;amp;gt;
        &amp;amp;lt;/transition&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;script&amp;amp;gt;
    import Header from &amp;amp;#039;./components/common/Header.vue&amp;amp;#039;;
    import Nav from &amp;amp;#039;./components/common/Nav.vue&amp;amp;#039;;
    import Home from &amp;amp;#039;./components/home/Home.vue&amp;amp;#039;;
    export default {
        name: &amp;amp;#039;App&amp;amp;#039;,
        components: {
            &amp;amp;quot;app-header&amp;amp;quot;: Header,
            &amp;amp;quot;app-nav&amp;amp;quot;: Nav,
            &amp;amp;quot;app-home&amp;amp;quot;: Home
        }
    };
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;style&amp;amp;gt;
    body, html {
        font-size: 12px;
        margin: 0;
        padding: 0;
    }
&amp;amp;lt;/style&amp;amp;gt;
```

踩坑的过程中，也遇到了好几个报错情况，最后都圆满解决了。
如果你想看更详细的vue组件代码，可以看具体项目：[https://github.com/hyy1115/vue2-web][5]

接下来我会继续完善该项目，探究一个更加灵活的vue架构实现。

### 运行效果图:[vue-酷我demo][1]

![效果图][2]

下一章：[vue2封装swiper轮播组件（2）][6]

**如果文章对你有帮助，请点击一下推荐。**
  [1]: https://hyy1115.github.io/blog/
  [2]: https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMsyF
  [3]: https://cn.vuejs.org/v2/guide/installation.html
  [4]: http://elemefe.github.io/cooking/
  [5]: https://github.com/hyy1115/vue2-web
  [6]: https://segmentfault.com/a/1190000009143923