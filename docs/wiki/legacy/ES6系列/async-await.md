# async/await

> 🟡 **中级** — 适合有一定基础的开发者，掌握异步编程的终极方案。

---

## 1. 基本语法

### 1.1 async 函数

```javascript
async function getData() {
  return 'Hello';
}

// async 函数返回的是 Promise
getData().then(result => console.log(result)); // "Hello"
```

### 1.2 await 关键字

```javascript
async function fetchUser() {
  const response = await fetch('/api/user');
  const user = await response.json();
  return user;
}

fetchUser().then(user => console.log(user));
```

### 1.3 错误处理

```javascript
async function getData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // 重新抛出错误
  }
}
```

---

## 2. async/await vs Promise

### 2.1 对比

```javascript
// Promise 方式
function fetchData() {
  return fetch('/api/user')
    .then(res => res.json())
    .then(user => fetch(`/api/posts?userId=${user.id}`))
    .then(res => res.json())
    .catch(error => console.error(error));
}

// async/await 方式
async function fetchData() {
  try {
    const user = await fetch('/api/user').then(res => res.json());
    const posts = await fetch(`/api/posts?userId=${user.id}`).then(res => res.json());
    return posts;
  } catch (error) {
    console.error(error);
  }
}
```

### 2.2 并行执行

```javascript
// 串行执行（较慢）
async function serialFetch() {
  const user = await fetch('/api/user').then(res => res.json());
  const posts = await fetch('/api/posts').then(res => res.json());
  return { user, posts };
}

// 并行执行（较快）
async function parallelFetch() {
  const [userResponse, postsResponse] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts')
  ]);
  const user = await userResponse.json();
  const posts = await postsResponse.json();
  return { user, posts };
}
```

---

## 3. 实际应用场景

### 3.1 处理多个异步操作

```javascript
async function processOrder(orderId) {
  // 获取订单
  const order = await getOrder(orderId);
  
  // 获取用户
  const user = await getUser(order.userId);
  
  // 获取库存
  const inventory = await getInventory(order.items);
  
  // 更新库存
  await updateInventory(inventory);
  
  // 发送通知
  await sendNotification(user, order);
  
  return { success: true };
}
```

### 3.2 异步迭代

```javascript
async function* fetchPages(url) {
  let currentUrl = url;
  
  while (currentUrl) {
    const response = await fetch(currentUrl);
    const data = await response.json();
    yield data.items;
    currentUrl = data.nextUrl;
  }
}

async function getAllItems() {
  const allItems = [];
  for await (const items of fetchPages('/api/items?page=1')) {
    allItems.push(...items);
  }
  return allItems;
}
```

---

## 4. 练习题

1. **转换为 async/await**：
```javascript
fetch('/api/user')
  .then(res => res.json())
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

2. **并行获取数据**：
```javascript
// 同时获取用户、帖子、评论，使用 Promise.all
```

3. **实现异步流水线**：
```javascript
// step1 -> step2 -> step3 -> step4
// 每个步骤都是异步的
```

---

**下一篇**：[Map/Set 数据结构](Map-Set数据结构.md)
