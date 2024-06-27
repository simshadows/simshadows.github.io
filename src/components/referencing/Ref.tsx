interface Props {
    readonly href: string;
    readonly desc: string;
    readonly date: string;  // Date accessed
}

export default function Ref({href, desc, date}: Props) {
    return <a href={href} target="_blank">{desc} ({date})</a>;
}

