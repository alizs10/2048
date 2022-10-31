import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Square from './Container/Square'
import PlaceHolder from './Container/PlaceHolder'
import { createNewSquare, prepareSquaresForMerge } from '../redux/slices/squaresSlice'
import { useSwipeable } from 'react-swipeable'
import MoveContext from '../context/MoveContext'
import { addMove, setGoal } from '../redux/slices/infoSlice'
import { setGameOver, setWin } from '../redux/slices/rulesSlice'
import { isGameOver, isGoalReached } from '../helpers/helpers'
import FunctionsContext from '../context/FunctionsContext'


export const Container = () => {

  const { goal, seconds } = useSelector(state => state.info)
  const { mode, play } = useSelector(state => state.rules)

  const { placeHolders, squares, moveEvent, rows } = useSelector(state => state.squares)
  const dispatch = useDispatch()

  const { setCachedData, cacheData } = useContext(FunctionsContext)

  useEffect(() => {


    return
    if (squares.length == 0) {

      let cachedMode = localStorage.getItem("mode")

      let modeCacheKey = cachedMode == 1 ? "time-trial-mode-cache" : "classic-mode-cache"
      let cachedObj = localStorage.getItem(modeCacheKey)

      if (cachedObj) {
        // set cached data
        setCachedData(JSON.parse(cachedObj))
      }
    }


  }, [])

  const { handleRightMove,
    handleLeftMove,
    handleUpMove,
    handleDownMove } = useContext(MoveContext)


  useEffect(() => {
    document.addEventListener("keydown", arrowKeysListener)

    return () => {
      document.removeEventListener("keydown", arrowKeysListener)
    }
  })

  const arrowKeysListener = e => {


    switch (e.key) {
      case "ArrowLeft":
        handleLeftMove()

        break;
      case "ArrowRight":
        handleRightMove()
        break;
      case "ArrowUp":
        handleUpMove()
        break;
      case "ArrowDown":
        handleDownMove()
        break;

      default:
        break;
    }

  }


  useEffect(() => {
    cacheData(mode)
  }, [seconds])

  useEffect(() => {

    if (moveEvent) {
      setTimeout(() => {
        dispatch(prepareSquaresForMerge())
        dispatch(createNewSquare())
        dispatch(addMove())
      }, 200)
    }


    // rule: when squares length == 16 => the game is over
    if (squares.length == rows * rows && mode == 1) {
      dispatch(setGameOver(true))
    }

    if (squares.length == rows * rows && mode == 0) {
      let gameOverStatus = isGameOver(squares, rows)
      if (gameOverStatus) {
        dispatch(setGameOver(true))
      }
    }

    let goalReachStatus = isGoalReached(squares, goal)

    if (goalReachStatus) {
      dispatch(setGoal(goal * 2))
      dispatch(setWin(true))
    }

    cacheData(mode)
  }, [squares])

  const handlers = useSwipeable({
    onSwipedRight: handleRightMove,
    onSwipedLeft: handleLeftMove,
    onSwipedUp: handleUpMove,
    onSwipedDown: handleDownMove,
    ...{
      delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
      preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
      trackTouch: true,                      // track touch input
      trackMouse: true,                     // track mouse input
      rotationAngle: 0,                      // set a rotation angle
      swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
      touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    },
  });


  const containerRef = useRef(null)

  const refPassthrough = (el) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set myRef el so you can access it yourself
    containerRef.current = el;
  }

  return (

    <div {...handlers} ref={refPassthrough} tabIndex="0" className="game-container z-50 relative w-fit bg-stone-400 self-center">
      {placeHolders.map((placeHolder) => (
        <PlaceHolder key={placeHolder.id} />
      ))}


      {squares.length > 0 && squares.map((square) => (
        <Square parent={containerRef} key={square.id} square={square} />
      ))}


    </div>
  )
}
