function pair(s: string | undefined): [string, string] | [] {
    if (!s) return [];
    const [a, b] = s.split(" ");
    if (!a || !b) throw new Error("Missing unit?");
    return [a, b];
}

interface Props {
    readonly name: string; // This is a comment

    readonly ambient?: string;

    readonly f0: string;
    readonly f1: string;

    readonly t0c: string;
    readonly t1c: string;
    readonly t0d: string;
    readonly t1d: string;

    readonly pkg:  string;
    readonly vc:   string;
    readonly wall: string;

    readonly ppt?: string;
    readonly tdc?: string;
    readonly edc?: string;
}

export default function CellTempsVals(props: Props) {
    const {
        name,
        ambient,
        f0,
        f1,
        t0c,
        t1c,
        t0d,
        t1d,
        pkg,
        vc,
        wall,
        ppt,
        tdc,
        edc,
    } = props;

    if (!name) throw new Error("Required.");

    if (!f0) throw new Error("Required.");
    if (!f1) throw new Error("Required.");

    if (!t0c) throw new Error("Required.");
    if (!t1c) throw new Error("Required.");
    if (!t0d) throw new Error("Required.");
    if (!t1d) throw new Error("Required.");

    if (!pkg ) throw new Error("Required.");
    if (!vc  ) throw new Error("Required.");
    if (!wall) throw new Error("Required.");

    const pairs = [
        pair(ambient),
        [],
        pair(f0),
        pair(f1),
        [],
        pair(t0c),
        pair(t1c),
        pair(t0d),
        pair(t1d),
        [],
        pair(pkg),
        pair(vc),
        pair(wall),
        [],
        [ppt || ""],
        [tdc || ""],
        [edc || ""],
        //[],
        //[name || ""],
    ];

    const getLen = (i: number) =>
        (x: string[]) => (x.length === 2) ? (x[i]?.length || 0) : 0;
    const lLen = Math.max(...pairs.map(getLen(0)));
    const rLen = Math.max(...pairs.map(getLen(1)));

    const content = pairs.map(x => {
        switch (x.length) {
            case 0:
                return "";
            case 1:
                return x[0];
            case 2:
                const a = x[0];
                const b = x[1];
                if (!a || !b) throw new Error("This should never happen.");
                return a.padStart(lLen, " ") + " " + b.padEnd(rLen, " ");
            default:
                throw new Error(`Unexpected length ${x.length}`);
        }
    }).join("\n");

    return <td>{content}</td>;
}

