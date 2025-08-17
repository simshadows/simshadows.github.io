/*
 * Filename: timezoneless-date.ts
 * Author:   simshadows <contact@simshadows.com>
 * License:  GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)
 *
 * A wrapper class to enforce the use of a pre-existing date implementation
 * as a simple timezoneless calendar date.
 */

import dayjs from "dayjs";
//import utc from "dayjs/plugin/utc";

//dayjs.extend(utc);

const iso8601DateRegex = /^[0-9]{4}-[01][0-9]-[0-3][0-9]$/;

export class TimezonelessDate {
    private __d: dayjs.Dayjs;

    /*
     * y is the calendar year
     * m is an integer 0-11
     * d is an integer 1-31
     */
    constructor(y: number, m: number, d: number) {
        this.__d = dayjs(0).year(y).month(m).date(d);

        // All of this for a crude slow way of validating the date.
        // We accept it here because we're not particularly concerned
        // about speed, but maybe we should improve it some day.
        const yStr = String(y).padStart(4, "0");
        const mStr = String(m + 1).padStart(2, "0");
        const dStr = String(d).padStart(2, "0");
        const s = `${yStr}-${mStr}-${dStr}`;
        if (this.toISOString() !== s) {
            throw new Error(`Invalid date: ${s}`);
        }
    }

    toString(): string {
        return this.toISOString();
    }
    toISOString(): string {
        return this.__d.format("YYYY-MM-DD");
    }
    toDebugString(): string {
        return this.__d.toISOString();
    }

    toDate(): Date {
        return this.__d.toDate();
    }

    /*
     * Returns a number that guarantees that later dates have larger numbers
     * than earlier dates, and same dates return the same number.
     *
     * (In practice, this is a Unix timestamp, but toOrderedNumber() doesn't
     * promise any particular timezone.)
     */
    toOrderedNumber(): number {
        return this.__d.unix();
    }

    isAfter(other: TimezonelessDate): boolean {
        return this.__d.isAfter(other.__d, "date");
    }

    static parseISODate(s: string): TimezonelessDate {
        if (s.length !== 10) {
            throw new Error(`Failed to parse string as a date. Must be exactly 10 characters. Instead got: ${s}`);
        }
        if (!iso8601DateRegex.test(s)) {
            throw new Error(`Failed to parse string as a date. String must be an ISO8601 date. Instead got: ${s}`);
        }
        const subStrs = s.split("-");
        const y = subStrs[0];
        const m = subStrs[1];
        const d = subStrs[2];
        if ((subStrs.length !== 3) || (!y) || (!m) || (!d)) {
            throw new Error("Expected three integers.");
        }
        return new TimezonelessDate(Number(y), Number(m) - 1, Number(d));
    }
}

