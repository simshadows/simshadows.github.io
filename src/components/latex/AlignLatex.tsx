import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

export default function AlignLatex(props: PropsTemplate) {
    checkLatexProps(props);
    return <BaseLatex
        {...props}
        code={`\\begin{align*} ${props.code} \\end{align*}`}
        displayStyle={true}
    />;
}

