export function toDisplayAlignat(latexCode: string, eqcols: number) {
    if (eqcols % 1) throw new Error("`eqcols` must be an integer.");
    return `\\begin{alignat*}{${eqcols}} ${latexCode} \\end{alignat*}`;
}

export function toDisplayAlign(latexCode: string) {
    return `\\begin{align*} ${latexCode} \\end{align*}`;
}

export function toDisplayGather(latexCode: string) {
    return `\\begin{gather*} ${latexCode} \\end{gather*}`;
}
