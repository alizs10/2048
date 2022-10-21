import React, { useContext } from 'react'
import MoveContext from '../../context/MoveContext'

export const Down = () => {

  const { handleDownMove } = useContext(MoveContext)

  return (
    <button onClick={handleDownMove} className='col-span-1 flex-center pb-4 text-4xl rounded-md bg-stone-600 text-white'>
      &#8964;
    </button>
  )
}
