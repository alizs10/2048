import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { whichPositionIsAvailable } from '../../helpers/square'
import { updatePositions } from '../../redux/slices/squaresSlice'

export const Up = () => {

  const {squares} = useSelector(state => state.squares)
  const dispatch = useDispatch()

  const handleUpMove = () => {
    let squaresInstance = [...squares]

    squaresInstance.map(square => {
      let positionX = square.position[0];
      let positionY = square.position[1];
      let possibleMoves = []
      while(positionY > 0)
      {
        possibleMoves.push([positionX,positionY - 1])
        positionY--;
      }
      
      let availablePositions = whichPositionIsAvailable(squaresInstance, possibleMoves, square)
      availablePositions.reverse()

      if(availablePositions.length > 0)
      {
        square = {...square, position:availablePositions[0]};
        let filteredSquares = squaresInstance.filter(sq => sq.id != square.id)
        squaresInstance = [...filteredSquares, square]

      }
      
    })
    
    dispatch(updatePositions(squaresInstance))
  }
  return (
    <button onClick={() => handleUpMove()} className='col-span-1 flex-center pt-4 text-4xl rounded-md bg-stone-600 text-white'>
        &#8963;
    </button>
  )
}
