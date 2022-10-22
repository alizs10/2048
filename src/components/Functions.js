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

  const {play} = useSelector(state => state.rules)

  return (
    <div className='grid grid-cols-3 gap-2'>
      {!play ? (
        <Start/>
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
