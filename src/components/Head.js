import React from 'react'
import { Goal } from './Head/Goal'
import { New } from './Head/New'
import { Score } from './Head/Score'
import { Undo } from './Head/Undo'

export const Head = () => {
    return (
        <div className='grid grid-cols-3 gap-2'>
            <Goal />
            <div className='ml-2 col-span-2 grid grid-cols-2 gap-2'>
                <Score />
                <New />
                <Undo />
            </div>
        </div>
    )
}
