import {type JSXChildren} from "@root/tech-debt";

interface Props {
    readonly children: JSXChildren;
}

export default function HorizontallyScrollingBox({children}: Props) {
    return <div class="horizontally-scrolling-box">{children}</div>;
}

