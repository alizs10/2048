import React from 'react'

export const Start = ({playGame}) => {

    return (
        <button onClick={playGame} className='col-span-3 rounded-md bg-emerald-500 text-white font-bold text-base w-full py-3'>
            Start
        </button>
    )
}
