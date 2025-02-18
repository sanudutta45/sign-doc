'use client'
import { useDrag } from "react-dnd"

const DRAGGABLE_TYPE = "ITEM"

const DraggableItem = ({ type, icon, label }) => {
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
      className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}

export default DraggableItem
