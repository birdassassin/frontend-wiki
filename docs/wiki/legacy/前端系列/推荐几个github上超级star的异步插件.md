如果你还在为选择哪个异步插件烦恼，不如静下心来看看下面这几个插件，或许会给你带来一些灵感。

1、request：[https://github.com/request/request][1]（10K+ star）

原作者自认为这个插件是设计的最最最简单的异步操作，例如这个例子，并且默认支持https，如果看到这种写法觉得很好用，赶紧点击链接去看看吧。

```
var request = require(&amp;amp;#039;request&amp;amp;#039;);
request(&amp;amp;#039;http://www.google.com&amp;amp;#039;, function (error, response, body) {
  if (!error &amp;amp;amp;&amp;amp;amp; response.statusCode == 200) {
    console.log(body)
  }
})
```

2、Axios：[https://github.com/mzabriskie/axios][2]（10K+ star）

基于promise写法的http请求插件，支持客户端和node端，有很好的一些特性：

支持restful API
支持拦截请求和响应
自动转换JSON数据
客户端支持保护安全免受XSRF攻击
...
```
axios.get(&amp;amp;#039;/user?ID=12345&amp;amp;#039;)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });
```

3、superagent：[https://github.com/visionmedia/superagent][3]（9K+ star）

兼容性有点渣渣，慎用。
![图片描述][4]

```
request
  .post(&amp;amp;#039;/api/pet&amp;amp;#039;)
  .send({ name: &amp;amp;#039;Manny&amp;amp;#039;, species: &amp;amp;#039;cat&amp;amp;#039; })
  .set(&amp;amp;#039;X-API-Key&amp;amp;#039;, &amp;amp;#039;foobar&amp;amp;#039;)
  .set(&amp;amp;#039;Accept&amp;amp;#039;, &amp;amp;#039;application/json&amp;amp;#039;)
  .end(function(err, res){
    // Calling the end function will send the request
  });
```

还有几个几百、几千star的就不推荐了。


  [1]: https://github.com/request/request
  [2]: https://github.com/mzabriskie/axios
  [3]: https://github.com/visionmedia/superagent
  [4]: https://gitee.com/birdassassin/frontend-wiki/raw/master/img/bVH8gg