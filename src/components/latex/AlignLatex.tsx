import {toDisplayAlign} from "@root/latex-helpers/rendering/latex-transforms";
import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

export default function AlignLatex(props: PropsTemplate) {
    checkLatexProps(props);
    return <BaseLatex
        {...props}
        code={toDisplayAlign(props.code)}
        displayStyle={true}
    />;
}
