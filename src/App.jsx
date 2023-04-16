
import './App.css'
import React, { useTransition, useState } from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';



function App() {
  const [editorValue, setEditorValue] = useState("");
  const [editorMode, setEditorMode] = useState(true);
  const [activeHeader, setActiveHeader] = useState("editor");
  const [isPending, startTransition] = useTransition();

  const switchEditorMode = (viewMode) => {
    if (viewMode === "editor") {
      setActiveHeader("editor")
      setEditorMode(true)
    } else {
      setActiveHeader("preview")
      startTransition(() => {
        setEditorMode(false)
      })
    }
  }


  return (
    <div className="App w-full min-h-screen bg-gray-100 pt-10">
      <section className="max-w-[900px] relative overflow-hidden min-h-[600px] bg-white rounded-md border m-auto">
        <div className="w-full h-12 top-[0px] left-0 right-0 border-b flex justify-between items-center">
          <div className="flex">
            <div
              style={activeHeader === 'editor' ? {
                background: "#d4d3d3"
              } : {}}
              onClick={() => switchEditorMode("editor")}
              className="w-32 relative flex items-center border-r justify-center  h-12 text-gray-700 cursor-pointer">
              {activeHeader === "editor" && <div className="w-2 h-2 bg-gray-500 border rounded-full gap-2 absolute right-2"></div>}
              <p>Edit</p>
            </div>

            <div style={activeHeader === "preview" ? {
              background: "#d4d3d3"
            } : {}}
              onClick={() => switchEditorMode("preview")}
              className="w-32 relative flex items-center justify-center h-12 text-gray-700 border-r cursor-pointer">
              {activeHeader === "preview" && <div className="w-2 h-2 bg-gray-500 border rounded-full gap-2 absolute right-2"></div>}
              <p>Preview</p>
            </div>
          </div>

          <div className="flex gap-5 px-5">
            <div className="h-4 w-4 bg-green-300 rounded-full "></div>
            <div className="h-4 w-4 bg-blue-500 rounded-full "></div>
            <div className="h-4 w-4 bg-red-300 rounded-full "></div>
          </div>
        </div>

        {editorMode ?
          <section className="px-9 py-5">
            <textarea defaultValue={editorValue} onChange={(e) => setEditorValue(e.target.value)} name="" id="" cols="30" rows="10" className="w-full min-h-[550px] text-sm h-full p-2 outline-none border-none" placeholder="Edit">
            </textarea>
          </section>
          :
          <section className="w-full h-full min-h-[600px] px-9 py-5">
            {!isPending ? <MarkdownPreview className="markdownPreview" source={editorValue} /> : <p>...is Loading</p>}
          </section>
        }
      </section>
    </div>
  )
}

export default App
