import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialInfos, setSeconds } from '../redux/slices/infoSlice'
import { setGameOver, setPlay } from '../redux/slices/rulesSlice'
import { start } from '../redux/slices/squaresSlice'
import { Down } from './Functions/Down'
import { Left } from './Functions/Left'
import { Right } from './Functions/Right'
import { Start } from './Functions/Start'
import { Up } from './Functions/Up'

export const Functions = () => {

  const { gameOver,play } = useSelector(state => state.rules)

  const dispatch = useDispatch()
  const timerInterval = useRef(null)


  useEffect(() => {

    if(gameOver)
    {
        clearInterval(timerInterval.current)
    }


  }, [gameOver])

  const playGame = () => {
    dispatch(initialInfos())
    dispatch(setPlay(true))
    dispatch(start())

    timerInterval.current = setInterval(() => {
      dispatch(setSeconds())
    }, 1000)

  }

  return (
    <div className='grid grid-cols-3 gap-2'>
      {!play ? (
        <Start playGame={playGame}/>
      ) : (
        <>
          <Left />
          <div className='flex flex-col gap-y-2'>
            <Up />
            <Down />
          </div>
          <Right />
        </>
      )}
    </div>
  )
}
