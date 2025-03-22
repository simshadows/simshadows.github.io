import type {Root} from "hast";
import {fromHtml} from "hast-util-from-html";
import {toText} from "hast-util-to-text";
import {SKIP, visitParents} from "unist-util-visit-parents";

import {renderToString} from "katex";

import {getBaseConfig} from "../katex-config-base";
import {toDisplayAlign, toDisplayGather} from "../rendering/latex-transforms";

export const shikiExcludeLangs = [
    "latex-eq",
    "latex-eq-fleqn",
    "latex-gather",
    "latex-align",
];

export function rehypeLatex() {
    return (tree: Root) => {
        visitParents(tree, "element", (node, parents) => {
            const [rendererConfig, latexTransform] = (()=>{
                const isLanguage = (s: string): boolean =>
                    [node.properties?.["className"]].flat().includes(`language-${s}`);
                if (isLanguage("latex-eq")) {
                    return [getBaseConfig(true, {}, false), (s: string) => s];
                } else if (isLanguage("latex-eq-fleqn")) {
                    return [getBaseConfig(true, {}, true), (s: string) => s];
                } else if (isLanguage("latex-gather")) {
                    return [getBaseConfig(true, {}, false), toDisplayGather];
                } else if (isLanguage("latex-align")) {
                    return [getBaseConfig(true, {}, false), toDisplayAlign];
                } else {
                    return [null, null];
                }
            })();
            if ((!rendererConfig) || (!latexTransform)) return;

            const [parent1, parent2, ..._] = parents.toReversed();
            const latexCode = toText(node, {whitespace: "pre"});

            if (!parent1 || !parent2) {
                throw new Error("Expected at least two parents.");
            }
            if ((parent1.type !== "element")) {
                throw new Error("Expected the direct parent to be type Element.");
            }

            // If these are causing problems, we should fix it up.
            if (node.tagName !== "code") {
                throw new Error("Expected current node to be a <code/> element.");
            }
            if (parent1.tagName !== "pre") {
                throw new Error("Expected parent to be a <pre/> element.");
            }
            if (parent1.children.length !== 1) {
                throw new Error("Expected parent to only have one child.");
            }

            const htmlString = renderToString(latexTransform(latexCode), rendererConfig);
            if (typeof htmlString !== "string") {
                throw new Error("KaTeX did not return a string.");
            }
            const newNode = fromHtml(htmlString, {fragment: true});

            const index = parent2.children.indexOf(parent1);
            parent2.children.splice(index, 1, ...newNode.children);
            return SKIP;
        });
    };
}
