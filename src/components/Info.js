import React from 'react'
import { useSelector } from 'react-redux'

export const Info = () => {

  const { moves, seconds, minutes, hours } = useSelector(state => state.info)

  return (
    <div className='flex justify-between'>
      <span className='text-stone-500 text-sm'>{moves} moves</span>
      <span className='text-stone-500 text-sm'>{`${hours != 0 ? hours + ':' : ''}${minutes + ':'}${seconds < 10 ? '0' + seconds : seconds}`}</span>
    </div>
  )
}
