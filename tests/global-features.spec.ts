import { test, expect } from '@playwright/test';

test.describe('Global Features', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('http://localhost:3001/auth');
    await page.getByTestId('login-email').fill('jay@gmail.com');
    await page.getByTestId('login-password').fill('123456');
    await page.getByTestId('login-submit-btn').click();
    await page.waitForURL(/.*dashboard\?token=.*/);
  });

  test('sidebar can be toggled', async ({ page }) => {
    await expect(page.locator('[data-sidebar="sidebar"]')).toHaveAttribute('data-state', 'expanded');
    await page.getByTestId('sidebar-collapse-button').click();
    await expect(page.locator('[data-sidebar="sidebar"]')).toHaveAttribute('data-state', 'collapsed');
  });

  test('theme can be toggled', async ({ page }) => {
    const html = page.locator('html');
    await page.getByTestId('theme-toggle-button').click();
    await page.getByTestId('theme-dark').click();
    await expect(html).toHaveClass(/dark/);
  });

  test('global search works', async ({ page }) => {
    await page.getByTestId('global-search-trigger').click();
    await expect(page.getByTestId('global-search-dialog')).toBeVisible();
    await page.getByTestId('global-search-input').fill('Prod');
    
    await expect(page.getByTestId('search-result-cluster-prod-cluster-1')).toBeVisible();
  });
  
  test('quick access modal works', async ({ page }) => {
    await page.getByTestId('quick-access-trigger').click();
    await expect(page.getByTestId('quick-access-dialog')).toBeVisible();
    await expect(page.getByTestId('qa-manage-clusters')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByTestId('quick-access-dialog')).not.toBeVisible();
  });
});
