/*
 * Filename: blog-frontmatter.ts
 * Author:   simshadows <contact@simshadows.com>
 */

import {type CollectionEntry} from "astro:content";

import {strCmp} from "@helpers/utils";
import {TimezonelessDate} from "@helpers/timezoneless-date";

import {
    type Frontmatter,
    makeFrontmatter,
} from "@helpers/frontmatter";

type ThisCollectionEntry = CollectionEntry<"blog">;

export interface BlogFrontmatter {
    urlAbsolutePath: string;
    date: TimezonelessDate;
    post: ThisCollectionEntry;
    frontmatter: Frontmatter;
};

function filenameErr(filename: string): Error {
    filename; // TODO: I should actually make the error message specific about
              //       what the format expectations are.
    return new Error(`Invalid blog post filename '${filename}'. Filenames must start with an ISO8601 date like '2025-03-26-foobar.md'`);
}

export function postToFrontmatter(post: ThisCollectionEntry): BlogFrontmatter {
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

/*
 * A comparison function for sorting chronologically in a consistent way.
 * Can be used like array.sort(blogFrontmatterCmp).
 */
export function blogFrontmatterCmp(
    a: BlogFrontmatter,
    b: BlogFrontmatter,
): number {
    const dateCmp = a.date.toOrderedNumber() - b.date.toOrderedNumber();
    return dateCmp || strCmp(a.post.id, b.post.id);
}
