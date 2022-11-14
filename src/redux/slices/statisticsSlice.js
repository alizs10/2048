import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  games: [],
  all: { best: localStorage.getItem("best") ?? 0, total: 0, topTile: 0 },
  goals: [
    { tile: 512, games: 0 },
    { tile: 1024, games: 0 },
    { tile: 2048, games: 0 },
    { tile: 4096, games: 0 },
    { tile: 8192, games: 0 },
    { tile: 16384, games: 0 }
  ],
  reachedTopTiles: []
}

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload
    },
    setReachedTopTiles: (state, action) => {
      state.reachedTopTiles = action.payload
    },
    addGame: (state, action) => {

      //we should check is game exists or not
      let gamesInstance = state.games;
      let isExists = gamesInstance.find(game => game.id == action.payload.id)

      if (!isExists) {
        state.games = [...state.games, action.payload]
      }
    },
    updateGame: (state, action) => {

      if (action.payload.id === null) return
      if (state.games.length == 0) return

      let gamesInstance = state.games;
      let updatableGameIndex = gamesInstance.findIndex(game => game.id == action.payload.id)
      if (updatableGameIndex == -1) return

      let updatableGame = gamesInstance[updatableGameIndex]
      let filteredGames = gamesInstance.filter(game => game.id && game.id != updatableGame.id)
      let updatedGame = { ...updatableGame, ...action.payload }
      gamesInstance = [...filteredGames, updatedGame]
      state.games = gamesInstance
    },
    addReachedTopTiles: (state, action) => {

      let isExists = false
      state.reachedTopTiles.every(reachedTile => {
        
        if (reachedTile.id == action.payload.id) {
          isExists = true
        }

        return !isExists
      })
      if (isExists) return
      state.reachedTopTiles = [...state.reachedTopTiles, action.payload]

      // update goals

      let goalsInstance = [...state.goals]
      let updatableTile = action.payload.tile;
      let updatableGoalIndex = goalsInstance.findIndex(goal => goal.tile == updatableTile)
      let updatableGoal = goalsInstance[updatableGoalIndex]
      updatableGoal.games += 1
      let filteredGoals = goalsInstance.filter(goal => goal.tile != updatableTile)
      state.goals = [...filteredGoals, updatableGoal]
    },
    updateBest: (state, action) => {
      state.all.best = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setGames, setReachedTopTiles, addGame, updateGame, addReachedTopTiles, updateBest } = statisticsSlice.actions

export default statisticsSlice.reducer