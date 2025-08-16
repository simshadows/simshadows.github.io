/*
 * Filename: blog.ts
 * Author:   simshadows <contact@simshadows.com>
 *
 * Helpers for the blog collection.
 */

import {
    type CollectionEntry,
    getCollection,
} from "astro:content";

import {strCmp} from "@helpers/utils";

import {
    type Frontmatter,
    makeFrontmatter,
} from "@helpers/frontmatter";

import {
    type DatedProcessed,
    processDated,
    cmpDated
} from "./_common/_dated-entries";


type ThisCollectionEntry = CollectionEntry<"blog">;


export interface BlogPost extends DatedProcessed {
    urlAbsolutePath: string;
    post: ThisCollectionEntry;
    frontmatter: Frontmatter;
};


function collectionEntryToBlogPost(entry: ThisCollectionEntry): BlogPost {
    return {
        ...processDated(entry.id),
        urlAbsolutePath: `/blog/${entry.id}/`,
        post: entry,
        frontmatter: makeFrontmatter({
            description: entry.data.title || "(no description)",
            ...entry.data,
        }),
    };
}


function cmp(a: BlogPost, b: BlogPost): number {
    return cmpDated(a, b) || strCmp(a.post.id, b.post.id);
}


/*
 * Returns a processed blog collection.
 *
 * The returned array is sorted in a stable reverse chronological order by
 * default.
 * Set `sorted` <-- `false` if order is not important.
 */
export async function getBlogCollection(
    sorted: boolean = true,
): Promise<BlogPost[]> {
    const posts = (await getCollection("blog")).map(collectionEntryToBlogPost);
    if (sorted) posts.sort(cmp);
    return posts;
}

