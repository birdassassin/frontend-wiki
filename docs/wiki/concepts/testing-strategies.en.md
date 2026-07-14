# Testing Strategies

> Tests are executable documentation. Tests describe how the system should work.

---

## 1. Testing Pyramid

```
        /\
       /  \  E2E Tests (10%)
      /----\
     /      \  Integration Tests (20%)
    /--------\
   /          \  Unit Tests (70%)
  /____________\
```

**Principles:**
- More unit tests, fewer E2E tests
- Unit tests are fast and isolated
- E2E tests are slow but realistic
- Test behavior, not implementation

---

## 2. Unit Testing

### 2.1 Pure Functions
```typescript
// sum.ts
export function sum(a: number, b: number): number {
  return a + b;
}

// sum.test.ts
import { describe, it, expect } from &amp;amp;#039;vitest&amp;amp;#039;;
import { sum } from &amp;amp;#039;./sum&amp;amp;#039;;

describe(&amp;amp;#039;sum&amp;amp;#039;, () =&amp;amp;gt; {
  it(&amp;amp;#039;adds positive numbers&amp;amp;#039;, () =&amp;amp;gt; {
    expect(sum(1, 2)).toBe(3);
  });
  
  it(&amp;amp;#039;adds negative numbers&amp;amp;#039;, () =&amp;amp;gt; {
    expect(sum(-1, -1)).toBe(-2);
  });
  
  it(&amp;amp;#039;handles zero&amp;amp;#039;, () =&amp;amp;gt; {
    expect(sum(0, 5)).toBe(5);
  });
});
```

### 2.2 Mocking
```typescript
// api.ts
export async function fetchUser(id: string): Promise&amp;amp;lt;User&amp;amp;gt; {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// api.test.ts
import { vi } from &amp;amp;#039;vitest&amp;amp;#039;;

vi.mock(&amp;amp;#039;./api&amp;amp;#039;, () =&amp;amp;gt; ({
  fetchUser: vi.fn()
}));

test(&amp;amp;#039;fetches user data&amp;amp;#039;, async () =&amp;amp;gt; {
  const mockUser = { id: &amp;amp;#039;1&amp;amp;#039;, name: &amp;amp;#039;Alice&amp;amp;#039; };
  vi.mocked(fetchUser).mockResolvedValue(mockUser);
  
  const user = await fetchUser(&amp;amp;#039;1&amp;amp;#039;);
  expect(user).toEqual(mockUser);
});
```

### 2.3 Test Structure (AAA)
```typescript
test(&amp;amp;#039;formats user name&amp;amp;#039;, () =&amp;amp;gt; {
  // Arrange
  const user = { firstName: &amp;amp;#039;John&amp;amp;#039;, lastName: &amp;amp;#039;Doe&amp;amp;#039; };
  
  // Act
  const result = formatName(user);
  
  // Assert
  expect(result).toBe(&amp;amp;#039;John Doe&amp;amp;#039;);
});
```

---

## 3. Component Testing

### 3.1 React Testing Library
```typescript
import { render, screen, fireEvent, waitFor } from &amp;amp;#039;@testing-library/react&amp;amp;#039;;
import userEvent from &amp;amp;#039;@testing-library/user-event&amp;amp;#039;;
import { TodoApp } from &amp;amp;#039;./TodoApp&amp;amp;#039;;

test(&amp;amp;#039;adds a new todo&amp;amp;#039;, async () =&amp;amp;gt; {
  const user = userEvent.setup();
  render(&amp;amp;lt;TodoApp /&amp;amp;gt;);
  
  // Find input and type
  const input = screen.getByPlaceholderText(/add todo/i);
  await user.type(input, &amp;amp;#039;Learn testing&amp;amp;#039;);
  
  // Click add button
  const button = screen.getByRole(&amp;amp;#039;button&amp;amp;#039;, { name: /add/i });
  await user.click(button);
  
  // Verify todo appears
  await waitFor(() =&amp;amp;gt; {
    expect(screen.getByText(&amp;amp;#039;Learn testing&amp;amp;#039;)).toBeInTheDocument();
  });
});
```

### 3.2 Testing User Behavior
```typescript
// Good: Test what user sees/does
test(&amp;amp;#039;shows error message on failed login&amp;amp;#039;, async () =&amp;amp;gt; {
  render(&amp;amp;lt;LoginForm /&amp;amp;gt;);
  
  await userEvent.type(screen.getByLabelText(/email/i), &amp;amp;#039;wrong@email.com&amp;amp;#039;);
  await userEvent.type(screen.getByLabelText(/password/i), &amp;amp;#039;wrong&amp;amp;#039;);
  await userEvent.click(screen.getByRole(&amp;amp;#039;button&amp;amp;#039;, { name: /login/i }));
  
  expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
});

// Bad: Testing implementation details
test(&amp;amp;#039;calls setState with error&amp;amp;#039;, () =&amp;amp;gt; {
  // Don&amp;amp;#039;t test internal state!
});
```

### 3.3 Vue Test Utils
```typescript
import { mount } from &amp;amp;#039;@vue/test-utils&amp;amp;#039;;
import { describe, it, expect } from &amp;amp;#039;vitest&amp;amp;#039;;
import Counter from &amp;amp;#039;./Counter.vue&amp;amp;#039;;

describe(&amp;amp;#039;Counter&amp;amp;#039;, () =&amp;amp;gt; {
  it(&amp;amp;#039;increments on click&amp;amp;#039;, async () =&amp;amp;gt; {
    const wrapper = mount(Counter);
    
    expect(wrapper.text()).toContain(&amp;amp;#039;0&amp;amp;#039;);
    
    await wrapper.find(&amp;amp;#039;button&amp;amp;#039;).trigger(&amp;amp;#039;click&amp;amp;#039;);
    expect(wrapper.text()).toContain(&amp;amp;#039;1&amp;amp;#039;);
  });
});
```

---

## 4. Integration Testing

### 4.1 API Integration
```typescript
import { describe, it, expect } from &amp;amp;#039;vitest&amp;amp;#039;;
import { setupServer } from &amp;amp;#039;msw/node&amp;amp;#039;;
import { http, HttpResponse } from &amp;amp;#039;msw&amp;amp;#039;;
import { fetchTodos } from &amp;amp;#039;./api&amp;amp;#039;;

const server = setupServer(
  http.get(&amp;amp;#039;/api/todos&amp;amp;#039;, () =&amp;amp;gt; {
    return HttpResponse.json([
      { id: &amp;amp;#039;1&amp;amp;#039;, text: &amp;amp;#039;Test&amp;amp;#039;, done: false }
    ]);
  })
);

beforeAll(() =&amp;amp;gt; server.listen());
afterEach(() =&amp;amp;gt; server.resetHandlers());
afterAll(() =&amp;amp;gt; server.close());

test(&amp;amp;#039;fetches todos from API&amp;amp;#039;, async () =&amp;amp;gt; {
  const todos = await fetchTodos();
  expect(todos).toHaveLength(1);
  expect(todos[0].text).toBe(&amp;amp;#039;Test&amp;amp;#039;);
});
```

### 4.2 Database Integration
```typescript
import { testDb } from &amp;amp;#039;./test-utils&amp;amp;#039;;

test(&amp;amp;#039;creates user in database&amp;amp;#039;, async () =&amp;amp;gt; {
  const user = await createUser({ name: &amp;amp;#039;Alice&amp;amp;#039;, email: &amp;amp;#039;alice@test.com&amp;amp;#039; });
  
  const found = await testDb.user.findUnique({ where: { id: user.id } });
  expect(found).toBeTruthy();
  expect(found?.name).toBe(&amp;amp;#039;Alice&amp;amp;#039;);
});
```

---

## 5. E2E Testing

### 5.1 Playwright
```typescript
import { test, expect } from &amp;amp;#039;@playwright/test&amp;amp;#039;;

test.describe(&amp;amp;#039;E-commerce Flow&amp;amp;#039;, () =&amp;amp;gt; {
  test(&amp;amp;#039;user can purchase a product&amp;amp;#039;, async ({ page }) =&amp;amp;gt; {
    // Navigate to product page
    await page.goto(&amp;amp;#039;/products/1&amp;amp;#039;);
    
    // Add to cart
    await page.click(&amp;amp;#039;button:has-text(&amp;amp;quot;Add to Cart&amp;amp;quot;)&amp;amp;#039;);
    await expect(page.locator(&amp;amp;#039;.cart-count&amp;amp;#039;)).toHaveText(&amp;amp;#039;1&amp;amp;#039;);
    
    // Checkout
    await page.click(&amp;amp;#039;.cart-icon&amp;amp;#039;);
    await page.click(&amp;amp;#039;button:has-text(&amp;amp;quot;Checkout&amp;amp;quot;)&amp;amp;#039;);
    
    // Fill shipping info
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;address&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;123 Main St&amp;amp;#039;);
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;city&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;San Francisco&amp;amp;#039;);
    await page.click(&amp;amp;#039;button:has-text(&amp;amp;quot;Continue&amp;amp;quot;)&amp;amp;#039;);
    
    // Payment
    await page.fill(&amp;amp;#039;[name=&amp;amp;quot;cardNumber&amp;amp;quot;]&amp;amp;#039;, &amp;amp;#039;4242424242424242&amp;amp;#039;);
    await page.click(&amp;amp;#039;button:has-text(&amp;amp;quot;Pay&amp;amp;quot;)&amp;amp;#039;);
    
    // Verify success
    await expect(page).toHaveURL(&amp;amp;#039;/order/confirmation&amp;amp;#039;);
    await expect(page.locator(&amp;amp;#039;.success-message&amp;amp;#039;)).toBeVisible();
  });
});
```

### 5.2 Visual Regression
```typescript
test(&amp;amp;#039;homepage looks correct&amp;amp;#039;, async ({ page }) =&amp;amp;gt; {
  await page.goto(&amp;amp;#039;/&amp;amp;#039;);
  await expect(page).toHaveScreenshot(&amp;amp;#039;homepage.png&amp;amp;#039;);
});

test(&amp;amp;#039;dark mode looks correct&amp;amp;#039;, async ({ page }) =&amp;amp;gt; {
  await page.goto(&amp;amp;#039;/&amp;amp;#039;);
  await page.click(&amp;amp;#039;[data-theme-toggle]&amp;amp;#039;);
  await expect(page).toHaveScreenshot(&amp;amp;#039;homepage-dark.png&amp;amp;#039;);
});
```

---

## 6. Test Configuration

### 6.1 Vitest Config
```typescript
// vitest.config.ts
import { defineConfig } from &amp;amp;#039;vitest/config&amp;amp;#039;;
import react from &amp;amp;#039;@vitejs/plugin-react&amp;amp;#039;;

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: &amp;amp;#039;jsdom&amp;amp;#039;,
    setupFiles: [&amp;amp;#039;./test/setup.ts&amp;amp;#039;],
    coverage: {
      provider: &amp;amp;#039;v8&amp;amp;#039;,
      reporter: [&amp;amp;#039;text&amp;amp;#039;, &amp;amp;#039;json&amp;amp;#039;, &amp;amp;#039;html&amp;amp;#039;],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80
      }
    }
  }
});
```

### 6.2 Playwright Config
```typescript
// playwright.config.ts
import { defineConfig, devices } from &amp;amp;#039;@playwright/test&amp;amp;#039;;

export default defineConfig({
  testDir: &amp;amp;#039;./e2e&amp;amp;#039;,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: &amp;amp;#039;http://localhost:3000&amp;amp;#039;,
    trace: &amp;amp;#039;on-first-retry&amp;amp;#039;
  },
  projects: [
    { name: &amp;amp;#039;chromium&amp;amp;#039;, use: { ...devices[&amp;amp;#039;Desktop Chrome&amp;amp;#039;] } },
    { name: &amp;amp;#039;firefox&amp;amp;#039;, use: { ...devices[&amp;amp;#039;Desktop Firefox&amp;amp;#039;] } },
    { name: &amp;amp;#039;webkit&amp;amp;#039;, use: { ...devices[&amp;amp;#039;Desktop Safari&amp;amp;#039;] } }
  ],
  webServer: {
    command: &amp;amp;#039;npm run dev&amp;amp;#039;,
    url: &amp;amp;#039;http://localhost:3000&amp;amp;#039;,
    reuseExistingServer: !process.env.CI
  }
});
```

---

## 7. Best Practices

### 7.1 DO
- Write tests before fixing bugs (regression tests)
- Test behavior, not implementation
- Use descriptive test names
- Keep tests independent
- Mock external dependencies
- Aim for 80%+ coverage

### 7.2 DON'T
- Don't test third-party libraries
- Don't test trivial code (getters/setters)
- Don't share state between tests
- Don't use snapshot testing for everything
- Don't ignore failing tests

### 7.3 Test Organization
```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx    # Co-located tests
├── utils/
│   ├── format.ts
│   └── format.test.ts
└── __tests__/              # Or separate test folder
    └── integration/
```

---

## 8. Related Concepts

- [Frontend Engineering](frontend-engineering.en.md)
- [Code Quality](../tools/code-quality.en.md)
- [Component Architecture](component-architecture.en.md)
- [CI/CD](../concepts/ci-cd.en.md)
