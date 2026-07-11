import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const blogDir = join(root, 'src/content/blog');
const assetsDir = join(root, 'src/assets/blog');
const langs = ['cs', 'en'] as const;
type Lang = (typeof langs)[number];

const IMG_RE = /!\[[^\]]*\]\(([^)]+)\)/g;

interface Post {
  lang: Lang;
  slug: string;
  file: string;
  data: Record<string, any>;
  body: string;
}

function slugsFor(lang: Lang): string[] {
  return readdirSync(join(blogDir, lang))
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function readPosts(): Post[] {
  const out: Post[] = [];
  for (const lang of langs) {
    for (const slug of slugsFor(lang)) {
      const file = join(blogDir, lang, `${slug}.md`);
      const { data, content } = matter(readFileSync(file, 'utf8'));
      out.push({ lang, slug, file, data, body: content });
    }
  }
  return out;
}

/** Absolute paths of every image referenced by a post body. */
function imageRefs(post: Post): string[] {
  return [...post.body.matchAll(IMG_RE)].map((m) => resolve(dirname(post.file), m[1].trim()));
}

const posts = readPosts();
const allSlugs = [...new Set(posts.map((p) => p.slug))].sort();

describe('blog content', () => {
  it('has posts on disk', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it('cs and en have identical slug sets', () => {
    expect(slugsFor('cs').sort()).toEqual(slugsFor('en').sort());
  });

  for (const lang of langs) {
    it(`${lang} slugs are unique`, () => {
      const s = slugsFor(lang);
      expect(new Set(s).size).toBe(s.length);
    });
  }

  for (const post of posts) {
    it(`${post.lang}/${post.slug} has valid frontmatter`, () => {
      expect(typeof post.data.title).toBe('string');
      expect(post.data.title.trim().length).toBeGreaterThan(0);
      expect(typeof post.data.description).toBe('string');
      expect(post.data.description.trim().length).toBeGreaterThan(0);
      expect(post.data.pubDate).toBeInstanceOf(Date);
      expect(Number.isNaN(post.data.pubDate.valueOf())).toBe(false);
      expect(Array.isArray(post.data.tags)).toBe(true);
      expect(post.data.tags.length).toBeGreaterThan(0);
    });
  }

  for (const slug of allSlugs) {
    it(`pair "${slug}" shares tags and pubDate across languages`, () => {
      const cs = posts.find((p) => p.lang === 'cs' && p.slug === slug);
      const en = posts.find((p) => p.lang === 'en' && p.slug === slug);
      expect(cs, `missing cs/${slug}`).toBeDefined();
      expect(en, `missing en/${slug}`).toBeDefined();
      expect(cs!.data.tags).toEqual(en!.data.tags);
      expect(cs!.data.pubDate.valueOf()).toBe(en!.data.pubDate.valueOf());
    });
  }

  for (const post of posts) {
    it(`${post.lang}/${post.slug} references only images that exist on disk`, () => {
      const refs = imageRefs(post);
      expect(refs.length).toBeGreaterThan(0);
      for (const ref of refs) {
        expect(existsSync(ref), `missing image ${ref}`).toBe(true);
      }
    });
  }

  it('every file in src/assets/blog is referenced by at least one post', () => {
    const referenced = new Set(posts.flatMap(imageRefs));

    const assetFiles: string[] = [];
    for (const slug of readdirSync(assetsDir)) {
      const dir = join(assetsDir, slug);
      if (!statSync(dir).isDirectory()) continue;
      for (const f of readdirSync(dir)) assetFiles.push(join(dir, f));
    }

    expect(assetFiles.length).toBeGreaterThan(0);
    for (const f of assetFiles) {
      expect(referenced.has(f), `unreferenced asset: ${f}`).toBe(true);
    }
  });
});
