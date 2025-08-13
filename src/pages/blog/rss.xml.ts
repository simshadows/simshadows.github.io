import {type APIContext} from "astro";
import rss from "@astrojs/rss";
import {getCollection} from "astro:content";

import {
    BLOG_RSS_TITLE,
    BLOG_RSS_DESCRIPTION,
} from "@root/constants";

import {postToFrontmatter} from "./_common/post-to-frontmatter";

export async function GET(context: APIContext) {
    const posts = await getCollection("blog");
    const url = context.site;
    if (!url) {
        throw new Error("Unexpected Falsy url. If this is intentional, please add a way to handle this edge case.");
    }

    return rss({
        title: BLOG_RSS_TITLE,
        description: BLOG_RSS_DESCRIPTION,
        site: url,
        items: posts.map((post) => {
            const bf = postToFrontmatter(post);

            return {
                title: bf.frontmatter.title,
                pubDate: bf.date.toDate(),
                description: bf.frontmatter.description,
                link: bf.urlAbsolutePath,
            }
        }),
    });
}
