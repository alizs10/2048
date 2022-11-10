import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatTime } from '../helpers/helpers'
import { addMove } from '../redux/slices/infoSlice'
import { resetMoveCount } from '../redux/slices/squaresSlice'
import { updateGame } from '../redux/slices/statisticsSlice'
import { incTimer } from '../redux/slices/timerSlice'

export const Info = () => {

  const { moves } = useSelector(state => state.info)
  const { timer } = useSelector(state => state.timer)
  const { play } = useSelector(state => state.rules)
  const { moveCount, gameId } = useSelector(state => state.squares)
  const timerInterval = useRef(null)
  const dispatch = useDispatch()


  useEffect(() => {

    if (moveCount > 0) {
      dispatch(addMove())
      dispatch(resetMoveCount())
    }

  }, [moveCount])

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


  useEffect(() => {

    if(gameId)
    {
      dispatch(updateGame({ id: gameId, timer, moves }))
    }
  }, [timer, moves])



  return (
    <div className='flex justify-between'>
      <span className='text-stone-500 text-sm'>{moves} moves</span>
      <span className='text-stone-500 text-sm'>{formatTime(timer)}</span>
    </div>
  )
}
