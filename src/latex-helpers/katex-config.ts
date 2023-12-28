// <https://katex.org/docs/options>

const katexConfig = {
    displayMode: true, // To be overwritten
    throwOnError: true,
    strict: "error",
    macros: {
        "\\evalat": "{{\\left.#1\\right\\rvert{}}_{#2}}",
        "\\myvec": "{\\mathbf{#1}}",
        "\\Nth": "{{#1}^\\textit{#2}}",
        "\\setdef": "{\\left\\{{#1} \\mid {#2}\\right\\}}",

        // Relational algebra null value
        "\\relnullvalue": "{\\mathord{\\bot}}",
        // Relational algebra operators
        "\\relselect": "{\\sigma}",
        "\\relproject": "{\\pi}",
        "\\relrename": "{\\rho}",
        "\\relgroup": "{\\gamma}",
        // ----------------------------------------------------------------------
        // THESE DON'T WORK YET. I'M STILL FIGURING THEM OUT
        //
        // Relational Algebra outer join symbols
        //     original source: https://tex.stackexchange.com/questions/20740/symbols-for-outer-joins/20749#20749
        //     answer original author: egreg (https://tex.stackexchange.com/users/4427/egreg)
        "\\TmpOJoin": "\\setbox0=\\hbox{$\\bowtie$} \\rule[-.02ex]{.25em}{.4pt}\\llap{\\rule[\\ht0]{.25em}{.4pt}}",
        "\\relleftouterjoin": "{\\mathbin{\\TmpOJoin\\mkern-5.8mu\\bowtie}}",
        "\\relrightouterjoin": "{\\mathbin{\\bowtie\\mkern-5.8mu\\TmpOJoin}}",
        "\\relfullouterjoin": "{\\mathbin{\\TmpOJoin\\mkern-5.8mu\\bowtie\\mkern-5.8mu\\TmpOJoin}}",
        // ----------------------------------------------------------------------

        // Hacky compatibility implementation of siunitx just so I can keep the same syntax.
        // Ideally, KaTeX should properly support some subset of the siunitx API.
        "\\qty": "{{#1}\\,{#2}}",
        "\\kilo": "{\\text{k}}",
        "\\gram": "{\\text{g}}",

        // Hacky compatibility implementation of \DeclarePairedDelimiter from mathtools
        // I still haven't figured out how to make \parens*{} and such work (with the asterisk),
        // so equations will have to be manually modified to remove the asterisk.
        "\\parens": "{\\left({#1}\\right)}",
        "\\brackets": "{\\left[{#1}\\right]}",
        "\\braces": "{\\left\\{{#1}\\right\\}}",
        "\\floor": "{\\left\\lfloor{#1}\\right\\rfloor}",

        // Hacky compatibility implementation of \DeclareMathOperator from amsmath
        "\\dom": "\\operatorname{Dom}",

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

export function getConfig(displayMode: boolean) {
    const deepcopy = {...katexConfig, macros: {...katexConfig.macros}};
    deepcopy.displayMode = displayMode;
    return deepcopy;
}

