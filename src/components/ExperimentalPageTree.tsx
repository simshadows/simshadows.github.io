/*
 * Filename: ExperimentalPageTree.tsx
 * Author:   simshadows <contact@simshadows.com>
 *
 * Experimenting with building page trees to automate navigation.
 * It's not used on actual pages yet. Only the experimental-glob.astro
 * page uses it for now as a testbed.
 */

import {type PageTree} from "@helpers/experimental-glob";

interface Props {
    readonly tree: PageTree;
}

export default function ExperimentalPageTree(props: Props) {
    if (props.tree.childTrees.size == 0) return null;
    return <ul>
        {Array.from(props.tree.childTrees).map(([k, v]) =>
            <li>
                <span>{k}</span>
                <ExperimentalPageTree tree={v}/>
            </li>
        )}
    </ul>;
}

