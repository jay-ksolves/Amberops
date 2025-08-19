import { test, expect } from '@playwright/test';

test.describe('Main Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/auth');
    await page.getByTestId('login-email').fill('jay@gmail.com');
    await page.getByTestId('login-password').fill('123456');
    await page.getByTestId('login-submit-btn').click();
    await page.waitForURL(/.*dashboard\?token=.*/);
  });

  test('should navigate to all main pages from sidebar and show breadcrumbs', async ({ page }) => {
    await page.getByTestId('sidebar-clusters').click();
    await expect(page).toHaveURL(/.*clusters/);
    await expect(page.getByRole('heading', { name: 'Clusters' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Clusters' })).toBeVisible();

    await page.getByTestId('sidebar-services').click();
    await expect(page).toHaveURL(/.*services/);
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Services' })).toBeVisible();

    await page.getByTestId('sidebar-hosts').click();
    await expect(page).toHaveURL(/.*hosts/);
    await expect(page.getByRole('heading', { name: 'Hosts' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Hosts' })).toBeVisible();

    await page.getByTestId('sidebar-alerts').click();
    await page.getByTestId('sidebar-alerts-current').click();
    await expect(page).toHaveURL(/.*alerts/);
    await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Alerts' })).toBeVisible();
    
    await page.getByTestId('sidebar-alerts').click();
    await page.getByTestId('sidebar-alerts-definitions').click();
    await expect(page).toHaveURL(/.*alerts\/definitions/);
    await expect(page.getByRole('heading', { name: 'Alert Definitions' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Definitions' })).toBeVisible();

    await page.getByTestId('sidebar-config').click();
    await expect(page).toHaveURL(/.*config/);
    await expect(page.getByRole('heading', { name: 'Configuration Editor' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Config' })).toBeVisible();

    await page.getByTestId('sidebar-tasks').click();
    await expect(page).toHaveURL(/.*tasks/);
    await expect(page.getByRole('heading', { name: 'Tasks & Operations' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Tasks' })).toBeVisible();
    
    await page.getByTestId('sidebar-logs').click();
    await expect(page).toHaveURL(/.*logs/);
    await expect(page.getByRole('heading', { name: 'Log Search' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Logs' })).toBeVisible();

    await page.getByTestId('sidebar-settings').click();
    await expect(page).toHaveURL(/.*settings/);
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
    await expect(page.getByLabel('Breadcrumb').getByRole('link', { name: 'Settings' })).toBeVisible();
  });
});
