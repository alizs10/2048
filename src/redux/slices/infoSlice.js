import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  score: 0,
  lastScore: 0,
  best: localStorage.getItem('best') ?? 0,
  moves: 0,
  lastMoves: 0,
  goal: 2048,
  lastGoal: 2048,
  reachedGoalScore: 0,
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    initialInfos: (state) => {
      state.moves = 0;
      state.lastMoves = 0;
      state.score = 0;
      state.lastScore = 0;
      state.best = localStorage.getItem('best') ?? 0;
      state.goal = 2048;
      state.undoGoal = 2048;
    },
    setScore: (state, actions) => {
      state.score = actions.payload
    },
    setBest: (state, actions) => {
      state.best = actions.payload
    },
    addScore: (state, action) => {
      state.lastScore = state.score;
      state.score += action.payload;
      if (state.score > state.best) {
        state.best = state.score;
        localStorage.setItem("best", state.best);
      }
    },
    addMove: (state) => {
      state.lastMoves = state.moves;
      state.moves += 1;
    },
    decreaseMove: (state) => {
      state.moves = state.lastMoves;
    },
    setMoves: (state, action) => {
      state.moves = action.payload;
    },
    setGoal: (state, action) => {
      state.goal = action.payload
    },
    reachedGoal: (state) => {
      state.reachedGoalScore = state.score
      state.goal *= 2
    },
    setUndoGoal: (state, action) => {
      state.undoGoal = action.payload
    },
    setUndoScore: (state, action) => {
      state.undoScore = action.payload
    },
    undoScore: (state) => {
      state.score = state.lastScore
    },
    undoGoal: (state) => {
      state.reachedGoalScore = 0;
      state.goal /= 2;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setScore, setMoves, setGoal, setBest, addMove, decreaseMove, initialInfos, addScore, setUndoScore, undoScore, setUndoGoal, undoGoal, reachedGoal } = infoSlice.actions

export default infoSlice.reducer