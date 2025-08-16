import "./PaginationNavigatorBar.css";

/*
 * Designed to be compatible with Astro's Page type.
 */
interface _Page {
    readonly currentPage: number;
    readonly lastPage: number;
    readonly url: {
        readonly current: string;
        readonly prev: string | undefined;
        readonly next: string | undefined;
        readonly first: string | undefined;
        readonly last: string | undefined;
    };
}

interface Props {
    readonly page: _Page;
    readonly numberToURL: (i: number) => string;
}

export default function PaginationNavigatorBar({page, numberToURL}: Props) {
    const numbers = (()=>{
        const arr: number[] = [];
        for (let i = 1; i <= page.lastPage; ++i) {
            arr.push(i);
        }
        return arr;
    })();

    return <div class="pages-bar">
        <span class="pages-bar__elem">
            <a href={page.url.first}>First</a>
        </span>
        <span class="pages-bar__elem">
            <a href={page.url.prev}>Prev</a>
        </span>
        {numbers.map((i) => {
            if (i === page.currentPage) {
                return <span className="pages-bar__elem current">
                    {i}
                </span>
            }

            return <span className="pages-bar__elem">
                <a href={numberToURL(i)}>{i}</a>
            </span>
        })}
        <span class="pages-bar__elem">
            <a href={page.url.next}>Next</a>
        </span>
        <span class="pages-bar__elem">
            <a href={page.url.last}>Last</a>
        </span>
    </div>;
}

