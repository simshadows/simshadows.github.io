/*
 * Shorthand for non-breaking span
 */

import {type JSXChildren} from "@root/tech-debt";

interface Props {
    readonly children: JSXChildren;
}

export default function Nb({children}: Props) {
    return <span class="nb">{children}</span>;
}

