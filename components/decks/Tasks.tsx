import {CheckCircleIcon, TrashIcon, XCircleIcon} from "@heroicons/react/solid";

type Task = {
    id: number,
    status: string,
    type: string,
    title: string,
    fail_reason?: string
}

type TasksProps = {
    deck: Deck,
    tasks: Task[]
}

export default function Tasks(props: TasksProps) {
    const {tasks} = props

    return (
        <>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <a className="block">
                                <div className="flex items-center px-4 py-4 sm:px-6">
                                    <div className="min-w-0 flex-1 flex items-center">
                                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-teal-600 truncate">{task.title} (task #{task.id})</p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                                    {task.status == "FAILED" ? (
                                                        <>
                                                            <XCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" aria-hidden="true" />
                                                            Failed ({task?.fail_reason})
                                                        </>
                                                    ) : task.status == "COMPLETED" ? (
                                                        <>
                                                            <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                                            Completed
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <p>In progress</p>
                                                        </>
                                                    )}
                                                </p>
                                            </div>
                                            <div className="hidden md:block">
                                                <div>
                                                    <p className="text-sm text-gray-900">
                                                        {/*Started <time dateTime={importObj.start_ts}>{moment(importObj.start_ts).fromNow()}</time>*/}
                                                    </p>
                                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                                        {/*<span className="truncate">{importObj.progress}/{importObj.number_of_tracks}</span>*/}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {/*<TrashIcon onClick={() => {*/}
                                        {/*    setDeleteImportModalIsOpen(true)*/}
                                        {/*    setImportIdToDelete(importObj.id);*/}
                                        {/*}*/}
                                        {/*} className="h-5 w-5 text-red-400 cursor-pointer" aria-hidden="true" />*/}
                                    </div>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}