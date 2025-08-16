/*
 * Filename: dated-entries.ts
 * Author:   simshadows <contact@simshadows.com>
 */

import {TimezonelessDate} from "@helpers/timezoneless-date";

export interface DatedProcessed {
    date: TimezonelessDate;
};

function filenameErr(filename: string): Error {
    return new Error(`Invalid blog post filename '${filename}'. Filenames must start with an ISO8601 date like '2025-03-26-foobar.md'`);
}

export function processDated(postID: string): DatedProcessed {
    const idMandatoryPrefix = postID.slice(0, 11);

    if (
        postID.length < 12
        || idMandatoryPrefix.length !== 11
        || idMandatoryPrefix.slice(-1) !== "-"
    ) {
        throw filenameErr(postID);
    }

    return {
        date: TimezonelessDate.parseISODate(idMandatoryPrefix.slice(0, 10)),
    };
}


export function cmpDated(
    a: DatedProcessed,
    b: DatedProcessed,
): number {
    return b.date.toOrderedNumber() - a.date.toOrderedNumber();
}

