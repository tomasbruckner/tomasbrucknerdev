import { test, expect } from '@playwright/test';

test.describe('blog listing', () => {
  test('cs: /blog/ shows heading and 2 dated cards', async ({ page }) => {
    await page.goto('/blog/');
    await expect(page.locator('h1')).toHaveText('Blog');
    await expect(page.locator('article')).toHaveCount(2);
    await expect(page.getByText('6. dubna 2020')).toBeVisible();
  });

  test('en: /en/blog/ shows heading and 2 dated cards', async ({ page }) => {
    await page.goto('/en/blog/');
    await expect(page.locator('h1')).toHaveText('Blog');
    await expect(page.locator('article')).toHaveCount(2);
    await expect(page.getByText('April 6, 2020')).toBeVisible();
  });
});

test.describe('blog post detail', () => {
  test('cs: renders title, published row, reading time, code block, image', async ({ page }) => {
    await page.goto('/blog/snapshot-testing-dotnet-core/');

    await expect(page.locator('h1')).toContainText(
      'Moderní testování Web API pomocí snapshotů v .NET Core 3',
    );

    const publishedRow = page.getByText('Publikováno').first();
    await expect(publishedRow).toBeVisible();
    await expect(publishedRow).toContainText('6. dubna 2020');

    await expect(page.getByText('min čtení').first()).toBeVisible();

    await expect(page.locator('pre.astro-code').first()).toBeVisible();

    const img = page.locator('article img').first();
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  });

  test('en: renders Published / min read labels', async ({ page }) => {
    await page.goto('/en/blog/snapshot-testing-dotnet-core/');

    await expect(page.locator('h1')).toContainText(
      'Modern Web API Testing with Snapshots in .NET Core 3',
    );

    const publishedRow = page.getByText('Published').first();
    await expect(publishedRow).toBeVisible();
    await expect(publishedRow).toContainText('April 6, 2020');

    await expect(page.getByText('min read').first()).toBeVisible();
  });
});

test.describe('blog language switch', () => {
  test('post detail switches cs -> en -> cs', async ({ page }) => {
    await page.goto('/blog/snapshot-testing-dotnet-core/');

    await page.locator('a[href="/en/blog/snapshot-testing-dotnet-core/"]').first().click();
    await expect(page).toHaveURL(/\/en\/blog\/snapshot-testing-dotnet-core\/?$/);

    await page.locator('a[href="/blog/snapshot-testing-dotnet-core/"]').first().click();
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toBe('/blog/snapshot-testing-dotnet-core/');
  });
});

test.describe('blog tag pages', () => {
  test('cs: /blog/tag/docker/ lists only the xdebug post', async ({ page }) => {
    await page.goto('/blog/tag/docker/');
    await expect(page.locator('article')).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'IntelliJ Xdebug s Dockerem na WSL 2' })).toBeVisible();
    await expect(page.getByText('Moderní testování Web API')).toHaveCount(0);
  });

  test('en: /en/blog/tag/dotnet/ lists only the snapshot post', async ({ page }) => {
    await page.goto('/en/blog/tag/dotnet/');
    await expect(page.locator('article')).toHaveCount(1);
    await expect(
      page.getByRole('link', { name: 'Modern Web API Testing with Snapshots in .NET Core 3' }),
    ).toBeVisible();
    await expect(page.getByText('IntelliJ Xdebug with WSL 2 Docker')).toHaveCount(0);
  });
});

test.describe('blog rss', () => {
  test('cs: /rss.xml serves both posts', async ({ request }) => {
    const res = await request.get('/rss.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('xml');
    const body = await res.text();
    expect(body).toContain('snapshot-testing-dotnet-core');
    expect(body).toContain('intellij-xdebug-wsl2-docker');
  });

  test('en: /en/rss.xml serves both posts', async ({ request }) => {
    const res = await request.get('/en/rss.xml');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('xml');
    const body = await res.text();
    expect(body).toContain('snapshot-testing-dotnet-core');
    expect(body).toContain('intellij-xdebug-wsl2-docker');
  });
});

test.describe('blog nav integration', () => {
  test('from /blog/, "O mně" nav link lands on /#about', async ({ page }) => {
    await page.goto('/blog/');
    await page.getByRole('link', { name: 'O mně', exact: true }).click();
    await expect(page).toHaveURL(/\/#about$/);
    await expect(page.locator('h1')).toContainText('Tomáš Bruckner');
  });

  test('from /, "Blog" nav link lands on /blog/', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Blog', exact: true }).click();
    await expect(page).toHaveURL(/\/blog\/?$/);
    await expect(page.locator('h1')).toHaveText('Blog');
  });
});

test.describe('homepage blog section', () => {
  test('cs: #blog has 2 cards and links to /blog/', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#blog');
    await expect(section.locator('article')).toHaveCount(2);
    const allPostsLink = section.getByRole('link', { name: /Všechny články/ });
    await expect(allPostsLink).toHaveAttribute('href', '/blog/');
  });

  test('en: #blog has 2 cards and links to /en/blog/', async ({ page }) => {
    await page.goto('/en/');
    const section = page.locator('#blog');
    await expect(section.locator('article')).toHaveCount(2);
    const allPostsLink = section.getByRole('link', { name: /All posts/ });
    await expect(allPostsLink).toHaveAttribute('href', '/en/blog/');
  });
});
