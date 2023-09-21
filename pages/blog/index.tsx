import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";

const posts = [
    {
        title: 'How to create Anki decks with AI',
        href: '/blog/posts/how-to-create-anki-decks-with-ai',
        category: { name: '', href: '' },
        description:
            'If you\'re tired of spending hours creating flashcards, leaving no time to actually learn them - AI generated cards might be for you.',
        date: 'Sept 21, 2023',
        datetime: '2023-09-21',
        imageUrl:
            '/assets/blog/htcadwa.png',
        readingTime: '2 min',
        author: {
            name: 'Carter A.',
            href: 'https://github.com/carter-0',
            imageUrl:
                '/assets/carter.png',
        },
    }
]


export default function Blog() {
    return (
        <>
            <Navbar />

            <main>
                <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
                    <div className="absolute inset-0">
                        <div className="bg-white h-1/3 sm:h-2/3" />
                    </div>
                    <div className="relative max-w-7xl mx-auto">
                        <div className="text-center">
                            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Anki Decks Blog</h2>
                            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                                Read what we're up to and how we're making Anki Decks better.
                            </p>
                        </div>
                        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                            {posts.map((post) => (
                                <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                    <div className="flex-shrink-0">
                                        <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-indigo-600">
                                                <a href={post.category.href} className="hover:underline">
                                                    {post.category.name}
                                                </a>
                                            </p>
                                            <a href={post.href} className="block mt-2">
                                                <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                                <p className="mt-3 text-base text-gray-500">{post.description}</p>
                                            </a>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0">
                                                <a href={post.author.href}>
                                                    <span className="sr-only">{post.author.name}</span>
                                                    <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt="" />
                                                </a>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">
                                                    <a href={post.author.href} className="hover:underline">
                                                        {post.author.name}
                                                    </a>
                                                </p>
                                                <div className="flex space-x-1 text-sm text-gray-500">
                                                    <time dateTime={post.datetime}>{post.date}</time>
                                                    <span aria-hidden="true">&middot;</span>
                                                    <span>{post.readingTime} read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}