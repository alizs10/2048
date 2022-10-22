import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const Hint = () => {

  const { goal } = useSelector(state => state.info)
  const { gameOver } = useSelector(state => state.rules)
  const defaultHint = `Join the numbers and get to the ${goal} tile!`;
  const [hintMessage, setHintMessage] = useState(defaultHint);

  useEffect(() => {
    if(gameOver)
    {
      setHintMessage("Game Over! Try your best next time.")
    } else {
      setHintMessage(defaultHint)
    }
  }, [gameOver])
  return (
    <div className={`text-sm ${gameOver ? 'text-black font-bold' : 'text-gray-600'} text-center`}>
      {hintMessage}
    </div>
  )
}
