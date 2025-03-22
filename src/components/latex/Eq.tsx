import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

export default function Eq(props: PropsTemplate) {
    checkLatexProps(props);
    return <BaseLatex
        {...props}
        displayStyle={false}
    />;
}
