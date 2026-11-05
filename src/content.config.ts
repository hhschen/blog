import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/posts",
    }),

    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        category: z.enum([
            "Studies",
            "Tech",
            "ACG",
            "Gibberish",
        ]),
        spoiler: z.boolean().default(false),
    }),
});


const now = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/now/current",
    }),
    schema: z.object({
        pubDate: z.coerce.date(),
        title: z.string().optional(),
    }),
});


const nowArchive = defineCollection({
    loader: glob({
        pattern: "*.md",
        base: "./src/content/now/archive",
    }),
    schema: z.object({
        title: z.string().optional(),
    }),
});

export const collections = { posts, now, nowArchive };
