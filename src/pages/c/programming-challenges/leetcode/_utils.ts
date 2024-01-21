export function slugToLeetcodeURL(s: string) {
    return `https://leetcode.com/problems/${s}/`;
}

export function difficultyIDToName(s: string) {
    switch (s) {
        case "easy":   return "Easy";
        case "medium": return "Medium";
        case "hard":   return "Hard";
        default: throw new Error(`String ${s} is not a valid difficulty name.`);
    }
}
