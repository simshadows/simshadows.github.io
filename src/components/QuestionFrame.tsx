import {type JSXChildren} from "@root/tech-debt";

import "./QuestionFrame.css";

interface Props {
    readonly children: JSXChildren;
}

export default function Centered({children}: Props) {
    return <p><div className="question-frame">
        <div className="question-frame-content">
            {children}
        </div>
    </div></p>;
}

