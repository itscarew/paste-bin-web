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

  const createPaste = async () => {
    const payload = {
      author: data.author,
      title: data.title,
      language: ext,
      status: status,
      pasteText: value
    }
    try {
      const res: any = await PasteApi.post(`pasteBin`, payload);
      window.open(`http://localhost:3000/paste/${res.data.data.pasteKey}`, "_blank");
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
            <input type="text" name='author' value={data.author} onChange={handleDataChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ola Carew" required />
          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" name='title' value={data.title} onChange={handleDataChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="How to download Nba 2k17" required />
          </div>
          <div>
            <label htmlFor="languages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
            <select id="languages" value={language} onChange={handleLanguageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {Languages.map((language) => {
                return <option key={language.value} value={language.value} >{language.label} </option>
              })}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="languages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your paste goes here</label>
          <Editor
            height="50vh"
            language={language}
            defaultValue="// hey lets go"
            value={value}
            theme="vs-dark"
            onChange={handleChange}
          />
        </div>
        <div className="mt-6" >
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">When should I delete your paste ?</label>
          <select id="status" onChange={handleStatusChange} value={status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {Status.map((status, index) => {
              return <option key={index} value={status}>{status}</option>
            })}
          </select>
        </div>
        <button type="submit" className="text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/4 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Paste</button>
      </form>
    </Layout>
  )
}
