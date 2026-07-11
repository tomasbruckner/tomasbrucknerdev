import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { useTranslations } from '../i18n/util';
import { getBlogPosts, blogUrl, postSlug } from '../lib/blog';

const lang = 'cs' as const;

export async function GET(context: APIContext) {
  const t = useTranslations(lang);
  const posts = await getBlogPosts(lang);
  return rss({
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: blogUrl(lang, postSlug(post) + '/'),
    })),
    customData: `<language>cs</language>`,
  });
}
