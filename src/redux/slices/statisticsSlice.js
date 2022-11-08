import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  games: [],
  all: { best: 51880, total: 326476, topTile: 4096 },
  goals: []
}

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    
  }
})

// Action creators are generated for each case reducer function
export const {  } = statisticsSlice.actions

export default statisticsSlice.reducer