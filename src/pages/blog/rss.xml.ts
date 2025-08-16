import {type APIContext} from "astro";
import rss from "@astrojs/rss";

import {
    BLOG_RSS_TITLE,
    BLOG_RSS_DESCRIPTION,
} from "@root/constants";

import {getBlogCollection} from "@helpers/collections/blog";

export async function GET(context: APIContext) {
    const posts = await getBlogCollection();

    const url = context.site;
    if (!url) {
        throw new Error("Unexpected Falsy url. If this is intentional, please add a way to handle this edge case.");
    }

    return rss({
        title: BLOG_RSS_TITLE,
        description: BLOG_RSS_DESCRIPTION,
        site: url,
        items: posts.map((p) => {
            return {
                title: p.frontmatter.title,
                pubDate: p.date.toDate(),
                description: p.frontmatter.description,
                link: p.urlAbsolutePath,
            }
        }),
    });
}
