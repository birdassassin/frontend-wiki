# TypeScript

> TypeScript 不是可选，是现代前端的基础设施。类型安全是重构信心的来源。

---

## 1. 核心类型

### 1.1 基础类型
```typescript
// 原始类型
let str: string = 'hello';
let num: number = 42;
let bool: boolean = true;
let nullable: string | null = null;
let optional: string | undefined = undefined;

// 数组
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = ['hello', 42];

// 对象
let obj: { name: string; age: number } = { name: 'Alice', age: 30 };

// 枚举
enum Status { Pending, Active, Completed }
enum Direction { Up = 'UP', Down = 'DOWN' }
```

### 1.2 函数类型
```typescript
// 函数签名
function add(a: number, b: number): number {
  return a + b;
}

// 可选参数
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}

// 函数类型
type MathFn = (a: number, b: number) => number;
const multiply: MathFn = (a, b) => a * b;
```

---

## 2. 高级类型

### 2.1 联合与交叉
```typescript
// 联合类型
type Status = 'pending' | 'active' | 'completed';
type ID = string | number;

// 交叉类型
type WithId = { id: string };
type WithTimestamp = { createdAt: Date };
type Entity = WithId & WithTimestamp;

// 类型守卫
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

### 2.2 泛型
```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 泛型约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### 2.3 工具类型
```typescript
// Partial - 所有属性可选
type PartialUser = Partial<User>;

// Required - 所有属性必需
type RequiredUser = Required<User>;

// Pick - 选择属性
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - 排除属性
type UserWithoutPassword = Omit<User, 'password'>;

// Record - 键值对
type Roles = Record<string, string[]>;

// Readonly - 只读
type ReadonlyUser = Readonly<User>;
```

---

## 3. 类型体操

### 3.1 条件类型
```typescript
type IsString<T> = T extends string ? true : false;

type NonNullable<T> = T extends null | undefined ? never : T;

// 推断
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

### 3.2 映射类型
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// 键重映射
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
```

---

## 4. React + TypeScript

### 4.1 组件类型
```typescript
// 函数组件
interface Props {
  title: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ title, onClick, children }) => {
  return <button onClick={onClick}>{title}{children}</button>;
};

// 泛型组件
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <>{items.map(renderItem)}</>;
}
```

### 4.2 Hooks 类型
```typescript
// useState
const [user, setUser] = useState<User | null>(null);

// useRef
const inputRef = useRef<HTMLInputElement>(null);

// useContext
const theme = useContext<Theme>(ThemeContext);

// 自定义 Hooks
function useFetch<T>(url: string): { data: T | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading };
}
```

---

## 5. 配置与最佳实践

### 5.1 tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUncheckedIndexedAccess": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 5.2 最佳实践
```typescript
// 1. 使用 interface 定义对象，type 定义联合/交叉
interface User { id: string; name: string; }
type Status = 'pending' | 'active';

// 2. 避免 any，使用 unknown
function process(value: unknown) {
  if (typeof value === 'string') {
    value.toUpperCase();
  }
}

// 3. 使用 as const 字面量类型
const roles = ['admin', 'user'] as const;
type Role = typeof roles[number];

// 4. 使用 satisfies 验证类型
const config = {
  port: 3000,
  host: 'localhost'
} satisfies ServerConfig;
```

---

## 6. 相关概念

- [前端工程化](../concepts/frontend-engineering.md)
- [组件架构](../concepts/component-architecture.md)
- [代码质量](../../tools/code-quality.md)
