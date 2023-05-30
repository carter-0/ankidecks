import Navbar from "@/components/global/Navbar";
import StatBox from "@/components/dashboard/StatBox";
import {BookOpenIcon, CurrencyDollarIcon, CursorClickIcon, TrashIcon} from "@heroicons/react/outline";
import {getAuth} from "@clerk/nextjs/server";
import {GetServerSideProps} from "next";
import {prisma} from "@/lib/db";
import Link from "next/link";

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
import Image from "next/image";

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

                <div className={"dark:text-white light:text-black mx-auto sg:max-w-md sg:max-w-3xl mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl lg:px-8"}>
                    <div className={"flex flex-col"}>
                        <div className={"sm:-mx-5 lg:flex lg:flex-row lg:max-w-7xl"}>
                            <StatBox title={"Tokens"} value={"0"} icon={CurrencyDollarIcon} />
                            <StatBox title={"Tokens"} value={"0"} icon={CurrencyDollarIcon} />
                            <StatBox title={"Tokens"} value={"0"} icon={CurrencyDollarIcon} />
                        </div>

                        <div className={"mx-5 sm:mx-0"}>
                            <div className={"dark:bg-primary-black bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>
                                <div className={"dark:bg-secondary-black rounded-md"}>
                                    <h1 className={"text-2xl font-bold"}>Decks</h1>
                                    <div className={"flex flex-row"}>
                                        <p className={"dark:text-gray-400 text-gray-500 pb-2 font-medium"}>Your current decks</p>
                                    </div>

                                    <div className={"grid sg:grid-cols-1 grid-cols-2 gap-4"}>
                                        {decks.map((deck, deckX) => (
                                            <div key={deckX} className={"col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"}>
                                                <div className={"dark:bg-primary-black border border-gray-200 bg-white rounded-md w-full mt-2"}>
                                                    <div className={"flex flex-row items-center bg-gray-50 border-b border-gray-200 w-full py-3 p-5 px-4"}>
                                                        <div className={"flex flex-row items-center"}>
                                                            <div className="bg-black rounded-md p-3">
                                                            {/*    <Image src={`https://ui-avatars.com/api/?name=${deck.name}&size=128&color=fff&background=000`} alt={"Deck icon"} width={64} height={64} className={"h-9 w-9 rounded-md"} />*/}
                                                                {/*<BookOpenIcon className="h-6 w-6 text-white" aria-hidden="true" />*/}
                                                                {/*<icon className="h-6 w-6 text-white" aria-hidden="true" />*/}
                                                                <p className="text-white text-sm font-medium -my-0.5 mx-[0.25px] py-[0.5px] lg:text-xl text-lg overflow-wrap min-w-0">{deck.name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()}</p>
                                                            </div>
                                                            <Link href={"/dashboard/decks/"+deck.id}><p className="dark:text-gray-400 text-sm font-medium ml-4 lg:text-xl text-lg overflow-wrap min-w-0">{deck.name}</p></Link>
                                                        </div>

                                                        <div className={"flex flex-row ml-auto"}>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger className={"focus:outline-none"}>
                                                                    <MoreVertical />
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    <DropdownMenuLabel>Deck</DropdownMenuLabel>
                                                                    <DropdownMenuSeparator />
                                                                    <Link href={"/dashboard/decks/"+deck.id}><DropdownMenuItem className={"cursor-pointer"}><CursorClickIcon className={"h-4 mr-2 w-4"} /> Open</DropdownMenuItem></Link>
                                                                    <DropdownMenuItem onClick={() => {setDeleteAlertOpen(true); setSelectedDeck(deck.id)}} className={"cursor-pointer"}>
                                                                        <TrashIcon className={"h-4 text-red-500 mr-2 w-4"} /> Delete
                                                                    </DropdownMenuItem>
                                                                    {/*<DropdownMenuItem>Team</DropdownMenuItem>*/}
                                                                    {/*<DropdownMenuItem>Subscription</DropdownMenuItem>*/}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                            {/*<Link href={"/"} className={"dark:bg-secondary-black ml-2 dark:text-white hover:bg-gray-200 bg-gray-100 text-gray-900 px-4 py-2 rounded-md text-sm font-medium"}>View</Link>*/}
                                                        </div>
                                                    </div>
                                                    <div className={"flex flex-col py-3 p-5 px-4 sm:px-6"}>
                                                        <div className={"flex flex-row justify-between"}>
                                                            <p className={"dark:text-gray-400 text-gray-500 pb-2 font-medium"}>Cards</p>
                                                            <p className={"dark:text-gray-400 pb-2 font-medium"}>{deck.cards.length}</p>
                                                        </div>

                                                        <div className={"flex flex-row justify-between"}>
                                                            <p className={"dark:text-gray-400 text-gray-500 pb-2 font-medium"}>Last Modified</p>
                                                            <p className={"dark:text-gray-400 pb-2 font-medium"}>{dayjs(mostRecentCard.dateModified).fromNow()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className={"col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"}>
                                            <Link href={"/dashboard/decks/new"}>
                                                <div className={"dark:bg-primary-black cursor-pointer border-2 py-9 border-dashed border-gray-200 bg-white p-5 rounded-md w-full mt-2"}>
                                                    <div className={"flex flex-col justify-center items-center"}>
                                                        <PlusIcon className={"h-6 w-6"} />
                                                        <p className={"font-medium"}>New Deck</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
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