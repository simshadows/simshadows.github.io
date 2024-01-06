import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

type Props = PropsTemplate & {
    readonly eqcols: number;
}

export default function AlignatLatex(props: Props) {
    checkLatexProps(props);
    const {code, eqcols} = props;
    if (eqcols % 1) throw new Error("`eqcols` must be an integer.");
    return <BaseLatex
        {...props}
        code={`\\begin{alignat*}{${eqcols}} ${code} \\end{alignat*}`}
        displayStyle={true}
    />;
}

