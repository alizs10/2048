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


export const Container = () => {

  const { goal } = useSelector(state => state.info)
  const { placeHolders, squares, moveEvent, rows } = useSelector(state => state.squares)
  const dispatch = useDispatch()

  useEffect(() => {
    if (moveEvent) {
      setTimeout(() => {
        dispatch(prepareSquaresForMerge())
        dispatch(createNewSquare())
        dispatch(addMove())
      }, 200)

    }

    if (squares.length == rows * rows) {
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
  }, [squares])

  const { handleRightMove,
    handleLeftMove,
    handleUpMove,
    handleDownMove } = useContext(MoveContext)

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

    <div {...handlers} ref={refPassthrough} className='z-50 w-full relative bg-stone-400 aspect-square p-2 gap-2 self-center rounded-md grid grid-cols-4'>
      {placeHolders.map((placeHolder) => (
        <PlaceHolder key={placeHolder.id} />
      ))}
      <div ref={containerRef} className='absolute top-0 right-0 bottom-0 left-0 touch-none aspect-square p-2 gap-2 self-center w-full rounded-md'>


        {squares.map((square) => (
          <Square parent={containerRef} key={square.id} square={square} />
        ))}

      </div>
    </div>
  )
}
