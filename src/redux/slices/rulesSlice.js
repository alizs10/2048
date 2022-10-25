import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  play: false,
  gameOver: false,
  win: false,
}

export const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setPlay: (state, action) => {
        
      state.play = true;
    },
    setGameOver: state => {
      state.gameOver = true;
      state.play = false;
    },
    setWin: (state, action) => {
      state.win = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPlay, setGameOver, setWin } = rulesSlice.actions

export default rulesSlice.reducer