import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MoveContext from '../../context/MoveContext'
import { moveSquare, setUndo } from '../../redux/slices/squaresSlice'

const MoveProvider = ({ children }) => {

  const { squares, moveEvent } = useSelector(state => state.squares)
  const dispatch = useDispatch()

  const [squaresBackup, setSquaresBackup] = useState([])

  useEffect(() => {

    if (moveEvent && squaresBackup.length > 0) {
      dispatch(setUndo(squaresBackup))
    }

  }, [moveEvent])

  const handleRightMove = () => {

    setSquaresBackup([...squares])
    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return b.position[0] - a.position[0]
    })


    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      let isLast = (index == squaresInstance.length - 1) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "right", isFirst, isLast }))
    })
  }

  const handleUpMove = () => {
    setSquaresBackup([...squares])

    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return a.position[1] - b.position[1]
    })

    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      let isLast = (index == squaresInstance.length - 1) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "up", isFirst, isLast }))

    })

  }


  const handleDownMove = () => {
    setSquaresBackup([...squares])

    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return b.position[1] - a.position[1]
    })

    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      let isLast = (index == squaresInstance.length - 1) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "down", isFirst, isLast }))

    })

  }


  const handleLeftMove = () => {

    setSquaresBackup([...squares])
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
    <MoveContext.Provider value={{
      handleRightMove,
      handleLeftMove,
      handleUpMove,
      handleDownMove
    }}>
      {children}
    </MoveContext.Provider>
  )
}

export default MoveProvider