import { Upload } from "lucide-react"

const FileUpload = ({ onFileUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) onFileUpload(file)
  }

  return (
    <div className='file-upload lg:w-full p-4'>
      <input
        type='file'
        accept='.pdf,.docx'
        onChange={handleFileChange}
        className='hidden'
        id='fileInput'
      />
      {/* For larger screens */}
      <label
        htmlFor='fileInput'
        className='hidden lg:flex flex-col items-center justify-center border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition'
      >
        <Upload className='h-10 w-10 text-blue-600 mb-2' />
        <span className='text-blue-600 font-medium'>Upload a PDF or DOCX</span>
        <p className='text-sm text-gray-500 mt-1'>
          Supported formats: .pdf, .docx
        </p>
      </label>

      {/* For smaller screens */}
      <label
        htmlFor='fileInput'
        className='lg:hidden flex items-center justify-center cursor-pointer bg-blue-600 text-white rounded-full w-12 h-12 shadow-md hover:bg-blue-700 transition'
      >
        <Upload className='h-6 w-6' />
      </label>
    </div>
  )
}

export default FileUpload
