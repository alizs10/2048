import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  games: [],
  all: { best: localStorage.getItem("best") ?? 0, total: 0, topTile: 0 },
  goals: []
}

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state = action.payload
    },
    addGame: (state, action) => {

      //we should check is game exists or not
      let gamesInstance = state.games;
      let isExists = gamesInstance.find(game => game.id == action.payload.id)

      if (!isExists) {
        console.log("and here");
        state.games = [...state.games, action.payload]
      }
    },
    updateGame: (state, action) => {
      
      if(state.games.length == 0) return
      let gamesInstance = state.games;
      let updatableGameIndex = gamesInstance.findIndex(game => game.id == action.payload.id)
      let updatableGame = gamesInstance[updatableGameIndex]
      let filteredGames = gamesInstance.filter(game => game.id != updatableGame.id)
      let updatedGame = {...updatableGame, ...action.payload}
      gamesInstance = [...filteredGames, updatedGame]    
      state.games = gamesInstance
  
      
    }
  }
})

// Action creators are generated for each case reducer function
export const { setStats, addGame, updateGame } = statisticsSlice.actions

export default statisticsSlice.reducer