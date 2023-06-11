import {ArrowUpIcon, LinkIcon, StarIcon} from '@heroicons/react/solid'
import Link from "next/link";
import Image from "next/image";
import MainCTA from "@/components/global/MainCTA";

const epochToDate = (seconds: number) => {
    const dateObj = new Date(seconds * 1000);

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

type DeckListProps = {
    cards: Card[]
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

export default function CardList(props: DeckListProps) {
    const { cards } = props;

    const cols = typeof window === 'undefined' ? 4 : getCols(window.innerWidth)
    const breakpoint = typeof window === 'undefined' ? 8 : getBreakpoint(cols)

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map((card, deckX) => (
                <>
                    {breakpoint === deckX ? (
                        <>
                            <MainCTA key={card.id} />
                        </>
                    ) : null}

                    <li
                        key={card.id}
                        className="col-span-1 flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
                    >
                        <div className="flex-1 flex flex-col pt-4 pb-0 p-8">
                            <h3 className="text-gray-900 text-xl font-medium">{card.front}</h3>
                            <dl className="mt-1 flex-grow pb-2 flex flex-col justify-between">
                                <dd className="text-gray-500 text-sm"><b>{card.id.toLocaleString()}</b> <b>{card.type}</b> cards. Created <b>{card.dateModified.toString()}</b></dd>
                            </dl>
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="w-0 flex-1 flex">
                                    <Link
                                        href={`https://ankiweb.net/shared/review/${card.id}`}
                                        target={"_blank"}
                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                    >
                                        <ArrowUpIcon className="w-5 h-5 font-extrabold text-red-500" aria-hidden="true" />
                                        <span className="ml-3">card</span>
                                    </Link>
                                </div>
                                <div className="-ml-px w-0 flex-1 flex">
                                    <Link
                                        href={`/decks/${card.id.toLowerCase().replace(" ", "-")}/${card.id.toLowerCase()}`}
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

            <MainCTA />
        </ul>
    )
}