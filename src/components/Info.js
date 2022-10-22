import React from 'react'
import { useSelector } from 'react-redux'

export const Info = () => {

  const { moves, seconds, minutes, hours } = useSelector(state => state.info)

  return (
    <div className='flex justify-between w-4/5 self-center'>
      <span className='text-stone-500 text-xs'>{moves} moves</span>
      <span className='text-stone-500 text-xs'>{`${hours != 0 ? hours + ':' : ''}${minutes != 0 ? minutes + ':' : ''}${seconds}`}s</span>
    </div>
  )
}
