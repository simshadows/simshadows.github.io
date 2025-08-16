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

type ThisCollectionEntry = CollectionEntry<"curation">;

export interface CurationPost {
    //date: TimezonelessDate;
    collectionEntry: ThisCollectionEntry;
};

function collectionEntryToPost(post: ThisCollectionEntry): CurationPost {
    return {
        collectionEntry: post,
    };
}

/*
 * Returns a curation collection.
 */
export async function getCurationCollection(): Promise<CurationPost[]> {
    const posts = (await getCollection("curation")).map(collectionEntryToPost);
    return posts;
}

