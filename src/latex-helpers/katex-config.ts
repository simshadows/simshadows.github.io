// <https://katex.org/docs/options>

export const katexConfig = {
    throwOnError: true,
    strict: "error",
    macros: {
        "\\parens": "{\\left({#1}\\right)}",
        "\\brackets": "{\\left[{#1}\\right]}",
        "\\braces": "{\\left\\{{#1}\\right\\}}",
        "\\floor": "{\\left\\lfloor{#1}\\right\\rfloor}",
        "\\Nth": "{{#1}^\\textit{#2}}",

        // Hacky compatibility implementation of siunitx just so I can keep the same syntax.
        // Ideally, KaTeX should properly support some subset of the siunitx API.
        "\\qty": "{{#1}\\,{#2}}",
        "\\kilo": "{\\text{k}}",
        "\\gram": "{\\text{g}}",

        // Some technical debt to figure out a better solution to
        "\\dollars": "{\\${#1}}",
    },
}

