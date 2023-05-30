/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'
import Link from "next/link";

type Page = {
    name: string
    href: string
}

type SecondNavbarProps = {
    pages: Page[]
}

export default function SecondNavbar(props: SecondNavbarProps) {
    const { pages } = props

    return (
        <div className={"p-4 bg-white shadow rounded-md"}>
            <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                    <li>
                        <div>
                            <Link href="/dashboard" className="text-gray-400 hover:text-gray-500">
                                <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">Home</span>
                            </Link>
                        </div>
                    </li>
                    {pages.map((page) => (
                        <li key={page.name}>
                            <div className="flex items-center">
                                <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <Link
                                    href={page.href}
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 line-clamp-2"
                                >
                                    {page.name}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}