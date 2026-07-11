import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '{cs,en}/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
