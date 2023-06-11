/* This example requires Tailwind CSS v2.0+ */
import Link from "next/link";

const navigation = {
    links: [
        { name: 'Home', href: '/' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Blog', href: '/blog' },
    ],
    legal: [
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Refunds', href: '/refunds' },
    ],
    for: [
        { name: 'Teachers', href: '/for/teachers' },
        { name: 'Learning CS', href: '/for/computer-science' },
        { name: 'GCSEs', href: '/for/gcses' },
        { name: 'A-Levels', href: '/for/a-levels' },
        { name: 'Medical School', href: '/for/medical-school' },
        { name: 'MCAT', href: '/for/mcat' },
        { name: 'Interviews', href: '/for/interviews' },
    ],
    decks: [
        { name: 'Biology', href: '/decks/biology' },
        { name: 'Computer Science', href: '/decks/computer-science' },
        { name: 'Chemistry', href: '/decks/chemistry' },
        { name: 'Physics', href: '/decks/physics' },
        { name: 'Geography', href: '/decks/geography' },
        { name: 'History', href: '/decks/history' },
        { name: 'Maths', href: '/decks/maths' },
        { name: 'Law', href: '/decks/law' },
        { name: 'Music', href: '/decks/music' },
        { name: 'Pathology', href: '/decks/pathology' },
    ],
    social: [
        {
            name: 'GitHub',
            href: 'https://github.com/carter-0',
            icon: (props: any) => (
                <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        }
    ],
}

export default function Footer() {
    return (
        <footer className="bg-white mt-24 outline outline-1 outline-black/20" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <img
                            className="h-10"
                            src="/assets/logo.png"
                            alt="Company name"
                        />
                        <p className="text-gray-500 text-base">
                            Anki Deck creator for students, teachers, and anyone else who wants to learn. We are not affiliated with Ankitects Pty Ltd or the Anki project.
                        </p>
                        <div className="flex space-x-6">
                            {navigation.social.map((item) => (
                                <Link target={"_blank"} key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Links</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {navigation.links.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">For</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {navigation.for.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Decks</h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    {navigation.decks.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">&copy; 2023 Carter A. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}