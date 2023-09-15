import {
    type SMDType,
    type SwitchCategory,
} from "./index.data";

function smdClassMap(s: SMDType) {
    switch (s) {
        case "no": return "smd-incompatible";
        case "cutout": return "smd-cutout";
        case "transparent": return "smd-transparent";
        case "semitransparent": return "smd-semi-transparent";
        default: throw new Error(`Unexpected value: ${s}`);
    }
}

export function SwitchesTableSubrow({className, data}: {className: string, data: SwitchCategory}) {
    return <tr className={className}>
        <td className={data.type}>{data.type}</td>
        <td><a href={data.imageAcknowledgement}>
            {/* WE JUST REFERENCE THE LEGACY VERSION IMAGES FOR NOW. TODO: FIX! */}
            <img src={"/mechanical-keyboard-switch-collection-legacy/_images/" + data.image}/>
        </a></td>
        <td className={data.unverified ? "unverified" : ""}>{data.name.map((s) =>
            <p>{s}</p>
        )}</td>
        <td>{data.cosmeticVariant}</td>
        <td>{data.cosmeticFeatures.topLabel}</td>
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

export function SwitchesTableRow({className, data}: {className: string, data: SwitchCategory}) {
    // TODO: process origins
    return <SwitchesTableSubrow className={className} data={data} />
}

export function SwitchesTableRowGroup({data}: {data: SwitchCategory[]}) {
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
