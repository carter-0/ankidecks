import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import {ArrowRightIcon, CheckIcon, ChevronRightIcon, StarIcon} from '@heroicons/react/solid'
import {ClerkLoading, SignedIn, SignedOut, useClerk} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default function StandardHero() {
    const clerk = useClerk()

    return (
        <div className="relative overflow-hidden">
            {/*<Popover as="header" className="relative">*/}
            {/*    <div className="bg-gray-900 pt-6">*/}
            {/*    </div>*/}

            {/*    <Transition*/}
            {/*        as={Fragment}*/}
            {/*        enter="duration-150 ease-out"*/}
            {/*        enterFrom="opacity-0 scale-95"*/}
            {/*        enterTo="opacity-100 scale-100"*/}
            {/*        leave="duration-100 ease-in"*/}
            {/*        leaveFrom="opacity-100 scale-100"*/}
            {/*        leaveTo="opacity-0 scale-95"*/}
            {/*    >*/}
            {/*        <Popover.Panel focus className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top md:hidden">*/}
            {/*            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">*/}
            {/*                <div className="px-5 pt-4 flex items-center justify-between">*/}
            {/*                    <div>*/}
            {/*                        <img*/}
            {/*                            className="h-8 w-auto"*/}
            {/*                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"*/}
            {/*                            alt=""*/}
            {/*                        />*/}
            {/*                    </div>*/}
            {/*                    <div className="-mr-2">*/}
            {/*                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">*/}
            {/*                            <span className="sr-only">Close menu</span>*/}
            {/*                            <XIcon className="h-6 w-6" aria-hidden="true" />*/}
            {/*                        </Popover.Button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="pt-5 pb-6">*/}
            {/*                    <div className="px-2 space-y-1">*/}
            {/*                        {navigation.map((item) => (*/}
            {/*                            <a*/}
            {/*                                key={item.name}*/}
            {/*                                href={item.href}*/}
            {/*                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"*/}
            {/*                            >*/}
            {/*                                {item.name}*/}
            {/*                            </a>*/}
            {/*                        ))}*/}
            {/*                    </div>*/}
            {/*                    <div className="mt-6 px-5">*/}
            {/*                        <a*/}
            {/*                            href="#"*/}
            {/*                            className="block text-center w-full py-3 px-4 rounded-md shadow bg-indigo-600 text-white font-medium hover:bg-indigo-700"*/}
            {/*                        >*/}
            {/*                            Start free trial*/}
            {/*                        </a>*/}
            {/*                    </div>*/}
            {/*                    <div className="mt-6 px-5">*/}
            {/*                        <p className="text-center text-base font-medium text-gray-500">*/}
            {/*                            Existing customer?{' '}*/}
            {/*                            <a href="#" className="text-gray-900 hover:underline">*/}
            {/*                                Login*/}
            {/*                            </a>*/}
            {/*                        </p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </Popover.Panel>*/}
            {/*    </Transition>*/}
            {/*</Popover>*/}

            <div className="pt-10 bg-gray-50 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                <div className="mx-auto max-w-7xl sm:px-6">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        <div className="smpp:mx-auto smpp:max-w-md smpp:px-4 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                            <div className="lg:py-24">
                                {/*<Link*/}
                                {/*    href="https://www.producthunt.com/posts/ticket-ai-for-discord"*/}
                                {/*    target={"_blank"}*/}
                                {/*    className="inline-flex items-center text-white bg-black rounded-full p-1 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"*/}
                                {/*>*/}
                                {/*    <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full">*/}
                                {/*      We&apos;ve launched!*/}
                                {/*    </span>*/}
                                {/*    <span className="ml-4 text-sm truncate">Support us!</span>*/}
                                {/*    <ChevronRightIcon className="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />*/}
                                {/*</Link>*/}
                                <h1 className="mt-4 text-4xl tracking-tight font-extrabold sm:mt-5 sm:text-5xl lg:mt-6 xl:text-5xl">
                                    <span className="block">From <span className={"text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"}>notes to cards</span></span>
                                    <span className="block ">in seconds</span>
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