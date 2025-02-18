import React, { useState, useRef } from "react"

const DrawingModal = ({ isOpen, onClose, saveDrawing }) => {
  const [activeTab, setActiveTab] = useState("type")
  const [typedText, setTypedText] = useState("") // For the "Type" tab
  const [uploadedImage, setUploadedImage] = useState(null) // For the "Image" tab
  const canvasRef = useRef(null)
  const [drawnSign, setDrawnSign] = useState(null)

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return setDrawnSign(null)
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const handleSave = () => {
    if (activeTab === "draw") {
      const canvas = canvasRef.current
      const dataURL = canvas.toDataURL()
      const saveObj = {
        type: "draw",
        url: dataURL,
      }
      setDrawnSign(dataURL)
      saveDrawing(saveObj)
    } else if (activeTab === "type") {
      const saveObj = {
        type: "type",
        text: typedText,
      }
      saveDrawing(saveObj)
    } else if (activeTab === "image") {
      const saveObj = {
        type: "image",
        url: uploadedImage,
      }
      saveDrawing(saveObj)
    }
    onClose() // Close modal after save
  }

  const handleDrawing = (e) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (e.type === "mousedown") {
      ctx.beginPath()
      ctx.moveTo(x, y)
      canvas.isDrawing = true
    } else if (e.type === "mousemove" && canvas.isDrawing) {
      ctx.lineTo(x, y)
      ctx.stroke()
    } else if (e.type === "mouseup" || e.type === "mouseout") {
      canvas.isDrawing = false
    }
  }

  const clearTypedText = () => setTypedText("") // Clear typed text

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setUploadedImage(event.target.result)
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => setUploadedImage(null) // Clear the uploaded image

  return isOpen ? (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40'>
      <div className='bg-white rounded-lg shadow-lg w-96'>
        {/* Modal Header */}
        <div className='border-b p-4'>
          <h2 className='text-lg font-bold'>Drawing Modal</h2>
        </div>

        {/* Tabs */}
        <div>
          <div className='flex justify-center border-b'>
            <button
              className={`px-4 py-2 ${
                activeTab === "type"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("type")}
            >
              Type
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "draw"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("draw")}
            >
              Draw
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "image"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("image")}
            >
              Image
            </button>
          </div>

          {/* Tab Content */}
          <div className='p-4 h-64 flex items-center justify-center'>
            {activeTab === "type" && (
              <div className='w-full flex flex-col items-center'>
                {/* Display Typed Text */}
                <div className='w-full h-20 flex items-center justify-center border border-gray-300 rounded bg-gray-100 text-2xl font-semibold'>
                  {typedText || "Type your initials above"}
                </div>
                {/* Input for Typing */}
                <input
                  type='text'
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  placeholder='Type here...'
                  className='mt-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  onClick={clearTypedText}
                  className='mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
                >
                  Clear
                </button>
              </div>
            )}
            {activeTab === "draw" && (
              <div className='flex flex-col items-center'>
                {drawnSign ? (
                  <img
                    src={drawnSign}
                    alt='Uploaded'
                    className='max-w-full max-h-40 border border-gray-300 rounded'
                  />
                ) : (
                  <canvas
                    ref={canvasRef}
                    width={300}
                    height={90}
                    className='border border-gray-300 rounded'
                    onMouseDown={handleDrawing}
                    onMouseMove={handleDrawing}
                    onMouseUp={handleDrawing}
                    onMouseOut={handleDrawing}
                  />
                )}
                <button
                  onClick={clearCanvas}
                  className='mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
                >
                  Clear
                </button>
              </div>
            )}
            {activeTab === "image" && (
              <div className='w-full flex flex-col items-center'>
                {uploadedImage ? (
                  <div className='relative'>
                    <img
                      src={uploadedImage}
                      alt='Uploaded'
                      className='max-w-full max-h-40 border border-gray-300 rounded'
                    />
                    <button
                      onClick={clearImage}
                      className='absolute top-2 right-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600'
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <label className='flex flex-col items-center justify-center h-40 w-full border border-dashed border-gray-300 rounded cursor-pointer bg-gray-50 hover:bg-gray-100'>
                    <span className='text-gray-500'>
                      Click to upload an image
                    </span>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='hidden'
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className='border-t p-4 flex justify-end gap-2'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null
}

export default DrawingModal
