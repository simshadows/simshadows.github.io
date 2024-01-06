import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

export default function Latex(props: PropsTemplate) {
    checkLatexProps(props);
    return <BaseLatex
        {...props}
        displayStyle={false}
    />;
}

