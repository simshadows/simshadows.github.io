interface Props {
    readonly ch:    string;
    readonly title: string;
    readonly date:  string;
    readonly path:  string;
    readonly start?: string;
    readonly end?: string;
}

export default function YT(
    {ch, title, date, path, start=undefined, end=undefined}: Props
) {
    const href = `https://youtu.be/${path}`;
    if (start && end) {
        title = `${title} (${start} to ${end})`;
    } else if (start) {
        title = `${title} (${start})`;
    } else if (end) {
        throw new Error("End-only is not valid.");
    }
    return <>{ch}: <a href={href} target="_blank"><b>{title}</b></a> <em>({date})</em></>;
}

