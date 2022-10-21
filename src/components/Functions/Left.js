import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { whichPositionIsAvailable } from '../../helpers/square'
import { createNewSquare, merge, moveSquare, updatePositions } from '../../redux/slices/squaresSlice'

export const Left = () => {

    const { squares, rows } = useSelector(state => state.squares)
    const dispatch = useDispatch()

    const handleLeftMove = () => {

        let squaresInstance = [...squares]
        squaresInstance.sort((a, b) => {
            return a.position[0] - b.position[0];
        })

        squaresInstance.map((square, index) => {
            let isFirst = (index == 0) ? true : false;
            let isLast = (index == squaresInstance.length - 1) ? true : false;
            dispatch(moveSquare({ squareId: square.id, dir: "left", isFirst, isLast }))

        })

    }
    return (
        <button onClick={handleLeftMove} className='col-span-1 flex-center text-xl rounded-md bg-stone-600 text-white'>
            &#10094;
        </button>
    )
}
