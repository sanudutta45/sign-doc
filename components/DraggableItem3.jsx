"use client"

import { useDrag } from "react-dnd"

const DRAGGABLE_TYPE = "ITEM"
const DraggableItem3 = ({ type, children, itemId }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAGGABLE_TYPE,
    item: { type, id: itemId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} className={`${isDragging ? "opacity-0" : "opacity-100"}`}>
      {children}
    </div>
  )
}

export default DraggableItem3
