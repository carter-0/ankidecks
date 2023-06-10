/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import {cn} from "@/lib/utils";
import Link from "next/link";

const faqs = [
    {
        question: "How does it work?",
        answer: "After you have uploaded your notes and selected the relevant parts, we use a combination of OpenAI's GPT models and proprietary algorithms to generate cards.",
    },
    {
        question: "Is there a free trial?",
        answer: "Yes, All new accounts get a 25 card free trial, no credit card required.",
    },
    {
        question: "Can I get a refund?",
        answer: "Yes, we approve refunds for any reason within 7 days of purchase, no questions asked.",
    },
    {
        question: "Are payments secure?",
        answer: "We partner with Stripe to handle all payments, the same company used by Twitter, Shopify, and Lyft. We never see your credit card information.",
    },
    // More questions...
]

export default function FAQ() {
    return (
        <div id={"faq"} className="bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" mx-auto divide-y-2 divide-gray-200">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently asked questions</h2>
                        <p className="mt-4 text-center text-base text-gray-600">Can’t find the answer you’re looking for? Talk directly with our <Link href="mailto:carter@carter.red" className="font-medium text-teal-600 hover:text-teal-500">founder</Link>.</p>
                    </div>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                                                <span className="font-medium text-gray-900">{faq.question}</span>
                                                <span className="ml-6 h-7 flex items-center">
                                                  <ChevronDownIcon
                                                      className={cn(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                                      aria-hidden="true"
                                                  />
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base text-gray-500">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}