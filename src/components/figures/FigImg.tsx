import {type ImageMetadata} from "astro";

import {type JSXChildren} from "@root/tech-debt";

import "./common.css";

interface Props {
    readonly src: ImageMetadata;
    readonly alt: string;
    readonly children: JSXChildren;
}

export default function Figure({src, alt, children}: Props) {
    return <div className="figure">
        {children}
        <img src={src.src} alt={alt} />
    </div>;
}

