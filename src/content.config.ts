import {glob} from "astro/loaders";
import {z, defineCollection} from "astro:content";

const blog = defineCollection({
    loader: glob({pattern: "**/[^_]*.md", base: "./content/blog"}),
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

const curation = defineCollection({
    loader: glob({pattern: "**/[^_]*.md", base: "./content/curation"}),
    schema: z.object({
        title: z.string(),
        youtube: z.string(),
    }),
});

export const collections = {
    blog,
    curation,
};
