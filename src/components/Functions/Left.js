import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { whichPositionIsAvailable } from '../../helpers/square'
import { updatePositions } from '../../redux/slices/squaresSlice'

export const Left = () => {

    const { squares, rows } = useSelector(state => state.squares)
    const dispatch = useDispatch()

    const handleLeftMove = () => {
        let squaresInstance = [...squares]
        // squaresInstance.reverse()

        squaresInstance.map(square => {
            let positionX = square.position[0];
            let positionY = square.position[1];
            let possibleMoves = []
            console.log(positionX);
            while (positionX <= rows - 1 && positionX > 0) {
                possibleMoves.push([positionX - 1, positionY])
                positionX--;
            }

            console.log(possibleMoves);

            let { availablePositions, shouldMerge } = whichPositionIsAvailable(squaresInstance, possibleMoves, square)
            availablePositions.reverse()
            console.log("availablePositions", availablePositions);

            if (availablePositions.length > 0) {
                square = { ...square, position: availablePositions[0] };
                let filteredSquares = squaresInstance.filter(sq => sq.id != square.id)
                squaresInstance = [...filteredSquares, square]
            }

            if (shouldMerge && availablePositions.length > 0) {

                console.log("what up", availablePositions);

                let isMatched = squaresInstance.filter(sq => sq.position[0] == availablePositions[0][0] && sq.position[1] == availablePositions[0][1])
                if (isMatched.length > 1) {
                    isMatched[0] = { ...isMatched[0], value: isMatched[0].value * isMatched.length }
                    let filteredSquares = squaresInstance.filter(sq => sq.position[0] != availablePositions[0][0] && sq.position[1] != availablePositions[0][1])
                    squaresInstance = [...filteredSquares, isMatched[0]]
                }
            }
        })


        dispatch(updatePositions(squaresInstance))

    }
    return (
        <button onClick={handleLeftMove} className='col-span-1 flex-center text-xl rounded-md bg-stone-600 text-white'>
            &#10094;
        </button>
    )
}
