import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import {ArrowRightIcon, CheckIcon, ChevronRightIcon, StarIcon} from '@heroicons/react/solid'
import {ClerkLoading, SignedIn, SignedOut, useClerk} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

interface NewMap {
    [key: string]: string | undefined
}

const titleMap = {
    "gcses": "GCSE",
    "a-levels": "A-Level",
    "computer-science": "Computer Science",
    "medical-school": "Medical School",
    "mcat": "MCAT",
    "interviews": "Interview",
    "ai": "AI",
} as NewMap

type StandardHeroProps = {
    title?: string
}

export default function StandardHero(props: StandardHeroProps) {
    const {title} = props

    const clerk = useClerk()

    return (
        <div className="relative overflow-hidden">
            <div className="pt-10 bg-gray-50 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                <div className="mx-auto max-w-7xl sm:px-6">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        <div className="smpp:mx-auto smpp:max-w-md smpp:px-4 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                            <div className="lg:py-24">
                                <h1 className="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-5xl lg:mt-6 xl:text-5xl">
                                    { title ? (
                                        <>
                                            <span className="block">Create <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>{titleMap[title] as any}</span> Anki Decks</span>
                                            <span className="block ">from your notes</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="block">From <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>notes to cards</span></span>
                                            <span className="block ">in seconds</span>
                                        </>
                                    )}
                                </h1>

                                <p className="mt-3 text-base text-black/80 max-w-md sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                    Say goodbye to spending hours creating flashcards. With <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>Anki Decks AI</span>, you can create decks from your notes in seconds.
                                </p>

                                <div className={"flex flex-col gap-y-2 text-sm mt-5"}>
                                    <div className={"flex items-center flex-row"}>
                                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                        <p className="ml-2 text-black/80">
                                            Knowledge of thousands of topics
                                        </p>
                                    </div>

                                    <div className={"flex items-center flex-row"}>
                                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                        <p className="mx-2 text-black/80">
                                            Loved by 1,000 happy users
                                        </p>

                                        <StarIcon className="flex-shrink-0 h-3 w-3 text-yellow-500" aria-hidden="true" />
                                        <StarIcon className="flex-shrink-0 h-3 w-3 text-yellow-500" aria-hidden="true" />
                                        <StarIcon className="flex-shrink-0 h-3 w-3 text-yellow-500" aria-hidden="true" />
                                        <StarIcon className="flex-shrink-0 h-3 w-3 text-yellow-500" aria-hidden="true" />
                                        <StarIcon className="flex-shrink-0 h-3 w-3 text-yellow-500" aria-hidden="true" />
                                    </div>

                                    <div className={"flex items-center flex-row"}>
                                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                        <p className="ml-2 text-black/80">
                                            Founded in <span className={"text-base"}>🇬🇧</span> England. We follow the <Link href={"https://en.wikipedia.org/wiki/General_Data_Protection_Regulation"} target={"_blank"} className={"underline"}>GDPR</Link> and <Link href={"https://en.wikipedia.org/wiki/California_Consumer_Privacy_Act"} target={"_blank"} className={"underline"}>CCPA</Link>.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 sm:mt-6">
                                    <div className="sm:max-w-xl sm:mx-auto lg:mx-0">
                                        <div className="sm:flex">
                                            <div className="max-w-lg w-full flex">
                                                <ClerkLoading>
                                                    <button type={"button"} className="bg-red-500 cursor-pointer p-4 w-full rounded-md hover:scale-[1.02] transition-transform duration-200" onClick={() => clerk.openSignIn({})}>
                                                        <div className="flex flex-row items-center justify-center">
                                                            <p className="text-white pr-2 text-xl font-bold">Create a Deck</p>
                                                            <ArrowRightIcon className="text-white w-6 h-6" aria-hidden="true" />
                                                        </div>
                                                    </button>
                                                </ClerkLoading>
                                                <SignedOut>
                                                    <button type={"button"} className="bg-red-500 cursor-pointer p-4 w-full rounded-md hover:scale-[1.02] transition-transform duration-200" onClick={() => clerk.openSignIn({})}>
                                                        <div className="flex flex-row items-center justify-center">
                                                            <p className="text-white pr-2 text-xl font-bold">Create a Deck</p>
                                                            <ArrowRightIcon className="text-white w-6 h-6" aria-hidden="true" />
                                                        </div>
                                                    </button>
                                                </SignedOut>
                                                <SignedIn>
                                                    <Link href={"/dashboard"} className="bg-teal-500 cursor-pointer p-4 w-full rounded-md hover:scale-[1.02] transition-transform duration-200">
                                                        <div className="flex flex-row items-center justify-center">
                                                            <p className="text-white pr-2 text-xl font-bold">Create my deck</p>
                                                            <ChevronRightIcon className="text-white w-6 h-6" aria-hidden="true" />
                                                        </div>
                                                    </Link>
                                                </SignedIn>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm max-w-md text-gray-500 sm:mt-4">
                                            Get started with a free 4,000 token balance. By signing up, you agree to
                                            our{' '}
                                            <Link href="/terms" className="font-medium text-black">
                                                terms of service
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                                <Image
                                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                    src="/images/cloud-illustration-indigo-400.svg"
                                    width={580}
                                    height={580}
                                    priority={true}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}