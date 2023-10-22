// <https://katex.org/docs/options>

export const katexConfig = {
    throwOnError: true,
    strict: "error",
    macros: {
        "\\parens": "{\\left({#1}\\right)}",
        "\\brackets": "{\\left[{#1}\\right]}",
        "\\floor": "{\\left\\lfloor{#1}\\right\\rfloor}",
    },
}

