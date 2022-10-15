import { createSlice } from '@reduxjs/toolkit'
import { getTwoRandomNumber } from '../../helpers/helpers'

const initialState = {
  rows: 4,
  squares: []
}

export const squaresSlice = createSlice({
  name: 'squares',
  initialState,
  reducers: {
    initial: (state) => {
      // state.user = action.payload
      while (state.squares.length < state.rows * state.rows) {
        state.squares.push({ number: null })
      }
    },
    start: (state, action) => {
      let { rand1, rand2 } = getTwoRandomNumber(0, state.rows * state.rows)

      state.squares.map((square, index) => {
        if (index == rand1 || index == rand2) {
          square.number = 2;
        }
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { initial, start } = squaresSlice.actions

export default squaresSlice.reducer