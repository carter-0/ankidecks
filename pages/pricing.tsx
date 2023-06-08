/* This example requires Tailwind CSS v2.0+ */
import {CheckCircleIcon, CheckIcon} from '@heroicons/react/solid'
import Link from "next/link";
import Navbar from "@/components/global/Navbar";

const includedFeatures = [
    '50,000 Monthly Card Limit',
    'Public & Private Decks',
    'Dedicated support from the Founder',
    'Lifetime access to our service',
]

export default function Example() {
    return (
        <>
            <Navbar />
            <div className="bg-gray-50">
            <div className="bg-white dark:bg-secondary-black py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl sm:text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">Simple pricing</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            We will be moving to a subscription model soon. Purchase a lifetime membership now to lock in your price forever.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-800 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Lifetime membership</h3>
                            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
                                Purchase our limited-time lifetime deal. Get near unrestricted access to our deck creator for a single payment. Payments are usually processed within 30 seconds.
                            </p>
                            <div className="mt-10 flex items-center gap-x-4">
                                <h4 className="flex-none text-sm font-semibold leading-6 text-teal-600">What’s included</h4>
                                <div className="h-px flex-auto bg-gray-100 dark:bg-gray-900" />
                            </div>
                            <ul
                                role="list"
                                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 dark:text-gray-400 sm:grid-cols-2 sm:gap-6"
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
                            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 py-10 text-center ring-1 ring-inset ring-gray-900/5 dark:ring-gray-100/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-gray-600 dark:text-gray-400">Pay once, own it forever</p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100">$19.97</span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">USD</span>
                                    </p>
                                    <button
                                        className="mt-10 block w-full rounded-md bg-teal-600 px-3 py-2 text-center text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                    >
                                        Lock in price
                                    </button>
                                    <p className="mt-6 text-xs leading-5 text-gray-600 dark:text-gray-400">
                                        Payment securely processed using Stripe.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}