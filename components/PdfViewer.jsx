"use client"
import React from "react"
import DroppableViewer from "./DroppableViewer"
import { Document, Page, pdfjs } from "react-pdf"
import TextBox from "./TextBox"
import SignatureContainer from "./SignatureContainer"
import ImageContainer from "./ImageContainer"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const PdfViewer = ({
  file,
  onDocumentLoadSuccess,
  pdfRef,
  handleDrop,
  droppedItems,
  pageNumber,
  handleUpdate,
  removeItem,
  handlePageNext,
  numPages,
  handleScaling,
  handlePagePrev,
  scale,
  signature,
  initial
}) => {
  return (
    <>
      <div
        className='pdf-viewer border border-gray-200 rounded-md p-4 hide-scroll'
        style={{ height: "calc(100% - 120px)", overflowY: "auto" }}
      >
        <DroppableViewer docRef={pdfRef} onDrop={handleDrop}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className='flex justify-center'
          >
            <Page pageNumber={pageNumber} scale={scale} inputRef={pdfRef} />
          </Document>
          {droppedItems.map(({ type, page, x, y, content }, index) =>
            page === pageNumber ? (
              <div
                key={index}
                className='absolute z-20'
                style={{
                  left: x,
                  top: y,
                }}
              >
                {type === "text" && (
                  <TextBox
                    updateText={(content) => handleUpdate(index, content)}
                    text={content}
                    removeItem={() => removeItem(index)}
                    itemId={index}
                  />
                )}
                {type === "signature" && (
                  <SignatureContainer
                    signature={signature}
                    itemId={index}
                    removeItem={() => removeItem(index)}
                  />
                )}
                {type === "initial" && (
                  <SignatureContainer
                    signature={initial}
                    itemId={index}
                    removeItem={() => removeItem(index)}
                  />
                )}
                {type === "image" && (
                  <ImageContainer
                    itemId={index}
                    image={content}
                    updateImage={(content) => handleUpdate(index, content)}
                    removeItem={() => removeItem(index)}
                  />
                )}
              </div>
            ) : null
          )}
        </DroppableViewer>
      </div>

      {/* Controls */}
      <div className='flex items-center justify-between mt-2 w-full'>
        <button
          className={`px-4 py-2 rounded-lg font-medium text-white ${
            pageNumber > 1
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handlePagePrev}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <p className='text-sm text-gray-600'>
          Page {pageNumber} of {numPages}
        </p>
        <button
          className={`px-4 py-2 rounded-lg font-medium text-white ${
            pageNumber < numPages
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handlePageNext}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>

      {/* Additional Features */}
      <div className='flex items-center justify-between mt-4 w-full'>
        {/* Zoom Controls */}
        <div className='flex items-center gap-2'>
          <button
            onClick={handleScaling}
            className='px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'
          >
            -
          </button>
          <span className='font-medium text-gray-600'>
            {(scale * 100).toFixed(0)}%
          </span>
          <button
            onClick={handleScaling}
            className='px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300'
          >
            +
          </button>
        </div>

        {/* Page Jump */}
        {/* <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-600'>Go to page:</span>
          <input
            type='number'
            min='1'
            max={numPages}
            value={pageNumber}
            onChange={HAND}
            className='w-16 px-2 py-1 border rounded-lg text-center text-gray-600'
          />
        </div> */}
      </div>
    </>
  )
}

export default PdfViewer
