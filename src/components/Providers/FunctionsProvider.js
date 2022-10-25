import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunctionsContext from '../../context/FunctionsContext'
import { initialInfos, setSeconds } from '../../redux/slices/infoSlice'
import { setPlay } from '../../redux/slices/rulesSlice'
import { start } from '../../redux/slices/squaresSlice'

const FunctionsProvider = ({ children }) => {

    const { gameOver, win } = useSelector(state => state.rules)

    const dispatch = useDispatch()
    const timerInterval = useRef(null)


    useEffect(() => {

        if (gameOver || win) {
            clearInterval(timerInterval.current)
        }


    }, [gameOver, win])

    const playGame = () => {
        dispatch(initialInfos())
        dispatch(setPlay(true))
        dispatch(start())

        if (timerInterval.current) {
            clearInterval(timerInterval.current)
        }
        timerInterval.current = setInterval(() => {
            dispatch(setSeconds())
        }, 1000)

    }

    const continueGame = () => {

        dispatch(setPlay(true))

        if (timerInterval.current) {
            clearInterval(timerInterval.current)
        }
        timerInterval.current = setInterval(() => {
            dispatch(setSeconds())
        }, 1000)

    }


    return (
        <FunctionsContext.Provider value={{
            playGame, continueGame
        }}>
            {children}
        </FunctionsContext.Provider>
    )
}

export default FunctionsProvider