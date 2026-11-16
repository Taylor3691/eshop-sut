import { test, expect } from '@playwright/test';
import { captureEvidence } from './evidence';

test.afterEach(async ({ page }, testInfo) => {
  if (page.url() !== 'about:blank') {
    await captureEvidence(page, testInfo, testInfo.title.replace(/[^a-z0-9-]+/gi, '-'));
  }
});

test.describe('IA-04 - Feedback / State', () => {
  test('GUI-016: invalid login displays user-facing feedback', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input').nth(0).fill('invalid@example.com');
    await page.locator('input').nth(1).fill('invalid-password');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('text=Đăng nhập thất bại')).toBeVisible();
  });

  test('GUI-022: login submit control is present', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('GUI-052: forgot-password exposes an OTP request action', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByRole('button', { name: 'Lấy mã OTP' })).toBeVisible();
  });
});
