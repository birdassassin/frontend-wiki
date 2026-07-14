学习vue的第三篇，增加了以下功能：

1、添加打包功能；

2、分离css和js；

3、增加vue-devtools；

4、增加歌曲列表组件。

这次更新做的事情不多，主要是发布的操作和vue开发工具的管理。

打包运行效果：[vue-酷我demo][1]
![图片描述][2]

### **1、添加打包功能**

webpack打包项目只需要配置package.json，通过命令运行，有的人喜欢用Python文件来执行打包命令。

```
&amp;amp;quot;scripts&amp;amp;quot;: {
    &amp;amp;quot;build-mac&amp;amp;quot;: &amp;amp;quot;export NODE_ENV=production &amp;amp;amp;&amp;amp;amp; webpack -p --progress&amp;amp;quot;,
    &amp;amp;quot;build-win&amp;amp;quot;: &amp;amp;quot;set NODE_ENV=production&amp;amp;amp;&amp;amp;amp;webpack -p --progress&amp;amp;quot;
  },
```
mac系统运行

```
npm run build-mac
```
windows系统运行

```
npm run build-win
```
你还可以直接在node控制台运行

```
NODE_ENV=production &amp;amp;amp;&amp;amp;amp; webpack -p --progress
```


![图片描述][3]


### 2、分离css和js。

css和js分离的意义不是很大，css本身也就几十K，在我这个项目中目前是16.2kb，至于js公共模块要不要提取出来，现在项目初期不需要做这一块处理。

提取css

```
const ExtractTextPlugin = require(&amp;amp;#039;extract-text-webpack-plugin&amp;amp;#039;);

plugin(
    new ExtractTextPlugin(&amp;amp;#039;style.css&amp;amp;#039;)
)
```
生成html：filename表示要生成的文件名，template表示选择存在的静态模板，这个步骤是将根目录下面的index.html打包到dist文件夹下。

```
const HtmlWebpackPlugin = require(&amp;amp;#039;html-webpack-plugin&amp;amp;#039;);
plugin(
    new HtmlWebpackPlugin({
        filename: &amp;amp;#039;index.html&amp;amp;#039;,
        template: &amp;amp;#039;./index.html&amp;amp;#039;
    })
)
```

官方说了一种提取css的方法，vue-loader集成了css提取模块，详情前往：[http://vue-loader.vuejs.org/en/configurations/extract-css.html][4]

### **3、增加vue-tools**

推荐直接去[chrome应用商店安装][5]

![图片描述][6]

安装好之后，别着急，在地址栏输入：

```
chrome://flags/
```
找到下面这个东西，选择启用，变成下面这种状态。

```

开发者工具实验性功能 Mac, Windows, Linux, Chrome OS
启用开发者工具实验性功能。您可以使用开发者工具中的“设置”面板开启/关闭各个实验性功能。 #enable-devtools-experiments
停用
```
然后你把谷歌控制台关闭重新打开，就能看到vue工具界面了。

什么，你说你不会翻墙？。。。。。。

### **4、增加歌曲列表组件 SongList.vue。**

这个组件跟banner组件一样，都是一个列表，就不重复介绍了，直接看代码。

```
&amp;amp;lt;template&amp;amp;gt;
    &amp;amp;lt;ul class=&amp;amp;quot;song-ul&amp;amp;quot;&amp;amp;gt;
        &amp;amp;lt;li v-for=&amp;amp;quot;song in songList&amp;amp;quot;&amp;amp;gt;
            &amp;amp;lt;span class=&amp;amp;quot;title&amp;amp;quot;&amp;amp;gt;&amp;#123;&amp;#123;song.singer&amp;#125;&amp;#125; - &amp;#123;&amp;#123;song.title&amp;#125;&amp;#125;&amp;amp;lt;/span&amp;amp;gt;
            &amp;amp;lt;i :style=&amp;amp;quot;{background: &amp;amp;#039;url(&amp;amp;#039;+ downLoad +&amp;amp;#039;) no-repeat&amp;amp;#039;}&amp;amp;quot;&amp;amp;gt;&amp;amp;lt;/i&amp;amp;gt;
        &amp;amp;lt;/li&amp;amp;gt;
    &amp;amp;lt;/ul&amp;amp;gt;
&amp;amp;lt;/template&amp;amp;gt;

&amp;amp;lt;script&amp;amp;gt;
    import downLoad from &amp;amp;#039;../../../static/img/home/download_icon.png&amp;amp;#039;
    export default {
        props: [&amp;amp;#039;songList&amp;amp;#039;],
        data() {
            return {
                downLoad: downLoad
            }
        }
    }
&amp;amp;lt;/script&amp;amp;gt;

&amp;amp;lt;style lang=&amp;amp;quot;less&amp;amp;quot;&amp;amp;gt;
    .song-ul {
        padding: 0 0.833rem;
        margin: 0;
        li {
            width: 100%;
            list-style: none;
            display: table;
            border-bottom: 1px solid hsl(0, 0%, 90%);
            height: 4rem;
            .title {
                width: 100%;
                padding-right: 2.657rem;
                display: table-cell;
                vertical-align: middle;
                padding-left: .3571rem;
                cursor: pointer;
                font-size: 1.17rem;
                box-sizing: border-box;
            }
            i {
                width: 2rem;
                height: 2rem;
                margin-top: 1.5rem;
                display: inline-block;
                background-size: 100%;
            }
        }
    }
&amp;amp;lt;/style&amp;amp;gt;
```

http请求部分后续再写，现在以静态组件的构建为主，慢慢熟悉vue的生命周期和组件数据通信机制。

项目地址：[https://github.com/hyy1115/vue2-web][7]

上一章：[react转vue——vue2封装swiper轮播组件（2）][8]

下一章：[react转vue——vue2条件渲染、列表渲染、事件处理器实现（4）][9]


  [1]: https://hyy1115.github.io/blog/
  [2]: https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMBEQ
  [3]: https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMBEN
  [4]: http://vue-loader.vuejs.org/en/configurations/extract-css.html
  [5]: https://chrome.google.com/webstore/search/vue-devtools?utm_source=chrome-ntp-icon
  [6]: https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVMBEU
  [7]: https://github.com/hyy1115/vue2-web
  [8]: https://segmentfault.com/a/1190000009143923
  [9]: https://segmentfault.com/a/1190000009183064