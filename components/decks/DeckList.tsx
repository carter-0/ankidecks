/* This example requires Tailwind CSS v2.0+ */
import {ArrowUpIcon, LinkIcon, MailIcon, PhoneIcon} from '@heroicons/react/solid'
import {ArrowBigUp, ArrowUp} from "lucide-react";
import Link from "next/link";

const people = [
    {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        email: 'janecooper@example.com',
        telephone: '+1-202-555-0170',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
]

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

export default function DeckList(props: DeckListProps) {
    const { decks, topic } = props;

    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {decks.map((deck) => (
                <li
                    key={deck.id}
                    className="col-span-1 flex flex-col bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                    <div className="flex-1 flex flex-col pt-4 pb-0 p-8">
                        {/*<img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={person.imageUrl} alt="" />*/}
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
            ))}
        </ul>
    )
}