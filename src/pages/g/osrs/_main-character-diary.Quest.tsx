/*
 * Filename: _main-character-diary.Quest.tsx
 * Author:   simshadows <contact@simshadows.com>
 */

interface Props {
    readonly name: string;
    readonly isMiniquest?: boolean;
}

export default function Quest(props: Props) {
    const {name} = props;
    const isMiniquest = props["isMiniquest"];

    if (isMiniquest) {
        return <span style="font-weight: bold;">{name} (Miniquest)</span>;
    }
    return <span style="font-weight: bold;">{name}</span>;
}

