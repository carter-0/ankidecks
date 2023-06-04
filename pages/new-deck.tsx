// import Navbar from "@/components/global/Navbar";
// import SecondNavbar from "@/components/global/SecondNavbar";
// import NewCardForm from "@/components/dashboard/NewCardForm";
// import {getAuth} from "@clerk/nextjs/server";
// import {prisma} from "@/lib/db";
// import Deck from "@/pages/dashboard/decks/[deckId]";
//
// type NewCardProps = {
//     deck: Deck;
// }

import Navbar from "@/components/global/Navbar";

export default function NewDeck() {

    return (
        <>
            <Navbar />

            {/*<main className={"flex flex-col items-center dark:text-white text-black"}>*/}
            {/*    <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>*/}
            {/*        <SecondNavbar pages={[*/}
            {/*            { name: deck.name, href: `/dashboard/decks/${deck.id}` },*/}
            {/*            { name: 'New Card', href: `/dashboard/decks/${deck.id}/cards/new` },*/}
            {/*        ]} />*/}

            {/*        <div className={"dark:bg-primary-black bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>*/}
            {/*            /!*<NewCardForm deck={deck} />*!/*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</main>*/}
        </>
    )
}
