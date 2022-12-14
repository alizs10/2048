import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Square from './Container/Square'
import PlaceHolder from './Container/PlaceHolder'
import { setMoveListener } from '../redux/slices/squaresSlice'
import { useSwipeable } from 'react-swipeable'
import MoveContext from '../context/MoveContext'
import { reachedGoal } from '../redux/slices/infoSlice'
import { setGameOver, setPlay, setWin } from '../redux/slices/rulesSlice'
import { isGameOver, isGoalReached } from '../helpers/helpers'
import CacheContext from '../context/CacheContext'
import { addGame, addReachedTopTiles, updateBest, updateGame } from '../redux/slices/statisticsSlice'


export const Container = () => {

  const { timer } = useSelector(state => state.timer)
  const { goal, moves, best } = useSelector(state => state.info)
  const { mode } = useSelector(state => state.rules)
  const { placeHolders, squares, gameId, rows } = useSelector(state => state.squares)

  const dispatch = useDispatch()
  const { cacheData, setCachedData } = useContext(CacheContext)

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


  useEffect(() => {
    if (gameId) {
      dispatch(addGame({ id: gameId }))
    }

  }, [gameId])

  useEffect(() => {
    dispatch(updateBest(best))
  }, [best])

  const { handleRightMove, handleLeftMove, handleUpMove, handleDownMove } = useContext(MoveContext)



  useEffect(() => {
    // rule: when squares length == 16 => the game is over
    if (squares.length == rows * rows && mode == 1) {
      dispatch(setGameOver(true))
      dispatch(setMoveListener(false))
    }

    if (squares.length == rows * rows && mode == 0) {
      let gameOverStatus = isGameOver(squares, rows)
      if (gameOverStatus) {
        dispatch(setGameOver(true))
        dispatch(setMoveListener(false))
      }
    }

    let goalReachStatus = isGoalReached(squares, goal)

    if (goalReachStatus) {
      dispatch(reachedGoal())
      dispatch(setWin(true))
      dispatch(setPlay(false))
      dispatch(setMoveListener(false))
    }


    if (squares.length > 0 && gameId) {
      // find the top tile
      let sortedSquares = [...squares]
      sortedSquares.sort((a, b) => {
        return a.value > b.value
      })

      dispatch(updateGame({ id: gameId, topTile: sortedSquares[0].value }))
    }


    // add top tiles
    squares.map(sq => {
      if (Math.log2(sq.value) >= 9) {
        dispatch(addReachedTopTiles({ id: sq.id, tile: sq.value, timer, moves: moves + 1 }))
      }
    })

    cacheData(mode)
  }, [squares])


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
    handlers.ref(el);
    containerRef.current = el;
  }

  return (

    <div {...handlers} ref={refPassthrough} className="game-container z-50 relative w-full bg-[#BBADA0] self-center grid grid-cols-4 gap-[8px] rounded-md p-2">
      {placeHolders.map((placeHolder) => (
        <PlaceHolder key={placeHolder.id} />
      ))}
      {squares.length > 0 && squares.map((square) => (
        <Square key={square.id} square={square} />
      ))}
    </div>
  )
}
