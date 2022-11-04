import { useDispatch } from "react-redux"
import UndoContext from "../../context/UndoContext"
import { undoGoal, undoScore } from "../../redux/slices/infoSlice"
import { undo } from "../../redux/slices/squaresSlice"

const UndoProvider = ({ children }) => {
const dispatch = useDispatch()

  const handleUndo = () => {

    // how should we know if we have won??


    // set prev goal 
    dispatch(undoGoal())
    // set prev score
    dispatch(undoScore())
    // set prev squares
    dispatch(undo())

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