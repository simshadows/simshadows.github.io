/*
 * A utility component for simple latex-only header rows.
 */

import Latex from "@components/latex/Latex";

interface Props {
    readonly rows: (string | number)[];
}

export default function TableRowHLatex(props: Props) {
    return <tr>
        {props.rows.map((s) => <th><Latex code={s.toString()} /></th>)}
    </tr>;
}

