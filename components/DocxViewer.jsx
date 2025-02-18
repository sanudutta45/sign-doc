"use client"
import React from "react"
import DroppableViewer from "./DroppableViewer"
import TextBox from "./TextBox"
import SignatureContainer from "./SignatureContainer"
import ImageContainer from "./ImageContainer"

const DocxViewer = ({
  docRef,
  handleDrop,
  droppedItems,
  pageNumber,
  docxContent,
  handleUpdate,
  removeItem,
  initial,
  signature,
}) => {
  return (
    <div
      className='docx-viewer border border-gray-200 rounded-md p-4 w-full bg-white'
      style={{ height: "calc(100% - 120px)", overflowY: "auto" }}
      ref={docRef}
    >
      <DroppableViewer docRef={docRef} onDrop={handleDrop}>
        <div
          dangerouslySetInnerHTML={{ __html: docxContent }}
          className='prose'
        />
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
  )
}

export default DocxViewer
