// All links will open in a new tab
document.querySelectorAll("a").forEach((elem) => {
    if (elem.getAttribute("target") !== "_self") { // But only if target="_self" isn't set
        elem.setAttribute("target", "_blank");
    }
})

