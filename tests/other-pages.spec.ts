import { test, expect } from '@playwright/test';

test.describe('Other Application Pages', () => {
  const pages = [
    { name: 'Services', url: '/services' },
    { name: 'Hosts', url: '/hosts' },
    { name: 'Configuration Editor', url: '/config' },
    { name: 'Tasks & Operations', url: '/tasks' },
    { name: 'Log Search', url: '/logs' },
    { name: 'Help & Support', url: '/help' },
    { name: 'Activity Log', url: '/activity' },
  ];

  for (const pageInfo of pages) {
    test(`should display the ${pageInfo.name} page`, async ({ page }) => {
      await page.goto(pageInfo.url);
      await expect(page.getByRole('heading', { name: pageInfo.name })).toBeVisible();
    });
  }

  test('should filter logs on the log search page', async ({ page }) => {
    await page.goto('/logs');
    await expect(page.getByRole('heading', { name: 'Log Search' })).toBeVisible();

    // Check initial state
    await expect(page.getByText('Block replication successful')).toBeVisible();
    await expect(page.getByText('High memory usage detected')).toBeVisible();

    // Filter by text
    await page.getByPlaceholder('Search logs by message...').fill('replication');
    await page.getByRole('button', { name: 'Search' }).click();
    await expect(page.getByText('Block replication successful')).toBeVisible();
    await expect(page.getByText('High memory usage detected')).not.toBeVisible();

    // Filter by level
    await page.getByRole('button', { name: 'Clear' }).click();
    await page.getByRole('combobox').nth(0).click();
    await page.getByRole('option', { name: 'Warning' }).click();
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Block replication successful')).not.toBeVisible();
    await expect(page.getByText('High memory usage detected')).toBeVisible();
  });
});
