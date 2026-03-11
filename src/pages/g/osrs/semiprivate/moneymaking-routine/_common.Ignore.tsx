import {type JSXChildren} from "@root/tech-debt";

interface Props {
    readonly children: JSXChildren;
}

export default function Ignore({children}: Props) {
    return <span className="moneymaking-ignore">((( {children} )))</span>;
}

