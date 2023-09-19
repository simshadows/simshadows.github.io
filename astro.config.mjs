import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

import {
    site,
} from "./src/constants";

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [mdx(), preact(), sitemap()]
});
