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
    name: string;
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

    let additionalIDNotes: string = "";

    if ("additional-id-notes" in raw) {
        if (typeof raw["additional-id-notes"] !== "string") {
            throw new Error("raw.additional-id-notes must be a string");
        }
        additionalIDNotes = raw["additional-id-notes"];
    }

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

    if (!("name" in raw)) throw new Error("raw.name must exist");
    if (typeof raw.name !== "string") throw new Error("raw.name must be a string");

    if (!("cosmetic-variant" in raw)) throw new Error("raw.cosmetic-variant must exist");
    if (typeof raw["cosmetic-variant"] !== "string") {
        throw new Error("raw.cosmetic-variant must be a string");
    }

    if (!("image" in raw)) throw new Error("raw.image must exist");
    if (typeof raw.image !== "string") throw new Error("raw.image must be a string");

    if (!("image-acknowledgement" in raw)) throw new Error("raw.image-acknowledgement must exist");
    if (typeof raw["image-acknowledgement"] !== "string") {
        throw new Error("raw.image-acknowledgement must be a string");
    }

    if (!("type" in raw)) throw new Error("raw.type must exist");
    if (!(raw.type === "linear" || raw.type === "tactile" || raw.type === "clicky")) {
        throw new Error("raw.type is an invalid value");
    }

    if (!("cosmetic-features" in raw)) throw new Error("raw.cosmetic-features must exist");

    return {
        name: raw.name,
        cosmeticVariant: raw["cosmetic-variant"],
        image: raw.image,
        imageAcknowledgement: raw["image-acknowledgement"],
        type: raw.type,
        cosmeticFeatures: transformCosmeticFeatures(raw["cosmetic-features"]),
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

