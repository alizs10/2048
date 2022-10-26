import React, { useContext } from 'react'

import { motion } from 'framer-motion'
import FunctionsContext from '../context/FunctionsContext'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSounds, toggleUndo } from '../redux/slices/settingsSlice'

const Menu = () => {

    const { undo, sounds } = useSelector(state => state.settings)
    const { handleToggleMenu } = useContext(FunctionsContext)

    const dispatch = useDispatch()

    const handleToggleSounds = () => {
        dispatch(toggleSounds())    
    }

    const handleToggleUndo = () => {
        dispatch(toggleUndo())    
    }

    return (
        <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: 0 }}
            exit={{ left: "-100%" }}
            transition={{ bounce: "none" }}
            className="absolute top-0 w-full h-full z-50 bg-gray-200 py-5 px-20"
        >
            <div className='flex-center flex-col gap-y-2'>

            <h1 className='mt-4 font-bold text-stone-500 text-8xl'>2048</h1>
            
            <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-yellow-400 mt-8 flex-center gap-x-2 text-stone-700 text-lg font-bold">Classic play</button>
            <button onClick={handleToggleMenu} className="py-2 w-full rounded-md bg-red-500/90 flex-center gap-x-2 text-white text-lg font-bold">Time trial</button>
            
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