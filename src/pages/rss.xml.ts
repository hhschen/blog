import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
    const posts = (await getCollection("posts")).sort(
        (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
    );

    return rss({
        title: "Probably a Blog.",
        description: "物理、數學、科技、ACG，以及一些沒人問的東西。",
        site: context.site ?? context.url.origin,

        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.pubDate,
            link: `/posts/${post.id}`,
        })),

        customData: "<language>zh-TW</language>",
    });
};
