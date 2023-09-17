import {
    type SMDType,
    type SwitchCategory,
} from "./index.data";

const IMAGES_BASE = "/mechanical-keyboard-switch-collection-legacy/_images/";

function smdClassMap(s: SMDType) {
    switch (s) {
        case "no": return "smd-incompatible";
        case "cutout": return "smd-cutout";
        case "transparent": return "smd-transparent";
        case "semitransparent": return "smd-semi-transparent";
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

function SwitchesTableSubrow({className, data}: {className: string, data: SwitchCategory}) {
    return <tr className={className}>
        <td className={data.type}>{data.type}</td>
        <td><SwitchImageCell
            image={data.image}
            imageAcknowledgement={data.imageAcknowledgement}
            textReplacingImage={data.textReplacingImage}
        /></td>
        <td className={data.unverified ? "unverified" : ""}>{data.name.map((s) =>
            <p>{s}</p>
        )}</td>
        <td>{data.cosmeticVariant}</td>
        <td><TopLabelCell topLabel={data.cosmeticFeatures.topLabel} topLabelImage={data.cosmeticFeatures.topLabelImage} /></td>
        <td className={smdClassMap(data.cosmeticFeatures.smd)}>{data.cosmeticFeatures.smd}</td>
        <td>{data.cosmeticFeatures.pins}</td>
        <td>{data.cosmeticFeatures.additionalIDNotes}</td>
        <td>TODO</td>
        <td>TODO</td>
        <td>TODO</td>
        <td>TODO</td>
        <td>TODO</td>
        <td>TODO</td>
        <td>TODO</td>
        <td>TODO</td>
    </tr>;
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
                <th>Sample Count</th>
                <th>Origin</th>
                <th>Underside Labels</th>
                <th>Item Cost (Per Switch)</th>
                <th>Shipping/Fees (Per Switch)</th>
                <th>Excerpt From The Seller</th>
                <th>Comments</th>
            </tr></thead>
            <tbody>
                {data.map((x) => <SwitchesTableRowGroup data={x} />)}
            </tbody>
        </table></div></p>
    </>;
}

