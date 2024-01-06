import {type ComponentProps} from "preact";

import DisplayLatex from "@components/latex/DisplayLatex";

type Props = ComponentProps<typeof DisplayLatex>;

export default function AlignLatex(props: Props) {
    return <DisplayLatex
        {...props}
        code={`\\begin{align*} ${props.code} \\end{align*}`}
    />;
}

