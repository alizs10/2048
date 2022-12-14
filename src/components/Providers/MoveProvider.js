import { Howl } from 'howler'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MoveContext from '../../context/MoveContext'
import { moveSquare } from '../../redux/slices/squaresSlice'

const MoveProvider = ({ children }) => {

  const { play, win, gameOver } = useSelector(state => state.rules)
  const { sounds } = useSelector(state => state.settings)
  const { squares } = useSelector(state => state.squares)
  const dispatch = useDispatch()
  
  const swipeAudioRef = useRef(null)
  
  useEffect(() => {
    swipeAudioRef.current = new Howl({
      src: "/sounds/swipe-sound.mp3",
      html5: true,
      rate: 2,
    })
  }, [])
  
  const setInputs = useCallback(e => {
    switch (e.key) {
      case "ArrowLeft":
        handleLeftMove()
        break;
      case "ArrowRight":
        handleRightMove()
        break;
      case "ArrowUp":
        handleUpMove()
        break;
      case "ArrowDown":
        handleDownMove()
        break;

      default:
        break;
    }
  }, [squares, play])

  useEffect(() => {

    window.addEventListener("keydown", setInputs)


    return () => window.removeEventListener("keydown", setInputs)

  }, [setInputs])

  useEffect(() => {

    if (!play || win || gameOver) {
      window.removeEventListener("keydown", setInputs)
    }

  }, [play, win, gameOver])


  const handleRightMove = () => {
    if (!play || win || gameOver) return

    
    if(sounds)
    {
      swipeAudioRef.current.play()
    }

    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return b.position[0] - a.position[0]
    })

    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      let isLast = (index == squaresInstance.length - 1) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "right", isFirst, isLast }))
    })
  }

  const handleUpMove = () => {


    if (!play || win || gameOver) return


    if(sounds)
    {
      swipeAudioRef.current.play()
    }


    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return a.position[1] - b.position[1]
    })

    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      let isLast = (index == squaresInstance.length - 1) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "up", isFirst, isLast }))

    })

  }


  const handleDownMove = () => {

    if (!play || win || gameOver) return


    if(sounds)
    {
      swipeAudioRef.current.play()
    }


    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return b.position[1] - a.position[1]
    })

    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      let isLast = (index == squaresInstance.length - 1) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "down", isFirst, isLast }))

    })

  }


  const handleLeftMove = () => {
    if (!play || win || gameOver) return


    if(sounds)
    {
      swipeAudioRef.current.play()
    }

    let squaresInstance = [...squares]
    squaresInstance.sort((a, b) => {
      return a.position[0] - b.position[0];
    })

    squaresInstance.map((square, index) => {
      let isFirst = (index == 0) ? true : false;
      let isLast = (index == squaresInstance.length - 1) ? true : false;
      dispatch(moveSquare({ squareId: square.id, dir: "left", isFirst, isLast }))

    })

  }



  return (
    <MoveContext.Provider value={{
      handleRightMove,
      handleLeftMove,
      handleUpMove,
      handleDownMove
    }}>
      {children}
    </MoveContext.Provider>
  )
}

export default MoveProvider