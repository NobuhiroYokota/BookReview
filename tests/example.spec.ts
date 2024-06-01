import { test, expect } from '@playwright/test';

test('Email,Passwordを入力していない', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('button[type="submit"]');
  const errorMessageLocator = page.getByText('Email、Passwordを入力してください。');
  await expect(errorMessageLocator).toBeVisible();
  const errorMessage = await errorMessageLocator.textContent();
  expect(errorMessage).toBe('Email、Passwordを入力してください。');
});


