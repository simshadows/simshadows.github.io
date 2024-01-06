import katex from "katex";
import "katex/dist/katex.min.css";

import "./DisplayLatex.css";

import {getConfig} from "@root/latex-helpers/katex-config";

interface Props {
    readonly code: string;
    readonly moreMacros?: {[key: string]: string;};
}

export default function DisplayLatex(props: Props) {
    if (!props.code) throw new Error("`code` must be a non-empty string.");
    const moreMacros = props.moreMacros || {};
    if (typeof moreMacros !== "object") {
        throw new Error("`moreMacros` must be an object.");
    }
    const rawHTML = katex.renderToString(props.code, getConfig(true, moreMacros));
    return <p><div
        class="display-latex horizontally-scrolling-box"
        dangerouslySetInnerHTML={{__html: rawHTML}}
    /></p>;
}

