/*
 * Filename: Em.tsx
 * Author:   simshadows <contact@simshadows.com>
 *
 * A quick-and-dirty arbitrary super-emphasis.
 * It isn't meant to look good. It's meant to stick out like a sore thumb.
 * I may change the style at any time, but this component should guarantee
 * that the text stands out extremely well.
 */

import {type JSXChildren} from "@root/tech-debt";

import "./Em.css";

interface Props {
    readonly children: JSXChildren;
}

export default function Em({children}: Props) {
    return <span className="generic-emphasis">{children}</span>;
}

