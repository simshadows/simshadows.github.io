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
function d2(y: number, m: number, d: number): string {
    return (new TimezonelessDate(y, m, d)).toISOString();
}

describe("Instantiation", () => {
    test("Can instantiate first and last day of each month", () => {
        function testISO(s: string) {
            expect(d(s).toISOString()).toBe(s);
        }
        expect(d2(1990,  0,  1)).toBe("1990-01-01");
        expect(d2(1991,  0, 31)).toBe("1991-01-31");
        expect(d2(1992,  1,  1)).toBe("1992-02-01");
        expect(d2(1993,  1, 28)).toBe("1993-02-28");
        expect(d2(1994,  2,  1)).toBe("1994-03-01");
        expect(d2(1995,  2, 31)).toBe("1995-03-31");
        expect(d2(1996,  3,  1)).toBe("1996-04-01");
        expect(d2(1997,  3, 30)).toBe("1997-04-30");
        expect(d2(1998,  4,  1)).toBe("1998-05-01");
        expect(d2(1999,  4, 31)).toBe("1999-05-31");
        expect(d2(2000,  5,  1)).toBe("2000-06-01");
        expect(d2(2001,  5, 30)).toBe("2001-06-30");
        expect(d2(2002,  6,  1)).toBe("2002-07-01");
        expect(d2(2003,  6, 31)).toBe("2003-07-31");
        expect(d2(2004,  7,  1)).toBe("2004-08-01");
        expect(d2(2005,  7, 31)).toBe("2005-08-31");
        expect(d2(2006,  8,  1)).toBe("2006-09-01");
        expect(d2(2007,  8, 30)).toBe("2007-09-30");
        expect(d2(2008,  9,  1)).toBe("2008-10-01");
        expect(d2(2009,  9, 31)).toBe("2009-10-31");
        expect(d2(2010, 10,  1)).toBe("2010-11-01");
        expect(d2(2011, 10, 30)).toBe("2011-11-30");
        expect(d2(2012, 11,  1)).toBe("2012-12-01");
        expect(d2(2013, 11, 31)).toBe("2013-12-31");
        testISO("2014-01-01");
        testISO("2015-01-31");
        testISO("2016-02-01");
        testISO("2017-02-28");
        testISO("2018-03-01");
        testISO("2019-03-31");
        testISO("2020-04-01");
        testISO("2021-04-30");
        testISO("2022-05-01");
        testISO("2023-05-31");
        testISO("2024-06-01");
        testISO("2025-06-30");
        testISO("2026-07-01");
        testISO("2027-07-31");
        testISO("2028-08-01");
        testISO("2029-08-31");
        testISO("2030-09-01");
        testISO("2031-09-30");
        testISO("2032-10-01");
        testISO("2033-10-31");
        testISO("2034-11-01");
        testISO("2035-11-30");
        testISO("2036-12-01");
        testISO("2037-12-31");

        // TODO: account for leap year
    });
    test("Throws exception for invalid months", () => {
        expect(() => d("1990-00-15")).toThrow();
        expect(() => d2(1990, -1, 15)).toThrow();
        expect(() => d("1990-13-15")).toThrow();
        expect(() => d2(1990, 12, 15)).toThrow();
    });
    test("Throws exception for invalid days", () => {
        expect(() => d("1990-01-32")).toThrow();
        //expect(() => d("1990-02-32")).toThrow();
        expect(() => d("1990-03-32")).toThrow();
        expect(() => d("1990-04-31")).toThrow();
        expect(() => d("1990-05-32")).toThrow();
        expect(() => d("1990-06-31")).toThrow();
        expect(() => d("1990-07-32")).toThrow();
        expect(() => d("1990-08-32")).toThrow();
        expect(() => d("1990-09-31")).toThrow();
        expect(() => d("1990-10-32")).toThrow();
        expect(() => d("1990-11-31")).toThrow();
        expect(() => d("1990-12-32")).toThrow();

        // TODO: test constructor from ISO string
        // TODO: account for leap year
    });
});

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
            const a = new TimezonelessDate(1995, 2, 27);
            expect(a.toISOString()).toBe("1995-03-27");
        });
        test("Can pad both", () => {
            const a = new TimezonelessDate(2000, 3, 1);
            expect(a.toISOString()).toBe("2000-04-01");
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
