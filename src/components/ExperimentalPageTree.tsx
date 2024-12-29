/*
 * Filename: ExperimentalPageTree.tsx
 * Author:   simshadows <contact@simshadows.com>
 *
 * Experimenting with building page trees to automate navigation.
 * It's not used on actual pages yet. Only the experimental-glob.astro
 * page uses it for now as a testbed.
 */

import {type PageTree} from "@helpers/experimental-glob";

function LinkText({k, tree}: {k: string, tree: PageTree}) {
    if (tree.page?.frontmatter) {
        return <span><a href={tree.page.url}>{tree.page.frontmatter.title}</a></span>;
    } else {
        return <span>{k}</span>;
    }
}

interface Props {
    readonly tree: PageTree;
}

export default function ExperimentalPageTree({tree}: Props) {
    if (tree.childTrees.size == 0) return null;
    return <ul>
        {Array.from(tree.childTrees).map(([k, v]) =>
            <li>
                <LinkText k={k} tree={v}/>
                <ExperimentalPageTree tree={v}/>
            </li>
        )}
    </ul>;
}
