import React, { useContext } from 'react'
import UndoContext from '../../context/UndoContext'

export const Undo = () => {

    const { handleUndo } = useContext(UndoContext)

    return (
        <button onClick={handleUndo} className='col-span-1 bg-red-500 rounded-md flex-center font-bold text-white text-xs sm:text-sm md:text-lg'>
            UNDO
        </button>
    )
}
