import Link from "next/link";
import {ArrowUpIcon, LinkIcon} from "@heroicons/react/solid";
import dayjs from "dayjs";

dayjs.extend(require('dayjs/plugin/relativeTime'))

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

type DeckListPreviewProps = {
    decks: PartialDeck[]
}

export default function DeckListPreview(props: DeckListPreviewProps) {
    const {decks} = props;

    const cols = typeof window === 'undefined' ? 4 : getCols(window.innerWidth)
    const breakpoint = typeof window === 'undefined' ? 8 : getBreakpoint(cols)

    const decksToRender = decks.slice(0, breakpoint);

    return (
        <>
            <div className={"relative"}>
                <ul role="list" className="grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {decksToRender.map((deck, deckX) => (
                        <>
                            <li
                                key={deck.id}
                                className="col-span-1 flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
                            >
                                <div className="flex-1 flex flex-col pt-4 pb-0 p-8">
                                    <h3 className="text-gray-900 text-xl font-medium">{deck.name}</h3>
                                    <dl className="mt-1 flex-grow pb-2 flex flex-col justify-between">
                                        <dd className="text-gray-500 text-sm"><b>{deck._count.cards.toLocaleString()}</b> cards. AI-generated <b>{dayjs(deck.dateCreated).fromNow()}</b></dd>
                                    </dl>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200">
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