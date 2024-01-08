import Latex from "@components/latex/Latex";

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
        <td><Latex code={`\\si{\\${sym}\\sinounit}`} /></td>
        <td><Latex code={`{10}^{${e}}`} /></td>
        <td><Latex code={`{1000}^{${ee}}`} /></td>
        <td><Latex code={dec} /></td>
    </tr>;
}

