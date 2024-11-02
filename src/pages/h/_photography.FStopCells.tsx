interface Props {
    readonly a: number; // divide by 3 to get the actual AV number
    readonly n: number; // divide by 10 to get the actual N value
}

export default function FStopCells({a, n}: Props) {
    const actualAV = a / 3;
    const stdN = n / 10;

    let style = "font-family: monospace;"
    if (!(a % 3)) {
        style += "background-color: var(--color--mylightblue); font-weight: bold;";
    }

    const factor = 1000;
    const calcN = Math.sqrt(Math.pow(2, actualAV));
    const calcNrounded = Math.round((calcN + Number.EPSILON) * factor) / factor;
    let calcNstr = ((calcN >= 10) ? "" : " ") + String(calcNrounded);
    if (calcNstr.length > 2) {
        calcNstr = calcNstr.padEnd(6, "0");
    }

    return <>
        <td style={style}>{String(actualAV).substring(0, 3)}{(a % 3) ? "..." : ""}</td>
        <td style={style}>f/ {stdN}</td>
        <td style={style}>f/ {calcNstr}</td>
    </>;
}

