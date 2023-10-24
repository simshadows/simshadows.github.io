import katex from "katex";
import "katex/dist/katex.min.css";

import {getConfig} from "@root/latex-helpers/katex-config";

interface Props {
    readonly code: string;
}

export default function GatherVarLatex({code}: Props) {
    const newCode = `\\begin{align*} ${code} \\end{align*}`;
    const rawHTML = katex.renderToString(newCode, getConfig(true));
    return <p>
        <div
            class="horizontally-scrolling-box"
            dangerouslySetInnerHTML={{__html: rawHTML}}
        />
    </p>;
}

