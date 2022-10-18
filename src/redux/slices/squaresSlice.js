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
    start: (state) => {
      let squaresInstance = [...current(state).squares]
      let firstCoordinate = generateUniqueCoordinate(squaresInstance, state.rows)
      let firstSquare = { id: uuidv4(), value: 2, position: firstCoordinate }
      squaresInstance = [...squaresInstance, firstSquare]

      let secondCoordinate = generateUniqueCoordinate(squaresInstance, state.rows)
      let secondSquare = { id: uuidv4(), value: 2, position: secondCoordinate }
      squaresInstance = [...squaresInstance, secondSquare]

      state.squares = squaresInstance;

    },
    updatePositions: (state, action) => {
      state.squares = action.payload;
    },
    merge: (state, action) => {
      let squaresInstance = [...state.squares];
      let mergingSquares = action.payload;
      let filteredSquares = squaresInstance.filter(sq => sq.id !== mergingSquares[0].id && sq.id !== mergingSquares[1].id)
      let mergedSquare = { ...mergingSquares[0], value: mergingSquares[0].value * 2 }
      state.squares = [...filteredSquares, mergedSquare]
    },
    createNewSquare: state => {
      let squares = current(state).squares
      let newCoordinate = generateUniqueCoordinate(squares, state.rows)
      console.log(newCoordinate);
      let newSquare = { id: uuidv4(), value: 2, position: newCoordinate }
      state.squares = [...state.squares, newSquare]
    }
  },
})

// Action creators are generated for each case reducer function
export const { initial, start, updatePositions, merge, createNewSquare } = squaresSlice.actions

export default squaresSlice.reducer