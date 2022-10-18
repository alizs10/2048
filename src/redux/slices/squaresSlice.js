import { createSlice, current } from '@reduxjs/toolkit'
import { generateUniqueCoordinate, getNewIndex, getRandomIndex, getTwoRandomNumber, upAvailableIndexes } from '../../helpers/helpers'
import { setPossibleMoves } from '../../helpers/square'
import { v4 as uuidv4 } from 'uuid';
const initialState = {
  rows: 4,
  placeHolders: [],
  squares: []
}

export const squaresSlice = createSlice({
  name: 'squares',
  initialState,
  reducers: {
    initial: (state) => {
      // state.user = action.payload
      let id = 0;
      while (state.placeHolders.length < state.rows * state.rows) {
        state.placeHolders.push({ id })
        id++;
      }
    },
    start: (state, action) => {
      let { rand1, rand2 } = getTwoRandomNumber(0, state.rows - 1)

      state.squares.push({ id: uuidv4(), value: 2, position:[rand1, rand1] })
      state.squares.push({ id: uuidv4(), value: 2, position: [rand2, rand2] })
    },
    updatePositions: (state, action) => {
      state.squares = action.payload;
    },
    createNewSquare: state => {
      let squares = current(state).squares
      let newCoordinate = generateUniqueCoordinate(squares, state.rows)
      console.log(newCoordinate);
      let newSquare = {id: uuidv4(), value: 2, position: newCoordinate}
      state.squares = [...state.squares, newSquare]
    }
  },
})

// Action creators are generated for each case reducer function
export const { initial, start, updatePositions,createNewSquare } = squaresSlice.actions

export default squaresSlice.reducer