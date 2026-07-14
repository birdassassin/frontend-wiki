# JavaScript 基础

> JavaScript 不是"脚本语言"，是**完整的运行时环境**。理解事件循环、闭包、原型链比记忆 API 重要得多。

---

## 1. 执行模型

### 1.1 事件循环 (Event Loop)
JavaScript 是单线程的，通过事件循环实现异步：

```
┌─────────────────────────────────┐
│          Call Stack             │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│          Task Queue             │
│     (Macrotask Queue)           │
│  setTimeout, setInterval, I/O   │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│       Microtask Queue           │
│  Promise, queueMicrotask,       │
│  MutationObserver               │
└───────────────┬─────────────────┘
                │
┌───────────────▼─────────────────┐
│        Render Queue             │
│  样式计算、布局、绘制            │
└─────────────────────────────────┘
```

**执行顺序：**
1. 执行当前宏任务（通常是脚本本身）
2. 执行所有微任务（Promise callbacks）
3. 渲染（如果需要）
4. 从宏任务队列取下一个任务

**示例：**
```javascript
console.log(&amp;amp;#039;1&amp;amp;#039;);

setTimeout(() =&amp;amp;gt; console.log(&amp;amp;#039;2&amp;amp;#039;), 0);

Promise.resolve().then(() =&amp;amp;gt; {
  console.log(&amp;amp;#039;3&amp;amp;#039;);
  Promise.resolve().then(() =&amp;amp;gt; console.log(&amp;amp;#039;4&amp;amp;#039;));
});

console.log(&amp;amp;#039;5&amp;amp;#039;);

// 输出: 1, 5, 3, 4, 2
```

### 1.2 执行上下文
```javascript
// 全局执行上下文
var a = 1;

function foo() {
  // 函数执行上下文
  var b = 2;
  
  function bar() {
    // 新的函数执行上下文
    var c = 3;
    console.log(a, b, c); // 1, 2, 3
  }
  
  bar();
}

foo();
```

---

## 2. 作用域与闭包

### 2.1 词法作用域
```javascript
function outer() {
  let x = 10;
  
  function inner() {
    let y = 20;
    console.log(x, y); // 可以访问 x 和 y
  }
  
  return inner;
}

const fn = outer();
fn(); // x 仍然可访问，即使 outer 已执行完毕
```

### 2.2 闭包应用
```javascript
// 1. 数据封装
function createCounter() {
  let count = 0;
  return {
    increment: () =&amp;amp;gt; ++count,
    decrement: () =&amp;amp;gt; --count,
    getCount: () =&amp;amp;gt; count
  };
}

// 2. 函数工厂
function createMultiplier(multiplier) {
  return (x) =&amp;amp;gt; x * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

// 3. 防抖/节流
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() =&amp;amp;gt; fn.apply(this, args), delay);
  };
}
```

---

## 3. 原型与继承

### 3.1 原型链
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, ${this.name}`);
};

const alice = new Person(&amp;amp;#039;Alice&amp;amp;#039;);
alice.greet(); // 在 Person.prototype 上找到 greet

// 原型链: alice → Person.prototype → Object.prototype → null
```

### 3.2 现代类语法
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  
  static isAnimal(obj) {
    return obj instanceof Animal;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
}
```

---

## 4. 异步编程

### 4.1 Promise
```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) =&amp;amp;gt; {
  setTimeout(() =&amp;amp;gt; {
    Math.random() &amp;amp;gt; 0.5 ? resolve(&amp;amp;#039;成功&amp;amp;#039;) : reject(&amp;amp;#039;失败&amp;amp;#039;);
  }, 1000);
});

// 链式调用
promise
  .then(result =&amp;amp;gt; {
    console.log(result);
    return fetch(&amp;amp;#039;/api/data&amp;amp;#039;);
  })
  .then(response =&amp;amp;gt; response.json())
  .catch(error =&amp;amp;gt; console.error(error))
  .finally(() =&amp;amp;gt; console.log(&amp;amp;#039;完成&amp;amp;#039;));
```

### 4.2 Async/Await
```javascript
async function fetchData() {
  try {
    const response = await fetch(&amp;amp;#039;/api/data&amp;amp;#039;);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(&amp;amp;#039;获取数据失败:&amp;amp;#039;, error);
    throw error;
  }
}

// 并行执行
const [users, posts] = await Promise.all([
  fetch(&amp;amp;#039;/api/users&amp;amp;#039;).then(r =&amp;amp;gt; r.json()),
  fetch(&amp;amp;#039;/api/posts&amp;amp;#039;).then(r =&amp;amp;gt; r.json())
]);
```

### 4.3 错误处理模式
```javascript
// 1. try/catch
try {
  await doSomething();
} catch (e) {
  handleError(e);
}

// 2. Promise.catch
doSomething().catch(handleError);

// 3. 结果对象模式
async function safeAsync(promise) {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

const result = await safeAsync(fetchData());
if (result.success) {
  // 处理数据
} else {
  // 处理错误
}
```

---

## 5. 模块系统

### 5.1 ESM (ECMAScript Modules)
```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default class Calculator { /* ... */ }

// app.js
import Calculator, { PI, add } from &amp;amp;#039;./math.js&amp;amp;#039;;
import * as Math from &amp;amp;#039;./math.js&amp;amp;#039;;

// 动态导入
const module = await import(&amp;amp;#039;./lazy-module.js&amp;amp;#039;);
```

### 5.2 CommonJS
```javascript
// math.js
const PI = 3.14159;
function add(a, b) { return a + b; }
module.exports = { PI, add };

// app.js
const { PI, add } = require(&amp;amp;#039;./math.js&amp;amp;#039;);
```

---

## 6. 现代 JavaScript 特性

### 6.1 解构与展开
```javascript
// 对象解构
const { name, age, ...rest } = user;
const { name: userName = &amp;amp;#039;Anonymous&amp;amp;#039; } = user;

// 数组解构
const [first, second, ...rest] = array;

// 展开运算符
const merged = { ...obj1, ...obj2 };
const cloned = [...array];
```

### 6.2 可选链与空值合并
```javascript
// 可选链
const city = user?.address?.city;
const value = obj.method?.();
const item = array?.[0];

// 空值合并
const name = user.name ?? &amp;amp;#039;Anonymous&amp;amp;#039;; // 仅当 null/undefined 时使用默认值
const count = user.count || 0;         // 当 falsy 时使用默认值
```

### 6.3 迭代器与生成器
```javascript
// 自定义迭代器
const iterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (const value of iterable) {
  console.log(value);
}

// 无限序列
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
```

---

## 7. 性能与内存

### 7.1 内存管理
```javascript
// 内存泄漏示例
function setup() {
  const largeObject = new Array(1000000);
  
  document.getElementById(&amp;amp;#039;btn&amp;amp;#039;).addEventListener(&amp;amp;#039;click&amp;amp;#039;, () =&amp;amp;gt; {
    console.log(largeObject); // 闭包引用，无法 GC
  });
}

// 修复：及时清理引用
function setup() {
  let largeObject = new Array(1000000);
  
  const handler = () =&amp;amp;gt; {
    console.log(largeObject);
  };
  
  document.getElementById(&amp;amp;#039;btn&amp;amp;#039;).addEventListener(&amp;amp;#039;click&amp;amp;#039;, handler);
  
  // 清理
  return () =&amp;amp;gt; {
    document.getElementById(&amp;amp;#039;btn&amp;amp;#039;).removeEventListener(&amp;amp;#039;click&amp;amp;#039;, handler);
    largeObject = null;
  };
}
```

### 7.2 性能优化
```javascript
// 1. 使用 Map 代替对象作为字典
const map = new Map();
map.set(&amp;amp;#039;key&amp;amp;#039;, value);

// 2. 使用 Set 进行快速查找
const set = new Set([1, 2, 3]);
set.has(2); // O(1)

// 3. 避免频繁 DOM 操作
const fragment = document.createDocumentFragment();
for (let i = 0; i &amp;amp;lt; 100; i++) {
  const div = document.createElement(&amp;amp;#039;div&amp;amp;#039;);
  fragment.appendChild(div);
}
document.body.appendChild(fragment);
```

---

## 8. 相关概念

- [HTML 基础](html-fundamentals.md)
- [CSS 基础](css-fundamentals.md)
- [DOM 与浏览器 API](dom-and-browser-api.md)
- [异步编程](../techniques/async-programming.md)
- [模块系统](../techniques/module-systems.md)
