/*
 * Filename: _diary.Item.tsx
 * Author:   simshadows <contact@simshadows.com>
 *
 * Formats a single food item.
 * By default, all food items are considered to be eat-in unless otherwise
 * indicated via. the props.
 */

import {readDateStr} from "@helpers/props";

const categoryRemaps: ReadonlyMap<string | undefined, string> = new Map([
    ["entree", "entrée"],
]);
const disallowedCategories: ReadonlySet<string> = new Set([
    "entrée", // We enforce the use all-ASCII.
]);

interface Props {
    readonly c?: string; // Category
    readonly d:  string; // Date, accepts ISO date, or "unknown"
    readonly n:  string; // Name
    readonly help?: string; // Helper Text

    // Mutually exclusive flags
    // (It is implied to be takeout if it is food delivery.)
    readonly isTakeout?: boolean;
    readonly isDelivery?: boolean;

    // Use this to record the cost of the item.
    // It's optional free-form text.
    // It is currently basically an unrendered comment, but the data
    // will remain present in the markup just in case it's useful.
    readonly cost?: string;
}

export default function Item(
    {
        c=undefined,
        d,
        n,
        help=undefined,
        isTakeout=false,
        isDelivery=false,
        cost=undefined,
    }: Props
) {
    const categoryElem = (()=>{
        const _c = c?.trim() || "";
        if (disallowedCategories.has(_c)) {
            throw new Error(`Food item category ${_c} is disallowed.`);
        }
        const s: string | undefined = categoryRemaps.get(_c) || _c;
        return s ? <><b>[{s}]</b> </> : <></>;
    })();

    const date = (()=>{
        if (d === "unknown") return "????-??-?? - ";
        const x = readDateStr(d);
        return x ? `${x.toISOString()} - ` : "????-??-?? - ";
    })();

    const _help = (()=>{
        return help ? ` (${help})` : "";
    })();

    // isTakeout and isDelivery are unused for rendering. We just validate it.
    if (typeof isTakeout !== "boolean") {
        throw new Error("isTakeout must be a boolean.");
    }
    if (typeof isDelivery !== "boolean") {
        throw new Error("isTakeout must be a boolean.");
    }
    if (isTakeout && isDelivery) {
        throw new Error("isTakeout and isDelivery are mutually exclusive.");
    }

    // cost is unused for rendering. We just validate it.
    if (
        cost !== undefined
        && (typeof cost !== "string" || cost.trim().length === 0)
    ) {
        throw new Error("Cost must be a non-empty string.");
    }

    return <span>{categoryElem}{date}{n}{_help}</span>;
}

