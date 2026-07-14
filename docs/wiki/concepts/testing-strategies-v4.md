> **版本**: 4.1.7 | 创建时间: 2026-05-31 | 从 v2.1 升级

---

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
import { describe, it, expect, vi } from &amp;amp;#039;vitest&amp;amp;#039;;
import { add, multiply } from &amp;amp;#039;./math&amp;amp;#039;;

describe(&amp;amp;#039;数学函数&amp;amp;#039;, () =&amp;amp;gt; {
  it(&amp;amp;#039;应该正确相加&amp;amp;#039;, () =&amp;amp;gt; {
    expect(add(1, 2)).toBe(3);
  });
  
  it(&amp;amp;#039;应该正确相乘&amp;amp;#039;, () =&amp;amp;gt; {
    expect(multiply(2, 3)).toBe(6);
  });
  
  it(&amp;amp;#039;应该处理负数&amp;amp;#039;, () =&amp;amp;gt; {
    expect(add(-1, -1)).toBe(-2);
  });
});
```

### 2.2 Mocking
```typescript
// api.test.ts
import { vi } from &amp;amp;#039;vitest&amp;amp;#039;;
import { fetchUser } from &amp;amp;#039;./api&amp;amp;#039;;

vi.mock(&amp;amp;#039;./api&amp;amp;#039;, () =&amp;amp;gt; ({
  fetchUser: vi.fn()
}));

it(&amp;amp;#039;应该获取用户&amp;amp;#039;, async () =&amp;amp;gt; {
  vi.mocked(fetchUser).mockResolvedValue({ id: 1, name: &amp;amp;#039;Alice&amp;amp;#039; });
  
  const user = await fetchUser(1);
  expect(user.name).toBe(&amp;amp;#039;Alice&amp;amp;#039;);
});
```

---

## 3. 组件测试

### 3.1 React Testing Library
```typescript
import { render, screen, fireEvent, waitFor } from &amp;amp;#039;@testing-library/react&amp;amp;#039;;
import { TodoApp } from &amp;amp;#039;./TodoApp&amp;amp;#039;;

test(&amp;amp;#039;可以添加待办事项&amp;amp;#039;, async () =&amp;amp;gt; {
  render(&amp;amp;lt;TodoApp /&amp;amp;gt;);
  
  const input = screen.getByPlaceholderText(&amp;amp;#039;添加待办&amp;amp;#039;);
  const button = screen.getByText(&amp;amp;#039;添加&amp;amp;#039;);
  
  fireEvent.change(input, { target: { value: &amp;amp;#039;学习测试&amp;amp;#039; } });
  fireEvent.click(button);
  
  await waitFor(() =&amp;amp;gt; {
    expect(screen.getByText(&amp;amp;#039;学习测试&amp;amp;#039;)).toBeInTheDocument();
  });
});
```

### 3.2 用户事件
```typescript
import { userEvent } from &amp;amp;#039;@testing-library/user-event&amp;amp;#039;;

test(&amp;amp;#039;表单验证&amp;amp;#039;, async () =&amp;amp;gt; {
  const user = userEvent.setup();
  render(&amp;amp;lt;LoginForm /&amp;amp;gt;);
  
  await user.type(screen.getByLabelText(&amp;amp;#039;邮箱&amp;amp;#039;), &amp;amp;#039;invalid-email&amp;amp;#039;);
  await user.click(screen.getByText(&amp;amp;#039;登录&amp;amp;#039;));
  
  expect(await screen.findByText(&amp;amp;#039;邮箱格式不正确&amp;amp;#039;)).toBeInTheDocument();
});
```

---

## 4. E2E 测试

### 4.1 Playwright
```typescript
// tests/login.spec.ts
import { test, expect } from &amp;amp;#039;@playwright/test&amp;amp;#039;;

test.describe(&amp;amp;#039;登录流程&amp;amp;#039;, () =&amp;amp;gt; {
  test(&amp;amp;#039;应该成功登录&amp;amp;#039;, async ({ page }) =&amp;amp;gt; {
    await page.goto(&amp;amp;#039;/login&amp;amp;#039;);
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;email&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;user@example.com&amp;amp;#039;);
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;password&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;password123&amp;amp;#039;);
    await page.click(&amp;amp;#039;button[type=&amp;amp;quot;submit&amp;amp;quot;]&amp;amp;#039;);
    
    await expect(page).toHaveURL(&amp;amp;#039;/dashboard&amp;amp;#039;);
    await expect(page.getByText(&amp;amp;#039;欢迎回来&amp;amp;#039;)).toBeVisible();
  });
  
  test(&amp;amp;#039;应该显示错误信息&amp;amp;#039;, async ({ page }) =&amp;amp;gt; {
    await page.goto(&amp;amp;#039;/login&amp;amp;#039;);
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;email&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;wrong@example.com&amp;amp;#039;);
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;password&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;wrong&amp;amp;#039;);
    await page.click(&amp;amp;#039;button[type=&amp;amp;quot;submit&amp;amp;quot;]&amp;amp;#039;);
    
    await expect(page.getByText(&amp;amp;#039;邮箱或密码错误&amp;amp;#039;)).toBeVisible();
  });
});
```

### 4.2 测试模式
```typescript
// fixtures.ts
import { test as base } from &amp;amp;#039;@playwright/test&amp;amp;#039;;

export const test = base.extend&amp;amp;lt;{ loggedInPage: Page }&amp;amp;gt;({
  loggedInPage: async ({ page }, use) =&amp;amp;gt; {
    await page.goto(&amp;amp;#039;/login&amp;amp;#039;);
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;email&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;test@example.com&amp;amp;#039;);
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;password&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;password&amp;amp;#039;);
    await page.click(&amp;amp;#039;button[type=&amp;amp;quot;submit&amp;amp;quot;]&amp;amp;#039;);
    await page.waitForURL(&amp;amp;#039;/dashboard&amp;amp;#039;);
    await use(page);
  }
});

// 使用 fixture
test(&amp;amp;#039;应该显示用户信息&amp;amp;#039;, async ({ loggedInPage }) =&amp;amp;gt; {
  await loggedInPage.goto(&amp;amp;#039;/profile&amp;amp;#039;);
  await expect(loggedInPage.getByText(&amp;amp;#039;测试用户&amp;amp;#039;)).toBeVisible();
});
```

---

## 5. 测试最佳实践

### 5.1 AAA 模式
```typescript
test(&amp;amp;#039;应该更新用户名称&amp;amp;#039;, async () =&amp;amp;gt; {
  // Arrange (准备)
  const user = { id: 1, name: &amp;amp;#039;Alice&amp;amp;#039; };
  const newName = &amp;amp;#039;Bob&amp;amp;#039;;
  
  // Act (执行)
  const updated = await updateUser(user.id, { name: newName });
  
  // Assert (断言)
  expect(updated.name).toBe(newName);
});
```

### 5.2 测试数据工厂
```typescript
function createUser(overrides: Partial&amp;amp;lt;User&amp;amp;gt; = {}): User {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    ...overrides
  };
}

// 使用
const admin = createUser({ role: &amp;amp;#039;admin&amp;amp;#039; });
const user = createUser();
```

### 5.3 快照测试
```typescript
test(&amp;amp;#039;应该渲染正确的 UI&amp;amp;#039;, () =&amp;amp;gt; {
  const { container } = render(&amp;amp;lt;UserProfile user={mockUser} /&amp;amp;gt;);
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
      provider: &amp;amp;#039;v8&amp;amp;#039;,
      reporter: [&amp;amp;#039;text&amp;amp;#039;, &amp;amp;#039;json&amp;amp;#039;, &amp;amp;#039;html&amp;amp;#039;],
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
