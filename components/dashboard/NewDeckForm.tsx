import {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/router";
import Toggle from "@/components/ui/toggle";
import {cn} from "@/lib/utils";
import {Switch} from "@headlessui/react";

export default function NewDeckForm() {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        public: false,
    })

    const submit = () => {
        setSubmitting(true);
        fetch('/api/decks/new', {
            method: 'POST',
            body: JSON.stringify(formData),
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
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="mt-5 md:col-span-3 md:mt-0">
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
