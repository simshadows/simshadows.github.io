import katex from "katex";
import "katex/dist/katex.min.css";

import {katexConfig} from "@root/latex-helpers/katex-config";

interface Props {
    readonly code: string;
}

export default function Latex({code}: Props) {
    const rawHTML = katex.renderToString(code, katexConfig);
    return <span dangerouslySetInnerHTML={{__html: rawHTML}} />;
}

