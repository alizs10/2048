import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunctionsContext from '../../context/FunctionsContext'
import { addSeconds, initialInfos } from '../../redux/slices/infoSlice'
import { setPlay } from '../../redux/slices/rulesSlice'
import { createNewSquare, start } from '../../redux/slices/squaresSlice'

const FunctionsProvider = ({ children }) => {

    const { gameOver, win, mode, play } = useSelector(state => state.rules)
    const [menuVisibility, setMenuVisibility] = useState(false)

    const dispatch = useDispatch()
    const timerInterval = useRef(null)
    const timeTrialInterval = useRef(null)


    const handleToggleMenu = () => {
        // when menu is shown => timer should stop
        if (!menuVisibility) {
            dispatch(setPlay(false))
        }
        setMenuVisibility(prevState => !prevState)
    }

    useEffect(() => {

        if (gameOver || win || !play) {
            clearInterval(timerInterval.current)
            clearInterval(timeTrialInterval.current)
        }


    }, [gameOver, win, play])

    useEffect(() => {
        if (mode == 0) {
            clearInterval(timeTrialInterval.current)
        }
    }, [mode])

    const playGame = () => {
        dispatch(initialInfos())
        dispatch(setPlay(true))
        dispatch(start())

        if (timerInterval.current) {
            clearInterval(timerInterval.current)
        }
        timerInterval.current = setInterval(() => {
            dispatch(addSeconds())
        }, 1000)

        if (mode == 1) {
            timeTrialInterval.current = setInterval(() => {
                dispatch(createNewSquare())
            }, 2000)
        }

    }

    const continueGame = () => {

        console.log("we are here");
        dispatch(setPlay(true))

        if (timerInterval.current) {
            clearInterval(timerInterval.current)
        }

        timerInterval.current = setInterval(() => {
            dispatch(addSeconds())
        }, 1000)

        console.log(timerInterval.current);

        if (mode == 1) {
            if (timeTrialInterval.current) {
                clearInterval(timeTrialInterval.current)
            }

            timeTrialInterval.current = setInterval(() => {
                dispatch(createNewSquare())
            }, 2000)
        }

    }


    return (
        <FunctionsContext.Provider value={{
            playGame, continueGame, handleToggleMenu, menuVisibility
        }}>
            {children}
        </FunctionsContext.Provider>
    )
}

export default FunctionsProvider