import React, { useContext } from 'react'
import MoveContext from '../../context/MoveContext'
export const Right = () => {

  const { handleRightMove } = useContext(MoveContext)

  return (
    <button onClick={handleRightMove} className='col-span-1 flex-center text-xl rounded-md bg-stone-600 text-white'>
      &#10095;
    </button>
  )
}
