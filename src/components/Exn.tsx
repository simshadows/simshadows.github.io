/*
 * Legacy styling
 */

import {type JSXChildren} from "@root/tech-debt";

interface Props {
    readonly children: JSXChildren;
}

export default function Exn({children}: Props) {
    return <span style="color: var(--color--deemphasis);">{children}</span>;
}

