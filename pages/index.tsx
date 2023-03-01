import Editor from "@monaco-editor/react";
import { useEffect, useState } from 'react';
import { Languages, Status } from '@/utils';
import { PasteApi } from "@/api/api";
import Layout from "@/components/Layout";

export default function Home() {
  const [language, setLanguage] = useState('');
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  useEffect(() => {
    setLanguage(Languages[1].value)
  }, [])

  const [ext, setExt] = useState('');
  useEffect(() => {
    const findLanguage = Languages.find((lang) => lang.value === language)
    setExt(findLanguage?.ext)
  }, [language])

  const [value, setValue] = useState("");
  const handleChange = (newValue, event) => {
    setValue(newValue);
  };

  const [data, setData] = useState({ author: "", title: "" });
  const handleDataChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  };

  const [status, setStatus] = useState("");
  const handleStatusChange = (event) => {
    setStatus(event.target.value)
  };
  useEffect(() => {
    setStatus("1 hour")
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    createPaste()
  }

  const [pasteKey, setPasteKey] = useState<string>();
  const createPaste = async () => {
    const payload = {
      author: data.author,
      title: data.title,
      language: ext,
      status: status,
      pasteText: value
    }
    try {
      const res: any = await PasteApi.post(`/`, payload);
      if (res.data.data?.status !== "burn on reading") {
        window.open(`${process.env.NEXT_PUBLIC_WEB_URL}/paste/${res.data.data?.pasteKey}`);
      } else {
        setPasteKey(res.data.data?.pasteKey)
      }
    } catch (error) {
      throw error
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} >
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
            <input type="text" name='author' value={data.author} onChange={handleDataChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 " placeholder="Ola Carew" required />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" name='title' value={data.title} onChange={handleDataChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 " placeholder="How to download Nba 2k17" required />
          </div>
          <div>
            <label htmlFor="languages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
            <select id="languages" value={language} onChange={handleLanguageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 ">
              {Languages.map((language) => {
                return <option key={language.value} value={language.value} >{language.label} </option>
              })}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="languages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your paste goes here <small className="text-orange-500" >required *</small> </label>
          <Editor
            height="50vh"
            language={language}
            defaultValue="// hey lets go"
            value={value}
            theme="vs-dark"
            onChange={handleChange}
          />
        </div>
        <div className="my-6" >
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">When should I delete your paste ?</label>
          <select id="status" onChange={handleStatusChange} value={status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500">
            {Status.map((status, index) => {
              return <option key={index} value={status}>{status}</option>
            })}
          </select>
        </div>

        {pasteKey &&
          <div className="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Your paste is ready! </span>
              This paste will be rendered useless upon reading.
              <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/paste/${pasteKey}`} className="font-medium"> {process.env.NEXT_PUBLIC_WEB_URL}/paste/{pasteKey}</a>
            </div>
          </div>
        }

        <button type="submit" className="text-white mt-6 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-1/4 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Paste</button>
      </form>
    </Layout>
  )
}
