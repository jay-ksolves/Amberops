import { test, expect } from '@playwright/test';

test.describe('Alerts Pages', () => {
  test('should display the main alerts list', async ({ page }) => {
    await page.goto('/alerts');
    await expect(page.getByRole('heading', { name: 'Alerts' })).toBeVisible();
    await expect(page.getByText('HDFS Storage Capacity')).toBeVisible();
    await expect(page.getByText('Node Manager Health')).toBeVisible();
  });

  test('should navigate to the alert detail page', async ({ page }) => {
    await page.goto('/alerts');
    await page.getByRole('link', { name: 'View Details' }).first().click();
    await expect(page).toHaveURL(/.*alerts\/alert-1/);
    await expect(page.getByRole('heading', { name: 'HDFS Storage Capacity' })).toBeVisible();
    await expect(page.getByText('AI-Powered Troubleshooting')).toBeVisible();
  });
  
  test('should display the alert definitions page', async ({ page }) => {
    await page.goto('/alerts/definitions');
    await expect(page.getByRole('heading', { name: 'Alert Definitions' })).toBeVisible();
    await expect(page.getByText('HDFS Blocks Health')).toBeVisible();
    await expect(page.getByText('NodeManager Health')).toBeVisible();
  });
});
