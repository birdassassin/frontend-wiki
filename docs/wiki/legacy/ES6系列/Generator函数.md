# Generator 函数

> 🔴 **高级** — 适合进阶开发者，掌握 Generator 的核心概念。

---

## 1. 基本语法

### 1.1 定义 Generator

```javascript
function* generator() {
  yield 'Hello';
  yield 'World';
  return 'Done';
}

const gen = generator();

console.log(gen.next()); // { value: 'Hello', done: false }
console.log(gen.next()); // { value: 'World', done: false }
console.log(gen.next()); // { value: 'Done', done: true }
console.log(gen.next()); // { value: undefined, done: true }
```

### 1.2 迭代 Generator

```javascript
function* count() {
  yield 1;
  yield 2;
  yield 3;
}

// for...of 循环
for (const num of count()) {
  console.log(num); // 1, 2, 3
}

// 展开运算符
const arr = [...count()];
console.log(arr); // [1, 2, 3]
```

---

## 2. Generator 的特性

### 2.1 暂停和恢复

```javascript
function* timer() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = timer();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
// 可以无限调用
```

### 2.2 向 Generator 传递值

```javascript
function* generator() {
  const a = yield 'First';
  console.log('Received:', a);
  
  const b = yield 'Second';
  console.log('Received:', b);
  
  return 'Done';
}

const gen = generator();
console.log(gen.next());        // { value: 'First', done: false }
console.log(gen.next('Hello')); // Received: Hello, { value: 'Second', done: false }
console.log(gen.next('World')); // Received: World, { value: 'Done', done: true }
```

### 2.3 抛出异常

```javascript
function* generator() {
  try {
    yield 'Hello';
    yield 'World';
  } catch (error) {
    console.error('Error:', error);
  }
}

const gen = generator();
console.log(gen.next()); // { value: 'Hello', done: false }
gen.throw(new Error('Something went wrong')); // Error: Something went wrong
```

---

## 3. Generator 的应用场景

### 3.1 生成无限序列

```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5
```

### 3.2 异步操作序列

```javascript
function* asyncFlow() {
  const user = yield fetch('/api/user').then(res => res.json());
  const posts = yield fetch(`/api/posts?userId=${user.id}`).then(res => res.json());
  return posts;
}

// 执行 Generator
function runGenerator(gen) {
  const iterator = gen();
  
  function handle(result) {
    if (result.done) return result.value;
    
    return result.value.then(data => {
      return handle(iterator.next(data));
    });
  }
  
  return handle(iterator.next());
}

runGenerator(asyncFlow).then(posts => console.log(posts));
```

### 3.3 状态机

```javascript
function* trafficLight() {
  while (true) {
    yield 'red';
    yield 'yellow';
    yield 'green';
  }
}

const light = trafficLight();
console.log(light.next().value); // 'red'
console.log(light.next().value); // 'yellow'
console.log(light.next().value); // 'green'
console.log(light.next().value); // 'red'
```

---

## 4. 练习题

1. **生成器实现**：
```javascript
// 创建一个生成器，生成 1 到 10 的平方数
```

2. **无限序列**：
```javascript
// 创建一个生成器，生成质数序列
```

3. **异步流程控制**：
```javascript
// 使用 Generator 实现异步流程控制
```

---

**下一篇**：[Proxy 和 Reflect](Proxy和Reflect.md)
