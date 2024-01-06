import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

export default function GatherLatex(props: PropsTemplate) {
    checkLatexProps(props);
    return <BaseLatex
        {...props}
        code={`\\begin{gather*} ${props.code} \\end{gather*}`}
        displayStyle={true}
    />;
}

