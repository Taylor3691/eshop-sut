import { expect, Page, TestInfo } from '@playwright/test';
import path from 'node:path';

import { evidenceLabel } from '../fixtures/test-data';

export async function captureEvidence(page: Page, testInfo: TestInfo, name: string) {
  await page.evaluate((label) => {
    const existing = document.querySelector('[data-task3-overlay]');
    existing?.remove();
    const overlay = document.createElement('div');
    overlay.dataset.task3Overlay = 'true';
    overlay.textContent = label;
    Object.assign(overlay.style, {
      position: 'fixed',
      right: '12px',
      bottom: '12px',
      zIndex: '2147483647',
      padding: '6px 10px',
      color: '#ffffff',
      background: 'rgba(0, 0, 0, 0.78)',
      borderRadius: '4px',
      font: '12px Arial, sans-serif',
      whiteSpace: 'nowrap',
    });
    document.body.appendChild(overlay);
  }, evidenceLabel);

  const browser = testInfo.project.name;
  const file = path.join(testInfo.project.outputDir, '..', 'screenshots', browser, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  await expect(page.locator('[data-task3-overlay]')).toHaveText(evidenceLabel);
}
