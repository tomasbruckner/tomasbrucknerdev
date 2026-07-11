import type { APIContext } from 'astro';
import { buildBlogFeed } from '../lib/rss';

export const GET = (context: APIContext) => buildBlogFeed('cs', context);
