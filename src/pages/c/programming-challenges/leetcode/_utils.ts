import {isStrArray} from "@root/danger";

function slugToLeetcodeURL(s: string) {
    return `https://leetcode.com/problems/${s}/`;
}

function difficultyIDToName(s: string) {
    switch (s) {
        case "easy":   return "Easy";
        case "medium": return "Medium";
        case "hard":   return "Hard";
        default: throw new Error(`String ${s} is not a valid difficulty name.`);
    }
}

export interface solLayoutFM {
    difficulty: "easy" | "medium" | "hard";
    title:      string;
    num:        number;
    //webslug:  string; // Not provided directly.
    //accessed: string; // Not provided directly.
    keywords:   string[];
    needsimprovement: boolean;
    wip:        boolean;

    accessedStr:    string;
    leetcodeURL:    string;
    difficultyName: string;
}
export function processSolLayoutFrontmatter(frontmatter: Record<string, unknown>): solLayoutFM {
    const {
        title,
        difficulty,
        num,
        webslug,
        accessed,
        keywords,
    } = frontmatter;
    const wip: boolean = !!frontmatter["wip"];
    const needsimprovement: boolean = !!frontmatter["needsimprovement"];

    function errStr(expectedType: string, k: string, v: unknown) {
        return `Expected ${k} to be ${expectedType}. Actually received: ${v}`;
    }

    switch (difficulty) {
        default:
            throw new Error("'difficulty' must be one of 'easy', 'medium', or 'hard'.");
        case "easy":
        case "medium":
        case "hard":
    }

    if ((typeof num !== "number") || (!Number.isInteger(num)) || (num <= 0)) {
        throw new Error("'num' must be an integer >0.");
    }

    if ((!title) || (typeof title !== "string")) {
        throw new Error(errStr("a string", "title", title));
    }

    if ((!webslug) || (typeof webslug !== "string")) {
        throw new Error(errStr("a string", "webslug", webslug));
    }

    if ((!accessed) || (typeof accessed !== "string")) {
        throw new Error(errStr("a string", "accessed", accessed));
    }

    if (!isStrArray(keywords)) {
        throw new Error(errStr("an array of strings", "keywords", keywords));
    }

    return {
        title,
        difficulty,
        num,
        keywords,
        needsimprovement,
        wip,

        accessedStr: (new Date(accessed)).toISOString().slice(0, 10),
        leetcodeURL: slugToLeetcodeURL(webslug),
        difficultyName: difficultyIDToName(difficulty),
    };
}
