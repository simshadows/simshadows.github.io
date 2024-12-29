/*
 * Filename: frontmatter.ts
 * Author:   simshadows <contact@simshadows.com>
 */

import type {SomePartial} from "@helpers/types";
import {isStrArray} from "@root/danger";

export interface Frontmatter {
    title: string;
    description: string;
    keywords: string[];

    hidetoc: boolean;
}
type FrontmatterWithOptionals = SomePartial<Frontmatter, "hidetoc">;

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
    const hidetoc = ("hidetoc" in obj) ? obj.hidetoc : false;
    if (typeof hidetoc !== "boolean") {
        throw err2("a boolean", "hidetoc", hidetoc);
    }

    return {
        title: obj.title,
        description: obj.description,
        keywords: obj.keywords,
        hidetoc,
    };
}
export const fm = validateFrontmatter; // Alias
