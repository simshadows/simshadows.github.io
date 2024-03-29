import {type JSXChildren} from "@root/tech-debt";

import "./CheatsheetFrameTitle.css";

interface Props {
    readonly children: JSXChildren;
}

export default function CheatsheetFrameTitle({children}: Props) {
    // TODO: Maybe implement as a h tag?
    return <p className="cheatsheet-frame-title">
        {children}
    </p>;
}

