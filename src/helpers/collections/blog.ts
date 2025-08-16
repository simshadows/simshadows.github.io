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
import {TimezonelessDate} from "@helpers/timezoneless-date";

import {
    type Frontmatter,
    makeFrontmatter,
} from "@helpers/frontmatter";

type ThisCollectionEntry = CollectionEntry<"blog">;

export interface BlogPost {
    urlAbsolutePath: string;
    date: TimezonelessDate;
    post: ThisCollectionEntry;
    frontmatter: Frontmatter;
};

function filenameErr(filename: string): Error {
    return new Error(`Invalid blog post filename '${filename}'. Filenames must start with an ISO8601 date like '2025-03-26-foobar.md'`);
}

function collectionEntryToBlogPost(post: ThisCollectionEntry): BlogPost {
    const idMandatoryPrefix = post.id.slice(0, 11);

    if (
        post.id.length < 12
        || idMandatoryPrefix.length !== 11
        || idMandatoryPrefix.slice(-1) !== "-"
    ) {
        throw filenameErr(post.id);
    }

    return {
        urlAbsolutePath: `/blog/${post.id}/`,
        date: TimezonelessDate.parseISODate(idMandatoryPrefix.slice(0, 10)),
        post,
        frontmatter: makeFrontmatter({
            description: post.data.title || "(no description)",
            ...post.data,
        }),
    };
}


function blogPostCmp(a: BlogPost, b: BlogPost): number {
    const dateCmp = a.date.toOrderedNumber() - b.date.toOrderedNumber();
    return dateCmp || strCmp(a.post.id, b.post.id);
}


/*
 * Returns a processed blog collection.
 *
 * The returned array is sorted in a stable chronological order by default.
 * Set `sorted` <-- `false` if order is not important.
 */
export async function getBlogCollection(
    sorted: boolean = true,
): Promise<BlogPost[]> {
    const posts = (await getCollection("blog")).map(collectionEntryToBlogPost);
    if (sorted) posts.sort(blogPostCmp);
    return posts;
}

