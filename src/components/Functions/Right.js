import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { whichPositionIsAvailable } from '../../helpers/square'
import { updatePositions } from '../../redux/slices/squaresSlice'

export const Right = () => {

    const {squares, rows} = useSelector(state => state.squares)
    const dispatch = useDispatch()

    const handleRightMove = () => {
        let squaresInstance = [...squares]
        squaresInstance.reverse()

        squaresInstance.map(square => {
          let positionX = square.position[0];
          let positionY = square.position[1];
          let possibleMoves = []
          while(positionX < rows-1)
          {
            possibleMoves.push([positionX + 1,positionY])
            positionX++;
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
        <button onClick={handleRightMove} className='col-span-1 flex-center text-xl rounded-md bg-stone-600 text-white'>
            &#10095;
        </button>
    )
}
