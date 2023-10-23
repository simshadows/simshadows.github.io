// <https://katex.org/docs/options>

const katexConfig = {
    displayMode: true, // To be overwritten
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

        ////////////////////////////////////////////////////////////
        // Some technical debt to figure out a better solution to //
        ////////////////////////////////////////////////////////////

        "\\dollars": "{\\${#1}}",

        // These colours must mirror those found in global.css
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

