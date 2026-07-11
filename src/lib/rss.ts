import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { useTranslations, type Lang } from '../i18n/util';
import { getBlogPosts, blogUrl, postSlug } from './blog';

/** Build the RSS feed for a locale. The en channel link points at `/en/`;
 *  item links stay root-absolute so they resolve to the same URLs regardless. */
export async function buildBlogFeed(lang: Lang, context: APIContext) {
  const t = useTranslations(lang);
  const posts = await getBlogPosts(lang);
  return rss({
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    site: lang === 'en' ? new URL('/en/', context.site) : context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: blogUrl(lang, postSlug(post) + '/'),
    })),
    customData: `<language>${lang}</language>`,
  });
}
