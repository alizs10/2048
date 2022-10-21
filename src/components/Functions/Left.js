import React, { useContext } from 'react'
import MoveContext from '../../context/MoveContext'
export const Left = () => {

    const { handleLeftMove } = useContext(MoveContext)

    return (
        <button onClick={handleLeftMove} className='col-span-1 flex-center text-xl rounded-md bg-stone-600 text-white'>
            &#10094;
        </button>
    )
}
