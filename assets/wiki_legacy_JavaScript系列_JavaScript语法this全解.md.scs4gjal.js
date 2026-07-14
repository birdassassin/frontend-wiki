import{_ as n,o,c as p,a2 as e}from"./chunks/framework.BWuWLRhz.js";const l=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"wiki/legacy/JavaScript系列/JavaScript语法this全解.md","filePath":"wiki/legacy/JavaScript系列/JavaScript语法this全解.md"}'),a={name:"wiki/legacy/JavaScript系列/JavaScript语法this全解.md"};function s(i,t,r,c,m,h){return o(),p("div",null,[...t[0]||(t[0]=[e(`<p>先玩一个小游戏，你能回答下面的问题吗？</p><pre><code>&amp;lt;script type=&quot;text/javascript&quot;&amp;gt;     
foo = &quot;bar&quot;;      
function testThis() &amp;#123; 
      foo = &quot;foo&quot;;    
 &amp;#125;     
 console.log(this.foo);  //第一个this.foo是什么？     
 testThis();    
 console.log(this.foo);  //第二个this.foo又是什么？
&amp;lt;/script&amp;gt;
</code></pre><p>进入正题，如果你学过其他编程语言，你就知道this不只是JavaScript独有的东西。 在ES5的浏览器端中，根据作用域来分，有2种情况。</p><p><strong>一、全局作用域下的this</strong> this运行在函数之外，那么不管是不是严格模式，都是指向window。</p><pre><code>this === window
</code></pre><p><strong>二、函数作用域下的this</strong> 函数内部的this就比较复杂一点，因为存在多种情况，但是都有一个共同点，this取决于函数如何调用。也就是说，只有在函数被调用的时候，才存在this的指向 不理解可以看下面的各种情况解析，一共有9种情况。</p><p><strong>1、函数直接调用的情况</strong></p><p>非严格模式下，直接调用函数，内部的this将指向window。</p><pre><code>t = 10 //定义一个全局变量t
function test()&amp;#123;
  return this.t;
&amp;#125;
console.log(test()) // 10
</code></pre><p>严格模式下，直接调用函数，内部的this将指向该函数运行时的环境。</p><pre><code>function test()&amp;#123;
  &quot;user strict&quot; //严格模式
  return this;
&amp;#125;
console.log(test()) //undefined
</code></pre><p>这个例子中，虽然函数是在window下面直接运行的，但是他没有被调用，而是直接运行，所以this是undefined。 我们稍微改一下上面的代码，你就知道了什么叫做运行环境。</p><pre><code>function test()&amp;#123;
  &quot;user strict&quot; //严格模式
  return this;
&amp;#125;
console.log(window.test()) //window
</code></pre><p>使用了window来调用函数，那么，函数的执行环境就是window，所以函数内部的this === window。当然，这已经不属于函数直接调用的情况了。 再写一个自执行函数的例子。</p><pre><code>(function test()&amp;#123;
  //&quot;use strict&quot;; 严格模式下this指向undefined
  var t = 9;
  console.log(this) // window
&amp;#125;)()
</code></pre><p>无论是自执行还是直接调用函数，都是一样的，他没有“被调用”，所以就没有上下文环境。那么为什么非严格模式下面，会指向window呢，是不是说明非严格模式下默认指向window.test()？没错，但严格模式下就没有默认的说法了，严格模式下也没法给自执行函数指定window是不。</p><p><strong>2、对象中的this。</strong></p><p>当用对象调用自己里面定义的方法时，this指向的这个对象。 例如：</p><pre><code>var obj = &amp;#123;
  id: 9,
  test: function() &amp;#123;
    return this.id;
  &amp;#125;
&amp;#125;;
console.log(obj.test()); //9
</code></pre><p>这个例子中，test()是对象obj里面的方法，通过obj调用test方法obj.test()，那么该函数的运行环境就是obj所在的上下文，所以this指向obj。 有人可能就会想，直接运行test()呢？你要是能在对象之外直接运行test()，我就服了你。</p><p>接着就是匿名函数的调用，this又指向什么？</p><pre><code>var obj = &amp;#123;id: 9&amp;#125;;
function test() &amp;#123;
  return this.prop;
&amp;#125;
obj.t = test;
console.log(obj.t()); // logs 9
</code></pre><p>仍然输出obj的id9，这说明this始终与执行环境有关，这里的执行环境就是obj。</p><p><strong>3、原型链中的this（属于对象例子的衍生）</strong> 看官方提供的一个有趣的例子。</p><pre><code>var o = &amp;#123;
  f : function()&amp;#123; 
    return this.a + this.b; 
  &amp;#125;
&amp;#125;;
var p = Object.create(o);
p.a = 1;
p.b = 4;
console.log(p.f()); // 5
</code></pre><p>首先定义一个对象o，对象里面有一个函数f，f里面有this，在对象o没有被调用的时候，f里面的this是没有意义的。 接着用create创建一个新的对象p继承了o的原型，那么p同时也就继承了o里面的函数f。 设置p.a = 1, p.b = 4，通过p.f()调用，则this的执行环境指向了对象p。 如果不创建原型，它是这样的。</p><pre><code>var o = &amp;#123;
  f : function()&amp;#123; 
    return this.a + this.b; 
  &amp;#125;
&amp;#125;;
o.a = 1, o.b = 4
=&gt;
var o = &amp;#123;
  a: 1,
  b: 4,
  f : function()&amp;#123; 
    return this.a + this.b; 
  &amp;#125;
&amp;#125;;
=&gt;
o.f() // 5
</code></pre><p><strong>4、getter与setter中的this（属于对象例子的衍生）</strong> get和set可能很多人没有用过，get用来获取对象的属性，set用来设置对象的属性。</p><pre><code>var obj = &amp;#123;
  a: 1,
  b: 2,
  get test()&amp;#123;
    return this.a + this.b;
  &amp;#125;,
  set f(x) &amp;#123;
    this.a = x;
    this.b = x + 1;
  &amp;#125;
&amp;#125;;
console.log(obj.test) //3
obj.f = 5
console.log(obj.test) //11
</code></pre><p>在上面的例子中，定义一个对象obj，有一个get，用来获取this.a + this.b的和，同理，单独一个对象中this是没有意义的，当obj调用它自身的test方法时obj.test，this就指向obj，因为obj是test的运行环境。 然后设置obj.f = 5，通过set设置obj的属性a和b的值为5和6，不再是1和2，之后再次调用obj.test，this仍旧指向obj。所以，无论你怎么调用对象内部函数中的this，它都是指向当前这个obj，因为obj是它的运行环境，上一个例子中的继承也是一个道理，只不过是通过继承对象的属性，使得运行环境在另外一个对象中。</p><p><strong>5、构造函数中的this</strong> 如果你懂java或者C++，那么你一定知道“实例”这个概念，在JavaScript中，创建了一个构造函数，当我们使用new来实例化的时候，这个实例化的的对象就是一个运行环境，构造函数中的this就是指向实例化的对象。</p><pre><code>function Templete()&amp;#123;
  this.a = 8;
&amp;#125;
var t = new Templete();
console.log(t.a); // 8
</code></pre><p>上面的例子中，有一个构造函数Templete，当new了一个新的对象t，那么this就指向了t，所以this.a == 8。</p><p><strong>6、call和apply中的this</strong> call和apply你如果熟悉的话，就会知道它的第一个参数是绑定函数的运行环境。</p><pre><code>function add(x) &amp;#123;
  return this.a + x
&amp;#125;
var obj = &amp;#123;
  a: 10
&amp;#125;
var sum = add.call(obj, 8)
//var sum = add.apply(obj, [8])
console.log(sum) // 18
</code></pre><p>上面的例子中，我们定义了一个函数add，用来求a+x的和，但是这个a是用this.a指代的，我们如果直接运行add(x)，无法给a设置值，这个时候就得apply和call登场了。 我们首先需要知道this.a从哪里来，这里定义了一个对象obj，设置了一个属性a，我们通过apply和call把add函数里面的this绑定到了obj对象中。 所以add里面的this指向的是obj对象。</p><p><strong>7、bind中的this</strong> bind中的this和apply和call是一样的，它的第一个参数用来绑定this指向的对象，记住是一个对象。</p><pre><code>function f(x)&amp;#123;
  return this.a + x;
&amp;#125;
var obj = &amp;#123;
  a: 10
&amp;#125;
var sum = f.bind(obj, 8);
console.log(sum()) // 18
</code></pre><p>还是第6种情况中的例子，只不过用bind来绑定当前函数的this指向obj，这里就不需要再重复解释一遍了。</p><p><strong>8、DOM事件函数中的this</strong> 想必这个大家都比较了解了，我们监听一个DOM元素，给这个DOM元素绑定一个事件，那么事件函数中的this指向当前的DOM元素</p><pre><code>var ele = document.getElementById(&#39;tab&#39;);
ele.addEventListener(&#39;click&#39;, func, false);
function func(e) &amp;#123;
    console.log(this === e.target) //true
&amp;#125;
</code></pre><p>这个例子中，给id叫做tab的元素绑定了click事件，事件名称叫做func，那么使得func()函数执行的环境是ele，所以func()函数中的this是指向ele元素。</p><p><strong>9、内联事件中的this。</strong> 我们如果直接在dom元素上绑定一个事件，事件函数中的this直接指向的是它对应的dom元素，和第8种情况类似。</p><pre><code>&amp;lt;div onclick=&quot;alert(this.tagName.toLowerCase())&quot;&amp;gt;&amp;lt;/div&amp;gt;
</code></pre><p>打印出来是当前的div元素。</p><p>官方还举了一个特殊的例子，看下面。</p><pre><code>&amp;lt;button onclick=&quot;alert((function()&amp;#123;return this&amp;#125;)());&quot;&amp;gt;
  Show inner this
&amp;lt;/button&amp;gt;
</code></pre><p>在这个特殊的例子中，alert里面是一个自执行函数，还记得我在第1种情况说的话吗？自执行函数没有被调用，所以严格模式下this是指向undefined的，而非严格模式下是指向window。</p><p><strong>总结：这么多this的场景，其实它就一句话：this永远指向它执行的上下文环境。</strong><strong>无论是apply还是call还是bind，都只是为了给this指定一个上下文环境。</strong></p><p>说了这么多ES5的this，记住，是浏览器端的，别拿服务端的this来说话。 关于ES6中的this，其实ES5中的构造函数和ES6中的class继承this的指向是一样的道理，其他的也一样，就不重复说了。</p><p><strong>小试牛刀：学了这么多，累不累，不知道自己学懂没有，做题目测试一下吧。</strong> 题目1：</p><pre><code>function Thing1() &amp;#123;&amp;#125;
Thing1.prototype.foo = &quot;thing1&quot;;
Thing1.prototype.logFoo = function () &amp;#123;
    console.log(this.foo);
&amp;#125;

function Thing2() &amp;#123;
    this.foo = &quot;thing2&quot;;
&amp;#125;
Thing2.prototype = new Thing1();

var thing = new Thing2();
thing.logFoo();
</code></pre><p>题目2：</p><pre><code>function Thing() &amp;#123;&amp;#125;
Thing.prototype.foo = &quot;bar&quot;;
Thing.prototype.logFoo = function () &amp;#123;  
    console.log(this.foo);   
&amp;#125;

function doIt(method) &amp;#123;
    method();
&amp;#125;

var thing = new Thing();
thing.logFoo();
doIt(thing.logFoo);
</code></pre><p>题目3：</p><pre><code>var obj = &amp;#123;
    foo: &quot;bar&quot;,
    deeper: &amp;#123;
        logFoo: function () &amp;#123;
            console.log(this.foo);
        &amp;#125;
    &amp;#125;
&amp;#125;;

obj.deeper.logFoo();
</code></pre><p>题目4：</p><pre><code>&amp;lt;div class=&quot;foo bar1&quot;&amp;gt;&amp;lt;/div&amp;gt;
&amp;lt;div class=&quot;foo bar2&quot;&amp;gt;&amp;lt;/div&amp;gt;
&amp;lt;script type=&quot;text/javascript&quot;&amp;gt;

$(&quot;.foo&quot;).each(function () &amp;#123;
    console.log(this); 
&amp;#125;);

$(&quot;.foo&quot;).each(function () &amp;#123;
    this.click();
&amp;#125;);
&amp;lt;/script&amp;gt;
</code></pre><p><strong>如果你觉得有说的不对的地方，可以指出来，觉得说的好，收藏一下呗。</strong></p>`,59)])])}const g=n(a,[["render",s]]);export{l as __pageData,g as default};
