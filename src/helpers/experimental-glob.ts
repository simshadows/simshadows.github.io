/*
 * Filename: experimental-glob.ts
 * Author:   simshadows <contact@simshadows.com>
 *
 * Experimenting with building page trees to automate navigation.
 * It's not used on actual pages yet. Only the experimental-glob.astro
 * page uses it for now as a testbed.
 */

import {isViteGlobObject} from "@root/danger";

import {makeFrontmatter} from "./frontmatter";

function makeFullTree() {
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
        frontmatter;
        k;

        const url = v.url + (v.url.endsWith("/") ? "" : "/");

        return [`${url} ${JSON.stringify(v)}`, v];
    });

    return reprocessedResult;
}

export function getPageTree() {
    const fullTree = makeFullTree();
    return fullTree.map(x => x[0]);
}
