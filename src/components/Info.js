import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatTime } from '../helpers/helpers'
import { incTimer } from '../redux/slices/timerSlice'

export const Info = () => {

  const { moves } = useSelector(state => state.info)
  const { timer } = useSelector(state => state.timer)
  const { play } = useSelector(state => state.rules)
  const timerInterval = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (play) {

      if (timerInterval.current) {
        clearInterval(timerInterval.current)
      }

      timerInterval.current = setInterval(() => {
        dispatch(incTimer())
      }, 1000)

    } else {
      clearInterval(timerInterval.current)
    }
  }, [play])





  return (
    <div className='flex justify-between'>
      <span className='text-stone-500 text-sm'>{moves} moves</span>
      <span className='text-stone-500 text-sm'>{formatTime(timer)}</span>
    </div>
  )
}
