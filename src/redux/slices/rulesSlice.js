import { createSlice } from '@reduxjs/toolkit'
import { getTwoRandomNumber } from '../../helpers/helpers'

const initialState = {
  play: false,
}

export const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    setPlay: (state, actions) => {
        state.play = actions.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPlay } = rulesSlice.actions

export default rulesSlice.reducer