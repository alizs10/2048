import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Square from './Container/Square'
import PlaceHolder from './Container/PlaceHolder'
import { createNewSquare, prepareSquaresForMerge, removeMoveListener, setSquares } from '../redux/slices/squaresSlice'
import { useSwipeable } from 'react-swipeable'
import MoveContext from '../context/MoveContext'
import { addMove, setGoal, setMoves, setScore } from '../redux/slices/infoSlice'
import { setGameOver, setWin } from '../redux/slices/rulesSlice'
import { isGameOver, isGoalReached } from '../helpers/helpers'
import { setTimer } from '../redux/slices/timerSlice'


export const Container = () => {

  const { goal, score, moves } = useSelector(state => state.info)
  const { timer } = useSelector(state => state.timer)
  const { mode } = useSelector(state => state.rules)

  const { placeHolders, squares, moveEvent, rows,listenForMove } = useSelector(state => state.squares)
  const dispatch = useDispatch()

  useEffect(() => {

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

  const { handleRightMove, handleLeftMove, handleUpMove, handleDownMove } = useContext(MoveContext)


  useEffect(() => {

    if (moveEvent) {
      dispatch(addMove())
    }

    // rule: when squares length == 16 => the game is over
    if (squares.length == rows * rows && mode == 1) {
      dispatch(setGameOver(true))
      dispatch(removeMoveListener())
    }

    if (squares.length == rows * rows && mode == 0) {
      let gameOverStatus = isGameOver(squares, rows)
      if (gameOverStatus) {
        dispatch(setGameOver(true))
        dispatch(removeMoveListener())
        console.log("here");
      }
    }

    let goalReachStatus = isGoalReached(squares, goal)

    if (goalReachStatus) {
      dispatch(setGoal(goal * 2))
      dispatch(setWin(true))
      dispatch(removeMoveListener())
    }

    cacheData(mode)
  }, [squares])

  useEffect(() => {
    console.log(listenForMove);
  }, [listenForMove])

  const cacheData = mode => {

    let squaresInstance = [...squares]
    if (squaresInstance.length == 0) return

    let backupObj = {};

    backupObj.score = score;
    backupObj.timer = timer
    backupObj.moves = moves;
    backupObj.goal = goal;
    backupObj.squares = squaresInstance;

    switch (mode) {
      case "0":

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
    dispatch(setTimer(cachedObj.timer))

    //moves
    dispatch(setMoves(cachedObj.moves))

    //goal
    dispatch(setGoal(cachedObj.goal))

    //squares
    dispatch(setSquares(cachedObj.squares))
  }


  const handlers = useSwipeable({
    onSwipedRight: handleRightMove,
    onSwipedLeft: handleLeftMove,
    onSwipedUp: handleUpMove,
    onSwipedDown: handleDownMove,
    ...{
      delta: 5,                             // min distance(px) before a swipe starts. *See Notes*
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
