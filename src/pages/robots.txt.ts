import {
    site,
} from "@root/constants";

const template = `\
User-agent: *
Allow: /

Sitemap: ${site}sitemap-index.xml\
`;

export async function GET() {
    return new Response(template);
}
