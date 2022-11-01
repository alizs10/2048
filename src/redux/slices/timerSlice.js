import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  timer: 0
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setTimer: (state, action) => {
      state.timer = action.payload
    },
    incTimer: (state) => {
      state.timer += 1;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTimer, incTimer } = timerSlice.actions

export default timerSlice.reducer