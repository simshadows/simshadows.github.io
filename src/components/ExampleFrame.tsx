import {type JSXChildren} from "@root/tech-debt";

import "./ExampleFrame.css";

interface Props {
    readonly children: JSXChildren;
}

export default function ExampleFrame({children}: Props) {
    return <p><div className="example-frame">
        <div className="example-frame-head">
            Example
        </div>
        <div className="example-frame-content">
            {children}
        </div>
    </div></p>;
}

