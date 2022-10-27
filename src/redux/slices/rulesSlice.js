import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  play: false,
  gameOver: false,
  win: false,
  mode: localStorage.getItem("mode") ?? 0, // 0 => classic, 1 => time-trial
}

export const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setPlay: (state, action) => {
      state.play = action.payload;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
      state.play = !action.payload;
    },
    setWin: (state, action) => {
      state.win = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPlay, setGameOver, setWin, setMode } = rulesSlice.actions

export default rulesSlice.reducer