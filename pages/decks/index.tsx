import Navbar from "@/components/global/Navbar";
import TopicList from "@/components/decks/TopicList";

import {prisma} from "@/lib/db";
import Navbar from "@/components/global/Navbar";
import SecondNavbar from "@/components/global/SecondNavbar";
import Link from "next/link";
import {ChevronRightIcon, HomeIcon} from "@heroicons/react/solid";
import {ChevronDoubleRightIcon} from "@heroicons/react/outline";
import Head from "next/head";

type DecksProps = {
    topics: ScrapedTopicsWithCount[]
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
    "Explore more than {quantity} top-rated Anki decks found online. Ideal for exam preparation or simply expanding your knowledge, these decks are available to use and download for free.",
    "Browse through more than {quantity} excellently curated Anki decks. Use them to boost your exam performance or simply to learn something new. All decks are accessible at no cost and downloadable to support your personal endeavors.",
    "Find {quantity} exceptional Anki decks, serving as ideal resources for acing your exams or learning something exciting. Access and download these decks without any charge, for your individual use.",
    "Discover over {quantity} extraordinary Anki decks. Make use of these resources to strengthen your exam results or simply learn something new. These decks are provided free of charge, ready for download and personal use.",
    "Discover over {quantity} of the best Anki decks. You can use them to study for your exams, or just to learn something new. All decks are free to use and download for your personal use.",
]

export default function Decks(props: DecksProps) {
    const { topics } = props

    const heroText = choices[hashToNumber(topic)].replace("{quantity}", topics.length).replace("{topic}", "");

    return (
        <>
            <Head>
                <title>{`Explore the top ${topics.length} Anki Decks`}</title>
                <meta key={"description"} name="description" content={`Explore more than ${topics.length} top-rated Anki decks. Ideal for exam preparation or simply expanding your knowledge, these decks are available to use and download for free.`} />
                <meta key={"og:title"} property="og:title" content={`Explore the top ${topics.length} Anki Decks`} />
                <meta key={"og:description"} property="og:description" content={`Explore more than ${topics.length} top-rated Anki decks. Ideal for exam preparation or simply expanding your knowledge, these decks are available to use and download for free.`} />
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
                        </ol>
                    </nav>
                </div>

                <div className={"max-w-3xl"}>
                    <span className={"text-lg text-teal-500 font-bold"}>{topicCaps}</span>
                    <h1 className={"mt-2 text-3xl font-bold tracking-tight text-primary-500 sm:text-4xl"}>
                        Discover the top {topics.length} Anki decks.
                    </h1>

                    <p className={"mt-3 text-lg text-gray-500"}>
                        {heroText} All decks can be used with <Link target={"_blank"} href={"https://apps.ankiweb.net/"} className={"text-teal-500 hover:text-teal-600"}>Anki</Link>, a free flashcard program.
                    </p>
                </div>

                <div className={"mt-12 sm:mt-16"}>
                    <TopicList topics={topics} />
                </div>
            </div>
        </>
    )
}

export const getStaticProps: (ctx: any) => Promise<{ redirect: { permanent: boolean; destination: string } } | { redirect: { destination: string } } | { props: {} }> = async (ctx: any) => {
    const topics = await prisma.scrapedTopics.findMany({
        select: {
            id: true,
            name: true,
            _count: {
                decks: true
            }
        }
    }) as ScrapedTopicsWithCount[];

    return {
        props: {
            topics: topics
        }
    }
}