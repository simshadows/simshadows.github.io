/*
 * A utility component for simple latex-only data rows.
 */

import Eq from "@components/latex/Eq";

interface Props {
    readonly rows: (string | number)[];
}

export default function TableRowLatex(props: Props) {
    return <tr>
        {props.rows.map((s) => <td><Eq code={s.toString()} /></td>)}
    </tr>;
}
