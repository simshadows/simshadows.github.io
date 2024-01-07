/*
 * Don't use this directly.
 */

import katex from "katex";
import "katex/dist/katex.min.css";

import "./_base-latex.css";

import {getConfig} from "@root/latex-helpers/katex-config";

// Components that passthrough props should union with PropsTemplate
export interface PropsTemplate {
    readonly code: string;
    readonly moreMacros?: {[key: string]: string;};
    readonly fleqn?: boolean;
}

type Props = PropsTemplate & {
    readonly displayStyle: boolean;
};

// Some sanity checks
export function checkLatexProps(props: PropsTemplate): void {
    // We don't want to allow accidental overwriting of 'displayStyle'.
    // Technically, we can just rely on the ordering of props, but I want extra
    // warning.
    if ("displayStyle" in props) {
        throw new Error("Found `displayStyle` prop where it's not expected. Was that intentional?");
    }
}

// Latex-rendering components should inherit this
export function BaseLatex(props: Props) {
    if (!props.code) throw new Error("`code` must be a non-empty string.");
    const moreMacros = props.moreMacros || {};
    if (typeof moreMacros !== "object") {
        throw new Error("`moreMacros` must be an object.");
    }
    if (!("displayStyle" in props)) throw new Error("`displayStyle` must exist.");
    const rendererConfig = getConfig(props.displayStyle, moreMacros, !!props.fleqn);
    const rawHTML = katex.renderToString(props.code, rendererConfig);
    if (props.displayStyle) {
        return <p><div
            class="display-latex horizontally-scrolling-box"
            dangerouslySetInnerHTML={{__html: rawHTML}}
        /></p>;
    } else {
        return <span dangerouslySetInnerHTML={{__html: rawHTML}} />;
    }
}

