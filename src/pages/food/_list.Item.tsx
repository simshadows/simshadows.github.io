/*
 * Filename: _list.Item.tsx
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
        const s: string | undefined = categoryRemaps.get(c) || c;
        return (s) ? <><b>[{s}]</b> </> : <></>;
    })();

    const date = (()=>{
        if (d === "unknown") return "????-??-?? - ";
        const x = readDateStr(d);
        return (x) ? `${x} - ` : "????-??-?? - ";
    })();

    const _help = (()=>{
        return (help) ? ` (${help})` : "";
    })();

    isTakeout; // TODO: We should use this
    isDelivery; // TODO: We should use this
    cost; // Currently unused
    return <span>{categoryElem}{date}{n}{_help}</span>;
}

