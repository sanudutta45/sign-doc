"use client"
import { useRef } from "react"
import { useDrop } from "react-dnd"

const DRAGGABLE_TYPE = "ITEM"

const DroppableViewer = ({ onDrop, docRef, children }) => {
  const dropRef = useRef(null)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DRAGGABLE_TYPE,
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset()
      if (offset && docRef.current) {
        const pdfRect = docRef.current.getBoundingClientRect()
        if (
          offset.x >= pdfRect.left &&
          offset.x <= pdfRect.right &&
          offset.y >= pdfRect.top &&
          offset.y <= pdfRect.bottom
        ) {
          const dropBoxRect = dropRef.current.getBoundingClientRect()
          const x = offset.x - dropBoxRect.left
          const y = offset.y - dropBoxRect.top
          onDrop(item, { x, y })
        }
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  drop(dropRef)

  return (
    <div ref={dropRef} className={`relative ${isOver ? "bg-blue-50" : ""}`}>
      {children}
    </div>
  )
}

export default DroppableViewer
