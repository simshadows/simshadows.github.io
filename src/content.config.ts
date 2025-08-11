import {glob} from "astro/loaders";
import {z, defineCollection} from "astro:content";

const blogPosts = defineCollection({
    loader: glob({pattern: "**/[^_]*.md", base: "./src/blog-posts"}),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        keywords: z.array(z.string()),

        hidetoc: z.boolean().optional(),
        wip: z.boolean().optional(),
    }),
});

export const collections = {
    blogPosts,
};
