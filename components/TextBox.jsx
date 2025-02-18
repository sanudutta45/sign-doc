"use client"
import { useState } from "react"
import DraggableItem3 from "./DraggableItem3"
import { Trash2 } from "lucide-react"

const TextBox = ({ removeItem, updateText, text = "", itemId }) => {
  const [isActive, setIsActive] = useState(false)

  const handleFocus = () => setIsActive(true)
  const handleBlur = () => setIsActive(false)
  const handleChange = (e) => updateText(e.target.value)

  return (
    <DraggableItem3 type='text' itemId={itemId}>
      <div className='relative w-full max-w-md flex items-center'>
        <textarea
          className={`w-full p-2 rounded resize border-2 focus:outline-none ${
            isActive
              ? "bg-gray-100 bg-opacity-90 border-blue-500"
              : "bg-opacity-50 bg-gray-100"
          }`}
          placeholder='Type text'
          value={text}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ color: "black" }}
        />
        <button
          onClick={removeItem}
          className={`ml-2 ${isActive ? "text-gray-800" : "text-gray-500"}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </DraggableItem3>
  )
}

export default TextBox
