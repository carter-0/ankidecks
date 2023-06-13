import {useEffect, useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/router";
import Link from "next/link";
import {Tab} from "@headlessui/react";
import {cn} from "@/lib/utils";
import {AtSymbolIcon, CodeIcon, LinkIcon} from "@heroicons/react/solid";
import {getTokenEstimate} from "@/lib/publicHelper";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import TooManyTokens from "@/components/dashboard/TooManyTokens";

type NewCardFormProps = {
    deck: Deck
}

export default function NewCardForm(props: NewCardFormProps) {
    const {deck} = props;
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [upgradeAlertOpen, setUpgradeAlertOpen] = useState(false);
    const [formData, setFormData] = useState({
        source: '',
        maxCards: 0,
    })

    const [tokenEstimate, setTokenEstimate] = useState(0);

    useEffect(() => {
        if (formData.source === '') {
            setTokenEstimate(0);
            return;
        };

        getTokenEstimate(formData.source).then((tokens) => {
            setTokenEstimate(tokens.tokens);
        })
    }, [formData])

    const submit = () => {
        setSubmitting(true);
        fetch(`/api/decks/${deck.id}/cards/new`, {
            method: 'POST',
            body: JSON.stringify({
                source: formData.source,
                maximumCards: formData.maxCards,
            }),
        }).then((res) => {
            if (res.status === 200) {
                res.json().then((data: {success: boolean, deckId?: string}) => {
                    if (data.success) {
                        toast({
                            title: 'Deck created!',
                            description: 'You can now add cards to your deck.',
                        })

                        router.push(`/dashboard/decks/${data.deckId}`)
                    } else {
                        toast({
                            title: 'Error',
                            description: 'An error occurred while creating your deck.'
                        })

                        setSubmitting(false);
                    }
                })
            } else {
                toast({
                    title: 'Error',
                    description: 'An error occurred while creating your deck.'
                })

                setSubmitting(false);
            }
        })
    }

    return (
        <>
            <AlertDialog open={upgradeAlertOpen} onOpenChange={(v) => {setUpgradeAlertOpen(v)}}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently cards. You will not be refunded.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => (true)}>
                            Erase cards
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {tokenEstimate > 8192 ? (
                <TooManyTokens />
            ) : null }

            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-5">
                    <h2 className="text-2xl font-bold">Add Cards to Deck &apos;{deck.name}&apos;</h2>
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
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-600 sm:max-w-md">
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
                                            Plain Text
                                        </Tab>
                                        {/*<Tab*/}
                                        {/*    className={({ selected }) =>*/}
                                        {/*        cn(*/}
                                        {/*            selected*/}
                                        {/*                ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'*/}
                                        {/*                : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',*/}
                                        {/*            'ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md'*/}
                                        {/*        )*/}
                                        {/*    }*/}
                                        {/*>*/}
                                        {/*    Word Document*/}
                                        {/*</Tab>*/}
                                        {/*<Tab*/}
                                        {/*    className={({ selected }) =>*/}
                                        {/*        cn(*/}
                                        {/*            selected*/}
                                        {/*                ? 'text-gray-900 bg-gray-100 hover:bg-gray-200'*/}
                                        {/*                : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100',*/}
                                        {/*            'ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md'*/}
                                        {/*        )*/}
                                        {/*    }*/}
                                        {/*>*/}
                                        {/*    Powerpoint*/}
                                        {/*</Tab>*/}
                                    </Tab.List>
                                    <Tab.Panels className="mt-2">
                                        <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                            <label htmlFor="comment" className="sr-only">
                                                Comment
                                            </label>
                                            <div>
                                                <textarea
                                                    style={
                                                        {
                                                            // height: document.getElementById('comment')?.scrollHeight + 'px',
                                                        }
                                                    }
                                                    name="comment"
                                                    id="comment"
                                                    value={formData.source}
                                                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                                                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                Token Estimate: {tokenEstimate}
            </p>
            <p className="block text-sm font-medium leading-6 text-gray-500">
                This is an estimate of the number of credits that will be used to create your flashcards.
            </p>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={`/dashboard/decks/${deck.id}`} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </Link>
                <button
                    type="button"
                    onClick={submit}
                    disabled={tokenEstimate > 8192}
                    className="rounded-md bg-gradient-to-r from-rose-400 via-fuchsia-500 to-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                    {submitting ? (
                        <>
                            Creating...
                        </>
                    ) : (
                        <>
                            Generate ✨
                        </>
                    )}
                </button>
            </div>
        </>
    )
}
