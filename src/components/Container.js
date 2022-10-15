import React, { useEffect, useState } from 'react'
import { Square } from './Container/Square'

export const Container = () => {

  const [rows, setRows] = useState(4)
  const [squares, setSquares] = useState([])


  useEffect(() => {

    function addSqaure() {
      for (let i = 0; i < rows * rows; i++) {
        setSquares(prevState => {
          if (prevState.length != rows * rows) { return ([...prevState, { number: null }]) }
          else {
            return prevState
          }
        })
      }
    }
    addSqaure()

  }, [])
  return (

    <div className='p-2 bg-stone-400 aspect-square rounded-md grid grid-cols-4 gap-2'>

      {squares.map((square, index) => (
        <Square key={index} square={square} />
      ))}

    </div>
  )
}
