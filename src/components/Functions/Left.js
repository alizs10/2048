import React, { useContext } from 'react'
import MoveContext from '../../context/MoveContext'
export const Left = () => {

    const { handleLeftMove } = useContext(MoveContext)

    return (
        <button onClick={handleLeftMove} className='col-span-1 h-fit py-2 mt-auto flex-center text-lg rounded-md bg-stone-600 text-white'>
            Left
        </button>
    )
}
