import { useDispatch, useSelector } from "react-redux"
import UndoContext from "../../context/UndoContext"
import { undoGoal, undoScore } from "../../redux/slices/infoSlice"
import { setGameOver, setPlay, setWin } from "../../redux/slices/rulesSlice"
import { undo } from "../../redux/slices/squaresSlice"

const UndoProvider = ({ children }) => {
  const { play, win, gameOver } = useSelector(state => state.rules)
  const { reachedGoalScore, score } = useSelector(state => state.info)
  const dispatch = useDispatch()


  const handleUndo = () => {
    
    if (score > 0 && score == reachedGoalScore) {
      // set prev goal 
      console.log("undo goal");
      dispatch(undoGoal())
    }
    // set prev score
    dispatch(undoScore())
    
    // set prev squares
    dispatch(undo())

    if (win) {
      dispatch(setWin(false))
    }

    if (!play) {
      dispatch(setPlay(true))
    }

    if (gameOver) {
      dispatch(setGameOver(false))
    }

  }


  return (
    <UndoContext.Provider value={{
      handleUndo
    }}>
      {children}
    </UndoContext.Provider>
  )
}

export default UndoProvider