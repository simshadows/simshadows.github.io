/*
 * Filename: utils.ts
 * Author:   simshadows <contact@simshadows.com>
 */

/*
 * Compares strings in a simple reproducible way for Array.sort().
 * (If you want "locale-aware" sorting, don't use this function.)
 */
export function strCmp(a: string, b: string): number {
    if (a < b) return -1;
    return (a > b) ? 1 : 0;
}
