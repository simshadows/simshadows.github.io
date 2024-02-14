import {type ImageMetadata} from "astro";

import {type JSXChildren} from "@root/tech-debt";

import "./common.css";

interface Props {
    readonly src: ImageMetadata;
    readonly alt: string;
    readonly style?: string;
    readonly children: JSXChildren;
}

export default function Figure(props: Props) {
    const {src, alt, children} = props;
    const style = props.style || "width: 100%;";
    return <div className="figure">
        {children}
        <img src={src.src} alt={alt} style={style} />
    </div>;
}

