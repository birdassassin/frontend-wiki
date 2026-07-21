# Map/Set 数据结构

> 🟡 **中级** — 适合有一定基础的开发者，掌握 Map 和 Set 的使用。

---

## 1. Set

### 1.1 基本用法

```javascript
// 创建 Set
const set = new Set();

// 添加元素
set.add(1);
set.add(2);
set.add(2); // 重复元素会被忽略
set.add('hello');

console.log(set.size); // 3
console.log(set.has(1)); // true
console.log(set.has(3)); // false

// 删除元素
set.delete(1);
console.log(set.has(1)); // false

// 清空 Set
set.clear();
console.log(set.size); // 0
```

### 1.2 从数组创建

```javascript
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log([...set]); // [1, 2, 3]
```

### 1.3 去重应用

```javascript
// 数组去重
const arr = [1, 2, 2, 3, 3, 3];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3]

// 字符串去重
const str = 'aaabbbccc';
const uniqueStr = [...new Set(str)].join('');
console.log(uniqueStr); // 'abc'
```

### 1.4 Set 遍历

```javascript
const set = new Set(['a', 'b', 'c']);

// for...of
for (const item of set) {
  console.log(item);
}

// forEach
set.forEach((value, key) => {
  console.log(value); // value 和 key 相同
});

// 转换为数组
const arr = Array.from(set);
const arr2 = [...set];
```

---

## 2. Map

### 2.1 基本用法

```javascript
// 创建 Map
const map = new Map();

// 添加键值对
map.set('name', 'Alice');
map.set('age', 25);
map.set(1, 'one');
map.set(true, 'boolean');

console.log(map.size); // 4
console.log(map.get('name')); // 'Alice'
console.log(map.has('age')); // true
console.log(map.has('email')); // false

// 删除键值对
map.delete('age');
console.log(map.has('age')); // false

// 清空 Map
map.clear();
console.log(map.size); // 0
```

### 2.2 从数组创建

```javascript
const map = new Map([
  ['name', 'Alice'],
  ['age', 25],
  ['city', 'Beijing']
]);
```

### 2.3 Map vs Object

| 特性 | Map | Object |
|------|-----|--------|
| 键类型 | 任意类型 | 只能是字符串/Symbol |
| 键顺序 | 有序 | ES6 后有序 |
| 大小 | size 属性 | 需要手动计算 |
| 迭代 | 可直接迭代 | 需要 Object.keys |
| 性能 | 频繁增删更好 | 查找更快 |

### 2.4 Map 遍历

```javascript
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

// for...of
for (const [key, value] of map) {
  console.log(key, value);
}

// 遍历键
for (const key of map.keys()) {
  console.log(key);
}

// 遍历值
for (const value of map.values()) {
  console.log(value);
}

// forEach
map.forEach((value, key) => {
  console.log(key, value);
});
```

---

## 3. WeakSet 和 WeakMap

### 3.1 WeakSet

```javascript
const weakSet = new WeakSet();
const obj = { name: 'Alice' };

weakSet.add(obj);
console.log(weakSet.has(obj)); // true

// WeakSet 的键是弱引用
// 如果 obj 被垃圾回收，WeakSet 中的引用也会消失
```

### 3.2 WeakMap

```javascript
const weakMap = new WeakMap();
const obj = { name: 'Alice' };

weakMap.set(obj, 'data');
console.log(weakMap.get(obj)); // 'data'

// WeakMap 的键是弱引用
// 常用于缓存、私有属性等场景
```

---

## 4. 练习题

1. **数组去重**：
```javascript
const arr = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
// 使用 Set 去重
```

2. **统计字符频率**：
```javascript
const str = 'hello world';
// 使用 Map 统计每个字符出现的次数
```

3. **实现缓存**：
```javascript
// 使用 WeakMap 实现对象缓存
```

---

**下一篇**：[类与继承](类与继承.md)
