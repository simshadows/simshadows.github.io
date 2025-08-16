/*
 * Filename: failfast-validation.ts
 * Author:   simshadows <contact@simshadows.com>
 *
 * Reading and validating unknown types with convenience functions that
 * simply throw exceptions if assumptions aren't being met.
 *
 * Convenience is the emphasis here. The functions are probably not performant.
 * This file is probably tech debt that we should improve later.
 */

import {getAttribute} from "@root/danger-tech-debt";
import {TimezonelessDate} from "@helpers/timezoneless-date";

export function objGetStr(
    obj: unknown,
    k: string,
    errMsg: string = "",
): string {
    errMsg = errMsg ? ` ${errMsg}` : "";

    const v = (()=>{
        try {
            return getAttribute(obj, k);
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`${e.message}${errMsg}`);
            } else {
                throw e;
            }
        }
    })();

    if (typeof v !== "string") {
        throw new Error(`Failed to read object. Key '${k}' must have a string value.${errMsg}`);
    }
    return v;
}
export function objGetStrOptional(
    obj: unknown,
    k: string,
    errMsg: string = "",
): string | undefined {
    errMsg = errMsg ? ` ${errMsg}` : "";

    const v = (()=>{
        try {
            return getAttribute(obj, k);
        } catch (e) {
            return undefined;
        }
    })();

    if ((v !== undefined) && (typeof v !== "string")) {
        throw new Error(`Failed to read object. Key '${k}' must have a string value.${errMsg}`);
    }
    return v;
}

//export function objGetNum(obj: unknown, k: string, errMsg: string = ""): number {
//    errMsg = errMsg ? ` ${errMsg}` : "";
//
//    const v = (()=>{
//        try {
//            return getAttribute(obj, k);
//        } catch (e) {
//            if (e instanceof Error) {
//                throw new Error(`${e.message}${errMsg}`);
//            } else {
//                throw e;
//            }
//        }
//    })();
//
//    if (typeof v !== "number") {
//        throw new Error(`Failed to read object. Key '${k}' must have a number value.${errMsg}`);
//    }
//    return v;
//}

//export function objGetInt(obj: unknown, k: string, errMsg: string = ""): number {
//    const v = objGetNum(obj, k, errMsg);
//
//    if (!Number.isSafeInteger(v)) {
//        throw new Error(`Failed to read object. Key '${k}' must have a safe integer value.${errMsg}`);
//    }
//    return v;
//}

export function objGetDate(obj: unknown, k: string, errMsg: string = ""): TimezonelessDate {
    const v = objGetStr(obj, k, errMsg);
    return TimezonelessDate.parseISODate(v);
}

