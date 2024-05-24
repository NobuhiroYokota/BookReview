import { test, expect } from '@playwright/test';

test('Email,Passwordを入力していない', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('button[type="submit"]');
  const errorMessageLocator = page.getByText('Email,Passwordを入力してください.');
  await expect(errorMessageLocator).toBeVisible();
  const errorMessage = await errorMessageLocator.textContent();
  expect(errorMessage).toBe('Email,Passwordを入力してください.');
});

test('Email,Passowrdが入力されている', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.getByRole('button', { name:'Login'});
  // const errorMessageLocator = page.locator('p');
  // await expect(errorMessageLocator).toHaveText('');
});

