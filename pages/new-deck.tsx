import Navbar from "@/components/global/Navbar";
import {Switch, Tab} from "@headlessui/react";
import {cn} from "@/lib/utils";
import {useState} from "react";
import Toggle from "@/components/ui/toggle";
import {useClerk} from "@clerk/nextjs";
import cookieCutter from 'cookie-cutter'

export default function NewDeck() {
    const clerk = useClerk()

    const [formData, setFormData] = useState({
        maxCards: 0,
        source: '',
        name: '',
        public: false,
    });

    const generateDeck = () => {
        cookieCutter.set('resumeDeck', btoa(JSON.stringify(formData)), {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        clerk.openSignUp();
    }

    return (
        <>
            <Navbar />

            <main className={"flex flex-col items-center dark:text-white text-black"}>
                <div className={"mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 w-full items-center justify-between bg-inherit py-4"}>
                    <div className={"dark:bg-primary-black bg-white shadow rounded-md w-full mt-5 py-3 p-5 px-4 sm:px-6"}>
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="mt-5 md:col-span-3 md:mt-0">
                                <h2 className="text-2xl font-bold">Create new Deck</h2>
                                <p className="text-sm text-gray-500 font-medium">
                                    Create a new deck to start adding cards to.
                                </p>
                                <div className="sm:overflow-hidden sm:rounded-md">
                                    <div className="space-y-6 px-0 sm:py-2">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="dark:bg-quaternary-black mt-1 block w-full rounded-md dark:text-white dark:border-black border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-green-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-4">
                                            <Switch.Group as="div" className="flex items-center justify-between">
                                                <span className="flex-grow flex flex-col">
                                                    <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
                                                        Public
                                                    </Switch.Label>
                                                    <Switch.Description as="span" className="text-sm text-gray-500">
                                                        Make your deck public so that other users can see it.
                                                    </Switch.Description>
                                                </span>
                                                <Toggle enabled={formData.public} setEnabled={(enabled) => setFormData({...formData, public: enabled})} />
                                            </Switch.Group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-12 mt-12">
                            <div className="border-b border-gray-900/10 pb-5">
                                <h2 className="text-2xl font-bold">Add Cards to Deck</h2>
                                <p className="text-sm text-gray-500 font-medium">
                                    Token estimates are not completely accurate.
                                </p>

                                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Maximum Cards
                                        </label>
                                        <p className="block text-sm font-medium leading-6 text-gray-500">
                                            The maximum number of cards to generate in this batch. 0 means unlimited.
                                        </p>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={formData.maxCards}
                                                    onChange={(e) => setFormData({...formData, maxCards: Number(e.target.value)})}
                                                    autoComplete="name"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Maths Chapter 4"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="block text-sm font-medium leading-6 pt-5 text-gray-900">
                                    Flashcard Source
                                </p>
                                <p className="block text-sm font-medium leading-6 text-gray-500">
                                    This will be used as the base data to generate flashcards for your deck. You should remove any data that you don&apos;t want to be included in your flashcards.
                                </p>
                                <div className="pt-2">
                                    <Tab.Group>
                                        {({ selectedIndex }) => (
                                            <>
                                                <Tab.List className="flex items-center">
                                                    <Tab
                                                        className={({ selected }) =>
                                                            cn(
                                                                selected
                                                                    ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                                                                    : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
                                                                'px-3 py-1.5 border border-transparent text-sm font-medium rounded-md'
                                                            )
                                                        }
                                                    >
                                                        Plain Text (best)
                                                    </Tab>
                                                    <Tab
                                                        className={({ selected }) =>
                                                            cn(
                                                                selected
                                                                    ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'
                                                                    : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',
                                                                'ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md'
                                                            )
                                                        }
                                                    >
                                                        Preview
                                                    </Tab>
                                                </Tab.List>
                                                <Tab.Panels className="mt-2">
                                                    <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                                        <label htmlFor="comment" className="sr-only">
                                                            Comment
                                                        </label>
                                                        <div>
                                                <textarea
                                                    // rows={5}
                                                    style={
                                                        {
                                                            // height: document.getElementById('comment')?.scrollHeight + 'px',
                                                        }
                                                    }
                                                    name="comment"
                                                    id="comment"
                                                    value={formData.source}
                                                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="Paste your notes, documents or data here. (Ensure you remove ALL data that you don't want to be included in your flashcards (introductions, etc))."
                                                    defaultValue={''}
                                                />
                                                        </div>
                                                    </Tab.Panel>
                                                    <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                                        <div className="border-b">
                                                            <div className="mx-px mt-px px-3 pt-2 pb-12 text-sm leading-5 text-gray-800">
                                                                Preview content will render here.
                                                            </div>
                                                        </div>
                                                    </Tab.Panel>
                                                </Tab.Panels>
                                            </>
                                        )}
                                    </Tab.Group>
                                </div>
                            </div>
                        </div>

                        <p className="block text-sm font-medium leading-6 pt-5 text-gray-900">
                            Token Estimate: 0
                        </p>
                        <p className="block text-sm font-medium leading-6 text-gray-500">
                            This is an estimate of the number of tokens that will be used to create your flashcards.
                        </p>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                onClick={() => generateDeck()}
                                className="rounded-md bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Generate Deck ✨
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
