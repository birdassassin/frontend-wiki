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
import { describe, it, expect } from 'vitest';
import { sum } from './sum';

describe('sum', () => {
  it('adds positive numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  it('adds negative numbers', () => {
    expect(sum(-1, -1)).toBe(-2);
  });
  
  it('handles zero', () => {
    expect(sum(0, 5)).toBe(5);
  });
});
```

### 2.2 Mocking
```typescript
// api.ts
export async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// api.test.ts
import { vi } from 'vitest';

vi.mock('./api', () => ({
  fetchUser: vi.fn()
}));

test('fetches user data', async () => {
  const mockUser = { id: '1', name: 'Alice' };
  vi.mocked(fetchUser).mockResolvedValue(mockUser);
  
  const user = await fetchUser('1');
  expect(user).toEqual(mockUser);
});
```

### 2.3 Test Structure (AAA)
```typescript
test('formats user name', () => {
  // Arrange
  const user = { firstName: 'John', lastName: 'Doe' };
  
  // Act
  const result = formatName(user);
  
  // Assert
  expect(result).toBe('John Doe');
});
```

---

## 3. Component Testing

### 3.1 React Testing Library
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoApp } from './TodoApp';

test('adds a new todo', async () => {
  const user = userEvent.setup();
  render(<TodoApp />);
  
  // Find input and type
  const input = screen.getByPlaceholderText(/add todo/i);
  await user.type(input, 'Learn testing');
  
  // Click add button
  const button = screen.getByRole('button', { name: /add/i });
  await user.click(button);
  
  // Verify todo appears
  await waitFor(() => {
    expect(screen.getByText('Learn testing')).toBeInTheDocument();
  });
});
```

### 3.2 Testing User Behavior
```typescript
// Good: Test what user sees/does
test('shows error message on failed login', async () => {
  render(<LoginForm />);
  
  await userEvent.type(screen.getByLabelText(/email/i), 'wrong@email.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'wrong');
  await userEvent.click(screen.getByRole('button', { name: /login/i }));
  
  expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
});

// Bad: Testing implementation details
test('calls setState with error', () => {
  // Don't test internal state!
});
```

### 3.3 Vue Test Utils
```typescript
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Counter from './Counter.vue';

describe('Counter', () => {
  it('increments on click', async () => {
    const wrapper = mount(Counter);
    
    expect(wrapper.text()).toContain('0');
    
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('1');
  });
});
```

---

## 4. Integration Testing

### 4.1 API Integration
```typescript
import { describe, it, expect } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { fetchTodos } from './api';

const server = setupServer(
  http.get('/api/todos', () => {
    return HttpResponse.json([
      { id: '1', text: 'Test', done: false }
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches todos from API', async () => {
  const todos = await fetchTodos();
  expect(todos).toHaveLength(1);
  expect(todos[0].text).toBe('Test');
});
```

### 4.2 Database Integration
```typescript
import { testDb } from './test-utils';

test('creates user in database', async () => {
  const user = await createUser({ name: 'Alice', email: 'alice@test.com' });
  
  const found = await testDb.user.findUnique({ where: { id: user.id } });
  expect(found).toBeTruthy();
  expect(found?.name).toBe('Alice');
});
```

---

## 5. E2E Testing

### 5.1 Playwright
```typescript
import { test, expect } from '@playwright/test';

test.describe('E-commerce Flow', () => {
  test('user can purchase a product', async ({ page }) => {
    // Navigate to product page
    await page.goto('/products/1');
    
    // Add to cart
    await page.click('button:has-text("Add to Cart")');
    await expect(page.locator('.cart-count')).toHaveText('1');
    
    // Checkout
    await page.click('.cart-icon');
    await page.click('button:has-text("Checkout")');
    
    // Fill shipping info
    await page.fill('[name="address"]', '123 Main St');
    await page.fill('[name="city"]', 'San Francisco');
    await page.click('button:has-text("Continue")');
    
    // Payment
    await page.fill('[name="cardNumber"]', '4242424242424242');
    await page.click('button:has-text("Pay")');
    
    // Verify success
    await expect(page).toHaveURL('/order/confirmation');
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
```

### 5.2 Visual Regression
```typescript
test('homepage looks correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('dark mode looks correct', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-theme-toggle]');
  await expect(page).toHaveScreenshot('homepage-dark.png');
});
```

---

## 6. Test Configuration

### 6.1 Vitest Config
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
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
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
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
- [Code Quality](../../tools/code-quality.en.md)
- [Component Architecture](component-architecture.en.md)
- [CI/CD](../../concepts/ci-cd.en.md)
