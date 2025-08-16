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

export function groupBySize<T>(
    arr: Array<T>,
    groupSize: number,
): Array<Array<T>> {
    if (groupSize <= 0 || !Number.isInteger(groupSize)) {
        throw new Error("Group size must be a positive (non-zero) integer.");
    }

    const numGroups = Math.ceil(arr.length / groupSize);
    const grouped = (new Array(numGroups))
        .fill(null)
        .map((_, i) => arr.slice(i * groupSize, (i + 1) * groupSize));
    return grouped;
}
