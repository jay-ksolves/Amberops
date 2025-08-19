import { test, expect } from '@playwright/test';

// This test requires authentication, which is now handled by logging in first.
test.describe('Dashboard Page', () => {
  const WEB_URL = 'http://localhost:3000';
  const HOME_URL = 'http://localhost:3001';

  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto(`${HOME_URL}/auth`);
    await page.getByTestId('login-email').fill('jay@gmail.com');
    await page.getByTestId('login-password').fill('123456');
    await page.getByTestId('login-submit-btn').click();
    await page.waitForURL(/.*dashboard\?token=.*/);
    
    // Clear session storage to ensure the tour runs on each test
    await page.evaluate(() => window.sessionStorage.clear());
    await page.goto(`${WEB_URL}/dashboard`);
  });

  test('should display the dashboard title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should display summary cards', async ({ page }) => {
    await expect(page.getByText('Total Clusters')).toBeVisible();
    await expect(page.getByText('Active Alerts')).toBeVisible();
    await expect(page.getByText('Avg. CPU Usage')).toBeVisible();
    await expect(page.getByText('Avg. Memory Usage')).toBeVisible();
  });

  test('should display cluster status table', async ({ page }) => {
    await expect(page.getByTestId('cluster-status-card')).toBeVisible();
    await expect(page.getByText('Production Cluster')).toBeVisible();
    await expect(page.getByText('Development Cluster')).toBeVisible();
  });

  test('should show onboarding tour and allow skipping it', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome!' })).toBeVisible();
    await expect(page.getByText('Welcome to AmberOps! This is your main dashboard')).toBeVisible();
    await page.getByRole('button', { name: 'Skip' }).click();
    await expect(page.getByRole('heading', { name: 'Welcome!' })).not.toBeVisible();
  });
});
