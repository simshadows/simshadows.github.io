import {type PropsTemplate, checkLatexProps, BaseLatex} from "./_base-latex";

export default function DisplayLatex(props: PropsTemplate) {
    checkLatexProps(props);
    return <BaseLatex
        {...props}
        displayStyle={true}
    />;
}

