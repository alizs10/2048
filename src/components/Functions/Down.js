import React, { useContext } from 'react'
import MoveContext from '../../context/MoveContext'

export const Down = () => {

  const { handleDownMove } = useContext(MoveContext)

  return (
    <button onClick={handleDownMove} className='col-span-1 flex-center py-2 text-lg rounded-md bg-stone-600 text-white'>
      DOWN
    </button>
  )
}
