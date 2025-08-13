import {type APIContext} from "astro";
import rss from "@astrojs/rss";
import {getCollection} from "astro:content";

import {postToFrontmatter} from "./_common/post-to-frontmatter";

export async function GET(context: APIContext) {
    const posts = await getCollection("blogPosts");
    const url = context.site;
    if (!url) {
        throw new Error("Unexpected Falsy url. If this is intentional, please add a way to handle this edge case.");
    }

    return rss({
        title: "Sim's Blog",
        description: "Sim's Blog",
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
