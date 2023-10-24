import katex from "katex";
import "katex/dist/katex.min.css";

import "./DisplayLatex.css";

import {getConfig} from "@root/latex-helpers/katex-config";

interface Props {
    readonly code: string;
}

export default function GatherVarLatex({code}: Props) {
    const newCode = `\\begin{gather*} ${code} \\end{gather*}`;
    const rawHTML = katex.renderToString(newCode, getConfig(true));
    return <p>
        <div
            class="display-latex horizontally-scrolling-box"
            dangerouslySetInnerHTML={{__html: rawHTML}}
        />
    </p>;
}

