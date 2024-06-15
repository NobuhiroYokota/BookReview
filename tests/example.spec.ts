import { test, expect } from '@playwright/test';

test('Email,Passwordを入力していない', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('button[type="submit"]');
  const errorMessageLocator = page.getByText('Email、Passwordを入力してください。');
  await expect(errorMessageLocator).toBeVisible();
  const errorMessage = await errorMessageLocator.textContent();
  expect(errorMessage).toBe('Email、Passwordを入力してください。');
});

test('EmailとPasswordが入力されている場合、Errorメッセージが表示されない', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('input[id="email"]', 'test@example.com');
  await page.fill('input[id="password"]', 'password123');
  await page.click('button[type="submit"]');
  const errorMessageLocator = page.locator('#error');
  await expect(errorMessageLocator).toBeHidden();
});