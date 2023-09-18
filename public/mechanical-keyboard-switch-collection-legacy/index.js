const txt = document.createTextNode.bind(document);
function element(tagName, attributes={}) {
    const elem = document.createElement(tagName);
    for (const [k, v] of Object.entries(attributes)) {
        switch (k) {
            case "class": elem.classList.add(...((v instanceof Array) ? v : [v])); break;
            default: elem.setAttribute(k, v);
        }
    }
    return elem;
}

class Currency {
    constructor(s) {
        console.assert(typeof s === "string");

        function error(msg) {
            console.error(`[Currency] ${msg}. String: "${s}"`);
            this.unit = "???";
            this.denominator = 100;
            this.value = 0;
        }

        const arr = s.split(" ");
        if (arr.length !== 2) {error("Invalid split"); return;}

        const numArr = arr[0].split(".");
        if (numArr.length !== 2) {error("Invalid number split"); return;}

        if (numArr[1].length !== 2) {error("Digits right of radical must be 2 digits"); return;}
        const numLeft = parseInt(numArr[0]);
        const numRight = parseInt(numArr[1]);
        if (typeof numLeft  !== "number") {error("Invalid digits left of radical"); return;}
        if (typeof numRight !== "number") {error("Invalid digits right of radical"); return;}

        this.unit = arr[1];
        this.denominator = 100;
        this.value = (numLeft * 100) + numRight;

        console.assert(this.toString() === s);
    }
    add(other) {
        console.assert(this.unit === other.unit);
        console.assert(this.denominator === other.denominator);

        const ret = new Currency("0.00 " + this.unit);
        ret.denominator = this.denominator;
        ret.value = this.value + other.value;
        return ret;
    }
    isEqual(other) {
        return (
            (this.unit === other.unit)
            && (this.denominator === other.denominator)
            && (this.value === other.value)
        );
    }
    toString() {
        let numLeftStr = Math.floor(this.value / this.denominator).toString();
        let numRightStr = String(this.value % this.denominator).toString();

        if (numRightStr.length === 1) numRightStr = `0${numRightStr}`;
        return `${numLeftStr}.${numRightStr} ${this.unit}`
    }
}

function reprocessTableJSON(d) {
    for (const dd of d["origins"]) {
        if (dd["itemCost"] !== undefined) dd["itemCost"] = new Currency(dd["itemCost"]);
        if (dd["sfCost"  ] !== undefined) dd["sfCost"  ] = new Currency(dd["sfCost"  ]);

        dd["originIDstr"] = dd["originID"];
        
        const originSplit = dd["originID"].split(" ");
        if (originSplit.length !== 2) throw "Expected origin ID to split into 2.";
        dd["originID"] = {
            purchaseDate: new Date(originSplit[0]),
            idFragment: originSplit[1],
        }
    }
}

function parseOriginTable(tableElem) {
    console.assert(tableElem !== undefined);
    const rowElems = tableElem.querySelector("tbody").children;

    const ret = [];
    for (const rowElem of rowElems) {
        const children = rowElem.children;
        const totalItemCostStr = children[4].innerHTML.split(" ");
        const totalSfCostStr = children[5].innerHTML.split(" ");
        ret.push({
            "purchaseDate": new Date(children[0].innerHTML),
            "idFragment": children[1].innerHTML,

            "description": children[2].innerHTML,
            "numSwitches": parseInt(children[3].innerHTML),

            "totalItemCost": new Currency(children[4].innerHTML),
            "totalShippingAndFeesCost": new Currency(children[5].innerHTML),

            "comment": children[6].innerHTML,
        });
    }
    return ret;
}

function validateOrigins(originsData, costsFromBigTable) {
    // Reprocess origin table data
    const originTableIDs = new Map();
    for (const d of originsData) originTableIDs.set(d["purchaseDate"].toISOString(), new Set());
    for (const d of originsData) originTableIDs.get(d["purchaseDate"].toISOString()).add(d["idFragment"]);
    // Do all costs from the big table correspond to an origin?
    for (const [purchaseDate, v] of costsFromBigTable.entries()) {
        for (const [idFragment, _] of v.entries()) {
            const exists = originTableIDs.get(purchaseDate)?.has(idFragment);
            if (!exists) console.warn(`Origin ID "${purchaseDate} ${idFragment}" is present in the big table, but not in the origins table.`);
        }
    }
    // Are all origin costs accounted for?
    for (const d of originsData) {
        const purchaseDate = d["purchaseDate"].toISOString();
        const idFragment = d["idFragment"];
        const costs = costsFromBigTable.get(purchaseDate)?.get(idFragment);
        if (!costs) {
            console.warn(`Origin ID "${purchaseDate} ${idFragment}" purchase costs are present in the origins table, but not in the big table.`);
            continue;
        }
        if (!costs.itemCost.isEqual(d["totalItemCost"])) {
            console.warn(`Origin ID "${purchaseDate} ${idFragment}" has item cost total ${d["totalItemCost"].toString()}, but the big table indicates ${costs.itemCost}.`);
        }
        if (!costs.sfCost.isEqual(d["totalShippingAndFeesCost"])) {
            console.warn(`Origin ID "${purchaseDate} ${idFragment}" has shipping and fees total ${d["totalShippingAndFeesCost"].toString()}, but the big table indicates ${costs.sfCost}.`);
        }
    }
}

function addLinkToTD(tdElem, link) {
    const aElem = element("a", {href: link});
    for (const innerElem of [...tdElem.children]) {
        aElem.appendChild(innerElem);
    }
    tdElem.appendChild(aElem);
}

function applyClass(elem, className, warnMsg) {
    if (className === undefined) {
        console.warn(errorMsg);
    } else {
        elem.classList.add(className);
    }
}

/*** ***/

const controlsElem = document.querySelector("#controls-root");

const switchesContainerElem = document.querySelector("#switches-visual-guide");
const switchesTableElem = document.querySelector("#switches-visual-guide > table");
const theadElem = document.querySelector("#switches-visual-guide > table > thead");
const tbodyElem = document.querySelector("#switches-visual-guide > table > tbody");

const statNumUniqueSwitchTypesElem = document.querySelector("#stat-num-of-unique-switch-types");
const statNumSamplesElem = document.querySelector("#stat-num-of-samples");
const statTotalCostItemOnlyElem = document.querySelector("#stat-total-cost-itemonly");
const statTotalCostShippingAndFeesElem = document.querySelector("#stat-total-cost-shippingfeesonly");
const statGrandTotalCostElem = document.querySelector("#stat-total-cost-grandtotal");

const originsElem = document.querySelector("#origin-table");

function renderAdditionalHeadCells() {
    const trElem = theadElem.children[0];
    trElem.appendChild(element("th")).innerHTML = "Useful References";
    trElem.appendChild(element("th")).innerHTML = "Sample<br>Count";
    trElem.appendChild(element("th")).innerHTML = "Origin";
    trElem.appendChild(element("th")).innerHTML = "Underside<br>Labels";
    trElem.appendChild(element("th")).innerHTML = "Item Cost<br>(Per Switch)";
    trElem.appendChild(element("th")).innerHTML = "Shipping/Fees<br>(Per Switch)";
    trElem.appendChild(element("th")).innerHTML = "Excerpt From The Seller";
    trElem.appendChild(element("th")).innerHTML = "Comments";
}

const typeClassMap = {
    "Linear": "linear",
    "Tactile": "tactile",
    "Clicky": "clicky",
};
const smdClassMap = {
    "No": "smd-incompatible",
    "Cutout": "smd-cutout",
    "Transparent": "smd-transparent",
    "Semi-Transparent": "smd-semi-transparent",
};
function run() {
    renderAdditionalHeadCells();

    const originsData = parseOriginTable(originsElem);

    let numSwitchTypes = 0;
    let numSamples = 0;
    let totalItemCost = new Currency("0.00 AUD");
    let totalShippingAndFees = new Currency("0.00 AUD");

    // originCosts will calculate origin costs based on data from the switch table.
    // Format:
    //      originCosts[purchaseDate from Date.prototype.toISOString()][ID fragment] = {itemCost, sfCost}
    const originCosts = new Map();
    function addToOriginCosts(d) {
        const purchaseDate = d["originID"]["purchaseDate"].toISOString();
        const idFragment = d["originID"]["idFragment"];
        const itemCost = d["itemCost"];
        const sfCost = d["sfCost"];

        let inner = originCosts.get(purchaseDate);
        if (!inner) originCosts.set(purchaseDate, inner = new Map());
        let existingVals = inner.get(idFragment);
        if (existingVals) {
            existingVals.itemCost = existingVals.itemCost.add(itemCost)
            existingVals.sfCost = existingVals.sfCost.add(sfCost)
        } else {
            inner.set(idFragment, {itemCost, sfCost});
        }
    }

    const newRowElems = [];

    const trElems = [...tbodyElem.children];
    for (const [i, trElem] of trElems.entries()) {
        const tdElems = [...trElem.children];
        ++numSwitchTypes;

        /*** Read and process the JSON data ***/

        //console.log(tdElems[0].innerHTML);
        const data = JSON.parse(tdElems[0].innerHTML);
        reprocessTableJSON(data);

        const isUnverified = (data?.unverified === true);
        const origins = [...data.origins];

        /*** Adjust existing cells ***/

        applyClass(tdElems[1], typeClassMap[tdElems[1].innerHTML], "Invalid value for \"Type\" column.");
        applyClass(tdElems[6], smdClassMap[tdElems[6].innerHTML], "Invalid value for \"SMD\" column.");

        if (data.imgAck) addLinkToTD(tdElems[2], data.imgAck);

        if (isUnverified) applyClass(tdElems[3], "unverified", "Invalid.");

        /*** Create new columns for main rows ***/
        
        trElem.appendChild(element("td")).innerHTML = "TODO";

        /*** Create clone rows ***/

        const trCloneElems = [];
        const numOfOrigins = Object.keys(data.origins).length;
        // We subtract 1 from numOfOrigins since element 0 will be the original
        for (let j = 0; j < numOfOrigins - 1; ++j) trCloneElems.push(trElem.cloneNode(true));
        if (trCloneElems.length > 0) {
            newRowElems.push({
                rowNum: i,
                trCloneElems: [...trCloneElems],
            });
        }
        trCloneElems.unshift(trElem);

        /*** Create new columns for origin rows ***/

        for (const [j, d] of origins.entries()) {
            const trElem2 = trCloneElems[j];

            // Sample Count
            const numSamplesSingleOrigin = d["count"];
            console.assert(typeof numSamplesSingleOrigin === "number");
            console.assert(numSamplesSingleOrigin > 0);

            trElem2.appendChild(element("td")).appendChild(txt(numSamplesSingleOrigin));
            numSamples += numSamplesSingleOrigin;

            // Origin
            trElem2.appendChild(element("td")).innerHTML = d["originIDstr"].replace(" ", "<br>");

            // Underside Labels
            trElem2.appendChild(element("td")).innerHTML = d["undersideMouldLabel"]?.join("<br>") || "";

            // Item Cost
            trElem2.appendChild(element("td")).innerHTML = d["itemCost"]?.toString() || "";
            if (d["itemCost"] !== undefined) {
                totalItemCost = totalItemCost.add(d["itemCost"]);
            }

            // Shipping/Fee Cost
            trElem2.appendChild(element("td")).innerHTML = d["sfCost"]?.toString() || "";
            if (d["sfCost"] !== undefined) {
                totalShippingAndFees = totalShippingAndFees.add(d["sfCost"]);
            }

            // Excerpt
            trElem2.appendChild((()=>{
                const tdElem = element("td");
                if (d["listedName"]) {
                    tdElem.appendChild(element("strong")).appendChild(txt(d["listedName"]));
                }
                if (d["excerpt"]) {
                    tdElem.appendChild(txt(": " + d["excerpt"]));
                }
                if (d["listedSpecs"]) {
                    tdElem.appendChild(element("br"));
                    tdElem.appendChild(element("br"));
                    const spanElem = tdElem.appendChild(element("span")); // Could just be a fragment, but I'm lazy
                    for (const [k, v] of Object.entries(d["listedSpecs"])) {
                        spanElem.appendChild(element("span", {class: "no-wrap"})).appendChild(txt(`[ ${k}: ${v} ]`));
                    }
                }
                return tdElem;
            })());

            // Comments
            trElem2.appendChild(element("td")).innerHTML = d["comment"] || "";

            // (Other processes)
            if ((d["itemCost"] !== undefined) && (d["sfCost"] !== undefined)) {
                addToOriginCosts(d);
            }
        }
    }

    statNumUniqueSwitchTypesElem.innerHTML = numSwitchTypes;
    statNumSamplesElem.innerHTML = numSamples;
    statTotalCostItemOnlyElem.innerHTML = totalItemCost.toString();
    statTotalCostShippingAndFeesElem.innerHTML = totalShippingAndFees.toString();
    statGrandTotalCostElem.innerHTML = totalItemCost.add(totalShippingAndFees).toString();
    

    /*** Finally, we add the new "origin rows" ***/

    for (const d of newRowElems.slice().reverse()) {
        const originalRowElem = trElems[d.rowNum];
        const nextRowElem = trElems[d.rowNum + 1];
        console.assert(nextRowElem);

        for (let i = 0; i < 10; ++i) originalRowElem.children[i].rowSpan = d.trCloneElems.length + 1;

        for (const trCloneElem of d.trCloneElems) {
            tbodyElem.insertBefore(trCloneElem, nextRowElem);
            trCloneElem.classList.remove("start-group")
            for (let i = 0; i < 10; ++i) trCloneElem.children[i].classList.add("hidden");
        }
    }

    /*** Extra Stuff ***/

    controlsElem.addEventListener("change", function(e) {
        const elem = e.target;

        if (elem.name !== "ctrl-view") throw "Must be ctrl-view";
        
        switchesContainerElem.classList.remove(
            "ctrl-view-general",
            "ctrl-view-id",
            "ctrl-view-docs",
            "ctrl-view-all",
        );
        switch (elem.id) {
            default:
                throw "Unknown control input.";
            case "ctrl-view-general":
            case "ctrl-view-id":
            case "ctrl-view-docs":
            case "ctrl-view-all":
                switchesContainerElem.classList.add(elem.id);
        }
    });

    validateOrigins(originsData, originCosts);
}

run();
