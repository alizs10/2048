import React, { useContext } from 'react'
import MoveContext from '../../context/MoveContext'
export const Up = () => {
  const { handleUpMove } = useContext(MoveContext)

  return (
    <button onClick={handleUpMove} className='col-span-1 flex-center py-2 text-lg rounded-md bg-stone-600 text-white'>
      UP
    </button>
  )
}
