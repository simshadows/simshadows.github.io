interface Props {
    readonly vidID: string;
    readonly title: string;
    readonly channel: string; // Channel name at the time of writing
    readonly date: string;    // Date accessed
}

export default function YTRef({vidID, title, channel, date}: Props) {
    return <a href={`https://www.youtube.com/watch?v=${vidID}`} target="_blank">YouTube: <em>{title}</em>, by {channel} ({date})</a>;
}

