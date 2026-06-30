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
  await expect(page.locator('html')).toHaveClass(/dark/);
});

test('video lite-embed injects an iframe on click', async ({ page }) => {
  await page.goto('/');
  await page.locator('button.lite-yt').first().click();
  await expect(page.locator('iframe[src*="youtube-nocookie.com/embed"]').first()).toBeVisible();
});

test('copy email button confirms', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const btn = page.locator('#copy-email');
  await btn.click();
  await expect(btn).toHaveText('Zkopírováno!');
});

test('faqpage json-ld is present', async ({ page }) => {
  await page.goto('/');
  const ld = page.locator('script[type="application/ld+json"]');
  const contents = await ld.allTextContents();
  expect(contents.some((c) => c.includes('"FAQPage"'))).toBe(true);
});
