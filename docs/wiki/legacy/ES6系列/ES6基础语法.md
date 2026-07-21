# ES6 基础语法

> 🟢 **初级** — 适合前端初学者，掌握 ES6 核心基础语法。

---

## 1. let 和 const

### 1.1 let 声明

```javascript
// ES5
var a = 1;
var a = 2; // 允许重复声明

// ES6
let b = 1;
let b = 2; // ❌ 报错：Identifier 'b' has already been declared
```

### 1.2 块级作用域

```javascript
// ES5 - 没有块级作用域
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出: 3, 3, 3

// ES6 - 有块级作用域
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出: 0, 1, 2
```

### 1.3 const 声明常量

```javascript
const PI = 3.14159;
PI = 3; // ❌ 报错：Assignment to constant variable

// const 声明的对象可以修改属性
const user = { name: 'Alice' };
user.name = 'Bob'; // ✅ 允许
user = {}; // ❌ 报错
```

### 1.4 暂时性死区

```javascript
console.log(a); // ❌ 报错：Cannot access 'a' before initialization
let a = 1;
```

---

## 2. 变量声明最佳实践

| 场景 | 使用 |
|------|------|
| 需要重新赋值 | `let` |
| 不需要重新赋值 | `const` |
| 全局变量 | `const`（避免污染全局作用域） |
| 循环变量 | `let`（块级作用域） |

---

## 3. 练习题

1. **判断输出**：
```javascript
let x = 1;
{
  let x = 2;
  console.log(x);
}
console.log(x);
```

2. **修复问题**：
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
// 期望输出: 0, 1, 2, 3, 4
```

3. **优化代码**：
```javascript
var a = 'hello';
var b = 'world';
var result = a + ' ' + b;
// 使用 ES6 语法优化
```

---

**下一篇**：[箭头函数](箭头函数.md)
