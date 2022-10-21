import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { whichPositionIsAvailable } from '../../helpers/square'
import { createNewSquare, merge, moveSquare, updatePositions } from '../../redux/slices/squaresSlice'

export const Down = () => {

  const { squares, rows } = useSelector(state => state.squares)
  const dispatch = useDispatch()

  const handleDownMove = () => {
    
    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return  b.position[1] - a.position[1]
    })

    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "down", isFirst }))

    })

  }
  return (
    <button onClick={handleDownMove} className='col-span-1 flex-center pb-4 text-4xl rounded-md bg-stone-600 text-white'>
      &#8964;
    </button>
  )
}
