import {readDateStr} from "@helpers/props";

const categoryRemaps: ReadonlyMap<string | undefined, string> = new Map([
    ["entree", "entrée"],
]);

interface Props {
    readonly c?: string; // Category
    readonly d:  string; // Date, accepts ISO date, or "unknown"
    readonly n:  string; // Name
    readonly help?: string; // Helper Text
    readonly isTakeout?: boolean;
}

export default function Item(
    {
        c=undefined,
        d,
        n,
        help=undefined,
        isTakeout=false
    }: Props
) {
    const categoryElem = (()=>{
        const s: string | undefined = categoryRemaps.get(c) || c;
        return (s) ? <><b>[{s}]</b> </> : <></>;
    })();

    const date = (()=>{
        if (d === "unknown") return "????-??-?? - ";
        const x = readDateStr(d);
        return (x) ? `${x} - ` : "????-??-?? - ";
    })();

    const _help = (()=>{
        return (help) ? ` (${help})` : "";
    })();

    isTakeout; // TODO: We should use this
    return <span>{categoryElem}{date}{n}{_help}</span>;
}

