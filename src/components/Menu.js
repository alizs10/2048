import React, { useContext, useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import FunctionsContext from '../context/FunctionsContext'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSounds, toggleUndo } from '../redux/slices/settingsSlice'
import { setMode, setPlay } from '../redux/slices/rulesSlice'
import { setSquares } from '../redux/slices/squaresSlice'
import { initialInfos } from '../redux/slices/infoSlice'
import CacheContext from '../context/CacheContext'

const Menu = () => {

    const { mode } = useSelector(state => state.rules)
    const { undo, sounds } = useSelector(state => state.settings)
    const { handleToggleMenu, handleToggleStat } = useContext(FunctionsContext)

    const { cacheData, setCachedData } = useContext(CacheContext)

    const dispatch = useDispatch()

    const handleToggleSounds = () => {
        dispatch(toggleSounds())
    }

    const handleToggleUndo = () => {
        dispatch(toggleUndo())
    }

    useEffect(() => {
        let settingsObj = { undo, sounds }
        localStorage.setItem("settings", JSON.stringify(settingsObj))
    }, [undo, sounds])

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


    const [fullScreen, setFullScreen] = useState(document.webkitIsFullScreen ? true : false)

    const handleToggleFullScreen = () => {
        if(fullScreen)
        {
            document.exitFullscreen()
            
        } else {
            document.body.requestFullscreen()
        }
        setFullScreen(prevState => !prevState)

    }


    return (
        <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "auto" }}
            exit={{ left: "-100%" }}
            transition={{ bounce: "none" }}
            className="absolute top-0 w-full h-full z-50 bg-gray-200 py-5 px-20"
        >
            <div className='flex-center flex-col gap-y-2'>

                <h1 className='mt-4 font-bold text-stone-500 text-8xl'>2048</h1>

                <button onClick={playClassicGame} className="py-2 w-full rounded-md bg-yellow-400 mt-8 flex-center gap-x-2 text-stone-700 text-lg font-bold">Classic play</button>
                <button onClick={playTimeTrial} className="py-2 w-full rounded-md bg-red-500/90 flex-center gap-x-2 text-white text-lg font-bold">Time trial</button>

                <button onClick={handleToggleStat} className="py-2 w-full rounded-md bg-blue-600 flex-center gap-x-2 text-white mt-8 text-lg font-bold">Statistics</button>
                <button onClick={handleToggleSounds} className="py-2 w-full rounded-md bg-blue-600 flex-center gap-x-2 text-white text-lg font-bold">Sounds {sounds ? "ON" : "OFF"}</button>
                <button onClick={handleToggleUndo} className="py-2 w-full rounded-md bg-blue-600 flex-center gap-x-2 text-white text-lg font-bold">Undo {undo ? "ON" : "OFF"}</button>
                <button onClick={handleToggleFullScreen} className="py-2 w-full rounded-md bg-blue-600 flex-center gap-x-2 text-white text-lg font-bold">Full Screen {fullScreen ? "ON" : "OFF"}</button>

                <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-stone-500 flex-center gap-x-2 text-white mt-8 text-lg font-bold">How to play</button>
                <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-stone-500 flex-center gap-x-2 text-white text-lg font-bold">About 2048</button>
                <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-stone-500 flex-center gap-x-2 text-white text-lg font-bold">Privacy Policy</button>
            </div>
        </motion.div>
    )
}

export default Menu