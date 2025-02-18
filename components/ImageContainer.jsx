import { Trash2, Upload } from "lucide-react"
import DraggableItem3 from "./DraggableItem3"

const ImageContainer = ({ removeItem, updateImage, itemId, image = null }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => updateImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <DraggableItem3 type='image' itemId={itemId}>
      <div className='relative w-64 h-64 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center resize overflow-hidden'>
        {!image ? (
          <label className='flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:text-gray-800'>
            <Upload size={24} />
            <span className='text-sm'>Upload Image</span>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageUpload}
            />
          </label>
        ) : (
          <img
            src={image}
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

export default ImageContainer
