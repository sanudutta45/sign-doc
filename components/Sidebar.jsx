"use client"
import { Edit2, Upload } from "lucide-react"
import DraggableItem from "./DraggableItem"
import { useState } from "react"
import DraggableItem2 from "./DraggableItem2"
import SignatureShow from "./SignatureShow"
import DrawingModal from "./DrawingModal"
import FileUpload from "./FileUpload"

const Sidebar = ({
  handleFileUpload,
  initial,
  signature,
  saveInitial,
  saveSignature,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isSignatureModalOpen, setSignatureModalOpen] = useState(false)
  const [isInitialModalOpen, setInitialModalOpen] = useState(false)

  const handleAddSignature = () => {
    setDropdownOpen(false)
    setSignatureModalOpen(true) // Opens signature modal
  }

  const handleAddInitials = () => {
    setDropdownOpen(false)
    setInitialModalOpen(true)
    // Logic for adding initials
  }

  return (
    <>
      <div className='lg:w-1/4 bg-white shadow-md p-6 items-center justify-center lg:items-start lg:justify-start'>
        <FileUpload onFileUpload={handleFileUpload} />
        <div>
          <h3 className='font-medium text-lg mb-4'>Tools</h3>
          <DraggableItem
            type='text'
            icon={<span className='text-xl font-bold'>T</span>}
            label='Text'
          />
          <DraggableItem
            type='image'
            icon={<Upload className='h-5 w-5 text-gray-500' />}
            label='Image'
          />
          <div className='relative'>
            <div
              className='flex items-center gap-2 p-2 border rounded-lg cursor-pointer opacity-100'
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className='text-xl font-bold'>S</span>
              <span>Signature</span>
            </div>
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className='absolute mt-2 bg-white border shadow-md rounded-lg z-10 right-0'>
                <div className='relative p-2 hover:bg-gray-100 cursor-pointer'>
                  {signature ? (
                    <div>
                      <DraggableItem2 type='signature'>
                        <SignatureShow data={signature} />
                      </DraggableItem2>
                      <button
                        onClick={() => setSignatureModalOpen(true)}
                        className='absolute top-4 right-3 text-gray-500 hover:text-gray-800'
                      >
                        <Edit2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <p onClick={() => handleAddSignature()}>Add Signature</p>
                  )}
                </div>
                <div className='relative p-2 hover:bg-gray-100 cursor-pointer'>
                  {initial ? (
                    <div>
                      <DraggableItem2 type='initial'>
                        <SignatureShow data={initial} />
                      </DraggableItem2>
                      <button
                        onClick={() => setInitialModalOpen(true)}
                        className='absolute top-4 right-3 text-gray-500 hover:text-gray-800'
                      >
                        <Edit2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <p onClick={() => handleAddInitials()}>Add Initials</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <DrawingModal
        isOpen={isInitialModalOpen}
        onClose={() => setInitialModalOpen(false)}
        saveDrawing={saveInitial}
        initialSig={initial}
      />
      <DrawingModal
        isOpen={isSignatureModalOpen}
        onClose={() => setSignatureModalOpen(false)}
        saveDrawing={saveSignature}
        initialSig={signature}
      />
    </>
  )
}

export default Sidebar
