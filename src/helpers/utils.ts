/*
 * Filename: utils.ts
 * Author:   simshadows <contact@simshadows.com>
 */

import {isInteger} from "@root/danger";

/*
 * Compares strings in a simple reproducible way for Array.sort().
 * (If you want "locale-aware" sorting, don't use this function.)
 */
export function strCmp(a: string, b: string): number {
    if (a < b) return -1;
    return (a > b) ? 1 : 0;
}


// TODO: Replace with the new timezoneless date class.
export class DateHelper {
    // TODO: make the attributes private when possible
    //#_year;
    //#_month;
    //#_day;
    _year:  number;
    _month: number;
    _day:   number;

    constructor(year: number, month: number, day: number) {
        this._year = year;
        this._month = month;
        this._day = day;

        this.validate();
    }

    get year()  {return this._year; }
    get month() {return this._month;}
    get day()   {return this._day;  }

    toString() {
        return `${String(this.year).padStart(4, '0')}-${String(this.month).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`;
    }

    // TODO make private when possible
    validate() {
        // We do our own simple checks for redundancy.
        if (!(isInteger(this.year) && (this.year > 0))) {
            throw new Error("year must be a positive integer");
        }
        if (!(isInteger(this.month) && (this.month > 0) && (this.month < 13))) {
            throw new Error("month must be a positive integer less than 13.");
        }
        if (!(isInteger(this.day) && (this.day > 0) && (this.day < 32))) {
            throw new Error("day must be a positive integer less than 32");
        }

        // We parse and check using the built-in date to handle the
        // edge cases.
        // TODO: I should go through and understand what frames of reference
        //       are being used here. It would be awkward if these are actually
        //       parsed in local time or something, then converted to UTC.
        const dateObj = new Date(Date.UTC(this.year, this.month - 1, this.day));
        const year = dateObj.getUTCFullYear();
        const month = dateObj.getUTCMonth() + 1;
        const day = dateObj.getUTCDate();
        if (this.year !== year || this.month !== month || this.day !== day) {
            throw new Error(`Invalid date. Your input is ${this}, but the built-in Date type reads it as ${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}.`);
        }
    }
}

const iso8601DateRegex = /^[0-9]{4}-[01][0-9]-[0-3][0-9]$/;

// This function will intentionally contain some redundant checks, even
// though we can probably just parse it with the built-in library.
export function parseIsoDateStr(s: string): DateHelper {
    if (!(s.length === 10 && iso8601DateRegex.test(s))) {
        throw new Error(`String must be an ISO8601 date. Instead got: ${s}`);
    }
    const subStrs = s.split("-");
    const yearStr = subStrs[0];
    const monthStr = subStrs[1];
    const dayStr = subStrs[2];
    if ((subStrs.length !== 3) || (!yearStr) || (!monthStr) || (!dayStr)) {
        throw new Error("Expected three integers.");
    }
    return new DateHelper(Number(yearStr), Number(monthStr), Number(dayStr));
}

