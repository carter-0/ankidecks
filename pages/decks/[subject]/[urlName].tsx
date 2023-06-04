import {prisma} from "@/lib/db";
import Navbar from "@/components/global/Navbar";
import Link from "next/link";
import {ChevronRightIcon, DownloadIcon, StarIcon} from "@heroicons/react/solid";
import Head from "next/head";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime)

type ScrapedDeckProps = {
    deck: ScrapedDeck;
}

export default function ScrapedDeck(props: ScrapedDeckProps) {
    const { deck } = props;

    const topic = deck.topics[0].name;
    const topicCaps = topic.split(/ /g).map(val => val[0].toUpperCase() + val.slice(1)).join(' ')

    const heroText = `Download ${deck.name}, a free Anki deck with ${deck.cardCount} total cards and a positive rating of ${deck.positiveRatings-deck.negativeRatings}.`

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
                            <li>
                                <div className="flex items-center">
                                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    <Link
                                        href={"/decks/"+topic.toLowerCase().replace(" ", "-")+"/"+deck.urlSafeName.toLowerCase()}
                                        className="ml-4 text-gray-500 hover:text-gray-700 line-clamp-2"
                                    >
                                        {deck.name}
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className={"flex flex-col sm:flex-row justify-between items-start"}>
                    <div className={"max-w-3xl"}>
                        <span className={"text-lg text-teal-500 font-bold"}>{topicCaps}</span>
                        <h1 className={"mt-2 text-3xl font-bold tracking-tight text-primary-500 sm:text-4xl"}>
                            {deck.name}
                        </h1>

                        <p className={"mt-3 text-lg text-gray-500"}>
                            {heroText} This deck can be used with <Link target={"_blank"} href={"https://apps.ankiweb.net/"} className={"text-teal-500 hover:text-teal-600"}>Anki</Link>, a free flashcard program.
                        </p>
                    </div>

                    <div className="rounded-2xl text-center w-full lg:w-auto items-center lg:flex lg:flex-col lg:justify-center">
                        <div className="mx-auto max-w-xs px-8">
                            <Link
                                href={`https://ankiweb.net/shared/info/${deck.ankiId}`}
                                target={"_blank"}
                                rel={"nofollow"}
                                className="mt-10 block w-full rounded-md bg-teal-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                            >
                                Download <DownloadIcon className={"inline-block h-4 w-4 ml-1"}/>
                            </Link>
                            <p className="mt-6 text-xs leading-5 text-gray-600">
                                All decks are hosted on AnkiWeb. By downloading, you agree to their <Link target={"_blank"} rel={"nofollow"} href={"https://ankiweb.net/account/terms"} className={"text-teal-500 hover:text-teal-600"}>Terms of Service</Link>.
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Ratings</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{deck.positiveRatings+deck.negativeRatings}</dd>
                        </div><div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Cards</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{deck.cardCount}</dd>
                        </div><div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Created</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{dayjs(deck.dateModified*1000).fromNow()}</dd>
                        </div>
                    </dl>
                </div>

                <div
                    className={`cols-span-1 mt-8 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-teal-500 text-white flex flex-col rounded-lg shadow divide-y divide-gray-200`}
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-teal-500 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                                <div className="lg:self-center">
                                    <h2 className={"text-3xl font-bold text-white sm:text-4xl"}>Create your own deck in seconds with AI</h2>

                                    <p className="mt-4 text-lg leading-6 text-white/80">
                                        Convert your notes into an expertly-crafted optimised deck in seconds with our AI. Just paste your notes and we&apos;ll do the rest.
                                    </p>

                                    <div className={"flex mt-8 items-center w-full sm:w-auto flex-col sm:flex-row"}>
                                        <Link
                                            href="/new-deck"
                                            className="hover:scale-[1.05] w-full sm:w-auto transition-transform duration-200 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-indigo-50"
                                        >
                                            Make my deck
                                        </Link>

                                        <div className="flex mt-3 sm:mt-0 sm:ml-3 p-1 -space-x-2 overflow-hidden">
                                            <img
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <img
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                                src="https://images.unsplash.com/photo-1590895340509-793cb98788c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80"
                                                alt=""
                                            />
                                        </div>

                                        <div className="flex sm:ml-3">
                                            <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                            <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                            <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                            <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                            <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                                <img
                                    className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                                    src="https://tailwindui.com/img/component-images/full-width-with-sidebar.jpg"
                                    alt="App screenshot"
                                />
                            </div>
                        </div>
                    </div>
                </div>

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

    const decks = await prisma.scrapedDeck.findMany({
        include: {
            topics: true
        }
    }) as ScrapedDeck[];

    const paths = decks.map((deck) => ({
        params: { urlName: deck.urlSafeName, subject: deck.topics[0].name },
    }));

    // { fallback: false } means other routes should 404
    return { paths: paths as any, fallback: 'blocking' };
}