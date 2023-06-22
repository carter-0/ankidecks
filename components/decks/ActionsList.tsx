import {
    PencilIcon,
    TagIcon,
} from '@heroicons/react/outline'
import {FactoryIcon, LucideCreditCard} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {useState} from "react";
import Toggle from "@/components/ui/toggle";
import {toast} from "@/components/ui/use-toast";
import {mutate} from "swr";
import Link from "next/link";
import useFetch from "@/lib/useFetch";
import TagInput from "@/components/decks/TagInput";

type ActionsListProps = {
    onEditMode: () => void;
    deck: Deck
}

export default function ActionsList(props: ActionsListProps) {
    const {deck} = props
    const fetch = useFetch();
    const [addTagsOpen, setAddTagsOpen] = useState(false);

    const [addTagsSettings, setAddTagsSettings] = useState({
        customTags: false,
        customTagsList: []
    })

    const actions = [
        {
            title: 'Edit Deck',
            href: false,
            onClick: () => {props.onEditMode},
            icon: PencilIcon,
            iconForeground: 'text-pink-700',
            iconBackground: 'bg-pink-50',
            description: 'Edit the metadata of this deck.',
        },
        {
            title: 'Add Tags',
            href: false,
            onClick: () => {setAddTagsOpen(true)},
            icon: TagIcon,
            iconForeground: 'text-teal-700',
            iconBackground: 'bg-teal-50',
            description: 'Use AI to generate tags for your cards.',
        },
        {
            title: 'Generate Variation',
            onClick: () => true,
            href: false,
            icon: FactoryIcon,
            iconForeground: 'text-purple-700',
            iconBackground: 'bg-purple-50',
            description: 'Create a copy of this deck re-phrased by AI.',
        },
        {
            title: 'Add Cards',
            onClick: () => true,
            href: `/dashboard/decks/${deck.id}/cards/new`,
            icon: LucideCreditCard,
            iconForeground: 'text-amber-700',
            iconBackground: 'bg-amber-50',
            description: 'Add AI-generated cards to this deck.',
        },
    ]

    const addTags = async () => {
        await fetch(`/api/decks/${deck.id}/add-tags`, {
            "method": "POST",
            "body": JSON.stringify(AddTagsSettings)
        }).then((r) => {
            if (!r.ok) {
                toast({
                    title: "Error",
                    description: "Failed to add tags",
                })
                return;
            }

            mutate(`/api/decks/${deck.id}/tasks`)

            console.log(r);
            toast({
                title: "Success",
                description: "Added tags successfully!",
            })
        })
    }

    return (
        <>
            <AlertDialog open={addTagsOpen} onOpenChange={(v) => {setAddTagsOpen(v)}}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add AI Generated Tags to {deck.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className={"flex gap-3 flex-col"}>
                                <div className={"flex text-black font-medium flex-row gap-2 items-center"}>
                                    Also generate tag names <Toggle setEnabled={(v) => {setAddTagsSettings({...addTagsSettings, customTags: !v})}} enabled={!addTagsSettings.customTags} />
                                </div>

                                {addTagsSettings.customTags && (
                                    <TagInput />
                                )}

                                <div className={"bg-white shadow rounded-lg p-3"}>
                                    <p>
                                        Operation confirmation: <span className={"font-bold"}>Custom AI-generated Tags</span> will be added to <span className={"font-bold"}>{deck.name}&#39;s</span> <span className={"font-bold"}>{deck.cards.length}</span> cards.
                                    </p>
                                </div>

                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => addTags()}>
                            Add to Queue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="rounded-lg cursor-pointer bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
            {actions.map((action, actionIdx) => (
                <div
                    key={action.title}
                    className={cn(
                        actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                        actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                        actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                        actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                        'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500'
                    )}
                >
                    <div>
            <span
                className={cn(
                    action.iconBackground,
                    action.iconForeground,
                    'rounded-lg inline-flex p-3 ring-4 ring-white'
                )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-lg font-medium">
                            {action.href ? (
                                <Link href={action.href as string} className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {action.title}
                                </Link>
                            ) : (
                                <div onClick={action.onClick} className="focus:outline-none">
                                    {/* Extend touch target to entire panel */}
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {action.title}
                                </div>
                            )}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {action.description}
                        </p>
                    </div>
                    <span
                        className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                        aria-hidden="true"
                    >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
                </div>
            ))}
        </div>
        </>
    )
}