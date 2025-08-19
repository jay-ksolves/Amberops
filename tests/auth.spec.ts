import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  const HOME_URL = 'http://localhost:3001';
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the auth page on the home app
    await page.goto(`${HOME_URL}/auth`);
  });

  test('should display the sign-in form by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

  test('should switch to the sign-up form', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByPlaceholder('Name')).toBeVisible();
  });

  test('should show error for invalid login', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('wrong@user.com');
    await page.getByPlaceholder('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Check for the toast notification
    await expect(page.getByText('Invalid credentials.')).toBeVisible();
  });

  test('should login successfully and redirect to web dashboard', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('jay@gmail.com');
    await page.getByPlaceholder('Password').fill('123456');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // The page will redirect to the web app on localhost:3000
    await page.waitForURL(/.*dashboard\?token=.*/);
    await expect(page).toHaveURL(/.*dashboard\?token=.*/);
    
    // Verify that the dashboard is loaded by checking for a key element
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should login as admin and redirect to admin dashboard', async ({ page }) => {
    await page.getByPlaceholder('Email').fill('admin@amberops.com');
    await page.getByPlaceholder('Password').fill('admin@amberops');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // The page will redirect to the admin app on localhost:3003
    await page.waitForURL(/.*dashboard\?token=.*/);
    await expect(page).toHaveURL(/.*dashboard\?token=.*/);

    // Verify that the admin dashboard is loaded
    await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
  });
});
