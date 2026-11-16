import { test, expect } from '@playwright/test';
import { captureEvidence } from './evidence';

test.afterEach(async ({ page }, testInfo) => {
  if (page.url() !== 'about:blank') {
    await captureEvidence(page, testInfo, testInfo.title.replace(/[^a-z0-9-]+/gi, '-'));
  }
});

test.describe('IA-01 - General UI Standards', () => {
  test('GUI-001/HR-001: login has a descriptive page heading', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h1, h2')).toHaveCount(1);
    await expect(page.locator('h2')).toContainText('Đăng');
  });

  test('GUI-023/HR-002: register heading is visible', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('h2')).toHaveText('Đăng Ký Tài Khoản');
  });

  test('GUI-044/HR-003: forgot-password heading is visible', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.locator('h2')).toHaveText('Quên Mật Khẩu');
  });

  test('HR-004/HR-005/HR-006: forms fit a narrow viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    for (const route of ['/login', '/register', '/forgot-password']) {
      await page.goto(route);
      expect(await page.locator('body').evaluate((body) => body.scrollWidth <= window.innerWidth)).toBeTruthy();
    }
  });
});
