/*
 * Filename: danger.ts
 * Author:   simshadows <contact@simshadows.com>
 *
 * Spooky type checker overrides are defined here. We should aim to remove these
 * overrides whenever possible.
 */

// Return a boolean 'obj is number' since we're usually also checking
// if something is a number.
export function isInteger(obj: unknown): obj is number {
    return (typeof obj === "number") && (obj % 1 === 0);
}

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

/*
 * Workaround for Vite's import.meta.glob returning unknown types.
 */
export interface ViteGlobObject {
    frontmatter?: unknown;
    url: string;
    file: string;
}
export function isViteGlobObject(obj: unknown): obj is ViteGlobObject {
    if (!(obj && (typeof obj === "object"))) return false;

    if (!("url" in obj)) return false;
    if (typeof obj.url !== "string") return false;

    if (!("file" in obj)) return false;
    if (typeof obj.file !== "string") return false;
    
    return true;
}
