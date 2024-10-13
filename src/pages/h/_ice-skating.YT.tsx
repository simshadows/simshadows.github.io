interface Props {
    readonly ch:    string;
    readonly title: string;
    readonly date:  string;
    readonly path:  string;
    readonly timestamps?: string;
}

export default function YT(
    {ch, title, date, path, timestamps=undefined}: Props
) {
    const href = `https://youtu.be/${path}`;
    if (timestamps) title = `${title} (${timestamps})`;
    return <>{ch}: <a href={href}><b>{title}</b></a> <em>({date})</em></>;
}

