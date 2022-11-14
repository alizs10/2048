import React, { useContext, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { formatTime, getFewestMove, getShortestTime } from '../helpers/helpers'
import FunctionsContext from '../context/FunctionsContext'
import { useSelector } from 'react-redux'

const Statistics = () => {

    const { handleToggleStat } = useContext(FunctionsContext)

    const { all, goals, games, reachedTopTiles } = useSelector(state => state.statistics)
    const [topTile, setTopTile] = useState(0)
    const [total, setTotal] = useState(0)


    useEffect(() => {

        if (games.length == 0) return

        let sortedGames = [...games]
        sortedGames.sort((a, b) => {
            return b.topTile - a.topTile
        })

        let totalScore = 0;
        sortedGames.map(game => {
            if (game.score) {
                totalScore += game.score
            }
        })

        setTopTile(sortedGames[0].topTile)
        setTotal(totalScore)

    }, [games])

    return (
        <motion.div
            initial={{ left: "100%" }}
            animate={{ left: "auto" }}
            exit={{ left: "100%" }}
            transition={{ bounce: "none" }}
            className="absolute top-0 w-full h-full flex flex-col gap-y-2 z-50 bg-gray-200 py-5 px-20 overflow-y-scroll"
        >
            <div className='flex justify-between items-center'>
                <span onClick={handleToggleStat} className='text-xl text-stone-400 cursor-pointer'>back</span>
                <span className='text-2xl text-stone-500 font-bold'>Classic Stats</span>
                <span></span>
            </div>

            <div className='mt-8 flex flex-col gap-y-1'>
                <span className='text-xl font-bold text-stone-500'>All Play</span>
                <span className='flex justify-between'>
                    <span className='text-xl text-stone-400'>Best Score</span>
                    <span className='text-xl text-stone-400'>{all.best}</span>
                </span>
                <span className='flex justify-between'>
                    <span className='text-xl text-stone-400'>Total Score</span>
                    <span className='text-xl text-stone-400'>{total}</span>
                </span>
                <span className='flex justify-between'>
                    <span className='text-xl text-stone-400'>Top Tile</span>
                    <span className='text-xl text-stone-400'>{topTile}</span>
                </span>

                {goals.length > 0 && goals.map((goal, index) => {
                    return goal.games == 0 ? null : (
                        <div key={index} className='mt-2'>
                            <span className='text-xl font-bold text-stone-500'>{goal.tile}</span>
                            <span className='flex justify-between'>
                                <span className='text-xl text-stone-400'>Games Reached</span>
                                <span className='text-xl text-stone-400'>{goal.games}</span>
                            </span>
                            <span className='flex justify-between'>
                                <span className='text-xl text-stone-400'>Shortest Time</span>
                                <span className='text-xl text-stone-400'>{formatTime(getShortestTime(goal.tile, reachedTopTiles))}</span>
                            </span>
                            <span className='flex justify-between'>
                                <span className='text-xl text-stone-400'>Fewest Moves</span>
                                <span className='text-xl text-stone-400'>{getFewestMove(goal.tile, reachedTopTiles)}</span>
                            </span>
                        </div>
                    )
                })}


            </div>




        </motion.div>

    )
}

export default Statistics