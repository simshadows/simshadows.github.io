/*
 * Filename: props.ts
 * Author:   simshadows <contact@simshadows.com>
 *
 * Utilities for handling props.
 * Since this project is a static site generator, data validation is
 * very simple but strict.
 */

import {DateHelper, parseIsoDateStr} from "@helpers/utils";

export function readDateStr(_prop: string): DateHelper {
    const prop: unknown = _prop; // Cast and narrow for stronger validation
    if (!prop || typeof prop !== "string") {
        throw new Error("Expected a truthy string.");
    }
    // We require the date to be ISO 8601 formatted.
    // (This may change in the future.)
    return parseIsoDateStr(prop);
}

export function readOptionalDateStr(
    _prop: string | undefined
): DateHelper | null {
    const prop: unknown = _prop; // Cast and narrow for stronger validation
    if (!prop) return null;
    if (typeof prop !== "string") {
        throw new Error("Expected a string.");
    }
    // We require the date to be ISO 8601 formatted.
    // (This may change in the future.)
    return parseIsoDateStr(prop);
}

