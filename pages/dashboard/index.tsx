import Navbar from "@/components/global/Navbar";
import StatBox from "@/components/dashboard/StatBox";
import {CurrencyDollarIcon, CursorClickIcon, TrashIcon, BookOpenIcon, UploadIcon} from "@heroicons/react/outline";
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
    AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useState} from "react";
import {deleteDeck} from "@/lib/publicHelper";
import {toast} from "@/components/ui/use-toast";

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime.js'
import {getUser, getUserTokens} from "@/lib/helper";
import FreeAccountBannerCTA from "@/components/global/FreeAccountBannerCTA";
import Footer from "@/components/global/Footer";
import FileUpload from "@/components/dashboard/FileUpload";
import useFetch from "@/lib/useFetch";

dayjs.extend(relativeTime)

type DashboardProps = {
    decks: Deck[],
    tokens: number,
    freeAccount: boolean
}

export default function Dashboard(props: DashboardProps) {
    const { decks, tokens, freeAccount } = props;
    const fetch = useFetch()

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
    const [selectedDeck, setSelectedDeck] = useState<string>("")

    const tokenAllowance = freeAccount ? (8192).toLocaleString() : "∞"
    const tokensUsed = freeAccount ? (8192 - tokens).toLocaleString() : 100000000 - tokens

    // const mostRecentCard = decks.map((deck) => {
    //     return deck.cards.sort((a, b) => {
    //         return dayjs(b.dateModified).unix() - dayjs(a.dateModified).unix()
    //     })[0]
    // }).sort((a, b) => {
    //     return dayjs(b.dateModified).unix() - dayjs(a.dateModified).unix()
    // })[0]

    return (
        <>
            <Navbar />

            {freeAccount ? (
                <FreeAccountBannerCTA />
            ) : null}

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
                            <AlertDialogAction onClick={() => deleteDeck(selectedDeck, fetch).then((r) => {
                                if (r.success) {
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
                    <div className={"flex flex-col"}>
                        <div className={"sm:-mx-5 lg:flex lg:flex-row lg:max-w-7xl"}>
                            <StatBox title={"Credits Used"} value={`${tokensUsed.toLocaleString()} / ${tokenAllowance}`} icon={CurrencyDollarIcon} />
                            <StatBox title={"Decks"} value={decks.length.toLocaleString()} icon={BookOpenIcon} />
                            <StatBox title={"Account Status"} value={freeAccount ? 'Free' : 'Premium'} icon={CurrencyDollarIcon}>
                                {freeAccount ? (
                                    <>
                                        <Link href={"/api/stripe/checkout"} className={"text-sm ml-2 text-gray-500 cursor-pointer"}>
                                            Upgrade
                                        </Link>
                                    </>
                                ) : <>
                                        <p onClick={
                                            (e: any) => {
                                                if (e.target.classList.contains("text-red-500")) {
                                                    e.target.classList.remove("text-red-500")
                                                    e.target.classList.add("text-teal-500")
                                                } else {
                                                    e.target.classList.add("text-red-500")
                                                    e.target.classList.remove("text-teal-500")
                                                }
                                            }
                                        } className={"text-teal-500 ml-2 text-xl cursor-pointer"}>
                                            ❤
                                        </p>
                                    </>
                                }
                            </StatBox>
                        </div>

                        <div className={"mx-5 sm:mx-0"}>
                            <div className={"bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>
                                <div className={"rounded-md"}>
                                    <h1 className={"text-2xl font-bold"}>Decks</h1>
                                    <div className={"flex flex-row"}>
                                        <p className={"text-gray-500 pb-2 font-medium"}>Your current decks</p>
                                    </div>

                                    <div className={"grid sg:grid-cols-1 grid-cols-2 gap-4"}>
                                        {decks.map((deck, deckX) => (
                                            <div key={deckX} className={"col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"}>
                                                <div className={"border border-gray-200 bg-white rounded-md w-full mt-2"}>
                                                    <div className={"flex flex-row items-center bg-gray-50 border-b border-gray-200 w-full py-3 p-5 px-4"}>
                                                        <div className={"flex flex-row items-center"}>
                                                            <Link href={"/dashboard/decks/"+deck.id}><p className="text-sm font-medium lg:text-xl text-lg overflow-wrap min-w-0">{deck.name}</p></Link>
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
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </div>
                                                    <div className={"flex flex-col py-3 p-5 px-4 sm:px-6"}>
                                                        <div className={"flex flex-row justify-between"}>
                                                            <p className={"text-gray-500 pb-2 font-medium"}>Cards</p>
                                                            <p className={"pb-2 font-medium"}>{deck.cards.length}</p>
                                                        </div>

                                                        <div className={"flex flex-row justify-between"}>
                                                            <p className={"text-gray-500 pb-2 font-medium"}>Created</p>
                                                            <p className={"pb-2 font-medium"}>{dayjs(deck.dateCreated).fromNow()}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className={"col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"}>
                                            <Link href={"/dashboard/decks/new"}>
                                                <div className={"cursor-pointer border-2 py-9 border-dashed border-gray-200 bg-white p-5 rounded-md w-full mt-2"}>
                                                    <div className={"flex flex-col justify-center items-center"}>
                                                        <PlusIcon className={"h-6 w-6"} />
                                                        <p className={"font-medium"}>Create Deck</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        <FileUpload />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
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

    const [decks, tokens, freeAccount] = await Promise.all([
        prisma.deck.findMany({
            where: {
                user: userId
            },
            include: {
                cards: true
            },
            orderBy: {
                dateCreated: "desc"
            } as any
        }),
        getUserTokens(userId),
        getUser(userId).then(user => user.freeAccount)
    ]) as [Deck[] | null, number, boolean]

    if (!decks) {
        return {
            props: {
                decks: [],
                tokens: tokens,
                freeAccount: freeAccount
            }
        }
    }

    return {
        props: {
            decks: JSON.parse(JSON.stringify(decks)),
            tokens: tokens,
            freeAccount: freeAccount
        }
    }
}