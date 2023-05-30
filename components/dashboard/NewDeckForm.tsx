import { PhotographIcon, UserCircleIcon } from '@heroicons/react/solid'
import {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/router";

export default function NewDeckForm() {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
    })

    const submit = () => {
        setSubmitting(true);
        fetch('/api/decks/new', {
            method: 'POST',
            body: JSON.stringify(formData),
        }).then((res) => {
            if (res.status === 200) {
                const data = res.json() as {success: boolean, deckId?: string};

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
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-bold">New Deck</h2>
                    <p className="text-sm text-gray-500 font-medium">
                         You won&apos;t be charged until you add cards.
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        autoComplete="name"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Maths Chapter 4"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={submit}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {submitting ? (
                        <>
                            Creating...
                        </>
                    ) : (
                        <>
                            Create
                        </>
                    )}
                </button>
            </div>
        </>
    )
}
