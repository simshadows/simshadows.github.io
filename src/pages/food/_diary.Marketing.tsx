/*
 * Filename: _diary.Marketing.tsx
 * Author:   simshadows <contact@simshadows.com>
 *
 * Formats some marketing copy.
 */

import {type JSXChildren} from "@root/tech-debt";

interface Props {
    readonly children: JSXChildren;
}

export default function Marketing({children}: Props) {
    return <span style="font-style: italic;">"{children}"</span>;
}
