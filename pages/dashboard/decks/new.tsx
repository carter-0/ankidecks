import Navbar from "@/components/global/Navbar";
import NewDeckForm from "@/components/dashboard/NewDeckForm";
import SecondNavbar from "@/components/global/SecondNavbar";

export default function NewDeck() {
    return (
        <>
            <Navbar />

            <main className={"flex flex-col items-center text-black"}>
                <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>
                    <SecondNavbar pages={[
                        { name: 'New Deck', href: '/dashboard/decks/new' },
                    ]} />

                    <div className={"bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>
                        <NewDeckForm />
                    </div>
                </div>
            </main>
        </>
    )
}