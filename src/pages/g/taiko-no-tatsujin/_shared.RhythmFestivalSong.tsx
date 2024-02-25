import {isStrArray, isNumArray} from "@root/danger";

interface Props {
    // First string is always what appears on the English version.
    // Second string is for if there is an alternative Japanese name.
    // Currently throws error if there isn't either one or two elements each.
    // I'll figure out if i need to handle those cases...
    readonly name: string[];
    readonly artist: string[];
    readonly notes: string; // This is stuff like "From blah blah anime"
    readonly cat: string;

    readonly dif: 1 | 2 | 3 | 4 | 5;
    // 1 = Easy/Kantan
    // 2 = Normal/Futsuu
    // 3 = Hard/Muzukashii
    // 4 = Extreme/Oni
    // 5 = Ura Oni
    readonly stars: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

    readonly list: string;
    readonly num: [number, number]; // [actual number, base number]
}

export default function RhythmFestivalSong(
    {name, artist, notes, cat, dif, stars, list, num}: Props
) {
    if (!isStrArray(name)) throw new Error("name must be an array");
    if (![1, 2].includes(name.length)) throw new Error("name must have 1-2 elements");

    if (!isStrArray(artist)) throw new Error("artist must be an array");
    if (![0, 1, 2].includes(artist.length)) throw new Error("artist must have 0-2 elements");
    
    if (typeof notes !== "string") throw new Error("notes must be a string");

    switch (cat) {
        default:
            throw new Error(`Unexpected category: ${cat}`);
        case "Pop":
        case "Anime":
        case "Variety":
        case "NAMCO Original":
    }

    if (![1, 2, 3, 4, 5].includes(dif)) throw new Error("Invalid difficulty.");
    if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(stars)) throw new Error("Invalid stars.");

    switch (list) {
        default:
            throw new Error(`Unexpected list: ${list}`);
        case "Library":
        case "Taiko Music Pass":
        //case "Separately Sold Songs": // Unused rn
    }

    if (!isNumArray(num)) throw new Error("num must be an array");
    if (num.length != 2) throw new Error("num must be length 2");
    if (num[0] % 1) throw new Error("num must only contain integers");
    if (num[1] % 1) throw new Error("num must only contain integers");

    const difStr = (()=>{
        switch (dif) {
            case 1: return "Easy";
            case 2: return "Normal";
            case 3: return "Hard";
            case 4: return "Oni";
            case 5: return "Ura Oni";
            default: throw new Error();
        }
    })();

    const numStr = (list == "Taiko Music Pass") ? `[${num[0]} / ${num[1]}] ` : "";
    const artistStr = (artist.length) ? ` - ${artist[0]}` : "";
    const notesStr = (notes.length) ? ` - ${notes}` : "";

    return <li><span className="rfsong">{numStr}[{difStr} {"\u2605"}{stars}] {name[0]}{artistStr}{notesStr} [{cat}]</span></li>;
}

