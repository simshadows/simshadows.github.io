import {type JSXChildren} from "@root/tech-debt";

import "./_index.ExampleGroup.css";

interface Props {
    readonly children: JSXChildren;
}

export default function ExampleGroup({children}: Props) {
    return <div className="example-group">
        {children}
    </div>;
}

