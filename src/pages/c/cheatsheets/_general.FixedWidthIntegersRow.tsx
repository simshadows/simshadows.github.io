import Latex from "@components/latex/Latex";

interface Props {
    readonly bytes: number;
    readonly signed: boolean;

    readonly cTypes: string[]; // "Minimum C types"

    // sMin and sMax are purely for sanity-checking.
    // They're strings since they'll be converted to BigInt
    readonly sMin: string;
    readonly sMax: string;
}

export default function FixedWidthIntegersRow(
        {bytes, signed, sMin, sMax, cTypes}: Props
) {
    if (!Number.isInteger(bytes)) throw new Error("'bytes' be an integer.");
    if (bytes < 1) throw new Error("'bytes' must be > 0.");

    if (!cTypes.length) throw new Error("'cTypes' must be non-empty.");

    const bits = bytes * 8;
    const magBits = (signed) ? bits - 1 : bits;
    
    const vmin = -(1n << BigInt(magBits));
    const vmax = (1n << BigInt(magBits)) - 1n;
    if (vmin >= 0n) throw new Error("Failed sanity check.");
    if (vmax <= 0n) throw new Error("Failed sanity check.");

    if (signed) {
        if (vmin != BigInt(sMin)) throw new Error("Failed 'sMin' sanity check.");
    } else {
        if (BigInt(sMin) != 0n) throw new Error("'sMin' must be zero.");
    }
    if (vmax != BigInt(sMax)) throw new Error("Failed 'sMax' sanity check.");

    let vminMant = vmin;
    let vminExp = 0;
    while (vminMant <= -10n) {
        ++vminExp;
        vminMant /= 10n;
    }

    let vmaxMant = vmax;
    let vmaxExp = 0;
    while (vmaxMant >= 10n) {
        ++vmaxExp;
        vmaxMant /= 10n;
    }

    const mathyRenders = (()=>{
        if (signed) {
            return <>
                <td>{`Signed ${bits}-bit (${bytes} bytes)`}</td>
                <td><code>{vmin.toString()}</code></td>
                <td><Latex code={`-2^{${bits - 1}}`} /></td>
                <td><Latex code={`\\lessapprox ${vminMant} \\times {10}^{${vminExp}}`} /></td>
                <td><code>{vmax.toString()}</code></td>
                <td><Latex code={`2^{${bits - 1}} - 1`} /></td>
                <td><Latex code={`\\gtrapprox ${vmaxMant} \\times {10}^{${vmaxExp}}`} /></td>
            </>;
        } else {
            return <>
                <td>{`Unsigned ${bits}-bit (${bytes} bytes)`}</td>
                <td><code>0</code></td>
                <td></td>
                <td></td>
                <td><code>{vmax.toString()}</code></td>
                <td><Latex code={`2^{${bits}} - 1`} /></td>
                <td><Latex code={`\\gtrapprox ${vmaxMant} \\times {10}^{${vmaxExp}}`} /></td>
            </>;
        }
    })()

    return <tr>
        {mathyRenders}
        <td><code>{cTypes.join(" | ")}</code></td>
    </tr>;
}

