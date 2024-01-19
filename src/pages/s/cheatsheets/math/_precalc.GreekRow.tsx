import Eq from "@components/latex/Eq";

interface Props {
    readonly uc:   string;
    readonly lc:   string;
    readonly alt?: string;
    readonly name: string;
}

export default function GreekRow(props: Props) {
    const {uc, lc, name} = props;
    const alt = (props.alt) ? <Eq code={`\\${props.alt}`} /> : <></>;
    return <tr>
        <td><Eq code={`\\${uc}`} /></td>
        <td><Eq code={`\\${lc}`} /></td>
        <td>{alt}</td>
        <td>{name}</td>
    </tr>;
}

