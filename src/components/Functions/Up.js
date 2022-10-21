import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moveSquare } from '../../redux/slices/squaresSlice'

export const Up = () => {

  const { squares } = useSelector(state => state.squares)
  const dispatch = useDispatch()

  const handleUpMove = () => {

    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return a.position[1] - b.position[1]
    })

    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "up", isFirst }))

    })

  }
  return (
    <button onClick={() => handleUpMove()} className='col-span-1 flex-center pt-4 text-4xl rounded-md bg-stone-600 text-white'>
      &#8963;
    </button>
  )
}
