import {ReactNode} from "react";

type StatBoxProps = {
    title: string,
    value: string,
    icon: any,
    children?: ReactNode
}

export default function StatBox(props: StatBoxProps) {
    return (
        <div className={"lg:w-[420px]"}>
            <dl className="mt-5 sg:grid sg:grid-cols-1 sg:gap-5 sm:grid-cols-2">
                <div
                    className="relative mx-5 bg-white pt-5 px-4 pb-5 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                    <dt>
                        <div className="absolute bg-teal-500 rounded-md p-3">
                            <props.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            {/*<icon className="h-6 w-6 text-white" aria-hidden="true" />*/}
                        </div>
                        <p className="dark:text-gray-400 ml-16 text-sm font-medium text-gray-500 truncate">{props.title}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline">
                        <p className="dark:text-white text-2xl font-semibold text-gray-900 truncate">{props.value}</p>
                        {props.children}
                    </dd>
                </div>
            </dl>
        </div>
    )
}