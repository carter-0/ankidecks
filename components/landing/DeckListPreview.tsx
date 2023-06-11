import Link from "next/link";
import {ArrowUpIcon, LinkIcon} from "@heroicons/react/solid";
import dayjs from "dayjs";

dayjs.extend(require('dayjs/plugin/relativeTime'))

type DeckListPreviewProps = {
    decks: PartialDeck[]
}

export default function DeckListPreview(props: DeckListPreviewProps) {
    const {decks} = props;

    return (
        <>
            <div className={"relative"}>
                <ul role="list" className="grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {decks.map((deck, deckX) => (
                        <>
                            <li
                                key={deck.id}
                                className="col-span-1 flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
                            >
                                <div className="flex-1 flex flex-col pt-4 pb-0 p-8">
                                    <h3 className="text-gray-900 text-xl font-medium">{deck.name}</h3>
                                    <dl className="mt-1 flex-grow pb-2 flex flex-col justify-between">
                                        <dd className="text-gray-500 text-sm"><b>{deck._count.cards.toLocaleString()}</b> cards. Rated by <b>{2}</b> people. Created <b>{dayjs(deck.dateCreated).fromNow()}</b></dd>
                                    </dl>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200">
                                        <div className="w-0 flex-1 flex">
                                            <Link
                                                href={`https://ankiweb.net/shared/review/${deck.id}`}
                                                target={"_blank"}
                                                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                            >
                                                <ArrowUpIcon className="w-5 h-5 font-extrabold text-red-500" aria-hidden="true" />
                                                {/*<span className="ml-3">{deck.positiveRatings - deck.negativeRatings}</span>*/}
                                            </Link>
                                        </div>
                                        <div className="-ml-px w-0 flex-1 flex">
                                            <Link
                                                href={`/decks/ai/${deck.id}`}
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
                        className="w-full bg-gradient-to-b from-transparent via-gray-50 to-gray-50 -bottom-24 absolute z-20 h-[200px]">
                        <div className="flex items-end justify-center h-full">
                            <Link href="/decks">
                                <button type="button"
                                        className="flex content-center items-center justify-center text-center px-6 py-3 border border-white/20 text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-200 flex-shrink-0">
                                    View all decks
                                </button>
                            </Link>
                        </div>
                    </div>
                </ul>
            </div>
        </>
    )
}