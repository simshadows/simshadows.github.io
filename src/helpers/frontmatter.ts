/*
 * Filename: frontmatter.ts
 * Author:   simshadows <contact@simshadows.com>
 */

import type {SomePartial} from "@helpers/types";
import {type PageMode, pageModeValues} from "@helpers/props";
import {isStrArray} from "@root/danger";

export interface Frontmatter {
    /*** Optional Layout Mode ***/

    mode: PageMode;

    /*** Mandatory ***/

    title: string;
    description: string;
    keywords: string[];

    /*** Optionals ***/

    // The link text that shows in an index
    indexTitle: string;

    // Exclude the page and all child pages from main index
    excludeFromMainIndex: boolean;

    // Exclude just the child pages from main index
    excludeChildrenFromMainIndex: boolean;

    // Hide the TOC sidebar (only applicable for MDX layouts)
    hidetoc: boolean;

    // Hide the title (does not remove the title from metadata)
    hidetitle: boolean;

    // Mark as a work-in-progress
    wip: boolean;
}
type FrontmatterWithOptionals = SomePartial<Frontmatter,
    "mode"
    | "indexTitle"
    | "excludeFromMainIndex"
    | "excludeChildrenFromMainIndex"
    | "hidetoc"
    | "hidetitle"
    | "wip"
>;

const ERR_FIRST = "Invalid frontmatter. ";
function err1(expectedType: string, k: string) {
    return new Error(`${ERR_FIRST}Expected ${k} to be ${expectedType}, but it does not exist.`);
}
function err2(expectedType: string, k: string, v: unknown) {
    return new Error(`${ERR_FIRST}Expected ${k} to be ${expectedType}. Actually received: ${v}`);
}

// validateFrontmatter is intended to allow the type checker to be able to check first.
export function validateFrontmatter(obj: FrontmatterWithOptionals): Frontmatter {
    return makeFrontmatter(obj);
}
// makeFrontmatter is indended only if you have to validate at runtime.
export function makeFrontmatter(obj: unknown): Frontmatter {
    if (!(obj && (typeof obj === "object"))) {
        throw new Error(`${ERR_FIRST}Not an object.`);
    }

    // OPTIONAL
    const mode = ("mode" in obj) ? obj.mode : "default";
    // TODO: Deduplicate these redundant checks
    //       (I left both in to be extra-safe)
    switch (mode) {
        default:
            throw err2("a mode string", "mode", mode);
        case "default":
        case "fullwidth":
    }
    if (!pageModeValues.has(mode)) {
        throw err2("a string", "mode", mode);
    }

    // MANDATORY
    if (!("title" in obj)) {
        throw err1("a string", "title");
    }
    if (typeof obj.title !== "string") {
        throw err2("a string", "title", obj.title);
    }

    // MANDATORY
    if (!("description" in obj)) {
        throw err1("a string", "description");
    }
    if (typeof obj.description !== "string") {
        throw err2("a string", "description", obj.description);
    }

    // MANDATORY
    if (!("keywords" in obj)) {
        throw err1("an array of strings", "keywords");
    }
    if (!isStrArray(obj.keywords)) {
        throw err2("an array of strings", "keywords", obj.keywords);
    }

    // OPTIONAL
    const indexTitle = ("indexTitle" in obj) ? obj.indexTitle : obj.title;
    if (typeof indexTitle !== "string") {
        throw err2("a string", "indexTitle", indexTitle);
    }

    // OPTIONAL
    const excludeFromMainIndex =
            ("excludeFromMainIndex" in obj) ? obj.excludeFromMainIndex : false;
    if (typeof excludeFromMainIndex !== "boolean") {
        throw err2("a boolean", "excludeFromMainIndex", excludeFromMainIndex);
    }

    // OPTIONAL
    const excludeChildrenFromMainIndex =
            ("excludeChildrenFromMainIndex" in obj) ? obj.excludeChildrenFromMainIndex : false;
    if (typeof excludeChildrenFromMainIndex !== "boolean") {
        throw err2("a boolean", "excludeChildrenFromMainIndex", excludeChildrenFromMainIndex);
    }

    // OPTIONAL
    const hidetoc = ("hidetoc" in obj) ? obj.hidetoc : false;
    if (typeof hidetoc !== "boolean") {
        throw err2("a boolean", "hidetoc", hidetoc);
    }

    // OPTIONAL
    const hidetitle = ("hidetitle" in obj) ? obj.hidetitle : false;
    if (typeof hidetitle !== "boolean") {
        throw err2("a boolean", "hidetitle", hidetitle);
    }

    // OPTIONAL
    const wip = ("wip" in obj) ? obj.wip : false;
    if (typeof wip !== "boolean") {
        throw err2("a boolean", "wip", wip);
    }

    return {
        mode,
        title: obj.title,
        description: obj.description,
        keywords: obj.keywords,
        indexTitle,
        excludeFromMainIndex,
        excludeChildrenFromMainIndex,
        hidetoc,
        hidetitle,
        wip,
    };
}
export const fm = validateFrontmatter; // Alias
