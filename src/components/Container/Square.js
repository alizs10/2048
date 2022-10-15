import React from 'react'

export const Square = ({ square }) => {

    return (
        <div className={`aspect-square col-sapn-1 rounded-md ${square.number === null ? 'bg-stone-300/50' : 'bg-stone-300'} flex-center font-bold text-sm`}>
            {square.number}
        </div>
    )
}
