/*
 * A utility component for simple latex-only header rows.
 */

import Eq from "@components/latex/Eq";

interface Props {
    readonly rows: (string | number)[];
}

export default function TableRowHLatex(props: Props) {
    return <tr>
        {props.rows.map((s) => <th><Eq code={s.toString()} /></th>)}
    </tr>;
}
