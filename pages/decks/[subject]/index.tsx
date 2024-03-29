import {prisma} from "@/lib/db";
import Navbar from "@/components/global/Navbar";
import SecondNavbar from "@/components/global/SecondNavbar";
import Link from "next/link";
import {ChevronRightIcon, HomeIcon} from "@heroicons/react/solid";
import {ChevronDoubleRightIcon} from "@heroicons/react/outline";
import DeckList from "@/components/decks/DeckList";
import Head from "next/head";
import Footer from "@/components/global/Footer";

type ScrapedDecksProps = {
    topic: string;
    decks: ScrapedDeck[];
}

const hashToNumber = (hash: string) => {
    // generate a number from 0 to 4 based on the input. The same input will always return the same number.
    let hashNumber = 0;
    for (let i = 0; i < hash.length; i++) {
        hashNumber += hash.charCodeAt(i);
    }
    return hashNumber % 5;
}

const choices = [
    "Explore more than {quantity} top-rated {topic} Anki decks found online. Ideal for exam preparation or simply expanding your knowledge, these decks are available to use and download for free.",
    "Browse through more than {quantity} excellently curated {topic} Anki decks. Use them to boost your exam performance or simply to learn something new. All decks are accessible at no cost and downloadable to support your personal endeavors.",
    "Find {quantity} exceptional {topic} Anki decks, serving as ideal resources for acing your exams or learning something exciting. Access and download these decks without any charge, for your individual use.",
    "Discover over {quantity} extraordinary {topic} Anki decks. Make use of these resources to strengthen your exam results or simply learn something new. These decks are provided free of charge, ready for download and personal use.",
    "Discover over {quantity} of the best {topic} Anki decks. You can use them to study for your exams, or just to learn something new. All decks are free to use and download for your personal use.",
]

export default function ScrapedDecks(props: ScrapedDecksProps) {
    const { topic, decks } = props;
    const topicCaps = topic.split(/ /g).map(val => val[0].toUpperCase() + val.slice(1)).join(' ')

    const heroText = choices[hashToNumber(topic)].replaceAll("{quantity}", decks.length.toString()).replaceAll("{topic}", topicCaps);

    return(
        <>
            <Head>
                <title>{`Top ${decks.length} ${topicCaps} Anki Decks`}</title>
                <meta key={"description"} name="description" content={"Explore more than "+decks.length+" top-rated "+topic+" Anki decks found online. Ideal for exam preparation or simply expanding your knowledge, these decks are available to use and download for free."} />
                <meta key={"og:title"} property="og:title" content={`Top ${decks.length} ${topicCaps} Anki Decks`} />
                <meta key={"og:description"} property="og:description" content={"Explore more than "+decks.length+" top-rated "+topic+" Anki decks found online. Ideal for exam preparation or simply expanding your knowledge, these decks are available to use and download for free."} />
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
                                        href={"/decks/"+topic.toLowerCase().replaceAll(" ", "-")}
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
                        Discover the best {topicCaps} Anki decks.
                    </h1>

                    <p className={"mt-3 text-lg text-gray-500"}>
                        {heroText} All decks can be used with <Link target={"_blank"} href={"https://apps.ankiweb.net/"} className={"text-teal-500 hover:text-teal-600"}>Anki</Link>, a free flashcard program.
                    </p>
                </div>

                <div className={"mt-12 sm:mt-16"}>
                    <DeckList decks={decks} topic={topicCaps} />
                </div>
            </div>

            <Footer />
        </>
    )
}

export const getStaticProps: (ctx: any) => Promise<{ redirect: { permanent: boolean; destination: string } } | { redirect: { destination: string } } | { props: {} }> = async (ctx: any) => {
    const { params } = ctx;
    const subject = params.subject.replaceAll(/-/g, " ");

    const decks = await prisma.scrapedDeck.findMany({
        where: {
            topics: {
                some: {
                    name: subject
                }
            },
        },
        orderBy: {
            positiveRatings: "desc"
        } as any,
        take: 100,
    }) as ScrapedDeck[];

    return {
        props: {
            topic: subject,
            decks: decks
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

    const topics = await prisma.scrapedTopics.findMany();

    const paths = topics.map((topic) => ({
        params: { subject: topic.name },
    }));

    // { fallback: false } means other routes should 404
    return { paths: paths as any, fallback: 'blocking' };
}