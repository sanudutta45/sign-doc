"use client"
import { useRef } from "react"
import { useDrop } from "react-dnd"

const DRAGGABLE_TYPE = "ITEM"

const DroppableViewer = ({ onDrop, children }) => {
  const dropRef = useRef(null)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DRAGGABLE_TYPE,
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset()
      if (offset && dropRef.current) {
        const pdfRect = dropRef.current.getBoundingClientRect()
        if (
          offset.x >= pdfRect.left &&
          offset.x <= pdfRect.right &&
          offset.y >= pdfRect.top &&
          offset.y <= pdfRect.bottom
        ) {
          const x = offset.x - pdfRect.left
          const y = offset.y - pdfRect.top
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
    <div ref={dropRef} className={`w-full relative ${isOver ? "bg-blue-50" : ""}`}>
      {children}
    </div>
  )
}

export default DroppableViewer
