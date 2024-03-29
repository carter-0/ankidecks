import {CheckIcon, StarIcon} from "@heroicons/react/solid";
import {ClerkLoading, SignedIn, SignedOut, useClerk} from "@clerk/nextjs";
import Link from "next/link";
import {ArrowUpIcon} from "@heroicons/react/outline";
import {CornerLeftUp} from "lucide-react";
import Image from "next/image";

const includedFeatures = [
    '50,000 Monthly Card Limit',
    'Public & Private Decks',
    'Dedicated support from the Founder',
    'Lifetime access to our service',
]

export default function Pricing() {
    const clerk = useClerk();

    return (
        <>
            <div id={"pricing"} className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <p className="text-base leading-8 text-teal-600 font-semibold tracking-wide uppercase mb-2">Pricing</p>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Anki Decks 20x quicker than before, without compromising quality.</h2>
                        <p className="mt-6 text-base leading-8 text-black/80">
                            Our lifetime deal is perfect for students ready to accelerate their learning. We will be moving to a subscription model soon. Purchase a lifetime membership now to lock in your price forever.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
                            <p className="mt-6 text-base leading-7 text-gray-600">
                                Purchase our limited-time lifetime deal. Get near unrestricted access to our deck creator for a single payment. Payments are usually processed within 30 seconds.
                            </p>
                            <div className="mt-10 flex items-center gap-x-4">
                                <h4 className="flex-none text-sm font-semibold leading-6 text-teal-600">What’s included</h4>
                                <div className="h-px flex-auto bg-gray-150" />
                            </div>
                            <ul
                                role="list"
                                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                            >
                                {includedFeatures.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon className="h-6 w-5 flex-none text-teal-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-gray-900">$19.97</span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                                    </p>
                                    <SignedOut>
                                        <button
                                            onClick={() => clerk.openSignUp({
                                                afterSignInUrl: '/pricing',
                                                afterSignUpUrl: '/pricing',
                                            })}
                                            className="mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                        >
                                            Lock in price
                                        </button>
                                    </SignedOut>
                                    <ClerkLoading>
                                        <button
                                            onClick={() => clerk.openSignUp({
                                                afterSignInUrl: '/pricing',
                                                afterSignUpUrl: '/pricing',
                                            })}
                                            className="mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                        >
                                            Lock in price
                                        </button>
                                    </ClerkLoading>
                                    <SignedIn>
                                        <Link
                                            href={"/api/stripe/checkout"}
                                            className="mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                        >
                                            Lock in price
                                        </Link>
                                    </SignedIn>
                                    <p className="mt-6 text-xs leading-5 text-gray-600">
                                        Payment securely processed using Stripe.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col justify-center items-center"}>
                    <div className={"flex justify-center items-center flex-row"}>
                        <CornerLeftUp className={"sm:block hidden h-6 w-6 text-gray-500 mt-4"}/>
                        <div className="flex mt-3 sm:ml-3 p-1 -space-x-2 overflow-hidden">
                            <Image
                                width={64}
                                height={64}
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="/assets/person_1.avif"
                                alt=""
                            />
                            <Image
                                width={64}
                                height={64}
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="/assets/person_2.avif"
                                alt=""
                            />
                            <Image
                                width={64}
                                height={64}
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="/assets/person_3.avif"
                                alt=""
                            />
                            <Image
                                width={64}
                                height={64}
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="/assets/person_4.avif"
                                alt=""
                            />
                            <Image
                                width={64}
                                height={64}
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                                src="/assets/person_5.avif"
                                alt=""
                            />
                        </div>

                        <div className="flex mt-3 sm:ml-3">
                            <StarIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                            <StarIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                            <StarIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                            <StarIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                            <StarIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                        </div>
                    </div>
                    <h3 className="mt-3 text-black/60 leading-6 max-w-md text-center">Join our community of 100+ happy customers. On average, our decks take just <span className={"font-bold"}>2 minutes</span> to create.</h3>
                </div>
            </div>
        </>
    )
}