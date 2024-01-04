import {type JSXChildren} from "@root/tech-debt";

import "./CheatsheetBlock.css";

interface Props {
    readonly children: JSXChildren;
}

export default function CheatsheetBlock({children}: Props) {
    return <div className="cheatsheet-block">
        {children}
    </div>;
}

