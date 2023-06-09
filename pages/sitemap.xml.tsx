//pages/sitemap.xml.js
import {prisma} from "@/lib/db";
import {GetServerSideProps, GetServerSidePropsResult} from "next";

const EXTERNAL_DATA_URL = 'https://jsonplaceholder.typicode.com/posts';

function generateSiteMap(deckPosts: { topic: string, name: string }[], topicsPosts: { name: string }[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://ankidecks.app</loc>
     </url>
     <url>
       <loc>https://ankidecks.app/decks</loc>
     </url>
     ${deckPosts
        .map(({ topic, name }) => {
            return `
       <url>
           <loc>${`https://ankidecks.app/decks/${topic}/${name}`}</loc>
       </url>
     `;
        })
        .join('')}
     ${topicsPosts
        .map(({ name }) => {
            return `
         <url>
            <loc>${`https://ankidecks.app/decks/${name}`}</loc>
         </url>
        `;
        })
        .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(props: any) {
    const { res } = props;
    // We make an API call to gather the URLs for our site
    const topics = await prisma.scrapedTopics.findMany() as ScrapedTopic[];
    const decks = await prisma.scrapedDeck.findMany({
        include: {
            topics: true
        }
    }) as ScrapedDeck[];

    console.log(decks[0].topics[0].name)

    const deckPosts = decks.map((deck: ScrapedDeck) => {
        console.log(deck.topics[0].name)
        return {
            topic: deck.topics[0].name.toLowerCase().replace(" ", "-"),
            name: deck.urlSafeName.toLowerCase(),
        };
    });

    const topicsPosts = topics.map((topic) => {
        return {
            name: topic.name.toLowerCase().replace(" ", "-"),
        };
    });

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(deckPosts, topicsPosts);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;
