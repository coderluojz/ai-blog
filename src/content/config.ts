import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    heroImage: z.string().optional(),
    aiSummary: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog: blog,
};
