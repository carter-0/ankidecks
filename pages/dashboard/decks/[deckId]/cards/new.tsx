import Navbar from "@/components/global/Navbar";
import NewDeckForm from "@/components/dashboard/NewDeckForm";
import SecondNavbar from "@/components/global/SecondNavbar";
import {useRouter} from "next/router";

type NewCardProps = {
    deckId: string;
}

export default function NewCard(props: NewCardProps) {
    const { deckId } = props;

    return (
        <>
            <Navbar />

            <main className={"flex flex-col items-center dark:text-white text-black"}>
                <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>
                    <SecondNavbar pages={[
                        { name: deckId, href: `/dashboard/decks/${deckId}` },
                        { name: 'New Card', href: `/dashboard/decks/${deckId}/cards/new` },
                    ]} />

                    <div className={"dark:bg-primary-black bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>
                        <NewDeckForm />
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const { deckId } = ctx.query as { deckId: string };

    if (!deckId) {
        return {
            redirect: {
                destination: `/dashboard`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            deckId
        }
    }
}