/*
 * Filename: _diary.Product.tsx
 * Author:   simshadows <contact@simshadows.com>
 *
 * Formats a single food product.
 */

import {readDateStr} from "@helpers/props";

interface Props {
    readonly d: string; // Date, accepts ISO date, or "unknown"
    readonly b: string; // Brand
    readonly n: string; // Name
}

export default function Item(
    {
        d,
        b,
        n,
    }: Props
) {
    const date = (d === "unknown")
        ? "????-??-??"
        : readDateStr(d).toISOString();

    return <span>{date} - {b} - {n}</span>;
}

