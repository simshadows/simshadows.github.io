import Latex from "@components/latex/Latex";

interface Props {
    readonly uc:   string;
    readonly lc:   string;
    readonly alt?: string;
    readonly name: string;
}

export default function GreekRow(props: Props) {
    const {uc, lc, name} = props;
    const alt = (props.alt) ? <Latex code={`\\${props.alt}`} /> : <></>;
    return <tr>
        <td><Latex code={`\\${uc}`} /></td>
        <td><Latex code={`\\${lc}`} /></td>
        <td>{alt}</td>
        <td>{name}</td>
    </tr>;
}

