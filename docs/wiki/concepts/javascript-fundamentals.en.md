# JavaScript Fundamentals

> JavaScript isn't just a language — it's a **runtime**. Understanding the event loop, closures, and prototypes matters more than memorizing syntax.

---

## 1. Execution Model

### 1.1 Execution Context
```javascript
// Global Execution Context
var globalVar = &amp;amp;#039;global&amp;amp;#039;;

function outer() {
  // Outer Execution Context
  var outerVar = &amp;amp;#039;outer&amp;amp;#039;;
  
  function inner() {
    // Inner Execution Context
    var innerVar = &amp;amp;#039;inner&amp;amp;#039;;
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
function foo() { console.log(&amp;amp;#039;foo&amp;amp;#039;); }

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
    increment: () =&amp;amp;gt; ++count,
    decrement: () =&amp;amp;gt; --count,
    getCount: () =&amp;amp;gt; count
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
  return (...args) =&amp;amp;gt; {
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
  return (...args) =&amp;amp;gt; {
    clearTimeout(timer);
    timer = setTimeout(() =&amp;amp;gt; fn(...args), delay);
  };
}

// Throttle
function throttle(fn, limit) {
  let inThrottle;
  return (...args) =&amp;amp;gt; {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() =&amp;amp;gt; inThrottle = false, limit);
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
  console.log(`Hello, I&amp;amp;#039;m ${this.name}`);
};

const alice = new Person(&amp;amp;#039;Alice&amp;amp;#039;);
alice.greet(); // Hello, I&amp;amp;#039;m Alice

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

Object.prototype.toString.call([]); // &amp;amp;quot;[object Array]&amp;amp;quot;
Object.prototype.toString.call({}); // &amp;amp;quot;[object Object]&amp;amp;quot;
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
const promise = new Promise((resolve, reject) =&amp;amp;gt; {
  setTimeout(() =&amp;amp;gt; {
    Math.random() &amp;amp;gt; 0.5 ? resolve(&amp;amp;#039;success&amp;amp;#039;) : reject(&amp;amp;#039;error&amp;amp;#039;);
  }, 1000);
});

promise
  .then(result =&amp;amp;gt; console.log(result))
  .catch(error =&amp;amp;gt; console.error(error))
  .finally(() =&amp;amp;gt; console.log(&amp;amp;#039;done&amp;amp;#039;));

// Promise.all - all succeed
Promise.all([p1, p2, p3]).then(results =&amp;amp;gt; console.log(results));

// Promise.race - first to settle
Promise.race([p1, p2]).then(result =&amp;amp;gt; console.log(result));

// Promise.allSettled - wait for all
Promise.allSettled([p1, p2, p3]).then(results =&amp;amp;gt; console.log(results));

// Promise.any - first to succeed
Promise.any([p1, p2]).then(result =&amp;amp;gt; console.log(result));
```

### 4.3 Async/Await
```javascript
async function fetchData() {
  try {
    const response = await fetch(&amp;amp;#039;/api/data&amp;amp;#039;);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(&amp;amp;#039;Fetch failed:&amp;amp;#039;, error);
    throw error;
  }
}

// Parallel execution
async function fetchAll() {
  const [users, posts] = await Promise.all([
    fetch(&amp;amp;#039;/api/users&amp;amp;#039;).then(r =&amp;amp;gt; r.json()),
    fetch(&amp;amp;#039;/api/posts&amp;amp;#039;).then(r =&amp;amp;gt; r.json())
  ]);
  return { users, posts };
}
```

### 4.4 Error Handling
```javascript
// Promise error handling
promise.catch(err =&amp;amp;gt; handleError(err));

// Async/await error handling
try {
  const result = await promise;
} catch (err) {
  handleError(err);
}

// Global error handling
window.addEventListener(&amp;amp;#039;unhandledrejection&amp;amp;#039;, event =&amp;amp;gt; {
  console.error(&amp;amp;#039;Unhandled rejection:&amp;amp;#039;, event.reason);
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
import { PI, add } from &amp;amp;#039;./math.js&amp;amp;#039;;
import Calculator from &amp;amp;#039;./math.js&amp;amp;#039;;
import * as Math from &amp;amp;#039;./math.js&amp;amp;#039;;

// Dynamic import
const module = await import(&amp;amp;#039;./dynamic-module.js&amp;amp;#039;);
```

### 5.2 CommonJS
```javascript
// Exports
module.exports = { add, PI };
exports.subtract = (a, b) =&amp;amp;gt; a - b;

// Imports
const { add, PI } = require(&amp;amp;#039;./math&amp;amp;#039;);
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
function sum(...numbers) { return numbers.reduce((a, b) =&amp;amp;gt; a + b, 0); }
```

### 6.3 Optional Chaining & Nullish Coalescing
```javascript
const name = user?.profile?.name ?? &amp;amp;#039;Anonymous&amp;amp;#039;;
const count = data?.count ?? 0;
```

### 6.4 Map & Set
```javascript
const map = new Map();
map.set(&amp;amp;#039;key&amp;amp;#039;, &amp;amp;#039;value&amp;amp;#039;);
map.get(&amp;amp;#039;key&amp;amp;#039;); // &amp;amp;#039;value&amp;amp;#039;

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
  const element = document.getElementById(&amp;amp;#039;my-element&amp;amp;#039;);
  element.addEventListener(&amp;amp;#039;click&amp;amp;#039;, () =&amp;amp;gt; {
    // Closure keeps reference to element
    console.log(element);
  });
  element.remove(); // Element still in memory!
}

// Fix: remove event listeners
function noLeak() {
  const element = document.getElementById(&amp;amp;#039;my-element&amp;amp;#039;);
  const handler = () =&amp;amp;gt; console.log(element);
  element.addEventListener(&amp;amp;#039;click&amp;amp;#039;, handler);
  
  // Cleanup
  element.removeEventListener(&amp;amp;#039;click&amp;amp;#039;, handler);
}
```

### 7.2 WeakRef & FinalizationRegistry
```javascript
const weakRef = new WeakRef(expensiveObject);
weakRef.deref(); // Returns object if still alive

const registry = new FinalizationRegistry(heldValue =&amp;amp;gt; {
  console.log(&amp;amp;#039;Object cleaned up:&amp;amp;#039;, heldValue);
});
registry.register(target, &amp;amp;#039;cleanup-data&amp;amp;#039;);
```

---

## 8. Related Concepts

- [DOM & Browser API](dom-and-browser-api.en.md)
- [Async Programming](../techniques/async-programming.en.md)
- [Module Systems](../techniques/module-systems.en.md)
- [TypeScript](typescript.en.md)
