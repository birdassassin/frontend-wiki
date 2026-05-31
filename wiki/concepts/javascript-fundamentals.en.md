# JavaScript Fundamentals

> JavaScript isn't just a language — it's a **runtime**. Understanding the event loop, closures, and prototypes matters more than memorizing syntax.

---

## 1. Execution Model

### 1.1 Execution Context
```javascript
// Global Execution Context
var globalVar = 'global';

function outer() {
  // Outer Execution Context
  var outerVar = 'outer';
  
  function inner() {
    // Inner Execution Context
    var innerVar = 'inner';
    console.log(globalVar, outerVar, innerVar);
  }
  
  return inner;
}
```

### 1.2 Hoisting
```javascript
// Variable hoisting (var only)
console.log(a); // undefined
var a = 1;

// Function hoisting
foo(); // Works
function foo() { console.log('foo'); }

// let/const temporal dead zone
console.log(b); // ReferenceError
let b = 2;
```

### 1.3 Scope Chain
```
Global Scope → Function Scope → Block Scope (let/const)
```

---

## 2. Closures

### 2.1 Core Concept
```javascript
function createCounter() {
  let count = 0; // Encapsulated state
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
```

### 2.2 Common Use Cases
```javascript
// Memoization
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Debounce
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Throttle
function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

---

## 3. Prototypes & Inheritance

### 3.1 Prototype Chain
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const alice = new Person('Alice');
alice.greet(); // Hello, I'm Alice

// Prototype chain: alice → Person.prototype → Object.prototype → null
```

### 3.2 ES6 Classes
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
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

### 3.3 instanceof vs Object.prototype.toString
```javascript
[] instanceof Array; // true
[] instanceof Object; // true

Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
```

---

## 4. Asynchronous Programming

### 4.1 Event Loop
```
Call Stack → Web APIs → Task Queue (Macrotasks) → Microtask Queue
```

**Execution Order:**
1. Execute synchronous code (Call Stack)
2. Execute all Microtasks (Promise.then, queueMicrotask)
3. Execute one Macrotask (setTimeout, setInterval)
4. Repeat steps 2-3

### 4.2 Promise
```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5 ? resolve('success') : reject('error');
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('done'));

// Promise.all - all succeed
Promise.all([p1, p2, p3]).then(results => console.log(results));

// Promise.race - first to settle
Promise.race([p1, p2]).then(result => console.log(result));

// Promise.allSettled - wait for all
Promise.allSettled([p1, p2, p3]).then(results => console.log(results));

// Promise.any - first to succeed
Promise.any([p1, p2]).then(result => console.log(result));
```

### 4.3 Async/Await
```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Parallel execution
async function fetchAll() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  return { users, posts };
}
```

### 4.4 Error Handling
```javascript
// Promise error handling
promise.catch(err => handleError(err));

// Async/await error handling
try {
  const result = await promise;
} catch (err) {
  handleError(err);
}

// Global error handling
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled rejection:', event.reason);
});
```

---

## 5. Module System

### 5.1 ESM (ES Modules)
```javascript
// Named exports
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// Default export
export default class Calculator { /* ... */ }

// Imports
import { PI, add } from './math.js';
import Calculator from './math.js';
import * as Math from './math.js';

// Dynamic import
const module = await import('./dynamic-module.js');
```

### 5.2 CommonJS
```javascript
// Exports
module.exports = { add, PI };
exports.subtract = (a, b) => a - b;

// Imports
const { add, PI } = require('./math');
```

---

## 6. Modern JavaScript Features

### 6.1 Destructuring
```javascript
const { name, age } = user;
const [first, second, ...rest] = array;
const { data: { users } } = response;
```

### 6.2 Spread & Rest
```javascript
const merged = { ...obj1, ...obj2 };
const cloned = [...array];
function sum(...numbers) { return numbers.reduce((a, b) => a + b, 0); }
```

### 6.3 Optional Chaining & Nullish Coalescing
```javascript
const name = user?.profile?.name ?? 'Anonymous';
const count = data?.count ?? 0;
```

### 6.4 Map & Set
```javascript
const map = new Map();
map.set('key', 'value');
map.get('key'); // 'value'

const set = new Set([1, 2, 3, 3]);
set.size; // 3 (unique values)
```

---

## 7. Memory Management

### 7.1 Garbage Collection
```javascript
// Reference counting (legacy)
// Mark-and-sweep (modern)

// Memory leaks to avoid
function createLeak() {
  const element = document.getElementById('my-element');
  element.addEventListener('click', () => {
    // Closure keeps reference to element
    console.log(element);
  });
  element.remove(); // Element still in memory!
}

// Fix: remove event listeners
function noLeak() {
  const element = document.getElementById('my-element');
  const handler = () => console.log(element);
  element.addEventListener('click', handler);
  
  // Cleanup
  element.removeEventListener('click', handler);
}
```

### 7.2 WeakRef & FinalizationRegistry
```javascript
const weakRef = new WeakRef(expensiveObject);
weakRef.deref(); // Returns object if still alive

const registry = new FinalizationRegistry(heldValue => {
  console.log('Object cleaned up:', heldValue);
});
registry.register(target, 'cleanup-data');
```

---

## 8. Related Concepts

- [DOM & Browser API](dom-and-browser-api.en.md)
- [Async Programming](../../techniques/async-programming.en.md)
- [Module Systems](../../techniques/module-systems.en.md)
- [TypeScript](typescript.en.md)
