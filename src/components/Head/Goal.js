import React from 'react'
import { useSelector } from 'react-redux'

export const Goal = () => {

    const {goal} = useSelector(state => state.info)
    return (
        <div className='col-span-1 aspect-square flex-center text-white font-bold bg-yellow-400 rounded-md text-3xl'>
            {goal}
        </div>
    )
}
