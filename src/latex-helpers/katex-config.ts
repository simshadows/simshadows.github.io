// <https://katex.org/docs/options>

import fullOuterJoinImg from "@img_latex/rel-full-outer-join.svg";
import leftOuterJoinImg from "@img_latex/rel-left-outer-join.svg";
import rightOuterJoinImg from "@img_latex/rel-right-outer-join.svg";

const katexConfig = {
    displayMode: true, // To be overwritten
    fleqn: false, // To be overwritten
    throwOnError: true,
    strict: "ignore",
    trust: true,
    macros: {
        "\\atantwo": "\\operatorname{atan2}",
        "\\cis": "\\operatorname{cis}",
        "\\csch": "\\operatorname{csch}",
        "\\sech": "\\operatorname{sech}",
        "\\SignFunction": "\\operatorname{sgn}",
        "\\MyRe": "\\operatorname{Re}",
        "\\MyIm": "\\operatorname{Im}",

        "\\FourierTransform": "\\mathcal{F}",
        "\\LaplaceTransform": "\\mathcal{L}",

        "\\complexconjugate": "\\overline{#1}",
        "\\defeq": "\\mathbin{\\vcentcolon=}",
        "\\diff": "d",
        "\\evalat": "{{\\left.#1\\right\\rvert{}}_{#2}}",
        "\\IntegerSet": "\\mathbb{Z}",
        "\\MathOverLabel": "{\\overset{\\substack{#1\\\\\\phantom{x}}}{#2}}",
        "\\myul": "\\underline{#1}",
        "\\myvec": "{\\mathbf{#1}}",
        "\\myReals": "\\Reals",
        "\\MyPermutations": "{{}_{#1}P_{#2}}",
        "\\MyCombinations": "{{}_{#1}C_{#2}}",
        "\\Nth": "{{#1}^\\textit{#2}}",
        "\\setdef": "{\\left\\{{#1} \\mid {#2}\\right\\}}",

        // Originally \underbracket. I'd like to use underbracket once katex supports it.
        "\\xcancelto": "\\underbrace{\\xcancel{#2}}_{#1}",

        "\\rhs": "\\textit{RHS}",
        "\\lhs": "\\textit{LHS}",

        // Coloured emphasis in math environments.
        //"\\memph": "{\\color{#1}\\bm{#2}}",
        "\\memph": "{\\htmlStyle{color: var(#1);}{\\bm{#2}}}",
        "\\memphR": "{\\memph{--color--myred}{#1}}",
        "\\memphRC": "{\\memph{--color--mycontrastred}{#1}}",
        //"\\memphO": "#1",
        "\\memphG": "{\\memph{--color--mygreen}{#1}}",
        "\\memphB": "{\\memph{--color--myblue}{#1}}",
        "\\memphBC": "{\\memph{--color--mycontrastblue}{#1}}",
        //"\\memphP": "#1",
        //"\\memphPC": "#1",
        // Alternatives if boldfacing is a problem
        "\\xmemph": "{\\htmlStyle{color: var(#1);}{#2}}",
        "\\xmemphR": "{\\xmemph{--color--myred}{#1}}",
        //"\\xmemphG": "#1",
        "\\xmemphB": "{\\xmemph{--color--myblue}{#1}}",
        "\\xmemphBC": "{\\xmemph{--color--mycontrastblue}{#1}}",
        "\\xmemphP": "{\\xmemph{--color--mypurple}{#1}}",
        // De-emphasis
        "\\Exn": "{\\htmlStyle{color: var(--color--deemphasis);}{#1}}",

        // Relational algebra null value
        "\\relnullvalue": "{\\mathord{\\bot}}",
        // Relational algebra operators
        "\\relselect": "{\\sigma}",
        "\\relproject": "{\\pi}",
        "\\relrename": "{\\rho}",
        "\\relgroup": "{\\gamma}",
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

        // Hacky compatibility implementation of siunitx just so I can keep the same syntax.
        // Ideally, KaTeX should properly support some subset of the siunitx API.
        "\\qty": "{{#1}\\,{#2}}",
        "\\si": "{#1}",
        "\\ang": "{#1\\degree}",
        //
        "\\yotta": "{\\text{Y}}",  // 10^24
        "\\zetta": "{\\text{Z}}",  // 10^21
        "\\exa":   "{\\text{E}}",  // 10^18
        "\\peta":  "{\\text{P}}",  // 10^15
        "\\tera":  "{\\text{T}}",  // 10^12
        "\\giga":  "{\\text{G}}",  // 10^9
        "\\mega":  "{\\text{M}}",  // 10^6
        "\\kilo":  "{\\text{k}}",  // 10^3
        "\\hecto": "{\\text{h}}",  // 10^2
        "\\deca":  "{\\text{da}}", // 10^1
        "\\deci":  "{\\text{d}}",  // 10^-1
        "\\centi": "{\\text{c}}",  // 10^-2
        "\\milli": "{\\text{m}}",  // 10^-3
        "\\micro": "{{\\mu}}", // 10^-6 // TODO: This should not be italicized
        "\\nano":  "{\\text{n}}",  // 10^-9
        "\\pico":  "{\\text{p}}",  // 10^-12
        "\\femto": "{\\text{f}}",  // 10^-15
        "\\atto":  "{\\text{a}}",  // 10^-18
        "\\zepto": "{\\text{z}}",  // 10^-21
        "\\yocto": "{\\text{y}}",  // 10^-24
        //
        "\\gram": "{\\text{g}}",
        "\\sinounit": "", // does nothing here

        // Hacky compatibility implementation of \DeclarePairedDelimiter from mathtools
        // I still haven't figured out how to make \parens*{} and such work (with the asterisk),
        // so equations will have to be manually modified to remove the asterisk.
        "\\parens": "{\\left({#1}\\right)}",
        "\\brackets": "{\\left[{#1}\\right]}",
        "\\braces": "{\\left\\{{#1}\\right\\}}",
        "\\abs": "{\\lvert{}{#1}\\rvert{}}",
        "\\floor": "{\\left\\lfloor{#1}\\right\\rfloor}",

        // Hacky compatibility implementation of \DeclareMathOperator from amsmath
        "\\dom": "\\operatorname{Dom}",

        // I actually don't remember why I made special math symbols for these.
        // Probably not supported in regular LaTeX?
        "\\myAlpha": "\\Alpha",
        "\\myBeta": "\\Beta",
        "\\myEpsilon": "\\Epsilon",
        "\\myZeta": "\\Zeta",
        "\\myEta": "\\Eta",
        "\\myIota": "\\Iota",
        "\\myKappa": "\\Kappa",
        "\\myMu": "\\Mu",
        "\\myNu": "\\Nu",
        "\\myOmicron": "\\Omicron",
        "\\myomicron": "\\omicron",
        "\\myRho": "\\Rho",
        "\\myTau": "\\Tau",
        "\\myChi": "\\Chi",
        "\\myDigamma": "\\mathrm{F}", // TODO: Find something better?

        ////////////////////////////////////////////////////////////
        // Some technical debt to figure out a better solution to //
        ////////////////////////////////////////////////////////////

        "\\dollars": "{\\${#1}}",

        // These colours must mirror those found in global.css
        // Ideally, these should be defined using \definecolor
        "\\mylightred": "#ffb3b3",
        "\\mylightgreen": "#b3ffb3",
        "\\mylightblue": "#b3b3ff",
    },
}

export function getConfig(
    displayMode: boolean,
    moreMacros: {[key: string]: string;},
    fleqn: boolean,
) {
    const deepcopy = {...katexConfig, macros: {...katexConfig.macros, ...moreMacros}};
    deepcopy.displayMode = displayMode;
    deepcopy.fleqn = fleqn;
    return deepcopy;
}

