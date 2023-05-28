import Navbar from "@/components/global/Navbar";
import {GetServerSideProps} from "next";
import {getAuth} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime.js'
import StatBox from "@/components/dashboard/StatBox";
import {CoinsIcon} from "lucide-react";

dayjs.extend(relativeTime)

type DeckProps = {
    deck: Deck
}

export default function Deck(props: DeckProps) {
    const { deck } = props;

    return (
        <>
            <Navbar />

            <main>
                <div className={"flex flex-col items-center dark:text-white text-black"}>
                    <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>
                        <div className={"flex flex-row items-center"}>
                            <Image alt={"Artist image"} priority={true} width={300} height={300} src={`https://ui-avatars.com/api/?name=${deck.name}&size=128`} className={"w-32 h-32 rounded-md"} />
                            {/* Solid secondary-black section with artist name and genres */}
                            <div className={"dark:bg-primary-black w-full p-4"}>
                                <h1 className={"text-2xl truncate font-bold"}>{deck.name}</h1>
                                <div className={"flex flex-row"}>
                                    <p className={"truncate text-gray-500"}>Created {dayjs(deck.dateCreated).fromNow()}</p>
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
                            <div className={"flex flex-row max-w-7xl -mx-5"}>
                                <StatBox title={"Tokens"} value={"0"} icon={CoinsIcon} />
                                <StatBox title={"Tokens"} value={"0"} icon={CoinsIcon} />
                                <StatBox title={"Tokens"} value={"0"} icon={CoinsIcon} />
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

    const deck: Deck = await prisma.deck.findFirst({
        where: {
            id: ctx.query.deckId
        },
        include: {
            cards: true
        }
    })

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