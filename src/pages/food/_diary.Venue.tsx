/*
 * Filename: _diary.Venue.tsx
 * Author:   simshadows <contact@simshadows.com>
 *
 * Formats a single venue.
 */

const categoryRemaps: ReadonlyMap<string | undefined, string> = new Map([
    ["Cafe", "Café"],
]);
const disallowedCategories: ReadonlySet<string> = new Set([
    "Café", // We enforce the use all-ASCII.
]);

interface Props {
    // Name
    readonly n:  string; // Name
    readonly c:  string; // Categories (a "list" delimited by semicolons)
    readonly l?: string; // Locations (a "list" delimited by semicolons)
}

export default function Venue(
    {
        n,
        c,
        l="",
    }: Props
) {
    const categories = (()=>{
        const c2 = c.trim();
        if (c2.length === 0) {
            throw new Error(`Venue categories cannot be empty. Venue: ${n}`);
        }

        const lst: string[] = c2.split(";").map((x) => x.trim());

        const c3: string[] = lst.map((s) => {
            if (s.length === 0) {
                throw new Error(`Venue categories cannot be empty. Venue: ${n}`);
            }

            if (disallowedCategories.has(s)) {
                throw new Error(`Venue category ${s} is disallowed.`);
            }
            return categoryRemaps.get(s) || s;
        });

        return c3.join(", ");
    })();

    const locations = (()=>{
        const l2 = l.trim();
        if (l2.length === 0) {
            return "";
        }

        const lst1: string[] = l2.split(";").map((x) => x.trim());

        const lst2: string[] = lst1.map((s) => {
            if (s.length === 0) {
                throw new Error(`Venue locations cannot be empty. Venue: ${n} '${lst1.length}' '${l.length}'`);
            }
            return s;
        });

        return " - " + lst2.join(" | ");
    })();

    return <span><b>{n}</b> ({categories}){locations}</span>;
    //return <span style="color: red;"><b>{n}</b> ({categories}){locations}</span>;
}

