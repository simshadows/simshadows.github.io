import {toDisplayAlignat} from "@root/latex-helpers/rendering/latex-transforms";
import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

type Props = PropsTemplate & {
    readonly eqcols: number;
}

export default function AlignatLatex(props: Props) {
    checkLatexProps(props);
    const {code, eqcols} = props;
    return <BaseLatex
        {...props}
        code={toDisplayAlignat(code, eqcols)}
        displayStyle={true}
    />;
}
