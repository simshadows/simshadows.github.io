/*
 * Filename: danger.ts
 * Author:   simshadows <contact@simshadows.com>
 *
 * Spooky type checker overrides are defined here. We should aim to remove these
 * overrides whenever possible.
 */

/*
 * Workaround for TypeScript's current limitations around narrowing an
 * unknown into an array of a specific type.
 *
 * Still an open issue as of writing:
 * <https://github.com/microsoft/TypeScript/issues/17002>
 */
export function isStrArray(obj: unknown): obj is string[] {
    if (!Array.isArray(obj)) return false;
    for (const v of obj) {
        if (typeof v !== "string") return false;
    }
    return true;
}
export function isNumArray(obj: unknown): obj is number[] {
    if (!Array.isArray(obj)) return false;
    for (const v of obj) {
        if (typeof v !== "number") return false;
    }
    return true;
}

