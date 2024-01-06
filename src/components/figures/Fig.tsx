import {type JSXChildren} from "@root/tech-debt";

import "./common.css";

interface Props {
    readonly children: JSXChildren;
}

export default function Fig({children}: Props) {
    return <div className="figure">
        {children}
    </div>;
}

