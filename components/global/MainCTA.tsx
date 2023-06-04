import Link from "next/link";
import Image from "next/image";
import {StarIcon} from "@heroicons/react/solid";

export default function MainCTA() {
    return (
        <li
            className={`cols-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 bg-teal-500 text-white flex flex-col rounded-lg shadow divide-y divide-gray-200`}
        >
            <div className="max-w-7xl mx-auto">
                <div className="bg-teal-500 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                    <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                        <div className="lg:self-center">
                            <h2 className={"text-3xl font-bold text-white sm:text-4xl"}>Create your own deck in seconds with AI</h2>

                            <p className="mt-4 text-lg leading-6 text-white/80">
                                Convert your notes into an expertly-crafted optimised deck in seconds with our AI. Just paste your notes and we&apos;ll do the rest.
                            </p>

                            <div className={"flex mt-8 items-center w-full sm:w-auto flex-col sm:flex-row"}>
                                <Link
                                    href="/new-deck"
                                    className="hover:scale-[1.05] w-full sm:w-auto transition-transform duration-200 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-white hover:bg-indigo-50"
                                >
                                    Make my deck
                                </Link>

                                <div className="flex mt-3 sm:mt-0 sm:ml-3 p-1 -space-x-2 overflow-hidden">
                                    <Image
                                        width={32}
                                        height={32}
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                        src="/assets/person_1.avif"
                                        alt=""
                                    />
                                    <Image
                                        width={32}
                                        height={32}
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                        src="/assets/person_2.avif"
                                        alt=""
                                    />
                                    <Image
                                        width={32}
                                        height={32}
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                        src="/assets/person_3.avif"
                                        alt=""
                                    />
                                    <Image
                                        width={32}
                                        height={32}
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                        src="/assets/person_4.avif"
                                        alt=""
                                    />
                                    <Image
                                        width={32}
                                        height={32}
                                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                        src="/assets/person_5.avif"
                                        alt=""
                                    />
                                </div>

                                <div className="flex sm:ml-3">
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                    <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                        <Image
                            className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                            src="/assets/example_1.png"
                            alt="App screenshot"
                            width={1024}
                            height={768}
                        />
                    </div>
                </div>
            </div>
        </li>
    )
}