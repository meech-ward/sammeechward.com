import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react"
import { useState, useEffect } from 'react'

export default function SQLJoinsEditor({ component, defaultValue }) {
  const [code, setCode] = useState(defaultValue)
  const handleEditorChange = (value, event) => {
    setCode(value)
  }

  const execute = () => {
    console.log(code)
  }

  return (
    <>
      <Editor
        height="300px"
        defaultLanguage="mysql"
        defaultValue={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          scrollBeyondLastLine: false,
          fontSize: "16px"
        }}
      />
      <button
        onClick={execute}
        className="my-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Execute!
      </button>
    </>
  )
}