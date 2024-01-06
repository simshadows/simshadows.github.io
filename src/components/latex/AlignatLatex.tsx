import {type ComponentProps} from "preact";

import DisplayLatex from "@components/latex/DisplayLatex";

type Props = ComponentProps<typeof DisplayLatex> & {
    readonly eqcols: number;
}

export default function AlignatLatex(props: Props) {
    const {code, eqcols} = props;
    if (eqcols % 1) throw new Error("`eqcols` must be an integer.");
    return <DisplayLatex
        {...props}
        code={`\\begin{alignat*}{${eqcols}} ${code} \\end{alignat*}`}
    />;
}

