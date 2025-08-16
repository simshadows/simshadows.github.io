/*
 * Filename: curation.ts
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
    type DatedProcessed,
    processDated,
    cmpDated
} from "./_common/_dated-entries";


type ThisCollectionEntry = CollectionEntry<"curation">;


interface CurationPost extends DatedProcessed {
    collectionEntry: ThisCollectionEntry;
};


function collectionEntryToPost(entry: ThisCollectionEntry): CurationPost {
    return {
        ...processDated(entry.id),
        collectionEntry: entry,
    };
}


function cmp(a: CurationPost, b: CurationPost): number {
    return cmpDated(a, b) || strCmp(a.collectionEntry.id, b.collectionEntry.id);
}


/*
 * Returns a curation collection.
 *
 * The returned array is sorted in a stable reverse chronological order by
 * default.
 * Set `sorted` <-- `false` if order is not important.
 */
export async function getCurationCollection(
    sorted: boolean = true,
): Promise<CurationPost[]> {
    const posts = (await getCollection("curation")).map(collectionEntryToPost);
    if (sorted) posts.sort(cmp);
    return posts;
}

