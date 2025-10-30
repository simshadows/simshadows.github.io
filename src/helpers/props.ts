/*
 * Filename: props.ts
 * Author:   simshadows <contact@simshadows.com>
 *
 * Utilities for handling props.
 * Since this project is a static site generator, data validation is
 * very simple but strict.
 */

import {TimezonelessDate} from "@helpers/timezoneless-date";

export type PageMode = "default" | "fullwidth";
export const pageModeValues: ReadonlySet<PageMode> = new Set([
    "default",
    "fullwidth",
]);

export function readDateStr(_prop: string): TimezonelessDate {
    const prop: unknown = _prop; // Cast and narrow for stronger validation
    if (!prop || typeof prop !== "string") {
        throw new Error("Expected a truthy string.");
    }
    // We require the date to be ISO 8601 formatted.
    // (This may change in the future.)
    return TimezonelessDate.parseISODate(prop);
}

//export function readOptionalDateStr(
//    _prop: string | undefined
//): DateHelper | null {
//    const prop: unknown = _prop; // Cast and narrow for stronger validation
//    if (!prop) return null;
//    if (typeof prop !== "string") {
//        throw new Error("Expected a string.");
//    }
//    // We require the date to be ISO 8601 formatted.
//    // (This may change in the future.)
//    return parseIsoDateStr(prop);
//}

