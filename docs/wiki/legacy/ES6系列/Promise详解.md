# Promise 详解

> 🟡 **中级** — 适合有一定基础的开发者，掌握 Promise 的核心概念。

---

## 1. Promise 基础

### 1.1 什么是 Promise

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('成功！');
    } else {
      reject('失败！');
    }
  }, 1000);
});

promise.then(result => {
  console.log(result); // "成功！"
}).catch(error => {
  console.error(error); // "失败！"
});
```

### 1.2 Promise 三种状态

```
Pending（进行中）→ Fulfilled（已成功）或 Rejected（已失败）
```

| 状态 | 说明 |
|------|------|
| Pending | 初始状态，等待中 |
| Fulfilled | 操作成功 |
| Rejected | 操作失败 |

---

## 2. Promise 链式调用

### 2.1 基本链式调用

```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/posts?userId=${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

### 2.2 返回新的 Promise

```javascript
function getUser() {
  return fetch('/api/user').then(res => res.json());
}

function getPosts(userId) {
  return fetch(`/api/posts?userId=${userId}`).then(res => res.json());
}

getUser()
  .then(user => getPosts(user.id))
  .then(posts => console.log(posts));
```

---

## 3. Promise 静态方法

### 3.1 Promise.all

```javascript
const p1 = fetch('/api/user');
const p2 = fetch('/api/posts');
const p3 = fetch('/api/comments');

Promise.all([p1, p2, p3])
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(([user, posts, comments]) => {
    console.log(user, posts, comments);
  })
  .catch(error => console.error(error));
```

### 3.2 Promise.race

```javascript
const timeout = new Promise((resolve, reject) => {
  setTimeout(() => reject('Timeout'), 5000);
});

const request = fetch('/api/data');

Promise.race([request, timeout])
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### 3.3 Promise.allSettled

```javascript
const p1 = fetch('/api/user');
const p2 = fetch('/api/invalid');
const p3 = fetch('/api/posts');

Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`Promise ${index + 1}: ${result.value}`);
      } else {
        console.log(`Promise ${index + 1}: ${result.reason}`);
      }
    });
  });
```

### 3.4 Promise.resolve 和 Promise.reject

```javascript
// 直接返回成功的 Promise
Promise.resolve('Hello').then(console.log);

// 直接返回失败的 Promise
Promise.reject('Error').catch(console.error);
```

---

## 4. 练习题

1. **封装异步操作**：
```javascript
// 使用 Promise 封装 setTimeout
function delay(ms) {
  // 实现...
}

delay(1000).then(() => console.log('Done'));
```

2. **并行请求**：
```javascript
// 同时获取用户信息和帖子列表
// 使用 Promise.all
```

3. **超时控制**：
```javascript
// 给 fetch 请求添加超时控制（3秒）
```

---

**下一篇**：[async/await](async-await.md)
