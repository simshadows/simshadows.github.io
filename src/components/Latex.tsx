import katex from "katex";
import "katex/dist/katex.min.css";

interface Props {
    readonly code: string;
}

export default function Latex({code}: Props) {
    const rawHTML = katex.renderToString(code);
    return <span dangerouslySetInnerHTML={{__html: rawHTML}} />;
}

