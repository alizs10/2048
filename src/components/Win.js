import React, { useContext } from 'react'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { formatTime } from '../helpers/helpers';
import { setWin } from '../redux/slices/rulesSlice';
import { undo } from '../redux/slices/squaresSlice';
import FunctionsContext from '../context/FunctionsContext';
import { setGoal, undoScore } from '../redux/slices/infoSlice';
import UndoContext from '../context/UndoContext';

const Win = () => {

    const { goal, moves } = useSelector(state => state.info)
    const { timer } = useSelector(state => state.timer)
    const { continueGame } = useContext(FunctionsContext)
    const dispatch = useDispatch()

    const handleContinuePlay = () => {
        dispatch(setWin(false))
        continueGame()
    }

    const { handleUndo } = useContext(UndoContext)

    return (
        <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: 0 }}
            exit={{ top: "-100%" }}

            transition={{ duration: 1, bounce: "none" }}
            className='grid grid-rows-6 gap-2 fixed top-0 left-0 w-full bg-[#f9dc5c] h-full py-5 px-12 z-40'
        >
            <div className='row-span-1 flex-center flex-col gap-y-4'>
                <h1 className='text-stone-700 font-bold text-5xl'>You win!</h1>
                <span className='text-lg font-bold text-stone-700 text-center'>You unlocked the {goal / 2} tile with {moves} moves in {formatTime(timer)}</span>
            </div>

            <div className='row-span-5 h-full self-end flex justify-between'>
                <button
                    onClick={handleContinuePlay}
                    className={`py-2 ${undo ? 'px-4' : 'w-full'} h-fit rounded-md self-end bg-stone-400 text-white font-bold flex-center`}
                >Play for {goal}</button>

                {undo && (
                    <button
                        onClick={handleUndo}
                        className='py-2 px-4 h-fit rounded-md self-end bg-stone-400 text-white font-bold flex-center'
                    >Undo</button>
                )}
            </div>
        </motion.div>
    )
}

export default Win