/*
 * Filename: index.data.ts
 * Author:   simshadows <contact@simshadows.com>
 * License:  Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA-4.0)
 */

// TODO: Merge "Prime Keyboards Alpaca" with the other Alpaca listing

export type SwitchType = "linear" | "tactile" | "clicky";
export type SMDType = "no" | "cutout" | "transparent" | "semitransparent";
export type PinsCount = 3 | 5;

interface Origin {
    readonly originID: string;
    readonly count: number;
    readonly undersideMouldLabel?: string[];
    readonly excerpt?: string;
    readonly listedName?: string;
    readonly listedSpecs?: {};
    readonly itemCost?: string;
    readonly sfCost?: string;
    readonly comment?: string;
}

interface _CosmeticFeatures_Fixed {
    smd?: SMDType;
    pins?: PinsCount;
    additionalIDNotes?: string;
}
interface _CosmeticFeatures_TextTopLabel {
    topLabel: string;
}
interface _CosmeticFeatures_ImgTopLabel {
    topLabelImage: string;
}
type _CosmeticFeatures = _CosmeticFeatures_Fixed
    & (_CosmeticFeatures_TextTopLabel | _CosmeticFeatures_ImgTopLabel);
export interface CosmeticFeatures {
    readonly topLabel: string;
    readonly topLabelImage: string;
    readonly smd: SMDType;
    readonly pins: PinsCount;
    readonly additionalIDNotes: string;
}

interface _SwitchCategory {
    unverified?: boolean;
    name: string[];
    cosmeticVariant?: string;
    image: string;
    imageAcknowledgement?: string;
    type?: SwitchType;
    cosmeticFeatures: _CosmeticFeatures;
    documentedCharacteristics: {} | string;
    origins: Origin[];
}
export interface SwitchCategory {
    readonly unverified: boolean;
    readonly name: ReadonlyArray<string>;
    readonly cosmeticVariant: string;
    readonly image: string;
    readonly imageAcknowledgement: string;
    readonly type: SwitchType;
    readonly cosmeticFeatures: CosmeticFeatures;
    readonly documentedCharacteristics: {} | string; // Use a string to informally reference something else
    readonly origins: Origin[];
}


// Not a perfect JSON compatibility check, but better than nothing.
function validateJSONCompatibility(obj: unknown): void {
    const x = JSON.stringify(obj);
    if ((typeof x !== "string") || (x === "")) throw new Error();
}


function validateHardcodedData(obj: _SwitchCategory[][]): void {
    for (const sublist of obj) {
        for (const sc of sublist) {
            if (sc.name.length === 0) throw new Error();
            if (sc.name.some((s) => (s.length === 0))) throw new Error();

            if (("cosmeticVariant" in sc) && (sc.cosmeticVariant.length === 0)) throw new Error();
            if (("image" in sc) && (sc.image.length === 0)) throw new Error();
            if (("imageAcknowledgement" in sc) && (sc.imageAcknowledgement.length === 0)) throw new Error();
            
            if (("topLabelImage" in sc.cosmeticFeatures) && (sc.cosmeticFeatures.topLabelImage.length === 0)) {
                throw new Error();
            }
            if (("additionalIDNotes" in sc.cosmeticFeatures) && (sc.cosmeticFeatures.additionalIDNotes.length === 0)) {
                throw new Error();
            }

            for (const origin of sc.origins) {
                if (origin.originID.length === 0) throw new Error();
                if (origin.count !== 1) throw new Error("All counts should be 1. (We'll refactor this out later.)");
                //if (origin.undersideMouldLabel.some((s) => (s.length === 0))) throw new Error(); // This isn't true right now...
            }
        }
    }
}


function transformCosmeticFeatures(obj: _CosmeticFeatures): CosmeticFeatures {
    return {
        topLabel:          ("topLabel" in obj ? obj.topLabel : "") || "",
        topLabelImage:     ("topLabelImage" in obj ? obj.topLabelImage : "") || "",
        smd:               obj.smd || "cutout",
        pins:              obj.pins || 3,
        additionalIDNotes: obj.additionalIDNotes || "",
    }
}

function transformSwitchCategory(obj: _SwitchCategory): SwitchCategory {
    return {
        unverified:                obj.unverified || false,
        name:                      obj.name,
        cosmeticVariant:           obj.cosmeticVariant || "",
        image:                     obj.image,
        imageAcknowledgement:      obj.imageAcknowledgement || "/_placeholder-stubs/own-work.html",
        type:                      obj.type || "linear",
        cosmeticFeatures:          transformCosmeticFeatures(obj.cosmeticFeatures),
        documentedCharacteristics: obj.documentedCharacteristics,
        origins:                   obj.origins,
    };
}

function addDefaults(): SwitchCategory[][] {
    return hardcodedSwitchData.map((sublist) => sublist.map(transformSwitchCategory));
}


// This is intentionally written to be JSON-compatible to make future migration easier.
const hardcodedSwitchData: _SwitchCategory[][] = [
[
    {
        "name": ["Aflion Carrot"],
        "cosmeticVariant": "Lorem ipsum",
        "image": "aflion-carrot.jpg",
        "imageAcknowledgement": "/_placeholder-stubs/own-work.html",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AFLION",
            "smd": "cutout",
            "pins": 5,
            "additionalIDNotes": "Lorem ipsum dolor sit amet"
        },
        "documentedCharacteristics": {
            "_official-website": "https://apps.simshadows.com/",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/b/7/a/b/b7ab2f72bd5686e1e1e759a9f3703536d7fb1e18/EN_CHERRY_MX_RED.pdf",
            "Placeholder1": "\"Placeholder with double-quotes\"",
            "Placeholder2": "another one"
        },
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["2"],
                "excerpt": "These are AFLION switches, manufactured by Dongguan Golden Orange Electronics Technology Co., Ltd. AFLION Carrot switches are some of the thockiest tactile switches around, utilize a long pole stem for a more solid bottom out sound. Features a 43g two-stage stainless steel spring.",
                "listedName": "AFLION Carrot Switch (Tactile - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "43g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.43 AUD",
                "sfCost": "0.20 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Aflion Iceberg Blue"],
        "image": "aflion-iceberg-blue.jpg",
        "cosmeticFeatures": {
            "topLabel": "AFLION"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["40"],
                "excerpt": "Light Dustproof Linear from Aflion/Golden Orange Electronics",
                "listedName": "Aflion Iceberg Blue"
            }
        ]
    },
    {
        "name": ["Aflion Panda"],
        "image": "aflion-panda.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AFLION",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["7"],
                "excerpt": "These are AFLION switches, manufactured by Dongguan Golden Orange Electronics Technology Co., Ltd. AFLION Panda switches are some of the thockiest tactile switches around, utilize a long pole stem for a more solid bottom out sound.",
                "listedName": "AFLION Panda Switch (Tactile - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "60g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Unlubed (No Factory Lube, Light Lube Stem)"
                },
                "itemCost": "0.46 AUD",
                "sfCost": "0.21 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Aflion Shadow"],
        "image": "aflion-shadow.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AFLION",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["7"],
                "excerpt": "These are AFLION switches, manufactured by Dongguan Golden Orange Electronics Technology Co., Ltd. AFLION Shadow switches are some of the thockiest tactile switches around, utilize a long pole stem for a more solid bottom out sound. Features a 63g two-stage stainless steel spring.",
                "listedName": "AFLION Shadow Switch (Tactile - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.43 AUD",
                "sfCost": "0.20 AUD"
            },
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["4"],
                "excerpt": "A relatively heavy tactile switch from Aflion. Large round bump similar to holy panda, but a longer (~19mm) dual stage spring provides more initial force. Seems to be the sample that Fantasy DVA and Poison switches were based off as the only 5 pin winglatch housing I have seen from Aflion so far.",
                "listedName": "Aflion Black and Orange Factory Sample (Shadow)",
                "comment": "TODO: Switch Oddities lists these are \"factory samples\". Not sure what this means, but I'll look into this later to figure out if the Switch Oddities sample should be considered separate from the one I got from Mechanicalkeyboards.co.id."
            }
        ]
    }
],[
    {
        "name": ["Akko Custom Series Lavender Purple", "Akko CS Lavender Purple"],
        "image": "akko-custom-series-lavender-purple.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["07", "D"],
                "listedSpecs": {
                    "Spring": "18mm Long Spring",
                    "Operating Force": "36gf \u00b1 5gf",
                    "Tactile Force": "50gf \u00b1 5gf",
                    "Total Travel": "4.0-0.5mm",
                    "Pre Travel": "1.9 \u00b1 0.3mm",
                    "Tactile Position": "0.5 \u00b1 0.3mm"
                },
                "itemCost": "0.51 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Matcha Green", "Akko CS Matcha Green"],
        "image": "akko-custom-series-matcha-green.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["07", "P"],
                "listedSpecs": {
                    "Spring": "Spiral Progressive Spring",
                    "Operating Force": "50gf \u00b1 5gf",
                    "Bottom Out Force": "63gf \u00b1 5gf",
                    "Total Travel": "4.0-0.5mm",
                    "Pre Travel": "1.9 \u00b1 0.3mm"
                },
                "itemCost": "0.51 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Ocean Blue", "Akko CS Ocean Blue"],
        "image": "akko-custom-series-ocean-blue.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["07", "K"],
                "listedSpecs": {
                    "Spring": "Spiral Progressive Spring",
                    "Operating Force": "36gf \u00b1 5gf",
                    "Tactile Force": "45gf \u00b1 5gf",
                    "Total Travel": "4.0-0.5mm",
                    "Pre Travel": "1.9 \u00b1 0.3mm",
                    "Tactile Position": "0.5 \u00b1 0.3mm"
                },
                "itemCost": "0.51 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Radiant Red", "Akko CS Radiant Red"],
        "image": "akko-custom-series-radiant-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US", "count": 1, "undersideMouldLabel": ["07", "T"],
                "excerpt": "Akko Custom Series Switch linear made by KTT.",
                "listedName": "Akko Radiant Red",
                "listedSpecs": {
                    "Actuation Force": "53g",
                    "Bottom Out Force": "62g",
                    "Actuation": "1.9mm",
                    "Bottom Out": "3.5mm",
                    "Spring": "18mm"
                }
            },
            {
                "originID": "2022-06-08 ANNE-CN", "count": 1, "undersideMouldLabel": ["07", "A1"],
                "listedSpecs": {
                    "Spring": "18mm Long Spring",
                    "Operating Force": "53gf \u00b1 5gf",
                    "Bottom Out Force": "62gf \u00b1 5gf",
                    "Total Travel": "3.5 \u00b1 0.3mm",
                    "Pre Travel": "1.9 \u00b1 0.3mm"
                },
                "itemCost": "0.51 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Rose Red", "Akko CS Rose Red"],
        "image": "akko-custom-series-rose-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["07", "A2"],
                "listedSpecs": {
                    "Spring": "Spiral Progressive Spring",
                    "Operating Force": "43gf \u00b1 5gf",
                    "Bottom Out Force": "55gf \u00b1 5gf",
                    "Total Travel": "3.5 \u00b1 0.3mm",
                    "Pre Travel": "1.9 \u00b1 0.3mm"
                },
                "itemCost": "0.51 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Vintage White", "Akko CS Vintage White"],
        "image": "akko-custom-series-vintage-white.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["07", "S"],
                "excerpt": "Akko Custom Series Switch linear made by KTT.",
                "listedName": "Akko Vintage White",
                "listedSpecs": {
                    "Actuation Force": "35g",
                    "Bottom Out Force": "45g",
                    "Actuation": "1.9mm",
                    "Bottom Out": "4.0mm",
                    "Spring": "22mm"
                }
            },
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["07", "X"],
                "listedSpecs": {
                    "Spring": "22mm Long Spring",
                    "Operating Force": "35gf \u00b1 5gf",
                    "Bottom Out Force": "45gf \u00b1 5gf",
                    "Total Travel": "4.0-0.5mm",
                    "Pre Travel": "1.9 \u00b1 0.3mm"
                },
                "itemCost": "0.51 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    }
],[
    {
        "name": ["Akko Custom Series Jelly Black", "Akko CS Jelly Black"],
        "image": "akko-custom-series-jelly-black.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["02", "23"],
                "listedSpecs": {
                    "Operating force": "50\u00b15gf",
                    "Total travel": "4.0 - 0.5 mm",
                    "Pre travel": "1.9\u00b10.3 mm"
                },
                "itemCost": "0.87 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Jelly Blue", "Akko CS Jelly Blue"],
        "image": "akko-custom-series-jelly-blue.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["15"],
                "listedSpecs": {
                    "Operating force": "40\u00b15gf",
                    "Total travel": "4.0\u00b10.3mm",
                    "Pre travel": "2.0\u00b10.3 mm",
                    "Tactile position": "0.3\u00b10.2 mm",
                    "Tactile force": "60\u00b15gf"
                },
                "itemCost": "0.61 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Jelly Pink", "Akko CS Jelly Pink"],
        "image": "akko-custom-series-jelly-pink.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["02", "20"],
                "listedSpecs": {
                    "Operating force": "45\u00b15gf",
                    "Total travel": "4.0 - 0.5 mm",
                    "Pre travel": "1.9\u00b10.3mm"
                },
                "itemCost": "0.61 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Jelly White", "Akko CS Jelly White"],
        "image": "akko-custom-series-jelly-white.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["5"],
                "listedSpecs": {
                    "Operating force": "35\u00b15gf",
                    "Total travel": "4.0 - 0.5 mm",
                    "Pre travel": "1.9\u00b10.3 mm"
                },
                "itemCost": "0.61 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Sponge", "Akko CS Sponge"],
        "image": "akko-custom-series-sponge.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["07", "V"],
                "listedSpecs": {
                    "Operating force": "40\u00b15gf",
                    "Total travel": "4.0\u00b10.3mm",
                    "Pre travel": "2.0\u00b10.3 mm",
                    "Tactile position": "0.3\u00b10.2 mm",
                    "Tactile force": "60\u00b15gf"
                },
                "itemCost": "0.61 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko Custom Series Starfish", "Akko CS Starfish"],
        "image": "akko-custom-series-starfish.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["07", "J"],
                "listedSpecs": {
                    "Operating force": "50\u00b15gf",
                    "Total travel": "4.0 - 0.5 mm",
                    "Pre travel": "1.9\u00b10.3 mm"
                },
                "itemCost": "0.61 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    }
],[
    {
        "name": ["Akko x TTC Demon"],
        "image": "akko-x-ttc-demon.jpg",
        "cosmeticFeatures": {
            "topLabel": "TTC"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["TTC", "V", "16", "T"],
                "listedSpecs": {
                    "Operating force": "50gf",
                    "Total travel": "4.0-0.4mm",
                    "Pre travel": "2.0\u00b10.4mm",
                    "Tactile forcet": "63.5gf",
                    "Tactile force": "No"
                },
                "itemCost": "1.62 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "name": ["Akko x TTC Princess"],
        "image": "akko-x-ttc-princess.jpg",
        "cosmeticFeatures": {
            "topLabel": "TTC"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-06-08 ANNE-CN",
                "count": 1,
                "undersideMouldLabel": ["TTC", "V", "26", "V"],
                "listedSpecs": {
                    "Operating force": "45gf",
                    "Total travel": "4.0-0.4mm",
                    "Pre travel": "2.0\u00b10.4mm",
                    "Tactile forcet": "53.5gf",
                    "Tactile force": "No"
                },
                "itemCost": "1.62 AUD",
                "sfCost": "0.00 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Akko V1 Purple"],
        "image": "akko-v1-purple.jpg",
        "cosmeticFeatures": {
            "topLabel": "AKKO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["19", "8"],
                "excerpt": "Akko linear switch made by Huano",
                "listedName": "Akko V1 Purple",
                "listedSpecs": {
                    "Actuation Force": "45g",
                    "Actuation": "2mm",
                    "Bottom Out": "4mm"
                }
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Alpaca V2"],
        "image": "placeholder.png",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-10-27 Daily-Clack-AU",
                "count": 1,
                "undersideMouldLabel": ["02"],
                "excerpt": "MOST RECENT BATCHES ARE V2!\n\nLONG AWAITED ALPACAS ARE NOW AVAILABLE ON DAILY CLACK\n\nHighly sought after, these linear switches have grey housing and pink stem to match SA Bliss.\n\nMade of polycarbonate for the top piece, nylon housing for the base, and a POM stem. These switches have a 62g (bottom out) gold plated spring.\n\nSilent version has a dark smokey clear housing with the same pink stem.",
                "listedName": "Alpaca Linear",
                "listedSpecs": {
                    "Designed by": "Prime Keyboards",
                    "Spring":      "62g"
                },
                "itemCost": "0.77 AUD",
                "sfCost": "0.04 AUD"
            }
        ]
    },
    {
        "name": ["Silent Alpaca V2"],
        "image": "placeholder.png",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-10-27 Daily-Clack-AU",
                "count": 1,
                "undersideMouldLabel": ["06"],
                "excerpt": "MOST RECENT BATCHES ARE V2!\n\nLONG AWAITED ALPACAS ARE NOW AVAILABLE ON DAILY CLACK\n\nHighly sought after, these linear switches have grey housing and pink stem to match SA Bliss.\n\nMade of polycarbonate for the top piece, nylon housing for the base, and a POM stem. These switches have a 62g (bottom out) gold plated spring.\n\nSilent version has a dark smokey clear housing with the same pink stem.",
                "listedName": "Silent Alpaca Linear",
                "listedSpecs": {
                    "Designed by": "Prime Keyboards",
                    "Spring":      "62g"
                },
                "itemCost": "0.90 AUD",
                "sfCost": "0.05 AUD"
            }
        ]
    }
],[
    {
        "name": ["BuiltByNim Linear", "BBN Linear"],
        "image": "builtbynim-linear.jpg",
        "imageAcknowledgement": "https://candykeys.com/product/builtbynim-bbn-linear-switch",
        "cosmeticFeatures": {
            "topLabel": "BBN",
            "pins": 5
        },
        "documentedCharacteristics": {
            "Spring": "\"63.5g dual stage gold plated\"",
            "Stem": "\"POM lengthened stem\"",
            "Top Housing": "\"Custom nylon blend\"",
            "Bottom Housing": "PC",
            "official?": "https://www.builtbynim.com/products/p/bbn-linear"
        },
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["12"],
                "listedName": "BBN Linear",
                "itemCost": "1.16 AUD",
                "sfCost": "0.21 AUD"
            }
        ]
    }
],[
    {
        "name": ["C\u00B3Equalz X TKC Dragon Fruit"],
        "image": "c3equalz-x-tkc-dragon-fruit.jpg",
        "imageAcknowledgement": "https://divinikey.com/products/c-equalz-x-tkc-dragon-fruit-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "EQUALZ",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["04"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile switch with a 63.5g spring",
                "listedName": "C3Equalz X TKC Dragon Fruit",
                "itemCost": "1.44 AUD",
                "sfCost": "1.38 AUD"
            }
        ]
    }
],[
    {
        "name": ["Candy Jade Green (62g)"],
        "image": "candy-jade-green.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/candy-green-jade-switch-rgb-smd-linear-55g-62g-switches-for-mechanical-keyboard-mx-stem-5pin-gold-plated-long-spring",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["HM-106"],
                "excerpt": "Linear 62g, PCB mount",
                "listedName": "Candy Jade",
                "comment": "Found in the second bag of the packaging.\nHard to read the underside label. This is my best guess.",
                "itemCost": "1.57 AUD",
                "sfCost": "1.50 AUD"
            }
        ]
    }
],[
    {
        "name": ["Charue Design Ca Phe Sua Da"],
        "image": "charue-design-ca-phe-sua-da.jpg",
        "imageAcknowledgement": "https://www.keycrox.co.uk/product/ca-phe-sua-da-switch",
        "cosmeticFeatures": {
            "topLabel": "CHARUE",
            "pins": 5
        },
        "documentedCharacteristics": {
            "Spring": "\"63.5g Gold Plated Double Spring\"",
            "Stem": "\"Nylon Stem (Clear) (Regular Length)\"",
            "Top Housing": "PC",
            "Bottom Housing": "PC",
            "official?": "https://charue-design.com/products/ca-phe-sua-da-linear-switches"
        },
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["4"],
                "listedName": "Ca Phe Sua Da Switch",
                "itemCost": "1.04 AUD",
                "sfCost": "0.19 AUD"
            }
        ]
    },
    {
        "name": ["Charue Design Popcorn"],
        "image": "charue-design-popcorn.jpg",
        "imageAcknowledgement": "https://www.keycrox.co.uk/product/popcorn-switch",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "CHARUE",
            "pins": 5
        },
        "documentedCharacteristics": {
            "Spring": "\"63.5g Gold Plated Double Spring\"",
            "Stem": "\"UHMWPE Stem (Regular Length)\"",
            "Top Housing": "PME",
            "Bottom Housing": "PME",
            "official?": "https://charue-design.com/products/popcorn-switches"
        },
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["14"],
                "listedName": "Popcorn Switch",
                "itemCost": "1.04 AUD",
                "sfCost": "0.19 AUD"
            }
        ]
    }
],[
    {
        "name": ["Cherry Hyperglide MX (Red)"],
        "image": "cherry-hyperglide-mx-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/cherry-switches/products/cherry-mx-hyperglide-red-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-original/mx-red.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/b/7/a/b/b7ab2f72bd5686e1e1e759a9f3703536d7fb1e18/EN_CHERRY_MX_RED.pdf",
            "Operating force": "45 cN",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["792", "A"],
                "itemCost": "0.54 AUD",
                "sfCost": "0.10 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (Black)"],
        "image": "cherry-hyperglide-mx-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/cherry-switches/products/cherry-mx-black-hyperglide-pcb-mount-switches",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-original/mx-black.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/0/7/f/6/07f6a966a4b95053db5691e73faa401f67d2eb5e/EN_CHERRY_MX_BLACK.pdf",
            "Operating force": "60 cN",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["769", "A"],
                "comment": "I'm keeping this in my extras bag.",
                "listedName": "Cherry MX Hyperglide (Black)",
                "itemCost": "0.84 AUD",
                "sfCost": "0.14 AUD"
            },
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["701", "A"],
                "itemCost": "0.54 AUD",
                "sfCost": "0.10 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (Brown)"],
        "image": "cherry-hyperglide-mx-brown.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/cherry-switches/products/cherry-mx-hyperglide-brown-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-original/mx-brown.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/1/3/6/1/13618248706cd28e75ab9bdf9e55e9f8794611c1/EN_CHERRY_MX_BROWN.pdf",
            "Operating force": "55 cN",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["755", "A"],
                "comment": "I'm keeping this in my extras bag.",
                "listedName": "Cherry MX Hyperglide (Brown)",
                "itemCost": "0.84 AUD",
                "sfCost": "0.14 AUD"
            },
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["637", "A"],
                "itemCost": "0.54 AUD",
                "sfCost": "0.10 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (Clear)"],
        "image": "cherry-hyperglide-mx-clear.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/cherry-switches/products/cherry-mx-hyperglide-clear-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-special/mx-clear.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/1/e/6/d/1e6d4479ea3c692473ae8dd3f0b825bd568ecadb/EN_CHERRY_MX_CLEAR.pdf",
            "Operating force": "65 cN",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["494", "A"],
                "itemCost": "0.89 AUD",
                "sfCost": "0.18 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (Blue)"],
        "image": "cherry-hyperglide-mx-blue.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/cherry-switches/products/cherry-mx-hyperglide-blue-linear-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-original/mx-blue.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/a/5/3/1/a531cb6598bc849cbcf131fd7a31814282b74545/EN_CHERRY_MX_BLUE.pdf",
            "Operating force": "60 cN",
            "Pre/total travel": "2.2 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["608", "A"],
                "itemCost": "0.54 AUD",
                "sfCost": "0.10 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (Green)"],
        "image": "cherry-hyperglide-mx-green.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/cherry-switches/products/cherry-mx-hyperglide-green-tactile-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-special/mx-green.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/a/a/3/1/aa31c11f193a199eea05c8897d9decc539ce9b7f/EN_CHERRY_MX_GREEN.pdf",
            "Operating force": "80 cN",
            "Pre/total travel": "2.2 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["660", "A"],
                "itemCost": "0.54 AUD",
                "sfCost": "0.10 AUD"
            },
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["463", "A"],
                "comment": "I'm keeping this in my extras bag. May not actually be a hyperglide.",
                "itemCost": "0.54 AUD",
                "sfCost": "0.10 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (White)"],
        "image": "cherry-hyperglide-mx-white.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/cherry-switches/products/cherry-mx-hyperglide-milk-tactile-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["725", "A"],
                "itemCost": "0.54 AUD",
                "sfCost": "0.10 AUD"
            }
        ]
    }
],[
    {
        "name": ["Cherry Hyperglide MX (Speed Silver)"],
        "image": "cherry-hyperglide-mx-speed-silver.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/cherry-mx-hyperglide-speed-silver-linear-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-original/mx-speed-silver.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/7/f/4/5/7f45a95bf2bd93bd9c94f1835bd0c89dd6863326/EN_CHERRY_MX_SPEED_Silver.pdf",
            "Operating force": "45 cN",
            "Pre/total travel": "1.2 mm / 3.4 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["500", "A"],
                "itemCost": "0.57 AUD",
                "sfCost": "0.11 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (Gray)"],
        "image": "cherry-hyperglide-mx-gray.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/cherry-switches/products/cherry-mx-hyperglide-grey-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-special/mx-grey.html",
            "Operating force": "80 cN",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["250", "A"],
                "itemCost": "0.89 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (Silent Red)"],
        "image": "cherry-hyperglide-mx-silent-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/cherry-mx-hyperglide-silent-red-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-original/mx-silent-red.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/9/8/d/c/98dc07c393ba6be617c8547b77371709063605ad/EN_CHERRY_MX_SILENT_RED.pdf",
            "Operating force": "45 cN",
            "Pre/total travel": "1.9 mm / 3.7 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["413", "A"],
                "itemCost": "0.83 AUD",
                "sfCost": "0.16 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX (Silent Black)"],
        "image": "cherry-hyperglide-mx-silent-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/cherry-mx-hyperglide-silent-black-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "smd": "no"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://www.cherrymx.de/en/cherry-mx/mx-original/mx-silent-black.html",
            "_datasheet": "https://www.cherrymx.de/_Resources/Persistent/8/9/4/5/8945e4291a811c540f5c3e1ae4b3fc47e4011a8a/EN_CHERRY_MX_SILENT_BLACK.pdf",
            "Operating force": "60 cN",
            "Pre/total travel": "1.9 mm / 3.7 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["465", "A"],
                "itemCost": "0.83 AUD",
                "sfCost": "0.16 AUD"
            }
        ]
    }
],[
    {
        "name": ["Cherry Hyperglide MX RGB (Red)"],
        "image": "cherry-hyperglide-mx-rgb-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/cherry-rgb-red-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "additionalIDNotes": "Clear top, milky bottom, similar to Gateron Silents."
        },
        "documentedCharacteristics": "(See non-RGB version.)",
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["535"],
                "itemCost": "0.60 AUD",
                "sfCost": "0.12 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX RGB (Black)"],
        "image": "cherry-hyperglide-mx-rgb-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/cherry-rgb-black-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": "(See non-RGB version.)",
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["011"],
                "itemCost": "0.60 AUD",
                "sfCost": "0.12 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX RGB (Brown)"],
        "image": "cherry-hyperglide-mx-rgb-brown.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/cherry-rgb-brown-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": "(See non-RGB version.)",
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["117"],
                "itemCost": "0.60 AUD",
                "sfCost": "0.12 AUD"
            }
        ]
    },
    {
        "name": ["Cherry Hyperglide MX RGB (Blue)"],
        "image": "cherry-hyperglide-mx-rgb-blue.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/cherry-rgb-blue-tactile-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": "(See non-RGB version.)",
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["112"],
                "itemCost": "0.60 AUD",
                "sfCost": "0.12 AUD"
            }
        ]
    }
],[
    {
        "name": ["Cherry Hyperglide MX RGB (Speed Silver)"],
        "image": "cherry-hyperglide-mx-rgb-speed-silver.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/cherry-rgb-silver-linear-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "CHERRY",
            "additionalIDNotes": "Clear top, milky bottom, similar to Gateron Silents."
        },
        "documentedCharacteristics": "(See non-RGB version.)",
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["521"],
                "itemCost": "0.83 AUD",
                "sfCost": "0.16 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["CIY Evolution Red"],
        "image": "ciy-evolution-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "CiY"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["B", "H&J", "6"],
                "excerpt": "CIY branded winglatch linear switch reportedly manufactured by Jixian",
                "listedName": "CIY Evolution Red",
                "listedSpecs": {
                    "Actuation Force": "42g",
                    "Bottom Out Force": "60g",
                    "Actuation": "2mm",
                    "Bottom Out": "4mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["CIY Phantom"],
        "image": "ciy-phantom.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["14"],
                "excerpt": "CIY fully clear Holy Panda like tactile switch seemingly manufactured by BSUN",
                "listedName": "CIY Phantom",
                "listedSpecs": {
                    "Actuation Force": "45g",
                    "Bottom Out Force": "60g",
                    "Actuation": "2mm",
                    "Bottom Out": "4mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["CIY Sakura Pink"],
        "image": "ciy-sakura-pink.jpg",
        "cosmeticFeatures": {
            "topLabel": "CiY",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["HM", "3", "01"],
                "excerpt": "A CIY branded linear switch manufactured by HaiMu",
                "listedName": "CIY Sakura Pink",
                "listedSpecs": {
                    "Actuation Force": "30g",
                    "Bottom Out Force": "45g",
                    "Actuation": "2mm",
                    "Bottom Out": "4mm"
                }
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["DareU Purple Gold"],
        "image": "dareu-purple-gold.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "DAREU",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["3", "19"]
            }
        ]
    },
    {
        "unverified": true,
        "name": ["DareU Sky Blue"],
        "image": "dareu-sky-blue.jpg",
        "cosmeticFeatures": {
            "topLabel": "DAREU",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["3", "01"]
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Durock Burgundy"],
        "image": "durock-burgundy.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Smokey top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["L"],
                "excerpt": "DUROCK Light Tactile Switches have a smooth round bump then smooth snap after the bump. The bump is very noticeable, and it gives you a lot of feedback upon actuation - responsive to the touch. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Light Burgundy Smokey Switch (Tactile 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock Daybreak"],
        "image": "durock-daybreak.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Smokey top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["E"],
                "excerpt": "DUROCK Silent Linear Switches are very nice and smooth. This DUROCK silent switch feature a very smooth keypress as well as silencing pads installed both on the top and bottom of the stems. This dampens the sound of the keypress going down as well as on the way up. OEM special design with Smokey housing. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Daybreak Silent Smokey Switch (Linear 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock Dolphin"],
        "image": "durock-dolphin.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["E"],
                "excerpt": "DUROCK Silent Linear Switches are very nice and smooth. This DUROCK silent switch feature a very smooth keypress as well as silencing pads installed both on the top and bottom of the stems. This dampens the sound of the keypress going down as well as on the way up. OEM special design with Clear housing. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Dolphin Silent Clear Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom-Out Force": "62g"
                },
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock EV-01"],
        "image": "durock-ev-01.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["G"],
                "excerpt": "Introducing the DUROCK EV-01 Switch!, meant to pay homage to the aesthetics of classic Mecha anime. These switches are the same smooth Durock linear switches you know and love. DUROCK EV-01 comes without any factory lubricant (unlubed). The top housing is Polycarbonate, stem is POM, and the lower housing is Nylon PA. Colors: Purple (Pantone PQ-267C), Green (Pantone PQ-802C).",
                "listedName": "DUROCK EV-01 Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC) - Pantone PQ-267C",
                    "Stem":             "POM - Pantone PQ-802C",
                    "Bottom Housing":   "Nylon - Black",
                    "Lube":             "Unlubed (No Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock EV-02"],
        "image": "durock-ev-02.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["13"],
                "excerpt": "Our second entry in the EV series, the EV-02 switch reminds us of a powerful force driven by an elite pilot. These are smooth Durock linear switches. DUROCK EV-02 comes without any factory lubricant (unlubed). The top housing is Polycarbonate, stem is POM, and the lower housing is Nylon PA.",
                "listedName": "DUROCK EV-02 Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Unlubed (No Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "name": ["Durock Koala (62g)"],
        "image": "durock-koala.jpg",
        "imageAcknowledgement": "https://www.keycrox.co.uk/product/koala-62-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5,
            "additionalIDNotes": "Housing is off-white, somewhat like the Invyr Holy Panda housing, but a bit lighter than it."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["14"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "DUROCK Tactile Koala Switches have a smooth round bump then smooth snap after the bump. The bump is very noticeable, and it gives you a lot of feedback upon actuation - responsive to the touch. OEM special design which is close to original Holy panda but still with its own unique tactile feelings. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Koala Switch (Tactile 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom-Out Force": "62g"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "name": ["Durock Koala (67g)"],
        "image": "durock-koala.jpg",
        "imageAcknowledgement": "https://www.keycrox.co.uk/product/koala-62-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5,
            "additionalIDNotes": "Housing is off-white, somewhat like the Invyr Holy Panda housing, but a bit lighter than it."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["18"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "DUROCK Tactile Koala Switches have a smooth round bump then smooth snap after the bump. The bump is very noticeable, and it gives you a lot of feedback upon actuation - responsive to the touch. OEM special design which is close to original Holy panda but still with its own unique tactile feelings. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Koala Switch (Tactile 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom-Out Force": "67g"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock L1 [Creamy Yellow] (55g)"],
        "image": "durock-l1-clear.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["G"],
                "excerpt": "DUROCK Linear Switches are very nice and smooth. OEM special design with Clear housing. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Creamy Yellow Clear Switch (Linear 55g - PCB Mount)",
                "listedSpecs": {
                    "Bottom-Out Force": "55g"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock L2 [Creamy Green] (62g)"],
        "image": "durock-l2-clear.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["I"],
                "excerpt": "DUROCK Linear Switches are very nice and smooth. OEM special design with Clear housing. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Creamy Green Clear Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom-Out Force": "62g"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock L3 [Pink] (65g)"],
        "image": "durock-l3-clear.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["D"],
                "excerpt": "DUROCK Linear Switches are very nice and smooth. OEM special design with Clear housing. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Creamy Pink Clear Switch (Linear 65g - PCB Mount)",
                "listedSpecs": {
                    "Bottom-Out Force": "65g"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock L5 [Blue] (67g)"],
        "image": "durock-l5-clear.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["C"],
                "excerpt": "DUROCK Linear Switches are very nice and smooth. OEM special design with Clear housing. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Creamy Blue Clear Switch (Linear 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom-Out Force": "67g"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock L7 [Black] (78g)"],
        "image": "durock-l7-smokey.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Smokey top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["E"],
                "excerpt": "DUROCK Linear Switches are very nice and smooth. OEM special design with Smokey housing. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Black Smokey Switch (Linear 78g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "78g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock POM", "Durock Piano"],
        "image": "durock-pom.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["09"],
                "excerpt": "DUROCK POM Linear Switches are very nice and super smooth, comes with a deeper sound compare with the previous PC Top+Nylon Bottom series. The stem using the upgrade design, and also uses a new mixed material, which is finally selected after hundreds of experiments and improvements. DUROCK engineer team finally got an excellent ratio of the mixture to achieve the great performance. The top and the lower housing is full POM.",
                "listedName": "DUROCK Piano POM Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "POM",
                    "Stem":             "Proprietary Blend",
                    "Bottom Housing":   "POM",
                    "Lube":             "Unlubed (No Factory Lube)"
                },
                "itemCost": "1.14 AUD",
                "sfCost": "0.52 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock Purple"],
        "image": "durock-purple.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["J"],
                "excerpt": "DUROCK Tactile Switches have a smooth round bump then smooth snap after the bump. The bump is very noticeable, and it gives you a lot of feedback upon actuation - responsive to the touch. The tactile level is between DUROCK Light Burgundy and T1. The top housing is Polycarbonate, and the lower housing is Nylon PA.",
                "listedName": "DUROCK Purple Clear Switch (Tactile 65g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "65g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock T1"],
        "image": "durock-t1-smokey-housing.jpg",
        "imageAcknowledgement": "https://www.keycrox.co.uk/product/durock-t1-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["G"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile switch with a bottom of 67g",
                "listedName": "Durock T1 Smokey",
                "itemCost": "1.27 AUD",
                "sfCost": "1.22 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock T1 POM Sunflower"],
        "image": "durock-t1-pom-sunflower.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["03"],
                "excerpt": "DUROCK Sunflower POM T1 Tactile Switches are very nice and super smooth, comes with a deeper sound compare with the previous PC Top+Nylon Bottom series. The stem using the upgrade design, and also uses a new mixed material, which is finally selected after hundreds of experiments and improvements. DUROCK engineer team finally got an excellent ratio of the mixture to achieve the great performance. The top and the lower housing is full POM.",
                "listedName": "DUROCK Sunflower POM T1 Switch (Tactile 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "POM - PANTONE 17-5104",
                    "Stem":             "Proprietary Blend - PANTONE 13-0647",
                    "Bottom Housing":   "POM - PANTONE 17-5104",
                    "Lube":             "Unlubed (No Factory Lube)"
                },
                "itemCost": "1.14 AUD",
                "sfCost": "0.52 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Durock T1 Shrimp"],
        "image": "durock-t1-shrimp.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["F"],
                "excerpt": "DUROCK Shrimps Switches are the silent versions of the popular T1 switches. Featuring a turquoise housing and white stem, these Silent T1 switches uses DUROCK's unique patent silent method to get that T1 tactility with a significant reduction in sound.",
                "listedName": "DUROCK Shrimp T1 Switch (Silent Tactile 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC) - PANTONE 15-5217 TCX",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon - PANTONE 15-5217 TCX",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Epomaker Iceberg Silent Brown"],
        "image": "epomaker-iceberg-silent-brown.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "SKYLooNG",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["3", "07"],
                "excerpt": "These Silent Iceberg switches appear to be made by HaiMu based on their mold markings, and these would be the first HaiMu silent switches as well as tactiles that I am aware of in the western market so they are particularly exciting.\nOne quantity = one of each of the 6 switches",
                "listedName": "Iceberg Silent Brown: Tactile",
                "listedSpecs": {
                    "Tactile Force": "37g",
                    "Bottom Out Force": "60g",
                    "Bottom Out": "3.8mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Epomaker Iceberg Silent Red"],
        "image": "epomaker-iceberg-silent-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "SKYLooNG",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["3", "05"],
                "excerpt": "These Silent Iceberg switches appear to be made by HaiMu based on their mold markings, and these would be the first HaiMu silent switches as well as tactiles that I am aware of in the western market so they are particularly exciting.\nOne quantity = one of each of the 6 switches",
                "listedName": "Iceberg Silent Red: Linear",
                "listedSpecs": {
                    "Bottom Out Force": "45g",
                    "Bottom Out": "3.8mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Epomaker Iceberg Silent Rose"],
        "image": "epomaker-iceberg-silent-rose.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "SKYLooNG",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["3", "04"],
                "excerpt": "These Silent Iceberg switches appear to be made by HaiMu based on their mold markings, and these would be the first HaiMu silent switches as well as tactiles that I am aware of in the western market so they are particularly exciting.\nOne quantity = one of each of the 6 switches",
                "listedName": "Iceberg Silent Rose: Tactile",
                "listedSpecs": {
                    "Tactile Force": "47g",
                    "Bottom Out Force": "70g",
                    "Bottom Out": "3.8mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Epomaker Iceberg Silent Silver"],
        "image": "epomaker-iceberg-silent-silver.jpg",
        "cosmeticFeatures": {
            "topLabel": "SKYLooNG",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["3", "09"],
                "excerpt": "These Silent Iceberg switches appear to be made by HaiMu based on their mold markings, and these would be the first HaiMu silent switches as well as tactiles that I am aware of in the western market so they are particularly exciting.\nOne quantity = one of each of the 6 switches",
                "listedName": "Iceberg Silent Silver: Linear",
                "listedSpecs": {
                    "Bottom Out Force": "45g",
                    "Bottom Out": "3.8mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Epomaker Iceberg Silent White"],
        "image": "epomaker-iceberg-silent-white.jpg",
        "cosmeticFeatures": {
            "topLabel": "SKYLooNG",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["3", "14"],
                "excerpt": "These Silent Iceberg switches appear to be made by HaiMu based on their mold markings, and these would be the first HaiMu silent switches as well as tactiles that I am aware of in the western market so they are particularly exciting.\nOne quantity = one of each of the 6 switches",
                "listedName": "Iceberg Silent White: Linear",
                "listedSpecs": {
                    "Bottom Out Force": "35g",
                    "Bottom Out": "3.8mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Epomaker Iceberg Silent Yellow"],
        "image": "epomaker-iceberg-silent-yellow.jpg",
        "cosmeticFeatures": {
            "topLabel": "SKYLooNG",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["3", "10"],
                "excerpt": "These Silent Iceberg switches appear to be made by HaiMu based on their mold markings, and these would be the first HaiMu silent switches as well as tactiles that I am aware of in the western market so they are particularly exciting.\nOne quantity = one of each of the 6 switches",
                "listedName": "Iceberg Silent Yellow: Linear",
                "listedSpecs": {
                    "Bottom Out Force": "40g",
                    "Bottom Out": "3.8mm"
                }
            }
        ]
    }
],[
    {
        "name": ["Ethereal Panda"],
        "image": "ethereal-panda.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "ETHEREAL",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["14"],
                "excerpt": "Holy Pandas just aren't colorful enough for you? Ethereal Pandas aim to solve that problem that everyone has. Featuring a green base and a pink top, the Ethereal Pandas bring color to the often-neglected tactile market. Manufactured by the original manufacturer of INVYR Holy Panda.",
                "listedName": "Ethereal Panda Switch (Tactile - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "68g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Unlubed (No Factory Lube)"
                },
                "comment": "The store page lists an actuation force but not a bottom-out force. That might be a typo?",
                "itemCost": "1.35 AUD",
                "sfCost": "0.61 AUD"
            }
        ]
    }
],[
    {
        "name": ["Everglide Aqua King V3 (55g)", "Everglide Water King V3 (55g)"],
        "image": "everglide-aqua-king.jpg",
        "imageAcknowledgement": "https://drop.com/buy/everglide-aqua-king-mechanical-switches",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["01"],
                "excerpt": "The ocean may be deep, but it's a smooth ride all the way down. Take a dive, and chances are, you’ll see everything in front of you. The same holds true for Everglide’s new Aqua King v3 switches. With a total travel of 4mm, these linear switches have a longer round trip than most other linear options—but with the same consistent resistance from start to finish. Where they stand out is in their fully transparent housings, which elegantly reflect light—much like ocean water. Other components include a stainless steel spring with a gold plate, as well as gold alloy contacts for extra durability.",
                "listedName": "Everglide Aqua King v3 / Water King Switch (Linear 55g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "Polycarbonate (PC)",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "Found packaged in its own individual zip bag.<br>To tell apart the 55g and 62g samples: The 55g's spring appears to have less turns, and when you push the switches against each other, the 62g switch should slightly \"win\".",
                "itemCost": "1.07 AUD",
                "sfCost": "0.48 AUD"
            }
        ]
    },
    {
        "name": ["Everglide Aqua King V3 (62g)", "Everglide Water King V3 (62g)"],
        "image": "everglide-aqua-king.jpg",
        "imageAcknowledgement": "https://drop.com/buy/everglide-aqua-king-mechanical-switches",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["01"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 55g]",
                "listedName": "Everglide Aqua King v3 / Water King Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force":  "62g"
                },
                "itemCost": "1.07 AUD",
                "sfCost": "0.48 AUD"
            }
        ]
    },
    {
        "name": ["Everglide Aqua King V3 (67g)", "Everglide Water King V3 (67g)"],
        "image": "everglide-aqua-king.jpg",
        "imageAcknowledgement": "https://drop.com/buy/everglide-aqua-king-mechanical-switches",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "transparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["02"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear, 67g, PCB mount",
                "listedName": "Everglide Aqua King",
                "itemCost": "2.00 AUD",
                "sfCost": "1.92 AUD"
            },
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["15"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 55g]",
                "listedName": "Everglide Aqua King v3 / Water King Switch (Linear 67g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force":  "67g"
                },
                "itemCost": "1.07 AUD",
                "sfCost": "0.48 AUD"
            }
        ]
    },
    {
        "name": ["Everglide Crystal Violet"],
        "image": "everglide-crystal-violet.jpg",
        "imageAcknowledgement": "https://drop.com/buy/everglide-crystal-violet-custom-mechanical-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["E"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile with initial force of 45g and 55g actuation",
                "listedName": "Everglide Crystal Violet",
                "itemCost": "2.00 AUD",
                "sfCost": "1.92 AUD"
            }
        ]
    },
    {
        "name": ["Everglide Moyu Black", "Everglide Dark Jade"],
        "image": "everglide-moyu-black.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["31"],
                "excerpt": "Aside from the discovery of the Holy Pandas back in 2018, it’s been a while since a mechanical switch has taken the mech keys community by storm. Everglide has something to say about that. The company’s latest release rivals Holy Pandas in feel and tactility. Featuring a similar top-rounded bump and actuation force, the Dark Jade Black switches are also constructed with a 5-pin design compatible even with plateless and half-plate builds. According to YouTuber TaeKeyboards, they’re “cleaner and sharper” than Holy Pandas.",
                "listedName": "Everglide Dark Jade / Moyu Black Switch (Tactile 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "PBT",
                    "Stem":             "POM",
                    "Bottom Housing":   "PBT",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.57 AUD",
                "sfCost": "0.71 AUD"
            }
        ]
    },
    {
        "name": ["Everglide Oreo"],
        "image": "everglide-oreo.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/everglide-switch-oreo-mx-stem-transparent-clear-5pin-45g-tactile",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["A"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile, 55g actuation. Crisp tactile bump at the top of the press.",
                "listedName": "Everglide Oreo",
                "itemCost": "2.00 AUD",
                "sfCost": "1.92 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Firstblood Chocolate Blue"],
        "image": "firstblood-chocolate-blue.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "FIRSTBLOOD"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["", ""],
                "excerpt": "Firstblood clicky switch made by Huano",
                "listedName": "Firstblood Chocolate Blue"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Firstblood Chocolate Pink"],
        "image": "firstblood-chocolate-pink.jpg",
        "cosmeticFeatures": {
            "topLabel": "FIRSTBLOOD"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["", ""],
                "excerpt": "Firstblood light linear switch made by Huano.",
                "listedName": "Firstblood Chocolate Pink"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["FLCMMK Bauhinia Orchids"],
        "image": "flcmmk-bauhinia-orchids.jpg",
        "cosmeticFeatures": {
            "topLabel": "FL\u00B7CMMK",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["78"],
                "excerpt": "Bauhinia switches, named for the Bauhinia Orchid Tree, purple and pink",
                "listedName": "FLCMMK Bauhinia Orchids",
                "listedSpecs": {
                    "Actuation Force": "50g",
                    "Bottom Out Force": "60g",
                    "Bottom Out": "4mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["FLCMMK Box Rosa Pink"],
        "image": "flcmmk-box-rosa-pink.jpg",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5,
            "additionalIDNotes": "PLACEHOLDER"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["L", "4"],
                "excerpt": "Yet another Kailh Box Rosa switch, but this one is from FLCMMK",
                "listedName": "FLCMMK Box Rosa Pink",
                "listedSpecs": {
                    "Actuation Force": "40g",
                    "Bottom Out Force": "50g",
                    "Actuation": "1.8mm",
                    "Bottom Out": "3.6mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["FLCMMK Ice Mint"],
        "image": "flcmmk-ice-mint.jpg",
        "cosmeticFeatures": {
            "topLabel": "kailh",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["A", "FL"],
                "excerpt": "FLCMMK, or Fuling Esports Ice Mint Switch - Full POM material and 20mm springs",
                "listedName": "FLCMMK Ice Mint Switch",
                "listedSpecs": {
                    "Actuation Force": "40g",
                    "Bottom Out Force": "50g",
                    "Bottom Out": "4.0mm"
                }
            }
        ]
    }
],[
    {
        "name": ["Gateron Aliaz (60g)"],
        "image": "gateron-aliaz.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/pre-orderaliaz-silent-switch-tactile",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "pins": 5,
            "additionalIDNotes": "Visually identical to the other Aliazes."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["G"],
                "itemCost": "1.29 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Aliaz (70g)"],
        "image": "gateron-aliaz.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/pre-orderaliaz-silent-switch-tactile",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "pins": 5,
            "additionalIDNotes": "Visually identical to the other Aliazes."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["M"],
                "comment": "I'm not 100% sure if I've mixed up my 70g and 80g Aliazes.",
                "itemCost": "1.29 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Aliaz (80g)"],
        "image": "gateron-aliaz.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/pre-orderaliaz-silent-switch-tactile",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "pins": 5,
            "additionalIDNotes": "Visually identical to the other Aliazes."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["F"],
                "comment": "I'm not 100% sure if I've mixed up my 70g and 80g Aliazes.",
                "itemCost": "1.29 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Aliaz (100g)"],
        "image": "gateron-aliaz.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/pre-orderaliaz-silent-switch-tactile",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "pins": 5,
            "additionalIDNotes": "Visually identical to the other Aliazes."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["I"],
                "itemCost": "1.29 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Gateron KS-8 (Clear)"],
        "image": "gateron-ks8-clear.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-clear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "additionalIDNotes": "Clear top, black bottom."
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://en.gateron.cn/product/222.html",
            "Operating force": "35 gf",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["Q", "F"],
                "comment": "I'm assuming mine are KS-8's.\nThey seem to match the descriptions I find.",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-8 (Red)"],
        "image": "gateron-ks8-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-red-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://en.gateron.cn/product/220.html",
            "Operating force": "45 gf",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["N", "E"],
                "comment": "(see above)",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-8 (Yellow)"],
        "image": "gateron-ks8-yellow.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-yellow-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://en.gateron.cn/product/219.html",
            "Operating force": "50 gf",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["D", "F"],
                "comment": "(see above)",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-8 (Black)"],
        "image": "gateron-ks8-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-black-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://en.gateron.cn/product/221.html",
            "Operating force": "60 gf",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["Q", "F"],
                "comment": "(see above)",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-8 (Brown)"],
        "image": "gateron-ks8-brown.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-brown-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://en.gateron.cn/product/224.html",
            "Operating force": "55 gf",
            "Pre/total travel": "2.0 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["S", "D"],
                "comment": "(see above)",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-8 (Blue)"],
        "image": "gateron-ks8-blue.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-blue-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://en.gateron.cn/product/225.html",
            "Operating force": "60 gf",
            "Pre/total travel": "2.3 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["V", "F"],
                "comment": "(see above)",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            },
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["F", "f", "C"],
                "excerpt": "Gateron KS-8 series of key switches are clones of Cherry MX key switches. The outer shapes and internals are virtually identical to Cherry MX. All parts should be interchangeable except for the leaf springs that perform the electric switching. Cherry leaf springs fit inside Gateron housings but Gateron leaf springs do not fit into Cherry MX bottom housings. The copper leaf springs have gold-plated cross-points but which are rotated 90° from MX internals.",
                "listedName": "Gateron KS-8 Blue Switch (Tactile Click - Plate Mount)",
                "listedSpecs": {
                    "Actuation Force": "60 cN"
                },
                "comment": "The store I bought it from lists these as KS-8. Interestingly, the KBDfans switches look almost idental to this one with minor differences, so maybe they really are KS-8's.",
                "itemCost": "0.33 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-8 (Green)"],
        "image": "gateron-ks8-green.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-green-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": {
            "_officialWebsite": "https://en.gateron.cn/product/223.html",
            "Operating force": "80 gf",
            "Pre/total travel": "2.3 mm / 4.0 mm"
        },
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["S", "D"],
                "comment": "(see other KBDfans KS-8 notes)",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Gateron KS-9 (Clear)"],
        "image": "gateron-ks9-clear.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-smd-clear-liner-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Clear top, white bottom."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["M", "V"],
                "comment": "I'm assuming mine are KS-9's.\nThey seem to match the descriptions I find.",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-9 (Red)"],
        "image": "gateron-ks9-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-smd-red-liner-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Clear top, white bottom.\nVisually identical to the Gateron G Pro (Red)."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["J", "F"],
                "comment": "I'm assuming mine are KS-9's.\nThey seem to match the descriptions I find.\nThe \"J\" is upside-down compared to the other KS-9's.",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-9 (Yellow)"],
        "image": "gateron-ks9-yellow.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-smd-yellow-liner-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Clear top, white bottom.\nVisually identical to the Gateron G Pro (Yellow)."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["J", "Z"],
                "comment": "I'm assuming mine are KS-9's.\nThey seem to match the descriptions I find.\nThe \"J\" is upside-down compared to the other KS-9's.",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-9 (Black)"],
        "image": "gateron-ks9-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-smd-black-liner-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Clear top, white bottom."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["M", "K"],
                "comment": "I'm assuming mine are KS-9's.\nThey seem to match the descriptions I find.",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-9 (Brown)"],
        "image": "gateron-ks9-brown.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-smd-brown-liner-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Clear top, white bottom."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["M", "V"],
                "comment": "I'm assuming mine are KS-9's.\nThey seem to match the descriptions I find.",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-9 (Blue)"],
        "image": "gateron-ks9-blue.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-smd-blue-tactile-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Clear top, white bottom."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["M", "G"],
                "comment": "I'm assuming mine are KS-9's.\nThey seem to match the descriptions I find.",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-9 (Green)"],
        "image": "gateron-ks9-green.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-smd-green-tactile-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Clear top, white bottom."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["C", "G"],
                "comment": "I'm assuming mine are KS-9's.\nThey seem to match the descriptions I find.",
                "itemCost": "0.30 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Gateron KS-3 (Clear)"],
        "image": "gateron-ks3-clear.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-milky-housing-clear-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Milky top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["M"],
                "comment": "I'm assuming mine are KS-3's.<br>They seem to match the descriptions I find.",
                "itemCost": "0.38 AUD",
                "sfCost": "0.07 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-3 (Red)"],
        "image": "gateron-ks3-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-milky-housing-red-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Milky top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["G"],
                "comment": "(see above)",
                "itemCost": "0.38 AUD",
                "sfCost": "0.07 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-3 (Yellow)"],
        "image": "gateron-ks3-yellow.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-milky-housing-yellow-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Milky top and bottom housing.\nVisually very similar to Gateron Cap V2 (Milky Yellow), but has differences. (See the Cap V2's notes for more information.)"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["X", "F"],
                "comment": "(see above)",
                "itemCost": "0.38 AUD",
                "sfCost": "0.07 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-3 (Black)"],
        "image": "gateron-ks3-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-milky-housing-black-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Milky top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["K"],
                "comment": "(see above)",
                "itemCost": "0.38 AUD",
                "sfCost": "0.07 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-3 (Brown)"],
        "image": "gateron-ks3-brown.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-milky-housing-brown-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Milky top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["M"],
                "comment": "(see above)",
                "itemCost": "0.37 AUD",
                "sfCost": "0.07 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-3 (Blue)"],
        "image": "gateron-ks3-blue.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-milky-housing-blue-tactile-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Milky top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["5", "F"],
                "comment": "(see above)",
                "itemCost": "0.38 AUD",
                "sfCost": "0.07 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron KS-3 (Green)"],
        "image": "gateron-ks3-green.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-milky-housing-green-tactile-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Milky top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["D"],
                "comment": "(see above)",
                "itemCost": "0.38 AUD",
                "sfCost": "0.07 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Gateron Silent (Red)"],
        "image": "gateron-silent-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kbdfans-gateron-silent-red-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Clear top, milky bottom."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["Q", "F"],
                "comment": "Not sure how I can better-pinpoint the model of these.",
                "itemCost": "0.57 AUD",
                "sfCost": "0.11 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron Silent (Black)"],
        "image": "gateron-silent-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kbdfans-gateron-silent-black-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["E", "F"],
                "comment": "Not sure how I can better-pinpoint the model of these.",
                "itemCost": "0.57 AUD",
                "sfCost": "0.11 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron Silent (Brown)"],
        "image": "gateron-silent-brown.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kbdfans-gateron-silent-brown-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "(see above)"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["5", "F"],
                "comment": "Not sure how I can better-pinpoint the model of these.",
                "itemCost": "0.57 AUD",
                "sfCost": "0.11 AUD"
            }
        ]
    },
    {
        "name": ["Gateron KS-3 (Silent Yellow)"],
        "image": "gateron-ks-3-silent-yellow.jpg",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["N"],
                "excerpt": "Gateron Silent Switches have been designed to minimize the sound of bottoming out as well as the sound of the stem on the up-stroke while typing. Silent Switch – has pads to dampen sounds of bottoming out and upstroke. This Gateron KS-3 Silent is the smoothest Gateron Silent switches.",
                "listedName": "Gateron KS-3 Silent Yellow Switch (Silent Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "60g",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.68 AUD",
                "sfCost": "0.31 AUD"
            }
        ]
    }
],[
    {
        "name": ["Gateron G Pro (Red)"],
        "image": "gateron-ks9-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Visually identical to the Gateron KS-9 (Red)."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["O", "I"],
                "excerpt": "These are Gateron’s brand new G-PRO switch line, these are using brand new stem molds. They offer tighter tolerances, to reduce stem wobble and improve smoothness of the switch. They're excellent linear switches, extremely affordable and much smoother than their previous iteration (Gateron KS-9).",
                "listedName": "Gateron G PRO Red Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.38 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    },
    {
        "name": ["Gateron G Pro (Yellow)"],
        "image": "gateron-ks9-yellow.jpg",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "additionalIDNotes": "Visually identical to the Gateron KS-9 (Yellow)."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["J", "5"],
                "excerpt": "These are Gateron’s brand new G-PRO switch line, these are using brand new stem molds. They offer tighter tolerances, to reduce stem wobble and improve smoothness of the switch. They're excellent linear switches, extremely affordable and much smoother than their previous iteration (Gateron KS-9).",
                "listedName": "Gateron G PRO Yellow Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.38 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron Pro (Milky Yellow)"],
        "image": "gateron-pro-milky-yellow.jpg",
        "imageAcknowledgement": "https://allcaps.store/collections/linear-switches/products/gateron-pro-milky-yellows",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["D", "F"],
                "listedName": "Gateron Pro Milky Yellow",
                "comment": "Not sure how I can better-pinpoint the model of these.",
                "itemCost": "0.40 AUD",
                "sfCost": "0.07 AUD"
            }
        ]
    }
],[
    {
        "name": ["Gateron Box Ink V2 (Pink)"],
        "image": "gateron-box-ink-v2-pink.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/gateron-box-ink-black-pink-switch-1-pack-35pcs",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["C", "G", "GATERON"],
                "comment": "Found in the second bag of the packaging.",
                "itemCost": "1.93 AUD",
                "sfCost": "1.85 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron Cap V2 (Golden Brown)"],
        "image": "gateron-cap-v2-golden-brown.jpg",
        "imageAcknowledgement": "https://allcaps.store/collections/linear-switches/products/gateron-cap-yellows-v2",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["5", "A", "GATERON"],
                "excerpt": "Meet Gateron CAP v2 Switches. Enlarged stem pole makes the switch stem more stable, reducing wobbliness and increasing switch thickness as well as stability. Based on the aerodynamic principle, 0.4mm tiny holes are added to the switch bottom housing to reduce resistance.",
                "listedName": "Gateron CAP Golden Brown v2 Switch (Tactile - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon 6/6 (PA)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.81 AUD",
                "sfCost": "0.37 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron Cap V2 (Golden Yellow)"],
        "image": "gateron-cap-v2-golden-yellow.jpg",
        "imageAcknowledgement": "https://allcaps.store/collections/linear-switches/products/gateron-cap-yellows-v2",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["L", "A", "GATERON"],
                "listedName": "Gateron Cap Yellow V2",
                "itemCost": "0.82 AUD",
                "sfCost": "0.15 AUD"
            },
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["I", "A", "GATERON"],
                "excerpt": "Linear switch with a travel distance of 2mm Actuation (4mm Bottom) and a force of 50g Operating (63g Bottom)",
                "listedName": "Gateron CAP Gold",
                "comment": "Found in the second bag of the packaging.<br>The stem colour is slightly less saturated than the ALL CAPS sample.<br>These may be different switches.",
                "itemCost": "1.09 AUD",
                "sfCost": "1.04 AUD"
            },
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["C", "A", "GATERON"],
                "excerpt": "Meet Gateron CAP v2 Switches. Gateron CAP Golden Yellow switches are an updated version of the classic with gold plated spring. The Gateron CAPs feature a unique stem and base layout as well as a longer spring. They are linears, just like the Gateron Yellows you know and love. They feature changes to increase smoothness as well as reduce wobble while still maintaining the signature look and sound of the original. Based on the aerodynamic principle, 0.4mm tiny holes are added to the switch bottom housing to reduce resistance.",
                "listedName": "Gateron CAP Golden Yellow v2 Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon 6/6 (PA)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.81 AUD",
                "sfCost": "0.37 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Cap V2 (Milky Yellow)"],
        "image": "gateron-cap-v2-milky-yellow.jpg",
        "imageAcknowledgement": "https://www.yong-qiu.com/id/products/gateron-cap-milky-yellow-v2-switch",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Visually very similar to Gateron KS-3 (Yellow), but has differences.\nThe Cap V2 has a hole at the end of the bottom housing stem pin, while the KS-3 doesn't have the hole. The Cap V2's top housing LED cutout is two wide slots, while the KS-3 has one shorter slot."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["5", "A", "GATERON"],
                "comment": "The underside labels are very hard to read.",
                "excerpt": "Meet Gateron CAP v2 Switches. Gateron CAP Milky Yellow switches are an updated version of the classic. The Gateron CAPs feature a unique stem and base layout as well as a longer spring. They are linears, just like the Gateron Yellows you know and love. They feature changes to increase smoothness as well as reduce wobble while still maintaining the signature look and sound of the original. Based on the aerodynamic principle, 0.4mm tiny holes are added to the switch bottom housing to reduce resistance.",
                "listedName": "Gateron CAP Milky Yellow v2 Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon 6/6 (PA)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.56 AUD",
                "sfCost": "0.26 AUD"
            }
        ]
    },
    {
        "name": ["Gateron China Joy", "Gateron CJ"],
        "image": "gateron-china-joy.jpg",
        "imageAcknowledgement": "https://cannonkeys.com/products/gateron-cj-linear-switch",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["M", "A", "GATERON"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear switch with a 50g actuation and 60g bottom.",
                "listedName": "Gateron ChinaJoy (CJ)",
                "itemCost": "1.36 AUD",
                "sfCost": "1.30 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Ink V2 (Red)"],
        "image": "gateron-ink-v2-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-ink-v2-red-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["F", "GATERON"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear switch with a travel distance of 2mm Actuation (4mm Bottom) and a force of 45g Operating (60g Bottom)",
                "listedName": "Gateron Ink v2 Red",
                "itemCost": "1.68 AUD",
                "sfCost": "1.60 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Ink V2 (Yellow)"],
        "image": "gateron-ink-v2-yellow.jpg",
        "imageAcknowledgement": "https://divinikey.com/products/gateron-ink-v2-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Interestingly has the dust jacket while the other inks (except the Kangaroo) don't."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["O", "GATERON"],
                "excerpt": "The Gateron INK switches feature a transparent colored housing and premium lineup of Gateron switches. This switch is very smooth and has little spring crunch. The v2's now have an upgraded housing that helps make the contact leaves more secure so do not fall out while turning the switches upside down.",
                "listedName": "Gateron INK v2 Yellow Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "60g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.4mm",
                    "Top Housing":      "- (No Data)",
                    "Stem":             "POM",
                    "Bottom Housing":   "- (No Data)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.17 AUD",
                "sfCost": "0.53 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Ink V2 (Black)"],
        "cosmeticVariant": "(Standard version)",
        "image": "gateron-ink-v2-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/gateron-ink-v2-black-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["C", "E", "GATERON"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear switch with a travel distance of 2mm Actuation (4mm Bottom) and a force of 60g Operating (70g Bottom)",
                "listedName": "Gateron Ink v2 Black",
                "itemCost": "1.69 AUD",
                "sfCost": "1.62 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Ink V2 (Black)"],
        "cosmeticVariant": "Baltic Edition",
        "image": "gateron-ink-v2-black-baltic-edition.jpg",
        "imageAcknowledgement": "https://mekibo.com/products/gateron-inks-baltic-edition",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["K", "GATERON"],
                "excerpt": "Introducing the most perfect switch to run alongside the GMK Baltic - Gateron Inks v2 Black in Baltic colorway!",
                "listedName": "Gateron INK v2 Black Baltic Edition Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "70g",
                    "Actuation Force":  "60g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "- (No Data)",
                    "Stem":             "POM - RAL 090 80 90",
                    "Bottom Housing":   "- (No Data)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.35 AUD",
                "sfCost": "0.61 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Ink V2 (Blue)"],
        "image": "gateron-ink-v2-blue.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/gateron-ink-v2-blue-tactile-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["M", "GATERON"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Clicky, 60g operating, 75g Bottom, PCB mount",
                "listedName": "Gateron Ink V2 Blue",
                "itemCost": "1.66 AUD",
                "sfCost": "1.59 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Ink V2 (Kangaroo)"],
        "image": "gateron-ink-v2-kangaroo.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/gateron-kangaroo-switch-rgb-tactile-59g-63g-switches-for-mechanical-keyboard-mx-stem-5pin-orange-transparent-body-green",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Interestingly has the dust jacket while the other inks (except the Yellow) don't."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["N", "GATERON"],
                "excerpt": "The Gateron INK switches feature a transparent colored housing and premium lineup of Gateron switches. This switch is very smooth and has little spring crunch. The v2's now have an upgraded housing that helps make the contact leaves more secure so do not fall out while turning the switches upside down.",
                "listedName": "Gateron INK v2 Kangaroo Switch (Tactile 63g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "63g",
                    "Actuation Travel": "1.5mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "- (No Data)",
                    "Stem":             "POM",
                    "Bottom Housing":   "- (No Data)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.35 AUD",
                "sfCost": "0.61 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Mochi"],
        "image": "gateron-mochi.jpg",
        "imageAcknowledgement": "https://geekhack.org/index.php?topic=111958.0",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["1", "F"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear switch with a 63.5g spring. A Gateron KS-3 recolour.",
                "listedName": "Gateron Mochi",
                "itemCost": "1.07 AUD",
                "sfCost": "1.02 AUD"
            }
        ]
    },
    {
        "name": ["Gateron Oil King"],
        "image": "gateron-oil-king.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/gateron-oil-king-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["D", "M", "GATERON"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear switch with 20mm spring, 55g actuation/80g bottom out",
                "listedName": "Gateron Oil King",
                "itemCost": "1.47 AUD",
                "sfCost": "1.40 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Gateron Phantom Brown"],
        "image": "gateron-phantom-brown.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["E", "I"],
                "excerpt": "Gateron Phantom Brown switch from Keychron. Most likely part of the Gateron Pro series of switches since they are prelubed.",
                "listedName": "Gateron Phantom Brown",
                "listedSpecs": {
                    "Actuation Force": "55g",
                    "Actuation": "2.0mm",
                    "Bottom Out": "4.0mm"
                }
            }
        ]
    },
    {
        "name": ["Gateron Pink"],
        "image": "gateron-pink.jpg",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["G", "9"],
                "excerpt": "Manufactured by Gateron, custom colored pink housing and a 65g linear spring. This Gateron Pink switch come with milky white tops and pink bottoms.",
                "listedName": "Gateron Pink Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "65g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate/Nylon",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    }
],[
    {
        "name": ["Gazzew Bobagum (62g)"],
        "cosmeticVariant": "Opaque Top",
        "image": "gazzew-bobagum.jpg",
        "imageAcknowledgement": "https://www.amazon.co.uk/Gazzew-Silent-Bobagum-Mechanical-Keyboard/dp/B09132K99D",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "C"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Silent Linear, Pink, 62g spring, PCB mount",
                "listedName": "Gazzew Bobagum",
                "itemCost": "1.48 AUD",
                "sfCost": "1.41 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Bobagum (52g)"],
        "cosmeticVariant": "Clear Top",
        "image": "gazzew-bobagum-clear-top.jpg",
        "imageAcknowledgement": "https://www.lazada.com.ph/products/gazzew-boba-gum-pink-silent-linear-bobagum-rgb-for-mechanical-keyboard-custom-switch-5pin-52g-62g-68g-bottom-i2908245923.html",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5,
            "additionalIDNotes": "(See notes for the 68g variant.)"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "A"],
                "excerpt": "The GAZZEW Bobagum Pink RGB is the same as the GAZZEW Bobagum Pink silent linear but the RGB edition has a clear top housing to maximize the LED light effect of RGB equipped boards. It is also a silent linear type of switch composed of a new plastic material base that is comparatively softer than the regular Nylon PA66 material, but is very smooth and has the same good characteristics as the polycarbonate material, which makes it really durable and very effective, it also has a higher melting point than the Polycarbonate material. These Bobagum switches feature GAZZEW's signature no-wobble tops, a smooth travel, and a silent bottom out. The leaf design was also specifically engineered to reduce leaf ping, which is also the same for its high-quality Korean made Stainless-Steel springs. A must for any linear-lover that wants to keep the noise to a minimum.",
                "listedName": "GAZZEW Bobagum RGB Switch (Silent Linear 52g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "52g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "Proprietary Blend",
                    "Bottom Housing":   "Proprietary Blend",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "Found packaged in its own individual zip bag.",
                "itemCost": "0.98 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Bobagum (68g)"],
        "cosmeticVariant": "Clear Top",
        "image": "gazzew-bobagum-clear-top.jpg",
        "imageAcknowledgement": "https://www.lazada.com.ph/products/gazzew-boba-gum-pink-silent-linear-bobagum-rgb-for-mechanical-keyboard-custom-switch-5pin-52g-62g-68g-bottom-i2908245923.html",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5,
            "additionalIDNotes": "Comparing the 68g and 52g, force is noticeably stronger with the 68g. Or, just push the stems together and the 68g should \"win\"."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "A"],
                "excerpt": "[similar to the 52g version]",
                "listedName": "GAZZEW Bobagum RGB Switch (Silent Linear 68g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "68g"
                },
                "comment": "Found packaged in its own individual zip bag.\nIdentical underside labels to the 52g, but the 68g's top housing has a small hard-to-read label \"1-14\" around the SMD cutout. The 52g doesn't have a similarly-placed label.",
                "itemCost": "0.98 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Boba LT (55g)"],
        "image": "gazzew-boba-lt.jpg",
        "imageAcknowledgement": "https://loobedswitches.com/products/lubed-gazzew-boba-lt",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "A"],
                "excerpt": "GAZZEW's latest linear switch, the Boba LT. The \"LT\" in the switch's name stands for Linear Thocky, so if you want a linear switch with a thocky sound profile, this may be right up your alley. What lends to the Boba LT's thocky sound profile is its long stem pole. This is similar to GAZZEW's other (very popular) Boba U4T Thocky switches. The Boba LT composed of a new plastic material that is comparatively softer than the regular Nylon PA66 material, but is very smooth and has the same good characteristics as the polycarbonate material, which makes it really durable and very effective, it also has a higher melting point than the polycarbonate material. These Boba LT switches feature GAZZEW's signature no-wobble tops, a smooth travel, and a silent bottom out. The leaf design was also specifically engineered to reduce leaf ping, which is also the same for its high-quality Korean made Stainless-Steel springs. The linear endgame to end all linear endgame.",
                "listedName": "GAZZEW Boba LT Thocky Switch (Linear 55g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "55g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Proprietary Blend",
                    "Stem":             "Proprietary Blend",
                    "Bottom Housing":   "Proprietary Blend",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "Found packaged in its own individual zip bag.",
                "itemCost": "0.99 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Boba LT (65g)"],
        "image": "gazzew-boba-lt.jpg",
        "imageAcknowledgement": "https://loobedswitches.com/products/lubed-gazzew-boba-lt",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "B"],
                "excerpt": "[similar to the 55g version]",
                "listedName": "GAZZEW Boba LT Thocky Switch (Linear 65g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "65g"
                },
                "comment": "Found packaged in its own individual zip bag.",
                "itemCost": "0.99 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Boba U4 (62g)"],
        "cosmeticVariant": "Opaque Top",
        "image": "gazzew-boba-u4-opaque-top.jpg",
        "imageAcknowledgement": "https://dailyclack.com/products/gazzew-boba-u4-silent-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "F"],
                "excerpt": "GAZZEW Boba U4 silent tactile switches are a new switch with a large, smooth \"D\" shaped tactile bump with no pre-travel. The pearl white base is made of a new plastic that is softer than regular nylon with the benefits of polycarbonate (PC). The top housing is designed to reduce wobble and they feature a universal base designed to work with PCB mounted RGBs and all in switch LEDs. The leaf is designed to increase tactility while reducing ping through the use of new materials. These switches also come with Korean-made stainless springs designed to have minimal ping, giving you a nearly silent typing experience.",
                "listedName": "GAZZEW Boba U4 Switch (Silent Tactile 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Proprietary Blend",
                    "Stem":             "Proprietary Blend",
                    "Bottom Housing":   "Proprietary Blend",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.08 AUD",
                "sfCost": "0.49 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Boba U4 (68g)"],
        "cosmeticVariant": "Opaque Top",
        "image": "gazzew-boba-u4-opaque-top.jpg",
        "imageAcknowledgement": "https://dailyclack.com/products/gazzew-boba-u4-silent-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "E"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 62g version]",
                "listedName": "GAZZEW Boba U4 Switch (Silent Tactile 68g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "68g"
                },
                "itemCost": "1.08 AUD",
                "sfCost": "0.49 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Boba U4 (62g)"],
        "cosmeticVariant": "Clear Top",
        "image": "gazzew-boba-u4-clear-top.jpg",
        "imageAcknowledgement": "https://www.ubuy.co.in/product/4XGJE3MZ8-gazzew-boba-u4-switch-silent-tactile-5pin-62g-68g-keyswitch-with-white-rgb-version-for-customization-mechanical-gaming-keyboard-color-u4-62g",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "C"],
                "excerpt": "The GAZZEW Boba U4 RGB silent tactile is a variant of the GAZZEW Boba U4 that comes with a clear top housing material instead of the pearl white top housing of the regular Boba U4. It is specifically designed to complement LED RGB set-ups with its clear top housing, allowing the LED light to pass thru and be diffused better for stronger illumination. It also comes with the pearl white bottom housing that is made out of a new plastic material that is comparatively softer than that of the regular Nylon PA66 material, but it is still very smooth and has the same good characteristics of the polycarbonate material, it also has a higher melting point than the polycarbonate material. It shares the same silent sactile feature and the tight fit configuration as the regular Boba U4, at the same time, its internal configuration also has the smooth \"D\" shaped bump. Basically, this is virtually the same as the GAZZEW Boba U4, the only difference is the clear top housing.",
                "listedName": "GAZZEW Boba U4 RGB Switch (Silent Tactile 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "Proprietary Blend",
                    "Bottom Housing":   "Proprietary Blend",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.08 AUD",
                "sfCost": "0.49 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Boba U4T (62g)"],
        "cosmeticVariant": "Opaque Top",
        "image": "gazzew-boba-u4t-opaque-top.jpg",
        "imageAcknowledgement": "https://splitkb.com/products/gazzew-boba-u4t-thocky-tactile-switch",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 Custom-KBD-AU",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "C"],
                "excerpt": "TODO",
                "listedName": "Boba U4T Tactile Switches (62G Opaque Top)",
                "itemCost": "0.84 AUD",
                "sfCost": "0.20 AUD"
            }
        ]
    },
    {
        "name": ["Gazzew Boba U4T (68g)"],
        "cosmeticVariant": "Opaque Top",
        "image": "gazzew-boba-u4t-opaque-top.jpg",
        "imageAcknowledgement": "https://splitkb.com/products/gazzew-boba-u4t-thocky-tactile-switch",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GAZZEW",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "D"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile with longer stem poll and 68g spring",
                "listedName": "Gazzew Boba U4t (or U4t rgb)",
                "itemCost": "1.48 AUD",
                "sfCost": "1.41 AUD"
            }
        ]
    }
],[
    {
        "name": ["Glorious Lynx"],
        "image": "glorious-lynx.jpg",
        "imageAcknowledgement": "https://divinikey.com/products/glorious-lynx-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "GLORIOUS",
            "pins": 5,
            "additionalIDNotes": "My Lynx sample really is 5-pin while the Panda is 3-pin. That wasn't a typo."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["8"],
                "excerpt": "Linear switch with 60g bottom, PCB mount",
                "listedName": "Glorious Lynx",
                "comment": "Found in the second bag of the packaging.\nTop housing has a label \"13\" near the SMD cutout.",
                "itemCost": "1.58 AUD",
                "sfCost": "1.51 AUD"
            }
        ]
    },
    {
        "name": ["Glorious Panda"],
        "image": "glorious-panda.jpg",
        "imageAcknowledgement": "https://candykeys.com/product/glorious-panda-switches-36-switch-pack",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GLORIOUS",
            "additionalIDNotes": "In-person, the stem is a more saturated colour than the photo, and the housing is noticeably off-white."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["10"],
                "excerpt": "Tactile switch, 67g",
                "listedName": "Glorious Panda",
                "comment": "Found in the first bag of the packaging.\nTop housing has a label \"13\" near the SMD cutout.",
                "itemCost": "1.58 AUD",
                "sfCost": "1.51 AUD"
            }
        ]
    }
],[
    {
        "name": ["GoPolar Azure Dragon"],
        "image": "gopolar-azure-dragon.jpg",
        "imageAcknowledgement": "https://divinikey.com/products/gopolar-azure-dragon-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["B", "C", "C"],
                "excerpt": "Tactile switch with two stage 67g spring",
                "listedName": "Azure Dragon",
                "comment": "Found in the first bag of the packaging.<br>One of the \"C\"'s on the underside labels is upside down relative to the other letters.",
                "itemCost": "1.46 AUD",
                "sfCost": "1.41 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Greetech GT02 (Red)"],
        "cosmeticVariant": "SMD",
        "image": "greetech-gt02-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "GREETECH"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["H", "GREETECH"],
                "excerpt": "Greetech GT02 series is a series of Cherry MX clone switches from Greetech Electronics. This Greetech switch come with clear tops, white bottoms, and SMD LED compatible.",
                "listedName": "Greetech GT02 Red SMD RGB Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.33 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Greetech GT02 (Black)"],
        "cosmeticVariant": "SMD",
        "image": "greetech-gt02-black.jpg",
        "cosmeticFeatures": {
            "topLabel": "GREETECH"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["E", "GREETECH"],
                "excerpt": "Greetech GT02 series is a series of Cherry MX clone switches from Greetech Electronics. This Greetech switch come with clear tops, white bottoms, and SMD LED compatible.",
                "listedName": "Greetech GT02 Black SMD RGB Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "60g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "The top of the \"E\" underside label is slightly cut off.",
                "itemCost": "0.33 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Greetech GT02 (Brown)"],
        "cosmeticVariant": "SMD",
        "image": "greetech-gt02-brown.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "GREETECH"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["V", "GREETECH"],
                "excerpt": "Greetech GT02 series is a series of Cherry MX clone switches from Greetech Electronics. This Greetech switch come with clear tops, white bottoms, and SMD LED compatible.",
                "listedName": "Greetech GT02 Brown SMD RGB Switch (Tactile - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "The \"V\" underside label is slightly ambiguous. I read it from the orientation of LED side facing up.",
                "itemCost": "0.33 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Greetech GT02 (Blue)"],
        "cosmeticVariant": "SMD",
        "image": "greetech-gt02-blue.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GREETECH"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["G", "GREETECH"],
                "excerpt": "Greetech GT02 series is a series of Cherry MX clone switches from Greetech Electronics. This Greetech switch come with clear tops, white bottoms, and SMD LED compatible.",
                "listedName": "Greetech GT02 Blue SMD RGB Switch (Tactile Click - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "The top of the \"G\" underside label is slightly cut off.",
                "itemCost": "0.33 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Greetech GT02 (Green)"],
        "cosmeticVariant": "SMD",
        "image": "greetech-gt02-green.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "GREETECH"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["GREETECH"],
                "excerpt": "Greetech GT02 series is a series of Cherry MX clone switches from Greetech Electronics. This Greetech switch come with clear tops, white bottoms, and SMD LED compatible. Note : GT02 Green specifications same as GT02 Blue, the only difference is stem color.",
                "listedName": "Greetech GT02 Green SMD RGB Switch (Tactile Click - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "No visible single-letter label on the underside. However, around the same place as the other Greetech switches, there are bumps. Remnants of what should've been an \"S\"?",
                "itemCost": "0.33 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    }
],[
    {
        "name": ["HHHH H1"],
        "image": "hhhh-h1.jpg",
        "imageAcknowledgement": "https://divinikey.com/products/hhhh-h1-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["G"],
                "excerpt": "These are the legendary H1 linear switches, manufactured by JWK. H1 switches are designed by Quad H (HHHH) from Korea as a modern take on the vintage Cherry MX Blacks. These popular switches have attracted many enthusiasts for their smoothness and deeper sound signature. H1 switches are not just another a JWK recolor; special materials are added into the black housing, which greatly increases the smoothness.",
                "listedName": "JWK / HHHH H1 Switch (Linear 78g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "78g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polyamide",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.07 AUD",
                "sfCost": "0.48 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Huano Red"],
        "image": "huano-red.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/huano-swirl.png"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["7", "22"],
                "excerpt": "There is nothing special about these Huano switches as far as their function or quality, they just all have different nameplates. It was interesting to me as a collector so maybe it's interesting to you too.\n\nRed has a swirl for the logo on the nameplate, from my understanding this is largely an older Huano logo\n\nHuano plays fast and loose with their switch nameplates, these are all sold as \"Huano\" as were the Firstblood Chocolate switches when I got them. If you ask they say it's all the same.",
                "listedName": "Huano Nameplate Pack"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Huano Black"],
        "image": "huano-black.jpg",
        "cosmeticFeatures": {
            "topLabel": "HUANO"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["7", "14"],
                "excerpt": "There is nothing special about these Huano switches as far as their function or quality, they just all have different nameplates. It was interesting to me as a collector so maybe it's interesting to you too.\n\nBlack has a standard Huano nameplate\n\nHuano plays fast and loose with their switch nameplates, these are all sold as \"Huano\" as were the Firstblood Chocolate switches when I got them. If you ask they say it's all the same.",
                "listedName": "Huano Nameplate Pack"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Huano Brown"],
        "image": "huano-brown.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AJAZZ"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["4", "16"],
                "excerpt": "There is nothing special about these Huano switches as far as their function or quality, they just all have different nameplates. It was interesting to me as a collector so maybe it's interesting to you too.\n\nBrown is actually Ajazz on the nameplate\n\nHuano plays fast and loose with their switch nameplates, these are all sold as \"Huano\" as were the Firstblood Chocolate switches when I got them. If you ask they say it's all the same.",
                "listedName": "Huano Nameplate Pack"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Huano Dustproof Pink"],
        "image": "huano-dustproof-pink.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/huano-swirl.png"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["9", "M", "7"],
                "excerpt": "Dustproof clicky pink from Huano, with their older swirl logo and a grey bottom that is usually reserved for prebuilt boards",
                "listedName": "Huano Dustproof Pink - Grey Bottom - Swirl Logo"
            }
        ]
    }
],[
    {
        "name": ["Huano Banana"],
        "image": "ajazz-x-huano-banana.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "AJAZZ"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["05", "3"],
                "excerpt": "The AJAZZ Banana switch is a Tactile switch from AJAZZ x Huano that is made of a bright yellow Nylon base, yellow transparent PC top with a white long pole Nylon stem. AJAZZ Diced Fruit switches are equipped with north-facing LED slot for LED modification. It is also compatible with SMD LED. This provides more fun feature and options for those who are DIYers. With a lifespan of approximate 80 million times of keystrokes based on laboratory durability test, you may rest assured with the long lifespan.",
                "listedName": "AJAZZ x Huano Banana Switch (Tactile - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "50g",
                    "Actuation Force":  "40g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.3mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "Nylon",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.50 AUD",
                "sfCost": "0.23 AUD"
            }
        ]
    },
    {
        "name": ["Huano Peach"],
        "image": "ajazz-x-huano-peach.jpg",
        "cosmeticFeatures": {
            "topLabel": "AJAZZ"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["A", "5"],
                "excerpt": "The AJAZZ Peach switch is a linear switch from AJAZZ x Huano that is made of a translucent peach colored top and bottom housing with a very light pink stem. AJAZZ Diced Fruit switches are equipped with north-facing LED slot for LED modification. It is also compatible with SMD LED. This provides more fun feature and options for those who are DIYers. With a lifespan of approximate 80 million times of keystrokes based on laboratory durability test, you may rest assured with the long lifespan.",
                "listedName": "AJAZZ x Huano Peach Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "50g",
                    "Actuation Force":  "40g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "The \"A\" underside label is interestingly found under the stem pin.",
                "itemCost": "0.50 AUD",
                "sfCost": "0.23 AUD"
            }
        ]
    }
],[
    {
        "name": ["Infinity Key Cow (POM Stem)", "IFK Cow (POM Stem)"],
        "image": "ifk-cow-pom-stem.jpg",
        "imageAcknowledgement": "https://allcaps.store/products/ifk-cow",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "comment": "I don't see an underside mold label.",
                "listedName": "IFK Cow POM",
                "itemCost": "1.11 AUD",
                "sfCost": "0.20 AUD"
            }
        ]
    },
    {
        "name": ["Infinity Key Cow (UHMWPE Stem)", "IFK Cow (UHMWPE Stem)"],
        "image": "ifk-cow-uhmwpe-stem.jpg",
        "imageAcknowledgement": "https://allcaps.store/products/ifk-cow",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "comment": "I don't see an underside mold label.",
                "listedName": "IFK Cow UHMWPE",
                "itemCost": "1.11 AUD",
                "sfCost": "0.20 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Invyr Holy Panda"],
        "image": "massdrop-invyr-holy-panda.jpg",
        "imageAcknowledgement": "https://www.theremingoat.com/blog/holy-panda-x-switch-review",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "INVYR",
            "additionalIDNotes": "Housing is an off-white colour (both bottom and top housing)."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["7"],
                "excerpt": "The most tactile switches in the world ?. INVYR Holy Panda, comes with the original INVYR panda housing and POM Halo style stem. Holy Panda switches combine the best of two worlds. The result is a snappy, tactile switch that is satisfying to type on. As the original tooling of INVYR, the switches are unlubed.",
                "listedName": "INVYR Holy Panda Switch (Tactile - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "68g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Unlubed (No Factory Lube)"
                },
                "comment": "Top housing has a label \"45\" near the SMD cutout.\nThe store page claims these were made with the original Invyr tooling, and doesn't mention Drop anywhere. I'm inclined to believe it for now, and I've marked it as \"unverified\" while I figure it out the history of Invyr Holy Pandas and where my samples fit into it.\nTechnically, I actually bought a total of 3 Invyr Holy Pandas from this store. One is kept in my sample collection, the other two are kept in my extras box. One sample has underside label \"17\" and near-SMD label \"5\" while the other has underside label \"27\" and near-SMD label \"45\".",
                "itemCost": "1.84 AUD",
                "sfCost": "0.84 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Jerrzi Brown"],
        "image": "jerrzi-brown.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "JERRZI"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["7", "22"],
                "excerpt": "A weird switch with a cool name. I had to buy a whole board to get ahold of these, which is why they are a bit more expensive. Otherwise their mold markings are not a perfect match for anything else in my collection, but if I was going to guess it is probably some version of Outemu. Otherwise it's just a brown switch, it's main draw is its obscurity since the board is even shown as coming with Huano switches instead of these.",
                "listedName": "Jerrzi Brown"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Joininkeys Epsilon"],
        "image": "joininkeys-epsilon.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Visually identical to the Joininkeys Sunsets."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["05"],
                "excerpt": "These are JoininKeys Epsilon switches; full nylon housing, manufactured by JWK. These are a linear switch in a 16-1364TCX VIBRANT ORANGE PANTONE colorway with a 68g gold plated progressive spring. JoininKeys Epsilon switches are lightly factory lubed with JWK's P3 stem (a proprietary UHMWPE blend from JWK, same stem from their Durock POM linear switches). This switch will have a nice, smooth, bouncy feeling when typing and a very pleasing sound signature.",
                "listedName": "JWK / JoininKeys Epsilon Switch (Linear 68g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "68g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon - PANTONE 16-1364TCX",
                    "Stem":             "P3",
                    "Bottom Housing":   "Nylon - PANTONE 16-1364TCX",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "Underside label is viewed with the LED side facing down.",
                "itemCost": "1.07 AUD",
                "sfCost": "0.48 AUD"
            }
        ]
    },
    {
        "name": ["Joininkeys Matcha"],
        "image": "joininkeys-matcha.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005002338942796.html",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5,
            "additionalIDNotes": "The top housing is very obviously off-white, while the bottom housing is much whiter."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["01"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear switch, 68g with long 20mm spring",
                "listedName": "Joininkeys Matcha",
                "itemCost": "1.36 AUD",
                "sfCost": "1.31 AUD"
            },
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["03"],
                "excerpt": "These are JoininKeys Matcha switches, manufactured by JWK. These are a linear switch in a nice cream and matcha green colorway with a 68g gold plated symmetric long spring (also known as \"slow\" spring). JoininKeys Matcha switches are lightly factory lubed.",
                "listedName": "JWK / JoininKeys Matcha Switch (Linear 68g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "68g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.02 AUD",
                "sfCost": "0.46 AUD"
            }
        ]
    },
    {
        "name": ["Joininkeys Prince"],
        "image": "joininkeys-prince.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["C"],
                "excerpt": "These are JoininKeys Prince switches, manufactured by JWK. These are a tactile switch in a nice midnight dark blue colorway with a 69g gold plated symmetric long spring (also known as \"slow\" spring). JoininKeys Prince switches are lightly factory lubed.",
                "listedName": "JWK / JoininKeys Prince Switch (Tactile 69g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "69g",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.02 AUD",
                "sfCost": "0.46 AUD"
            }
        ]
    },
    {
        "name": ["Joininkeys Sunset (58g)"],
        "image": "joininkeys-sunset.jpg",
        "imageAcknowledgement": "https://www.facebook.com/prevailkeyco/posts/new-in-stock-drop-for-yall-based-on-joininkeys-new-sunset-switches-we-worked-wit/349473973553618/",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5,
            "additionalIDNotes": "Visually identical to the Joininkeys Epsilon."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["02"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "These are JoininKeys Sunset switches; use the same type of material as the Alpaca, manufactured by JWK. These are a linear switch in a 16-1364TCX VIBRANT ORANGE PANTONE colorway with a 63.5g gold plated symmetric long spring (also known as \"slow\" spring). JoininKeys Sunset switches are lightly factory lubed with JWK's P3 stem (a proprietary UHMWPE blend from JWK, same stem from their Durock POM linear switches).",
                "listedName": "JWK / JoininKeys Sunset Switch (Linear 58g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "58g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC) - PANTONE 16-1364TCX",
                    "Stem":             "P3",
                    "Bottom Housing":   "Nylon - PANTONE 16-1364TCX",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.02 AUD",
                "sfCost": "0.46 AUD"
            }
        ]
    },
    {
        "name": ["Joininkeys Sunset (63.5g)"],
        "image": "joininkeys-sunset.jpg",
        "imageAcknowledgement": "https://www.facebook.com/prevailkeyco/posts/new-in-stock-drop-for-yall-based-on-joininkeys-new-sunset-switches-we-worked-wit/349473973553618/",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5,
            "additionalIDNotes": "Visually identical to the Joininkeys Epsilon."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["01"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 58g version]",
                "listedName": "JWK / JoininKeys Sunset Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g"
                },
                "itemCost": "1.02 AUD",
                "sfCost": "0.46 AUD"
            }
        ]
    }
],[
    {
        "name": ["Jwick Black"],
        "image": "jwick-black.jpg",
        "cosmeticFeatures": {
            "topLabel": "JWICK",
            "smd": "no",
            "pins": 5,
            "additionalIDNotes": "Visually very similar to the Jwick Ultimate Black with opaque top. Jwick Black has no LED cutout whereas Jwick Ultimate Black does. Also, the Jwick Ultimate Black with opaque top has a very similar bottom to the Jwick Ultimate Black with smokey top, whereas Jwick Black is dissimilar to both."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["39"],
                "excerpt": "These are JWICK switches, manufactured by JWK. JWICK is the English name for Dongguan Jingweike (\u7cbe\u5fae\u79d1) Electronic Technology Co., Ltd. JWICK switches are lightly factory lubed and using the newest JWK v2 molds. It is very durable and good quality switch and at the same time, JWICK switches very affordable and budget friendly.",
                "listedName": "JWK / JWICK Black Switch (Linear 58.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "58.5g",
                    "Actuation Force":  "42g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.38 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Jwick Red"],
        "image": "jwick-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "JWICK",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Clear top, milky bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["09"],
                "excerpt": "These are JWICK switches, manufactured by JWK. JWICK is the English name for Dongguan Jingweike (\u7cbe\u5fae\u79d1) Electronic Technology Co., Ltd. JWICK switches are lightly factory lubed and using the newest JWK v2 molds. It is very durable and good quality switch and at the same time, JWICK switches very affordable and budget friendly.",
                "listedName": "JWK / JWICK Red Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.38 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Jwick T1"],
        "cosmeticVariant": "Clear Top",
        "image": "jwick-t1.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "JWICK",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["01"],
                "excerpt": "These are JWICK switches, manufactured by JWK. JWICK is the English name for Dongguan Jingweike (\u7cbe\u5fae\u79d1) Electronic Technology Co., Ltd. JWICK switches are lightly factory lubed and using the newest JWK v2 molds. It is very durable and good quality switch and at the same time, JWICK T1 tactile switch brings you that mid-tactile bump at a much more affordable price point. There were a malicious clone attempt happened a while ago, and to differentiate from the clone unit, the switch will feature a JWICK logo. We are the only JWK authorized Indonesian vendor for this switch currently.",
                "listedName": "JWK / JWICK Clear Black T1 Switch (Tactile 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.43 AUD",
                "sfCost": "0.20 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Jwick Ultimate Black"],
        "cosmeticVariant": "Opaque Top",
        "image": "jwick-black-ultimate-opaque-top.jpg",
        "cosmeticFeatures": {
            "topLabel": "JWICK",
            "pins": 5,
            "additionalIDNotes": "Visually very similar to the Jwick Black with opaque top. (See Jwick Black for more notes on this.)"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["E74"],
                "excerpt": "These are JWICK switches, manufactured by JWK. JWICK is the English name for Dongguan Jingweike (\u7cbe\u5fae\u79d1) Electronic Technology Co., Ltd. JWICK Ultimate feature new molds and some special additives to the top and bottom housing materials that are designed to optimize the bottoming out and topping out sounds. JWICK Ultimate has deeper a.k.a. \"thocky\" sound profile compare to the regular one. It is very durable and good quality switch and at the same time, JWICK switches very affordable and budget friendly.",
                "listedName": "JWK / JWICK Ultimate Black Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.43 AUD",
                "sfCost": "0.20 AUD"
            }
        ]
    },
    {
        "name": ["Jwick Ultimate Black"],
        "cosmeticVariant": "Smokey Top",
        "image": "jwick-ultimate-black-smokey-top.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005003484614715.html",
        "cosmeticFeatures": {
            "topLabel": "JWICK",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["B73"],
                "excerpt": "These are JWICK switches, manufactured by JWK. JWICK is the English name for Dongguan Jingweike (\u7cbe\u5fae\u79d1) Electronic Technology Co., Ltd. JWICK Ultimate feature new molds and some special additives to the top and bottom housing materials that are designed to optimize the bottoming out and topping out sounds. JWICK Ultimate has deeper a.k.a. \"thocky\" sound profile compare to the regular one. It is very durable and good quality switch and at the same time, JWICK switches very affordable and budget friendly.",
                "listedName": "JWK / JWICK Ultimate Black Smokey Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "It's very hard to read the underside label. The \"3\" could be a \"9\", and the \"7\" is very faded, a",
                "itemCost": "0.43 AUD",
                "sfCost": "0.20 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Jwick White"],
        "image": "jwick-white.jpg",
        "cosmeticFeatures": {
            "topLabel": "JWICK",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Clear top, milky bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["07"],
                "excerpt": "These are JWICK switches, manufactured by JWK. JWICK is the English name for Dongguan Jingweike (\u7cbe\u5fae\u79d1) Electronic Technology Co., Ltd. JWICK switches are lightly factory lubed and using the newest JWK v2 molds. It is very durable and good quality switch and at the same time, JWICK switches very affordable and budget friendly.",
                "listedName": "JWK / JWICK White Switch (Linear 45g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "45g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.38 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Jwick Yellow"],
        "image": "jwick-yellow.jpg",
        "cosmeticFeatures": {
            "topLabel": "JWICK",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Clear top, milky bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["18"],
                "excerpt": "These are JWICK switches, manufactured by JWK. JWICK is the English name for Dongguan Jingweike (\u7cbe\u5fae\u79d1) Electronic Technology Co., Ltd. JWICK switches are lightly factory lubed and using the newest JWK v2 molds. It is very durable and good quality switch and at the same time, JWICK switches very affordable and budget friendly.",
                "listedName": "JWK / JWICK Yellow Switch (Linear 65g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "65g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.38 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["JWK Space Blue"],
        "image": "jwk-space-blue.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "Smokey top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["G"],
                "excerpt": "These are Space Blue switches, manufactured by JWK. These are a linear switch in a smokey housing with navy blue stem (using the same stem color on JWK Cobalt) and a 48g gold plated symmetric long spring (also known as \"slow\" spring). JWK Space Blue switches are lightly factory lubed.",
                "listedName": "JWK Space Blue Switch (Linear 48g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "48g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "Proprietary Blend",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.02 AUD",
                "sfCost": "0.46 AUD"
            }
        ]
    }
],[
    {
        "name": ["Kaihua Halo True"],
        "image": "kaihua-halo-true.jpg",
        "imageAcknowledgement": "https://canadianbestseller.com/pd/drop-massdrop-halo-true-keyboard-switches-plate-mounted-tactile-65g-cherry-style-quiet-switches-manufacturered-by-kaihua-halo-true-90-pack/",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "smd": "transparent"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["N1"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile switch with peak force of 60gf and 54gf actuation",
                "listedName": "Kaihua Halo True",
                "itemCost": "1.26 AUD",
                "sfCost": "1.21 AUD"
            }
        ]
    }
],[
    {
        "name": ["Kailh Black"],
        "image": "kailh-black.jpg",
        "imageAcknowledgement": "https://allcaps.store/collections/linear-switches/products/kailh-blacks",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "smd": "no"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["P", "+", "-", "15"],
                "listedName": "Kailh Black",
                "itemCost": "0.48 AUD",
                "sfCost": "0.09 AUD"
            }
        ]
    }
],[
    {
        "name": ["Kailh Box (Red)"],
        "image": "kailh-box-red.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-box-red-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["2a", "A"],
                "itemCost": "0.57 AUD",
                "sfCost": "0.11 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Black)"],
        "image": "kailh-box-black.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-box-black-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["J", "5"],
                "comment": "The \"J\" is very faint.<br>Might've misread.",
                "itemCost": "0.57 AUD",
                "sfCost": "0.11 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Brown)"],
        "image": "kailh-box-brown.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-box-brown-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["2b", "6"],
                "itemCost": "0.57 AUD",
                "sfCost": "0.11 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (White)"],
        "image": "kailh-box-white.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-box-white-clicky-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["A", "5"],
                "itemCost": "0.57 AUD",
                "sfCost": "0.11 AUD"
            },
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["2P", "1"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Clicky, 50g operating, 55g Bottom, Plate mount",
                "listedName": "Kailh BOX White",
                "itemCost": "0.68 AUD",
                "sfCost": "0.65 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Silent Brown)"],
        "image": "kailh-box-silent-brown.jpg",
        "imageAcknowledgement": "https://www.maxgaming.com/en/switches/box-silent-brown-switch",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["21", "6"],
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Kailh BOX Silent switches offer gentle bottom-out and quiet operation due to an internal shock absorbing system, which reduces keystroke impacts. Created with a rounded box around the cross stem instead of the cross stem just sticking up, they're built to avoid corrosion and debris buildup. The box extends to the contact plate and leaf, providing extra protection.",
                "listedName": "Kailh BOX Silent Brown Switch (Silent Tactile - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "57g",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Silent Pink)"],
        "image": "kailh-box-silent-pink.jpg",
        "imageAcknowledgement": "https://www.maxgaming.com/en/switches/box-silent-pink-switch",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["C", "4"],
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Kailh BOX Silent switches offer gentle bottom-out and quiet operation due to an internal shock absorbing system, which reduces keystroke impacts. Created with a rounded box around the cross stem instead of the cross stem just sticking up, they're built to avoid corrosion and debris buildup. The box extends to the contact plate and leaf, providing extra protection.",
                "listedName": "Kailh BOX Silent Pink Switch (Silent Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "45g",
                    "Actuation Force":  "35g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    }
],[
    {
        "name": ["Kailh Box (Ancient Gray)"],
        "image": "kailh-box-ancient-gray.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/32998496313.html",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["2A", "3"],
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Created with a box around the cross stem instead of the cross stem just sticking up, they're built to avoid corrosion and debris buildup. The box extends to the contact plate and leaf, providing extra protection. This version of the switches is heavier than before for those who prefer a little more effort in their keypresses.",
                "listedName": "Kailh BOX Ancient Gray Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "100g",
                    "Actuation Force":  "95g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.59 AUD",
                "sfCost": "0.27 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Chinese Red)"],
        "image": "kailh-box-chinese-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["C", "3"],
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Created with a box around the cross stem instead of the cross stem just sticking up, they're built to avoid corrosion and debris buildup. The box extends to the contact plate and leaf, providing extra protection. This version of the switches is heavier than before for those who prefer a little more effort in their keypresses.",
                "listedName": "Kailh BOX Chinese Red Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "55g",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.59 AUD",
                "sfCost": "0.27 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Crystal) (62g)"],
        "image": "kailh-box-crystal.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/kailh-box-crystal-tactile-switch-smd-clear-mx-switches-62g-67g-5pin-50m-clear-housing",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["F", "4"],
                "comment": "Found packaged in its own individual zip bag.\nThe store page also includes a link to the data sheet.",
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Offering a satisfying tactile feel, these Kailh BOX Crystal switches come in your choice of 62-67-72 gram weights, depending on how heavy you like your switches.",
                "listedName": "Kailh BOX Crystal Clear Switch (Tactile - PCB Mount) (62g)",
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Crystal) (67g)"],
        "image": "kailh-box-crystal.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/kailh-box-crystal-tactile-switch-smd-clear-mx-switches-62g-67g-5pin-50m-clear-housing",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["O", "4"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 62g version]",
                "listedName": "Kailh BOX Crystal Clear Switch (Tactile - PCB Mount) (67g)",
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Crystal) (72g)"],
        "image": "kailh-box-crystal.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/kailh-box-crystal-tactile-switch-smd-clear-mx-switches-62g-67g-5pin-50m-clear-housing",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["L", "4"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 62g version]",
                "listedName": "Kailh BOX Crystal Clear Switch (Tactile - PCB Mount) (72g)",
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Crystal Pro) (62g)"],
        "image": "kailh-box-crystal-pro.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/kailh-box-crystal-tactile-switch-smd-clear-mx-switches-62g-67g-5pin-50m-clear-housing",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["B", "4"],
                "comment": "Found packaged in its own individual zip bag.\nThe store page also includes a link to the data sheet.",
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Offering a satisfying tactile feel, these Kailh BOX Crystal switches come in your choice of 62-67-72 gram weights, depending on how heavy you like your switches.",
                "listedName": "Kailh BOX Crystal Pro Switch (Tactile - PCB Mount) (62g)",
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Crystal Pro) (67g)"],
        "image": "kailh-box-crystal-pro.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/kailh-box-crystal-tactile-switch-smd-clear-mx-switches-62g-67g-5pin-50m-clear-housing",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["N", "4"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 62g version]",
                "listedName": "Kailh BOX Crystal Pro Switch (Tactile - PCB Mount) (67g)",
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Crystal Pro) (72g)"],
        "image": "kailh-box-crystal-pro.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/kailh-box-crystal-tactile-switch-smd-clear-mx-switches-62g-67g-5pin-50m-clear-housing",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5,
            "additionalIDNotes": "Clear top and bottom housing."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["I", "4"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 62g version]",
                "listedName": "Kailh BOX Crystal Pro Switch (Tactile - PCB Mount) (72g)",
                "itemCost": "1.24 AUD",
                "sfCost": "0.56 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Deep Sea)"],
        "image": "kailh-box-deep-sea.jpg",
        "imageAcknowledgement": "https://www.keebzncables.com/products/kailh-hush",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "smd": "transparent"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["A", "34"],
                "excerpt": "The Kailh Deep Sea switch is a nearly silent linear switch designed for the optimal typing experience. A rubber pad is placed below the stem, at the bottom of the housing, which absorbs vibrations for the quietest possible bottom-out. To minimize finger strain, the Deep Sea switch uses a slightly longer stem with 3.6mm total travel, and newly refined internal components so that every key has a silky smooth press. A second set of rubberized dust-proofing pads inside the switch and around the shaft wall prevents dust build-up and provides even further sound insulation. The Deep Sea reduces noise (around \u003c35 dB) more than any other switch on the market, and provides an excellent linear typing experience.",
                "listedName": "Kailh BOX Deep Sea Switch (Silent Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.95 AUD",
                "sfCost": "0.43 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Glazed Green)"],
        "image": "kailh-box-glazed-green.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/32997569503.html",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["2C", "3"],
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Created with a box around the cross stem instead of the cross stem just sticking up, they're built to avoid corrosion and debris buildup. The box extends to the contact plate and leaf, providing extra protection. This version of the switches is heavier than before for those who prefer a little more effort in their keypresses.",
                "listedName": "Kailh BOX Glazed Green Switch (Tactile Click - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "50g",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.59 AUD",
                "sfCost": "0.27 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Jellyfish X)"],
        "image": "kailh-box-jellyfish-x.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["H", "4"],
                "excerpt": "Leading the way in clicky switch performance, the Kailh Jellyfish X switch has many of the benefits of its namesake-with almost none of the drawbacks. Part of Kailh's Box and Master Series, the Jellyfish features durable polycarbonate housings, a high-molecular polyamide stem, and a Master-Series-exclusive structure to improve service life. And with corrosion-resistant, gold-plated hardware, it's anything but fragile. Plus, it's factory pre-lubed, so it takes to each keystroke like a (jelly)fish to water; a transparent stem and housings add to the jellyfish similarities. Great for showcasing RGB lighting, these transparent components also reveal the gold-plated spring.",
                "listedName": "Kailh BOX Jellyfish X Switch (Tactile Click - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "47g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "HMWPA",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.08 AUD",
                "sfCost": "0.49 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Noble Yellow)"],
        "image": "kailh-box-noble-yellow.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["2A", "3"],
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Created with a box around the cross stem instead of the cross stem just sticking up, they're built to avoid corrosion and debris buildup. The box extends to the contact plate and leaf, providing extra protection. This version of the switches is heavier than before for those who prefer a little more effort in their keypresses.",
                "listedName": "Kailh BOX Noble Yellow Switch (Tactile Click - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "55g",
                    "Actuation Force":  "65g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.59 AUD",
                "sfCost": "0.27 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Red Pro)"],
        "image": "kailh-box-red-pro.jpg",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["I", "4"],
                "excerpt": "Kailh BOX switches are IP56 rated to keep dust and moisture out. Created with a box around the cross stem instead of the cross stem just sticking up, they're built to avoid corrosion and debris buildup. The box extends to the contact plate and leaf, providing extra protection. This version of the switches is heavier than before for those who prefer a little more effort in their keypresses.",
                "listedName": "Kailh BOX Red Pro Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "35g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.65 AUD",
                "sfCost": "0.29 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box (Royal)"],
        "image": "kailh-box-royal.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-box-royal-switches-10-pcs",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["2F", "7"],
                "itemCost": "0.76 AUD",
                "sfCost": "0.15 AUD"
            },
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["2M", "3"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile switch with 45g operating and 70g bottom",
                "listedName": "Kailh BOX Royal",
                "itemCost": "1.14 AUD",
                "sfCost": "1.09 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box Hako (True)"],
        "image": "kailh-box-hako-true.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/hako-true-mechanical-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["C", "3"],
                "comment": "The \"C\" might be a \"G\".\nI might've misread it.",
                "itemCost": "0.76 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box Hako (Violet)"],
        "image": "kailh-box-hako-violet.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/hako-violet-mechanical-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["2M", "7"],
                "itemCost": "0.76 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box Hako (Clear)"],
        "image": "kailh-box-hako-clear.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/pls-do-not-delete-it-switch-option",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["F", "5"],
                "itemCost": "0.83 AUD",
                "sfCost": "0.16 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Box Hako (Royal Clear)"],
        "image": "kailh-box-hako-royal-clear.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/pls-do-not-delete-it-switch-option",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["2S", "8"],
                "itemCost": "0.83 AUD",
                "sfCost": "0.16 AUD"
            }
        ]
    }
],[
    {
        "name": ["Kailh Pro (Burgundy)"],
        "image": "kailh-pro-burgundy.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-pro-burgundy-switches",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["A", "5"],
                "itemCost": "0.45 AUD",
                "sfCost": "0.09 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Pro (Purple)"],
        "image": "kailh-pro-purple.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/pls-do-not-delete-it-switch-option",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["A", "5"],
                "itemCost": "0.45 AUD",
                "sfCost": "0.09 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Pro (Light Green)"],
        "image": "kailh-pro-light-green.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-pro-light-green-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["F", "6"],
                "itemCost": "0.45 AUD",
                "sfCost": "0.09 AUD"
            }
        ]
    }
],[
    {
        "name": ["Kailh Speed (Silver)"],
        "image": "kailh-speed-silver.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-silver-speed-switches",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["I", "8"],
                "itemCost": "0.42 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Speed (Copper)"],
        "image": "kailh-speed-copper.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-copper-speed-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["B", "33"],
                "comment": "The \"B\" and \"33\" were upside-down each other,\nwhich is unusual compared to the other Kailh switches.",
                "itemCost": "0.42 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Speed (Gold)"],
        "image": "kailh-speed-gold.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-gold-speed-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["J", "23"],
                "itemCost": "0.42 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Speed (Bronze)"],
        "image": "kailh-speed-bronze.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/kailh-bronze-speed-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["P"],
                "comment": "I can't see any other underside mould labels.",
                "itemCost": "0.42 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Speed (Burnt Orange)"],
        "image": "kailh-speed-burnt-orange.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["I", "5"],
                "excerpt": "Kailh PG1511 series is a family of Cherry MX clone switches. PG1511 series adopted the use of all four of Cherry's base holes (inner holes for monochrome LED, outer holes for jumper or diode) for a single four-leg \"DIP\" through-hole RGB LED. Most \"speed\" types accept any LED types, but have no lateral support for LED legs.",
                "listedName": "Kailh Speed Heavy Burnt Orange Switch (Tactile - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "70g",
                    "Actuation Travel": "1.1mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.49 AUD",
                "sfCost": "0.22 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Speed (Dark Yellow)"],
        "image": "kailh-speed-dark-yellow.jpg",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["D", "5"],
                "excerpt": "Kailh PG1511 series is a family of Cherry MX clone switches. PG1511 series adopted the use of all four of Cherry's base holes (inner holes for monochrome LED, outer holes for jumper or diode) for a single four-leg \"DIP\" through-hole RGB LED. Most \"speed\" types accept any LED types, but have no lateral support for LED legs.",
                "listedName": "Kailh Speed Heavy Dark Yellow Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "70g",
                    "Actuation Travel": "1.1mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.49 AUD",
                "sfCost": "0.22 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Speed (Pale Blue)"],
        "image": "kailh-speed-pale-blue.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["J"],
                "excerpt": "Kailh PG1511 series is a family of Cherry MX clone switches. PG1511 series adopted the use of all four of Cherry's base holes (inner holes for monochrome LED, outer holes for jumper or diode) for a single four-leg \"DIP\" through-hole RGB LED. Most \"speed\" types accept any LED types, but have no lateral support for LED legs.",
                "listedName": "Kailh Speed Heavy Pale Blue Switch (Tactile Click - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "70g",
                    "Actuation Travel": "1.1mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.49 AUD",
                "sfCost": "0.22 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Speed (Rose Pink)"],
        "image": "kailh-speed-rose-pink.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["B"],
                "excerpt": "Kailh PG1511 series is a family of Cherry MX clone switches. PG1511 series adopted the use of all four of Cherry's base holes (inner holes for monochrome LED, outer holes for jumper or diode) for a single four-leg \"DIP\" through-hole RGB LED. Most \"speed\" types accept any LED types, but have no lateral support for LED legs. The pink \"speed\" type only accepts two-pin through-hole and SMD LEDs; the exterior holes for jumpers, diodes and four-pin through-hole RGB LEDs are omitted to make way for the click bar. Note : PG1511 Rose Pink specifications same as PG1511 Bronze, the only difference is stem color.",
                "listedName": "Kailh Speed Rose Pink Switch (Tactile Click - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "75g",
                    "Actuation Force":  "50g",
                    "Actuation Travel": "1.1mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "The store page also includes a link to the data sheet.",
                "itemCost": "0.46 AUD",
                "sfCost": "0.21 AUD"
            }
        ]
    }
],[
    {
        "name": ["Kailh Canary"],
        "image": "kailh-canary.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/kailh-x-domikey-canary-switch-rgb-smd-tactile-60g-switches-for-mechanical-keyboard-mx-stem-5pin-pom-material-self-lubricating",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "smd": "no",
            "additionalIDNotes": "There is an LED cutout but I don't think this will work well with SMD."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["B", "9"],
                "excerpt": "Taking the tactile switch to new heights, Kailh Canary : an eye-catching switch with a satisfying feel and standout colorway. Made with the same POM housing as Kailh's popular Box Cream switches, the Canary switch takes a turn for the bold with a bright yellow top housing and rich green bottom housing. Kailh Canary is built with self-lubricating and rated for 60 million actuations.",
                "listedName": "Kailh Canary Switch (Tactile - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "60g",
                    "Actuation Force":  "42g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "POM",
                    "Stem":             "POM",
                    "Bottom Housing":   "POM",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "1.07 AUD",
                "sfCost": "0.48 AUD"
            }
        ]
    },
    {
        "name": ["Kailh Polia"],
        "image": "kailh-polia.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "smd": "transparent"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["I1"],
                "excerpt": "Kailh is back with a new take on tactile. Introducing the Polia switch: a smooth operator with a self-proclaimed \"fourth\" feel. Deviating from the big three (linear, clicky, and tactile), the Polia experience is termed \"advanced tactile,\" and it's characterized by a relatively hefty actuation force, a lighter than normal operating force, and a smooth tactile bump.",
                "listedName": "Kailh Polia Switch (Tactile - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "60g",
                    "Actuation Travel": "1.9mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.98 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Keebhut Blue Bubblegum"],
        "image": "keebhut-blue-bubblegum.jpg",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["GATERON", "C", "P"]
            }
        ]
    }
],[
    {
        "name": ["Keyfirst Cream"],
        "image": "keyfirst-cream.jpg",
        "imageAcknowledgement": "https://www.ebay.com/itm/275192696774",
        "cosmeticFeatures": {
            "topLabel": "GATERON",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["N", "U"],
                "excerpt": "Manufactured by Gateron, the Keyfirst Cream switch is both colorful and fun to press. With 4 millimeters of total travel and an operating force of 62 cN, it's a bit on the bulkier side, but its self-lubricating stems make each keystroke a frictionless experience. Performance aside, the Cream switch earns its name from the playful Pantone colors it features: Cream Green (PANTONE 0921C) in the lower case, Cream Pink (PANTONE 0331C) in the upper case, and Cream Yellow (PANTONE 0131C) in the stem.",
                "listedName": "Gateron Keyfirst Cream Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "62g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon - PANTONE 0331C",
                    "Stem":             "POM - PANTONE 0131C",
                    "Bottom Housing":   "Nylon - PANTONE 0921C",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.98 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    }
],[
    {
        "name": ["Kinetic Labs Penguin"],
        "image": "kinetic-labs-penguin.png",
        "imageAcknowledgement": "https://kineticlabs.com/switches/kinetic/penguins",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5,
            "additionalIDNotes": "This doesn't show well in the photo, but the bottom housing is a darker more saturated blue than the top housing.\nDespite the SMD cutout on the top housing, the bottom housing doesn't have one."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["04"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile switch with a long 63.5g spring",
                "listedName": "Kinetic Labs Penguin",
                "itemCost": "1.39 AUD",
                "sfCost": "1.33 AUD"
            }
        ]
    },
    {
        "name": ["Kinetic Labs Salmon"],
        "image": "kinetic-labs-salmon.jpg",
        "imageAcknowledgement": "https://kineticlabs.com/switches/kinetic/salmons",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["15"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile switch with large and rounded tactile bump, 63.5g bottom.",
                "listedName": "Kinetic Labs Salmon",
                "itemCost": "1.09 AUD",
                "sfCost": "1.04 AUD"
            }
        ]
    }
],[
    {
        "name": ["KTT Cabbage Tofu"],
        "cosmeticVariant": "Opaque Top",
        "image": "ktt-cabbage-tofu-opaque-top.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/ktt.png",
            "additionalIDNotes": "KTT stands for \"Kang Teng Te\", which translates to \"Content\", so this switch is sometimes also called \"Content Cabbage Tofu\"."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["07", "A4"],
                "excerpt": "KTT Cabbage Tofu feature a 22mm long spring and cabbage green housing. Made with a brand new mold, these switches are sure to provide a buttery smooth typing experience at an affordable price.",
                "listedName": "Content / KTT Cabbage Tofu Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "53g",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.35 AUD",
                "sfCost": "0.16 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["KTT Cabbage Tofu"],
        "image": "ktt-cabbage-tofu-transparent-top.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/ktt.png",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["07", "W"],
                "listedName": "KTT Cabbage Tofu Transparent Top",
                "listedSpecs": {
                    "Actuation Force": "43g",
                    "Bottom Out Force": "53g",
                    "Spring": "22mm single stage spring"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["KTT Lightning"],
        "image": "ktt-lightning.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/ktt.png"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["8"],
                "excerpt": "A real speed switch from KTT with shorter actuation and travel",
                "listedName": "KTT Lightning",
                "listedSpecs": {
                    "Actuation Force": "43g",
                    "Bottom Out Force": "50g",
                    "Actuation": "1mm",
                    "Bottom Out": "3mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["KTT Mallo"],
        "image": "ktt-mallo.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/ktt.png",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["07", "A2"],
                "excerpt": "KTT Mallo's are a new light tactile from KTT inspired by the loved (or hated) Peeps marshmallows! They feature minimal pre-travel, and a well-rounded short tactile bump.",
                "listedName": "KTT Mallo",
                "listedSpecs": {
                    "Top Housing": "Polycarbonate",
                    "Bottom Housing": "Nylon (PA66)",
                    "Stem": "POM",
                    "Bottom Out Force": "55g",
                    "Travel": "4.0mm",
                    "Additional Notes": "Unlubed from factory; Designed by AlphaKeys"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["KTT Monochrome Onyx"],
        "image": "ktt-monochrome-onyx.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/ktt.png",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["02", "22"],
                "excerpt": "KTT Monochrome Onyx Switches are a new high tactile from KTT featuring a large sharp \"plateau\" tactile bump, gold plated long spring, and polycarbonate housing. This tactile bump is sharply rounded at both its beginning and end, but rather flat at its peak providing an almost harsh tactility. They're a great switch for tactile lovers seeking a new tactile experience.",
                "listedName": "KTT Monochrome - Onyx",
                "listedSpecs": {
                    "Top Housing": "Polycarbonate",
                    "Bottom Housing": "Polycarbonate",
                    "Stem": "POM",
                    "Actuation": "46g",
                    "Peak Force": "63g",
                    "Bottom-Out": "50g",
                    "Spring": "22mm extended spring",
                    "Travel": "4.0mm",
                    "Additional Notes": "Manufactured by KTT exclusively for Dangkeebs"
                }
            }
        ]
    },
    {
        "name": ["KTT Pine Green"],
        "image": "ktt-pine-green.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/ktt.png",
            "pins": 5,
            "additionalIDNotes": "KTT stands for \"Kang Teng Te\", which translates to \"Content\", so this switch is sometimes also called \"Content Pine Green\"."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["02", "07"],
                "excerpt": "KTT Pine's are part of KTT's premium line of switches. They feature polycarbonate in both the top and bottom housing, and a gold plated spring. Additionally, they are one of the few KTT switches to utilize a MX style latch. These switches perform extremely well stock, and only get better with lube, and films.",
                "listedName": "Content / KTT Pine Green Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "43g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.55 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    },
    {
        "name": ["KTT Red Wine"],
        "image": "ktt-red-wine.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/ktt.png",
            "additionalIDNotes": "KTT stands for \"Kang Teng Te\", which translates to \"Content\", so this switch is sometimes also called \"Content Red Wine\"."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["07", "D"],
                "excerpt": "KTT Red Wine switches are a very affordable linear switch that have rather good push feel and minimal wobble; feature a housing made from PC and a stem made from POM with glitter effect. Great for RGB with its transparent housing design. For what would be considered a \"budget\" switch, KTT continues to impress.",
                "listedName": "Content / KTT Red Wine Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "55g",
                    "Actuation Force":  "43g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.33 AUD",
                "sfCost": "0.15 AUD"
            }
        ]
    },
    {
        "name": ["KTT Sea Salt Lemon"],
        "image": "ktt-sea-salt-lemon.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/ktt.png",
            "additionalIDNotes": "KTT stands for \"Kang Teng Te\", which translates to \"Content\", so this switch is sometimes also called \"Content Sea Salt Lemon\"."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["07", "Q"],
                "excerpt": "KTT Sea Salt Lemon is another one of Content / KTT's famous budget linears. These switches are sure to provide a buttery smooth typing experience at an affordable price.",
                "listedName": "Content / KTT Sea Salt Lemon Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "53g",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Unlubed (No Factory Lube)"
                },
                "itemCost": "0.38 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["KTT Strawberry"],
        "image": "ktt-strawberry.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5,
            "additionalIDNotes": "KTT stands for \"Kang Teng Te\", which translates to \"Content\", so this switch is sometimes also called \"Content Strawberry\".\nFor some reason, this switch doesn't have a visible top label. Is this really a KTT switch?"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["5"],
                "excerpt": "KTT Strawberry's are part of KTT's premium line of switches. They feature polycarbonate in both the top and bottom housing, and a gold plated spring. Additionally, they are one of the few KTT switches to utilize a MX style latch. These switches perform extremely well stock, and only get better with lube, and films.",
                "listedName": "Content / KTT Strawberry Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "43g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.55 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Leobog Ashwood"],
        "image": "leobog-ashwood.jpg",
        "cosmeticFeatures": {
            "topLabel": "LEOBOG"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["M", "B4"],
                "excerpt": "Leobog light linear switch",
                "listedName": "Leobog Ashwood",
                "listedSpecs": {
                    "Actuation Force": "40g",
                    "Bottom Out Force": "53g",
                    "Actuation": "1.7mm",
                    "Bottom Out": "3.6mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Leobog Black Crystal"],
        "image": "leobog-black-crystal.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "LEOBOG"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["M", "C2"],
                "excerpt": "Leobog tactile switch seemingly made by Aflion/Golden Orange Electronics",
                "listedName": "Leobog Black Crystal"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Leobog Crystal"],
        "image": "leobog-crystal.jpg",
        "cosmeticFeatures": {
            "topLabel": "LEOBOG"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["M", "B8"],
                "excerpt": "Leobog Linear switch appearing to be made by Aflion/Golden Orange Electronics",
                "listedName": "Leobog Crystal"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Leobog Juggle"],
        "image": "leobog-juggle.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "LEOBOG",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": [],
                "comment": "No visible underside mould label.<br>Labels \"K\" and \"7\" are found in the corners viewed above of the top housing."
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Leobog Nimbus"],
        "image": "leobog-nimbus.jpg",
        "cosmeticFeatures": {
            "topLabel": "LEOBOG",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": [],
                "comment": "No visible underside mould label.\nLabels \"K\" and \"4\" are found in the corners viewed above of the top housing.\n(In the seller excerpt, no unit for bottom-out is given, but can be assumed to be mm.)",
                "excerpt": "Leobog fully POM linear switch",
                "listedName": "Leobog Nimbus",
                "listedSpecs": {
                    "Actuation Force": "35g",
                    "Bottom Out Force": "45g",
                    "Actuation": "1.2mm",
                    "Bottom Out": "3.6"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Leobog Wolfberry"],
        "image": "leobog-wolfberry.jpg",
        "cosmeticFeatures": {
            "topLabel": "LEOBOG"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["M", "A1"],
                "excerpt": "Leobog medium weight linear",
                "listedName": "Leobog Wolfberry",
                "listedSpecs": {
                    "Actuation Force": "45g",
                    "Bottom Out Force": "63g",
                    "Actuation": "1.7mm",
                    "Bottom Out": "3.6mm"
                }
            }
        ]
    }
],[
    {
        "name": ["Lumia Matcha (45g)"],
        "image": "lumia-matcha.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5,
            "additionalIDNotes": "It shows poorly in photos, but the bottom housing is a very light pastel green."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["6"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "These are Lumia Matcha, a linear switch in a nice cream and matcha green colorway with a progressive spring. The switches also utilize a long pole stem for a more solid bottom out sound. With the high stability of housing, switch film doesn't necessary. A complete lubricate process is done with GPL-105 and GPL-205G0 Lubricates, during the manufacture of the Lumia Matcha Switch. No additional greasing needed when you receive this product!",
                "listedName": "Lumia Matcha Switch (Linear 45g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "45g",
                    "Actuation Force":  "37g",
                    "Actuation Travel": "- (No Data)",
                    "Total Travel":     "3.3mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Krytox GPL 205g0 + GPL 105)"
                },
                "itemCost": "0.81 AUD",
                "sfCost": "0.37 AUD"
            }
        ]
    },
    {
        "name": ["Lumia Matcha (62g)"],
        "image": "lumia-matcha.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5,
            "additionalIDNotes": "It shows poorly in photos, but the bottom housing is a very light pastel green."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["1"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "These are Lumia Matcha, a linear switch in a nice cream and matcha green colorway with a progressive spring. The switches also utilize a long pole stem for a more solid bottom out sound. With the high stability of housing, switch film doesn't necessary. A complete lubricate process is done with GPL-105 and GPL-205G0 Lubricates, during the manufacture of the Lumia Matcha Switch. No additional greasing needed when you receive this product!",
                "listedName": "Lumia Matcha Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "- (No Data)",
                    "Total Travel":     "3.3mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Krytox GPL 205g0 + GPL 105)"
                },
                "itemCost": "0.81 AUD",
                "sfCost": "0.37 AUD"
            }
        ]
    },
    {
        "name": ["Lumia Switch"],
        "image": "lumia-switch.jpg",
        "imageAcknowledgement": "https://shopee.com.my/Lumia-Tactile-Switch-%28Extended-20mm-62g%29-i.79025026.8747223728",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Lumia"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["62"],
                "excerpt": "Lumia switch features fully soaked in oil to form an oil seal on the stem. The stem expends about 0.05mm and it fits nicely with the Nylon 6/6 (PA) housing. With the high stability of housing, switch film doesn't necessary. The tactility similar to Holy Panda with Mitsubishi F20-03 stem from Japan.",
                "listedName": "Lumia Switch (Tactile 62g - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "62g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon 6/6 (PA)",
                    "Stem":             "Mitsubishi F20-03",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.98 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Lychee UHMWPE Linear"],
        "image": "lychee-uhmwpe-linear.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["6"],
                "excerpt": "Lychee UHMWPE Linear switches are inspired by lychee fruits and feature an UHMWPE stem and full nylon housing. UHMWPE is a unique material with a lower coefficient of friction than POM. It's a softer material that's self-lubricating, and highly resistant to abrasion. These distinct properties result in a smooth typing experience with a softened bottom, and top-out sound.",
                "listedName": "Lychee UHMWPE - Linear",
                "listedSpecs": {
                    "Top Housing": "Nylon",
                    "Bottom Housing": "Nylon",
                    "Stem": "UHMWPE",
                    "Bottom Out": "68g",
                    "Additional Notes": "Dual stage gold plated spring; UNLUBED from factory; Manufactured by Tecsee"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Lychee UHMWPE Tactile"],
        "image": "lychee-uhmwpe-tactile.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["5"],
                "excerpt": "Lychee UHMWPE Tactile switches are inspired by lychee fruits and feature an UHMWPE stem and full nylon housing. UHMWPE is a unique material with a lower coefficient of friction than POM. It's a softer material that's self-lubricating, and highly resistant to abrasion. These distinct properties result in a smooth typing experience with a softened bottom, and top-out sound.",
                "listedName": "Lychee UHMWPE - Tactile",
                "listedSpecs": {
                    "Top Housing": "Nylon",
                    "Bottom Housing": "Nylon",
                    "Stem": "UHMWPE",
                    "Bottom Out": "68g",
                    "Additional Notes": "Dual stage gold plated spring; UNLUBED from factory; Manufactured by Tecsee"
                }
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Mengmoda Cream", "MMD Cream"],
        "image": "mmd-cream.jpg",
        "cosmeticFeatures": {
            "topLabel": "MMD",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "excerpt": "The MMD Cream switches come with POM stem and housing for an extreme durable purpose. By finely pre-lubed, the switch reduces the rustle feeling and sound that are generally brought by POM material, and presents a pleasing typing experience and sound.",
                "listedName": "MMD Cream POM Switch (Linear - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "55g",
                    "Actuation Force":  "43g",
                    "Actuation Travel": "1.3mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "POM",
                    "Stem":             "POM",
                    "Bottom Housing":   "POM",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "No visible underside mould label.\nLabels \"K\" and \"6\" are found in the corners viewed above of the top housing.",
                "itemCost": "0.65 AUD",
                "sfCost": "0.29 AUD"
            },
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": [],
                "comment": "No visible underside mould label.\nLabels \"K\" and \"8\" are found in the corners viewed above of the top housing.",
                "excerpt": "Mengmoda's first full POM switch. Linear, reduced travel, pre-lubed.",
                "listedName": "Mengmoda (MMD) Ice Cream (Pre-Lubed)",
                "listedSpecs": {
                    "Bottom Out Force": "45g",
                    "Actuation": "1.4mm",
                    "Bottom Out": "3.6mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Mengmoda Holy Panda", "MMD Holy Panda"],
        "image": "mengmoda-holy-panda.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "MMD",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["1"],
                "excerpt": "Mengmoda Holy Panda tactile switch with clear housing and white stem. 63.5g bottom out. Seemingly produced by Lumia factory based on similar mold markings and other stores' claims.",
                "listedName": "Mengmoda (MMD) Holy Panda"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Mengmoda Honey Tactile", "MMD HT"],
        "image": "mmd-ht.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "MMD",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["", ""],
                "excerpt": "The MMD HT (Honey Tactile) POM switches come with POM stem and housing for an extreme durable purpose. By applying a two-stage spring, the re-bounce is more straightforward and neat. The switches adopt an improved structure, which reduces the rustle feeling and sound that are generally brought by POM material, and presents a pleasing typing experience and sound.",
                "listedName": "MMD HT POM Switch (Tactile - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "52g",
                    "Actuation Travel": "1.9mm",
                    "Total Travel":     "3.6mm",
                    "Top Housing":      "POM",
                    "Stem":             "POM",
                    "Bottom Housing":   "POM",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "comment": "No visible underside mould label.\nLabels \"K\" and \"1\" are found in the corners viewed above of the top housing.",
                "itemCost": "0.65 AUD",
                "sfCost": "0.29 AUD"
            },
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": [],
                "comment": "No visible underside mould label.\nLabels \"K\" and \"7\" are found in the corners viewed above of the top housing.",
                "excerpt": "Mengmoda's second fully POM switch, this time a tactile switch coming un-lubed with early bottom out.",
                "listedName": "Mengmoda (MMD) Honey Tactile HT (Stock)",
                "listedSpecs": {
                    "Actuation Force": "52g",
                    "Bottom Out Force": "63.5g",
                    "Actuation": "1.8mm",
                    "Bottom Out": "3.6mm"
                }
            }
        ]
    }
],[
    {
        "name": ["MOMOKA Christmas Bell", "MMK Christmas Bell"],
        "image": "momoka-christmas-bell.jpg",
        "cosmeticFeatures": {
            "topLabel": "MMK",
            "smd": "no"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["10"],
                "excerpt": "MMK special edition Christmas Bell switch is a Linear switch. Designed originally and manufactured by MOMOKA. The MMK Christmas switch has characteristics of smoothness, stability, confirming \u0026 thick feeling of actuation, and the muffled sound feedback. Dual-stage springs in MMK Christmas Bell switches are made of Japan exported SUS304 Steel, manufactured into springs with the best machinery. This gives us springs with unity diameters and durabilities, which enhances the resilience of them. A lubricate process is done with GPL-105 Lubricates, during the manufacture of the MMK Christmas Switch. No additional greasing needed when you receive our product! MOMOKA improve the lubing process to achieve more consistent and human-like results, gives the switch more smoothness and eliminates sounds made by the crosspoint contact. It also enhances the rich feedback feeling.",
                "listedName": "MOMOKA / MMK Christmas Bell Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "67g",
                    "Actuation Travel": "1.9mm",
                    "Total Travel":     "3.9mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Krytox GPL 105)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "name": ["MOMOKA Flamingo", "MMK Flamingo"],
        "image": "momoka-flamingo.jpg",
        "cosmeticFeatures": {
            "topLabel": "MMK"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["6"],
                "excerpt": "MMK FLAMINGO switch is a Linear switch. Designed originally and manufactured by MOMOKA. The FLAMINGO switch has characteristics of smoothness, stability, confirming \u0026 thick feeling of actuation, and the muffled sound feedback. Dual-stage springs in FLAMINGO switches are made of Japan exported SUS304 Steel, manufactured into springs with the best machinery. This gives us springs with unity diameters and durabilities, which enhances the resilience of them. A lubricate process is done with GPL-105 Lubricates, during the manufacture of the FLAMINGO Switch. No additional greasing needed when you receive our product! MOMOKA improve the lubing process to achieve more consistent and human-like results, gives the switch more smoothness and eliminates sounds made by the crosspoint contact. It also enhances the rich feedback feeling.",
                "listedName": "MOMOKA / MMK Flamingo Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "- (No Data)",
                    "Actuation Force":  "67g",
                    "Actuation Travel": "1.9mm",
                    "Total Travel":     "3.9mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Krytox GPL 105)"
                },
                "comment": "The underside label is read with the LED side facing down. (This is the same orientation as the Christmas Bell.)",
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "name": ["MOMOKA Frog", "MMK Frog"],
        "image": "momoka-frog.jpg",
        "cosmeticFeatures": {
            "topLabel": "MMK"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["10"],
                "excerpt": "MMK FROG switch is a Linear switch. Designed originally and manufactured by MOMOKA. The FROG switch has characteristics of smoothness, stability, confirming \u0026 thick feeling of actuation, and the muffled sound feedback. Springs in FROG switches are made of Japan exported SUS304 Steel, manufactured into springs with the best machinery. This gives us springs with unity diameters and durabilities, which enhances the resilience of them. A complete lubricate process is done with GPL-105 and GPL-205G0 Lubricates, during the manufacture of the FROG Switch. No additional greasing needed when you receive our product! The lubricate process gives the switch more smoothness and eliminates sounds made by the crosspoint contact. It also enhances the rich feedback feeling.",
                "listedName": "MOMOKA / MMK Frog Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "54g",
                    "Actuation Travel": "2.5mm",
                    "Total Travel":     "3.7mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon 6/6 (PA)",
                    "Lube":             "Lubed (Krytox GPL 205g0 + GPL 105)"
                },
                "itemCost": "0.81 AUD",
                "sfCost": "0.37 AUD"
            }
        ]
    }
],[
    {
        "name": ["NovelKeys x Kailh Cream (Cream)", "NK_ Cream"],
        "image": "novelkeys-cream-cream.jpg",
        "imageAcknowledgement": "https://kbdfans.com/products/novelkey-x-kailh-linear-cream-switch",
        "cosmeticFeatures": {
            "topLabel": "Kailh",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["B", "11"],
                "itemCost": "0.99 AUD",
                "sfCost": "0.19 AUD"
            },
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["B", "22"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear switch with 55g operating, 70g Bottom, PCB mount",
                "listedName": "NK_ Cream (or NK_ BOX Cream)",
                "itemCost": "1.48 AUD",
                "sfCost": "1.41 AUD"
            }
        ]
    },
    {
        "name": ["NovelKeys x Kailh Cream (Cream Tactile)", "NK_ Cream Tactile"],
        "image": "novelkeys-cream-cream-tactile.jpg",
        "imageAcknowledgement": "https://novelkeys.com/products/nk_-cream-series",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "kailh",
            "pins": 5,
            "additionalIDNotes": "(The \"k\" is intentionally lowercase to reflect what I saw. I should review all the Kailh labels to improve casing.)"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["B", "11"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile, 65g operating, 95g bottom (whoa).",
                "listedName": "NK_ Cream Tactile",
                "itemCost": "1.48 AUD",
                "sfCost": "1.41 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["NovelKeys Dry Black"],
        "image": "novelkeys-dry-black.jpg",
        "cosmeticFeatures": {
            "topLabel": "NK_",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["05"],
                "excerpt": "NovelKeys custom JWK linear with black nylon housings and POM stem, this is the counterpart to their silk series which came pre-lubed.",
                "listedName": "NovelKeys NK Dry Black"
            }
        ]
    },
    {
        "name": ["NovelKeys Silk (Olivia)", "NK_ Silk Olivia"],
        "image": "novelkeys-silk-olivia.jpg",
        "imageAcknowledgement": "https://novelkeys.com/products/nk_-silk-series",
        "cosmeticFeatures": {
            "topLabel": "NK",
            "smd": "semitransparent",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["04"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Linear switch with a travel distance of 2mm Actuation (4mm Bottom) and a force of 45g Operating (63.5g Bottom)",
                "listedName": "NK_ Silk Olivia",
                "itemCost": "1.25 AUD",
                "sfCost": "1.20 AUD"
            }
        ]
    }
],[
    {
        "name": ["NovelKeys x Kailh Box (Dark Yellow)"],
        "image": "novelkeys-kailh-box-dark-yellow.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/novelkeys-x-kailh-box-heavy-yellow-linear-switches",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["Q", "5"],
                "itemCost": "0.68 AUD",
                "sfCost": "0.13 AUD"
            }
        ]
    },
    {
        "name": ["NovelKeys x Kailh Box (Burnt Orange)"],
        "image": "novelkeys-kailh-box-burnt-orange.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/novelkeys-x-kailh-box-heavy-orange-tactile-switches",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["2V", "7"],
                "itemCost": "0.68 AUD",
                "sfCost": "0.13 AUD"
            }
        ]
    },
    {
        "name": ["NovelKeys x Kailh Box (Pale Blue)"],
        "image": "novelkeys-kailh-box-pale-blue.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/novelkeys-x-kailh-box-heavy-pale-blue-clicky-switches",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["2X", "6"],
                "itemCost": "0.68 AUD",
                "sfCost": "0.13 AUD"
            }
        ]
    },
    {
        "name": ["NovelKeys x Kailh Box (Navy)"],
        "image": "novelkeys-kailh-box-navy.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/novelkeys-x-kailh-box-thick-clicks-navy-jade",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["H", "5"],
                "itemCost": "0.64 AUD",
                "sfCost": "0.12 AUD"
            }
        ]
    },
    {
        "name": ["NovelKeys x Kailh Box (Jade)"],
        "image": "novelkeys-kailh-box-jade.jpg",
        "imageAcknowledgement": "https://kbdfans.com/collections/switches/products/novelkeys-x-kailh-box-thick-clicks-navy-jade",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Kailh"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-02 KBDfans-CN",
                "count": 1,
                "undersideMouldLabel": ["2I", "7"],
                "comment": "Hard to tell if the \"I\" is not a \"1\" or \"J\".",
                "itemCost": "0.64 AUD",
                "sfCost": "0.12 AUD"
            },
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["2E", "4"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Very Clicky, 50g Operating, 60g Bottom, Plate mount",
                "listedName": "Kailh BOX Jade",
                "itemCost": "0.79 AUD",
                "sfCost": "0.76 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Old Tom Ice Edge"],
        "image": "old-tom-ice-edge.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["HM-131"],
                "excerpt": "A light tactile switch from designer Old Tom. One of the earliers HaiMu manufactured switches known of, with the same silencing mechanism as the Epomaker Silent Icebergs except it is only on the bottom out. Also, the stock springs are only BARELY enough to make it return even though it is a long multistage spring.",
                "listedName": "Old Tom Ice Edge"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Old Tom Powder Edge"],
        "image": "old-tom-powder-edge.jpg",
        "cosmeticFeatures": {
            "topLabel": "",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["HM-126"],
                "excerpt": "A light linear switch from designer Old Tom. One of the earliers HaiMu manufactured switches known of, with the same silencing mechanism as the Epomaker Silent Icebergs except it is only on the bottom out.",
                "listedName": "Old Tom Powder Edge"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Outemu (Red)"],
        "image": "outemu-red--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's)."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["23", "24"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Black)"],
        "image": "outemu-black--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's)."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["19", "23"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Brown)"],
        "image": "outemu-brown--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's)."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["08", "24"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Blue)"],
        "image": "outemu-blue--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's)."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["07", "23"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Teal)"],
        "image": "outemu-teal--amazon-granvela.jpg",
        "imageAcknowledgement": "https://www.amazon.com/OUTEMU-Switches-Tactile-switches-Replacement/dp/B092JKV3KD",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's).\nSometimes mistakenly called \"Green\" (rather than \"Teal\").\nStem is cyan like Tealio, not green like Cherry Greens.\nCompared to Tealio, the stem is darker and more saturated."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["22", "23"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Purple)"],
        "image": "outemu-purple--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's)."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["13", "23"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Orange)"],
        "image": "outemu-orange--carousell-eugene-ong.jpg",
        "imageAcknowledgement": "https://www.carousell.com.my/p/outemu-orange-tactile-switch-1109032123/",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's)."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["15", "23"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Gold)"],
        "image": "outemu-gold--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's)."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["37", "24"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Silver)"],
        "image": "outemu-silver--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's).\nStem is a darker grey than the Outemu Silent Gray."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["17", "22"],
                "itemCost": "0.62 AUD",
                "sfCost": "0.06 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Silent Gray)"],
        "image": "outemu-silent-gray--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's).\nStem is a lighter grey than the Outemu Silver."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["01", "24"],
                "itemCost": "0.74 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Silent White)"],
        "image": "outemu-silent-white--ymdkey.jpg",
        "imageAcknowledgement": "https://ymdkey.com/products/outemu-smd-rgb-3-pin-mx-switch-brown-blue-red-silent-white-gray-otm-for-gk61-gk64-mx-mechanical-keyboard",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Clear top, white bottom (similar colours to Gateron KS-9's).\nStem is clear like Cherry Clears, not white like Cherry Whites."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["12", "22"],
                "itemCost": "0.74 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Silent Yellow)"],
        "image": "outemu-silent-yellow.jpg",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["34", "20"],
                "excerpt": "Outemu PG150 series is a series of Cherry MX clone switches from Gaote Electronics. This Outemu silent switch feature a very smooth keypress as well as silencing pads installed both on the top and bottom of the stems. This dampens the sound of the keypress going down as well as on the way up. This Outemu switch come with clear tops, white bottoms, and SMD LED compatible.",
                "listedName": "Outemu Silent Yellow SMD RGB Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "65g",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "1.6mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.46 AUD",
                "sfCost": "0.21 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Outemu Dustproof (Crystal Red)"],
        "image": "outemu-dustproof-crystal-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["A06"],
                "excerpt": "Outemu PG150 series is a series of Cherry MX clone switches from Gaote Electronics. Outemu dust-proof switches are IP56 rated to keep dust and moisture out. This Outemu switch come with clear tops, white bottoms, and SMD LED compatible.",
                "listedName": "Outemu Dustproof Red SMD RGB Switch (Linear - Plate Mount)",
                "listedSpecs": {
                    "Actuation Force": "50 cN"
                },
                "itemCost": "0.49 AUD",
                "sfCost": "0.22 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu Dustproof (Teal)"],
        "image": "outemu-dustproof-teal.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["24", "17"],
                "excerpt": "Outemu PG150 series is a series of Cherry MX clone switches from Gaote Electronics. Outemu dust-proof switches are IP56 rated to keep dust and moisture out. This Outemu switch come with clear tops, white bottoms, and SMD LED compatible.",
                "listedName": "Outemu Dustproof Teal SMD RGB Switch (Tactile Click - Plate Mount)",
                "listedSpecs": {
                    "Actuation Force": "68 cN"
                },
                "itemCost": "0.37 AUD",
                "sfCost": "0.17 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Outemu Ice V2 (Clear)"],
        "image": "outemu-ice-v2-clear.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Outemu",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "C"],
                "excerpt": "Outemu ICE series is a premium series of Cherry MX clone switches from Gaote Electronics. This Outemu switch come with polycarbonate clear housings and SMD LED compatible.",
                "listedName": "Outemu ICE v2 Clear SMD RGB Switch (Tactile 62g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force": "62 cN"
                },
                "itemCost": "0.55 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu Ice V2 (Dark Purple)"],
        "image": "outemu-ice-v2-dark-purple.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Outemu",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "D"],
                "excerpt": "Outemu ICE series is a premium series of Cherry MX clone switches from Gaote Electronics. This Outemu switch come with polycarbonate clear housings and SMD LED compatible.",
                "listedName": "Outemu ICE v2 Dark Purple SMD RGB Switch (Tactile 68g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force": "68 cN"
                },
                "itemCost": "0.55 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu Ice V2 (Gray)"],
        "image": "outemu-ice-v2-gray.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Outemu",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "B"],
                "excerpt": "Outemu ICE series is a premium series of Cherry MX clone switches from Gaote Electronics. This Outemu switch come with polycarbonate clear housings and SMD LED compatible.",
                "listedName": "Outemu ICE v2 Gray SMD RGB Switch (Tactile 75g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force": "75 cN"
                },
                "itemCost": "0.55 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu Ice V2 (Light Purple)"],
        "image": "outemu-ice-v2-light-purple.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Outemu",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "D"],
                "excerpt": "Outemu ICE series is a premium series of Cherry MX clone switches from Gaote Electronics. This Outemu switch come with polycarbonate clear housings and SMD LED compatible.",
                "listedName": "Outemu ICE v2 Light Purple SMD RGB Switch (Tactile 62g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force": "62 cN"
                },
                "itemCost": "0.55 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu Ice V2 (Teal)"],
        "image": "outemu-ice-v2-teal.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "Outemu",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "E"],
                "excerpt": "Outemu ICE series is a premium series of Cherry MX clone switches from Gaote Electronics. This Outemu switch come with polycarbonate clear housings and SMD LED compatible.",
                "listedName": "Outemu ICE v2 Teal SMD RGB Switch (Tactile Click 68g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force": "68 cN"
                },
                "itemCost": "0.55 AUD",
                "sfCost": "0.25 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Outemu (Lime)"],
        "image": "outemu-lime.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004056249249.html",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {
            "Operating force": "50 gf",
            "Pre/total travel": "1.8 mm / 3.3 mm",
            "mkzealots": "https://www.aliexpress.com/item/1005004056249249.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["A 12"],
                "itemCost": "0.76 AUD",
                "sfCost": "0.09 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Honey Peach)"],
        "image": "outemu-honey-peach.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004056249249.html",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {
            "Operating force": "40 gf",
            "Pre/total travel": "2.0 mm / 3.3 mm",
            "mkzealots": "https://www.aliexpress.com/item/1005004056249249.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["A09"],
                "itemCost": "0.76 AUD",
                "sfCost": "0.09 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Red Panda)"],
        "image": "outemu-red-panda.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004056249249.html",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {
            "Operating force": "65 gf",
            "Pre/total travel": "1.8 mm / 3.3 mm",
            "mkzealots": "https://www.aliexpress.com/item/1005004056249249.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["A 12"],
                "itemCost": "0.76 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Crystal)"],
        "image": "outemu-crystal.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004056249249.html",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {
            "Operating force": "45 gf",
            "Pre/total travel": "2.0 mm / 4.0 mm",
            "mkzealots": "https://www.aliexpress.com/item/1005004056249249.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["A06"],
                "itemCost": "0.75 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Yellow Silver)"],
        "image": "outemu-yellow-silver.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004056249249.html",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {
            "Operating force": "45 gf",
            "Pre/total travel": "1.3 mm / 4.0 mm",
            "mkzealots": "https://www.aliexpress.com/item/1005004056249249.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["A 16"],
                "itemCost": "0.75 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Ocean Clicky)"],
        "image": "outemu-ocean-clicky.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004171485365.html",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Almost identical in appearance to the Ocean Linear.\nSince the housing is transparent, you can see the Ocean Clicky has a click jacket (but the Ocean Linear does not).\nThe Ocean Clicky has no top housing SMD cutout (but the Ocean Linear does)."
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["07"],
                "itemCost": "0.75 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Ocean Linear)"],
        "cosmeticVariant": "Box Stem",
        "image": "outemu-ocean-linear-box-stem.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004171485365.html",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "additionalIDNotes": "Almost identical in appearance to the Ocean Clicky.\n(See the Ocean Clicky's notes for more information.)"
        },
        "documentedCharacteristics": {
            "": "(see source)",
            "ineda": "https://www.aliexpress.com/item/1005002427848379.html"
        },
        "origins": [
            {
                "originID": "2022-05-15 INEDA-CN",
                "count": 1,
                "undersideMouldLabel": ["A03"],
                "itemCost": "0.75 AUD",
                "sfCost": "0.08 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Ocean Linear)"],
        "cosmeticVariant": "Regular Stem",
        "image": "outemu-ocean-linear-regular-stem.jpg",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["A05"],
                "listedName": "Outemu Ocean Silent",
                "listedSpecs": {
                    "Actuation Force": "45g",
                    "Bottom Out Force": "65g",
                    "Actuation": "1.6mm",
                    "Bottom Out": "3.3mm"
                }
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Phoenix) (62g)"],
        "image": "outemu-phoenix.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004171485365.html",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "pins": 5,
            "additionalIDNotes": "No dust jacket/\"box\".\nSimilar colours to the Ocean switches."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "B"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "Outemu Phoenix is a premium enthusiast grade series of Cherry MX clone switches from Gaote Electronics. Designed from the ground up, click switch for mechanical keyboard inspired by the old Aristotle (Taiwan White) switches. They feature a one piece stem from the cross post down thru the rails with a unique under-skirt click mechanism. Result is a double-click sound (click on down-stroke, click on up-stroke). This Outemu phoenix switch come with Blue ICE polycarbonate bases and clear no-slot tops (only compatible with PCB mounted / SMD LED).",
                "listedName": "Outemu Phoenix SMD RGB Switch (Double Click 62g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force": "62 cN"
                },
                "itemCost": "0.99 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu (Phoenix) (68g)"],
        "image": "outemu-phoenix.jpg",
        "imageAcknowledgement": "https://www.aliexpress.com/item/1005004171485365.html",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabel": "OUTEMU",
            "pins": 5,
            "additionalIDNotes": "No dust jacket/\"box\".\nSimilar colours to the Ocean switches."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "A"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "[similar to the 62g version]",
                "listedName": "Outemu Phoenix SMD RGB Switch (Double Click 68g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force": "68 cN"
                },
                "itemCost": "0.99 AUD",
                "sfCost": "0.45 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Outemu Sky V2.2"],
        "image": "outemu-sky-v2-2.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "Outemu",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["OUTEMU", "A"],
                "excerpt": "Outemu SKY series is a series of Cherry MX clone switches from Gaote Electronics. This Outemu switch come with sky blue tops, sky blue bottoms, clear stems, and SMD LED compatible.",
                "listedName": "Outemu SKY v2.2 SMD RGB Switch (Tactile 68g - PCB Mount)",
                "listedSpecs": {
                    "Actuation Force": "68 cN"
                },
                "itemCost": "0.71 AUD",
                "sfCost": "0.32 AUD"
            }
        ]
    }
],[
    {
        "name": ["Prime Keyboards Alpaca"],
        "image": "prime-keyboards-alpaca.jpg",
        "imageAcknowledgement": "https://ilumkb.com/products/alpaca-linears",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["13"],
                "comment": "Found in the second bag of the packaging.",
                "excerpt": "Smooth linear switch with gold plated 62g springs, PCB mount",
                "listedName": "Alpaca",
                "itemCost": "1.36 AUD",
                "sfCost": "1.31 AUD"
            }
        ]
    }
],[
    {
        "name": ["Rebult Keyboards Penyu"],
        "image": "rebult-keyboards-penyu.jpg",
        "imageAcknowledgement": "https://shopee.com.my/Penyu-(Wildlife-Switches-by-Rebult-JWK)-Mechanical-Switch-For-Mechanical-Keyboards-i.261957418.11586949552",
        "cosmeticFeatures": {
            "topLabel": "",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {
            "Spring": "62g",
            "Stem": "\"Long Pole POM\"",
            "Top Housing": "Nylon",
            "Bottom Housing": "\"Nylon Blend\"",
            "official?": "https://www.rebultkeyboards.com/products/-in-stock-penyu-linear-switch"
        },
        "origins": [
            {
                "originID": "2022-05-02 ALL-CAPS-AU",
                "count": 1,
                "undersideMouldLabel": ["80"],
                "listedName": "Rebult Penyu",
                "itemCost": "1.16 AUD",
                "sfCost": "0.21 AUD"
            }
        ]
    }
],[
    {
        "name": ["SP-Star Blue Pink"],
        "image": "sp-star-blue-pink.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-STAR",
            "pins": 5,
            "additionalIDNotes": "The label is entirely capitalized (rather than how the other SP-Star switches are not)."
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["15", "S"],
                "excerpt": "SP-Star Blue Pink use the newest linear mold with SMD LED compatible on bottom housing. Features a hole in the center post of the bottom housing, with light lubing all-around, and hand-applied lube to the stem legs. Very smooth linear switches with 62g two-stage short gold-plated spring.",
                "listedName": "SP-Star Blue Pink Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "45g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.8mm",
                    "Top Housing":      "Nylon",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube + Hand Lube)"
                },
                "itemCost": "0.71 AUD",
                "sfCost": "0.32 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Duck"],
        "image": "sp-star-duck.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["12"],
                "excerpt": "These SP-Star Duck switches manufactured by SP-Star are smooth and produces a nice higher-pitched \"clack\" due to the full Polycarbonate (PC) housing. SP-Star Duck is light tactile switches, very similar with Cherry MX Brown and smoother.",
                "listedName": "SP-Star Duck Switch (Tactile 57g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "57g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.71 AUD",
                "sfCost": "0.32 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Luminous"],
        "cosmeticVariant": "Cyber",
        "image": "sp-star-luminous-cyber.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "It glows in the dark!"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["13"],
                "excerpt": "These SP-Star Luminous GID switches manufactured by SP-Star are smooth and produces a nice higher-pitched \"clack\" due to the full Polycarbonate (PC) housing. These SP-Star Switches have a fun little secret, once exposed to enough light, you will find them shining at night, even without any RGB, that's because they are glow in the dark switches! The shell on these switches absorbs the light source (ultraviolet light is the best) and it will have 2-3 minutes of fluorescent effect in the dark light. The luminosity and duration of luminous materials are affected by the environment, the light source absorbed (not its own light source), and the time. They are not always bright.",
                "listedName": "SP-Star Luminous Cyber Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Luminous"],
        "cosmeticVariant": "Starry Night",
        "image": "sp-star-luminous-starry-night.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "semitransparent",
            "pins": 5,
            "additionalIDNotes": "It glows in the dark!"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["01"],
                "excerpt": "These SP-Star Luminous GID switches manufactured by SP-Star are smooth and produces a nice higher-pitched \"clack\" due to the full Polycarbonate (PC) housing. These SP-Star Switches have a fun little secret, once exposed to enough light, you will find them shining at night, even without any RGB, that's because they are glow in the dark switches! The shell on these switches absorbs the light source (ultraviolet light is the best) and it will have 2-3 minutes of fluorescent effect in the dark light. The luminosity and duration of luminous materials are affected by the environment, the light source absorbed (not its own light source), and the time. They are not always bright.",
                "listedName": "SP-Star Luminous Starry Night Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.86 AUD",
                "sfCost": "0.39 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Meteor White"],
        "image": "sp-star-meteor-white.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["31"],
                "excerpt": "These SP-Star Meteor White switches manufactured by SP-Star are smooth and produces a soft bottom out due to the all-nylon housing of the switch, which feels softer than a Polycarbonate (PC) housing. Meteor White also has a nice, dampened sound signature too.",
                "listedName": "SP-Star Meteor White Switch (Linear 57g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "57g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.69 AUD",
                "sfCost": "0.31 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Polaris Gray"],
        "image": "sp-star-polaris-gray.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["01"],
                "excerpt": "These SP-Star Polaris Gray switches manufactured by SP-Star are smooth and produces a nice higher-pitched \"clack\" due to the full Polycarbonate (PC) housing.",
                "listedName": "SP-Star Polaris Gray Switch (Linear 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.71 AUD",
                "sfCost": "0.32 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Polaris Purple"],
        "image": "sp-star-polaris-purple.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["10"],
                "excerpt": "These SP-Star Polaris Purple switches manufactured by SP-Star are smooth and produces a nice higher-pitched \"clack\" due to the full Polycarbonate (PC) housing.",
                "listedName": "SP-Star Polaris Purple Switch (Tactile 67g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "67g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.71 AUD",
                "sfCost": "0.32 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Polaris White"],
        "image": "sp-star-polaris-white.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["01"],
                "excerpt": "These SP-Star Polaris White switches manufactured by SP-Star are smooth and produces a nice higher-pitched \"clack\" due to the full Polycarbonate (PC) housing.",
                "listedName": "SP-Star Polaris White Switch (Linear 57g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "57g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.71 AUD",
                "sfCost": "0.32 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Red Blue CP"],
        "image": "sp-star-red-blue-cp.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["15"],
                "excerpt": "These SP-Star Red Blue CP switches manufactured by SP-Star are smooth and produces a nice higher-pitched \"clack\" due to the full Polycarbonate (PC) housing. Very smooth linear switches with 57g two-stage, 14.5mm springs.",
                "listedName": "SP-Star Red Blue CP Switch (Linear 57g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "57g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.71 AUD",
                "sfCost": "0.32 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["SP-Star Vanilla"],
        "image": "sp-star-vanilla.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["23"],
                "excerpt": "These SP-Star Vanilla switches manufactured by SP-Star are smooth and produces a soft bottom out due to the all-nylon housing of the switch, which feels softer than a Polycarbonate (PC) housing. Vanilla featured two-stage spring and also has a nice, dampened sound signature too.",
                "listedName": "SP-Star Vanilla Switch (Linear 62g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "62g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Nylon",
                    "Stem":             "POM",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.69 AUD",
                "sfCost": "0.31 AUD"
            }
        ]
    },
    {
        "name": ["SP-Star Yanyu"],
        "image": "sp-star-yanyu.jpg",
        "cosmeticFeatures": {
            "topLabel": "SP-Star",
            "smd": "no",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["13"],
                "excerpt": "These SP-Star Yanyu (Jade Pink) switches manufactured by SP-Star are smooth and produces a nice higher-pitched \"clack\" due to the full Polycarbonate (PC) housing. Very smooth linear switches with 48g two-stage, 15mm springs.",
                "listedName": "SP-Star Yanyu Switch (Linear 48g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "48g",
                    "Actuation Force":  "- (No Data)",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "4mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.71 AUD",
                "sfCost": "0.32 AUD"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Strawberry Milk Linear"],
        "image": "strawberry-milk-linear.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["11"],
                "excerpt": "Strawberry Milk Linears were inspired by one of our favorite childhood treats. These switches feature their own collectible milk bottle packaging, and the newest linear mold from Tecsee incorporating all improvements from past revisions. The switches are smoother, the tolerances are tighter, and ping has been improved. Take the plunge to enjoy this refreshing typing experience - you may get hooked!",
                "listedName": "Strawberry Milk - Linear",
                "listedSpecs": {
                    "Top Housing": "Nylon",
                    "Bottom Housing": "Nylon",
                    "Stem": "POM",
                    "Travel": "3.5mm",
                    "Actuation": "55g",
                    "Bottom Out": "67g",
                    "Additional Notes": "Gold plated spring; UNLUBED from factory; Manufactured by Tecsee"
                }
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Team Wolf Red"],
        "image": "team-wolf-red.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/team-wolf.png"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["1", "-6"],
                "excerpt": "A generic Cherry clone from Team Wolf, claimed to be manufactured by their parent company Abit Corp. But hey look, it has a circular hole for the stem, that's weird.",
                "listedName": "Team Wolf Red"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Team Wolf Black"],
        "image": "team-wolf-black.jpg",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/team-wolf.png"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["5", "-3"],
                "excerpt": "A generic Cherry clone from Team Wolf, claimed to be manufactured by their parent company Abit Corp. But hey look, it has a circular hole for the stem, that's weird.",
                "listedName": "Team Wolf Black"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Team Wolf Blue"],
        "image": "team-wolf-blue.jpg",
        "type": "clicky",
        "cosmeticFeatures": {
            "topLabelImage": "top-label-sketches/team-wolf.png"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["1", "-9"],
                "excerpt": "A generic Cherry clone from Team Wolf, claimed to be manufactured by their parent company Abit Corp. But hey look, it has a circular hole for the stem, that's weird.",
                "listedName": "Team Wolf Blue"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Team Wolf x Manic Red"],
        "image": "team-wolf-manic-red.jpg",
        "cosmeticFeatures": {
            "topLabel": "MANIC"
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-27 SWOD-US",
                "count": 1,
                "undersideMouldLabel": ["K"],
                "excerpt": "A generic Cherry clone from Team Wolf with South Korean gaming brand Manic's logo on the nameplate, claimed to be manufactured by their parent company Abit Corp. But hey look, it has a circular hole for the stem, that's weird.",
                "listedName": "Team Wolf x Manic Red"
            }
        ]
    }
],[
    {
        "unverified": true,
        "name": ["Tecsee Aurora"],
        "image": "tecsee-aurora.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["8"],
                "excerpt": "This switches feature a proprietary plastic blend from TECSEE called PME. This material is used for both the top and bottom housing and provides for a slightly deeper sound signature than other traditional plastic blends. The switches also utilize a long pole stem for a more solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Aurora Switch (Linear 68g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "68g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Proprietary Blend (PME)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Proprietary Blend (PME)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.65 AUD",
                "sfCost": "0.29 AUD"
            }
        ]
    },
    {
        "name": ["Tecsee Blue Sky (Linear)"],
        "image": "tecsee-blue-sky.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/tecsee-blue-sky-bluesky-linear-tactile-switch-5pin-rgb-smd-63-5g-mx-switch-for-mechanical-keyboard-60m-gold-sping-pom-hpe",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["5"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "TECSEE Blue Sky Cloud switches housing feature a full HPE housing. The material offers smoothness from that of UHMWPE, with an appearance close to Tecsee's other switches made from PME. Sound wise, these are rather similar to that of milky housings from Gateron but with an added crispness, as opposed to the more muted and subtle milky housings. Many UHMWPE Switch users reported the stem because it is too soft, with time it can get smaller and loose. The new HPE material features a soft, smooth feeling and comfort without deforming as easily as the old version. Very smooth linear switches with 63.5g two stage, 22mm long springs. The switches also utilize a long pole stem for a solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Blue Sky Cloud HPE Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3.4mm",
                    "Top Housing":      "HPE",
                    "Stem":             "POM",
                    "Bottom Housing":   "HPE",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.76 AUD",
                "sfCost": "0.35 AUD"
            }
        ]
    },
    {
        "name": ["Tecsee Blue Sky (Tactile)"],
        "image": "tecsee-blue-sky.jpg",
        "imageAcknowledgement": "https://kprepublic.com/products/tecsee-blue-sky-bluesky-linear-tactile-switch-5pin-rgb-smd-63-5g-mx-switch-for-mechanical-keyboard-60m-gold-sping-pom-hpe",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["6"],
                "comment": "Found packaged in its own individual zip bag.",
                "excerpt": "TECSEE Blue Sky Cloud switches housing feature a full HPE housing. The material offers smoothness from that of UHMWPE, with an appearance close to Tecsee's other switches made from PME. Sound wise, these are rather similar to that of milky housings from Gateron but with an added crispness, as opposed to the more muted and subtle milky housings. Many UHMWPE Switch users reported the stem because it is too soft, with time it can get smaller and loose. The new HPE material features a soft, smooth feeling and comfort without deforming as easily as the old version. Very smooth tactile switches with 63.5g two stage, 22mm long springs. The switches also utilize a long pole stem for a solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Blue Sky Cloud HPE Switch (Tactile 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3mm",
                    "Top Housing":      "HPE",
                    "Stem":             "POM",
                    "Bottom Housing":   "HPE",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.76 AUD",
                "sfCost": "0.35 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Tecsee Carrot"],
        "image": "tecsee-carrot.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["3"],
                "excerpt": "This switches feature a proprietary plastic blend from TECSEE called PME. This material is used for both the top and bottom housing and provides for a slightly deeper sound signature than other traditional plastic blends. The switches also utilize a long pole stem for a more solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Carrot Switch (Linear 68g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "68g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Proprietary Blend (PME)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Proprietary Blend (PME)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.65 AUD",
                "sfCost": "0.29 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Tecsee Coral"],
        "image": "tecsee-coral.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["1"],
                "excerpt": "This switches feature a proprietary plastic blend from TECSEE called PME. This material is used for the bottom housing and provides a slightly deeper sound signature than other traditional plastic blends. The switches also utilize newest TECSEE Nylon long pole stem for a more solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Coral Switch (Tactile 68g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "68g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "1.8mm",
                    "Total Travel":     "3mm",
                    "Top Housing":      "Nylon",
                    "Stem":             "Nylon",
                    "Bottom Housing":   "Proprietary Blend (PME)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Tecsee Creamsicle"],
        "image": "tecsee-creamsicle.jpg",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["10"],
                "excerpt": "This switches feature a proprietary plastic blend from TECSEE called PME. This material is used for both the top and bottom housing and provides for a slightly deeper sound signature than other traditional plastic blends. The switches also utilize a long pole stem for a more solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Creamsicle Switch (Tactile 68g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "68g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3mm",
                    "Top Housing":      "Proprietary Blend (PME)",
                    "Stem":             "POM",
                    "Bottom Housing":   "Proprietary Blend (PME)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.65 AUD",
                "sfCost": "0.29 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Tecsee Ice Candy"],
        "image": "tecsee-ice-candy.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["4"],
                "excerpt": "TECSEE Ice Candy Nylon switches housing feature a full Polycarbonate (PC) housing. Very smooth linear switches with 63.5g two stage, 22mm long springs. The switches also utilize a long pole stem for a solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Ice Candy Nylon Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "Nylon",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Tecsee Ice Grape"],
        "image": "tecsee-ice-grape.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["11"],
                "excerpt": "TECSEE Ice Grape switches housing feature a full Polycarbonate (PC) housing. Very smooth linear switches with 63.5g two stage, 22mm long springs. The switches also utilize a UHMWPE stem for a more solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Ice Grape Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "UHMWPE",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "name": ["Tecsee Ice Mint"],
        "image": "tecsee-ice-mint.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["4"],
                "excerpt": "TECSEE Ice Mint switches housing feature a full Polycarbonate (PC) housing. Very smooth linear switches with 63.5g two stage, 22mm long springs. The switches also utilize a long pole stem for a solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Ice Mint Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2mm",
                    "Total Travel":     "3.5mm",
                    "Top Housing":      "Polycarbonate (PC)",
                    "Stem":             "Nylon",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Tecsee Jadeite"],
        "image": "tecsee-jadeite.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["15"],
                "excerpt": "TECSEE Jadeite switches housing feature a UHMWPE top housing and Polycarbonate (PC) bottom housing. Very smooth linear switches with 63.5g two-stage, 22mm long springs. The switches also utilize a UHMWPE stem for a more smooth and solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Jadeite Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "2.1mm",
                    "Total Travel":     "3.8mm",
                    "Top Housing":      "UHMWPE",
                    "Stem":             "UHMWPE",
                    "Bottom Housing":   "Polycarbonate (PC)",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "unverified": true,
        "name": ["Tecsee Oreo"],
        "image": "tecsee-oreo.jpg",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-17 MKCOID-ID",
                "count": 1,
                "undersideMouldLabel": ["10"],
                "excerpt": "TECSEE Oreo switches housing feature a PME top housing and Nylon bottom housing. Very smooth linear switches with 63.5g two stage, 22mm long springs. The switches also utilize a UHMWPE stem for a more smooth and solid bottom out sound with very lightly lubed and while they are ready to go on any mechanical keyboard, those inclined to tune their switches will find an excellent starting point.",
                "listedName": "TECSEE Oreo Switch (Linear 63.5g - PCB Mount)",
                "listedSpecs": {
                    "Bottom Out Force": "63.5g",
                    "Actuation Force":  "55g",
                    "Actuation Travel": "1.9mm",
                    "Total Travel":     "3.8mm",
                    "Top Housing":      "Proprietary Blend (PME)",
                    "Stem":             "UHMWPE",
                    "Bottom Housing":   "Nylon",
                    "Lube":             "Lubed (Factory Lube)"
                },
                "itemCost": "0.92 AUD",
                "sfCost": "0.42 AUD"
            }
        ]
    },
    {
        "name": ["Tecsee Purple Panda"],
        "image": "tecsee-purple-panda.jpg",
        "imageAcknowledgement": "https://keygem.store/en-au/products/tecsee-purple-panda-switch-10pcs",
        "type": "tactile",
        "cosmeticFeatures": {
            "topLabel": "TECSEE",
            "pins": 5
        },
        "documentedCharacteristics": {},
        "origins": [
            {
                "originID": "2022-05-11 HippoKeys-US",
                "count": 1,
                "undersideMouldLabel": ["4"],
                "comment": "Found in the first bag of the packaging.",
                "excerpt": "Tactile, 3.0mm Travel, 55g actuation, 67g bottom",
                "listedName": "Tecsee Purple Panda",
                "itemCost": "1.25 AUD",
                "sfCost": "1.20 AUD"
            }
        ]
    }
]
];

validateJSONCompatibility(hardcodedSwitchData);
validateHardcodedData(hardcodedSwitchData);
export const switches: SwitchCategory[][] = addDefaults();
validateJSONCompatibility(switches);
