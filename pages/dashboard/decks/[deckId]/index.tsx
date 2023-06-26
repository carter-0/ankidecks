import Navbar from "@/components/global/Navbar";
import {GetServerSideProps} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime.js'
import StatBox from "@/components/dashboard/StatBox";
import {
    AlignJustifyIcon,
    CoinsIcon, DownloadIcon,
    MoreVertical
} from "lucide-react";
import SecondNavbar from "@/components/global/SecondNavbar";
import {useEffect, useState} from "react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {CursorClickIcon, TrashIcon} from "@heroicons/react/outline";
import {cn} from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {deleteCards, deleteDeck} from "@/lib/publicHelper";
import {toast} from "@/components/ui/use-toast";
import Footer from "@/components/global/Footer";
import ActionsList from "@/components/decks/ActionsList";
import Tasks from "@/components/decks/Tasks";
import useSWR from "swr";
import UnsavedChangesBar from "@/components/global/UnsavedChangesBar";
import useFetch from "@/lib/useFetch";

dayjs.extend(relativeTime)

type DeckProps = {
    deck: Deck
}

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Deck(props: DeckProps) {
    const { deck: initialDeck } = props;
    const fetch = useFetch();

    const [deck, setDeck] = useState<Deck>(initialDeck);

    const [listView, setListView] = useState<boolean>(false);
    const [selectData, setSelectData] = useState<any>({
        active: false,
        selected: []
    });

    const [editMode, setEditMode] = useState<boolean>(false);

    const [initialDeckData, setInitialDeckData] = useState<Deck>(deck);
    const [deckData, setDeckData] = useState<Deck>(deck);

    const [deleteAlertOpen, setDeleteAlertOpen] = useState<boolean>(false);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

    const { data: tasks } = useSWR(`/api/decks/${deck.id}/tasks`, fetcher, {
        fallbackData: deck.tasks as Task[],
        refreshInterval: 1000
    });

    useEffect(() => {
        if (deckData !== initialDeckData) {
            setUnsavedChanges(true);
        } else {
            setUnsavedChanges(false);
        }
    }, [deckData, initialDeckData])

    const addCard = (cardId: string) => {
        if (selectData.selected.includes(cardId)) {
            setSelectData({
                ...selectData,
                selected: selectData.selected.filter((id: string) => id !== cardId)
            })
        } else {
            setSelectData({
                ...selectData,
                selected: [...selectData.selected, cardId]
            })
        }
    }

    const refreshDeck = () => {
        fetch(`/api/decks/${deck.id}?includeCards=true`).then((res) => {
            if (res.status === 200) {
                res.json().then((data: {success: boolean, deck: Deck}) => {
                    setDeck(data.deck);
                })
            }
        })
    }

    const deleteCardsLocal = () => {
        deleteCards(deck.id, selectData.selected, fetch).then(async (r) => {
            if (r.success) {
                toast({
                    title: "Cards deleted",
                    description: "Your cards have been deleted.",
                })

                await refreshDeck();

                setSelectData({
                    selected: [],
                    active: false
                })
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
                                This action cannot be undone. This will permanently {selectData.selected.length} cards. You will not be refunded.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteCardsLocal()}>
                                Erase {selectData.selected.length} cards
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <div className={cn("fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-20 transition-all ease-in-out", selectData.active ? 'opacity-100' : 'opacity-0')}>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="p-2 rounded-lg bg-blue-200 shadow-lg sm:p-3">
                            <div className="flex items-center justify-between flex-wrap">
                                <div className="w-0 flex-1 flex items-center">
                                    <p className="sg:ml-3 font-semibold truncate">
                                        <span className="md:hidden">You have unsaved changes!</span>
                                        <span className="hidden md:inline">Selecting {selectData.selected.length} cards</span>
                                    </p>
                                </div>
                                <div className="order-2 flex-shrink-0 sm:order-2">
                                    <button
                                        type="button"
                                        className="-mr-1 flex p-2 rounded-md hover:underline focus:outline-none focus:ring-2 focus:ring-white"
                                        onClick={() => setSelectData({ active: false, selected: [] })}
                                    >
                                        <span className="text-gray-600">Cancel</span>
                                        {/*<XIcon className="h-6 w-6 text-white" aria-hidden="true" />*/}
                                    </button>
                                </div>
                                <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-3 sm:mt-0 sm:ml-5 sm:w-auto">
                                    <button
                                        type="button"
                                        onClick={() => {setDeleteAlertOpen(true)}}
                                        className="flex items-center w-full transition-all justify-center px-4 py-2 border border-transparent rounded-sm shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-discord-green-hover"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex flex-col items-center text-black"}>
                    <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>
                        <SecondNavbar pages={
                            [
                                { name: deck.name, href: `/dashboard/decks/${deck.id}` },
                            ]
                        } />

                        <div className={"flex mt-10 flex-row items-center"}>
                            <Image alt={"Deck Image"} priority={true} width={300} height={300} src={`https://ui-avatars.com/api/?name=${deck.name}&size=128`} className={"w-32 h-32 rounded-md"} />
                            {/* Solid secondary-black section with artist name and genres */}
                            <div className={"w-full p-4"}>
                                {editMode ? (
                                    <input
                                        type={"text"}
                                        value={deckData.name}
                                        onChange={(e) => setDeckData({...deckData, name: e.target.value})}
                                        className={"text-2xl font-bold w-full bg-transparent outline-none"}
                                    />
                                ) : (
                                    <h1 className={"text-2xl overflow-wrap font-bold min-w-0"}>{deck.name}</h1>
                                )}
                                <div className={"flex flex-col"}>
                                    <p className={"truncate text-gray-500"}>Created {dayjs(deck.dateCreated).fromNow()}</p>
                                    <Link className={"truncate w-6 text-black cursor-pointer"} href={`/api/decks/${deck.id}/export`} target={"_blank"}><DownloadIcon /></Link>
                                </div>
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

                        <div className={"pt-5"}>
                            <div className={"lg:flex lg:flex-row max-w-7xl -mx-5"}>
                                <StatBox title={"Credits Used"} value={deck.tokensUsed.toLocaleString()} icon={CoinsIcon} />
                                <StatBox title={"Cards"} value={deck.cards.length.toLocaleString()} icon={CoinsIcon} />
                                <StatBox title={"Public"} value={deck.public ? "Yes" : "No"} icon={CoinsIcon} />
                            </div>
                        </div>

                        <div className={"bg-white shadow rounded-md mt-5 w-full pb-0 p-4"}>
                            <div className={"pb-4"}>
                                <div className={"flex flex-row items-center justify-between"}>
                                    <h1 className={"text-2xl font-bold"}>Actions</h1>
                                </div>
                                <p className={"text-gray-500 pb-2 font-medium"}>Perform actions to this deck</p>

                                <ActionsList onEditMode={() => setEditMode(!editMode)} deck={deck} />
                            </div>
                        </div>

                        <div className={"bg-white shadow rounded-md mt-5 w-full pb-0 p-4"}>
                            <div className={"pb-4"}>
                                <div className={"flex flex-row items-center justify-between"}>
                                    <h1 className={"text-2xl font-bold"}>Tasks</h1>
                                </div>
                                <p className={"text-gray-500 pb-2 font-medium"}>Monitor the currently running tasks on this deck</p>

                                <Tasks deck={deck} tasks={tasks} />
                            </div>
                        </div>

                        <div className={"bg-white shadow rounded-md mt-5 w-full pb-0 p-4"}>
                            <div className={""}>
                                <div className={"flex flex-row items-center justify-between"}>
                                    <h1 className={"text-2xl font-bold"}>Cards</h1>
                                    <div className={"flex flex-row items-center space-x-2 lg:space-x-5"}>
                                        <div className={"cursor-pointer hidden lg:block"}>
                                            <p className={"inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 font-medium text-gray-500"} onClick={() => setSelectData(
                                                {
                                                    selected: [],
                                                    active: !selectData.active,
                                                }
                                            )}>Select Cards</p>
                                        </div>

                                        <div className={"cursor-pointer"}>
                                            {listView ? (
                                                <svg onClick={() => setListView(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                                </svg>
                                            ) : (
                                                <AlignJustifyIcon onClick={() => setListView(true)} className={"h-6 w-6"} />
                                            )}
                                        </div>

                                        {/*<Link*/}
                                        {/*    type="button"*/}
                                        {/*    href={`/dashboard/decks/${deck.id}/cards/new`}*/}
                                        {/*    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"*/}
                                        {/*>*/}
                                        {/*    New Cards +*/}
                                        {/*</Link>*/}
                                    </div>
                                </div>
                                <p className={"text-gray-500 pb-2 font-medium"}>Cards from deck &apos;{deck.name}&apos;</p>
                                    {/*<div className={"grid grid-cols-1 gap-4 pb-5"}>*/}
                                    {/*    <div className={"col-span-1"}>*/}
                                    {/*        <Link href={`/dashboard/decks/${deck.id}/cards/new`}>*/}
                                    {/*            <div className={"border border-gray-200 bg-gray-50 rounded-md w-full mt-2"}>*/}
                                    {/*                <div className={"flex flex-row items-center justify-center w-full py-3 p-5 px-4"}>*/}
                                    {/*                    <div className={"flex flex-row items-center justify-center w-full"}>*/}
                                    {/*                        <p className="text-sm font-medium lg:text-xl text-lg overflow-wrap line-clamp-2 min-w-0">New Cards</p>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*                <div className={"flex items-center py-0 pb-3 p-5 px-4 sm:px-6"}>*/}
                                    {/*                    <div className={"flex flex-row items-center justify-center w-full"}>*/}
                                    {/*                        <PlusIcon className={"h-8 w-8"} />*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </Link>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {listView ? (
                                        <>
                                            <div className={"grid grid-cols-1 lg:grid-cols-1 gap-2 pb-5"}>
                                                {deck.cards.map((card: Card) => (
                                                    <div key={card.id} onClick={() => addCard(card.id)} className={cn("flex flex-col items-start justify-center", selectData.active ? 'cursor-pointer' : '')}>
                                                        <div className={cn("flex flex-col shadow rounded-md w-full p-2 items-start justify-center", selectData.active && selectData.selected.includes(card.id) ? 'outline' : '')}>
                                                            <div className={"flex flex-row space-x-2 w-full"}>
                                                                <div className={"flex flex-row space-x-2 w-full max-w-[75%]"}>
                                                                    <p className={"font-bold"}>{card.front}</p>
                                                                    <p>•</p>
                                                                    <p className={"font-bold"}>{card.back}</p>
                                                                </div>
                                                                <div className={"flex flex-row justify-end w-full space-x-2"}>
                                                                    <p className={"font-bold"}>{capitalizeFirstLetter(card.type.toLowerCase())}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={"grid smpp:grid-cols-1 grid-cols-2 lg:grid-cols-2 gap-4 pb-5"}>
                                                {deck.cards.map((card: Card, cardX) => (
                                                    <div key={cardX} onClick={() => addCard(card.id)} className={cn("col-span-1", selectData.active ? 'cursor-pointer' : '')}>
                                                        <div className={cn("border border-gray-200 bg-white rounded-md w-full mt-2", selectData.active && selectData.selected.includes(card.id) ? 'outline' : '')}>
                                                            <div className={"flex flex-row items-center bg-gray-50 border-b border-gray-200 w-full py-3 p-5 px-4"}>
                                                                <div className={"flex flex-row items-center"}>
                                                                    {/*<div className="bg-black rounded-md p-3">*/}
                                                                    {/*    /!*    <Image src={`https://ui-avatars.com/api/?name=${deck.name}&size=128&color=fff&background=000`} alt={"Deck icon"} width={64} height={64} className={"h-9 w-9 rounded-md"} />*!/*/}
                                                                    {/*    /!*<BookOpenIcon className="h-6 w-6 text-white" aria-hidden="true" />*!/*/}
                                                                    {/*    /!*<icon className="h-6 w-6 text-white" aria-hidden="true" />*!/*/}
                                                                    {/*    <p className="text-white text-sm font-medium -my-0.5 mx-[0.25px] py-[0.5px] lg:text-xl text-lg overflow-wrap min-w-0">{cardX+1}</p>*/}
                                                                    {/*</div>*/}
                                                                    <Link href={"/dashboard/decks/"+deck.id+"/cards/"+card.id}><p className="text-sm font-medium lg:text-xl text-lg overflow-wrap line-clamp-2 min-w-0">{card.front}</p></Link>
                                                                </div>

                                                                <div className={"flex flex-row ml-auto"}>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger className={"focus:outline-none"}>
                                                                            <MoreVertical />
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent>
                                                                            <DropdownMenuLabel>Card</DropdownMenuLabel>
                                                                            <DropdownMenuSeparator />
                                                                            <Link href={"/dashboard/decks/"+deck.id}><DropdownMenuItem className={"cursor-pointer"}><CursorClickIcon className={"h-4 mr-2 w-4"} /> Open</DropdownMenuItem></Link>
                                                                            {/*<DropdownMenuItem onClick={() => {setDeleteAlertOpen(true); setSelectedDeck(deck.id)}} className={"cursor-pointer"}>*/}
                                                                            {/*    <TrashIcon className={"h-4 text-red-500 mr-2 w-4"} /> Delete*/}
                                                                            {/*</DropdownMenuItem>*/}
                                                                            {/*<DropdownMenuItem>Team</DropdownMenuItem>*/}
                                                                            {/*<DropdownMenuItem>Subscription</DropdownMenuItem>*/}
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                    {/*<Link href={"/"} className={"ml-2 hover:bg-gray-200 bg-gray-100 text-gray-900 px-4 py-2 rounded-md text-sm font-medium"}>View</Link>*/}
                                                                </div>
                                                            </div>
                                                            <div className={"flex flex-col py-3 p-5 px-4 sm:px-6"}>
                                                                <div className={"flex flex-row justify-between"}>
                                                                    <p className={"text-gray-500 pb-2 font-medium"}>Type</p>
                                                                    <p className={"pb-2 font-medium"}>{capitalizeFirstLetter(card.type.toLowerCase())}</p>
                                                                </div>

                                                                {/*<div className={"flex flex-row justify-between"}>*/}
                                                                {/*    <p className={"text-gray-500 pb-2 font-medium"}>Credits</p>*/}
                                                                {/*    <p className={"pb-2 font-medium"}>2,482</p>*/}
                                                                {/*</div>*/}

                                                                <div className={"flex flex-row justify-between"}>
                                                                    <p className={"text-gray-500 pb-2 font-medium"}>Tags</p>
                                                                    <p className={"pb-2 font-medium"}>{card.tags ? card.tags.trim().replaceAll(" ", ", ") : (
                                                                        <span className={"text-gray-500"}>No tags</span>
                                                                    )}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                            </div>
                        </div>

                    </div>
                </div>

                <UnsavedChangesBar visible={unsavedChanges} save={() => (true)} reset={() => (true)}/>
            </main>

            <Footer />
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
        },
        include: {
            cards: true,
            tasks: true,
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