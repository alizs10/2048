import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunctionsContext from '../../context/FunctionsContext'
import { addSeconds, initialInfos, setGoal, setHours, setMinutes, setMoves, setScore, setSeconds } from '../../redux/slices/infoSlice'
import { setPlay } from '../../redux/slices/rulesSlice'
import { createNewSquare, setSquares, start } from '../../redux/slices/squaresSlice'

const FunctionsProvider = ({ children }) => {

    const { gameOver, win, mode, play } = useSelector(state => state.rules)
    const { squares } = useSelector(state => state.squares)
    const { goal, score, seconds, minutes, hours, moves } = useSelector(state => state.info)

    const [menuVisibility, setMenuVisibility] = useState(false)
    const [statVisibility, setStatVisibility] = useState(false)

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

    const handleToggleStat = () => {
        // when stat is shown => menu should disapear

        handleToggleMenu()
        setStatVisibility(prevState => !prevState)
    }

    useEffect(() => {

        if (gameOver || win || !play) {
            clearInterval(timerInterval.current)
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

    const cacheData = mode => {

        console.log("caching");
        let squaresInstance = [...squares]
        if (squaresInstance.length == 0) return

        let backupObj = {};

        backupObj.score = score;
        backupObj.time = {
            seconds, minutes, hours
        };
        backupObj.moves = moves;
        backupObj.goal = goal;
        backupObj.squares = squaresInstance;

        switch (mode) {
            case "0":
                console.log("here");
                localStorage.setItem("classic-mode-cache", JSON.stringify(backupObj))
                break;

            case "1":
                localStorage.setItem("time-trial-mode-cache", JSON.stringify(backupObj))
                break;
            default:
                break;
        }
    }


    const setCachedData = cachedObj => {

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


    return (
        <FunctionsContext.Provider value={{
            playGame, continueGame, handleToggleMenu, handleToggleStat, menuVisibility, statVisibility, cacheData, setCachedData
        }}>
            {children}
        </FunctionsContext.Provider>
    )
}

export default FunctionsProvider