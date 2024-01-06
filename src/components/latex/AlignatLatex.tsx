import katex from "katex";
import "katex/dist/katex.min.css";

import "./DisplayLatex.css";

import {getConfig} from "@root/latex-helpers/katex-config";

interface Props {
    readonly code: string;
    readonly moreMacros?: {[key: string]: string;};
    readonly eqcols: number;
}

export default function AlignatLatex(props: Props) {
    const {code, eqcols} = props;
    const moreMacros = props.moreMacros || {};
    if (eqcols % 1) throw new Error("`eqcols` must be an integer.");
    const newCode = `\\begin{alignat*}{${eqcols}} ${code} \\end{alignat*}`;
    const rawHTML = katex.renderToString(newCode, getConfig(true, moreMacros));
    return <p><div
        class="display-latex horizontally-scrolling-box"
        dangerouslySetInnerHTML={{__html: rawHTML}}
    /></p>;
}

