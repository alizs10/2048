import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatScore } from '../../helpers/helpers'
import { addScore } from '../../redux/slices/infoSlice'
import { resetScoreCount } from '../../redux/slices/squaresSlice'
import ScoreCount from './ScoreCount'

export const Score = () => {

    const { score, best } = useSelector(state => state.info)
    const { scoreCount } = useSelector(state => state.squares)
    const dispatch = useDispatch()
    useEffect(() => {

        if (scoreCount > 0) {
            dispatch(addScore(scoreCount))
            dispatch(resetScoreCount())
        }

    }, [scoreCount])

    return (
        <div className='col-span-2 grid grid-cols-2 gap-1 sm:gap-2'>
            <div className='relative col-span-1 bg-stone-700 rounded-md flex-center py-1 text-xs sm:text-lg md:text-xl font-bold text-white flex-col'>
                <span className='text-gray-200 text-[10px] sm:text-xs'>SCORE</span>
                <span>
                    {formatScore(score)}
                </span>

                <AnimatePresence>
                    {scoreCount > 0 && (
                        <ScoreCount score={scoreCount} />
                    )}
                </AnimatePresence>
            </div>

            <div className='col-span-1 bg-stone-700 rounded-md flex-center py-1 text-xs sm:text-lg md:text-xl font-bold text-white flex-col'>
                <span className='text-gray-200 text-[10px] sm:text-xs'>BEST</span>
                <span>
                    {formatScore(best)}
                </span>
            </div>
        </div>
    )
}
