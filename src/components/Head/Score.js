import React from 'react'
import { useSelector } from 'react-redux'

export const Score = () => {

    const { score, best } = useSelector(state => state.info)

    return (
        <div className='col-span-2 grid grid-cols-2 gap-2'>
            <div className='col-span-1 aspect-video bg-stone-600 rounded-md flex-center py-2 text-base font-bold text-white flex flex-col gap-y-1'>
                <span className='text-gray-200 text-xs'>SCORE</span>
                <span>
                    {score}
                </span>
            </div>

            <div className='col-span-1 aspect-video bg-stone-600 rounded-md flex-center py-2 text-base font-bold text-white flex flex-col gap-y-1'>
                <span className='text-gray-200 text-xs'>BEST</span>
                <span>
                    {best}
                </span>
            </div>

        </div>
    )
}
