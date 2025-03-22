import {toDisplayGather} from "@root/latex-helpers/rendering/latex-transforms";
import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

export default function GatherLatex(props: PropsTemplate) {
    checkLatexProps(props);
    return <BaseLatex
        {...props}
        code={toDisplayGather(props.code)}
        displayStyle={true}
    />;
}
