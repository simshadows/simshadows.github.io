import {type JSXChildren} from "@root/tech-debt";

import "./common.css";

interface Props {
    readonly children: JSXChildren;
}

export default function FiguresGroupVertical({children}: Props) {
    return <div className="figures-group-vertical">{children}</div>;
}

