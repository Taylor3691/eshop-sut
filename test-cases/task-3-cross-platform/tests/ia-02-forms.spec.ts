import { test, expect } from '@playwright/test';
import { captureEvidence } from './evidence';

test.afterEach(async ({ page }, testInfo) => {
  if (page.url() !== 'about:blank') {
    await captureEvidence(page, testInfo, testInfo.title.replace(/[^a-z0-9-]+/gi, '-'));
  }
});

test.describe('IA-02 - Forms', () => {
  test('GUI-009/GUI-012: login exposes required credential controls', async ({ page }) => {
    await page.goto('/login');
    const inputs = page.locator('form input');
    await expect(inputs).toHaveCount(2);
    await expect(inputs.nth(0)).toHaveAttribute('required', '');
    await expect(inputs.nth(1)).toHaveAttribute('required', '');
  });

  test('GUI-010/GUI-011: login input types are recorded', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('form input').nth(0)).toHaveAttribute('type', 'email');
    await expect(page.locator('form input').nth(1)).toHaveAttribute('type', 'password');
  });

  test('GUI-030/GUI-031/GUI-032: registration controls are present', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('form input')).toHaveCount(3);
    await expect(page.locator('form input').nth(1)).toHaveAttribute('type', 'email');
    await expect(page.locator('form input').nth(2)).toHaveAttribute('type', 'password');
  });

  test('GUI-051: forgot-password starts with an email field', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.locator('form input')).toHaveCount(1);
    await expect(page.locator('form input')).toHaveAttribute('required', '');
  });
});
