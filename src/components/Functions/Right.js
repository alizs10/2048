import React, { useContext } from 'react'
import MoveContext from '../../context/MoveContext'
export const Right = () => {

  const { handleRightMove } = useContext(MoveContext)

  return (
    <button onClick={handleRightMove} className='col-span-1 h-fit py-2 mt-auto flex-center text-lg rounded-md bg-stone-600 text-white'>
      RIGHT
    </button>
  )
}
