import {glob} from "astro/loaders";
import {z, defineCollection} from "astro:content";

const blogPosts = defineCollection({
    loader: glob({pattern: "**/[^_]*.md", base: "./src/blog-posts"}),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        keywords: z.array(z.string()),

        hidetoc: z.boolean().optional(),
        wip: z.boolean().optional(),

        // Compatibility attributes for my old blog files.
        // They should be unused.
        categories: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        original_url: z.string().optional(),
    }),
});

export const collections = {
    blogPosts,
};
