/*
 * Filename: index.processdata.ts
 * Author:   simshadows <contact@simshadows.com>
 * License:  Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA-4.0)
 *
 * I should consider doing something better than what this file is doing.
 * Main reason it's written this way is to lean as much as possible on TypeScript,
 * and minimize dependencies.
 */

export type SwitchType = "linear" | "tactile" | "clicky";
export type SMDType = "no" | "cutout" | "transparent" | "semitransparent";
export type PinsCount = 3 | 5;

export interface CosmeticFeatures {
    topLabel: string;
    smd: SMDType;
    pins: PinsCount;
    additionalIDNotes: string;
}

export interface SwitchCategory {
    unverified: boolean;
    name: string[];
    cosmeticVariant: string;
    image: string;
    imageAcknowledgement: string;
    type: SwitchType;
    cosmeticFeatures: CosmeticFeatures;
}

export interface SwitchCollection {
    switches: SwitchCategory[][];
}


///


function transformCosmeticFeatures(raw: unknown): CosmeticFeatures {
    if (!raw) throw new Error("raw must be truthy");
    if (typeof raw !== "object") throw new Error("raw must be an object");

    if (!("top-label" in raw)) throw new Error("raw.top-label must exist");
    if (typeof raw["top-label"] !== "string") throw new Error("raw.top-label must be a string");

    if (!("smd" in raw)) throw new Error("raw.smd must exist");
    switch (raw.smd) {
        default:
            throw new Error("raw.smd must be a valid value.");
        case "no":
        case "cutout":
        case "transparent":
        case "semitransparent":
    }

    if (!("pins" in raw)) throw new Error("raw.pins must exist");
    if (!(raw.pins === 3 || raw.pins === 5)) {
        throw new Error("raw.type is an invalid value");
    }

    const additionalIDNotes = (()=>{
        if ("additional-id-notes" in raw) {
            if (typeof raw["additional-id-notes"] !== "string") {
                throw new Error("raw.additional-id-notes must be a string");
            }
            return raw["additional-id-notes"];
        }
        return "";
    })();

    return {
        topLabel: raw["top-label"],
        smd: raw.smd,
        pins: raw.pins,
        additionalIDNotes,
    };
}


///


function transformSwitchCategory(raw: unknown): SwitchCategory {
    if (!raw) throw new Error("raw must be truthy");
    if (typeof raw !== "object") throw new Error("raw must be an object");

    const unverified = (()=>{
        if ("unverified" in raw) {
            if (typeof raw.unverified !== "boolean") throw new Error("raw.unverified must be a string");
            return raw.unverified;
        }
        return false;
    })();

    if (!("name" in raw)) throw new Error("raw.name must exist");
    if (!Array.isArray(raw.name)) throw new Error("raw.name must be an array");
    /* HACKY WORKAROUND FOR TYPESCRIPT BUG */
    const name: string[] = raw.name; // this should fail when the typescript bug is fixed
    for (const v of raw.name) {
        if (typeof v !== "string") throw new Error("v must be a string");
        if (v.length === 0) throw new Error("v must be non-empty");
    }
    /* END OF HACKY WORKAROUND */

    const cosmeticVariant = (()=>{
        if ("cosmetic-variant" in raw) {
            if (typeof raw["cosmetic-variant"] !== "string") {
                throw new Error("raw.cosmetic-variant must be a string");
            }
            return raw["cosmetic-variant"];
        }
        return "";
    })();

    if (!("image" in raw)) throw new Error("raw.image must exist");
    if (typeof raw.image !== "string") throw new Error("raw.image must be a string");
    if (raw.image.length === 0) throw new Error("raw.image must be non-empty");

    const imageAcknowledgement = (()=>{
        if ("image-acknowledgement" in raw) {
            if (typeof raw["image-acknowledgement"] !== "string") {
                throw new Error("raw.image-acknowledgement must be a string");
            }
            return raw["image-acknowledgement"];
        }
        return "/_placeholder-stubs/own-work.html";
    })();

    if (!("type" in raw)) throw new Error("raw.type must exist");
    if (!(raw.type === "linear" || raw.type === "tactile" || raw.type === "clicky")) {
        throw new Error("raw.type is an invalid value");
    }

    if (!("cosmetic-features" in raw)) throw new Error("raw.cosmetic-features must exist");
    const cosmeticFeatures = transformCosmeticFeatures(raw["cosmetic-features"]);

    return {
        unverified,
        name,
        cosmeticVariant,
        image: raw.image,
        imageAcknowledgement,
        type: raw.type,
        cosmeticFeatures,
    };
}


///


function transformSwitchesDataInner(raw: unknown): SwitchCategory[] {
    if (!Array.isArray(raw)) throw new Error("raw must be an array");
    /* HACKY WORKAROUND FOR TYPESCRIPT BUG */
    const tmp: SwitchCategory[] = raw; // this should fail when the typescript bug is fixed
    return tmp.map(transformSwitchCategory);
    /* END OF HACKY WORKAROUND */
}


///


function transformSwitchesData(raw: unknown): SwitchCategory[][] {
    if (!Array.isArray(raw)) throw new Error("raw must be an array");
    /* HACKY WORKAROUND FOR TYPESCRIPT BUG */
    const tmp: SwitchCategory[] = raw; // this should fail when the typescript bug is fixed
    return tmp.map((x) => transformSwitchesDataInner(x));
    /* END OF HACKY WORKAROUND */
}


///


// TODO: I'm unnecessarily copying the original data structure.
//       Refactor to turn it into a type predicate!
export function processSwitchData(raw: unknown): SwitchCollection {
    if (!raw) throw new Error("raw must be truthy");
    if (typeof raw !== "object") throw new Error("raw must be an object");

    if (!("switches" in raw)) throw new Error("raw.switches must exist");

    return {
        switches: transformSwitchesData(raw.switches),
    };
}

