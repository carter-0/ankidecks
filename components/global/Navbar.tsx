import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import {Fragment} from "react";
import {ClerkLoading, SignedIn, SignedOut, SignInButton, UserButton, useClerk} from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
    const clerk = useClerk()

    return (
        <nav className={"bg-white shadow relative w-full"}>
            <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 flex w-full items-center justify-between bg-inherit py-4"}>
                <SignedIn>
                    <Link href={"/dashboard"}>
                        <div className={"flex items-center"}>
                            <Image className={"w-6 h-6"} src={"/assets/logo.png"} alt={"Anki Decks Logo"} width={40} height={40} priority={true} />
                            <h1 className={"font-bold pt-0.5 text-xl text-main-white ml-3"}>Anki Decks</h1>
                        </div>
                    </Link>

                    <div className={"flex justify-center items-center"}>
                        <svg className={"w-5 h-5 fill-main-white mr-2 cursor-pointer"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg>

                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open user menu</span>
                                    <UserButton />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                            </Transition>
                        </Menu>
                    </div>
                </SignedIn>
                <SignedOut>
                    <Link href={"/"}>
                        <div className={"flex items-center"}>
                            <Image className={"w-6 h-6"} src={"/assets/logo.png"} alt={"Anki Decks Logo"} width={40} height={40} priority={true} />
                            <h1 className={"font-bold pt-0.5 text-xl text-main-white ml-3"}>Anki Decks</h1>
                        </div>
                    </Link>
                    <button onClick={() => clerk.openSignIn({})}>
                        Sign Up
                    </button>
                </SignedOut>
                <ClerkLoading>
                    <Link href={"/"}>
                        <div className={"flex items-center"}>
                            <Image className={"w-6 h-6"} src={"/assets/logo.png"} alt={"Anki Decks Logo"} width={40} height={40} priority={true} />
                            <h1 className={"font-bold pt-0.5 text-xl text-main-white ml-3"}>Anki Decks</h1>
                        </div>
                    </Link>
                    <SignInButton />
                </ClerkLoading>
            </div>
        </nav>
    )
}