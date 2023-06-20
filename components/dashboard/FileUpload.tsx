import {FileWithPath, useDropzone} from 'react-dropzone'
import {useState, useCallback} from "react";
import {toast} from "@/components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {UploadIcon} from "@heroicons/react/outline";
import Link from "next/link";
import useFetch from "@/lib/useFetch";

export default function FileUpload() {
    const fetch = useFetch();
    const [uploadButtonText, setUploadButtonText] = useState('Continue')

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')

            reader.onload = () => {
                let formData = new FormData();
                formData.append("file", file);
            }
        })
    }, [])

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({
        maxFiles: 1,
        onDrop
    });

    const uploadFiles = async () => {
        setUploadButtonText('Processing...')
        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("guildId", "");

            fetch("/api/decks/upload", {
                "method": "POST",
                "body": formData
            }).then((r) => {
                if (!r.ok) {
                    toast({
                        title: "Error",
                        description: "Failed to upload files",
                    })
                    setUploadButtonText('Continue')
                    return;
                }

                console.log(r);
                toast({
                    title: "Success",
                    description: "Uploaded files successfully!",
                })
            })
        }
    };

    const files = acceptedFiles.map(file => (
        <li className={"list-none"} key={(file as FileWithPath).path}>
            {(file as FileWithPath).path} - {file.size} bytes
        </li>
    ));

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <div className={"col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1"}>
                        <div className={"cursor-pointer border-2 py-9 border-dashed border-gray-200 bg-white p-5 rounded-md w-full mt-2"}>
                            <div className={"flex flex-col justify-center items-center"}>
                                <UploadIcon className={"h-6 w-6"} />
                                <p className={"font-medium"}>Upload Existing Deck</p>
                            </div>
                        </div>
                    </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Import a Deck</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>Drag and drop your .apkg file below to import it. <Link target={"_blank"} className={"text-blue-400"} href={"/blog/how-to-get-apkg"}>How do i get my .apkg file?</Link></p>
                            <div className={"w-full h-full"} {...getRootProps()}>
                                <input {...getInputProps()} accept={".apkg"} />
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-0 text-center">
                                        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex flex-col text-sm text-gray-600">
                                            {
                                                isDragActive ?
                                                    <p>Drop the files here ...</p> :
                                                    <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                                            }
                                            {files}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction><button onClick={() => uploadFiles()}>{uploadButtonText}</button></AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}