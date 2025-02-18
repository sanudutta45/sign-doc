"use client"
import { useDrag } from "react-dnd"

const DRAGGABLE_TYPE = "ITEM"

const DraggableItem2 = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAGGABLE_TYPE,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`cursor-pointer ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {children}
    </div>
  )
}

export default DraggableItem2
