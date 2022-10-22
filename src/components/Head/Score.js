import React from 'react'
import { useSelector } from 'react-redux'

export const Score = () => {

    const { score, best } = useSelector(state => state.info)

    return (
        <div className='col-span-2 grid grid-cols-2 gap-1 sm:gap-2'>
            <div className='col-span-1 bg-stone-700 rounded-md flex-center py-1 text-xs sm:text-lg md:text-2xl font-bold text-white flex-col'>
                <span className='text-gray-200 text-[10px] sm:text-xs'>SCORE</span>
                <span>
                    {score}
                </span>
            </div>

            <div className='col-span-1 bg-stone-700 rounded-md flex-center py-1 text-xs sm:text-lg md:text-2xl font-bold text-white flex-col'>
                <span className='text-gray-200 text-[10px] sm:text-xs'>BEST</span>
                <span>
                    {best}
                </span>
            </div>

        </div>
    )
}
