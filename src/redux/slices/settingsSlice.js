import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  undo: false,
  sounds: false
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleUndo: (state) => {
      state.undo = !state.undo;
    },
    toggleSounds: (state) => {
      state.sounds = !state.sounds;
    }
  },
})

// Action creators are generated for each case reducer function
export const { toggleUndo, toggleSounds } = settingsSlice.actions

export default settingsSlice.reducer