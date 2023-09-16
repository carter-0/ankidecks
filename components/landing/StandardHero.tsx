import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import {ArrowRightIcon, CheckIcon, ChevronRightIcon, StarIcon} from '@heroicons/react/solid'
import {ClerkLoading, SignedIn, SignedOut, useClerk} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {TextCursorIcon} from "lucide-react";
import Head from "next/head";

interface NewMap {
    [key: string]: string | undefined
}

const titleMap = {
    "teachers": "Teaching",
    "gcses": "GCSE",
    "a-levels": "A-Level",
    "computer-science": "Computer Science",
    "medical-school": "Medical School",
    "mcat": "MCAT",
    "interviews": "Interview",
    "ai": "AI",
} as NewMap

const customMap = {
    "rephrasing-decks": <>
        <span className="block"><span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>Rephrase</span> your Anki</span>
        <span className="block ">Decks with <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>AI</span></span>
    </>,
    "adding-tags": <>
        <span className="block"><span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>Generate tags</span> for your</span>
        <span className="block ">Anki Decks with <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>AI</span></span>
    </>,
}

const subtextMap = {
    "rephrasing-decks": "By rephrasing the prompts in your Anki decks, you can prevent yourself from memorising the answer to the prompt instead of the actual concept.",
    "adding-tags": "Say goodbye to spending hours adding tags to your Anki decks. With Anki Decks AI, you can generate tags for your decks in seconds.",
}

const titleTagMap = {
    "rephrasing-decks": "Rephrase your Anki Decks with AI",
    "adding-tags": "Generate tags for your Anki Decks with AI",
}

type StandardHeroProps = {
    title?: string
}

export default function StandardHero(props: StandardHeroProps) {
    const {title} = props
    let finalTitle = <></>
    let subtext: any = <><span className="block">Say goodbye to spending hours creating flashcards. With <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>Anki Decks AI</span>, you can create decks from your notes in seconds.</span></>

    if (title && title in customMap) {
        finalTitle = customMap[title as keyof typeof customMap]
    } else if (title && title in titleMap) {
        finalTitle = <>
            <span className="block">Create <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>{titleMap[title] as any}</span> Anki Decks</span>
            <span className="block ">from your notes</span>
        </>
    } else {
        finalTitle = <>
            <span className="block">Create <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>Anki Decks</span></span>
            <span className="block ">from your notes</span>
        </>
    }

    let metaDescription = "Say goodbye to spending hours creating flashcards. With Anki Decks AI, you can create decks from your notes in seconds."

    if (title && title in subtextMap) {
        subtext = subtextMap[title as keyof typeof subtextMap]
        metaDescription = subtext.toString().replaceAll(/(<([^>]+)>)/gi, "")
    }

    let titleTag = title && title in titleTagMap ? titleTagMap[title as keyof typeof titleTagMap] : `Anki Decks AI - Create Anki Decks from your notes`

    if (title && title in titleMap && !(title in titleTagMap)) {
        titleTag = `Anki Decks AI - Create ${titleMap[title]} Anki Decks from your notes`
    }

    const clerk = useClerk()

    return (
        <div className="relative overflow-hidden">
            <Head>
                <title>{titleTag}</title>
                <meta key={"description"} name="description" content={`${metaDescription}`} />
            </Head>
            <div className="pt-10 bg-gray-50 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                <div className="mx-auto max-w-7xl sm:px-6">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        <div className="smpp:mx-auto smpp:max-w-md smpp:px-4 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                            <div className="lg:py-24">
                                <h1 className="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-5xl lg:mt-6 xl:text-5xl">
                                    {finalTitle}
                                </h1>

                                <p className="mt-3 text-base text-black/80 max-w-md sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                    {subtext}
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
                                            Loved by 1,298 happy users
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
                                                    <button type={"button"} className="bg-teal-500 cursor-pointer p-4 w-full rounded-md hover:scale-[1.02] transition-transform duration-200" onClick={() => clerk.openSignUp({
                                                        afterSignInUrl: "/dashboard",
                                                        afterSignUpUrl: "/dashboard/after-sign-up",
                                                    })}>
                                                        <div className="flex flex-row items-center justify-center">
                                                            <p className="text-white pr-2 text-xl font-bold">Create a Deck</p>
                                                            <ArrowRightIcon className="text-white w-6 h-6" aria-hidden="true" />
                                                        </div>
                                                    </button>
                                                </ClerkLoading>
                                                <SignedOut>
                                                    <button type={"button"} className="bg-teal-500 cursor-pointer p-4 w-full rounded-md hover:scale-[1.02] transition-transform duration-200" onClick={() => clerk.openSignUp({
                                                        afterSignInUrl: "/dashboard",
                                                        afterSignUpUrl: "/dashboard/after-sign-up",
                                                    })}>
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
                                            Get started with a free 8,192 credit balance. By signing up, you agree to
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
                        <div className="mt-12 lg:py-24 -mb-16 sm:-mb-48 lg:relative">
                            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                                {/*<div className={"flex flex-row"}>*/}
                                {/*    <p className={"text-base text-black/80"}>"A GCSE Geography Deck"</p>*/}
                                {/*    <p className={"text-base animate-pulse text-gray-500"}>|</p>*/}
                                {/*    <img className={"h-8 w-auto ml-2 mt-2.5"} src={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTUiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCA1NSAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC4yIiBkPSJNMC4yNzY3NjYgMi42MjA3MkMyLjAxNzA0IDAuNjU4Mjg5IDQuMzEwMjggMC4yOTUwODYgNi40NDYzNSAwLjIwMTA3NkM5LjQxNTkgMC4xMDUzNTIgMTIuMzk5NCAwLjI5MTI2NyAxNS4yMjU4IDAuNzQ2MzY0QzI4LjE1MTYgMy4xNTIzNiAzNy42NjMzIDkuNjc1MTIgNDQuMDgzMiAxOS41NTg2QzQ1LjcwNDggMjIuMDc3NSA0Ni45MjM2IDI0Ljg3ODggNDguNDU0NCAyNy44NTg3QzUwLjkyNTcgMjUuMzU3MSA1MS40OTQ5IDIxLjkzNzUgNTMuODk5OSAxOS4yNDRDNTQuNzE0NyAyMC4zOTQ1IDU0LjI1NzIgMjEuNDgzNyA1My45MDQ1IDIyLjM5MzVDNTIuNDQxMyAyNi4xMjIxIDUwLjkwMzYgMjkuODc2NiA0OS4yNjkzIDMzLjU5MjhDNDguNDY3MyAzNS4zNzQgNDcuNTQzIDM1LjgzNjggNDUuODAzOCAzNS4xNDkxQzQyLjE1NDUgMzMuNzYxIDM5LjQ0NTcgMzEuNDc0OSAzNy43NzQgMjguMzI4OEMzNy43Mjk4IDI4LjIwMDggMzcuODg2OSAyNy45MzE3IDM4LjA3NDMgMjcuNTA4OEM0MS41MjEyIDI3LjEwNDggNDEuOTkyNiAzMC44ODA3IDQ1LjE5MTUgMzEuMjA3QzQ0Ljg1NzQgMjYuMzgxIDQyLjUwMzYgMjIuNDY4MSAzOS43NDcxIDE4LjgzNzdDMzYuODQ5NyAxNS4wNDEyIDMzLjU3MTYgMTEuNTkxMiAyOS4zMzA5IDguOTc1MjhDMjUuMTg2OCA2LjM5NzYgMjAuNTQwOSA0Ljc4MTE3IDE1LjU4OSAzLjQ4NTQ1QzEwLjY4OTQgMi4xIDUuNjIyMTggMS45MTgzNyAwLjI3Njc2NiAyLjYyMDcyWiIgZmlsbD0iIzBEMTkyNyIvPgo8L3N2Zz4K"} />*/}
                                {/*</div>*/}
                                <Image
                                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                    src="/assets/hero.png"
                                    width={2000}
                                    height={2000}
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