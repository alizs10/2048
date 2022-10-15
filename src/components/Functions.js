import React from 'react'
import { useSelector } from 'react-redux'
import { Start } from './Functions/Start'

export const Functions = () => {

  const { play } = useSelector(state => state.rules)

  return (
    <div className='grid grid-cols-3 gap-2'>
      {!play ? (
        <Start />
      ) : (
        <>
          <Left />
          <Up />
          <Down />
          <Buttom />
        </>
      )}
    </div>
  )
}
