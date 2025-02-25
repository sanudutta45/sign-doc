"use client"
import Sidebar from "@/components/Sidebar"
import UploadFileNotification from "@/components/UploadFileNotification"
import mammoth from "mammoth"
import dynamic from "next/dynamic.js"
import { useRef, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
const PdfViewer = dynamic(() => import("../components/PdfViewer.jsx"), {
  ssr: false,
})

const DocxViewer = dynamic(() => import("../components/DocxViewer.jsx"), {
  ssr: false,
})
export default function Home() {
  const [initial, setInitial] = useState(null)
  const [signature, setSignature] = useState(null)
  const [numPages, setNumPages] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [file, setFile] = useState(null)
  const containerRef = useRef(null)
  const [droppedItems, setDroppedItems] = useState([])
  const pageNumRef = useRef(1)
  const [docxContent, setDocxContent] = useState(null)

  const handleFileUpload = async (file) => {
    setDroppedItems([])
    setPageNumber(1)
    pageNumRef.current = 1
    setFile(file)
    const fileExtension = file.name.split(".").pop().toLowerCase()

    if (fileExtension === "docx") {
      try {
        const reader = new FileReader()
        reader.onload = async (event) => {
          const arrayBuffer = event.target.result
          const result = await mammoth.extractRawText({ arrayBuffer })
          setDocxContent(result.value)
        }
        reader.readAsArrayBuffer(file)
      } catch (error) {
        console.error("Error reading DOCX file:", error)
      }
    } else {
      setDocxContent(null)
    }
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const saveInitial = (data) => {
    setInitial(data)
  }

  const saveSignature = (data) => {
    setSignature(data)
  }


  const handleDrop = (item, offset) => {
    if (item.id != null) {
      setDroppedItems((prevItems) =>
        prevItems.map((currentItem, index) =>
          index === item.id
            ? { ...currentItem, x: offset.x, y: offset.y }
            : currentItem
        )
      )
    } else {
      setDroppedItems((prev) => [
        ...prev,
        {
          type: item.type,
          x: offset.x,
          y: offset.y,
          page: pageNumRef.current,
          content: "",
        },
      ])
    }
  }

  const removeItem = (itemIndex) => {
    const filteredItems = droppedItems.filter((_, index) => index != itemIndex)
    setDroppedItems([...filteredItems])
  }

  const handleUpdate = (id, content) => {
    setDroppedItems((prevItems) =>
      prevItems.map((item, index) =>
        index === id ? { ...item, content: content } : item
      )
    )
  }

  const handlePageNext = () => {
    pageNumRef.current = pageNumRef.current + 1
    setPageNumber((prev) => prev + 1)
  }

  const handlePagePrev = () => {
    pageNumRef.current = pageNumRef.current - 1
    setPageNumber((prev) => prev - 1)
  }

  const handleScaling = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5))
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='h-screen flex flex-col lg:flex-row bg-gray-50'>
        <Sidebar
          handleFileUpload={handleFileUpload}
          initial={initial}
          signature={signature}
          saveInitial={saveInitial}
          saveSignature={saveSignature}
        />
        <div
          className='w-full lg:w-3/4 flex justify-center bg-gray-100 p-4'
          ref={containerRef}
          // style={{ height: "100vh", overflow: "hidden" }}
        >
          {file ? (
            docxContent ? (
              <DocxViewer
                handleDrop={handleDrop}
                droppedItems={droppedItems}
                pageNumber={pageNumber}
                docxContent={docxContent}
                handleUpdate={handleUpdate}
                removeItem={removeItem}
                initial={initial}
                signature={signature}
              />
            ) : (
              <PdfViewer
                file={file}
                handleDrop={handleDrop}
                droppedItems={droppedItems}
                pageNumber={pageNumber}
                handleUpdate={handleUpdate}
                removeItem={removeItem}
                numPages={numPages}
                handlePageNext={handlePageNext}
                handlePagePrev={handlePagePrev}
                handleScaling={handleScaling}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
                signature={signature}
                initial={initial}
              />
            )
          ) : (
            <UploadFileNotification />
          )}
        </div>
      </div>
    </DndProvider>
  )
}
