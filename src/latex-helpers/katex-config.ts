// <https://katex.org/docs/options>
//
// I haven't figured out how to import images to be useable with rehype.
// For rehype, use the base version.

import {getBaseConfig} from "./katex-config-base";

import fullOuterJoinImg from "@img_latex/rel-full-outer-join.svg";
import leftOuterJoinImg from "@img_latex/rel-left-outer-join.svg";
import rightOuterJoinImg from "@img_latex/rel-right-outer-join.svg";

const extraMacros = {
    // Relational Algebra outer join symbols
    // I would've liked to implement the symbols in pure katex, but it doesn't seem to work.
    // Attempting an implementation from <https://tex.stackexchange.com/questions/20740/symbols-for-outer-joins/20749#20749>:
    //     "\\TmpOJoin": "\\setbox0=\\hbox{$\\bowtie$} \\rule[-.02ex]{.25em}{.4pt}\\llap{\\rule[\\ht0]{.25em}{.4pt}}",
    //     "\\relfullouterjoin": "{\\mathbin{\\TmpOJoin\\mkern-5.8mu\\bowtie\\mkern-5.8mu\\TmpOJoin}}",
    //     answer original author: egreg (https://tex.stackexchange.com/users/4427/egreg)
    // The current implementation doesn't handle subscripts well.
    "\\relfullouterjoin": "{\\,\\includegraphics[height=0.75em, totalheight=1.0em, width=1.0em, alt=left outer join operator]{" + fullOuterJoinImg.src + "}\\,}",
    "\\relleftouterjoin": "{\\,\\includegraphics[height=0.75em, totalheight=1.0em, width=0.85em, alt=left outer join operator]{" + leftOuterJoinImg.src + "}\\,}",
    "\\relrightouterjoin": "{\\,\\includegraphics[height=0.75em, totalheight=1.0em, width=0.85em, alt=left outer join operator]{" + rightOuterJoinImg.src + "}\\,}",
    // Technical debt versions for adding subscripts without the awkward whitespace
    "\\relfullouterjoinSubscripted": "{\\,\\includegraphics[height=0.75em, totalheight=1.0em, width=1.0em, alt=left outer join operator]{" + fullOuterJoinImg.src + "}}",
    "\\relleftouterjoinSubscripted": "{\\,\\includegraphics[height=0.75em, totalheight=1.0em, width=0.85em, alt=left outer join operator]{" + leftOuterJoinImg.src + "}}",
    "\\relrightouterjoinSubscripted": "{\\,\\includegraphics[height=0.75em, totalheight=1.0em, width=0.85em, alt=left outer join operator]{" + rightOuterJoinImg.src + "}}",
};

export function getConfig(
    displayMode: boolean,
    moreMacros: {[key: string]: string;},
    fleqn: boolean,
) {
    const mergedMacros = {...extraMacros, ...moreMacros};
    return getBaseConfig(displayMode, mergedMacros, fleqn);
}

