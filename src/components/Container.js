import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Square from './Container/Square'
import PlaceHolder from './Container/PlaceHolder'
import { createNewSquare, moveSquare, prepareSquaresForMerge } from '../redux/slices/squaresSlice'
import { useSwipeable } from 'react-swipeable'
import MoveContext from '../context/MoveContext'
import { addMove } from '../redux/slices/infoSlice'


export const Container = () => {

  const { placeHolders, squares, moveEvent } = useSelector(state => state.squares)
  const dispatch = useDispatch()

  useEffect(() => {
    if (moveEvent) {
      setTimeout(() => {
        dispatch(prepareSquaresForMerge())
        dispatch(createNewSquare())
        dispatch(addMove())
      }, 300)

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

    <div {...handlers} ref={refPassthrough} className='relative bg-stone-400 aspect-square p-2 gap-2 self-center w-full rounded-md grid grid-cols-4'>
      {placeHolders.map((placeHolder) => (
        <PlaceHolder key={placeHolder.id} />
      ))}
      <div ref={containerRef} className='absolute top-0 right-0 bottom-0 left-0  aspect-square p-2 gap-2 self-center w-full rounded-md'>


        {squares.map((square) => (
          <Square parent={containerRef} key={square.id} square={square} />
        ))}

      </div>
    </div>
  )
}
