import {type JSXChildren} from "@root/tech-debt";

import "./CheatsheetFrame.css";

interface Props {
    readonly wide?: boolean;
    readonly afterWide?: boolean; /* TECHNICAL DEBT */
    readonly children: JSXChildren;
}

export default function CheatsheetFrame({wide, afterWide, children}: Props) {
    let cls = "cheatsheet-frame";
    if (wide) cls += " wide";
    if (afterWide) cls += " after-wide";
    return <div className={cls}>
        {children}
    </div>;
}

