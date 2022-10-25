import React from 'react'
import { useSelector } from 'react-redux'
import { formatTime } from '../helpers/helpers'

export const Info = () => {

  const { moves, seconds, minutes, hours } = useSelector(state => state.info)

  return (
    <div className='flex justify-between'>
      <span className='text-stone-500 text-sm'>{moves} moves</span>
      <span className='text-stone-500 text-sm'>{formatTime(seconds, minutes, hours)}</span>
    </div>
  )
}
