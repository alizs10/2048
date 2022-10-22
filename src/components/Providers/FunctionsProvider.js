import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunctionsContext from '../../context/FunctionsContext'
import { initialInfos, setSeconds } from '../../redux/slices/infoSlice'
import { setPlay } from '../../redux/slices/rulesSlice'
import { start } from '../../redux/slices/squaresSlice'

const FunctionsProvider = ({ children }) => {

    const { gameOver, play } = useSelector(state => state.rules)

    const dispatch = useDispatch()
    const timerInterval = useRef(null)


    useEffect(() => {

        if (gameOver) {
            clearInterval(timerInterval.current)
        }


    }, [gameOver])

    const playGame = () => {
        dispatch(initialInfos())
        dispatch(setPlay(true))
        dispatch(start())

        timerInterval.current = setInterval(() => {
            dispatch(setSeconds())
        }, 1000)

    }


    return (
        <FunctionsContext.Provider value={{
            playGame
        }}>
            {children}
        </FunctionsContext.Provider>
    )
}

export default FunctionsProvider