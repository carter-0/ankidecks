import Navbar from "@/components/global/Navbar";
import StatBox from "@/components/dashboard/StatBox";
import {CurrencyDollarIcon, CursorClickIcon, TrashIcon} from "@heroicons/react/outline";
import {getAuth} from "@clerk/nextjs/server";
import {GetServerSideProps} from "next";
import {prisma} from "@/lib/db";
import Link from "next/link";
import Cookies from 'cookies'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {MoreVertical, PlusIcon} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {useState} from "react";
import {deleteDeck} from "@/lib/publicHelper";
import {toast} from "@/components/ui/use-toast";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime.js'

dayjs.extend(relativeTime)

type DashboardProps = {
    decks: Deck[]
}

export default function Dashboard(props: DashboardProps) {
    const { decks } = props;

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
    const [selectedDeck, setSelectedDeck] = useState<string>("")

    const mostRecentCard = decks.map((deck) => {
        return deck.cards.sort((a, b) => {
            return dayjs(b.dateModified).unix() - dayjs(a.dateModified).unix()
        })[0]
    }).sort((a, b) => {
        return dayjs(b.dateModified).unix() - dayjs(a.dateModified).unix()
    })[0]

    return (
        <>
            <Navbar />

            <main>
                <AlertDialog open={deleteAlertOpen} onOpenChange={(v) => {setDeleteAlertOpen(v)}}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your deck and all of its cards. You will not be refunded.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteDeck(selectedDeck).then((r) => {
                                if (r.status == "success") {
                                    toast({
                                        title: "Deck deleted",
                                        description: "Your deck has been deleted.",
                                    })
                                } else {
                                    toast({
                                        title: "Error",
                                        description: "An error occurred while deleting your deck.",
                                    })
                                }
                            })}>Erase my deck</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <div className={"mx-auto sg:max-w-md sg:max-w-3xl mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl lg:px-8"}>
                    <div className={"flex flex-col w-full justify-center items-center"}>

                        <div className={"mx-auto mt-4 w-full max-w-lg space-y-4"}>
                            <div className={"bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>
                                <h1 className={"text-2xl mt-3 font-bold"}>Welcome to Anki Decks!</h1>
                                <div className={"flex flex-row"}>
                                    <p className={"text-black/80 pb-2"}>Get started immediately by creating a deck, or explore for yourself by navigating to the dashboard.</p>
                                </div>

                                <div className={"flex mt-2 flex-col w-full"}>
                                    <Link className={"w-full"} href={"/dashboard/decks/new-inclusive"}>
                                        <button className={"bg-teal-500 w-full hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"}>
                                            Create a deck
                                        </button>
                                    </Link>
                                    <p className={"w-full text-center text-gray-500 font-medium"}>or</p>
                                    <Link className={"w-full"} href={"/dashboard"}>
                                        <button className={"bg-gray-100 w-full hover:bg-gray-200 text-gray-500 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"}>
                                            Explore the dashboard
                                        </button>
                                    </Link>
                                </div>

                                <p className={"text-gray-500 text-sm mt-3"}>You can also <Link className={"text-teal-600 font-medium"} href={"/dashboard"}>contact support</Link> if you have any questions or issues.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const { userId } = getAuth(ctx.req);

    if (!userId) {
        return {
            redirect: {
                destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
                permanent: false,
            },
        };
    }

    const cookies = new Cookies(ctx.req, ctx.res)

    if (cookies.get("resumeDeck")) {
        return {
            redirect: {
                destination: "/dashboard/resume-deck-creation",
                permanent: false
            }
        }
    }

    const decks = await prisma.deck.findMany({
        where: {
            user: userId
        },
        include: {
            cards: true
        }
    }) as Deck[] | null;

    if (!decks) {
        return {
            props: {
                decks: []
            }
        }
    }

    return {
        props: {
            decks: JSON.parse(JSON.stringify(decks))
        }
    }
}