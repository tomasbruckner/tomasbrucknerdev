import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/util';

export type BlogPost = CollectionEntry<'blog'>;

/** id "cs/foo" -> "foo" */
export function postSlug(post: BlogPost): string {
  return post.id.slice(post.id.indexOf('/') + 1);
}

/** id "cs/foo" -> "cs" */
export function postLang(post: BlogPost): Lang {
  return post.id.slice(0, post.id.indexOf('/')) as Lang;
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
