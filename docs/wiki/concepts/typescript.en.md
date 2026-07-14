# TypeScript

> TypeScript isn't optional — it's modern frontend infrastructure. Type safety gives you refactoring confidence.

---

## 1. Core Types

### 1.1 Primitive Types
```typescript
const str: string = &amp;amp;#039;hello&amp;amp;#039;;
const num: number = 42;
const bool: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;

// Literal types
const direction: &amp;amp;#039;left&amp;amp;#039; | &amp;amp;#039;right&amp;amp;#039; = &amp;amp;#039;left&amp;amp;#039;;
const count: 0 | 1 | 2 = 1;
```

### 1.2 Arrays & Tuples
```typescript
const numbers: number[] = [1, 2, 3];
const mixed: (string | number)[] = [&amp;amp;#039;a&amp;amp;#039;, 1, &amp;amp;#039;b&amp;amp;#039;];

// Tuple
const tuple: [string, number] = [&amp;amp;#039;age&amp;amp;#039;, 25];
const [key, value] = tuple;

// Readonly
const readonlyArr: readonly number[] = [1, 2, 3];
```

### 1.3 Objects & Interfaces
```typescript
interface User {
  id: string;
  name: string;
  email?: string; // Optional
  readonly createdAt: Date; // Readonly
}

const user: User = {
  id: &amp;amp;#039;1&amp;amp;#039;,
  name: &amp;amp;#039;Alice&amp;amp;#039;,
  createdAt: new Date()
};

// Type alias
type Point = { x: number; y: number };
type ID = string | number;
```

---

## 2. Advanced Types

### 2.1 Union & Intersection
```typescript
// Union
type Status = &amp;amp;#039;pending&amp;amp;#039; | &amp;amp;#039;loading&amp;amp;#039; | &amp;amp;#039;success&amp;amp;#039; | &amp;amp;#039;error&amp;amp;#039;;

// Intersection
type Admin = User &amp;amp;amp; { role: &amp;amp;#039;admin&amp;amp;#039;; permissions: string[] };

// Discriminated Union
interface Success&amp;amp;lt;T&amp;amp;gt; { status: &amp;amp;#039;success&amp;amp;#039;; data: T }
interface Error { status: &amp;amp;#039;error&amp;amp;#039;; message: string }
type Result&amp;amp;lt;T&amp;amp;gt; = Success&amp;amp;lt;T&amp;amp;gt; | Error;

function handleResult(result: Result&amp;amp;lt;string&amp;amp;gt;) {
  if (result.status === &amp;amp;#039;success&amp;amp;#039;) {
    console.log(result.data); // TypeScript knows data exists
  } else {
    console.error(result.message); // TypeScript knows message exists
  }
}
```

### 2.2 Generics
```typescript
// Generic function
function first&amp;amp;lt;T&amp;amp;gt;(arr: T[]): T | undefined {
  return arr[0];
}

// Generic interface
interface Repository&amp;amp;lt;T&amp;amp;gt; {
  findById(id: string): Promise&amp;amp;lt;T | null&amp;amp;gt;;
  findAll(): Promise&amp;amp;lt;T[]&amp;amp;gt;;
  create(data: Omit&amp;amp;lt;T, &amp;amp;#039;id&amp;amp;#039;&amp;amp;gt;): Promise&amp;amp;lt;T&amp;amp;gt;;
}

// Generic constraints
function getProperty&amp;amp;lt;T, K extends keyof T&amp;amp;gt;(obj: T, key: K) {
  return obj[key];
}
```

### 2.3 Utility Types
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Partial - all properties optional
type UpdateUser = Partial&amp;amp;lt;User&amp;amp;gt;;

// Required - all properties required
type StrictUser = Required&amp;amp;lt;User&amp;amp;gt;;

// Pick - select properties
type UserBasic = Pick&amp;amp;lt;User, &amp;amp;#039;id&amp;amp;#039; | &amp;amp;#039;name&amp;amp;#039;&amp;amp;gt;;

// Omit - exclude properties
type CreateUser = Omit&amp;amp;lt;User, &amp;amp;#039;id&amp;amp;#039; | &amp;amp;#039;createdAt&amp;amp;#039;&amp;amp;gt;;

// Record - key-value map
type UserMap = Record&amp;amp;lt;string, User&amp;amp;gt;;

// Readonly - make all properties readonly
type ImmutableUser = Readonly&amp;amp;lt;User&amp;amp;gt;;
```

---

## 3. Type Gymnastics

### 3.1 Conditional Types
```typescript
type IsString&amp;amp;lt;T&amp;amp;gt; = T extends string ? true : false;

type Result1 = IsString&amp;amp;lt;&amp;amp;#039;hello&amp;amp;#039;&amp;amp;gt;; // true
type Result2 = IsString&amp;amp;lt;42&amp;amp;gt;; // false

// Extract &amp;amp;amp; Exclude
type T0 = Extract&amp;amp;lt;&amp;amp;#039;a&amp;amp;#039; | &amp;amp;#039;b&amp;amp;#039; | &amp;amp;#039;c&amp;amp;#039;, &amp;amp;#039;a&amp;amp;#039; | &amp;amp;#039;b&amp;amp;#039;&amp;amp;gt;; // &amp;amp;#039;a&amp;amp;#039; | &amp;amp;#039;b&amp;amp;#039;
type T1 = Exclude&amp;amp;lt;&amp;amp;#039;a&amp;amp;#039; | &amp;amp;#039;b&amp;amp;#039; | &amp;amp;#039;c&amp;amp;#039;, &amp;amp;#039;a&amp;amp;#039;&amp;amp;gt;; // &amp;amp;#039;b&amp;amp;#039; | &amp;amp;#039;c&amp;amp;#039;
```

### 3.2 Mapped Types
```typescript
type Optional&amp;amp;lt;T&amp;amp;gt; = { [K in keyof T]?: T[K] };
type Nullable&amp;amp;lt;T&amp;amp;gt; = { [K in keyof T]: T[K] | null };

// Key remapping
type Getters&amp;amp;lt;T&amp;amp;gt; = {
  [K in keyof T as `get${Capitalize&amp;amp;lt;string &amp;amp;amp; K&amp;amp;gt;}`]: () =&amp;amp;gt; T[K]
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters&amp;amp;lt;Person&amp;amp;gt;;
// { getName: () =&amp;amp;gt; string; getAge: () =&amp;amp;gt; number }
```

### 3.3 Template Literal Types
```typescript
type EventName = `on${Capitalize&amp;amp;lt;string&amp;amp;gt;}`;
type Handler = (event: EventName) =&amp;amp;gt; void;

const handler: Handler = (event) =&amp;amp;gt; {};
handler(&amp;amp;#039;onClick&amp;amp;#039;); // OK
handler(&amp;amp;#039;click&amp;amp;#039;); // Error
```

---

## 4. TypeScript in React

### 4.1 Component Props
```tsx
interface ButtonProps {
  variant?: &amp;amp;#039;primary&amp;amp;#039; | &amp;amp;#039;secondary&amp;amp;#039;;
  size?: &amp;amp;#039;sm&amp;amp;#039; | &amp;amp;#039;md&amp;amp;#039; | &amp;amp;#039;lg&amp;amp;#039;;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent&amp;amp;lt;HTMLButtonElement&amp;amp;gt;) =&amp;amp;gt; void;
}

const Button: React.FC&amp;amp;lt;ButtonProps&amp;amp;gt; = ({ 
  variant = &amp;amp;#039;primary&amp;amp;#039;, 
  children, 
  onClick 
}) =&amp;amp;gt; {
  return &amp;amp;lt;button className={variant} onClick={onClick}&amp;amp;gt;{children}&amp;amp;lt;/button&amp;amp;gt;;
};
```

### 4.2 Hooks
```typescript
// useState
const [count, setCount] = useState&amp;amp;lt;number&amp;amp;gt;(0);
const [user, setUser] = useState&amp;amp;lt;User | null&amp;amp;gt;(null);

// useRef
const inputRef = useRef&amp;amp;lt;HTMLInputElement&amp;amp;gt;(null);
const countRef = useRef&amp;amp;lt;number&amp;amp;gt;(0);

// useMemo/useCallback
const sortedUsers = useMemo&amp;amp;lt;User[]&amp;amp;gt;(() =&amp;amp;gt; 
  [...users].sort((a, b) =&amp;amp;gt; a.name.localeCompare(b.name)),
  [users]
);

const handleClick = useCallback((id: string) =&amp;amp;gt; {
  setSelected(id);
}, []);
```

### 4.3 Generic Components
```tsx
interface SelectProps&amp;amp;lt;T&amp;amp;gt; {
  options: T[];
  value: T;
  onChange: (value: T) =&amp;amp;gt; void;
  getLabel: (item: T) =&amp;amp;gt; string;
}

function Select&amp;amp;lt;T&amp;amp;gt;({ options, value, onChange, getLabel }: SelectProps&amp;amp;lt;T&amp;amp;gt;) {
  return (
    &amp;amp;lt;select value={value} onChange={e =&amp;amp;gt; onChange(options[Number(e.target.value)])}&amp;amp;gt;
      {options.map((opt, i) =&amp;amp;gt; (
        &amp;amp;lt;option key={i} value={i}&amp;amp;gt;{getLabel(opt)}&amp;amp;lt;/option&amp;amp;gt;
      ))}
    &amp;amp;lt;/select&amp;amp;gt;
  );
}

// Usage
&amp;amp;lt;Select
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={user =&amp;amp;gt; user.name}
/&amp;amp;gt;
```

---

## 5. TypeScript in Vue

### 5.1 defineProps & defineEmits
```vue
&amp;amp;lt;script setup lang=&amp;amp;quot;ts&amp;amp;quot;&amp;amp;gt;
interface Props {
  title: string;
  count?: number;
  items: Item[];
}

const props = withDefaults(defineProps&amp;amp;lt;Props&amp;amp;gt;(), {
  count: 0
});

const emit = defineEmits&amp;amp;lt;{
  (e: &amp;amp;#039;update&amp;amp;#039;, value: number): void;
  (e: &amp;amp;#039;delete&amp;amp;#039;, id: string): void;
}&amp;amp;gt;();
&amp;amp;lt;/script&amp;amp;gt;
```

### 5.2 Composables
```typescript
function useFetch&amp;amp;lt;T&amp;amp;gt;(url: MaybeRefOrGetter&amp;amp;lt;string&amp;amp;gt;) {
  const data = ref&amp;amp;lt;T | null&amp;amp;gt;(null);
  const error = ref&amp;amp;lt;Error | null&amp;amp;gt;(null);
  const loading = ref(true);
  
  watch(toGetter(url), async (url) =&amp;amp;gt; {
    loading.value = true;
    try {
      data.value = await fetch(url).then(r =&amp;amp;gt; r.json());
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }, { immediate: true });
  
  return { data, error, loading };
}
```

---

## 6. Best Practices

### 6.1 DO
- Use strict mode (`"strict": true`)
- Prefer interfaces for object types
- Use type aliases for unions and mapped types
- Let TypeScript infer when possible
- Use `as const` for literal types
- Use discriminated unions over boolean flags

### 6.2 DON'T
- Avoid `any` — use `unknown` if unsure
- Don't use type assertions (`as Type`) without reason
- Don't over-engineer types
- Avoid `!` non-null assertion
- Don't use `React.FC` for simple components

### 6.3 Configuration
```json
{
  &amp;amp;quot;compilerOptions&amp;amp;quot;: {
    &amp;amp;quot;target&amp;amp;quot;: &amp;amp;quot;ES2020&amp;amp;quot;,
    &amp;amp;quot;module&amp;amp;quot;: &amp;amp;quot;ESNext&amp;amp;quot;,
    &amp;amp;quot;moduleResolution&amp;amp;quot;: &amp;amp;quot;bundler&amp;amp;quot;,
    &amp;amp;quot;strict&amp;amp;quot;: true,
    &amp;amp;quot;esModuleInterop&amp;amp;quot;: true,
    &amp;amp;quot;skipLibCheck&amp;amp;quot;: true,
    &amp;amp;quot;forceConsistentCasingInFileNames&amp;amp;quot;: true,
    &amp;amp;quot;resolveJsonModule&amp;amp;quot;: true,
    &amp;amp;quot;isolatedModules&amp;amp;quot;: true,
    &amp;amp;quot;noUncheckedIndexedAccess&amp;amp;quot;: true
  }
}
```

---

## 7. Related Concepts

- [JavaScript Fundamentals](javascript-fundamentals.en.md)
- [Frontend Engineering](frontend-engineering.en.md)
- [React Core](../techniques/react-core.en.md)
- [Vue Core](../techniques/vue-core.en.md)
