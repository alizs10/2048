import React, { useContext } from 'react'

import { motion } from 'framer-motion'
import FunctionsContext from '../context/FunctionsContext'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSounds, toggleUndo } from '../redux/slices/settingsSlice'
import { setMode, setPlay } from '../redux/slices/rulesSlice'
import { setSquares } from '../redux/slices/squaresSlice'
import { initialInfos, setGoal, setHours, setMinutes, setMoves, setScore, setSeconds } from '../redux/slices/infoSlice'

const Menu = () => {

    const { play, mode } = useSelector(state => state.rules)
    const { undo, sounds } = useSelector(state => state.settings)
    const { goal, score, seconds, minutes, hours, moves } = useSelector(state => state.info)
    const { squares } = useSelector(state => state.squares)
    const { handleToggleMenu } = useContext(FunctionsContext)

    const dispatch = useDispatch()

    const handleToggleSounds = () => {
        dispatch(toggleSounds())
    }

    const handleToggleUndo = () => {
        dispatch(toggleUndo())
    }

    const playTimeTrial = () => {

        if (mode == 0) {

            // we need to backup
            cacheData(0)

            // load cache
            let cachedObj = localStorage.getItem("time-trial-mode-cache")
            if (cachedObj) {
                // set cached data
                setCachedData(JSON.parse(cachedObj))
            } else {
                // initial for start new game
                dispatch(initialInfos())
                dispatch(setSquares([]))
            }
            dispatch(setMode(1))
        }


        dispatch(setPlay(false))
        handleToggleMenu()
    }

    const playClassicGame = () => {
        
        if (mode == 1) {
            // we need to backup
            cacheData(1)

            let cachedObj = localStorage.getItem("classic-mode-cache")
            if (cachedObj) {
                // set cached data
                setCachedData(JSON.parse(cachedObj))
            } else {
                // initial for start new gam
                dispatch(initialInfos())
                dispatch(setSquares([]))

            }

            dispatch(setMode(0))
        }

        dispatch(setPlay(false))
        handleToggleMenu()
    }

    const setCachedData = cachedObj => {

        console.log(cachedObj);

        //score
        dispatch(setScore(cachedObj.score))
        //time
        dispatch(setSeconds(cachedObj.time.seconds))
        dispatch(setMinutes(cachedObj.time.minutes))
        dispatch(setHours(cachedObj.time.hours))

        //moves
        dispatch(setMoves(cachedObj.moves))

        //goal
        dispatch(setGoal(cachedObj.goal))

        //squares
        dispatch(setSquares(cachedObj.squares))
    }

    const cacheData = mode => {

        if(squares.length == 0) return

        let backupObj = {};

        backupObj.score = score;
        backupObj.time = {
            seconds, minutes, hours
        };
        backupObj.moves = moves;
        backupObj.goal = goal;
        backupObj.squares = squares;


        switch (mode) {
            case 0:
                localStorage.setItem("classic-mode-cache", JSON.stringify(backupObj))
                break;

            case 1:
                localStorage.setItem("time-trial-mode-cache", JSON.stringify(backupObj))
                break;
            default:
                break;
        }
    }


    return (
        <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "auto" }}
            exit={{ left: "-100%" }}
            transition={{ bounce: "none" }}
            className="absolute top-0 w-full h-full md:w-3/5 lg:w-[45%] xl:w-1/3 z-50 bg-gray-200 py-5 px-20"
        >
            <div className='flex-center flex-col gap-y-2'>

                <h1 className='mt-4 font-bold text-stone-500 text-8xl'>2048</h1>

                <button onClick={playClassicGame} className="py-2 w-full rounded-md bg-yellow-400 mt-8 flex-center gap-x-2 text-stone-700 text-lg font-bold">Classic play</button>
                <button onClick={playTimeTrial} className="py-2 w-full rounded-md bg-red-500/90 flex-center gap-x-2 text-white text-lg font-bold">Time trial</button>

                <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-blue-600 flex-center gap-x-2 text-white mt-8 text-lg font-bold">Statistics</button>
                <button onClick={handleToggleSounds} className="py-2 w-full rounded-md bg-blue-600 flex-center gap-x-2 text-white text-lg font-bold">Sounds {sounds ? "ON" : "OFF"}</button>
                <button onClick={handleToggleUndo} className="py-2 w-full rounded-md bg-blue-600 flex-center gap-x-2 text-white text-lg font-bold">Undo {undo ? "ON" : "OFF"}</button>

                <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-stone-500 flex-center gap-x-2 text-white mt-8 text-lg font-bold">How to play</button>
                <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-stone-500 flex-center gap-x-2 text-white text-lg font-bold">About 2048</button>
                <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-stone-500 flex-center gap-x-2 text-white text-lg font-bold">Privacy Policy</button>
            </div>
        </motion.div>
    )
}

export default Menu