import { test, expect } from '@playwright/test';

test.describe('Data Table Features', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('http://localhost:3001/auth');
    await page.getByTestId('login-email').fill('jay@gmail.com');
    await page.getByTestId('login-password').fill('123456');
    await page.getByTestId('login-submit-btn').click();
    await page.waitForURL(/.*dashboard\?token=.*/);
    
    await page.goto('/clusters');
    // Wait for the table to finish loading
    await expect(page.locator('[role="cell"]:has-text("Production Cluster")')).toBeVisible();
  });

  test('should show and hide clear filter button correctly', async ({ page }) => {
    const clearButton = page.getByRole('tooltip', { name: 'Clear all filters and customizations' });

    await expect(clearButton).not.toBeVisible();

    // Test with filter
    await page.getByPlaceholder('Filter by name...').fill('Prod');
    await expect(clearButton).toBeVisible();
    await clearButton.click();
    await expect(clearButton).not.toBeVisible();

    // Test with sorting
    await page.getByRole('button', { name: 'Name' }).click();
    await expect(clearButton).toBeVisible();
    await clearButton.click();
    await expect(clearButton).not.toBeVisible();

    // Test with row selection
    await page.getByLabel('Select row').first().check();
    await expect(clearButton).toBeVisible();
    await clearButton.click();
    await expect(clearButton).not.toBeVisible();

    // Test with view customization
    await page.getByRole('button', { name: 'Customize' }).click();
    await page.getByRole('combobox').nth(0).click();
    await page.getByRole('option', { name: 'Compact' }).click();
    await expect(clearButton).toBeVisible();
    await page.getByRole('button', { name: 'Customize' }).click(); // Close popover
    await clearButton.click();
    await expect(clearButton).not.toBeVisible();
  });

  test('should export data to Excel', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('export-button').click();
    await page.getByTestId('export-excel').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('table_data.xlsx');
  });

  test('should export data to PDF', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('export-button').click();
    await page.getByTestId('export-pdf').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('table_data.pdf');
  });

  test('should switch between list and card view', async ({ page }) => {
    // Check default is table view
    await expect(page.getByRole('table')).toBeVisible();

    // Switch to card view
    await page.getByRole('button', { name: 'Grid View' }).click();
    await expect(page.getByRole('table')).not.toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Production ClusterID: .*$/ })).toBeVisible();


    // Switch back to list view
    await page.getByRole('button', { name: 'List View' }).click();
    await expect(page.getByRole('table')).toBeVisible();
  });
});
