import Editor from "@monaco-editor/react";
import { useEffect, useState } from 'react';
import { Languages } from '@/utils';
import { PasteApi } from "@/api/api";
import { NextRouter } from "next/router";
import Layout from "@/components/Layout";
import moment from "moment";
import QRCode from "react-qr-code";

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
        setPaste(data?.data)
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
                <div className="flex p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800" role="alert">
                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Hey there,</span> This paste is a one time read and can not be re-shared.
                    </div>
                </div>
            }

            <div className="mb-4" >
                <div className=" text-lg mb-4" >
                    <h1 className="text-4xl mb-1" > {paste?.title} </h1>
                    <p> From <b> {paste?.author} </b>, {moment(paste?.createdAt).format('MMMM Do YYYY, h:mm a')} , written in  <b> {findLanguage(paste?.language)?.label} </b>. </p>
                    <p> URL <a className="text-green-700" href={`https://olas-paste-bin.onrender.com/paste/${paste?.pasteKey}`} target="/_blank" > https://olas-paste-bin.onrender.com/paste/{paste?.pasteKey} </a> </p>
                    <p> <b className="text-green-700 cursor-pointer" onClick={download} >Download Paste </b></p>
                </div>
                <div>
                    <QRCode value={`https://olas-paste-bin.onrender.com/paste/${paste?.pasteKey}`} size={156} />
                </div>
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
    try {
        const res: any = await PasteApi.get(`pasteBin/${pasteKey}`);
        const data = res.data
        return { props: { data } }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}
