import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Square from './Container/Square'
import PlaceHolder from './Container/PlaceHolder'
import { createNewSquare, prepareSquaresForMerge } from '../redux/slices/squaresSlice'


export const Container = () => {

  const { placeHolders, squares, moveEvent } = useSelector(state => state.squares)


  const dispatch = useDispatch()
  useEffect(() => {
    if(moveEvent)
    {
      setTimeout(() => {
        dispatch(prepareSquaresForMerge())
        dispatch(createNewSquare())
      },300)
        
    }
    

  }, [squares])
  const containerRef = useRef(null)
  return (

    <div ref={containerRef} className='relative bg-stone-400 aspect-square p-2 gap-2 self-center w-full rounded-md grid grid-cols-4'>
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
