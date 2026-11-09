// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
    remarkSpoiler,
    spoilerHastHandlers,
} from "@mirrordown/remd-spoiler";
import icon from "astro-icon";

// https://astro.build/config

export default defineConfig({
    site: "https://blog.h2schen.com",
    integrations: [sitemap(), icon()],

    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        processor: unified({
          remarkPlugins: [
              remarkMath,
              remarkSpoiler,
              [remarkAlert, { legacyTitle: true }],
          ],
            rehypePlugins: [
                rehypeKatex,
                [
                    rehypeExternalLinks,
                    {
                        target: "_blank",
                        rel: ["noopener", "noreferrer"],
                    },
                ],
            ],
            remarkRehype: {
                handlers: spoilerHastHandlers,
            },
        }),
        shikiConfig: {
            themes: {
                light: "vitesse-light",
                dark: "vitesse-dark",
            },
        },
    },
});
