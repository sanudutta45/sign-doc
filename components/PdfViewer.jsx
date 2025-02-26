"use client"
import React, { useCallback, useState } from "react"
import DroppableViewer from "./DroppableViewer"
import { Document, Page, pdfjs } from "react-pdf"
import TextBox from "./TextBox"
import SignatureContainer from "./SignatureContainer"
import ImageContainer from "./ImageContainer"
import "react-pdf/dist/Page/TextLayer.css"
import "react-pdf/dist/Page/AnnotationLayer.css"
import { useResizeObserver } from "@wojtekmaj/react-hooks"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
}

const resizeObserverOptions = {}

const maxWidth = 800

const PdfViewer = ({
  file,
  onDocumentLoadSuccess,
  handleDrop,
  droppedItems,
  pageNumber,
  handleUpdate,
  removeItem,
  numPages,
  signature,
  initial,
}) => {
  const [containerRef, setContainerRef] = useState(null)
  const [containerWidth, setContainerWidth] = useState()

  const onResize = useCallback((entries) => {
    const [entry] = entries

    if (entry) {
      setContainerWidth(Math.min(entry.contentRect.width, maxWidth))
    }
  }, [])

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  return (
    <>
      <div
        className='pdf-viewer hide-scroll'
        style={{ width: "100%", maxWidth: "800px", overflowX: "hidden" }}
        ref={setContainerRef}
      >
        <DroppableViewer onDrop={handleDrop}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages)).map((_, index) => (
              <div className='mt-3' key={index}>
                {index + 1} of {numPages}
                <Page pageNumber={index + 1} width={containerWidth} />
              </div>
            ))}
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
                    key={index}
                    updateText={(content) => handleUpdate(index, content)}
                    text={content}
                    removeItem={() => removeItem(index)}
                    itemId={index}
                  />
                )}
                {type === "signature" && (
                  <SignatureContainer
                    key={index}
                    signature={signature}
                    itemId={index}
                    removeItem={() => removeItem(index)}
                  />
                )}
                {type === "initial" && (
                  <SignatureContainer
                    key={index}
                    signature={initial}
                    itemId={index}
                    removeItem={() => removeItem(index)}
                  />
                )}
                {type === "image" && (
                  <ImageContainer
                    key={index}
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
    </>
  )
}

export default PdfViewer
