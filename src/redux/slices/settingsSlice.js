import { createSlice } from '@reduxjs/toolkit'

let cachedSettings = JSON.parse(localStorage.getItem("settings"));
const initialState = {
  undo: cachedSettings ? !!cachedSettings.undo : true,
  sounds: cachedSettings ? !!cachedSettings.sounds : false
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