import Navbar from "@/components/global/Navbar";
import StatBox from "@/components/dashboard/StatBox";
import {CurrencyDollarIcon} from "@heroicons/react/solid";

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <main>
                <div className={"dark:text-white light:text-black mx-auto sg:max-w-md sg:max-w-3xl mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl lg:px-8"}>
                    <div className={"flex flex-col"}>
                        <div className={"sm:-mx-5 lg:flex lg:flex-row lg:max-w-7xl"}>
                            <StatBox title={"Tokens"} value={"0"} icon={CurrencyDollarIcon} />
                            <StatBox title={"Tokens"} value={"0"} icon={CurrencyDollarIcon} />
                            <StatBox title={"Tokens"} value={"0"} icon={CurrencyDollarIcon} />
                        </div>

                        <div className={"mx-5 sm:mx-0"}>
                            <div className={"dark:bg-primary-black bg-white shadow rounded-md w-full mt-5 pb-0 p-5 px-4 sm:px-6"}>
                                <div className={"dark:bg-secondary-black -mt-2 rounded-md"}>
                                    <h1 className={"text-2xl font-bold"}>Decks</h1>
                                    <div className={"flex flex-row"}>
                                        <p className={"dark:text-gray-400 text-gray-500 pb-2 font-medium"}>Your current decks</p>
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