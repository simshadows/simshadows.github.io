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

/*
 * Returns a curation collection.
 */
export async function getCurationCollection(): Promise<ThisCollectionEntry[]> {
    const entries = await getCollection("curation");
    return entries;
}

