# TypeScript

> TypeScript isn't optional — it's modern frontend infrastructure. Type safety gives you refactoring confidence.

---

## 1. Core Types

### 1.1 Primitive Types
```typescript
const str: string = 'hello';
const num: number = 42;
const bool: boolean = true;
const nothing: null = null;
const notDefined: undefined = undefined;

// Literal types
const direction: 'left' | 'right' = 'left';
const count: 0 | 1 | 2 = 1;
```

### 1.2 Arrays & Tuples
```typescript
const numbers: number[] = [1, 2, 3];
const mixed: (string | number)[] = ['a', 1, 'b'];

// Tuple
const tuple: [string, number] = ['age', 25];
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
  id: '1',
  name: 'Alice',
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
type Status = 'pending' | 'loading' | 'success' | 'error';

// Intersection
type Admin = User & { role: 'admin'; permissions: string[] };

// Discriminated Union
interface Success<T> { status: 'success'; data: T }
interface Error { status: 'error'; message: string }
type Result<T> = Success<T> | Error;

function handleResult(result: Result<string>) {
  if (result.status === 'success') {
    console.log(result.data); // TypeScript knows data exists
  } else {
    console.error(result.message); // TypeScript knows message exists
  }
}
```

### 2.2 Generics
```typescript
// Generic function
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Generic interface
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
}

// Generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
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
type UpdateUser = Partial<User>;

// Required - all properties required
type StrictUser = Required<User>;

// Pick - select properties
type UserBasic = Pick<User, 'id' | 'name'>;

// Omit - exclude properties
type CreateUser = Omit<User, 'id' | 'createdAt'>;

// Record - key-value map
type UserMap = Record<string, User>;

// Readonly - make all properties readonly
type ImmutableUser = Readonly<User>;
```

---

## 3. Type Gymnastics

### 3.1 Conditional Types
```typescript
type IsString<T> = T extends string ? true : false;

type Result1 = IsString<'hello'>; // true
type Result2 = IsString<42>; // false

// Extract & Exclude
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'
type T1 = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
```

### 3.2 Mapped Types
```typescript
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Key remapping
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }
```

### 3.3 Template Literal Types
```typescript
type EventName = `on${Capitalize<string>}`;
type Handler = (event: EventName) => void;

const handler: Handler = (event) => {};
handler('onClick'); // OK
handler('click'); // Error
```

---

## 4. TypeScript in React

### 4.1 Component Props
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick 
}) => {
  return <button className={variant} onClick={onClick}>{children}</button>;
};
```

### 4.2 Hooks
```typescript
// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const countRef = useRef<number>(0);

// useMemo/useCallback
const sortedUsers = useMemo<User[]>(() => 
  [...users].sort((a, b) => a.name.localeCompare(b.name)),
  [users]
);

const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);
```

### 4.3 Generic Components
```tsx
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (item: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  return (
    <select value={value} onChange={e => onChange(options[Number(e.target.value)])}>
      {options.map((opt, i) => (
        <option key={i} value={i}>{getLabel(opt)}</option>
      ))}
    </select>
  );
}

// Usage
<Select
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={user => user.name}
/>
```

---

## 5. TypeScript in Vue

### 5.1 defineProps & defineEmits
```vue
<script setup lang="ts">
interface Props {
  title: string;
  count?: number;
  items: Item[];
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
});

const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'delete', id: string): void;
}>();
</script>
```

### 5.2 Composables
```typescript
function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(true);
  
  watch(toGetter(url), async (url) => {
    loading.value = true;
    try {
      data.value = await fetch(url).then(r => r.json());
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
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUncheckedIndexedAccess": true
  }
}
```

---

## 7. Related Concepts

- [JavaScript Fundamentals](javascript-fundamentals.en.md)
- [Frontend Engineering](frontend-engineering.en.md)
- [React Core](../techniques/react-core.en.md)
- [Vue Core](../techniques/vue-core.en.md)
