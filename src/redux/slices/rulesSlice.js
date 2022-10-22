import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  play: false,
  gameOver: false,
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { setPlay, setGameOver } = rulesSlice.actions

export default rulesSlice.reducer