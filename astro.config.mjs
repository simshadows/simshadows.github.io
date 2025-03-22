import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

import {rehypeLatex, shikiExcludeLangs} from "./src/latex-helpers/rehype-plugin/rehype-plugin";

import {
    SHIKI_THEME,
    SITE,
} from "./src/constants";

// https://astro.build/config
export default defineConfig({
    site: SITE,
    integrations: [mdx(), preact(), sitemap()],
    markdown: {
        shikiConfig: {
            theme: SHIKI_THEME,
        },
        syntaxHighlight: {
            type: "shiki",
            excludeLangs: [...shikiExcludeLangs],
        },
        rehypePlugins: [rehypeLatex],
    },
});

