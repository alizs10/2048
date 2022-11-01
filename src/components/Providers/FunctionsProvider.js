import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunctionsContext from '../../context/FunctionsContext'
import { initialInfos } from '../../redux/slices/infoSlice'
import { setPlay } from '../../redux/slices/rulesSlice'
import { createNewSquare, start } from '../../redux/slices/squaresSlice'
import { setTimer } from '../../redux/slices/timerSlice'


const FunctionsProvider = ({ children }) => {

    const { gameOver, win, mode, play } = useSelector(state => state.rules)

    const [menuVisibility, setMenuVisibility] = useState(false)
    const [statVisibility, setStatVisibility] = useState(false)
    
    const dispatch = useDispatch()
    const timeTrialInterval = useRef(null)

    const handleToggleMenu = () => {
        // when menu is shown => timer should stop
        if (!menuVisibility) {
            dispatch(setPlay(false))
        }
        setMenuVisibility(prevState => !prevState)
    }

    const handleToggleStat = () => {
        // when stat is shown => menu should disapear

        handleToggleMenu()
        setStatVisibility(prevState => !prevState)
    }

    useEffect(() => {

        if (gameOver || win || !play) {
            clearInterval(timeTrialInterval.current)
        }


    }, [gameOver, win, play])

    useEffect(() => {
        localStorage.setItem("mode", mode)
        if (mode == 0) {
            clearInterval(timeTrialInterval.current)
        }
    }, [mode])

    const playGame = () => {
        dispatch(setTimer(0))
        dispatch(initialInfos())
        dispatch(setPlay(true))
        dispatch(start())

        if (mode == 1) {
            timeTrialInterval.current = setInterval(() => {
                dispatch(createNewSquare())
            }, 2000)
        }

    }

    const continueGame = () => {
        dispatch(setPlay(true))

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
            playGame, continueGame, handleToggleMenu, handleToggleStat, menuVisibility, statVisibility
        }}>
            {children}
        </FunctionsContext.Provider>
    )
}

export default FunctionsProvider