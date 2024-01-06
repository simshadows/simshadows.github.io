import {type ComponentProps} from "preact";

import DisplayLatex from "@components/latex/DisplayLatex";

type Props = ComponentProps<typeof DisplayLatex>;

export default function GatherLatex(props: Props) {
    return <DisplayLatex
        {...props}
        code={`\\begin{gather*} ${props.code} \\end{gather*}`}
    />;
}

