import Editor from "@monaco-editor/react";
import { useEffect, useState } from 'react';
import { Languages, Status } from '@/utils';
import { PasteApi } from "@/api/api";
import { NextRouter } from "next/router";
import Layout from "@/components/Layout";
import moment from "moment";

export default function Paste({ data }) {
    type Data = {
        author: string,
        title: string,
        language: string,
        status: string,
        pasteText: string
        createdAt: string
        pasteKey: string
        pasteFileId: { _id: string, data: any }
    };

    const [paste, setPaste] = useState<Data>();
    useEffect(() => {
        setPaste(data)
    }, [])

    const findLanguage = (ext) => {
        return Languages.find((lang) => lang.ext === ext)
    }

    const download = () => {
        const data = new Uint8Array(paste?.pasteFileId?.data?.data)
        const type = "text/plain"
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = paste.title + paste.language;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const options = {
        readOnly: true
    };

    return (
        <Layout>
            {paste?.status === "burn on reading" &&
                <div className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Hey there,</span> This paste will be rendered useless upon reading.
                    </div>
                </div>
            }

            <div className="w-full text-lg mb-6" >
                <h1 className="text-4xl mb-1" > {paste?.title} </h1>
                <p> From <b> {paste?.author} </b>, {moment(paste?.createdAt).format('LT')} , written in  <b> {findLanguage(paste?.language)?.label} </b>. </p>
                <p> URL <a className="text-blue-400" href={`http://localhost:3000/paste/${paste?.pasteKey}`} target="/_blank" > http://localhost:3000/paste/{paste?.pasteKey} </a> </p>
                <p> <b className="text-blue-400 cursor-pointer" onClick={download} >Download Paste </b></p>
            </div>
            <div>
                <Editor
                    height="50vh"
                    language={findLanguage(paste?.language)?.value}
                    value={paste?.pasteText}
                    theme="vs-dark"
                    options={options}
                />
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context: NextRouter) {
    const { pasteKey } = context.query
    const res: any = await PasteApi.get(`pasteBin/${pasteKey}`);
    const data = res.data?.data
    if (data) {
        return { props: { data } }
    }
    return {
        notFound: true,
    }
}
