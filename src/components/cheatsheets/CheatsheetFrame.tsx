import {type JSXChildren} from "@root/tech-debt";

import "./CheatsheetFrame.css";

interface Props {
    readonly children: JSXChildren;
}

export default function CheatsheetFrame({children}: Props) {
    return <div className="cheatsheet-frame">
        {children}
    </div>;
}

