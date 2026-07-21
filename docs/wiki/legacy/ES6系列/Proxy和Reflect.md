# Proxy 和 Reflect

> 🔴 **高级** — 适合进阶开发者，掌握元编程的核心概念。

---

## 1. Proxy

### 1.1 基本用法

```javascript
const target = {
  name: 'Alice',
  age: 25
};

const handler = {
  // 拦截读取操作
  get(target, prop, receiver) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  
  // 拦截写入操作
  set(target, prop, value, receiver) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
  
  // 拦截删除操作
  deleteProperty(target, prop) {
    console.log(`Deleting ${prop}`);
    delete target[prop];
    return true;
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // Getting name, Alice
proxy.age = 30;          // Setting age to 30
delete proxy.name;       // Deleting name
```

### 1.2 常用拦截器

```javascript
const handler = {
  // 拦截属性读取
  get(target, prop) { /* ... */ },
  
  // 拦截属性设置
  set(target, prop, value) { /* ... */ },
  
  // 拦截属性删除
  deleteProperty(target, prop) { /* ... */ },
  
  // 拦截 in 操作符
  has(target, prop) { /* ... */ },
  
  // 拦截 Object.keys() 等
  ownKeys(target) { /* ... */ },
  
  // 拦截 Object.getOwnPropertyDescriptor()
  getOwnPropertyDescriptor(target, prop) { /* ... */ },
  
  // 拦截函数调用
  apply(target, thisArg, args) { /* ... */ },
  
  // 拦截 new 操作符
  construct(target, args) { /* ... */ }
};
```

### 1.3 应用场景：数据验证

```javascript
const validator = {
  set(target, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('Age must be an integer');
      }
      if (value < 0 || value > 120) {
        throw new RangeError('Age must be between 0 and 120');
      }
    }
    target[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25;  // ✅
person.age = '25'; // ❌ TypeError
person.age = 150;  // ❌ RangeError
```

### 1.4 应用场景：懒加载

```javascript
function createLazyObject(loader) {
  const cache = {};
  
  return new Proxy({}, {
    get(target, prop) {
      if (!(prop in cache)) {
        cache[prop] = loader(prop);
      }
      return cache[prop];
    }
  });
}

const lazyData = createLazyObject(key => {
  console.log(`Loading ${key}...`);
  return `Data for ${key}`;
});

console.log(lazyData.user);  // Loading user..., Data for user
console.log(lazyData.user);  // Data for user（缓存）
```

---

## 2. Reflect

### 2.1 基本用法

```javascript
const obj = { name: 'Alice', age: 25 };

// 获取属性
console.log(Reflect.get(obj, 'name')); // 'Alice'

// 设置属性
Reflect.set(obj, 'age', 30);
console.log(obj.age); // 30

// 删除属性
Reflect.deleteProperty(obj, 'age');
console.log(obj.age); // undefined

// 检查属性是否存在
console.log(Reflect.has(obj, 'name')); // true

// 获取所有属性名
console.log(Reflect.ownKeys(obj)); // ['name']
```

### 2.2 Reflect 与 Proxy 配合

```javascript
const handler = {
  get(target, prop, receiver) {
    console.log(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  
  set(target, prop, value, receiver) {
    console.log(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxy = new Proxy({ name: 'Alice' }, handler);
```

---

## 3. 练习题

1. **实现观察者模式**：
```javascript
// 使用 Proxy 实现数据变化监听
```

2. **实现只读对象**：
```javascript
// 创建一个 Proxy，禁止修改任何属性
```

3. **实现深度代理**：
```javascript
// 创建一个递归 Proxy，代理嵌套对象
```

---

**下一篇**：[Symbol 和 Iterator](Symbol和Iterator.md)
