import {
    type SwitchType,
    type SMDType,
    type Origin,
    type SwitchCategory,
} from "./index.data";

const IMAGES_BASE = "/mechanical-keyboard-switch-collection-legacy/_images/";

// Workaround for the missing JSX element type for now.
// TODO: Fix this.
//type TmpJSXResult = JSX.Element;
type TmpJSXResult = any;

function switchTypeStringMap(s: SwitchType) {
    switch (s) {
        case "linear": return "Linear";
        case "tactile": return "Tactile";
        case "clicky": return "Clicky";
        default: throw new Error(`Unexpected value: ${s}`);
    }
}

function smdClassMap(s: SMDType) {
    switch (s) {
        case "no": return "smd-incompatible";
        case "cutout": return "smd-cutout";
        case "transparent": return "smd-transparent";
        case "semitransparent": return "smd-semi-transparent";
        default: throw new Error(`Unexpected value: ${s}`);
    }
}
function smdStringMap(s: SMDType) {
    switch (s) {
        case "no": return "No";
        case "cutout": return "Cutout";
        case "transparent": return "Transparent";
        case "semitransparent": return "Semi-Transparent";
        default: throw new Error(`Unexpected value: ${s}`);
    }
}

interface SwitchImageCellProps {
    image: string;
    imageAcknowledgement: string;
    textReplacingImage: string;
}
function SwitchImageCell({image, imageAcknowledgement, textReplacingImage}: SwitchImageCellProps) {
    if ((image.length !== 0) && (textReplacingImage.length !== 0)) {
        throw new Error("Failed sanity check.");
    }
    if (textReplacingImage.length) {
        return <>{textReplacingImage}</>
    } else {
        return <a href={imageAcknowledgement}>
            {/* WE JUST REFERENCE THE LEGACY VERSION IMAGES FOR NOW. TODO: FIX! */}
            <img src={IMAGES_BASE + image}/>
        </a>;
    }
}

function TopLabelCell({topLabel, topLabelImage}: {topLabel: string, topLabelImage: string}) {
    if ((topLabel.length !== 0) && (topLabelImage.length !== 0)) {
        throw new Error("Failed sanity check.");
    }
    return (topLabelImage) ? <img src={IMAGES_BASE + topLabelImage} /> : <>{topLabel}</>;
}

function DocumentedCharacteristicsCell({data}: {data: SwitchCategory["documentedCharacteristics"]}) {
    function makeEntry([k, v]: [string, unknown]) {
        if (typeof v !== "string") throw new Error(`Unexpected value: ${k} ${v}`);
        switch (k) {
            case "_officialWebsite":
                return <li><a href={v}>official</a></li>;
            case "_unofficialWebsite":
                return <li><a href={v}>unofficial</a></li>;
            case "official?":
                return <li><a href={v}>official?</a></li>;
            case "_datasheet":
                return <li><a href={v}>datasheet</a></li>;
            case "":
                return <li>{v}</li>;
            default:
                return <li><strong>{k}</strong>: {v}</li>;
        }
    }
    if (typeof data === "string") return <>{data}</>;
    return <ul>{Object.entries(data).map(makeEntry)}</ul>;
}

function ExcerptCell({origin}: {origin: Origin}) {
    const elems: TmpJSXResult[] = [];
    if (origin.listedName) {
        elems.push(<strong>{origin.listedName}</strong>);
    }
    if (origin.excerpt) {
        if (elems.length) elems.push(<>: </>)
        elems.push(<>{origin.excerpt}</>);
    }
    if (origin.listedSpecs) {
        if (elems.length) elems.push(<><br /><br /></>);
        elems.push(<span>{
            Object.entries(origin.listedSpecs).map(([k, v]: [string, unknown]) => {
                if (typeof v !== "string") throw new Error(`Unexpected value: ${v}`);
                return <span className="no-wrap">{`[ ${k}: ${v} ]`}</span>;
            })
        }</span>);
    }
    return <>{elems}</>;
}

interface SwitchesTableSubSubrowProps {
    className: string;
    rowspan: number;
    data: SwitchCategory;
    origin: Origin;
}
function SwitchesTableSubSubrow({className, rowspan, data, origin}: SwitchesTableSubSubrowProps) {
    const classNameBase = (rowspan === -1) ? "hidden " : "";
    const rowspanBase = Math.max(1, rowspan);

    return <tr className={className} rowSpan={rowspanBase}>
        <td className={classNameBase + data.type} rowSpan={rowspanBase}>{switchTypeStringMap(data.type)}</td>
        <td className={classNameBase} rowSpan={rowspanBase}><SwitchImageCell
            image={data.image}
            imageAcknowledgement={data.imageAcknowledgement}
            textReplacingImage={data.textReplacingImage}
        /></td>
        <td className={classNameBase + (data.unverified ? "unverified" : "")} rowSpan={rowspanBase}>
            {data.name.map((s) => <p>{s}</p>)}
        </td>
        <td className={classNameBase} rowSpan={rowspanBase}>{data.cosmeticVariant}</td>
        <td className={classNameBase} rowSpan={rowspanBase}>
            <TopLabelCell
                topLabel={data.cosmeticFeatures.topLabel}
                topLabelImage={data.cosmeticFeatures.topLabelImage}
            />
        </td>
        <td className={classNameBase + smdClassMap(data.cosmeticFeatures.smd)} rowSpan={rowspanBase}>
            {smdStringMap(data.cosmeticFeatures.smd)}
        </td>
        <td className={classNameBase} rowSpan={rowspanBase}>{data.cosmeticFeatures.pins}</td>
        <td className={classNameBase} rowSpan={rowspanBase}>{data.cosmeticFeatures.additionalIDNotes}</td>
        <td className={classNameBase} rowSpan={rowspanBase}>
            <DocumentedCharacteristicsCell data={data.documentedCharacteristics} />
        </td>
        <td>{origin.originID}</td>
        <td>{(origin.undersideMouldLabel || []).map((s) => <p>{s}</p>)}</td>
        <td>{("itemCost" in origin) ? origin.itemCost.toString() : ""}</td>
        <td>{("sfCost" in origin) ? origin.sfCost.toString() : ""}</td>
        <td><ExcerptCell origin={origin} /></td>
        <td>{origin.comment || ""}</td>
    </tr>;
}

function SwitchesTableSubrow({className, data}: {className: string, data: SwitchCategory}) {
    if (data.origins.length === 1) {
        if (!data.origins[0]) throw new Error("Typescript narrowing failure.");
        return <SwitchesTableSubSubrow
            className={className}
            rowspan={1}
            data={data}
            origin={data.origins[0]}
        />;
    } else if (data.origins.length === 0) {
        throw new Error("Failed sanity check.");
    }


    if (!data.origins[0]) throw new Error("Typescript narrowing failure.");
    const elems = [
        <SwitchesTableSubSubrow
            className={className}
            rowspan={data.origins.length}
            data={data}
            origin={data.origins[0]}
        />
    ];
    for (const origin of data.origins.slice(1)) {
        elems.push(
            <SwitchesTableSubSubrow
                className={className}
                rowspan={-1}
                data={data}
                origin={origin}
            />
        );
    }
    return <>{elems}</>;
}

function SwitchesTableRow({className, data}: {className: string, data: SwitchCategory}) {
    // TODO: process origins
    return <SwitchesTableSubrow className={className} data={data} />
}

function SwitchesTableRowGroup({data}: {data: SwitchCategory[]}) {
    return <> {data.map((x, i) =>
        <SwitchesTableRow className={(i) ? "" : "start-group"} data={x}/>
    )} </>;
}

export function SwitchesTable({data}: {data: SwitchCategory[][]}) {
    return <>
        <p><div id="switches-visual-guide" class="ctrl-view-all"><table>
            <thead><tr>
                <th>Type</th>
                <th>Image</th>
                <th>Names (and Alternative Names)</th>
                <th>Cosmetic Variant</th>
                <th>Top Label</th>
                <th>SMD</th>
                <th>Pins</th>
                <th>Additional Identification Notes</th>
                <th>Interesting Documented Characteristics</th>       
                <th>Origin</th>
                <th>Underside<br />Labels</th>
                <th>Item Cost<br />(Per Switch)</th>
                <th>Shipping/Fees<br />(Per Switch)</th>
                <th>Excerpt From The Seller</th>
                <th>Comments</th>
            </tr></thead>
            <tbody>
                {data.map((x) => <SwitchesTableRowGroup data={x} />)}
            </tbody>
        </table></div></p>
    </>;
}

