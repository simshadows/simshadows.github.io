// @ts-nocheck
// TODO: I don't know why the type checker doesn't like this file.

/*
 * Filename: utils.test.ts
 * Author:   simshadows <contact@simshadows.com>
 * License:  GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)
 */

import {
    describe,
    expect,
    test,
} from "@jest/globals";

import {groupBySize} from "./utils";

describe("groupBySize()", () => {
    test("No elements", () => {
        const a = [];
        const b = [];
        expect(groupBySize(a, 1)).toStrictEqual(b);
        expect(groupBySize(a, 2)).toStrictEqual(b);
        expect(groupBySize(a, 3)).toStrictEqual(b);
    });
    test("No elements, groupSize=0", () => {
        const a = [];
        expect(() => groupBySize(a, 0)).toThrow();
    });

    test("One element", () => {
        const a = [1];
        const b = [[1]];
        expect(groupBySize(a, 1)).toStrictEqual(b);
        expect(groupBySize(a, 2)).toStrictEqual(b);
        expect(groupBySize(a, 3)).toStrictEqual(b);
    });
    test("One element, groupSize=0", () => {
        const a = [1];
        expect(() => groupBySize(a, 0)).toThrow();
    });

    test("Fully-filled groups", () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const b = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        expect(groupBySize(a, 3)).toStrictEqual(b);
    });
    test("Fully-filled groups, groupSize=0", () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(() => groupBySize(a, 0)).toThrow();
    });

    test("Partially-filled groups", () => {
        const a = [1, 2, 3, 4, 5, 6, 7, 8];
        const b = [[1, 2, 3], [4, 5, 6], [7, 8]];
        expect(groupBySize(a, 3)).toStrictEqual(b);
    });
});

