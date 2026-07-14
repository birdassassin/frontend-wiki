# TypeScript

> TypeScript 不是可选，是现代前端的基础设施。类型安全是重构信心的来源。

---

## 1. 核心类型

### 1.1 基础类型
```typescript
// 原始类型
let str: string = &amp;amp;#039;hello&amp;amp;#039;;
let num: number = 42;
let bool: boolean = true;
let nullable: string | null = null;
let optional: string | undefined = undefined;

// 数组
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = [&amp;amp;#039;hello&amp;amp;#039;, 42];

// 对象
let obj: { name: string; age: number } = { name: &amp;amp;#039;Alice&amp;amp;#039;, age: 30 };

// 枚举
enum Status { Pending, Active, Completed }
enum Direction { Up = &amp;amp;#039;UP&amp;amp;#039;, Down = &amp;amp;#039;DOWN&amp;amp;#039; }
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
type MathFn = (a: number, b: number) =&amp;amp;gt; number;
const multiply: MathFn = (a, b) =&amp;amp;gt; a * b;
```

---

## 2. 高级类型

### 2.1 联合与交叉
```typescript
// 联合类型
type Status = &amp;amp;#039;pending&amp;amp;#039; | &amp;amp;#039;active&amp;amp;#039; | &amp;amp;#039;completed&amp;amp;#039;;
type ID = string | number;

// 交叉类型
type WithId = { id: string };
type WithTimestamp = { createdAt: Date };
type Entity = WithId &amp;amp;amp; WithTimestamp;

// 类型守卫
function isString(value: unknown): value is string {
  return typeof value === &amp;amp;#039;string&amp;amp;#039;;
}
```

### 2.2 泛型
```typescript
// 泛型函数
function identity&amp;amp;lt;T&amp;amp;gt;(arg: T): T {
  return arg;
}

// 泛型接口
interface ApiResponse&amp;amp;lt;T&amp;amp;gt; {
  data: T;
  status: number;
  message: string;
}

// 泛型约束
function getProperty&amp;amp;lt;T, K extends keyof T&amp;amp;gt;(obj: T, key: K): T[K] {
  return obj[key];
}
```

### 2.3 工具类型
```typescript
// Partial - 所有属性可选
type PartialUser = Partial&amp;amp;lt;User&amp;amp;gt;;

// Required - 所有属性必需
type RequiredUser = Required&amp;amp;lt;User&amp;amp;gt;;

// Pick - 选择属性
type UserPreview = Pick&amp;amp;lt;User, &amp;amp;#039;id&amp;amp;#039; | &amp;amp;#039;name&amp;amp;#039;&amp;amp;gt;;

// Omit - 排除属性
type UserWithoutPassword = Omit&amp;amp;lt;User, &amp;amp;#039;password&amp;amp;#039;&amp;amp;gt;;

// Record - 键值对
type Roles = Record&amp;amp;lt;string, string[]&amp;amp;gt;;

// Readonly - 只读
type ReadonlyUser = Readonly&amp;amp;lt;User&amp;amp;gt;;
```

---

## 3. 类型体操

### 3.1 条件类型
```typescript
type IsString&amp;amp;lt;T&amp;amp;gt; = T extends string ? true : false;

type NonNullable&amp;amp;lt;T&amp;amp;gt; = T extends null | undefined ? never : T;

// 推断
type ReturnType&amp;amp;lt;T&amp;amp;gt; = T extends (...args: any[]) =&amp;amp;gt; infer R ? R : any;
```

### 3.2 映射类型
```typescript
type Readonly&amp;amp;lt;T&amp;amp;gt; = {
  readonly [P in keyof T]: T[P];
};

type Optional&amp;amp;lt;T&amp;amp;gt; = {
  [P in keyof T]?: T[P];
};

// 键重映射
type Getters&amp;amp;lt;T&amp;amp;gt; = {
  [K in keyof T as `get${Capitalize&amp;amp;lt;string &amp;amp;amp; K&amp;amp;gt;}`]: () =&amp;amp;gt; T[K];
};
```

---

## 4. React + TypeScript

### 4.1 组件类型
```typescript
// 函数组件
interface Props {
  title: string;
  onClick?: () =&amp;amp;gt; void;
  children: React.ReactNode;
}

const Button: React.FC&amp;amp;lt;Props&amp;amp;gt; = ({ title, onClick, children }) =&amp;amp;gt; {
  return &amp;amp;lt;button onClick={onClick}&amp;amp;gt;{title}{children}&amp;amp;lt;/button&amp;amp;gt;;
};

// 泛型组件
interface ListProps&amp;amp;lt;T&amp;amp;gt; {
  items: T[];
  renderItem: (item: T) =&amp;amp;gt; React.ReactNode;
}

function List&amp;amp;lt;T&amp;amp;gt;({ items, renderItem }: ListProps&amp;amp;lt;T&amp;amp;gt;) {
  return &amp;amp;lt;&amp;amp;gt;{items.map(renderItem)}&amp;amp;lt;/&amp;amp;gt;;
}
```

### 4.2 Hooks 类型
```typescript
// useState
const [user, setUser] = useState&amp;amp;lt;User | null&amp;amp;gt;(null);

// useRef
const inputRef = useRef&amp;amp;lt;HTMLInputElement&amp;amp;gt;(null);

// useContext
const theme = useContext&amp;amp;lt;Theme&amp;amp;gt;(ThemeContext);

// 自定义 Hooks
function useFetch&amp;amp;lt;T&amp;amp;gt;(url: string): { data: T | null; loading: boolean } {
  const [data, setData] = useState&amp;amp;lt;T | null&amp;amp;gt;(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() =&amp;amp;gt; {
    fetch(url).then(r =&amp;amp;gt; r.json()).then(setData).finally(() =&amp;amp;gt; setLoading(false));
  }, [url]);
  
  return { data, loading };
}
```

---

## 5. 配置与最佳实践

### 5.1 tsconfig.json
```json
{
  &amp;amp;quot;compilerOptions&amp;amp;quot;: {
    &amp;amp;quot;target&amp;amp;quot;: &amp;amp;quot;ES2020&amp;amp;quot;,
    &amp;amp;quot;module&amp;amp;quot;: &amp;amp;quot;ESNext&amp;amp;quot;,
    &amp;amp;quot;lib&amp;amp;quot;: [&amp;amp;quot;ES2020&amp;amp;quot;, &amp;amp;quot;DOM&amp;amp;quot;, &amp;amp;quot;DOM.Iterable&amp;amp;quot;],
    &amp;amp;quot;jsx&amp;amp;quot;: &amp;amp;quot;react-jsx&amp;amp;quot;,
    &amp;amp;quot;strict&amp;amp;quot;: true,
    &amp;amp;quot;esModuleInterop&amp;amp;quot;: true,
    &amp;amp;quot;skipLibCheck&amp;amp;quot;: true,
    &amp;amp;quot;forceConsistentCasingInFileNames&amp;amp;quot;: true,
    &amp;amp;quot;resolveJsonModule&amp;amp;quot;: true,
    &amp;amp;quot;isolatedModules&amp;amp;quot;: true,
    &amp;amp;quot;noUncheckedIndexedAccess&amp;amp;quot;: true,
    &amp;amp;quot;paths&amp;amp;quot;: {
      &amp;amp;quot;@/*&amp;amp;quot;: [&amp;amp;quot;./src/*&amp;amp;quot;]
    }
  }
}
```

### 5.2 最佳实践
```typescript
// 1. 使用 interface 定义对象，type 定义联合/交叉
interface User { id: string; name: string; }
type Status = &amp;amp;#039;pending&amp;amp;#039; | &amp;amp;#039;active&amp;amp;#039;;

// 2. 避免 any，使用 unknown
function process(value: unknown) {
  if (typeof value === &amp;amp;#039;string&amp;amp;#039;) {
    value.toUpperCase();
  }
}

// 3. 使用 as const 字面量类型
const roles = [&amp;amp;#039;admin&amp;amp;#039;, &amp;amp;#039;user&amp;amp;#039;] as const;
type Role = typeof roles[number];

// 4. 使用 satisfies 验证类型
const config = {
  port: 3000,
  host: &amp;amp;#039;localhost&amp;amp;#039;
} satisfies ServerConfig;
```

---

## 6. 相关概念

- [前端工程化](../concepts/frontend-engineering.md)
- [组件架构](../concepts/component-architecture.md)
- [代码质量](../tools/code-quality.md)
