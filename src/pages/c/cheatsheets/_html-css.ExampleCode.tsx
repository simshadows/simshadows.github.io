import {type JSXChildren} from "@root/tech-debt";

interface Props {
    readonly children: JSXChildren;
}

export default function ExampleCode({children}: Props) {
    return <div className="example-code">
        {children}
    </div>;
}

