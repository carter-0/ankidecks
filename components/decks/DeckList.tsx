import {ArrowUpIcon, LinkIcon, StarIcon} from '@heroicons/react/solid'
import Link from "next/link";

const epochToDate = (seconds: number) => {
    const dateObj = new Date(seconds * 1000);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

type DeckListProps = {
    decks: ScrapedDeck[]
    topic: string
}

function getBreakpoint(cols: number) {
    if (cols == 1) {
        return 3;
    } else if (cols == 2) {
        return 4;
    } else if (cols == 3) {
        return 6;
    }

    return 8;
}

function getCols(width: number) {
    console.log(width)
    if (width < 640) {
        return 1;
    } else if (width < 768) {
        return 2;
    } else if (width < 1024) {
        return 3;
    }

    return 4;
}

export default function DeckList(props: DeckListProps) {
    const { decks, topic } = props;

    const cols = typeof window === 'undefined' ? 4 : getCols(window.innerWidth)
    const breakpoint = typeof window === 'undefined' ? 8 : getBreakpoint(cols)

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {decks.map((deck, deckX) => (
                <>
                    {breakpoint === deckX ? (
                        <li
                            key={deck.id}
                            className={`cols-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-teal-500 text-white flex flex-col rounded-lg shadow divide-y divide-gray-200`}
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
                        </li>
                    ) : null}

                    <li
                        key={deck.id}
                        className="col-span-1 flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
                    >
                        <div className="flex-1 flex flex-col pt-4 pb-0 p-8">
                            <h3 className="text-gray-900 text-xl font-medium">{deck.name}</h3>
                            <dl className="mt-1 flex-grow pb-2 flex flex-col justify-between">
                                <dd className="text-gray-500 text-sm"><b>{deck.cardCount.toLocaleString()}</b> <b>{topic}</b> cards. Rated by <b>{deck.positiveRatings + deck.negativeRatings}</b> people. Created <b>{epochToDate(deck.dateModified)}</b></dd>
                            </dl>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="w-0 flex-1 flex">
                                    <Link
                                        href={`https://ankiweb.net/shared/review/${deck.ankiId}`}
                                        target={"_blank"}
                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                    >
                                        <ArrowUpIcon className="w-5 h-5 font-extrabold text-red-500" aria-hidden="true" />
                                        <span className="ml-3">{deck.positiveRatings - deck.negativeRatings}</span>
                                    </Link>
                                </div>
                                <div className="-ml-px w-0 flex-1 flex">
                                    <Link
                                        href={`/decks/${topic.toLowerCase().replace(" ", "-")}/${deck.urlSafeName.toLowerCase()}`}
                                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                    >
                                        <LinkIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                        <span className="ml-3">View</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                </>
            ))}

            <div
                className={`cols-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-teal-500 text-white flex flex-col rounded-lg shadow divide-y divide-gray-200`}
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
        </ul>
    )
}