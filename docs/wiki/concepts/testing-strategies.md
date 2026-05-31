# 测试策略

> 测试是文档的 executable 形式。测试描述系统应该如何工作，而不是实际如何工作。

---

## 1. 测试金字塔

```
        /\
       /  \  E2E 测试 (10%)
      /----\
     /      \  集成测试 (20%)
    /--------\
   /          \  单元测试 (70%)
  /------------\
```

---

## 2. 单元测试

### 2.1 Vitest
```typescript
// math.test.ts
import { describe, it, expect, vi } from 'vitest';
import { add, multiply } from './math';

describe('数学函数', () => {
  it('应该正确相加', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  it('应该正确相乘', () => {
    expect(multiply(2, 3)).toBe(6);
  });
  
  it('应该处理负数', () => {
    expect(add(-1, -1)).toBe(-2);
  });
});
```

### 2.2 Mocking
```typescript
// api.test.ts
import { vi } from 'vitest';
import { fetchUser } from './api';

vi.mock('./api', () => ({
  fetchUser: vi.fn()
}));

it('应该获取用户', async () => {
  vi.mocked(fetchUser).mockResolvedValue({ id: 1, name: 'Alice' });
  
  const user = await fetchUser(1);
  expect(user.name).toBe('Alice');
});
```

---

## 3. 组件测试

### 3.1 React Testing Library
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TodoApp } from './TodoApp';

test('可以添加待办事项', async () => {
  render(<TodoApp />);
  
  const input = screen.getByPlaceholderText('添加待办');
  const button = screen.getByText('添加');
  
  fireEvent.change(input, { target: { value: '学习测试' } });
  fireEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByText('学习测试')).toBeInTheDocument();
  });
});
```

### 3.2 用户事件
```typescript
import { userEvent } from '@testing-library/user-event';

test('表单验证', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  
  await user.type(screen.getByLabelText('邮箱'), 'invalid-email');
  await user.click(screen.getByText('登录'));
  
  expect(await screen.findByText('邮箱格式不正确')).toBeInTheDocument();
});
```

---

## 4. E2E 测试

### 4.1 Playwright
```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';

test.describe('登录流程', () => {
  test('应该成功登录', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('欢迎回来')).toBeVisible();
  });
  
  test('应该显示错误信息', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrong');
    await page.click('button[type="submit"]');
    
    await expect(page.getByText('邮箱或密码错误')).toBeVisible();
  });
});
```

### 4.2 测试模式
```typescript
// fixtures.ts
import { test as base } from '@playwright/test';

export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
    await use(page);
  }
});

// 使用 fixture
test('应该显示用户信息', async ({ loggedInPage }) => {
  await loggedInPage.goto('/profile');
  await expect(loggedInPage.getByText('测试用户')).toBeVisible();
});
```

---

## 5. 测试最佳实践

### 5.1 AAA 模式
```typescript
test('应该更新用户名称', async () => {
  // Arrange (准备)
  const user = { id: 1, name: 'Alice' };
  const newName = 'Bob';
  
  // Act (执行)
  const updated = await updateUser(user.id, { name: newName });
  
  // Assert (断言)
  expect(updated.name).toBe(newName);
});
```

### 5.2 测试数据工厂
```typescript
function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    ...overrides
  };
}

// 使用
const admin = createUser({ role: 'admin' });
const user = createUser();
```

### 5.3 快照测试
```typescript
test('应该渲染正确的 UI', () => {
  const { container } = render(<UserProfile user={mockUser} />);
  expect(container).toMatchSnapshot();
});
```

---

## 6. 测试覆盖率

### 6.1 配置
```json
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
});
```

### 6.2 覆盖率目标
| 类型 | 目标 |
|---|---|
| 语句覆盖率 | ≥ 80% |
| 分支覆盖率 | ≥ 80% |
| 函数覆盖率 | ≥ 80% |
| 行覆盖率 | ≥ 80% |

---

## 7. 相关概念

- [前端工程化](frontend-engineering.md)
- [代码质量](../tools/code-quality.md)
- [组件架构](component-architecture.md)
