import { test, expect } from '@playwright/test';

test.describe('Clusters Pages', () => {
   test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001/auth');
    await page.getByPlaceholder('Email').fill('jay@gmail.com');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL(/.*dashboard\?token=.*/);
  });
  
  test('should display the clusters list page', async ({ page }) => {
    await page.goto('/clusters');
    await expect(page.getByRole('heading', { name: 'Clusters' })).toBeVisible();
    await expect(page.getByText('Production Cluster')).toBeVisible();
    await expect(page.getByText('Development Cluster')).toBeVisible();
  });

  test('should navigate to the cluster detail page', async ({ page }) => {
    await page.goto('/clusters');
    await page.getByRole('link', { name: 'View Details' }).first().click();
    
    // Check that the URL is for a specific cluster, not 'undefined'
    await expect(page).not.toHaveURL(/.*clusters\/undefined/);
    await expect(page.getByRole('heading', { name: 'Production Cluster' })).toBeVisible();
    
    // Check for key cards on detail page
    await expect(page.getByText('Status')).toBeVisible();
    await expect(page.getByText('CPU Usage')).toBeVisible();
    await expect(page.getByText('Active Alerts')).toBeVisible();
    await expect(page.getByText('Services')).toBeVisible();
    await expect(page.getByText('Hosts')).toBeVisible();
  });
});
