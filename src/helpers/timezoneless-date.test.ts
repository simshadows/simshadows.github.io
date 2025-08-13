/*
 * Filename: timezoneless-date.test.ts
 * Author:   simshadows <contact@simshadows.com>
 * License:  GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)
 */

import {
    //beforeEach,
    describe,
    expect,
    test,
} from "@jest/globals";

import {TimezonelessDate} from "./timezoneless-date";

function d(s: string): TimezonelessDate {
    return TimezonelessDate.parseISODate(s);
}

describe("toString()-like methods", () => {
    test("Can print a string", () => {
        // Can technically be any format, but for now we expect
        // it to work like toISOString().
        const a = new TimezonelessDate(1984, 9, 4);
        expect(a.toString()).toBe("1984-10-04");
    });
    test("Can print a debug string", () => {
        // We just check that it's non-empty
        const a = new TimezonelessDate(1984, 9, 4);
        expect(a.toDebugString().trim().length).toBeGreaterThan(0);
    });
    describe("Can get ISO string", () => {
        test("Can pad the day", () => {
            const a = new TimezonelessDate(1984, 9, 4);
            expect(a.toISOString()).toBe("1984-10-04");
        });
        test("Can pad the month", () => {
            const a = new TimezonelessDate(1984, 2, 27);
            expect(a.toISOString()).toBe("1984-03-27");
        });
    });
});

describe("isAfter()", () => {
    describe("Common Cases", () => {
        test("argument is long after", () => {
            const a = d("2021-07-15");
            const b = d("2022-11-02");
            expect(a.isAfter(b)).toBe(false);
        });
        test("argument is the day after", () => {
            const a = d("2021-07-15");
            const b = d("2021-07-16");
            expect(a.isAfter(b)).toBe(false);
        });
        test("argument is same day", () => {
            const a = d("2021-07-15");
            const b = d("2021-07-15");
            expect(a.isAfter(b)).toBe(false);
        });
        test("argument is the day before", () => {
            const a = d("2021-07-15");
            const b = d("2021-07-14");
            expect(a.isAfter(b)).toBe(true);
        });
        test("argument is the day long before", () => {
            const a = d("2021-07-15");
            const b = d("2019-03-25");
            expect(a.isAfter(b)).toBe(true);
        });
    });
    describe("Obscure Cases", () => {
        test("<new years day>.isAfter(<new years eve>)", () => {
            const a = d("2000-01-01");
            const b = d("1999-12-31");
            expect(a.isAfter(b)).toBe(true);
        });
        test("<new years eve>.isAfter(<new years day>)", () => {
            const a = d("1999-12-31");
            const b = d("2000-01-01");
            expect(a.isAfter(b)).toBe(false);
        });
    });
});
