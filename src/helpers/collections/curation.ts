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
import {CURATION_ITEMS_PER_PAGE} from "@root/constants";
import {
    objGetDate,
    objGetStr,
    objGetStrOptional,
} from "@helpers/failfast-validation";
import {
    strCmp,
    groupBySize,
} from "@helpers/utils";

import {
    type DatedProcessed,
    processDated,
    cmpDated
} from "./_common/_dated-entries";

import shortEntriesRaw from "@root/../content/curation-short-entries.json";


type ThisCollectionEntry = CollectionEntry<"curation">;


export interface CurationPost extends DatedProcessed {
    sortString: string;
    collectionEntry: ThisCollectionEntry | undefined;

    title: string;
    synopsis: string | undefined;

    url: string | undefined;
    youtubeVideoID: string | undefined;
};

interface CurationPostsPaginated {
    groups: CurationPost[][];
};

interface CurationCollectionStats {
    count: number;
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

        return {
            date: objGetDate(obj, "date"),

            sortString: "todo",
            collectionEntry: undefined,

            title: objGetStr(obj, "title"),
            synopsis: objGetStrOptional(obj, "synopsis"),

            url: objGetStrOptional(obj, "url"),
            youtubeVideoID: objGetStrOptional(obj, "youtube"),
        };
    });
}


function collectionEntryToPost(entry: ThisCollectionEntry): CurationPost {
    return {
        ...processDated(entry.id),

        sortString: entry.id,
        collectionEntry: entry,

        title: entry.data.title,
        synopsis: entry.data.synopsis,

        url: undefined, // TODO: NOT YET IMPLEMENTED
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


/*
 * Always sorted.
 */
export async function getCurationCollectionPaginated(): Promise<CurationPostsPaginated> {
    const posts = await getCurationCollection();
    const groups = groupBySize(posts, CURATION_ITEMS_PER_PAGE);
    return {groups};
}


export async function getCurationCollectionStats(): Promise<CurationCollectionStats> {
    const posts = await getCurationCollection(false);
    return {
        count: posts.length,
    };
}

