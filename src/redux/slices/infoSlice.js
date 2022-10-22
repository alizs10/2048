import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  score: 0,
  best: 0,
  moves: 0,
  seconds: 0,
  minutes: 0,
  hours: 0,
  goal: 2048,
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    initialInfos: (state) => {
      state.moves = 0;
      state.score = 0;
      state.seconds = 0;
      state.minutes = 0;
      state.hours = 0;
      state.goal = 2048;
    },
    setScore: (state, actions) => {
      state.score = actions.payload
    },
    setBest: (state, actions) => {
      state.best = actions.payload
    },
    addMove: (state) => {
      state.moves += 1;
    },
    setSeconds: (state) => {
      state.seconds += 1;
      if (state.seconds == 60) {
        state.minutes += 1;
        state.seconds = 0;
      }
      if (state.minutes == 60) {
        state.hours += 1;
        state.minutes = 0;
      }
    },
    setGoal: (state, actions) => {
      state.goal = actions.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setScore, setSeconds, setGoal, setBest, addMove,initialInfos } = infoSlice.actions

export default infoSlice.reducer