import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/util';

export type BlogPost = CollectionEntry<'blog'>;

const ID_RE = /^(cs|en)\/[^/]+$/;

/** Parse a validated blog id ("cs/foo" | "en/foo") into its lang + slug parts. */
function parseId(id: string): { lang: Lang; slug: string } {
  if (!ID_RE.test(id)) {
    throw new Error(`Invalid blog post id "${id}" (expected "cs/<slug>" or "en/<slug>")`);
  }
  const sep = id.indexOf('/');
  return { lang: id.slice(0, sep) as Lang, slug: id.slice(sep + 1) };
}

/** id "cs/foo" -> "foo" */
export function postSlug(post: BlogPost): string {
  return parseId(post.id).slug;
}

/** id "cs/foo" -> "cs" */
function postLang(post: BlogPost): Lang {
  return parseId(post.id).lang;
}

/** "/blog/" | "/en/blog/" (+ optional suffix like "slug/" or "tag/docker/") */
export function blogUrl(lang: Lang, path?: string): string {
  const base = lang === 'cs' ? '/blog/' : '/en/blog/';
  return path ? base + path : base;
}

/** Posts for `lang`, excluding drafts, sorted newest first. */
export async function getBlogPosts(lang: Lang): Promise<BlogPost[]> {
  const posts = await getCollection(
    'blog',
    (post) => postLang(post) === lang && post.data.draft === false,
  );
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Static paths for a locale's tag pages: one entry per distinct tag. */
export async function getTagStaticPaths(lang: Lang) {
  const posts = await getBlogPosts(lang);
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))];
  return tags.map((tag) => ({
    params: { tag },
    props: { posts: posts.filter((post) => post.data.tags.includes(tag)) },
  }));
}
