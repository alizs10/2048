import React, { useContext } from 'react'
import FunctionsContext from '../../context/FunctionsContext'

export const Start = () => {

    const { playGame } = useContext(FunctionsContext)
    return (
        <button onClick={playGame} className='mt-auto col-span-3 rounded-md bg-emerald-500 text-white font-bold text-base w-full py-3'>
            Start
        </button>
    )
}
