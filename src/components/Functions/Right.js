import React from 'react'
import { useDispatch } from 'react-redux'
import { right } from '../../redux/slices/squaresSlice'

export const Right = () => {

    const dispatch = useDispatch()
    return (
        <button onClick={() => dispatch(right())} className='col-span-1 flex-center text-xl rounded-md bg-stone-600 text-white'>
            &#10095;
        </button>
    )
}
