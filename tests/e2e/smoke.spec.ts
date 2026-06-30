import { test, expect } from '@playwright/test';

test('czech home renders with h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Tomáš Bruckner');
  await expect(page).toHaveTitle(/Tomáš Bruckner/);
});

test('english home renders at /en/', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('h1')).toContainText("Hi, I'm Tomáš Bruckner");
});

test('theme toggle adds dark class', async ({ page }) => {
  await page.goto('/');
  await page.locator('.theme-toggle').first().click();
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
});

test('mobile theme toggle (second instance) also works', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.locator('.theme-toggle').nth(1).click();
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
});

test('language switch navigates to /en/', async ({ page }) => {
  await page.goto('/');
  await page.locator('a[href="/en/"]').first().click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.locator('h1')).toContainText("Hi, I'm Tomáš Bruckner");
});

test('video lite-embed injects an iframe on click', async ({ page }) => {
  await page.goto('/');
  await page.locator('button.lite-yt').first().click();
  await expect(page.locator('iframe[src*="youtube-nocookie.com/embed"]').first()).toBeVisible();
});

test('copy email shows confirmation feedback on click', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.locator('#copy-email').click();
  await expect(page.locator('.copied-flag')).toHaveText('Zkopírováno!');
});
