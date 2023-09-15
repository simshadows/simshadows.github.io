/*
 * Filename: index.data.ts
 * Author:   simshadows <contact@simshadows.com>
 * License:  Creative Commons Attribution-ShareAlike 4.0 International (CC-BY-SA-4.0)
 */

export type SwitchType = "linear" | "tactile" | "clicky";
export type SMDType = "no" | "cutout" | "transparent" | "semitransparent";
export type PinsCount = 3 | 5;

interface Origin {
    readonly originID: string;
    readonly count: number;
    readonly undersideMouldLabel: string[];
    readonly excerpt?: string;
    readonly listedName?: string;
    readonly listedSpecs?: {};
    readonly itemCost?: string;
    readonly sfCost?: string;
    readonly comment?: string;
}

//const JUSTPASTEANDFLATTEN = {} as Origin; // TODO: This is a dumb hack to help with refactoring. Delete later.

interface _CosmeticFeatures {
    topLabel: string;
    smd?: SMDType;
    pins?: PinsCount;
    additionalIDNotes?: string;
}
export interface CosmeticFeatures {
    readonly topLabel: string;
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
    documentedCharacteristics: {};
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
    readonly documentedCharacteristics: {};
    readonly origins: {};
}


function transformCosmeticFeatures(obj: _CosmeticFeatures): CosmeticFeatures {
    return {
        topLabel:          obj.topLabel,
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
]
];

export const switches: SwitchCategory[][] = addDefaults();
