import {type JSXChildren} from "@root/tech-debt";
import "./common.css";

interface Props {
    readonly children: JSXChildren;
}

export default function FiguresBlock({children}: Props) {
    return <div className="figures-block">{children}</div>;
}

