import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  score: 0,
  undoScore: 0,
  best: localStorage.getItem('best') ?? 0,
  moves: 0,
  goal: 2048,
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    initialInfos: (state) => {
      state.moves = 0;
      state.score = 0;
      state.undoScore = 0;
      state.best = localStorage.getItem('best') ?? 0;
      state.goal = 2048;
    },
    setScore: (state, actions) => {
      state.score = actions.payload
    },
    setBest: (state, actions) => {
      state.best = actions.payload
    },
    addScore: (state, action) => {
      state.score += action.payload;
      if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("best", state.best);
      }
    },
    addMove: (state) => {
      state.moves += 1;
    },
    setMoves: (state, action) => {
      state.moves = action.payload;
    },
    setGoal: (state, action) => {
      state.goal = action.payload
    },
    setUndoScore: (state, action) => {
      state.undoScore = action.payload
    },
    undoScore: (state) => {
      state.score = state.undoScore
    }
  },
})

// Action creators are generated for each case reducer function
export const { setScore, setMoves, setGoal, setBest, addMove, initialInfos, addScore, setUndoScore, undoScore } = infoSlice.actions

export default infoSlice.reducer