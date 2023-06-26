import Navbar from "@/components/global/Navbar";
import Link from "next/link";

export default function AfterUpgrade() {
    return (
        <>
            <Navbar />

            <main>

                <div className={"mx-auto sg:max-w-md sg:max-w-3xl mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl lg:px-8"}>
                    <div className={"flex flex-col w-full justify-center items-center"}>
                        <div className={"mx-auto mt-4 w-full max-w-lg space-y-4"}>
                            <div className={"bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>
                                <h1 className={"text-2xl mt-3 font-bold"}>Your Purchase was Successful!</h1>
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