import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Square } from './Container/Square'

export const Container = () => {

  const {squares} = useSelector(state => state.squares)

  return (

    <div className='p-2 bg-stone-400 aspect-square self-center w-full rounded-md grid grid-cols-4 gap-2'>

      {squares.map((square, index) => (
        <Square key={index} square={square} />
      ))}

    </div>
  )
}
