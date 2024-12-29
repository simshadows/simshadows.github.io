/*
 * Filename: experimental-glob.ts
 * Author:   simshadows <contact@simshadows.com>
 *
 * Experimenting with building page trees to automate navigation.
 * It's not used on actual pages yet. Only the experimental-glob.astro
 * page uses it for now as a testbed.
 */

import {
    type ViteGlobObject,
    isViteGlobObject,
} from "@root/danger";

import {
    type Frontmatter,
    makeFrontmatter,
} from "./frontmatter";

const URL_DELIMITER = "/";

interface PageData {
    url: string;
    viteGlobKey: string;
    viteGlobObj: ViteGlobObject;
    frontmatter: Frontmatter;
}

export interface PageTree {
    readonly page: PageData | null;
    readonly childTrees: ReadonlyMap<string, PageTree>;
}

class _PageTree {
    page: PageData | null;
    childTrees: Map<string, _PageTree>;

    constructor() {
        this.page = null;
        this.childTrees = new Map();
    }

    add(path: string | string[], page: PageData) {
        if (typeof path === "string") {
            path = path.split(URL_DELIMITER);
        }
        path = path.filter(s => s);

        const [head, ...tail] = path;
        if (typeof head === "string") {
            let subTree = this.childTrees.get(head);
            if (!subTree) {
                subTree = new _PageTree();
                this.childTrees.set(head, subTree);
            }
            subTree.add(tail, page);
        } else {
            this.page = page;
        }
    }
}

function makeFullTree(): PageTree {
    const globResult = import.meta.glob([
        "/src/pages/**/*.astro",
        "/src/pages/**/*.md",
        "/src/pages/**/*.mdx",
        "!/src/pages/**/_*",
        "!/src/pages/**/_*/**/*",
    ], {eager: true});

    const reprocessedResult = Object.entries(globResult).map(([k, v]) => {
        if (!isViteGlobObject(v)) {
            throw new Error("Not a Vite glob object.");
        }

        //const frontmatter = v.frontmatter;
        //if (!frontmatter) {
        //    throw new Error(`File requires frontmatter: ${k}`);
        //}
        const frontmatter = makeFrontmatter(v.frontmatter || {
            title: "untitled",
            description: "no description",
            keywords: ["no keywords"],
        });
        return {
            url: v.url + (v.url.endsWith("/") ? "" : "/"),
            viteGlobKey: k,
            viteGlobObj: v,
            frontmatter,
        };
    });

    const fullTree = new _PageTree();
    for (const pageData of reprocessedResult) {
        fullTree.add(pageData.url, pageData);
    }
    return fullTree;
}

export function getPageTree() {
    return makeFullTree();
}
