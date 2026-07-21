# Symbol 和 Iterator

> 🔴 **高级** — 适合进阶开发者，掌握 Symbol 和迭代器协议。

---

## 1. Symbol

### 1.1 创建 Symbol

```javascript
// 创建 Symbol
const sym1 = Symbol();
const sym2 = Symbol('description');

console.log(sym1); // Symbol()
console.log(sym2); // Symbol(description)
console.log(sym1 === sym2); // false（每个 Symbol 都是唯一的）
```

### 1.2 Symbol 作为对象属性

```javascript
const obj = {
  [Symbol('name')]: 'Alice',
  [Symbol('age')]: 25,
  regular: 'value'
};

// 普通方式无法访问 Symbol 属性
console.log(obj.regular); // 'value'
console.log(obj[Symbol('name')]); // undefined（不同的 Symbol）

// 获取所有 Symbol 属性
const symbols = Object.getOwnPropertySymbols(obj);
console.log(symbols); // [Symbol(name), Symbol(age)]

// 访问 Symbol 属性
console.log(obj[symbols[0]]); // 'Alice'
```

### 1.3 内置 Symbol

```javascript
// Symbol.iterator - 迭代器接口
// Symbol.toStringTag - 对象的 toString 标签
// Symbol.hasInstance - instanceof 操作符
// Symbol.isConcatSpreadable - 是否可展开
// Symbol.match - 正则匹配
// Symbol.replace - 字符串替换
// Symbol.search - 字符串搜索
// Symbol.split - 字符串分割
// Symbol.primitive - 原始值转换
```

---

## 2. Iterator 迭代器协议

### 2.1 可迭代对象

```javascript
const arr = [1, 2, 3];

// 获取迭代器
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

### 2.2 自定义可迭代对象

```javascript
const range = {
  start: 1,
  end: 5,
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

// 使用 for...of 循环
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// 使用展开运算符
const arr = [...range];
console.log(arr); // [1, 2, 3, 4, 5]
```

### 2.3 Generator 作为迭代器

```javascript
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

// Generator 返回的是可迭代对象
const gen = generateNumbers();

for (const num of gen) {
  console.log(num); // 1, 2, 3
}
```

---

## 3. Generator 迭代器

### 3.1 实现自定义迭代器

```javascript
class Collection {
  constructor(items) {
    this.items = items;
  }
  
  *[Symbol.iterator]() {
    for (const item of this.items) {
      yield item;
    }
  }
}

const collection = new Collection(['a', 'b', 'c']);

for (const item of collection) {
  console.log(item); // a, b, c
}
```

---

## 4. 练习题

1. **创建可迭代对象**：
```javascript
// 创建一个可迭代的对象，生成斐波那契数列
```

2. **使用 Symbol**：
```javascript
// 使用 Symbol 实现对象的私有属性
```

3. **实现无限迭代器**：
```javascript
// 创建一个无限迭代器，生成自然数序列
```

---

**下一篇**：[模块化](模块化.md)
