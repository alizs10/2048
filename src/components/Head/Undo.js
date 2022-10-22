import React from 'react'
import { useDispatch } from 'react-redux'
import { undo } from '../../redux/slices/squaresSlice'

export const Undo = () => {

    const dispatch = useDispatch()
    const handleUndo = () => {
        dispatch(undo())
    }

    return (
        <button onClick={handleUndo} className='col-span-1 bg-red-500 rounded-md flex-center py-2 font-bold text-white'>
            UNDO
        </button>
    )
}
