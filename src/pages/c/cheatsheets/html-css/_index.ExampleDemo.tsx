import {type JSXChildren} from "@root/tech-debt";

import "./_index.ExampleDemo.css";

interface Props {
    readonly children: JSXChildren;
}

export default function ExampleDemo({children}: Props) {
    return <div className="example-demo">
        <div>{children}</div>
    </div>;
}

