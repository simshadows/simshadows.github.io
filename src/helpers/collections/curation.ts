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

import {isUnknownArray} from "@root/danger";
import {
    objGetDate,
    objGetStr,
} from "@helpers/failfast-validation";
import {strCmp} from "@helpers/utils";

import {
    type DatedProcessed,
    processDated,
    cmpDated
} from "./_common/_dated-entries";

import shortEntriesRaw from "@root/../content/curation-short-entries.json";


type ThisCollectionEntry = CollectionEntry<"curation">;


interface CurationPost extends DatedProcessed {
    sortString: string;
    collectionEntry: ThisCollectionEntry | null;

    title: string;
    tldr: string | null;
    youtubeVideoID: string | null;
};


function getShortEntries(): CurationPost[] {
    const raw: unknown = shortEntriesRaw;

    if (!isUnknownArray(raw)) {
        throw new Error();
    }

    return raw.map((obj) => {
        if (!obj || typeof obj !== "object") {
            throw new Error("Object is probably not actually an object.");
        }

        const date = objGetDate(obj, "date");
        const title = objGetStr(obj, "title");
        const youtubeVideoID = objGetStr(obj, "youtube");

        return {
            date,

            sortString: "todo",
            collectionEntry: null,

            title,
            tldr: null,
            youtubeVideoID,
        };
    });
}


function collectionEntryToPost(entry: ThisCollectionEntry): CurationPost {
    return {
        ...processDated(entry.id),

        sortString: entry.id,
        collectionEntry: entry,

        title: entry.data.title,
        tldr: entry.data.tldr || null,
        youtubeVideoID: entry.data.youtube,
    };
}


function cmp(a: CurationPost, b: CurationPost): number {
    return cmpDated(a, b) || strCmp(a.sortString, b.sortString);
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
    const posts = [
        ...(await getCollection("curation")).map(collectionEntryToPost),
        ...getShortEntries(),
    ];
    if (sorted) posts.sort(cmp);
    return posts;
}

