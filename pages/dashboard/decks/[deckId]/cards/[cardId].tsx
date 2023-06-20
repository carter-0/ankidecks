import Navbar from "@/components/global/Navbar";
import {GetServerSideProps} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime.js'
import SecondNavbar from "@/components/global/SecondNavbar";
import {useState} from "react";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {deleteCards} from "@/lib/publicHelper";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/router";
import useFetch from "@/lib/useFetch";

dayjs.extend(relativeTime)

type DeckProps = {
    card: Card,
    deck: Deck
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Deck(props: DeckProps) {
    const { card, deck } = props;
    const router = useRouter();
    const fetch = useFetch()

    const [deleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false);

    const deleteCardsLocal = () => {
        deleteCards(deck.id, [card.id], fetch).then(async (r) => {
            if (r.success) {
                toast({
                    title: "Cards deleted",
                    description: "Your cards have been deleted.",
                })

                await router.push(`/dashboard/decks/${deck.id}`)
            } else {
                toast({
                    title: "Error",
                    description: "An error occurred while deleting your cards.",
                })
            }
        })
    }

    return (
        <>
            <Navbar />

            <main>
                <AlertDialog open={deleteAlertOpen} onOpenChange={(v) => {setDeleteAlertOpen(v)}}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently this card. You will not be refunded.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteCardsLocal()}>
                                Erase card
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <div className={"flex flex-col items-center dark:text-white text-black"}>
                    <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>
                        <SecondNavbar pages={
                            [
                                { name: deck.name, href: `/dashboard/decks/${deck.id}` },
                                { name: card.front, href: `/dashboard/decks/${deck.id}/cards/${card.id}` },
                            ]
                        } />

                        <div className={"flex mt-10 flex-row items-center"}>
                            <Image alt={"Artist image"} priority={true} width={300} height={300} src={`https://ui-avatars.com/api/?name=${deck.name}&size=128`} className={"w-32 h-32 rounded-md"} />
                            {/* Solid secondary-black section with artist name and genres */}
                            <div className={"dark:bg-primary-black w-full p-4"}>
                                <h1 className={"sm:text-2xl text-lg overflow-wrap font-bold min-w-0"}>{card.front}</h1>
                                <div className={"flex flex-row"}>
                                    <p className={"overflow-wrap text-gray-500"}>Created {dayjs(deck.dateCreated).fromNow()}</p>
                                </div>
                                <p className={"overflow-wrap min-w-0 text-gray-500 sm:block hidden pt-0"}>Member of <Link href={"/dashboard/decks/"+deck.id} className={"font-bold"}>{deck.name}</Link></p>
                                <div className={"flex items-center flex-row"}>
                                    {/*<SpotifyLink object="artist" spotify_id={spotify_id} platform={"desktop"} />*/}
                                    <div className={"ml-1 rounded-md p-1 flex flex-row"}>
                                        {/*<div onClick={() => tryEnableMyStats()} className={cn("p-1 ml-2 rounded-md ease-in-out duration-300 cursor-pointer", !globalStats ? "bg-sp-green dark:text-black" : "dark:text-white text-black")}>*/}
                                        {/*    <p className={"font-medium"}>My Stats</p>*/}
                                        {/*</div>*/}
                                        {/*<div onClick={() => setGlobalStats(true)} className={cn("p-1 ml-2 rounded-md ease-in-out duration-300 cursor-pointer", globalStats ? "bg-sp-green dark:text-black" : "dark:text-white text-black")}>*/}
                                        {/*    <p className={"font-medium"}>Global Stats</p>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"dark:bg-primary-black bg-white shadow rounded-md mt-5 pb-5 w-full pb-0 p-5"}>
                            <div className={"dark:bg-secondary-black"}>
                                <div className={"flex flex-col space-y-2 items-center justify-center"}>
                                    <h1 className={"sm:text-2xl text-xl font-medium sm:max-w-[80%]"}>{card.front}</h1>
                                    <span className={"w-full flex-grow bg-gray-200 dark:bg-gray-800 h-px ml-3"} />
                                    <h1 className={"sm:text-2xl text-xl font-medium sm:max-w-[80%]"}>{card.back}</h1>
                                </div>
                            </div>
                        </div>

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

    const card = await prisma.card.findFirst({
        where: {
            id: ctx.query.cardId
        }
    }) as Card | null;

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

    if (!card || card.deckId !== deck.id) {
        return {
            redirect: {
                destination: "/dashboard",
            }
        }
    }

    return {
        props: {
            deck: JSON.parse(JSON.stringify(deck)),
            card: JSON.parse(JSON.stringify(card)),
        }
    }
}