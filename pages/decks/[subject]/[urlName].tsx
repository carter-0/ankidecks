import {prisma} from "@/lib/db";
import Navbar from "@/components/global/Navbar";
import SecondNavbar from "@/components/global/SecondNavbar";
import Link from "next/link";
import {ChevronRightIcon, HomeIcon} from "@heroicons/react/solid";
import {ChevronDoubleRightIcon} from "@heroicons/react/outline";
import DeckList from "@/components/decks/DeckList";
import Head from "next/head";

type ScrapedDeckProps = {
    deck: ScrapedDeck;
}

export default function ScrapedDeck(props: ScrapedDeckProps) {
    const { deck } = props;

    const topic = deck.topics[0].name;
    const topicCaps = topic.split(/ /g).map(val => val[0].toUpperCase() + val.slice(1)).join(' ')

    return(
        <>
            <Head>
                <title>{`${deck.name} | ${topicCaps} Anki Cards`}</title>
                <meta key={"description"} name="description" content={`Download ${deck.name} Anki deck for free.`} />
                <meta key={"og:title"} property="og:title" content={`${deck.name} | ${topicCaps} Anki Cards`} />
                <meta key={"og:description"} property="og:description" content={"Download " + deck.name + " Anki deck for free."} />
            </Head>
            <Navbar />

            <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>
                <div className={"rounded-md mt-16 mb-8 sm:block hidden"}>
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div>
                                    <Link
                                        href={"/"}
                                        className="text-gray-500 hover:text-gray-700 line-clamp-2"
                                    >
                                        Home
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <Link
                                        href={"/decks"}
                                        className="ml-4 text-gray-500 hover:text-gray-700 line-clamp-2"
                                    >
                                        Anki Decks
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <Link
                                        href={"/decks/"+topic.toLowerCase().replace(" ", "-")}
                                        className="ml-4 text-gray-500 hover:text-gray-700 line-clamp-2"
                                    >
                                        {topicCaps}
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className={"max-w-3xl"}>
                    <span className={"text-lg text-teal-500 font-bold"}>{topicCaps}</span>
                    <h1 className={"mt-2 text-3xl font-bold tracking-tight text-primary-500 sm:text-4xl"}>
                        Discover the best {deck.name} Anki decks.
                    </h1>

                    <p className={"mt-3 text-lg text-gray-500"}>
                        {/*{heroText} All decks can be used with <Link target={"_blank"} href={"https://apps.ankiweb.net/"} className={"text-teal-500 hover:text-teal-600"}>Anki</Link>, a free flashcard program.*/}
                    </p>
                </div>

                <div className={"mt-12 sm:mt-16"}>
                    {/*<DeckList decks={decks} topic={topicCaps} />*/}
                </div>
                {/*{JSON.stringify(props.decks)}*/}
            </div>
        </>
    )
}

export const getStaticProps: (ctx: any) => Promise<{ redirect: { permanent: boolean; destination: string } } | { redirect: { destination: string } } | { props: {} }> = async (ctx: any) => {
    const { params } = ctx;
    const urlName = params.urlName;

    const deck = await prisma.scrapedDeck.findFirst({
        where: {
            urlSafeName: urlName
        },
        include: {
            topics: true
        }
    });

    return {
        props: {
            deck: deck
        }
    }
}

export async function getStaticPaths() {
    // When this is true (in preview environments) don't
    // prerender any static pages
    // (faster builds, but slower initial page load)
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [] as any,
            fallback: 'blocking',
        };
    }

    // { fallback: false } means other routes should 404
    return { paths: [] as any, fallback: 'blocking' };
}