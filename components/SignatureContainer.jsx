import { Trash2 } from "lucide-react"
import DraggableItem3 from "./DraggableItem3"

const SignatureContainer = ({ signature, removeItem, itemId }) => {
  return (
    <DraggableItem3 type='signature' itemId={itemId}>
      <div className='relative w-60 h-10 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center resize overflow-hidden'>
        {signature.type === "type" ? (
          <div>{signature.text}</div>
        ) : (
          <img
            src={signature.url}
            alt='Uploaded'
            className='w-full h-full object-cover'
          />
        )}
        <button
          onClick={removeItem}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
        >
          <Trash2 size={18} />
        </button>
      </div>
    </DraggableItem3>
  )
}

export default SignatureContainer
