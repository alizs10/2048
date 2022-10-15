import React from 'react'
import { useDispatch } from 'react-redux'
import { up } from '../../redux/slices/squaresSlice'

export const Up = () => {

  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(up())} className='col-span-1 flex-center pt-4 text-4xl rounded-md bg-stone-600 text-white'>
        &#8963;
    </button>
  )
}
