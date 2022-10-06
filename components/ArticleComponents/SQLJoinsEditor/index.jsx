import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react"
import { useState, useEffect, useRef } from 'react'
import Table from './Table'

import database from './database'
import executeEditorScript from './executeEditorScript'

export default function SQLJoinsEditor({ component, defaultValue, defaultValues }) {
  const [code, setCode] = useState(defaultValue?.trim() || "")
  const [output, setOutput] = useState(null)
  const dbRef = useRef()
  const handleEditorChange = (value, event) => {
    setCode(value)
  }

  const execute = (code) => {
    // console.log(code)
    const output = executeEditorScript({
      db: dbRef.current,
      sql: code,
      editorName: component
    }) 
    setOutput(output)
  }

  useEffect(() => {
    ;(async () => {
      const db = await database()
      dbRef.current = db
    })()
  }, [])

  return (
    <>
    {defaultValues && <div className="flex flex-col sm:flex-row flex-wrap sm:space-x-4 space-x-0 sm:space-y-0 space-y-4 justify-center w-full">
      {defaultValues.map(({label, value}, i) => (
        <div key={i} className="flex flex-col space-y-2">
          <button onClick={() => {
            setCode(value)
            execute(value)
          }} 
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            {label}
          </button>
        </div>
      ))}
    </div>}
      <Editor
        height="300px"
        defaultLanguage="mysql"
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          scrollBeyondLastLine: false,
          fontSize: "16px"
        }}
      />
      <button
        onClick={() => execute(code)}
        className="my-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Execute!
      </button>
      {output && <Table data={output} />}
    </>
  )
}