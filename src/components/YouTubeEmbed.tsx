interface Props {
    readonly videoID: string;
}

export default function YouTubeEmbed({videoID}: Props) {
    if (!(videoID && typeof videoID === "string")) {
        throw new Error("videoID must be non-empty string.");
    }

    return <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowFullScreen
    />
}
