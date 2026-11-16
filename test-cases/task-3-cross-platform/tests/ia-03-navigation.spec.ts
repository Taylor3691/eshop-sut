import { test, expect } from '@playwright/test';
import { captureEvidence } from './evidence';

test.afterEach(async ({ page }, testInfo) => {
  if (page.url() !== 'about:blank') {
    await captureEvidence(page, testInfo, testInfo.title.replace(/[^a-z0-9-]+/gi, '-'));
  }
});

test.describe('IA-03 - Navigation', () => {
  test('GUI-018: forgot-password link reaches the recovery route', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'Quên mật khẩu?' }).click();
    await expect(page).toHaveURL(/\/forgot-password$/);
  });

  test('GUI-019: registration link reaches the registration route', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'Đăng ký ngay' }).click();
    await expect(page).toHaveURL(/\/register$/);
  });

  test('GUI-020: brand link reaches the storefront root', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'EShop' }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
