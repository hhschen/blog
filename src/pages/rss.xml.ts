import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
    const posts = (await getCollection("posts")).sort(
        (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
    );
    const container = await AstroContainer.create();

    return rss({
        title: "Probably a Blog.",
        description: "物理、數學、科技、ACG，以及一些沒人問的東西。",
        site: context.site ?? context.url.origin,

        items: await Promise.all(
            posts.map(async (post) => {
                const { Content } = await render(post);

                return {
                    title: post.data.title,
                    description: post.data.description,
                    content: await container.renderToString(Content),
                    pubDate: post.data.pubDate,
                    link: `/posts/${post.id}`,
                };
            })
        ),

        customData: "<language>zh-TW</language>",
    });
};
