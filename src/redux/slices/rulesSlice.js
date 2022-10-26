import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  play: false,
  gameOver: true,
  win: false,
}

export const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setPlay: (state, action) => {

      state.play = true;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
      state.play = !action.payload;
    },
    setWin: (state, action) => {
      state.win = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPlay, setGameOver, setWin } = rulesSlice.actions

export default rulesSlice.reducer