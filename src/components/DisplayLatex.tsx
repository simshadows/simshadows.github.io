import katex from "katex";
import "katex/dist/katex.min.css";

import {getConfig} from "@root/latex-helpers/katex-config";

interface Props {
    readonly code: string;
}

export default function DisplayLatex({code}: Props) {
    const rawHTML = katex.renderToString(code, getConfig(true));
    return <p>
        <div
            class="horizontally-scrolling-box"
            dangerouslySetInnerHTML={{__html: rawHTML}}
        />
    </p>;
}

