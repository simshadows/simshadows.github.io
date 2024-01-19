import Eq from "@components/latex/Eq";

interface Props {
    readonly name: string;
    readonly sym?: string;
    readonly e:    string;
    readonly ee:   string;
    readonly dec:  string;
}

export default function SIPrefixRow(props: Props) {
    const {name, e, ee, dec} = props;
    const sym = props.sym || name;
    return <tr>
        <td>{name}</td>
        <td><Eq code={`\\si{\\${sym}\\sinounit}`} /></td>
        <td><Eq code={`{10}^{${e}}`} /></td>
        <td><Eq code={`{1000}^{${ee}}`} /></td>
        <td><Eq code={dec} /></td>
    </tr>;
}

