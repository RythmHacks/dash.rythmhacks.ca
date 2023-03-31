import { useState } from "react"
import Editor from "../Editor/Editor"

const Apply = () => {
  const [editingInProgress, setEditingInProgress] = useState(false)

  return (
    <div className="p-12 flex-1" id="apply">
      { !editingInProgress ? 
        <div className="container">
          <div className="flex flex-col">
            <p>Application Status:</p>
            <p className="text-2xl text-orange-600">Not Submitted</p>
          </div>
          <button onClick={() => setEditingInProgress(true)}>Edit application</button>
        </div>
      :
        <>
          <Editor />
        </>
      }
    </div>
  )
}

export default Apply