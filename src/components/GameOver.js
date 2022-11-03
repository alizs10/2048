import React, { useContext, useEffect } from 'react'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { formatTime } from '../helpers/helpers';
import { setGameOver, setWin } from '../redux/slices/rulesSlice';
import { undo } from '../redux/slices/squaresSlice';
import FunctionsContext from '../context/FunctionsContext';
import { undoScore } from '../redux/slices/infoSlice';

const GameOver = () => {

    const { gameOver } = useSelector(state => state.rules)

    const { moves, score } = useSelector(state => state.info)
    const {  timer } = useSelector(state => state.timer)
    const { playGame, continueGame } = useContext(FunctionsContext)
    const dispatch = useDispatch()

    const { undo: undoSetting } = useSelector(state => state.settings)

    const handlePlayAgain = () => {
        dispatch(setGameOver(false))
        playGame()
    }

    const handleUndo = () => {
        dispatch(setGameOver(false))
        dispatch(undoScore())
        dispatch(undo())
        continueGame()
    }

    return (
        <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: 0 }}
            exit={{ top: "-100%" }}

            transition={{ duration: 1, bounce: "none" }}
            className='grid grid-rows-6 gap-2 fixed top-0 left-0 w-full bg-red-300 h-full py-5 px-12 z-40'
        >
            <div className='row-span-1 flex-center flex-col gap-y-4'>
                <h1 className='text-stone-700 font-bold text-5xl'>You Lost!</h1>
                <span className='text-lg font-bold text-stone-700 text-center'>You can't make any move</span>
                <span className='text-lg font-bold text-stone-700 text-center'>moves:{moves} score:{score} time:{formatTime(timer)}</span>

            </div>

            <div className='row-span-5 h-full self-end flex justify-between'>
                <button
                    onClick={handlePlayAgain}
                    className={`py-2 ${undoSetting ? 'px-4' : 'w-full'} h-fit rounded-md self-end bg-stone-400 text-white font-bold flex-center`}
                >Start Again</button>
                {undoSetting && (
                    <button
                        onClick={handleUndo}
                        className='py-2 px-4 h-fit rounded-md self-end bg-stone-400 text-white font-bold flex-center'
                    >Undo</button>
                )}
            </div>
        </motion.div>
    )
}

export default GameOver