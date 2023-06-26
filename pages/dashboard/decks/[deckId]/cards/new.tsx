import Navbar from "@/components/global/Navbar";
import SecondNavbar from "@/components/global/SecondNavbar";
import NewCardForm from "@/components/dashboard/NewCardForm";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

type NewCardProps = {
    deck: Deck;
}

export default function NewCard(props: NewCardProps) {
    const { deck } = props;

    return (
        <>
            <Navbar />

            <main className={"flex flex-col items-center text-black"}>
                <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>
                    <SecondNavbar pages={[
                        { name: deck.name, href: `/dashboard/decks/${deck.id}` },
                        { name: 'New Card', href: `/dashboard/decks/${deck.id}/cards/new` },
                    ]} />

                    <div className={"bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>
                        <NewCardForm deck={deck} />
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: (ctx: any) => Promise<{ redirect: { permanent: boolean; destination: string } } | { redirect: { destination: string } } | { props: {} }> = async (ctx: any) => {
    const { userId } = getAuth(ctx.req);

    if (!userId) {
        return {
            redirect: {
                destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
                permanent: false,
            },
        };
    }

    const deck = await prisma.deck.findFirst({
        where: {
            id: ctx.query.deckId
        }
    }) as Deck | null;

    if (!deck) {
        return {
            redirect: {
                destination: "/dashboard",
            }
        }
    }

    if (deck.user !== userId) {
        return {
            redirect: {
                destination: "/dashboard",
            }
        }
    }

    return {
        props: {
            deck: JSON.parse(JSON.stringify(deck))
        }
    }
}
