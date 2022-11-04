import { useDispatch, useSelector } from "react-redux"


import CacheContext from "../../context/CacheContext"
import { setGoal, setMoves, setScore } from "../../redux/slices/infoSlice"
import { setSquares } from "../../redux/slices/squaresSlice"
import { setTimer } from "../../redux/slices/timerSlice"

const CacheProvider = ({ children }) => {

  const { goal, score, moves } = useSelector(state => state.info)
  const { timer } = useSelector(state => state.timer)
  const {  squares } = useSelector(state => state.squares)

  const dispatch = useDispatch()

  const cacheData = mode => {

    let squaresInstance = [...squares]
    if (squaresInstance.length == 0) return

    let backupObj = {};

    backupObj.score = score;
    backupObj.timer = timer
    backupObj.moves = moves;
    backupObj.goal = goal;
    backupObj.squares = squaresInstance;

    switch (mode.toString()) {
      case "0":
        localStorage.setItem("classic-mode-cache", JSON.stringify(backupObj))
        break;

      case "1":
        localStorage.setItem("time-trial-mode-cache", JSON.stringify(backupObj))
        break;
        
      default:
        break;
    }
  }

  
  const setCachedData = cachedObj => {

    //score
    dispatch(setScore(cachedObj.score))

    //time
    dispatch(setTimer(cachedObj.timer))

    //moves
    dispatch(setMoves(cachedObj.moves))

    //goal
    dispatch(setGoal(cachedObj.goal))

    //squares
    dispatch(setSquares(cachedObj.squares))
  }



  return (
    <CacheContext.Provider value={{
      cacheData, setCachedData
    }}>
      {children}
    </CacheContext.Provider>
  )
}

export default CacheProvider