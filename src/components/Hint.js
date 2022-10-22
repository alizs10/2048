import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const Hint = () => {

  const { gameOver } = useSelector(state => state.rules)
  const [hintMessage, setHintMessage] = useState("Join the numbers and get to the 2048 tile!");

  useEffect(() => {
    if(gameOver)
    {
      setHintMessage("Game Over! Try your best next time.")
    }
  }, [gameOver])
  return (
    <div className={`text-sm ${gameOver ? 'text-black font-bold' : 'text-gray-600'} text-center`}>
      {hintMessage}
    </div>
  )
}
