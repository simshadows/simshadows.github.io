/*
 * A utility component for simple latex-only data rows.
 */

import Latex from "@components/latex/Latex";

interface Props {
    readonly rows: (string | number)[];
}

export default function TableRowLatex(props: Props) {
    return <tr>
        {props.rows.map((s) => <td><Latex code={s.toString()} /></td>)}
    </tr>;
}

