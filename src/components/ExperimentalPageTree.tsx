/*
 * Filename: ExperimentalPageTree.tsx
 * Author:   simshadows <contact@simshadows.com>
 *
 * Experimenting with building page trees to automate navigation.
 * It's not used on actual pages yet. Only the experimental-glob.astro
 * page uses it for now as a testbed.
 */

import {type PageTree} from "@helpers/experimental-glob";

import "./ExperimentalPageTree.css";

function LinkText({k, tree}: {k: string, tree: PageTree}) {
    const frontmatter = tree.page?.frontmatter;
    if (frontmatter) {
        return <>
            <span className="index-link-text">
                <a href={tree.page.url}>{frontmatter.indexTitle}</a>
            </span>
            {frontmatter.wip && <>&nbsp;&nbsp;&#128295; <em>(work-in-progress)</em></>}
        </>;
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
        {Array.from(tree.childTrees).map(([k, subTree]) =>
            (!subTree.page?.frontmatter.excludeFromMainIndex) &&
            <li>
                <LinkText k={k} tree={subTree}/>
                {
                    (!subTree.page?.frontmatter.excludeChildrenFromMainIndex)
                    && <ExperimentalPageTree tree={subTree}/>
                }
            </li>
        )}
    </ul>;
}
