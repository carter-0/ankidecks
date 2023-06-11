import Link from "next/link";

export default function TooManyTokens() {
    return (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="p-2 rounded-lg bg-teal-600 shadow-lg sm:p-3">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <p className="ml-3 font-medium text-white line-clamp-3">
                                <span className="md:hidden">You have exceeded 4000 tokens! Please split your data and submit multiple times.</span>
                                <span className="hidden md:inline">You have exceeded 4000 tokens! Please split your data and submit multiple times.</span>
                            </p>
                        </div>
                        <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            {/*<Link*/}
                            {/*    href="/pricing"*/}
                            {/*    className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-teal-600 bg-white hover:bg-teal-50"*/}
                            {/*>*/}
                            {/*    Get Unlimited Access*/}
                            {/*</Link>*/}
                        </div>
                        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                            <button
                                type="button"
                                className="-mr-1 flex p-2 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                {/*<span className="sr-only">Dismiss</span>*/}
                                {/*<XIcon className="h-6 w-6 text-white" aria-hidden="true" />*/}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}