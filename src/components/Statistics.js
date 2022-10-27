import React, { useContext } from 'react'

import { motion } from 'framer-motion'
import { formatTime } from '../helpers/helpers'
import FunctionsContext from '../context/FunctionsContext'

const Statistics = () => {

    const { handleToggleStat } = useContext(FunctionsContext)
    let fakeData = {
        all: { best: 51880, total: 326476, topTile: 4096 },
        goals: [
            { tile: 512, games: 13, time: { hours: 0, minutes: 2, seconds: 44 }, moves: 247 },
            { tile: 1024, games: 12, time: { hours: 0, minutes: 5, seconds: 58 }, moves: 478 },
            { tile: 2048, games: 7, time: { hours: 0, minutes: 12, seconds: 27 }, moves: 944 },
            { tile: 4096, games: 2, time: { hours: 0, minutes: 27, seconds: 25 }, moves: 1876 },
        ]
    }
    return (
        <motion.div
            initial={{ left: "100%" }}
            animate={{ left: "auto" }}
            exit={{ left: "100%" }}
            transition={{ bounce: "none" }}
            className="absolute top-0 w-full h-full flex flex-col gap-y-2 md:w-3/5 lg:w-[45%] xl:w-1/3 z-50 bg-gray-200 py-5 px-20 overflow-y-scroll"
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
                    <span className='text-xl text-stone-400'>{fakeData.all.best}</span>
                </span>
                <span className='flex justify-between'>
                    <span className='text-xl text-stone-400'>Total Score</span>
                    <span className='text-xl text-stone-400'>{fakeData.all.total}</span>
                </span>
                <span className='flex justify-between'>
                    <span className='text-xl text-stone-400'>Top Tile</span>
                    <span className='text-xl text-stone-400'>{fakeData.all.topTile}</span>
                </span>

                {fakeData.goals.map(goal => (
                    <div className='mt-2'>
                        <span className='text-xl font-bold text-stone-500'>{goal.tile}</span>
                        <span className='flex justify-between'>
                            <span className='text-xl text-stone-400'>Games Reached</span>
                            <span className='text-xl text-stone-400'>{goal.games}</span>
                        </span>
                        <span className='flex justify-between'>
                            <span className='text-xl text-stone-400'>Shortest Time</span>
                            <span className='text-xl text-stone-400'>{formatTime(goal.time.seconds, goal.time.minutes, goal.time.hours)}</span>
                        </span>
                        <span className='flex justify-between'>
                            <span className='text-xl text-stone-400'>Fewest Moves</span>
                            <span className='text-xl text-stone-400'>{goal.moves}</span>
                        </span>
                    </div>
                ))}


            </div>




        </motion.div>

    )
}

export default Statistics