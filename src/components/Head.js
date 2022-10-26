import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Goal } from './Head/Goal'
import { New } from './Head/New'
import { Score } from './Head/Score'
import { Undo } from './Head/Undo'

export const Head = () => {

    const {undo} = useSelector(state => state.settings)
    return (
        <div className='flex gap-1 sm:gap-2'>
            <Goal />
            <div className='w-[70%] grid grid-cols-2 gap-1 sm:gap-2'>
                <Score />
                <New />
                {undo && (
                    <Undo />
                )}
            </div>
        </div>
    )
}
