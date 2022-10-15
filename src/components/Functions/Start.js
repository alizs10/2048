import React from 'react'
import { useDispatch } from 'react-redux'
import { setSeconds } from '../../redux/slices/infoSlice'
import { setPlay } from '../../redux/slices/rulesSlice'
import { start } from '../../redux/slices/squaresSlice'

export const Start = () => {

    const dispatch = useDispatch()

    const playGame = () => {
        dispatch(setPlay(true))
        dispatch(start())

        const timer = setInterval(() => {
            dispatch(setSeconds())
        }, 1000)
    }

    return (
        <button onClick={playGame} className='col-span-3 rounded-md bg-emerald-500 text-white font-bold text-base w-full py-3'>
            Start
        </button>
    )
}
